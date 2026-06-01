import React, { Suspense } from 'react';
import ClientProductGrid from './ClientProductGrid';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── PAGE HEADER ── */}
      <section className="bg-[var(--color-accent-light)] border-b border-[var(--color-border)] py-14 text-center px-4">
        <p className="text-[12px] font-sans font-medium uppercase tracking-widest text-[var(--color-text-muted)] mb-3">The Collection</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">
          All Collections
        </h1>
        <p className="text-[var(--color-text-muted)] font-sans text-sm max-w-md mx-auto leading-relaxed">
          Discover our curated selection of premium porcelain dinnerware, luxury tea sets, and aesthetic home decor.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="py-20 text-center font-serif text-[var(--color-primary)]">Loading Collections...</div>}>
          <ClientProductGrid />
        </Suspense>
      </div>
    </div>
  );
}
