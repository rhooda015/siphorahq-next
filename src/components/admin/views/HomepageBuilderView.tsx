import React from 'react';
import { Save, LayoutTemplate, Image as ImageIcon, Type, ArrowUp, ArrowDown, Settings } from 'lucide-react';

export default function HomepageBuilderView() {
  const sections = [
    { id: 1, type: 'Hero Banner', title: 'Main Hero Section', active: true },
    { id: 2, type: 'Featured Grid', title: 'Featured Categories', active: true },
    { id: 3, type: 'Product Carousel', title: 'Best Sellers', active: true },
    { id: 4, type: 'Rich Text', title: 'Brand Story', active: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Homepage Builder</h1>
          <p className="text-zinc-500 text-sm mt-1">Customize the layout and content of your storefront homepage.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-zinc-200 text-[#18181b] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors">
            Discard Changes
          </button>
          <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
            <Save size={16} /> Save & Publish
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        
        {/* Sidebar Sections List */}
        <div className="w-1/3 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-[#18181b] text-sm uppercase tracking-widest">Active Sections</h2>
              <button className="text-xs font-bold text-[#D4AF37] hover:underline">Add Section</button>
            </div>
            
            <div className="space-y-3">
              {sections.map((sec, idx) => (
                <div key={sec.id} className={`p-4 border rounded-lg flex items-center justify-between group cursor-grab active:cursor-grabbing ${sec.active ? 'border-zinc-200 bg-white shadow-sm' : 'border-dashed border-zinc-300 bg-zinc-50 opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-400 group-hover:text-[#18181b] transition-colors">
                      {sec.type === 'Hero Banner' && <ImageIcon size={18} />}
                      {sec.type === 'Featured Grid' && <LayoutTemplate size={18} />}
                      {sec.type === 'Rich Text' && <Type size={18} />}
                      {sec.type === 'Product Carousel' && <LayoutTemplate size={18} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#18181b]">{sec.title}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{sec.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#18181b]"><ArrowUp size={14}/></button>
                    <button className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#18181b]"><ArrowDown size={14}/></button>
                    <button className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#18181b]"><Settings size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Wireframe */}
        <div className="w-2/3 bg-zinc-100 rounded-xl shadow-inner border border-zinc-200 overflow-hidden relative flex flex-col items-center p-8">
          <div className="w-full max-w-lg bg-white rounded-t-lg shadow-2xl h-[600px] overflow-hidden flex flex-col border border-zinc-200">
            {/* Fake Header */}
            <div className="h-12 border-b border-zinc-100 flex items-center justify-between px-4 shrink-0">
              <div className="w-4 h-4 bg-zinc-200 rounded-sm"></div>
              <div className="w-24 h-4 bg-zinc-200 rounded-sm"></div>
              <div className="w-4 h-4 bg-zinc-200 rounded-sm"></div>
            </div>
            
            {/* Fake Hero */}
            <div className="h-64 bg-zinc-100 relative flex items-center justify-center shrink-0 group border-b-2 border-transparent hover:border-[#D4AF37] transition-colors cursor-pointer">
              <div className="text-center space-y-2">
                <div className="w-32 h-6 bg-zinc-300 rounded-sm mx-auto"></div>
                <div className="w-48 h-3 bg-zinc-200 rounded-sm mx-auto"></div>
                <div className="w-20 h-8 bg-[#18181b] rounded-sm mx-auto mt-4"></div>
              </div>
              <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">Edit Hero Banner</div>
            </div>

            {/* Fake Grid */}
            <div className="p-4 shrink-0 group border-b-2 border-transparent hover:border-[#D4AF37] transition-colors cursor-pointer relative">
               <div className="w-32 h-5 bg-zinc-200 rounded-sm mx-auto mb-4"></div>
               <div className="grid grid-cols-2 gap-3">
                 <div className="h-24 bg-zinc-100 rounded-sm"></div>
                 <div className="h-24 bg-zinc-100 rounded-sm"></div>
               </div>
               <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">Edit Grid</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
