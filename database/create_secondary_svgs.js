// database/create_secondary_svgs.js
const fs = require('fs');
const path = require('path');

const prodDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'products');
if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });

const commonDefs = `
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#2a2e39"/>
      <stop offset="55%" stop-color="#14161d"/>
      <stop offset="100%" stop-color="#0a0b0e"/>
    </radialGradient>
    <radialGradient id="detailGlow" cx="50%" cy="50%" r="50%">
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
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.75"/>
    </filter>
  </defs>
`;

function wrapDetailSvg(title, subtitle, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  ${commonDefs}
  <rect width="800" height="800" fill="url(#bgGlow)"/>
  <ellipse cx="400" cy="710" rx="300" ry="40" fill="url(#detailGlow)"/>
  
  <!-- Subtle Technical Grid Overlay -->
  <g stroke="#ffffff" stroke-width="0.5" opacity="0.05">
    <line x1="100" y1="0" x2="100" y2="800"/>
    <line x1="400" y1="0" x2="400" y2="800"/>
    <line x1="700" y1="0" x2="700" y2="800"/>
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="0" y1="700" x2="800" y2="700"/>
  </g>

  <!-- Product Main Detail Visual -->
  ${body}

  <!-- Technical Spec Watermark Header -->
  <g transform="translate(400, 750)">
    <rect x="-180" y="-35" width="360" height="30" rx="15" fill="#18181b" stroke="#3f3f46" stroke-width="1.5" opacity="0.85"/>
    <text x="0" y="-15" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">${title.toUpperCase()}</text>
  </g>
</svg>`;
}

// Generate secondary view for boots (Soleplate & Stud Architecture)
function bootSoleSvg(title, specText, studType) {
  let studs = '';
  if (studType === 'SG') {
    studs = `
      <g fill="url(#silverGrad)" stroke="#334155" stroke-width="2">
        <circle cx="-60" cy="-190" r="14"/>
        <circle cx="60" cy="-190" r="14"/>
        <circle cx="-65" cy="-110" r="14"/>
        <circle cx="65" cy="-110" r="14"/>
        <circle cx="-55" cy="140" r="16"/>
        <circle cx="55" cy="140" r="16"/>
      </g>
    `;
  } else if (studType === 'IC') {
    studs = `
      <g fill="#b07525" opacity="0.9">
        <circle cx="0" cy="-120" r="45" fill="none" stroke="#b07525" stroke-width="5"/>
        <circle cx="0" cy="-120" r="25" fill="none" stroke="#b07525" stroke-width="4"/>
        <circle cx="0" cy="140" r="35" fill="none" stroke="#b07525" stroke-width="4"/>
        <!-- Herringbone lines -->
        <g stroke="#966723" stroke-width="3">
          <line x1="-50" y1="-50" x2="0" y2="-20"/><line x1="0" y1="-20" x2="50" y2="-50"/>
          <line x1="-50" y1="-20" x2="0" y2="10"/><line x1="0" y1="10" x2="50" y2="-20"/>
          <line x1="-50" y1="10" x2="0" y2="40"/><line x1="0" y1="40" x2="50" y2="10"/>
          <line x1="-50" y1="40" x2="0" y2="70"/><line x1="0" y1="70" x2="50" y2="40"/>
        </g>
      </g>
    `;
  } else if (studType === 'TF') {
    studs = `
      <g fill="#111111" stroke="#ffffff" stroke-width="0.5">
        ${Array.from({length: 45}).map((_, i) => {
          const x = -60 + (i % 5) * 30;
          const y = -210 + Math.floor(i / 5) * 45;
          return `<circle cx="${x}" cy="${y}" r="6"/>`;
        }).join('')}
      </g>
    `;
  } else {
    // Standard FG / AG
    studs = `
      <g fill="url(#goldGrad)" stroke="#111111" stroke-width="2">
        <ellipse cx="-60" cy="-200" rx="12" ry="10"/>
        <ellipse cx="60" cy="-200" rx="12" ry="10"/>
        <ellipse cx="-65" cy="-140" rx="12" ry="10"/>
        <ellipse cx="65" cy="-140" rx="12" ry="10"/>
        <ellipse cx="-70" cy="-80" rx="12" ry="10"/>
        <ellipse cx="70" cy="-80" rx="12" ry="10"/>
        <circle cx="0" cy="-40" r="9"/>
        <ellipse cx="-55" cy="130" rx="14" ry="12"/>
        <ellipse cx="55" cy="130" rx="14" ry="12"/>
        <ellipse cx="-55" cy="190" rx="14" ry="12"/>
        <ellipse cx="55" cy="190" rx="14" ry="12"/>
      </g>
    `;
  }

  const soleBg = studType === 'IC' ? '#d99b43' : '#141416';
  const soleStroke = studType === 'IC' ? '#b07525' : '#334155';

  return wrapDetailSvg(
    `${title} — SOLE ARCHITECTURE`,
    specText,
    `<g filter="url(#softShadow)" transform="translate(400, 380)">
      <!-- Outsole Anatomical Footprint -->
      <path d="M-80,-240 C-30,-265 30,-265 80,-240 C110,-150 100,-30 50,40 C45,70 50,110 70,160 C80,210 50,255 0,255 C-50,255 -80,210 -70,160 C-50,110 -45,70 -50,40 C-100,-30 -110,-150 -80,-240 Z" fill="${soleBg}" stroke="${soleStroke}" stroke-width="3"/>
      
      <!-- Torsion / Bridge Bar in Middle -->
      <path d="M-40,20 L40,20 L30,80 L-30,80 Z" fill="#27272a" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text x="0" y="55" font-family="'Helvetica Neue', Arial, sans-serif" font-size="9" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">TORSION</text>

      ${studs}
    </g>`
  );
}

// Generate secondary view for Jerseys (Close-up Woven Crest & Fabric Jacquard Angle)
function jerseyDetailSvg(title, clubName, crestSvg) {
  return wrapDetailSvg(
    `${title} — CREST & WEAVE DETAIL`,
    'High-Density Embroidered Crest & Breathable Jacquard Weave',
    `<g filter="url(#softShadow)" transform="translate(400, 380)">
      <!-- Fabric Backdrop Panel (Macro View) -->
      <rect x="-240" y="-220" width="480" height="440" rx="16" fill="#18181b" stroke="#334155" stroke-width="2"/>
      
      <!-- Micro Jacquard Weave Texture -->
      <g stroke="#ffffff" stroke-width="0.8" opacity="0.12">
        ${Array.from({length: 22}).map((_, i) => `<line x1="-240" y1="${-220 + i * 20}" x2="240" y2="${-220 + i * 20}"/>`).join('')}
        ${Array.from({length: 24}).map((_, i) => `<line x1="${-240 + i * 20}" y1="-220" x2="${-240 + i * 20}" y2="220"/>`).join('')}
      </g>

      <!-- Center Magnified Crest Badge with Gold Stitched Edge -->
      <g transform="scale(2)">
        ${crestSvg}
      </g>

      <!-- Authenticity Hologram Label at Bottom Right -->
      <g transform="translate(140, 150)">
        <rect x="-60" y="-25" width="120" height="50" rx="4" fill="url(#silverGrad)" stroke="#ffffff" stroke-width="1"/>
        <text x="0" y="-8" font-family="Arial, sans-serif" font-size="7" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">OFFICIAL LICENSED</text>
        <text x="0" y="6" font-family="Impact, sans-serif" font-size="12" fill="#0f172a" text-anchor="middle" letter-spacing="2">RETRO ARCHIVE</text>
        <text x="0" y="18" font-family="Arial, sans-serif" font-size="6" fill="#334155" text-anchor="middle">★ GENUINE REPRODUCTION ★</text>
      </g>
    </g>`
  );
}

// Specific secondary image mappings for all products
const secondarySvgs = {
  // BOOT SOLES
  'copa-mundial-sole.svg': bootSoleSvg('Copa Mundial', 'Direct-injected 12 Round Conical FG Studs', 'FG'),
  'puma-king-sole.svg': bootSoleSvg('Puma King', 'Rotational Conical 360 Traction Outsole', 'FG'),
  'total-90-sole.svg': bootSoleSvg('Total 90 Laser', 'Zoom Air High-Precision FG Firm Ground', 'FG'),
  'predator-mania-sole.svg': bootSoleSvg('Predator Mania', 'Split-Frame Revolutionary 2002 Soleplate', 'FG'),
  'speciali-pro-sole.svg': bootSoleSvg('Umbro Speciali', '6-Stud Detachable Metal Screw-in Tips', 'SG'),
  'tiempo-premier-sole.svg': bootSoleSvg('Tiempo Premier', 'Dual-Density Hollow Conical AG Plate', 'AG'),
  'morelia-classic-sole.svg': bootSoleSvg('Mizuno Morelia', 'Graded Nylon 13 Molded Round Studs', 'FG'),
  'mundial-team-sole.svg': bootSoleSvg('Mundial Team', 'Multi-Cleated Rubber TF Turf Surface', 'TF'),
  'samba-classic-sole.svg': bootSoleSvg('Samba Classic', 'Non-Marking Gum IC Court Herringbone', 'IC'),
  'gato-vintage-sole.svg': bootSoleSvg('Nike Gato', 'Cushlon Low-Profile Court Rubber', 'IC'),

  // JERSEY FABRIC & CREST DETAILS
  'france-1998-detail.svg': jerseyDetailSvg('1998 France Home', 'FFF', `
    <circle cx="0" cy="0" r="40" fill="#1e3a8a" stroke="url(#goldGrad)" stroke-width="2"/>
    <text x="0" y="-12" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">FFF</text>
    <polygon points="0,-32 2,-26 8,-26 3,-22 5,-16 0,-20 -5,-16 -3,-22 -8,-26 -2,-26" fill="url(#goldGrad)"/>
    <path d="M-10,15 Q0,-8 10,15" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
    <text x="0" y="24" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="#ffffff" text-anchor="middle">FRANCE 98</text>
  `),
  'germany-1990-detail.svg': jerseyDetailSvg('1990 West Germany', 'DFB', `
    <circle cx="0" cy="0" r="40" fill="#ffffff" stroke="#111111" stroke-width="2"/>
    <text x="0" y="-14" font-family="'Helvetica Neue', Arial, sans-serif" font-size="8" font-weight="900" fill="#111111" text-anchor="middle">DEUTSCHER</text>
    <text x="0" y="-4" font-family="'Helvetica Neue', Arial, sans-serif" font-size="8" font-weight="900" fill="#111111" text-anchor="middle">FUSSBALL-BUND</text>
    <polygon points="-12,-26 -10,-20 -4,-20 -8,-17 -6,-12 -12,-15 -18,-12 -16,-17 -20,-20 -14,-20" fill="url(#goldGrad)"/>
    <polygon points="0,-28 2,-22 8,-22 4,-19 6,-14 0,-17 -6,-14 -4,-19 -8,-22 -2,-22" fill="url(#goldGrad)"/>
    <polygon points="12,-26 14,-20 20,-20 16,-17 18,-12 12,-15 6,-12 8,-17 4,-20 10,-20" fill="url(#goldGrad)"/>
    <path d="M-15,12 Q0,2 15,12" fill="none" stroke="#111111" stroke-width="3"/>
  `),
  'brazil-1994-detail.svg': jerseyDetailSvg('1994 Brazil Home', 'CBF', `
    <path d="M-28,-36 L28,-36 L28,12 C28,32 0,44 0,44 C0,44 -28,32 -28,12 Z" fill="#047857" stroke="#facc15" stroke-width="2.5"/>
    <text x="0" y="2" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">CBF</text>
    <circle cx="-16" cy="-42" r="3" fill="#facc15"/><circle cx="-5" cy="-45" r="3" fill="#facc15"/>
    <circle cx="5" cy="-45" r="3" fill="#facc15"/><circle cx="16" cy="-42" r="3" fill="#facc15"/>
  `),
  'arsenal-1998-detail.svg': jerseyDetailSvg('1998 Arsenal Away', 'ARSENAL', `
    <rect x="-30" y="-36" width="60" height="72" rx="6" fill="#1e293b" stroke="url(#goldGrad)" stroke-width="2"/>
    <text x="0" y="-15" font-family="'Times New Roman', serif" font-size="10" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">ARSENAL</text>
    <!-- Cannon silhouette -->
    <rect x="-18" y="0" width="36" height="8" rx="2" fill="url(#goldGrad)"/>
    <circle cx="6" cy="14" r="8" fill="url(#goldGrad)"/>
  `),
  'man-utd-1992-detail.svg': jerseyDetailSvg('1992 Man United Away', 'NEWTON HEATH', `
    <circle cx="0" cy="0" r="38" fill="#15803d" stroke="url(#goldGrad)" stroke-width="2"/>
    <text x="0" y="-12" font-family="'Times New Roman', serif" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">NEWTON HEATH</text>
    <!-- Train Engine symbol -->
    <rect x="-16" y="-2" width="32" height="14" fill="url(#goldGrad)"/>
    <circle cx="-10" cy="16" r="4" fill="url(#goldGrad)"/>
    <circle cx="0" cy="16" r="4" fill="url(#goldGrad)"/>
    <circle cx="10" cy="16" r="4" fill="url(#goldGrad)"/>
    <text x="0" y="28" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">1878 - 1992</text>
  `),
  'ac-milan-1998-detail.svg': jerseyDetailSvg('1998 AC Milan Home', 'AC MILAN', `
    <ellipse cx="0" cy="0" rx="30" ry="38" fill="#ffffff" stroke="url(#goldGrad)" stroke-width="2"/>
    <line x1="-30" y1="0" x2="30" y2="0" stroke="#b91c1c" stroke-width="8"/>
    <line x1="0" y1="-38" x2="0" y2="38" stroke="#b91c1c" stroke-width="8"/>
    <text x="0" y="-44" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">1899 - 1999</text>
  `),
  'england-1996-detail.svg': jerseyDetailSvg('1996 England Home', 'THREE LIONS', `
    <path d="M-28,-36 L28,-36 L28,10 C28,30 0,44 0,44 C0,44 -28,30 -28,10 Z" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <text x="0" y="-16" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#1e293b" text-anchor="middle">ENGLAND</text>
    <path d="M-15,-6 Q0,-10 15,-6" fill="none" stroke="#1e3a8a" stroke-width="4"/>
    <path d="M-15,6 Q0,2 15,6" fill="none" stroke="#1e3a8a" stroke-width="4"/>
    <path d="M-15,18 Q0,14 15,18" fill="none" stroke="#1e3a8a" stroke-width="4"/>
  `),
  'inter-milan-1997-detail.svg': jerseyDetailSvg('1997 Inter Milan Third', 'FC INTERNAZIONALE', `
    <circle cx="0" cy="0" r="38" fill="#1d4ed8" stroke="url(#goldGrad)" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="32" fill="#171717"/>
    <text x="0" y="8" font-family="'Times New Roman', serif" font-size="24" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">FCIM</text>
    <polygon points="0,-48 3,-40 10,-40 5,-35 7,-28 0,-32 -7,-28 -5,-35 -10,-40 -3,-40" fill="url(#goldGrad)"/>
  `),
  'argentina-1986-detail.svg': jerseyDetailSvg('1986 Argentina Away', 'AFA MARADONA', `
    <path d="M-26,-32 L26,-32 L26,10 C26,26 0,38 0,38 C0,38 -26,26 -26,10 Z" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
    <text x="0" y="4" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">AFA</text>
    <circle cx="-10" cy="-38" r="3" fill="url(#goldGrad)"/><circle cx="10" cy="-38" r="3" fill="url(#goldGrad)"/>
  `),
  'newcastle-1996-detail.svg': jerseyDetailSvg('1996 Newcastle Home', 'NEWCASTLE UNITED', `
    <circle cx="0" cy="0" r="38" fill="#0284c7" stroke="#facc15" stroke-width="3"/>
    <polygon points="0,-32 9,-9 32,-9 14,5 20,28 0,14 -20,28 -14,5 -32,-9 -9,-9" fill="#facc15"/>
    <circle cx="0" cy="0" r="12" fill="#ffffff"/>
  `),
  'ajax-1998-detail.svg': jerseyDetailSvg('1998 Ajax Home', 'AFC AJAX', `
    <circle cx="0" cy="0" r="38" fill="#ffffff" stroke="#dc2626" stroke-width="2.5"/>
    <path d="M-12,-15 Q-2,-24 10,-12 Q14,-4 10,12 Q-2,20 -12,8 Z" fill="none" stroke="#dc2626" stroke-width="2.5"/>
    <text x="0" y="24" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#dc2626" text-anchor="middle">AJAX</text>
  `),
  'italy-1994-detail.svg': jerseyDetailSvg('1994 Italy Home', 'FIGC ITALIA', `
    <circle cx="0" cy="0" r="36" fill="#0369a1" stroke="url(#goldGrad)" stroke-width="2"/>
    <rect x="-18" y="-10" width="12" height="24" fill="#16a34a"/>
    <rect x="-6" y="-10" width="12" height="24" fill="#f8fafc"/>
    <rect x="6" y="-10" width="12" height="24" fill="#dc2626"/>
    <text x="0" y="-18" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">ITALIA</text>
  `),
  'real-madrid-2002-detail.svg': jerseyDetailSvg('2002 Real Madrid Centenary', 'MCF CENTENARIO', `
    <circle cx="0" cy="10" r="34" fill="#ffffff" stroke="url(#goldGrad)" stroke-width="2"/>
    <line x1="-25" y1="25" x2="25" y2="-5" stroke="#7c3aed" stroke-width="7"/>
    <text x="0" y="16" font-family="'Times New Roman', serif" font-size="20" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">MCF</text>
    <path d="M-18,-8 L-24,-24 L-8,-14 L0,-26 L8,-14 L24,-24 L18,-8 Z" fill="url(#goldGrad)"/>
  `),
  'netherlands-1990-detail.svg': jerseyDetailSvg('1990 Netherlands Away', 'KNVB HOLLAND', `
    <circle cx="0" cy="0" r="36" fill="#111111" stroke="#ea580c" stroke-width="2"/>
    <path d="M-12,12 Q-18,0 -8,-14 Q4,-18 12,-6 Q18,6 6,14 Z" fill="#ffffff"/>
    <text x="0" y="24" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ea580c" text-anchor="middle">KNVB</text>
  `),

  // ACCESSORIES DETAILS & SOCKS
  'grip-socks-detail.svg': wrapDetailSvg('Grip Pods Macro Structure', 'Thermoplastic Silicone Suction Pods', `
    <g filter="url(#softShadow)" transform="translate(400, 380)">
      <rect x="-220" y="-180" width="440" height="360" rx="16" fill="#18181b" stroke="#334155" stroke-width="2"/>
      <g fill="#0284c7">
        <polygon points="0,-40 36,-20 36,20 0,40 -36,20 -36,-20" stroke="#38bdf8" stroke-width="3"/>
        <polygon points="-80,-40 -44,-20 -44,20 -80,40 -116,20 -116,-20" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="80,-40 116,-20 116,20 80,40 44,20 44,-20" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="-40,40 -4,60 -4,100 -40,120 -76,100 -76,60" stroke="#38bdf8" stroke-width="2"/>
        <polygon points="40,40 76,60 76,100 40,120 4,100 4,60" stroke="#38bdf8" stroke-width="2"/>
      </g>
      <text x="0" y="-90" font-family="'Helvetica Neue', Arial, sans-serif" font-size="16" font-weight="900" fill="#f8fafc" text-anchor="middle" letter-spacing="4">HEXAGON ANTI-SLIP PODS</text>
      <text x="0" y="150" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">ZERO FOOT SHIFT INSIDE BOOTS</text>
    </g>
  `),

  'carbon-guards-detail.svg': wrapDetailSvg('3K Carbon Shell Weave', 'High Density Shock Absorbing EVA Foam', `
    <g filter="url(#softShadow)" transform="translate(400, 380)">
      <rect x="-200" y="-160" width="400" height="320" rx="12" fill="#18181b" stroke="url(#goldGrad)" stroke-width="2"/>
      <!-- Cross section layers -->
      <rect x="-160" y="-100" width="320" height="40" fill="#1c1917" stroke="#44403c" stroke-width="1"/>
      <text x="0" y="-75" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">LAYER 1: 3K AEROSPACE CARBON FIBRE</text>
      <rect x="-160" y="-40" width="320" height="40" fill="#7f1d1d" stroke="#991b1b" stroke-width="1"/>
      <text x="0" y="-15" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fecaca" text-anchor="middle">LAYER 2: KEVLAR IMPACT DAMPENING</text>
      <rect x="-160" y="20" width="320" height="40" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="0" y="45" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#cbd5e1" text-anchor="middle">LAYER 3: ANTIBACTERIAL PORON EVA</text>
    </g>
  `),

  'keeper-gloves-detail.svg': wrapDetailSvg('Latex Palm Engineering', '4mm German Contact Foam Structure', `
    <g filter="url(#softShadow)" transform="translate(400, 380)">
      <rect x="-200" y="-160" width="400" height="320" rx="12" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <circle cx="0" cy="-20" r="90" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Micro pores in latex -->
      <g fill="#cbd5e1">
        <circle cx="-40" cy="-40" r="4"/><circle cx="0" cy="-50" r="4"/><circle cx="40" cy="-40" r="4"/>
        <circle cx="-50" cy="0" r="4"/><circle cx="0" cy="-10" r="5"/><circle cx="50" cy="0" r="4"/>
        <circle cx="-40" cy="40" r="4"/><circle cx="0" cy="30" r="4"/><circle cx="40" cy="40" r="4"/>
      </g>
      <text x="0" y="110" font-family="'Helvetica Neue', Arial, sans-serif" font-size="14" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">4mm ADHESIVE CONTACT LATEX</text>
    </g>
  `),

  'equipment-detail.svg': wrapDetailSvg('Heritage Craftsmanship', 'Hand-Stitched 32-Panel Construction', `
    <g filter="url(#softShadow)" transform="translate(400, 380)">
      <rect x="-200" y="-160" width="400" height="320" rx="12" fill="#18181b" stroke="url(#goldGrad)" stroke-width="2"/>
      <circle cx="0" cy="-20" r="85" fill="#78350f" stroke="#92400e" stroke-width="2"/>
      <!-- Heavy Cross Stitches -->
      <g stroke="#fef3c7" stroke-width="3">
        <line x1="-30" y1="-20" x2="30" y2="-20"/>
        <line x1="-30" y1="-40" x2="30" y2="-40"/>
        <line x1="-30" y1="0" x2="30" y2="0"/>
        <line x1="-30" y1="-60" x2="30" y2="-60"/>
        <line x1="-30" y1="20" x2="30" y2="20"/>
      </g>
      <text x="0" y="105" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">AUTHENTIC TOP-GRAIN LEATHER</text>
    </g>
  `),

  'accessories-detail.svg': wrapDetailSvg('Vintage Care & Metalwork', 'Solid Brass & Premium Natural Materials', `
    <g filter="url(#softShadow)" transform="translate(400, 380)">
      <rect x="-200" y="-160" width="400" height="320" rx="12" fill="#18181b" stroke="url(#goldGrad)" stroke-width="2"/>
      <circle cx="0" cy="-20" r="75" fill="url(#brassGrad)" stroke="#aa820a" stroke-width="3"/>
      <text x="0" y="-28" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" fill="#09090b" text-anchor="middle">SOLID BRASS</text>
      <text x="0" y="-8" font-family="Impact, sans-serif" font-size="22" fill="#09090b" text-anchor="middle">100% PURITY</text>
      <text x="0" y="10" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#333333" text-anchor="middle">MATCHDAY CERTIFIED</text>
      <text x="0" y="105" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">LIFETIME DURABILITY GUARANTEE</text>
    </g>
  `)
};

for (const [filename, content] of Object.entries(secondarySvgs)) {
  fs.writeFileSync(path.join(prodDir, filename), content, 'utf8');
}
console.log(`✓ Successfully generated ${Object.keys(secondarySvgs).length} technical secondary detail SVGs.`);
