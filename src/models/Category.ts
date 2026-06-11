import mongoose, { Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  handle: string;
  description?: string;
  image?: string;
  parentCategory?: mongoose.Types.ObjectId;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isFeatured: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
