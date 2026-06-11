"use client";

import React, { useEffect, useState } from 'react';
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
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 bg-gradient-to-t from-black/60 to-transparent pb-4 pt-12">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowQuickView(true);
          }}
          className="w-full bg-white/95 backdrop-blur-md text-[#1A1A1A] uppercase tracking-[0.2em] text-[10px] font-medium py-3 hover:bg-white transition-colors shadow-lg"
        >
          Quick View
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product, 1);
            trackAddToCart(product, 1);
            toast.success(`${product.name} added to cart`);
          }}
          className="w-full bg-[#1A1A1A] text-white uppercase tracking-[0.2em] text-[10px] font-medium py-3 hover:bg-[#2C2C2C] transition-colors shadow-lg"
        >
          Add to Cart
        </button>
      </div>

      <button 
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-[#8C8C8C] transition-all duration-500 z-10 hover:bg-white hover:text-[#1A1A1A] hover:scale-105 ${isWished ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-colors" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-default" 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickView(false); }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#FAF9F7] p-6 max-w-3xl w-full flex flex-col md:flex-row gap-8 relative shadow-2xl overflow-hidden" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-black z-10 transition-colors" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickView(false); }}
              >
                ✕
              </button>
              <div className="w-full md:w-1/2 aspect-[4/5] relative bg-white border border-[#EAE3D8] overflow-hidden">
                 <Image 
                   src={(product.images?.[0]?.url) || product.image || product.img || '/images/dinnerware.webp'} 
                   alt={product.name} 
                   fill
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-cover" 
                 />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                 <h2 className="text-3xl font-serif text-[var(--color-primary)] mb-3 leading-tight">{product.name}</h2>
                 <p className="text-xl font-sans text-[var(--color-primary)] mb-6">
                   ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                 </p>
                 <p className="text-sm font-sans text-[var(--color-text-muted)] mb-8 leading-relaxed line-clamp-4">
                   {product.description || 'Elevate your everyday dining with this premium handcrafted porcelain piece. Designed for timeless elegance and luxury.'}
                 </p>
                 
                 <button 
                   onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     addItem(product, 1);
                     trackAddToCart(product, 1);
                     setShowQuickView(false);
                     toast.success(`${product.name} added to cart`);
                   }}
                   className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs font-medium py-4 hover:bg-[#1a2520] transition-colors mb-3 shadow-sm"
                 >
                   Add to Cart
                 </button>
                 <button 
                   onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = `/products/${product.id || product.slug || '1'}`;
                   }}
                   className="w-full bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] uppercase tracking-widest text-xs font-medium py-4 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                 >
                   View Full Details
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
