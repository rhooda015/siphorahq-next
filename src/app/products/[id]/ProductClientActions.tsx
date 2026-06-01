"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShieldCheck, Truck, Package, RotateCcw } from 'lucide-react';
import { trackAddToCart } from '@/lib/analytics';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';

export default function ProductClientActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    trackAddToCart(product, quantity);
    addItem(product, quantity, isGiftWrapped);
  };

  const handleBuyNow = () => {
    trackAddToCart(product, quantity);
    addItem(product, quantity, isGiftWrapped);
    router.push('/checkout/cart');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Stock Urgency */}
      {product.stock && product.stock < 10 && (
        <div className="mb-4 mt-2 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-sans font-medium text-red-600">Only {product.stock} left in stock - order soon!</span>
        </div>
      )}

      {/* Gift Packaging Add-on */}
      <div className="mb-6 p-3 border border-[var(--color-border)] bg-[var(--color-bg)] flex items-start gap-3">
        <input 
          type="checkbox" 
          id="gift-wrap" 
          checked={isGiftWrapped}
          onChange={(e) => setIsGiftWrapped(e.target.checked)}
          className="mt-1 accent-[var(--color-primary)]" 
        />
        <label htmlFor="gift-wrap" className="cursor-pointer flex-1">
          <span className="block text-sm font-sans font-medium text-[var(--color-primary)]">Add Premium Gift Packaging (+₹500)</span>
          <span className="block text-xs font-sans text-[var(--color-text-muted)] mt-1">Includes a luxury box, satin ribbon, and personalized card.</span>
        </label>
        <Package className="w-5 h-5 text-[var(--color-primary)] opacity-70" />
      </div>

      {/* Actions (Sticky on Mobile) */}
      <div className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t border-[var(--color-border)] md:border-none z-30 flex flex-col gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-auto md:h-14">
          <div className="hidden md:flex border border-[var(--color-border)] items-center bg-white flex-shrink-0">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] h-full"><Minus className="w-4 h-4" /></button>
            <span className="w-8 text-center font-sans text-sm">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] h-full"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-3 h-12 md:h-full w-full">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs font-medium hover:bg-[var(--color-secondary)] transition-colors h-full"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 md:hidden bg-[var(--color-secondary)] text-white uppercase tracking-widest text-xs font-medium transition-colors h-full"
            >
              Buy Now
            </button>
          </div>
        </div>
        
        {/* Desktop Buy Now */}
        <button 
          onClick={handleBuyNow}
          className="w-full hidden md:block bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] uppercase tracking-widest text-xs py-4 font-medium hover:bg-[var(--color-accent-light)] transition-colors mt-2"
        >
          Buy It Now
        </button>
      </div>

      {/* Trust & Shipping Signals */}
      <div className="mt-8 pt-6 border-t border-[var(--color-border)] grid grid-cols-2 gap-y-4 gap-x-2">
        <div className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-muted)]">
          <Truck className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Delivery in 3-5 Business Days</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-muted)]">
          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-[10px]">₹</div>
          <span>Cash on Delivery Available</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-muted)]">
          <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
          <span>100% Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-muted)]">
          <RotateCcw className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Easy 7-Day Returns</span>
        </div>
      </div>
      
      {/* Checkout Badges */}
      <div className="mt-6 flex justify-center items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
         <svg viewBox="0 0 50 16" className="h-4 w-auto"><path fill="#1434CB" d="M21.93 1.05h3.42L23.1 15.5H19.7zm16.92 14.45h3.36l2.12-14.45h-3.36zm-7.6-14.28c-1.63-.44-3.5-.72-5.18-.72-5.46 0-9.29 2.83-9.33 6.91-.04 3 2.68 4.67 4.75 5.67 2.12 1.02 2.84 1.68 2.84 2.6-.02 1.4-1.7 2.05-3.26 2.05-2.07 0-3.32-.3-4.73-.93l-.66-.31L9 16c1.3.6 3.65 1.1 5.95 1.1 5.75 0 9.53-2.77 9.57-7.07.03-2.4-1.38-4.22-4.52-5.68-1.9-.94-3.07-1.57-3.07-2.54.02-.9.1-1.77 2.92-1.77 1.54 0 2.6.28 3.52.66l.4.18zM10.87 1.05L8.43 11l-.3-1.46C7.23 6.2 5.34 3.75 3 2.5L2.52 2.3l2.67 13.2h3.45L14.42 1.05z"/><path fill="#F5A623" d="M3 2.5v.02C1 3.2 0 4.68 0 7.82l.06-.32C.46 5.56 1.83 2.5 3 2.5z"/></svg>
         <svg viewBox="0 0 32 20" className="h-5 w-auto"><circle cx="10" cy="10" r="10" fill="#EB001B"/><circle cx="22" cy="10" r="10" fill="#F79E1B"/><path fill="#FF5F00" d="M16 10c0-3.3 1.9-6.2 4.7-7.9-2.8-1.7-6.6-1.7-9.4 0C14.1 3.8 16 6.7 16 10z"/></svg>
         <svg viewBox="0 0 24 24" className="h-6 w-auto" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
      </div>
    </div>
  );
}
