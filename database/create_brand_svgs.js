// database/create_brand_svgs.js
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'public', 'brands');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const brands = {
  'retro-store-atelier.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <circle cx="100" cy="100" r="82" fill="none" stroke="#B79A63" stroke-width="2.5" stroke-dasharray="4,4"/>
    <circle cx="100" cy="100" r="74" fill="none" stroke="#B79A63" stroke-width="1.5"/>
    <path d="M100 48 L104 60 L116 60 L106 68 L110 80 L100 72 L90 80 L94 68 L84 60 L96 60 Z" fill="#B79A63"/>
    <text x="100" y="112" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">RETRO</text>
    <text x="100" y="132" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#B79A63" text-anchor="middle" letter-spacing="4">ATELIER</text>
    <text x="100" y="148" font-family="Arial, sans-serif" font-size="8" fill="#A8A095" text-anchor="middle" letter-spacing="2">EST. 1982</text>
  </svg>`,

  'umbro-heritage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <polygon points="100,50 155,100 100,150 45,100" fill="none" stroke="#F5F0E6" stroke-width="7"/>
    <polygon points="100,68 135,100 100,132 65,100" fill="none" stroke="#721C32" stroke-width="5"/>
    <text x="100" y="178" font-family="Impact, sans-serif" font-size="18" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">UMBRO</text>
  </svg>`,

  'adidas-originals.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <g transform="translate(100, 95) scale(0.9)">
      <path d="M-38,20 C-60,-15 -25,-45 0,-60 C25,-45 60,-15 38,20 Z" fill="#F5F0E6"/>
      <path d="M-50,20 C-75,-5 -60,-35 -35,-45 C-15,-20 -20,10 -10,20 Z" fill="#F5F0E6"/>
      <path d="M50,20 C75,-5 60,-35 35,-45 C15,-20 20,10 10,20 Z" fill="#F5F0E6"/>
      <rect x="-55" y="-8" width="110" height="4" fill="#171717"/>
      <rect x="-55" y="2" width="110" height="4" fill="#171717"/>
      <rect x="-55" y="12" width="110" height="4" fill="#171717"/>
    </g>
    <text x="100" y="168" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">adidas</text>
  </svg>`,

  'nike-heritage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <path d="M42 108 C65 125 90 128 115 110 C145 88 162 62 165 52 C158 75 122 135 78 135 C52 135 38 118 42 108 Z" fill="#721C32"/>
    <text x="100" y="168" font-family="Impact, sans-serif" font-size="20" font-style="italic" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">NIKE</text>
  </svg>`,

  'kappa-vintage.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <g fill="#B79A63" transform="translate(100, 85) scale(0.8)">
      <circle cx="-16" cy="-42" r="8"/>
      <circle cx="16" cy="-42" r="8"/>
      <path d="M-14 -28 C-14 -28 -28 -10 -22 15 C-20 25 -32 40 -35 45 C-36 47 -32 48 -28 47 C-20 42 -12 28 -10 20 C-9 28 -7 36 -6 45 C-6 48 -2 48 -2 45 C-2 32 -7 0 -8 -15 C-8 -22 -10 -28 -14 -28 Z"/>
      <path d="M14 -28 C14 -28 28 -10 22 15 C20 25 32 40 35 45 C36 47 32 48 28 47 C20 42 12 28 10 20 C9 28 7 36 6 45 C6 48 2 48 2 45 C2 32 7 0 8 -15 C8 -22 10 -28 14 -28 Z"/>
    </g>
    <text x="100" y="165" font-family="Arial, sans-serif" font-size="17" font-weight="900" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">Kappa</text>
  </svg>`,

  'lotto-classic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <g transform="translate(100, 85)">
      <polygon points="-25,-30 25,-30 45,0 -5,0" fill="#721C32"/>
      <polygon points="-45,0 5,0 25,30 -25,30" fill="#721C32"/>
    </g>
    <text x="100" y="165" font-family="Arial, sans-serif" font-size="18" font-weight="900" font-style="italic" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">lotto</text>
  </svg>`,

  'puma-king-retro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <path d="M80 55 L90 70 L100 50 L110 70 L120 55 L118 78 L82 78 Z" fill="#B79A63"/>
    <path d="M65 95 C85 85 110 88 135 110 C125 105 110 102 95 108 C80 114 72 125 65 135 C64 125 62 108 65 95 Z" fill="#F5F0E6"/>
    <text x="100" y="155" font-family="Impact, sans-serif" font-size="17" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">PUMA KING</text>
  </svg>`,

  'mitre-classic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <polygon points="100,50 145,115 125,115 100,80 75,115 55,115" fill="#721C32"/>
    <polygon points="100,85 118,110 82,110" fill="#B79A63"/>
    <text x="100" y="162" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#F5F0E6" text-anchor="middle" letter-spacing="3">mitre</text>
  </svg>`,

  'reusch-pro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <polygon points="60,95 100,55 140,95 125,95 100,70 75,95" fill="#B79A63"/>
    <polygon points="60,115 100,75 140,115 125,115 100,90 75,115" fill="#F5F0E6"/>
    <text x="100" y="162" font-family="Impact, sans-serif" font-size="18" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">REUSCH</text>
  </svg>`,

  'gripmaster-pro.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
    <rect width="200" height="200" rx="8" fill="#171717"/>
    <polygon points="100,52 142,76 142,124 100,148 58,124 58,76" fill="none" stroke="#B79A63" stroke-width="4"/>
    <circle cx="100" cy="85" r="5" fill="#F5F0E6"/>
    <circle cx="85" cy="100" r="5" fill="#F5F0E6"/>
    <circle cx="115" cy="100" r="5" fill="#F5F0E6"/>
    <circle cx="100" cy="115" r="5" fill="#F5F0E6"/>
    <text x="100" y="172" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#F5F0E6" text-anchor="middle" letter-spacing="2">GRIPMASTER</text>
  </svg>`
};

for (const [file, content] of Object.entries(brands)) {
  fs.writeFileSync(path.join(dir, file), content.trim(), 'utf8');
}
console.log('Successfully wrote 10 brand SVGs into frontend/public/brands');
