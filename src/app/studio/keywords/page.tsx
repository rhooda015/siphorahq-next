'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Loader2, Copy, Check, Download, Upload, ChevronRight, Zap } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface KeywordItem {
  keyword: string;
  searchVolume: string;
  competition: string;
  intent: string;
  cpc: string;
}

interface KeywordsResponse {
  primaryKeywords: KeywordItem[];
  longTailKeywords: string[];
  backendKeywords: string;
  amazonKeywords: string[];
  flipkartKeywords: string[];
  instagramHashtags: {
    high: string[];
    medium: string[];
    niche: string[];
  };
  competitionAnalysis: {
    overallCompetition: string;
    topCompetitors: string[];
    differentiationOpportunity: string;
    priceGap: string;
  };
  demandScore: number;
  marketplaceOpportunityScore: number;
  instagramViralityScore: number;
  trendAnalysis: string;
  seasonalityInsights: string;
  giftingKeywords: string[];
  pricingRecommendation: {
    budgetRange: string;
    midRange: string;
    premiumRange: string;
    suggestedPositioning: string;
  };
}

export default function KeywordsPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordsResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'primary' | 'longtail' | 'marketplace' | 'instagram' | 'intel'>('primary');
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
          const keywordAssets = data.assetsByModule?.keywords || [];
          if (keywordAssets.length > 0) {
            setKeywords(JSON.parse(keywordAssets[0].content));
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
          Please upload a product image first to research keywords.
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
      const res = await fetch('/api/studio/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Keywords analysis failed');

      setKeywords(data);
      toast.success('Keywords & Market analysis completed!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Keyword research failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success('Copied!');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const exportAsText = () => {
    if (!keywords) return;
    let content = `KEYWORDS & MARKET INTELLIGENCE REPORT: ${productNameInput.toUpperCase()}\n`;
    content += `Demand Score: ${keywords.demandScore}/100\n`;
    content += `Marketplace Opportunity: ${keywords.marketplaceOpportunityScore}/100\n\n`;
    content += `=== PRIMARY KEYWORDS ===\n`;
    keywords.primaryKeywords.forEach(k => {
      content += `${k.keyword} | Volume: ${k.searchVolume} | Comp: ${k.competition} | CPC: ${k.cpc}\n`;
    });
    content += `\n=== LONG-TAIL KEYWORDS ===\n`;
    keywords.longTailKeywords.forEach(k => {
      content += `- ${k}\n`;
    });
    content += `\n=== INSTAGRAM HASHTAGS ===\n`;
    content += `High: ${keywords.instagramHashtags.high.join(', ')}\n`;
    content += `Medium: ${keywords.instagramHashtags.medium.join(', ')}\n`;
    content += `Niche: ${keywords.instagramHashtags.niche.join(', ')}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-keywords-intel.txt`;
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
            <TrendingUp size={16} className="text-indigo-400" />
            <span className="text-indigo-400 text-xs font-medium uppercase tracking-wider">Module 12</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Keyword & Market Intelligence</h1>
          <p className="text-zinc-400 text-sm mt-1">Research primary and long-tail keywords, backend search indexes, search intents, and virality scores.</p>
        </div>
        <Link href="/studio/marketing">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Marketing
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Product Seed Query</label>
          <input
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            placeholder="e.g. Mughal Floral Coffee Mug Set"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold px-6 py-2.5 rounded-xl transition-all text-sm w-full md:w-auto h-10"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing Market...
            </>
          ) : (
            'Research Keywords'
          )}
        </button>
      </div>

      <AnimatePresence>
        {keywords && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Intel dashboard cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Market Demand Score', value: keywords.demandScore, color: 'text-indigo-400' },
                { label: 'Marketplace Opportunity', value: keywords.marketplaceOpportunityScore, color: 'text-[#C9A84C]' },
                { label: 'Instagram Virality Score', value: keywords.instagramViralityScore, color: 'text-pink-400' },
              ].map((card) => (
                <div key={card.label} className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-28">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{card.label}</span>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-3xl font-extrabold ${card.color}`}>{card.value}</p>
                    <span className="text-zinc-600 text-xs">/100</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'primary', label: 'Primary Keywords' },
                  { id: 'longtail', label: 'Long-Tail Lists' },
                  { id: 'marketplace', label: 'Marketplace Index' },
                  { id: 'instagram', label: 'Social Hashtags' },
                  { id: 'intel', label: 'Market Analysis' },
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
                Export plain text
              </button>
            </div>

            {/* Tab contents */}
            <div className="space-y-6">
              {activeTab === 'primary' && (
                <div className="bg-white/3 border border-white/5 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/2 text-zinc-400 font-medium">
                          <th className="p-3">Keyword</th>
                          <th className="p-3">Search Volume</th>
                          <th className="p-3">Competition</th>
                          <th className="p-3">Intent</th>
                          <th className="p-3">Est. CPC</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {keywords.primaryKeywords.map((item, index) => (
                          <tr key={index} className="hover:bg-white/1 transition-all">
                            <td className="p-3 font-medium text-white select-all">{item.keyword}</td>
                            <td className="p-3">{item.searchVolume}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] ${
                                item.competition === 'Low' ? 'bg-emerald-500/10 text-emerald-400' :
                                item.competition === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                'bg-red-500/10 text-red-400'
                              }`}>
                                {item.competition}
                              </span>
                            </td>
                            <td className="p-3 capitalize">{item.intent}</td>
                            <td className="p-3 font-mono">{item.cpc}</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => copyToClipboard(item.keyword, `primary-${index}`)}
                                className="text-zinc-500 hover:text-zinc-300"
                              >
                                {copiedField === `primary-${index}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'longtail' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keywords.longTailKeywords.map((lt, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/3 border border-white/5 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group">
                      <span className="text-xs text-zinc-300 font-medium select-all">{lt}</span>
                      <button
                        onClick={() => copyToClipboard(lt, `lt-${i}`)}
                        className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedField === `lt-${i}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'marketplace' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amazon Specific */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Amazon Index Tagging</span>
                    <div className="flex flex-wrap gap-2">
                      {keywords.amazonKeywords.map((k, i) => (
                        <span key={i} className="bg-white/5 border border-white/5 text-zinc-300 text-xs px-2.5 py-1 rounded-lg">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flipkart Specific */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Flipkart Search Tagging</span>
                    <div className="flex flex-wrap gap-2">
                      {keywords.flipkartKeywords.map((k, i) => (
                        <span key={i} className="bg-white/5 border border-white/5 text-zinc-300 text-xs px-2.5 py-1 rounded-lg">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'instagram' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'High-Volume (1M+ Posts)', data: keywords.instagramHashtags.high, color: 'text-rose-400' },
                      { title: 'Medium-Volume (200K+ Posts)', data: keywords.instagramHashtags.medium, color: 'text-purple-400' },
                      { title: 'Niche/Brand Tags', data: keywords.instagramHashtags.niche, color: 'text-[#C9A84C]' },
                    ].map((col) => (
                      <div key={col.title} className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-3">
                        <span className={`text-[10px] ${col.color} font-bold uppercase tracking-wider`}>{col.title}</span>
                        <div className="flex flex-col gap-2">
                          {col.data.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-xs text-zinc-400">
                              <span>{h}</span>
                              <button
                                onClick={() => copyToClipboard(h, `${col.title}-${i}`)}
                                className="text-zinc-600 hover:text-zinc-400"
                              >
                                {copiedField === `${col.title}-${i}` ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'intel' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Demand & Seasonal Insights</p>
                      <p className="text-zinc-300 text-xs leading-relaxed mb-3">{keywords.seasonalityInsights}</p>
                      <p className="text-zinc-400 text-xs leading-relaxed">{keywords.trendAnalysis}</p>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Gifting Specific Queries</p>
                      <div className="flex flex-wrap gap-2">
                        {keywords.giftingKeywords.map((k, i) => (
                          <span key={i} className="bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs px-2.5 py-1 rounded-full">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Pricing Range Strategy</p>
                      <div className="divide-y divide-white/5">
                        <div className="flex justify-between py-2 text-xs">
                          <span className="text-zinc-500">Economy Budget</span>
                          <span className="text-white font-medium">{keywords.pricingRecommendation.budgetRange}</span>
                        </div>
                        <div className="flex justify-between py-2 text-xs">
                          <span className="text-zinc-500">Mid-Range Premium</span>
                          <span className="text-white font-medium">{keywords.pricingRecommendation.midRange}</span>
                        </div>
                        <div className="flex justify-between py-2 text-xs">
                          <span className="text-[#C9A84C]">Siphorahq Luxe Range</span>
                          <span className="text-[#C9A84C] font-semibold">{keywords.pricingRecommendation.premiumRange}</span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed mt-3">{keywords.pricingRecommendation.suggestedPositioning}</p>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Competitor Analysis</p>
                      <p className="text-zinc-300 text-xs leading-relaxed mb-2">Competition index: {keywords.competitionAnalysis.overallCompetition}</p>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-2">Price Gap: {keywords.competitionAnalysis.priceGap}</p>
                      <p className="text-[#C9A84C] text-xs leading-relaxed italic">Opportunity: {keywords.competitionAnalysis.differentiationOpportunity}</p>
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
