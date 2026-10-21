// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  getAddresses,
  addAddress,
  deleteAddress
} = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateUser, getMe);
router.put('/profile', authenticateUser, updateProfile);

// Address management
router.get('/addresses', authenticateUser, getAddresses);
router.post('/addresses', authenticateUser, addAddress);
router.delete('/addresses/:id', authenticateUser, deleteAddress);

module.exports = router;
