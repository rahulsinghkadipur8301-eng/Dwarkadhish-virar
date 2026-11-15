import React, { useEffect, useRef } from 'react';
import {
  TrailParticle,
  computeParticleOpacity,
  shouldEnableCursorTrail,
  spawnTrailParticles,
  stepTrailParticles,
} from '../utils/goldenCursorTrail';

export interface GoldenCursorTrailProps {
  reducedMotion?: boolean;
}

export const GoldenCursorTrail: React.FC<GoldenCursorTrailProps> = ({
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fineMql = window.matchMedia('(pointer: fine)');
    const hoverMql = window.matchMedia('(hover: hover)');
    const enabled = shouldEnableCursorTrail({
      reducedMotion,
      hasFinePointer: fineMql.matches,
      hasHover: hoverMql.matches,
    });

    const canvas = canvasRef.current;
    if (!canvas || !enabled) {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: TrailParticle[] = [];
    let prevX: number | null = null;
    let prevY: number | null = null;
    let rafId: number | null = null;
    let lastTs = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const drawSparkle = (p: TrailParticle, alpha: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;

      // Delicate 4-point star glint
      const outer = p.size;
      const inner = outer * 0.24;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const angle = (i * Math.PI) / 4;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const dtMs = Math.min(48, Math.max(1, now - lastTs));
      lastTs = now;

      particles = stepTrailParticles(particles, dtMs);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = computeParticleOpacity(p);
        if (alpha <= 0.01) continue;

        if (p.kind === 'sparkle') {
          drawSparkle(p, alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (particles.length > 0) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const ensureLoop = () => {
      if (rafId === null && particles.length > 0) {
        lastTs = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') {
        return;
      }
      const nextX = e.clientX;
      const nextY = e.clientY;
      particles = spawnTrailParticles(particles, prevX, prevY, nextX, nextY);
      prevX = nextX;
      prevY = nextY;
      ensureLoop();
    };

    const onPointerLeave = () => {
      prevX = null;
      prevY = null;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="golden-cursor-trail"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45]"
    />
  );
};

export default GoldenCursorTrail;
