// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authenticateUser = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No token provided.'
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'retro_store_super_secret_jwt_key_2026_the_beautiful_game'
    );

    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.'
      });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token.'
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrative privileges required.'
    });
  }
  next();
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'retro_store_super_secret_jwt_key_2026_the_beautiful_game'
      );
      const [rows] = await db.query(
        'SELECT id, name, email, phone, role FROM users WHERE id = ?',
        [decoded.id]
      );
      if (rows.length > 0) {
        req.user = rows[0];
      }
    }
  } catch (err) {
    // Silently continue for optional auth
  }
  next();
};

module.exports = {
  authenticateUser,
  requireAdmin,
  optionalAuth
};
