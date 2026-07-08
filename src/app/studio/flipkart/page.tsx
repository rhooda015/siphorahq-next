'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Loader2, Copy, Check, Download, Upload, ChevronRight, CheckSquare } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface FlipkartListing {
  title: string;
  highlights: string[];
  description: string;
  specifications: Record<string, string>;
  primaryKeywords: string[];
  categoryPath: string;
  trustBadges: string[];
  imageOrder: string[];
  pricingRecommendation: {
    suggestedMRP: string;
    sellingPrice: string;
    strategy: string;
  };
  searchabilityScore: number;
  optimizationTips: string[];
}

export default function FlipkartPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('2499');
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<FlipkartListing | null>(null);
  const [activeTab, setActiveTab] = useState<'listing' | 'specs' | 'strategy'>('listing');
  const [copiedField, setCopiedField] = useState<string | null>(null);

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
          const flipkartAssets = data.assetsByModule?.flipkart || [];
          if (flipkartAssets.length > 0) {
            setListing(JSON.parse(flipkartAssets[0].content));
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
          Please upload a product image first to generate a Flipkart Listing.
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
      const res = await fetch('/api/studio/flipkart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim(),
          price: priceInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Flipkart listing failed');

      setListing(data);
      toast.success('Flipkart listing AI completed!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Flipkart listing failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const exportAsText = () => {
    if (!listing) return;
    let content = `FLIPKART INDIA LISTING REPORT: ${productNameInput.toUpperCase()}\n`;
    content += `Suggested MRP: ${listing.pricingRecommendation.suggestedMRP}\n`;
    content += `Selling Price: ${listing.pricingRecommendation.sellingPrice}\n`;
    content += `Searchability Score: ${listing.searchabilityScore}/100\n\n`;
    content += `=== PRODUCT TITLE ===\n${listing.title}\n\n`;
    content += `=== HIGHLIGHTS ===\n`;
    listing.highlights.forEach((hl, i) => {
      content += `- ${hl}\n`;
    });
    content += `\n=== DESCRIPTION ===\n${listing.description}\n\n`;
    content += `=== SPECIFICATIONS ===\n`;
    Object.entries(listing.specifications).forEach(([k, v]) => {
      content += `${k}: ${v}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-flipkart-listing.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Store size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-medium uppercase tracking-wider">Module 9</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Flipkart Listing AI</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate catalog specifications, product highlights, and trust indicators tailored for Flipkart India.</p>
        </div>
        <Link href="/studio/seo">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to SEO Engine
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Flipkart Listing Title</label>
          <input
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            placeholder="e.g. Siphorahq Fine Porcelain Mug"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Target Selling Price (₹)</label>
          <input
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            placeholder="2499"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold px-6 py-2 rounded-xl transition-all text-xs w-full md:w-auto flex-shrink-0 h-9"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Writing Flipkart Package...
            </>
          ) : (
            'Generate Flipkart Listing'
          )}
        </button>
      </div>

      <AnimatePresence>
        {listing && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Score & Optimization tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-400 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                  {listing.searchabilityScore}
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">Searchability Score</span>
                  <p className="text-zinc-300 text-xs mt-1">Excellent Flipkart SEO alignment score.</p>
                </div>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-2xl p-5 md:col-span-2 space-y-2">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Optimization Actions Checklist</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {listing.optimizationTips.map((tip, index) => (
                    <div key={index} className="text-xs text-zinc-300 flex items-start gap-1.5">
                      <CheckSquare size={13} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation & Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {[
                  { id: 'listing', label: 'Listing Copy & Highlights' },
                  { id: 'specs', label: 'Flipkart Technical Specs' },
                  { id: 'strategy', label: 'Media Order & Pricing' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                      ${activeTab === tab.id
                        ? 'bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25'
                        : 'text-zinc-500 hover:text-zinc-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={exportAsText}
                className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs transition-all w-fit"
              >
                <Download size={13} />
                Export Plain Text
              </button>
            </div>

            {/* Tab content */}
            <div className="space-y-6">
              {activeTab === 'listing' && (
                <div className="space-y-4">
                  {/* Title card */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        Flipkart Optimized Product Title
                      </span>
                      <button
                        onClick={() => copyToClipboard(listing.title, 'title')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'title' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-white text-sm font-semibold">{listing.title}</p>
                  </div>

                  {/* Bullet point highlights */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                      Flipkart Bullet Highlights
                    </span>
                    <div className="divide-y divide-white/5 space-y-3">
                      {listing.highlights.map((hl, index) => (
                        <div key={index} className="pt-3 first:pt-0 relative group">
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-zinc-300 text-xs leading-relaxed flex-1">
                              <span className="text-cyan-400 font-semibold">• </span>
                              {hl}
                            </p>
                            <button
                              onClick={() => copyToClipboard(hl, `highlight-${index}`)}
                              className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedField === `highlight-${index}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Plain text description */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Product Story Description</span>
                      <button
                        onClick={() => copyToClipboard(listing.description, 'description')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'description' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto bg-black/20 p-3 rounded-lg border border-white/5">
                      {listing.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Flipkart Specifications Checklist</span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(listing.specifications, null, 2), 'specs')}
                      className="text-zinc-500 hover:text-zinc-200"
                    >
                      {copiedField === 'specs' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 divide-y divide-white/5 md:divide-y-0">
                    {Object.entries(listing.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 text-xs border-b border-white/5">
                        <span className="text-zinc-500">{key}</span>
                        <span className="text-white font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image order sequence */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">Flipkart Listing Image Order</span>
                    <div className="space-y-2">
                      {listing.imageOrder.map((img, i) => (
                        <div key={i} className="flex gap-3 items-center text-xs bg-white/2 p-2 rounded-lg border border-white/5">
                          <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-cyan-400 font-semibold">
                            {i + 1}
                          </span>
                          <span className="text-zinc-300 font-medium">{img}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Trust Badges */}
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-3">Catalog Trust Badges</p>
                      <div className="flex flex-wrap gap-2">
                        {listing.trustBadges.map((badge, i) => (
                          <span key={i} className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] px-2.5 py-1 rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Flipkart Pricing Intelligence</p>
                      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                        <div className="bg-white/2 p-2 rounded-lg text-center">
                          <p className="text-zinc-500 text-[10px]">Suggested MRP</p>
                          <p className="text-white font-bold text-sm mt-0.5">{listing.pricingRecommendation.suggestedMRP}</p>
                        </div>
                        <div className="bg-white/2 p-2 rounded-lg text-center">
                          <p className="text-zinc-500 text-[10px]">Flipkart Special Price</p>
                          <p className="text-cyan-400 font-bold text-sm mt-0.5">{listing.pricingRecommendation.sellingPrice}</p>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">{listing.pricingRecommendation.strategy}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
