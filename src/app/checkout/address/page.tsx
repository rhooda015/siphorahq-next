"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, CreditCard, ShieldCheck, Truck, Lock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import CheckoutProgress from '@/components/CheckoutProgress';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary';
import { useStoreSettings } from '@/providers/SettingsProvider';
import { useSession } from 'next-auth/react';

export default function AddressPage() {
  const router = useRouter();
  const { data: session } = useSession();
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
  
  // Accordion toggle state
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const applyAddress = (addr: any) => {
    const parts = (addr.fullName || '').split(' ');
    setFirstName(parts[0] || '');
    setLastName(parts.slice(1).join(' ') || '');
    setAddressLine1(addr.street || '');
    setPincode(addr.pincode || '');
    setCity(addr.city || '');
    setState(addr.state || '');
    if (addr.mobile) setPhone(addr.mobile);
    if (session?.user?.email && !email) setEmail(session.user.email);
    if (addr.pincode?.length === 6) setPincodeStatus('success');
    
    // Auto-collapse manual entry upon valid selection
    setIsAccordionOpen(false);
  };

  const clearAddress = () => {
    setSelectedAddressId(null);
    setIsAccordionOpen(true);
    setFirstName('');
    setLastName('');
    setAddressLine1('');
    setPincode('');
    setCity('');
    setState('');
    setPhone('');
    setPincodeStatus('idle');
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
          if (def) { 
            applyAddress(def); 
            setSelectedAddressId(def._id); 
          }
        }
      })
      .catch(() => {});
  }, [session]);

  const { shippingCost, freeShippingThreshold } = useStoreSettings();

  const total = mounted ? cartTotal() : 0;
  const finalAmount = total + (total >= freeShippingThreshold || total === 0 ? 0 : shippingCost);

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

  const inputClasses = "w-full bg-white border-[0.5px] border-zinc-200 px-3 py-3 text-sm font-sans tracking-widest outline-none rounded-none focus:border-black transition-colors";
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      <CheckoutProgress currentStep="address" />

      <div className="max-w-6xl mx-auto lg:flex gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-serif font-light mb-8 lg:mb-12">Shipping Details</h1>

          <div className="bg-bg border-[0.5px] border-zinc-200 p-6 md:p-8">
            {savedAddresses.length > 0 && (
              <div className="mb-6">
                <h3 className="font-sans font-medium uppercase tracking-widest text-xs text-text border-b border-zinc-200 pb-2 mb-4">Saved Addresses</h3>
                <div className="flex flex-col gap-3">
                  {savedAddresses.map((addr: any) => (
                    <label 
                      key={addr._id} 
                      onClick={(e) => { 
                        e.preventDefault(); // prevent double triggering from label wrapping
                        applyAddress(addr); 
                        setSelectedAddressId(addr._id); 
                      }} 
                      className={`relative p-4 border cursor-pointer rounded-none flex items-start gap-4 transition-all ${selectedAddressId === addr._id ? "border-black border-[1.5px] bg-zinc-50" : "border-zinc-200 border-[1px] hover:border-zinc-300 bg-white"}`}
                    >
                      <div className="pt-0.5">
                        <input 
                          type="radio" 
                          name="saved_address" 
                          checked={selectedAddressId === addr._id} 
                          readOnly
                          className="w-4 h-4 accent-black cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold font-sans tracking-widest uppercase text-[11px] text-black flex items-center flex-wrap gap-2">
                          {addr.fullName}
                          {addr.isDefault && (
                            <span className="bg-zinc-200 text-black px-1.5 py-0.5 text-[8px] rounded-none whitespace-nowrap">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div className="text-zinc-600 font-sans tracking-widest text-[10px] mt-1.5 uppercase leading-relaxed">
                          {addr.street}, {addr.city}, <br/> {addr.state} - {addr.pincode}
                        </div>
                        <div className="text-zinc-600 font-sans tracking-widest text-[10px] mt-1 uppercase">
                          Phone: {addr.mobile}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 mb-4 flex items-center">
                  <div className="flex-1 border-t border-zinc-200"></div>
                  <span className="px-4 text-[10px] font-sans text-zinc-400 uppercase tracking-widest">OR</span>
                  <div className="flex-1 border-t border-zinc-200"></div>
                </div>
              </div>
            )}

            {/* Express Checkout Section */}
            <div className="mb-8">
              <h3 className="text-center font-sans font-medium text-[10px] text-zinc-400 uppercase tracking-widest mb-4">Express Checkout</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-none hover:bg-neutral-800 transition-colors">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium font-sans uppercase tracking-widest text-xs">Pay</span>
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#5A31F4] text-white py-3 rounded-none hover:bg-[#4a26cc] transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-medium font-sans uppercase tracking-widest text-xs">Shop Pay</span>
                </button>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-1 border-t border-zinc-200"></div>
                <span className="px-4 text-[10px] font-sans text-zinc-400 uppercase tracking-widest">OR CONTINUE MANUALLY</span>
                <div className="flex-1 border-t border-zinc-200"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              
              {selectedAddressId && !isAccordionOpen && (
                <div className="mb-6 flex flex-col gap-3 border-[0.5px] border-zinc-200 p-4 bg-zinc-50 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-sans text-black font-semibold uppercase tracking-widest">
                      Active Profile Loaded
                    </span>
                    <button type="button" onClick={clearAddress} className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 hover:text-black transition-colors underline">
                      Enter a different address
                    </button>
                  </div>
                </div>
              )}

              <div className={`flex flex-col gap-6 transition-all duration-500 overflow-hidden ${isAccordionOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                
                <h3 className="font-sans font-medium uppercase tracking-widest text-xs text-text border-b border-zinc-200 pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">Email *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">Phone (WhatsApp) *</label>
                    <input type="tel" inputMode="numeric" required pattern="[0-9]{10}" title="10 digit phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClasses} />
                  </div>
                </div>

                <h3 className="font-sans font-medium uppercase tracking-widest text-xs text-text border-b border-zinc-200 pb-2 mt-2">Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">First Name *</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">Last Name *</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClasses} />
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">Address Line 1 *</label>
                  <input type="text" required value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className={inputClasses} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">Pincode *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        inputMode="numeric" 
                        required
                        pattern="[0-9]{6}"
                        title="6 digit pincode"
                        value={pincode}
                        onChange={handlePincodeChange}
                        className={`${inputClasses} pr-10 ${pincodeStatus === 'error' ? 'border-red-500 focus:border-red-500 bg-red-50' : pincodeStatus === 'success' ? 'border-green-500 focus:border-green-500 bg-green-50' : ''}`} 
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {pincodeStatus === 'loading' && <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />}
                        {pincodeStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {pincodeStatus === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                    {pincodeStatus === 'error' && (
                      <p className="text-[9px] font-sans text-red-500 mt-1 uppercase tracking-widest">We currently do not deliver to this pincode.</p>
                    )}
                    {pincodeStatus === 'success' && (
                      <p className="text-[9px] font-sans text-green-600 mt-1 uppercase tracking-widest">Delivery available to your location.</p>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">City</label>
                    <input type="text" className={`${inputClasses} bg-zinc-50 text-zinc-500 border-zinc-200`} readOnly value={city} />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1 block">State</label>
                    <input type="text" className={`${inputClasses} bg-zinc-50 text-zinc-500 border-zinc-200`} readOnly value={state} />
                  </div>
                </div>

              </div>

              {/* Delivery Trust Signals */}
              <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-widest">Free Shipping Across India</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-widest">Cash on Delivery Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-widest">Secure Razorpay Payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-black" />
                  <span className="text-[10px] font-sans font-medium text-zinc-500 uppercase tracking-widest">Est. Delivery: 3–7 Business Days</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button type="submit" disabled={pincodeStatus !== 'success'} className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-none font-sans uppercase tracking-widest text-[11px] hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
            shippingCost={shippingCost}
            freeShippingThreshold={freeShippingThreshold}
            finalAmount={finalAmount}
          />
        )}
      </div>
    </div>
  );
}
