// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'retro_store_super_secret_jwt_key_2026_the_beautiful_game',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Register a new customer
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.'
      });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.toLowerCase().trim(), passwordHash, phone || null, 'customer']
    );

    const userId = result.insertId;

    // Initialize an empty cart & wishlist for the new user
    await db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    await db.query('INSERT INTO wishlists (user_id) VALUES (?)', [userId]);

    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Welcome to RETRO STORE.',
      token,
      user: {
        id: userId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone || null,
        role: 'customer'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate customer or admin
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const [users] = await db.query(
      'SELECT id, name, email, password_hash, phone, role FROM users WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Ensure cart exists
    const [cartCheck] = await db.query('SELECT id FROM carts WHERE user_id = ?', [user.id]);
    if (cartCheck.length === 0) {
      await db.query('INSERT INTO carts (user_id) VALUES (?)', [user.id]);
    }

    // Ensure wishlist exists
    const [wishCheck] = await db.query('SELECT id FROM wishlists WHERE user_id = ?', [user.id]);
    if (wishCheck.length === 0) {
      await db.query('INSERT INTO wishlists (user_id) VALUES (?)', [user.id]);
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}.`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const [addresses] = await db.query(
      'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC',
      [req.user.id]
    );

    res.json({
      success: true,
      user: {
        ...req.user,
        addresses
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, currentPassword, newPassword } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot be empty.'
      });
    }

    let passwordUpdateSql = '';
    const params = [name.trim(), phone || null];

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to set a new password.'
        });
      }

      const [users] = await db.query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
      const isMatch = await bcrypt.compare(currentPassword, users[0].password_hash);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect current password.'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(newPassword, salt);
      passwordUpdateSql = ', password_hash = ?';
      params.push(newHash);
    }

    params.push(req.user.id);

    await db.query(
      `UPDATE users SET name = ?, phone = ? ${passwordUpdateSql} WHERE id = ?`,
      params
    );

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: req.user.id,
        name: name.trim(),
        email: req.user.email,
        phone: phone || null,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user delivery addresses
// @route   GET /api/auth/addresses
const getAddresses = async (req, res, next) => {
  try {
    const [addresses] = await db.query(
      'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC',
      [req.user.id]
    );

    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add delivery address
// @route   POST /api/auth/addresses
const addAddress = async (req, res, next) => {
  try {
    const { recipient_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default } = req.body;

    if (!recipient_name || !phone || !address_line1 || !city || !postal_code) {
      return res.status(400).json({
        success: false,
        message: 'Recipient name, phone, address line 1, city, and postal code are required.'
      });
    }

    if (is_default) {
      await db.query('UPDATE addresses SET is_default = FALSE WHERE user_id = ?', [req.user.id]);
    }

    const [result] = await db.query(
      `INSERT INTO addresses 
       (user_id, recipient_name, phone, address_line1, address_line2, city, state, postal_code, country, is_default)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        recipient_name,
        phone,
        address_line1,
        address_line2 || null,
        city,
        state || '',
        postal_code,
        country || 'United Kingdom',
        is_default ? 1 : 0
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Address saved successfully.',
      addressId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete delivery address
// @route   DELETE /api/auth/addresses/:id
const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM addresses WHERE id = ? AND user_id = ?', [id, req.user.id]);

    res.json({
      success: true,
      message: 'Address deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  getAddresses,
  addAddress,
  deleteAddress
};
