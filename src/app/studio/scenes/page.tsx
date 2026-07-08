'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Image as ImageIcon, Loader2, Sparkles, Download, AlertTriangle, Upload, ChevronRight } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Preset {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
}

export default function ScenesPage() {
  const router = useRouter();
  const { activeProject, addAsset } = useStudioStore();
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('luxury-marble');
  const [customPrompt, setCustomPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    // Load presets
    async function fetchPresets() {
      try {
        const res = await fetch('/api/studio/scene');
        if (res.ok) {
          const data = await res.json();
          setPresets(data.presets || []);
        }
      } catch {
        // Fallback to client presets if API fails
      }
    }
    fetchPresets();
  }, []);

  // Fetch previously generated scenes
  useEffect(() => {
    if (!activeProject) return;
    const projectId = activeProject._id;
    async function loadProjectDetails() {
      setLoadingHistory(true);
      try {
        const res = await fetch(`/api/studio/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          const sceneAssets = data.assetsByModule?.scene || [];
          setHistory(sceneAssets);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingHistory(false);
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
          Please upload a product image first to generate lifestyle scenes.
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
      const res = await fetch('/api/studio/scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          sceneId: selectedPreset,
          customPrompt: customPrompt.trim() || undefined,
          size,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      toast.success('Scene generated successfully!');
      
      const newAsset = {
        _id: data.assetId,
        projectId: activeProject._id,
        moduleId: 'scene',
        type: 'image' as const,
        label: `Scene: ${data.sceneName}`,
        content: data.image,
        metadata: { sceneId: selectedPreset, size },
        format: 'png',
        createdAt: new Date().toISOString(),
      };
      
      addAsset(newAsset);
      setHistory((prev) => [newAsset, ...prev]);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Scene generation failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
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
            <ImageIcon size={16} className="text-pink-400" />
            <span className="text-pink-400 text-xs font-medium uppercase tracking-wider">Module 3</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Scene Generator</h1>
          <p className="text-zinc-400 text-sm mt-1">Generate premium lifestyle environments using DALL-E 3, keeping your product preserved.</p>
        </div>
        <Link href="/studio/naming">
          <button className="flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-xs transition-all">
            Continue to Naming
            <ChevronRight size={14} />
          </button>
        </Link>
      </div>

      {/* Cost warning banner */}
      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-300">
        <AlertTriangle size={18} className="flex-shrink-0 animate-pulse" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider">Cost Advisory</p>
          <p className="text-[11px] opacity-80 mt-0.5">
            Each image generation uses DALL-E 3 API (cost is approximately ₹3 to ₹6 per generation). Please verify details before proceeding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Presets and options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preset list */}
          <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4">
            <h2 className="text-white text-sm font-semibold">Select Landscape Scene Presets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => { setSelectedPreset(preset.id); setCustomPrompt(''); }}
                  className={`
                    border rounded-xl p-3 cursor-pointer transition-all flex flex-col justify-between h-24
                    ${selectedPreset === preset.id && !customPrompt
                      ? 'border-[#C9A84C] bg-[#C9A84C]/5 text-[#C9A84C]'
                      : 'border-white/5 hover:border-white/10 bg-white/2 text-zinc-400 hover:text-zinc-200'
                    }
                  `}
                >
                  <span className="text-xl">{preset.thumbnail}</span>
                  <div>
                    <p className="text-white text-xs font-semibold truncate">{preset.name}</p>
                    <p className="text-[10px] text-zinc-500 truncate mt-0.5">{preset.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom prompt and settings */}
          <div className="bg-white/3 border border-white/5 rounded-2xl p-5 space-y-4">
            <h2 className="text-white text-sm font-semibold">Custom Setting Prompt</h2>
            <textarea
              value={customPrompt}
              onChange={(e) => { setCustomPrompt(e.target.value); setSelectedPreset(''); }}
              placeholder="e.g. Place the product on a rustic mahogany coffee table during winter morning, cozy lights, tea kettle steam in background..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40 transition-all resize-none"
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Size Aspect Ratio</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#C9A84C]/40 cursor-pointer"
                >
                  <option value="1024x1024">Square (1:1)</option>
                  <option value="1792x1024">Landscape (16:9)</option>
                  <option value="1024x1792">Portrait (9:16)</option>
                </select>
              </div>
              <div className="w-1/2 flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold py-2.5 rounded-xl transition-all text-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Generate (DALL-E 3)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Image history / output */}
        <div className="space-y-4">
          <div className="bg-white/3 border border-white/5 rounded-2xl p-5 min-h-[400px] flex flex-col">
            <h2 className="text-white text-sm font-semibold border-b border-white/5 pb-3">Generated Gallery</h2>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-12">
                <Loader2 size={32} className="text-[#C9A84C] animate-spin" />
                <p className="text-xs text-[#C9A84C] font-medium animate-pulse">Running image generation...</p>
                <p className="text-zinc-500 text-[10px] text-center max-w-[200px]">DALL-E 3 takes approximately 8-15 seconds to create your luxury backdrop.</p>
              </div>
            ) : loadingHistory ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <Loader2 size={24} className="text-zinc-500 animate-spin" />
              </div>
            ) : history.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <ImageIcon size={28} className="text-zinc-700 mb-2" />
                <p className="text-zinc-500 text-xs">No generated scenes yet</p>
                <p className="text-zinc-700 text-[10px] mt-1">Select a preset on the left to start generating</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 mt-4 max-h-[480px]">
                {history.map((asset) => (
                  <div key={asset._id} className="border border-white/5 rounded-xl overflow-hidden bg-black/40 relative group">
                    <img src={asset.content} alt={asset.label} className="w-full object-cover aspect-video" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-3 transition-opacity">
                      <p className="text-white text-xs font-semibold truncate">{asset.label}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{asset.metadata?.size || '1024x1024'}</p>
                      <button
                        onClick={() => downloadImage(asset.content, `${asset.label.replace(/\s+/g, '-')}.png`)}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-[10px] py-1.5 rounded transition-all"
                      >
                        <Download size={10} />
                        Download Asset (PNG)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
