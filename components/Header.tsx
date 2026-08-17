'use client';

import React from 'react';
import { SUBDOMAIN_PROJECTS } from '@/config/projects';
import { TechIcon } from './TechIcon';
import { GithubIcon } from './Icons';
import {
  Sparkles,
  LayoutGrid,
  Orbit,
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'constellation' | 'list';
  onToggleView: (mode: 'constellation' | 'list') => void;
}

// Technologies powering azterisk.net
const PORTAL_TECHNOLOGIES = [
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'Framework',
    websiteUrl: 'https://nextjs.org',
    color: '#ffffff',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    websiteUrl: 'https://www.typescriptlang.org',
    color: '#38bdf8',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Styling',
    websiteUrl: 'https://tailwindcss.com',
    color: '#06b6d4',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Animations',
    websiteUrl: 'https://www.framer.com/motion',
    color: '#f43f5e',
  },
  {
    id: 'webaudio',
    name: 'Web Audio API',
    category: 'Harmonic Synth',
    websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API',
    color: '#a855f7',
  },
  {
    id: 'vercel',
    name: 'Vercel Edge',
    category: 'Cloud Hosting',
    websiteUrl: 'https://vercel.com',
    color: '#ffffff',
  },
];

export function Header({ viewMode, onToggleView }: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none">
      {/* Brand Identity & Tech Stack Hover Card */}
      <div className="relative group/portal pointer-events-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15 cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all">
          <div className="relative flex items-center justify-center">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <span className="font-mono font-bold tracking-wider text-xs sm:text-sm text-white">
            azterisk.net
          </span>
          <span className="hidden sm:inline-flex text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
            {SUBDOMAIN_PROJECTS.length} nodes
          </span>
        </div>

        {/* Hover Popover: Webpage Architecture & Tech Stack */}
        <div className="absolute left-0 top-full pt-2 opacity-0 -translate-y-2 pointer-events-none group-hover/portal:opacity-100 group-hover/portal:translate-y-0 group-hover/portal:pointer-events-auto transition-all duration-200 z-50 w-80">
          <div className="p-4 rounded-xl border border-white/15 bg-[#060713]/95 backdrop-blur-xl shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  Portal Architecture
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                ● Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PORTAL_TECHNOLOGIES.map((tech) => (
                <a
                  key={tech.id}
                  href={tech.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/item"
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                    style={{ color: tech.color }}
                  >
                    <TechIcon techId={tech.id} color={tech.color} size={15} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-medium text-white truncate group-hover/item:text-emerald-300 transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-[8px] font-mono uppercase text-slate-400 truncate">
                      {tech.category}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* View Mode Toggle: Constellation vs List */}
        <div className="flex items-center p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/15">
          <button
            onClick={() => onToggleView('constellation')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'constellation'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Constellation Void Mode"
          >
            <Orbit size={13} />
            <span className="hidden sm:inline">Constellation</span>
          </button>
          <button
            onClick={() => onToggleView('list')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="List Directory Mode"
          >
            <LayoutGrid size={13} />
            <span className="hidden sm:inline">Directory</span>
          </button>
        </div>

        {/* GitHub Source Link */}
        <a
          href="https://github.com/Azteriisk"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 border border-white/15 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center"
          title="GitHub Portfolio"
        >
          <GithubIcon size={16} />
        </a>
      </div>
    </header>
  );
}
