"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShieldCheck, Truck, Package, RotateCcw } from 'lucide-react';
import { trackAddToCart } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

export default function ProductClientActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleAddToCart = () => {
    trackAddToCart(product, quantity);
    // In a real app, this would update cart state
    router.push('/checkout/cart');
  };

  const handleBuyNow = () => {
    trackAddToCart(product, quantity);
    router.push('/checkout/cart');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Stock Urgency */}
      <div className="mb-4 mt-2 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-sm font-sans font-medium text-red-600">Only 3 left in stock - order soon!</span>
      </div>

      {/* Gift Packaging Add-on */}
      <div className="mb-6 p-3 border border-[var(--color-border)] bg-[var(--color-bg)] flex items-start gap-3">
        <input type="checkbox" id="gift-wrap" className="mt-1 accent-[var(--color-primary)]" />
        <label htmlFor="gift-wrap" className="cursor-pointer flex-1">
          <span className="block text-sm font-sans font-medium text-[var(--color-primary)]">Add Premium Gift Packaging (+₹500)</span>
          <span className="block text-xs font-sans text-[var(--color-text-muted)] mt-1">Includes a luxury box, satin ribbon, and personalized card.</span>
        </label>
        <Package className="w-5 h-5 text-[var(--color-primary)] opacity-70" />
      </div>

      {/* Actions (Sticky on Mobile) */}
      <div className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t border-[var(--color-border)] md:border-none z-30 flex flex-col gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
        <div className="flex gap-4 h-12 md:h-14">
          <div className="hidden md:flex border border-[var(--color-border)] items-center bg-white">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] h-full"><Minus className="w-4 h-4" /></button>
            <span className="w-8 text-center font-sans text-sm">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] h-full"><Plus className="w-4 h-4" /></button>
          </div>
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
      <div className="mt-6 flex justify-center items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
         {/* Simplified payment icons */}
         <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
         <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
         <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
         <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">UPI</div>
      </div>
    </div>
  );
}
