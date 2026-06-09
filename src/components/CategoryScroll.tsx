'use client';
import React, { useRef } from 'react';
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 px-4 max-w-7xl mx-auto border-b-[0.5px] border-[var(--color-border)] mb-8 relative group">
      {/* Left Button */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      <div 
        ref={scrollRef}
        className="flex justify-start overflow-x-auto gap-6 md:gap-8 lg:gap-10 pb-4 hide-scrollbar snap-x snap-mandatory px-6 md:px-10"
      >
        {categories.map((cat, idx) => (
          <Link href={`/products?category=${cat.cat}`} key={idx} className="flex flex-col items-center group/item min-w-[100px] md:min-w-[110px] snap-start">
            <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden mb-4 relative bg-[var(--color-accent-light)] transition-all duration-700 opacity-90 grayscale-[30%] group-hover/item:grayscale-0 group-hover/item:opacity-100">
              <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 100px, 110px" priority={idx < 4} className="object-cover group-hover/item:scale-105 transition-transform duration-1000" />
            </div>
            <span className="text-[10px] md:text-[11px] text-[var(--color-primary)] font-sans tracking-[0.2em] uppercase text-center transition-all max-w-[120px] leading-relaxed">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Right Button */}
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1.5 md:p-2 rounded-full shadow-md opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </section>
  );
}
