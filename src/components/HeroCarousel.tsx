"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
        { id: 2, img: "/images/teaset.webp" },
      ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Slower, more editorial pacing
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-[#f8f7f5] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Subtle Slow Zoom Effect for Cinematic Feel */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image 
              src={heroSlides[currentSlide].img} 
              alt={`Siphorahq Luxury Collection ${currentSlide + 1}`} 
              fill 
              priority
              fetchPriority="high"
              className="object-cover object-center" 
              sizes="100vw" 
              quality={100}
            />
          </motion.div>
          {/* Refined gradient overlay for text legibility without muddying the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center z-20 pointer-events-none px-6 pb-24 md:pb-0">
        <motion.div 
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          <span className="text-white/80 uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 font-sans font-light">
            Siphorahq Heritage
          </span>
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-10 drop-shadow-lg tracking-wide leading-[1.15]">
            {title || 'Luxury Porcelain & Fine Dining'}
          </h2>
          
          <a 
            href={buttonLink || '/products'} 
            className="pointer-events-auto group relative flex items-center justify-center overflow-hidden border border-white/60 bg-transparent px-10 py-4 uppercase tracking-[0.25em] text-[10px] md:text-xs text-white transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <span className="relative z-10 transition-colors duration-500">{buttonText || 'Discover the Collection'}</span>
          </a>
        </motion.div>
      </div>
      
      {/* Editorial Slider Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {heroSlides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-2 px-1 flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`h-[1px] transition-all duration-700 ease-out ${index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/40 group-hover:bg-white/80 group-hover:w-6'}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
