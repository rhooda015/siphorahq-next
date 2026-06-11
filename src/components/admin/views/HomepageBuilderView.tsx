'use client';
import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, GripVertical, Trash2, LayoutTemplate, Image as ImageIcon, AlignLeft } from 'lucide-react';

export default function HomepageBuilderView() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    fetchHomepage();
  }, []);

  const fetchHomepage = async () => {
    try {
      const res = await fetch('/api/admin/homepage');
      const data = await res.json();
      if (data && data.sections) {
        setSections(data.sections);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections })
      });
      alert('Homepage layout saved!');
    } catch (e) {
      console.error(e);
      alert('Error saving homepage.');
    }
    setSaving(false);
  };

  const addSection = (type: string) => {
    const newSection = {
      id: crypto.randomUUID(),
      type,
      props: type === 'hero' ? { title: 'New Hero', subtitle: '', buttonText: 'Shop Now', buttonLink: '/products', image: '', alignment: 'center' } :
             type === 'featured_collection' ? { title: 'Featured Collection', collectionId: '', buttonText: 'View All', limit: 4 } :
             type === 'banner' ? { title: '', subtitle: '', image: '' } :
             type === 'text_block' ? { title: 'Heading', content: 'Add some text here', alignment: 'center' } : {}
    };
    setSections([...sections, newSection]);
    setActiveSection(sections.length);
  };

  const removeSection = (index: number) => {
    if (confirm('Delete this section?')) {
      const newSections = [...sections];
      newSections.splice(index, 1);
      setSections(newSections);
      setActiveSection(null);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    const temp = newSections[index - 1];
    newSections[index - 1] = newSections[index];
    newSections[index] = temp;
    setSections(newSections);
    setActiveSection(index - 1);
  };

  const moveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index + 1];
    newSections[index + 1] = newSections[index];
    newSections[index] = temp;
    setSections(newSections);
    setActiveSection(index + 1);
  };

  const updateProp = (key: string, value: any) => {
    if (activeSection === null) return;
    const newSections = [...sections];
    newSections[activeSection].props[key] = value;
    setSections(newSections);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden">
      
      {/* Left: Section List */}
      <div className="w-80 flex-shrink-0 bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h2 className="font-bold text-zinc-900">Homepage Blocks</h2>
          <button onClick={handleSave} disabled={saving} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex justify-center p-4"><Loader2 className="animate-spin text-zinc-400" /></div>
          ) : sections.length === 0 ? (
            <div className="text-center p-6 border-2 border-dashed border-zinc-200 rounded-xl text-sm text-zinc-500">
              No sections added yet.
            </div>
          ) : (
            sections.map((sec, idx) => (
              <div 
                key={sec.id} 
                className={`flex items-center bg-white border rounded-lg p-3 cursor-pointer transition-colors ${activeSection === idx ? 'border-black shadow-sm ring-1 ring-black' : 'border-zinc-200 hover:border-zinc-300'}`}
                onClick={() => setActiveSection(idx)}
              >
                <div className="flex flex-col gap-1 mr-2 text-zinc-300" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => moveUp(idx)} disabled={idx === 0} className="hover:text-black disabled:opacity-30">▲</button>
                  <button onClick={() => moveDown(idx)} disabled={idx === sections.length - 1} className="hover:text-black disabled:opacity-30">▼</button>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-zinc-900 capitalize">{sec.type.replace('_', ' ')}</p>
                  <p className="text-xs text-zinc-500 truncate">{sec.props.title || 'Untitled'}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeSection(idx); }} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-zinc-200 bg-zinc-50">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Add New Section</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => addSection('hero')} className="flex flex-col items-center gap-1.5 p-3 bg-white border border-zinc-200 rounded-lg hover:border-black transition-colors">
              <ImageIcon className="w-5 h-5 text-zinc-500" />
              <span className="text-[11px] font-medium text-zinc-700">Hero Banner</span>
            </button>
            <button onClick={() => addSection('featured_collection')} className="flex flex-col items-center gap-1.5 p-3 bg-white border border-zinc-200 rounded-lg hover:border-black transition-colors">
              <LayoutTemplate className="w-5 h-5 text-zinc-500" />
              <span className="text-[11px] font-medium text-zinc-700">Collection</span>
            </button>
            <button onClick={() => addSection('text_block')} className="flex flex-col items-center gap-1.5 p-3 bg-white border border-zinc-200 rounded-lg hover:border-black transition-colors">
              <AlignLeft className="w-5 h-5 text-zinc-500" />
              <span className="text-[11px] font-medium text-zinc-700">Text Block</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Section Editor */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-xl flex flex-col overflow-hidden">
        {activeSection !== null && sections[activeSection] ? (
          <>
            <div className="p-4 border-b border-zinc-200 bg-zinc-50">
              <h2 className="font-bold text-zinc-900 capitalize">{sections[activeSection].type.replace('_', ' ')} Settings</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Common Fields */}
              {sections[activeSection].props.title !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Title / Heading</label>
                  <input type="text" value={sections[activeSection].props.title} onChange={e => updateProp('title', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" />
                </div>
              )}

              {sections[activeSection].props.subtitle !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Subtitle / Description</label>
                  <textarea rows={3} value={sections[activeSection].props.subtitle} onChange={e => updateProp('subtitle', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" />
                </div>
              )}

              {sections[activeSection].props.image !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Image URL</label>
                  <input type="text" value={sections[activeSection].props.image} onChange={e => updateProp('image', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="https://..." />
                  {sections[activeSection].props.image && (
                    <img src={sections[activeSection].props.image} alt="Preview" className="mt-3 w-full max-w-sm rounded-lg border border-zinc-200" />
                  )}
                </div>
              )}

              {sections[activeSection].props.buttonText !== undefined && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Button Text</label>
                    <input type="text" value={sections[activeSection].props.buttonText} onChange={e => updateProp('buttonText', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Button Link</label>
                    <input type="text" value={sections[activeSection].props.buttonLink} onChange={e => updateProp('buttonLink', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                </div>
              )}

              {sections[activeSection].type === 'featured_collection' && (
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Product Category Slug (e.g., 'dinner-set')</label>
                  <input type="text" value={sections[activeSection].props.collectionId} onChange={e => updateProp('collectionId', e.target.value)} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" />
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 p-8">
            <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-medium text-zinc-500">Select a section to edit its properties.</p>
          </div>
        )}
      </div>

    </div>
  );
}
