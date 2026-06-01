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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock', 
        amount: order.amount,
        currency: order.currency,
        name: "Siphorahq",
        description: "Luxury Indian Fashion",
        order_id: order.id,
        handler: function (response: any) {
          console.log(response);
          trackPurchase(response.razorpay_payment_id || `RZP-${order.id}`, finalAmount, items);
          setSuccess(true);
          clearCart();
        },
        prefill: {
          name: customerDetails?.firstName ? `${customerDetails.firstName} ${customerDetails.lastName}` : "Test Customer",
          email: customerDetails?.email || "customer@example.com",
          contact: customerDetails?.phone || "9999999999"
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

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-serif mb-4">Order Confirmed</h1>
        <p className="text-text-muted font-sans mb-2">Order #SHQ-{Math.floor(100000 + Math.random() * 900000)}</p>
        <p className="text-text-muted font-sans mb-8">Thank you for your purchase. A confirmation has been sent to your email.</p>
        
        <div className="bg-bg border border-border p-6 mb-8 text-left">
          <h3 className="font-sans font-medium uppercase tracking-widest text-sm text-text border-b border-border pb-2 mb-4">Estimated Delivery</h3>
          <p className="text-text-muted font-sans text-sm">Your order is being handcrafted. Expect delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.</p>
        </div>

        <Link href="/">
          <button className="btn-primary">Continue Shopping</button>
        </Link>
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
              <p className="text-xs font-sans font-medium text-[var(--color-text)]">WhatsApp: +91 98765 43210</p>
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
