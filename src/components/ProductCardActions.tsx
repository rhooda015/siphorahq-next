"use client";
import { Heart } from 'lucide-react';

import React, { useState } from 'react';
import { trackAddToCart } from '@/lib/analytics';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductCardActions({ product }: { product: any }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const { data: session } = useSession();
  const { items, addItem: addWishlist, removeItem: removeWishlist, hasItem } = useWishlist();
  
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
      <div className="quick-add absolute bottom-0 left-0 w-full p-2 md:p-4 bg-porcelain-white/95 backdrop-blur-sm z-20 transition-all duration-300 opacity-100 translate-y-0 md:translate-y-full md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 focus-within:opacity-100 focus-within:translate-y-0">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product, 1);
            trackAddToCart(product, 1);
            toast.success(`${product.name} added to cart`);
          }}
          className="w-full py-2 md:py-3 min-h-[36px] md:min-h-[44px] bg-heritage-navy text-white font-label-caps text-[10px] md:text-label-caps uppercase tracking-widest hover:bg-burnished-gold hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heritage-navy"
        >
          QUICK ADD
        </button>
      </div>

      <button 
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/95 shadow-sm flex items-center justify-center transition-all duration-300 z-10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-heritage-navy ${
          isWished 
            ? 'text-heritage-navy' 
            : 'text-on-surface-variant hover:text-heritage-navy opacity-100 md:opacity-0 md:group-hover:opacity-100'
        }`}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className="w-4 h-4 md:w-5 md:h-5 inline-block" aria-hidden="true" />
      </button>

      {/* Quick View could still be accessed via a long press or we can remove it to keep it clean. Let's keep the modal but hide the button to simplify unless needed. We'll rely on product page for details. */}
    </>
  );
}
