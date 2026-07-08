'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Loader2, Copy, Check, Download, Upload, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface CaptionItem {
  theme: string;
  caption: string;
}

interface CalendarItem {
  day: number;
  platform: string;
  type: string;
  theme: string;
  caption: string;
}

interface MarketingPackage {
  instagram: {
    captions: CaptionItem[];
    hashtags: {
      primary: string[];
      secondary: string[];
      niche: string[];
    };
    reelScript: string;
    storySequence: string[];
  };
  facebook: {
    adCopy: {
      headline: string;
      primaryText: string;
      description: string;
      cta: string;
    };
    organicPost: string;
    groupPost: string;
  };
  googleAds: {
    responsiveSearchAd: {
      headlines: string[];
      descriptions: string[];
    };
    displayAdCopy: string;
  };
  whatsapp: {
    broadcastMessage: string;
    statusText: string;
  };
  email: {
    subjectLines: string[];
    preheader: string;
    body: string;
    cta: string;
  };
  contentCalendar: CalendarItem[];
  influencerBrief: string;
  ugcScript: string;
}

export default function MarketingPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('2499');
  const [loading, setLoading] = useState(false);
  const [mkt, setMkt] = useState<MarketingPackage | null>(null);
  const [activeTab, setActiveTab] = useState<'instagram' | 'facebook' | 'google' | 'messenger' | 'calendar' | 'briefs'>('instagram');
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
          const marketingAssets = data.assetsByModule?.marketing || [];
          if (marketingAssets.length > 0) {
            setMkt(JSON.parse(marketingAssets[0].content));
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
          Please upload a product image first to generate marketing campaigns.
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
      const res = await fetch('/api/studio/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          productName: productNameInput.trim(),
          price: priceInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Marketing campaign generation failed');

      setMkt(data);
      toast.success('Campaigns generated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Marketing generation failed');
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

  const exportAsJSON = () => {
    if (!mkt) return;
    const blob = new Blob([JSON.stringify(mkt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeProject.name}-marketing-pack.json`;
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
            <Megaphone size={16} className="text-rose-400" />
            <span className="text-rose-400 text-xs font-medium uppercase tracking-wider">Module 11</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Marketing Studio</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate multi-channel ad copy, email broadcasts, Status briefs, and influencer templates.</p>
        </div>
        <Link href="/studio/launch-kit">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Go to Launch Kit
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Input controls */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Product Campaign Title</label>
          <input
            type="text"
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            placeholder="e.g. Siphorahq Shalimar Tea Cup Set"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Listing Price Reference (₹)</label>
          <input
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            placeholder="2499"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
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
              Writing Ad Copy...
            </>
          ) : (
            'Generate Campaign Pack'
          )}
        </button>
      </div>

      <AnimatePresence>
        {mkt && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Navigation tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-2">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'facebook', label: 'Facebook Ads' },
                  { id: 'google', label: 'Google Search Ads' },
                  { id: 'messenger', label: 'WhatsApp & Email' },
                  { id: 'calendar', label: '30-Day Calendar' },
                  { id: 'briefs', label: 'Creator Briefs' },
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
                Export Campaign JSON
              </button>
            </div>

            {/* Tab contents */}
            <div className="space-y-6">
              {activeTab === 'instagram' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Captions stack */}
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Instagram Caption Sets</span>
                    {mkt.instagram.captions.map((c, i) => (
                      <div key={i} className="bg-white/3 border border-white/5 rounded-xl p-5 relative group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] bg-white/5 text-[#C9A84C] px-2 py-0.5 rounded font-medium">
                            {c.theme}
                          </span>
                          <button
                            onClick={() => copyToClipboard(c.caption, `insta-${i}`)}
                            className="text-zinc-500 hover:text-zinc-300"
                          >
                            {copiedField === `insta-${i}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                        </div>
                        <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap">{c.caption}</p>
                      </div>
                    ))}
                  </div>

                  {/* Script / Hashtags */}
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Reels Production Script</span>
                      <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto bg-black/25 p-3 rounded-lg border border-white/5 font-mono">
                        {mkt.instagram.reelScript}
                      </p>
                    </div>

                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Target Hashtags Pack</span>
                      <div className="flex flex-col gap-2 text-xs">
                        <div className="text-zinc-400">
                          <span className="text-pink-400 font-semibold">Primary:</span> {mkt.instagram.hashtags.primary.join(' ')}
                        </div>
                        <div className="text-zinc-400">
                          <span className="text-purple-400 font-semibold">Niche:</span> {mkt.instagram.hashtags.niche.join(' ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'facebook' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ad Copy */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Facebook Conversion Ad Copy</span>
                    <div className="space-y-3">
                      <div>
                        <p className="text-zinc-500 text-[10px]">Headline</p>
                        <p className="text-white text-xs font-semibold bg-white/2 p-2 rounded border border-white/5 mt-1">{mkt.facebook.adCopy.headline}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[10px]">Primary Text</p>
                        <p className="text-zinc-300 text-xs bg-white/2 p-2 rounded border border-white/5 mt-1 whitespace-pre-wrap">{mkt.facebook.adCopy.primaryText}</p>
                      </div>
                      <div className="flex justify-between text-xs bg-white/2 p-2 rounded border border-white/5">
                        <span className="text-zinc-500">CTA Button</span>
                        <span className="text-white font-semibold">{mkt.facebook.adCopy.cta}</span>
                      </div>
                    </div>
                  </div>

                  {/* Organic Posts */}
                  <div className="space-y-4">
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Organic Feed Post</span>
                      <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap">{mkt.facebook.organicPost}</p>
                    </div>
                    <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Home Decor Community Post</span>
                      <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap">{mkt.facebook.groupPost}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'google' && (
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block border-b border-white/5 pb-2">
                    Responsive Search Ad Headlines & Descriptions
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-xs font-semibold">Headlines (Max 30 chars)</p>
                      {mkt.googleAds.responsiveSearchAd.headlines.map((hl, i) => (
                        <div key={i} className="flex justify-between items-center text-xs bg-white/2 p-2 rounded border border-white/5 text-zinc-300">
                          <span>{hl}</span>
                          <span className="text-zinc-600 text-[10px]">{hl.length}/30</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-zinc-500 text-xs font-semibold">Descriptions (Max 90 chars)</p>
                      {mkt.googleAds.responsiveSearchAd.descriptions.map((desc, i) => (
                        <div key={i} className="flex justify-between items-center text-xs bg-white/2 p-2 rounded border border-white/5 text-zinc-300">
                          <span>{desc}</span>
                          <span className="text-zinc-600 text-[10px]">{desc.length}/90</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messenger' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* WhatsApp Broadcast */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">WhatsApp Broadcast Copy</span>
                      <button
                        onClick={() => copyToClipboard(mkt.whatsapp.broadcastMessage, 'whatsapp')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'whatsapp' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg">
                      {mkt.whatsapp.broadcastMessage}
                    </p>
                  </div>

                  {/* Email Marketing */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Email Campaign HTML</span>
                      <button
                        onClick={() => copyToClipboard(mkt.email.body, 'emailBody')}
                        className="text-zinc-500 hover:text-zinc-200"
                      >
                        {copiedField === 'emailBody' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px]">Subject Lines Suggestions</p>
                      <ul className="text-xs text-white space-y-1.5 mt-1 border-b border-white/5 pb-3">
                        {mkt.email.subjectLines.map((s, i) => (
                          <li key={i}>• "{s}"</li>
                        ))}
                      </ul>
                    </div>
                    <code className="text-zinc-400 text-[9px] block whitespace-pre-wrap font-mono bg-black/25 border border-white/5 p-3 rounded-lg max-h-48 overflow-y-auto">
                      {mkt.email.body}
                    </code>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="bg-white/3 border border-white/5 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/2 text-zinc-400 font-medium">
                          <th className="p-3">Day</th>
                          <th className="p-3">Platform</th>
                          <th className="p-3">Content Type</th>
                          <th className="p-3">Theme</th>
                          <th className="p-3">Preview</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-zinc-300">
                        {mkt.contentCalendar.map((item, index) => (
                          <tr key={index} className="hover:bg-white/1 transition-all">
                            <td className="p-3 font-semibold text-white">Day {item.day}</td>
                            <td className="p-3">{item.platform}</td>
                            <td className="p-3 font-mono text-[#C9A84C]">{item.type}</td>
                            <td className="p-3">{item.theme}</td>
                            <td className="p-3 truncate max-w-[200px]">{item.caption}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'briefs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Influencer Brief */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Influencer Partnership Brief</span>
                    <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap">{mkt.influencerBrief}</p>
                  </div>

                  {/* UGC Creator Script */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-5">
                    <span className="text-[10px] text-[#C9A84C] font-bold uppercase tracking-wider block mb-2">UGC Unboxing Script</span>
                    <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-line font-mono max-h-64 overflow-y-auto">
                      {mkt.ugcScript}
                    </p>
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
