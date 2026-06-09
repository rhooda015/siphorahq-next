'use client';
import React from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, BarChart2, 
  Settings as SettingsIcon, Tag, Star, LayoutTemplate, 
  Search as SearchIcon, Image as ImageIcon, Folders
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, pendingDispatch }: { activeTab: string, setActiveTab: (t: string) => void, pendingDispatch: number }) {
  
  const NavItem = ({ icon: Icon, label, badge }: any) => {
    const isActive = activeTab === label;
    return (
      <button 
        onClick={() => setActiveTab(label)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
          isActive 
            ? 'bg-[#18181b] text-white shadow-sm' 
            : 'text-zinc-600 hover:bg-zinc-100 hover:text-[#18181b]'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className={isActive ? 'text-[#D4AF37]' : 'text-zinc-400 group-hover:text-zinc-600'} />
          {label}
        </div>
        {badge > 0 && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#D4AF37] text-black' : 'bg-red-100 text-red-600'}`}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-zinc-50 border-r border-zinc-200 flex flex-col h-screen overflow-hidden">
      
      {/* Brand Header */}
      <div className="h-[72px] flex items-center px-6 border-b border-zinc-200 flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#18181b] flex items-center justify-center rounded-lg shadow-sm">
            <span className="text-[#D4AF37] font-serif font-bold text-lg">S</span>
          </div>
          <span className="font-bold tracking-wide text-[15px] text-[#18181b]">Siphorahq OS</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
        
        {/* Core */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Core</p>
          <NavItem icon={LayoutDashboard} label="Overview" />
          <NavItem icon={ShoppingBag} label="Orders" badge={pendingDispatch} />
          <NavItem icon={Package} label="Products" />
          <NavItem icon={Users} label="Customers" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Content</p>
          <NavItem icon={Folders} label="Collections" />
          <NavItem icon={LayoutTemplate} label="Homepage" />
          <NavItem icon={ImageIcon} label="Media" />
        </div>

        {/* Growth */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Growth</p>
          <NavItem icon={BarChart2} label="Analytics" />
          <NavItem icon={Tag} label="Coupons" />
          <NavItem icon={Star} label="Reviews" />
          <NavItem icon={SearchIcon} label="SEO" />
        </div>

      </nav>

      {/* Footer Settings */}
      <div className="p-4 border-t border-zinc-200 bg-white flex-shrink-0 space-y-2">
        <NavItem icon={SettingsIcon} label="Settings" />
        <div className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20"></div>
          Live Mode Active
        </div>
      </div>

    </aside>
  );
}
