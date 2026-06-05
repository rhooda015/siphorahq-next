import mongoose from 'mongoose';

const ReturnSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String },
  customerName: { type: String },
  customerEmail: { type: String },
  reason: { type: String, required: true },
  condition: { type: String, default: 'Unopened' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Refunded'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

export default mongoose.models.Return || mongoose.model('Return', ReturnSchema);
