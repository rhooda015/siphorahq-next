"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80svh] md:h-screen w-full overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-1000 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image 
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-surface-cream px-6">
              <span className="font-label-caps text-sm tracking-[0.3em] mb-6 uppercase text-burnished-gold">
                {slide.badge}
              </span>
              <h2 className="font-display-lg text-4xl sm:text-6xl lg:text-8xl mb-6 max-w-4xl leading-[1.1] drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="font-body-lg text-base sm:text-xl mb-10 max-w-2xl opacity-90 drop-shadow-md">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {slide.buttons.map((btn, i) => (
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
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-burnished-gold w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
