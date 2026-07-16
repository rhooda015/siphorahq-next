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
    
    console.log("=== Live Products in MongoDB ===");
    for (const p of products) {
      console.log(`Product: ${p.title}`);
      console.log(`  ID/Handle: ${p._id} / ${p.handle}`);
      console.log(`  Price/MRP: ₹${p.price} / ₹${p.mrp || 'N/A'}`);
      console.log(`  Status: ${p.status}`);
      console.log(`  Image URLs:`, p.images?.map(img => img.url?.substring(0, 100)) || []);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
check();
