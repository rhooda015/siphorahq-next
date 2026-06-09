"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroCarouselProps {
  slides: string[];
  title: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroCarousel({ slides, title, buttonText, buttonLink }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fallback to default slides if none provided
  const heroSlides = slides && slides.length > 0 
    ? slides.map((img, id) => ({ id, img }))
    : [
        { id: 1, img: "/images/hero.webp" },
        { id: 2, img: "/images/serveware.webp" },
        { id: 3, img: "/images/gifting.webp" },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-[var(--color-accent-light)] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image 
            src={slide.img} 
            alt={`Slide ${slide.id}`} 
            fill 
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="object-cover object-center" 
            sizes="100vw" 
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
        <h2 className="text-white text-4xl md:text-6xl font-serif mb-6 text-center shadow-sm drop-shadow-lg tracking-wide max-w-4xl leading-tight">
          {title || 'Handcrafted Porcelain for Timeless Gatherings'}
        </h2>
        <a 
          href={buttonLink || '/products'} 
          className="pointer-events-auto bg-white text-[var(--color-primary)] px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg"
        >
          {buttonText || 'Shop Now'}
        </a>
      </div>
      
      {/* Slider Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-[var(--color-primary)]' : 'bg-white/70 hover:bg-white'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
