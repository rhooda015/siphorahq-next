'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Upload,
  Wand2,
  Image,
  Palette,
  ShoppingBag,
  Tag,
  FileText,
  ShoppingCart,
  Store,
  Megaphone,
  Search,
  Star,
  TrendingUp,
  Package,
  ChevronLeft,
  ChevronRight,
  Rocket,
  Sparkles,
  FolderOpen,
} from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  section?: string;
}

const NAV_ITEMS: NavItem[] = [
  // Core
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/studio',
    icon: <LayoutDashboard size={18} />,
    section: 'Studio',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/studio/projects',
    icon: <FolderOpen size={18} />,
    section: 'Studio',
  },

  // AI Modules
  {
    id: 'upload',
    label: 'AI Product Studio',
    href: '/studio/upload',
    icon: <Upload size={18} />,
    badge: 'Module 1',
    section: 'AI Modules',
  },
  {
    id: 'enhance',
    label: 'Enhancement Engine',
    href: '/studio/enhance',
    icon: <Wand2 size={18} />,
    badge: 'Module 2',
    section: 'AI Modules',
  },
  {
    id: 'scenes',
    label: 'Scene Generator',
    href: '/studio/scenes',
    icon: <Image size={18} />,
    badge: 'Module 3',
    section: 'AI Modules',
  },
  {
    id: 'naming',
    label: 'Product Naming',
    href: '/studio/naming',
    icon: <Tag size={18} />,
    badge: 'Module 6',
    section: 'AI Modules',
  },
  {
    id: 'content',
    label: 'Content Generator',
    href: '/studio/content',
    icon: <FileText size={18} />,
    badge: 'Module 7',
    section: 'AI Modules',
  },

  // Marketplace
  {
    id: 'amazon',
    label: 'Amazon Listing AI',
    href: '/studio/amazon',
    icon: <ShoppingCart size={18} />,
    badge: 'Module 8',
    section: 'Marketplace',
  },
  {
    id: 'flipkart',
    label: 'Flipkart Listing AI',
    href: '/studio/flipkart',
    icon: <Store size={18} />,
    badge: 'Module 9',
    section: 'Marketplace',
  },

  // Intelligence
  {
    id: 'seo',
    label: 'SEO Engine',
    href: '/studio/seo',
    icon: <Search size={18} />,
    badge: 'Module 13',
    section: 'Intelligence',
  },
  {
    id: 'keywords',
    label: 'Keyword Intelligence',
    href: '/studio/keywords',
    icon: <TrendingUp size={18} />,
    badge: 'Module 12',
    section: 'Intelligence',
  },
  {
    id: 'marketing',
    label: 'Marketing Studio',
    href: '/studio/marketing',
    icon: <Megaphone size={18} />,
    badge: 'Module 11',
    section: 'Intelligence',
  },

  // Launch
  {
    id: 'launch-kit',
    label: 'One-Click Launch Kit',
    href: '/studio/launch-kit',
    icon: <Rocket size={18} />,
    badge: 'Module 17',
    section: 'Launch',
  },
];

export default function StudioSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, activeProject } = useStudioStore();

  const sections = Array.from(new Set(NAV_ITEMS.map((item) => item.section)));

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex-shrink-0 h-screen bg-[#0D1117] border-r border-white/5 flex flex-col overflow-hidden z-30"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5 flex-shrink-0">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed ? (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-widest uppercase">
                  Siphorahq
                </p>
                <p className="text-[10px] text-[#C9A84C] tracking-wider font-medium">
                  AI Studio
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center"
            >
              <Sparkles size={14} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Project Indicator */}
      <AnimatePresence>
        {activeProject && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mt-3 px-3 py-2.5 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg"
          >
            <p className="text-[10px] text-[#C9A84C] uppercase tracking-wider font-medium mb-0.5">
              Active Project
            </p>
            <p className="text-xs text-white font-medium truncate">{activeProject.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <div className={`w-1.5 h-1.5 rounded-full ${
                activeProject.status === 'complete' ? 'bg-emerald-400' :
                activeProject.status === 'processing' ? 'bg-amber-400 animate-pulse' :
                'bg-zinc-500'
              }`} />
              <p className="text-[10px] text-zinc-400 capitalize">{activeProject.status}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {sections.map((section) => {
          const sectionItems = NAV_ITEMS.filter((item) => item.section === section);

          return (
            <div key={section} className="mb-2">
              {!sidebarCollapsed && (
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold px-3 mb-1.5">
                  {section}
                </p>
              )}
              {sectionItems.map((item) => {
                const isActive =
                  item.href === '/studio'
                    ? pathname === '/studio'
                    : pathname.startsWith(item.href);

                return (
                  <Link key={item.id} href={item.href}>
                    <motion.div
                      whileHover={{ x: 2 }}
                      className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 mb-0.5
                        ${isActive
                          ? 'bg-[#C9A84C]/15 text-[#C9A84C]'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                        }
                      `}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#C9A84C] rounded-full"
                        />
                      )}

                      <span className={`flex-shrink-0 ${isActive ? 'text-[#C9A84C]' : ''}`}>
                        {item.icon}
                      </span>

                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="flex-1 flex items-center justify-between overflow-hidden"
                          >
                            <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] bg-white/5 text-zinc-500 px-1.5 py-0.5 rounded font-mono whitespace-nowrap">
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Tooltip on collapsed */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-3 z-50 bg-zinc-800 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 shadow-xl">
                          {item.label}
                        </div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/5 p-3 flex-shrink-0">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-zinc-500 hover:text-zinc-200 transition-colors rounded-lg hover:bg-white/5"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!sidebarCollapsed && <span className="text-xs">Collapse</span>}
        </button>
        {!sidebarCollapsed && (
          <div className="mt-3 px-1">
            <Link href="/admin">
              <p className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors text-center cursor-pointer">
                ← Back to Admin
              </p>
            </Link>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
