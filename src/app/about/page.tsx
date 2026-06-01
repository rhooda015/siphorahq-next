import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 min-h-[50vh]">
      <h1 className="font-serif text-4xl mb-12 text-[var(--color-primary)] text-center">Our Story</h1>
      <div className="text-[var(--color-text-muted)] leading-relaxed text-lg">
        <p className="mb-4">Crafting Elegant Moments, One Table at a Time</p>
        <p className="mb-4">At SIPORAHQ, we believe that every meal deserves a beautiful setting. Inspired by timeless craftsmanship and refined living, we curate premium <Link href="/products?category=dinner-set" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">porcelain dinnerware</Link>, <Link href="/products?category=tea-set" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">tea sets</Link>, <Link href="/products?category=serveware" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">serveware</Link>, and <Link href="/gifting" className="text-[var(--color-primary)] underline hover:text-[var(--color-secondary)]">luxury gifting collections</Link> designed to elevate everyday experiences.</p>
        <p className="mb-4">Our collections combine elegance, functionality, and enduring quality, making every gathering feel special—from intimate family dinners to grand celebrations.</p>
        <p className="mb-4">Every piece is carefully selected to reflect sophistication, attention to detail, and a passion for exceptional table aesthetics.</p>
        <div className="mb-4">
          <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">Our Promise</h2>
          <ul className="space-y-2 mb-8">
            <li>✓ Premium Quality Materials</li>
            <li>✓ Elegant & Timeless Designs</li>
            <li>✓ Secure Packaging</li>
            <li>✓ Reliable Nationwide Delivery</li>
            <li>✓ Exceptional Customer Support</li>
          </ul>
          <Link href="/products" className="bg-[var(--color-primary)] text-white px-8 py-3 text-sm font-sans tracking-widest uppercase hover:bg-[var(--color-secondary)] transition-colors">
            Explore All Collections
          </Link>
        </div>
        <p className="mb-4 mt-12">SIPORAHQ is more than dinnerware—it’s about creating memorable moments around the table.</p>
      </div>
    </div>
  );
}