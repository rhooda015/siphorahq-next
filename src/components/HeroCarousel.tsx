"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { id: 1, img: "/images/hero.png" },
    { id: 2, img: "/images/serveware.png" },
    { id: 3, img: "/images/gifting.png" },
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
          <Image src={slide.img} alt={`Slide ${slide.id}`} fill priority={index === 0} className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}
      
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
