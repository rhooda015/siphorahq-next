'use client';
import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, GripVertical, Trash2, Edit2, Link as LinkIcon, Menu } from 'lucide-react';

export default function NavigationBuilderView() {
  const [activeMenu, setActiveMenu] = useState('main-menu');
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editLink, setEditLink] = useState<any>(null); // For modal

  const menus = [
    { id: 'main-menu', name: 'Main Header Navigation' },
    { id: 'footer-menu-1', name: 'Footer Menu 1' },
    { id: 'footer-menu-2', name: 'Footer Menu 2' },
    { id: 'mobile-menu', name: 'Mobile Sidebar Navigation' }
  ];

  useEffect(() => {
    fetchMenu(activeMenu);
  }, [activeMenu]);

  const fetchMenu = async (menuId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/navigation?menuId=${menuId}`);
      const data = await res.json();
      setLinks(data.links || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSaveMenu = async () => {
    setSaving(true);
    await fetch('/api/admin/navigation', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menuId: activeMenu, name: activeMenu, links })
    });
    setSaving(false);
    alert('Menu saved successfully!');
  };

  const handleAddLink = () => {
    setEditLink({ _idx: -1, label: '', url: '/', subLinks: [] });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    let newLinks = [...links];
    if (editLink._idx === -1) {
      newLinks.push({ label: editLink.label, url: editLink.url, subLinks: editLink.subLinks || [] });
    } else {
      newLinks[editLink._idx] = { label: editLink.label, url: editLink.url, subLinks: editLink.subLinks || [] };
    }
    setLinks(newLinks);
    setEditLink(null);
  };

  const handleDelete = (idx: number) => {
    if (confirm('Delete this menu item?')) {
      const newLinks = [...links];
      newLinks.splice(idx, 1);
      setLinks(newLinks);
    }
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const newLinks = [...links];
    const temp = newLinks[idx - 1];
    newLinks[idx - 1] = newLinks[idx];
    newLinks[idx] = temp;
    setLinks(newLinks);
  };

  const moveDown = (idx: number) => {
    if (idx === links.length - 1) return;
    const newLinks = [...links];
    const temp = newLinks[idx + 1];
    newLinks[idx + 1] = newLinks[idx];
    newLinks[idx] = temp;
    setLinks(newLinks);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Navigation Builder</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage header and footer menus globally.</p>
        </div>
        <button 
          onClick={handleSaveMenu} 
          disabled={saving || loading}
          className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Navigation
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar for Menus */}
        <div className="w-64 bg-white border border-zinc-200 rounded-xl p-4 flex-shrink-0 h-fit">
          <h3 className="font-semibold text-zinc-800 text-sm mb-4 px-2 uppercase tracking-wider">Menus</h3>
          <div className="space-y-1">
            {menus.map(m => (
              <button 
                key={m.id}
                onClick={() => setActiveMenu(m.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeMenu === m.id ? 'bg-zinc-100 text-black' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'}`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Editor */}
        <div className="flex-1">
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Menu className="w-5 h-5 text-zinc-500" />
                <h3 className="font-semibold text-zinc-800">Menu Items</h3>
              </div>
              <button onClick={handleAddLink} className="flex items-center gap-2 text-sm font-medium text-black hover:text-zinc-600 transition-colors">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center p-8"><Loader2 className="animate-spin text-zinc-400" /></div>
              ) : links.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-zinc-200 rounded-xl">
                  <p className="text-zinc-500 text-sm">This menu is currently empty.</p>
                  <button onClick={handleAddLink} className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-zinc-800">Add First Link</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {links.map((link, idx) => (
                    <div key={idx} className="flex items-center bg-white border border-zinc-200 rounded-lg p-3 group hover:border-zinc-300 transition-colors shadow-sm">
                      <div className="flex flex-col gap-1 mr-3 text-zinc-300">
                        <button onClick={() => moveUp(idx)} disabled={idx === 0} className="hover:text-black disabled:opacity-30">▲</button>
                        <button onClick={() => moveDown(idx)} disabled={idx === links.length - 1} className="hover:text-black disabled:opacity-30">▼</button>
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium text-sm text-zinc-900">{link.label}</p>
                        <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5"><LinkIcon className="w-3 h-3"/> {link.url}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditLink({ ...link, _idx: idx })} className="p-2 text-zinc-500 hover:text-black bg-zinc-50 hover:bg-zinc-100 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(idx)} className="p-2 text-red-500 hover:text-white hover:bg-red-500 bg-red-50 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Link Modal */}
      {editLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editLink._idx === -1 ? 'Add Menu Item' : 'Edit Menu Item'}</h2>
              <button onClick={() => setEditLink(null)} className="text-zinc-400 hover:text-black">✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Display Label</label>
                <input required type="text" value={editLink.label} onChange={e => setEditLink({...editLink, label: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="e.g. New Arrivals" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">URL / Link</label>
                <input required type="text" value={editLink.url} onChange={e => setEditLink({...editLink, url: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="e.g. /collections/new-arrivals" />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setEditLink(null)} className="flex-1 bg-white border border-zinc-200 text-black py-2 rounded-lg text-sm font-medium hover:bg-zinc-50">Cancel</button>
                <button type="submit" className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-zinc-800">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
