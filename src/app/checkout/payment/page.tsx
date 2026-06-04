"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ChevronRight, CreditCard, Wallet, Truck, ShieldCheck, Lock, CheckCircle, MessageCircle, HeartHandshake } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { trackPurchase } from '@/lib/analytics';
import { useCart } from '@/store/useCart';
import CheckoutProgress from '@/components/CheckoutProgress';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary';

export default function PaymentPage() {
  const [method, setMethod] = useState('razorpay');
  const [success, setSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { items, cartTotal, clearCart, customerDetails } = useCart();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const total = mounted ? cartTotal() : 0;
  const finalAmount = total + (total >= BRAND.freeShippingThreshold || total === 0 ? 0 : BRAND.shippingCost);

  const handlePayment = async () => {
    if (method === 'cod') {
      setLoading(true);
      try {
        const orderRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: finalAmount,
            method: 'cod',
            customer: customerDetails,
            items
          })
        });
        const orderData = await orderRes.json();
        
        trackPurchase(orderData.id || `COD-${Math.floor(100000 + Math.random() * 900000)}`, finalAmount, items);
        setOrderDetails({
          id: orderData.id || `COD-${Math.floor(100000 + Math.random() * 900000)}`,
          amount: finalAmount,
          items: [...items],
          shippingCost: total >= BRAND.freeShippingThreshold ? 0 : BRAND.shippingCost,
          subtotal: total
        });
        setSuccess(true);
        clearCart();
      } catch (error) {
        console.error(error);
        alert('Failed to place COD order. Please try again.');
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount }) 
      });
      const order = await res.json();

      if (order.error) {
        alert(order.error);
        setLoading(false);
        return;
      }

      const options = {
        key: order.key_id, 
        amount: order.amount,
        currency: order.currency,
        name: "Siphorahq",
        description: "Luxury Indian Fashion",
        order_id: order.id,
        handler: function (response: any) {
          console.log(response);
          trackPurchase(response.razorpay_payment_id || `RZP-${order.id}`, finalAmount, items);
          setOrderDetails({
            id: response.razorpay_payment_id || `RZP-${order.id}`,
            amount: finalAmount,
            items: [...items],
            shippingCost: total >= BRAND.freeShippingThreshold ? 0 : BRAND.shippingCost,
            subtotal: total
          });
          setSuccess(true);
          clearCart();
        },
        prefill: {
          name: customerDetails?.firstName ? `${customerDetails.firstName} ${customerDetails.lastName}` : "Test Customer",
          email: customerDetails?.email || "customer@example.com",
          contact: customerDetails?.phone?.replace(/\D/g, '') || "9999999999"
        },
        theme: {
          color: "#C9A84C"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      alert('Payment initialization failed');
    }
    setLoading(false);
  };

  if (success && orderDetails) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#fdfbf9] border-[0.5px] border-zinc-200 text-[#1a1612] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1612] tracking-wide mb-4">Order Confirmed</h1>
          <p className="text-[#1a1612]/60 font-sans text-xs uppercase tracking-[0.2em] mb-2">Order #{orderDetails.id}</p>
          <p className="text-[#1a1612]/60 font-sans text-sm">Thank you for your purchase. A confirmation has been sent to your email.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl text-[#1a1612] mb-6 border-b-[0.5px] border-zinc-200 pb-4">Order Details</h3>
            <div className="space-y-6">
              {orderDetails.items.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-6 border-b-[0.5px] border-zinc-200 pb-6">
                  <div className="w-24 h-32 bg-neutral-50 relative flex-shrink-0 border-[0.5px] border-zinc-100">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 py-1">
                    <h4 className="font-sans text-sm uppercase tracking-widest text-[#1a1612] mb-2">{item.name}</h4>
                    <p className="font-sans text-xs text-[#1a1612]/60 mb-1">Quantity: {item.quantity}</p>
                    {item.isGiftWrapped && <p className="font-sans text-[10px] uppercase tracking-widest text-[#8b6914] mt-2">+ Luxury Packaging</p>}
                    <p className="font-sans text-sm font-medium text-[#1a1612] mt-auto">₹{((item.salePrice || item.price) * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#fdfbf9] border-[0.5px] border-zinc-200 p-8 sticky top-24">
              <h3 className="font-serif text-xl text-[#1a1612] mb-6">Payment Summary</h3>
              
              <div className="space-y-4 font-sans text-sm text-[#1a1612]/70 border-b-[0.5px] border-zinc-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderDetails.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {orderDetails.items.some((i:any) => i.isGiftWrapped) && (
                  <div className="flex justify-between">
                    <span>Luxury Packaging</span>
                    <span>₹{(orderDetails.items.filter((i:any) => i.isGiftWrapped).length * 500).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="max-w-[120px]">Shipping & Transit Insurance</span>
                  <span className="text-right">{orderDetails.shippingCost === 0 ? 'Complimentary' : `₹${orderDetails.shippingCost.toLocaleString('en-IN')}`}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-serif text-2xl text-[#1a1612] mb-8">
                <span>Total Paid</span>
                <span>₹{orderDetails.amount.toLocaleString('en-IN')}</span>
              </div>

              <div className="space-y-4">
                <Link href="/collections" className="block w-full bg-[#1a1612] text-white text-center py-4 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[#8b6914] transition-colors duration-300">
                  Continue Shopping
                </Link>
                <Link href="/account/orders" className="block w-full bg-transparent border-[0.5px] border-[#1a1612] text-[#1a1612] text-center py-4 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300">
                  Track Order In Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setScriptLoaded(true)}
      />
      <CheckoutProgress currentStep="payment" />

      <div className="max-w-6xl mx-auto lg:flex gap-12">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-serif font-light mb-8">Secure Payment</h1>
          
          <div className="flex flex-col gap-4">
            {/* Payment Options */}
            <label className={`cursor-pointer border ${method === 'razorpay' ? 'border-gold bg-ivory' : 'border-border bg-white'} p-4 flex items-center gap-4 transition-colors`}>
              <input type="radio" name="payment_method" value="razorpay" checked={method === 'razorpay'} onChange={(e) => setMethod(e.target.value)} className="accent-gold" />
              <CreditCard className={`w-6 h-6 ${method === 'razorpay' ? 'text-gold' : 'text-text-muted'}`} />
              <div>
                <h4 className="font-sans font-medium text-sm text-text">Credit/Debit Cards, UPI & Netbanking</h4>
                <p className="text-xs text-text-muted font-sans mt-1">Processed securely by Razorpay</p>
              </div>
            </label>

            <label className={`cursor-pointer border ${method === 'cod' ? 'border-gold bg-ivory' : 'border-border bg-white'} p-4 flex items-center gap-4 transition-colors`}>
              <input type="radio" name="payment_method" value="cod" checked={method === 'cod'} onChange={(e) => setMethod(e.target.value)} className="accent-gold" />
              <Truck className={`w-6 h-6 ${method === 'cod' ? 'text-gold' : 'text-text-muted'}`} />
              <div>
                <h4 className="font-sans font-medium text-sm text-text">Cash on Delivery</h4>
                <p className="text-xs text-text-muted font-sans mt-1">Pay when your order arrives</p>
              </div>
            </label>
          </div>

          <div className="mt-8">
            <button type="button" onClick={handlePayment} disabled={loading || (method === 'razorpay' && !scriptLoaded)} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm py-4">
              {loading ? 'Processing...' : (!scriptLoaded && method === 'razorpay' ? 'Loading Secure Gateway...' : 'Complete Purchase')}
            </button>
            <p className="text-center text-xs font-sans text-[var(--color-text-muted)] mt-4 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Your payment information is encrypted and securely processed.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-8">
            {/* Customer Support Reassurance */}
            <div className="bg-neutral-50 p-6 border border-[var(--color-border)]">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-[var(--color-primary)]" />
                <h4 className="font-serif text-lg">Need Assistance?</h4>
              </div>
              <p className="text-xs font-sans text-[var(--color-text-muted)] leading-relaxed mb-3">
                Our luxury concierges are available to assist you with your order.
              </p>
              <p className="text-xs font-sans font-medium text-[var(--color-text)]">WhatsApp: +91 95400 27978</p>
              <p className="text-xs font-sans text-[var(--color-text-muted)] mt-1">Response Time: Under 1 Hour</p>
            </div>

            {/* Luxury Guarantee */}
            <div className="bg-neutral-50 p-6 border border-[var(--color-border)]">
              <div className="flex items-center gap-3 mb-3">
                <HeartHandshake className="w-5 h-5 text-[var(--color-primary)]" />
                <h4 className="font-serif text-lg">Siphorahq Guarantee</h4>
              </div>
              <ul className="text-xs font-sans text-[var(--color-text-muted)] space-y-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[var(--color-primary)]" /> Handcrafted Premium Quality</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[var(--color-primary)]" /> Secure Luxury Packaging</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[var(--color-primary)]" /> Free Damage Replacement</li>
              </ul>
            </div>
          </div>
        </div>

        {mounted && (
          <CheckoutOrderSummary 
            items={items}
            total={total}
            shippingCost={BRAND.shippingCost}
            freeShippingThreshold={BRAND.freeShippingThreshold}
            finalAmount={finalAmount}
            isPaymentPage={true}
          />
        )}
      </div>
    </div>
  );
}
