// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getProductReviews, addReview } = require('../controllers/reviewController');
const { authenticateUser } = require('../middleware/auth');

router.get('/product/:productId', getProductReviews);
router.post('/', authenticateUser, addReview);

module.exports = router;
