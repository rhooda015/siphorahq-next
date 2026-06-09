import React from 'react';
import { Plus, Image as ImageIcon, Folders, MoreVertical, Search } from 'lucide-react';

export default function CollectionsView() {
  const collections = [
    { id: 1, name: 'Tea Sets', products: 12, status: 'Active', image: '/images/teaset.webp' },
    { id: 2, name: 'Dinner Sets', products: 8, status: 'Active', image: null },
    { id: 3, name: 'Gifting', products: 24, status: 'Active', image: null },
    { id: 4, name: 'Platters & Bowls', products: 5, status: 'Draft', image: null },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Collections</h1>
          <p className="text-zinc-500 text-sm mt-1">Organize products into manual or automated collections.</p>
        </div>
        <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Plus size={16} /> Create Collection
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="Search collections..." className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(col => (
          <div key={col.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-40 bg-zinc-100 relative flex items-center justify-center border-b border-zinc-200">
              {col.image ? (
                <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-zinc-400 group-hover:scale-110 transition-transform">
                  <Folders size={24} />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-zinc-600 hover:text-black shadow-sm">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#18181b] text-lg">{col.name}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${col.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                  {col.status}
                </span>
              </div>
              <p className="text-sm text-zinc-500 font-medium">{col.products} Products</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
