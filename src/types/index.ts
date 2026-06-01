export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  oldPrice?: string | number;
  category: string;
  tag?: string;
  image?: string;
  img?: string;
  badge?: string;
  reviews?: number;
  reviewCount?: number;
  description?: string;
  care?: string;
  sale?: boolean;
}
