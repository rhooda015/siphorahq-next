import React from 'react';
import Image from 'next/image';

export default function InspiredLiving() {
  const images = [
    { src: '/images/lifestyle/morning-coffee.webp', title: 'Morning Coffee', span: 'col-span-12 md:col-span-8' },
    { src: '/images/lifestyle/evening-tea.webp', title: 'Evening Tea', span: 'col-span-12 md:col-span-4' },
    { src: '/images/lifestyle/weekend-hosting.webp', title: 'Weekend Hosting', span: 'col-span-12 md:col-span-6' },
    { src: '/images/lifestyle/festive-table.webp', title: 'Festive Table', span: 'col-span-12 md:col-span-6' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-ink-charcoal mb-4">Inspired Living</h2>
          <p className="font-body-md text-on-surface-variant">
            Discover how Siphorahq seamlessly integrates into the moments that matter most.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {images.map((img, index) => (
            <div key={index} className={`relative group overflow-hidden rounded-sm bg-surface-cream ${img.span}`}>
              {/* Fallback color if image is missing */}
              <div className="absolute inset-0 bg-[#E8E1D3]" />
              <Image 
                src={img.src} 
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <span className="font-serif text-white text-2xl drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
