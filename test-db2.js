const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const Product = mongoose.model('Product', new mongoose.Schema({ status: String }, { strict: false }));
async function run() {
  await Product.updateOne({ title: /Moroccan/i }, { $set: { status: 'Live' } });
  const products = await Product.find({ title: /Moroccan/i }, 'title status');
  console.log(products);
  process.exit();
}
run();
