const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function check() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const settings = await db.collection('storesettings').findOne();
    console.log("=== Active StoreSettings in DB ===");
    console.log("Database Settings:", settings);
    console.log("==================================");
    console.log("Environment Username:", process.env.ADMIN_USERNAME);
    console.log("Environment Password:", process.env.ADMIN_PASSWORD);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
check();
