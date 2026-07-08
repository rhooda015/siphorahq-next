require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({
    title: String,
    price: Number,
    images: Array,
    category: String,
    status: String
  }, { strict: false }));

  const products = await Product.find({ status: 'Live' });
  console.log(`Found ${products.length} live products:`);
  products.forEach((p, idx) => {
    console.log(`\nProduct #${idx + 1}: ${p.title}`);
    console.log(`  ID: ${p._id}`);
    console.log(`  Price: ${p.price}`);
    console.log(`  Category: ${p.category}`);
    if (p.images && p.images.length > 0) {
      p.images.forEach((img, i) => {
        const url = img.url || '';
        const preview = url.startsWith('data:') ? url.slice(0, 100) + '...' : url;
        console.log(`  Image #${i + 1}: ${preview}`);
      });
    } else {
      console.log(`  Images: None`);
    }
  });
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
