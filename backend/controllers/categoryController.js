// backend/controllers/categoryController.js
const db = require('../config/db');

// @desc    Get all categories with active product count
// @route   GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        c.id, c.name, c.slug, c.description, c.image_url, c.display_order,
        COUNT(p.id) AS product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
      GROUP BY c.id, c.name, c.slug, c.description, c.image_url, c.display_order
      ORDER BY c.display_order ASC, c.id ASC
    `;
    const [categories] = await db.query(sql);

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by slug
// @route   GET /api/categories/:slug
const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.query('SELECT * FROM categories WHERE slug = ?', [slug]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    res.json({
      success: true,
      category: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug
};
