'use client';

import React from 'react';

export function SvgFilters() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Hand-drawn organic wobble filter */}
        <filter id="handDrawnFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle organic wobble for smaller text / satellite borders */}
        <filter id="handDrawnFilterSubtle" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.06"
            numOctaves="2"
            result="noiseSubtle"
            seed="5"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noiseSubtle"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Glow filter */}
        <filter id="cosmicGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
