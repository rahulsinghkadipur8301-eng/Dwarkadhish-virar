import React, { useEffect, useRef } from 'react';

const templeBell = '/assets/temple_bell.png';

export interface TempleBellBackgroundProps {
  reducedMotion?: boolean;
  opacity?: number;
  /** Paint above section backgrounds, while readable content is at z-index 3+. */
  layer?: number;
}

/**
 * TempleBellBackground
 *
 * A single, refined, decorative site-wide brass temple bell, driven by a damped
 * physical pendulum. The bell's lower end swings in the SAME direction as
 * horizontal mouse travel (left-to-right moves lower end right; right-to-left moves it left).
 *
 * Mounted once in App.tsx; remains quietly present in the background across all sections.
 * Uses direct DOM transform updates in requestAnimationFrame for 60/120fps performance
 * without triggering React component re-renders.
 */
export const TempleBellBackground: React.FC<TempleBellBackgroundProps> = ({
  reducedMotion = false,
  opacity = 0.16,
  layer = 2,
}) => {
  const bellRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = bellRef.current;
    if (!element) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = reducedMotion || motionQuery.matches;
    let theta = 0; // angular displacement in radians (positive = bell bottom swung right)
    let omega = 0; // angular velocity in radians per second
    let lastMouseX: number | null = null;
    let lastScrollY = window.scrollY;
    let lastFrameTime = 0;
    let animationId = 0;

    const clamp = (value: number, minimum: number, maximum: number) =>
      Math.max(minimum, Math.min(maximum, value));

    const onPointerMove = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === 'touch') return;
      if (lastMouseX === null) {
        lastMouseX = event.clientX;
        return;
      }
      const dx = event.clientX - lastMouseX;
      lastMouseX = event.clientX;
      if (Math.abs(dx) < 1 || Math.abs(dx) > 150) return;
      // Essential contract:
      // Moving cursor right (dx > 0) -> omega increases -> theta increases -> rotates clockwise -> bell bottom swings right
      // Moving cursor left (dx < 0) -> omega decreases -> theta decreases -> rotates counter-clockwise -> bell bottom swings left
      omega = clamp(omega * 0.92 + dx * 0.010, -3.0, 3.0);
    };

    const onPointerLeave = () => {
      lastMouseX = null;
      // Damped gravity returns the bell naturally to rest
    };

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const dy = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (reduceMotion || Math.abs(dy) > 320) return;
      // Secondary, subtle vertical-scroll impulse
      omega = clamp(omega + clamp(dy * 0.0012, -0.13, 0.13), -3.0, 3.0);
    };

    const onMotionPreference = () => {
      reduceMotion = reducedMotion || motionQuery.matches;
      if (reduceMotion) {
        theta = 0;
        omega = 0;
        element.style.transform = 'rotate(0deg)';
      }
    };

    const tick = (timestamp: number) => {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const dt = clamp((timestamp - lastFrameTime) / 1000, 0, 0.032);
      lastFrameTime = timestamp;

      if (!reduceMotion) {
        // Semi-implicit Euler integration of a stable damped pendulum:
        // angularAcceleration = -stiffness * angle - damping * angularVelocity
        const angularAcceleration = -23.0 * theta - 6.2 * omega;
        omega += angularAcceleration * dt;
        theta = clamp(theta + omega * dt, -0.21, 0.21); // Max ~±12 degrees

        if (Math.abs(theta) < 0.0002 && Math.abs(omega) < 0.0002) {
          theta = 0;
          omega = 0;
        }
        element.style.transform = `rotate(${(theta * 180) / Math.PI}deg)`;
      } else {
        element.style.transform = 'rotate(0deg)';
      }
      animationId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    motionQuery.addEventListener('change', onMotionPreference);
    onMotionPreference();
    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      motionQuery.removeEventListener('change', onMotionPreference);
    };
  }, [reducedMotion]);

  return (
    <div
      data-testid="temple-bell-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 'clamp(90px, 12vh, 160px)',
        right: 'clamp(12px, 3.5vw, 80px)',
        width: 'clamp(64px, 7.5vw, 120px)',
        zIndex: layer,
        opacity,
        pointerEvents: 'none',
        userSelect: 'none',
        contain: 'layout style paint',
      }}
    >
      <img
        ref={bellRef}
        src={templeBell}
        alt=""
        draggable={false}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          transformOrigin: '50% 0%',
          willChange: reducedMotion ? 'auto' : 'transform',
          filter: 'drop-shadow(0 6px 12px rgba(107,72,50,0.18))',
        }}
      />
    </div>
  );
};

export default TempleBellBackground;
