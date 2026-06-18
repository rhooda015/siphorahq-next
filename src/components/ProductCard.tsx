import { Star } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardActions from './ProductCardActions';

export default function ProductCard({ product }: { product: any }) {
  const price = product.salePrice || product.price;
  const oldPrice = product.oldPrice || (product.salePrice && product.salePrice < product.price ? product.price : null);

  const formatPrice = (p: number | string) => {
    if (typeof p === 'number') return `₹${p.toLocaleString('en-IN')}`;
    if (typeof p === 'string' && !p.startsWith('₹')) return `₹${p}`;
    return p;
  };

  return (
    <div className="product-card group relative animate-reveal h-full flex flex-col">
      <Link href={`/products/${product.id || product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-[#faf7f2] mb-4">
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-champagne-gold text-porcelain-white px-2 py-1 font-label-caps text-[10px]">
            {product.badge}
          </div>
        )}
        
        <Image
          src={(product.images?.[0]?.url) || product.image || product.img || '/images/dinnerware.webp'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-full object-contain p-4 bg-[#faf7f2] transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <ProductCardActions product={product} />
      </Link>

      <div className="flex flex-col flex-grow justify-between space-y-1">
        <Link href={`/products/${product.id || product.slug}`} className="flex justify-between items-start">
          <h3 className="font-headline-md text-body-lg text-heritage-navy line-clamp-2 pr-2 leading-tight flex-grow">{product.name}</h3>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="font-price-lg text-price-lg text-heritage-navy">{formatPrice(price)}</p>
            {oldPrice && (
              <p className="text-xs line-through text-on-surface-variant">{formatPrice(oldPrice)}</p>
            )}
          </div>
        </Link>
        <div className="flex text-champagne-gold items-center mt-2">
          {[1,2,3,4,5].map((star) => (
            <Star className=" w-5 h-5 inline-block" />
          ))}
          <span className="text-[10px] text-on-surface-variant ml-2 font-label-caps">({Math.floor(Math.random() * 50) + 4})</span>
        </div>
      </div>
    </div>
  );
}
