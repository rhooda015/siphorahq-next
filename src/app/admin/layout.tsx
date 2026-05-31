import React from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, Home, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-serif text-xl font-bold">Siphorahq Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
            <Home className="w-5 h-5 text-gray-400" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
            <Package className="w-5 h-5 text-gray-400" />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
            <ShoppingBag className="w-5 h-5 text-gray-400" />
            Orders
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-700">
            View Store
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Admin Console</h1>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
