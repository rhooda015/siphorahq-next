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
    const products = await db.collection('products').find({}).toArray();
    
    let blobCount = 0;
    console.log("=== Checking Products for Blob URLs ===");
    for (const p of products) {
      if (p.images && Array.isArray(p.images)) {
        p.images.forEach((img, i) => {
          if (img.url && img.url.startsWith('blob:')) {
            blobCount++;
            console.log(`❌ FOUND BLOB URL in ${p.title} (image ${i+1}): ${img.url}`);
          }
        });
      }
    }
    if (blobCount === 0) {
      console.log("✅ SUCCESS: 0 blob URLs found across all products in MongoDB!");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
check();
