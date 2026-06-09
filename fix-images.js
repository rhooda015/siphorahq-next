const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'siphorahq_assets/siphorahq_built/assets');
const targetDir = path.join(__dirname, 'public/assets/siphorahq');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function fix() {
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    if (file.endsWith('.png') && file.startsWith('cat')) {
      const baseName = file.split('-')[0]; // e.g. catBowls
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(targetDir, `${baseName}.webp`);
      
      console.log(`Converting ${file} to ${baseName}.webp...`);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    }
  }
  console.log('Done.');
}
fix().catch(console.error);
