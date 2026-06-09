import React from 'react';
import { Plus, Search, MoreHorizontal, Copy, Calendar } from 'lucide-react';

export default function CouponsView() {
  const coupons = [
    { id: 1, code: 'WELCOME10', type: 'Percentage', value: '10%', usage: '145 / ∞', status: 'Active', expiry: 'Never' },
    { id: 2, code: 'FESTIVE500', type: 'Fixed Amount', value: '₹500', usage: '42 / 100', status: 'Active', expiry: 'Oct 31, 2026' },
    { id: 3, code: 'FREESHIP', type: 'Free Shipping', value: 'Free', usage: '890 / ∞', status: 'Active', expiry: 'Never' },
    { id: 4, code: 'FLASH20', type: 'Percentage', value: '20%', usage: '500 / 500', status: 'Expired', expiry: 'Jan 1, 2026' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Discount Engine</h1>
          <p className="text-zinc-500 text-sm mt-1">Create promotional codes, BOGO offers, and automated discounts.</p>
        </div>
        <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="Search coupons by code..." className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-bold text-zinc-500 tracking-wider">
            <tr>
              <th className="px-6 py-4">Coupon Code</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Discount Type</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Usage Limits</th>
              <th className="px-6 py-4">Expiry Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-mono font-bold text-[#18181b] bg-zinc-100 px-3 py-1.5 rounded-md w-fit">
                    {c.code}
                    <Copy size={12} className="text-zinc-400 hover:text-[#18181b]" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-zinc-600">{c.type}</td>
                <td className="px-6 py-4 font-bold text-[#18181b]">{c.value}</td>
                <td className="px-6 py-4 text-zinc-500">{c.usage}</td>
                <td className="px-6 py-4 text-zinc-500 flex items-center gap-1.5">
                  <Calendar size={14} className="text-zinc-400"/> {c.expiry}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-400 hover:text-[#18181b] p-1 rounded-md hover:bg-zinc-100 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
