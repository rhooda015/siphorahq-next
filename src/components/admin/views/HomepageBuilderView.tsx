'use client';
import React, { useState, useEffect } from 'react';
import { Save, LayoutTemplate, Image as ImageIcon, Type, ArrowUp, ArrowDown, Settings, X, Plus, Loader2 } from 'lucide-react';

export default function HomepageBuilderView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Hero Form State
  const [heroTitle, setHeroTitle] = useState('');
  const [heroButtonText, setHeroButtonText] = useState('');
  const [heroButtonLink, setHeroButtonLink] = useState('');
  const [heroSlides, setHeroSlides] = useState<string[]>([]);
  
  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings/homepage');
      if (res.ok) {
        const data = await res.json();
        setHeroTitle(data.heroTitle);
        setHeroButtonText(data.heroButtonText);
        setHeroButtonLink(data.heroButtonLink);
        setHeroSlides(data.heroSlides);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/settings/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroTitle,
          heroButtonText,
          heroButtonLink,
          heroSlides,
        }),
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSlide = () => {
    setHeroSlides([...heroSlides, '']);
  };

  const handleUpdateSlide = (index: number, val: string) => {
    const newSlides = [...heroSlides];
    newSlides[index] = val;
    setHeroSlides(newSlides);
  };

  const handleRemoveSlide = (index: number) => {
    setHeroSlides(heroSlides.filter((_, i) => i !== index));
  };

  const sections = [
    { id: 1, type: 'Hero Banner', title: 'Main Hero Section', active: true },
    { id: 2, type: 'Featured Grid', title: 'Featured Categories', active: true },
    { id: 3, type: 'Product Carousel', title: 'Best Sellers', active: true },
    { id: 4, type: 'Rich Text', title: 'Brand Story', active: false },
  ];

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Homepage Builder...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
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
          <button onClick={saveSettings} disabled={saving} className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
            Save & Publish
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
              {sections.map((sec) => (
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
                    {sec.type === 'Hero Banner' && (
                      <button onClick={() => setIsEditModalOpen(true)} className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-[#18181b]" title="Edit Hero Banner">
                        <Settings size={14}/>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Wireframe */}
        <div className="w-2/3 bg-zinc-100 rounded-xl shadow-inner border border-zinc-200 overflow-hidden relative flex flex-col items-center p-8">
          <div className="w-full max-w-lg bg-white rounded-t-lg shadow-2xl h-[600px] overflow-hidden flex flex-col border border-zinc-200 relative">
            
            {/* Fake Header */}
            <div className="h-12 border-b border-zinc-100 flex items-center justify-between px-4 shrink-0">
              <div className="w-4 h-4 bg-zinc-200 rounded-sm"></div>
              <div className="w-24 h-4 bg-zinc-200 rounded-sm"></div>
              <div className="w-4 h-4 bg-zinc-200 rounded-sm"></div>
            </div>
            
            {/* Real Live Preview Hero */}
            <div onClick={() => setIsEditModalOpen(true)} className="relative h-64 bg-zinc-800 flex items-center justify-center shrink-0 group border-b-2 border-transparent hover:border-[#D4AF37] transition-colors cursor-pointer overflow-hidden">
               {heroSlides.length > 0 && (
                 <img src={heroSlides[0]} alt="Hero Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
               )}
              <div className="text-center space-y-2 relative z-10 p-4">
                <h2 className="text-white font-serif text-lg md:text-2xl drop-shadow-md">{heroTitle || 'Empty Title'}</h2>
                <div className="bg-white text-black px-4 py-1.5 text-[10px] uppercase tracking-widest inline-block font-bold mt-2">
                  {heroButtonText || 'Button'}
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-20">Edit Hero Banner</div>
            </div>

            {/* Fake Grid */}
            <div className="p-4 shrink-0 group border-b-2 border-transparent hover:border-zinc-300 transition-colors cursor-not-allowed relative opacity-50">
               <div className="w-32 h-5 bg-zinc-200 rounded-sm mx-auto mb-4"></div>
               <div className="grid grid-cols-2 gap-3">
                 <div className="h-24 bg-zinc-100 rounded-sm"></div>
                 <div className="h-24 bg-zinc-100 rounded-sm"></div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal for Hero Banner */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="font-bold text-lg text-[#18181b]">Edit Hero Banner</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Heading Text</label>
                <input 
                  type="text" 
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Button Text</label>
                  <input 
                    type="text" 
                    value={heroButtonText}
                    onChange={(e) => setHeroButtonText(e.target.value)}
                    className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Button Link URL</label>
                  <input 
                    type="text" 
                    value={heroButtonLink}
                    onChange={(e) => setHeroButtonLink(e.target.value)}
                    className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Background Slides (Image URLs)</label>
                <div className="space-y-3">
                  {heroSlides.map((slide, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={slide}
                        onChange={(e) => handleUpdateSlide(idx, e.target.value)}
                        placeholder="e.g. /images/hero.webp"
                        className="flex-1 border border-zinc-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none font-mono" 
                      />
                      <button onClick={() => handleRemoveSlide(idx)} className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><X size={16}/></button>
                    </div>
                  ))}
                  <button onClick={handleAddSlide} className="flex items-center gap-2 text-sm font-bold text-[#18181b] hover:underline p-1">
                    <Plus size={16}/> Add Slide
                  </button>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg font-bold text-sm hover:bg-zinc-100">Cancel</button>
              <button onClick={saveSettings} disabled={saving} className="px-5 py-2.5 bg-[#18181b] text-white rounded-lg font-bold text-sm hover:bg-black flex items-center gap-2">
                {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
