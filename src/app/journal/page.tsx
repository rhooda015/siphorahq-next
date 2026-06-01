import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function JournalPage() {
  const articles = [
    {
      id: 'hosting-perfect-dinner',
      title: 'The Art of Hosting: Setting the Perfect Dinner Table',
      category: 'Lifestyle',
      date: 'November 12, 2025',
      link: '/products?category=dinner-set'
    },
    {
      id: 'porcelain-care-guide',
      title: 'How to Care for Your Luxury Porcelain Dinnerware',
      category: 'Care Guide',
      date: 'October 15, 2025',
      link: '/products'
    },
    {
      id: 'luxury-gifting-guide',
      title: 'A Guide to Luxury Corporate & Wedding Gifting',
      category: 'Gifting',
      date: 'September 15, 2025',
      link: '/gifting'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
      {/* Breadcrumbs */}
      <div className="flex mb-8 items-center text-xs font-sans text-[var(--color-text-muted)]">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-[var(--color-primary)]">Journal</span>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">The Siphorahq Journal</h1>
        <p className="text-text-muted font-sans max-w-2xl mx-auto">
          Explore our editorial musings on style, heritage, and the modern wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link href={article.link} key={article.id} className="group block">
            <div className="aspect-[4/3] bg-[var(--color-accent-light)] mb-6 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest text-center px-4 group-hover:scale-105 transition-transform duration-700">
                Read Article
              </div>
            </div>
            <div className="text-center px-4">
              <span className="text-xs font-sans text-[#C9A84C] uppercase tracking-widest font-medium mb-3 block">
                {article.category}
              </span>
              <h2 className="text-2xl font-serif mb-3 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 text-[var(--color-primary)]">
                {article.title}
              </h2>
              <span className="text-xs font-sans text-[var(--color-text-muted)] uppercase tracking-widest">
                {article.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
