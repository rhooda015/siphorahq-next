const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const PRODUCTS_DIR = path.join(PUBLIC_IMAGES_DIR, 'products');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

const flagshipProducts = ['blue-rose-tea-set', 'luxury-gold-dinner-set', 'premium-white-serveware', 'emerald-green-mugs', 'classic-ivory-platter'];
const otherProducts = ['vintage-floral-dinner-set', 'modern-minimal-bowls', 'royal-tea-cups', 'gold-rimmed-plates'];

const flagshipSuffixes = ['hero', 'lifestyle', 'editorial', 'macro', 'gifting', 'packaging', 'dining', 'feature', 'size', 'mood'];
const otherSuffixes = ['hero', 'lifestyle', '45deg'];

const banners = ['cups', 'tea', 'coffee', 'gift-sets', 'kitchenware', 'dinnerware', 'fine-dining'];

// We will copy an existing image (e.g. hero.webp) to all these destinations so they exist as valid WebP images.
const sourceImage = path.join(PUBLIC_IMAGES_DIR, 'serveware.webp');

console.log('Generating placeholders...');

function copyFile(dest) {
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(sourceImage, dest);
  }
}

// Generate for flagships
flagshipProducts.forEach(prod => {
  const dir = path.join(PRODUCTS_DIR, prod);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  flagshipSuffixes.forEach(suffix => {
    copyFile(path.join(dir, `${prod}_${suffix}.webp`));
  });
});

// Generate for others
otherProducts.forEach(prod => {
  const dir = path.join(PRODUCTS_DIR, prod);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  otherSuffixes.forEach(suffix => {
    copyFile(path.join(dir, `${prod}_${suffix}.webp`));
  });
});

// Generate banners
banners.forEach(banner => {
  copyFile(path.join(PUBLIC_IMAGES_DIR, `banner_${banner}.webp`));
});

console.log('Placeholders created successfully.');
