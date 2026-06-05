"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, CreditCard, ShieldCheck, Truck, Lock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { BRAND } from '@/config/brand';
import CheckoutProgress from '@/components/CheckoutProgress';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary';

export default function AddressPage() {
  const router = useRouter();
  const { setCustomerDetails, customerDetails, items, cartTotal } = useCart();
  
  const [email, setEmail] = useState(customerDetails?.email || '');
  const [phone, setPhone] = useState(customerDetails?.phone || '');
  const [firstName, setFirstName] = useState(customerDetails?.firstName || '');
  const [lastName, setLastName] = useState(customerDetails?.lastName || '');
  const [addressLine1, setAddressLine1] = useState(customerDetails?.addressLine1 || '');
  const [pincode, setPincode] = useState(customerDetails?.pincode || '');
  const [city, setCity] = useState(customerDetails?.city || '');
  const [state, setState] = useState(customerDetails?.state || '');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const applyAddress = (addr: any) => {
    const parts = (addr.fullName || '').split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setAddressLine1(addr.street || '');
    setPincode(addr.pincode || '');
    setCity(addr.city || '');
    setState(addr.state || '');
    if (addr.mobile) setPhone(addr.mobile);
    if (addr.pincode?.length === 6) setPincodeStatus('success');
  };

  useEffect(() => {
    setMounted(true);
    if (customerDetails?.pincode && customerDetails.pincode.length === 6 && customerDetails.city) {
      setPincodeStatus('success');
    }
    fetch('/api/user/addresses')
      .then(r => r.json())
      .then(data => {
        if (data.addresses && data.addresses.length > 0) {
          setSavedAddresses(data.addresses);
          const def = data.addresses.find((a: any) => a.isDefault) || data.addresses[0];
          if (def) { applyAddress(def); setSelectedAddressId(def._id); }
        }
      })
      .catch(() => {});
  }, []);

  const total = mounted ? cartTotal() : 0;
  const finalAmount = total + (total >= BRAND.freeShippingThreshold || total === 0 ? 0 : BRAND.shippingCost);

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);

    if (val.length === 6) {
      setPincodeStatus('loading');
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District || postOffice.Block || postOffice.Name);
          setState(postOffice.State);
          setPincodeStatus('success');
        } else {
          setCity('');
          setState('');
          setPincodeStatus('error');
        }
      } catch (err) {
        console.error("Error fetching pincode", err);
        setPincodeStatus('error');
      }
    } else {
      setCity('');
      setState('');
      setPincodeStatus('idle');
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
      <CheckoutProgress currentStep="address" />

      <div className="max-w-6xl mx-auto lg:flex gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-serif font-light mb-8 lg:mb-12">Shipping Details</h1>

        <div className="bg-bg border border-border p-6 md:p-8">
          {savedAddresses.length > 0 && (<div className="mb-6"><h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2 mb-3">Saved Addresses</h3><div className="flex flex-col gap-2">{savedAddresses.map((addr: any) => (<div key={addr._id} onClick={() => { applyAddress(addr); setSelectedAddressId(addr._id); }} className={`p-3 border cursor-pointer rounded-sm text-sm transition-colors ${selectedAddressId === addr._id ? "border-black bg-gray-50" : "border-border hover:border-gray-400"}`}><div className="font-medium">{addr.fullName}</div><div className="text-text-muted">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</div><div className="text-text-muted">{addr.mobile}</div></div>))}</div><div className="mt-3 mb-4 flex items-center"><div className="flex-1 border-t border-border"></div><span className="px-4 text-xs font-sans text-text-muted uppercase tracking-widest">OR ENTER NEW ADDRESS</span><div className="flex-1 border-t border-border"></div></div></div>)}
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
                <label className="text-xs font-sans text-[var(--color-text-muted)] uppercase tracking-widest mb-1 block">Pincode *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    inputMode="numeric" 
                    required
                    pattern="[0-9]{6}"
                    title="6 digit pincode"
                    value={pincode}
                    onChange={handlePincodeChange}
                    className={`w-full bg-white border px-3 py-2 text-sm font-sans outline-none pr-10 transition-colors
                      ${pincodeStatus === 'error' ? 'border-red-500 focus:border-red-500 bg-red-50' 
                      : pincodeStatus === 'success' ? 'border-green-500 focus:border-green-500 bg-green-50' 
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`} 
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {pincodeStatus === 'loading' && <Loader2 className="w-4 h-4 text-[var(--color-text-muted)] animate-spin" />}
                    {pincodeStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {pincodeStatus === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                {pincodeStatus === 'error' && (
                  <p className="text-[10px] font-sans text-red-500 mt-1 uppercase tracking-widest">We currently do not deliver to this pincode.</p>
                )}
                {pincodeStatus === 'success' && (
                  <p className="text-[10px] font-sans text-green-600 mt-1 uppercase tracking-widest">Delivery available to your location.</p>
                )}
              </div>
              <div>
                <label className="text-xs font-sans text-[var(--color-text-muted)] uppercase tracking-widest mb-1 block">City</label>
                <input type="text" className="w-full bg-neutral-50 border border-[var(--color-border)] px-3 py-2 text-sm font-sans outline-none text-[var(--color-text-muted)]" readOnly value={city} />
              </div>
              <div>
                <label className="text-xs font-sans text-[var(--color-text-muted)] uppercase tracking-widest mb-1 block">State</label>
                <input type="text" className="w-full bg-neutral-50 border border-[var(--color-border)] px-3 py-2 text-sm font-sans outline-none text-[var(--color-text-muted)]" readOnly value={state} />
              </div>
            </div>

            {/* Delivery Trust Signals */}
            <div className="mt-4 pt-6 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-xs font-sans font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Free Shipping Across India</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-xs font-sans font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Cash on Delivery Available</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-xs font-sans font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Secure Razorpay Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-xs font-sans font-medium text-[var(--color-text-muted)] uppercase tracking-widest">Est. Delivery: 3–7 Business Days</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button type="submit" disabled={pincodeStatus !== 'success'} className="w-full md:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
        </div>
        {mounted && (
          <CheckoutOrderSummary 
            items={items}
            total={total}
            shippingCost={BRAND.shippingCost}
            freeShippingThreshold={BRAND.freeShippingThreshold}
            finalAmount={finalAmount}
          />
        )}
      </div>
    </div>
  );
}
