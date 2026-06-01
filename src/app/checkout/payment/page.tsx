"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ChevronRight, CreditCard, Wallet, Truck, ShieldCheck } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { trackPurchase } from '@/lib/analytics';

export default function PaymentPage() {
  const [method, setMethod] = useState('razorpay');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (method === 'cod') {
      trackPurchase(`COD-${Math.floor(100000 + Math.random() * 900000)}`, 9500, [{item_name: 'Dinner Set', price: 9500, quantity: 1}]);
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 9500 }) // Hardcoded for mockup
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
          trackPurchase(response.razorpay_payment_id || `RZP-${order.id}`, 9500, [{item_name: 'Dinner Set', price: 9500, quantity: 1}]);
          setSuccess(true);
        },
        prefill: {
          name: "Test Customer",
          email: "customer@example.com",
          contact: "9999999999"
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* Checkout Steps */}
      <div className="flex items-center text-xs font-sans text-text-muted mb-8 justify-center">
        <Link href="/checkout/cart" className="hover:text-text">Cart</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/checkout/address" className="hover:text-text">Address</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="font-medium text-text">Payment</span>
      </div>

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

          <div className="mt-8 flex justify-end">
            <button type="button" onClick={handlePayment} disabled={loading} className="w-full md:w-auto btn-primary">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

        {/* Order Summary Sticky */}
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
            
            <div className="mt-6 border border-[var(--color-border)] bg-white p-4 flex gap-4 items-start">
              <ShieldCheck className="w-5 h-5 text-green-700 flex-shrink-0" />
              <div>
                <p className="text-xs font-sans font-medium uppercase tracking-widest text-[var(--color-text)]">100% Secure Checkout</p>
                <p className="text-xs font-sans text-[var(--color-text-muted)] mt-1">Your payment information is encrypted and securely processed.</p>
                <div className="mt-4 flex gap-2 opacity-60 grayscale">
                   <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                   <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                   <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                   <div className="h-6 w-10 border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold">UPI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
