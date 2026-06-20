import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges | SiphoraHQ",
  description: "Learn about our returns and exchanges policy for luxury porcelain and ceramic tableware.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-surface-cream py-24 px-4 md:px-margin-desktop">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal mb-8 text-center">
          Returns & Exchanges
        </h1>
        <div className="font-body-md text-on-surface-variant leading-relaxed space-y-6">
          <p>
            At SiphoraHQ, we take immense pride in the craftsmanship of our luxury porcelain. If you are not completely satisfied with your purchase, we offer a straightforward return process.
          </p>
          <h2 className="font-headline-md text-2xl text-ink-charcoal mt-8">Eligibility</h2>
          <p>
            Items must be returned within 14 days of delivery, unused, and in their original SiphoraHQ luxury packaging. Custom or personalized items are not eligible for returns.
          </p>
          <h2 className="font-headline-md text-2xl text-ink-charcoal mt-8">Process</h2>
          <p>
            To initiate a return, please contact our concierge via email at concierge@siphorahq.in or through WhatsApp. We will provide a return shipping label and instructions.
          </p>
        </div>
      </div>
    </div>
  );
}
