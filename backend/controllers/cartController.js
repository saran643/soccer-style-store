// backend/controllers/cartController.js
const db = require('../config/db');

// Helper to get or create cart for user
const getOrCreateCartId = async (userId) => {
  const [rows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
  if (rows.length > 0) {
    return rows[0].id;
  }
  const [result] = await db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
  return result.insertId;
};

// @desc    Get user's shopping cart
// @route   GET /api/cart
const getCart = async (req, res, next) => {
  try {
    const cartId = await getOrCreateCartId(req.user.id);

    const sql = `
      SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        pv.id AS variant_id,
        pv.sku,
        pv.size,
        pv.color,
        pv.stock_quantity,
        pv.additional_price,
        p.id AS product_id,
        p.name AS product_name,
        p.slug AS product_slug,
        p.price,
        p.original_price,
        p.discount_percent,
        (p.price + pv.additional_price) AS effective_price,
        b.name AS brand_name,
        (
          SELECT image_url 
          FROM product_images pi 
          WHERE pi.product_id = p.id 
          ORDER BY pi.is_primary DESC, pi.display_order ASC 
          LIMIT 1
        ) AS primary_image
      FROM cart_items ci
      INNER JOIN product_variants pv ON ci.variant_id = pv.id
      INNER JOIN products p ON pv.product_id = p.id
      INNER JOIN brands b ON p.brand_id = b.id
      WHERE ci.cart_id = ? AND p.status = 'active'
      ORDER BY ci.id DESC
    `;

    const [items] = await db.query(sql, [cartId]);

    let subtotal = 0;
    let totalItems = 0;

    const formattedItems = items.map((item) => {
      const lineSubtotal = parseFloat(item.effective_price) * item.quantity;
      subtotal += lineSubtotal;
      totalItems += item.quantity;
      return {
        ...item,
        lineSubtotal: parseFloat(lineSubtotal.toFixed(2)),
        isStockAvailable: item.stock_quantity >= item.quantity
      };
    });

    // Standard Indian shipping calculation: Free over ₹1,999, else ₹149
    const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0.00 : 149.00;
    const totalAmount = subtotal + shippingFee;

    res.json({
      success: true,
      cart: {
        cartId,
        items: formattedItems,
        totalItems,
        subtotal: parseFloat(subtotal.toFixed(2)),
        shippingFee: parseFloat(shippingFee.toFixed(2)),
        freeShippingThreshold: 1999.00,
        amountUntilFreeShipping: Math.max(0, parseFloat((1999.00 - subtotal).toFixed(2))),
        totalAmount: parseFloat(totalAmount.toFixed(2))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item/variant to cart
// @route   POST /api/cart/items
const addToCart = async (req, res, next) => {
  try {
    const { variantId, quantity = 1 } = req.body;
    const qty = Math.max(1, parseInt(quantity, 10));

    if (!variantId) {
      return res.status(400).json({
        success: false,
        message: 'Product variant is required.'
      });
    }

    // Verify variant and check stock
    const [variantRows] = await db.query(
      `SELECT pv.*, p.name AS product_name, p.status 
       FROM product_variants pv 
       INNER JOIN products p ON pv.product_id = p.id 
       WHERE pv.id = ?`,
      [variantId]
    );

    if (variantRows.length === 0 || variantRows[0].status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Product variant is unavailable.'
      });
    }

    const variant = variantRows[0];
    const cartId = await getOrCreateCartId(req.user.id);

    // Check if variant is already in cart
    const [existing] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND variant_id = ?',
      [cartId, variantId]
    );

    let newQuantity = qty;

    if (existing.length > 0) {
      newQuantity = existing[0].quantity + qty;
      if (newQuantity > variant.stock_quantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add more. Only ${variant.stock_quantity} available in stock.`
        });
      }

      await db.query(
        'UPDATE cart_items SET quantity = ? WHERE id = ?',
        [newQuantity, existing[0].id]
      );
    } else {
      if (qty > variant.stock_quantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add ${qty} units. Only ${variant.stock_quantity} available in stock.`
        });
      }

      await db.query(
        'INSERT INTO cart_items (cart_id, variant_id, quantity) VALUES (?, ?, ?)',
        [cartId, variantId, qty]
      );
    }

    res.json({
      success: true,
      message: `${variant.product_name} (${variant.size}) added to your bag.`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quantity of an item in cart
// @route   PUT /api/cart/items/:id
const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10);

    const cartId = await getOrCreateCartId(req.user.id);

    if (qty <= 0) {
      await db.query('DELETE FROM cart_items WHERE id = ? AND cart_id = ?', [id, cartId]);
      return res.json({
        success: true,
        message: 'Item removed from your cart.'
      });
    }

    // Check stock
    const [itemRows] = await db.query(
      `SELECT ci.id, pv.stock_quantity, p.name AS product_name 
       FROM cart_items ci
       INNER JOIN product_variants pv ON ci.variant_id = pv.id
       INNER JOIN products p ON pv.product_id = p.id
       WHERE ci.id = ? AND ci.cart_id = ?`,
      [id, cartId]
    );

    if (itemRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found.'
      });
    }

    if (qty > itemRows[0].stock_quantity) {
      return res.status(400).json({
        success: false,
        message: `Maximum available stock is ${itemRows[0].stock_quantity}.`
      });
    }

    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [qty, id]);

    res.json({
      success: true,
      message: 'Cart updated.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove an item from cart
// @route   DELETE /api/cart/items/:id
const removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartId = await getOrCreateCartId(req.user.id);

    await db.query('DELETE FROM cart_items WHERE id = ? AND cart_id = ?', [id, cartId]);

    res.json({
      success: true,
      message: 'Item removed from your cart.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
const clearCart = async (req, res, next) => {
  try {
    const cartId = await getOrCreateCartId(req.user.id);
    await db.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);

    res.json({
      success: true,
      message: 'Cart cleared.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
};
