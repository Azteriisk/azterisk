'use client';

import React, { useState, useEffect } from 'react';
import { SUBDOMAIN_PROJECTS, SubdomainProject } from '@/config/projects';
import { ConstellationNode } from './ConstellationNode';
import { motion, AnimatePresence } from 'framer-motion';

interface ConstellationProps {
  onSelectProject: (project: SubdomainProject) => void;
}

// Desktop coordinates (galaxy cluster layout comfortably within viewport bounds)
const DESKTOP_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 15, radius: 76, delay: 0 },
  'unknown-frequencies': { x: 25, y: 36, radius: 80, delay: 1 },
  'career-report': { x: 75, y: 36, radius: 80, delay: 2 },
  'patent-flow': { x: 50, y: 53, radius: 80, delay: 3 },
  'sales-flow': { x: 24, y: 74, radius: 76, delay: 4 },
  'shared-canvas': { x: 76, y: 74, radius: 76, delay: 5 },
};

// Mobile coordinates (vertical organic double-helix layout)
const MOBILE_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 12, radius: 62, delay: 0 },
  'unknown-frequencies': { x: 30, y: 27, radius: 66, delay: 1 },
  'career-report': { x: 70, y: 42, radius: 66, delay: 2 },
  'patent-flow': { x: 30, y: 57, radius: 64, delay: 3 },
  'sales-flow': { x: 70, y: 72, radius: 62, delay: 4 },
  'shared-canvas': { x: 50, y: 87, radius: 62, delay: 5 },
};

// Complete constellation network edges ensuring all nodes are vertices/intersections
const CONSTELLATION_EDGES = [
  ['makerspace', 'unknown-frequencies'],
  ['makerspace', 'career-report'],
  ['makerspace', 'patent-flow'],
  ['unknown-frequencies', 'patent-flow'],
  ['career-report', 'patent-flow'],
  ['unknown-frequencies', 'sales-flow'],
  ['career-report', 'shared-canvas'],
  ['patent-flow', 'sales-flow'],
  ['patent-flow', 'shared-canvas'],
  ['sales-flow', 'shared-canvas'],
];

export function Constellation({ onSelectProject }: ConstellationProps) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const coordinatesMap = isMobile ? MOBILE_COORDINATES : DESKTOP_COORDINATES;
  const isAnyActive = activeProjectId !== null && activeProjectId !== '';

  return (
    <div
      className="relative w-full h-full max-h-[75vh] flex items-center justify-center overflow-visible select-none"
      onClick={() => setActiveProjectId(null)}
    >
      {/* Dynamic Backdrop Dimmer when any node is hovered or expanding */}
      <AnimatePresence>
        {isAnyActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -inset-40 bg-black/60 pointer-events-none z-0 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Constellation SVG Guide Lines intersecting at node centers */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {CONSTELLATION_EDGES.map(([fromId, toId], idx) => {
          const from = coordinatesMap[fromId];
          const to = coordinatesMap[toId];
          if (!from || !to) return null;

          const isConnectedToActive =
            activeProjectId === fromId || activeProjectId === toId;

          return (
            <motion.line
              key={`${fromId}-${toId}-${idx}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={
                isConnectedToActive
                  ? 'rgba(255, 255, 255, 0.75)'
                  : isAnyActive
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.12)'
              }
              strokeWidth={isConnectedToActive ? '2' : '1'}
              strokeDasharray={isConnectedToActive ? 'none' : '3 6'}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isAnyActive && !isConnectedToActive ? 0.15 : 1,
                stroke: isConnectedToActive
                  ? 'rgba(255, 255, 255, 0.75)'
                  : isAnyActive
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.12)',
              }}
              transition={{ duration: 0.25 }}
            />
          );
        })}
      </svg>

      {/* Render Constellation Nodes directly on intersections */}
      {SUBDOMAIN_PROJECTS.map((project) => {
        const coords = coordinatesMap[project.id] || {
          x: 50,
          y: 50,
          radius: isMobile ? 62 : 78,
          delay: 0,
        };

        const isActive = activeProjectId === project.id;
        const isDimmed = isAnyActive && !isActive;

        return (
          <ConstellationNode
            key={project.id}
            project={project}
            x={coords.x}
            y={coords.y}
            radius={coords.radius}
            floatDelay={coords.delay}
            onSelect={onSelectProject}
            isActive={isActive}
            isDimmed={isDimmed}
            onToggleActive={(id) => setActiveProjectId(id || null)}
          />
        );
      })}
    </div>
  );
}
