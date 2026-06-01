import React from 'react';
import Link from 'next/link';

export default function JournalPage() {
  const articles = [
    {
      id: 'style-silk-saree',
      title: 'How to Style a Silk Saree for a Modern Wedding',
      category: 'Style Guide',
      date: 'October 12, 2025',
    },
    {
      id: 'porcelain-care-guide',
      title: 'How to Care for Your Luxury Porcelain Dinnerware',
      category: 'Care Guide',
      date: 'October 15, 2025',
    },
    {
      id: 'sustainable-fashion',
      title: 'A Guide to Sustainable Ethnic Fashion',
      category: 'Sustainability',
      date: 'September 15, 2025',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 pb-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">The Siphorahq Journal</h1>
        <p className="text-text-muted font-sans max-w-2xl mx-auto">
          Explore our editorial musings on style, heritage, and the modern wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link href={`/journal/${article.id}`} key={article.id} className="group block">
            <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text-muted uppercase tracking-widest text-center px-4 group-hover:scale-105 transition-transform duration-700">
                Editorial Image
              </div>
            </div>
            <div className="text-center px-4">
              <span className="text-xs font-sans text-gold uppercase tracking-widest font-medium mb-3 block">
                {article.category}
              </span>
              <h2 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors line-clamp-2">
                {article.title}
              </h2>
              <span className="text-xs font-sans text-text-muted uppercase tracking-widest">
                {article.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
