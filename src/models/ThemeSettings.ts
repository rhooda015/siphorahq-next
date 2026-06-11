import mongoose, { Document, Model } from 'mongoose';

export interface IThemeSettings extends Document {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
  layoutWidth: string;
  updatedAt: Date;
}

const ThemeSettingsSchema = new mongoose.Schema(
  {
    primaryColor: { type: String, default: '#D4AF37' },
    secondaryColor: { type: String, default: '#1A1A1A' },
    accentColor: { type: String, default: '#F9F6F0' },
    headingFont: { type: String, default: 'Cormorant Garamond' },
    bodyFont: { type: String, default: 'DM Sans' },
    borderRadius: { type: String, default: '0px' },
    layoutWidth: { type: String, default: '1280px' },
  },
  { timestamps: true }
);

const ThemeSettings: Model<IThemeSettings> = mongoose.models.ThemeSettings || mongoose.model<IThemeSettings>('ThemeSettings', ThemeSettingsSchema);

export default ThemeSettings;
