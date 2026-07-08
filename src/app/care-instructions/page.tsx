import React from "react";
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: `Tableware Care & Maintenance | ${BRAND.name}`,
  description: `Learn how to wash, store, and care for your premium porcelain, bone china, and gold-accented tea cups and dinnerware.`,
  alternates: {
    canonical: `${BRAND.domain}/care-instructions`,
  }
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 min-h-[50vh]">
      <h1 className="font-serif text-4xl mb-12 text-[var(--color-primary)] text-center">Care Instructions</h1>
      <div className="text-[var(--color-text-muted)] leading-relaxed text-lg">
        <p className="mb-4">Preserving the Beauty of Your Tableware</p><p className="mb-4">To maintain the appearance and longevity of your products:<ul className="list-disc pl-6 my-4 space-y-2"><li>Handle with care</li></ul><li>Avoid sudden temperature changes</li><li>Use soft sponges for cleaning</li><li>Store carefully to prevent chipping</li><li>Follow specific product care instructions when provided</li></p><p className="mb-4">Proper care helps preserve the beauty and finish of your dinnerware for years to come.</p>
      </div>
    </div>
  );
}