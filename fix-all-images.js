const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'siphorahq_assets/siphorahq_built/assets');
const targetDir = path.join(__dirname, 'public/assets/siphorahq');
const targetDirRoot = path.join(__dirname, 'public/assets');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(targetDirRoot)) fs.mkdirSync(targetDirRoot, { recursive: true });

async function fix() {
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const baseName = file.split('-')[0];
      const inputPath = path.join(sourceDir, file);
      
      // Save to both /assets/ and /assets/siphorahq/ just in case
      const outputPath1 = path.join(targetDir, `${baseName}.webp`);
      const outputPath2 = path.join(targetDirRoot, `${baseName}.webp`);
      
      console.log(`Converting ${file} to ${baseName}.webp...`);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath1);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath2);
    }
  }
  console.log('All done.');
}
fix().catch(console.error);
