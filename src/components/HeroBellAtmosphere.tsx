import React, { useEffect, useRef } from 'react';

const templeBellImage = '/assets/temple_bell.png';

interface BellDef {
  id: number;
  layer: 'bg' | 'mid' | 'fg';
  leftPercent: number; // 0 to 100
  topPx: number; // initial top offset in px (negative or small positive)
  chainLengthPx: number; // length of chain from top beam
  widthPx: number; // width of bell
  baseOpacity: number; // peak opacity for this bell (0.1 to 0.85)
  stiffness: number; // s^-2 (18 to 26)
  damping: number; // s^-1 (5.2 to 7.0)
  maxAngleDeg: number; // max swing angle in deg (3 to 12)
  impulseSensitivity: number; // mouse sensitivity (0.006 to 0.014)
  parallaxSpeed: number; // relative vertical travel with scroll (0.2 to 0.9)
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

/**
 * Deterministic artistic arrangement of 20 hanging temple bells across the Hero canopy.
 * Positions are carefully chosen to frame the composition without obstructing:
 * - The primary Devanagari temple title ("॥ श्री द्वारकाधीश मंदिर ॥")
 * - The sunset sky and Nagara temple spire / flying yellow flag
 * - The primary action buttons and quick-info bar
 */
const BELL_DEFINITIONS: BellDef[] = [
  // --- FOREGROUND LAYER (4 Prominent Detailed Bells with Hanging Chains) ---
  {
    id: 1,
    layer: 'fg',
    leftPercent: 4.5,
    topPx: -12,
    chainLengthPx: 140,
    widthPx: 84,
    baseOpacity: 0.75,
    stiffness: 22.0,
    damping: 6.0,
    maxAngleDeg: 10.0,
    impulseSensitivity: 0.012,
    parallaxSpeed: 0.75,
  },
  {
    id: 2,
    layer: 'fg',
    leftPercent: 21.0,
    topPx: -24,
    chainLengthPx: 110,
    widthPx: 74,
    baseOpacity: 0.70,
    stiffness: 24.5,
    damping: 6.4,
    maxAngleDeg: 9.5,
    impulseSensitivity: 0.011,
    parallaxSpeed: 0.70,
    hideOnMobile: true,
  },
  {
    id: 3,
    layer: 'fg',
    leftPercent: 88.5,
    topPx: -16,
    chainLengthPx: 155,
    widthPx: 88,
    baseOpacity: 0.80,
    stiffness: 21.0,
    damping: 5.8,
    maxAngleDeg: 10.5,
    impulseSensitivity: 0.013,
    parallaxSpeed: 0.80,
  },
  {
    id: 4,
    layer: 'fg',
    leftPercent: 95.0,
    topPx: -30,
    chainLengthPx: 125,
    widthPx: 76,
    baseOpacity: 0.65,
    stiffness: 25.0,
    damping: 6.5,
    maxAngleDeg: 9.0,
    impulseSensitivity: 0.010,
    parallaxSpeed: 0.68,
    hideOnMobile: true,
  },

  // --- MIDGROUND LAYER (8 Medium-Depth Bells with Subtle Chains) ---
  {
    id: 5,
    layer: 'mid',
    leftPercent: 1.5,
    topPx: -20,
    chainLengthPx: 95,
    widthPx: 56,
    baseOpacity: 0.48,
    stiffness: 23.0,
    damping: 6.2,
    maxAngleDeg: 7.5,
    impulseSensitivity: 0.009,
    parallaxSpeed: 0.55,
  },
  {
    id: 6,
    layer: 'mid',
    leftPercent: 12.0,
    topPx: -35,
    chainLengthPx: 130,
    widthPx: 60,
    baseOpacity: 0.45,
    stiffness: 22.5,
    damping: 6.0,
    maxAngleDeg: 7.0,
    impulseSensitivity: 0.008,
    parallaxSpeed: 0.50,
    hideOnMobile: true,
  },
  {
    id: 7,
    layer: 'mid',
    leftPercent: 28.0,
    topPx: -18,
    chainLengthPx: 85,
    widthPx: 52,
    baseOpacity: 0.40,
    stiffness: 25.5,
    damping: 6.6,
    maxAngleDeg: 6.5,
    impulseSensitivity: 0.008,
    parallaxSpeed: 0.48,
    hideOnTablet: true,
  },
  {
    id: 8,
    layer: 'mid',
    leftPercent: 37.0,
    topPx: -40,
    chainLengthPx: 105,
    widthPx: 48,
    baseOpacity: 0.35,
    stiffness: 26.0,
    damping: 6.8,
    maxAngleDeg: 6.0,
    impulseSensitivity: 0.007,
    parallaxSpeed: 0.45,
    hideOnTablet: true,
  },
  {
    id: 9,
    layer: 'mid',
    leftPercent: 62.0,
    topPx: -30,
    chainLengthPx: 90,
    widthPx: 50,
    baseOpacity: 0.38,
    stiffness: 24.0,
    damping: 6.3,
    maxAngleDeg: 6.5,
    impulseSensitivity: 0.008,
    parallaxSpeed: 0.50,
    hideOnTablet: true,
  },
  {
    id: 10,
    layer: 'mid',
    leftPercent: 71.5,
    topPx: -22,
    chainLengthPx: 115,
    widthPx: 58,
    baseOpacity: 0.46,
    stiffness: 23.0,
    damping: 6.1,
    maxAngleDeg: 7.2,
    impulseSensitivity: 0.009,
    parallaxSpeed: 0.52,
    hideOnMobile: true,
  },
  {
    id: 11,
    layer: 'mid',
    leftPercent: 81.0,
    topPx: -15,
    chainLengthPx: 140,
    widthPx: 62,
    baseOpacity: 0.50,
    stiffness: 22.0,
    damping: 5.9,
    maxAngleDeg: 7.8,
    impulseSensitivity: 0.009,
    parallaxSpeed: 0.56,
  },
  {
    id: 12,
    layer: 'mid',
    leftPercent: 97.5,
    topPx: -25,
    chainLengthPx: 100,
    widthPx: 54,
    baseOpacity: 0.42,
    stiffness: 24.5,
    damping: 6.4,
    maxAngleDeg: 6.8,
    impulseSensitivity: 0.008,
    parallaxSpeed: 0.48,
    hideOnMobile: true,
  },

  // --- BACKGROUND LAYER (8 Distant Bell Silhouettes with Slender Chains) ---
  {
    id: 13,
    layer: 'bg',
    leftPercent: 7.5,
    topPx: -10,
    chainLengthPx: 75,
    widthPx: 36,
    baseOpacity: 0.22,
    stiffness: 26.0,
    damping: 6.9,
    maxAngleDeg: 4.5,
    impulseSensitivity: 0.005,
    parallaxSpeed: 0.30,
    hideOnMobile: true,
  },
  {
    id: 14,
    layer: 'bg',
    leftPercent: 16.5,
    topPx: -28,
    chainLengthPx: 95,
    widthPx: 40,
    baseOpacity: 0.24,
    stiffness: 25.0,
    damping: 6.7,
    maxAngleDeg: 4.8,
    impulseSensitivity: 0.005,
    parallaxSpeed: 0.32,
    hideOnTablet: true,
  },
  {
    id: 15,
    layer: 'bg',
    leftPercent: 24.5,
    topPx: -15,
    chainLengthPx: 65,
    widthPx: 32,
    baseOpacity: 0.18,
    stiffness: 27.0,
    damping: 7.0,
    maxAngleDeg: 4.0,
    impulseSensitivity: 0.004,
    parallaxSpeed: 0.28,
    hideOnTablet: true,
  },
  {
    id: 16,
    layer: 'bg',
    leftPercent: 44.0,
    topPx: -25,
    chainLengthPx: 80,
    widthPx: 34,
    baseOpacity: 0.16,
    stiffness: 26.5,
    damping: 6.9,
    maxAngleDeg: 3.8,
    impulseSensitivity: 0.004,
    parallaxSpeed: 0.25,
    hideOnTablet: true,
  },
  {
    id: 17,
    layer: 'bg',
    leftPercent: 54.0,
    topPx: -20,
    chainLengthPx: 70,
    widthPx: 35,
    baseOpacity: 0.18,
    stiffness: 27.0,
    damping: 7.1,
    maxAngleDeg: 4.0,
    impulseSensitivity: 0.004,
    parallaxSpeed: 0.26,
    hideOnTablet: true,
  },
  {
    id: 18,
    layer: 'bg',
    leftPercent: 67.0,
    topPx: -18,
    chainLengthPx: 85,
    widthPx: 38,
    baseOpacity: 0.22,
    stiffness: 25.5,
    damping: 6.8,
    maxAngleDeg: 4.5,
    impulseSensitivity: 0.005,
    parallaxSpeed: 0.30,
    hideOnTablet: true,
  },
  {
    id: 19,
    layer: 'bg',
    leftPercent: 77.0,
    topPx: -32,
    chainLengthPx: 105,
    widthPx: 42,
    baseOpacity: 0.26,
    stiffness: 24.5,
    damping: 6.5,
    maxAngleDeg: 5.0,
    impulseSensitivity: 0.006,
    parallaxSpeed: 0.34,
    hideOnMobile: true,
  },
  {
    id: 20,
    layer: 'bg',
    leftPercent: 92.0,
    topPx: -15,
    chainLengthPx: 60,
    widthPx: 32,
    baseOpacity: 0.20,
    stiffness: 28.0,
    damping: 7.2,
    maxAngleDeg: 3.8,
    impulseSensitivity: 0.004,
    parallaxSpeed: 0.27,
    hideOnTablet: true,
  },
];

/**
 * Calculates scroll-linked opacity multiplier based on normalized hero scroll progress (0.0 to 1.0).
 * Timeline:
 * - 0% to 10%: Subtle baseline presence (0.05 to 0.20)
 * - 10% to 30%: Smooth emergence (0.20 to 1.0)
 * - 30% to 65%: Full rich presence (1.0)
 * - 65% to 85%: Graceful upward transition and fading (1.0 to 0.25)
 * - 85% to 100%: Complete fade-out to 0.0 before hero section ends
 * - > 100%: Strictly 0.0 (never leaks into next sections)
 */
export function calculateHeroBellOpacity(progress: number): number {
  if (progress <= 0.0) {
    return 0.12;
  } else if (progress < 0.10) {
    // 0% - 10%: gradual initial emergence
    return 0.12 + (progress / 0.10) * 0.18; // 0.12 -> 0.30
  } else if (progress < 0.30) {
    // 10% - 30%: rapid emergence to peak
    return 0.30 + ((progress - 0.10) / 0.20) * 0.70; // 0.30 -> 1.00
  } else if (progress <= 0.65) {
    // 30% - 65%: peak atmospheric presence
    return 1.0;
  } else if (progress < 0.85) {
    // 65% - 85%: graceful fade-out
    return 1.0 - ((progress - 0.65) / 0.20) * 0.75; // 1.00 -> 0.25
  } else if (progress < 1.0) {
    // 85% - 100%: fade to zero
    return 0.25 * (1.0 - (progress - 0.85) / 0.15); // 0.25 -> 0.00
  } else {
    // Outside hero: strictly zero
    return 0.0;
  }
}

export interface HeroBellAtmosphereProps {
  reducedMotion?: boolean;
}

/**
 * HeroBellAtmosphere
 *
 * Cinematic multi-bell background environment rendered EXCLUSIVELY in the Homepage Hero section.
 * - Multi-layer depth with 20 bells: foreground, midground, and distant background silhouettes
 * - Hanging from the upper canopy with physically connected chains
 * - Parallax depth separation linked to user's real scroll position
 * - Physics-driven damped pendulum response to mouse movements (directionally correct)
 * - Self-contained within HeroSection; completely fades to 0 before the section leaves the viewport
 */
export const HeroBellAtmosphere: React.FC<HeroBellAtmosphereProps> = ({
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const heroSection = container.closest('section') || container.parentElement;
    if (!heroSection) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = reducedMotion || motionQuery.matches;

    // Physics state per bell: theta (radians), omega (rad/s)
    const physics = BELL_DEFINITIONS.map(() => ({
      theta: 0,
      omega: 0,
    }));

    let lastMouseX: number | null = null;
    let isHeroInView = true;
    let lastTime = 0;
    let animId = 0;

    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    // Pointer move listener: mouse movement left/right imparts signed impulse
    const onPointerMove = (e: PointerEvent) => {
      if (reduceMotion || e.pointerType === 'touch' || !isHeroInView) return;
      if (lastMouseX === null) {
        lastMouseX = e.clientX;
        return;
      }
      const dx = e.clientX - lastMouseX;
      lastMouseX = e.clientX;

      if (Math.abs(dx) < 1 || Math.abs(dx) > 180) return;

      // Essential contract:
      // dx > 0 (mouse right) -> omega increases -> rotates clockwise -> bell bottom moves right
      // dx < 0 (mouse left) -> omega decreases -> rotates counter-clockwise -> bell bottom moves left
      BELL_DEFINITIONS.forEach((bell, idx) => {
        const state = physics[idx];
        const impulse = dx * bell.impulseSensitivity;
        state.omega = clamp(state.omega * 0.92 + impulse, -3.5, 3.5);
      });
    };

    const onPointerLeave = () => {
      lastMouseX = null;
    };

    // Calculate Hero scroll progress (0.0 at top of hero, 1.0 when hero bottom leaves viewport)
    const getHeroProgress = (): number => {
      const rect = heroSection.getBoundingClientRect();
      const heroHeight = rect.height || window.innerHeight;
      // When rect.top is 0, progress is 0.
      // When rect.bottom is 0 (hero scrolled past top), rect.top is -heroHeight, progress is 1.0.
      const rawProgress = -rect.top / heroHeight;
      return clamp(rawProgress, 0, 1.2);
    };

    // Update bell DOM elements (transform and opacity) directly in RAF
    const tick = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const dt = clamp((timestamp - lastTime) / 1000, 0, 0.033);
      lastTime = timestamp;

      const progress = getHeroProgress();
      const globalOpacityMultiplier = isHeroInView ? calculateHeroBellOpacity(progress) : 0;

      BELL_DEFINITIONS.forEach((bell, idx) => {
        const el = bellRefs.current[idx];
        if (!el) return;

        const state = physics[idx];

        if (isHeroInView && !reduceMotion) {
          // Damped pendulum physics
          const accel = -bell.stiffness * state.theta - bell.damping * state.omega;
          state.omega += accel * dt;
          const maxRad = (bell.maxAngleDeg * Math.PI) / 180;
          state.theta = clamp(state.theta + state.omega * dt, -maxRad, maxRad);

          // Settle threshold
          if (Math.abs(state.theta) < 0.0002 && Math.abs(state.omega) < 0.0002) {
            state.theta = 0;
            state.omega = 0;
          }
        } else if (!isHeroInView) {
          state.theta = 0;
          state.omega = 0;
        }

        // Parallax displacement based on scroll progress and depth
        const parallaxY = -progress * 120 * bell.parallaxSpeed;
        const deg = (state.theta * 180) / Math.PI;

        // Apply composited transform and computed opacity
        el.style.transform = `translate3d(0, ${parallaxY.toFixed(1)}px, 0) rotate(${deg.toFixed(2)}deg)`;
        el.style.opacity = (bell.baseOpacity * globalOpacityMultiplier).toFixed(3);
      });

      animId = window.requestAnimationFrame(tick);
    };

    // IntersectionObserver to pause loop and zero opacity when Hero is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroInView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            bellRefs.current.forEach((el) => {
              if (el) el.style.opacity = '0';
            });
          }
        });
      },
      { threshold: [0, 0.05, 0.2, 0.5, 1.0] }
    );
    observer.observe(heroSection);

    const onMotionChange = () => {
      reduceMotion = reducedMotion || motionQuery.matches;
    };
    motionQuery.addEventListener('change', onMotionChange);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    animId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      data-testid="hero-bell-atmosphere"
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Ceiling Beam Moulding from which all chains physically hang */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#2A1810]/80 via-[#5A3818]/60 to-[#2A1810]/80 border-b border-[#B68A45]/30 z-20" />

      {BELL_DEFINITIONS.map((bell, idx) => {
        const responsiveClasses = [
          bell.hideOnMobile ? 'hidden sm:block' : '',
          bell.hideOnTablet ? 'hidden lg:block' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={bell.id}
            ref={(el) => {
              bellRefs.current[idx] = el;
            }}
            data-layer={bell.layer}
            data-bell-id={bell.id}
            className={`absolute pointer-events-none ${responsiveClasses}`}
            style={{
              left: `${bell.leftPercent}%`,
              top: `${bell.topPx}px`,
              width: `${bell.widthPx}px`,
              transformOrigin: '50% 0%',
              willChange: reducedMotion ? 'auto' : 'transform, opacity',
              opacity: bell.baseOpacity * 0.12,
            }}
          >
            {/* 1. Physically Attached Chain Links */}
            <div
              className="w-full flex flex-col items-center pointer-events-none"
              style={{ height: `${bell.chainLengthPx}px` }}
            >
              <svg
                width="14"
                height={bell.chainLengthPx}
                viewBox={`0 0 14 ${bell.chainLengthPx}`}
                fill="none"
                preserveAspectRatio="none"
                className="w-3.5 h-full drop-shadow-xs"
              >
                <defs>
                  <linearGradient id={`bellChainGrad-${bell.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4A3018" />
                    <stop offset="30%" stopColor="#C59B56" />
                    <stop offset="60%" stopColor="#FFE8B3" />
                    <stop offset="100%" stopColor="#6B4828" />
                  </linearGradient>
                </defs>
                {/* Continuous alternating oval chain links */}
                {[...Array(Math.max(3, Math.floor(bell.chainLengthPx / 14)))].map((_, linkIdx) => (
                  <ellipse
                    key={linkIdx}
                    cx="7"
                    cy={7 + linkIdx * 12}
                    rx="4"
                    ry="6.5"
                    fill="none"
                    stroke={`url(#bellChainGrad-${bell.id})`}
                    strokeWidth="1.6"
                  />
                ))}
              </svg>
            </div>

            {/* 2. Hanging Brass Temple Bell */}
            <div className="relative w-full -mt-1 flex justify-center">
              {bell.layer === 'fg' || bell.layer === 'mid' ? (
                <img
                  src={templeBellImage}
                  alt=""
                  draggable={false}
                  className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(20,10,5,0.6)]"
                  style={{
                    filter:
                      bell.layer === 'mid'
                        ? 'brightness(0.92) contrast(1.05) drop-shadow(0 6px 12px rgba(25,12,6,0.45))'
                        : 'drop-shadow(0 10px 20px rgba(20,8,4,0.75))',
                  }}
                />
              ) : (
                /* Background Layer: Delicate Antique Brass Silhouette */
                <svg
                  width={bell.widthPx}
                  height={bell.widthPx * 1.25}
                  viewBox="0 0 60 75"
                  fill="none"
                  className="w-full h-auto drop-shadow-xs opacity-90"
                >
                  <defs>
                    <linearGradient id={`bgBellGrad-${bell.id}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3E2612" />
                      <stop offset="35%" stopColor="#B68A45" />
                      <stop offset="60%" stopColor="#E5BE75" />
                      <stop offset="100%" stopColor="#5A3A1E" />
                    </linearGradient>
                  </defs>
                  {/* Top Bell Dome & Lotus Cap */}
                  <ellipse cx="30" cy="12" rx="10" ry="5" fill={`url(#bgBellGrad-${bell.id})`} />
                  {/* Flared Bell Body */}
                  <path
                    d="M 22 12 C 20 25, 14 45, 6 56 C 5 58, 7 60, 10 60 L 50 60 C 53 60, 55 58, 54 56 C 46 45, 40 25, 38 12 Z"
                    fill={`url(#bgBellGrad-${bell.id})`}
                  />
                  {/* Bottom Rim */}
                  <ellipse cx="30" cy="60" rx="22" ry="4.5" fill="#FFE8B3" opacity="0.6" />
                  <ellipse cx="30" cy="61" rx="22" ry="4.5" fill="#2A1608" opacity="0.8" />
                  {/* Hanging Clapper */}
                  <circle cx="30" cy="67" r="3.5" fill="#FFE8B3" stroke="#3E2612" strokeWidth="0.8" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroBellAtmosphere;
