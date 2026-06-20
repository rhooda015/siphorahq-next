import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | SiphoraHQ",
  description: "Information about SiphoraHQ's shipping methods, delivery times, and packaging.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-surface-cream py-24 px-4 md:px-margin-desktop">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal mb-8 text-center">
          Shipping Policy
        </h1>
        <div className="font-body-md text-on-surface-variant leading-relaxed space-y-6">
          <p>
            Every SiphoraHQ order is carefully inspected and meticulously packed in our signature luxury packaging to ensure safe transit.
          </p>
          <h2 className="font-headline-md text-2xl text-ink-charcoal mt-8">Delivery Times</h2>
          <p>
            - Standard Shipping: 3-5 business days across India.<br/>
            - Express Shipping: 1-2 business days in metro cities.<br/>
          </p>
          <h2 className="font-headline-md text-2xl text-ink-charcoal mt-8">Shipping Rates</h2>
          <p>
            We offer complimentary standard shipping Pan-India on all orders above ₹999. Express shipping is calculated at checkout based on your location.
          </p>
        </div>
      </div>
    </div>
  );
}
