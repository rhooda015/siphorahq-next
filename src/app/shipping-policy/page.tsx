import React from 'react';
import ProtectedEmail from '@/components/ProtectedEmail';

export const metadata = {
  title: 'Shipping Policy | SiphoraHQ',
  description: 'Shipping timelines, charges, and delivery information for SiphoraHQ orders.',
};

export default function ShippingPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light tracking-widest uppercase mb-4">Shipping Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Effective: 1 June 2026 | Updated: 7 June 2026</p>
      <div className="space-y-10 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">1. Order Processing</h2>
          <p>All orders are processed within <strong>1–2 business days</strong> of payment confirmation. Orders placed on weekends or public holidays are processed the next business day.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">2. Delivery Timelines</h2>
          <table className="w-full text-sm border-collapse mt-2">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium">Zone</th>
                <th className="text-left py-2 font-medium">Cities</th>
                <th className="text-left py-2 font-medium">Estimated Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="py-2">Metro</td><td className="py-2">Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata</td><td className="py-2">2–4 days</td></tr>
              <tr><td className="py-2">Tier 1</td><td className="py-2">Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh</td><td className="py-2">3–5 days</td></tr>
              <tr><td className="py-2">Tier 2</td><td className="py-2">Other major cities</td><td className="py-2">4–6 days</td></tr>
              <tr><td className="py-2">Remote</td><td className="py-2">Northeast, J&K, Andaman, Lakshadweep</td><td className="py-2">7–10 days</td></tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">3. Shipping Charges</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Free shipping</strong> on all orders above ₹999</li>
            <li>Flat ₹60 shipping on orders below ₹999</li>
            <li>COD orders may incur an additional ₹40 handling fee</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">4. Courier Partners</h2>
          <p>We ship via Delhivery, BlueDart, XpressBees, and EcomExpress depending on your pin code and availability. You will receive a tracking link via email/SMS once your order is dispatched.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">5. Order Tracking</h2>
          <p>Tracking details are sent to your registered email and phone within 24 hours of dispatch. You can also track your order from your account dashboard on siphorahq.in.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">6. Failed Delivery</h2>
          <p>If delivery fails due to incorrect address or unavailability, the courier will attempt re-delivery twice. After two failed attempts, the order will be returned to us. Re-shipping charges will apply for resending.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">7. Damaged in Transit</h2>
          <p>If your order arrives damaged, please photograph the package and product immediately and email us at <ProtectedEmail email="concierge@siphorahq.in" className="underline" /> within 48 hours of delivery. We will arrange a replacement or refund.</p>
        </section>
        <section>
          <h2 className="text-base font-semibold uppercase tracking-wider mb-3">8. Contact</h2>
          <p>For shipping queries: <ProtectedEmail email="concierge@siphorahq.in" className="underline" /> | +91 9540027978</p>
        </section>
      </div>
    </main>
  );
}
