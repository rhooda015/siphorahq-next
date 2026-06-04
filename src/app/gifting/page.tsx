import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `Corporate Gifting | ${BRAND.name}`,
};

export default function GiftingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-[var(--color-primary)] flex items-center justify-center">
        <Image 
          src="/images/gifting.webp" 
          alt="Luxury Corporate Gifting" 
          fill 
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-serif tracking-wide drop-shadow-md mb-6">The Art of Gifting</h1>
          <p className="text-[var(--color-gold-light)] font-sans tracking-[0.3em] uppercase text-xs">Curated for Excellence</p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center border-b-[0.5px] border-[var(--color-border)]">
        <p className="text-[var(--color-text-muted)] font-sans text-sm md:text-[15px] leading-loose">
          Elevate your corporate relationships, celebrate grand weddings, and honor special moments with {BRAND.name}'s luxury gifting collections. Our handcrafted porcelain pieces are beautifully packaged to deliver a memorable unboxing experience.
        </p>
      </section>

      {/* Gifting Categories */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'For Weddings', img: '/images/teaset.webp', desc: 'Timeless dinner sets for the perfect new beginning.' },
            { title: 'Corporate Clients', img: '/images/serveware.webp', desc: 'Sophisticated platters and bowls that leave a lasting impression.' },
            { title: 'Festive Hampers', img: '/images/gifting.webp', desc: 'Curated sets combining our finest pieces for grand celebrations.' }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[var(--color-accent-light)]">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
              </div>
              <h3 className="font-serif text-2xl text-[var(--color-primary)] mb-3 text-center group-hover:text-[var(--color-secondary)] transition-colors">{item.title}</h3>
              <p className="text-center text-[var(--color-text-muted)] font-sans text-xs uppercase tracking-[0.1em] leading-loose px-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20 bg-[var(--color-accent-light)] text-center border-[0.5px] border-[var(--color-border)]">
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-primary)] mb-6">Bespoke Concierge</h2>
        <p className="text-[var(--color-text-muted)] font-sans text-sm mb-10 max-w-2xl mx-auto leading-loose">
          Planning a large event or looking for customized packaging? Connect with our dedicated gifting concierge to curate the perfect selection tailored to your needs.
        </p>
        <Link href="/contact" className="inline-block border-[0.5px] border-[var(--color-primary)] bg-[var(--color-primary)] text-white px-12 py-5 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-500">
          Contact Concierge
        </Link>
      </section>
    </div>
  );
}
