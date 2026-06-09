'use client';
import React, { useState, useEffect } from 'react';
import { Search, Download, Mail, Loader2 } from 'lucide-react';

export default function CustomersView() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/admin/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading CRM Data...</div>;
  }

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
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
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
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Joined On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filteredCustomers.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-zinc-500">No customers found.</td></tr>
            ) : filteredCustomers.map((c) => (
              <tr key={c._id} className="hover:bg-zinc-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#18181b] text-white flex items-center justify-center font-bold text-xs uppercase">
                      {c.name ? c.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <div className="font-bold text-[#18181b]">{c.name || 'Anonymous User'}</div>
                      <div className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5"><Mail size={10} /> {c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${c.role === 'admin' ? 'bg-[#D4AF37]/20 text-[#9c8128]' : 'bg-emerald-100 text-emerald-700'}`}>
                    {c.role === 'admin' ? 'Admin' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {new Date(c.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
