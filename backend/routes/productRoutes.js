// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getFeaturedCollections,
  quickSearch
} = require('../controllers/productController');

// Homepage collections endpoint
router.get('/featured', getFeaturedCollections);
router.get('/quick-search', quickSearch);

// Standard product list and details
router.get('/', getProducts);
router.get('/:identifier', getProductById);

module.exports = router;
