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

interface SwayProfile {
  x: number[];
  y: number[];
  rotate: number[];
  duration: number;
}

// Individual organic micro-sway profiles for each node to break lockstep uniformity
const NODE_SWAY_PROFILES: Record<string, SwayProfile> = {
  'makerspace': {
    x: [0, -2.8, 3.2, -1.6, 0],
    y: [0, 3.6, -2.6, 1.4, 0],
    rotate: [0, -0.7, 0.5, -0.3, 0],
    duration: 7.2,
  },
  'patent-flow': {
    x: [0, 3.4, -2.2, 1.8, 0],
    y: [0, -3.2, 3.4, -1.2, 0],
    rotate: [0, 0.8, -0.6, 0.4, 0],
    duration: 8.4,
  },
  'terminal-emulator': {
    x: [0, -3.2, 2.0, -2.4, 0],
    y: [0, -2.4, 3.0, -1.8, 0],
    rotate: [0, -0.5, 0.7, -0.4, 0],
    duration: 6.3,
  },
  'career-report': {
    x: [0, -2.6, 3.6, -1.8, 0],
    y: [0, 3.0, -3.2, 2.2, 0],
    rotate: [0, 0.7, -0.8, 0.3, 0],
    duration: 7.8,
  },
  'unknown-frequencies': {
    x: [0, 3.6, -3.0, 2.2, 0],
    y: [0, 2.6, -3.6, 1.8, 0],
    rotate: [0, -0.8, 0.6, -0.3, 0],
    duration: 9.1,
  },
  'sales-flow': {
    x: [0, -3.4, 2.6, -1.6, 0],
    y: [0, 3.2, -2.8, 2.0, 0],
    rotate: [0, 0.6, -0.7, 0.5, 0],
    duration: 6.8,
  },
  'shared-canvas': {
    x: [0, 2.8, -3.6, 2.0, 0],
    y: [0, -3.4, 2.6, -1.6, 0],
    rotate: [0, -0.9, 0.6, -0.4, 0],
    duration: 7.5,
  },
  'quickswitch-ui': {
    x: [0, -3.0, 3.4, -2.0, 0],
    y: [0, -2.6, 3.2, -1.6, 0],
    rotate: [0, 0.5, -0.5, 0.7, 0],
    duration: 8.2,
  },
};

function getNodeSwayProfile(id: string, floatDelay: number): SwayProfile {
  if (NODE_SWAY_PROFILES[id]) {
    return NODE_SWAY_PROFILES[id];
  }
  const seed = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), floatDelay * 17);
  const dur = 6.0 + (seed % 35) / 10;
  const xDir = seed % 2 === 0 ? 1 : -1;
  const yDir = (seed >> 1) % 2 === 0 ? 1 : -1;
  return {
    x: [0, 3.0 * xDir, -2.5 * xDir, 1.8 * xDir, 0],
    y: [0, -3.0 * yDir, 2.8 * yDir, -1.5 * yDir, 0],
    rotate: [0, 0.6 * xDir, -0.5 * yDir, 0.3 * xDir, 0],
    duration: dur,
  };
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
  const isMobile = radius <= 60;
  const swayScale = isMobile ? 0.55 : 1.0;
  const sway = getNodeSwayProfile(project.id, floatDelay);

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
      {/* Secondary Individual Sway Layer — asynchronous organic micro-drift */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={{
          x: sway.x.map((v) => v * swayScale),
          y: sway.y.map((v) => v * swayScale),
          rotate: sway.rotate.map((v) => v * swayScale),
        }}
        transition={{
          duration: sway.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay * 0.35,
        }}
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
          style={{ transition: 'filter 0.3s ease-out' }}
          className={`relative w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer select-none outline-none focus:outline-none focus:ring-0 ring-0 border-0 ${
            isActive ? 'glow-circle-active' : ''
          }`}
        >
          {/* Organic Hand-Drawn Wobbly SVG Ring */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none cosmic-wobble"
          >
            {/* Background fill — animates in/out smoothly on hover */}
            <motion.circle
              cx="100"
              cy="100"
              r="92"
              fill="rgba(10, 12, 24, 0.85)"
              initial={false}
              animate={{ fillOpacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-1.5 sm:px-3 max-w-[90%] pointer-events-none">
            {/* Subdomain Pill */}
            <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1.5 px-1.5 sm:px-2.5 py-[1px] sm:py-0.5 rounded-full bg-white/5 sm:bg-white/10 border border-white/10 sm:border-white/20 shrink-0">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[8px] sm:text-[10.5px] font-medium tracking-wider text-slate-300 whitespace-nowrap">
                {(project.subdomain || project.id).split('.')[0]}.
              </span>
            </div>

            {/* Project Title */}
            <h3
              className={`font-sans font-bold text-[10.5px] sm:text-xs md:text-sm leading-[1.18] tracking-wide text-white transition-all duration-200 line-clamp-2 ${
                isActive ? 'glow-text text-white' : 'text-slate-100'
              }`}
            >
              {project.name}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);
}
