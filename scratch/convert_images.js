const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirPath = path.join(__dirname, '..', 'public', 'images', 'homepage');
console.log(`Converting images in ${dirPath}...`);

fs.readdir(dirPath, async (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const file of files) {
    if (file.endsWith('.png')) {
      const srcPath = path.join(dirPath, file);
      const destName = file.replace('.png', '.webp');
      const destPath = path.join(dirPath, destName);

      if (!fs.existsSync(destPath)) {
        console.log(`Converting ${file} -> ${destName}`);
        try {
          await sharp(srcPath)
            .webp({ quality: 80 })
            .toFile(destPath);
          console.log(`✓ Converted ${file}`);
        } catch (e) {
          console.error(`Error converting ${file}:`, e.message);
        }
      } else {
        console.log(`- ${destName} already exists, skipping.`);
      }
    }
  }
  console.log("All conversions completed!");
  process.exit(0);
});
