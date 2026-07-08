'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, Copy, Check, Download, Upload, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

interface ContentPackage {
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  productStory: string;
  features: string[];
  specifications: Record<string, string>;
  highlights: string[];
  careInstructions: string[];
  shippingInfo: string;
  warranty: string;
  returnPolicy: string;
  packageContents: string[];
  faqs: FAQ[];
  buyingGuide: string;
  giftingMessage: string;
}

export default function ContentPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<ContentPackage | null>(null);
  const [activeTab, setActiveTab] = useState<'listings' | 'specs' | 'faqs' | 'policies'>('listings');
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
          const contentAssets = data.assetsByModule?.content || [];
          if (contentAssets.length > 0) {
            setContent(JSON.parse(contentAssets[0].content));
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
          Please upload a product image first to generate marketing content.
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
      const res = await fetch('/api/studio/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Content generation failed');

      setContent(data);
      toast.success('Product content package generated!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Content generation failed');
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
    if (!content) return;
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-content-package.json`;
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
            <FileText size={16} className="text-green-400" />
            <span className="text-green-400 text-xs font-medium uppercase tracking-wider">Module 7</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Content Generator</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate complete description copy, detailed FAQs, care guides, and catalog lists.</p>
        </div>
        <Link href="/studio/amazon">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Amazon Listing
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirmed Brand Product Name</label>
          <input
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            placeholder="e.g. Siphorahq Shalimar Tea Cup"
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
              Writing Content...
            </>
          ) : (
            'Generate Content Package'
          )}
        </button>
      </div>

      <AnimatePresence>
        {content && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Tabs & Export header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex gap-2">
                {[
                  { id: 'listings', label: 'E-commerce Listings' },
                  { id: 'specs', label: 'Specs & Features' },
                  { id: 'faqs', label: 'FAQs Accordion' },
                  { id: 'policies', label: 'Care & Policies' },
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
                className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs transition-all w-fit"
              >
                <Download size={13} />
                Export Full JSON
              </button>
            </div>

            {/* Tab content */}
            <div className="space-y-6">
              {activeTab === 'listings' && (
                <div className="space-y-4">
                  {/* Title card */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Product Catalog Title</span>
                      <button
                        onClick={() => copyToClipboard(content.title, 'title')}
                        className="text-zinc-500 hover:text-zinc-200 transition-colors"
                      >
                        {copiedField === 'title' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-white text-base font-semibold">{content.title}</p>
                    <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed italic">{content.subtitle}</p>
                  </div>

                  {/* Descriptions */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Short Description (Summary)</span>
                      <button
                        onClick={() => copyToClipboard(content.shortDescription, 'shortDescription')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'shortDescription' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{content.shortDescription}</p>
                  </div>

                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Luxury Brand Heritage Story</span>
                      <button
                        onClick={() => copyToClipboard(content.productStory, 'productStory')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'productStory' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-[#C9A84C]/40 pl-3 italic">
                      {content.productStory}
                    </p>
                  </div>

                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Detailed Description</span>
                      <button
                        onClick={() => copyToClipboard(content.longDescription, 'longDescription')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'longDescription' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line">{content.longDescription}</p>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specifications */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Specifications Checklist</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(content.specifications, null, 2), 'specs')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'specs' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="divide-y divide-white/5">
                      {Object.entries(content.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-2 text-xs">
                          <span className="text-zinc-500">{key}</span>
                          <span className="text-white font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Features & Benefits</span>
                        <button
                          onClick={() => copyToClipboard(content.features.join('\n'), 'features')}
                          className="text-zinc-500 hover:text-zinc-200"
                        >
                          {copiedField === 'features' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <ul className="space-y-2.5">
                        {content.features.map((feat, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                            <span className="text-[#C9A84C] font-semibold mt-0.5">•</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Visual Highlights</span>
                        <button
                          onClick={() => copyToClipboard(content.highlights.join('\n'), 'highlights')}
                          className="text-zinc-500 hover:text-zinc-200"
                        >
                          {copiedField === 'highlights' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {content.highlights.map((h, i) => (
                          <span key={i} className="bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-[11px] px-2.5 py-1 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Product Q&A (FAQs)</span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(content.faqs, null, 2), 'faqs')}
                      className="text-zinc-500 hover:text-zinc-200"
                    >
                      {copiedField === 'faqs' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {content.faqs.map((faq, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-white text-xs font-semibold">Q: {faq.question}</p>
                        <p className="text-zinc-400 text-xs leading-relaxed pl-4">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Care Instructions</p>
                      <ul className="space-y-1.5">
                        {content.careInstructions.map((c, i) => (
                          <li key={i} className="text-xs text-zinc-300 flex gap-2">
                            <span className="text-[#C9A84C]">•</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Luxury Gifting Occasion Copy</p>
                      <p className="text-zinc-300 text-xs leading-relaxed italic">"{content.giftingMessage}"</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Shipping Details</p>
                      <p className="text-zinc-400 text-xs leading-relaxed">{content.shippingInfo}</p>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Warranty & Refund Policies</p>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-2">Warranty: {content.warranty}</p>
                      <p className="text-zinc-400 text-xs leading-relaxed">Returns: {content.returnPolicy}</p>
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
