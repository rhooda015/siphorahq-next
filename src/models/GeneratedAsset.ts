import mongoose, { Schema, Document, Model } from 'mongoose';

export type AssetModuleId =
  | 'upload'
  | 'enhance'
  | 'scene'
  | 'naming'
  | 'content'
  | 'amazon'
  | 'flipkart'
  | 'seo'
  | 'marketing'
  | 'keywords'
  | 'pricing'
  | 'infographic'
  | 'design';

export type AssetType = 'image' | 'text' | 'json' | 'zip';

export interface IGeneratedAsset extends Document {
  projectId: mongoose.Types.ObjectId;
  moduleId: AssetModuleId;
  type: AssetType;
  label: string;
  content: string; // base64 for images, JSON string for structured data, plain text for copy
  metadata?: Record<string, unknown>;
  format?: string; // 'png', 'jpg', 'json', 'txt', 'zip'
  size?: number; // bytes
  createdAt: Date;
  updatedAt: Date;
}

const GeneratedAssetSchema = new Schema<IGeneratedAsset>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'StudioProject',
      required: true,
      index: true,
    },
    moduleId: {
      type: String,
      enum: [
        'upload',
        'enhance',
        'scene',
        'naming',
        'content',
        'amazon',
        'flipkart',
        'seo',
        'marketing',
        'keywords',
        'pricing',
        'infographic',
        'design',
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'text', 'json', 'zip'],
      required: true,
    },
    label: { type: String, required: true },
    content: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    format: { type: String },
    size: { type: Number },
  },
  { timestamps: true }
);

GeneratedAssetSchema.index({ projectId: 1, moduleId: 1 });
GeneratedAssetSchema.index({ projectId: 1, createdAt: -1 });

const GeneratedAsset: Model<IGeneratedAsset> =
  mongoose.models.GeneratedAsset ||
  mongoose.model<IGeneratedAsset>('GeneratedAsset', GeneratedAssetSchema);

export default GeneratedAsset;
