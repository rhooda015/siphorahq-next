"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ChevronRight, CreditCard, Wallet, Truck, ShieldCheck } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { trackPurchase } from '@/lib/analytics';
import { useCart } from '@/store/useCart';

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
            <button type="button" onClick={handlePayment} disabled={loading || (method === 'razorpay' && !scriptLoaded)} className="w-full md:w-auto btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Processing...' : (!scriptLoaded && method === 'razorpay' ? 'Loading Secure Gateway...' : 'Place Order')}
            </button>
          </div>
        </div>

        {/* Order Summary Sticky */}
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
              <span>₹{finalAmount.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="mt-6 border border-[var(--color-border)] bg-white p-4 flex gap-4 items-start">
              <ShieldCheck className="w-5 h-5 text-green-700 flex-shrink-0" />
              <div>
                <p className="text-xs font-sans font-medium uppercase tracking-widest text-[var(--color-text)]">100% Secure Checkout</p>
                <p className="text-xs font-sans text-[var(--color-text-muted)] mt-1">Your payment information is encrypted and securely processed.</p>
                <div className="mt-4 flex gap-3 opacity-70 grayscale">
                   <svg viewBox="0 0 50 16" className="h-4 w-auto"><path fill="#1434CB" d="M21.93 1.05h3.42L23.1 15.5H19.7zm16.92 14.45h3.36l2.12-14.45h-3.36zm-7.6-14.28c-1.63-.44-3.5-.72-5.18-.72-5.46 0-9.29 2.83-9.33 6.91-.04 3 2.68 4.67 4.75 5.67 2.12 1.02 2.84 1.68 2.84 2.6-.02 1.4-1.7 2.05-3.26 2.05-2.07 0-3.32-.3-4.73-.93l-.66-.31L9 16c1.3.6 3.65 1.1 5.95 1.1 5.75 0 9.53-2.77 9.57-7.07.03-2.4-1.38-4.22-4.52-5.68-1.9-.94-3.07-1.57-3.07-2.54.02-.9.1-1.77 2.92-1.77 1.54 0 2.6.28 3.52.66l.4.18zM10.87 1.05L8.43 11l-.3-1.46C7.23 6.2 5.34 3.75 3 2.5L2.52 2.3l2.67 13.2h3.45L14.42 1.05z"/><path fill="#F5A623" d="M3 2.5v.02C1 3.2 0 4.68 0 7.82l.06-.32C.46 5.56 1.83 2.5 3 2.5z"/></svg>
                   <svg viewBox="0 0 32 20" className="h-5 w-auto"><circle cx="10" cy="10" r="10" fill="#EB001B"/><circle cx="22" cy="10" r="10" fill="#F79E1B"/><path fill="#FF5F00" d="M16 10c0-3.3 1.9-6.2 4.7-7.9-2.8-1.7-6.6-1.7-9.4 0C14.1 3.8 16 6.7 16 10z"/></svg>
                   <svg viewBox="0 0 24 24" className="h-6 w-auto" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
