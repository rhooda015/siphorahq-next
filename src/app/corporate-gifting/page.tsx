import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Corporate Gifting | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Corporate Gifting
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Elevate your corporate relationships with Siphorahq. We offer bulk pricing, custom branding, and specialized packaging for corporate clients. Contact concierge@siphorahq.in for a catalog.
        </div>
      </div>
    </div>
  );
}
