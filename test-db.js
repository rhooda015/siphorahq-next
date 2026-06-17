import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  const products = await db.collection('products').find({status: 'Live'}).sort({createdAt: -1}).limit(4).toArray();
  products.forEach(p => console.log(p.title, p.images));
  process.exit(0);
}
check();
