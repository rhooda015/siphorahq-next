import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    url: String,
    altText: String,
  }],
  sizes: [String],
  colors: [String],
  category: String,
  inventoryCount: {
    type: Number,
    default: 0
  },
  variants: [{
    title: String,
    sku: String,
    price: Number,
    inventoryCount: Number
  }]
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
