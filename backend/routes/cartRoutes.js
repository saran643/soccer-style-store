// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');
const { authenticateUser } = require('../middleware/auth');

router.use(authenticateUser);

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:id', updateCartItemQuantity);
router.delete('/items/:id', removeCartItem);
router.delete('/', clearCart);

module.exports = router;
