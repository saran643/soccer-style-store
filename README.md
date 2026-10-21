# RETRO STORE — Full-Stack Football E-Commerce Platform

> **"THE BEAUTIFUL GAME. FOREVER."**  
> *Classic Kits. Timeless Culture. Everything Football.*

---

## ⚽ Project Overview

**RETRO STORE** is a complete, production-grade football e-commerce platform and digital boutique specializing in vintage football jerseys, classic kits, authentic Kangaroo leather football boots, pro anti-slip grip socks, protective gear, goalkeeper gloves, hand-stitched match footballs, and pitch accessories.

The application combines a **vintage cream-and-black aesthetic with rich burgundy and muted gold accents**, inspired by legendary football eras and streetwear culture, backed by modern full-stack web architecture connected to a genuine **MySQL relational database management system (RDBMS)**.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 / Vite | Fast, responsive modern single-page application |
| **Routing** | React Router v6 | Client-side routing with role-based protected routes |
| **Styling** | Custom CSS3 | Vintage design system (CSS Grid, Flexbox, Custom Properties) |
| **Icons** | Lucide React | High-clarity vector football & e-commerce icons |
| **Analytics** | Recharts | Interactive revenue trajectory graphs for admin overview |
| **HTTP Client** | Axios | Configured with automatic JWT injection & error handling |
| **Backend API** | Node.js / Express.js | Modular REST API with parameterized SQL queries |
| **Database** | MySQL / MariaDB | 3NF normalized schema with transactions & indexing |
| **Security** | bcryptjs / JWT | Secure password hashing and token-based authentication |

---

## 📁 Project Folder Structure

```text
retro/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL2 connection pool
│   ├── controllers/
│   │   ├── adminController.js     # Admin dashboard KPIs, orders & catalog management
│   │   ├── authController.js      # Customer & Admin authentication, address book
│   │   ├── brandController.js     # Brand catalog operations
│   │   ├── cartController.js      # Shopping bag persistence in MySQL
│   │   ├── categoryController.js  # Category endpoints
│   │   ├── couponController.js    # Promotional discount voucher verification
│   │   ├── newsletterController.js# Journal email subscribers
│   │   ├── orderController.js     # Transaction-safe checkout & stock reservation
│   │   ├── productController.js   # Products, filters, variants, and reviews
│   │   ├── reviewController.js    # Verified customer review submissions
│   │   └── wishlistController.js  # Personal archival wishlist
│   ├── middleware/
│   │   ├── auth.js                # JWT verification & Admin role guard
│   │   └── errorHandler.js        # Central error & 404 handler
│   ├── routes/                    # Modular Express REST route definitions
│   ├── test_workflows.js          # Automated 16-step E2E test suite
│   ├── server.js                  # Main Express application entry point
│   ├── package.json
│   └── .env                       # Backend environment variables
├── database/
│   ├── schema.sql                 # Complete 17-table normalized DDL schema
│   ├── seed.sql                   # 47 products, variants, brands, coupons, reviews
│   ├── generate_seed.js           # Deterministic seed generator script
│   └── queries.sql                # Demonstration of JOINs, GROUP BY, aggregations, subqueries
├── frontend/
│   ├── src/
│   │   ├── components/            # Navbar, Footer, ProductCard, CartDrawer, Guards
│   │   ├── context/               # AuthContext, CartContext, WishlistContext
│   │   ├── pages/                 # Home, Shop, ProductDetails, Cart, Checkout, OrderConfirmation
│   │   │   └── admin/             # AdminDashboard, Products, Orders, Categories, Coupons, Users
│   │   ├── services/              # Axios API service layer
│   │   ├── App.jsx                # Route declarations
│   │   ├── main.jsx               # React mount point
│   │   └── index.css              # Vintage cream-and-black design tokens & styles
│   ├── index.html                 # Google Fonts (Bebas Neue, Playfair Display, Plus Jakarta Sans)
│   ├── vite.config.js             # Vite proxy configuration for /api -> localhost:5000
│   └── package.json
├── .env.example                   # Environment configuration template
└── README.md                      # Complete setup & operational guide
```

---

## 🎨 Visual Design System

The visual language reflects a premium football boutique:

- **Vintage Cream (`#F5F0E6`)**: Dominant page background.
- **Deep Black (`#171717`)**: Navigation headers, primary headings, and footer.
- **Burgundy (`#721C32`)**: Primary call-to-action buttons, active highlights, and sale badges.
- **Warm White (`#FFFCF6`)**: Product card surfaces and content cards.
- **Muted Gold (`#B79A63`)**: Editorial labels and decorative accents.
- **Soft Grey (`#D8D2C8` / `#E2DBD0`)**: Clean borders and structural dividers.

---

## 🗄️ MySQL Database Architecture (`retro_store_db`)

The database consists of **17 normalized tables** adhering to **Third Normal Form (3NF)**:

1. `users` — Customer and administrator accounts with bcrypt password hashes.
2. `addresses` — Multiple delivery addresses per user with default flags.
3. `categories` — Product categories (Jerseys, Boots, Socks, Shin Guards, Gloves, etc.).
4. `brands` — Heritage brands (Umbro, Adidas Originals, Nike Heritage, Kappa, etc.).
5. `products` — Base catalog items with pricing, discounts, surface types, and eras.
6. `product_images` — High-resolution product imagery with display ordering.
7. `product_variants` — Specific SKU, size, color combinations with stock counters.
8. `carts` — Active shopping bag headers linked to users.
9. `cart_items` — Line items in carts with variant references and quantities.
10. `wishlists` — Archival containers linked to users.
11. `wishlist_items` — Saved products.
12. `coupons` — Promotional discount codes with percentage/fixed values and thresholds.
13. `orders` — Finalized purchase records with financial snapshots.
14. `order_items` — Price, product name, and variant snapshots preserving historical records.
15. `payments` — Transaction logs with references and payment method tracking.
16. `reviews` — Customer product ratings (1-5 stars) and feedback.
17. `newsletter_subscribers` — Email signups for archival journal drops.

---

## 🚀 Running the Application on Windows

Follow these step-by-step instructions to run the application locally on Windows.

### Prerequisites

1. **Node.js** (v18.x or v20.x or higher) — [Download Node.js](https://nodejs.org/)
2. **MySQL Server** or **XAMPP** — [Download XAMPP](https://www.apachefriends.org/)

---

### Step 1: Start MySQL Server

If using **XAMPP**:
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **MySQL** (default port: `3306`).
   *Alternatively from terminal:*
   ```powershell
   & "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini" --standalone
   ```

---

### Step 2: Initialize Database and Seed Data

Open PowerShell in the project root directory (`retro/`):

1. **Create Database Schema**:
   ```powershell
   cmd /c 'C:\xampp\mysql\bin\mysql.exe -u root < database\schema.sql'
   ```

2. **Import Sample Seed Data** (47 products, variants, brands, orders):
   ```powershell
   cmd /c 'C:\xampp\mysql\bin\mysql.exe -u root < database\seed.sql'
   ```

3. **Verify Advanced SQL Queries**:
   ```powershell
   cmd /c 'C:\xampp\mysql\bin\mysql.exe -u root < database\queries.sql'
   ```

---

### Step 3: Configure Backend Environment Variables

Verify that `backend/.env` exists with the following configuration:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=retro_store_db
JWT_SECRET=retro_store_super_secret_jwt_key_2026_the_beautiful_game
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

---

### Step 4: Install Dependencies

From the project root:

1. **Install Backend Dependencies**:
   ```powershell
   cd backend
   npm install
   cd ..
   ```

2. **Install Frontend Dependencies**:
   ```powershell
   cd frontend
   npm install
   cd ..
   ```

---

### Step 5: Start Express Backend API Server

In a PowerShell terminal:
```powershell
cd backend
node server.js
```
The backend API server will start on: **`http://localhost:5000`**

---

### Step 6: Start React Vite Development Server

In a second PowerShell terminal:
```powershell
cd frontend
npm run dev
```
The React frontend application will launch on: **`http://localhost:5173`**

---

### Step 7: Run Automated Verification Tests

To verify all 16 major workflows programmatically:
```powershell
node backend/test_workflows.js
```

---

## 🔑 Pre-Configured Test Accounts

| Role | Email | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@retrostore.com` | `Admin@123` | Full Admin Dashboard, Product CRUD, Order Statuses, Analytics |
| **Customer** | `marcus@retrostore.com` | `Customer@123` | Shopping Bag, Address Book, Checkout, Order History, Reviews |
| **Customer** | `david@retrostore.com` | `Customer@123` | Customer features |

*(A clickable autofill shortcut is also provided on the Login page for testing).*

---

## 🎟️ Active Promotional Discount Codes

| Coupon Code | Discount | Minimum Order | Usage |
| :--- | :--- | :--- | :--- |
| **`RETRO10`** | 10% Off | ₹2,499.00 | Valid on orders over ₹2,499 (max ₹1,000) |
| **`BEAUTIFULGAME`** | 15% Off | ₹3,999.00 | Valid on orders over ₹3,999 (max ₹1,500) |
| **`LEGEND500`** | ₹500 Flat Off | ₹4,999.00 | Valid on orders over ₹4,999 |
| **`KICKOFF5`** | 5% Off | None | Valid on any order |

---

## 📊 Demonstrated RDBMS Concepts (`database/queries.sql`)

The repository includes a dedicated `database/queries.sql` script illustrating key SQL concepts:

1. **INNER JOIN**: Products joined with Category and Brand tables.
2. **LEFT JOIN**: Categories and their respective product counts, preserving empty categories.
3. **GROUP BY & HAVING**: Brands with average product price $\ge$ ₹3,000.
4. **Correlated Subquery**: Products priced above the average in their respective department.
5. **Sales Aggregation**: Revenue, discounts granted, and order volume grouped by status.
6. **Best-Selling Products**: Top units sold calculated via `SUM(quantity)` on `order_items`.
7. **Inventory Alert**: Low-stock variants with condition `stock_quantity <= 5`.
8. **Customer Lifetime Value**: Aggregated spend per customer via `SUM(total_amount)`.
9. **Revenue by Category**: Total revenue attributed per department.
10. **Rating Computation**: Average product rating dynamically computed from reviews.

---

## 🔒 Security Features

- **Password Encryption**: Sensitive passwords hashed using `bcryptjs` with salt rounds = 10.
- **SQL Injection Prevention**: 100% of queries execute through prepared statements with bound parameters (`?`).
- **Server-Side Authorization**: Administrative routes and APIs enforce role verification via JWT middleware.
- **Price Integrity**: Checkout subtotal and item prices are fetched directly from MySQL; client-submitted prices are never trusted.
- **Inventory Protection**: Checkout uses MySQL transactions with `FOR UPDATE` locking to prevent overselling.

---

## 🏆 Production Verification Checklist

- [x] MySQL schema with 17 normalized tables created and indexed.
- [x] Over 40 products across 8 categories seeded with variants and images.
- [x] Advanced relational SQL queries demonstrating college RDBMS requirements.
- [x] Express.js REST API with full authentication, cart, order, and admin routes.
- [x] Vite React frontend with vintage cream, deep black, and burgundy styling.
- [x] Product filtering by Category, Brand, Surface (FG/AG/SG/TF/IC), and Price.
- [x] Cart Drawer, full Cart page, and dynamic coupon verification.
- [x] Transaction-safe checkout workflow supporting COD and Demo Online Card.
- [x] Customer dashboard with profile editor, address book, and order tracking.
- [x] Admin dashboard with Recharts analytics, product CRUD, and order management.
- [x] Verified with 16 automated end-to-end tests passing without errors.
#   s o c c e r - s t y l e - s t o r e  
 