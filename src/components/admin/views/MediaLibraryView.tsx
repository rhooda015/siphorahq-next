import React from 'react';
import { UploadCloud, Search, Folder, MoreVertical, Image as ImageIcon } from 'lucide-react';

export default function MediaLibraryView() {
  const media = [
    { id: 1, name: 'hero-banner-spring.webp', size: '1.2 MB', date: '2 days ago', type: 'image/webp' },
    { id: 2, name: 'teaset-gold-rim-main.png', size: '3.4 MB', date: '5 days ago', type: 'image/png' },
    { id: 3, name: 'packaging-box-shot.jpg', size: '840 KB', date: '1 week ago', type: 'image/jpeg' },
    { id: 4, name: 'dinner-plate-floral.webp', size: '1.8 MB', date: '2 weeks ago', type: 'image/webp' },
    { id: 5, name: 'lifestyle-shoot-1.jpg', size: '4.2 MB', date: '1 month ago', type: 'image/jpeg' },
    { id: 6, name: 'promo-video-social.mp4', size: '18 MB', date: '1 month ago', type: 'video/mp4' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Media Library</h1>
          <p className="text-zinc-500 text-sm mt-1">Centralized storage for all high-resolution product images and videos.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-zinc-200 text-[#18181b] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors flex items-center gap-2">
            <Folder size={16} /> New Folder
          </button>
          <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
            <UploadCloud size={16} /> Upload Media
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="Search media by filename..." className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(m => (
          <div key={m.id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="aspect-square bg-zinc-100 relative flex items-center justify-center border-b border-zinc-200">
              <ImageIcon className="text-zinc-300 w-12 h-12" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                <button className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-bold hover:scale-105 transition-transform shadow-sm">View</button>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#18181b] text-xs truncate" title={m.name}>{m.name}</h3>
                <p className="text-[10px] text-zinc-500 font-medium uppercase mt-1">{m.type.split('/')[1]}</p>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-100">
                <p className="text-[10px] text-zinc-400">{m.size}</p>
                <button className="text-zinc-400 hover:text-[#18181b] transition-colors"><MoreVertical size={14}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
