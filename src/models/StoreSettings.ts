import mongoose, { Document, Model } from 'mongoose';

export interface IStoreSettings extends Document {
  heroTitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroSlides: string[];
  // Settings
  storeName: string;
  storeEmail: string;
  storePhone: string;
  freeShippingThreshold: number;
  flatShippingRate: number;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  // Admin Auth
  adminUsername?: string;
  adminPassword?: string;
  // SEO
  seoTitle: string;
  seoDescription: string;
  // Zoho API
  zohoClientId?: string;
  zohoClientSecret?: string;
  zohoRefreshToken?: string;
  zohoRegion?: string;
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
    
    // Settings
    storeName: { type: String, default: 'Siphorahq' },
    storeEmail: { type: String, default: 'support@siphorahq.in' },
    storePhone: { type: String, default: '+91 9876543210' },
    freeShippingThreshold: { type: Number, default: 999 },
    flatShippingRate: { type: Number, default: 100 },
    razorpayKeyId: { type: String, default: '' },
    razorpayKeySecret: { type: String, default: '' },
    adminUsername: { type: String, default: '' },
    adminPassword: { type: String, default: '' },

    // SEO
    seoTitle: { type: String, default: 'Siphorahq — Luxury Porcelain Dinnerware India' },
    seoDescription: { type: String, default: 'Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide.' },

    // Zoho API
    zohoClientId: { type: String, default: '' },
    zohoClientSecret: { type: String, default: '' },
    zohoRefreshToken: { type: String, default: '' },
    zohoRegion: { type: String, default: '.in' },
  },
  { timestamps: true }
);

const StoreSettings: Model<IStoreSettings> =
  mongoose.models.StoreSettings || mongoose.model<IStoreSettings>('StoreSettings', StoreSettingsSchema);

export default StoreSettings;
