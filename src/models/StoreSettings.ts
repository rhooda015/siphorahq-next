import mongoose, { Document, Model } from 'mongoose';

export interface IStoreSettings extends Document {
  heroTitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroSlides: string[];
}

const StoreSettingsSchema = new mongoose.Schema(
  {
    heroTitle: { type: String, default: 'Handcrafted Porcelain for Timeless Gatherings' },
    heroButtonText: { type: String, default: 'Shop Now' },
    heroButtonLink: { type: String, default: '/products' },
    heroSlides: { 
      type: [String], 
      default: ['/images/hero.webp', '/images/serveware.webp', '/images/gifting.webp'] 
    },
  },
  { timestamps: true }
);

const StoreSettings: Model<IStoreSettings> =
  mongoose.models.StoreSettings || mongoose.model<IStoreSettings>('StoreSettings', StoreSettingsSchema);

export default StoreSettings;
