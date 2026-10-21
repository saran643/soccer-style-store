// backend/controllers/newsletterController.js
const db = require('../config/db');

// @desc    Subscribe to the vintage newsletter
// @route   POST /api/newsletter/subscribe
const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const [existing] = await db.query(
      'SELECT id, is_active FROM newsletter_subscribers WHERE email = ?',
      [cleanEmail]
    );

    if (existing.length > 0) {
      if (!existing[0].is_active) {
        await db.query('UPDATE newsletter_subscribers SET is_active = TRUE WHERE id = ?', [existing[0].id]);
        return res.json({
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.'
        });
      }
      return res.json({
        success: true,
        message: 'You are already subscribed to the RETRO STORE Journal.'
      });
    }

    await db.query('INSERT INTO newsletter_subscribers (email) VALUES (?)', [cleanEmail]);

    res.status(201).json({
      success: true,
      message: 'Welcome to the club. You will receive exclusive archival drops and matchday stories.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribe
};
