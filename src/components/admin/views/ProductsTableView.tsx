'use client';
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus, Edit, Copy, Eye, Archive, Image as ImageIcon } from 'lucide-react';

export default function ProductsTableView({ products, onEdit, onDelete }: { products: any[], onEdit: (p: any) => void, onDelete: (id: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredProducts = products.filter(p => {
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Products</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage your inventory, pricing, and variants.</p>
        </div>
        <button onClick={() => onEdit({ images: [], variants: [] })} className="flex items-center gap-2 bg-[#18181b] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black transition-colors">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 mr-2">
              <span className="text-sm text-zinc-500 font-medium">{selectedIds.length} selected</span>
              <button 
                onClick={() => {
                  if (confirm(`Delete ${selectedIds.length} products?`)) {
                    selectedIds.forEach(id => onDelete(id));
                    setSelectedIds([]);
                  }
                }}
                className="text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-zinc-600 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
            <Filter size={16} />
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-transparent outline-none font-medium text-[#18181b]">
              <option value="All">All Categories</option>
              <option value="Dinnerware">Dinnerware</option>
              <option value="Tea Sets">Tea Sets</option>
              <option value="Serveware">Serveware</option>
              <option value="Gifting">Gifting</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-600 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent outline-none font-medium text-[#18181b]">
              <option value="All">All Statuses</option>
              <option value="Live">Live</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-50/80 text-zinc-500 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    checked={filteredProducts.length > 0 && selectedIds.length === filteredProducts.length}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(filteredProducts.map(p => p._id));
                      else setSelectedIds([]);
                    }}
                    className="rounded border-zinc-300 text-[#18181b] focus:ring-[#18181b]"
                  />
                </th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Inventory</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredProducts.map((product, i) => (
                <tr key={i} className={`hover:bg-zinc-50/50 transition-colors group ${selectedIds.includes(product._id) ? 'bg-zinc-50' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(product._id)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedIds([...selectedIds, product._id]);
                        else setSelectedIds(selectedIds.filter(id => id !== product._id));
                      }}
                      className="rounded border-zinc-300 text-[#18181b] focus:ring-[#18181b]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden flex-shrink-0">
                        {product.images?.[0]?.url ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={20} className="text-zinc-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-[#18181b] truncate max-w-[250px]">{product.title}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{product.handle || 'No SKU'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      product.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Live' ? 'bg-green-500' : 'bg-zinc-400'}`}></span>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`font-medium ${Number(product.inventoryCount) === 0 ? 'text-red-600' : 'text-[#18181b]'}`}>
                        {product.inventoryCount} in stock
                      </span>
                      {product.variants?.length > 0 && <span className="text-xs text-zinc-500">{product.variants.length} variants</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">{product.category || '—'}</td>
                  <td className="px-6 py-4 font-semibold text-[#18181b]">₹{product.price?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEdit(product)} className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg tooltip-trigger" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg tooltip-trigger" title="Duplicate">
                        <Copy size={16} />
                      </button>
                      <button className="p-2 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg tooltip-trigger" title="Preview">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => onDelete(product._id)} className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg tooltip-trigger" title="Delete/Archive">
                        <Archive size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-zinc-50 px-6 py-4 border-t border-zinc-200 text-xs text-zinc-500 flex justify-between items-center">
          <span>Showing {filteredProducts.length} products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-zinc-300 rounded bg-white hover:bg-zinc-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-zinc-300 rounded bg-white hover:bg-zinc-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
