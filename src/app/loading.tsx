import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20 animate-pulse">
      
      {/* Top Announcement Bar Shimmer */}
      <div className="bg-zinc-200 h-10 w-full"></div>

      {/* Hero Carousel Shimmer */}
      <div className="w-full h-[60vh] md:h-[85vh] bg-zinc-200"></div>

      {/* Circular Categories List Shimmer */}
      <section className="py-20 px-4 max-w-7xl mx-auto border-b-[0.5px] border-[var(--color-border)] mb-24">
        <div className="flex justify-start overflow-hidden gap-6 md:gap-8 lg:gap-10 pb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[100px] md:min-w-[110px]">
              <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-full bg-zinc-200 mb-4"></div>
              <div className="h-2 w-16 bg-zinc-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals Shimmer */}
      <section className="bg-[#FAF9F7] py-24 mb-24 border-y-[0.5px] border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 w-64 bg-zinc-200 mx-auto mb-16 rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-200 mb-6"></div>
                <div className="h-6 w-32 bg-zinc-200 rounded mb-3"></div>
                <div className="h-3 w-40 bg-zinc-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Row Shimmer */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="h-10 w-48 bg-zinc-200 mx-auto mb-12 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="flex flex-col">
              <div className="aspect-[4/5] bg-zinc-200 mb-4"></div>
              <div className="h-4 w-3/4 bg-zinc-200 mb-2 rounded"></div>
              <div className="h-4 w-1/4 bg-zinc-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
