import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Luxury Gifting | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Luxury Gifting
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Explore our curated selection of luxury gift boxes, premium tea sets, and elegant serveware. Perfect for weddings, corporate events, and special occasions.
        </div>
      </div>
    </div>
  );
}
