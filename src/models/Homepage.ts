import mongoose, { Document, Model } from 'mongoose';

export interface IHomepageSection {
  id: string;
  type: string; // 'hero', 'featured_collections', 'featured_products', 'testimonials', 'newsletter'
  order: number;
  isVisible: boolean;
  data: any; // Flexible JSON for section-specific content
}

export interface IHomepage extends Document {
  version: string;
  sections: IHomepageSection[];
  updatedAt: Date;
}

const HomepageSectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const HomepageSchema = new mongoose.Schema(
  {
    version: { type: String, default: 'draft', unique: true }, // 'draft' or 'published'
    sections: [HomepageSectionSchema],
  },
  { timestamps: true }
);

const Homepage: Model<IHomepage> = mongoose.models.Homepage || mongoose.model<IHomepage>('Homepage', HomepageSchema);

export default Homepage;
