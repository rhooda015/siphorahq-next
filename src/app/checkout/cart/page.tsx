"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ChevronLeft } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { STATIC_PRODUCTS } from '@/data/products';
import { trackBeginCheckout } from '@/lib/analytics';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/store/useCart';
import { useStoreSettings } from '@/providers/SettingsProvider';

export default function CartPage() {
  const { items, cartTotal, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = React.useState(false);
  const [isPromoOpen, setIsPromoOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { shippingCost, freeShippingThreshold } = useStoreSettings();

  const total = mounted ? cartTotal() : 0;
  const progressToFreeShipping = Math.min((total / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0);

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

          {!mounted || items.length === 0 ? (
            <div className="py-12 text-center border border-[var(--color-border)] bg-white">
              <h2 className="font-serif text-2xl mb-4">Your cart is empty</h2>
              <p className="text-[var(--color-text-muted)] mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products">
                <button className="btn-primary inline-flex">Continue Shopping</button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="border-b border-border pb-6 flex gap-4 md:gap-6 relative group">
                <button onClick={() => removeItem(item.cartItemId)} className="absolute top-0 right-0 p-1 text-text-muted hover:text-text transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-32 h-40 md:w-44 md:h-52 bg-neutral-50 rounded-sm flex-shrink-0 relative overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(min-width: 768px) 176px, 128px" />}
                </div>
                <div className="flex flex-col flex-1 py-1">
                  <h3 className="font-serif text-lg md:text-xl pr-8 leading-tight">{item.name}</h3>
                  {item.isGiftWrapped && (
                    <p className="text-[10px] md:text-xs text-[var(--color-primary)] font-medium mt-1.5 uppercase tracking-widest">+ Gift Wrapped (₹500)</p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex border border-[var(--color-border)] h-9">
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-3 hover:bg-[var(--color-accent-light)] transition-colors">-</button>
                      <span className="px-4 flex items-center border-x border-[var(--color-border)] text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-3 hover:bg-[var(--color-accent-light)] transition-colors">+</button>
                    </div>
                    <span className="font-sans font-medium text-[var(--color-primary)] text-base md:text-lg">
                      ₹{((item.salePrice || item.price) * item.quantity + (item.isGiftWrapped ? 500 * item.quantity : 0)).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 mt-12 lg:mt-0">
          <div className="bg-bg p-6 border border-border sticky top-24">
            <h3 className="font-serif text-xl mb-4">Order Summary</h3>
            
            <div className="flex justify-between py-3 text-sm font-sans text-text-muted border-b border-border">
              <span>Subtotal</span>
              <span className="text-text font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-3 text-sm font-sans text-text-muted border-b border-border">
              <span>Shipping</span>
              <span className="text-gold font-medium">{total >= freeShippingThreshold ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
            </div>
            
            <div className="flex justify-between py-4 font-serif text-xl border-b border-border">
              <span>Total</span>
              <span>₹{(total + (total >= freeShippingThreshold || total === 0 ? 0 : shippingCost)).toLocaleString('en-IN')}</span>
            </div>

            <div className="mt-8 border-t border-[var(--color-border)] pt-5">
              <button 
                onClick={() => setIsPromoOpen(!isPromoOpen)}
                className="w-full flex items-center justify-between text-sm font-sans text-text hover:text-[var(--color-primary)] transition-colors"
              >
                <span className="font-medium tracking-wide">Have a gift card or discount code?</span>
                <span className="text-lg font-light">{isPromoOpen ? '-' : '+'}</span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPromoOpen ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Enter Code"
                    className="flex-1 bg-white border border-[var(--color-border)] border-r-0 px-4 py-3 text-sm font-sans outline-none focus:border-[var(--color-primary)] placeholder:text-neutral-400" 
                  />
                  <button className="bg-text text-white px-6 text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-primary)] transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                trackBeginCheckout(total, items);
                window.location.href = '/checkout/address';
              }}
              disabled={!mounted || items.length === 0}
              className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs py-4 hover:bg-[var(--color-secondary)] transition-colors mt-6 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Address
            </button>

            <div className="mt-6 border-t border-[var(--color-border)] pt-6 text-center">
              <div className="flex gap-3 items-center justify-center">
                {/* Visa */}
                <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                  <span className="font-bold italic text-[12px] tracking-tight text-[#1434CB] font-serif">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm gap-0.5">
                  <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90 -mr-1.5 z-10"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90"></div>
                </div>
                {/* Amex */}
                <div className="w-10 h-6 bg-[#2671B9] border border-gray-200 rounded flex items-center justify-center shadow-sm">
                  <span className="font-bold text-[8px] text-white tracking-tighter">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Shopping CTA (Mobile) */}
      <div className="mt-8 md:hidden mb-12">
        <Link href="/products" className="flex items-center justify-center border border-[var(--color-primary)] text-[var(--color-primary)] py-4 text-xs font-sans font-medium uppercase tracking-widest hover:bg-[var(--color-accent-light)] transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
