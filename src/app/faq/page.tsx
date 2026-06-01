import React from "react";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 min-h-[50vh]">
      <h1 className="font-serif text-4xl mb-12 text-[var(--color-primary)] text-center">FAQ</h1>
      <div className="text-[var(--color-text-muted)] leading-relaxed text-lg">
        <p className="mb-4">Frequently Asked Questions</p><p className="mb-4"><strong>Do you offer Cash on Delivery?</strong>
Availability may vary based on delivery location.</p><p className="mb-4"><strong>How long does shipping take?</strong>
Most orders are delivered within 3–10 business days.</p><p className="mb-4"><strong>Do you provide gift packaging?</strong>
Yes, selected products are eligible for premium gift packaging.</p><p className="mb-4"><strong>Can I track my order?</strong>
Yes. Tracking details are shared once the order is dispatched.</p><p className="mb-4"><strong>What if my product arrives damaged?</strong>
Please contact us within 48 hours with photographs of the package and product.</p><p className="mb-4"><strong>Do you offer bulk discounts?</strong>
Yes. Corporate and bulk order discounts are available.</p>
      </div>
    </div>
  );
}