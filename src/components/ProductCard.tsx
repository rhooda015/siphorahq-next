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
    <div className="product-card group relative animate-reveal">
      <Link href={`/products/${product.id || product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-bone-gray mb-4">
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
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <ProductCardActions product={product} />
      </Link>

      <div className="space-y-1">
        <Link href={`/products/${product.id || product.slug}`} className="flex justify-between items-start">
          <h3 className="font-headline-md text-body-lg text-heritage-navy line-clamp-1 pr-2">{product.name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="font-price-lg text-price-lg text-heritage-navy">{formatPrice(price)}</p>
            {oldPrice && (
              <p className="text-xs line-through text-on-surface-variant">{formatPrice(oldPrice)}</p>
            )}
          </div>
        </Link>
        <div className="flex text-champagne-gold items-center">
          {[1,2,3,4,5].map((star) => (
            <span key={star} className="material-symbols-outlined !text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
          <span className="text-[10px] text-on-surface-variant ml-2 font-label-caps">({Math.floor(Math.random() * 50) + 4})</span>
        </div>
      </div>
    </div>
  );
}
