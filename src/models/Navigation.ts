import mongoose, { Document, Model } from 'mongoose';

export interface INavigationLink {
  label: string;
  url: string;
  order: number;
  subLinks?: INavigationLink[];
}

export interface INavigation extends Document {
  menuId: string;
  name: string;
  links: INavigationLink[];
  updatedAt: Date;
}

const NavigationLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
});
NavigationLinkSchema.add({ subLinks: [NavigationLinkSchema] });

const NavigationSchema = new mongoose.Schema(
  {
    menuId: { type: String, required: true, unique: true }, // e.g. 'main-menu', 'footer-menu'
    name: { type: String, required: true },
    links: [NavigationLinkSchema],
  },
  { timestamps: true }
);

const Navigation: Model<INavigation> = mongoose.models.Navigation || mongoose.model<INavigation>('Navigation', NavigationSchema);

export default Navigation;
