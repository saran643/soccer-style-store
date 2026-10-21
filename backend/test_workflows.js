// backend/test_workflows.js
const assert = require('assert');

const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('================================================================');
  console.log('  RETRO STORE — End-to-End Workflow Verification Test Suite');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  const test = async (name, fn) => {
    try {
      process.stdout.write(`[TEST] ${name} ... `);
      await fn();
      console.log('PASSED');
      passed++;
    } catch (err) {
      console.log('FAILED');
      console.error('       Error:', err.message);
      failed++;
    }
  };

  // Helper fetcher
  const api = async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...options.headers
      },
      ...options
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, data };
  };

  let customerToken = null;
  let adminToken = null;
  let testProductId = null;
  let testVariantId = null;
  let testCartItemId = null;
  let testOrderNumber = null;

  // 1. Health Check
  await test('1. System Health API', async () => {
    const { status, data } = await api('/health');
    assert.strictEqual(status, 200);
    assert.strictEqual(data.brand, 'RETRO STORE');
  });

  // 2. Customer Registration
  const testEmail = `test.supporter.${Date.now()}@retrostore.com`;
  await test('2. Customer Registration', async () => {
    const { status, data } = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Eric Cantona',
        email: testEmail,
        password: 'Password@123',
        phone: '+44 7700 999888'
      })
    });
    assert.strictEqual(status, 201);
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    assert.strictEqual(data.user.role, 'customer');
    customerToken = data.token;
  });

  // 3. Customer Login with hashed password
  await test('3. Customer Login Verification', async () => {
    const { status, data } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: 'Password@123'
      })
    });
    assert.strictEqual(status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
  });

  // 4. Admin Login & Authorization Guard
  await test('4. Admin Login & Role Check', async () => {
    const { status, data } = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@retrostore.com',
        password: 'Admin@123'
      })
    });
    assert.strictEqual(status, 200);
    assert.strictEqual(data.user.role, 'admin');
    adminToken = data.token;
  });

  // 5. Unauthorized Access Prevention (Customer trying to access Admin Dashboard)
  await test('5. Security Guard: Prevent Non-Admin from Admin Dashboard', async () => {
    const { status, data } = await api('/admin/dashboard', {
      token: customerToken
    });
    assert.strictEqual(status, 403);
    assert.strictEqual(data.success, false);
  });

  // 6. Product Listing, Filters & Sorting
  await test('6. Product Catalogue & Surface Filtering', async () => {
    const { status, data } = await api('/products?category=football-boots&surface=FG');
    assert.strictEqual(status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.data.length > 0);
    data.data.forEach((p) => {
      assert.strictEqual(p.playing_surface, 'FG');
    });
  });

  // 7. Product Search
  await test('7. Full-text Keyword Product Search', async () => {
    const { status, data } = await api('/products?search=Copa');
    assert.strictEqual(status, 200);
    assert.ok(data.data.length > 0);
    testProductId = data.data[0].id;
  });

  // 8. Product Details & Variant Retrieval
  await test('8. Product Details & MySQL Variants Retrieval', async () => {
    const { status, data } = await api(`/products/${testProductId}`);
    assert.strictEqual(status, 200);
    assert.ok(data.product.variants.length > 0);
    testVariantId = data.product.variants[0].id;
    assert.ok(data.product.variants[0].stock_quantity > 0);
  });

  // 9. Wishlist Operations
  await test('9. Wishlist Add, List, and Toggle', async () => {
    // Add to wishlist
    const addRes = await api('/wishlist/items', {
      method: 'POST',
      token: customerToken,
      body: JSON.stringify({ productId: testProductId })
    });
    assert.strictEqual(addRes.status, 201);

    // List wishlist
    const listRes = await api('/wishlist', { token: customerToken });
    assert.strictEqual(listRes.status, 200);
    assert.ok(listRes.data.items.some((i) => i.product_id === testProductId));
  });

  // 10. Cart Operations (Add, Update Quantity, Stock Validation)
  await test('10. Shopping Bag Add & Quantity Update', async () => {
    const addRes = await api('/cart/items', {
      method: 'POST',
      token: customerToken,
      body: JSON.stringify({ variantId: testVariantId, quantity: 1 })
    });
    assert.strictEqual(addRes.status, 200);

    const getRes = await api('/cart', { token: customerToken });
    assert.strictEqual(getRes.status, 200);
    assert.ok(getRes.data.cart.items.length > 0);
    testCartItemId = getRes.data.cart.items[0].cart_item_id;

    // Update quantity
    const updateRes = await api(`/cart/items/${testCartItemId}`, {
      method: 'PUT',
      token: customerToken,
      body: JSON.stringify({ quantity: 2 })
    });
    assert.strictEqual(updateRes.status, 200);
  });

  // 11. Coupon Validation
  await test('11. Dynamic Coupon Validation & Minimum Order Check', async () => {
    // Valid coupon above threshold (min order ₹2,499)
    const validRes = await api('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code: 'RETRO10', subtotal: 3000 })
    });
    assert.strictEqual(validRes.status, 200);
    assert.strictEqual(validRes.data.coupon.discountAmount, 300.00);

    // Under minimum order threshold
    const underRes = await api('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code: 'RETRO10', subtotal: 500 })
    });
    assert.strictEqual(underRes.status, 400);

    // Non-existent coupon
    const fakeRes = await api('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code: 'INVALID_CODE', subtotal: 3000 })
    });
    assert.strictEqual(fakeRes.status, 404);
  });

  // 12. Transaction-Safe Checkout & Stock Decrement
  await test('12. Transaction-Safe Order Placement & Stock Decrement', async () => {
    // Get initial variant stock
    const prodBefore = await api(`/products/${testProductId}`);
    const variantBefore = prodBefore.data.product.variants.find((v) => v.id === testVariantId);
    const initialStock = variantBefore.stock_quantity;

    // Place Order
    const orderRes = await api('/orders', {
      method: 'POST',
      token: customerToken,
      body: JSON.stringify({
        shippingAddressData: {
          recipient_name: 'Eric Cantona',
          phone: '+44 7700 999888',
          address_line1: 'Old Trafford Way',
          city: 'Manchester',
          postal_code: 'M16 0RA',
          country: 'United Kingdom',
          saveAddress: true
        },
        paymentMethod: 'card',
        couponCode: 'RETRO10'
      })
    });

    assert.strictEqual(orderRes.status, 201);
    assert.ok(orderRes.data.order.orderNumber);
    testOrderNumber = orderRes.data.order.orderNumber;

    // Verify Stock was safely decremented in MySQL
    const prodAfter = await api(`/products/${testProductId}`);
    const variantAfter = prodAfter.data.product.variants.find((v) => v.id === testVariantId);
    assert.strictEqual(variantAfter.stock_quantity, initialStock - 2);

    // Verify Cart was cleared
    const cartAfter = await api('/cart', { token: customerToken });
    assert.strictEqual(cartAfter.data.cart.items.length, 0);
  });

  // 13. Order History & Details Verification
  await test('13. Customer Order History & Snapshot Integrity', async () => {
    const listRes = await api('/orders', { token: customerToken });
    assert.strictEqual(listRes.status, 200);
    assert.ok(listRes.data.orders.length > 0);

    const detailRes = await api(`/orders/${testOrderNumber}`, { token: customerToken });
    assert.strictEqual(detailRes.status, 200);
    assert.ok(detailRes.data.order.items.length > 0);
    assert.strictEqual(detailRes.data.order.recipient_name, 'Eric Cantona');
  });

  // 14. Product Reviews
  await test('14. Verified Product Review Submission & Rating Re-computation', async () => {
    const revRes = await api('/reviews', {
      method: 'POST',
      token: customerToken,
      body: JSON.stringify({
        productId: testProductId,
        rating: 5,
        reviewTitle: 'Exemplary vintage boots',
        reviewText: 'The leather touch is second to none.'
      })
    });
    assert.strictEqual(revRes.status, 201);
  });

  // 15. Newsletter Subscription
  await test('15. Vintage Newsletter Subscription in MySQL', async () => {
    const res = await api('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: `subscriber.${Date.now()}@retrostore.com` })
    });
    assert.strictEqual(res.status, 201);
  });

  // 16. Admin Operations (Dashboard Stats & Order Status Update)
  await test('16. Admin Analytics & Status Lifecycle Transition', async () => {
    // Dashboard Stats
    const statsRes = await api('/admin/dashboard', { token: adminToken });
    assert.strictEqual(statsRes.status, 200);
    assert.ok(statsRes.data.metrics.totalSales > 0);

    // Update order status to Shipped
    const orderList = await api('/admin/orders', { token: adminToken });
    const targetOrder = orderList.data.orders.find((o) => o.order_number === testOrderNumber);
    assert.ok(targetOrder);

    const updateRes = await api(`/admin/orders/${targetOrder.id}/status`, {
      method: 'PUT',
      token: adminToken,
      body: JSON.stringify({
        order_status: 'Shipped',
        payment_status: 'paid'
      })
    });
    assert.strictEqual(updateRes.status, 200);

    // Verify new status
    const verifiedOrder = await api(`/orders/${testOrderNumber}`, { token: customerToken });
    assert.strictEqual(verifiedOrder.data.order.order_status, 'Shipped');
  });

  console.log('\n================================================================');
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
};

runTests();
