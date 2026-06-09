import React from 'react';
import { Search, Link as LinkIcon, Globe, Save } from 'lucide-react';

export default function SEOView() {
  const pages = [
    { id: 1, path: '/', title: 'Siphorahq — Luxury Porcelain Dinnerware India', status: 'Optimized' },
    { id: 2, path: '/products', title: 'All Collections | Siphorahq Dinnerware', status: 'Optimized' },
    { id: 3, path: '/our-story', title: 'Our Story & Craftsmanship | Siphorahq', status: 'Needs Improvement' },
    { id: 4, path: '/contact', title: 'Contact Support', status: 'Draft' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">SEO Center</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage global meta configurations, canonical tags, and 301 redirects.</p>
        </div>
        <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Col: Pages List */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-200">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder="Search pages..." className="w-full bg-zinc-100 border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-0 outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {pages.map(p => (
              <div key={p.id} className={`p-3 rounded-lg cursor-pointer transition-colors ${p.id === 1 ? 'bg-[#18181b] text-white' : 'hover:bg-zinc-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <LinkIcon size={12} className={p.id === 1 ? 'text-zinc-400' : 'text-zinc-400'} />
                  <span className={`text-xs font-mono ${p.id === 1 ? 'text-zinc-300' : 'text-zinc-500'}`}>{p.path}</span>
                </div>
                <div className="font-bold text-sm truncate">{p.title}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${p.id === 1 ? 'text-[#D4AF37]' : p.status === 'Optimized' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {p.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Editor */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 space-y-5">
            <h2 className="font-bold text-[#18181b] text-lg mb-2 flex items-center gap-2">
              <Globe size={18} className="text-zinc-400"/> Edit Meta Data <span className="text-zinc-400 font-mono text-sm ml-2">(/)</span>
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                <span>Page Title</span>
                <span className="text-zinc-400 font-normal">51 / 60 chars</span>
              </label>
              <input type="text" defaultValue="Siphorahq — Luxury Porcelain Dinnerware India" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                <span>Meta Description</span>
                <span className="text-zinc-400 font-normal">142 / 160 chars</span>
              </label>
              <textarea rows={4} defaultValue="Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide." className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none leading-relaxed" />
            </div>
            
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Search Engine Preview</label>
              <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-200 rounded-full flex items-center justify-center text-[8px] font-bold">S</div>
                  <div className="text-xs text-[#202124]">siphorahq.in <span className="text-zinc-400">›</span></div>
                </div>
                <div className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer">Siphorahq — Luxury Porcelain Dinnerware India</div>
                <div className="text-[13px] text-[#4d5156] leading-snug">Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide.</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
