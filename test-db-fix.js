require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = mongoose.model('Product', new mongoose.Schema({ title: String, images: Array }, { strict: false }));
  
  // Find all products
  const products = await Product.find({});
  let updated = 0;
  
  for (let p of products) {
    if (p.images && p.images.some(i => i.url && i.url.startsWith('blob:'))) {
      const cleanImages = p.images.filter(i => !i.url.startsWith('blob:'));
      await Product.updateOne({ _id: p._id }, { $set: { images: cleanImages } });
      updated++;
      console.log(`Cleaned images for ${p.title}`);
    }
  }
  
  console.log(`Updated ${updated} products.`);
  process.exit();
});
