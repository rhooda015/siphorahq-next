'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Wand2, Loader2, Sparkles, Download, ArrowRight, Upload } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EnhancePage() {
  const router = useRouter();
  const { activeProject, updateProject } = useStudioStore();
  const [brightness, setBrightness] = useState(1.05);
  const [contrast, setContrast] = useState(1.1);
  const [saturation, setSaturation] = useState(1.08);
  const [sharpness, setSharpness] = useState(1.5);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [whiteBgImage, setWhiteBgImage] = useState<string | null>(null);

  useEffect(() => {
    if (activeProject?.enhancedImage) {
      setEnhancedImage(activeProject.enhancedImage);
    }
  }, [activeProject]);

  if (!activeProject) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <Upload size={24} className="text-zinc-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">No Active Project</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-6">
          Please upload a product image first to use the AI Enhancement Engine.
        </p>
        <Link href="/studio/upload">
          <button className="bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            Go to AI Product Studio
          </button>
        </Link>
      </div>
    );
  }

  const handleEnhance = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          settings: {
            brightness,
            contrast,
            saturation,
            sharpness,
            removeBackground,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Enhancement failed');

      setEnhancedImage(data.enhanced);
      setWhiteBgImage(data.whiteBackground);
      updateProject(activeProject._id, { enhancedImage: data.enhanced });
      toast.success('Image enhanced successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Failed to enhance image');
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
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Wand2 size={16} className="text-purple-400" />
          <span className="text-purple-400 text-xs font-medium uppercase tracking-wider">Module 2</span>
        </div>
        <h1 className="text-2xl font-bold text-white">AI Enhancement Engine</h1>
        <p className="text-zinc-400 text-sm mt-1">Adjust lighting, sharpness, contrast, and color fidelity to give your product a premium gloss.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6 space-y-6 h-fit">
          <h2 className="text-white font-semibold text-sm border-b border-white/5 pb-3">Enhancement Controls</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Brightness</span>
                <span className="text-white font-mono">{brightness.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Contrast</span>
                <span className="text-white font-mono">{contrast.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={contrast}
                onChange={(e) => setContrast(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Saturation</span>
                <span className="text-white font-mono">{saturation.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={saturation}
                onChange={(e) => setSaturation(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">Sharpness</span>
                <span className="text-white font-mono">{sharpness.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={sharpness}
                onChange={(e) => setSharpness(parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="removeBg"
                checked={removeBackground}
                onChange={(e) => setRemoveBackground(e.target.checked)}
                className="w-4 h-4 rounded accent-[#C9A84C] bg-white/5 border border-white/10 cursor-pointer"
              />
              <label htmlFor="removeBg" className="text-xs text-zinc-300 cursor-pointer">
                Flatten with White Background
              </label>
            </div>
          </div>

          <button
            onClick={handleEnhance}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing Sharp...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Apply Enhancement
              </>
            )}
          </button>
        </div>

        {/* Workspace/Comparison */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center min-h-[380px]">
            {enhancedImage ? (
              <div className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-zinc-500 text-xs text-center font-medium">Original</p>
                    <div className="aspect-square bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-white/5">
                      <img src={activeProject.originalImage} alt="Original" className="max-h-64 object-contain" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#C9A84C] text-xs text-center font-medium">Enhanced Result</p>
                    <div className="aspect-square bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-[#C9A84C]/20">
                      <img src={enhancedImage} alt="Enhanced" className="max-h-64 object-contain" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 border-t border-white/5 pt-4">
                  <button
                    onClick={() => downloadImage(enhancedImage, `${activeProject.name}-enhanced.jpg`)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs px-4 py-2.5 rounded-lg border border-white/10 transition-all"
                  >
                    <Download size={14} />
                    Download Enhanced (JPG)
                  </button>
                  {whiteBgImage && (
                    <button
                      onClick={() => downloadImage(whiteBgImage, `${activeProject.name}-white-bg.jpg`)}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs px-4 py-2.5 rounded-lg border border-white/10 transition-all"
                    >
                      <Download size={14} />
                      Download White BG (JPG)
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="aspect-square w-64 bg-black/40 rounded-xl overflow-hidden flex items-center justify-center border border-white/5 mx-auto">
                  <img src={activeProject.originalImage} alt="Original" className="max-h-56 object-contain" />
                </div>
                <p className="text-zinc-500 text-xs mt-2">Adjust controls on the left and apply enhancement to preview results</p>
              </div>
            )}
          </div>

          {enhancedImage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <button
                onClick={() => router.push('/studio/scenes')}
                className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Continue to Scene Generator
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
