import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function fix() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  const result = await db.collection('products').updateOne(
    { title: { $regex: /Vintage Blue Floral Ceramic/i } },
    { $set: { "images": [{ url: "/images/products/vintage_blue.png", alt: "Vintage Blue Floral Ceramic Tea Set" }] } }
  );
  console.log('Modified count:', result.modifiedCount);
  process.exit(0);
}
fix();
