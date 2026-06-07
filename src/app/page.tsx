import React from 'react';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: 'Shipping Policy | Siphorahq',
  description: 'Learn about Siphorahq shipping timelines, free shipping thresholds, and delivery partners across India.',
  alternates: {
    canonical: '/shipping',
  },
  openGraph: {
    title: 'Shipping Policy | Siphorahq',
    description: 'Learn about Siphorahq shipping timelines, free shipping thresholds, and delivery partners across India.',
    url: `${BRAND.domain}/shipping`,
    siteName: BRAND.name,
    type: 'website',
  },
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16 text-center px-4">
        <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-3">Policies</p>
        <h1 className="text-4xl font-serif font-light tracking-wide">Shipping Policy</h1>
        <p className="text-neutral-400 text-sm mt-3 font-sans">Last updated: June 2025</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 font-sans text-[#1A1A1A]">

        <section className="mb-10">
          <h2 className="text-xl font-serif mb-4">Free Shipping</h2>
          <p className="text-[#6B6560] leading-relaxed text-sm">
            We offer <strong>free standard shipping on all orders above ₹999</strong> across India. Orders below ₹999 attract a flat shipping fee of ₹79.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif mb-4">Processing Time</h2>
          <p className="text-[#6B6560] leading-relaxed text-sm">
            All orders are processed within <strong>1–2 business days</strong> after payment confirmation. Orders placed on weekends or public holidays are processed the next working day.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif mb-4">Delivery Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E8E0D5]">
              <thead className="bg-[#F5F0E8]">
                <tr>
                  <th className="text-left px-4 py-3 font-medium uppercase tracking-widest text-xs">Zone</th>
                  <th className="text-left px-4 py-3 font-medium uppercase tracking-widest text-xs">Estimated Delivery</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Metro Cities (Delhi, Mumbai, Bangalore, Chennai)', '2–4 business days'],
                  ['Tier 2 Cities', '4–6 business days'],
                  ['Tier 3 & Remote Areas', '6–9 business days'],
                ].map(([zone, time]) => (
                  <tr key={zone} className="border-t border-[#E8E0D5]">
                    <td className="px-4 py-3 text-[#6B6560]">{zone}</td>
                    <td className="px-4 py-3 text-[#1A1A1A] font-medium">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif mb-4">Order Tracking</h2>
          <p className="text-[#6B6560] leading-relaxed text-sm">
            Once your order is dispatched, you will receive a tracking link via WhatsApp and email. You can also reach us at{' '}
            <a href="https://wa.me/919540027978" className="text-[#C9A84C] hover:underline" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            for order updates.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif mb-4">Damaged in Transit</h2>
          <p className="text-[#6B6560] leading-relaxed text-sm">
            All Siphorahq pieces are carefully packed with protective cushioning. In the rare event that your order arrives damaged, please photograph the package and product within <strong>24 hours of delivery</strong> and contact us via WhatsApp or email. We will arrange a replacement or full refund at no cost.
          </p>
        </section>

        <div className="mt-12 border-t border-[#E8E0D5] pt-8 text-center">
          <p className="text-[#6B6560] text-sm font-sans">
            Questions? Reach us at{' '}
            <a href="https://wa.me/919540027978" className="text-[#C9A84C] hover:underline" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{' '}
            or{' '}
            <a href="mailto:hello@siphorahq.in" className="text-[#C9A84C] hover:underline">
              hello@siphorahq.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
