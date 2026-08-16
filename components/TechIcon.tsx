'use client';

import React from 'react';
import {
  Code2,
  Database,
  Lock,
  Sparkles,
  CreditCard,
  Layers,
  Cpu,
  Globe,
  Radio,
  FileText,
  Boxes,
  Zap,
} from 'lucide-react';

interface TechIconProps {
  techId: string;
  className?: string;
  size?: number;
}

export function TechIcon({ techId, className = 'w-5 h-5', size = 20 }: TechIconProps) {
  switch (techId) {
    case 'nextjs':
      return (
        <svg
          viewBox="0 0 180 180"
          width={size}
          height={size}
          fill="none"
          className={className}
        >
          <mask
            id="next_mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="180"
            height="180"
            style={{ maskType: 'alpha' }}
          >
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#next_mask)">
            <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
            <path
              d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
              fill="white"
            />
            <rect x="115" y="54" width="12" height="72" fill="white" />
          </g>
        </svg>
      );

    case 'react':
      return (
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          width={size}
          height={size}
          fill="none"
          className={className}
        >
          <circle cx="0" cy="0" r="2.05" fill="#58c4dc" />
          <g stroke="#58c4dc" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'supabase':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          className={className}
        >
          <path
            d="M13.4 2.1c-.6-.7-1.7-.3-1.8.6L10.3 12H21c.9 0 1.4 1.1.8 1.8l-8.4 10.1c-.6.7-1.7.3-1.8-.6L13.7 12H3c-.9 0-1.4-1.1-.8-1.8L10.6 2.1"
            fill="#3ecf8e"
          />
        </svg>
      );

    case 'clerk':
      return <Lock size={size} className={className} color="#6c47ff" />;

    case 'stripe':
      return <CreditCard size={size} className={className} color="#635bff" />;

    case 'gemini':
      return <Sparkles size={size} className={className} color="#8ab4f8" />;

    case 'webaudio':
      return <Radio size={size} className={className} color="#ff5c97" />;

    case 'canvas':
      return <Layers size={size} className={className} color="#e0a96d" />;

    case 'typescript':
      return (
        <span
          className={`font-black text-xs px-1 rounded flex items-center justify-center bg-[#3178c6] text-white font-mono ${className}`}
          style={{ width: size, height: size }}
        >
          TS
        </span>
      );

    case 'tailwind':
      return (
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="#38bdf8"
          className={className}
        >
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );

    case 'vite':
      return <Zap size={size} className={className} color="#646cff" />;

    case 'indexeddb':
      return <Database size={size} className={className} color="#f59e0b" />;

    case 'gis':
      return <Globe size={size} className={className} color="#00b4d8" />;

    case 'pwa':
      return <Boxes size={size} className={className} color="#a855f7" />;

    case 'uspto':
    case 'solr':
      return <Database size={size} className={className} color="#10b981" />;

    case 'reactpdf':
      return <FileText size={size} className={className} color="#ff6b6b" />;

    case 'framer-motion':
      return <Sparkles size={size} className={className} color="#ff0088" />;

    case 'spacetimedb':
    case 'rust':
      return <Cpu size={size} className={className} color="#f97316" />;

    case 'tanstack':
      return <Boxes size={size} className={className} color="#ec4899" />;

    case 'websockets':
      return <Radio size={size} className={className} color="#06b6d4" />;

    default:
      return <Code2 size={size} className={className} color="#ffffff" />;
  }
}
