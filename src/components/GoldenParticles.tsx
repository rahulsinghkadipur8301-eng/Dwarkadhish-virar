import React, { useEffect, useRef } from 'react';

interface GoldenParticlesProps {
  reducedMotion?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  opacityDelta: number;
  color: string;
}

export const GoldenParticles: React.FC<GoldenParticlesProps> = ({
  reducedMotion = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let isInView = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pre-computed RGBA fill colors (faster than allocating 20+ createRadialGradient objects per frame)
    const colors = [
      'rgba(177, 138, 76, ',
      'rgba(201, 137, 69, ',
      'rgba(229, 209, 182, ',
      'rgba(243, 231, 214, ',
    ];

    const particleCount = Math.min(20, Math.floor(width / 55));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.0 + 1.0,
        speedY: -(Math.random() * 0.42 + 0.14),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        opacityDelta: (Math.random() - 0.5) * 0.008,
        color: colors[i % colors.length],
      });
    }

    const render = () => {
      if (!isInView) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacityDelta;

        if (p.opacity > 0.8 || p.opacity < 0.15) {
          p.opacityDelta = -p.opacityDelta;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Soft outer halo + crisp core (much faster than radial gradient allocation per frame)
        ctx.fillStyle = `${p.color}${(p.opacity * 0.28).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting;
          if (isInView && !animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};
