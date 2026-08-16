'use client';

import React, { useState } from 'react';
import { SubdomainProject } from '@/config/projects';
import { Constellation } from '@/components/Constellation';
import { ProjectModal } from '@/components/ProjectModal';
import { ProjectListView } from '@/components/ProjectListView';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<SubdomainProject | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'constellation' | 'list'>('constellation');

  const isFocused = activeProjectId !== null && activeProjectId !== '';

  return (
    <main className="relative h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/* Fixed Cosmic Header - Dims smoothly when any node is hovered */}
      <motion.div
        animate={{
          opacity: isFocused ? 0.15 : 1,
          filter: isFocused ? 'blur(1.5px)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="relative z-30 pointer-events-auto"
      >
        <Header viewMode={viewMode} onToggleView={setViewMode} />
      </motion.div>

      {/* Hero Title & Subtitle - Dims smoothly when any node is hovered */}
      <motion.div
        animate={{
          opacity: isFocused ? 0.12 : 1,
          filter: isFocused ? 'blur(2px)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 pt-12 pb-0 px-4 text-center pointer-events-none flex flex-col items-center shrink-0"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-1"
        >
          <Sparkles size={11} className="text-white animate-spin-slow" />
          <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase">
            Orbital System Launcher
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl md:text-4xl font-black tracking-tight text-white glow-text uppercase"
        >
          azterisk.net
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-[11px] md:text-xs text-slate-400 max-w-md mt-0.5 font-mono"
        >
          Interactive constellation of live production subdomains & architectures
        </motion.p>
      </motion.div>

      {/* Main Interactive Stage Area (Overflow visible so satellites & glow never get cut off) */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-2 sm:px-4 overflow-visible">
        <AnimatePresence mode="wait">
          {viewMode === 'constellation' ? (
            <motion.div
              key="constellation"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Constellation
                onSelectProject={setSelectedProject}
                activeProjectId={activeProjectId}
                onActiveProjectChange={setActiveProjectId}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full overflow-y-auto"
            >
              <ProjectListView onSelectProject={setSelectedProject} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full-Screen Project Showcase Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Cosmic Bottom Navigation & Hint Bar - Dims smoothly when any node is hovered */}
      <motion.footer
        animate={{
          opacity: isFocused ? 0.15 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative z-20 py-2.5 px-6 flex items-center justify-between pointer-events-none text-[10px] font-mono text-slate-500 border-t border-white/5 bg-black/40 backdrop-blur-md shrink-0"
      >
        <div className="flex items-center gap-2 pointer-events-auto">
          <Terminal size={11} className="text-slate-400" />
          <span className="hidden sm:inline">ROOT DOMAIN:</span>
          <span className="text-slate-300">azterisk.net</span>
        </div>

        <div className="flex items-center gap-4 text-center">
          <span className="hidden md:inline text-slate-400">
            Hover node to orbit tech satellites • Click to expand full showcase
          </span>
          <span className="md:hidden text-slate-400">
            Tap node to view tech & showcase
          </span>
        </div>

        <div className="pointer-events-auto">
          <a
            href="https://github.com/Azteriisk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            © {new Date().getFullYear()} Azteriisk
          </a>
        </div>
      </motion.footer>
    </main>
  );
}
