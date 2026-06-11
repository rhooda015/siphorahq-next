import mongoose, { Document, Model } from 'mongoose';

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);

export default Page;
