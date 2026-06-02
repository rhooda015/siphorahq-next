const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/images');

async function processImages() {
  const files = fs.readdirSync(dir);

  let beforeSize = 0;
  let afterSize = 0;

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(dir, `${baseName}.webp`);

      const statBefore = fs.statSync(inputPath);
      beforeSize += statBefore.size;

      console.log(`Processing ${file}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const statAfter = fs.statSync(outputPath);
      afterSize += statAfter.size;

      // Delete the original file
      fs.unlinkSync(inputPath);
    }
  }

  console.log('Conversion complete!');
  console.log(`Before size: ${(beforeSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`After size: ${(afterSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reduction: ${((1 - afterSize / beforeSize) * 100).toFixed(2)}%`);
}

processImages().catch(console.error);
