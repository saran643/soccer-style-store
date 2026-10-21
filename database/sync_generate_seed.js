// database/sync_generate_seed.js
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'generate_seed.js');
let content = fs.readFileSync(seedPath, 'utf8');

// Load imageMap from apply_appropriate_images.js
const applyContent = fs.readFileSync(path.join(__dirname, 'apply_appropriate_images.js'), 'utf8');
const mapMatch = applyContent.match(/const imageMap = ({[\s\S]*?^};)/m);
if (!mapMatch) {
  console.error('Could not find imageMap');
  process.exit(1);
}

const imageMap = eval('(' + mapMatch[1].replace('const imageMap = ', '').replace(/;$/, '') + ')');

for (const [slug, imgs] of Object.entries(imageMap)) {
  const regex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?img:\\s*)'[^']+'`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1'${imgs.primary}',\n    secondaryImg: '${imgs.secondary}'`);
  } else {
    console.warn('Could not match slug:', slug);
  }
}

// Update category images in generate_seed.js
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

for (const [slug, img] of Object.entries(categoryMap)) {
  const catRegex = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?img:\\s*)'[^']+'`, 'm');
  if (catRegex.test(content)) {
    content = content.replace(catRegex, `$1'${img}'`);
  }
}

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Successfully synced generate_seed.js with tailored images.');

