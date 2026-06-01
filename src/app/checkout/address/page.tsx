"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';

export default function AddressPage() {
  const router = useRouter();
  const { setCustomerDetails, customerDetails } = useCart();
  
  const [email, setEmail] = useState(customerDetails?.email || '');
  const [phone, setPhone] = useState(customerDetails?.phone || '');
  const [firstName, setFirstName] = useState(customerDetails?.firstName || '');
  const [lastName, setLastName] = useState(customerDetails?.lastName || '');
  const [addressLine1, setAddressLine1] = useState(customerDetails?.addressLine1 || '');
  const [pincode, setPincode] = useState(customerDetails?.pincode || '');
  const [city, setCity] = useState(customerDetails?.city || '');
  const [state, setState] = useState(customerDetails?.state || '');

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);

    if (val.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District || postOffice.Block || postOffice.Name);
          setState(postOffice.State);
        } else {
          setCity('');
          setState('');
        }
      } catch (err) {
        console.error("Error fetching pincode", err);
      }
    } else {
      setCity('');
      setState('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerDetails({
      email,
      phone,
      firstName,
      lastName,
      addressLine1,
      pincode,
      city,
      state
    });
    router.push('/checkout/payment');
  };
  
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
          {/* Express Checkout Section */}
          <div className="mb-8">
            <h3 className="text-center font-sans font-medium text-xs text-text-muted uppercase tracking-widest mb-4">Express Checkout</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-sm hover:bg-neutral-800 transition-colors">
                <CreditCard className="w-5 h-5" />
                <span className="font-medium tracking-wide">Pay</span>
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#5A31F4] text-white py-3 rounded-sm hover:bg-[#4a26cc] transition-colors">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-medium tracking-wide">Shop Pay</span>
              </button>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-xs font-sans text-text-muted uppercase tracking-widest">OR CONTINUE WITH EMAIL</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Email *</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Phone (WhatsApp) *</label>
                <input type="tel" inputMode="numeric" required pattern="[0-9]{10}" title="10 digit phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
            </div>

            <h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2 mt-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">First Name *</label>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Last Name *</label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Address Line 1 *</label>
              <input type="text" required value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">Pincode *</label>
                <input 
                  type="text" 
                  inputMode="numeric" 
                  required
                  pattern="[0-9]{6}"
                  title="6 digit pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" 
                />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">City</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold bg-neutral-50" readOnly value={city} />
              </div>
              <div>
                <label className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1 block">State</label>
                <input type="text" className="w-full bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold bg-neutral-50" readOnly value={state} />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button type="submit" className="w-full md:w-auto btn-primary">Continue to Payment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
