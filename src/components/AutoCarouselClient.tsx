"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  image: string;
  badge: string;
  title: string;
  description: string;
  buttons: { text: string; href: string; primary: boolean }[];
}

interface AutoCarouselClientProps {
  slides: Slide[];
}

export default function AutoCarouselClient({ slides }: AutoCarouselClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!isMounted) return null;

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-1000 ease-in-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image 
              src={slide.image}
              alt={slide.title}
              fill
              priority={false}
              className="object-cover"
              sizes="100vw"
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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-transform duration-500 origin-center ${
              index === currentSlide ? "bg-burnished-gold scale-x-[3]" : "bg-white/50 scale-x-100"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
