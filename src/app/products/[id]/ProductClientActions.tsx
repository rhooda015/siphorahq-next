"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShieldCheck, Truck, Package, RotateCcw } from 'lucide-react';
import { trackAddToCart } from '@/lib/analytics';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import StickyAddToCart from '@/components/StickyAddToCart';

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
      <div id="main-atc-section" className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-3 md:p-0 border-t border-[var(--color-border)] md:border-none z-50 flex flex-col gap-2 md:gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none">
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

      <StickyAddToCart 
        product={{
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          image: product.image
        }} 
        targetId="main-atc-section" 
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
