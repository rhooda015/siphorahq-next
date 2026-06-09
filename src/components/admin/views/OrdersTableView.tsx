'use client';
import React from 'react';
import { Search, Filter, Eye, Truck, CheckCircle2, Clock, XCircle, CreditCard, ChevronRight } from 'lucide-react';

export default function OrdersTableView({ orders, onManage }: { orders: any[], onManage: (o: any) => void }) {
  
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'Pending': case 'pending_payment': return { color: 'bg-zinc-100 text-zinc-700', icon: Clock, label: 'Pending Payment' };
      case 'Processing': case 'pending_confirmation': return { color: 'bg-amber-100 text-amber-800', icon: Clock, label: 'Processing' };
      case 'Shipped': return { color: 'bg-blue-100 text-blue-800', icon: Truck, label: 'Shipped' };
      case 'Out for Delivery': return { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Out for Delivery' };
      case 'Delivered': case 'paid': return { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: 'Delivered' };
      case 'Cancelled': case 'failed': return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' };
      default: return { color: 'bg-zinc-100 text-zinc-800', icon: Clock, label: status || 'Unknown' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Orders</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage fulfillments, track shipments, and process refunds.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search orders by ID, email, or customer..." 
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b]"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-600 border border-zinc-300 rounded-lg px-3 py-2 bg-zinc-50">
            <Filter size={16} />
            <select className="bg-transparent outline-none font-medium text-[#18181b]">
              <option value="All">All Statuses</option>
              <option value="Pending">Unfulfilled</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
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
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {orders.map((order, i) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={i} onClick={() => onManage(order)} className="hover:bg-zinc-50/80 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#18181b]">{order.orderId}</div>
                      <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                        <CreditCard size={12}/> {order.paymentMethod || 'Razorpay'} • {order.paymentStatus || 'Paid'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600">
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#18181b]">{order.customerDetails?.firstName || 'Guest Customer'}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#18181b]">₹{order.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 group-hover:text-[#18181b] transition-colors p-2">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                    No orders found.
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
