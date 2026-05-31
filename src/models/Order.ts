import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  paymentId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending_payment', 'paid', 'failed', 'shipped', 'delivered'],
    default: 'pending_payment'
  },
  customerEmail: String,
  shippingAddress: {
    name: String,
    addressLine1: String,
    city: String,
    state: String,
    pincode: String,
  },
  lineItems: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    price: Number,
    size: String
  }]
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
