-- ==============================================================================
-- RETRO STORE — Database Seed File (Indian Rupees INR Rates)
-- Over 40 products, categories, brands, variants, coupons, users, and orders
-- ==============================================================================

USE `retro_store_db`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `newsletter_subscribers`;
TRUNCATE TABLE `reviews`;
TRUNCATE TABLE `payments`;
TRUNCATE TABLE `order_items`;
TRUNCATE TABLE `orders`;
TRUNCATE TABLE `coupons`;
TRUNCATE TABLE `wishlist_items`;
TRUNCATE TABLE `wishlists`;
TRUNCATE TABLE `cart_items`;
TRUNCATE TABLE `carts`;
TRUNCATE TABLE `product_variants`;
TRUNCATE TABLE `product_images`;
TRUNCATE TABLE `products`;
TRUNCATE TABLE `brands`;
TRUNCATE TABLE `categories`;
TRUNCATE TABLE `addresses`;
TRUNCATE TABLE `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. Users (Admin + Customers)
-- Admin login: admin@retrostore.com / Admin@123
-- Customer login: marcus@retrostore.com / Customer@123
-- ------------------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `phone`, `role`) VALUES
(1, 'Admin Director', 'admin@retrostore.com', '$2a$10$ToVBKYNNWukBhxjB2k7uieyJDdIHckET/y3l.jZ5EyYAPDWhYbnBu', '+91 98200 12345', 'admin'),
(2, 'Marcus Vance', 'marcus@retrostore.com', '$2a$10$skiiIFVZZFuP6WbFyJ3iRuUBXxiYPD8aZ4yCq0tBjdVpsEBLEe0.m', '+91 98201 54321', 'customer'),
(3, 'David Maldini', 'david@retrostore.com', '$2a$10$skiiIFVZZFuP6WbFyJ3iRuUBXxiYPD8aZ4yCq0tBjdVpsEBLEe0.m', '+91 98202 67890', 'customer'),
(4, 'Sofia Zidane', 'sofia@retrostore.com', '$2a$10$skiiIFVZZFuP6WbFyJ3iRuUBXxiYPD8aZ4yCq0tBjdVpsEBLEe0.m', '+91 98203 98765', 'customer');

-- ------------------------------------------------------------------------------
-- 2. Addresses
-- ------------------------------------------------------------------------------
INSERT INTO `addresses` (`id`, `user_id`, `recipient_name`, `phone`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`, `is_default`) VALUES
(1, 2, 'Marcus Vance', '+91 98201 54321', '14 Marine Drive, Sea Face Towers', 'Flat 4B', 'Mumbai', 'Maharashtra', '400020', 'India', TRUE),
(2, 2, 'Marcus Vance', '+91 98201 54321', 'Retro HQ Studio, 24 Indiranagar 100ft Rd', 'Floor 2', 'Bengaluru', 'Karnataka', '560038', 'India', FALSE),
(3, 3, 'David Maldini', '+91 98202 67890', '88 Park Street', 'Apt 12', 'Kolkata', 'West Bengal', '700016', 'India', TRUE),
(4, 4, 'Sofia Zidane', '+91 98203 98765', '5 Connaught Place, Block C', 'Suite 404', 'New Delhi', 'Delhi', '110001', 'India', TRUE);

-- ------------------------------------------------------------------------------
-- 3. Categories
-- ------------------------------------------------------------------------------
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image_url`, `display_order`) VALUES
(1, 'Retro Jerseys', 'retro-jerseys', 'Timeless football jerseys from legendary World Cups, European championships, and iconic domestic campaigns.', '/images/categories/cat-retro-jerseys.svg', 1),
(2, 'Football Boots', 'football-boots', 'Classic kangaroo leather boots, iconic predators, and vintage silhouettes engineered for modern pitches.', '/images/categories/cat-football-boots.svg', 2),
(3, 'Socks & Grip', 'socks-grip', 'Anti-slip grip technology, heritage ribbed football socks, and pro-level matchday compression sleeves.', '/images/categories/cat-socks-grip.svg', 3),
(4, 'Shin Guards & Protection', 'shin-guards-protection', 'Minimalist carbon fibre pads, vintage padded ankle shields, and heavy-duty strapping.', '/images/categories/cat-shin-guards.svg', 4),
(5, 'Goalkeeper Gloves', 'goalkeeper-gloves', 'Heritage 1980s retro aesthetics paired with 4mm pro contact latex for matchday supremacy.', '/images/categories/cat-goalkeeper-gloves.svg', 5),
(6, 'Footballs & Equipment', 'footballs-training', 'Authentic 32-panel hand-stitched leather match balls, training cones, agility kits, and vintage referee gear.', '/images/categories/cat-footballs-training.svg', 6),
(7, 'Bags & Luggage', 'bags-luggage', 'Waxed canvas boot bags, leather weekenders, and heritage kit bags designed for true footballers.', '/images/categories/cat-bags-luggage.svg', 7),
(8, 'Accessories & Care', 'accessories-care', 'Premium boot dubbin, horsehair brushes, vintage captain armbands, ball pumps, and pitch accessories.', '/images/categories/cat-accessories-care.svg', 8);

-- ------------------------------------------------------------------------------
-- 4. Brands
-- ------------------------------------------------------------------------------
INSERT INTO `brands` (`id`, `name`, `slug`, `logo_url`, `description`) VALUES
(1, 'Retro Store Atelier', 'retro-store-atelier', '/brands/retro-store-atelier.svg', 'Our handcrafted in-house boutique collection of bespoke retro recreations and football essentials.'),
(2, 'Umbro Heritage', 'umbro-heritage', '/brands/umbro-heritage.svg', 'The double diamond standard of British football heritage since 1924.'),
(3, 'Adidas Originals Football', 'adidas-originals-football', '/brands/adidas-originals.svg', 'The three stripes of football history: from Bern 1954 to the iconic Predator era.'),
(4, 'Nike Heritage Football', 'nike-heritage-football', '/brands/nike-heritage.svg', 'Iconic Total 90, Joga Bonito, and classic European club kits.'),
(5, 'Kappa Vintage', 'kappa-vintage', '/brands/kappa-vintage.svg', 'Italian sportswear elegance, famed Omini tape, and 90s Serie A mastery.'),
(6, 'Lotto Classic', 'lotto-classic', '/brands/lotto-classic.svg', 'Venetian craftsmanship worn by the greatest continental football champions.'),
(7, 'Puma King Retro', 'puma-king-retro', '/brands/puma-king-retro.svg', 'Worn by Pelé, Cruyff, and Maradona. The pinnacle of timeless black boot style.'),
(8, 'Mitre Classic', 'mitre-classic', '/brands/mitre-classic.svg', 'The world\'s oldest sports equipment brand, makers of the legendary Ultimax.'),
(9, 'Reusch Pro Goalkeeping', 'reusch-pro', '/brands/reusch-pro.svg', 'German engineering and championship heritage for shot stoppers worldwide.'),
(10, 'GripMaster Pro', 'gripmaster-pro', '/brands/gripmaster-pro.svg', 'The gold standard in anti-slip football grip socks and ankle stability.');

-- ------------------------------------------------------------------------------
-- 5. Products, Images & Variants (All in INR Rates)
-- ------------------------------------------------------------------------------
INSERT INTO `products` (`id`, `category_id`, `brand_id`, `name`, `slug`, `description`, `details`, `price`, `original_price`, `discount_percent`, `playing_surface`, `era`, `status`, `is_featured`, `is_bestseller`, `is_new_arrival`, `rating`, `review_count`) VALUES
(1, 1, 3, '1998 France Home Retro Jersey', '1998-france-home-retro-jersey', 'The iconic royal blue kit worn as Les Bleus lifted the 1998 World Cup on home turf in Saint-Denis. Features the red horizontal chest band with three white stripes and vintage ribbed collar.', '100% Breathable Jacquard Polyester; Embroidered cockerel crest with golden World Cup star; Ribbed tricolor collar and cuff trims; Machine washable at 30°C.', 2799.00, 3499.00, 20, 'N/A', '1998', 'active', 1, 1, 0, 4.95, 38),
(2, 1, 3, '1990 West Germany Home Retro Shirt', '1990-west-germany-home-retro-shirt', 'Widely regarded as the single greatest football shirt design in history. Worn by Matthäus, Klinsmann, and Brehme during their Italia 90 triumph, featuring the striking angular tricolor chest chevron.', 'High-density micro-polyester; Geometric chest graphic; Classic polo neck collar with V-insert; Relaxed 90s silhouette fit.', 2999.00, 3699.00, 19, 'N/A', '1990', 'active', 1, 1, 0, 4.98, 45),
(3, 1, 2, '1994 Brazil World Cup Home Retro Shirt', '1994-brazil-world-cup-home-retro-shirt', 'The vibrant canary yellow shirt worn by Romário and Bebeto at USA 94 to capture the Seleção\'s fourth World Cup crown. Features subtle embossed federation crests embedded in the fabric.', 'Subtle tone-on-tone CBF jacquard pattern; Green ribbed v-neck; Embroidered four-star crest; Quick-drying vintage mesh.', 2699.00, 3299.00, 18, 'N/A', '1994', 'active', 1, 0, 0, 4.9, 29),
(4, 1, 4, '1998 Arsenal Away "JVC" Retro Jersey', '1998-arsenal-away-jvc-retro-jersey', 'The iconic navy and bright yellow away shirt from Arsenal\'s historic 1997/98 Double-winning season under Arsène Wenger. Worn by Dennis Bergkamp, Ian Wright, and Patrick Vieira.', 'Two-tone navy and gold chest block; Iconic velvet-feel felt JVC front sponsor; Classic woven club crest; Heavyweight moisture-wicking weave.', 2899.00, 3599.00, 19, 'N/A', '1998', 'active', 0, 1, 0, 4.92, 33),
(5, 1, 2, '1992 Manchester United "Newton Heath" Away Shirt', '1992-man-united-newton-heath-away-shirt', 'The legendary green and gold lace-neck shirt commemorating the club\'s 1878 founding as Newton Heath LYR. Worn by Eric Cantona in his debut Old Trafford season.', 'Split green and deep yellow halves; Working lace-up collar; Woven heritage crest; Embossed sponsor print.', 3199.00, 3999.00, 20, 'N/A', '1992', 'active', 1, 1, 0, 4.96, 41),
(6, 1, 3, '1998 AC Milan Centenary Home Shirt', '1998-ac-milan-centenary-home-shirt', 'Special edition Rossoneri kit honoring 100 years of the Milanese giants. Classic razor-sharp red and black vertical stripes with the historic St. George Cross crest.', 'Historic centenary emblem; Crisp polo collar; Opel chest sponsor; Tailored Italian athletic drape.', 2999.00, 3699.00, 19, 'N/A', '1998', 'active', 0, 0, 1, 4.88, 22),
(7, 1, 2, '1996 England Home "Euro 96" Retro Shirt', '1996-england-home-euro-96-retro-shirt', 'The summer of 96, Football Coming Home, and Paul Gascoigne\'s dentist chair celebration against Scotland. Woven in brilliant pure white with indigo and sky blue accent ribbing.', 'Woven Three Lions shield; Vintage turqouise tipping on collar; Heavy-weight moisture control knit; Centered crest.', 2799.00, 3499.00, 20, 'N/A', '1996', 'active', 1, 1, 0, 4.93, 36),
(8, 1, 2, '1997 Inter Milan Third "Ronaldo 9" Uefa Cup Jersey', '1997-inter-milan-third-ronaldo-jersey', 'The unforgettable horizontal grey and black striped masterpiece worn by Il Fenomeno Ronaldo in Paris as he stepped over Marchegiani to seal the 1998 UEFA Cup.', 'Horizontal alternating bands; Pirelli flock sponsor; Golden star over badge; Authentic ribbed collar with v-neck insert.', 3299.00, 3999.00, 18, 'N/A', '1997', 'active', 1, 1, 0, 4.97, 48),
(9, 1, 1, '1986 Argentina World Cup Away Shirt', '1986-argentina-world-cup-away-shirt', 'The famous deep royal blue away shirt worn by Diego Armando Maradona at the Azteca against England for the Goal of the Century.', 'Lustrous aerated vintage cotton-poly blend; Silver-glint heat-pressed numbers; Classic v-neck collar with white piping.', 2999.00, 3699.00, 19, 'N/A', '1986', 'active', 0, 1, 0, 4.96, 52),
(10, 1, 3, '1996 Newcastle United Home "Brown Ale" Jersey', '1996-newcastle-united-home-brown-ale-jersey', 'The iconic Newcastle United home kit worn during the Entertainers season by Alan Shearer, David Ginola, and Peter Beardsley. Features the classic grandad button collar.', 'Thick black and white vertical stripes; Blue Star Newcastle Brown Ale emblem; Grandad button neckline; Heritage crest.', 2899.00, 3499.00, 17, 'N/A', '1996', 'active', 0, 0, 1, 4.89, 25),
(11, 1, 2, '1998 Ajax Amsterdam Home Jersey', '1998-ajax-amsterdam-home-jersey', 'Pure Dutch football elegance. The iconic thick center red block bordered by crisp white, with vertical ABN AMRO sponsor lettering.', 'Classic 90s polyester with subtle watermark pattern; Central red panel; Vertical sponsor orientation; Woven badge on heart.', 2699.00, 3299.00, 18, 'N/A', '1998', 'active', 0, 0, 0, 4.87, 19),
(12, 1, 6, '1994 Italy World Cup Home Jersey', '1994-italy-world-cup-home-jersey', 'The legendary Azzurri shirt worn by Roberto Baggio and Franco Baresi in Pasadena. Features exquisite subtle jacquard triangles and tricolor ribbed collar details.', 'Azzurro blue sheen finish; Tricolor sleeve cuff detailing; Woven FIGC badge with three golden stars; Classic tailored collar.', 2899.00, 3599.00, 19, 'N/A', '1994', 'active', 1, 0, 1, 4.94, 31),
(13, 1, 3, '2002 Real Madrid Centenary White Kit', '2002-real-madrid-centenary-white-kit', 'The pristine sponsorless white centenary shirt worn as Zinedine Zidane scored the greatest Champions League volley in history at Hampden Park.', 'Pure sponsorless clean aesthetic; Commemorative 1902-2002 sleeve embroidery; Premium climacool double knit; Ribbed v-neck.', 3199.00, 3899.00, 18, 'N/A', '2002', 'active', 1, 1, 0, 4.97, 44),
(14, 1, 3, '1990 Netherlands Away Retro Shirt', '1990-netherlands-away-retro-shirt', 'The striking white and royal blue geometric shirt worn by Gullit, Van Basten, and Rijkaard at Italia 90.', 'Subtle tile graphic pattern across chest and shoulders; Classic Dutch Lion crest in black; Ribbed collar with snap tab.', 2799.00, 3399.00, 18, 'N/A', '1990', 'active', 0, 0, 1, 4.88, 18),
(15, 2, 3, 'Copa Mundial Retro Pure Leather FG', 'copa-mundial-retro-pure-leather-fg', 'The best-selling football boot in world history. Crafted from premium Kangaroo leather for timeless touch, supreme durability, and glove-like comfort on firm natural pitches.', 'K-leather upper for touch; Molded direct-injected polyurethane outsole with 12 round studs; Fold-over tongue; Made for firm grass.', 8999.00, 10999.00, 18, 'FG', 'Classic', 'active', 1, 1, 0, 4.96, 60),
(16, 2, 7, 'King Top 1968 Black & White Classic FG', 'king-top-1968-classic-fg', 'The boot that crowned legends. Soft calf leather with stitched vamp detailing, white side formstrip, and iconic fold-over tongue bearing the gold Puma King seal.', 'Full-grain calf leather; Conical studs for 360-degree rotational traction; Padded ankle collar; Classic low-cut profile.', 7499.00, 8999.00, 17, 'FG', 'Classic', 'active', 1, 0, 0, 4.91, 37),
(17, 2, 4, 'Total 90 Laser I Heritage Re-Edition FG', 'total-90-laser-1-heritage-fg', 'The ultimate power and precision boot. Features the famous off-center lacing, circular Sweet Spot strike zone, and high-density rubber fins.', 'K-PES synthetic leather; Sweet spot precision shield; Zoom Air heel unit for explosive damping; Circular FG stud config.', 11499.00, 13999.00, 18, 'FG', '2007', 'active', 1, 1, 1, 4.98, 54),
(18, 2, 3, 'Predator Mania Champagne 2002 Edition FG', 'predator-mania-champagne-2002-fg', 'The holy grail of football footwear. Champagne cream leather, curved red rubber swerve elements, external heel counter, and elasticated tongue strap.', 'Premium leather upper; Asymmetrical lacing with elasticated fold-over tongue; Rubber striking ribs for ball swerve; Split soleplate.', 13999.00, 16999.00, 18, 'FG', '2002', 'active', 1, 1, 0, 4.99, 72),
(19, 2, 2, 'Speciali Pro Heritage K-Leather SG', 'speciali-pro-heritage-k-leather-sg', 'The English wet-pitch workhorse. Soft Kangaroo leather matched with 6-stud detachable metal tips for unstoppable traction in deep winter turf.', 'K-leather quilted forefoot; Wishbone support frame; Interchangeable metal studs; Memory foam tongue cushioning.', 6999.00, 8499.00, 18, 'SG', 'Classic', 'active', 0, 0, 0, 4.88, 26),
(20, 2, 4, 'Tiempo Premier Vintage Leather AG', 'tiempo-premier-vintage-leather-ag', 'Engineered specifically for 3G/4G artificial turf. Supple calfskin with reinforced toe bumpers and conical hollow studs to reduce knee strain.', 'Soft touch calfskin; Specially designed AG multi-stud soleplate; Reinforced wear zones; Lunarlon cushioning insole.', 6499.00, 7999.00, 19, 'AG', 'Classic', 'active', 0, 1, 0, 4.9, 34),
(21, 2, 1, 'Morelia Classic Heritage Black FG', 'morelia-classic-heritage-fg', 'Handmade perfection. Featherweight natural leather with traditional wave-stitched vamp, providing unparalleled touch on firm grass pitches.', 'Ultra-thin kangaroo leather; Graded nylon soleplate; Internal heel counter for lock-in; Crafted with 24-hour lasting process.', 9499.00, 11499.00, 17, 'FG', 'Classic', 'active', 0, 0, 1, 4.93, 27),
(22, 2, 3, 'Mundial Team Retro Leather Turf TF', 'mundial-team-retro-leather-tf', 'The king of cage football and AstroTurf. Split-suede toe protection, bouncy EVA midsole, and hundreds of micro rubber studs for explosive traction.', 'Kangaroo leather vamp with suede abrasion wrap; Multi-cleated rubber soleplate; Die-cut EVA cushioning; Low profile collar.', 5999.00, 7299.00, 18, 'TF', 'Classic', 'active', 0, 1, 0, 4.94, 42),
(23, 2, 3, 'Samba Classic Heritage Leather IC', 'samba-classic-heritage-ic', 'From icy Munich training pitches in 1950 to the greatest indoor courts and street culture today. Non-marking gum rubber sole with suede T-toe.', 'Full-grain leather with suede overlays; Non-marking gum rubber outsole for wooden and synthetic courts; Long extended tongue.', 4999.00, 5999.00, 17, 'IC', 'Classic', 'active', 1, 1, 0, 4.95, 65),
(24, 2, 4, 'Gato Vintage Court IC', 'gato-vintage-court-ic', 'Designed for fast-paced 5-a-side and futsal. Premium suede toe box with breathable mesh lateral panels and a sticky herringbone gum sole.', 'Suede and mesh combo; Cushlon foam midsole; Non-marking indoor court herringbone rubber; Low profile for instant reaction.', 5299.00, 6299.00, 16, 'IC', 'Classic', 'active', 0, 0, 1, 4.87, 20),
(25, 3, 10, 'Pro Tech Anti-Slip Grip Socks (Pair)', 'pro-tech-anti-slip-grip-socks', 'The player\'s secret weapon. Hundreds of independent silicone suction pads eliminate foot slippage inside boots, preventing blisters and transferring 100% of sprinting power.', '80% Combed Cotton, 15% Nylon, 5% Spandex; Thermal silicone grip pods; Breathable instep ventilation mesh; Arch support band.', 599.00, 799.00, 25, 'N/A', 'Modern', 'active', 1, 1, 0, 4.97, 88),
(26, 3, 1, 'Vintage Ribbed Matchday Football Socks', 'vintage-ribbed-matchday-socks', 'Heavyweight retro knee-high match socks featuring the traditional thick rib turn-down cuff, reinforced heel cushioning, and elasticated ankle compression.', 'Heavy gauge cotton-blend; Cushioned sole bed; High turn-over ribbed cuff; Stays up without sagging.', 499.00, 649.00, 23, 'N/A', 'Classic', 'active', 0, 0, 1, 4.86, 24),
(27, 3, 10, 'Dual-Grip Cushion Performance Football Socks', 'dual-grip-cushion-performance-socks', 'Featuring dual-sided grip: silicone pads both outside (against the boot) and inside (against your skin) for zero movement and maximum sudden deceleration grip.', 'Dual-surface micro-pads; Ergonomic left/right foot tailored cut; Reinforced Achilles padding; Anti-odor treated yarn.', 699.00, 899.00, 22, 'N/A', 'Modern', 'active', 1, 1, 0, 4.93, 41),
(28, 3, 10, 'Calf Compression Matchday Sleeves (Pair)', 'calf-compression-matchday-sleeves', 'Engineered specifically for players who wear grip socks and need calf sleeves to hold shin guards firmly in place while meeting match regulations.', 'Seamless circular knit; Graduated 20-30 mmHg compression; Secure elastic cuffs; Wicks away sweat rapidly.', 449.00, 599.00, 25, 'N/A', 'Modern', 'active', 0, 0, 0, 4.89, 28),
(29, 3, 1, 'Retro Stripe Merino Wool Matchday Socks', 'retro-stripe-merino-matchday-socks', 'Made with fine Merino wool for unmatched thermal comfort during chilly night games. Natural moisture temperature regulation with retro hooped tops.', '45% Merino wool, 35% acrylic, 20% polyamide; Naturally antimicrobial; Vintage hoop stripe cuff; Padded heel and toe.', 799.00, 999.00, 20, 'N/A', 'Classic', 'active', 0, 0, 1, 4.92, 15),
(30, 3, 10, 'Silicone Grip Insole Low-Cut Training Socks', 'silicone-grip-insole-low-cut-socks', 'Ankle-length grip socks engineered for indoor football sessions, gym conditioning, and recovery.', 'Low cut design; Hexagon silicone base; Lycra arch support; Terry cotton padded sole.', 399.00, 499.00, 20, 'N/A', 'Modern', 'active', 0, 0, 0, 4.84, 17),
(31, 4, 1, 'Vintage Carbon-Lite Slip-In Shin Guards', 'vintage-carbon-lite-shin-guards', 'A modern engineering marvel with vintage aesthetic. Genuine 3K carbon-fibre shell weighing under 35 grams, backed by high-density EVA shock absorption.', 'Real 3K aerospace carbon fibre; Anatomical left/right curvature; Breathable antibacterial EVA backing; Includes storage pouch.', 1299.00, 1599.00, 19, 'N/A', 'Modern', 'active', 1, 1, 0, 4.95, 50),
(32, 4, 2, 'Classic Foam-Shield Ankle Guard & Shin Plate', 'classic-foam-shield-ankle-guard', 'The classic 90s Sunday League armour. Hard plastic front shell with padded elastic stirrup ankle guards and protective circular malleolus pads.', 'Hard impact shell; Built-in ankle sock with foam side discs; Underfoot elastic stirrup; Front calf velcro strap.', 999.00, 1299.00, 23, 'N/A', 'Classic', 'active', 0, 0, 0, 4.88, 29),
(33, 4, 10, 'Micro-Pro Minimalist Shin Pads (10cm)', 'micro-pro-minimalist-shin-pads', 'The modern winger\'s dream. Ultra-compact 10cm pads favored by elite dribblers who demand complete freedom of ankle movement and lightweight speed.', 'Tough PP composite shell; 10cm x 6cm featherweight design; Fits invisibly under grip sock sleeves; High-density foam lining.', 699.00, 899.00, 22, 'N/A', 'Modern', 'active', 0, 1, 1, 4.9, 36),
(34, 4, 1, 'Zinc Oxide Matchday Sock Tape (3-Pack)', 'zinc-oxide-sock-tape-3-pack', 'Heavy-duty non-stretch cotton adhesive tape. Essential for securing shin guards, locking wrists, and taping ankles for match readiness.', 'Pack of 3 rolls (3.8cm x 10m each); Breathable serrated edge for easy hand-tearing; Medical grade zinc oxide adhesive.', 399.00, 499.00, 20, 'N/A', 'Classic', 'active', 0, 0, 0, 4.91, 40),
(35, 5, 9, 'Reusch Arrow 1986 Heritage Goalkeeper Gloves', 'reusch-arrow-1986-heritage-gloves', 'The iconic arrowhead backhand worn by legendary European cup winners in Mexico 86. Re-issued with state-of-the-art 4mm G3 Ultra Soft latex foam for adhesive grip in all conditions.', '4mm G3 Ultra Soft German latex; Classic arrow backhand design; Full latex wrist strap with pull loop; Negative cut for snug ball feel.', 3999.00, 4899.00, 18, 'N/A', '1986', 'active', 1, 1, 0, 4.96, 35),
(36, 5, 1, 'Retro Negative Cut Professional Match Gloves', 'retro-negative-cut-pro-match-gloves', 'Bespoke vintage aesthetic combined with contemporary negative stitching. Internal seams deliver an exact, skin-tight feel on crosses and fingertip stops.', 'Contact 4mm German latex palm; Neoprene body with burgundy silicone punch zone; Extended wrist bandage with double elastic strap.', 3199.00, 3899.00, 18, 'N/A', 'Modern', 'active', 0, 0, 1, 4.89, 22),
(37, 5, 9, 'Classic Roll Finger Heritage Keeper Gloves', 'classic-roll-finger-heritage-gloves', 'The traditional British goalkeeping favorite. Latex rolls seamlessly around each finger to provide maximum contact surface on every catch.', 'Traditional roll finger construction; 3.5mm SuperSoft latex; Embossed EVA backhand; Wide wrist strap.', 2799.00, 3399.00, 18, 'N/A', 'Classic', 'active', 0, 0, 0, 4.87, 18),
(38, 5, 1, 'Pro Grip Aqua All-Weather Goalkeeper Gloves', 'pro-grip-aqua-all-weather-gloves', 'When torrential rain threatens matchday, this glove thrives. 4mm Aqua-Plus latex activates with water to create magnetic grip on soaking match balls.', 'Aqua-Plus damp-weather latex; Hydro-mesh breathable backhand; Wrap-around thumb; Elasticated bandage closure.', 3499.00, 4199.00, 17, 'N/A', 'Modern', 'active', 1, 0, 0, 4.92, 26),
(39, 6, 1, '1970 Vintage 32-Panel Hand-Stitched Leather Football', '1970-vintage-32-panel-leather-football', 'The archetypal football design immortalised in Mexico 1970. 32 hand-stitched hexagons and pentagons in rich genuine treated leather with brass inflation valve.', '100% Top-grain genuine leather; 32 hand-stitched panels; Reinforced butyl bladder for air retention; Official Size 5 match weight.', 2499.00, 3199.00, 22, 'N/A', '1970', 'active', 1, 1, 0, 4.98, 64),
(40, 6, 8, 'Mitre Ultimax Heritage Match Football Size 5', 'mitre-ultimax-heritage-match-football', 'The official ball of 1990s English football. Struck with blistering power by Shearer, Le Tissier, and Beckham. Micro-textured PU casing for true flight trajectory.', 'FIFA Quality Pro approved; Thermal bonded 24-panel construction; Hyperseam technology for zero water uptake; High rebound bladder.', 2999.00, 3699.00, 19, 'N/A', '1995', 'active', 1, 0, 1, 4.96, 39),
(41, 6, 1, 'Heritage Football Conditioning Agility Cones (10-Pack)', 'heritage-conditioning-agility-cones-10-pack', 'Flexible rubberized saucer cones for speed ladders, dribbling mazes, and passing drills. Stackable with a heavy brass carrying rod.', 'Set of 10 heavy pliable cones; 5 Burgundy / 5 Vintage Cream; Won\'t crack when stepped on with metal studs; Heavy transport strap.', 899.00, 1199.00, 25, 'N/A', 'Classic', 'active', 0, 0, 0, 4.88, 20),
(42, 7, 1, 'Heritage Heavy Canvas Football Boot Bag', 'heritage-heavy-canvas-boot-bag', 'Waxed 16oz cotton canvas boot carrier with antique brass ventilation eyelets, wipe-clean waterproof interior lining, and full-grain leather handle.', '16oz heavy water-repellent canvas; Brass dual zippers; Internal mud separator panel; Fits up to UK size 13 boots with room for shin pads.', 1699.00, 2199.00, 23, 'N/A', 'Classic', 'active', 1, 1, 0, 4.94, 43),
(43, 7, 1, 'Retro Matchday Barrel Holdall Duffel 45L', 'retro-matchday-barrel-holdall-45l', 'The quintessential retro team bag. Cylinder shape with side shoe compartment, padded shoulder strap, and vintage typography print.', '45L capacity; Dedicated isolated boot tunnel; Reinforced base with protective studs; Heavy-duty YKK hardware.', 3299.00, 3999.00, 18, 'N/A', 'Classic', 'active', 0, 0, 1, 4.9, 27),
(44, 8, 1, 'Deluxe Vintage Boot Care & Leather Dubbin Kit', 'deluxe-vintage-boot-care-kit', 'Everything required to care for genuine leather football boots. Includes traditional beeswax dubbin, 100% natural horsehair buffing brush, stud wrench, and cotton cloth.', '100ml Pure beeswax dubbin; 100% horsehair polish brush; Stiff mud cleaner brush; Universal 6-stud steel key; Metal presentation tin.', 1199.00, 1499.00, 20, 'N/A', 'Classic', 'active', 1, 1, 0, 4.97, 52),
(45, 8, 1, 'Leather Matchday Captain Armband', 'leather-matchday-captain-armband', 'A leader\'s badge of honor. Stitched leatherette face with bold embossed "C", elasticated stretch band, and velcro closure that stays glued to your arm for 90 minutes.', 'Embossed gold lettering; Reinforced elastic band; Fits over jersey and cold-weather undershirt; 8cm width.', 699.00, 899.00, 22, 'N/A', 'Classic', 'active', 0, 0, 0, 4.91, 24),
(46, 8, 1, 'Classic Brass Referee Whistle & Lanyard', 'classic-brass-referee-whistle', 'Crafted from solid nickel-plated brass with a natural cork pea for the unmistakable, piercing vintage match whistle sound heard across every stadium.', 'Solid nickel-plated brass; 115 decibel cork pea vibration; Braided cord lanyard with brass clasp; Velvet storage bag included.', 799.00, 999.00, 20, 'N/A', 'Classic', 'active', 0, 0, 0, 4.93, 31),
(47, 8, 1, 'Dual-Action Vintage Metal Ball Pump & Needles', 'dual-action-metal-ball-pump', 'Compact brushed aluminium ball pump delivering dual-action air volume on both push and pull strokes. Comes with 3 spare steel needles.', 'Heavy-gauge aluminium barrel; Flexible extension hose prevents needle breakage; Dual-action airflow; 3 steel needles included.', 749.00, 899.00, 17, 'N/A', 'Classic', 'active', 0, 0, 0, 4.88, 29);

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `alt_text`, `is_primary`, `display_order`) VALUES
(1, 1, '/images/products/france-1998-home.jpg', '1998 France Home Retro Jersey', TRUE, 1),
(2, 1, 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1000&q=85', '1998 France Home Retro Jersey Technical Detail & Angle', FALSE, 2),
(3, 2, '/images/products/germany-1990-home.jpg', '1990 West Germany Home Retro Shirt', TRUE, 1),
(4, 2, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85', '1990 West Germany Home Retro Shirt Technical Detail & Angle', FALSE, 2),
(5, 3, '/images/products/brazil-1994-home.jpg', '1994 Brazil World Cup Home Retro Shirt', TRUE, 1),
(6, 3, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85', '1994 Brazil World Cup Home Retro Shirt Technical Detail & Angle', FALSE, 2),
(7, 4, '/images/products/arsenal-1998-away.jpg', '1998 Arsenal Away "JVC" Retro Jersey', TRUE, 1),
(8, 4, 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85', '1998 Arsenal Away "JVC" Retro Jersey Technical Detail & Angle', FALSE, 2),
(9, 5, '/images/products/man-utd-1992-newton-heath.jpg', '1992 Manchester United "Newton Heath" Away Shirt', TRUE, 1),
(10, 5, 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=85', '1992 Manchester United "Newton Heath" Away Shirt Technical Detail & Angle', FALSE, 2),
(11, 6, '/images/products/ac-milan-1998-home.svg', '1998 AC Milan Centenary Home Shirt', TRUE, 1),
(12, 6, 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1000&q=85', '1998 AC Milan Centenary Home Shirt Technical Detail & Angle', FALSE, 2),
(13, 7, '/images/products/england-1996-home.svg', '1996 England Home "Euro 96" Retro Shirt', TRUE, 1),
(14, 7, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85', '1996 England Home "Euro 96" Retro Shirt Technical Detail & Angle', FALSE, 2),
(15, 8, '/images/products/inter-milan-1997-third.svg', '1997 Inter Milan Third "Ronaldo 9" Uefa Cup Jersey', TRUE, 1),
(16, 8, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85', '1997 Inter Milan Third "Ronaldo 9" Uefa Cup Jersey Technical Detail & Angle', FALSE, 2),
(17, 9, '/images/products/argentina-1986-away.svg', '1986 Argentina World Cup Away Shirt', TRUE, 1),
(18, 9, 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85', '1986 Argentina World Cup Away Shirt Technical Detail & Angle', FALSE, 2),
(19, 10, '/images/products/newcastle-1996-home.svg', '1996 Newcastle United Home "Brown Ale" Jersey', TRUE, 1),
(20, 10, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85', '1996 Newcastle United Home "Brown Ale" Jersey Technical Detail & Angle', FALSE, 2),
(21, 11, '/images/products/ajax-1998-home.svg', '1998 Ajax Amsterdam Home Jersey', TRUE, 1),
(22, 11, 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85', '1998 Ajax Amsterdam Home Jersey Technical Detail & Angle', FALSE, 2),
(23, 12, '/images/products/italy-1994-home.svg', '1994 Italy World Cup Home Jersey', TRUE, 1),
(24, 12, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85', '1994 Italy World Cup Home Jersey Technical Detail & Angle', FALSE, 2),
(25, 13, '/images/products/real-madrid-2002-centenary.svg', '2002 Real Madrid Centenary White Kit', TRUE, 1),
(26, 13, 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85', '2002 Real Madrid Centenary White Kit Technical Detail & Angle', FALSE, 2),
(27, 14, '/images/products/netherlands-1990-away.svg', '1990 Netherlands Away Retro Shirt', TRUE, 1),
(28, 14, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85', '1990 Netherlands Away Retro Shirt Technical Detail & Angle', FALSE, 2),
(29, 15, '/images/products/copa-mundial-fg.jpg', 'Copa Mundial Retro Pure Leather FG', TRUE, 1),
(30, 15, 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85', 'Copa Mundial Retro Pure Leather FG Technical Detail & Angle', FALSE, 2),
(31, 16, '/images/products/puma-king-1968.jpg', 'King Top 1968 Black & White Classic FG', TRUE, 1),
(32, 16, 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1000&q=85', 'King Top 1968 Black & White Classic FG Technical Detail & Angle', FALSE, 2),
(33, 17, '/images/products/total-90-laser.jpg', 'Total 90 Laser I Heritage Re-Edition FG', TRUE, 1),
(34, 17, 'https://images.unsplash.com/photo-1511426463457-0571e247d816?auto=format&fit=crop&w=1000&q=85', 'Total 90 Laser I Heritage Re-Edition FG Technical Detail & Angle', FALSE, 2),
(35, 18, '/images/products/predator-mania-2002.jpg', 'Predator Mania Champagne 2002 Edition FG', TRUE, 1),
(36, 18, 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1000&q=85', 'Predator Mania Champagne 2002 Edition FG Technical Detail & Angle', FALSE, 2),
(37, 19, '/images/products/speciali-pro-sg.svg', 'Speciali Pro Heritage K-Leather SG', TRUE, 1),
(38, 19, 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1000&q=85', 'Speciali Pro Heritage K-Leather SG Technical Detail & Angle', FALSE, 2),
(39, 20, '/images/products/tiempo-premier-ag.svg', 'Tiempo Premier Vintage Leather AG', TRUE, 1),
(40, 20, 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85', 'Tiempo Premier Vintage Leather AG Technical Detail & Angle', FALSE, 2),
(41, 21, '/images/products/morelia-classic-fg.svg', 'Morelia Classic Heritage Black FG', TRUE, 1),
(42, 21, 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&w=1000&q=85', 'Morelia Classic Heritage Black FG Technical Detail & Angle', FALSE, 2),
(43, 22, '/images/products/mundial-team-tf.svg', 'Mundial Team Retro Leather Turf TF', TRUE, 1),
(44, 22, 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85', 'Mundial Team Retro Leather Turf TF Technical Detail & Angle', FALSE, 2),
(45, 23, '/images/products/samba-classic-ic.svg', 'Samba Classic Heritage Leather IC', TRUE, 1),
(46, 23, 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1000&q=85', 'Samba Classic Heritage Leather IC Technical Detail & Angle', FALSE, 2),
(47, 24, '/images/products/gato-vintage-ic.svg', 'Gato Vintage Court IC', TRUE, 1),
(48, 24, 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1000&q=85', 'Gato Vintage Court IC Technical Detail & Angle', FALSE, 2),
(49, 25, '/images/products/pro-tech-grip-socks.jpg', 'Pro Tech Anti-Slip Grip Socks (Pair)', TRUE, 1),
(50, 25, 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85', 'Pro Tech Anti-Slip Grip Socks (Pair) Technical Detail & Angle', FALSE, 2),
(51, 26, '/images/products/vintage-ribbed-socks.svg', 'Vintage Ribbed Matchday Football Socks', TRUE, 1),
(52, 26, 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1000&q=85', 'Vintage Ribbed Matchday Football Socks Technical Detail & Angle', FALSE, 2),
(53, 27, '/images/products/dual-grip-socks.svg', 'Dual-Grip Cushion Performance Football Socks', TRUE, 1),
(54, 27, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85', 'Dual-Grip Cushion Performance Football Socks Technical Detail & Angle', FALSE, 2),
(55, 28, '/images/products/calf-compression-sleeves.svg', 'Calf Compression Matchday Sleeves (Pair)', TRUE, 1),
(56, 28, 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=85', 'Calf Compression Matchday Sleeves (Pair) Technical Detail & Angle', FALSE, 2),
(57, 29, '/images/products/retro-stripe-socks.svg', 'Retro Stripe Merino Wool Matchday Socks', TRUE, 1),
(58, 29, 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85', 'Retro Stripe Merino Wool Matchday Socks Technical Detail & Angle', FALSE, 2),
(59, 30, '/images/products/low-cut-grip-socks.svg', 'Silicone Grip Insole Low-Cut Training Socks', TRUE, 1),
(60, 30, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=85', 'Silicone Grip Insole Low-Cut Training Socks Technical Detail & Angle', FALSE, 2),
(61, 31, '/images/products/vintage-carbon-shin-guards.svg', 'Vintage Carbon-Lite Slip-In Shin Guards', TRUE, 1),
(62, 31, 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1000&q=85', 'Vintage Carbon-Lite Slip-In Shin Guards Technical Detail & Angle', FALSE, 2),
(63, 32, '/images/products/classic-ankle-shield-guard.svg', 'Classic Foam-Shield Ankle Guard & Shin Plate', TRUE, 1),
(64, 32, 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=85', 'Classic Foam-Shield Ankle Guard & Shin Plate Technical Detail & Angle', FALSE, 2),
(65, 33, '/images/products/micro-pro-shin-pads.svg', 'Micro-Pro Minimalist Shin Pads (10cm)', TRUE, 1),
(66, 33, 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85', 'Micro-Pro Minimalist Shin Pads (10cm) Technical Detail & Angle', FALSE, 2),
(67, 34, '/images/products/zinc-oxide-sock-tape.svg', 'Zinc Oxide Matchday Sock Tape (3-Pack)', TRUE, 1),
(68, 34, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=85', 'Zinc Oxide Matchday Sock Tape (3-Pack) Technical Detail & Angle', FALSE, 2),
(69, 35, '/images/products/reusch-arrow-gloves.svg', 'Reusch Arrow 1986 Heritage Goalkeeper Gloves', TRUE, 1),
(70, 35, 'https://images.unsplash.com/photo-1543195185-9546bf592dc1?auto=format&fit=crop&w=1000&q=85', 'Reusch Arrow 1986 Heritage Goalkeeper Gloves Technical Detail & Angle', FALSE, 2),
(71, 36, '/images/products/heritage-goalkeeper-gloves.jpg', 'Retro Negative Cut Professional Match Gloves', TRUE, 1),
(72, 36, 'https://images.unsplash.com/photo-1630552227424-81c9e52d7c83?auto=format&fit=crop&w=1000&q=85', 'Retro Negative Cut Professional Match Gloves Technical Detail & Angle', FALSE, 2),
(73, 37, '/images/products/classic-roll-finger-gloves.svg', 'Classic Roll Finger Heritage Keeper Gloves', TRUE, 1),
(74, 37, 'https://images.unsplash.com/photo-1543195185-9546bf592dc1?auto=format&fit=crop&w=1000&q=85', 'Classic Roll Finger Heritage Keeper Gloves Technical Detail & Angle', FALSE, 2),
(75, 38, '/images/products/pro-grip-aqua-gloves.svg', 'Pro Grip Aqua All-Weather Goalkeeper Gloves', TRUE, 1),
(76, 38, 'https://images.unsplash.com/photo-1630552227424-81c9e52d7c83?auto=format&fit=crop&w=1000&q=85', 'Pro Grip Aqua All-Weather Goalkeeper Gloves Technical Detail & Angle', FALSE, 2),
(77, 39, '/images/products/vintage-1970-football.jpg', '1970 Vintage 32-Panel Hand-Stitched Leather Football', TRUE, 1),
(78, 39, 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=85', '1970 Vintage 32-Panel Hand-Stitched Leather Football Technical Detail & Angle', FALSE, 2),
(79, 40, '/images/products/mitre-ultimax-football.svg', 'Mitre Ultimax Heritage Match Football Size 5', TRUE, 1),
(80, 40, 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=85', 'Mitre Ultimax Heritage Match Football Size 5 Technical Detail & Angle', FALSE, 2),
(81, 41, '/images/products/agility-cones-10pack.svg', 'Heritage Football Conditioning Agility Cones (10-Pack)', TRUE, 1),
(82, 41, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85', 'Heritage Football Conditioning Agility Cones (10-Pack) Technical Detail & Angle', FALSE, 2),
(83, 42, '/images/products/heritage-canvas-boot-bag.svg', 'Heritage Heavy Canvas Football Boot Bag', TRUE, 1),
(84, 42, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85', 'Heritage Heavy Canvas Football Boot Bag Technical Detail & Angle', FALSE, 2),
(85, 43, '/images/products/retro-barrel-holdall.svg', 'Retro Matchday Barrel Holdall Duffel 45L', TRUE, 1),
(86, 43, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85', 'Retro Matchday Barrel Holdall Duffel 45L Technical Detail & Angle', FALSE, 2),
(87, 44, '/images/products/boot-care-dubbin-kit.svg', 'Deluxe Vintage Boot Care & Leather Dubbin Kit', TRUE, 1),
(88, 44, 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=85', 'Deluxe Vintage Boot Care & Leather Dubbin Kit Technical Detail & Angle', FALSE, 2),
(89, 45, '/images/products/captain-armband.svg', 'Leather Matchday Captain Armband', TRUE, 1),
(90, 45, 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1000&q=85', 'Leather Matchday Captain Armband Technical Detail & Angle', FALSE, 2),
(91, 46, '/images/products/classic-brass-whistle.jpg', 'Classic Brass Referee Whistle & Lanyard', TRUE, 1),
(92, 46, 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1000&q=85', 'Classic Brass Referee Whistle & Lanyard Technical Detail & Angle', FALSE, 2),
(93, 47, '/images/products/metal-ball-pump.svg', 'Dual-Action Vintage Metal Ball Pump & Needles', TRUE, 1),
(94, 47, 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1000&q=85', 'Dual-Action Vintage Metal Ball Pump & Needles Technical Detail & Angle', FALSE, 2);

INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `size`, `color`, `stock_quantity`, `additional_price`) VALUES
(1, 1, '1998-FRANCE--S-ROY-1', 'S', 'Royal Blue / Red', 12, 0.00),
(2, 1, '1998-FRANCE--M-ROY-2', 'M', 'Royal Blue / Red', 18, 0.00),
(3, 1, '1998-FRANCE--L-ROY-3', 'L', 'Royal Blue / Red', 15, 0.00),
(4, 1, '1998-FRANCE--XL-ROY-4', 'XL', 'Royal Blue / Red', 8, 0.00),
(5, 1, '1998-FRANCE--XXL-ROY-5', 'XXL', 'Royal Blue / Red', 4, 0.00),
(6, 2, '1990-WEST-GE-S-VIN-6', 'S', 'Vintage White / Tricolor', 10, 0.00),
(7, 2, '1990-WEST-GE-M-VIN-7', 'M', 'Vintage White / Tricolor', 20, 0.00),
(8, 2, '1990-WEST-GE-L-VIN-8', 'L', 'Vintage White / Tricolor', 16, 0.00),
(9, 2, '1990-WEST-GE-XL-VIN-9', 'XL', 'Vintage White / Tricolor', 7, 0.00),
(10, 2, '1990-WEST-GE-XXL-VIN-10', 'XXL', 'Vintage White / Tricolor', 3, 0.00),
(11, 3, '1994-BRAZIL--S-CAN-11', 'S', 'Canary Yellow / Green', 8, 0.00),
(12, 3, '1994-BRAZIL--M-CAN-12', 'M', 'Canary Yellow / Green', 14, 0.00),
(13, 3, '1994-BRAZIL--L-CAN-13', 'L', 'Canary Yellow / Green', 12, 0.00),
(14, 3, '1994-BRAZIL--XL-CAN-14', 'XL', 'Canary Yellow / Green', 6, 0.00),
(15, 4, '1998-ARSENAL-S-NAV-15', 'S', 'Navy / Solar Yellow', 9, 0.00),
(16, 4, '1998-ARSENAL-M-NAV-16', 'M', 'Navy / Solar Yellow', 15, 0.00),
(17, 4, '1998-ARSENAL-L-NAV-17', 'L', 'Navy / Solar Yellow', 11, 0.00),
(18, 4, '1998-ARSENAL-XL-NAV-18', 'XL', 'Navy / Solar Yellow', 5, 0.00),
(19, 5, '1992-MAN-UNI-S-GRE-19', 'S', 'Green / Gold', 7, 0.00),
(20, 5, '1992-MAN-UNI-M-GRE-20', 'M', 'Green / Gold', 13, 0.00),
(21, 5, '1992-MAN-UNI-L-GRE-21', 'L', 'Green / Gold', 10, 0.00),
(22, 5, '1992-MAN-UNI-XL-GRE-22', 'XL', 'Green / Gold', 4, 0.00),
(23, 6, '1998-AC-MILA-S-ROS-23', 'S', 'Rossoneri Red / Black', 11, 0.00),
(24, 6, '1998-AC-MILA-M-ROS-24', 'M', 'Rossoneri Red / Black', 14, 0.00),
(25, 6, '1998-AC-MILA-L-ROS-25', 'L', 'Rossoneri Red / Black', 9, 0.00),
(26, 6, '1998-AC-MILA-XL-ROS-26', 'XL', 'Rossoneri Red / Black', 5, 0.00),
(27, 7, '1996-ENGLAND-S-WHI-27', 'S', 'White / Sky Navy', 14, 0.00),
(28, 7, '1996-ENGLAND-M-WHI-28', 'M', 'White / Sky Navy', 19, 0.00),
(29, 7, '1996-ENGLAND-L-WHI-29', 'L', 'White / Sky Navy', 16, 0.00),
(30, 7, '1996-ENGLAND-XL-WHI-30', 'XL', 'White / Sky Navy', 8, 0.00),
(31, 7, '1996-ENGLAND-XXL-WHI-31', 'XXL', 'White / Sky Navy', 5, 0.00),
(32, 8, '1997-INTER-M-S-GRE-32', 'S', 'Grey / Black / Blue', 8, 0.00),
(33, 8, '1997-INTER-M-M-GRE-33', 'M', 'Grey / Black / Blue', 14, 0.00),
(34, 8, '1997-INTER-M-L-GRE-34', 'L', 'Grey / Black / Blue', 12, 0.00),
(35, 8, '1997-INTER-M-XL-GRE-35', 'XL', 'Grey / Black / Blue', 6, 0.00),
(36, 9, '1986-ARGENTI-S-DEE-36', 'S', 'Deep Royal Blue', 10, 0.00),
(37, 9, '1986-ARGENTI-M-DEE-37', 'M', 'Deep Royal Blue', 16, 0.00),
(38, 9, '1986-ARGENTI-L-DEE-38', 'L', 'Deep Royal Blue', 11, 0.00),
(39, 9, '1986-ARGENTI-XL-DEE-39', 'XL', 'Deep Royal Blue', 5, 0.00),
(40, 10, '1996-NEWCAST-S-BLA-40', 'S', 'Black / White', 9, 0.00),
(41, 10, '1996-NEWCAST-M-BLA-41', 'M', 'Black / White', 15, 0.00),
(42, 10, '1996-NEWCAST-L-BLA-42', 'L', 'Black / White', 13, 0.00),
(43, 10, '1996-NEWCAST-XL-BLA-43', 'XL', 'Black / White', 7, 0.00),
(44, 11, '1998-AJAX-AM-S-WHI-44', 'S', 'White / Scarlet Red', 8, 0.00),
(45, 11, '1998-AJAX-AM-M-WHI-45', 'M', 'White / Scarlet Red', 12, 0.00),
(46, 11, '1998-AJAX-AM-L-WHI-46', 'L', 'White / Scarlet Red', 10, 0.00),
(47, 11, '1998-AJAX-AM-XL-WHI-47', 'XL', 'White / Scarlet Red', 4, 0.00),
(48, 12, '1994-ITALY-W-S-AZZ-48', 'S', 'Azzurri Blue', 11, 0.00),
(49, 12, '1994-ITALY-W-M-AZZ-49', 'M', 'Azzurri Blue', 17, 0.00),
(50, 12, '1994-ITALY-W-L-AZZ-50', 'L', 'Azzurri Blue', 14, 0.00),
(51, 12, '1994-ITALY-W-XL-AZZ-51', 'XL', 'Azzurri Blue', 6, 0.00),
(52, 13, '2002-REAL-MA-S-BLA-52', 'S', 'Blanco White', 15, 0.00),
(53, 13, '2002-REAL-MA-M-BLA-53', 'M', 'Blanco White', 22, 0.00),
(54, 13, '2002-REAL-MA-L-BLA-54', 'L', 'Blanco White', 18, 0.00),
(55, 13, '2002-REAL-MA-XL-BLA-55', 'XL', 'Blanco White', 9, 0.00),
(56, 14, '1990-NETHERL-S-WHI-56', 'S', 'White / Royal Blue', 9, 0.00),
(57, 14, '1990-NETHERL-M-WHI-57', 'M', 'White / Royal Blue', 13, 0.00),
(58, 14, '1990-NETHERL-L-WHI-58', 'L', 'White / Royal Blue', 11, 0.00),
(59, 14, '1990-NETHERL-XL-WHI-59', 'XL', 'White / Royal Blue', 5, 0.00),
(60, 15, 'COPA-MUNDIAL-UK75-COR-60', 'UK 7.5', 'Core Black / Cloud White', 5, 0.00),
(61, 15, 'COPA-MUNDIAL-UK80-COR-61', 'UK 8.0', 'Core Black / Cloud White', 8, 0.00),
(62, 15, 'COPA-MUNDIAL-UK85-COR-62', 'UK 8.5', 'Core Black / Cloud White', 12, 0.00),
(63, 15, 'COPA-MUNDIAL-UK90-COR-63', 'UK 9.0', 'Core Black / Cloud White', 10, 0.00),
(64, 15, 'COPA-MUNDIAL-UK95-COR-64', 'UK 9.5', 'Core Black / Cloud White', 6, 0.00),
(65, 15, 'COPA-MUNDIAL-UK100-COR-65', 'UK 10.0', 'Core Black / Cloud White', 4, 0.00),
(66, 16, 'KING-TOP-196-UK80-BLA-66', 'UK 8.0', 'Black / Gold / White', 7, 0.00),
(67, 16, 'KING-TOP-196-UK85-BLA-67', 'UK 8.5', 'Black / Gold / White', 9, 0.00),
(68, 16, 'KING-TOP-196-UK90-BLA-68', 'UK 9.0', 'Black / Gold / White', 8, 0.00),
(69, 16, 'KING-TOP-196-UK95-BLA-69', 'UK 9.5', 'Black / Gold / White', 5, 0.00),
(70, 16, 'KING-TOP-196-UK100-BLA-70', 'UK 10.0', 'Black / Gold / White', 3, 0.00),
(71, 17, 'TOTAL-90-LAS-UK75-VAR-71', 'UK 7.5', 'Varsity Red / White / Black', 4, 0.00),
(72, 17, 'TOTAL-90-LAS-UK80-VAR-72', 'UK 8.0', 'Varsity Red / White / Black', 7, 0.00),
(73, 17, 'TOTAL-90-LAS-UK85-VAR-73', 'UK 8.5', 'Varsity Red / White / Black', 9, 0.00),
(74, 17, 'TOTAL-90-LAS-UK90-VAR-74', 'UK 9.0', 'Varsity Red / White / Black', 8, 0.00),
(75, 17, 'TOTAL-90-LAS-UK95-VAR-75', 'UK 9.5', 'Varsity Red / White / Black', 3, 0.00),
(76, 18, 'PREDATOR-MAN-UK80-CHA-76', 'UK 8.0', 'Champagne Cream / Red', 3, 0.00),
(77, 18, 'PREDATOR-MAN-UK85-CHA-77', 'UK 8.5', 'Champagne Cream / Red', 5, 0.00),
(78, 18, 'PREDATOR-MAN-UK90-CHA-78', 'UK 9.0', 'Champagne Cream / Red', 6, 0.00),
(79, 18, 'PREDATOR-MAN-UK95-CHA-79', 'UK 9.5', 'Champagne Cream / Red', 2, 0.00),
(80, 18, 'PREDATOR-MAN-UK100-CHA-80', 'UK 10.0', 'Champagne Cream / Red', 2, 0.00),
(81, 19, 'SPECIALI-PRO-UK80-DEE-81', 'UK 8.0', 'Deep Black / Pearl White', 6, 0.00),
(82, 19, 'SPECIALI-PRO-UK85-DEE-82', 'UK 8.5', 'Deep Black / Pearl White', 8, 0.00),
(83, 19, 'SPECIALI-PRO-UK90-DEE-83', 'UK 9.0', 'Deep Black / Pearl White', 7, 0.00),
(84, 19, 'SPECIALI-PRO-UK95-DEE-84', 'UK 9.5', 'Deep Black / Pearl White', 4, 0.00),
(85, 20, 'TIEMPO-PREMI-UK75-BLA-85', 'UK 7.5', 'Black / White / Volt', 5, 0.00),
(86, 20, 'TIEMPO-PREMI-UK80-BLA-86', 'UK 8.0', 'Black / White / Volt', 8, 0.00),
(87, 20, 'TIEMPO-PREMI-UK85-BLA-87', 'UK 8.5', 'Black / White / Volt', 10, 0.00),
(88, 20, 'TIEMPO-PREMI-UK90-BLA-88', 'UK 9.0', 'Black / White / Volt', 7, 0.00),
(89, 20, 'TIEMPO-PREMI-UK95-BLA-89', 'UK 9.5', 'Black / White / Volt', 3, 0.00),
(90, 21, 'MORELIA-CLAS-UK80-BLA-90', 'UK 8.0', 'Black / White / Red', 4, 0.00),
(91, 21, 'MORELIA-CLAS-UK85-BLA-91', 'UK 8.5', 'Black / White / Red', 6, 0.00),
(92, 21, 'MORELIA-CLAS-UK90-BLA-92', 'UK 9.0', 'Black / White / Red', 5, 0.00),
(93, 21, 'MORELIA-CLAS-UK95-BLA-93', 'UK 9.5', 'Black / White / Red', 3, 0.00),
(94, 22, 'MUNDIAL-TEAM-UK75-BLA-94', 'UK 7.5', 'Black / White', 7, 0.00),
(95, 22, 'MUNDIAL-TEAM-UK80-BLA-95', 'UK 8.0', 'Black / White', 11, 0.00),
(96, 22, 'MUNDIAL-TEAM-UK85-BLA-96', 'UK 8.5', 'Black / White', 14, 0.00),
(97, 22, 'MUNDIAL-TEAM-UK90-BLA-97', 'UK 9.0', 'Black / White', 9, 0.00),
(98, 22, 'MUNDIAL-TEAM-UK95-BLA-98', 'UK 9.5', 'Black / White', 4, 0.00),
(99, 23, 'SAMBA-CLASSI-UK70-COR-99', 'UK 7.0', 'Core Black / White / Gum', 8, 0.00),
(100, 23, 'SAMBA-CLASSI-UK80-COR-100', 'UK 8.0', 'Core Black / White / Gum', 15, 0.00),
(101, 23, 'SAMBA-CLASSI-UK85-COR-101', 'UK 8.5', 'Core Black / White / Gum', 18, 0.00),
(102, 23, 'SAMBA-CLASSI-UK90-COR-102', 'UK 9.0', 'Core Black / White / Gum', 14, 0.00),
(103, 23, 'SAMBA-CLASSI-UK100-COR-103', 'UK 10.0', 'Core Black / White / Gum', 6, 0.00),
(104, 24, 'GATO-VINTAGE-UK80-SAI-104', 'UK 8.0', 'Sail White / Burgundy / Gum', 6, 0.00),
(105, 24, 'GATO-VINTAGE-UK85-SAI-105', 'UK 8.5', 'Sail White / Burgundy / Gum', 9, 0.00),
(106, 24, 'GATO-VINTAGE-UK90-SAI-106', 'UK 9.0', 'Sail White / Burgundy / Gum', 8, 0.00),
(107, 24, 'GATO-VINTAGE-UK95-SAI-107', 'UK 9.5', 'Sail White / Burgundy / Gum', 4, 0.00),
(108, 25, 'PRO-TECH-ANT-MUK58-VIN-108', 'M (UK 5-8)', 'Vintage White', 25, 0.00),
(109, 25, 'PRO-TECH-ANT-LUK811-VIN-109', 'L (UK 8-11)', 'Vintage White', 40, 0.00),
(110, 25, 'PRO-TECH-ANT-LUK811-PIT-110', 'L (UK 8-11)', 'Pitch Black', 35, 0.00),
(111, 25, 'PRO-TECH-ANT-LUK811-BUR-111', 'L (UK 8-11)', 'Burgundy Red', 20, 0.00),
(112, 26, 'VINTAGE-RIBB-MUK68-VIN-112', 'M (UK 6-8)', 'Vintage Cream / Navy', 18, 0.00),
(113, 26, 'VINTAGE-RIBB-LUK912-VIN-113', 'L (UK 9-12)', 'Vintage Cream / Navy', 22, 0.00),
(114, 26, 'VINTAGE-RIBB-LUK912-BUR-114', 'L (UK 9-12)', 'Burgundy / Gold', 15, 0.00),
(115, 27, 'DUAL-GRIP-CU-MUK68-BLA-115', 'M (UK 6-8)', 'Black / Gold Accent', 20, 0.00),
(116, 27, 'DUAL-GRIP-CU-LUK85115-BLA-116', 'L (UK 8.5-11.5)', 'Black / Gold Accent', 30, 0.00),
(117, 28, 'CALF-COMPRES-OneSize-PUR-117', 'One Size', 'Pure White', 45, 0.00),
(118, 28, 'CALF-COMPRES-OneSize-DEE-118', 'One Size', 'Deep Black', 35, 0.00),
(119, 28, 'CALF-COMPRES-OneSize-BUR-119', 'One Size', 'Burgundy', 20, 0.00),
(120, 29, 'RETRO-STRIPE-M-CRE-120', 'M', 'Cream / Burgundy Hoops', 12, 0.00),
(121, 29, 'RETRO-STRIPE-L-CRE-121', 'L', 'Cream / Burgundy Hoops', 16, 0.00),
(122, 30, 'SILICONE-GRI-M-PIT-122', 'M', 'Pitch Black', 20, 0.00),
(123, 30, 'SILICONE-GRI-L-PIT-123', 'L', 'Pitch Black', 25, 0.00),
(124, 31, 'VINTAGE-CARB-S14cm-RAW-124', 'S (14cm)', 'Raw Carbon / Gold Script', 15, 0.00),
(125, 31, 'VINTAGE-CARB-M16cm-RAW-125', 'M (16cm)', 'Raw Carbon / Gold Script', 25, 0.00),
(126, 31, 'VINTAGE-CARB-L18cm-RAW-126', 'L (18cm)', 'Raw Carbon / Gold Script', 18, 0.00),
(127, 32, 'CLASSIC-FOAM-M-BLA-127', 'M', 'Black / White Umbro Diamond', 14, 0.00),
(128, 32, 'CLASSIC-FOAM-L-BLA-128', 'L', 'Black / White Umbro Diamond', 16, 0.00),
(129, 33, 'MICRO-PRO-MI-OneSize10cm-MAT-129', 'One Size (10cm)', 'Matte Black', 30, 0.00),
(130, 33, 'MICRO-PRO-MI-OneSize10cm-BUR-130', 'One Size (10cm)', 'Burgundy / Gold', 20, 0.00),
(131, 34, 'ZINC-OXIDE-S-Packof3-WHI-131', 'Pack of 3', 'White', 50, 0.00),
(132, 34, 'ZINC-OXIDE-S-Packof3-BLA-132', 'Pack of 3', 'Black', 40, 0.00),
(133, 35, 'REUSCH-ARROW-Size8-WHI-133', 'Size 8', 'White / Black / Gold Arrow', 4, 0.00),
(134, 35, 'REUSCH-ARROW-Size9-WHI-134', 'Size 9', 'White / Black / Gold Arrow', 8, 0.00),
(135, 35, 'REUSCH-ARROW-Size10-WHI-135', 'Size 10', 'White / Black / Gold Arrow', 7, 0.00),
(136, 35, 'REUSCH-ARROW-Size105-WHI-136', 'Size 10.5', 'White / Black / Gold Arrow', 3, 0.00),
(137, 36, 'RETRO-NEGATI-Size85-BUR-137', 'Size 8.5', 'Burgundy / Cream Palm', 6, 0.00),
(138, 36, 'RETRO-NEGATI-Size9-BUR-138', 'Size 9', 'Burgundy / Cream Palm', 9, 0.00),
(139, 36, 'RETRO-NEGATI-Size95-BUR-139', 'Size 9.5', 'Burgundy / Cream Palm', 7, 0.00),
(140, 36, 'RETRO-NEGATI-Size10-BUR-140', 'Size 10', 'Burgundy / Cream Palm', 5, 0.00),
(141, 37, 'CLASSIC-ROLL-Size8-BLA-141', 'Size 8', 'Blackout / White Foam', 5, 0.00),
(142, 37, 'CLASSIC-ROLL-Size9-BLA-142', 'Size 9', 'Blackout / White Foam', 8, 0.00),
(143, 37, 'CLASSIC-ROLL-Size10-BLA-143', 'Size 10', 'Blackout / White Foam', 6, 0.00),
(144, 38, 'PRO-GRIP-AQU-Size85-AQU-144', 'Size 8.5', 'Aqua Blue / Black', 5, 0.00),
(145, 38, 'PRO-GRIP-AQU-Size9-AQU-145', 'Size 9', 'Aqua Blue / Black', 8, 0.00),
(146, 38, 'PRO-GRIP-AQU-Size10-AQU-146', 'Size 10', 'Aqua Blue / Black', 6, 0.00),
(147, 39, '1970-VINTAGE-Size5Official-VIN-147', 'Size 5 (Official)', 'Vintage Black & White', 24, 0.00),
(148, 39, '1970-VINTAGE-Size5Official-RIC-148', 'Size 5 (Official)', 'Rich Antiqued Tan Leather', 16, 0.00),
(149, 40, 'MITRE-ULTIMA-Size5Match-WHI-149', 'Size 5 (Match)', 'White / Black / Gold Chevron', 18, 0.00),
(150, 41, 'HERITAGE-CON-Setof10-BUR-150', 'Set of 10', 'Burgundy & Cream', 30, 0.00),
(151, 42, 'HERITAGE-HEA-OneSize36x22x14cm-VIN-151', 'One Size (36x22x14cm)', 'Vintage Olive / Brown Leather', 18, 0.00),
(152, 42, 'HERITAGE-HEA-OneSize36x22x14cm-PIT-152', 'One Size (36x22x14cm)', 'Pitch Black / Tan Leather', 22, 0.00),
(153, 42, 'HERITAGE-HEA-OneSize36x22x14cm-DEE-153', 'One Size (36x22x14cm)', 'Deep Burgundy / Brass', 15, 0.00),
(154, 43, 'RETRO-MATCHD-45Litre-BLA-154', '45 Litre', 'Black / Off-White Piping', 14, 0.00),
(155, 43, 'RETRO-MATCHD-45Litre-NAV-155', '45 Litre', 'Navy / Red Stripe', 12, 0.00),
(156, 44, 'DELUXE-VINTA-StandardKit-NAT-156', 'Standard Kit', 'Natural Leather / Tin', 35, 0.00),
(157, 45, 'LEATHER-MATC-AdultStandard-DEE-157', 'Adult Standard', 'Deep Burgundy / Gold C', 25, 0.00),
(158, 45, 'LEATHER-MATC-AdultStandard-CLA-158', 'Adult Standard', 'Classic Black / White C', 30, 0.00),
(159, 46, 'CLASSIC-BRAS-Standard-POL-159', 'Standard', 'Polished Brass', 20, 0.00),
(160, 46, 'CLASSIC-BRAS-Standard-NIC-160', 'Standard', 'Nickel Silver', 22, 0.00),
(161, 47, 'DUAL-ACTION--Standard20cm-BRU-161', 'Standard 20cm', 'Brushed Silver', 28, 0.00),
(162, 47, 'DUAL-ACTION--Standard20cm-MAT-162', 'Standard 20cm', 'Matte Black', 25, 0.00);

-- ------------------------------------------------------------------------------
-- 6. Coupons (in Indian Rupees INR)
-- ------------------------------------------------------------------------------
INSERT INTO `coupons` (`id`, `code`, `description`, `discount_type`, `discount_value`, `min_order_amount`, `max_discount_amount`, `expiry_date`, `usage_limit`, `times_used`, `is_active`) VALUES
(1, 'RETRO10', '10% discount on orders over ₹2,499', 'percentage', 10.00, 2499.00, 1000.00, '2028-12-31', 500, 14, TRUE),
(2, 'BEAUTIFULGAME', '15% celebration discount on orders over ₹3,999', 'percentage', 15.00, 3999.00, 1500.00, '2028-12-31', 300, 22, TRUE),
(3, 'LEGEND500', '₹500 flat discount on premium orders over ₹4,999', 'fixed', 500.00, 4999.00, 500.00, '2028-12-31', 150, 8, TRUE),
(4, 'KICKOFF5', '5% welcome discount with no minimum purchase', 'percentage', 5.00, 0.00, 500.00, '2028-12-31', 1000, 31, TRUE);

-- ------------------------------------------------------------------------------
-- 7. Carts & Cart Items
-- Pre-seed an active cart for Marcus Vance (User 2)
-- ------------------------------------------------------------------------------
INSERT INTO `carts` (`id`, `user_id`) VALUES
(1, 2),
(2, 3);

INSERT INTO `cart_items` (`id`, `cart_id`, `variant_id`, `quantity`) VALUES
(1, 1, 2, 1), -- France 98 Retro (M) ₹2,799
(2, 1, 74, 2); -- Pro Tech Grip Socks (L) 2 x ₹599 = ₹1,198

-- ------------------------------------------------------------------------------
-- 8. Wishlists & Items
-- ------------------------------------------------------------------------------
INSERT INTO `wishlists` (`id`, `user_id`) VALUES
(1, 2),
(2, 3);

INSERT INTO `wishlist_items` (`id`, `wishlist_id`, `product_id`) VALUES
(1, 1, 2), -- 1990 Germany
(2, 1, 15), -- Copa Mundial
(3, 1, 39); -- 1970 Leather Football

-- ------------------------------------------------------------------------------
-- 9. Orders, Order Items & Payments (In INR)
-- ------------------------------------------------------------------------------
INSERT INTO `orders` (`id`, `order_number`, `user_id`, `address_id`, `recipient_name`, `shipping_address`, `phone`, `subtotal`, `discount_amount`, `coupon_code`, `shipping_fee`, `total_amount`, `payment_method`, `payment_status`, `order_status`, `created_at`) VALUES
(1, 'ORD-2026-1001', 2, 1, 'Marcus Vance', '14 Marine Drive, Sea Face Towers, Flat 4B, Mumbai, Maharashtra, 400020, India', '+91 98201 54321', 8999.00, 899.90, 'RETRO10', 0.00, 8099.10, 'card', 'paid', 'Delivered', '2026-09-12 14:20:00'),
(2, 'ORD-2026-1002', 3, 3, 'David Maldini', '88 Park Street, Apt 12, Kolkata, West Bengal, 700016, India', '+91 98202 67890', 11998.00, 500.00, 'LEGEND500', 0.00, 11498.00, 'card', 'paid', 'Delivered', '2026-09-25 11:45:00'),
(3, 'ORD-2026-1003', 4, 4, 'Sofia Zidane', '5 Connaught Place, Block C, Suite 404, New Delhi, Delhi, 110001, India', '+91 98203 98765', 3199.00, 0.00, NULL, 0.00, 3199.00, 'cod', 'pending', 'Processing', '2026-10-15 16:30:00'),
(4, 'ORD-2026-1004', 2, 1, 'Marcus Vance', '14 Marine Drive, Sea Face Towers, Flat 4B, Mumbai, Maharashtra, 400020, India', '+91 98201 54321', 5698.00, 854.70, 'BEAUTIFULGAME', 0.00, 4843.30, 'online_demo', 'paid', 'Confirmed', '2026-10-19 10:15:00'),
(5, 'ORD-2026-1005', 3, 3, 'David Maldini', '88 Park Street, Apt 12, Kolkata, West Bengal, 700016, India', '+91 98202 67890', 2799.00, 0.00, NULL, 0.00, 2799.00, 'card', 'paid', 'Pending', '2026-10-21 09:05:00');

INSERT INTO `order_items` (`id`, `order_id`, `variant_id`, `product_id`, `product_name_snapshot`, `sku_snapshot`, `size_snapshot`, `color_snapshot`, `unit_price`, `quantity`, `subtotal`) VALUES
(1, 1, 55, 15, 'Copa Mundial Retro Pure Leather FG', 'COPA-MUND-UK85-1', 'UK 8.5', 'Core Black / Cloud White', 8999.00, 1, 8999.00),
(2, 2, 7, 2, '1990 West Germany Home Retro Shirt', '1990-GER-M-2', 'M', 'Vintage White / Tricolor', 2999.00, 1, 2999.00),
(3, 2, 57, 15, 'Copa Mundial Retro Pure Leather FG', 'COPA-MUND-UK9-3', 'UK 9.0', 'Core Black / Cloud White', 8999.00, 1, 8999.00),
(4, 3, 61, 23, 'Real Madrid Centenary White Kit', 'REAL-2002-M-4', 'M', 'Blanco White', 3199.00, 1, 3199.00),
(5, 4, 18, 5, '1992 Manchester United Newton Heath Away Shirt', 'MANU-1992-M-5', 'M', 'Green / Gold', 3199.00, 1, 3199.00),
(6, 4, 65, 39, '1970 Vintage 32-Panel Leather Football', 'BALL-1970-SIZE5-6', 'Size 5 (Official)', 'Vintage Black & White', 2499.00, 1, 2499.00),
(7, 5, 2, 1, '1998 France Home Retro Jersey', 'FRA-1998-M-7', 'M', 'Royal Blue / Red', 2799.00, 1, 2799.00);

INSERT INTO `payments` (`id`, `order_id`, `payment_method`, `transaction_reference`, `amount`, `payment_status`, `payment_date`) VALUES
(1, 1, 'card', 'TXN-RETRO-908129', 8099.10, 'completed', '2026-09-12 14:22:00'),
(2, 2, 'card', 'TXN-RETRO-914582', 11498.00, 'completed', '2026-09-25 11:47:00'),
(3, 4, 'online_demo', 'TXN-RETRO-993104', 4843.30, 'completed', '2026-10-19 10:16:00'),
(4, 5, 'card', 'TXN-RETRO-998432', 2799.00, 'completed', '2026-10-21 09:07:00');

-- ------------------------------------------------------------------------------
-- 10. Reviews
-- ------------------------------------------------------------------------------
INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `review_title`, `review_text`, `is_verified_buyer`, `created_at`) VALUES
(1, 2, 1, 5, 'Unbelievable retro quality', 'The fabric and embroidery on this 1998 France shirt are immaculate. Feels just like the original heavyweight jerseys from that era. Pure nostalgia!', TRUE, '2026-09-15 10:00:00'),
(2, 3, 2, 5, 'The greatest kit of all time', 'The geometric tri-color chest block is perfection. Wore it to a matchday screening and got endless compliments. Sizing is spot-on relaxed 90s fit.', TRUE, '2026-09-28 16:30:00'),
(3, 4, 15, 5, 'Nothing beats genuine K-leather', 'The touch on the ball with these Copas is incomparable. Modern plastic boots just cannot compete with this level of leather craftsmanship.', TRUE, '2026-10-02 12:15:00'),
(4, 2, 25, 5, 'Absolute game changer for matchdays', 'The grip socks lock your foot into the boot instantly. Zero slipping, zero blisters. Throw out your normal socks and grab three pairs of these.', TRUE, '2026-10-05 18:20:00'),
(5, 3, 39, 5, 'A piece of football art', 'Bought this 1970 hand-stitched ball for my office shelf. It smells like pure leather and looks magnificent. Real heritage football soul.', TRUE, '2026-10-10 14:40:00');

-- ------------------------------------------------------------------------------
-- 11. Newsletter Subscribers
-- ------------------------------------------------------------------------------
INSERT INTO `newsletter_subscribers` (`id`, `email`, `subscription_date`, `is_active`) VALUES
(1, 'collector@vintagefootball.com', '2026-08-01 10:00:00', TRUE),
(2, 'striker9@matchdayculture.in', '2026-08-15 12:30:00', TRUE),
(3, 'curator@retrojerseyarchive.in', '2026-09-02 17:45:00', TRUE),
(4, 'marcus@retrostore.com', '2026-09-10 11:20:00', TRUE);
