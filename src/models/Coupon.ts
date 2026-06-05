import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  desc: { type: String, required: true },
  discountValue: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  uses: { type: Number, default: 0 },
  maxUses: { type: Number, default: null },
  saved: { type: Number, default: 0 },
  expiryDate: { type: Date, default: null },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
});

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
