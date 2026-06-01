"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface CartItem {
  cartItemId: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  image?: string;
  isGiftWrapped?: boolean;
}

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  total: number;
  shippingCost: number;
  freeShippingThreshold: number;
  finalAmount: number;
  isPaymentPage?: boolean;
}

export default function CheckoutOrderSummary({ 
  items, 
  total, 
  shippingCost, 
  freeShippingThreshold, 
  finalAmount,
  isPaymentPage = false
}: CheckoutOrderSummaryProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SummaryContent = () => (
    <>
      <div className="flex flex-col gap-4 max-h-[40vh] lg:max-h-none overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex gap-4 relative">
            <div className="w-16 h-20 bg-neutral-50 rounded-sm flex-shrink-0 relative overflow-hidden border border-[var(--color-border)]">
              {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />}
              <span className="absolute -top-2 -right-2 bg-neutral-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10 font-sans">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-col flex-1 py-1">
              <h3 className="font-serif text-sm leading-tight text-[var(--color-text)]">{item.name}</h3>
              {item.isGiftWrapped && (
                <p className="text-[9px] text-[var(--color-primary)] font-medium mt-1 uppercase tracking-widest">+ Gift Wrapped</p>
              )}
              <span className="font-sans font-medium text-[var(--color-text)] text-sm mt-auto">
                ₹{((item.salePrice || item.price) * item.quantity + (item.isGiftWrapped ? 500 * item.quantity : 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
        <div className="flex justify-between py-2 text-sm font-sans text-[var(--color-text-muted)]">
          <span>Subtotal</span>
          <span className="text-[var(--color-text)] font-medium">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between py-2 text-sm font-sans text-[var(--color-text-muted)]">
          <span>Shipping</span>
          <span className="text-[var(--color-primary)] font-medium">{total >= freeShippingThreshold ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`}</span>
        </div>
        <div className="flex justify-between py-4 mt-2 border-t border-[var(--color-border)] font-serif text-xl">
          <span>Total</span>
          <span className="text-[var(--color-text)]">₹{finalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {isPaymentPage && (
        <div className="mt-6 border border-[var(--color-border)] bg-white p-4 flex gap-4 items-start rounded-sm shadow-sm">
          <ShieldCheck className="w-5 h-5 text-green-700 flex-shrink-0" />
          <div>
            <p className="text-xs font-sans font-medium uppercase tracking-widest text-[var(--color-text)]">100% Secure Checkout</p>
            <p className="text-xs font-sans text-[var(--color-text-muted)] mt-1 leading-relaxed">Your payment information is encrypted and securely processed.</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Accordion */}
      <div className="lg:hidden bg-[var(--color-bg)] border-y border-[var(--color-border)] mb-8 -mx-4">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between p-4 bg-[var(--color-accent-light)]"
        >
          <span className="flex items-center text-sm font-sans font-medium text-[var(--color-primary)]">
            {isMobileOpen ? 'Hide' : 'Show'} order summary
            {isMobileOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </span>
          <span className="font-serif text-lg font-medium text-[var(--color-text)]">
            ₹{finalAmount.toLocaleString('en-IN')}
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out px-4 ${isMobileOpen ? 'max-h-[1000px] py-6 opacity-100' : 'max-h-0 opacity-0'}`}>
          <SummaryContent />
        </div>
      </div>

      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block lg:w-1/3">
        <div className="bg-[var(--color-bg)] p-6 border border-[var(--color-border)] sticky top-24 rounded-sm shadow-sm">
          <h3 className="font-serif text-xl mb-6">Order Summary</h3>
          <SummaryContent />
        </div>
      </div>
    </>
  );
}
