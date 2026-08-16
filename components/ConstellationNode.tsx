'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubdomainProject } from '@/config/projects';
import { SatelliteOrbit } from './SatelliteOrbit';

interface ConstellationNodeProps {
  project: SubdomainProject;
  x: number; // percentage X
  y: number; // percentage Y
  radius?: number;
  floatDelay?: number;
  onSelect: (project: SubdomainProject) => void;
  isActive: boolean;
  isDimmed?: boolean;
  onHover: (id: string) => void;
  onLeave: (id: string) => void;
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
  onHover,
  onLeave,
}: ConstellationNodeProps) {
  const diameter = radius * 2;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(project);
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!isActive) {
      onHover(project.id);
    } else {
      onSelect(project);
    }
  };

  return (
    <div
      className="absolute flex items-center justify-center pointer-events-auto select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        marginLeft: -radius,
        marginTop: -radius,
        width: diameter,
        height: diameter,
        zIndex: isActive ? 40 : 10,
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onLeave(project.id)}
    >
      {/* Node Container with fixed constant size and zero morphing */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isDimmed ? 0.2 : 1,
          filter: isDimmed ? 'blur(1.5px)' : 'none',
        }}
        transition={{
          opacity: { duration: 0.2 },
          filter: { duration: 0.2 },
        }}
      >
        {/* Satellites Orbit */}
        <SatelliteOrbit
          technologies={project.technologies}
          isExpanded={isActive}
          parentRadius={radius}
          onHover={() => onHover(project.id)}
          onLeave={() => onLeave(project.id)}
        />

        {/* Outer Cosmic Aura - only visible on active */}
        {isActive && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: diameter * 1.35,
              height: diameter * 1.35,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(120,180,255,0.12) 50%, rgba(0,0,0,0) 70%)',
            }}
          />
        )}

        {/* Hand-drawn Organic Circle Node with steady constant size */}
        <div
          onClick={handleClick}
          onTouchEnd={handleTouch}
          className={`relative w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer select-none outline-none focus:outline-none focus:ring-0 ring-0 border-0 ${
            isActive ? 'glow-circle-active' : ''
          }`}
        >
          {/* Organic Hand-Drawn Wobbly SVG Ring */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none cosmic-wobble"
          >
            {/* Background fill - transparent when idle */}
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
              transition={{ duration: 0.2, ease: 'easeOut' }}
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
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </svg>

          {/* Node Interior Content (pointer-events-none ensures unified cursor hit) */}
          <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4 pointer-events-none">
            {/* Subdomain Pill */}
            <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-slate-300">
                {project.subdomain.split('.')[0]}.
              </span>
            </div>

            {/* Project Title */}
            <h3
              className={`font-sans font-bold text-xs sm:text-sm md:text-base leading-tight tracking-wide text-white transition-all duration-200 ${
                isActive ? 'glow-text text-white' : 'text-slate-100'
              }`}
            >
              {project.name}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
