require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({
    title: String,
    slug: String,
    handle: String,
    image: String,
    images: Array,
  }, { strict: false }));

  const products = await Product.find({});
  console.log(`Found ${products.length} products to process.`);

  for (const p of products) {
    let updated = false;
    const slugName = p.slug || p.handle || p._id.toString();
    console.log(`Processing product: ${p.title} (${slugName})`);

    // 1. Process images array
    if (p.images && p.images.length > 0) {
      const newImages = [];
      for (let i = 0; i < p.images.length; i++) {
        const img = p.images[i];
        const url = img.url || '';
        
        if (url.startsWith('data:image/')) {
          // Parse base64
          const matches = url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const base64Data = matches[2];
            const buffer = Buffer.from(base64Data, 'base64');
            const filename = `${slugName}-${i}.webp`;
            const absolutePath = path.join(targetDir, filename);
            const relativePath = `/images/products/${filename}`;

            try {
              console.log(`  Converting Image #${i + 1} from base64 -> ${filename}`);
              await sharp(buffer)
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(absolutePath);
              
              newImages.push({ ...img, url: relativePath });
              updated = true;
            } catch (err) {
              console.error(`  Error converting Base64 Image #${i + 1}:`, err.message);
              newImages.push(img);
            }
          } else {
            newImages.push(img);
          }
        } else if (url === '/images/products/vintage_blue.png') {
          // Optimize vintage blue PNG
          const srcPath = path.join(targetDir, 'vintage_blue.png');
          const filename = `vintage_blue.webp`;
          const absolutePath = path.join(targetDir, filename);
          const relativePath = `/images/products/${filename}`;

          try {
            console.log(`  Converting vintage_blue.png -> ${filename}`);
            await sharp(srcPath)
              .resize({ width: 800, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(absolutePath);
            
            newImages.push({ ...img, url: relativePath });
            updated = true;
          } catch (err) {
            console.error(`  Error converting vintage_blue.png:`, err.message);
            newImages.push(img);
          }
        } else {
          newImages.push(img);
        }
      }
      if (updated) {
        p.images = newImages;
      }
    }

    // 2. Process main image field
    if (p.image && p.image.startsWith('data:image/')) {
      // Find the first converted image path if it exists, or convert it
      if (p.images && p.images[0] && p.images[0].url) {
        p.image = p.images[0].url;
        updated = true;
      } else {
        const matches = p.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const base64Data = matches[2];
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `${slugName}-main.webp`;
          const absolutePath = path.join(targetDir, filename);
          const relativePath = `/images/products/${filename}`;

          try {
            console.log(`  Converting main image from base64 -> ${filename}`);
            await sharp(buffer)
              .resize({ width: 800, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(absolutePath);
            p.image = relativePath;
            updated = true;
          } catch (err) {
            console.error(`  Error converting main image:`, err.message);
          }
        }
      }
    } else if (p.image === '/images/products/vintage_blue.png') {
      p.image = '/images/products/vintage_blue.webp';
      updated = true;
    }

    if (updated) {
      p.markModified('images');
      p.markModified('image');
      await p.save();
      console.log(`✓ Updated product ${p.title} in DB!`);
    } else {
      console.log(`- No updates needed for product ${p.title}`);
    }
  }

  console.log("All operations completed successfully!");
  process.exit(0);
}).catch(err => {
  console.error("Connection error:", err);
  process.exit(1);
});
