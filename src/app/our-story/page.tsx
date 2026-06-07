import React from "react";
import { BRAND } from "@/config/brand";

export { ourStoryMetadata as metadata } from '@/lib/metadata';

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Our Story
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Crafting Elegant Moments, One Table at a Time.\n\nAt SIPHORAHQ, we believe that every meal deserves a beautiful setting. Inspired by timeless craftsmanship and refined living, we curate premium porcelain dinnerware, tea sets, serveware, and luxury gifting collections designed to elevate everyday experiences.
        </div>
      </div>
    </div>
  );
}
