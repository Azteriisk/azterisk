'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Technology } from '@/config/projects';
import { TechIcon } from './TechIcon';
import { ExternalLink } from 'lucide-react';

interface SatelliteOrbitProps {
  technologies: Technology[];
  isExpanded: boolean;
  parentRadius: number;
}

export function SatelliteOrbit({
  technologies,
  isExpanded,
  parentRadius,
}: SatelliteOrbitProps) {
  if (!isExpanded) return null;

  // Calculate orbital satellite positions around circle
  const count = technologies.length;
  // Distance from center of parent node
  const orbitDistance = parentRadius + 75;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {technologies.map((tech, index) => {
        // Distribute satellites evenly along the perimeter
        // Start angle offset to make it dynamic
        const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;
        const x = Math.cos(angle) * orbitDistance;
        const y = Math.sin(angle) * orbitDistance;

        return (
          <React.Fragment key={tech.id}>
            {/* Connecting Glowing Ray Line */}
            <svg
              className="absolute pointer-events-none overflow-visible"
              style={{
                width: 1,
                height: 1,
                left: '50%',
                top: '50%',
              }}
            >
              <motion.line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke={tech.color || 'rgba(255, 255, 255, 0.4)'}
                strokeWidth="1.5"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.04 }}
              />
            </svg>

            {/* Satellite Tech Bubble */}
            <motion.div
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: 1,
                x,
                y,
                opacity: 1,
              }}
              exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                delay: index * 0.04,
              }}
              className="absolute pointer-events-auto group z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(tech.websiteUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              {/* Organic hand-drawn satellite border */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center relative cursor-pointer cosmic-wobble-subtle transition-all duration-300 transform group-hover:scale-125"
                style={{
                  background: 'rgba(10, 10, 20, 0.92)',
                  border: `1.5px solid ${tech.color || 'rgba(255, 255, 255, 0.6)'}`,
                  boxShadow: `0 0 16px ${tech.color ? `${tech.color}55` : 'rgba(255,255,255,0.25)'}`,
                }}
              >
                <TechIcon techId={tech.id} size={20} />
              </div>

              {/* Floating Tooltip */}
              <div className="absolute left-1/2 -bottom-9 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap">
                <div
                  className="px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-xl border"
                  style={{
                    background: 'rgba(5, 5, 12, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                  }}
                >
                  <span className="font-semibold">{tech.name}</span>
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-white/10 text-slate-300">
                    {tech.category}
                  </span>
                  <ExternalLink size={10} className="text-slate-400" />
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
