"use client";

import React from 'react';
import { trackAddToCart } from '@/lib/analytics';
import { useCart } from '@/store/useCart';

export default function ProductCardActions({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full flex flex-col translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
        <button 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/products/${product.id || product.slug || '1'}`;
          }}
          className="w-full bg-white/95 backdrop-blur-sm text-[var(--color-text-muted)] uppercase tracking-widest text-[10px] font-medium py-2 border-b border-[var(--color-border)] hover:bg-neutral-50 transition-colors"
        >
          Quick View
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
            trackAddToCart(product, 1);
            alert(`${product.name} added to cart!`);
          }}
          className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs font-medium py-3 hover:bg-[#1a2520] transition-colors shadow-lg"
        >
          Add to Cart
        </button>
      </div>

      <button 
        onClick={(e) => {
          e.preventDefault();
          // Wishlist logic
        }}
        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--color-text-muted)] hover:text-red-500 transition-colors z-10" 
        aria-label="Add to wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </>
  );
}
