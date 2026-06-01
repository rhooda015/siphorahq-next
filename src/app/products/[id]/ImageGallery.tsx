"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in md:col-span-2 group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image 
          src={activeImage} 
          fill 
          className="object-cover transition-transform duration-200" 
          style={zoomStyle}
          alt={productName} 
        />
      </div>
      
      {images.slice(1).map((img, idx) => (
        <div 
          key={idx}
          className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-pointer hidden md:block"
          onClick={() => setActiveImage(img)}
        >
          <Image src={img} fill className="object-cover hover:opacity-80 transition-opacity" alt={`${productName} view ${idx+2}`} />
        </div>
      ))}
    </div>
  );
}
