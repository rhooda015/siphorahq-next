"use client";

import React, { useState } from "react";
import { BRAND } from "@/config/brand";

const faqs = [
  {
    q: "When will I receive my tracking link?",
    a: "Tracking links are automatically generated and sent via SMS and Email once your order is hand-packed and dispatched from our warehouse, typically within 12 to 24 business hours of order placement."
  },
  {
    q: "Why is my tracking link showing as inactive?",
    a: "After a package is handed over to our courier partners (Delhivery, BlueDart, or XpressBees), it takes approximately 4 to 6 hours for their systems to scan the barcode and activate the live tracking page."
  },
  {
    q: "Can I change my shipping address after dispatch?",
    a: "Once an order has been packed and handed over to our logistics partners, we cannot modify the delivery address. If you need to make changes, please contact our concierge via WhatsApp within 12 hours of ordering."
  }
];

export default function Page() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && email) {
      setTrackingInfo(`Shipment status details for Order #${orderId} will be shown once connected. Standard processing takes 1-2 days. You will receive a live AWB tracking link via SMS once dispatched.`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop font-sans">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Order Status</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] text-center mb-8">
          Track Your Order
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-12" />

        {/* Input Form */}
        <div className="bg-white p-8 md:p-10 border border-zinc-200/50 rounded-xl shadow-sm max-w-xl mx-auto mb-16">
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label htmlFor="order-id" className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Order ID</label>
              <input
                id="order-id"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. SPH-9843"
                className="w-full px-4 py-3 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-zinc-500 font-bold mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. customer@example.com"
                className="w-full px-4 py-3 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-white text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-zinc-800 transition-colors font-bold"
            >
              Track Shipment
            </button>
          </form>

          {trackingInfo && (
            <div className="mt-8 p-4 bg-amber-50/50 border border-amber-100 rounded-lg text-xs text-amber-800 leading-relaxed">
              {trackingInfo}
            </div>
          )}
        </div>

        {/* Informational Guidelines */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-6 text-center">Shipping Guidelines</h2>
          <div className="space-y-6 text-sm text-zinc-500 leading-relaxed mb-16">
            <p>
              We process and hand-pack orders Monday through Saturday (excluding public holidays). 
              Standard Pan-India delivery typically takes 3 to 7 business days depending on your distance from our warehouse facility in Faridabad, Haryana.
            </p>
            <p>
              Our courier partners (including BlueDart and Delhivery) will make up to three attempts to deliver your package. 
              If you miss all attempts, the package is held at the nearest warehouse for three days before being returned to us.
            </p>
          </div>

          <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-6 text-center">Tracking Help &amp; FAQs</h2>
          <div className="space-y-6 font-sans">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-zinc-100 pb-5">
                <h4 className="font-medium text-zinc-700 mb-2">{faq.q}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
