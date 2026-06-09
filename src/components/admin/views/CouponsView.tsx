'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreHorizontal, Copy, Calendar, Loader2, X, Trash2 } from 'lucide-react';

export default function CouponsView() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [code, setCode] = useState('');
  const [desc, setDesc] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [maxUses, setMaxUses] = useState('');
  
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCoupons(data);
      }
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!code || !discountValue || !desc) return alert('Please fill all required fields');
    setSaving(true);
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          desc,
          discountValue: Number(discountValue),
          discountType,
          maxUses: maxUses ? Number(maxUses) : null,
        }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setCode(''); setDesc(''); setDiscountValue(''); setMaxUses('');
        fetchCoupons();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create coupon');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;
    try {
      await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
      fetchCoupons();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCoupons = coupons.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Coupons...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Discount Engine</h1>
          <p className="text-zinc-500 text-sm mt-1">Create promotional codes, BOGO offers, and automated discounts.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search coupons by code..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" 
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-bold text-zinc-500 tracking-wider">
            <tr>
              <th className="px-6 py-4">Coupon Code</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Usage Limits</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filteredCoupons.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No coupons found.</td></tr>
            ) : filteredCoupons.map((c) => (
              <tr key={c._id} className="hover:bg-zinc-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-mono font-bold text-[#18181b] bg-zinc-100 px-3 py-1.5 rounded-md w-fit">
                    {c.code}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{c.desc}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-[#18181b]">
                  {c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`} OFF
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {c.uses} / {c.maxUses ? c.maxUses : '∞'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(c._id)} className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="font-bold text-lg text-[#18181b]">Create New Coupon</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Coupon Code *</label>
                <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="e.g. SUMMER20" className="w-full border border-zinc-300 rounded-lg p-3 text-sm font-mono uppercase" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Internal Description *</label>
                <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Summer Sale 20% off" className="w-full border border-zinc-300 rounded-lg p-3 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Discount Type</label>
                  <select value={discountType} onChange={e => setDiscountType(e.target.value)} className="w-full border border-zinc-300 rounded-lg p-3 text-sm">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Value *</label>
                  <input type="number" value={discountValue} onChange={e => setDiscountValue(e.target.value)} placeholder="20" className="w-full border border-zinc-300 rounded-lg p-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Max Uses (Optional)</label>
                <input type="number" value={maxUses} onChange={e => setMaxUses(e.target.value)} placeholder="Leave blank for unlimited" className="w-full border border-zinc-300 rounded-lg p-3 text-sm" />
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-zinc-200 rounded-lg font-bold text-sm hover:bg-zinc-100">Cancel</button>
              <button onClick={handleCreate} disabled={saving} className="px-5 py-2.5 bg-[#18181b] text-white rounded-lg font-bold text-sm hover:bg-black">
                {saving ? 'Saving...' : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
