'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, BarChart2, 
  Settings as SettingsIcon, Tag, Star, LayoutTemplate, 
  Search as SearchIcon, Image as ImageIcon, Folders, FileText, Menu as MenuIcon, Palette, ListTree, ChevronLeft, ChevronRight, Mail
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, pendingDispatch }: { activeTab: string, setActiveTab: (t: string) => void, pendingDispatch: number }) {
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon: Icon, label, badge }: any) => {
    const isActive = activeTab === label;
    return (
      <button 
        onClick={() => setActiveTab(label)}
        title={collapsed ? label : undefined}
        className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-4'} py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
          isActive 
            ? 'bg-zinc-900 text-white shadow-md' 
            : 'text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3.5 z-10">
          <Icon size={18} className={`transition-colors duration-300 ${isActive ? 'text-luxury-gold' : 'text-zinc-400 group-hover:text-luxury-gold'}`} />
          {!collapsed && <span className="tracking-wide font-semibold">{label}</span>}
        </div>
        {!collapsed && badge > 0 && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full z-10 ${isActive ? 'bg-luxury-gold text-white' : 'bg-red-50 text-red-500 border border-red-100'}`}>
            {badge}
          </span>
        )}
        {collapsed && badge > 0 && (
          <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isActive ? 'bg-luxury-gold' : 'bg-red-500'}`}></span>
        )}
      </button>
    );
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    if (collapsed) {
      return <div className="h-px bg-zinc-200 w-8 mx-auto my-4"></div>;
    }
    return (
      <p className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4 mt-6 first:mt-2">
        {children}
      </p>
    );
  };

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-72'} flex-shrink-0 bg-[#F7F5F0] border-r border-zinc-200/60 flex flex-col h-screen overflow-hidden transition-all duration-300 relative`}>
      
      {/* Brand Header */}
      <div className="h-[80px] flex items-center justify-between px-6 border-b border-zinc-200/60 flex-shrink-0 bg-[#F7F5F0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-900 flex items-center justify-center rounded-xl shadow-sm">
            <span className="text-luxury-gold font-serif font-bold text-xl">S</span>
          </div>
          {!collapsed && <span className="font-serif font-semibold tracking-wider text-lg text-zinc-900">Siphorahq</span>}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute top-[28px] -right-3 w-6 h-6 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-luxury-gold transition-colors z-50 shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        
        {/* Core */}
        <div>
          <SectionTitle>Core</SectionTitle>
          <div className="space-y-1.5">
            <NavItem icon={LayoutDashboard} label="Overview" />
            <NavItem icon={ShoppingBag} label="Orders" badge={pendingDispatch} />
            <NavItem icon={Package} label="Products" />
            <NavItem icon={Package} label="Inventory" />
            <NavItem icon={Users} label="Customers" />
            <NavItem icon={Mail} label="Mailbox" />
          </div>
        </div>

        {/* Content */}
        <div>
          <SectionTitle>Content</SectionTitle>
          <div className="space-y-1.5">
            <NavItem icon={ListTree} label="Categories" />
            <NavItem icon={Folders} label="Collections" />
            <NavItem icon={LayoutTemplate} label="Homepage" />
            <NavItem icon={FileText} label="Pages" />
            <NavItem icon={MenuIcon} label="Navigation" />
            <NavItem icon={ImageIcon} label="Media" />
          </div>
        </div>

        {/* Growth */}
        <div>
          <SectionTitle>Growth</SectionTitle>
          <div className="space-y-1.5">
            <NavItem icon={BarChart2} label="Analytics" />
            <NavItem icon={Tag} label="Coupons" />
            <NavItem icon={Star} label="Reviews" />
            <NavItem icon={SearchIcon} label="SEO" />
          </div>
        </div>

      </nav>

      {/* Footer Settings */}
      <div className="p-4 border-t border-zinc-200/60 bg-[#F7F5F0] flex-shrink-0 space-y-1.5">
        <NavItem icon={Palette} label="Theme" />
        <NavItem icon={SettingsIcon} label="Settings" />
        
        {!collapsed && (
          <div className="flex items-center justify-between px-4 py-3 mt-2 bg-white rounded-xl border border-zinc-200/50 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Live Mode</span>
            </div>
          </div>
        )}
      </div>

    </aside>
  );
}
