// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateVariantStock,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  createCategory,
  createCoupon,
  getAdminCoupons
} = require('../controllers/adminController');
const { authenticateUser, requireAdmin } = require('../middleware/auth');

// Protect all admin endpoints
router.use(authenticateUser, requireAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Products
router.get('/products', getAdminProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.put('/variants/:id/stock', updateVariantStock);

// Orders
router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Users
router.get('/users', getAdminUsers);

// Categories
router.post('/categories', createCategory);

// Coupons
router.get('/coupons', getAdminCoupons);
router.post('/coupons', createCoupon);

module.exports = router;
