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

export default function CartPage() {
  const { items, cartTotal, removeItem, updateQuantity } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const total = mounted ? cartTotal() : 0;
  const progressToFreeShipping = Math.min((total / BRAND.freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(BRAND.freeShippingThreshold - total, 0);

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
              <div key={item.cartItemId} className="border-b border-border pb-6 flex gap-4 relative">
                <button onClick={() => removeItem(item.cartItemId)} className="absolute top-0 right-0 p-2 text-text-muted hover:text-text">
                  <X className="w-4 h-4" />
                </button>
                <div className="w-24 h-32 bg-neutral-50 rounded-sm flex-shrink-0 relative overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />}
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="font-serif text-lg pr-8">{item.name}</h3>
                  {item.isGiftWrapped && (
                    <p className="text-xs text-[var(--color-primary)] font-medium mt-1 uppercase tracking-widest">+ Gift Wrapped (₹500)</p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex border border-[var(--color-border)]">
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-3 py-1 hover:bg-[var(--color-accent-light)]">-</button>
                      <span className="px-4 py-1 border-x border-[var(--color-border)]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-3 py-1 hover:bg-[var(--color-accent-light)]">+</button>
                    </div>
                    <span className="font-sans font-medium text-[var(--color-primary)]">
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
              <span className="text-gold font-medium">{total >= BRAND.freeShippingThreshold ? 'Free' : `₹${BRAND.shippingCost.toLocaleString('en-IN')}`}</span>
            </div>
            
            <div className="flex justify-between py-4 font-serif text-xl border-b border-border">
              <span>Total</span>
              <span>₹{(total + (total >= BRAND.freeShippingThreshold || total === 0 ? 0 : BRAND.shippingCost)).toLocaleString('en-IN')}</span>
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
                trackBeginCheckout(total, items);
                window.location.href = '/checkout/address';
              }}
              disabled={!mounted || items.length === 0}
              className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs py-4 hover:bg-[var(--color-secondary)] transition-colors mt-6 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Address
            </button>

            <div className="mt-6 flex gap-3 items-center justify-center border-t border-border pt-4 opacity-70 grayscale">
              <svg viewBox="0 0 50 16" className="h-4 w-auto"><path fill="#1434CB" d="M21.93 1.05h3.42L23.1 15.5H19.7zm16.92 14.45h3.36l2.12-14.45h-3.36zm-7.6-14.28c-1.63-.44-3.5-.72-5.18-.72-5.46 0-9.29 2.83-9.33 6.91-.04 3 2.68 4.67 4.75 5.67 2.12 1.02 2.84 1.68 2.84 2.6-.02 1.4-1.7 2.05-3.26 2.05-2.07 0-3.32-.3-4.73-.93l-.66-.31L9 16c1.3.6 3.65 1.1 5.95 1.1 5.75 0 9.53-2.77 9.57-7.07.03-2.4-1.38-4.22-4.52-5.68-1.9-.94-3.07-1.57-3.07-2.54.02-.9.1-1.77 2.92-1.77 1.54 0 2.6.28 3.52.66l.4.18zM10.87 1.05L8.43 11l-.3-1.46C7.23 6.2 5.34 3.75 3 2.5L2.52 2.3l2.67 13.2h3.45L14.42 1.05z"/><path fill="#F5A623" d="M3 2.5v.02C1 3.2 0 4.68 0 7.82l.06-.32C.46 5.56 1.83 2.5 3 2.5z"/></svg>
              <svg viewBox="0 0 32 20" className="h-5 w-auto"><circle cx="10" cy="10" r="10" fill="#EB001B"/><circle cx="22" cy="10" r="10" fill="#F79E1B"/><path fill="#FF5F00" d="M16 10c0-3.3 1.9-6.2 4.7-7.9-2.8-1.7-6.6-1.7-9.4 0C14.1 3.8 16 6.7 16 10z"/></svg>
              <svg viewBox="0 0 24 24" className="h-6 w-auto" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
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
