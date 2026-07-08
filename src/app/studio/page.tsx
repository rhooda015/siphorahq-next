'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, Wand2, Image, Tag, FileText, ShoppingCart, Store,
  Search, TrendingUp, Megaphone, Rocket, ArrowRight, Plus,
  FolderOpen, Sparkles, Zap, CheckCircle2,
} from 'lucide-react';
import { useStudioStore, StudioProject } from '@/store/studioStore';

const MODULE_CARDS = [
  { id: 'upload', href: '/studio/upload', icon: Upload, color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', text: 'text-blue-400', label: 'AI Product Studio', desc: 'Upload & analyze product image' },
  { id: 'enhance', href: '/studio/enhance', icon: Wand2, color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20', text: 'text-purple-400', label: 'Enhancement Engine', desc: 'Enhance lighting & quality' },
  { id: 'scenes', href: '/studio/scenes', icon: Image, color: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/20', text: 'text-pink-400', label: 'Scene Generator', desc: 'Generate luxury lifestyle scenes' },
  { id: 'naming', href: '/studio/naming', icon: Tag, color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20', text: 'text-amber-400', label: 'Product Naming', desc: '30 AI-generated names' },
  { id: 'content', href: '/studio/content', icon: FileText, color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/20', text: 'text-green-400', label: 'Content Generator', desc: 'Complete product content' },
  { id: 'amazon', href: '/studio/amazon', icon: ShoppingCart, color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20', text: 'text-orange-400', label: 'Amazon Listing AI', desc: 'Optimized Amazon listing' },
  { id: 'flipkart', href: '/studio/flipkart', icon: Store, color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/20', text: 'text-cyan-400', label: 'Flipkart Listing AI', desc: 'Flipkart-ready listing' },
  { id: 'seo', href: '/studio/seo', icon: Search, color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20', text: 'text-emerald-400', label: 'SEO Engine', desc: 'Complete SEO + schema' },
  { id: 'keywords', href: '/studio/keywords', icon: TrendingUp, color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/20', text: 'text-indigo-400', label: 'Keyword Intelligence', desc: 'Market research & keywords' },
  { id: 'marketing', href: '/studio/marketing', icon: Megaphone, color: 'from-rose-500/20 to-rose-600/10', border: 'border-rose-500/20', text: 'text-rose-400', label: 'Marketing Studio', desc: 'Multi-channel campaigns' },
  { id: 'launch-kit', href: '/studio/launch-kit', icon: Rocket, color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/20', text: 'text-yellow-400', label: 'Launch Kit', desc: 'One-click complete package' },
];

const STATS = [
  { label: 'AI Modules', value: '11', icon: Zap, color: 'text-[#C9A84C]' },
  { label: 'Marketplaces', value: '5+', icon: Store, color: 'text-blue-400' },
  { label: 'Asset Types', value: '20+', icon: Sparkles, color: 'text-purple-400' },
  { label: 'Phase', value: '1 of 3', icon: CheckCircle2, color: 'text-emerald-400' },
];

export default function StudioDashboard() {
  const { activeProject, setActiveProject, projects, setProjects } = useStudioStore();
  const [recentProjects, setRecentProjects] = useState<StudioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerStatus, setProviderStatus] = useState<{
    geminiConfigured: boolean;
    openaiConfigured: boolean;
    imageProvider: string;
    imageModel: string;
  } | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/studio/projects?limit=5');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || []);
          setRecentProjects(data.projects?.slice(0, 3) || []);
        }
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [setProjects]);

  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await fetch('/api/studio/status');
        if (res.ok) {
          const data = await res.json();
          setProviderStatus(data);
        }
      } catch {
        // Non-critical
      }
    }
    loadStatus();
  }, []);

  return (
    <div className="min-h-full p-6 space-y-8">
      {/* Hero Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C9A84C]/10 via-[#0D1117] to-indigo-900/10 border border-[#C9A84C]/15 p-8"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-[#C9A84C] text-sm font-medium tracking-wider uppercase">
                Enterprise AI Studio
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Siphorahq AI Studio
            </h1>
            <p className="text-zinc-400 text-base max-w-lg">
              Transform a single product image into a complete marketing ecosystem across Amazon, Flipkart, Instagram, and beyond.
            </p>
            
            {/* AI Provider Status */}
            <div className="flex items-center gap-2 mt-4 text-xs">
              <span className="text-zinc-500">Image Generation:</span>
              {providerStatus ? (
                providerStatus.geminiConfigured ? (
                  <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Gemini Connected
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    Gemini Not Configured
                  </span>
                )
              ) : (
                <span className="text-zinc-500 animate-pulse">Checking status...</span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Link href="/studio/upload">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                >
                  <Plus size={16} />
                  New Product Project
                </motion.button>
              </Link>
              <Link href="/studio/launch-kit">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-5 py-2.5 rounded-xl text-sm transition-all"
                >
                  <Rocket size={16} />
                  One-Click Launch Kit
                </motion.button>
              </Link>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/5 rounded-xl p-4 text-center"
              >
                <stat.icon size={18} className={`${stat.color} mx-auto mb-2`} />
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-zinc-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base flex items-center gap-2">
            <FolderOpen size={16} className="text-[#C9A84C]" />
            Recent Projects
          </h2>
          <Link href="/studio/projects" className="text-zinc-500 hover:text-zinc-200 text-xs flex items-center gap-1 transition-colors">
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-white/3 rounded-xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-dashed border-white/10 rounded-xl p-8 text-center"
          >
            <FolderOpen size={32} className="text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm mb-2">No projects yet</p>
            <p className="text-zinc-600 text-xs mb-4">Upload a product image to create your first AI project</p>
            <Link href="/studio/upload">
              <button className="bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/20 text-[#C9A84C] text-xs px-4 py-2 rounded-lg transition-all">
                Create First Project
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActiveProject(project)}
                className={`
                  bg-white/3 hover:bg-white/6 border rounded-xl p-4 cursor-pointer transition-all group
                  ${activeProject?._id === project._id ? 'border-[#C9A84C]/30 bg-[#C9A84C]/5' : 'border-white/5 hover:border-white/10'}
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white text-sm font-medium truncate flex-1">{project.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                    project.status === 'complete' ? 'bg-emerald-500/15 text-emerald-400' :
                    project.status === 'processing' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-zinc-700/50 text-zinc-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs mb-3">{project.productType || 'Product'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 text-[10px]">
                    {project.assetCount || 0} assets
                  </span>
                  <ArrowRight size={12} className="text-zinc-600 group-hover:text-[#C9A84C] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* AI Modules Grid */}
      <div>
        <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
          <Zap size={16} className="text-[#C9A84C]" />
          AI Modules — Phase 1
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MODULE_CARDS.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <Link href={mod.href}>
                  <motion.div
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      h-full bg-gradient-to-br ${mod.color} border ${mod.border} 
                      rounded-xl p-4 cursor-pointer transition-all group hover:border-opacity-50
                    `}
                  >
                    <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${mod.text} group-hover:scale-110 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-white text-sm font-medium mb-1">{mod.label}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{mod.desc}</p>
                    <div className="mt-3 flex items-center gap-1">
                      <span className={`text-[10px] ${mod.text} font-medium`}>Open →</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Phase roadmap */}
      <div className="bg-white/3 border border-white/5 rounded-xl p-5">
        <h3 className="text-white text-sm font-semibold mb-4">Platform Roadmap</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { phase: 'Phase 1', label: 'Core AI Workflow', status: 'active', modules: 'Modules 1–9: Product Studio, Scenes, Naming, Content, Amazon, Flipkart, SEO, Keywords, Marketing' },
            { phase: 'Phase 2', label: 'Advanced Intelligence', status: 'upcoming', modules: 'Modules 10–14: Website Content, Trust Badges, Infographics, Design Studio' },
            { phase: 'Phase 3', label: 'Analytics & Automation', status: 'planned', modules: 'Modules 15–18: Pricing Dashboard, Brand Kit, Launch Automation, Enterprise Admin' },
          ].map((p) => (
            <div key={p.phase} className={`rounded-lg p-4 border ${
              p.status === 'active' ? 'border-[#C9A84C]/20 bg-[#C9A84C]/5' :
              p.status === 'upcoming' ? 'border-white/8 bg-white/2' :
              'border-white/5 bg-white/1 opacity-60'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold ${
                  p.status === 'active' ? 'text-[#C9A84C]' :
                  p.status === 'upcoming' ? 'text-zinc-300' : 'text-zinc-600'
                }`}>{p.phase}</span>
                {p.status === 'active' && (
                  <span className="text-[9px] bg-[#C9A84C]/20 text-[#C9A84C] px-1.5 py-0.5 rounded-full">LIVE</span>
                )}
              </div>
              <p className="text-white text-xs font-medium mb-1">{p.label}</p>
              <p className="text-zinc-600 text-[10px] leading-relaxed">{p.modules}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
