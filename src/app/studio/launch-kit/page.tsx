'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Loader2, CheckCircle2, AlertTriangle, Download, Upload, Clock, AlertCircle } from 'lucide-react';
import { useStudioStore } from '@/store/studioStore';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface TaskProgress {
  id: string;
  name: string;
  endpoint: string;
  status: 'pending' | 'running' | 'done' | 'error';
  errorMsg?: string;
}

export default function LaunchKitPage() {
  const { activeProject } = useStudioStore();
  const [productNameInput, setProductNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('2499');
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [tasks, setTasks] = useState<TaskProgress[]>([
    { id: 'naming', name: 'Product Naming Studio', endpoint: '/api/studio/naming', status: 'pending' },
    { id: 'content', name: 'Product Content Details', endpoint: '/api/studio/content', status: 'pending' },
    { id: 'amazon', name: 'Amazon E-Commerce Listing', endpoint: '/api/studio/amazon', status: 'pending' },
    { id: 'flipkart', name: 'Flipkart E-Commerce Listing', endpoint: '/api/studio/flipkart', status: 'pending' },
    { id: 'seo', name: 'Technical SEO Package', endpoint: '/api/studio/seo', status: 'pending' },
    { id: 'keywords', name: 'Keyword & Market Intelligence', endpoint: '/api/studio/keywords', status: 'pending' },
    { id: 'marketing', name: 'Multi-Channel Marketing Copy', endpoint: '/api/studio/marketing', status: 'pending' },
    { id: 'pricing', name: 'Pricing & Business Analytics', endpoint: '/api/studio/pricing', status: 'pending' },
  ]);

  useEffect(() => {
    if (activeProject) {
      setProductNameInput(activeProject.name);
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
          Please upload a product image first to generate a complete Launch Kit.
        </p>
        <Link href="/studio/upload">
          <button className="bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            Go to AI Product Studio
          </button>
        </Link>
      </div>
    );
  }

  const runSequentially = async () => {
    setRunning(true);
    setCompleted(false);
    
    // Reset statuses
    setTasks(prev => prev.map(t => ({ ...t, status: 'pending', errorMsg: undefined })));

    let hasError = false;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      
      // Update state to running
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'running' } : t));

      try {
        const payload: Record<string, string> = { projectId: activeProject._id };
        if (productNameInput.trim()) payload.productName = productNameInput.trim();
        if (priceInput.trim()) payload.price = priceInput.trim();
        if (task.id === 'pricing') {
          payload.costOfProduction = '350';
          payload.targetMarginPercent = '40';
          payload.mrp = priceInput.trim() || '2499';
        }

        const res = await fetch(task.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Task execution failed');

        // Update state to done
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done' } : t));
      } catch (err) {
        console.error(err);
        hasError = true;
        const msg = err instanceof Error ? err.message : 'Execution failed';
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'error', errorMsg: msg } : t));
        toast.error(`Failed: ${task.name}`);
      }
    }

    setRunning(false);
    if (!hasError) {
      setCompleted(true);
      toast.success('Launch Kit successfully compiled!');
    } else {
      toast.error('Completed with some errors. Please re-run failed tasks.');
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const res = await fetch('/api/studio/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
        }),
      });

      if (!res.ok) throw new Error('Failed to download package');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `siphorahq-launch-pack-${activeProject._id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Campaign launch JSON downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to export campaign');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Rocket size={16} className="text-yellow-400" />
          <span className="text-yellow-400 text-xs font-medium uppercase tracking-wider">Module 17</span>
        </div>
        <h1 className="text-2xl font-bold text-white">One-Click Marketing Kit</h1>
        <p className="text-zinc-400 text-sm mt-1">Compile your complete launch campaign (e-commerce listings, pricing margins, keywords, ads) in one workflow.</p>
      </div>

      {/* Warning banner */}
      <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-300">
        <AlertTriangle size={18} className="flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider">Automated Parallel Request Notice</p>
          <p className="text-[11px] opacity-80 mt-0.5">
            This module generates text intelligence across all Phase 1 AI systems sequentially. The entire process takes approximately 45-60 seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings & Trigger */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6 space-y-5 h-fit">
          <h2 className="text-white text-sm font-semibold border-b border-white/5 pb-3">Kit Build Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Campaign Product Name</label>
              <input
                type="text"
                value={productNameInput}
                onChange={(e) => setProductNameInput(e.target.value)}
                placeholder="e.g. Shalimar Mughal Cup"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5 font-sans">Target Selling Price (₹)</label>
              <input
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="2499"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={runSequentially}
            disabled={running}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] disabled:bg-zinc-700 disabled:cursor-not-allowed text-[#0A0E1A] font-semibold py-3 rounded-xl transition-all text-xs"
          >
            {running ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Compiling Kit...
              </>
            ) : (
              <>
                <Rocket size={14} />
                Generate Complete Kit
              </>
            )}
          </button>

          {completed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleExport}
              disabled={exportLoading}
              className="w-full flex items-center justify-center gap-2 border border-emerald-500/30 hover:border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold py-2.5 rounded-xl transition-all text-xs"
            >
              {exportLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Building package...
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download Launch Pack (JSON)
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Tasks Checklist progress */}
        <div className="lg:col-span-2 bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-white text-sm font-semibold border-b border-white/5 pb-3">Generation Progress Tracker</h2>
            <div className="divide-y divide-white/5">
              {tasks.map((task) => (
                <div key={task.id} className="flex justify-between items-center py-2.5 text-xs first:pt-0">
                  <div className="flex items-center gap-2.5">
                    {task.status === 'done' && <CheckCircle2 size={14} className="text-emerald-400" />}
                    {task.status === 'running' && <Loader2 size={14} className="text-[#C9A84C] animate-spin" />}
                    {task.status === 'pending' && <Clock size={14} className="text-zinc-600" />}
                    {task.status === 'error' && <AlertCircle size={14} className="text-red-400" />}
                    <span className={`font-medium ${
                      task.status === 'done' ? 'text-white' :
                      task.status === 'running' ? 'text-[#C9A84C]' : 'text-zinc-500'
                    }`}>{task.name}</span>
                  </div>
                  <div>
                    {task.status === 'done' && <span className="text-emerald-400 font-semibold">Ready</span>}
                    {task.status === 'running' && <span className="text-[#C9A84C] font-semibold animate-pulse">Running</span>}
                    {task.status === 'pending' && <span className="text-zinc-600">Pending</span>}
                    {task.status === 'error' && <span className="text-red-400 font-semibold" title={task.errorMsg}>Error</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {completed && (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400 flex-shrink-0" size={18} />
              <div>
                <p className="text-xs font-semibold text-emerald-400">Launch Kit Ready!</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">All 8 core intellectual assets generated. Download the consolidated package file to deploy.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
