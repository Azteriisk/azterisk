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
  onToggleActive: (id: string) => void;
}

export function ConstellationNode({
  project,
  x,
  y,
  radius = 90,
  floatDelay = 0,
  onSelect,
  isActive,
  onToggleActive,
}: ConstellationNodeProps) {
  const diameter = radius * 2;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // On desktop, clicking opens showcase directly
    onSelect(project);
  };

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    // On touch devices: first tap activates satellite orbit, second tap opens showcase
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
        opacity: 1,
        scale: 1,
        // Idle gentle float harmonic physics when not active
        y: isActive ? 0 : [0, -6, 0, 6, 0],
        x: isActive ? 0 : [0, 5, 0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay: floatDelay * 0.1 },
        scale: { duration: 0.8, delay: floatDelay * 0.1 },
        y: {
          repeat: Infinity,
          duration: 7 + floatDelay * 1.5,
          ease: 'easeInOut',
        },
        x: {
          repeat: Infinity,
          duration: 9 + floatDelay * 1.2,
          ease: 'easeInOut',
        },
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

        {/* Outer Cosmic Aura */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{
            width: isActive ? diameter * 1.35 : diameter * 1.08,
            height: isActive ? diameter * 1.35 : diameter * 1.08,
            opacity: isActive ? 0.35 : 0.08,
          }}
          transition={{ duration: 0.35 }}
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(120,180,255,0.12) 50%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* Hand-drawn Organic Circle Node */}
        <motion.div
          layoutId={`project-node-card-${project.id}`}
          onClick={handleClick}
          onTouchEnd={handleTouch}
          className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 select-none ${
            isActive ? 'glow-circle-active' : 'glow-circle'
          }`}
          style={{
            width: diameter,
            height: diameter,
          }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Organic Hand-Drawn Wobbly SVG Ring */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none cosmic-wobble"
          >
            {/* Background fill */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill={isActive ? 'rgba(14, 16, 32, 0.96)' : 'rgba(6, 6, 14, 0.88)'}
            />

            {/* Hand-drawn Outer Stroke */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="#ffffff"
              strokeWidth={isActive ? '2.5' : '1.8'}
              strokeDasharray={isActive ? 'none' : '400'}
              strokeOpacity={isActive ? 1 : 0.8}
            />

            {/* Secondary Inner Organic Orbit Ring */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
            />
          </svg>

          {/* Node Interior Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4">
            {/* Subdomain Pill */}
            <div className="flex items-center gap-1 mb-1 sm:mb-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm max-w-[90%] overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-slate-300 truncate">
                {project.subdomain}
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
