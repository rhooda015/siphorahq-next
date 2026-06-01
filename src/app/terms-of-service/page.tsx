import React from "react";
import { BRAND } from "@/config/brand";

export const metadata = {
  title: `Terms & Conditions | ${BRAND.name}`,
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-8 text-center">
          Terms & Conditions
        </h1>
        <div className="prose prose-lg mx-auto text-[var(--color-text-muted)] font-sans whitespace-pre-wrap leading-relaxed">
          Welcome to Siphorahq. By using our website, you agree to these Terms and Conditions.\n\n1. General Conditions\nWe reserve the right to refuse service to anyone for any reason at any time.\n\n2. Products and Pricing\nAll prices are listed in INR. We reserve the right to modify prices or discontinue products without notice.\n\n3. Intellectual Property\nAll content on this site, including images, text, and logos, is the property of Siphorahq and protected by copyright laws.
        </div>
      </div>
    </div>
  );
}
