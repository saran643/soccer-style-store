-- ==============================================================================
-- RETRO STORE — Demonstration SQL Queries (Indian Rupees INR Rates)
-- Relational Database Management System: MySQL / MariaDB
-- Showcasing: INNER JOIN, LEFT JOIN, GROUP BY, HAVING, COUNT, AVG,
--             Subqueries, Sales Aggregation, Low-Stock Alerts, and Analytics.
-- ==============================================================================

USE `retro_store_db`;

-- ------------------------------------------------------------------------------
-- 1. INNER JOIN: Products with Category and Brand details
-- Demonstrates multi-table relational navigation
-- ------------------------------------------------------------------------------
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.price AS price_inr,
    c.name AS category_name,
    b.name AS brand_name,
    p.playing_surface,
    p.era
FROM products p
INNER JOIN categories c ON p.category_id = c.id
INNER JOIN brands b ON p.brand_id = b.id
WHERE p.status = 'active'
ORDER BY p.price DESC
LIMIT 10;

-- ------------------------------------------------------------------------------
-- 2. LEFT JOIN: All categories and their product counts (including empty ones)
-- Demonstrates preservation of unmatched left table rows
-- ------------------------------------------------------------------------------
SELECT 
    c.id AS category_id,
    c.name AS category_name,
    COUNT(p.id) AS total_products,
    COALESCE(MIN(p.price), 0.00) AS min_price_inr,
    COALESCE(MAX(p.price), 0.00) AS max_price_inr
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
GROUP BY c.id, c.name
ORDER BY total_products DESC;

-- ------------------------------------------------------------------------------
-- 3. GROUP BY & HAVING: Brands with average product price >= ₹2,500
-- Demonstrates aggregate filtering with HAVING
-- ------------------------------------------------------------------------------
SELECT 
    b.name AS brand_name,
    COUNT(p.id) AS catalogue_count,
    ROUND(AVG(p.price), 2) AS average_price_inr,
    ROUND(AVG(p.rating), 2) AS average_rating
FROM brands b
INNER JOIN products p ON b.id = p.brand_id
GROUP BY b.id, b.name
HAVING AVG(p.price) >= 2500.00
ORDER BY average_price_inr DESC;

-- ------------------------------------------------------------------------------
-- 4. Subquery: Products priced higher than the average price in their category
-- Demonstrates correlated subquery
-- ------------------------------------------------------------------------------
SELECT 
    p.id,
    p.name,
    p.price AS price_inr,
    c.name AS category_name,
    (SELECT ROUND(AVG(p2.price), 2) 
     FROM products p2 
     WHERE p2.category_id = p.category_id) AS category_avg_price_inr
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.price > (
    SELECT AVG(p3.price)
    FROM products p3
    WHERE p3.category_id = p.category_id
)
ORDER BY c.name, p.price DESC;

-- ------------------------------------------------------------------------------
-- 5. Sales Aggregation: Total revenue and orders by order status
-- Demonstrates aggregate calculations on transactional data
-- ------------------------------------------------------------------------------
SELECT 
    order_status,
    COUNT(id) AS total_orders,
    SUM(subtotal) AS gross_subtotal_inr,
    SUM(discount_amount) AS total_discounts_granted_inr,
    SUM(total_amount) AS net_revenue_inr
FROM orders
GROUP BY order_status;

-- ------------------------------------------------------------------------------
-- 6. Best-Selling Products: Top products by total units sold and revenue generated
-- Demonstrates multi-table aggregation across orders and order items
-- ------------------------------------------------------------------------------
SELECT 
    oi.product_name_snapshot,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.subtotal) AS total_gross_sales_inr,
    ROUND(AVG(oi.unit_price), 2) AS average_selling_price_inr
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.order_status != 'Cancelled'
GROUP BY oi.product_name_snapshot
ORDER BY total_units_sold DESC, total_gross_sales_inr DESC
LIMIT 5;

-- ------------------------------------------------------------------------------
-- 7. Low-Stock Alert: Product variants with stock quantity <= 5
-- Crucial operational inventory query for admin management
-- ------------------------------------------------------------------------------
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    pv.sku,
    pv.size,
    pv.color,
    pv.stock_quantity,
    CASE 
        WHEN pv.stock_quantity = 0 THEN 'OUT OF STOCK'
        WHEN pv.stock_quantity <= 3 THEN 'CRITICAL'
        ELSE 'LOW STOCK'
    END AS stock_status
FROM product_variants pv
INNER JOIN products p ON pv.product_id = p.id
WHERE pv.stock_quantity <= 5
ORDER BY pv.stock_quantity ASC;

-- ------------------------------------------------------------------------------
-- 8. Customer Order Summary: Lifetime order count and spend per customer
-- Demonstrates customer lifetime value (LTV) calculation
-- ------------------------------------------------------------------------------
SELECT 
    u.id AS user_id,
    u.name AS customer_name,
    u.email,
    COUNT(o.id) AS total_orders_placed,
    COALESCE(SUM(o.total_amount), 0.00) AS lifetime_spend_inr,
    MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.order_status != 'Cancelled'
WHERE u.role = 'customer'
GROUP BY u.id, u.name, u.email
ORDER BY lifetime_spend_inr DESC;

-- ------------------------------------------------------------------------------
-- 9. Revenue by Category: Total sales attributed to each category
-- Demonstrates JOINs across products, variants, order items, and categories
-- ------------------------------------------------------------------------------
SELECT 
    c.name AS category_name,
    COUNT(DISTINCT oi.id) AS line_items_sold,
    COALESCE(SUM(oi.quantity), 0) AS total_items_sold,
    COALESCE(SUM(oi.subtotal), 0.00) AS total_category_revenue_inr
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.order_status != 'Cancelled'
GROUP BY c.id, c.name
ORDER BY total_category_revenue_inr DESC;

-- ------------------------------------------------------------------------------
-- 10. Reviews & Ratings: Average rating and review count per product
-- Demonstrates aggregate subquery or join with GROUP BY
-- ------------------------------------------------------------------------------
SELECT 
    p.id,
    p.name,
    COUNT(r.id) AS actual_review_count,
    ROUND(AVG(r.rating), 2) AS calculated_avg_rating
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, p.name
HAVING COUNT(r.id) > 0
ORDER BY calculated_avg_rating DESC;
