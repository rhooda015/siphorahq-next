'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: "Dinner Set", img: "/images/dinnerware_var1.webp", cat: "dinner-set" },
  { name: "Platter", img: "/images/serveware_var1.webp", cat: "serveware" },
  { name: "Plates", img: "/images/cat_plates.webp", cat: "plates" },
  { name: "Snacks Set", img: "/images/cat_snacks.webp", cat: "serveware" },
  { name: "Coffee Mug Set", img: "/images/cat_mugs.webp", cat: "mugs" },
  { name: "Tea Cup Set", img: "/images/teaset.webp", cat: "tea-set" },
  { name: "Cake Stands", img: "/images/cat_cakestand.webp", cat: "serveware" },
  { name: "Opal Glass", img: "/images/cat_opalglass.webp", cat: "dinner-set" },
];

export default function CategoryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Update active dot based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const index = Math.round((scrollLeft / maxScroll) * 2); // Map to 3 dots (0, 1, 2)
        setActiveIndex(Math.min(Math.max(index, 0), 2));
      }
    };
    
    const refCurrent = scrollRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('scroll', handleScroll);
      return () => refCurrent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto mb-8 relative group">
      
      {/* Luxury Left Button */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-white/20 backdrop-blur-md text-[#D4AF37] flex justify-center items-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1),_0_2px_10px_rgba(212,175,55,0.12)] transition-all duration-400 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 disabled:opacity-0 hidden md:flex"
        aria-label="Scroll left"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform duration-300 group-hover:-translate-x-0.5"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
      </button>

      {/* Carousel Container with Edge Fading */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)'
        }}
      >
        <div 
          ref={scrollRef}
          className="flex justify-start overflow-x-auto gap-6 md:gap-10 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory px-[8%]"
        >
          {categories.map((cat, idx) => (
            <Link href={`/products?category=${cat.cat}`} key={idx} className="flex flex-col items-center group/card min-w-[110px] md:min-w-[130px] snap-center cursor-pointer">
              
              {/* Image Wrapper with Luxury Double Ring */}
              <div className="relative w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-full p-[5px] border-[1.5px] border-[#D4AF37] bg-[var(--color-bg)] overflow-visible mb-5 transition-all duration-400 group-hover/card:border-white group-hover/card:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex justify-center items-center">
                
                {/* Inner Image */}
                <div className="w-full h-full rounded-full overflow-hidden relative">
                   <Image 
                     src={cat.img} 
                     alt={cat.name} 
                     fill 
                     sizes="(max-width: 768px) 110px, 130px" 
                     priority={idx < 5} 
                     className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-110" 
                   />
                </div>
              </div>

              <span className="text-[11px] md:text-sm text-[var(--color-primary)] font-serif tracking-[0.1em] uppercase text-center transition-colors duration-300 group-hover/card:text-[#D4AF37] max-w-[130px] leading-relaxed">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Luxury Right Button */}
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-white/20 backdrop-blur-md text-[#D4AF37] flex justify-center items-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.1),_0_2px_10px_rgba(212,175,55,0.12)] transition-all duration-400 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-white hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Scroll right"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
      </button>

      {/* Luxury Pill Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`h-2 rounded-full transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
              activeIndex === i 
                ? 'w-7 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                : 'w-2 bg-[#D4AF37]/20'
            }`}
            onClick={() => {
              if (scrollRef.current) {
                const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                scrollRef.current.scrollTo({ left: (maxScroll / 2) * i, behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
