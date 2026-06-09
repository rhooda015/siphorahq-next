import React from 'react';
import { Plus, Search, MoreHorizontal, Download, Mail } from 'lucide-react';

export default function CustomersView() {
  const customers = [
    { id: 'CUS-1001', name: 'Rohan Sharma', email: 'rohan.s@example.com', orders: 4, spent: '₹12,400', lastActive: '2 days ago', status: 'VIP' },
    { id: 'CUS-1002', name: 'Priya Desai', email: 'priya.d@example.com', orders: 1, spent: '₹3,200', lastActive: '5 days ago', status: 'New' },
    { id: 'CUS-1003', name: 'Amit Kumar', email: 'amit.k@example.com', orders: 2, spent: '₹5,800', lastActive: '1 week ago', status: 'Active' },
    { id: 'CUS-1004', name: 'Sneha Gupta', email: 'sneha.g@example.com', orders: 7, spent: '₹28,500', lastActive: 'Just now', status: 'VIP' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Customers</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your customer relationships and view purchase history.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-zinc-200 text-[#18181b] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="bg-[#18181b] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center gap-2">
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="Search customers by name, email, or ID..." className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-bold text-zinc-500 tracking-wider">
            <tr>
              <th className="px-6 py-4">Customer Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4">Total Spent</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center font-bold text-xs">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#18181b]">{c.name}</div>
                      <div className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5"><Mail size={10} /> {c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${c.status === 'VIP' ? 'bg-[#D4AF37]/20 text-[#9c8128]' : c.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-[#18181b]">{c.orders}</td>
                <td className="px-6 py-4 font-bold text-[#18181b]">{c.spent}</td>
                <td className="px-6 py-4 text-zinc-500">{c.lastActive}</td>
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
