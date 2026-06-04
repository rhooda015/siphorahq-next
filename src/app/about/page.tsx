import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `Our Story | ${BRAND.name}`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-[var(--color-primary)] flex items-center justify-center">
        <Image 
          src="/images/hero.webp" 
          alt="Siphorahq Heritage" 
          fill 
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md mb-6">Our Heritage</h1>
          <p className="text-[var(--color-gold-light)] font-sans tracking-[0.3em] uppercase text-xs">Crafting Elegant Moments</p>
        </div>
      </section>

      {/* Editorial Split Section 1 */}
      <section className="max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-10 leading-tight">
              A Legacy of <br /><span className="italic text-[var(--color-secondary)]">Timeless Craftsmanship</span>
            </h2>
            <p className="text-[var(--color-text-muted)] font-sans text-sm md:text-[15px] leading-loose mb-8">
              <span className="float-left text-7xl font-serif text-[var(--color-primary)] leading-[0.8] mr-3 mt-1">A</span>
              t {BRAND.name}, we believe that every meal deserves a beautiful setting. Inspired by timeless craftsmanship and refined living, we curate premium porcelain dinnerware, tea sets, and luxury gifting collections designed to elevate everyday experiences.
            </p>
            <p className="text-[var(--color-text-muted)] font-sans text-sm md:text-[15px] leading-loose">
              Our collections combine elegance, functionality, and enduring quality, making every gathering feel special—from intimate family dinners to grand celebrations. Every piece is carefully selected to reflect sophistication and a passion for exceptional table aesthetics.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[700px]">
            <Image src="/images/teaset.webp" alt="Craftsmanship" fill className="object-cover" />
            <div className="absolute -bottom-8 -left-8 w-3/4 h-3/4 border border-[var(--color-secondary)] z-[-1] hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="bg-[var(--color-accent-light)] py-24 border-y-[0.5px] border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-primary)] mb-16 tracking-wide">The Siphora Promise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-2xl mx-auto">
            <div className="flex gap-4">
              <span className="text-[var(--color-secondary)] text-xl">✓</span>
              <div>
                <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Premium Materials</h3>
                <p className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-widest leading-loose">Finest porcelain and bone ash.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[var(--color-secondary)] text-xl">✓</span>
              <div>
                <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Secure Packaging</h3>
                <p className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-widest leading-loose">Guaranteed safe transit.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[var(--color-secondary)] text-xl">✓</span>
              <div>
                <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Timeless Design</h3>
                <p className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-widest leading-loose">Heritage meets modern luxury.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-[var(--color-secondary)] text-xl">✓</span>
              <div>
                <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Nationwide Delivery</h3>
                <p className="text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-widest leading-loose">Fast shipping across India.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <Link href="/products" className="inline-block border-[0.5px] border-[var(--color-primary)] text-[var(--color-primary)] px-12 py-5 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}