// database/create_product_svgs.js
const fs = require('fs');
const path = require('path');

const prodDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'products');
const catDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'categories');

if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });
if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

// Common SVG defs & filters for luxury studio depth
const commonDefs = `
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#2a2e39"/>
      <stop offset="55%" stop-color="#14161d"/>
      <stop offset="100%" stop-color="#0a0b0e"/>
    </radialGradient>
    <radialGradient id="podiumGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3d4352" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#121418" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f7e09e"/>
      <stop offset="35%" stop-color="#d4af37"/>
      <stop offset="70%" stop-color="#aa820a"/>
      <stop offset="100%" stop-color="#e8c867"/>
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#a8b0ba"/>
      <stop offset="100%" stop-color="#606670"/>
    </linearGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe8a3"/>
      <stop offset="40%" stop-color="#c99738"/>
      <stop offset="80%" stop-color="#8a5e12"/>
      <stop offset="100%" stop-color="#dfb758"/>
    </linearGradient>
    <pattern id="carbonPattern" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#18181a"/>
      <rect x="0" y="0" width="6" height="6" fill="#28292e"/>
      <rect x="6" y="6" width="6" height="6" fill="#28292e"/>
      <line x1="0" y1="0" x2="12" y2="12" stroke="#383940" stroke-width="0.7" opacity="0.4"/>
      <line x1="12" y1="0" x2="0" y2="12" stroke="#383940" stroke-width="0.7" opacity="0.4"/>
    </pattern>
    <pattern id="fabricMesh" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.5" fill="#000000" opacity="0.12"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
    <filter id="heavyShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="30" stdDeviation="35" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>
`;

function wrapSvg(body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  ${commonDefs}
  <rect width="800" height="800" fill="url(#bgGlow)"/>
  <!-- Luxury Podium Base -->
  <ellipse cx="400" cy="710" rx="320" ry="45" fill="url(#podiumGlow)"/>
  <ellipse cx="400" cy="710" rx="260" ry="25" fill="#000000" opacity="0.6"/>
  ${body}
</svg>`;
}

const productSvgs = {
  // ==========================================
  // RETRO JERSEYS
  // ==========================================
  'ac-milan-1998-home.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Jersey Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#111111"/>
      
      <!-- Red Stripes -->
      <path d="M-105,-220 L-65,-220 L-65,210 L-105,210 Z" fill="#b91c1c"/>
      <path d="M-20,-220 L20,-220 L20,210 L-20,210 Z" fill="#b91c1c"/>
      <path d="M65,-220 L105,-220 L105,210 L65,210 Z" fill="#b91c1c"/>
      <!-- Sleeve red stripes -->
      <path d="M-175,-190 L-145,-150 L-135,-155 L-160,-200 Z" fill="#b91c1c"/>
      <path d="M175,-190 L145,-150 L135,-155 L160,-200 Z" fill="#b91c1c"/>

      <!-- Fabric texture overlay -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- White Polo Collar -->
      <path d="M-70,-220 L-25,-170 L0,-190 L25,-170 L70,-220 L35,-265 L-35,-265 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
      <path d="M-25,-170 L0,-125 L25,-170 Z" fill="#09090b"/>

      <!-- OPEL Sponsor -->
      <g transform="translate(0, 30)">
        <ellipse cx="0" cy="0" rx="90" ry="32" fill="none" stroke="#f8fafc" stroke-width="6"/>
        <polygon points="-75,0 -20,-8 -10,8 65,-8 80,0 20,8 10,-8 -65,8" fill="#f8fafc"/>
        <text x="0" y="42" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="4">OPEL</text>
      </g>

      <!-- Milan Crest (Shield with Red Cross & Red/Black Stripes) -->
      <g transform="translate(-75, -110)">
        <ellipse cx="0" cy="0" rx="28" ry="36" fill="#ffffff" stroke="#d4af37" stroke-width="2.5"/>
        <clipPath id="milanBadgeClip"><ellipse cx="0" cy="0" rx="27" ry="35"/></clipPath>
        <g clip-path="url(#milanBadgeClip)">
          <!-- Left half: St George Cross -->
          <rect x="-27" y="-35" width="27" height="70" fill="#ffffff"/>
          <line x1="-27" y1="0" x2="0" y2="0" stroke="#b91c1c" stroke-width="7"/>
          <line x1="-13" y1="-35" x2="-13" y2="35" stroke="#b91c1c" stroke-width="7"/>
          <!-- Right half: Red/Black Stripes -->
          <rect x="0" y="-35" width="27" height="70" fill="#111111"/>
          <rect x="5" y="-35" width="6" height="70" fill="#b91c1c"/>
          <rect x="17" y="-35" width="6" height="70" fill="#b91c1c"/>
        </g>
        <!-- Gold Star above -->
        <polygon points="0,-48 3,-40 10,-40 4,-35 7,-28 0,-32 -7,-28 -4,-35 -10,-40 -3,-40" fill="url(#goldGrad)"/>
      </g>

      <!-- 1899-1999 Centenary Gold Script -->
      <text x="75" y="-105" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1">1899 - 1999</text>
      <text x="75" y="-90" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#f8fafc" text-anchor="middle">CENTENARIO</text>
    </g>
  `),

  'england-1996-home.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Pure White Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>
      
      <!-- Navy & Turquoise Euro 96 V-Neck Rib Collar -->
      <path d="M-65,-220 L0,-140 L65,-220 L40,-255 L-40,-255 Z" fill="#1e293b"/>
      <path d="M-55,-220 L0,-152 L55,-220 L45,-240 L-45,-240 Z" fill="#0284c7"/>
      <polygon points="0,-152 -18,-175 18,-175" fill="#f8fafc"/>

      <!-- Three Lions Shield Centered -->
      <g transform="translate(0, -75)">
        <path d="M-34,-40 L34,-40 L34,10 C34,35 0,50 0,50 C0,50 -34,35 -34,10 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="3"/>
        <text x="0" y="-18" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="bold" fill="#1e293b" text-anchor="middle" letter-spacing="1.5">ENGLAND</text>
        <!-- Lions silhouette -->
        <path d="M-18,-8 Q0,-12 18,-8 Q12,-3 0,-4 Q-12,-3 -18,-8 Z" fill="#1e3a8a"/>
        <path d="M-18,6 Q0,2 18,6 Q12,11 0,10 Q-12,11 -18,6 Z" fill="#1e3a8a"/>
        <path d="M-18,20 Q0,16 18,20 Q12,25 0,24 Q-12,25 -18,20 Z" fill="#1e3a8a"/>
        <!-- Red Tudor Roses -->
        <circle cx="-22" cy="0" r="3.5" fill="#e11d48"/>
        <circle cx="22" cy="0" r="3.5" fill="#e11d48"/>
      </g>

      <!-- Umbro Double Diamond -->
      <g transform="translate(0, -125)">
        <polygon points="0,-12 16,0 0,12 -16,0" fill="none" stroke="#1e293b" stroke-width="3.5"/>
        <polygon points="0,-7 10,0 0,7 -10,0" fill="#1e293b"/>
      </g>

      <!-- Euro 96 Arm Ribbon -->
      <g transform="translate(145, -145) rotate(45)">
        <rect x="-10" y="-15" width="20" height="30" fill="#0284c7"/>
        <rect x="-5" y="-15" width="10" height="30" fill="#1e293b"/>
      </g>
      <text x="0" y="70" font-family="Impact, sans-serif" font-size="52" fill="#1e3a8a" text-anchor="middle" letter-spacing="4" opacity="0.85">EURO 96</text>
    </g>
  `),

  'inter-milan-1997-third.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Jersey Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#262626"/>
      
      <!-- Alternating Grey Horizontal Hoops -->
      <rect x="-145" y="-180" width="290" height="35" fill="#52525b"/>
      <rect x="-145" y="-110" width="290" height="35" fill="#52525b"/>
      <rect x="-145" y="-40" width="290" height="35" fill="#52525b"/>
      <rect x="-145" y="30" width="290" height="35" fill="#52525b"/>
      <rect x="-145" y="100" width="290" height="35" fill="#52525b"/>
      <rect x="-145" y="170" width="290" height="35" fill="#52525b"/>

      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Blue Collar & Trim -->
      <path d="M-70,-220 L0,-160 L70,-220 L35,-260 L-35,-260 Z" fill="#1d4ed8"/>
      <polygon points="0,-160 -18,-190 18,-190" fill="#171717"/>

      <!-- PIRELLI Yellow Sponsor -->
      <text x="0" y="55" font-family="'Helvetica Neue', Arial, sans-serif" font-size="44" font-weight="900" fill="#facc15" text-anchor="middle" letter-spacing="6">IRELLI</text>
      <!-- Extended P -->
      <path d="M-105,53 L-105,18 L-55,18 C-40,18 -40,38 -55,38 L-90,38 L-90,53 Z" fill="#facc15"/>
      <line x1="-105" y1="18" x2="105" y2="18" stroke="#facc15" stroke-width="4"/>

      <!-- Inter Gold Star Crest -->
      <g transform="translate(-75, -125)">
        <circle cx="0" cy="0" r="28" fill="#171717" stroke="#d4af37" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="24" fill="#1d4ed8"/>
        <text x="0" y="7" font-family="'Times New Roman', serif" font-size="22" font-weight="bold" fill="#facc15" text-anchor="middle">FCIM</text>
        <polygon points="0,-40 2.5,-33 9,-33 4,-29 6,-23 0,-27 -6,-23 -4,-29 -9,-33 -2.5,-33" fill="url(#goldGrad)"/>
      </g>

      <!-- Ronaldo 9 Tribute Subtle Print on Chest -->
      <text x="75" y="-120" font-family="Impact, sans-serif" font-size="22" fill="#f8fafc" text-anchor="middle" opacity="0.9">RONALDO</text>
      <text x="75" y="-95" font-family="Impact, sans-serif" font-size="28" fill="#facc15" text-anchor="middle">9</text>
    </g>
  `),

  'argentina-1986-away.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Deep Royal Blue Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#1d4ed8"/>
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Pure White V-Neck Collar & Sleeve Trim -->
      <path d="M-65,-220 L0,-155 L65,-220 L40,-255 L-40,-255 Z" fill="#f8fafc"/>
      <polygon points="0,-155 -18,-185 18,-185" fill="#1d4ed8"/>
      <rect x="-160" y="-135" width="30" height="6" fill="#f8fafc"/>
      <rect x="130" y="-135" width="30" height="6" fill="#f8fafc"/>

      <!-- AFA Crest -->
      <g transform="translate(-75, -110)">
        <path d="M-24,-30 L24,-30 L24,10 C24,28 0,38 0,38 C0,38 -24,28 -24,10 Z" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
        <text x="0" y="2" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">AFA</text>
        <circle cx="-10" cy="-36" r="3" fill="url(#goldGrad)"/>
        <circle cx="10" cy="-36" r="3" fill="url(#goldGrad)"/>
        <!-- Laurel wreath -->
        <path d="M-20,15 Q-26,-5 -15,-20" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
        <path d="M20,15 Q26,-5 15,-20" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
      </g>

      <!-- Legendary Silver Glistening #10 -->
      <g transform="translate(0, 45)">
        <text x="0" y="0" font-family="'Impact', Arial, sans-serif" font-size="130" font-weight="900" fill="url(#silverGrad)" text-anchor="middle" letter-spacing="2">10</text>
        <text x="0" y="-105" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="6">MARADONA</text>
      </g>
    </g>
  `),

  'newcastle-1996-home.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Black Base Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#111111"/>
      
      <!-- Thick White Vertical Stripes -->
      <rect x="-120" y="-220" width="40" height="430" fill="#f8fafc"/>
      <rect x="-40" y="-220" width="40" height="430" fill="#f8fafc"/>
      <rect x="40" y="-220" width="40" height="430" fill="#f8fafc"/>
      <rect x="120" y="-220" width="25" height="430" fill="#f8fafc"/>

      <!-- Grandad Button Collar -->
      <path d="M-60,-220 C-60,-220 0,-180 60,-220 L40,-255 L-40,-255 Z" fill="#09090b" stroke="#334155" stroke-width="2"/>
      <rect x="-10" y="-200" width="20" height="40" fill="#09090b"/>
      <circle cx="0" cy="-190" r="3" fill="#f8fafc"/>
      <circle cx="0" cy="-175" r="3" fill="#f8fafc"/>

      <!-- Newcastle Brown Ale Blue Star Emblem -->
      <g transform="translate(0, 30)">
        <circle cx="0" cy="0" r="62" fill="#0284c7" stroke="#facc15" stroke-width="4"/>
        <!-- Yellow Star inside -->
        <polygon points="0,-52 14,-15 52,-15 22,9 33,48 0,25 -33,48 -22,9 -52,-15 -14,-15" fill="#facc15"/>
        <circle cx="0" cy="0" r="20" fill="#ffffff"/>
        <!-- Tyne Bridge silhouette -->
        <path d="M-16,4 Q0,-14 16,4" fill="none" stroke="#111111" stroke-width="4"/>
        <text x="0" y="85" font-family="'Impact', Arial, sans-serif" font-size="20" fill="#f8fafc" text-anchor="middle" letter-spacing="2">NEWCASTLE BROWN ALE</text>
      </g>

      <!-- Newcastle Club Shield -->
      <g transform="translate(-80, -115)">
        <path d="M-25,-32 L25,-32 L25,10 C25,26 0,38 0,38 C0,38 -25,26 -25,10 Z" fill="#111111" stroke="#d4af37" stroke-width="2"/>
        <path d="M-12,-32 L-4,-32 L-4,25 L-12,20 Z" fill="#ffffff"/>
        <path d="M4,-32 L12,-32 L12,20 L4,25 Z" fill="#ffffff"/>
        <!-- Seahorses & Castle -->
        <rect x="-6" y="-40" width="12" height="10" fill="url(#goldGrad)"/>
      </g>
    </g>
  `),

  'ajax-1998-home.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Pure White Base -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Iconic Center Scarlet Red Panel -->
      <rect x="-70" y="-220" width="140" height="430" fill="#dc2626"/>

      <!-- Red V-Neck Collar -->
      <path d="M-65,-220 L0,-155 L65,-220 L40,-255 L-40,-255 Z" fill="#dc2626"/>
      <polygon points="0,-155 -15,-180 15,-180" fill="#f8fafc"/>

      <!-- Vertical ABN•AMRO Sponsor Text -->
      <g transform="translate(42, 20) rotate(90)">
        <text x="0" y="0" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="4">ABN•AMRO</text>
      </g>

      <!-- Classical Ajax Line-Art Portrait Badge -->
      <g transform="translate(0, -95)">
        <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
        <!-- 11-line Ajax warrior profile -->
        <path d="M-12,-15 Q-2,-24 10,-12 Q14,-4 10,12 Q-2,20 -12,8 Z" fill="none" stroke="#dc2626" stroke-width="2.5"/>
        <line x1="-5" y1="-8" x2="6" y2="-8" stroke="#dc2626" stroke-width="2"/>
        <line x1="-7" y1="2" x2="4" y2="2" stroke="#dc2626" stroke-width="2"/>
        <text x="0" y="24" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#dc2626" text-anchor="middle">AJAX</text>
      </g>
    </g>
  `),

  'italy-1994-home.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Royal Azzurri Blue Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#0284c7"/>
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Tricolor (Verde, Bianco, Rosso) Collar & Sleeve Edges -->
      <path d="M-65,-220 L0,-155 L65,-220 L40,-255 L-40,-255 Z" fill="#0369a1"/>
      <path d="M-55,-220 L0,-165 L55,-220" fill="none" stroke="#16a34a" stroke-width="4"/>
      <path d="M-50,-220 L0,-170 L50,-220" fill="none" stroke="#f8fafc" stroke-width="4"/>
      <path d="M-45,-220 L0,-175 L45,-220" fill="none" stroke="#dc2626" stroke-width="4"/>

      <!-- FIGC Crest with 3 Gold Stars -->
      <g transform="translate(-75, -110)">
        <circle cx="0" cy="0" r="28" fill="#0369a1" stroke="url(#goldGrad)" stroke-width="2.5"/>
        <rect x="-18" y="-12" width="12" height="24" fill="#16a34a"/>
        <rect x="-6" y="-12" width="12" height="24" fill="#f8fafc"/>
        <rect x="6" y="-12" width="12" height="24" fill="#dc2626"/>
        <text x="0" y="-16" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">ITALIA</text>
        <circle cx="-14" cy="-34" r="3" fill="url(#goldGrad)"/>
        <circle cx="0" cy="-38" r="3.5" fill="url(#goldGrad)"/>
        <circle cx="14" cy="-34" r="3" fill="url(#goldGrad)"/>
      </g>

      <!-- Diadora logo -->
      <g transform="translate(75, -110)">
        <circle cx="-12" cy="0" r="5" fill="#f8fafc"/>
        <path d="M-8,-4 L15,-10 L15,10 L-8,4 Z" fill="#f8fafc"/>
      </g>

      <!-- Roberto Baggio 10 Subtle Watermark -->
      <text x="0" y="70" font-family="Impact, sans-serif" font-size="90" fill="#f8fafc" text-anchor="middle" opacity="0.35">10</text>
      <text x="0" y="115" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="4" opacity="0.65">BAGGIO</text>
    </g>
  `),

  'real-madrid-2002-centenary.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Pure Blanco White Body -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Clean White Ribbed V-Neck -->
      <path d="M-65,-220 L0,-155 L65,-220 L40,-255 L-40,-255 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <polygon points="0,-155 -16,-180 16,-180" fill="#f1f5f9"/>

      <!-- Real Madrid Royal Badge with Crown -->
      <g transform="translate(-75, -105)">
        <circle cx="0" cy="8" r="26" fill="#ffffff" stroke="url(#goldGrad)" stroke-width="2.5"/>
        <line x1="-20" y1="20" x2="20" y2="-4" stroke="#7c3aed" stroke-width="6"/>
        <text x="0" y="14" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">MCF</text>
        <!-- Royal Crown -->
        <path d="M-16,-10 L-22,-25 L-8,-16 L0,-28 L8,-16 L22,-25 L16,-10 Z" fill="url(#goldGrad)" stroke="#aa820a" stroke-width="1"/>
        <circle cx="0" cy="-30" r="2" fill="url(#goldGrad)"/>
      </g>

      <!-- Three Subtle Grey Shoulder Stripes -->
      <g stroke="#94a3b8" stroke-width="3" opacity="0.6">
        <line x1="-180" y1="-210" x2="-130" y2="-250"/>
        <line x1="-170" y1="-218" x2="-120" y2="-258"/>
        <line x1="-160" y1="-226" x2="-110" y2="-266"/>
        <line x1="180" y1="-210" x2="130" y2="-250"/>
        <line x1="170" y1="-218" x2="120" y2="-258"/>
        <line x1="160" y1="-226" x2="110" y2="-266"/>
      </g>

      <!-- 1902-2002 Centenary Commemorative Sleeve Patch -->
      <g transform="translate(145, -145) rotate(35)">
        <rect x="-18" y="-22" width="36" height="44" rx="4" fill="#0f172a" stroke="url(#goldGrad)" stroke-width="2"/>
        <text x="0" y="-6" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">1902</text>
        <text x="0" y="6" font-family="'Times New Roman', serif" font-size="9" fill="#f8fafc" text-anchor="middle">2002</text>
        <text x="0" y="16" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">CENTENARIO</text>
      </g>

      <!-- Sponsorless Clean Aesthetic Badge Tribute -->
      <text x="0" y="70" font-family="'Times New Roman', serif" font-size="24" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">REAL MADRID</text>
      <text x="0" y="98" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#64748b" text-anchor="middle" letter-spacing="6">CENTENARY 1902 - 2002</text>
    </g>
  `),

  'netherlands-1990-away.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Pure White Base -->
      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      
      <!-- Iconic Geometric Royal Blue / Cyan Chevron Tessellation Across Chest -->
      <g fill="#2563eb" opacity="0.9">
        <polygon points="-140,-130 -80,-190 -20,-130 -80,-70"/>
        <polygon points="-80,-190 -20,-250 40,-190 -20,-130"/>
        <polygon points="-20,-130 40,-190 100,-130 40,-70"/>
        <polygon points="40,-190 100,-250 160,-190 100,-130"/>
      </g>
      <g fill="#60a5fa" opacity="0.8">
        <polygon points="-80,-130 -40,-170 0,-130 -40,-90"/>
        <polygon points="40,-130 80,-170 120,-130 80,-90"/>
      </g>

      <path d="M-190,-210 L-130,-260 L-70,-220 L70,-220 L130,-260 L190,-210 L160,-130 L130,-145 L145,210 L-145,210 L-130,-145 L-160,-130 Z" fill="url(#fabricMesh)"/>

      <!-- Royal Blue Ribbed Polo Collar -->
      <path d="M-65,-220 L0,-160 L65,-220 L40,-255 L-40,-255 Z" fill="#1d4ed8"/>
      <polygon points="0,-160 -18,-185 18,-185" fill="#f8fafc"/>

      <!-- KNVB Dutch Lion Crest in Black & White -->
      <g transform="translate(-75, -100)">
        <circle cx="0" cy="0" r="28" fill="#111111"/>
        <path d="M-12,12 Q-18,0 -8,-14 Q4,-18 12,-6 Q18,6 6,14 Z" fill="#ffffff"/>
        <!-- Rampant Lion Crown & Claws -->
        <polygon points="-4,-16 0,-22 4,-16" fill="url(#goldGrad)"/>
      </g>

      <!-- Three Stripes Royal Blue on Shoulders -->
      <line x1="-180" y1="-210" x2="-130" y2="-250" stroke="#1d4ed8" stroke-width="4"/>
      <line x1="-170" y1="-218" x2="-120" y2="-258" stroke="#1d4ed8" stroke-width="4"/>
      <line x1="-160" y1="-226" x2="-110" y2="-266" stroke="#1d4ed8" stroke-width="4"/>

      <text x="0" y="80" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="900" fill="#1e3a8a" text-anchor="middle" letter-spacing="4">NEDERLAND</text>
      <text x="0" y="110" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ea580c" text-anchor="middle" letter-spacing="2">ITALIA 1990</text>
    </g>
  `),

  // ==========================================
  // FOOTBALL BOOTS
  // ==========================================
  'speciali-pro-sg.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Classic Black Boot Silhouette (Side Angle) -->
      <path d="M-220,110 C-240,60 -210,10 -150,-10 C-100,-25 -40,-45 40,-35 C110,-25 180,10 220,70 C240,100 220,125 180,130 C100,140 -120,145 -200,135 Z" fill="#111111"/>
      
      <!-- Quilted Forefoot K-Leather Grid -->
      <g stroke="#374151" stroke-width="1.8" opacity="0.7">
        <line x1="80" y1="10" x2="200" y2="90"/>
        <line x1="50" y1="20" x2="170" y2="105"/>
        <line x1="20" y1="35" x2="130" y2="120"/>
        <line x1="120" y1="100" x2="210" y2="35"/>
        <line x1="80" y1="110" x2="170" y2="20"/>
        <line x1="40" y1="120" x2="130" y2="10"/>
      </g>

      <!-- Umbro White Double Diamond on Lateral Side -->
      <g transform="translate(10, 45) scale(0.7) rotate(-5)">
        <polygon points="0,-40 60,0 0,40 -60,0" fill="none" stroke="#f8fafc" stroke-width="12"/>
        <polygon points="0,-24 36,0 0,24 -36,0" fill="#f8fafc"/>
      </g>

      <!-- White Fold-over Tongue with Red Speciali Logo -->
      <path d="M-20,-30 C-30,-75 20,-85 50,-40 C30,-30 0,-25 -20,-30 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <text x="15" y="-55" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="900" fill="#dc2626" text-anchor="middle" letter-spacing="1">SPECIALI</text>

      <!-- Soleplate & 6 Interchangeable Metal SG Screw-In Studs -->
      <path d="M-210,135 L190,135 L180,148 L-200,148 Z" fill="#1e293b"/>
      <!-- Metal Studs (Silver Glistening) -->
      <polygon points="-180,148 -170,185 -160,185 -150,148" fill="url(#silverGrad)"/>
      <polygon points="-130,148 -120,185 -110,185 -100,148" fill="url(#silverGrad)"/>
      <polygon points="40,148 50,185 60,185 70,148" fill="url(#silverGrad)"/>
      <polygon points="100,148 110,185 120,185 130,148" fill="url(#silverGrad)"/>
      <polygon points="150,148 158,185 168,185 175,148" fill="url(#silverGrad)"/>

      <!-- Heel counter & Laces -->
      <path d="M-220,110 C-240,60 -210,10 -150,-10 L-130,40 C-180,50 -200,90 -220,110 Z" fill="#1f2937"/>
      <line x1="-10" y1="-25" x2="30" y2="10" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="-20" x2="60" y2="15" stroke="#f8fafc" stroke-width="3" stroke-linecap="round"/>
    </g>
  `),

  'tiempo-premier-ag.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Black Calfskin Silhouette -->
      <path d="M-220,105 C-235,55 -205,10 -145,-15 C-85,-30 -30,-45 50,-35 C120,-25 185,15 225,75 C240,105 215,125 175,130 C95,140 -125,142 -205,135 Z" fill="#141416"/>
      
      <!-- Nike White Swoosh -->
      <path d="M-80,45 C-10,65 50,70 120,30 C160,-5 190,-25 205,-40 C195,-15 155,75 80,95 C15,115 -50,90 -80,45 Z" fill="#f8fafc"/>

      <!-- Quilted Forefoot Stitching -->
      <path d="M70,30 Q130,60 190,95" fill="none" stroke="#374151" stroke-width="2"/>
      <path d="M90,10 Q145,45 205,80" fill="none" stroke="#374151" stroke-width="2"/>
      <path d="M110,-10 Q160,25 220,65" fill="none" stroke="#374151" stroke-width="2"/>

      <!-- AG Specific Conical Hollow Studs Plate -->
      <path d="M-210,132 L185,132 L175,146 L-200,146 Z" fill="#0f172a"/>
      <!-- Conical Hollow AG Studs with Volt Accents -->
      <g fill="#1e293b" stroke="#84cc16" stroke-width="2.5">
        <circle cx="-170" cy="160" r="10"/>
        <circle cx="-130" cy="160" r="10"/>
        <circle cx="-90" cy="160" r="10"/>
        <circle cx="20" cy="160" r="10"/>
        <circle cx="60" cy="160" r="10"/>
        <circle cx="100" cy="160" r="10"/>
        <circle cx="140" cy="160" r="10"/>
      </g>

      <!-- White Foldover Tongue with Nike Script -->
      <path d="M-15,-30 C-30,-70 20,-80 50,-40 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
      <text x="18" y="-55" font-family="Impact, sans-serif" font-size="16" font-style="italic" fill="#09090b" text-anchor="middle">NIKE</text>
    </g>
  `),

  'morelia-classic-fg.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Pure K-Leather Deep Black Silhouette -->
      <path d="M-225,110 C-240,60 -210,10 -150,-10 C-90,-25 -35,-45 45,-35 C115,-25 185,10 225,70 C245,100 220,125 180,130 C100,140 -120,142 -205,135 Z" fill="#0d0d0f"/>
      
      <!-- Mizuno Runbird White Wave Logo -->
      <g transform="translate(10, 35) scale(0.9)">
        <path d="M-60,30 C-20,35 30,25 70,-15 C100,-45 125,-60 140,-70 C120,-50 75,-10 30,10 C-10,30 -40,30 -60,30 Z" fill="#f8fafc"/>
        <path d="M-10,10 C15,0 45,-20 70,-45 C50,-25 20,-5 -10,10 Z" fill="#dc2626"/>
      </g>

      <!-- Handcrafted Wave-Stitch Vamp Pattern -->
      <g stroke="#4b5563" stroke-width="1.8" fill="none" opacity="0.75">
        <path d="M50,15 C90,40 140,40 180,80"/>
        <path d="M70,-5 C110,20 160,20 200,60"/>
        <path d="M90,-25 C130,0 180,0 220,40"/>
      </g>

      <!-- Graded Nylon Soleplate with 13 Molded Round Studs -->
      <path d="M-210,135 L190,135 L180,148 L-200,148 Z" fill="#ffffff"/>
      <g fill="#ffffff" stroke="#111111" stroke-width="2">
        <circle cx="-175" cy="165" r="9"/>
        <circle cx="-135" cy="165" r="9"/>
        <circle cx="35" cy="165" r="9"/>
        <circle cx="75" cy="165" r="9"/>
        <circle cx="115" cy="165" r="9"/>
        <circle cx="155" cy="165" r="9"/>
      </g>

      <!-- Red Tongue Badge with Mizuno Gold Lettering -->
      <path d="M-10,-35 C-25,-75 25,-85 55,-45 Z" fill="#dc2626"/>
      <text x="22" y="-58" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">Mizuno</text>
      <text x="22" y="-46" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">MORELIA</text>
    </g>
  `),

  'mundial-team-tf.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Black Kangaroo Leather Body -->
      <path d="M-220,105 C-235,55 -205,10 -145,-15 C-85,-30 -30,-45 50,-35 C120,-25 185,15 225,75 C240,105 215,125 175,130 C95,140 -125,142 -205,135 Z" fill="#141416"/>
      
      <!-- Split-Suede Grey Abrasion Toe Bumper Wrap -->
      <path d="M120,60 C160,70 195,85 225,75 C240,105 215,125 175,130 C130,132 105,125 90,110 Z" fill="#64748b" opacity="0.85"/>

      <!-- Three Iconic White Adidas Stripes -->
      <g fill="#f8fafc" transform="translate(-10, 35) rotate(-22)">
        <polygon points="-40,-50 -24,-50 16,50 0,50"/>
        <polygon points="-16,-50 0,-50 40,50 24,50"/>
        <polygon points="8,-50 24,-50 64,50 48,50"/>
      </g>

      <!-- Multi-Cleated Micro Rubber TF Turf Studs (Hundreds of micro nubs) -->
      <rect x="-210" y="132" width="400" height="12" fill="#ffffff"/>
      <rect x="-215" y="144" width="410" height="10" fill="#111111"/>
      <g fill="#111111">
        <circle cx="-190" cy="162" r="5"/>
        <circle cx="-170" cy="162" r="5"/>
        <circle cx="-150" cy="162" r="5"/>
        <circle cx="-130" cy="162" r="5"/>
        <circle cx="-110" cy="162" r="5"/>
        <circle cx="-90" cy="162" r="5"/>
        <circle cx="-70" cy="162" r="5"/>
        <circle cx="-50" cy="162" r="5"/>
        <circle cx="-30" cy="162" r="5"/>
        <circle cx="-10" cy="162" r="5"/>
        <circle cx="10" cy="162" r="5"/>
        <circle cx="30" cy="162" r="5"/>
        <circle cx="50" cy="162" r="5"/>
        <circle cx="70" cy="162" r="5"/>
        <circle cx="90" cy="162" r="5"/>
        <circle cx="110" cy="162" r="5"/>
        <circle cx="130" cy="162" r="5"/>
        <circle cx="150" cy="162" r="5"/>
        <circle cx="170" cy="162" r="5"/>
      </g>

      <!-- Gold "MUNDIAL TEAM" Lettering -->
      <text x="-40" y="25" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="url(#goldGrad)" letter-spacing="2">MUNDIAL TEAM</text>
    </g>
  `),

  'samba-classic-ic.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Black Leather Samba Silhouette -->
      <path d="M-220,105 C-235,55 -205,10 -145,-15 C-85,-30 -30,-45 50,-35 C120,-25 185,15 225,75 C240,105 215,125 175,130 C95,140 -125,142 -205,135 Z" fill="#171717"/>
      
      <!-- Suede Tan T-Toe Overlay -->
      <path d="M120,60 C160,70 195,85 225,75 C240,105 215,125 175,130 C130,132 105,125 90,110 Z" fill="#a89f91"/>

      <!-- Three White Stripes -->
      <g fill="#f8fafc" transform="translate(-10, 35) rotate(-22)">
        <polygon points="-40,-50 -24,-50 16,50 0,50"/>
        <polygon points="-16,-50 0,-50 40,50 24,50"/>
        <polygon points="8,-50 24,-50 64,50 48,50"/>
      </g>

      <!-- Authentic Honey Gum Rubber Sole (IC Court) -->
      <path d="M-210,133 L185,133 L175,158 L-200,158 Z" fill="#c28e46" stroke="#966723" stroke-width="1.5"/>
      <!-- Non-marking suction cups pattern -->
      <g fill="#a17028">
        <circle cx="-160" cy="146" r="6"/>
        <circle cx="-120" cy="146" r="6"/>
        <circle cx="-80" cy="146" r="6"/>
        <circle cx="20" cy="146" r="6"/>
        <circle cx="60" cy="146" r="6"/>
        <circle cx="100" cy="146" r="6"/>
        <circle cx="140" cy="146" r="6"/>
      </g>

      <!-- Extended Tongue with Blue Trefoil Badge -->
      <path d="M-15,-30 C-35,-85 25,-95 55,-40 Z" fill="#171717" stroke="#333333" stroke-width="1"/>
      <rect x="0" y="-75" width="30" height="25" rx="3" fill="#0284c7"/>
      <polygon points="15,-70 18,-62 25,-62 20,-58 22,-50 15,-54 8,-50 10,-58 5,-62 12,-62" fill="#ffffff"/>

      <!-- Gold SAMBA Print -->
      <text x="-40" y="25" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="bold" fill="url(#goldGrad)" letter-spacing="3">SAMBA</text>
    </g>
  `),

  'gato-vintage-ic.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Sail White / Cream Upper Body -->
      <path d="M-220,105 C-235,55 -205,10 -145,-15 C-85,-30 -30,-45 50,-35 C120,-25 185,15 225,75 C240,105 215,125 175,130 C95,140 -125,142 -205,135 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      
      <!-- Suede Beige Toe Wrap -->
      <path d="M110,50 C150,60 195,85 225,75 C240,105 215,125 175,130 C125,132 100,120 85,100 Z" fill="#d4c7b2"/>

      <!-- Burgundy Red Swoosh -->
      <path d="M-70,50 C0,70 60,70 125,30 C165,-5 190,-25 205,-40 C195,-15 155,75 80,95 C15,115 -45,95 -70,50 Z" fill="#991b1b"/>

      <!-- Honey Gum Court Herringbone Sole -->
      <path d="M-210,133 L185,133 L175,158 L-200,158 Z" fill="#d99b43" stroke="#b07525" stroke-width="1.5"/>

      <!-- Breathable Lateral Mesh Vent Panels -->
      <g stroke="#94a3b8" stroke-width="1" opacity="0.6">
        <line x1="-50" y1="20" x2="-20" y2="45"/>
        <line x1="-35" y1="15" x2="-5" y2="40"/>
        <line x1="-20" y1="10" x2="10" y2="35"/>
      </g>

      <text x="-120" y="60" font-family="Impact, sans-serif" font-size="16" fill="#991b1b" letter-spacing="1">GATO</text>
    </g>
  `),

  // ==========================================
  // SOCKS & GRIP
  // ==========================================
  'vintage-ribbed-socks.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Left Sock -->
      <g transform="translate(-70, 0)">
        <path d="M-40,-230 L40,-230 L40,100 C40,150 90,170 110,210 C120,230 100,245 70,245 C20,245 -40,180 -40,130 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
        <!-- Thick Ribbed Turnover Top Cuff -->
        <rect x="-44" y="-235" width="88" height="70" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Navy Stripes on Rib Cuff -->
        <rect x="-44" y="-215" width="88" height="10" fill="#1e3a8a"/>
        <rect x="-44" y="-190" width="88" height="10" fill="#1e3a8a"/>
        <!-- Vertical Texture Rib Lines -->
        <g stroke="#cbd5e1" stroke-width="1.5" opacity="0.6">
          <line x1="-30" y1="-165" x2="-30" y2="100"/>
          <line x1="-15" y1="-165" x2="-15" y2="100"/>
          <line x1="0" y1="-165" x2="0" y2="100"/>
          <line x1="15" y1="-165" x2="15" y2="100"/>
          <line x1="30" y1="-165" x2="30" y2="100"/>
        </g>
        <!-- Reinforced Heel & Toe -->
        <path d="M-40,110 C-40,160 0,160 0,130 Z" fill="#e2e8f0"/>
        <path d="M80,225 C110,225 110,245 70,245 Z" fill="#e2e8f0"/>
      </g>

      <!-- Right Sock (Mirror) -->
      <g transform="translate(70, 0)">
        <path d="M-40,-230 L40,-230 L40,130 C40,180 -20,245 -70,245 C-100,245 -120,230 -110,210 C-90,170 -40,150 -40,100 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
        <rect x="-44" y="-235" width="88" height="70" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        <rect x="-44" y="-215" width="88" height="10" fill="#1e3a8a"/>
        <rect x="-44" y="-190" width="88" height="10" fill="#1e3a8a"/>
        <g stroke="#cbd5e1" stroke-width="1.5" opacity="0.6">
          <line x1="-30" y1="-165" x2="-30" y2="100"/>
          <line x1="-15" y1="-165" x2="-15" y2="100"/>
          <line x1="0" y1="-165" x2="0" y2="100"/>
          <line x1="15" y1="-165" x2="15" y2="100"/>
          <line x1="30" y1="-165" x2="30" y2="100"/>
        </g>
      </g>
    </g>
  `),

  'dual-grip-socks.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Black Match Performance Body -->
      <path d="M-50,-220 L50,-220 L50,90 C50,140 110,160 140,200 C155,225 130,245 90,245 C30,245 -50,180 -50,120 Z" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
      
      <!-- Gold Hexagonal Dual-Grip Pods Matrix on Sole -->
      <g fill="url(#goldGrad)" transform="translate(45, 175) scale(0.9)">
        <polygon points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"/>
        <polygon points="22,-10 31,-5 31,5 22,10 13,5 13,-5"/>
        <polygon points="44,-10 53,-5 53,5 44,10 35,5 35,-5"/>
        <polygon points="11,8 20,13 20,23 11,28 2,23 2,13"/>
        <polygon points="33,8 42,13 42,23 33,28 24,23 24,13"/>
        <polygon points="55,8 64,13 64,23 55,28 46,23 46,13"/>
        <polygon points="0,26 9,31 9,41 0,46 -9,41 -9,31"/>
        <polygon points="22,26 31,31 31,41 22,46 13,41 13,31"/>
        <polygon points="44,26 53,31 53,41 44,46 35,41 35,31"/>
      </g>

      <!-- Heel Grip Pods -->
      <g fill="url(#goldGrad)" transform="translate(-25, 125) scale(0.8)">
        <polygon points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"/>
        <polygon points="18,-10 27,-5 27,5 18,10 9,5 9,-5"/>
        <polygon points="9,8 18,13 18,23 9,28 0,23 0,13"/>
      </g>

      <!-- Arch Support Compression Band -->
      <rect x="-48" y="20" width="96" height="35" fill="#27272a" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="0" y="42" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">DUAL-GRIP PRO</text>

      <!-- Elastic Ankle Ribbing -->
      <rect x="-52" y="-225" width="104" height="40" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
      <line x1="-50" y1="-205" x2="50" y2="-205" stroke="url(#goldGrad)" stroke-width="3"/>
    </g>
  `),

  'calf-compression-sleeves.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Pure White Calf Sleeve (Left) -->
      <g transform="translate(-80, 0)">
        <path d="M-45,-210 L45,-210 L30,210 L-30,210 Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
        <rect x="-47" y="-215" width="94" height="25" rx="3" fill="#0f172a"/>
        <rect x="-32" y="195" width="64" height="20" rx="3" fill="#0f172a"/>
        <!-- Ergonomic compression lines -->
        <path d="M-35,-120 Q0,-80 35,-120" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M-30,-20 Q0,20 30,-20" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M-25,80 Q0,110 25,80" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="0" y="-198" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="2">COMPRESSION</text>
        <text x="0" y="10" font-family="Impact, sans-serif" font-size="28" fill="#0f172a" text-anchor="middle" letter-spacing="2">20-30</text>
        <text x="0" y="30" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#64748b" text-anchor="middle">mmHg</text>
      </g>

      <!-- Deep Black Calf Sleeve (Right) -->
      <g transform="translate(80, 0)">
        <path d="M-45,-210 L45,-210 L30,210 L-30,210 Z" fill="#18181b" stroke="#27272a" stroke-width="2"/>
        <rect x="-47" y="-215" width="94" height="25" rx="3" fill="#f8fafc"/>
        <rect x="-32" y="195" width="64" height="20" rx="3" fill="#f8fafc"/>
        <path d="M-35,-120 Q0,-80 35,-120" fill="none" stroke="#52525b" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M-30,-20 Q0,20 30,-20" fill="none" stroke="#52525b" stroke-width="2" stroke-dasharray="4,4"/>
        <path d="M-25,80 Q0,110 25,80" fill="none" stroke="#52525b" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="0" y="-198" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#09090b" text-anchor="middle" letter-spacing="2">COMPRESSION</text>
        <text x="0" y="10" font-family="Impact, sans-serif" font-size="28" fill="#f8fafc" text-anchor="middle" letter-spacing="2">20-30</text>
        <text x="0" y="30" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#a1a1aa" text-anchor="middle">mmHg</text>
      </g>
    </g>
  `),

  'retro-stripe-socks.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Vintage Cream Body -->
      <path d="M-50,-220 L50,-220 L50,100 C50,150 110,170 135,210 C145,230 120,245 85,245 C30,245 -50,180 -50,130 Z" fill="#fef08a" opacity="0.85" stroke="#fef9c3" stroke-width="2"/>
      <!-- Burgundy Hoop Stripes -->
      <rect x="-52" y="-225" width="104" height="40" fill="#881337"/>
      <rect x="-50" y="-170" width="100" height="22" fill="#881337"/>
      <rect x="-50" y="-135" width="100" height="22" fill="#881337"/>
      <rect x="-50" y="-100" width="100" height="22" fill="#881337"/>

      <!-- Merino Wool Badge -->
      <g transform="translate(0, 10)">
        <circle cx="0" cy="0" r="26" fill="#881337" stroke="url(#goldGrad)" stroke-width="2"/>
        <text x="0" y="-5" font-family="Georgia, serif" font-size="8" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">FINE</text>
        <text x="0" y="6" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">MERINO</text>
        <text x="0" y="16" font-family="Georgia, serif" font-size="7" fill="url(#goldGrad)" text-anchor="middle">WOOL</text>
      </g>

      <!-- Heel & Toe in Burgundy -->
      <path d="M-50,110 C-50,165 -10,165 -10,130 Z" fill="#881337"/>
      <path d="M100,225 C135,225 135,245 85,245 Z" fill="#881337"/>
    </g>
  `),

  'low-cut-grip-socks.svg': wrapSvg(`
    <g filter="url(#softShadow)" transform="translate(400, 390)">
      <!-- Low Cut Ankle Body -->
      <path d="M-90,60 C-90,0 -40,-30 20,-30 C70,-30 110,0 150,60 C180,110 160,150 120,150 C40,150 -90,140 -90,60 Z" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
      <path d="M-30,-30 C0,-60 60,-60 80,-30 Z" fill="#27272a"/>
      
      <!-- Hexagon Silicone Pods -->
      <g fill="#0284c7" transform="translate(20, 100) scale(0.8)">
        <polygon points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"/>
        <polygon points="22,-10 31,-5 31,5 22,10 13,5 13,-5"/>
        <polygon points="44,-10 53,-5 53,5 44,10 35,5 35,-5"/>
        <polygon points="66,-10 75,-5 75,5 66,10 57,5 57,-5"/>
        <polygon points="11,8 20,13 20,23 11,28 2,23 2,13"/>
        <polygon points="33,8 42,13 42,23 33,28 24,23 24,13"/>
        <polygon points="55,8 64,13 64,23 55,28 46,23 46,13"/>
      </g>

      <text x="25" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">LOW-CUT TRAINER</text>
    </g>
  `),

  // ==========================================
  // SHIN GUARDS & PROTECTION
  // ==========================================
  'vintage-carbon-shin-guards.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Left Shin Guard (Anatomical Curve) -->
      <g transform="translate(-75, 0) rotate(-6)">
        <path d="M-60,-220 C-30,-240 30,-240 60,-220 C80,-120 70,120 40,210 C20,230 -20,230 -40,210 C-70,120 -80,-120 -60,-220 Z" fill="url(#carbonPattern)" stroke="url(#goldGrad)" stroke-width="2.5"/>
        <!-- Golden Script & Crest -->
        <polygon points="0,-150 4,-140 14,-140 6,-132 10,-122 0,-128 -10,-122 -6,-132 -14,-140 -4,-140" fill="url(#goldGrad)"/>
        <text x="0" y="-85" font-family="'Times New Roman', serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">3K CARBON</text>
        <text x="0" y="-65" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">FEATHERWEIGHT</text>
        <text x="0" y="140" font-family="Impact, sans-serif" font-size="38" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">35g</text>
        <!-- Honeycomb EVA Foam Edge Peeking Out -->
        <path d="M-60,-220 C-30,-240 30,-240 60,-220" fill="none" stroke="#e11d48" stroke-width="4"/>
      </g>

      <!-- Right Shin Guard -->
      <g transform="translate(75, 0) rotate(6)">
        <path d="M-60,-220 C-30,-240 30,-240 60,-220 C80,-120 70,120 40,210 C20,230 -20,230 -40,210 C-70,120 -80,-120 -60,-220 Z" fill="url(#carbonPattern)" stroke="url(#goldGrad)" stroke-width="2.5"/>
        <polygon points="0,-150 4,-140 14,-140 6,-132 10,-122 0,-128 -10,-122 -6,-132 -14,-140 -4,-140" fill="url(#goldGrad)"/>
        <text x="0" y="-85" font-family="'Times New Roman', serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">3K CARBON</text>
        <text x="0" y="-65" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">FEATHERWEIGHT</text>
        <text x="0" y="140" font-family="Impact, sans-serif" font-size="38" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">35g</text>
        <path d="M-60,-220 C-30,-240 30,-240 60,-220" fill="none" stroke="#e11d48" stroke-width="4"/>
      </g>
    </g>
  `),

  'classic-ankle-shield-guard.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Hard White Shell Plate -->
      <path d="M-70,-220 C-40,-240 40,-240 70,-220 C90,-100 80,60 50,110 C20,130 -20,130 -50,110 C-80,60 -90,-100 -70,-220 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Ventilation slits -->
      <rect x="-40" y="-160" width="80" height="8" rx="4" fill="#0f172a"/>
      <rect x="-35" y="-120" width="70" height="8" rx="4" fill="#0f172a"/>
      <rect x="-30" y="-80" width="60" height="8" rx="4" fill="#0f172a"/>
      
      <!-- Attached Elastic Stirrup Ankle Sock with Protective Discs -->
      <path d="M-45,100 L45,100 L55,230 L-55,230 Z" fill="#1e293b"/>
      <!-- Circular Padded Malleolus Discs (Ankle bones) -->
      <circle cx="-50" cy="180" r="22" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5"/>
      <circle cx="50" cy="180" r="22" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5"/>
      <!-- Underfoot elastic stirrup strap -->
      <rect x="-40" y="225" width="80" height="15" fill="#f8fafc"/>

      <!-- Diamond Brand Emblem -->
      <polygon points="0,-40 25,-15 0,10 -25,-15" fill="none" stroke="#0f172a" stroke-width="4"/>
      <polygon points="0,-30 15,-15 0,0 -15,-15" fill="#0f172a"/>
      <text x="0" y="50" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="2">ANKLE GUARD</text>
    </g>
  `),

  'micro-pro-shin-pads.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Tiny 10cm Minimalist Pads -->
      <g transform="translate(-60, 0) rotate(-8)">
        <path d="M-45,-120 C-20,-135 20,-135 45,-120 C60,-50 50,70 30,120 C10,135 -10,135 -30,120 C-50,70 -60,-50 -45,-120 Z" fill="#18181b" stroke="#71717a" stroke-width="2"/>
        <text x="0" y="-20" font-family="Impact, sans-serif" font-size="32" fill="#f8fafc" text-anchor="middle">10cm</text>
        <text x="0" y="10" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">MICRO-PRO</text>
        <line x1="-25" y1="50" x2="25" y2="50" stroke="url(#goldGrad)" stroke-width="2"/>
      </g>
      <g transform="translate(60, 0) rotate(8)">
        <path d="M-45,-120 C-20,-135 20,-135 45,-120 C60,-50 50,70 30,120 C10,135 -10,135 -30,120 C-50,70 -60,-50 -45,-120 Z" fill="#18181b" stroke="#71717a" stroke-width="2"/>
        <text x="0" y="-20" font-family="Impact, sans-serif" font-size="32" fill="#f8fafc" text-anchor="middle">10cm</text>
        <text x="0" y="10" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">MICRO-PRO</text>
        <line x1="-25" y1="50" x2="25" y2="50" stroke="url(#goldGrad)" stroke-width="2"/>
      </g>
    </g>
  `),

  'zinc-oxide-sock-tape.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- 3 Stacked Rolls of Heavy Duty Tape -->
      <!-- Bottom Roll (White) -->
      <g transform="translate(0, 90)">
        <ellipse cx="0" cy="0" rx="140" ry="45" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-140,0 L-140,40 C-140,65 140,65 140,40 L140,0 Z" fill="#cbd5e1"/>
        <ellipse cx="0" cy="40" rx="140" ry="45" fill="#f8fafc"/>
        <ellipse cx="0" cy="0" rx="60" ry="20" fill="#94a3b8"/>
        <ellipse cx="0" cy="0" rx="45" ry="15" fill="#1e293b"/>
      </g>
      <!-- Middle Roll (Black) -->
      <g transform="translate(0, 10)">
        <ellipse cx="0" cy="0" rx="140" ry="45" fill="#27272a" stroke="#3f3f46" stroke-width="2"/>
        <path d="M-140,0 L-140,40 C-140,65 140,65 140,40 L140,0 Z" fill="#18181b"/>
        <ellipse cx="0" cy="40" rx="140" ry="45" fill="#27272a"/>
        <ellipse cx="0" cy="0" rx="60" ry="20" fill="#52525b"/>
        <ellipse cx="0" cy="0" rx="45" ry="15" fill="#09090b"/>
      </g>
      <!-- Top Roll (White) -->
      <g transform="translate(0, -70)">
        <ellipse cx="0" cy="0" rx="140" ry="45" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M-140,0 L-140,40 C-140,65 140,65 140,40 L140,0 Z" fill="#cbd5e1"/>
        <ellipse cx="0" cy="40" rx="140" ry="45" fill="#f8fafc"/>
        <ellipse cx="0" cy="0" rx="60" ry="20" fill="#94a3b8"/>
        <ellipse cx="0" cy="0" rx="45" ry="15" fill="#1e293b"/>
        <!-- Serrated Tear Edge -->
        <path d="M120,-10 L150,-5 L145,5 L115,0 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
      </g>
      <text x="0" y="165" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="3">ZINC OXIDE MATCH TAPE (3-PACK)</text>
    </g>
  `),

  // ==========================================
  // GOALKEEPER GLOVES
  // ==========================================
  'reusch-arrow-gloves.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Left Glove (Palm view - Pure 4mm White Latex) -->
      <g transform="translate(-110, 0)">
        <path d="M-80,-60 C-95,-160 -65,-220 -40,-220 C-25,-220 -25,-160 -20,-120 C-15,-180 5,-235 25,-235 C40,-235 40,-170 42,-120 C50,-180 70,-225 85,-225 C100,-225 100,-160 92,-110 C105,-150 120,-180 135,-175 C145,-170 145,-120 130,-70 C120,-30 115,20 110,70 L-60,70 C-75,40 -90,0 -80,-60 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Thumb -->
        <path d="M-80,-20 C-130,-40 -150,-10 -130,20 C-110,50 -80,45 -65,40 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Latex wrist bandage -->
        <rect x="-65" y="70" width="180" height="90" rx="6" fill="#1e293b" stroke="#334155" stroke-width="2"/>
        <text x="25" y="125" font-family="Impact, sans-serif" font-size="24" fill="#f8fafc" text-anchor="middle" letter-spacing="2">4mm G3 LATEX</text>
      </g>

      <!-- Right Glove (Backhand - 1986 Arrow Motif) -->
      <g transform="translate(110, 0)">
        <path d="M-92,-110 C-100,-160 -100,-225 -85,-225 C-70,-225 -50,-180 -42,-120 C-40,-170 -40,-235 -25,-235 C-5,-235 15,-180 20,-120 C25,-160 25,-220 40,-220 C65,-220 95,-160 80,-60 C90,0 75,40 60,70 L-110,70 C-115,20 -120,-30 -130,-70 C-145,-120 -145,-170 -135,-175 C-120,-180 -105,-150 -92,-110 Z" fill="#09090b" stroke="#27272a" stroke-width="2"/>
        <!-- Iconic Gold / White Arrow -->
        <polygon points="-25,40 -25,-120 25,-120 25,40 50,40 0,90 -50,40" fill="url(#goldGrad)" transform="rotate(180, 0, 0)"/>
        <text x="0" y="-140" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">REUSCH</text>
        <rect x="-115" y="70" width="180" height="90" rx="6" fill="#09090b" stroke="url(#goldGrad)" stroke-width="2"/>
        <text x="-25" y="125" font-family="'Times New Roman', serif" font-size="20" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">ARROW 1986</text>
      </g>
    </g>
  `),

  'classic-roll-finger-gloves.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Blackout Roll Finger Gloves -->
      <path d="M-90,-50 C-105,-150 -75,-210 -50,-210 C-35,-210 -35,-150 -30,-110 C-25,-170 -5,-225 15,-225 C30,-225 30,-160 32,-110 C40,-170 60,-215 75,-215 C90,-215 90,-150 82,-100 C95,-140 110,-170 125,-165 C135,-160 135,-110 120,-60 C110,-20 105,30 100,80 L-70,80 C-85,50 -100,10 -90,-50 Z" fill="#171717" stroke="#333333" stroke-width="2"/>
      <!-- Roll finger white contour rolls -->
      <g fill="#f8fafc" stroke="#e2e8f0" stroke-width="1">
        <rect x="-48" y="-190" width="16" height="70" rx="8"/>
        <rect x="-18" y="-205" width="16" height="85" rx="8"/>
        <rect x="12" y="-200" width="16" height="80" rx="8"/>
        <rect x="42" y="-175" width="16" height="65" rx="8"/>
      </g>
      <!-- Embossed Punch Zone -->
      <rect x="-50" y="-80" width="120" height="60" rx="6" fill="#262626" stroke="#404040" stroke-width="1.5"/>
      <text x="10" y="-45" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="2">PUNCH ZONE</text>
      <!-- Bandage -->
      <rect x="-75" y="80" width="180" height="90" rx="6" fill="#171717" stroke="#404040" stroke-width="2"/>
      <text x="15" y="135" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="3">ROLL FINGER PRO</text>
    </g>
  `),

  'pro-grip-aqua-gloves.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Aqua Blue All-Weather Grip Gloves -->
      <path d="M-90,-50 C-105,-150 -75,-210 -50,-210 C-35,-210 -35,-150 -30,-110 C-25,-170 -5,-225 15,-225 C30,-225 30,-160 32,-110 C40,-170 60,-215 75,-215 C90,-215 90,-150 82,-100 C95,-140 110,-170 125,-165 C135,-160 135,-110 120,-60 C110,-20 105,30 100,80 L-70,80 C-85,50 -100,10 -90,-50 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <!-- Hydro latex palm drops -->
      <circle cx="-10" cy="-60" r="12" fill="#38bdf8" opacity="0.6"/>
      <circle cx="25" cy="-40" r="8" fill="#38bdf8" opacity="0.6"/>
      <circle cx="5" cy="10" r="15" fill="#38bdf8" opacity="0.6"/>
      <!-- Bandage -->
      <rect x="-75" y="80" width="180" height="90" rx="6" fill="#0c4a6e" stroke="#38bdf8" stroke-width="2"/>
      <text x="15" y="125" font-family="Impact, sans-serif" font-size="26" fill="#f8fafc" text-anchor="middle" letter-spacing="2">AQUA-PLUS 4mm</text>
      <text x="15" y="150" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#38bdf8" text-anchor="middle" letter-spacing="1">WET WEATHER SUPREMACY</text>
    </g>
  `),

  // ==========================================
  // FOOTBALLS & EQUIPMENT
  // ==========================================
  'mitre-ultimax-football.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Spherical Match Ball Base -->
      <circle cx="0" cy="0" r="210" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <!-- 24 Panels Seam Lines -->
      <g stroke="#94a3b8" stroke-width="2" fill="none" opacity="0.7">
        <circle cx="0" cy="0" r="110"/>
        <line x1="-210" y1="0" x2="-110" y2="0"/>
        <line x1="110" y1="0" x2="210" y2="0"/>
        <line x1="0" y1="-210" x2="0" y2="-110"/>
        <line x1="0" y1="110" x2="0" y2="210"/>
        <path d="M-150,-150 Q0,-75 150,-150"/>
        <path d="M-150,150 Q0,75 150,150"/>
      </g>
      <!-- Iconic Mitre Chevrons in Gold & Blue -->
      <g transform="translate(0, 0)">
        <polygon points="-70,-60 0,-115 70,-60 40,-45 0,-80 -40,-45" fill="url(#goldGrad)"/>
        <polygon points="-70,60 0,115 70,60 40,45 0,80 -40,45" fill="#1e3a8a"/>
      </g>
      <!-- Mitre Logo -->
      <text x="0" y="-10" font-family="'Impact', Arial, sans-serif" font-size="44" font-style="italic" fill="#0f172a" text-anchor="middle" letter-spacing="4">mitre</text>
      <text x="0" y="24" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="6">ULTIMAX</text>
      <text x="0" y="42" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#64748b" text-anchor="middle" letter-spacing="2">FIFA APPROVED MATCH BALL</text>
    </g>
  `),

  'agility-cones-10pack.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Stack of 10 Saucer Agility Cones -->
      <g transform="translate(0, 50)">
        <!-- Bottom Cones (Alternating Burgundy & Cream) -->
        <ellipse cx="0" cy="80" rx="190" ry="38" fill="#881337"/>
        <ellipse cx="0" cy="65" rx="185" ry="37" fill="#fef08a"/>
        <ellipse cx="0" cy="50" rx="180" ry="36" fill="#881337"/>
        <ellipse cx="0" cy="35" rx="175" ry="35" fill="#fef08a"/>
        <ellipse cx="0" cy="20" rx="170" ry="34" fill="#881337"/>
        <ellipse cx="0" cy="5" rx="165" ry="33" fill="#fef08a"/>
        <ellipse cx="0" cy="-10" rx="160" ry="32" fill="#881337"/>
        <ellipse cx="0" cy="-25" rx="155" ry="31" fill="#fef08a"/>
        <ellipse cx="0" cy="-40" rx="150" ry="30" fill="#881337"/>
        <!-- Top Saucer Cone -->
        <ellipse cx="0" cy="-55" rx="145" ry="29" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <ellipse cx="0" cy="-55" rx="40" ry="12" fill="#713f12"/>
      </g>
      <!-- Central Carrying Rod & Heavy Strap -->
      <rect x="-8" y="-170" width="16" height="230" rx="6" fill="url(#brassGrad)"/>
      <ellipse cx="0" cy="-170" rx="20" ry="8" fill="url(#brassGrad)"/>
      <text x="0" y="195" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="3">10-PACK AGILITY CONES</text>
    </g>
  `),

  // ==========================================
  // BAGS & LUGGAGE
  // ==========================================
  'heritage-canvas-boot-bag.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- 16oz Waxed Canvas Olive Bag Body -->
      <path d="M-150,160 L150,160 L130,-120 L-130,-120 Z" fill="#365314" stroke="#4d7c0f" stroke-width="2"/>
      <!-- Tan Full-Grain Leather Top Flap & Handle -->
      <path d="M-135,-120 L135,-120 L125,-60 L-125,-60 Z" fill="#78350f" stroke="#92400e" stroke-width="2"/>
      <!-- Brass Zipper & Dual Pulls -->
      <line x1="-125" y1="-60" x2="125" y2="-60" stroke="url(#brassGrad)" stroke-width="5"/>
      <circle cx="-20" cy="-60" r="7" fill="url(#brassGrad)"/>
      <circle cx="20" cy="-60" r="7" fill="url(#brassGrad)"/>

      <!-- Leather Carry Handle Arc -->
      <path d="M-60,-120 C-60,-220 60,-220 60,-120" fill="none" stroke="#78350f" stroke-width="18" stroke-linecap="round"/>
      <path d="M-60,-120 C-60,-220 60,-220 60,-120" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="6,6"/>

      <!-- Antiqued Brass Ventilation Eyelets -->
      <circle cx="-80" cy="110" r="10" fill="#14532d" stroke="url(#brassGrad)" stroke-width="3"/>
      <circle cx="80" cy="110" r="10" fill="#14532d" stroke="url(#brassGrad)" stroke-width="3"/>

      <!-- Debossed Leather Heritage Patch -->
      <rect x="-65" y="0" width="130" height="70" rx="6" fill="#78350f" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text x="0" y="26" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">RETRO ATELIER</text>
      <text x="0" y="44" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#fef3c7" text-anchor="middle" letter-spacing="1">WAXED CANVAS 16oz</text>
    </g>
  `),

  'retro-barrel-holdall.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Cylinder Barrel Body (Horizontal Duffel) -->
      <rect x="-180" y="-100" width="360" height="200" rx="35" fill="#18181b" stroke="#27272a" stroke-width="2"/>
      <!-- Off-White Piping Ribbons -->
      <line x1="-100" y1="-100" x2="-100" y2="100" stroke="#f8fafc" stroke-width="8"/>
      <line x1="100" y1="-100" x2="100" y2="100" stroke="#f8fafc" stroke-width="8"/>

      <!-- Heavy Duty Dual Leather Handles -->
      <path d="M-60,-100 C-60,-180 60,-180 60,-100" fill="none" stroke="#f8fafc" stroke-width="12" stroke-linecap="round"/>
      <rect x="-25" y="-160" width="50" height="24" rx="4" fill="#09090b" stroke="#f8fafc" stroke-width="2"/>

      <!-- Isolated Boot Tunnel Zipper Pocket on Side -->
      <ellipse cx="-165" cy="0" rx="15" ry="60" fill="#27272a" stroke="#cbd5e1" stroke-width="2"/>
      <text x="-165" y="80" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#94a3b8" text-anchor="middle">BOOT TUNNEL</text>

      <!-- Center Heritage Typography -->
      <text x="0" y="-5" font-family="'Impact', Arial, sans-serif" font-size="34" fill="#f8fafc" text-anchor="middle" letter-spacing="4">MATCHDAY 45L</text>
      <text x="0" y="25" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">ESTABLISHED 1982</text>
    </g>
  `),

  // ==========================================
  // ACCESSORIES & CARE
  // ==========================================
  'boot-care-dubbin-kit.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Golden Dubbin Metal Tin (Round) -->
      <g transform="translate(-80, 20)">
        <ellipse cx="0" cy="0" rx="110" ry="55" fill="url(#goldGrad)" stroke="#aa820a" stroke-width="2.5"/>
        <ellipse cx="0" cy="-10" rx="100" ry="48" fill="#d4af37"/>
        <text x="0" y="-15" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" fill="#09090b" text-anchor="middle" letter-spacing="2">PURE BEESWAX</text>
        <text x="0" y="8" font-family="Impact, sans-serif" font-size="28" fill="#09090b" text-anchor="middle" letter-spacing="4">DUBBIN</text>
        <text x="0" y="24" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#333333" text-anchor="middle">LEATHER PRESERVER</text>
      </g>

      <!-- 100% Horsehair Wooden Brush -->
      <g transform="translate(90, -40) rotate(-18)">
        <!-- Wood Handle -->
        <rect x="-90" y="-30" width="180" height="40" rx="10" fill="#78350f" stroke="#92400e" stroke-width="2"/>
        <!-- Horsehair Bristles -->
        <rect x="-85" y="10" width="170" height="40" fill="#1c1917" stroke="#292524" stroke-width="1"/>
        <text x="0" y="-6" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">HORSEHAIR BRUSH</text>
      </g>

      <!-- Steel 6-Stud Key Wrench -->
      <g transform="translate(40, 100) rotate(40)">
        <polygon points="-12,-40 12,-40 6,40 -6,40" fill="url(#silverGrad)"/>
        <circle cx="0" cy="-40" r="16" fill="url(#silverGrad)" stroke="#475569" stroke-width="2"/>
        <circle cx="0" cy="-40" r="6" fill="#09090b"/>
      </g>
    </g>
  `),

  'captain-armband.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Deep Burgundy Leatherette Armband -->
      <rect x="-170" y="-85" width="340" height="170" rx="12" fill="#721c32" stroke="#500724" stroke-width="3"/>
      <!-- Stitched Gold Border Lines -->
      <rect x="-160" y="-75" width="320" height="150" rx="8" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-dasharray="6,4"/>
      
      <!-- Massive Embossed Gold "C" Leader's Insignia -->
      <text x="0" y="42" font-family="'Times New Roman', Georgia, serif" font-size="130" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">C</text>
      
      <!-- Velcro Fastener Elastic End -->
      <rect x="140" y="-85" width="30" height="170" fill="#4c0519" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text x="0" y="70" font-family="Arial, sans-serif" font-size="10" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="4">MATCHDAY CAPTAIN</text>
    </g>
  `),

  'metal-ball-pump.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Brushed Aluminium Cylinder Barrel -->
      <g transform="translate(0, 0) rotate(-35)">
        <rect x="-22" y="-160" width="44" height="280" rx="6" fill="url(#silverGrad)" stroke="#475569" stroke-width="2"/>
        <!-- Handle Grip Top -->
        <path d="M-60,-190 L60,-190 L50,-160 L-50,-160 Z" fill="#0f172a" stroke="#334155" stroke-width="2"/>
        <rect x="-8" y="-160" width="16" height="40" fill="url(#silverGrad)"/>
        <!-- Base nozzle -->
        <rect x="-10" y="120" width="20" height="25" fill="#0f172a"/>
        <!-- Flexible Braided Hose -->
        <path d="M0,145 C0,200 80,220 120,180" fill="none" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
        <!-- Steel Inflation Needle -->
        <line x1="120" y1="180" x2="160" y2="160" stroke="url(#silverGrad)" stroke-width="3.5" stroke-linecap="round"/>
      </g>
      <text x="0" y="190" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="3">DUAL-ACTION BALL PUMP</text>
    </g>
  `)
};

// Write all product SVGs
for (const [filename, content] of Object.entries(productSvgs)) {
  fs.writeFileSync(path.join(prodDir, filename), content, 'utf8');
}
console.log(`✓ Successfully generated ${Object.keys(productSvgs).length} ultra-detailed product SVGs.`);

// ==========================================
// CATEGORY HERO SVGS
// ==========================================
const categorySvgs = {
  'cat-retro-jerseys.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Display Rack of Retro Jerseys -->
      <!-- France Blue (Back) -->
      <path d="M-150,-160 L-100,-200 L-50,-170 L50,-170 L100,-200 L150,-160 L125,-100 L105,-110 L115,160 L-115,160 L-105,-110 L-125,-100 Z" fill="#1d4ed8" opacity="0.6"/>
      <!-- West Germany White (Mid) -->
      <path d="M-130,-180 L-80,-220 L-40,-190 L40,-190 L80,-220 L130,-180 L110,-120 L90,-130 L100,180 L-100,180 L-90,-130 L-110,-120 Z" fill="#f8fafc" opacity="0.8"/>
      <!-- AC Milan / Arsenal Gold Front -->
      <path d="M-110,-200 L-65,-240 L-35,-210 L35,-210 L65,-240 L110,-200 L95,-140 L75,-150 L85,200 L-85,200 L-75,-150 L-95,-140 Z" fill="#b91c1c" stroke="#111111" stroke-width="2"/>
      <rect x="-35" y="-210" width="70" height="410" fill="#111111"/>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">RETRO JERSEYS</text>
    </g>
  `),

  'cat-football-boots.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <!-- Classic Leather Boot Silhouette on Podium -->
      <path d="M-190,90 C-210,40 -180,-10 -120,-30 C-60,-45 -5,-65 75,-55 C145,-45 210,-10 250,50 C270,80 245,105 205,110 C125,120 -95,122 -175,115 Z" fill="#111111" stroke="#333333" stroke-width="2"/>
      <g fill="#f8fafc" transform="translate(20, 15) rotate(-22)">
        <polygon points="-40,-50 -24,-50 16,50 0,50"/>
        <polygon points="-16,-50 0,-50 40,50 24,50"/>
        <polygon points="8,-50 24,-50 64,50 48,50"/>
      </g>
      <!-- Studs -->
      <g fill="url(#goldGrad)">
        <circle cx="-140" cy="135" r="8"/>
        <circle cx="-100" cy="135" r="8"/>
        <circle cx="50" cy="135" r="8"/>
        <circle cx="90" cy="135" r="8"/>
        <circle cx="130" cy="135" r="8"/>
        <circle cx="170" cy="135" r="8"/>
      </g>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">FOOTBALL BOOTS</text>
    </g>
  `),

  'cat-socks-grip.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <path d="M-40,-180 L40,-180 L40,80 C40,130 90,150 115,190 C125,210 100,225 70,225 C15,225 -40,160 -40,110 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <g fill="#0284c7" transform="translate(30, 145) scale(0.8)">
        <polygon points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5"/>
        <polygon points="22,-10 31,-5 31,5 22,10 13,5 13,-5"/>
        <polygon points="44,-10 53,-5 53,5 44,10 35,5 35,-5"/>
        <polygon points="11,8 20,13 20,23 11,28 2,23 2,13"/>
        <polygon points="33,8 42,13 42,23 33,28 24,23 24,13"/>
      </g>
      <text x="0" y="250" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">SOCKS &amp; GRIP</text>
    </g>
  `),

  'cat-shin-guards.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <path d="M-60,-180 C-30,-200 30,-200 60,-180 C80,-80 70,120 40,190 C20,210 -20,210 -40,190 C-70,120 -80,-80 -60,-180 Z" fill="url(#carbonPattern)" stroke="url(#goldGrad)" stroke-width="2.5"/>
      <polygon points="0,-110 4,-100 14,-100 6,-92 10,-82 0,-88 -10,-82 -6,-92 -14,-100 -4,-100" fill="url(#goldGrad)"/>
      <text x="0" y="-45" font-family="'Times New Roman', serif" font-size="22" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">3K CARBON</text>
      <text x="0" y="245" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">SHIN GUARDS</text>
    </g>
  `),

  'cat-goalkeeper-gloves.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <path d="M-75,-40 C-85,-120 -60,-170 -40,-170 C-25,-170 -25,-120 -20,-90 C-15,-140 5,-185 25,-185 C40,-185 40,-130 42,-90 C50,-140 70,-175 85,-175 C100,-175 100,-120 92,-80 C105,-110 120,-135 135,-130 C145,-125 145,-85 130,-45 C120,-10 115,30 110,70 L-50,70 C-65,40 -80,10 -75,-40 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="-55" y="70" width="165" height="70" rx="6" fill="#0f172a"/>
      <text x="25" y="115" font-family="Impact, sans-serif" font-size="20" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">PRO 4mm LATEX</text>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">GOALKEEPER GLOVES</text>
    </g>
  `),

  'cat-footballs-training.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <circle cx="0" cy="-20" r="160" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Stitched Pentagons -->
      <polygon points="0,-70 38,-42 24,4 0,4 -24,4 -38,-42" fill="#111111"/>
      <polygon points="90,-100 120,-60 110,-20 70,-40" fill="#111111"/>
      <polygon points="-90,-100 -120,-60 -110,-20 -70,-40" fill="#111111"/>
      <polygon points="60,60 90,100 50,120 30,80" fill="#111111"/>
      <polygon points="-60,60 -90,100 -50,120 -30,80" fill="#111111"/>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">FOOTBALLS &amp; TRAINING</text>
    </g>
  `),

  'cat-bags-luggage.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <rect x="-140" y="-80" width="280" height="170" rx="25" fill="#365314" stroke="#4d7c0f" stroke-width="2"/>
      <path d="M-50,-80 C-50,-150 50,-150 50,-80" fill="none" stroke="#78350f" stroke-width="14" stroke-linecap="round"/>
      <rect x="-50" y="-10" width="100" height="50" rx="4" fill="#78350f" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text x="0" y="20" font-family="'Times New Roman', serif" font-size="12" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">RETRO BAGS</text>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">BAGS &amp; LUGGAGE</text>
    </g>
  `),

  'cat-accessories-care.svg': wrapSvg(`
    <g filter="url(#heavyShadow)" transform="translate(400, 390)">
      <ellipse cx="-40" cy="10" rx="80" ry="40" fill="url(#goldGrad)" stroke="#aa820a" stroke-width="2"/>
      <text x="-40" y="16" font-family="Impact, sans-serif" font-size="20" fill="#09090b" text-anchor="middle">DUBBIN</text>
      <!-- Captain Armband -->
      <rect x="30" y="-80" width="110" height="90" rx="8" fill="#721c32" stroke="url(#goldGrad)" stroke-width="2"/>
      <text x="85" y="-15" font-family="'Times New Roman', serif" font-size="65" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">C</text>
      <text x="0" y="240" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">ACCESSORIES &amp; CARE</text>
    </g>
  `)
};

for (const [filename, content] of Object.entries(categorySvgs)) {
  fs.writeFileSync(path.join(catDir, filename), content, 'utf8');
}
console.log(`✓ Successfully generated ${Object.keys(categorySvgs).length} category hero SVGs.`);
