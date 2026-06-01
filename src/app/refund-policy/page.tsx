import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Return & Refund Policy | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Return & Refund Policy
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          We want you to love your Siphorahq purchase.\n\n1. Return Window\nWe accept returns within 7 days of delivery for damaged or defective items only.\n\n2. Process\nTo initiate a return, please email an unboxing video to support@siphorahq.in within 48 hours of delivery.\n\n3. Refunds\nApproved refunds will be processed to the original payment method within 5-7 business days.
        </div>
      </div>
    </div>
  );
}
