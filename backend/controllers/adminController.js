// backend/controllers/adminController.js
const db = require('../config/db');

// @desc    Get Admin Dashboard KPI metrics and charts
// @route   GET /api/admin/dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total sales and orders
    const [salesResult] = await db.query(`
      SELECT 
        COUNT(id) AS total_orders,
        COALESCE(SUM(total_amount), 0.00) AS total_sales,
        COALESCE(AVG(total_amount), 0.00) AS average_order_value
      FROM orders
      WHERE order_status != 'Cancelled'
    `);

    // 2. Total active products
    const [productCountResult] = await db.query(
      "SELECT COUNT(*) AS total_products FROM products WHERE status = 'active'"
    );

    // 3. Total customers
    const [customerCountResult] = await db.query(
      "SELECT COUNT(*) AS total_customers FROM users WHERE role = 'customer'"
    );

    // 4. Low stock variants (stock <= 5)
    const [lowStockVariants] = await db.query(`
      SELECT 
        pv.id AS variant_id,
        pv.sku,
        pv.size,
        pv.color,
        pv.stock_quantity,
        p.id AS product_id,
        p.name AS product_name,
        c.name AS category_name
      FROM product_variants pv
      INNER JOIN products p ON pv.product_id = p.id
      INNER JOIN categories c ON p.category_id = c.id
      WHERE pv.stock_quantity <= 5 AND p.status = 'active'
      ORDER BY pv.stock_quantity ASC
      LIMIT 10
    `);

    // 5. Sales chart data (daily / monthly breakdown for Recharts)
    const [salesChartData] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %d') AS date_label,
        DATE(created_at) AS raw_date,
        COUNT(id) AS order_count,
        ROUND(SUM(total_amount), 2) AS revenue
      FROM orders
      WHERE order_status != 'Cancelled'
      GROUP BY raw_date, date_label
      ORDER BY raw_date ASC
      LIMIT 14
    `);

    // 6. Top selling products
    const [topSellingProducts] = await db.query(`
      SELECT 
        oi.product_name_snapshot AS product_name,
        SUM(oi.quantity) AS total_sold,
        ROUND(SUM(oi.subtotal), 2) AS total_revenue
      FROM order_items oi
      INNER JOIN orders o ON oi.order_id = o.id
      WHERE o.order_status != 'Cancelled'
      GROUP BY oi.product_name_snapshot
      ORDER BY total_sold DESC, total_revenue DESC
      LIMIT 5
    `);

    // 7. Recent orders
    const [recentOrders] = await db.query(`
      SELECT 
        o.id,
        o.order_number,
        o.recipient_name,
        o.total_amount,
        o.order_status,
        o.payment_status,
        o.payment_method,
        o.created_at,
        u.email AS user_email
      FROM orders o
      INNER JOIN users u ON o.user_id = u.id
      ORDER BY o.id DESC
      LIMIT 6
    `);

    res.json({
      success: true,
      metrics: {
        totalSales: parseFloat(salesResult[0].total_sales),
        totalOrders: salesResult[0].total_orders,
        averageOrderValue: parseFloat(salesResult[0].average_order_value),
        totalProducts: productCountResult[0].total_products,
        totalCustomers: customerCountResult[0].total_customers,
        lowStockCount: lowStockVariants.length
      },
      lowStockVariants,
      salesChartData,
      topSellingProducts,
      recentOrders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products for Admin table with variant counts & stock
// @route   GET /api/admin/products
const getAdminProducts = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;

    let whereClauses = [];
    let params = [];

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      whereClauses.push('(p.name LIKE ? OR b.name LIKE ?)');
      params.push(term, term);
    }

    if (category) {
      whereClauses.push('p.category_id = ?');
      params.push(parseInt(category, 10));
    }

    if (status) {
      whereClauses.push('p.status = ?');
      params.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `
      SELECT 
        p.*,
        c.name AS category_name,
        b.name AS brand_name,
        (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) AS primary_image,
        COALESCE(SUM(pv.stock_quantity), 0) AS total_stock,
        COUNT(pv.id) AS variant_count
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      INNER JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_variants pv ON p.id = pv.product_id
      ${whereSql}
      GROUP BY p.id
      ORDER BY p.id DESC
    `;

    const [products] = await db.query(sql, params);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product with images & default variants
// @route   POST /api/admin/products
const createProduct = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const {
      name,
      category_id,
      brand_id,
      description,
      details,
      price,
      original_price,
      discount_percent = 0,
      playing_surface = 'N/A',
      era,
      image_url,
      is_featured = false,
      is_bestseller = false,
      is_new_arrival = true,
      variants = []
    } = req.body;

    if (!name || !category_id || !brand_id || !price) {
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'Name, category, brand, and price are required fields.'
      });
    }

    // Generate slug
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    await connection.beginTransaction();

    const [prodResult] = await connection.query(
      `INSERT INTO products 
       (category_id, brand_id, name, slug, description, details, price, original_price, discount_percent, playing_surface, era, status, is_featured, is_bestseller, is_new_arrival)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`,
      [
        category_id,
        brand_id,
        name.trim(),
        slug,
        description || 'A timeless football heritage item crafted with premium materials.',
        details || '100% genuine specifications.',
        parseFloat(price),
        original_price ? parseFloat(original_price) : null,
        parseInt(discount_percent, 10) || 0,
        playing_surface || 'N/A',
        era || 'Classic',
        is_featured ? 1 : 0,
        is_bestseller ? 1 : 0,
        is_new_arrival ? 1 : 0
      ]
    );

    const productId = prodResult.insertId;

    // Insert image
    const fallbackImage = 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80';
    await connection.query(
      `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
       VALUES (?, ?, ?, TRUE, 1)`,
      [productId, image_url || fallbackImage, name.trim()]
    );

    // Insert variants
    if (variants && variants.length > 0) {
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        const sku = `${slug.toUpperCase().substring(0, 10)}-${v.size || 'STD'}-${i + 1}`;
        await connection.query(
          `INSERT INTO product_variants (product_id, sku, size, color, stock_quantity, additional_price)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            productId,
            sku,
            v.size || 'One Size',
            v.color || 'Standard',
            parseInt(v.stock_quantity, 10) || 10,
            parseFloat(v.additional_price) || 0.00
          ]
        );
      }
    } else {
      // Default variants
      const defaultSizes = ['S', 'M', 'L', 'XL'];
      for (let i = 0; i < defaultSizes.length; i++) {
        const sku = `${slug.toUpperCase().substring(0, 10)}-${defaultSizes[i]}-${i + 1}`;
        await connection.query(
          `INSERT INTO product_variants (product_id, sku, size, color, stock_quantity, additional_price)
           VALUES (?, ?, ?, ?, ?, 0.00)`,
          [productId, sku, defaultSizes[i], 'Classic', 10]
        );
      }
    }

    await connection.commit();
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      productId
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    next(error);
  }
};

// @desc    Update an existing product
// @route   PUT /api/admin/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      category_id,
      brand_id,
      description,
      details,
      price,
      original_price,
      discount_percent,
      playing_surface,
      era,
      status,
      is_featured,
      is_bestseller,
      is_new_arrival
    } = req.body;

    const [existing] = await db.query('SELECT id FROM products WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    await db.query(
      `UPDATE products 
       SET name = ?, category_id = ?, brand_id = ?, description = ?, details = ?, 
           price = ?, original_price = ?, discount_percent = ?, playing_surface = ?, 
           era = ?, status = ?, is_featured = ?, is_bestseller = ?, is_new_arrival = ?
       WHERE id = ?`,
      [
        name,
        category_id,
        brand_id,
        description,
        details,
        parseFloat(price),
        original_price ? parseFloat(original_price) : null,
        parseInt(discount_percent, 10) || 0,
        playing_surface,
        era,
        status || 'active',
        is_featured ? 1 : 0,
        is_bestseller ? 1 : 0,
        is_new_arrival ? 1 : 0,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Product updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete or archive a product
// @route   DELETE /api/admin/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if product is in order_items
    const [ordersWithProduct] = await db.query(
      'SELECT id FROM order_items WHERE product_id = ? LIMIT 1',
      [id]
    );

    if (ordersWithProduct.length > 0) {
      // Archive instead of hard delete to preserve historical integrity
      await db.query("UPDATE products SET status = 'archived' WHERE id = ?", [id]);
      return res.json({
        success: true,
        message: 'Product has associated historical orders. Status safely set to Archived.'
      });
    }

    await db.query('DELETE FROM products WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Product deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock quantity of a variant
// @route   PUT /api/admin/variants/:id/stock
const updateVariantStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock_quantity } = req.body;

    if (stock_quantity === undefined || isNaN(stock_quantity)) {
      return res.status(400).json({ success: false, message: 'Valid stock quantity is required.' });
    }

    await db.query('UPDATE product_variants SET stock_quantity = ? WHERE id = ?', [
      Math.max(0, parseInt(stock_quantity, 10)),
      id
    ]);

    res.json({
      success: true,
      message: 'Inventory updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
const getAdminOrders = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    let whereClauses = [];
    let params = [];

    if (status) {
      whereClauses.push('o.order_status = ?');
      params.push(status);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      whereClauses.push('(o.order_number LIKE ? OR o.recipient_name LIKE ? OR u.email LIKE ?)');
      params.push(term, term, term);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const sql = `
      SELECT 
        o.*,
        u.name AS user_name,
        u.email AS user_email,
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS total_items
      FROM orders o
      INNER JOIN users u ON o.user_id = u.id
      ${whereSql}
      ORDER BY o.id DESC
    `;

    const [orders] = await db.query(sql, params);

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { order_status, payment_status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (order_status && !validStatuses.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status. Allowed: ' + validStatuses.join(', ')
      });
    }

    let updates = [];
    let params = [];

    if (order_status) {
      updates.push('order_status = ?');
      params.push(order_status);
    }
    if (payment_status) {
      updates.push('payment_status = ?');
      params.push(payment_status);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update.' });
    }

    params.push(id);
    await db.query(`UPDATE orders SET ${updates.join(', ')} WHERE id = ?`, params);

    res.json({
      success: true,
      message: 'Order updated successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registered users for admin
// @route   GET /api/admin/users
const getAdminUsers = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        u.id, u.name, u.email, u.phone, u.role, u.created_at,
        COUNT(o.id) AS orders_count,
        COALESCE(SUM(o.total_amount), 0.00) AS total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id AND o.order_status != 'Cancelled'
      GROUP BY u.id
      ORDER BY u.id DESC
    `;

    const [users] = await db.query(sql);

    res.json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Category management: Create category
// @route   POST /api/admin/categories
const createCategory = async (req, res, next) => {
  try {
    const { name, description, image_url, display_order = 0 } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await db.query(
      'INSERT INTO categories (name, slug, description, image_url, display_order) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), slug, description || null, image_url || null, parseInt(display_order, 10) || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Coupon management: Create coupon
// @route   POST /api/admin/coupons
const createCoupon = async (req, res, next) => {
  try {
    const { code, description, discount_type, discount_value, min_order_amount = 0, expiry_date, usage_limit = 100 } = req.body;

    if (!code || !discount_type || !discount_value || !expiry_date) {
      return res.status(400).json({ success: false, message: 'Code, type, value, and expiry date are required.' });
    }

    await db.query(
      `INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, expiry_date, usage_limit)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        code.trim().toUpperCase(),
        description || null,
        discount_type,
        parseFloat(discount_value),
        parseFloat(min_order_amount) || 0.00,
        expiry_date,
        parseInt(usage_limit, 10) || 100
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all coupons for admin
// @route   GET /api/admin/coupons
const getAdminCoupons = async (req, res, next) => {
  try {
    const [coupons] = await db.query('SELECT * FROM coupons ORDER BY id DESC');
    res.json({
      success: true,
      coupons
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateVariantStock,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  createCategory,
  createCoupon,
  getAdminCoupons
};
