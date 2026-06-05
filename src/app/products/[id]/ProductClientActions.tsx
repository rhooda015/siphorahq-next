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
          <span className="block text-sm font-sans font-medium text-[var(--color-primary)]">Add Premium Gift Packaging (+₹299)</span>
          <span className="block text-xs font-sans text-[var(--color-text-muted)] mt-1">Includes a luxury box, satin ribbon, and personalized card.</span>
        </label>
        <Package className="w-5 h-5 text-[var(--color-primary)] opacity-70" />
      </div>

      {/* Actions (Sticky on Mobile) */}
      <div className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-3 md:p-0 border-t border-[var(--color-border)] md:border-none z-30 flex flex-col gap-2 md:gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
        {/* Mobile Product Info (Only visible when sticky) */}
        <div className="md:hidden flex justify-between items-center mb-1 px-1">
          <span className="font-serif text-[13px] font-medium truncate pr-4 text-[var(--color-primary)]">{product.name}</span>
          <span className="font-sans text-xs text-[var(--color-text-muted)] font-medium">₹{(product.salePrice || product.price).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 h-auto md:h-14">
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
      <div className="mt-8 py-4 px-4 border-[0.5px] border-[var(--color-border)] bg-[#fdfbf9] text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)]">Guaranteed Safe Checkout</p>
        </div>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {/* Visa */}
          <div className="h-8 px-3 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 80 26" className="h-4 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.5 2L28.3 24H22.2L29.4 2H35.5Z" fill="#1434CB"/>
              <path d="M58.2 2.6C56.8 2.1 54.6 1.5 52 1.5C46 1.5 41.7 4.6 41.7 9C41.7 12.2 44.6 14 46.8 15.1C49 16.2 49.8 17 49.8 18C49.8 19.5 47.9 20.3 46.2 20.3C43.8 20.3 42.5 19.9 40.4 19L39.6 18.6L38.7 23.7C40.4 24.4 43.4 25 46.6 25C53 25 57.2 21.9 57.2 17.1C57.2 13.5 54.9 11.7 51.1 10C49.2 9.1 48 8.4 48 7.3C48 6.3 49.1 5.3 51.4 5.3C53.4 5.3 54.8 5.7 56 6.2L56.6 6.5L58.2 2.6Z" fill="#1434CB"/>
              <path d="M68.5 2H63.7C62.3 2 61.2 2.4 60.6 3.8L51.8 24H58.2C58.2 24 59.2 21.3 59.5 20.5H67.4C67.6 21.5 68.3 24 68.3 24H74L68.5 2ZM61.4 15.9C61.8 14.9 64.1 8.8 64.1 8.8C64.1 8.8 64.7 7.2 65.1 6.2L65.6 8.6C65.6 8.6 67 14.8 67.3 15.9H61.4Z" fill="#1434CB"/>
              <path d="M6 2L0 24H6.1L12 2H6Z" fill="#1434CB"/>
              <path d="M11.3 2L5.3 17.5L4.6 14.1C3.4 10.3 0 6.2 0 6.2L5.5 24H12L21 2H11.3Z" fill="#1434CB"/>
            </svg>
          </div>
          {/* Mastercard */}
          <div className="h-8 px-3 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 38 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="38" height="24" rx="4" fill="white"/>
              <circle cx="15" cy="12" r="7" fill="#EB001B"/>
              <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
              <path d="M19 17.2C20.5 15.9 21.5 14.1 21.5 12C21.5 9.9 20.5 8.1 19 6.8C17.5 8.1 16.5 9.9 16.5 12C16.5 14.1 17.5 15.9 19 17.2Z" fill="#FF5F00"/>
            </svg>
          </div>
          {/* RuPay */}
          <div className="h-8 px-3 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
            <span className="font-sans font-bold text-[11px] tracking-wider" style={{color:'#1a6eb5'}}>RuPay</span>
          </div>
          {/* UPI */}
          <div className="h-8 px-3 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
            <span className="font-sans font-bold text-[11px] tracking-wider" style={{color:'#5f259f'}}>UPI</span>
          </div>
          {/* COD */}
          <div className="h-8 px-3 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
            <span className="font-sans font-bold text-[11px] tracking-wider text-green-700">COD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
