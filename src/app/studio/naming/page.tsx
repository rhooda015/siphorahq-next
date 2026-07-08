'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Loader2, Copy, Check, Download, Upload, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ProductName {
  id: number;
  name: string;
  category: string;
  tagline: string;
  keywords: string[];
  useCase: string;
}

export default function NamingPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<ProductName[]>([]);
  const [recommended, setRecommended] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    if (activeProject) {
      setProductNameInput(activeProject.name);
    }
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return;
    const projectId = activeProject._id;
    async function loadProjectDetails() {
      try {
        const res = await fetch(`/api/studio/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          const namingAssets = data.assetsByModule?.naming || [];
          if (namingAssets.length > 0) {
            const parsed = JSON.parse(namingAssets[0].content);
            setNames(parsed.names || []);
            setRecommended(parsed.recommended || '');
            setSeoTitle(parsed.seoTitle || '');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadProjectDetails();
  }, [activeProject]);

  if (!activeProject) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <Upload size={24} className="text-zinc-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">No Active Project</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-6">
          Please upload a product image first to generate product names.
        </p>
        <Link href="/studio/upload">
          <button className="bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            Go to AI Product Studio
          </button>
        </Link>
      </div>
    );
  }

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/naming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Naming generation failed');

      setNames(data.names || []);
      setRecommended(data.recommended || '');
      setSeoTitle(data.seoTitle || '');
      toast.success('Generated 30 product names!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Naming generation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied name!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAsText = () => {
    let content = `SIPHORAHQ AI PRODUCT NAMING REPORT\n`;
    content += `Base Product Name: ${productNameInput}\n`;
    content += `Recommended Name: ${recommended}\n`;
    content += `SEO Title: ${seoTitle}\n\n`;
    
    // Group by category
    const categories = Array.from(new Set(names.map(n => n.category)));
    categories.forEach(cat => {
      content += `=== ${cat} ===\n`;
      names.filter(n => n.category === cat).forEach(n => {
        content += `- ${n.name}\n  Tagline: ${n.tagline}\n  Use Case: ${n.useCase}\n  Keywords: ${n.keywords.join(', ')}\n\n`;
      });
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-naming-options.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = Array.from(new Set(names.map(n => n.category)));

  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Tag size={16} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">Module 6</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Product Naming Studio</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate 30 premium, SEO-optimized, and heritage-inspired names for your ceramic line.</p>
        </div>
        <Link href="/studio/content">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Content Gen
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Focus Product Description</label>
          <input
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            placeholder="e.g. Handmade Mughal Floral Teapot"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold px-6 py-2.5 rounded-xl transition-all text-sm w-full md:w-auto flex-shrink-0 h-10"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating Names...
            </>
          ) : (
            'Generate 30 Names'
          )}
        </button>
      </div>

      <AnimatePresence>
        {names.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Highlights (Recommended & SEO Title) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-5">
                <span className="text-[10px] text-[#C9A84C] font-semibold uppercase tracking-wider">Expert Recommendation</span>
                <h2 className="text-white text-xl font-bold mt-1.5">{recommended}</h2>
                <p className="text-zinc-400 text-xs mt-1">Handpicked by Siphorahq Creative Director AI for luxury positioning.</p>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">SEO Title Template</span>
                <h2 className="text-zinc-200 text-sm font-semibold mt-1.5 truncate">{seoTitle}</h2>
                <p className="text-zinc-500 text-xs mt-1">Structured specifically for e-commerce search algorithm optimization.</p>
              </div>
            </div>

            {/* Export options */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-white font-semibold text-sm">Naming Options by Category</h2>
              <button
                onClick={exportAsText}
                className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs transition-all"
              >
                <Download size={13} />
                Export Plain Text
              </button>
            </div>

            {/* Category Groups */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat} className="space-y-3">
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{cat}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {names
                      .filter((n) => n.category === cat)
                      .map((n) => {
                        const isCopied = copiedId === n.id;
                        const isRecommended = n.name === recommended;

                        return (
                          <div
                            key={n.id}
                            className={`
                              bg-white/3 border rounded-xl p-4 flex flex-col justify-between relative group hover:bg-white/5 transition-all
                              ${isRecommended ? 'border-[#C9A84C]/45 bg-[#C9A84C]/5' : 'border-white/5'}
                            `}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white text-base font-bold truncate pr-6">{n.name}</h3>
                                <button
                                  onClick={() => copyToClipboard(n.name, n.id)}
                                  className="text-zinc-500 hover:text-zinc-200 transition-colors absolute top-4 right-4"
                                >
                                  {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                              </div>
                              <p className="text-[#C9A84C] text-[11px] font-medium leading-relaxed italic">"{n.tagline}"</p>
                              <p className="text-zinc-500 text-[10px] mt-2 italic">{n.useCase}</p>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-4">
                              {n.keywords.map((k) => (
                                <span key={k} className="text-[9px] bg-white/5 text-zinc-400 px-1.5 py-0.5 rounded">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
