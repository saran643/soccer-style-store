// backend/controllers/couponController.js
const db = require('../config/db');

// @desc    Validate a coupon code and calculate discount
// @route   POST /api/coupons/validate
const validateCoupon = async (req, res, next) => {
  try {
    const { code, subtotal = 0 } = req.body;
    const orderSubtotal = parseFloat(subtotal) || 0;

    if (!code || code.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a coupon code.'
      });
    }

    const cleanCode = code.trim().toUpperCase();

    const [rows] = await db.query(
      'SELECT * FROM coupons WHERE code = ? AND is_active = TRUE',
      [cleanCode]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promotional code.'
      });
    }

    const coupon = rows[0];

    // Check expiry
    const today = new Date().toISOString().split('T')[0];
    if (coupon.expiry_date < today) {
      return res.status(400).json({
        success: false,
        message: 'This promotional code has expired.'
      });
    }

    // Check usage limits
    if (coupon.times_used >= coupon.usage_limit) {
      return res.status(400).json({
        success: false,
        message: 'This promotional code has reached its maximum usage limit.'
      });
    }

    // Check minimum order amount
    if (orderSubtotal < parseFloat(coupon.min_order_amount)) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum subtotal of ₹${parseFloat(coupon.min_order_amount).toFixed(2)}.`
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = (orderSubtotal * parseFloat(coupon.discount_value)) / 100;
      if (coupon.max_discount_amount && discountAmount > parseFloat(coupon.max_discount_amount)) {
        discountAmount = parseFloat(coupon.max_discount_amount);
      }
    } else {
      // Fixed amount
      discountAmount = parseFloat(coupon.discount_value);
      if (discountAmount > orderSubtotal) {
        discountAmount = orderSubtotal;
      }
    }

    discountAmount = parseFloat(discountAmount.toFixed(2));

    res.json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully.`,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discount_type,
        discountValue: parseFloat(coupon.discount_value),
        discountAmount
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCoupon
};
