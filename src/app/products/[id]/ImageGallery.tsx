"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});
  const touchStartX = useRef<number | null>(null);

  const validImages = images.filter(Boolean);
  if (validImages.length === 0) return null;

  const activeImage = validImages[activeIndex];

  // Desktop zoom on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2)' });
  };
  const handleMouseLeave = () => setZoomStyle({ transform: 'scale(1)' });

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveIndex(i => Math.min(i + 1, validImages.length - 1));
      else setActiveIndex(i => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      
      {/* ── Thumbnail Strip (left on desktop, bottom row on mobile) ── */}
      {validImages.length > 1 && (
        <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] md:w-20 flex-shrink-0 pb-1 md:pb-0">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border-2 rounded-sm overflow-hidden transition-all ${
                activeIndex === idx
                  ? 'border-[var(--color-primary)] opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <div className="relative w-full h-full bg-[var(--color-accent-light)]">
                <Image
                  src={img}
                  alt={`${productName} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={img.startsWith('data:')}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Main Image ── */}
      <div className="order-1 md:order-2 flex-1 relative">
        {/* Arrow buttons (mobile) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(i => Math.max(i - 1, 0))}
              className={`md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow ${activeIndex === 0 ? 'opacity-30 pointer-events-none' : ''}`}
            >
              <ChevronLeft className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
            <button
              onClick={() => setActiveIndex(i => Math.min(i + 1, validImages.length - 1))}
              className={`md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow ${activeIndex === validImages.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
            >
              <ChevronRight className="w-5 h-5 text-[var(--color-primary)]" />
            </button>
          </>
        )}

        <div
          className="aspect-[4/5] bg-[var(--color-accent-light)] overflow-hidden relative cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={activeImage}
            fill
            className="object-cover transition-transform duration-200"
            style={zoomStyle}
            alt={productName}
            unoptimized={activeImage.startsWith('data:')}
            priority
          />
        </div>

        {/* Dot indicators (mobile) */}
        {validImages.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 md:hidden">
            {validImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all ${
                  activeIndex === idx
                    ? 'w-4 h-1.5 bg-[var(--color-primary)]'
                    : 'w-1.5 h-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
