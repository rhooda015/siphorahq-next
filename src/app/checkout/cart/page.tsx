"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ChevronLeft } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { STATIC_PRODUCTS } from '@/data/products';
import { trackBeginCheckout } from '@/lib/analytics';
import ProductCard from '@/components/ProductCard';

  const cartTotal = 25500;
  const progressToFreeShipping = Math.min((cartTotal / BRAND.freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(BRAND.freeShippingThreshold - cartTotal, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-light">Shopping Cart</h1>
        <Link href="/products" className="hidden md:flex ml-auto items-center text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
      
      <div className="lg:flex gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          
          {/* Free Shipping Progress Bar */}
          <div className="bg-[var(--color-accent-light)] p-4 border border-[var(--color-border)] mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-sans font-medium text-[var(--color-primary)]">
                {remainingForFreeShipping > 0 
                  ? `You are ₹${remainingForFreeShipping.toLocaleString('en-IN')} away from Free Shipping!` 
                  : `Congratulations! You've unlocked Free Shipping.`}
              </span>
            </div>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[var(--color-border)]">
              <div 
                className="bg-green-500 h-full transition-all duration-500" 
                style={{ width: `${progressToFreeShipping}%` }}
              ></div>
            </div>
          </div>
          <div className="border-b border-border pb-6 flex gap-4 relative">
            <button className="absolute top-0 right-0 p-2 text-text-muted hover:text-text">
              <X className="w-4 h-4" />
            </button>
            <div className="w-24 h-32 bg-ivory rounded-sm flex-shrink-0 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted uppercase">Image</div>
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="font-serif text-lg pr-8">Siphorahq 46-Piece Dinner Set | Aesthetic Gold Pattern</h3>
              <p className="text-[var(--color-text-muted)] text-sm mt-1">Color: White & Gold</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex border border-[var(--color-border)]">
                  <button className="px-3 py-1 hover:bg-[var(--color-accent-light)]">-</button>
                  <span className="px-4 py-1 border-x border-[var(--color-border)]">1</span>
                  <button className="px-3 py-1 hover:bg-[var(--color-accent-light)]">+</button>
                </div>
                <span className="font-sans font-medium text-[var(--color-primary)]">₹25,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <div className="bg-bg p-6 border border-border sticky top-24">
            <h3 className="font-serif text-xl mb-4">Order Summary</h3>
            
            <div className="flex justify-between py-3 text-sm font-sans text-text-muted border-b border-border">
              <span>Subtotal</span>
              <span className="text-text font-medium">₹9,500</span>
            </div>
            <div className="flex justify-between py-3 text-sm font-sans text-text-muted border-b border-border">
              <span>Shipping</span>
              <span className="text-gold font-medium">Free</span>
            </div>
            
            <div className="flex justify-between py-4 font-serif text-xl border-b border-border">
              <span>Total</span>
              <span>₹9,500</span>
            </div>

            <div className="mt-6">
              <label className="text-xs font-sans font-medium text-text uppercase tracking-widest mb-2 block">Discount Code</label>
              <div className="flex">
                <input type="text" className="flex-1 bg-white border border-border border-r-0 px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
                <button className="bg-text text-white px-4 text-xs uppercase tracking-widest font-medium hover:bg-gold transition-colors">Apply</button>
              </div>
            </div>

            <button 
              onClick={() => {
                trackBeginCheckout(cartTotal, [{item_name: 'Dinner Set', price: 25500, quantity: 1}]);
                window.location.href = '/checkout/address';
              }}
              className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs py-4 hover:bg-[var(--color-secondary)] transition-colors mt-6 font-medium"
            >
              Continue to Address
            </button>

            <div className="mt-6 flex gap-4 items-center justify-center border-t border-border pt-4">
              <span className="text-[10px] text-neutral-500 font-medium">SECURE CHECKOUT</span>
              <span className="text-xs text-neutral-500 font-medium">VISA</span>
              <span className="text-xs text-neutral-500 font-medium">UPI</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Shopping CTA (Mobile) */}
      <div className="mt-8 md:hidden">
        <Link href="/products" className="flex items-center justify-center border border-[var(--color-primary)] text-[var(--color-primary)] py-4 text-xs font-sans font-medium uppercase tracking-widest hover:bg-[var(--color-accent-light)] transition-colors">
          Continue Shopping
        </Link>
      </div>

      {/* Cross-Sell Section */}
      <div className="mt-24 pt-12 border-t border-[var(--color-border)]">
        <h2 className="text-2xl md:text-3xl font-serif italic text-[var(--color-primary)] text-center mb-10">Frequently Bought Together</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {STATIC_PRODUCTS.filter(p => p.category === 'serveware' || p.category === 'tea-set').slice(0, 4).map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}
