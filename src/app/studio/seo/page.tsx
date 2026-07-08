'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Copy, Check, Download, Upload, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface SEOOG {
  'og:title': string;
  'og:description': string;
  'og:type': string;
  'og:url': string;
  'og:site_name': string;
  'og:locale': string;
}

interface SEOTwitter {
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:site': string;
}

interface SEOPackage {
  seoTitle: string;
  metaDescription: string;
  urlSlug: string;
  canonicalUrl: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  openGraph: SEOOG;
  twitterCard: SEOTwitter;
  productSchema: Record<string, any>;
  faqSchema: Record<string, any>;
  breadcrumbSchema: Record<string, any>;
  focusKeyphrase: string;
  keywordDensityNote: string;
  internalLinkingSuggestions: string[];
  seoScore: number;
  seoNotes: string[];
}

export default function SEOPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [slugInput, setSlugInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [seo, setSeo] = useState<SEOPackage | null>(null);
  const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'keywords' | 'social'>('meta');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (activeProject) {
      setProductNameInput(activeProject.name);
      setSlugInput(activeProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
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
          const seoAssets = data.assetsByModule?.seo || [];
          if (seoAssets.length > 0) {
            setSeo(JSON.parse(seoAssets[0].content));
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
          Please upload a product image first to generate an SEO package.
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
      const res = await fetch('/api/studio/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim(),
          productUrl: slugInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'SEO generation failed');

      setSeo(data);
      toast.success('SEO package generated!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'SEO generation failed');
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

  const exportAsJSON = () => {
    if (!seo) return;
    const blob = new Blob([JSON.stringify(seo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-seo-package.json`;
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
            <Search size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">Module 13</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SEO Engine</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate complete search engine meta tags, breadcrumbs, Open Graph cards, and structured JSON-LD schemas.</p>
        </div>
        <Link href="/studio/keywords">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Keywords
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">Product Title Context</label>
            <input
              type="text"
              value={productNameInput}
              onChange={(e) => setProductNameInput(e.target.value)}
              placeholder="e.g. Shalimar Gold Ceramic Mug"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">SEO Friendly URL Slug</label>
            <input
              type="text"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              placeholder="e.g. shalimar-gold-ceramic-mug"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold px-6 py-2 rounded-xl transition-all text-xs w-full md:w-auto h-9"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Generating SEO Data...
              </>
            ) : (
              'Generate SEO Package'
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {seo && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* SEO Health Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                  {seo.seoScore}
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">SEO Readiness Score</span>
                  <p className="text-zinc-300 text-xs mt-1">Excellent keywords density. Crawl viability checked.</p>
                </div>
              </div>

              <div className="bg-white/3 border border-white/5 rounded-2xl p-5 md:col-span-2 space-y-2">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Search Engine Crawl Tips</p>
                <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                  {seo.seoNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation & Export */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {[
                  { id: 'meta', label: 'Meta Information' },
                  { id: 'keywords', label: 'Keyword Optimization' },
                  { id: 'schema', label: 'JSON-LD Schemas' },
                  { id: 'social', label: 'Social Cards Metadata' },
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
                onClick={exportAsJSON}
                className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs transition-all w-fit font-sans"
              >
                <Download size={13} />
                Export SEO Package
              </button>
            </div>

            {/* Tab contents */}
            <div className="space-y-6">
              {activeTab === 'meta' && (
                <div className="space-y-4">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        SEO Page Title ({seo.seoTitle.length} / 60 chars)
                      </span>
                      <button
                        onClick={() => copyToClipboard(seo.seoTitle, 'seoTitle')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'seoTitle' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-white text-sm font-semibold">{seo.seoTitle}</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full ${seo.seoTitle.length <= 60 ? 'bg-emerald-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(100, (seo.seoTitle.length / 60) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        Meta Description ({seo.metaDescription.length} / 155 chars)
                      </span>
                      <button
                        onClick={() => copyToClipboard(seo.metaDescription, 'metaDesc')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'metaDesc' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed">{seo.metaDescription}</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full ${seo.metaDescription.length <= 155 ? 'bg-emerald-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(100, (seo.metaDescription.length / 155) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">URL Canonical Endpoint</span>
                      <p className="text-zinc-400 font-mono text-[11px] mt-2 select-all">{seo.canonicalUrl}</p>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                      <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Focus URL Slug</span>
                      <p className="text-zinc-400 font-mono text-[11px] mt-2 select-all">/products/{seo.urlSlug}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'keywords' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Keyword Density Strategy</span>
                      <p className="text-zinc-300 text-xs leading-relaxed">{seo.keywordDensityNote}</p>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-3">Internal Linking Architecture Suggestions</span>
                      <ul className="space-y-2">
                        {seo.internalLinkingSuggestions.map((s, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Focus Keyword</p>
                      <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/35 text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-lg inline-block">
                        {seo.focusKeyphrase}
                      </span>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-3">LSI Secondary Keywords</p>
                      <div className="flex flex-col gap-2">
                        {seo.secondaryKeywords.map((k, i) => (
                          <span key={i} className="bg-white/5 border border-white/5 text-zinc-400 text-xs px-2.5 py-1.5 rounded-lg block font-mono">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schema' && (
                <div className="space-y-4">
                  {[
                    { id: 'product', label: 'Structured Product Schema (JSON-LD)', data: seo.productSchema },
                    { id: 'faq', label: 'FAQ Page Schema (JSON-LD)', data: seo.faqSchema },
                    { id: 'breadcrumb', label: 'Breadcrumb Schema (JSON-LD)', data: seo.breadcrumbSchema },
                  ].map((schema) => (
                    <div key={schema.id} className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{schema.label}</span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(schema.data, null, 2), schema.id)}
                          className="text-zinc-500 hover:text-zinc-200"
                        >
                          {copiedField === schema.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <code className="text-zinc-400 text-[10px] leading-relaxed block whitespace-pre font-mono bg-black/25 p-3 rounded-lg border border-white/5 max-h-56 overflow-y-auto">
                        {JSON.stringify(schema.data, null, 2)}
                      </code>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'social' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Open Graph */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-4">Facebook / LinkedIn Open Graph</p>
                    <div className="space-y-3">
                      {Object.entries(seo.openGraph).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                          <p className="text-zinc-500 font-mono text-[9px]">{key}</p>
                          <p className="text-white text-xs bg-white/2 border border-white/5 p-2 rounded-lg truncate">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Twitter Cards */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-4">Twitter Cards Metadata</p>
                    <div className="space-y-3">
                      {Object.entries(seo.twitterCard).map(([key, val]) => (
                        <div key={key} className="space-y-1">
                          <p className="text-zinc-500 font-mono text-[9px]">{key}</p>
                          <p className="text-white text-xs bg-white/2 border border-white/5 p-2 rounded-lg truncate">{val}</p>
                        </div>
                      ))}
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
