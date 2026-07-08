import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudioProject extends Document {
  name: string;
  description?: string;
  originalImage: string; // base64 data URL or file path
  originalImageMimeType: string;
  enhancedImage?: string;
  productType?: string;
  productAttributes?: {
    colors?: string[];
    shape?: string;
    material?: string;
    estimatedDimensions?: string;
    features?: string[];
    style?: string;
  };
  status: 'draft' | 'processing' | 'complete' | 'error';
  tags?: string[];
  createdBy: string; // admin username or user ID
  assetCount?: number;
  lastGeneratedModule?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudioProjectSchema = new Schema<IStudioProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    originalImage: { type: String, required: true },
    originalImageMimeType: { type: String, default: 'image/jpeg' },
    enhancedImage: { type: String },
    productType: { type: String },
    productAttributes: {
      colors: [String],
      shape: String,
      material: String,
      estimatedDimensions: String,
      features: [String],
      style: String,
    },
    status: {
      type: String,
      enum: ['draft', 'processing', 'complete', 'error'],
      default: 'draft',
    },
    tags: [String],
    createdBy: { type: String, required: true },
    assetCount: { type: Number, default: 0 },
    lastGeneratedModule: { type: String },
  },
  { timestamps: true }
);

StudioProjectSchema.index({ createdBy: 1, createdAt: -1 });
StudioProjectSchema.index({ status: 1 });

const StudioProject: Model<IStudioProject> =
  mongoose.models.StudioProject ||
  mongoose.model<IStudioProject>('StudioProject', StudioProjectSchema);

export default StudioProject;
