'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Folders, MoreVertical, Search, Loader2, X, Trash2 } from 'lucide-react';

export default function CollectionsView() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [handle, setHandle] = useState('');

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/admin/collections');
      if (res.ok) {
        const data = await res.json();
        setCollections(data);
      }
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title || !handle) return alert('Title and Handle are required');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, handle, type: 'manual' }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setTitle('');
        setHandle('');
        fetchCollections();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create collection');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    try {
      await fetch(`/api/admin/collections?id=${id}`, { method: 'DELETE' });
      fetchCollections();
    } catch (error) {
      console.error(error);
    }
  };

  // Auto-generate handle from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setHandle(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const filteredCollections = collections.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase()) || 
    c.handle?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Collections...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Collections</h1>
          <p className="text-zinc-500 text-sm mt-1">Organize products into manual or automated collections.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Plus size={16} /> Create Collection
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search collections..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" 
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollections.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-zinc-200 text-zinc-500">
            No collections found. Create your first collection.
          </div>
        ) : filteredCollections.map(col => (
          <div key={col._id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-40 bg-zinc-100 relative flex items-center justify-center border-b border-zinc-200">
              {col.image ? (
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-zinc-400 group-hover:scale-110 transition-transform">
                  <Folders size={24} />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={() => handleDelete(col._id)} className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 shadow-sm">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#18181b] text-lg">{col.title}</h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${col.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                  {col.isActive ? 'Active' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mb-2">/{col.handle}</p>
              <p className="text-sm text-zinc-500 font-medium">{col.products?.length || 0} Products</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="font-bold text-lg text-[#18181b]">Create Collection</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Collection Title *</label>
                <input type="text" value={title} onChange={handleTitleChange} placeholder="e.g. Summer Dinnerware" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">URL Handle *</label>
                <input type="text" value={handle} onChange={e => setHandle(e.target.value)} placeholder="summer-dinnerware" className="w-full border border-zinc-300 rounded-lg p-3 text-sm font-mono text-zinc-600 bg-zinc-50 outline-none" />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg font-bold text-sm hover:bg-zinc-100">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="px-5 py-2.5 bg-[#18181b] text-white rounded-lg font-bold text-sm hover:bg-black">
                {saving ? 'Creating...' : 'Create Collection'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
