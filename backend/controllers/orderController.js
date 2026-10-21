// backend/controllers/orderController.js
const db = require('../config/db');

// @desc    Create a new order (Transaction-safe with stock reservation)
// @route   POST /api/orders
const createOrder = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const {
      addressId,
      shippingAddressData,
      couponCode,
      paymentMethod = 'cod',
      notes
    } = req.body;

    const userId = req.user.id;

    // 1. Get user cart
    const [cartRows] = await connection.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
    if (cartRows.length === 0) {
      connection.release();
      return res.status(400).json({ success: false, message: 'Shopping cart not found.' });
    }
    const cartId = cartRows[0].id;

    // 2. Fetch cart items
    const [cartItems] = await connection.query(
      'SELECT id, variant_id, quantity FROM cart_items WHERE cart_id = ?',
      [cartId]
    );

    if (cartItems.length === 0) {
      connection.release();
      return res.status(400).json({ success: false, message: 'Your shopping cart is empty.' });
    }

    // Begin database transaction
    await connection.beginTransaction();

    // 3. Address resolution
    let finalRecipient = req.user.name;
    let finalPhone = req.user.phone || '';
    let finalAddressText = '';
    let finalAddressId = null;

    if (addressId) {
      const [addrRows] = await connection.query(
        'SELECT * FROM addresses WHERE id = ? AND user_id = ?',
        [addressId, userId]
      );
      if (addrRows.length > 0) {
        const a = addrRows[0];
        finalAddressId = a.id;
        finalRecipient = a.recipient_name;
        finalPhone = a.phone;
        finalAddressText = `${a.address_line1}${a.address_line2 ? ', ' + a.address_line2 : ''}, ${a.city}, ${a.state ? a.state + ', ' : ''}${a.postal_code}, ${a.country}`;
      }
    } else if (shippingAddressData) {
      const { recipient_name, phone, address_line1, address_line2, city, state, postal_code, country, saveAddress } = shippingAddressData;
      if (!recipient_name || !phone || !address_line1 || !city || !postal_code) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ success: false, message: 'Incomplete shipping address information.' });
      }
      finalRecipient = recipient_name;
      finalPhone = phone;
      finalAddressText = `${address_line1}${address_line2 ? ', ' + address_line2 : ''}, ${city}, ${state ? state + ', ' : ''}${postal_code}, ${country || 'India'}`;

      if (saveAddress) {
        const [addrRes] = await connection.query(
          `INSERT INTO addresses (user_id, recipient_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
          [userId, recipient_name, phone, address_line1, address_line2 || null, city, state || '', postal_code, country || 'India']
        );
        finalAddressId = addrRes.insertId;
      }
    } else {
      await connection.rollback();
      connection.release();
      return res.status(400).json({ success: false, message: 'Please provide a valid shipping address.' });
    }

    // 4. Validate stock with FOR UPDATE lock and calculate subtotal
    let subtotal = 0;
    const validatedItems = [];

    for (const item of cartItems) {
      const [variantRows] = await connection.query(
        `SELECT pv.*, p.id AS product_id, p.name AS product_name, p.price, p.status 
         FROM product_variants pv 
         INNER JOIN products p ON pv.product_id = p.id 
         WHERE pv.id = ? 
         FOR UPDATE`,
        [item.variant_id]
      );

      if (variantRows.length === 0 || variantRows[0].status !== 'active') {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: 'One or more items in your cart are no longer available.'
        });
      }

      const variant = variantRows[0];

      if (variant.stock_quantity < item.quantity) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for ${variant.product_name} (${variant.size}). Available: ${variant.stock_quantity}, Requested: ${item.quantity}.`
        });
      }

      const unitPrice = parseFloat(variant.price) + parseFloat(variant.additional_price);
      const lineSubtotal = unitPrice * item.quantity;
      subtotal += lineSubtotal;

      validatedItems.push({
        variantId: variant.id,
        productId: variant.product_id,
        productName: variant.product_name,
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
        unitPrice,
        quantity: item.quantity,
        subtotal: parseFloat(lineSubtotal.toFixed(2)),
        currentStock: variant.stock_quantity
      });
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    // 5. Coupon calculation
    let discountAmount = 0;
    let appliedCouponCode = null;

    if (couponCode && couponCode.trim() !== '') {
      const [couponRows] = await connection.query(
        'SELECT * FROM coupons WHERE code = ? AND is_active = TRUE FOR UPDATE',
        [couponCode.trim().toUpperCase()]
      );

      if (couponRows.length > 0) {
        const cp = couponRows[0];
        const today = new Date().toISOString().split('T')[0];

        if (cp.expiry_date >= today && cp.times_used < cp.usage_limit && subtotal >= parseFloat(cp.min_order_amount)) {
          if (cp.discount_type === 'percentage') {
            discountAmount = (subtotal * parseFloat(cp.discount_value)) / 100;
            if (cp.max_discount_amount && discountAmount > parseFloat(cp.max_discount_amount)) {
              discountAmount = parseFloat(cp.max_discount_amount);
            }
          } else {
            discountAmount = Math.min(subtotal, parseFloat(cp.discount_value));
          }
          discountAmount = parseFloat(discountAmount.toFixed(2));
          appliedCouponCode = cp.code;

          // Increment coupon usage
          await connection.query('UPDATE coupons SET times_used = times_used + 1 WHERE id = ?', [cp.id]);
        }
      }
    }

    // 6. Shipping fee calculation (Free over ₹1,999, else ₹149)
    const shippingFee = (subtotal - discountAmount) >= 1999 ? 0.00 : 149.00;
    const totalAmount = parseFloat((subtotal - discountAmount + shippingFee).toFixed(2));

    // 7. Generate order number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `RETRO-${dateStr}-${randomSuffix}`;

    // Payment status
    const isPaidOnline = paymentMethod === 'card' || paymentMethod === 'online_demo';
    const paymentStatus = isPaidOnline ? 'paid' : 'pending';
    const orderStatus = isPaidOnline ? 'Confirmed' : 'Pending';

    // 8. Insert into orders table
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
       (order_number, user_id, address_id, recipient_name, shipping_address, phone, subtotal, discount_amount, coupon_code, shipping_fee, total_amount, payment_method, payment_status, order_status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        userId,
        finalAddressId,
        finalRecipient,
        finalAddressText,
        finalPhone,
        subtotal,
        discountAmount,
        appliedCouponCode,
        shippingFee,
        totalAmount,
        paymentMethod,
        paymentStatus,
        orderStatus,
        notes || null
      ]
    );

    const orderId = orderResult.insertId;

    // 9. Insert order_items and decrement variant stock
    for (const item of validatedItems) {
      await connection.query(
        `INSERT INTO order_items 
         (order_id, variant_id, product_id, product_name_snapshot, sku_snapshot, size_snapshot, color_snapshot, unit_price, quantity, subtotal)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.variantId,
          item.productId,
          item.productName,
          item.sku,
          item.size,
          item.color,
          item.unitPrice,
          item.quantity,
          item.subtotal
        ]
      );

      // Decrement stock safely
      await connection.query(
        'UPDATE product_variants SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.variantId]
      );
    }

    // 10. Record payment entry
    const txnRef = `TXN-${orderNumber}-${Math.floor(100000 + Math.random() * 900000)}`;
    await connection.query(
      `INSERT INTO payments (order_id, payment_method, transaction_reference, amount, payment_status)
       VALUES (?, ?, ?, ?, ?)`,
      [orderId, paymentMethod, txnRef, totalAmount, isPaidOnline ? 'completed' : 'pending']
    );

    // 11. Clear user cart
    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

    // Commit transaction
    await connection.commit();
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully. Thank you for shopping with RETRO STORE.',
      order: {
        id: orderId,
        orderNumber,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        orderStatus,
        paymentStatus,
        paymentMethod,
        recipientName: finalRecipient,
        shippingAddress: finalAddressText,
        itemsCount: validatedItems.length
      }
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    next(error);
  }
};

// @desc    Get current user orders
// @route   GET /api/orders
const getMyOrders = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        o.id, o.order_number, o.subtotal, o.discount_amount, o.coupon_code,
        o.shipping_fee, o.total_amount, o.payment_method, o.payment_status,
        o.order_status, o.created_at,
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS total_items
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.id DESC
    `;

    const [orders] = await db.query(sql, [req.user.id]);

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by order ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if customer owns this order, or if admin
    const isAdmin = req.user.role === 'admin';
    const orderSql = `
      SELECT o.*, u.name AS user_name, u.email AS user_email
      FROM orders o
      INNER JOIN users u ON o.user_id = u.id
      WHERE (o.id = ? OR o.order_number = ?) ${!isAdmin ? 'AND o.user_id = ?' : ''}
    `;

    const params = !isAdmin ? [id, id, req.user.id] : [id, id];
    const [orders] = await db.query(orderSql, params);

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    const order = orders[0];

    // Fetch order items with primary image
    const [items] = await db.query(
      `SELECT oi.*, 
        (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = oi.product_id ORDER BY pi.is_primary DESC LIMIT 1) AS product_image
       FROM order_items oi
       WHERE oi.order_id = ?`,
      [order.id]
    );

    // Fetch payment record
    const [payments] = await db.query(
      'SELECT * FROM payments WHERE order_id = ?',
      [order.id]
    );

    res.json({
      success: true,
      order: {
        ...order,
        items,
        payments
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById
};
