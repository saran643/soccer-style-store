// backend/controllers/reviewController.js
const db = require('../config/db');

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const sql = `
      SELECT r.id, r.rating, r.review_title, r.review_text, r.is_verified_buyer, r.created_at, u.name AS reviewer_name
      FROM reviews r
      INNER JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ?
      ORDER BY r.created_at DESC
    `;

    const [reviews] = await db.query(sql, [productId]);

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review for a product
// @route   POST /api/reviews
const addReview = async (req, res, next) => {
  try {
    const { productId, rating, reviewTitle, reviewText } = req.body;
    const numRating = parseInt(rating, 10);

    if (!productId || !numRating || !reviewText) {
      return res.status(400).json({
        success: false,
        message: 'Product, rating (1-5), and review text are required.'
      });
    }

    if (numRating < 1 || numRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5 stars.'
      });
    }

    // Check if user already reviewed this product
    const [existing] = await db.query(
      'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this product.'
      });
    }

    // Insert review
    await db.query(
      `INSERT INTO reviews (user_id, product_id, rating, review_title, review_text, is_verified_buyer)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      [req.user.id, productId, numRating, reviewTitle || null, reviewText.trim()]
    );

    // Recalculate average rating & review count for the product
    const [agg] = await db.query(
      'SELECT COUNT(*) AS count, AVG(rating) AS avg_rating FROM reviews WHERE product_id = ?',
      [productId]
    );

    const count = agg[0].count;
    const avg = parseFloat(agg[0].avg_rating).toFixed(2);

    await db.query(
      'UPDATE products SET rating = ?, review_count = ? WHERE id = ?',
      [avg, count, productId]
    );

    res.status(201).json({
      success: true,
      message: 'Thank you for your review.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  addReview
};
