const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = '/Users/mac/.gemini/antigravity/brain/f849731b-3872-4f99-9073-490b69da72a8';
const publicDir = '/Users/mac/Desktop/ai studio/public/images';

const imageMap = {
  'emerald_regent_mug': 'products/emerald-regent-mug.webp',
  'imperial_white_mug': 'products/imperial-white-mug.webp',
  'moroccan_azure_tea_mug': 'products/moroccan-azure-tea-mug.webp',
  'premium_gold_dinner_set': 'products/premium-gold-dinner-set.webp',
  'blue_rose_tea_set': 'products/blue-rose-tea-set.webp',
  'royal_ivory_cup_set': 'products/royal-ivory-cup-set.webp',
  'classic_white_plates': 'products/classic-white-dinner-plates.webp',
  'golden_rim_serving_bowl': 'products/golden-rim-serving-bowl.webp',
  'minimalist_tea_cups': 'products/minimalist-tea-cups.webp',
  'heritage_navy_mug': 'products/heritage-navy-mug-set.webp',
};

const boxImageTargets = [
  'products/luxe-wedding-gift-box.webp',
  'products/corporate-gift-cup-set.webp',
  'homepage/curated_luxury_gifting.png',
  'homepage/milestone_festive.png'
];

async function replaceImages() {
  const files = fs.readdirSync(brainDir);

  // Find the luxury box image
  const boxImageFile = files.find(f => f.startsWith('luxury_gift_box') && f.endsWith('.png'));
  if (boxImageFile) {
    const boxImagePath = path.join(brainDir, boxImageFile);
    for (const target of boxImageTargets) {
      const targetPath = path.join(publicDir, target);
      if (target.endsWith('.webp')) {
        await sharp(boxImagePath).webp({ quality: 90 }).toFile(targetPath);
      } else {
        await sharp(boxImagePath).png().toFile(targetPath);
      }
      console.log(`Replaced box image: ${target}`);
    }
  } else {
    console.error('Luxury gift box image not found!');
  }

  // Find and replace product images
  for (const [prefix, target] of Object.entries(imageMap)) {
    const sourceFile = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (sourceFile) {
      const sourcePath = path.join(brainDir, sourceFile);
      const targetPath = path.join(publicDir, target);
      await sharp(sourcePath).webp({ quality: 90 }).toFile(targetPath);
      console.log(`Replaced product image: ${target}`);
    } else {
      console.error(`Source image for ${prefix} not found!`);
    }
  }
}

replaceImages().then(() => console.log('Done!')).catch(console.error);
