import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardActions from './ProductCardActions';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="group cursor-pointer">
      <Link href={`/products/${product.id || product.slug}`} className="block relative aspect-[3/4] mb-stack-sm overflow-hidden bg-porcelain-white dark:bg-tertiary-container border border-heritage-navy/5 dark:border-porcelain-white/5 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-shadow duration-500">
        
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-champagne-gold text-porcelain-white px-3 py-1 font-label-caps text-[10px] uppercase tracking-widest">
            {product.badge}
          </div>
        )}
        
        <Image
          src={(product.images?.[0]?.url) || product.image || product.img || '/images/dinnerware.webp'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03] ease-out"
        />

        <ProductCardActions product={product} />
      </Link>

      <Link href={`/products/${product.id || product.slug}`} className="flex justify-between items-start">
        <div>
          <h3 className="font-display-sm text-body-lg font-semibold text-heritage-navy dark:text-porcelain-white mb-1 line-clamp-1">{product.name}</h3>
          <p className="font-body-sm text-on-surface-variant dark:text-on-primary-container/60 capitalize">
            {product.category?.replace(/-/g, ' ') || 'Collection'}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-body-md font-medium text-heritage-navy dark:text-porcelain-white">
            {product.salePrice ? `$${product.salePrice}` : (typeof product.price === 'number' ? `$${product.price}` : product.price?.replace('₹', '$') || '$0')}
          </span>
          {(product.oldPrice || (product.salePrice && product.salePrice < product.price)) && (
            <span className="text-on-surface-variant line-through text-[11px] tracking-widest mt-1">
              {product.oldPrice || `$${product.price}`}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
