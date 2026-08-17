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

// Desktop coordinates
const DESKTOP_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 15, radius: 76, delay: 0 },
  'patent-flow': { x: 22, y: 36, radius: 78, delay: 1 },
  'terminal-emulator': { x: 50, y: 39, radius: 82, delay: 2 },
  'career-report': { x: 78, y: 36, radius: 78, delay: 3 },
  'unknown-frequencies': { x: 50, y: 62, radius: 82, delay: 4 },
  'sales-flow': { x: 22, y: 64, radius: 78, delay: 5 },
  'shared-canvas': { x: 78, y: 64, radius: 78, delay: 6 },
  'quickswitch-ui': { x: 50, y: 86, radius: 76, delay: 7 },
};

// Mobile coordinates
const MOBILE_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 9, radius: 58, delay: 0 },
  'patent-flow': { x: 26, y: 21, radius: 60, delay: 1 },
  'career-report': { x: 74, y: 32, radius: 60, delay: 2 },
  'terminal-emulator': { x: 26, y: 44, radius: 62, delay: 3 },
  'unknown-frequencies': { x: 74, y: 56, radius: 62, delay: 4 },
  'sales-flow': { x: 26, y: 68, radius: 60, delay: 5 },
  'shared-canvas': { x: 74, y: 80, radius: 60, delay: 6 },
  'quickswitch-ui': { x: 50, y: 92, radius: 58, delay: 7 },
};

// Constellation network edges
const CONSTELLATION_EDGES = [
  ['makerspace', 'patent-flow'],
  ['makerspace', 'career-report'],
  ['makerspace', 'terminal-emulator'],
  ['patent-flow', 'terminal-emulator'],
  ['career-report', 'terminal-emulator'],
  ['patent-flow', 'sales-flow'],
  ['career-report', 'shared-canvas'],
  ['terminal-emulator', 'unknown-frequencies'],
  ['patent-flow', 'unknown-frequencies'],
  ['career-report', 'unknown-frequencies'],
  ['sales-flow', 'unknown-frequencies'],
  ['shared-canvas', 'unknown-frequencies'],
  ['sales-flow', 'quickswitch-ui'],
  ['shared-canvas', 'quickswitch-ui'],
  ['unknown-frequencies', 'quickswitch-ui'],
];

/**
 * Compute trimmed SVG percentage endpoints so each line stops exactly at
 * the circle boundary of both nodes it connects.
 *
 * Approach: convert %-based positions → pixels using the measured SVG size
 * (so the non-square aspect ratio is handled correctly), trim the segment in
 * pixel space by each node's pixel radius, then convert back to percentages.
 */
function trimmedLine(
  from: { x: number; y: number; radius: number },
  to: { x: number; y: number; radius: number },
  svgW: number,
  svgH: number
): { x1: string; y1: string; x2: string; y2: string } | null {
  // % → pixels
  const fx = (from.x / 100) * svgW;
  const fy = (from.y / 100) * svgH;
  const tx = (to.x / 100) * svgW;
  const ty = (to.y / 100) * svgH;

  const dx = tx - fx;
  const dy = ty - fy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return null;

  // Unit vector from → to
  const ux = dx / dist;
  const uy = dy / dist;

  // Trim start by from.radius, trim end by to.radius (in real pixels)
  const px1 = fx + ux * from.radius;
  const py1 = fy + uy * from.radius;
  const px2 = tx - ux * to.radius;
  const py2 = ty - uy * to.radius;

  // Safety: if nodes overlap the trimmed segment would flip — skip it
  const trimDist = Math.sqrt((px2 - px1) ** 2 + (py2 - py1) ** 2);
  if (trimDist < 1) return null;

  // pixels → %
  return {
    x1: `${(px1 / svgW) * 100}%`,
    y1: `${(py1 / svgH) * 100}%`,
    x2: `${(px2 / svgW) * 100}%`,
    y2: `${(py2 / svgH) * 100}%`,
  };
}

export function Constellation({
  onSelectProject,
  activeProjectId: propActiveId,
  onActiveProjectChange,
}: ConstellationProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [svgSize, setSvgSize] = useState<{ w: number; h: number } | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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

  // Centralized hover handler — cancels any pending close timer immediately
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

  // Centralized leave handler — grace period so rapid moves don't flicker
  const handleNodeLeave = useCallback(
    (id: string) => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
      leaveTimerRef.current = setTimeout(() => {
        if (activeProjectId === id) {
          setActiveId(null);
        }
      }, 120);
    },
    [activeProjectId, setActiveId]
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Measure the SVG element in real pixels so line trimming is accurate
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    // Seed immediately from bounding rect
    const seed = el.getBoundingClientRect();
    if (seed.width > 0) setSvgSize({ w: seed.width, h: seed.height });

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) setSvgSize({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
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
      {/* Constellation SVG Guide Lines — trimmed to circle edges via pixel-space math */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {CONSTELLATION_EDGES.map(([fromId, toId], idx) => {
          const from = coordinatesMap[fromId];
          const to = coordinatesMap[toId];
          if (!from || !to) return null;

          const isConnectedToActive =
            activeProjectId === fromId || activeProjectId === toId;

          // Use trimmed endpoints once SVG size is measured; fall back to centers
          const coords = svgSize
            ? trimmedLine(from, to, svgSize.w, svgSize.h)
            : { x1: `${from.x}%`, y1: `${from.y}%`, x2: `${to.x}%`, y2: `${to.y}%` };

          if (!coords) return null;

          return (
            <motion.line
              key={`${fromId}-${toId}-${idx}`}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
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
