"use client";

import React, { useState } from "react";

const faqGroups = [
  {
    category: "Ordering & Payments",
    items: [
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes, we offer Cash on Delivery (COD) on all orders within India, subject to pin code availability. The COD option will be presented at checkout if serviced by our shipping partners. Please note that high-value orders may require a telephone verification before dispatch."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), Net Banking, Unified Payments Interface (UPI) via PhonePe, Google Pay, and Paytm, as well as selected digital wallets via our secure Razorpay gateway."
      },
      {
        q: "Can I modify or cancel my order after placement?",
        a: "Orders can be cancelled or modified within 12 hours of placement. Once an order is processed, packed, and handed over to our logistics partners, cancellations are no longer possible."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does shipping take?",
        a: "Most orders are delivered within 3 to 7 business days pan-India. Standard shipments to major metro cities typically arrive within 3 to 5 business days, while deliveries to remote locations may take up to 7 to 10 business days."
      },
      {
        q: "What happens if a product arrives damaged?",
        a: "We pack our ceramics with multi-layered protective materials. In the rare event of transit damage, we offer a complete free replacement. Please email us at concierge@siphorahq.in or message us on WhatsApp with photos of the damaged item and outer box within 48 hours of delivery."
      },
      {
        q: "Are shipping charges applicable?",
        a: "We offer complimentary standard shipping pan-India on all orders above ₹999. For orders under ₹999, a flat shipping fee of ₹99 is applicable at checkout."
      }
    ]
  },
  {
    category: "Tableware Care & Durability",
    items: [
      {
        q: "Are the plates and mugs microwave safe?",
        a: "Undecorated ceramic and porcelain pieces are completely microwave safe. However, any products containing hand-painted 24k gold trims (such as our Mughal Gold and Emerald Regent sets) must NEVER be microwaved, as precious metal decals will spark."
      },
      {
        q: "Is the tableware lead-free?",
        a: "Yes! All Siphorahq tableware, clays, and glazes are certified 100% food-safe, lead-free, and cadmium-free. We enforce strict quality controls to ensure no harmful run-off, making our porcelain safe for daily use."
      },
      {
        q: "How should I stack and store my dinnerware?",
        a: "To prevent superficial glaze scratching, we recommend placing a soft cloth, felt liner, or paper separator between plates when stacking them in cabinets. Avoid dragging the raw unglazed bottom rings across glazed surfaces."
      }
    ]
  }
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleAccordion = (idx: string) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop font-sans">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Help Center</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-16" />

        <div className="space-y-12">
          {faqGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white p-6 md:p-8 border border-zinc-200/50 rounded-xl shadow-sm">
              <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-6 border-b border-zinc-100 pb-3">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((item, itemIdx) => {
                  const globalIdx = `${groupIdx}-${itemIdx}`;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div key={itemIdx} className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0">
                      <button
                        onClick={() => toggleAccordion(globalIdx)}
                        className="w-full text-left flex justify-between items-center py-2 focus:outline-none"
                      >
                        <span className="font-medium text-zinc-700 hover:text-[#C9A84C] transition-colors pr-4">
                          {item.q}
                        </span>
                        <span className="text-xl text-zinc-400 font-light select-none">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-3 text-sm text-zinc-500 leading-relaxed pr-6 animate-fadeIn">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}