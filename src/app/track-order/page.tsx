import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Track Your Order | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Track Your Order
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Please enter your Order ID and Email Address below to track the status of your shipment.
        </div>
      </div>
    </div>
  );
}
