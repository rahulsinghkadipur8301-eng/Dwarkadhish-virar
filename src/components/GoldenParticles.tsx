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

export const GoldenParticles: React.FC<GoldenParticlesProps> = React.memo(({
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
      const newWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const newHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      // Ignore small vertical height jitter caused by mobile browser URL bar show/hide on scroll
      if (Math.abs(newWidth - width) <= 6 && Math.abs(newHeight - height) <= 85) {
        return;
      }
      width = canvas.width = newWidth;
      height = canvas.height = newHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pre-computed RGBA fill colors (faster than allocating 20+ createRadialGradient objects per frame)
    const colors = [
      'rgba(177, 138, 76, ',
      'rgba(201, 137, 69, ',
      'rgba(229, 209, 182, ',
      'rgba(243, 231, 214, ',
    ];

    const particleCount = width < 640 ? 9 : Math.min(15, Math.floor(width / 80));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.0 + 1.0,
        speedY: -(Math.random() * 0.65 + 0.22),
        speedX: (Math.random() - 0.5) * 0.45,
        opacity: Math.random() * 0.5 + 0.2,
        opacityDelta: (Math.random() - 0.5) * 0.012,
        color: colors[i % colors.length],
      });
    }

    let lastDraw = 0;
    const render = (now: number) => {
      if (!isInView || document.hidden) {
        animationFrameId = 0;
        return;
      }

      if (now - lastDraw >= 32) {
        lastDraw = now;
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

          ctx.fillStyle = `${p.color}${(p.opacity * 0.28).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting;
          if (isInView && !document.hidden && !animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          } else if (!isInView && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      } else if (!document.hidden && isInView && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (!document.hidden) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
});
