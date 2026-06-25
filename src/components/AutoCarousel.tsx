import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AutoCarouselClient from './AutoCarouselClient';

const SLIDES = [
  {
    image: "/images/homepage/hero_tea_set.webp",
    badge: "Est. 2024",
    title: "The Art of Fine Porcelain",
    description: "Experience the quiet luxury of timeless craftsmanship in every piece.",
    buttons: [
      { text: "Shop Dinnerware", href: "/collections/dinnerware", primary: true },
      { text: "The Collection", href: "/products", primary: false }
    ]
  },
  {
    image: "/images/homepage/gifting.webp",
    badge: "New Season",
    title: "Signature Gifting Sets",
    description: "Hand-curated collections delivered in our iconic premium packaging.",
    buttons: [
      { text: "Browse Gift Sets", href: "/collections/gifting", primary: true },
      { text: "Gift Concierge", href: "/contact", primary: false }
    ]
  }
];

export default function AutoCarousel() {
  const firstSlide = SLIDES[0];

  return (
    <section className="relative h-[80svh] md:h-screen w-full overflow-hidden bg-black">
      {/* Static First Slide Server Rendered immediately */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={firstSlide.image}
          alt={firstSlide.title}
          fill
          priority={true}
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-surface-cream px-6">
          <span className="font-label-caps text-sm tracking-[0.3em] mb-6 uppercase text-burnished-gold">
            {firstSlide.badge}
          </span>
          <h2 className="font-display-lg text-4xl sm:text-6xl lg:text-8xl mb-6 max-w-4xl leading-[1.1] drop-shadow-lg">
            {firstSlide.title}
          </h2>
          <p className="font-body-lg text-base sm:text-xl mb-10 max-w-2xl opacity-90 drop-shadow-md">
            {firstSlide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {firstSlide.buttons.map((btn, i) => (
              <Link 
                key={i} 
                href={btn.href}
                className={`
                  px-10 py-4 font-button text-[12px] uppercase tracking-widest transition-all duration-300 w-full sm:w-auto
                  ${btn.primary 
                    ? "bg-surface-cream text-ink-charcoal hover:bg-burnished-gold hover:text-white" 
                    : "border border-surface-cream text-surface-cream hover:bg-surface-cream hover:text-ink-charcoal"}
                `}
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Client Carousel Layer hydrates later */}
      <AutoCarouselClient slides={SLIDES} />
    </section>
  );
}
