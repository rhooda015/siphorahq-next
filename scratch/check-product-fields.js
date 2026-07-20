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
    console.log(`Found ${products.length} products in MongoDB:`);
    products.forEach((p, i) => {
      console.log(`\nProduct ${i+1}: ${p.name || p.title}`);
      console.log(`  _id: ${p._id}`);
      console.log(`  status: ${p.status}`);
      console.log(`  category: ${p.category}`);
      console.log(`  tag: ${p.tag}`);
      console.log(`  badge: ${p.badge}`);
      console.log(`  material: ${p.material}`);
      console.log(`  images length: ${p.images ? p.images.length : 0}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
check();
