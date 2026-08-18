const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const uri = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB:", mongoose.connection.name);
    
    const pages = await mongoose.connection.db.collection('pages').find({}).toArray();
    console.log("All pages from collection 'pages':");
    pages.forEach(p => {
      console.log(`- ID: ${p._id} | Slug: ${p.slug} | Title: ${p.title} | Published: ${p.isPublished}`);
    });

    const returns = await mongoose.connection.db.collection('returns').find({}).toArray();
    console.log("\nAll returns from collection 'returns':");
    returns.forEach(r => {
      console.log(`- ID: ${r._id} | OrderId: ${r.orderId} | Status: ${r.status}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
