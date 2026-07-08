'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, LogOut, Search, User } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useStudioStore } from '@/store/studioStore';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/studio': { title: 'Studio Dashboard', subtitle: 'Your AI creative workspace' },
  '/studio/projects': { title: 'Projects', subtitle: 'Manage all your AI projects' },
  '/studio/upload': { title: 'AI Product Studio', subtitle: 'Upload & analyze your product' },
  '/studio/enhance': { title: 'Enhancement Engine', subtitle: 'AI-powered image enhancement' },
  '/studio/scenes': { title: 'Scene Generator', subtitle: 'Generate luxury lifestyle scenes' },
  '/studio/naming': { title: 'Product Naming Studio', subtitle: '30 AI-generated product names' },
  '/studio/content': { title: 'Content Generator', subtitle: 'Complete product content package' },
  '/studio/amazon': { title: 'Amazon Listing AI', subtitle: 'Amazon-optimized listing generation' },
  '/studio/flipkart': { title: 'Flipkart Listing AI', subtitle: 'Flipkart-optimized listing generation' },
  '/studio/seo': { title: 'SEO Engine', subtitle: 'Complete technical SEO package' },
  '/studio/keywords': { title: 'Keyword Intelligence', subtitle: 'Market research & keyword analysis' },
  '/studio/marketing': { title: 'Marketing Studio', subtitle: 'Multi-channel campaign generation' },
  '/studio/launch-kit': { title: 'One-Click Launch Kit', subtitle: 'Complete product launch package' },
};

export default function StudioTopbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeProject } = useStudioStore();

  const pageInfo = PAGE_TITLES[pathname] || { title: 'AI Studio', subtitle: 'Siphorahq Enterprise' };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <header className="h-16 bg-[#0D1117]/80 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-20">
      {/* Page Title */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-white font-semibold text-base">{pageInfo.title}</h1>
        <p className="text-zinc-500 text-xs">{pageInfo.subtitle}</p>
      </motion.div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Search placeholder */}
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/8 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg text-xs transition-all border border-white/5">
          <Search size={13} />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-500">⌘K</kbd>
        </button>

        {/* Active project quick-access */}
        {activeProject && (
          <div className="hidden md:flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-3 py-1.5 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-medium truncate max-w-[120px]">
              {activeProject.name}
            </span>
          </div>
        )}

        {/* Settings */}
        <button className="w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-white/5 flex items-center justify-center transition-all">
          <Settings size={15} />
        </button>

        {/* Admin avatar */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all group"
          title="Logout"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center">
            <User size={12} className="text-white" />
          </div>
          <LogOut size={13} className="text-zinc-500 group-hover:text-red-400 transition-colors" />
        </button>
      </div>
    </header>
  );
}
