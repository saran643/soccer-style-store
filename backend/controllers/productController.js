// backend/controllers/productController.js
const db = require('../config/db');

// @desc    Get all products with filtering, sorting & pagination
// @route   GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      surface,
      era,
      sort,
      search,
      featured,
      bestseller,
      newArrival,
      onSale,
      inStock,
      page = 1,
      limit = 12
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const offset = (pageNum - 1) * pageSize;

    let whereClauses = ["p.status = 'active'"];
    let params = [];

    // Category filter (id or slug)
    if (category) {
      if (isNaN(category)) {
        whereClauses.push('c.slug = ?');
        params.push(category);
      } else {
        whereClauses.push('p.category_id = ?');
        params.push(parseInt(category, 10));
      }
    }

    // Brand filter (id or slug)
    if (brand) {
      if (isNaN(brand)) {
        whereClauses.push('b.slug = ?');
        params.push(brand);
      } else {
        whereClauses.push('p.brand_id = ?');
        params.push(parseInt(brand, 10));
      }
    }

    // Playing surface for boots
    if (surface && surface !== 'ALL' && surface !== 'N/A') {
      whereClauses.push('p.playing_surface = ?');
      params.push(surface);
    }

    // Era
    if (era) {
      whereClauses.push('p.era = ?');
      params.push(era);
    }

    // Price range
    if (minPrice && !isNaN(minPrice)) {
      whereClauses.push('p.price >= ?');
      params.push(parseFloat(minPrice));
    }
    if (maxPrice && !isNaN(maxPrice)) {
      whereClauses.push('p.price <= ?');
      params.push(parseFloat(maxPrice));
    }

    // Keyword search
    if (search && search.trim() !== '') {
      const term = `%${search.trim()}%`;
      whereClauses.push('(p.name LIKE ? OR p.description LIKE ? OR b.name LIKE ? OR c.name LIKE ?)');
      params.push(term, term, term, term);
    }

    // Flags
    if (featured === 'true' || featured === '1') {
      whereClauses.push('p.is_featured = TRUE');
    }
    if (bestseller === 'true' || bestseller === '1') {
      whereClauses.push('p.is_bestseller = TRUE');
    }
    if (newArrival === 'true' || newArrival === '1') {
      whereClauses.push('p.is_new_arrival = TRUE');
    }
    if (onSale === 'true' || onSale === '1') {
      whereClauses.push('p.discount_percent > 0');
    }

    // In-stock only filter
    if (inStock === 'true' || inStock === '1') {
      whereClauses.push('EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.stock_quantity > 0)');
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Sorting
    let orderBySql = 'ORDER BY p.is_featured DESC, p.id DESC';
    switch (sort) {
      case 'price_asc':
        orderBySql = 'ORDER BY p.price ASC';
        break;
      case 'price_desc':
        orderBySql = 'ORDER BY p.price DESC';
        break;
      case 'newest':
        orderBySql = 'ORDER BY p.id DESC';
        break;
      case 'rating':
        orderBySql = 'ORDER BY p.rating DESC, p.review_count DESC';
        break;
      case 'bestseller':
        orderBySql = 'ORDER BY p.is_bestseller DESC, p.rating DESC';
        break;
      default:
        orderBySql = 'ORDER BY p.is_featured DESC, p.id DESC';
        break;
    }

    // Count query
    const countSql = `
      SELECT COUNT(DISTINCT p.id) AS total
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      INNER JOIN brands b ON p.brand_id = b.id
      ${whereSql}
    `;
    const [countResult] = await db.query(countSql, params);
    const totalItems = countResult[0].total;

    // Data query
    const dataSql = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.original_price,
        p.discount_percent,
        p.playing_surface,
        p.era,
        p.is_featured,
        p.is_bestseller,
        p.is_new_arrival,
        p.rating,
        p.review_count,
        c.id AS category_id,
        c.name AS category_name,
        c.slug AS category_slug,
        b.id AS brand_id,
        b.name AS brand_name,
        b.slug AS brand_slug,
        (
          SELECT pi.image_url 
          FROM product_images pi 
          WHERE pi.product_id = p.id 
          ORDER BY pi.is_primary DESC, pi.display_order ASC 
          LIMIT 1
        ) AS primary_image,
        (
          SELECT SUM(pv.stock_quantity)
          FROM product_variants pv
          WHERE pv.product_id = p.id
        ) AS total_stock
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      INNER JOIN brands b ON p.brand_id = b.id
      ${whereSql}
      ${orderBySql}
      LIMIT ? OFFSET ?
    `;

    const dataParams = [...params, pageSize, offset];
    const [products] = await db.query(dataSql, dataParams);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product details by ID or Slug
// @route   GET /api/products/:identifier
const getProductById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const isId = !isNaN(identifier);

    const productSql = `
      SELECT 
        p.*,
        c.id AS category_id,
        c.name AS category_name,
        c.slug AS category_slug,
        b.id AS brand_id,
        b.name AS brand_name,
        b.slug AS brand_slug,
        b.logo_url AS brand_logo
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      INNER JOIN brands b ON p.brand_id = b.id
      WHERE ${isId ? 'p.id = ?' : 'p.slug = ?'}
    `;

    const [products] = await db.query(productSql, [isId ? parseInt(identifier, 10) : identifier]);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    const product = products[0];

    // Fetch images
    const [images] = await db.query(
      'SELECT id, image_url, alt_text, is_primary, display_order FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC',
      [product.id]
    );

    // Fetch variants
    const [variants] = await db.query(
      'SELECT id, sku, size, color, stock_quantity, additional_price FROM product_variants WHERE product_id = ? ORDER BY id ASC',
      [product.id]
    );

    // Fetch reviews
    const [reviews] = await db.query(
      `SELECT r.id, r.rating, r.review_title, r.review_text, r.is_verified_buyer, r.created_at, u.name AS reviewer_name
       FROM reviews r
       INNER JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [product.id]
    );

    // Fetch related products (same category, different id)
    const [related] = await db.query(
      `SELECT 
        p.id, p.name, p.slug, p.price, p.original_price, p.discount_percent, p.rating,
        b.name AS brand_name,
        (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) AS primary_image
       FROM products p
       INNER JOIN brands b ON p.brand_id = b.id
       WHERE p.category_id = ? AND p.id != ? AND p.status = 'active'
       LIMIT 4`,
      [product.category_id, product.id]
    );

    res.json({
      success: true,
      product: {
        ...product,
        images,
        variants,
        reviews,
        related
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get homepage collections & featured products
// @route   GET /api/products/homepage/featured
const getFeaturedCollections = async (req, res, next) => {
  try {
    const baseQuery = `
      SELECT 
        p.id, p.name, p.slug, p.price, p.original_price, p.discount_percent, 
        p.playing_surface, p.era, p.rating, p.review_count,
        b.name AS brand_name,
        c.name AS category_name,
        (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) AS primary_image
      FROM products p
      INNER JOIN brands b ON p.brand_id = b.id
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
    `;

    const [bestSellers] = await db.query(`${baseQuery} AND p.is_bestseller = TRUE ORDER BY p.rating DESC LIMIT 8`);
    const [newArrivals] = await db.query(`${baseQuery} AND p.is_new_arrival = TRUE ORDER BY p.id DESC LIMIT 8`);
    const [theArchive] = await db.query(`${baseQuery} AND p.category_id = 1 ORDER BY p.is_featured DESC, p.id DESC LIMIT 8`); // Retro Jerseys
    const [matchdayEssentials] = await db.query(`${baseQuery} AND p.category_id IN (2, 3, 4) ORDER BY p.is_bestseller DESC LIMIT 8`); // Boots, Socks, Shin Guards
    const [specialOffers] = await db.query(`${baseQuery} AND p.discount_percent >= 18 ORDER BY p.discount_percent DESC LIMIT 8`);

    res.json({
      success: true,
      bestSellers,
      newArrivals,
      theArchive,
      matchdayEssentials,
      specialOffers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fast search products (for navbar live search)
// @route   GET /api/products/quick-search
const quickSearch = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.json({ success: true, results: [] });
    }

    const term = `%${q.trim()}%`;
    const sql = `
      SELECT 
        p.id, p.name, p.slug, p.price, p.original_price, p.discount_percent,
        b.name AS brand_name,
        c.name AS category_name,
        (SELECT image_url FROM product_images pi WHERE pi.product_id = p.id ORDER BY is_primary DESC LIMIT 1) AS primary_image
      FROM products p
      INNER JOIN brands b ON p.brand_id = b.id
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active' AND (p.name LIKE ? OR b.name LIKE ? OR c.name LIKE ?)
      LIMIT 8
    `;

    const [results] = await db.query(sql, [term, term, term]);

    res.json({
      success: true,
      results
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFeaturedCollections,
  quickSearch
};
