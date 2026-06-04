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
      <div className="mt-8 py-5 border-[0.5px] border-[var(--color-border)] bg-[#fdfbf9] text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">Guaranteed Safe Checkout</p>
        <div className="flex justify-center items-center gap-5">
          {/* Visa */}
          <div className="bg-white border border-gray-200 py-1 px-2 rounded-sm shadow-sm flex items-center justify-center">
            <svg className="h-5 w-auto" viewBox="0 0 32 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.075 0.354004L11.554 9.689H8.441L9.123 6.452C9.28 5.711 9.423 4.966 9.544 4.225C9.405 4.945 9.176 5.65 8.854 6.312L5.803 9.689H2.433L0.015 0.354004H3.256L4.478 6.007C4.659 6.848 4.825 7.695 4.975 8.544C5.064 7.643 5.234 6.751 5.485 5.882L7.151 0.354004H10.596L14.075 0.354004Z" fill="#1434CB"/>
              <path d="M18.891 0.354004L16.37 9.689H13.257L15.778 0.354004H18.891Z" fill="#1434CB"/>
              <path d="M25.794 0.354004C27.172 0.354004 28.324 0.901004 28.784 2.235C28.877 2.493 28.91 2.766 28.883 3.037L28.353 5.011C28.243 5.385 27.971 5.69 27.595 5.861C26.549 6.35 25.433 6.643 24.281 6.721C23.633 6.758 23.364 6.551 23.473 6.166L23.778 5.034C23.905 4.606 24.316 4.315 24.763 4.293C25.541 4.256 26.305 4.095 27.037 3.815C27.354 3.693 27.525 3.398 27.464 3.072L27.423 2.915C27.351 2.651 27.135 2.457 26.865 2.417C25.486 2.229 24.088 2.23 22.71 2.421C22.062 2.502 21.602 3.013 21.602 3.673C21.602 4.417 22.091 4.887 23.123 5.253C24.498 5.728 25.59 6.273 25.109 8.016C24.795 9.155 23.829 9.878 22.259 9.878C20.655 9.878 19.06 9.489 17.653 8.749C17.078 8.441 16.924 7.685 17.29 7.151L18.17 5.879C18.423 5.516 18.91 5.4 19.313 5.596C20.485 6.182 21.758 6.527 23.056 6.613C23.639 6.645 23.921 6.425 23.81 5.922L23.513 4.808C23.385 4.407 22.986 4.143 22.562 4.167C21.109 4.225 19.673 4.544 18.337 5.111C18.069 5.215 17.771 5.176 17.534 5.01C17.332 4.862 17.202 4.63 17.18 4.382C17.155 3.903 17.155 3.424 17.18 2.944C17.228 2.222 17.64 1.583 18.28 1.226C20.584 0.0570042 23.155 -0.210996 25.794 0.354004Z" fill="#1434CB"/>
              <path d="M31.985 0.354004L29.626 9.689H26.549L27.601 5.578C27.765 4.966 27.917 4.351 28.058 3.731C28.261 4.526 28.514 5.308 28.815 6.071L30.126 9.689H31.985V0.354004Z" fill="#1434CB"/>
            </svg>
          </div>
          {/* Mastercard */}
          <div className="bg-white border border-gray-200 py-1 px-2 rounded-sm shadow-sm flex items-center justify-center">
            <svg className="h-5 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10.5" cy="10" r="9.5" fill="#EB001B"/>
              <circle cx="21.5" cy="10" r="9.5" fill="#F79E1B"/>
              <path d="M16 17.766C14.073 16.035 12.875 13.593 12.875 10C12.875 6.406 14.073 3.964 16 2.234C17.927 3.964 19.125 6.406 19.125 10C19.125 13.593 17.927 16.035 16 17.766Z" fill="#FF5F00"/>
            </svg>
          </div>
          {/* Amex / Generic Card */}
          <div className="bg-white border border-gray-200 py-1 px-2 rounded-sm shadow-sm flex items-center justify-center">
            <svg className="h-5 w-auto text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
