'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle2, AlertCircle, ImageIcon, Loader2, Sparkles, ArrowRight, Tag, Package, Palette, Layers } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AnalysisResult {
  projectId: string;
  project: {
    _id: string;
    name: string;
    productType: string;
    productAttributes: {
      colors: string[];
      shape: string;
      material: string;
      estimatedDimensions: string;
      features: string[];
      style: string;
    };
    analysisMetadata: {
      luxuryScore: number;
      giftability: number;
      suggestedName: string;
    };
    originalImage: string;
    status: string;
    createdAt: string;
  };
}

export default function UploadPage() {
  const router = useRouter();
  const { setActiveProject } = useStudioStore();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setError(null);
    setResult(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
    if (!projectName) {
      setProjectName(f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  }, [projectName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleUpload = async () => {
    if (!file) { toast.error('Please select an image first'); return; }
    if (!projectName.trim()) { toast.error('Please enter a project name'); return; }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('projectName', projectName.trim());
    formData.append('description', description.trim());

    try {
      const res = await fetch('/api/studio/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data);
      setActiveProject(data.project);
      toast.success('Product analyzed successfully!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (result) {
      router.push('/studio/enhance');
    }
  };

  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Upload size={16} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">Module 1</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Product Studio</h1>
          <p className="text-zinc-400 text-sm mt-1">Upload your product image. GPT-4o Vision will analyze and extract product attributes automatically.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload area */}
          <div className="space-y-4">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
                ${isDragActive ? 'border-blue-500/60 bg-blue-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/2'}
                ${file ? 'border-emerald-500/40 bg-emerald-500/5' : ''}
              `}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl object-contain" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full p-1.5 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={24} className="text-zinc-400" />
                  </div>
                  <p className="text-white text-sm font-medium mb-1">
                    {isDragActive ? 'Drop your image here' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-zinc-500 text-xs">JPEG, PNG, WebP — max 10MB</p>
                </div>
              )}
            </div>

            {/* Project details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Project Name *</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Royal Blue Tea Cup"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40 focus:ring-1 focus:ring-[#C9A84C]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any notes about the product..."
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-[#C9A84C]/40 focus:ring-1 focus:ring-[#C9A84C]/20 transition-all resize-none"
                />
              </div>
            </div>

            <motion.button
              onClick={handleUpload}
              disabled={loading || !file}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing with GPT-4o Vision...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Analyze Product Image
                </>
              )}
            </motion.button>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                <AlertCircle size={15} />
                <span className="text-xs">{error}</span>
              </div>
            )}
          </div>

          {/* Analysis Result */}
          <AnimatePresence>
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Success banner */}
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-400 text-sm font-medium">Product Analyzed!</p>
                    <p className="text-emerald-600 text-xs">GPT-4o Vision extracted product attributes</p>
                  </div>
                </div>

                {/* Product type */}
                <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={14} className="text-[#C9A84C]" />
                    <span className="text-[#C9A84C] text-xs font-medium uppercase tracking-wider">Product Type</span>
                  </div>
                  <p className="text-white text-lg font-semibold">{result.project.productType}</p>
                  {result.project.analysisMetadata?.suggestedName && (
                    <p className="text-zinc-400 text-xs mt-1">Suggested: "{result.project.analysisMetadata.suggestedName}"</p>
                  )}
                </div>

                {/* Attributes grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Layers size={12} className="text-purple-400" />
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Material</span>
                    </div>
                    <p className="text-white text-sm">{result.project.productAttributes?.material || 'Ceramic'}</p>
                  </div>
                  <div className="bg-white/3 border border-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Tag size={12} className="text-amber-400" />
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider">Style</span>
                    </div>
                    <p className="text-white text-sm">{result.project.productAttributes?.style || 'Premium'}</p>
                  </div>
                </div>

                {/* Colors */}
                {result.project.productAttributes?.colors?.length > 0 && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Palette size={14} className="text-pink-400" />
                      <span className="text-zinc-400 text-xs uppercase tracking-wider">Colors</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.project.productAttributes.colors.map((color, i) => (
                        <span key={i} className="bg-white/8 border border-white/10 text-zinc-300 text-xs px-2.5 py-1 rounded-full">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {result.project.productAttributes?.features?.length > 0 && (
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4">
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3">Key Features</p>
                    <div className="flex flex-wrap gap-2">
                      {result.project.productAttributes.features.map((feat, i) => (
                        <span key={i} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scores */}
                {result.project.analysisMetadata && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Luxury Score', value: result.project.analysisMetadata.luxuryScore, color: 'text-[#C9A84C]' },
                      { label: 'Giftability', value: result.project.analysisMetadata.giftability, color: 'text-pink-400' },
                    ].map((score) => (
                      <div key={score.label} className="bg-white/3 border border-white/5 rounded-xl p-3 text-center">
                        <p className={`text-2xl font-bold ${score.color}`}>{score.value}/10</p>
                        <p className="text-zinc-500 text-xs">{score.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  onClick={handleContinue}
                  whileHover={{ scale: 1.01 }}
                  className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold py-3 rounded-xl transition-all text-sm"
                >
                  Continue to Enhancement Engine
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full border border-dashed border-white/5 rounded-2xl p-12 text-center"
              >
                <Sparkles size={32} className="text-zinc-700 mb-4" />
                <p className="text-zinc-500 text-sm">AI analysis results will appear here</p>
                <p className="text-zinc-700 text-xs mt-2">GPT-4o Vision will identify product type, colors, material, and luxury attributes</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
