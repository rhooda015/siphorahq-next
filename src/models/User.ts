import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider: string;
  image?: string;
  createdAt: Date;
  addresses: IAddress[];
}

const AddressSchema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  street:   { type: String, required: true },
  city:     { type: String, required: true },
  state:    { type: String, required: true },
  pincode:  { type: String, required: true },
  mobile:   { type: String, required: true },
  isDefault:{ type: Boolean, default: false }
});

const UserSchema = new Schema<IUser>({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String },
  provider:  { type: String, default: 'credentials' },
  image:     { type: String },
  createdAt: { type: Date, default: Date.now },
  addresses: [AddressSchema]
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
