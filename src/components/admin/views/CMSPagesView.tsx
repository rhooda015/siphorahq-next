'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, FileText, Check, X } from 'lucide-react';

export default function CMSPagesView() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingPage._id ? 'PUT' : 'POST';
      const url = editingPage._id ? `/api/admin/pages/${editingPage._id}` : '/api/admin/pages';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage)
      });
      
      setEditingPage(null);
      fetchPages();
    } catch (e) {
      console.error(e);
      alert('Error saving page.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this page permanently?')) {
      await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
      fetchPages();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Pages</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage information pages like About, Shipping, etc.</p>
        </div>
        <button 
          onClick={() => setEditingPage({ title: '', slug: '', content: '', isPublished: true, metaTitle: '', metaDescription: '' })} 
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Page
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Page Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-zinc-400" /></td></tr>
            ) : pages.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-zinc-500">No pages created yet.</td></tr>
            ) : (
              pages.map(page => (
                <tr key={page._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-zinc-400" />
                      <span className="font-medium text-zinc-900">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${page.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {page.isPublished ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setEditingPage(page)} className="p-2 text-zinc-500 hover:text-black transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(page._id)} className="p-2 text-zinc-500 hover:text-red-600 transition-colors ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between flex-shrink-0 bg-zinc-50">
              <h2 className="font-bold text-lg text-zinc-900">{editingPage._id ? 'Edit Page' : 'Create Page'}</h2>
              <button onClick={() => setEditingPage(null)} className="text-zinc-400 hover:text-black bg-white p-2 rounded-lg border border-zinc-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Page Title</label>
                  <input required type="text" value={editingPage.title} onChange={e => {
                    const title = e.target.value;
                    const slug = !editingPage._id ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : editingPage.slug;
                    setEditingPage({...editingPage, title, slug});
                  }} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="e.g. Our Story" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">URL Slug</label>
                  <input required type="text" value={editingPage.slug} onChange={e => setEditingPage({...editingPage, slug: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all" placeholder="e.g. our-story" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Content (HTML/Markdown support can be added)</label>
                <textarea required rows={12} value={editingPage.content} onChange={e => setEditingPage({...editingPage, content: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-y font-mono" placeholder="<div class='prose max-w-none'>...</div>" />
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-zinc-800 text-sm flex items-center gap-2">
                  SEO Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Meta Title</label>
                    <input type="text" value={editingPage.metaTitle} onChange={e => setEditingPage({...editingPage, metaTitle: e.target.value})} className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Meta Description</label>
                    <input type="text" value={editingPage.metaDescription} onChange={e => setEditingPage({...editingPage, metaDescription: e.target.value})} className="w-full border border-zinc-300 rounded-md px-3 py-2 text-sm focus:border-black outline-none" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" checked={editingPage.isPublished} onChange={e => setEditingPage({...editingPage, isPublished: e.target.checked})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-black transition-colors">Publish immediately</span>
                </label>
                
                <div className="flex gap-3">
                  <button type="button" onClick={() => setEditingPage(null)} className="px-6 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors">Cancel</button>
                  <button type="submit" disabled={saving} className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Page
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
