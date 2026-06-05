import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Shipping Policy | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Shipping Policy
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          We offer free shipping on all orders above ₹999 across India.\n\n1. Processing Time\nOrders are processed within 1-2 business days. Custom orders may take longer.\n\n2. Delivery Time\nStandard delivery takes 3-7 business days depending on your location.\n\n3. Order Tracking\nOnce your order is dispatched, you will receive a tracking link via email and SMS.
        </div>
      </div>
    </div>
  );
}
