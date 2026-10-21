// database/apply_appropriate_images.js
const mysql = require('../backend/node_modules/mysql2/promise');

const imageMap = {
  // ========================================================
  // 1. RETRO JERSEYS
  // ========================================================
  '1998-france-home-retro-jersey': {
    primary: '/images/products/france-1998-home.jpg',
    secondary: '/images/products/france-1998-detail.svg'
  },
  '1990-west-germany-home-retro-shirt': {
    primary: '/images/products/germany-1990-home.jpg',
    secondary: '/images/products/germany-1990-detail.svg'
  },
  '1994-brazil-world-cup-home-retro-shirt': {
    primary: '/images/products/brazil-1994-home.jpg',
    secondary: '/images/products/brazil-1994-detail.svg'
  },
  '1998-arsenal-away-jvc-retro-jersey': {
    primary: '/images/products/arsenal-1998-away.jpg',
    secondary: '/images/products/arsenal-1998-detail.svg'
  },
  '1992-man-united-newton-heath-away-shirt': {
    primary: '/images/products/man-utd-1992-newton-heath.jpg',
    secondary: '/images/products/man-utd-1992-detail.svg'
  },
  '1998-ac-milan-centenary-home-shirt': {
    primary: '/images/products/ac-milan-1998-home.svg',
    secondary: '/images/products/ac-milan-1998-detail.svg'
  },
  '1996-england-home-euro-96-retro-shirt': {
    primary: '/images/products/england-1996-home.svg',
    secondary: '/images/products/england-1996-detail.svg'
  },
  '1997-inter-milan-third-ronaldo-jersey': {
    primary: '/images/products/inter-milan-1997-third.svg',
    secondary: '/images/products/inter-milan-1997-detail.svg'
  },
  '1986-argentina-world-cup-away-shirt': {
    primary: '/images/products/argentina-1986-away.svg',
    secondary: '/images/products/argentina-1986-detail.svg'
  },
  '1996-newcastle-united-home-brown-ale-jersey': {
    primary: '/images/products/newcastle-1996-home.svg',
    secondary: '/images/products/newcastle-1996-detail.svg'
  },
  '1998-ajax-amsterdam-home-jersey': {
    primary: '/images/products/ajax-1998-home.svg',
    secondary: '/images/products/ajax-1998-detail.svg'
  },
  '1994-italy-world-cup-home-jersey': {
    primary: '/images/products/italy-1994-home.svg',
    secondary: '/images/products/italy-1994-detail.svg'
  },
  '2002-real-madrid-centenary-white-kit': {
    primary: '/images/products/real-madrid-2002-centenary.svg',
    secondary: '/images/products/real-madrid-2002-detail.svg'
  },
  '1990-netherlands-away-retro-shirt': {
    primary: '/images/products/netherlands-1990-away.svg',
    secondary: '/images/products/netherlands-1990-detail.svg'
  },

  // ========================================================
  // 2. FOOTBALL BOOTS
  // ========================================================
  'copa-mundial-retro-pure-leather-fg': {
    primary: '/images/products/copa-mundial-fg.jpg',
    secondary: '/images/products/copa-mundial-sole.svg'
  },
  'king-top-1968-classic-fg': {
    primary: '/images/products/puma-king-1968.jpg',
    secondary: '/images/products/puma-king-sole.svg'
  },
  'total-90-laser-1-heritage-fg': {
    primary: '/images/products/total-90-laser.jpg',
    secondary: '/images/products/total-90-sole.svg'
  },
  'predator-mania-champagne-2002-fg': {
    primary: '/images/products/predator-mania-2002.jpg',
    secondary: '/images/products/predator-mania-sole.svg'
  },
  'speciali-pro-heritage-k-leather-sg': {
    primary: '/images/products/speciali-pro-sg.svg',
    secondary: '/images/products/speciali-pro-sole.svg'
  },
  'tiempo-premier-vintage-leather-ag': {
    primary: '/images/products/tiempo-premier-ag.svg',
    secondary: '/images/products/tiempo-premier-sole.svg'
  },
  'morelia-classic-heritage-fg': {
    primary: '/images/products/morelia-classic-fg.svg',
    secondary: '/images/products/morelia-classic-sole.svg'
  },
  'mundial-team-retro-leather-tf': {
    primary: '/images/products/mundial-team-tf.svg',
    secondary: '/images/products/mundial-team-sole.svg'
  },
  'samba-classic-heritage-ic': {
    primary: '/images/products/samba-classic-ic.svg',
    secondary: '/images/products/samba-classic-sole.svg'
  },
  'gato-vintage-court-ic': {
    primary: '/images/products/gato-vintage-ic.svg',
    secondary: '/images/products/gato-vintage-sole.svg'
  },

  // ========================================================
  // 3. SOCKS & GRIP
  // ========================================================
  'pro-tech-anti-slip-grip-socks': {
    primary: '/images/products/pro-tech-grip-socks.jpg',
    secondary: '/images/products/grip-socks-detail.svg'
  },
  'vintage-ribbed-matchday-socks': {
    primary: '/images/products/vintage-ribbed-socks.svg',
    secondary: '/images/products/grip-socks-detail.svg'
  },
  'dual-grip-cushion-performance-socks': {
    primary: '/images/products/dual-grip-socks.svg',
    secondary: '/images/products/grip-socks-detail.svg'
  },
  'calf-compression-matchday-sleeves': {
    primary: '/images/products/calf-compression-sleeves.svg',
    secondary: '/images/products/grip-socks-detail.svg'
  },
  'retro-stripe-merino-matchday-socks': {
    primary: '/images/products/retro-stripe-socks.svg',
    secondary: '/images/products/grip-socks-detail.svg'
  },
  'silicone-grip-insole-low-cut-socks': {
    primary: '/images/products/low-cut-grip-socks.svg',
    secondary: '/images/products/grip-socks-detail.svg'
  },

  // ========================================================
  // 4. SHIN GUARDS & PROTECTION
  // ========================================================
  'vintage-carbon-lite-shin-guards': {
    primary: '/images/products/vintage-carbon-shin-guards.svg',
    secondary: '/images/products/carbon-guards-detail.svg'
  },
  'classic-foam-shield-ankle-guard': {
    primary: '/images/products/classic-ankle-shield-guard.svg',
    secondary: '/images/products/carbon-guards-detail.svg'
  },
  'micro-pro-minimalist-shin-pads': {
    primary: '/images/products/micro-pro-shin-pads.svg',
    secondary: '/images/products/carbon-guards-detail.svg'
  },
  'zinc-oxide-sock-tape-3-pack': {
    primary: '/images/products/zinc-oxide-sock-tape.svg',
    secondary: '/images/products/carbon-guards-detail.svg'
  },

  // ========================================================
  // 5. GOALKEEPER GLOVES
  // ========================================================
  'reusch-arrow-1986-heritage-gloves': {
    primary: '/images/products/reusch-arrow-gloves.svg',
    secondary: '/images/products/keeper-gloves-detail.svg'
  },
  'retro-negative-cut-pro-match-gloves': {
    primary: '/images/products/heritage-goalkeeper-gloves.jpg',
    secondary: '/images/products/keeper-gloves-detail.svg'
  },
  'classic-roll-finger-heritage-gloves': {
    primary: '/images/products/classic-roll-finger-gloves.svg',
    secondary: '/images/products/keeper-gloves-detail.svg'
  },
  'pro-grip-aqua-all-weather-gloves': {
    primary: '/images/products/pro-grip-aqua-gloves.svg',
    secondary: '/images/products/keeper-gloves-detail.svg'
  },

  // ========================================================
  // 6. FOOTBALLS & EQUIPMENT
  // ========================================================
  '1970-vintage-32-panel-leather-football': {
    primary: '/images/products/vintage-1970-football.jpg',
    secondary: '/images/products/equipment-detail.svg'
  },
  'mitre-ultimax-heritage-match-football': {
    primary: '/images/products/mitre-ultimax-football.svg',
    secondary: '/images/products/equipment-detail.svg'
  },
  'heritage-conditioning-agility-cones-10-pack': {
    primary: '/images/products/agility-cones-10pack.svg',
    secondary: '/images/products/equipment-detail.svg'
  },

  // ========================================================
  // 7. BAGS & LUGGAGE
  // ========================================================
  'heritage-heavy-canvas-boot-bag': {
    primary: '/images/products/heritage-canvas-boot-bag.svg',
    secondary: '/images/products/equipment-detail.svg'
  },
  'retro-matchday-barrel-holdall-45l': {
    primary: '/images/products/retro-barrel-holdall.svg',
    secondary: '/images/products/equipment-detail.svg'
  },

  // ========================================================
  // 8. ACCESSORIES & CARE
  // ========================================================
  'deluxe-vintage-boot-care-kit': {
    primary: '/images/products/boot-care-dubbin-kit.svg',
    secondary: '/images/products/accessories-detail.svg'
  },
  'leather-matchday-captain-armband': {
    primary: '/images/products/captain-armband.svg',
    secondary: '/images/products/accessories-detail.svg'
  },
  'classic-brass-referee-whistle': {
    primary: '/images/products/classic-brass-whistle.jpg',
    secondary: '/images/products/accessories-detail.svg'
  },
  'dual-action-metal-ball-pump': {
    primary: '/images/products/metal-ball-pump.svg',
    secondary: '/images/products/accessories-detail.svg'
  }
};

const categoryMap = {
  'retro-jerseys': '/images/categories/cat-retro-jerseys.svg',
  'football-boots': '/images/categories/cat-football-boots.svg',
  'socks-grip': '/images/categories/cat-socks-grip.svg',
  'shin-guards-protection': '/images/categories/cat-shin-guards.svg',
  'goalkeeper-gloves': '/images/categories/cat-goalkeeper-gloves.svg',
  'footballs-training': '/images/categories/cat-footballs-training.svg',
  'bags-luggage': '/images/categories/cat-bags-luggage.svg',
  'accessories-care': '/images/categories/cat-accessories-care.svg'
};

const brandLogoMap = {
  'retro-store-atelier': '/brands/retro-store-atelier.svg',
  'umbro-heritage': '/brands/umbro-heritage.svg',
  'adidas-originals-football': '/brands/adidas-originals.svg',
  'nike-heritage-football': '/brands/nike-heritage.svg',
  'kappa-vintage': '/brands/kappa-vintage.svg',
  'lotto-classic': '/brands/lotto-classic.svg',
  'puma-king-retro': '/brands/puma-king-retro.svg',
  'mitre-classic': '/brands/mitre-classic.svg',
  'reusch-pro': '/brands/reusch-pro.svg',
  'gripmaster-pro': '/brands/gripmaster-pro.svg'
};

async function run() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'retro_store_db',
    multipleStatements: true
  });

  console.log('Connected to MySQL. Updating database tables with appropriate images...');

  // 1. Update Categories
  for (const [slug, img] of Object.entries(categoryMap)) {
    await connection.execute('UPDATE categories SET image_url = ? WHERE slug = ?', [img, slug]);
  }
  console.log('✓ Updated 8 categories with appropriate imagery.');

  // 2. Update Brands
  for (const [slug, logo] of Object.entries(brandLogoMap)) {
    await connection.execute('UPDATE brands SET logo_url = ? WHERE slug = ?', [logo, slug]);
  }
  console.log('✓ Updated 10 brands with custom vector SVGs.');

  // 3. Update Products & Product Images
  let prodCount = 0;
  for (const [slug, imgs] of Object.entries(imageMap)) {
    const [rows] = await connection.execute('SELECT id, name FROM products WHERE slug = ?', [slug]);
    if (rows.length > 0) {
      const prod = rows[0];
      prodCount++;

      // Delete existing images for this product
      await connection.execute('DELETE FROM product_images WHERE product_id = ?', [prod.id]);

      // Insert primary and secondary images
      await connection.execute(
        'INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES (?, ?, ?, TRUE, 1)',
        [prod.id, imgs.primary, `${prod.name} Match Presentation`]
      );
      await connection.execute(
        'INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES (?, ?, ?, FALSE, 2)',
        [prod.id, imgs.secondary, `${prod.name} Technical Detail & Architecture`]
      );
    } else {
      console.warn(`Product not found for slug: ${slug}`);
    }
  }

  console.log(`✓ Updated all ${prodCount} products with tailored primary & secondary images.`);
  await connection.end();
}

run().catch(err => {
  console.error('Failed to update images:', err);
  process.exit(1);
});
