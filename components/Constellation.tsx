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

// Desktop coordinates (organic celestial hierarchy with distinct planetary sizing)
const DESKTOP_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 11, radius: 78, delay: 0 },
  'patent-flow': { x: 19, y: 34, radius: 76, delay: 1 },
  'terminal-emulator': { x: 50, y: 34, radius: 84, delay: 2 },
  'career-report': { x: 81, y: 34, radius: 72, delay: 3 },
  'unknown-frequencies': { x: 50, y: 66, radius: 88, delay: 4 },
  'sales-flow': { x: 19, y: 66, radius: 74, delay: 5 },
  'shared-canvas': { x: 81, y: 66, radius: 68, delay: 6 },
  'quickswitch-ui': { x: 50, y: 89, radius: 70, delay: 7 },
};

// Mobile coordinates (dynamic organic star sizing for compact 1-2-2-2-1 layout)
const MOBILE_COORDINATES: Record<string, { x: number; y: number; radius: number; delay: number }> = {
  'makerspace': { x: 50, y: 7, radius: 44, delay: 0 },
  'patent-flow': { x: 22, y: 20, radius: 43, delay: 1 },
  'career-report': { x: 78, y: 20, radius: 40, delay: 2 },
  'terminal-emulator': { x: 22, y: 46, radius: 47, delay: 3 },
  'unknown-frequencies': { x: 78, y: 46, radius: 49, delay: 4 },
  'sales-flow': { x: 22, y: 72, radius: 42, delay: 5 },
  'shared-canvas': { x: 78, y: 72, radius: 39, delay: 6 },
  'quickswitch-ui': { x: 50, y: 85, radius: 41, delay: 7 },
};

// Constellation network edges
const CONSTELLATION_EDGES = [
  // Top tier
  ['makerspace', 'patent-flow'],
  ['makerspace', 'career-report'],
  ['makerspace', 'terminal-emulator'],
  ['makerspace', 'unknown-frequencies'],

  // Upper diamond / lateral links
  ['patent-flow', 'career-report'],
  ['patent-flow', 'terminal-emulator'],
  ['career-report', 'unknown-frequencies'],
  ['patent-flow', 'unknown-frequencies'],
  ['career-report', 'terminal-emulator'],

  // Center vertical and horizontal bridges
  ['terminal-emulator', 'unknown-frequencies'],
  ['terminal-emulator', 'sales-flow'],
  ['unknown-frequencies', 'shared-canvas'],
  ['terminal-emulator', 'shared-canvas'],
  ['unknown-frequencies', 'sales-flow'],

  // Lower diamond / lateral links
  ['sales-flow', 'shared-canvas'],
  ['sales-flow', 'quickswitch-ui'],
  ['shared-canvas', 'quickswitch-ui'],
  ['terminal-emulator', 'quickswitch-ui'],
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
      className="relative w-full h-full max-h-[78vh] flex items-center justify-center overflow-visible select-none"
      onClick={() => setActiveId(null)}
      animate={{
        x: isMobile ? [0, 2, -2, 1, 0] : [0, 7, -5, 4, 0],
        y: isMobile ? [0, -2, 2, -1, 0] : [0, -6, 6, -4, 0],
        rotate: isMobile ? 0 : [0, 0.35, -0.3, 0.15, 0],
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
        <defs>
          {CONSTELLATION_EDGES.map(([fromId, toId], idx) => {
            const from = coordinatesMap[fromId];
            const to = coordinatesMap[toId];
            if (!from || !to) return null;

            const isFromActive = activeProjectId === fromId;
            const isToActive = activeProjectId === toId;

            // Use trimmed endpoints once SVG size is measured; fall back to centers
            const coords = svgSize
              ? trimmedLine(from, to, svgSize.w, svgSize.h)
              : { x1: `${from.x}%`, y1: `${from.y}%`, x2: `${to.x}%`, y2: `${to.y}%` };

            if (!coords) return null;

            const gradId = `edge-grad-${fromId}-${toId}-${idx}`;

            return (
              <linearGradient
                key={gradId}
                id={gradId}
                gradientUnits="userSpaceOnUse"
                x1={coords.x1}
                y1={coords.y1}
                x2={coords.x2}
                y2={coords.y2}
              >
                {isFromActive ? (
                  // fromId is the hovered active node -> bright at origin, fading out towards target
                  <>
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="25%" stopColor="#ffffff" stopOpacity="0.60" />
                    <stop offset="55%" stopColor="#ffffff" stopOpacity="0.22" />
                    <stop offset="85%" stopColor="#ffffff" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </>
                ) : isToActive ? (
                  // toId is the hovered active node -> fading in from inactive origin towards active target
                  <>
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="15%" stopColor="#ffffff" stopOpacity="0.04" />
                    <stop offset="45%" stopColor="#ffffff" stopOpacity="0.22" />
                    <stop offset="75%" stopColor="#ffffff" stopOpacity="0.60" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
                  </>
                ) : (
                  // Neither is active
                  <>
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={isAnyActive ? 0.02 : 0.12} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={isAnyActive ? 0.02 : 0.12} />
                  </>
                )}
              </linearGradient>
            );
          })}
        </defs>

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

          const gradId = `edge-grad-${fromId}-${toId}-${idx}`;

          return (
            <motion.line
              key={`${fromId}-${toId}-${idx}`}
              x1={coords.x1}
              y1={coords.y1}
              x2={coords.x2}
              y2={coords.y2}
              stroke={`url(#${gradId})`}
              strokeWidth={isConnectedToActive ? '1.8' : '1'}
              strokeDasharray={isConnectedToActive ? '4 4' : '3 6'}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isAnyActive && !isConnectedToActive ? 0.15 : 1,
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
