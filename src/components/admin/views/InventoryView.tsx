'use client';
import React, { useState } from 'react';
import { Search, Filter, AlertCircle, Package, Check, RefreshCw } from 'lucide-react';

export default function InventoryView({ products, onUpdateStock }: { products: any[], onUpdateStock: (id: string, newStock: number) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All'); // All, Low Stock, Out of Stock
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState<number>(0);

  const filteredProducts = products.filter(p => {
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    const stock = Number(p.stock) || 0;
    if (filter === 'Low Stock' && (stock >= 10 || stock === 0)) return false;
    if (filter === 'Out of Stock' && stock > 0) return false;
    return true;
  });

  const handleSave = (id: string) => {
    onUpdateStock(id, editVal);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Inventory Management</h2>
          <p className="text-sm text-zinc-500 mt-1">Track stock levels and quickly restock products.</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-500">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Total Products</p>
            <h3 className="text-2xl font-bold text-[#18181b]">{products.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Low Stock (&lt; 10)</p>
            <h3 className="text-2xl font-bold text-[#18181b]">{products.filter(p => Number(p.stock) > 0 && Number(p.stock) < 10).length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Out of Stock</p>
            <h3 className="text-2xl font-bold text-[#18181b]">{products.filter(p => Number(p.stock) === 0).length}</h3>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search inventory by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-zinc-600 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50 w-full md:w-auto">
          <Filter size={16} />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent outline-none font-medium text-[#18181b]">
            <option value="All">All Inventory</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-zinc-50/80 text-zinc-500 text-[11px] font-bold uppercase tracking-wider border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredProducts.map((p) => {
                const stock = Number(p.stock) || 0;
                let statusBadge = <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-medium text-xs">In Stock</span>;
                if (stock === 0) {
                  statusBadge = <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-medium text-xs">Out of Stock</span>;
                } else if (stock < 10) {
                  statusBadge = <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded font-medium text-xs">Low Stock</span>;
                }

                return (
                  <tr key={p._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                          {p.images && p.images[0] ? (
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                              <Package size={16} className="text-zinc-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#18181b]">{p.title}</p>
                          <p className="text-xs text-zinc-500">{p.category || 'Uncategorized'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 font-medium">{p.sku || '-'}</td>
                    <td className="px-6 py-4">{statusBadge}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${stock === 0 ? 'text-red-600' : stock < 10 ? 'text-amber-600' : 'text-[#18181b]'}`}>
                        {stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editingId === p._id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            className="w-20 px-2 py-1 border border-zinc-300 rounded text-sm outline-none focus:border-[#18181b]"
                            value={editVal}
                            onChange={(e) => setEditVal(Number(e.target.value))}
                            autoFocus
                          />
                          <button onClick={() => handleSave(p._id)} className="bg-[#18181b] text-white p-1.5 rounded hover:bg-black">
                            <Check size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => { setEditingId(p._id); setEditVal(stock); }}
                          className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-[#18181b] border border-zinc-200 px-3 py-1.5 rounded-lg bg-white shadow-sm transition-colors"
                        >
                          <RefreshCw size={14} /> Update
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    <Package size={32} className="mx-auto text-zinc-300 mb-3" />
                    <p className="font-medium text-[#18181b]">No products found</p>
                    <p className="text-sm mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
