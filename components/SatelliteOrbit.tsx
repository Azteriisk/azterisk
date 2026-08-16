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

  const count = technologies.length;
  // Radius of the satellite bubble itself
  const bubbleRadius = 17; // 34px diameter
  // Distance from parent circle center to satellite bubble center
  const orbitDistance = parentRadius + 26;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {technologies.map((tech, index) => {
        // Distribute satellites evenly around the circle
        const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;

        // Bubble center position
        const x = Math.cos(angle) * orbitDistance;
        const y = Math.sin(angle) * orbitDistance;

        // Line start (touches parent node circle edge)
        const startX = Math.cos(angle) * parentRadius;
        const startY = Math.sin(angle) * parentRadius;

        // Line end (terminates exactly at the outer edge of the satellite bubble)
        const endX = Math.cos(angle) * (orbitDistance - bubbleRadius + 1);
        const endY = Math.sin(angle) * (orbitDistance - bubbleRadius + 1);

        const techColor = tech.color || '#ffffff';

        return (
          <React.Fragment key={tech.id}>
            {/* Connecting Glowing Ray Line from node edge directly to bubble boundary */}
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
                x2={endX}
                y2={endY}
                stroke={techColor}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.02 }}
              />
            </svg>

            {/* Satellite Tech Bubble attached at end of line */}
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
                stiffness: 400,
                damping: 25,
                delay: index * 0.02,
              }}
              className="absolute pointer-events-auto group z-30"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: bubbleRadius * 2,
                height: bubbleRadius * 2,
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(tech.websiteUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              {/* Solid opaque circular badge matching tech color */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center relative cursor-pointer cosmic-wobble-subtle transition-all duration-200 transform group-hover:scale-125"
                style={{
                  backgroundColor: '#05050d',
                  border: `2px solid ${techColor}`,
                  boxShadow: `0 0 14px ${techColor}55`,
                }}
              >
                <TechIcon techId={tech.id} color={techColor} size={17} />
              </div>

              {/* Floating Tooltip */}
              <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-40 whitespace-nowrap">
                <div
                  className="px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1.5 backdrop-blur-md shadow-xl border"
                  style={{
                    backgroundColor: 'rgba(5, 5, 12, 0.95)',
                    borderColor: `${techColor}55`,
                    color: '#ffffff',
                  }}
                >
                  <span className="font-semibold" style={{ color: techColor }}>
                    {tech.name}
                  </span>
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
