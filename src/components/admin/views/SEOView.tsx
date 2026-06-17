'use client';
import React, { useState, useEffect } from 'react';
import { Search, Link as LinkIcon, Globe, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

type SEOPage = {
  id: number;
  path: string;
  title: string;
  description: string;
  status: string;
  canonical: string;
};

export default function SEOView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pages, setPages] = useState<SEOPage[]>([
    { id: 1, path: '/', title: 'Siphorahq — Luxury Porcelain Dinnerware India', description: 'Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections.', status: 'Optimized', canonical: 'https://siphorahq.in/' },
    { id: 2, path: '/products', title: 'All Collections | Siphorahq Dinnerware', description: 'Explore our full range of premium porcelain collections.', status: 'Optimized', canonical: 'https://siphorahq.in/products' },
    { id: 3, path: '/our-story', title: 'Our Story & Craftsmanship | Siphorahq', description: 'Learn about our heritage and the artisans behind Siphorahq.', status: 'Needs Improvement', canonical: 'https://siphorahq.in/our-story' },
    { id: 4, path: '/contact', title: 'Contact Support', description: '', status: 'Draft', canonical: 'https://siphorahq.in/contact' },
  ]);

  const [activePageId, setActivePageId] = useState<number>(1);
  const activePage = pages.find(p => p.id === activePageId) || pages[0];

  // Editable fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoSlug, setSeoSlug] = useState('');
  const [seoStatus, setSeoStatus] = useState('');
  const [seoCanonical, setSeoCanonical] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  // Update local form state when active page changes
  useEffect(() => {
    if (activePage) {
      setSeoTitle(activePage.title);
      setSeoDescription(activePage.description);
      setSeoSlug(activePage.path);
      setSeoStatus(activePage.status);
      setSeoCanonical(activePage.canonical);
    }
  }, [activePageId, activePage]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        // Update the root page with global settings
        setPages(prev => prev.map(p => {
          if (p.id === 1) {
            return {
              ...p,
              title: data.seoTitle || p.title,
              description: data.seoDescription || p.description
            };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error('Failed to fetch SEO settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!seoTitle.trim()) {
      toast.error('Page title cannot be empty.');
      return;
    }

    setSaving(true);
    try {
      // If it's the home page, update global settings
      if (activePageId === 1) {
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ seoTitle, seoDescription }),
        });
      }

      // Update local mock state
      setPages(prev => prev.map(p => {
        if (p.id === activePageId) {
          return {
            ...p,
            title: seoTitle,
            description: seoDescription,
            path: seoSlug,
            status: seoStatus,
            canonical: seoCanonical
          };
        }
        return p;
      }));

      toast.success('SEO Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save SEO settings', error);
      toast.error('Failed to save SEO settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading SEO Center...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">SEO Center</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage global meta configurations, canonical tags, and 301 redirects.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-70">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save SEO Changes'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Col: Pages List */}
        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-zinc-200">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder="Search pages..." className="w-full bg-zinc-100 border-none rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-0 outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {pages.map(p => (
              <div 
                key={p.id} 
                onClick={() => setActivePageId(p.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${activePageId === p.id ? 'bg-[#18181b] text-white' : 'hover:bg-zinc-50'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <LinkIcon size={12} className={activePageId === p.id ? 'text-zinc-400' : 'text-zinc-400'} />
                  <span className={`text-xs font-mono ${activePageId === p.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{p.path}</span>
                </div>
                <div className="font-bold text-sm truncate">{p.title || 'Untitled'}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${activePageId === p.id ? 'text-[#D4AF37]' : p.status === 'Optimized' ? 'text-emerald-600' : p.status === 'Draft' ? 'text-zinc-500' : 'text-amber-600'}`}>
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
              <Globe size={18} className="text-zinc-400"/> Edit Meta Data <span className="text-zinc-400 font-mono text-sm ml-2">({seoSlug})</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Slug / Route</label>
                <input 
                  type="text" 
                  value={seoSlug}
                  onChange={(e) => setSeoSlug(e.target.value)}
                  disabled={activePageId === 1}
                  className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none font-medium disabled:opacity-50 disabled:bg-zinc-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Status</label>
                <select 
                  value={seoStatus}
                  onChange={(e) => setSeoStatus(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none bg-white"
                >
                  <option value="Optimized">Optimized</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Canonical URL</label>
              <input 
                type="text" 
                value={seoCanonical}
                onChange={(e) => setSeoCanonical(e.target.value)}
                className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none font-medium text-zinc-600" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                <span>Page Title</span>
                <span className={`font-normal ${seoTitle.length > 60 ? 'text-red-500' : 'text-zinc-400'}`}>{seoTitle.length} / 60 chars</span>
              </label>
              <input 
                type="text" 
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className={`w-full border ${seoTitle.length > 60 ? 'border-red-300 focus:ring-red-500/10' : 'border-zinc-300 focus:ring-[#18181b]/10'} rounded-lg p-3 text-sm focus:ring-2 outline-none font-medium`} 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 flex justify-between">
                <span>Meta Description</span>
                <span className={`font-normal ${seoDescription.length > 160 ? 'text-red-500' : 'text-zinc-400'}`}>{seoDescription.length} / 160 chars</span>
              </label>
              <textarea 
                rows={4} 
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className={`w-full border ${seoDescription.length > 160 ? 'border-red-300 focus:ring-red-500/10' : 'border-zinc-300 focus:ring-[#18181b]/10'} rounded-lg p-3 text-sm focus:ring-2 outline-none leading-relaxed`} 
              />
            </div>
            
            <div className="pt-4 border-t border-zinc-100">
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Search Engine Preview</label>
              <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-200 rounded-full flex items-center justify-center text-[8px] font-bold">S</div>
                  <div className="text-xs text-[#202124]">siphorahq.in <span className="text-zinc-400">›</span> {seoSlug === '/' ? '' : seoSlug.replace('/', '')}</div>
                </div>
                <div className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer truncate">{seoTitle || 'Untitled Page'}</div>
                <div className="text-[13px] text-[#4d5156] leading-snug line-clamp-2">{seoDescription || 'No description provided.'}</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
