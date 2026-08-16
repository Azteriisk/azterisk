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
  // Position satellites tightly and cleanly just outside the parent circle
  const orbitDistance = parentRadius + 38;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {technologies.map((tech, index) => {
        // Distribute satellites evenly along the perimeter
        const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;
        const x = Math.cos(angle) * orbitDistance;
        const y = Math.sin(angle) * orbitDistance;
        const startX = Math.cos(angle) * (parentRadius - 2);
        const startY = Math.sin(angle) * (parentRadius - 2);

        return (
          <React.Fragment key={tech.id}>
            {/* Connecting Glowing Ray Line from node edge to satellite center */}
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
                x1={startX}
                y1={startY}
                x2={x}
                y2={y}
                stroke={tech.color || '#ffffff'}
                strokeWidth="1.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.03 }}
              />
            </svg>

            {/* Satellite Tech Bubble */}
            <motion.div
              initial={{ scale: 0, x: startX, y: startY, opacity: 0 }}
              animate={{
                scale: 1,
                x,
                y,
                opacity: 1,
              }}
              exit={{ scale: 0, x: startX, y: startY, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 24,
                delay: index * 0.03,
              }}
              className="absolute pointer-events-auto group z-30"
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
                className="w-10 h-10 rounded-full flex items-center justify-center relative cursor-pointer cosmic-wobble-subtle transition-all duration-200 transform group-hover:scale-125"
                style={{
                  background: 'rgba(10, 10, 22, 0.95)',
                  border: `1.5px solid ${tech.color || '#ffffff'}`,
                  boxShadow: `0 0 14px ${tech.color ? `${tech.color}66` : 'rgba(255,255,255,0.3)'}`,
                }}
              >
                <TechIcon techId={tech.id} size={18} />
              </div>

              {/* Floating Tooltip */}
              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-40 whitespace-nowrap">
                <div
                  className="px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-xl border"
                  style={{
                    background: 'rgba(5, 5, 12, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    color: '#ffffff',
                  }}
                >
                  <span className="font-semibold">{tech.name}</span>
                  <span className="text-[8px] uppercase px-1 rounded bg-white/10 text-slate-300">
                    {tech.category}
                  </span>
                  <ExternalLink size={9} className="text-slate-400" />
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
