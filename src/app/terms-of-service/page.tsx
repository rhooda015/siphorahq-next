import React from 'react';
import { BRAND } from "@/config/brand";
import ProtectedEmail from '@/components/ProtectedEmail';

export const metadata = {
  title: `Terms & Conditions | ${BRAND.name}`,
  description: 'Terms and conditions for purchasing from SiphoraHQ.',
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light tracking-widest uppercase mb-4">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Effective: 1 June 2026 | Updated: 7 June 2026</p>
      <div className="space-y-10 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or placing an order on <strong>siphorahq.in</strong>, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">2. About Us</h2>
          <p><strong>SiphoraHQ</strong> is operated by Rohit Hooda, Faridabad, Haryana – 121004, India. GSTIN: 06APTPH1635N1ZG. Contact: <ProtectedEmail email="concierge@siphorahq.in" className="underline" /></p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">3. Products & Pricing</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All prices are in Indian Rupees (₹) inclusive of applicable GST.</li>
            <li>We reserve the right to modify prices without prior notice.</li>
            <li>Product images are representational — slight colour variations may occur.</li>
            <li>Minor variations in handcrafted porcelain finish are natural, not defects.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">4. Orders & Payment</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Orders are confirmed only upon successful payment or COD acceptance.</li>
            <li>We accept Razorpay (UPI, cards, net banking) and Cash on Delivery.</li>
            <li>We reserve the right to cancel orders due to stock issues, pricing errors, or suspected fraud.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">5. Shipping</h2>
          <p>Shipping timelines and charges are detailed in our <a href="/shipping-policy" className="underline">Shipping Policy</a>. Estimated delivery dates are indicative and not guaranteed.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">6. Returns & Refunds</h2>
          <p>Returns are governed by our <a href="/refund-policy" className="underline">Refund & Returns Policy</a>. Items must be returned within 7 days of delivery in original unused condition.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">7. Intellectual Property</h2>
          <p>All content — text, images, logos, product designs — is the property of SiphoraHQ and protected under Indian copyright law. Reproduction without written permission is prohibited.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">8. Limitation of Liability</h2>
          <p>SiphoraHQ shall not be liable for any indirect or consequential damages. Our maximum liability shall not exceed the value of the order in question.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">9. Governing Law</h2>
          <p>These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Faridabad, Haryana.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">10. Contact</h2>
          <p>Email: <ProtectedEmail email="concierge@siphorahq.in" className="underline" /> | Response within 72 business hours.</p>
        </section>
      </div>
    </main>
  );
}
