'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubdomainProject } from '@/config/projects';
import { TechIcon } from './TechIcon';
import { GithubIcon } from './Icons';
import {
  X,
  ExternalLink,
  Globe,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Code2,
} from 'lucide-react';
import Image from 'next/image';

interface ProjectModalProps {
  project: SubdomainProject | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop blur click-to-dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto z-10 glass-panel rounded-2xl border border-white/20 shadow-2xl p-5 sm:p-7 md:p-10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {project.isSubdomain && project.subdomain ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {project.subdomain}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                    <Sparkles size={12} className="text-indigo-400" />
                    {project.statusLabel || 'Standalone / Systems'}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                  {project.isSubdomain ? 'Live Production Node' : 'Repository Project'}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white glow-text">
                {project.name}
              </h2>
              <p className="text-sm md:text-base text-slate-300 mt-1 font-sans">
                {project.tagline}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Screenshot / Visual Showcase */}
          <div className="mt-6 rounded-xl overflow-hidden border border-white/15 bg-black/60 relative group">
            {project.screenshotUrl ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={project.screenshotUrl}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="aspect-video w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-950 via-[#0a0d20] to-black">
                <Code2 size={48} className="text-indigo-400 mb-3" />
                <span className="font-mono text-sm text-white font-bold tracking-wide">
                  {project.name}
                </span>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {project.statusLabel || 'Repository Showcase'}
                </span>
              </div>
            )}

            {/* Quick Action Links Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/20"
                >
                  <Globe size={16} />
                  <span>{project.isSubdomain ? `Launch ${project.subdomain}` : 'Launch'}</span>
                  <ArrowRight size={16} />
                </a>
              ) : null}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-black/70 hover:bg-black text-white border border-white/25 font-mono text-xs flex items-center gap-2 transition-all backdrop-blur-md"
                >
                  <GithubIcon size={15} />
                  <span>GitHub Repository</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Content Body Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Architectural Deep-Dive */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" /> Architectural Breakdown & Overview
              </h4>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                {project.fullWriteup}
              </p>
            </div>

            {/* Tech Stack Sidebar */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Core Technologies
              </h4>
              <div className="flex flex-col gap-2.5">
                {project.technologies.map((tech) => {
                  const techColor = tech.color || '#ffffff';
                  return (
                    <a
                      key={tech.id}
                      href={tech.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                      style={{ borderLeftColor: techColor, borderLeftWidth: 3 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/40 border border-white/10"
                          style={{ color: techColor }}
                        >
                          <TechIcon techId={tech.id} color={techColor} size={15} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors">
                            {tech.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-slate-500 group-hover:text-white transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
