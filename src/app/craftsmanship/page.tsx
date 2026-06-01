import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Craftsmanship & Quality | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Craftsmanship & Quality
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Every piece of Siphorahq porcelain is a testament to meticulous artistry. Our artisans use premium bone china and high-quality glazes to ensure each piece is not only visually stunning but also durable for everyday use.
        </div>
      </div>
    </div>
  );
}
