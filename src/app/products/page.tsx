import React from 'react';
import ClientProductGrid from './ClientProductGrid';

const API_URL = 'https://siporahq-backend.onrender.com/api/products';

async function getProducts() {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 300 }
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* ── PAGE HEADER ── */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-14 text-center">
        <p className="section-label">The Collection</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-3">
          All Collections
        </h1>
        <p className="text-[#6B6560] font-sans text-sm max-w-md mx-auto">
          Handcrafted porcelain for quiet rituals — made by master artisans across India.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ClientProductGrid initialProducts={products} />
      </div>
    </div>
  );
}
