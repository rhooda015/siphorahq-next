import React from "react";
export { sustainabilityMetadata as metadata } from '@/lib/metadata';

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Sustainability Commitment
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          We are committed to eco-friendly practices. Our packaging is 100% recyclable, and we continuously strive to minimize our carbon footprint across our supply chain.
        </div>
      </div>
    </div>
  );
}
