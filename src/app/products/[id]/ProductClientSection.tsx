'use client';

import dynamic from 'next/dynamic';

// Client-only components loaded after hydration (ssr:false allowed in 'use client')
const ProductClientActions = dynamic(() => import('./ProductClientActions'), { ssr: false });
const DeliveryChecker = dynamic(() => import('./DeliveryChecker'), { ssr: false });
const RecentlyViewed = dynamic(() => import('./RecentlyViewed'), { ssr: false });

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    image: string;
    category: string;
    badge?: string;
    variants?: any[];
    inventoryCount?: number;
  };
}

export default function ProductClientSection({ product }: Props) {
  return (
    <>
      {/* Pincode delivery estimator */}
      <DeliveryChecker />
      {/* Add to cart, quantity, wishlist — also renders StickyAddToCart internally */}
      <ProductClientActions product={product} />
      {/* Recently viewed strip — cookie-based, fully client-side */}
      <RecentlyViewed currentProductId={product.id} />
    </>
  );
}
