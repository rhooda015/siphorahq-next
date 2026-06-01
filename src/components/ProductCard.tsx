import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col relative">
      {/* Image Container */}
      <div className="aspect-[4/5] bg-[var(--color-accent-light)] relative mb-4 overflow-hidden">
        <Image 
          src={product.image || product.img} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Sale Badge */}
        {(product.sale || product.salePrice < product.price) && (
          <span className="absolute bottom-2 left-2 bg-white text-[var(--color-primary)] text-xs font-sans px-2 py-1 shadow-sm">
            Sale
          </span>
        )}

        {/* Heart Icon (Wishlist) */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--color-text-muted)] hover:text-red-500 transition-colors z-10" aria-label="Add to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <h3 className="text-sm font-serif text-[var(--color-primary)] leading-tight mb-2 group-hover:underline underline-offset-2 h-10 line-clamp-2">
        {product.name}
      </h3>
      
      {/* Stars */}
      <div className="flex items-center gap-1 mb-2">
        {[1,2,3,4,5].map(star => (
          <svg key={star} className={`w-3 h-3 ${star <= Math.round(product.reviews || 4) ? 'text-[#EED202]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-[var(--color-text-muted)] ml-1">({product.reviewCount || product.reviews || 4})</span>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-2 font-sans text-sm">
        {(product.oldPrice || (product.salePrice && product.salePrice < product.price)) && (
          <span className="text-[var(--color-text-muted)] line-through text-xs">
            {product.oldPrice || `₹${product.price.toLocaleString('en-IN')}`}
          </span>
        )}
        <span className="text-[var(--color-primary)] font-medium">
          {product.salePrice ? `₹${product.salePrice.toLocaleString('en-IN')}` : (typeof product.price === 'string' ? product.price : `₹${product.price.toLocaleString('en-IN')}`)}
        </span>
      </div>
    </Link>
  );
}
