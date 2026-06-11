'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save, ListTree, Image as ImageIcon } from 'lucide-react';

export default function CategoriesView() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingCategory._id ? 'PUT' : 'POST';
      const url = editingCategory._id ? `/api/admin/categories/${editingCategory._id}` : '/api/admin/categories';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCategory)
      });
      
      setEditingCategory(null);
      fetchCategories();
    } catch (e) {
      console.error(e);
      alert('Error saving category.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category permanently?')) {
      await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      fetchCategories();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Categories</h1>
          <p className="text-zinc-500 text-sm mt-1">Organize your products into hierarchies.</p>
        </div>
        <button 
          onClick={() => setEditingCategory({ name: '', slug: '', description: '', image: '', isActive: true })} 
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-16">Image</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-zinc-400" /></td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No categories found.</td></tr>
            ) : (
              categories.map(cat => (
                <tr key={cat._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-md object-cover border border-zinc-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{cat.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">/{cat.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cat.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700'}`}>
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setEditingCategory(cat)} className="p-2 text-zinc-500 hover:text-black transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="p-2 text-zinc-500 hover:text-red-600 transition-colors ml-2">
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
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="font-bold text-lg text-zinc-900">{editingCategory._id ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setEditingCategory(null)} className="text-zinc-400 hover:text-black">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Category Name</label>
                <input required type="text" value={editingCategory.name} onChange={e => {
                  const name = e.target.value;
                  const slug = !editingCategory._id ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : editingCategory.slug;
                  setEditingCategory({...editingCategory, name, slug});
                }} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="e.g. Dinner Sets" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">URL Slug</label>
                <input required type="text" value={editingCategory.slug} onChange={e => setEditingCategory({...editingCategory, slug: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="e.g. dinner-sets" />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
                <textarea rows={3} value={editingCategory.description || ''} onChange={e => setEditingCategory({...editingCategory, description: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="Category description..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Image URL</label>
                <input type="text" value={editingCategory.image || ''} onChange={e => setEditingCategory({...editingCategory, image: e.target.value})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:border-black outline-none" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Parent Category</label>
                <select value={editingCategory.parentCategory || ''} onChange={e => setEditingCategory({...editingCategory, parentCategory: e.target.value || null})} className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-white focus:border-black outline-none">
                  <option value="">None (Top Level)</option>
                  {categories.filter(c => c._id !== editingCategory._id).map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="isActive" checked={editingCategory.isActive} onChange={e => setEditingCategory({...editingCategory, isActive: e.target.checked})} className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black" />
                <label htmlFor="isActive" className="text-sm font-medium text-zinc-700">Active (Visible in store)</label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button type="button" onClick={() => setEditingCategory(null)} className="px-5 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:opacity-50">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
