'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

interface SpaceVoidProps {
  interactive?: boolean;
}

export function SpaceVoid({ interactive = true }: SpaceVoidProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / width - 0.5) * 2;
      const ny = (e.clientY / height - 0.5) * 2;
      mousePos.current.targetX = nx;
      mousePos.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate Particles
    const PARTICLE_COUNT = 180;
    const particles: Particle[] = [];
    const colors = ['#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#93c5fd'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // depth factor
        size: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Deep space void background
      ctx.fillStyle = '#030307';
      ctx.fillRect(0, 0, width, height);

      // Ambient Volumetric Nebula gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + mousePos.current.x * 40,
        height * 0.35 + mousePos.current.y * 40,
        0,
        width * 0.3,
        height * 0.35,
        width * 0.6
      );
      grad1.addColorStop(0, 'rgba(30, 27, 75, 0.22)');
      grad1.addColorStop(0.5, 'rgba(15, 23, 42, 0.1)');
      grad1.addColorStop(1, 'rgba(3, 3, 7, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 - mousePos.current.x * 50,
        height * 0.7 - mousePos.current.y * 50,
        0,
        width * 0.75,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, 'rgba(15, 45, 75, 0.18)');
      grad2.addColorStop(0.6, 'rgba(7, 15, 30, 0.06)');
      grad2.addColorStop(1, 'rgba(3, 3, 7, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render Stardust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulsating twinkle
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Float drift with subtle parallax based on depth z
        p.x += p.vx + mousePos.current.x * p.z * 0.4;
        p.y += p.vy + mousePos.current.y * p.z * 0.4;

        // Wrap around screen boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
