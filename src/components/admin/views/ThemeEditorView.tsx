'use client';
import React, { useState, useEffect } from 'react';
import { Save, Loader2, Palette, Type, Layout } from 'lucide-react';

export default function ThemeEditorView() {
  const [theme, setTheme] = useState<any>({
    primaryColor: '#D4AF37',
    secondaryColor: '#1A1A1A',
    accentColor: '#F9F6F0',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'DM Sans',
    borderRadius: '0px',
    layoutWidth: '1280px'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/theme')
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) setTheme(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/theme', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme)
    });
    setSaving(false);
    alert('Theme saved successfully! Refresh storefront to see changes.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTheme({ ...theme, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Theme Editor</h1>
          <p className="text-zinc-500 text-sm mt-1">Customize your storefront's global design tokens.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Colors */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Palette className="w-5 h-5 text-zinc-500" />
            <h3 className="font-semibold text-zinc-800">Brand Colors</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Primary Color (Gold)</label>
              <div className="flex items-center gap-3">
                <input type="color" name="primaryColor" value={theme.primaryColor || '#D4AF37'} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" name="primaryColor" value={theme.primaryColor || '#D4AF37'} onChange={handleChange} className="border border-zinc-300 rounded-md px-3 py-2 text-sm uppercase flex-1 font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Secondary Color (Dark)</label>
              <div className="flex items-center gap-3">
                <input type="color" name="secondaryColor" value={theme.secondaryColor || '#1A1A1A'} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" name="secondaryColor" value={theme.secondaryColor || '#1A1A1A'} onChange={handleChange} className="border border-zinc-300 rounded-md px-3 py-2 text-sm uppercase flex-1 font-mono" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Accent/Background Color</label>
              <div className="flex items-center gap-3">
                <input type="color" name="accentColor" value={theme.accentColor || '#F9F6F0'} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <input type="text" name="accentColor" value={theme.accentColor || '#F9F6F0'} onChange={handleChange} className="border border-zinc-300 rounded-md px-3 py-2 text-sm uppercase flex-1 font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Type className="w-5 h-5 text-zinc-500" />
            <h3 className="font-semibold text-zinc-800">Typography</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Heading Font</label>
              <select name="headingFont" value={theme.headingFont} onChange={handleChange} className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm bg-white">
                <option value="Cormorant Garamond">Cormorant Garamond (Default)</option>
                <option value="Playfair Display">Playfair Display</option>
                <option value="Cinzel">Cinzel</option>
                <option value="Inter">Inter (Modern)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Body Font</label>
              <select name="bodyFont" value={theme.bodyFont} onChange={handleChange} className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm bg-white">
                <option value="DM Sans">DM Sans (Default)</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center gap-3">
            <Layout className="w-5 h-5 text-zinc-500" />
            <h3 className="font-semibold text-zinc-800">Layout Constraints</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Max Layout Width</label>
              <select name="layoutWidth" value={theme.layoutWidth} onChange={handleChange} className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm bg-white">
                <option value="1280px">1280px (Standard)</option>
                <option value="1440px">1440px (Wide)</option>
                <option value="1536px">1536px (Extra Wide)</option>
                <option value="100%">100% (Full Width)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Global Border Radius</label>
              <select name="borderRadius" value={theme.borderRadius} onChange={handleChange} className="w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm bg-white">
                <option value="0px">0px (Sharp - Luxury)</option>
                <option value="4px">4px (Subtle)</option>
                <option value="8px">8px (Modern)</option>
                <option value="16px">16px (Rounded)</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
