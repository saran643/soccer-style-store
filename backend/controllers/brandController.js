// backend/controllers/brandController.js
const db = require('../config/db');

// @desc    Get all brands with active product count
// @route   GET /api/brands
const getBrands = async (req, res, next) => {
  try {
    const sql = `
      SELECT 
        b.id, b.name, b.slug, b.logo_url, b.description,
        COUNT(p.id) AS product_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id AND p.status = 'active'
      GROUP BY b.id, b.name, b.slug, b.logo_url, b.description
      ORDER BY b.name ASC
    `;
    const [brands] = await db.query(sql);

    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBrands
};
