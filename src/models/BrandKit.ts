import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBrandKit extends Document {
  // Identity
  brandName: string;
  tagline?: string;

  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  customColors?: { name: string; hex: string }[];

  // Typography
  headingFont: string;
  bodyFont: string;
  fontPairings?: string[];

  // Logos
  logoUrl?: string;
  logoWhiteUrl?: string;
  iconUrl?: string;

  // Tone
  toneOfVoice: string; // 'luxury', 'premium', 'elegant', 'warm', etc.
  brandKeywords?: string[];
  brandPersonality?: string;

  // Visual Style
  preferredStyle: string; // 'minimalist', 'editorial', 'luxury-dark', etc.
  preferredBackgrounds?: string[];
  luxuryLevel: number; // 1-10

  // Industry
  industry: string;
  targetAudience?: string;
  marketplaces?: string[];

  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandKitSchema = new Schema<IBrandKit>(
  {
    brandName: { type: String, required: true, default: 'Siphorahq' },
    tagline: { type: String },

    primaryColor: { type: String, default: '#C9A84C' },
    secondaryColor: { type: String, default: '#F5F0E8' },
    accentColor: { type: String, default: '#8B6914' },
    backgroundColor: { type: String, default: '#0A0E1A' },
    textColor: { type: String, default: '#FFFFFF' },
    customColors: [{ name: String, hex: String }],

    headingFont: { type: String, default: 'Inter' },
    bodyFont: { type: String, default: 'Outfit' },
    fontPairings: [String],

    logoUrl: { type: String },
    logoWhiteUrl: { type: String },
    iconUrl: { type: String },

    toneOfVoice: { type: String, default: 'luxury' },
    brandKeywords: [String],
    brandPersonality: { type: String },

    preferredStyle: { type: String, default: 'luxury-editorial' },
    preferredBackgrounds: [String],
    luxuryLevel: { type: Number, default: 9, min: 1, max: 10 },

    industry: {
      type: String,
      default: 'Premium Ceramic & Luxury Tableware',
    },
    targetAudience: { type: String },
    marketplaces: [String],

    createdBy: { type: String, required: true, default: 'admin' },
  },
  { timestamps: true }
);

const BrandKit: Model<IBrandKit> =
  mongoose.models.BrandKit ||
  mongoose.model<IBrandKit>('BrandKit', BrandKitSchema);

export default BrandKit;
