const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function trimImage() {
  const imgPath = path.join(__dirname, '../public/images/products/vintage_blue.png');
  const backupPath = path.join(__dirname, '../public/images/products/vintage_blue_backup.png');
  
  if (!fs.existsSync(imgPath)) {
    console.error('File not found:', imgPath);
    return;
  }
  
  // Create backup if not exists
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(imgPath, backupPath);
    console.log('Created backup at:', backupPath);
  }
  
  console.log('Trimming white margins from:', imgPath);
  
  // Trim white edges
  await sharp(backupPath)
    .trim({ background: 'white', threshold: 10 }) // trim white background
    .toFile(imgPath);
    
  console.log('Trimming completed successfully!');
}

trimImage().catch(console.error);
