'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubdomainProject } from '@/config/projects';
import { SatelliteOrbit } from './SatelliteOrbit';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ConstellationNodeProps {
  project: SubdomainProject;
  x: number; // percentage X
  y: number; // percentage Y
  radius?: number;
  floatDelay?: number;
  onSelect: (project: SubdomainProject) => void;
  isActive: boolean;
  isDimmed?: boolean;
  onToggleActive: (id: string) => void;
}

export function ConstellationNode({
  project,
  x,
  y,
  radius = 80,
  floatDelay = 0,
  onSelect,
  isActive,
  isDimmed = false,
  onToggleActive,
}: ConstellationNodeProps) {
  const diameter = radius * 2;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(project);
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isActive) {
      onToggleActive(project.id);
    } else {
      onSelect(project);
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 40 : 10,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: isDimmed ? 0.92 : isActive ? 1.05 : 1,
        filter: isDimmed ? 'blur(1.5px)' : 'none',
      }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.3 },
      }}
      onMouseEnter={() => onToggleActive(project.id)}
      onMouseLeave={() => onToggleActive('')}
    >
      <div className="relative flex items-center justify-center">
        {/* Satellites Orbit */}
        <SatelliteOrbit
          technologies={project.technologies}
          isExpanded={isActive}
          parentRadius={radius}
        />

        {/* Outer Cosmic Aura - only visible on active */}
        {isActive && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1.35 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              width: diameter,
              height: diameter,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(120,180,255,0.12) 50%, rgba(0,0,0,0) 70%)',
            }}
          />
        )}

        {/* Hand-drawn Organic Circle Node centered on intersection */}
        <motion.div
          layoutId={`project-node-card-${project.id}`}
          onClick={handleClick}
          onTouchEnd={handleTouch}
          className={`relative rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 select-none outline-none focus:outline-none focus:ring-0 ring-0 border-0 ${
            isActive ? 'glow-circle-active' : ''
          }`}
          style={{
            width: diameter,
            height: diameter,
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Organic Hand-Drawn Wobbly SVG Ring */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none cosmic-wobble"
          >
            {/* Background fill - 100% transparent when idle so fog flows through */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill={isActive ? 'rgba(10, 12, 24, 0.7)' : 'transparent'}
            />

            {/* Permanent Subtle Grey Outer Circle */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth="1.5"
            />

            {/* Permanent Subtle Grey Inner Circle */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="rgba(148, 163, 184, 0.18)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />

            {/* Bright White Outer Circle - ONLY appears on hover or click */}
            <motion.circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              initial={false}
              animate={{
                pathLength: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />

            {/* Secondary Bright White Inner Ring on hover/click */}
            <motion.circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="5 4"
              initial={false}
              animate={{
                opacity: isActive ? 0.8 : 0,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </svg>

          {/* Node Interior Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4">
            {/* Subdomain Pill */}
            <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-slate-300">
                {project.subdomain.split('.')[0]}.
              </span>
            </div>

            {/* Project Title */}
            <h3
              className={`font-sans font-bold text-xs sm:text-sm md:text-base leading-tight tracking-wide text-white transition-all duration-300 ${
                isActive ? 'glow-text scale-105' : ''
              }`}
            >
              {project.name}
            </h3>

            {/* Hint text on active */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? 'auto' : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-1"
            >
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-300 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                <Sparkles size={9} /> Tap Showcase <ArrowRight size={9} />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
