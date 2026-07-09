const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function check() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const products = await db.collection('products').find({
      handle: { $in: [
        'siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle',
        'siphorahq-imperial-diamond-fine-bone-china-mug-with-gold-rim'
      ]}
    }).toArray();
    
    console.log("=== Product Images in MongoDB ===");
    for (const p of products) {
      console.log(`Product: ${p.title} (${p.handle})`);
      if (p.images && Array.isArray(p.images)) {
        p.images.forEach((img, index) => {
          const url = img.url || '';
          console.log(`  Image ${index + 1}: url length = ${url.length}, start = ${url.substring(0, 100)}`);
        });
      } else {
        console.log("  No images array found or it is not an array");
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
check();
