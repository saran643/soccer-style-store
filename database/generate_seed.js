// database/generate_seed.js
const fs = require('fs');
const path = require('path');

const adminHash = '$2a$10$ToVBKYNNWukBhxjB2k7uieyJDdIHckET/y3l.jZ5EyYAPDWhYbnBu'; // Admin@123
const customerHash = '$2a$10$skiiIFVZZFuP6WbFyJ3iRuUBXxiYPD8aZ4yCq0tBjdVpsEBLEe0.m'; // Customer@123

const categories = [
  { id: 1, name: 'Retro Jerseys', slug: 'retro-jerseys', desc: 'Timeless football jerseys from legendary World Cups, European championships, and iconic domestic campaigns.', img: '/images/categories/cat-retro-jerseys.svg', order: 1 },
  { id: 2, name: 'Football Boots', slug: 'football-boots', desc: 'Classic kangaroo leather boots, iconic predators, and vintage silhouettes engineered for modern pitches.', img: '/images/categories/cat-football-boots.svg', order: 2 },
  { id: 3, name: 'Socks & Grip', slug: 'socks-grip', desc: 'Anti-slip grip technology, heritage ribbed football socks, and pro-level matchday compression sleeves.', img: '/images/categories/cat-socks-grip.svg', order: 3 },
  { id: 4, name: 'Shin Guards & Protection', slug: 'shin-guards-protection', desc: 'Minimalist carbon fibre pads, vintage padded ankle shields, and heavy-duty strapping.', img: '/images/categories/cat-shin-guards.svg', order: 4 },
  { id: 5, name: 'Goalkeeper Gloves', slug: 'goalkeeper-gloves', desc: 'Heritage 1980s retro aesthetics paired with 4mm pro contact latex for matchday supremacy.', img: '/images/categories/cat-goalkeeper-gloves.svg', order: 5 },
  { id: 6, name: 'Footballs & Equipment', slug: 'footballs-training', desc: 'Authentic 32-panel hand-stitched leather match balls, training cones, agility kits, and vintage referee gear.', img: '/images/categories/cat-footballs-training.svg', order: 6 },
  { id: 7, name: 'Bags & Luggage', slug: 'bags-luggage', desc: 'Waxed canvas boot bags, leather weekenders, and heritage kit bags designed for true footballers.', img: '/images/categories/cat-bags-luggage.svg', order: 7 },
  { id: 8, name: 'Accessories & Care', slug: 'accessories-care', desc: 'Premium boot dubbin, horsehair brushes, vintage captain armbands, ball pumps, and pitch accessories.', img: '/images/categories/cat-accessories-care.svg', order: 8 }
];

const brands = [
  { id: 1, name: 'Retro Store Atelier', slug: 'retro-store-atelier', logo: '/brands/retro-store-atelier.svg', desc: 'Our handcrafted in-house boutique collection of bespoke retro recreations and football essentials.' },
  { id: 2, name: 'Umbro Heritage', slug: 'umbro-heritage', logo: '/brands/umbro-heritage.svg', desc: 'The double diamond standard of British football heritage since 1924.' },
  { id: 3, name: 'Adidas Originals Football', slug: 'adidas-originals-football', logo: '/brands/adidas-originals.svg', desc: 'The three stripes of football history: from Bern 1954 to the iconic Predator era.' },
  { id: 4, name: 'Nike Heritage Football', slug: 'nike-heritage-football', logo: '/brands/nike-heritage.svg', desc: 'Iconic Total 90, Joga Bonito, and classic European club kits.' },
  { id: 5, name: 'Kappa Vintage', slug: 'kappa-vintage', logo: '/brands/kappa-vintage.svg', desc: 'Italian sportswear elegance, famed Omini tape, and 90s Serie A mastery.' },
  { id: 6, name: 'Lotto Classic', slug: 'lotto-classic', logo: '/brands/lotto-classic.svg', desc: 'Venetian craftsmanship worn by the greatest continental football champions.' },
  { id: 7, name: 'Puma King Retro', slug: 'puma-king-retro', logo: '/brands/puma-king-retro.svg', desc: 'Worn by Pelé, Cruyff, and Maradona. The pinnacle of timeless black boot style.' },
  { id: 8, name: 'Mitre Classic', slug: 'mitre-classic', logo: '/brands/mitre-classic.svg', desc: 'The world\'s oldest sports equipment brand, makers of the legendary Ultimax.' },
  { id: 9, name: 'Reusch Pro Goalkeeping', slug: 'reusch-pro', logo: '/brands/reusch-pro.svg', desc: 'German engineering and championship heritage for shot stoppers worldwide.' },
  { id: 10, name: 'GripMaster Pro', slug: 'gripmaster-pro', logo: '/brands/gripmaster-pro.svg', desc: 'The gold standard in anti-slip football grip socks and ankle stability.' }
];

const productsData = [
  // Retro Jerseys (Cat 1) - INR Rates: ₹2,499 - ₹3,499
  {
    name: '1998 France Home Retro Jersey',
    slug: '1998-france-home-retro-jersey',
    cat: 1, brand: 3,
    price: 2799.00, origPrice: 3499.00, discount: 20,
    surface: 'N/A', era: '1998',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.95, reviews: 38,
    desc: 'The iconic royal blue kit worn as Les Bleus lifted the 1998 World Cup on home turf in Saint-Denis. Features the red horizontal chest band with three white stripes and vintage ribbed collar.',
    details: '100% Breathable Jacquard Polyester; Embroidered cockerel crest with golden World Cup star; Ribbed tricolor collar and cuff trims; Machine washable at 30°C.',
    img: '/images/products/france-1998-home.jpg',
    secondaryImg: '/images/products/france-1998-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Royal Blue / Red', stock: 12 },
      { size: 'M', color: 'Royal Blue / Red', stock: 18 },
      { size: 'L', color: 'Royal Blue / Red', stock: 15 },
      { size: 'XL', color: 'Royal Blue / Red', stock: 8 },
      { size: 'XXL', color: 'Royal Blue / Red', stock: 4 }
    ]
  },
  {
    name: '1990 West Germany Home Retro Shirt',
    slug: '1990-west-germany-home-retro-shirt',
    cat: 1, brand: 3,
    price: 2999.00, origPrice: 3699.00, discount: 19,
    surface: 'N/A', era: '1990',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.98, reviews: 45,
    desc: 'Widely regarded as the single greatest football shirt design in history. Worn by Matthäus, Klinsmann, and Brehme during their Italia 90 triumph, featuring the striking angular tricolor chest chevron.',
    details: 'High-density micro-polyester; Geometric chest graphic; Classic polo neck collar with V-insert; Relaxed 90s silhouette fit.',
    img: '/images/products/germany-1990-home.jpg',
    secondaryImg: '/images/products/germany-1990-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Vintage White / Tricolor', stock: 10 },
      { size: 'M', color: 'Vintage White / Tricolor', stock: 20 },
      { size: 'L', color: 'Vintage White / Tricolor', stock: 16 },
      { size: 'XL', color: 'Vintage White / Tricolor', stock: 7 },
      { size: 'XXL', color: 'Vintage White / Tricolor', stock: 3 }
    ]
  },
  {
    name: '1994 Brazil World Cup Home Retro Shirt',
    slug: '1994-brazil-world-cup-home-retro-shirt',
    cat: 1, brand: 2,
    price: 2699.00, origPrice: 3299.00, discount: 18,
    surface: 'N/A', era: '1994',
    featured: 1, bestseller: 0, newArr: 0,
    rating: 4.90, reviews: 29,
    desc: 'The vibrant canary yellow shirt worn by Romário and Bebeto at USA 94 to capture the Seleção\'s fourth World Cup crown. Features subtle embossed federation crests embedded in the fabric.',
    details: 'Subtle tone-on-tone CBF jacquard pattern; Green ribbed v-neck; Embroidered four-star crest; Quick-drying vintage mesh.',
    img: '/images/products/brazil-1994-home.jpg',
    secondaryImg: '/images/products/brazil-1994-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Canary Yellow / Green', stock: 8 },
      { size: 'M', color: 'Canary Yellow / Green', stock: 14 },
      { size: 'L', color: 'Canary Yellow / Green', stock: 12 },
      { size: 'XL', color: 'Canary Yellow / Green', stock: 6 }
    ]
  },
  {
    name: '1998 Arsenal Away "JVC" Retro Jersey',
    slug: '1998-arsenal-away-jvc-retro-jersey',
    cat: 1, brand: 4,
    price: 2899.00, origPrice: 3599.00, discount: 19,
    surface: 'N/A', era: '1998',
    featured: 0, bestseller: 1, newArr: 0,
    rating: 4.92, reviews: 33,
    desc: 'The iconic navy and bright yellow away shirt from Arsenal\'s historic 1997/98 Double-winning season under Arsène Wenger. Worn by Dennis Bergkamp, Ian Wright, and Patrick Vieira.',
    details: 'Two-tone navy and gold chest block; Iconic velvet-feel felt JVC front sponsor; Classic woven club crest; Heavyweight moisture-wicking weave.',
    img: '/images/products/arsenal-1998-away.jpg',
    secondaryImg: '/images/products/arsenal-1998-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Navy / Solar Yellow', stock: 9 },
      { size: 'M', color: 'Navy / Solar Yellow', stock: 15 },
      { size: 'L', color: 'Navy / Solar Yellow', stock: 11 },
      { size: 'XL', color: 'Navy / Solar Yellow', stock: 5 }
    ]
  },
  {
    name: '1992 Manchester United "Newton Heath" Away Shirt',
    slug: '1992-man-united-newton-heath-away-shirt',
    cat: 1, brand: 2,
    price: 3199.00, origPrice: 3999.00, discount: 20,
    surface: 'N/A', era: '1992',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.96, reviews: 41,
    desc: 'The legendary green and gold lace-neck shirt commemorating the club\'s 1878 founding as Newton Heath LYR. Worn by Eric Cantona in his debut Old Trafford season.',
    details: 'Split green and deep yellow halves; Working lace-up collar; Woven heritage crest; Embossed sponsor print.',
    img: '/images/products/man-utd-1992-newton-heath.jpg',
    secondaryImg: '/images/products/man-utd-1992-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Green / Gold', stock: 7 },
      { size: 'M', color: 'Green / Gold', stock: 13 },
      { size: 'L', color: 'Green / Gold', stock: 10 },
      { size: 'XL', color: 'Green / Gold', stock: 4 }
    ]
  },
  {
    name: '1998 AC Milan Centenary Home Shirt',
    slug: '1998-ac-milan-centenary-home-shirt',
    cat: 1, brand: 3,
    price: 2999.00, origPrice: 3699.00, discount: 19,
    surface: 'N/A', era: '1998',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.88, reviews: 22,
    desc: 'Special edition Rossoneri kit honoring 100 years of the Milanese giants. Classic razor-sharp red and black vertical stripes with the historic St. George Cross crest.',
    details: 'Historic centenary emblem; Crisp polo collar; Opel chest sponsor; Tailored Italian athletic drape.',
    img: '/images/products/ac-milan-1998-home.svg',
    secondaryImg: '/images/products/ac-milan-1998-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Rossoneri Red / Black', stock: 11 },
      { size: 'M', color: 'Rossoneri Red / Black', stock: 14 },
      { size: 'L', color: 'Rossoneri Red / Black', stock: 9 },
      { size: 'XL', color: 'Rossoneri Red / Black', stock: 5 }
    ]
  },
  {
    name: '1996 England Home "Euro 96" Retro Shirt',
    slug: '1996-england-home-euro-96-retro-shirt',
    cat: 1, brand: 2,
    price: 2799.00, origPrice: 3499.00, discount: 20,
    surface: 'N/A', era: '1996',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.93, reviews: 36,
    desc: 'The summer of 96, Football Coming Home, and Paul Gascoigne\'s dentist chair celebration against Scotland. Woven in brilliant pure white with indigo and sky blue accent ribbing.',
    details: 'Woven Three Lions shield; Vintage turqouise tipping on collar; Heavy-weight moisture control knit; Centered crest.',
    img: '/images/products/england-1996-home.svg',
    secondaryImg: '/images/products/england-1996-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'White / Sky Navy', stock: 14 },
      { size: 'M', color: 'White / Sky Navy', stock: 19 },
      { size: 'L', color: 'White / Sky Navy', stock: 16 },
      { size: 'XL', color: 'White / Sky Navy', stock: 8 },
      { size: 'XXL', color: 'White / Sky Navy', stock: 5 }
    ]
  },
  {
    name: '1997 Inter Milan Third "Ronaldo 9" Uefa Cup Jersey',
    slug: '1997-inter-milan-third-ronaldo-jersey',
    cat: 1, brand: 2,
    price: 3299.00, origPrice: 3999.00, discount: 18,
    surface: 'N/A', era: '1997',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.97, reviews: 48,
    desc: 'The unforgettable horizontal grey and black striped masterpiece worn by Il Fenomeno Ronaldo in Paris as he stepped over Marchegiani to seal the 1998 UEFA Cup.',
    details: 'Horizontal alternating bands; Pirelli flock sponsor; Golden star over badge; Authentic ribbed collar with v-neck insert.',
    img: '/images/products/inter-milan-1997-third.svg',
    secondaryImg: '/images/products/inter-milan-1997-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Grey / Black / Blue', stock: 8 },
      { size: 'M', color: 'Grey / Black / Blue', stock: 14 },
      { size: 'L', color: 'Grey / Black / Blue', stock: 12 },
      { size: 'XL', color: 'Grey / Black / Blue', stock: 6 }
    ]
  },
  {
    name: '1986 Argentina World Cup Away Shirt',
    slug: '1986-argentina-world-cup-away-shirt',
    cat: 1, brand: 1,
    price: 2999.00, origPrice: 3699.00, discount: 19,
    surface: 'N/A', era: '1986',
    featured: 0, bestseller: 1, newArr: 0,
    rating: 4.96, reviews: 52,
    desc: 'The famous deep royal blue away shirt worn by Diego Armando Maradona at the Azteca against England for the Goal of the Century.',
    details: 'Lustrous aerated vintage cotton-poly blend; Silver-glint heat-pressed numbers; Classic v-neck collar with white piping.',
    img: '/images/products/argentina-1986-away.svg',
    secondaryImg: '/images/products/argentina-1986-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Deep Royal Blue', stock: 10 },
      { size: 'M', color: 'Deep Royal Blue', stock: 16 },
      { size: 'L', color: 'Deep Royal Blue', stock: 11 },
      { size: 'XL', color: 'Deep Royal Blue', stock: 5 }
    ]
  },
  {
    name: '1996 Newcastle United Home "Brown Ale" Jersey',
    slug: '1996-newcastle-united-home-brown-ale-jersey',
    cat: 1, brand: 3,
    price: 2899.00, origPrice: 3499.00, discount: 17,
    surface: 'N/A', era: '1996',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.89, reviews: 25,
    desc: 'The iconic Newcastle United home kit worn during the Entertainers season by Alan Shearer, David Ginola, and Peter Beardsley. Features the classic grandad button collar.',
    details: 'Thick black and white vertical stripes; Blue Star Newcastle Brown Ale emblem; Grandad button neckline; Heritage crest.',
    img: '/images/products/newcastle-1996-home.svg',
    secondaryImg: '/images/products/newcastle-1996-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Black / White', stock: 9 },
      { size: 'M', color: 'Black / White', stock: 15 },
      { size: 'L', color: 'Black / White', stock: 13 },
      { size: 'XL', color: 'Black / White', stock: 7 }
    ]
  },
  {
    name: '1998 Ajax Amsterdam Home Jersey',
    slug: '1998-ajax-amsterdam-home-jersey',
    cat: 1, brand: 2,
    price: 2699.00, origPrice: 3299.00, discount: 18,
    surface: 'N/A', era: '1998',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.87, reviews: 19,
    desc: 'Pure Dutch football elegance. The iconic thick center red block bordered by crisp white, with vertical ABN AMRO sponsor lettering.',
    details: 'Classic 90s polyester with subtle watermark pattern; Central red panel; Vertical sponsor orientation; Woven badge on heart.',
    img: '/images/products/ajax-1998-home.svg',
    secondaryImg: '/images/products/ajax-1998-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'White / Scarlet Red', stock: 8 },
      { size: 'M', color: 'White / Scarlet Red', stock: 12 },
      { size: 'L', color: 'White / Scarlet Red', stock: 10 },
      { size: 'XL', color: 'White / Scarlet Red', stock: 4 }
    ]
  },
  {
    name: '1994 Italy World Cup Home Jersey',
    slug: '1994-italy-world-cup-home-jersey',
    cat: 1, brand: 6,
    price: 2899.00, origPrice: 3599.00, discount: 19,
    surface: 'N/A', era: '1994',
    featured: 1, bestseller: 0, newArr: 1,
    rating: 4.94, reviews: 31,
    desc: 'The legendary Azzurri shirt worn by Roberto Baggio and Franco Baresi in Pasadena. Features exquisite subtle jacquard triangles and tricolor ribbed collar details.',
    details: 'Azzurro blue sheen finish; Tricolor sleeve cuff detailing; Woven FIGC badge with three golden stars; Classic tailored collar.',
    img: '/images/products/italy-1994-home.svg',
    secondaryImg: '/images/products/italy-1994-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Azzurri Blue', stock: 11 },
      { size: 'M', color: 'Azzurri Blue', stock: 17 },
      { size: 'L', color: 'Azzurri Blue', stock: 14 },
      { size: 'XL', color: 'Azzurri Blue', stock: 6 }
    ]
  },
  {
    name: '2002 Real Madrid Centenary White Kit',
    slug: '2002-real-madrid-centenary-white-kit',
    cat: 1, brand: 3,
    price: 3199.00, origPrice: 3899.00, discount: 18,
    surface: 'N/A', era: '2002',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.97, reviews: 44,
    desc: 'The pristine sponsorless white centenary shirt worn as Zinedine Zidane scored the greatest Champions League volley in history at Hampden Park.',
    details: 'Pure sponsorless clean aesthetic; Commemorative 1902-2002 sleeve embroidery; Premium climacool double knit; Ribbed v-neck.',
    img: '/images/products/real-madrid-2002-centenary.svg',
    secondaryImg: '/images/products/real-madrid-2002-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'Blanco White', stock: 15 },
      { size: 'M', color: 'Blanco White', stock: 22 },
      { size: 'L', color: 'Blanco White', stock: 18 },
      { size: 'XL', color: 'Blanco White', stock: 9 }
    ]
  },
  {
    name: '1990 Netherlands Away Retro Shirt',
    slug: '1990-netherlands-away-retro-shirt',
    cat: 1, brand: 3,
    price: 2799.00, origPrice: 3399.00, discount: 18,
    surface: 'N/A', era: '1990',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.88, reviews: 18,
    desc: 'The striking white and royal blue geometric shirt worn by Gullit, Van Basten, and Rijkaard at Italia 90.',
    details: 'Subtle tile graphic pattern across chest and shoulders; Classic Dutch Lion crest in black; Ribbed collar with snap tab.',
    img: '/images/products/netherlands-1990-away.svg',
    secondaryImg: '/images/products/netherlands-1990-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S', color: 'White / Royal Blue', stock: 9 },
      { size: 'M', color: 'White / Royal Blue', stock: 13 },
      { size: 'L', color: 'White / Royal Blue', stock: 11 },
      { size: 'XL', color: 'White / Royal Blue', stock: 5 }
    ]
  },

  // Football Boots (Cat 2) - INR Rates: ₹4,999 - ₹12,999
  {
    name: 'Copa Mundial Retro Pure Leather FG',
    slug: 'copa-mundial-retro-pure-leather-fg',
    cat: 2, brand: 3,
    price: 8999.00, origPrice: 10999.00, discount: 18,
    surface: 'FG', era: 'Classic',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.96, reviews: 60,
    desc: 'The best-selling football boot in world history. Crafted from premium Kangaroo leather for timeless touch, supreme durability, and glove-like comfort on firm natural pitches.',
    details: 'K-leather upper for touch; Molded direct-injected polyurethane outsole with 12 round studs; Fold-over tongue; Made for firm grass.',
    img: '/images/products/copa-mundial-fg.jpg',
    secondaryImg: '/images/products/copa-mundial-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 7.5', color: 'Core Black / Cloud White', stock: 5 },
      { size: 'UK 8.0', color: 'Core Black / Cloud White', stock: 8 },
      { size: 'UK 8.5', color: 'Core Black / Cloud White', stock: 12 },
      { size: 'UK 9.0', color: 'Core Black / Cloud White', stock: 10 },
      { size: 'UK 9.5', color: 'Core Black / Cloud White', stock: 6 },
      { size: 'UK 10.0', color: 'Core Black / Cloud White', stock: 4 }
    ]
  },
  {
    name: 'King Top 1968 Black & White Classic FG',
    slug: 'king-top-1968-classic-fg',
    cat: 2, brand: 7,
    price: 7499.00, origPrice: 8999.00, discount: 17,
    surface: 'FG', era: 'Classic',
    featured: 1, bestseller: 0, newArr: 0,
    rating: 4.91, reviews: 37,
    desc: 'The boot that crowned legends. Soft calf leather with stitched vamp detailing, white side formstrip, and iconic fold-over tongue bearing the gold Puma King seal.',
    details: 'Full-grain calf leather; Conical studs for 360-degree rotational traction; Padded ankle collar; Classic low-cut profile.',
    img: '/images/products/puma-king-1968.jpg',
    secondaryImg: '/images/products/puma-king-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 8.0', color: 'Black / Gold / White', stock: 7 },
      { size: 'UK 8.5', color: 'Black / Gold / White', stock: 9 },
      { size: 'UK 9.0', color: 'Black / Gold / White', stock: 8 },
      { size: 'UK 9.5', color: 'Black / Gold / White', stock: 5 },
      { size: 'UK 10.0', color: 'Black / Gold / White', stock: 3 }
    ]
  },
  {
    name: 'Total 90 Laser I Heritage Re-Edition FG',
    slug: 'total-90-laser-1-heritage-fg',
    cat: 2, brand: 4,
    price: 11499.00, origPrice: 13999.00, discount: 18,
    surface: 'FG', era: '2007',
    featured: 1, bestseller: 1, newArr: 1,
    rating: 4.98, reviews: 54,
    desc: 'The ultimate power and precision boot. Features the famous off-center lacing, circular Sweet Spot strike zone, and high-density rubber fins.',
    details: 'K-PES synthetic leather; Sweet spot precision shield; Zoom Air heel unit for explosive damping; Circular FG stud config.',
    img: '/images/products/total-90-laser.jpg',
    secondaryImg: '/images/products/total-90-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1511426463457-0571e247d816?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 7.5', color: 'Varsity Red / White / Black', stock: 4 },
      { size: 'UK 8.0', color: 'Varsity Red / White / Black', stock: 7 },
      { size: 'UK 8.5', color: 'Varsity Red / White / Black', stock: 9 },
      { size: 'UK 9.0', color: 'Varsity Red / White / Black', stock: 8 },
      { size: 'UK 9.5', color: 'Varsity Red / White / Black', stock: 3 }
    ]
  },
  {
    name: 'Predator Mania Champagne 2002 Edition FG',
    slug: 'predator-mania-champagne-2002-fg',
    cat: 2, brand: 3,
    price: 13999.00, origPrice: 16999.00, discount: 18,
    surface: 'FG', era: '2002',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.99, reviews: 72,
    desc: 'The holy grail of football footwear. Champagne cream leather, curved red rubber swerve elements, external heel counter, and elasticated tongue strap.',
    details: 'Premium leather upper; Asymmetrical lacing with elasticated fold-over tongue; Rubber striking ribs for ball swerve; Split soleplate.',
    img: '/images/products/predator-mania-2002.jpg',
    secondaryImg: '/images/products/predator-mania-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 8.0', color: 'Champagne Cream / Red', stock: 3 },
      { size: 'UK 8.5', color: 'Champagne Cream / Red', stock: 5 },
      { size: 'UK 9.0', color: 'Champagne Cream / Red', stock: 6 },
      { size: 'UK 9.5', color: 'Champagne Cream / Red', stock: 2 },
      { size: 'UK 10.0', color: 'Champagne Cream / Red', stock: 2 }
    ]
  },
  {
    name: 'Speciali Pro Heritage K-Leather SG',
    slug: 'speciali-pro-heritage-k-leather-sg',
    cat: 2, brand: 2,
    price: 6999.00, origPrice: 8499.00, discount: 18,
    surface: 'SG', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.88, reviews: 26,
    desc: 'The English wet-pitch workhorse. Soft Kangaroo leather matched with 6-stud detachable metal tips for unstoppable traction in deep winter turf.',
    details: 'K-leather quilted forefoot; Wishbone support frame; Interchangeable metal studs; Memory foam tongue cushioning.',
    img: '/images/products/speciali-pro-sg.svg',
    secondaryImg: '/images/products/speciali-pro-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 8.0', color: 'Deep Black / Pearl White', stock: 6 },
      { size: 'UK 8.5', color: 'Deep Black / Pearl White', stock: 8 },
      { size: 'UK 9.0', color: 'Deep Black / Pearl White', stock: 7 },
      { size: 'UK 9.5', color: 'Deep Black / Pearl White', stock: 4 }
    ]
  },
  {
    name: 'Tiempo Premier Vintage Leather AG',
    slug: 'tiempo-premier-vintage-leather-ag',
    cat: 2, brand: 4,
    price: 6499.00, origPrice: 7999.00, discount: 19,
    surface: 'AG', era: 'Classic',
    featured: 0, bestseller: 1, newArr: 0,
    rating: 4.90, reviews: 34,
    desc: 'Engineered specifically for 3G/4G artificial turf. Supple calfskin with reinforced toe bumpers and conical hollow studs to reduce knee strain.',
    details: 'Soft touch calfskin; Specially designed AG multi-stud soleplate; Reinforced wear zones; Lunarlon cushioning insole.',
    img: '/images/products/tiempo-premier-ag.svg',
    secondaryImg: '/images/products/tiempo-premier-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 7.5', color: 'Black / White / Volt', stock: 5 },
      { size: 'UK 8.0', color: 'Black / White / Volt', stock: 8 },
      { size: 'UK 8.5', color: 'Black / White / Volt', stock: 10 },
      { size: 'UK 9.0', color: 'Black / White / Volt', stock: 7 },
      { size: 'UK 9.5', color: 'Black / White / Volt', stock: 3 }
    ]
  },
  {
    name: 'Morelia Classic Heritage Black FG',
    slug: 'morelia-classic-heritage-fg',
    cat: 2, brand: 1,
    price: 9499.00, origPrice: 11499.00, discount: 17,
    surface: 'FG', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.93, reviews: 27,
    desc: 'Handmade perfection. Featherweight natural leather with traditional wave-stitched vamp, providing unparalleled touch on firm grass pitches.',
    details: 'Ultra-thin kangaroo leather; Graded nylon soleplate; Internal heel counter for lock-in; Crafted with 24-hour lasting process.',
    img: '/images/products/morelia-classic-fg.svg',
    secondaryImg: '/images/products/morelia-classic-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 8.0', color: 'Black / White / Red', stock: 4 },
      { size: 'UK 8.5', color: 'Black / White / Red', stock: 6 },
      { size: 'UK 9.0', color: 'Black / White / Red', stock: 5 },
      { size: 'UK 9.5', color: 'Black / White / Red', stock: 3 }
    ]
  },
  {
    name: 'Mundial Team Retro Leather Turf TF',
    slug: 'mundial-team-retro-leather-tf',
    cat: 2, brand: 3,
    price: 5999.00, origPrice: 7299.00, discount: 18,
    surface: 'TF', era: 'Classic',
    featured: 0, bestseller: 1, newArr: 0,
    rating: 4.94, reviews: 42,
    desc: 'The king of cage football and AstroTurf. Split-suede toe protection, bouncy EVA midsole, and hundreds of micro rubber studs for explosive traction.',
    details: 'Kangaroo leather vamp with suede abrasion wrap; Multi-cleated rubber soleplate; Die-cut EVA cushioning; Low profile collar.',
    img: '/images/products/mundial-team-tf.svg',
    secondaryImg: '/images/products/mundial-team-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 7.5', color: 'Black / White', stock: 7 },
      { size: 'UK 8.0', color: 'Black / White', stock: 11 },
      { size: 'UK 8.5', color: 'Black / White', stock: 14 },
      { size: 'UK 9.0', color: 'Black / White', stock: 9 },
      { size: 'UK 9.5', color: 'Black / White', stock: 4 }
    ]
  },
  {
    name: 'Samba Classic Heritage Leather IC',
    slug: 'samba-classic-heritage-ic',
    cat: 2, brand: 3,
    price: 4999.00, origPrice: 5999.00, discount: 17,
    surface: 'IC', era: 'Classic',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.95, reviews: 65,
    desc: 'From icy Munich training pitches in 1950 to the greatest indoor courts and street culture today. Non-marking gum rubber sole with suede T-toe.',
    details: 'Full-grain leather with suede overlays; Non-marking gum rubber outsole for wooden and synthetic courts; Long extended tongue.',
    img: '/images/products/samba-classic-ic.svg',
    secondaryImg: '/images/products/samba-classic-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 7.0', color: 'Core Black / White / Gum', stock: 8 },
      { size: 'UK 8.0', color: 'Core Black / White / Gum', stock: 15 },
      { size: 'UK 8.5', color: 'Core Black / White / Gum', stock: 18 },
      { size: 'UK 9.0', color: 'Core Black / White / Gum', stock: 14 },
      { size: 'UK 10.0', color: 'Core Black / White / Gum', stock: 6 }
    ]
  },
  {
    name: 'Gato Vintage Court IC',
    slug: 'gato-vintage-court-ic',
    cat: 2, brand: 4,
    price: 5299.00, origPrice: 6299.00, discount: 16,
    surface: 'IC', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.87, reviews: 20,
    desc: 'Designed for fast-paced 5-a-side and futsal. Premium suede toe box with breathable mesh lateral panels and a sticky herringbone gum sole.',
    details: 'Suede and mesh combo; Cushlon foam midsole; Non-marking indoor court herringbone rubber; Low profile for instant reaction.',
    img: '/images/products/gato-vintage-ic.svg',
    secondaryImg: '/images/products/gato-vintage-sole.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'UK 8.0', color: 'Sail White / Burgundy / Gum', stock: 6 },
      { size: 'UK 8.5', color: 'Sail White / Burgundy / Gum', stock: 9 },
      { size: 'UK 9.0', color: 'Sail White / Burgundy / Gum', stock: 8 },
      { size: 'UK 9.5', color: 'Sail White / Burgundy / Gum', stock: 4 }
    ]
  },

  // Socks & Grip (Cat 3) - INR Rates: ₹499 - ₹899
  {
    name: 'Pro Tech Anti-Slip Grip Socks (Pair)',
    slug: 'pro-tech-anti-slip-grip-socks',
    cat: 3, brand: 10,
    price: 599.00, origPrice: 799.00, discount: 25,
    surface: 'N/A', era: 'Modern',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.97, reviews: 88,
    desc: 'The player\'s secret weapon. Hundreds of independent silicone suction pads eliminate foot slippage inside boots, preventing blisters and transferring 100% of sprinting power.',
    details: '80% Combed Cotton, 15% Nylon, 5% Spandex; Thermal silicone grip pods; Breathable instep ventilation mesh; Arch support band.',
    img: '/images/products/pro-tech-grip-socks.jpg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M (UK 5-8)', color: 'Vintage White', stock: 25 },
      { size: 'L (UK 8-11)', color: 'Vintage White', stock: 40 },
      { size: 'L (UK 8-11)', color: 'Pitch Black', stock: 35 },
      { size: 'L (UK 8-11)', color: 'Burgundy Red', stock: 20 }
    ]
  },
  {
    name: 'Vintage Ribbed Matchday Football Socks',
    slug: 'vintage-ribbed-matchday-socks',
    cat: 3, brand: 1,
    price: 499.00, origPrice: 649.00, discount: 23,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.86, reviews: 24,
    desc: 'Heavyweight retro knee-high match socks featuring the traditional thick rib turn-down cuff, reinforced heel cushioning, and elasticated ankle compression.',
    details: 'Heavy gauge cotton-blend; Cushioned sole bed; High turn-over ribbed cuff; Stays up without sagging.',
    img: '/images/products/vintage-ribbed-socks.svg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M (UK 6-8)', color: 'Vintage Cream / Navy', stock: 18 },
      { size: 'L (UK 9-12)', color: 'Vintage Cream / Navy', stock: 22 },
      { size: 'L (UK 9-12)', color: 'Burgundy / Gold', stock: 15 }
    ]
  },
  {
    name: 'Dual-Grip Cushion Performance Football Socks',
    slug: 'dual-grip-cushion-performance-socks',
    cat: 3, brand: 10,
    price: 699.00, origPrice: 899.00, discount: 22,
    surface: 'N/A', era: 'Modern',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.93, reviews: 41,
    desc: 'Featuring dual-sided grip: silicone pads both outside (against the boot) and inside (against your skin) for zero movement and maximum sudden deceleration grip.',
    details: 'Dual-surface micro-pads; Ergonomic left/right foot tailored cut; Reinforced Achilles padding; Anti-odor treated yarn.',
    img: '/images/products/dual-grip-socks.svg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M (UK 6-8)', color: 'Black / Gold Accent', stock: 20 },
      { size: 'L (UK 8.5-11.5)', color: 'Black / Gold Accent', stock: 30 }
    ]
  },
  {
    name: 'Calf Compression Matchday Sleeves (Pair)',
    slug: 'calf-compression-matchday-sleeves',
    cat: 3, brand: 10,
    price: 449.00, origPrice: 599.00, discount: 25,
    surface: 'N/A', era: 'Modern',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.89, reviews: 28,
    desc: 'Engineered specifically for players who wear grip socks and need calf sleeves to hold shin guards firmly in place while meeting match regulations.',
    details: 'Seamless circular knit; Graduated 20-30 mmHg compression; Secure elastic cuffs; Wicks away sweat rapidly.',
    img: '/images/products/calf-compression-sleeves.svg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'One Size', color: 'Pure White', stock: 45 },
      { size: 'One Size', color: 'Deep Black', stock: 35 },
      { size: 'One Size', color: 'Burgundy', stock: 20 }
    ]
  },
  {
    name: 'Retro Stripe Merino Wool Matchday Socks',
    slug: 'retro-stripe-merino-matchday-socks',
    cat: 3, brand: 1,
    price: 799.00, origPrice: 999.00, discount: 20,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.92, reviews: 15,
    desc: 'Made with fine Merino wool for unmatched thermal comfort during chilly night games. Natural moisture temperature regulation with retro hooped tops.',
    details: '45% Merino wool, 35% acrylic, 20% polyamide; Naturally antimicrobial; Vintage hoop stripe cuff; Padded heel and toe.',
    img: '/images/products/retro-stripe-socks.svg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M', color: 'Cream / Burgundy Hoops', stock: 12 },
      { size: 'L', color: 'Cream / Burgundy Hoops', stock: 16 }
    ]
  },
  {
    name: 'Silicone Grip Insole Low-Cut Training Socks',
    slug: 'silicone-grip-insole-low-cut-socks',
    cat: 3, brand: 10,
    price: 399.00, origPrice: 499.00, discount: 20,
    surface: 'N/A', era: 'Modern',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.84, reviews: 17,
    desc: 'Ankle-length grip socks engineered for indoor football sessions, gym conditioning, and recovery.',
    details: 'Low cut design; Hexagon silicone base; Lycra arch support; Terry cotton padded sole.',
    img: '/images/products/low-cut-grip-socks.svg',
    secondaryImg: '/images/products/grip-socks-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M', color: 'Pitch Black', stock: 20 },
      { size: 'L', color: 'Pitch Black', stock: 25 }
    ]
  },

  // Shin Guards & Protection (Cat 4) - INR Rates: ₹399 - ₹1,499
  {
    name: 'Vintage Carbon-Lite Slip-In Shin Guards',
    slug: 'vintage-carbon-lite-shin-guards',
    cat: 4, brand: 1,
    price: 1299.00, origPrice: 1599.00, discount: 19,
    surface: 'N/A', era: 'Modern',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.95, reviews: 50,
    desc: 'A modern engineering marvel with vintage aesthetic. Genuine 3K carbon-fibre shell weighing under 35 grams, backed by high-density EVA shock absorption.',
    details: 'Real 3K aerospace carbon fibre; Anatomical left/right curvature; Breathable antibacterial EVA backing; Includes storage pouch.',
    img: '/images/products/vintage-carbon-shin-guards.svg',
    secondaryImg: '/images/products/carbon-guards-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'S (14cm)', color: 'Raw Carbon / Gold Script', stock: 15 },
      { size: 'M (16cm)', color: 'Raw Carbon / Gold Script', stock: 25 },
      { size: 'L (18cm)', color: 'Raw Carbon / Gold Script', stock: 18 }
    ]
  },
  {
    name: 'Classic Foam-Shield Ankle Guard & Shin Plate',
    slug: 'classic-foam-shield-ankle-guard',
    cat: 4, brand: 2,
    price: 999.00, origPrice: 1299.00, discount: 23,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.88, reviews: 29,
    desc: 'The classic 90s Sunday League armour. Hard plastic front shell with padded elastic stirrup ankle guards and protective circular malleolus pads.',
    details: 'Hard impact shell; Built-in ankle sock with foam side discs; Underfoot elastic stirrup; Front calf velcro strap.',
    img: '/images/products/classic-ankle-shield-guard.svg',
    secondaryImg: '/images/products/carbon-guards-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'M', color: 'Black / White Umbro Diamond', stock: 14 },
      { size: 'L', color: 'Black / White Umbro Diamond', stock: 16 }
    ]
  },
  {
    name: 'Micro-Pro Minimalist Shin Pads (10cm)',
    slug: 'micro-pro-minimalist-shin-pads',
    cat: 4, brand: 10,
    price: 699.00, origPrice: 899.00, discount: 22,
    surface: 'N/A', era: 'Modern',
    featured: 0, bestseller: 1, newArr: 1,
    rating: 4.90, reviews: 36,
    desc: 'The modern winger\'s dream. Ultra-compact 10cm pads favored by elite dribblers who demand complete freedom of ankle movement and lightweight speed.',
    details: 'Tough PP composite shell; 10cm x 6cm featherweight design; Fits invisibly under grip sock sleeves; High-density foam lining.',
    img: '/images/products/micro-pro-shin-pads.svg',
    secondaryImg: '/images/products/carbon-guards-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'One Size (10cm)', color: 'Matte Black', stock: 30 },
      { size: 'One Size (10cm)', color: 'Burgundy / Gold', stock: 20 }
    ]
  },
  {
    name: 'Zinc Oxide Matchday Sock Tape (3-Pack)',
    slug: 'zinc-oxide-sock-tape-3-pack',
    cat: 4, brand: 1,
    price: 399.00, origPrice: 499.00, discount: 20,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.91, reviews: 40,
    desc: 'Heavy-duty non-stretch cotton adhesive tape. Essential for securing shin guards, locking wrists, and taping ankles for match readiness.',
    details: 'Pack of 3 rolls (3.8cm x 10m each); Breathable serrated edge for easy hand-tearing; Medical grade zinc oxide adhesive.',
    img: '/images/products/zinc-oxide-sock-tape.svg',
    secondaryImg: '/images/products/carbon-guards-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Pack of 3', color: 'White', stock: 50 },
      { size: 'Pack of 3', color: 'Black', stock: 40 }
    ]
  },

  // Goalkeeper Gloves (Cat 5) - INR Rates: ₹2,499 - ₹4,499
  {
    name: 'Reusch Arrow 1986 Heritage Goalkeeper Gloves',
    slug: 'reusch-arrow-1986-heritage-gloves',
    cat: 5, brand: 9,
    price: 3999.00, origPrice: 4899.00, discount: 18,
    surface: 'N/A', era: '1986',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.96, reviews: 35,
    desc: 'The iconic arrowhead backhand worn by legendary European cup winners in Mexico 86. Re-issued with state-of-the-art 4mm G3 Ultra Soft latex foam for adhesive grip in all conditions.',
    details: '4mm G3 Ultra Soft German latex; Classic arrow backhand design; Full latex wrist strap with pull loop; Negative cut for snug ball feel.',
    img: '/images/products/reusch-arrow-gloves.svg',
    secondaryImg: '/images/products/keeper-gloves-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1543195185-9546bf592dc1?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 8', color: 'White / Black / Gold Arrow', stock: 4 },
      { size: 'Size 9', color: 'White / Black / Gold Arrow', stock: 8 },
      { size: 'Size 10', color: 'White / Black / Gold Arrow', stock: 7 },
      { size: 'Size 10.5', color: 'White / Black / Gold Arrow', stock: 3 }
    ]
  },
  {
    name: 'Retro Negative Cut Professional Match Gloves',
    slug: 'retro-negative-cut-pro-match-gloves',
    cat: 5, brand: 1,
    price: 3199.00, origPrice: 3899.00, discount: 18,
    surface: 'N/A', era: 'Modern',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.89, reviews: 22,
    desc: 'Bespoke vintage aesthetic combined with contemporary negative stitching. Internal seams deliver an exact, skin-tight feel on crosses and fingertip stops.',
    details: 'Contact 4mm German latex palm; Neoprene body with burgundy silicone punch zone; Extended wrist bandage with double elastic strap.',
    img: '/images/products/heritage-goalkeeper-gloves.jpg',
    secondaryImg: '/images/products/keeper-gloves-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1630552227424-81c9e52d7c83?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 8.5', color: 'Burgundy / Cream Palm', stock: 6 },
      { size: 'Size 9', color: 'Burgundy / Cream Palm', stock: 9 },
      { size: 'Size 9.5', color: 'Burgundy / Cream Palm', stock: 7 },
      { size: 'Size 10', color: 'Burgundy / Cream Palm', stock: 5 }
    ]
  },
  {
    name: 'Classic Roll Finger Heritage Keeper Gloves',
    slug: 'classic-roll-finger-heritage-gloves',
    cat: 5, brand: 9,
    price: 2799.00, origPrice: 3399.00, discount: 18,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.87, reviews: 18,
    desc: 'The traditional British goalkeeping favorite. Latex rolls seamlessly around each finger to provide maximum contact surface on every catch.',
    details: 'Traditional roll finger construction; 3.5mm SuperSoft latex; Embossed EVA backhand; Wide wrist strap.',
    img: '/images/products/classic-roll-finger-gloves.svg',
    secondaryImg: '/images/products/keeper-gloves-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1543195185-9546bf592dc1?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 8', color: 'Blackout / White Foam', stock: 5 },
      { size: 'Size 9', color: 'Blackout / White Foam', stock: 8 },
      { size: 'Size 10', color: 'Blackout / White Foam', stock: 6 }
    ]
  },
  {
    name: 'Pro Grip Aqua All-Weather Goalkeeper Gloves',
    slug: 'pro-grip-aqua-all-weather-gloves',
    cat: 5, brand: 1,
    price: 3499.00, origPrice: 4199.00, discount: 17,
    surface: 'N/A', era: 'Modern',
    featured: 1, bestseller: 0, newArr: 0,
    rating: 4.92, reviews: 26,
    desc: 'When torrential rain threatens matchday, this glove thrives. 4mm Aqua-Plus latex activates with water to create magnetic grip on soaking match balls.',
    details: 'Aqua-Plus damp-weather latex; Hydro-mesh breathable backhand; Wrap-around thumb; Elasticated bandage closure.',
    img: '/images/products/pro-grip-aqua-gloves.svg',
    secondaryImg: '/images/products/keeper-gloves-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1630552227424-81c9e52d7c83?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 8.5', color: 'Aqua Blue / Black', stock: 5 },
      { size: 'Size 9', color: 'Aqua Blue / Black', stock: 8 },
      { size: 'Size 10', color: 'Aqua Blue / Black', stock: 6 }
    ]
  },

  // Footballs & Equipment (Cat 6) - INR Rates: ₹899 - ₹3,499
  {
    name: '1970 Vintage 32-Panel Hand-Stitched Leather Football',
    slug: '1970-vintage-32-panel-leather-football',
    cat: 6, brand: 1,
    price: 2499.00, origPrice: 3199.00, discount: 22,
    surface: 'N/A', era: '1970',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.98, reviews: 64,
    desc: 'The archetypal football design immortalised in Mexico 1970. 32 hand-stitched hexagons and pentagons in rich genuine treated leather with brass inflation valve.',
    details: '100% Top-grain genuine leather; 32 hand-stitched panels; Reinforced butyl bladder for air retention; Official Size 5 match weight.',
    img: '/images/products/vintage-1970-football.jpg',
    secondaryImg: '/images/products/equipment-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 5 (Official)', color: 'Vintage Black & White', stock: 24 },
      { size: 'Size 5 (Official)', color: 'Rich Antiqued Tan Leather', stock: 16 }
    ]
  },
  {
    name: 'Mitre Ultimax Heritage Match Football Size 5',
    slug: 'mitre-ultimax-heritage-match-football',
    cat: 6, brand: 8,
    price: 2999.00, origPrice: 3699.00, discount: 19,
    surface: 'N/A', era: '1995',
    featured: 1, bestseller: 0, newArr: 1,
    rating: 4.96, reviews: 39,
    desc: 'The official ball of 1990s English football. Struck with blistering power by Shearer, Le Tissier, and Beckham. Micro-textured PU casing for true flight trajectory.',
    details: 'FIFA Quality Pro approved; Thermal bonded 24-panel construction; Hyperseam technology for zero water uptake; High rebound bladder.',
    img: '/images/products/mitre-ultimax-football.svg',
    secondaryImg: '/images/products/equipment-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Size 5 (Match)', color: 'White / Black / Gold Chevron', stock: 18 }
    ]
  },
  {
    name: 'Heritage Football Conditioning Agility Cones (10-Pack)',
    slug: 'heritage-conditioning-agility-cones-10-pack',
    cat: 6, brand: 1,
    price: 899.00, origPrice: 1199.00, discount: 25,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.88, reviews: 20,
    desc: 'Flexible rubberized saucer cones for speed ladders, dribbling mazes, and passing drills. Stackable with a heavy brass carrying rod.',
    details: 'Set of 10 heavy pliable cones; 5 Burgundy / 5 Vintage Cream; Won\'t crack when stepped on with metal studs; Heavy transport strap.',
    img: '/images/products/agility-cones-10pack.svg',
    secondaryImg: '/images/products/equipment-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Set of 10', color: 'Burgundy & Cream', stock: 30 }
    ]
  },

  // Bags & Luggage (Cat 7) - INR Rates: ₹1,699 - ₹3,499
  {
    name: 'Heritage Heavy Canvas Football Boot Bag',
    slug: 'heritage-heavy-canvas-boot-bag',
    cat: 7, brand: 1,
    price: 1699.00, origPrice: 2199.00, discount: 23,
    surface: 'N/A', era: 'Classic',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.94, reviews: 43,
    desc: 'Waxed 16oz cotton canvas boot carrier with antique brass ventilation eyelets, wipe-clean waterproof interior lining, and full-grain leather handle.',
    details: '16oz heavy water-repellent canvas; Brass dual zippers; Internal mud separator panel; Fits up to UK size 13 boots with room for shin pads.',
    img: '/images/products/heritage-canvas-boot-bag.svg',
    secondaryImg: '/images/products/equipment-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'One Size (36x22x14cm)', color: 'Vintage Olive / Brown Leather', stock: 18 },
      { size: 'One Size (36x22x14cm)', color: 'Pitch Black / Tan Leather', stock: 22 },
      { size: 'One Size (36x22x14cm)', color: 'Deep Burgundy / Brass', stock: 15 }
    ]
  },
  {
    name: 'Retro Matchday Barrel Holdall Duffel 45L',
    slug: 'retro-matchday-barrel-holdall-45l',
    cat: 7, brand: 1,
    price: 3299.00, origPrice: 3999.00, discount: 18,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 1,
    rating: 4.90, reviews: 27,
    desc: 'The quintessential retro team bag. Cylinder shape with side shoe compartment, padded shoulder strap, and vintage typography print.',
    details: '45L capacity; Dedicated isolated boot tunnel; Reinforced base with protective studs; Heavy-duty YKK hardware.',
    img: '/images/products/retro-barrel-holdall.svg',
    secondaryImg: '/images/products/equipment-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: '45 Litre', color: 'Black / Off-White Piping', stock: 14 },
      { size: '45 Litre', color: 'Navy / Red Stripe', stock: 12 }
    ]
  },

  // Accessories & Care (Cat 8) - INR Rates: ₹699 - ₹1,299
  {
    name: 'Deluxe Vintage Boot Care & Leather Dubbin Kit',
    slug: 'deluxe-vintage-boot-care-kit',
    cat: 8, brand: 1,
    price: 1199.00, origPrice: 1499.00, discount: 20,
    surface: 'N/A', era: 'Classic',
    featured: 1, bestseller: 1, newArr: 0,
    rating: 4.97, reviews: 52,
    desc: 'Everything required to care for genuine leather football boots. Includes traditional beeswax dubbin, 100% natural horsehair buffing brush, stud wrench, and cotton cloth.',
    details: '100ml Pure beeswax dubbin; 100% horsehair polish brush; Stiff mud cleaner brush; Universal 6-stud steel key; Metal presentation tin.',
    img: '/images/products/boot-care-dubbin-kit.svg',
    secondaryImg: '/images/products/accessories-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Standard Kit', color: 'Natural Leather / Tin', stock: 35 }
    ]
  },
  {
    name: 'Leather Matchday Captain Armband',
    slug: 'leather-matchday-captain-armband',
    cat: 8, brand: 1,
    price: 699.00, origPrice: 899.00, discount: 22,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.91, reviews: 24,
    desc: 'A leader\'s badge of honor. Stitched leatherette face with bold embossed "C", elasticated stretch band, and velcro closure that stays glued to your arm for 90 minutes.',
    details: 'Embossed gold lettering; Reinforced elastic band; Fits over jersey and cold-weather undershirt; 8cm width.',
    img: '/images/products/captain-armband.svg',
    secondaryImg: '/images/products/accessories-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Adult Standard', color: 'Deep Burgundy / Gold C', stock: 25 },
      { size: 'Adult Standard', color: 'Classic Black / White C', stock: 30 }
    ]
  },
  {
    name: 'Classic Brass Referee Whistle & Lanyard',
    slug: 'classic-brass-referee-whistle',
    cat: 8, brand: 1,
    price: 799.00, origPrice: 999.00, discount: 20,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.93, reviews: 31,
    desc: 'Crafted from solid nickel-plated brass with a natural cork pea for the unmistakable, piercing vintage match whistle sound heard across every stadium.',
    details: 'Solid nickel-plated brass; 115 decibel cork pea vibration; Braided cord lanyard with brass clasp; Velvet storage bag included.',
    img: '/images/products/classic-brass-whistle.jpg',
    secondaryImg: '/images/products/accessories-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Standard', color: 'Polished Brass', stock: 20 },
      { size: 'Standard', color: 'Nickel Silver', stock: 22 }
    ]
  },
  {
    name: 'Dual-Action Vintage Metal Ball Pump & Needles',
    slug: 'dual-action-metal-ball-pump',
    cat: 8, brand: 1,
    price: 749.00, origPrice: 899.00, discount: 17,
    surface: 'N/A', era: 'Classic',
    featured: 0, bestseller: 0, newArr: 0,
    rating: 4.88, reviews: 29,
    desc: 'Compact brushed aluminium ball pump delivering dual-action air volume on both push and pull strokes. Comes with 3 spare steel needles.',
    details: 'Heavy-gauge aluminium barrel; Flexible extension hose prevents needle breakage; Dual-action airflow; 3 steel needles included.',
    img: '/images/products/metal-ball-pump.svg',
    secondaryImg: '/images/products/accessories-detail.svg',
    secondaryImg: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1000&q=85',
    variants: [
      { size: 'Standard 20cm', color: 'Brushed Silver', stock: 28 },
      { size: 'Standard 20cm', color: 'Matte Black', stock: 25 }
    ]
  }
];

let sql = `-- ==============================================================================
-- RETRO STORE — Database Seed File (Indian Rupees INR Rates)
-- Over 40 products, categories, brands, variants, coupons, users, and orders
-- ==============================================================================

USE \`retro_store_db\`;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE \`newsletter_subscribers\`;
TRUNCATE TABLE \`reviews\`;
TRUNCATE TABLE \`payments\`;
TRUNCATE TABLE \`order_items\`;
TRUNCATE TABLE \`orders\`;
TRUNCATE TABLE \`coupons\`;
TRUNCATE TABLE \`wishlist_items\`;
TRUNCATE TABLE \`wishlists\`;
TRUNCATE TABLE \`cart_items\`;
TRUNCATE TABLE \`carts\`;
TRUNCATE TABLE \`product_variants\`;
TRUNCATE TABLE \`product_images\`;
TRUNCATE TABLE \`products\`;
TRUNCATE TABLE \`brands\`;
TRUNCATE TABLE \`categories\`;
TRUNCATE TABLE \`addresses\`;
TRUNCATE TABLE \`users\`;

SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. Users (Admin + Customers)
-- Admin login: admin@retrostore.com / Admin@123
-- Customer login: marcus@retrostore.com / Customer@123
-- ------------------------------------------------------------------------------
INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`password_hash\`, \`phone\`, \`role\`) VALUES
(1, 'Admin Director', 'admin@retrostore.com', '${adminHash}', '+91 98200 12345', 'admin'),
(2, 'Marcus Vance', 'marcus@retrostore.com', '${customerHash}', '+91 98201 54321', 'customer'),
(3, 'David Maldini', 'david@retrostore.com', '${customerHash}', '+91 98202 67890', 'customer'),
(4, 'Sofia Zidane', 'sofia@retrostore.com', '${customerHash}', '+91 98203 98765', 'customer');

-- ------------------------------------------------------------------------------
-- 2. Addresses
-- ------------------------------------------------------------------------------
INSERT INTO \`addresses\` (\`id\`, \`user_id\`, \`recipient_name\`, \`phone\`, \`address_line1\`, \`address_line2\`, \`city\`, \`state\`, \`postal_code\`, \`country\`, \`is_default\`) VALUES
(1, 2, 'Marcus Vance', '+91 98201 54321', '14 Marine Drive, Sea Face Towers', 'Flat 4B', 'Mumbai', 'Maharashtra', '400020', 'India', TRUE),
(2, 2, 'Marcus Vance', '+91 98201 54321', 'Retro HQ Studio, 24 Indiranagar 100ft Rd', 'Floor 2', 'Bengaluru', 'Karnataka', '560038', 'India', FALSE),
(3, 3, 'David Maldini', '+91 98202 67890', '88 Park Street', 'Apt 12', 'Kolkata', 'West Bengal', '700016', 'India', TRUE),
(4, 4, 'Sofia Zidane', '+91 98203 98765', '5 Connaught Place, Block C', 'Suite 404', 'New Delhi', 'Delhi', '110001', 'India', TRUE);

-- ------------------------------------------------------------------------------
-- 3. Categories
-- ------------------------------------------------------------------------------
INSERT INTO \`categories\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image_url\`, \`display_order\`) VALUES
`;

categories.forEach((cat, idx) => {
  sql += `(${cat.id}, '${cat.name.replace(/'/g, "\\'")}', '${cat.slug}', '${cat.desc.replace(/'/g, "\\'")}', '${cat.img}', ${cat.order})${idx === categories.length - 1 ? ';' : ','}\n`;
});

sql += `\n-- ------------------------------------------------------------------------------
-- 4. Brands
-- ------------------------------------------------------------------------------
INSERT INTO \`brands\` (\`id\`, \`name\`, \`slug\`, \`logo_url\`, \`description\`) VALUES
`;

brands.forEach((brand, idx) => {
  sql += `(${brand.id}, '${brand.name.replace(/'/g, "\\'")}', '${brand.slug}', '${brand.logo}', '${brand.desc.replace(/'/g, "\\'")}')${idx === brands.length - 1 ? ';' : ','}\n`;
});

sql += `\n-- ------------------------------------------------------------------------------
-- 5. Products, Images & Variants (All in INR Rates)
-- ------------------------------------------------------------------------------\n`;

let prodValues = [];
let imgValues = [];
let variantValues = [];
let vId = 1;
let imgId = 1;

productsData.forEach((p, idx) => {
  const pId = idx + 1;
  prodValues.push(`(${pId}, ${p.cat}, ${p.brand}, '${p.name.replace(/'/g, "\\'")}', '${p.slug}', '${p.desc.replace(/'/g, "\\'")}', '${p.details.replace(/'/g, "\\'")}', ${p.price.toFixed(2)}, ${p.origPrice.toFixed(2)}, ${p.discount}, '${p.surface}', '${p.era}', 'active', ${p.featured}, ${p.bestseller}, ${p.newArr}, ${p.rating}, ${p.reviews})`);

  imgValues.push(`(${imgId++}, ${pId}, '${p.img}', '${p.name.replace(/'/g, "\\'")}', TRUE, 1)`);
  imgValues.push(`(${imgId++}, ${pId}, '${p.secondaryImg || p.img}', '${p.name.replace(/'/g, "\\'")} Technical Detail & Angle', FALSE, 2)`);

  p.variants.forEach((v) => {
    const sku = `${p.slug.toUpperCase().substring(0, 12)}-${v.size.replace(/[^a-zA-Z0-9]/g, '')}-${v.color.substring(0, 3).toUpperCase()}-${vId}`;
    variantValues.push(`(${vId++}, ${pId}, '${sku}', '${v.size}', '${v.color}', ${v.stock}, 0.00)`);
  });
});

sql += `INSERT INTO \`products\` (\`id\`, \`category_id\`, \`brand_id\`, \`name\`, \`slug\`, \`description\`, \`details\`, \`price\`, \`original_price\`, \`discount_percent\`, \`playing_surface\`, \`era\`, \`status\`, \`is_featured\`, \`is_bestseller\`, \`is_new_arrival\`, \`rating\`, \`review_count\`) VALUES\n` + prodValues.join(',\n') + ';\n\n';

sql += `INSERT INTO \`product_images\` (\`id\`, \`product_id\`, \`image_url\`, \`alt_text\`, \`is_primary\`, \`display_order\`) VALUES\n` + imgValues.join(',\n') + ';\n\n';

sql += `INSERT INTO \`product_variants\` (\`id\`, \`product_id\`, \`sku\`, \`size\`, \`color\`, \`stock_quantity\`, \`additional_price\`) VALUES\n` + variantValues.join(',\n') + ';\n\n';

sql += `-- ------------------------------------------------------------------------------
-- 6. Coupons (in Indian Rupees INR)
-- ------------------------------------------------------------------------------
INSERT INTO \`coupons\` (\`id\`, \`code\`, \`description\`, \`discount_type\`, \`discount_value\`, \`min_order_amount\`, \`max_discount_amount\`, \`expiry_date\`, \`usage_limit\`, \`times_used\`, \`is_active\`) VALUES
(1, 'RETRO10', '10% discount on orders over ₹2,499', 'percentage', 10.00, 2499.00, 1000.00, '2028-12-31', 500, 14, TRUE),
(2, 'BEAUTIFULGAME', '15% celebration discount on orders over ₹3,999', 'percentage', 15.00, 3999.00, 1500.00, '2028-12-31', 300, 22, TRUE),
(3, 'LEGEND500', '₹500 flat discount on premium orders over ₹4,999', 'fixed', 500.00, 4999.00, 500.00, '2028-12-31', 150, 8, TRUE),
(4, 'KICKOFF5', '5% welcome discount with no minimum purchase', 'percentage', 5.00, 0.00, 500.00, '2028-12-31', 1000, 31, TRUE);

-- ------------------------------------------------------------------------------
-- 7. Carts & Cart Items
-- Pre-seed an active cart for Marcus Vance (User 2)
-- ------------------------------------------------------------------------------
INSERT INTO \`carts\` (\`id\`, \`user_id\`) VALUES
(1, 2),
(2, 3);

INSERT INTO \`cart_items\` (\`id\`, \`cart_id\`, \`variant_id\`, \`quantity\`) VALUES
(1, 1, 2, 1), -- France 98 Retro (M) ₹2,799
(2, 1, 74, 2); -- Pro Tech Grip Socks (L) 2 x ₹599 = ₹1,198

-- ------------------------------------------------------------------------------
-- 8. Wishlists & Items
-- ------------------------------------------------------------------------------
INSERT INTO \`wishlists\` (\`id\`, \`user_id\`) VALUES
(1, 2),
(2, 3);

INSERT INTO \`wishlist_items\` (\`id\`, \`wishlist_id\`, \`product_id\`) VALUES
(1, 1, 2), -- 1990 Germany
(2, 1, 15), -- Copa Mundial
(3, 1, 39); -- 1970 Leather Football

-- ------------------------------------------------------------------------------
-- 9. Orders, Order Items & Payments (In INR)
-- ------------------------------------------------------------------------------
INSERT INTO \`orders\` (\`id\`, \`order_number\`, \`user_id\`, \`address_id\`, \`recipient_name\`, \`shipping_address\`, \`phone\`, \`subtotal\`, \`discount_amount\`, \`coupon_code\`, \`shipping_fee\`, \`total_amount\`, \`payment_method\`, \`payment_status\`, \`order_status\`, \`created_at\`) VALUES
(1, 'ORD-2026-1001', 2, 1, 'Marcus Vance', '14 Marine Drive, Sea Face Towers, Flat 4B, Mumbai, Maharashtra, 400020, India', '+91 98201 54321', 8999.00, 899.90, 'RETRO10', 0.00, 8099.10, 'card', 'paid', 'Delivered', '2026-09-12 14:20:00'),
(2, 'ORD-2026-1002', 3, 3, 'David Maldini', '88 Park Street, Apt 12, Kolkata, West Bengal, 700016, India', '+91 98202 67890', 11998.00, 500.00, 'LEGEND500', 0.00, 11498.00, 'card', 'paid', 'Delivered', '2026-09-25 11:45:00'),
(3, 'ORD-2026-1003', 4, 4, 'Sofia Zidane', '5 Connaught Place, Block C, Suite 404, New Delhi, Delhi, 110001, India', '+91 98203 98765', 3199.00, 0.00, NULL, 0.00, 3199.00, 'cod', 'pending', 'Processing', '2026-10-15 16:30:00'),
(4, 'ORD-2026-1004', 2, 1, 'Marcus Vance', '14 Marine Drive, Sea Face Towers, Flat 4B, Mumbai, Maharashtra, 400020, India', '+91 98201 54321', 5698.00, 854.70, 'BEAUTIFULGAME', 0.00, 4843.30, 'online_demo', 'paid', 'Confirmed', '2026-10-19 10:15:00'),
(5, 'ORD-2026-1005', 3, 3, 'David Maldini', '88 Park Street, Apt 12, Kolkata, West Bengal, 700016, India', '+91 98202 67890', 2799.00, 0.00, NULL, 0.00, 2799.00, 'card', 'paid', 'Pending', '2026-10-21 09:05:00');

INSERT INTO \`order_items\` (\`id\`, \`order_id\`, \`variant_id\`, \`product_id\`, \`product_name_snapshot\`, \`sku_snapshot\`, \`size_snapshot\`, \`color_snapshot\`, \`unit_price\`, \`quantity\`, \`subtotal\`) VALUES
(1, 1, 55, 15, 'Copa Mundial Retro Pure Leather FG', 'COPA-MUND-UK85-1', 'UK 8.5', 'Core Black / Cloud White', 8999.00, 1, 8999.00),
(2, 2, 7, 2, '1990 West Germany Home Retro Shirt', '1990-GER-M-2', 'M', 'Vintage White / Tricolor', 2999.00, 1, 2999.00),
(3, 2, 57, 15, 'Copa Mundial Retro Pure Leather FG', 'COPA-MUND-UK9-3', 'UK 9.0', 'Core Black / Cloud White', 8999.00, 1, 8999.00),
(4, 3, 61, 23, 'Real Madrid Centenary White Kit', 'REAL-2002-M-4', 'M', 'Blanco White', 3199.00, 1, 3199.00),
(5, 4, 18, 5, '1992 Manchester United Newton Heath Away Shirt', 'MANU-1992-M-5', 'M', 'Green / Gold', 3199.00, 1, 3199.00),
(6, 4, 65, 39, '1970 Vintage 32-Panel Leather Football', 'BALL-1970-SIZE5-6', 'Size 5 (Official)', 'Vintage Black & White', 2499.00, 1, 2499.00),
(7, 5, 2, 1, '1998 France Home Retro Jersey', 'FRA-1998-M-7', 'M', 'Royal Blue / Red', 2799.00, 1, 2799.00);

INSERT INTO \`payments\` (\`id\`, \`order_id\`, \`payment_method\`, \`transaction_reference\`, \`amount\`, \`payment_status\`, \`payment_date\`) VALUES
(1, 1, 'card', 'TXN-RETRO-908129', 8099.10, 'completed', '2026-09-12 14:22:00'),
(2, 2, 'card', 'TXN-RETRO-914582', 11498.00, 'completed', '2026-09-25 11:47:00'),
(3, 4, 'online_demo', 'TXN-RETRO-993104', 4843.30, 'completed', '2026-10-19 10:16:00'),
(4, 5, 'card', 'TXN-RETRO-998432', 2799.00, 'completed', '2026-10-21 09:07:00');

-- ------------------------------------------------------------------------------
-- 10. Reviews
-- ------------------------------------------------------------------------------
INSERT INTO \`reviews\` (\`id\`, \`user_id\`, \`product_id\`, \`rating\`, \`review_title\`, \`review_text\`, \`is_verified_buyer\`, \`created_at\`) VALUES
(1, 2, 1, 5, 'Unbelievable retro quality', 'The fabric and embroidery on this 1998 France shirt are immaculate. Feels just like the original heavyweight jerseys from that era. Pure nostalgia!', TRUE, '2026-09-15 10:00:00'),
(2, 3, 2, 5, 'The greatest kit of all time', 'The geometric tri-color chest block is perfection. Wore it to a matchday screening and got endless compliments. Sizing is spot-on relaxed 90s fit.', TRUE, '2026-09-28 16:30:00'),
(3, 4, 15, 5, 'Nothing beats genuine K-leather', 'The touch on the ball with these Copas is incomparable. Modern plastic boots just cannot compete with this level of leather craftsmanship.', TRUE, '2026-10-02 12:15:00'),
(4, 2, 25, 5, 'Absolute game changer for matchdays', 'The grip socks lock your foot into the boot instantly. Zero slipping, zero blisters. Throw out your normal socks and grab three pairs of these.', TRUE, '2026-10-05 18:20:00'),
(5, 3, 39, 5, 'A piece of football art', 'Bought this 1970 hand-stitched ball for my office shelf. It smells like pure leather and looks magnificent. Real heritage football soul.', TRUE, '2026-10-10 14:40:00');

-- ------------------------------------------------------------------------------
-- 11. Newsletter Subscribers
-- ------------------------------------------------------------------------------
INSERT INTO \`newsletter_subscribers\` (\`id\`, \`email\`, \`subscription_date\`, \`is_active\`) VALUES
(1, 'collector@vintagefootball.com', '2026-08-01 10:00:00', TRUE),
(2, 'striker9@matchdayculture.in', '2026-08-15 12:30:00', TRUE),
(3, 'curator@retrojerseyarchive.in', '2026-09-02 17:45:00', TRUE),
(4, 'marcus@retrostore.com', '2026-09-10 11:20:00', TRUE);
`;

fs.writeFileSync(path.join(__dirname, 'seed.sql'), sql, 'utf8');
console.log('Seed SQL regenerated successfully with INR rates.');
