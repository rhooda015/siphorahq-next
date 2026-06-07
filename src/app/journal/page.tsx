
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default function JournalPage() {
  const articles = [
    {
      id: 'best-porcelain-dinner-set-gifting-india',
      title: 'Best Porcelain Dinner Set for Gifting in India',
      category: 'Gifting',
      date: 'December 1, 2025',
      link: '/products?category=dinner-set',
      img: '/images/dinnerware.webp'
    },
    {
      id: 'choose-perfect-luxury-tea-set',
      title: 'How to Choose the Perfect Luxury Tea Set',
      category: 'Guide',
      date: 'November 20, 2025',
      link: '/products?category=tea-set',
      img: '/images/teaset.webp'
    },
    {
      id: 'premium-corporate-gifting-guide',
      title: 'The Ultimate Guide to Premium Corporate Gifting',
      category: 'Corporate',
      date: 'November 5, 2025',
      link: '/gifting',
      img: '/images/gifting.webp'
    },
    {
      id: 'why-fine-porcelain',
      title: 'Why Fine Porcelain is the Best Material for Dinnerware',
      category: 'Education',
      date: 'October 25, 2025',
      link: '/products',
      img: '/images/hero.webp'
    },
    {
      id: 'elevate-dining-table-aesthetics',
      title: '5 Ways to Elevate Your Dining Table Aesthetics',
      category: 'Lifestyle',
      date: 'October 10, 2025',
      link: '/products',
      img: '/images/serveware.webp'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-32">
      {/* Header Section */}
      <div className="pt-24 pb-16 text-center border-b-[0.5px] border-[var(--color-border)] px-4">
        <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-primary)] mb-6 tracking-wide">The Siphora Journal</h1>
        <p className="text-[var(--color-text-muted)] font-sans max-w-2xl mx-auto leading-loose text-sm md:text-base">
          Explore our editorial musings on style, heritage, and the modern art of dining.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {articles.map((article) => (
            <Link href={article.link} key={article.id} className="group block">
              <div className="aspect-[4/5] bg-[var(--color-accent-light)] mb-8 overflow-hidden relative border-[0.5px] border-transparent group-hover:border-[var(--color-border)] transition-all duration-700">
                <Image src={article.img} alt={article.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
              <div className="text-center px-4">
                <span className="text-[10px] font-sans text-[var(--color-secondary)] uppercase tracking-[0.2em] mb-4 block">
                  {article.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors leading-tight">
                  {article.title}
                </h2>
                <span className="text-[10px] font-sans text-[var(--color-text-muted)] uppercase tracking-[0.2em]">
                  {article.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
