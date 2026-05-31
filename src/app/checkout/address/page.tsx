"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function AddressPage() {
  const [pincode, setPincode] = useState('');
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      {/* Checkout Steps */}
      <div className="flex items-center text-xs font-sans text-text-muted mb-8 justify-center">
        <Link href="/checkout/cart" className="hover:text-text">Cart</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="font-medium text-text">Address</span>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="opacity-50">Payment</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-light mb-8 text-center">Shipping Details</h1>

        <div className="bg-bg border border-border p-6 md:p-8">
          <form className="flex flex-col gap-6">
            <h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Email</label>
                <input type="email" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Phone (WhatsApp)</label>
                <input type="tel" inputMode="numeric" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
            </div>

            <h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2 mt-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">First Name</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Last Name</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Address Line 1</label>
              <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Pincode</label>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" 
                />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">City</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold bg-neutral-50" readOnly value={pincode.length === 6 ? 'New Delhi' : ''} />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">State</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold bg-neutral-50" readOnly value={pincode.length === 6 ? 'Delhi' : ''} />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link href="/checkout/payment" className="w-full md:w-auto">
                <button type="button" className="w-full md:w-auto btn-primary">Continue to Payment</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
