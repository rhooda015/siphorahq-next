import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardActions from './ProductCardActions';

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col relative w-full h-full transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-sm overflow-hidden bg-white border border-[#EAE3D8]">
      {/* Image Container */}
      <div className="aspect-[4/5] bg-[#F9F8F6] relative overflow-hidden">
        <img
          src={(product.images?.[0]?.url) || product.image || product.img || '/images/dinnerware.webp'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ease-out"
        />
        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10 items-start">
          {/* Special Badge (Bestseller, New Arrival) */}
          {product.badge && (
            <span className="bg-[var(--color-primary)] text-white text-[10px] font-sans font-medium uppercase tracking-widest px-2 py-1 shadow-sm">
              {product.badge}
            </span>
          )}

          {/* Savings Badge */}
          {(product.sale || (product.salePrice && product.salePrice < product.price)) && (
            <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 shadow-sm">
              Save {product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 10}%
            </span>
          )}
        </div>

        <ProductCardActions product={product} />
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-5 flex flex-col flex-grow bg-white relative z-10">
        <h3 className="text-[13px] md:text-sm font-serif text-[#1A1A1A] leading-relaxed mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 h-10 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-3">
          {[1,2,3,4,5].map(star => (
            <svg key={star} className={`w-[10px] h-[10px] ${star <= Math.round(product.reviews || 4) ? 'text-[#D4AF37]' : 'text-[#EAE3D8]'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-[#8C8C8C] ml-1 tracking-wider">({product.reviewCount || product.reviews || 4})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 font-sans mt-auto">
          <span className="text-[#1A1A1A] font-medium text-[13px] tracking-wide">
            {product.salePrice ? `₹${product.salePrice.toLocaleString('en-IN')}` : (typeof product.price === 'string' ? product.price : `₹${product.price.toLocaleString('en-IN')}`)}
          </span>
          {(product.oldPrice || (product.salePrice && product.salePrice < product.price)) && (
            <span className="text-[#8C8C8C] line-through text-[11px] tracking-wide">
              {product.oldPrice || `₹${product.price.toLocaleString('en-IN')}`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
