// backend/routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');
const { authenticateUser } = require('../middleware/auth');

router.use(authenticateUser);

router.get('/', getWishlist);
router.post('/items', addToWishlist);
router.delete('/items/:productId', removeFromWishlist);

module.exports = router;
