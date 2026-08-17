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
  onHover?: () => void;
  onLeave?: () => void;
}

export function SatelliteOrbit({
  technologies,
  isExpanded,
  parentRadius,
  onHover,
  onLeave,
}: SatelliteOrbitProps) {
  if (!isExpanded) return null;

  const count = technologies.length;
  const isMobile = parentRadius <= 60;

  // Responsive satellite bubble and orbit distances
  const bubbleRadius = isMobile ? 13 : 17;
  const orbitDistance = isMobile ? parentRadius + 22 : parentRadius + 36;
  const iconSize = isMobile ? 13 : 17;
  const hitAreaRadius = isMobile ? 18 : bubbleRadius; // 36px touch target on mobile

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {technologies.map((tech, index) => {
        // Distribute satellites evenly around the circle
        const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;

        // Bubble center position relative to node center
        const x = Math.cos(angle) * orbitDistance;
        const y = Math.sin(angle) * orbitDistance;

        // Line start (touches parent node circle boundary)
        const startX = Math.cos(angle) * (parentRadius - 1);
        const startY = Math.sin(angle) * (parentRadius - 1);

        const techColor = tech.color || '#ffffff';

        return (
          <React.Fragment key={tech.id}>
            {/* Connecting Glowing Ray Line extending from main circle to satellite center */}
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
                stroke={techColor}
                strokeWidth={isMobile ? '1.5' : '2'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.95 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: index * 0.02 }}
              />
            </svg>

            {/* Satellite Tech Bubble Badge centered precisely at (x, y) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 24,
                delay: index * 0.02,
              }}
              className="absolute pointer-events-auto group z-40 flex items-center justify-center cursor-pointer"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: x - hitAreaRadius,
                marginTop: y - hitAreaRadius,
                width: hitAreaRadius * 2,
                height: hitAreaRadius * 2,
                filter: 'none',
              }}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
              onClick={(e) => {
                e.stopPropagation();
                window.open(tech.websiteUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              {/* Solid opaque circular badge matching tech brand color */}
              <div
                className="rounded-full flex items-center justify-center relative cosmic-wobble-subtle transition-all duration-200 transform group-hover:scale-125 shadow-xl"
                style={{
                  width: bubbleRadius * 2,
                  height: bubbleRadius * 2,
                  backgroundColor: '#050510',
                  border: `${isMobile ? '1.5px' : '2px'} solid ${techColor}`,
                  boxShadow: `0 0 14px ${techColor}66`,
                }}
              >
                <TechIcon techId={tech.id} color={techColor} size={iconSize} />
              </div>

              {/* Floating Tooltip */}
              <div
                className={`absolute left-1/2 ${
                  y > 0 ? '-bottom-7' : '-top-7'
                } -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 whitespace-nowrap`}
                style={{ filter: 'none' }}
              >
                <div
                  className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono flex items-center gap-1 shadow-2xl border"
                  style={{
                    backgroundColor: '#0a0a18',
                    borderColor: `${techColor}88`,
                    color: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.85)',
                  }}
                >
                  <span className="font-semibold" style={{ color: techColor }}>
                    {tech.name}
                  </span>
                  <ExternalLink size={8} className="text-slate-300" />
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
