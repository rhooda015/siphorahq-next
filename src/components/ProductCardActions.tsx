"use client";
import { Heart } from 'lucide-react';

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
      <div className="quick-add absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-porcelain-white/90 backdrop-blur-md z-20">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product, 1);
            trackAddToCart(product, 1);
            toast.success(`${product.name} added to cart`);
          }}
          className="w-full py-3 bg-heritage-navy text-porcelain-white font-label-caps text-label-caps uppercase tracking-widest hover:bg-champagne-gold transition-colors"
        >
          QUICK ADD
        </button>
      </div>

      <button 
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 z-10 hover:scale-105 ${isWished ? 'opacity-100 text-heritage-navy' : 'opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-heritage-navy'}`}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className=" w-5 h-5 inline-block" />
      </button>

      {/* Quick View could still be accessed via a long press or we can remove it to keep it clean. Let's keep the modal but hide the button to simplify unless needed. We'll rely on product page for details. */}
    </>
  );
}
