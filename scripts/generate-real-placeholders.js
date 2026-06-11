const fs = require('fs');
const path = require('path');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const PRODUCTS_DIR = path.join(PUBLIC_IMAGES_DIR, 'products');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

// These are from STATIC_PRODUCTS
const flagships = ['premium-dinner-set-46', 'premium-tea-set-17', 'designer-gift-box', 'luxury-bowl-set', 'opal-glass-dinner-set'];
const others = ['leatherette-serving-tray', 'porcelain-side-plates', 'coffee-mugs-gold'];

const flagshipSuffixes = ['hero', 'lifestyle', 'editorial', 'macro', 'gifting', 'packaging', 'dining', 'feature', 'size', 'mood'];
const otherSuffixes = ['hero', 'lifestyle', '45deg'];

const sourceImage = path.join(PUBLIC_IMAGES_DIR, 'serveware.webp');

function copyFile(dest) {
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(sourceImage, dest);
  }
}

flagships.forEach(id => {
  const dir = path.join(PRODUCTS_DIR, id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  flagshipSuffixes.forEach(suffix => {
    copyFile(path.join(dir, `${id}_${suffix}.webp`));
  });
});

others.forEach(id => {
  const dir = path.join(PRODUCTS_DIR, id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  otherSuffixes.forEach(suffix => {
    copyFile(path.join(dir, `${id}_${suffix}.webp`));
  });
});

console.log('Real placeholders created.');
