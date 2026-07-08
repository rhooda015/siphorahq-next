'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ArrowRight, Trash2, Plus, Loader2 } from 'lucide-react';
import { useStudioStore, StudioProject } from '@/store/studioStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProjectsPage() {
  const router = useRouter();
  const { activeProject, setActiveProject, projects, setProjects } = useStudioStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/studio/projects?limit=50');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || []);
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [setProjects]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this project? This will delete all generated assets.')) return;

    try {
      const res = await fetch(`/api/studio/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
        if (activeProject?._id === id) {
          setActiveProject(null);
        }
        toast.success('Project deleted');
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  const handleSelect = (project: StudioProject) => {
    setActiveProject(project);
    router.push('/studio');
  };

  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderOpen size={22} className="text-[#C9A84C]" />
            Projects Library
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Manage and access all your product launch campaigns.</p>
        </div>
        <Link href="/studio/upload">
          <button className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors">
            <Plus size={14} />
            Create Project
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center max-w-md mx-auto">
          <FolderOpen size={36} className="text-zinc-600 mx-auto mb-3" />
          <h2 className="text-white text-base font-semibold mb-1">No Projects Found</h2>
          <p className="text-zinc-500 text-xs mb-6">Create a project by uploading a product image to begin.</p>
          <Link href="/studio/upload">
            <button className="bg-[#C9A84C] hover:bg-[#B8943E] text-[#0A0E1A] font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {projects.map((project, i) => {
              const isActive = activeProject?._id === project._id;
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleSelect(project)}
                  className={`
                    border rounded-2xl p-5 cursor-pointer relative group transition-all duration-200 flex flex-col justify-between h-40
                    ${isActive
                      ? 'border-[#C9A84C] bg-[#C9A84C]/5'
                      : 'border-white/5 hover:border-white/10 bg-white/2'
                    }
                  `}
                >
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-white text-sm font-bold truncate flex-1">{project.name}</h3>
                      <button
                        onClick={(e) => handleDelete(project._id, e)}
                        className="text-zinc-600 hover:text-red-400 p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-zinc-500 text-[11px] mt-1 font-medium">{project.productType || 'Ceramic product'}</p>
                    <p className="text-zinc-600 text-[10px] mt-2 line-clamp-2 leading-relaxed">
                      {project.description || 'No description provided'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4">
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(project.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="text-[9px] bg-[#C9A84C]/20 text-[#C9A84C] px-1.5 py-0.5 rounded-full font-bold">
                          ACTIVE
                        </span>
                      )}
                      <ArrowRight size={13} className="text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
