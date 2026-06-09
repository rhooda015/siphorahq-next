import mongoose, { Document, Model } from 'mongoose';

export interface ICollection extends Document {
  title: string;
  handle: string;
  description?: string;
  image?: string;
  // manual or automated
  type: 'manual' | 'automated';
  // If automated, conditions to match products
  conditions?: any[];
  // If manual, array of product IDs
  products?: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    type: { type: String, enum: ['manual', 'automated'], default: 'manual' },
    conditions: { type: Array, default: [] },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Collection: Model<ICollection> = mongoose.models.Collection || mongoose.model<ICollection>('Collection', CollectionSchema);

export default Collection;
