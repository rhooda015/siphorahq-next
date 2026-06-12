"use client";

import React, { useState } from 'react';
import { trackAddToCart } from '@/lib/analytics';
import { useCart } from '@/store/useCart';
import { useWishlist } from '@/store/useWishlist';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product, 1);
            trackAddToCart(product, 1);
            toast.success(`${product.name} added to cart`);
          }}
          className="w-full bg-porcelain-white/90 backdrop-blur-sm text-heritage-navy py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-heritage-navy hover:text-porcelain-white transition-colors"
        >
          Quick Add
        </button>
      </div>

      <button 
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 hover:scale-105 ${isWished ? 'opacity-100 text-heritage-navy' : 'opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-heritage-navy'}`}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
      </button>

      {/* Quick View could still be accessed via a long press or we can remove it to keep it clean. Let's keep the modal but hide the button to simplify unless needed. We'll rely on product page for details. */}
    </>
  );
}
