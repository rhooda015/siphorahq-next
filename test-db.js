const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
async function run() {
  const products = await Product.find({}, 'title status');
  console.log(products);
  process.exit();
}
run();
