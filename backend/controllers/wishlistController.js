// backend/controllers/wishlistController.js
const db = require('../config/db');

const getOrCreateWishlistId = async (userId) => {
  const [rows] = await db.query('SELECT id FROM wishlists WHERE user_id = ?', [userId]);
  if (rows.length > 0) {
    return rows[0].id;
  }
  const [result] = await db.query('INSERT INTO wishlists (user_id) VALUES (?)', [userId]);
  return result.insertId;
};

// @desc    Get user's wishlist
// @route   GET /api/wishlist
const getWishlist = async (req, res, next) => {
  try {
    const wishlistId = await getOrCreateWishlistId(req.user.id);

    const sql = `
      SELECT 
        wi.id AS wishlist_item_id,
        p.id AS product_id,
        p.name,
        p.slug,
        p.price,
        p.original_price,
        p.discount_percent,
        p.rating,
        p.review_count,
        b.name AS brand_name,
        c.name AS category_name,
        (
          SELECT image_url 
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
      FROM wishlist_items wi
      INNER JOIN products p ON wi.product_id = p.id
      INNER JOIN brands b ON p.brand_id = b.id
      INNER JOIN categories c ON p.category_id = c.id
      WHERE wi.wishlist_id = ? AND p.status = 'active'
      ORDER BY wi.id DESC
    `;

    const [items] = await db.query(sql, [wishlistId]);

    res.json({
      success: true,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/items
const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.'
      });
    }

    const wishlistId = await getOrCreateWishlistId(req.user.id);

    // Check if already in wishlist
    const [existing] = await db.query(
      'SELECT id FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
      [wishlistId, productId]
    );

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: 'Item is already in your wishlist.'
      });
    }

    await db.query(
      'INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)',
      [wishlistId, productId]
    );

    res.status(201).json({
      success: true,
      message: 'Added to your archive wishlist.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/items/:productId
const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const wishlistId = await getOrCreateWishlistId(req.user.id);

    await db.query(
      'DELETE FROM wishlist_items WHERE wishlist_id = ? AND (product_id = ? OR id = ?)',
      [wishlistId, productId, productId]
    );

    res.json({
      success: true,
      message: 'Item removed from wishlist.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
