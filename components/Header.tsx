'use client';

import React, { useState } from 'react';
import { SUBDOMAIN_PROJECTS } from '@/config/projects';
import { GithubIcon } from './Icons';
import {
  Sparkles,
  LayoutGrid,
  Orbit,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'constellation' | 'list';
  onToggleView: (mode: 'constellation' | 'list') => void;
}

export function Header({ viewMode, onToggleView }: HeaderProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Toggle ambient harmonic cosmic drone using Web Audio API
  const handleToggleAudio = () => {
    if (!isAudioActive) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Gentle cosmic root oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(108, ctx.currentTime); // Deep A2

        // Soft lowpass filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        // Soft volume envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        setAudioCtx(ctx);
        setIsAudioActive(true);
      } catch {
        // audio context init failed
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsAudioActive(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 flex items-center justify-between pointer-events-none">
      {/* Brand Identity / Root Domain Hub */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/15">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <span className="font-mono font-bold tracking-wider text-sm text-white">
            azterisk.net
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
            {SUBDOMAIN_PROJECTS.length} nodes
          </span>
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

        {/* Ambient Cosmic Sound Generator */}
        <button
          onClick={handleToggleAudio}
          className={`p-2 rounded-full backdrop-blur-md border border-white/15 transition-all cursor-pointer ${
            isAudioActive
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
          title={isAudioActive ? 'Mute Cosmic Drone' : 'Enable Cosmic Ambience'}
        >
          {isAudioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com/Azteriisk"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-slate-400 hover:text-white transition-all"
          title="GitHub Profile"
        >
          <GithubIcon size={15} />
        </a>
      </div>
    </header>
  );
}
