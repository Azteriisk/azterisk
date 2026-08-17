'use client';

import React, { useState, useMemo } from 'react';
import { ALL_DIRECTORY_PROJECTS, SubdomainProject, ProjectType } from '@/config/projects';
import { TechIcon } from './TechIcon';
import { GithubIcon } from './Icons';
import {
  ExternalLink,
  Globe,
  ArrowUpRight,
  Search,
  Layers,
  Cpu,
  Terminal,
  Gamepad2,
  Boxes,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectListViewProps {
  onSelectProject: (project: SubdomainProject) => void;
}

type FilterCategory = 'all' | 'subdomain' | 'systems' | 'desktop' | 'cli' | 'engine' | 'game';

export function ProjectListView({ onSelectProject }: ProjectListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = useMemo(() => {
    return ALL_DIRECTORY_PROJECTS.filter((project) => {
      // Category filter
      if (activeFilter === 'subdomain' && !project.isSubdomain) return false;
      if (activeFilter === 'systems' && project.projectType !== 'systems' && project.projectType !== 'engine') return false;
      if (activeFilter === 'desktop' && project.projectType !== 'desktop') return false;
      if (activeFilter === 'cli' && project.projectType !== 'cli') return false;
      if (activeFilter === 'game' && project.projectType !== 'game') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = project.name.toLowerCase().includes(query);
        const matchDesc = project.shortDescription.toLowerCase().includes(query);
        const matchTagline = project.tagline.toLowerCase().includes(query);
        const matchTech = project.technologies.some((t) =>
          t.name.toLowerCase().includes(query)
        );
        const matchSubdomain = project.subdomain?.toLowerCase().includes(query);
        return matchName || matchDesc || matchTagline || matchTech || matchSubdomain;
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  const filterTabs: { id: FilterCategory; label: string; icon: React.ElementType; count: number }[] = [
    {
      id: 'all',
      label: 'All Projects',
      icon: Boxes,
      count: ALL_DIRECTORY_PROJECTS.length,
    },
    {
      id: 'subdomain',
      label: 'Live Subdomains',
      icon: Globe,
      count: ALL_DIRECTORY_PROJECTS.filter((p) => p.isSubdomain).length,
    },
    {
      id: 'systems',
      label: 'Systems & Sim',
      icon: Cpu,
      count: ALL_DIRECTORY_PROJECTS.filter((p) => p.projectType === 'systems' || p.projectType === 'engine').length,
    },
    {
      id: 'desktop',
      label: 'Desktop & VST',
      icon: Layers,
      count: ALL_DIRECTORY_PROJECTS.filter((p) => p.projectType === 'desktop').length,
    },
    {
      id: 'cli',
      label: 'CLI & Automation',
      icon: Terminal,
      count: ALL_DIRECTORY_PROJECTS.filter((p) => p.projectType === 'cli').length,
    },
    {
      id: 'game',
      label: 'Games & 3D',
      icon: Gamepad2,
      count: ALL_DIRECTORY_PROJECTS.filter((p) => p.projectType === 'game').length,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10 space-y-6">
      {/* Directory Filter & Search Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, technology, or stack (e.g. Rust, Next.js, C++)..."
            className={`w-full pl-10 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 text-white placeholder:text-slate-500 font-mono text-xs outline-none transition-all ${searchQuery ? 'pr-16' : 'pr-4'}`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Badges Carousel / Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 space-y-3 glass-panel rounded-2xl border border-white/10"
            >
              <Boxes size={32} className="mx-auto text-slate-500" />
              <p className="text-sm font-mono text-slate-400">
                No projects matched &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
                onClick={() => onSelectProject(project)}
                className="group glass-panel glass-panel-hover rounded-2xl p-5 sm:p-7 md:p-8 cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/25 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Column: Category Pill, Title, Description, Tech Stack */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {project.isSubdomain && project.subdomain ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          {project.subdomain}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                          <Sparkles size={11} className="text-indigo-400" />
                          {project.statusLabel || 'Standalone / Systems'}
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                        {project.tagline}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="text-slate-500 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-sans">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech.id}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                        >
                          <TechIcon techId={tech.id} color={tech.color} size={13} />
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Direct Launch Link & GitHub */}
                  <div
                    className="flex md:flex-col gap-2.5 items-end justify-center min-w-[170px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shadow-md"
                      >
                        <Globe size={14} />
                        <span>Launch</span>
                        <ExternalLink size={12} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-3 py-2 rounded-xl bg-black/60 hover:bg-black text-white border border-white/20 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <GithubIcon size={13} />
                        <span>View Repository</span>
                      </a>
                    )}

                    {!project.liveUrl && !project.githubUrl && (
                      <button
                        onClick={() => onSelectProject(project)}
                        className="w-full px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <span>View Overview</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
