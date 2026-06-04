"use client";

import React, { useEffect } from 'react';
import { trackAddToCart } from '@/lib/analytics';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useSession } from 'next-auth/react';

export default function ProductCardActions({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);
  const { data: session } = useSession();
  const { items, addItem: addWishlist, removeItem: removeWishlist, hasItem, setItems } = useWishlist();
  
  // Optional: Sync on mount if logged in (could also just rely on local state to feel instant)
  // For now, Zustand persists locally, which gives instant feedback.

  const productId = product.id || product.slug || '1';
  const isWished = hasItem(productId);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWished) {
      removeWishlist(productId);
      if (session?.user) {
        await fetch('/api/user/wishlist', { method: 'DELETE', body: JSON.stringify({ productId }), headers: { 'Content-Type': 'application/json' } }).catch(console.error);
      }
    } else {
      addWishlist(productId);
      if (session?.user) {
        await fetch('/api/user/wishlist', { method: 'POST', body: JSON.stringify({ productId }), headers: { 'Content-Type': 'application/json' } }).catch(console.error);
      }
    }
  };

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
        onClick={toggleWishlist}
        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--color-text-muted)] transition-colors z-10 hover:text-[var(--color-primary)]" 
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </>
  );
}
