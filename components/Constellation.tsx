'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { SUBDOMAIN_PROJECTS, SubdomainProject } from '@/config/projects';
import { ConstellationNode } from './ConstellationNode';
import { motion } from 'framer-motion';

interface ConstellationProps {
  onSelectProject: (project: SubdomainProject) => void;
  activeProjectId?: string | null;
  onActiveProjectChange?: (id: string | null) => void;
}

interface CelestialSpec {
  x: number;
  y: number;
  weight: number;
  delay: number;
}

// Desktop coordinates and celestial size weights (rich visual differentiation)
const DESKTOP_SPECS: Record<string, CelestialSpec> = {
  'makerspace':          { x: 50, y: 12, weight: 1.15, delay: 0 }, // Top apex hub anchor
  'patent-flow':         { x: 18, y: 38, weight: 0.94, delay: 1 }, // Upper-left feature wing
  'terminal-emulator':   { x: 50, y: 38, weight: 1.25, delay: 2 }, // Core interactive flagship (largest)
  'career-report':       { x: 82, y: 38, weight: 0.98, delay: 3 }, // Upper-right feature wing
  'sales-flow':          { x: 18, y: 64, weight: 0.74, delay: 5 }, // Lower-left compact satellite
  'unknown-frequencies': { x: 50, y: 64, weight: 1.10, delay: 4 }, // Central audio-visual core
  'shared-canvas':       { x: 82, y: 64, weight: 0.80, delay: 6 }, // Lower-right satellite
  'quickswitch-ui':      { x: 50, y: 88, weight: 0.88, delay: 7 }, // Bottom apex anchor
};

// Mobile coordinates and celestial size weights (spacious 1-2-2-2-1 layout)
const MOBILE_SPECS: Record<string, CelestialSpec> = {
  'makerspace':          { x: 50, y: 7.5,  weight: 1.15, delay: 0 },
  'patent-flow':         { x: 23, y: 22.5, weight: 0.94, delay: 1 },
  'career-report':       { x: 77, y: 22.5, weight: 0.98, delay: 2 },
  'terminal-emulator':   { x: 23, y: 47.5, weight: 1.25, delay: 3 },
  'unknown-frequencies': { x: 77, y: 47.5, weight: 1.10, delay: 4 },
  'sales-flow':          { x: 23, y: 72.5, weight: 0.74, delay: 5 },
  'shared-canvas':       { x: 77, y: 72.5, weight: 0.80, delay: 6 },
  'quickswitch-ui':      { x: 50, y: 88.0, weight: 0.88, delay: 7 },
};

/**
 * Computes mathematically guaranteed collision-free node radii that dynamically
 * scale to fit any viewport dimensions without overlapping or clipping container bounds.
 */
function computeDynamicCoordinates(
  specs: Record<string, CelestialSpec>,
  stageW: number,
  stageH: number,
  isMobile: boolean
): Record<string, { x: number; y: number; radius: number; delay: number }> {
  // Real-pixel safety gap buffer between adjacent circle edges (accommodates micro-sway)
  const GAP = isMobile ? 10 : 14;
  // Margin from outer stage boundaries
  const MARGIN = isMobile ? 8 : 12;

  // Upper bound base radius for spacious screens
  const targetBase = isMobile ? 44 : 64;
  let maxBase = targetBase;

  const keys = Object.keys(specs);

  // 1. Boundary constraint: keep all circles completely inside viewport edges
  for (const k of keys) {
    const spec = specs[k];
    const px = (spec.x / 100) * stageW;
    const py = (spec.y / 100) * stageH;
    const leftMax = (px - MARGIN) / spec.weight;
    const rightMax = (stageW - px - MARGIN) / spec.weight;
    const topMax = (py - MARGIN) / spec.weight;
    const bottomMax = (stageH - py - MARGIN) / spec.weight;
    const edgeMax = Math.min(leftMax, rightMax, topMax, bottomMax);
    if (edgeMax > 0 && edgeMax < maxBase) {
      maxBase = edgeMax;
    }
  }

  // 2. Pairwise collision constraint: distance between centers >= r1 + r2 + GAP
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const a = specs[keys[i]];
      const b = specs[keys[j]];
      const dx = ((b.x - a.x) / 100) * stageW;
      const dy = ((b.y - a.y) / 100) * stageH;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pairMax = (dist - GAP) / (a.weight + b.weight);
      if (pairMax > 0 && pairMax < maxBase) {
        maxBase = pairMax;
      }
    }
  }

  // Readable floor
  const minBase = isMobile ? 24 : 28;
  const finalBase = Math.max(minBase, maxBase);

  const result: Record<string, { x: number; y: number; radius: number; delay: number }> = {};
  for (const k of keys) {
    result[k] = {
      x: specs[k].x,
      y: specs[k].y,
      radius: Math.round(finalBase * specs[k].weight),
      delay: specs[k].delay,
    };
  }
  return result;
}

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

  // Trim to visible outer ring (0.92 of node diameter)
  const rFrom = from.radius * 0.92;
  const rTo = to.radius * 0.92;

  const px1 = fx + ux * rFrom;
  const py1 = fy + uy * rFrom;
  const px2 = tx - ux * rTo;
  const py2 = ty - uy * rTo;

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

  const specs = isMobile ? MOBILE_SPECS : DESKTOP_SPECS;
  const coordinatesMap = useMemo(() => {
    const w = svgSize?.w || (isMobile ? 390 : 1200);
    const h = svgSize?.h || (isMobile ? 650 : 700);
    return computeDynamicCoordinates(specs, w, h, isMobile);
  }, [specs, svgSize, isMobile]);

  const isAnyActive = activeProjectId !== null && activeProjectId !== '';

  return (
    <motion.div
      className="relative w-full h-full min-h-0 flex items-center justify-center overflow-visible select-none"
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
