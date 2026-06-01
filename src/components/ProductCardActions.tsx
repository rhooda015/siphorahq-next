"use client";

import React from 'react';
import { trackAddToCart } from '@/lib/analytics';

export default function ProductCardActions({ product }: { product: any }) {
  return (
    <>
      <button 
        onClick={(e) => {
          e.preventDefault();
          trackAddToCart(product, 1);
          alert(`${product.name} added to cart!`);
        }}
        className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm text-[var(--color-primary)] uppercase tracking-widest text-xs font-medium py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] hover:bg-[var(--color-primary)] hover:text-white z-20"
      >
        Quick Add
      </button>

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
