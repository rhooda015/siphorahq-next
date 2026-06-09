'use client';
import React, { useState, useEffect } from 'react';
import { UploadCloud, Search, Folder, MoreVertical, Image as ImageIcon, Loader2, X, Trash2 } from 'lucide-react';

export default function MediaLibraryView() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!name || !url) return alert('Name and URL are required');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url, type: 'image/webp' }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setName('');
        setUrl('');
        fetchMedia();
      } else {
        alert('Failed to upload media');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      fetchMedia();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMedia = media.filter(m => 
    m.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Media Library...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Media Library</h1>
          <p className="text-zinc-500 text-sm mt-1">Centralized storage for all high-resolution product images and videos.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
            <UploadCloud size={16} /> Add Media URL
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search media by filename..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" 
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-zinc-200 text-zinc-500">
            No media found in the library.
          </div>
        ) : filteredMedia.map(m => (
          <div key={m._id} className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="aspect-square bg-zinc-100 relative flex items-center justify-center border-b border-zinc-200">
              {m.url ? (
                <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-zinc-300 w-12 h-12" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                <button onClick={() => handleDelete(m._id)} className="bg-red-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-600 transition-colors shadow-sm flex items-center gap-1">
                  <Trash2 size={12}/> Delete
                </button>
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#18181b] text-xs truncate" title={m.name}>{m.name}</h3>
                <p className="text-[10px] text-zinc-500 font-medium uppercase mt-1">{m.type?.split('/')[1] || 'URL'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="font-bold text-lg text-[#18181b]">Add Media URL</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">File Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. hero-banner.webp" className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Public URL *</label>
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full border border-zinc-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg font-bold text-sm hover:bg-zinc-100">Cancel</button>
              <button onClick={handleUpload} disabled={saving} className="px-5 py-2.5 bg-[#18181b] text-white rounded-lg font-bold text-sm hover:bg-black">
                {saving ? 'Saving...' : 'Add Media'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
