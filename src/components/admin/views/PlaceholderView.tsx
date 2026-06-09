'use client';
import React from 'react';
import { Hammer, Blocks } from 'lucide-react';

export default function PlaceholderView({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="max-w-4xl mx-auto pt-20 animate-in fade-in duration-300">
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-16 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
          <Blocks size={32} className="text-[#D4AF37]" />
        </div>
        <h2 className="text-2xl font-bold text-[#18181b] mb-3">{title}</h2>
        <p className="text-zinc-500 max-w-md mx-auto mb-8">{desc}</p>
        <button className="flex items-center gap-2 bg-zinc-100 text-zinc-600 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
          <Hammer size={18} /> Module under construction
        </button>
      </div>
    </div>
  );
}
