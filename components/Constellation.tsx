'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SUBDOMAIN_PROJECTS, SubdomainProject } from '@/config/projects';
import { ConstellationNode } from './ConstellationNode';
import { motion } from 'framer-motion';

interface ConstellationProps {
  onSelectProject: (project: SubdomainProject) => void;
  activeProjectId?: string | null;
  onActiveProjectChange?: (id: string | null) => void;
}

// Desktop coordinates (Unknown Frequencies in the center)
const DESKTOP_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 19, radius: 76, delay: 0 },
  'patent-flow': { x: 25, y: 39, radius: 80, delay: 1 },
  'career-report': { x: 75, y: 39, radius: 80, delay: 2 },
  'unknown-frequencies': { x: 50, y: 55, radius: 80, delay: 3 },
  'sales-flow': { x: 24, y: 75, radius: 76, delay: 4 },
  'shared-canvas': { x: 76, y: 75, radius: 76, delay: 5 },
};

// Mobile coordinates (Unknown Frequencies in the middle hub)
const MOBILE_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 14, radius: 62, delay: 0 },
  'patent-flow': { x: 30, y: 29, radius: 64, delay: 1 },
  'career-report': { x: 70, y: 44, radius: 66, delay: 2 },
  'unknown-frequencies': { x: 50, y: 59, radius: 66, delay: 3 },
  'sales-flow': { x: 30, y: 74, radius: 62, delay: 4 },
  'shared-canvas': { x: 70, y: 88, radius: 62, delay: 5 },
};

// Constellation network edges connecting all nodes through the center hub
const CONSTELLATION_EDGES = [
  ['makerspace', 'patent-flow'],
  ['makerspace', 'career-report'],
  ['makerspace', 'unknown-frequencies'],
  ['patent-flow', 'unknown-frequencies'],
  ['career-report', 'unknown-frequencies'],
  ['patent-flow', 'sales-flow'],
  ['career-report', 'shared-canvas'],
  ['unknown-frequencies', 'sales-flow'],
  ['unknown-frequencies', 'shared-canvas'],
  ['sales-flow', 'shared-canvas'],
];

export function Constellation({
  onSelectProject,
  activeProjectId: propActiveId,
  onActiveProjectChange,
}: ConstellationProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeProjectId = propActiveId !== undefined ? propActiveId : internalActiveId;

  const setActiveId = useCallback(
    (id: string | null) => {
      setInternalActiveId(id);
      if (onActiveProjectChange) {
        onActiveProjectChange(id);
      }
    },
    [onActiveProjectChange]
  );

  // Centralized hover handler - instantly cancels any pending close timer
  const handleNodeHover = useCallback(
    (id: string) => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setActiveId(id);
    },
    [setActiveId]
  );

  // Centralized leave handler - sets a grace period ONLY for this specific node
  const handleNodeLeave = useCallback(
    (id: string) => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
      leaveTimerRef.current = setTimeout(() => {
        // Only clear if the active node is STILL the node that was left
        if (activeProjectId === id) {
          setActiveId(null);
        }
      }, 120);
    },
    [activeProjectId, setActiveId]
  );

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
    <motion.div
      className="relative w-full h-full max-h-[75vh] flex items-center justify-center overflow-visible select-none"
      onClick={() => setActiveId(null)}
      animate={{
        x: [0, 7, -5, 4, 0],
        y: [0, -6, 6, -4, 0],
        rotate: [0, 0.35, -0.3, 0.15, 0],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Constellation SVG Guide Lines — trimmed so they stop at node circle edges */}
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

          // Calculate trimmed endpoints so lines stop at circle circumferences
          // We need to work in % units converted to a common scale
          // Use a 1000x1000 virtual canvas to compute directions
          const scale = 1000;
          const fx = (from.x / 100) * scale;
          const fy = (from.y / 100) * scale;
          const tx = (to.x / 100) * scale;
          const ty = (to.y / 100) * scale;
          const dx = tx - fx;
          const dy = ty - fy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist === 0) return null;
          const ux = dx / dist;
          const uy = dy / dist;

          // Trim by each node's radius (in % converted to virtual-canvas units)
          // We use a ratio of node radius to viewport width (~1000 wide virtual)
          // Approximate: container is roughly 1000 virtual wide and proportional height
          const fromTrim = (from.radius / 100) * (scale * 0.55);
          const toTrim = (to.radius / 100) * (scale * 0.55);

          const x1 = fx + ux * fromTrim;
          const y1 = fy + uy * fromTrim;
          const x2 = tx - ux * toTrim;
          const y2 = ty - uy * toTrim;

          return (
            <motion.line
              key={`${fromId}-${toId}-${idx}`}
              x1={`${(x1 / scale) * 100}%`}
              y1={`${(y1 / scale) * 100}%`}
              x2={`${(x2 / scale) * 100}%`}
              y2={`${(y2 / scale) * 100}%`}
              stroke={
                isConnectedToActive
                  ? 'rgba(255, 255, 255, 0.65)'
                  : isAnyActive
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.12)'
              }
              strokeWidth={isConnectedToActive ? '1.8' : '1'}
              strokeDasharray={isConnectedToActive ? '4 4' : '3 6'}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isAnyActive && !isConnectedToActive ? 0.15 : 1,
                stroke: isConnectedToActive
                  ? 'rgba(255, 255, 255, 0.65)'
                  : isAnyActive
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(255, 255, 255, 0.12)',
              }}
              transition={{ duration: 0.25 }}
            />
          );
        })}
      </svg>

      {/* Render Constellation Nodes */}
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
            onHover={handleNodeHover}
            onLeave={handleNodeLeave}
          />
        );
      })}
    </motion.div>
  );
}
