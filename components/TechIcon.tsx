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
  Terminal,
} from 'lucide-react';

interface TechIconProps {
  techId?: string;
  name?: string;
  color?: string;
  className?: string;
  size?: number;
}

export function TechIcon({
  techId,
  name,
  color,
  className = 'w-5 h-5',
  size = 20,
}: TechIconProps) {
  const iconColor = color || '#ffffff';
  const key = (techId || name || '').toLowerCase();

  switch (key) {
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
          <circle cx="0" cy="0" r="2.05" fill={iconColor} />
          <g stroke={iconColor} strokeWidth="1" fill="none">
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
            fill={iconColor}
          />
        </svg>
      );

    case 'clerk':
      return <Lock size={size} className={className} color={iconColor} />;

    case 'stripe':
      return <CreditCard size={size} className={className} color={iconColor} />;

    case 'gemini':
      return <Sparkles size={size} className={className} color={iconColor} />;

    case 'webaudio':
      return <Radio size={size} className={className} color={iconColor} />;

    case 'canvas':
      return <Layers size={size} className={className} color={iconColor} />;

    case 'typescript':
      return (
        <span
          className={`font-black text-xs px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
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
          fill={iconColor}
          className={className}
        >
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );

    case 'vite':
      return <Zap size={size} className={className} color={iconColor} />;

    case 'indexeddb':
    case 'solr':
    case 'uspto':
    case 'sqlite':
    case 'postgres':
      return <Database size={size} className={className} color={iconColor} />;

    case 'gis':
      return <Globe size={size} className={className} color={iconColor} />;

    case 'pwa':
    case 'tanstack':
      return <Boxes size={size} className={className} color={iconColor} />;

    case 'reactpdf':
      return <FileText size={size} className={className} color={iconColor} />;

    case 'framer-motion':
      return <Sparkles size={size} className={className} color={iconColor} />;

    case 'spacetimedb':
    case 'rust':
      return <Cpu size={size} className={className} color={iconColor} />;

    case 'websockets':
      return <Radio size={size} className={className} color={iconColor} />;

    case 'cpp':
    case 'c++':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          C++
        </span>
      );

    case 'go':
    case 'golang':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          GO
        </span>
      );

    case 'python':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          PY
        </span>
      );

    case 'odin':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          OD
        </span>
      );

    case 'godot':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={iconColor} className={className}>
          <path d="M12 2a2.001 2.001 0 0 0-2 2v.266C7.625 4.887 5.748 6.55 4.717 8.783L3.104 7.649a1 1 0 0 0-1.366.273l-.578.82a1 1 0 0 0 .273 1.366l1.621 1.14c-.036.248-.054.5-.054.752 0 .61.085 1.198.246 1.758L1.6 14.65a1 1 0 0 0-.256 1.37l.586.814a1 1 0 0 0 1.37.256l1.738-.934c1.17 1.944 3.125 3.374 5.462 3.896V22a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.948c2.337-.522 4.292-1.952 5.462-3.896l1.738.934a1 1 0 0 0 1.37-.256l.586-.814a1 1 0 0 0-.256-1.37l-1.646-.892c.16-.56.246-1.148.246-1.758 0-.252-.018-.504-.054-.752l1.621-1.14a1 1 0 0 0 .273-1.366l-.578-.82a1 1 0 0 0-1.366-.273l-1.613 1.134C18.252 6.55 16.375 4.887 14 4.266V4a2.001 2.001 0 0 0-2-2zm-3.5 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 15h8s-.5 2-4 2-4-2-4-2z" />
        </svg>
      );

    case 'android':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={iconColor} className={className}>
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-1.0003 0-.5516.4482-.9998.9993-.9998.5516 0 .9998.4482.9998.9998 0 .5517-.4482 1.0003-.9998 1.0003m-11.046 0c-.5511 0-.9993-.4486-.9993-1.0003 0-.5516.4482-.9998.9993-.9998.5516 0 .9998.4482.9998.9998 0 .5517-.4482 1.0003-.9998 1.0003m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.125 12 8.125c-1.8533 0-3.5902.2866-5.1368.8247L4.8409 5.4467a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3438 14.6589.3438 18.7083h23.3124c0-4.0494-2.3451-7.5216-5.7757-9.3869" />
        </svg>
      );

    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={iconColor} className={className}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );

    case 'java':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          JV
        </span>
      );

    case 'gdscript':
      return (
        <span
          className={`font-black text-[10px] px-1 rounded flex items-center justify-center text-white font-mono ${className}`}
          style={{ width: size, height: size, backgroundColor: iconColor }}
        >
          GD
        </span>
      );

    case 'strudel':
    case 'enchor':
      return <Radio size={size} className={className} color={iconColor} />;

    case 'terminal':
      return <Terminal size={size} className={className} color={iconColor} />;

    case 'hyprland':
    case 'quickshell':
    case 'linux':
    case 'arch':
    case 'vulkan':
    case 'webgl':
    case 'juce':
    case 'unreal':
    case 'ue5':
    case 'slint':
      return <Cpu size={size} className={className} color={iconColor} />;

    case 'docker':
      return <Boxes size={size} className={className} color={iconColor} />;

    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={iconColor} className={className}>
          <path d="M12 2L24 22H0L12 2Z" />
        </svg>
      );

    default:
      return <Code2 size={size} className={className} color={iconColor} />;
  }
}
