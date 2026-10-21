// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('retro_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token expiry or auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and has token, clear expired token
      if (localStorage.getItem('retro_token')) {
        localStorage.removeItem('retro_token');
        localStorage.removeItem('retro_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  getAddresses: () => API.get('/auth/addresses'),
  addAddress: (data) => API.post('/auth/addresses', data),
  deleteAddress: (id) => API.delete(`/auth/addresses/${id}`)
};

// Product & Category Services
export const productService = {
  getProducts: (params) => API.get('/products', { params }),
  getProductById: (id) => API.get(`/products/${id}`),
  getFeatured: () => API.get('/products/featured'),
  quickSearch: (q) => API.get('/products/quick-search', { params: { q } }),
  getCategories: () => API.get('/categories'),
  getCategoryBySlug: (slug) => API.get(`/categories/${slug}`),
  getBrands: () => API.get('/brands')
};

// Cart Services
export const cartService = {
  getCart: () => API.get('/cart'),
  addToCart: (variantId, quantity = 1) => API.post('/cart/items', { variantId, quantity }),
  updateQuantity: (cartItemId, quantity) => API.put(`/cart/items/${cartItemId}`, { quantity }),
  removeItem: (cartItemId) => API.delete(`/cart/items/${cartItemId}`),
  clearCart: () => API.delete('/cart')
};

// Wishlist Services
export const wishlistService = {
  getWishlist: () => API.get('/wishlist'),
  addToWishlist: (productId) => API.post('/wishlist/items', { productId }),
  removeFromWishlist: (productId) => API.delete(`/wishlist/items/${productId}`)
};

// Coupon Services
export const couponService = {
  validateCoupon: (code, subtotal) => API.post('/coupons/validate', { code, subtotal })
};

// Order Services
export const orderService = {
  createOrder: (orderData) => API.post('/orders', orderData),
  getMyOrders: () => API.get('/orders'),
  getOrderById: (id) => API.get(`/orders/${id}`)
};

// Review Services
export const reviewService = {
  getProductReviews: (productId) => API.get(`/reviews/product/${productId}`),
  addReview: (reviewData) => API.post('/reviews', reviewData)
};

// Newsletter
export const newsletterService = {
  subscribe: (email) => API.post('/newsletter/subscribe', { email })
};

// Admin Services
export const adminService = {
  getDashboardStats: () => API.get('/admin/dashboard'),
  getProducts: (params) => API.get('/admin/products', { params }),
  createProduct: (data) => API.post('/admin/products', data),
  updateProduct: (id, data) => API.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/admin/products/${id}`),
  updateVariantStock: (variantId, stock) => API.put(`/admin/variants/${variantId}/stock`, { stock_quantity: stock }),
  getOrders: (params) => API.get('/admin/orders', { params }),
  updateOrderStatus: (id, statusData) => API.put(`/admin/orders/${id}/status`, statusData),
  getUsers: () => API.get('/admin/users'),
  createCategory: (data) => API.post('/admin/categories', data),
  getCoupons: () => API.get('/admin/coupons'),
  createCoupon: (data) => API.post('/admin/coupons', data)
};

export default API;
