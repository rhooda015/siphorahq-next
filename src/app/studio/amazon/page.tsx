'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Loader2, Copy, Check, Download, Upload, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface APlusModule {
  type: string;
  headline?: string;
  content?: string;
  body?: string;
  points?: string[];
}

interface AmazonListing {
  title: string;
  bullets: string[];
  description: string;
  aPlusContent: {
    headline: string;
    modules: APlusModule[];
  };
  backendKeywords: string;
  primaryKeywords: string[];
  suggestedCategory: string;
  targetAudience: string[];
  listingQualityScore: number;
  listingQualityNotes: string[];
  pricingRecommendation: {
    suggestedMRP: string;
    competitiveRange: string;
    strategy: string;
  };
  imageSequence: string[];
  competitorInsights: string;
}

export default function AmazonPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('2499');
  const [categoryInput, setCategoryInput] = useState('Home & Kitchen > Tableware > Coffee Mugs');
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState<AmazonListing | null>(null);
  const [activeTab, setActiveTab] = useState<'listing' | 'aplus' | 'seo' | 'strategy'>('listing');
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
          const amazonAssets = data.assetsByModule?.amazon || [];
          if (amazonAssets.length > 0) {
            setListing(JSON.parse(amazonAssets[0].content));
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
          Please upload a product image first to generate an Amazon Listing.
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
      const res = await fetch('/api/studio/amazon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim(),
          price: priceInput.trim() || undefined,
          category: categoryInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Amazon listing failed');

      setListing(data);
      toast.success('Amazon listing AI completed!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Amazon listing failed');
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
    let content = `AMAZON INDIA LISTING REPORT: ${productNameInput.toUpperCase()}\n`;
    content += `Suggested MRP: ₹${priceInput}\n`;
    content += `Listing Quality Score: ${listing.listingQualityScore}/100\n\n`;
    content += `=== PRODUCT TITLE ===\n${listing.title}\n\n`;
    content += `=== BULLET POINTS ===\n`;
    listing.bullets.forEach((bullet, index) => {
      content += `${index + 1}. ${bullet}\n`;
    });
    content += `\n=== DESCRIPTION ===\n${listing.description}\n\n`;
    content += `=== BACKEND KEYWORDS ===\n${listing.backendKeywords}\n\n`;
    content += `=== SUGGESTED CATEGORY ===\n${listing.suggestedCategory}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-amazon-listing.txt`;
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
            <ShoppingCart size={16} className="text-orange-400" />
            <span className="text-orange-400 text-xs font-medium uppercase tracking-wider">Module 8</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Amazon Listing AI</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate search-optimized titles, premium bullet points, backend search terms, and A+ layout guides.</p>
        </div>
        <Link href="/studio/flipkart">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Flipkart
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Amazon Listing Name</label>
            <input
              type="text"
              value={productNameInput}
              onChange={(e) => setProductNameInput(e.target.value)}
              placeholder="e.g. Siphorahq Ceramic Tea Cup Set"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Target Selling Price (₹)</label>
            <input
              type="number"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="2499"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Target Amazon Node Category</label>
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="e.g. Home & Kitchen > Tableware > Cups & Mugs"
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
                Optimizing Listing...
              </>
            ) : (
              'Generate Amazon Listing'
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {listing && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Score & Quality Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-[#C9A84C] flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                  {listing.listingQualityScore}
                </div>
                <div>
                  <span className="text-[10px] text-[#C9A84C] font-semibold uppercase tracking-wider">Listing Quality Score</span>
                  <p className="text-zinc-300 text-xs mt-1">Excellent readiness score. Optimization standard check passed.</p>
                </div>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-2xl p-5 md:col-span-2 space-y-2">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Optimization Action Log</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {listing.listingQualityNotes.map((note, index) => (
                    <div key={index} className="text-xs text-zinc-300 flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation & Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {[
                  { id: 'listing', label: 'Listing Copy' },
                  { id: 'aplus', label: 'A+ Content Layout' },
                  { id: 'seo', label: 'SEO Keywords' },
                  { id: 'strategy', label: 'Pricing & Image Strategy' },
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
                        Amazon Product Title ({listing.title.length} chars)
                      </span>
                      <button
                        onClick={() => copyToClipboard(listing.title, 'title')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'title' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-white text-sm font-semibold leading-relaxed">{listing.title}</p>
                  </div>

                  {/* Bullet points */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                      Bullet Points (5 Key Features)
                    </span>
                    <div className="divide-y divide-white/5 space-y-3">
                      {listing.bullets.map((bullet, index) => (
                        <div key={index} className="pt-3 first:pt-0 relative group">
                          <div className="flex justify-between items-start gap-4">
                            <p className="text-zinc-300 text-xs leading-relaxed flex-1">
                              <span className="text-[#C9A84C] font-semibold">{index + 1}. </span>
                              {bullet}
                            </p>
                            <button
                              onClick={() => copyToClipboard(bullet, `bullet-${index}`)}
                              className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedField === `bullet-${index}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HTML Description */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">HTML Format Description</span>
                      <button
                        onClick={() => copyToClipboard(listing.description, 'description')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'description' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <code className="text-zinc-400 text-[10px] leading-relaxed block whitespace-pre-wrap max-h-56 overflow-y-auto font-mono bg-black/20 p-3 rounded-lg border border-white/5">
                      {listing.description}
                    </code>
                  </div>
                </div>
              )}

              {activeTab === 'aplus' && (
                <div className="space-y-4">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">A+ Brand Content Headline</p>
                    <p className="text-white text-sm font-semibold">{listing.aPlusContent.headline}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {listing.aPlusContent.modules.map((mod, index) => (
                      <div key={index} className="bg-white/3 border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] bg-white/5 text-[#C9A84C] px-2 py-0.5 rounded uppercase font-mono tracking-wider">
                            Module {index + 1}: {mod.type.replace('_', ' ')}
                          </span>
                          <h3 className="text-white text-xs font-semibold mt-3">{mod.headline || 'Brand Content Section'}</h3>
                          <p className="text-zinc-400 text-[11px] leading-relaxed mt-2">{mod.content || mod.body}</p>
                        </div>
                        {mod.points && (
                          <ul className="text-[10px] text-zinc-500 mt-3 space-y-1">
                            {mod.points.map((p, i) => (
                              <li key={i}>• {p}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Backend keywords */}
                  <div className="md:col-span-2 bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Backend Search Terms (250 bytes max)</span>
                      <button
                        onClick={() => copyToClipboard(listing.backendKeywords, 'backend')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'backend' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <textarea
                      readOnly
                      value={listing.backendKeywords}
                      rows={4}
                      className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-2.5 text-zinc-300 text-xs font-mono resize-none focus:outline-none"
                    />
                    <p className="text-zinc-600 text-[10px] mt-1.5">No punctuation, spaces only, duplicates stripped for index efficiency.</p>
                  </div>

                  {/* Primary keywords */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">Target High-Volume Keywords</span>
                    <div className="flex flex-col gap-2">
                      {listing.primaryKeywords.map((k, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-zinc-300">
                          <span>{k}</span>
                          <button
                            onClick={() => copyToClipboard(k, `key-${i}`)}
                            className="text-zinc-600 hover:text-zinc-400"
                          >
                            {copiedField === `key-${i}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'strategy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image layout flow */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">Suggested Image Sequence</span>
                    <div className="space-y-2">
                      {listing.imageSequence.map((img, i) => (
                        <div key={i} className="flex gap-3 items-center text-xs bg-white/2 p-2 rounded-lg border border-white/5">
                          <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center font-mono text-[10px] text-[#C9A84C] font-semibold">
                            {i + 1}
                          </span>
                          <span className="text-zinc-300 font-medium">{img}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competitor / Pricing */}
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Category Competitor Insights</p>
                      <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap">{listing.competitorInsights}</p>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Pricing Strategy Recommendations</p>
                      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                        <div className="bg-white/2 p-2 rounded-lg text-center">
                          <p className="text-[#C9A84C] font-bold text-sm">{listing.pricingRecommendation.suggestedMRP}</p>
                          <p className="text-zinc-500 text-[10px] mt-0.5">Target Listing Price</p>
                        </div>
                        <div className="bg-white/2 p-2 rounded-lg text-center">
                          <p className="text-white font-semibold text-xs truncate">{listing.pricingRecommendation.competitiveRange}</p>
                          <p className="text-zinc-500 text-[10px] mt-0.5">Competitive Range</p>
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
