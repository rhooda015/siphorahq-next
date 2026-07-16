const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const productsColl = db.collection('products');

    console.log("Starting DB Seed/Cleanup...");

    // 1. Fix Mughal Floral Coffee Mug (blob URL & pricing)
    const mughalResult = await productsColl.updateOne(
      { _id: new ObjectId('6a4b3c776bd69384d8343678') },
      { 
        $set: { 
          price: 999,
          mrp: 1499,
          images: [
            { 
              url: '/images/products/emerald-regent-mug.webp', 
              altText: 'Mughal Floral Ceramic Coffee Mug' 
            }
          ]
        } 
      }
    );
    console.log("Updated Mughal Floral Coffee Mug:", mughalResult.modifiedCount);

    // 2. Fix Vintage Blue Floral Ceramic Tea Set (pricing & relative image check)
    const teaSetResult = await productsColl.updateOne(
      { _id: new ObjectId('6a32a7283e3cb1a2360ea4a6') },
      { 
        $set: { 
          price: 4999,
          mrp: 6999,
          images: [
            { 
              url: '/images/products/vintage_blue.png', 
              altText: 'Siphorahq Vintage Blue Floral Ceramic Tea Set with Serving Tray' 
            }
          ]
        } 
      }
    );
    console.log("Updated Vintage Blue Tea Set:", teaSetResult.modifiedCount);

    console.log("Database cleanup finished successfully.");
  } catch (err) {
    console.error("Failed to run database cleanup:", err);
  } finally {
    await client.close();
    process.exit(0);
  }
}
run();
