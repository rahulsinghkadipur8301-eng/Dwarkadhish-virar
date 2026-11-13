import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  DONATION_BELL_LAYOUT,
  stepPendulumBell,
  createSacredParticles,
  clampValue,
  BellPendulumState,
} from '../utils/donationAtmosphereUtils';

const TEMPLE_BELL_WEBP = '/assets/temple_bell.webp';
const TEMPLE_BELL_SRC = '/assets/temple_bell.png';

export interface DonationSacredAtmosphereProps {
  reducedMotion?: boolean;
  onBellRing?: (bellId: number) => void;
}

/**
 * DonationSacredAtmosphere
 *
 * Full-bleed motion-graphics & interactive temple bell backdrop dedicated to `#donation`.
 * Strictly gates requestAnimationFrame, infinite ember/petal particles, and mandala CSS spin
 * behind IntersectionObserver + document.hidden so it consumes 0% CPU/GPU off-screen.
 */
export const DonationSacredAtmosphere: React.FC<DonationSacredAtmosphereProps> = React.memo(({
  reducedMotion = false,
  onBellRing,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<BellPendulumState[]>(
    DONATION_BELL_LAYOUT.map(() => ({ thetaRad: 0, omegaRadPerSec: 0 }))
  );
  const audioCtxRef = useRef<AudioContext | null>(null);
  const kickLoopRef = useRef<() => void>(() => {});

  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [ringingBells, setRingingBells] = useState<Record<number, number>>({});
  const particles = useMemo(() => createSacredParticles(20), []);

  // Subtle synthesized Panchadhatu bell resonance triggered strictly on user click
  const triggerChime = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const harmonics = [
        { freq: 432, gain: 0.16, decay: 2.2 },
        { freq: 864, gain: 0.09, decay: 1.7 },
        { freq: 1296, gain: 0.05, decay: 1.2 },
      ];

      for (const h of harmonics) {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(h.freq, now);
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(h.gain, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + h.decay);
      }
    } catch {
      // Audio playback is strictly progressive enhancement
    }
  }, []);

  const handleRingBell = useCallback(
    (bellId: number, idx: number, side: 'left' | 'right') => {
      const state = physicsRef.current[idx];
      if (state) {
        const direction = side === 'left' ? 1 : -1;
        state.omegaRadPerSec = clampValue(state.omegaRadPerSec + direction * 5.8, -10, 10);
      }
      kickLoopRef.current();
      const waveStamp = Date.now();
      setRingingBells((prev) => ({ ...prev, [bellId]: waveStamp }));
      triggerChime();
      onBellRing?.(bellId);

      window.setTimeout(() => {
        setRingingBells((prev) => {
          if (prev[bellId] !== waveStamp) return prev;
          const next = { ...prev };
          delete next[bellId];
          return next;
        });
      }, 1300);
    },
    [onBellRing, triggerChime]
  );

  // Viewport-gated gentle breeze + pointer impulse physics loop (0% CPU when off-screen or hidden)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parentSection = container.closest('section') || container;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReduced = reducedMotion || motionQuery.matches;
    let isInView = false;
    let lastMouseX: number | null = null;
    let lastFrameMs = 0;
    let rafId: number | null = null;

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const tick = (nowMs: number) => {
      if (!isInView || isReduced || document.hidden) {
        rafId = null;
        return;
      }

      if (!lastFrameMs) lastFrameMs = nowMs;
      const dtSec = clampValue((nowMs - lastFrameMs) / 1000, 0.004, 0.033);
      lastFrameMs = nowMs;
      const timeSec = nowMs / 1000;

      DONATION_BELL_LAYOUT.forEach((spec, idx) => {
        const el = bellRefs.current[idx];
        if (!el) return;

        const nextState = stepPendulumBell(physicsRef.current[idx], spec, timeSec, dtSec);
        physicsRef.current[idx] = nextState;
        const deg = (nextState.thetaRad * 180) / Math.PI;
        el.style.transform = `translate3d(-50%, 0, 0) rotate(${deg.toFixed(2)}deg)`;
      });

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null && isInView && !isReduced && !document.hidden) {
        lastFrameMs = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    kickLoopRef.current = startLoop;

    const onPointerMove = (e: PointerEvent) => {
      if (isReduced || !isInView || e.pointerType === 'touch') return;
      if (lastMouseX === null) {
        lastMouseX = e.clientX;
        return;
      }
      const dx = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      if (Math.abs(dx) < 1 || Math.abs(dx) > 180) return;

      DONATION_BELL_LAYOUT.forEach((spec, idx) => {
        const st = physicsRef.current[idx];
        if (!st) return;
        st.omegaRadPerSec = clampValue(
          st.omegaRadPerSec * 0.94 + dx * spec.impulseSensitivity,
          -6,
          6
        );
      });
      startLoop();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting;
          setIsSectionVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
            bellRefs.current.forEach((el) => {
              if (el) el.style.transform = 'translate3d(-50%, 0, 0) rotate(0deg)';
            });
          }
        }
      },
      { rootMargin: '160px 0px', threshold: 0 }
    );
    observer.observe(parentSection);

    const onMotionChange = () => {
      isReduced = reducedMotion || motionQuery.matches;
      if (isReduced) {
        stopLoop();
        bellRefs.current.forEach((el) => {
          if (el) el.style.transform = 'translate3d(-50%, 0, 0) rotate(0deg)';
        });
      } else {
        startLoop();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    motionQuery.addEventListener('change', onMotionChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stopLoop();
      observer.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      kickLoopRef.current = () => {};
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      data-testid="donation-sacred-atmosphere"
      className="absolute inset-0 overflow-hidden select-none pointer-events-none"
    >
      {/* Inline keyframes scoped cleanly for compositor-only ember drift & mandala rotation */}
      <style>{`
        @keyframes donationRaySpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes donationRaySpinReverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes sacredEmberFloat {
          0% {
            transform: translate3d(0, 20px, 0) scale(0.7) rotate(0deg);
            opacity: 0;
          }
          18% {
            opacity: var(--p-opacity, 0.65);
          }
          82% {
            opacity: var(--p-opacity, 0.65);
          }
          100% {
            transform: translate3d(var(--p-drift, 18px), -540px, 0) scale(1.1) rotate(var(--p-rot, 90deg));
            opacity: 0;
          }
        }
      `}</style>

      {/* =====================================================================
          LAYER 1: AMBIENT TEMPLE SANCTUM GRADIENT & RADIANT CENTER AURA
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_52%,rgba(232,199,132,0.34)_0%,rgba(244,225,190,0.48)_38%,rgba(247,235,213,0.92)_72%,rgba(241,224,196,1)_100%)]"
      />

      {/* Breathing Divine Aura Pulse Centered Directly Behind Portal */}
      <motion.div
        aria-hidden="true"
        animate={
          reducedMotion || !isSectionVisible
            ? undefined
            : {
                scale: [0.96, 1.07, 0.96],
                opacity: [0.55, 0.85, 0.55],
              }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[min(94vw,860px)] h-[min(94vw,860px)] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,246,220,0.95) 0%, rgba(232,199,132,0.42) 34%, rgba(194,154,84,0.16) 58%, transparent 74%)',
        }}
      />

      {/* =====================================================================
          LAYER 2: ROTATING CONIC GOLDEN RAYS & SACRED GEOMETRY MANDALAS
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute left-1/2 top-[56%] w-[1120px] h-[1120px] rounded-full opacity-45 pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          background:
            'repeating-conic-gradient(from 0deg, rgba(194,154,84,0.14) 0deg 8deg, transparent 8deg 24deg)',
          maskImage: 'radial-gradient(circle, black 22%, rgba(0,0,0,0.45) 50%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(circle, black 22%, rgba(0,0,0,0.45) 50%, transparent 72%)',
          animation: reducedMotion ? 'none' : 'donationRaySpin 64s linear infinite',
          animationPlayState: isSectionVisible && !reducedMotion ? 'running' : 'paused',
        }}
      />

      {/* Outer Sacred Lotus Yantra Ring */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[56%] w-[min(98vw,960px)] h-[min(98vw,960px)] opacity-[0.26] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          animation: reducedMotion ? 'none' : 'donationRaySpin 52s linear infinite',
          animationPlayState: isSectionVisible && !reducedMotion ? 'running' : 'paused',
        }}
      >
        <svg viewBox="0 0 800 800" fill="none" className="w-full h-full">
          <circle cx="400" cy="400" r="386" stroke="#C29A54" strokeWidth="1.5" strokeDasharray="10 8" />
          <circle cx="400" cy="400" r="360" stroke="#741C24" strokeWidth="1.2" strokeOpacity="0.65" />
          <circle cx="400" cy="400" r="315" stroke="#C29A54" strokeWidth="1" strokeDasharray="4 6" />
          {/* 24 Outer Sacred Lotus Petals */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={i} transform={`rotate(${angle} 400 400)`}>
                <path
                  d="M400 18 C412 44, 412 68, 400 86 C388 68, 388 44, 400 18 Z"
                  fill="rgba(194,154,84,0.18)"
                  stroke="#C29A54"
                  strokeWidth="1.1"
                />
                <circle cx="400" cy="102" r="3" fill="#741C24" fillOpacity="0.45" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Counter-Rotating Inner Ashtadal Geometric Wheel */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[56%] w-[min(86vw,740px)] h-[min(86vw,740px)] opacity-[0.30] pointer-events-none"
        style={{
          transform: 'translate(-50%, -50%)',
          animation: reducedMotion ? 'none' : 'donationRaySpinReverse 38s linear infinite',
          animationPlayState: isSectionVisible && !reducedMotion ? 'running' : 'paused',
        }}
      >
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
          <circle cx="300" cy="300" r="286" stroke="#C29A54" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="245" stroke="#741C24" strokeWidth="1" strokeDasharray="8 6" />
          <rect
            x="92"
            y="92"
            width="416"
            height="416"
            rx="16"
            stroke="#C29A54"
            strokeWidth="1.1"
            strokeOpacity="0.65"
          />
          <rect
            x="92"
            y="92"
            width="416"
            height="416"
            rx="16"
            transform="rotate(45 300 300)"
            stroke="#741C24"
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={i} transform={`rotate(${(i * 360) / 16} 300 300)`}>
              <path
                d="M300 22 C310 42, 308 58, 300 72 C292 58, 290 42, 300 22 Z"
                stroke="#C29A54"
                strokeWidth="1"
                fill="rgba(232,199,132,0.16)"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* =====================================================================
          LAYER 3: FLOATING GOLDEN DEEPAM EMBERS, SPARKS & DEVOTIONAL PETALS
          Rendered strictly when section enters/nears viewport
         ===================================================================== */}
      {!reducedMotion && isSectionVisible && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute will-change-transform"
              style={
                {
                  left: `${p.xPercent}%`,
                  top: `${p.yStartPercent}%`,
                  width: `${p.sizePx}px`,
                  height: p.kind === 'petal' ? `${Math.round(p.sizePx * 1.45)}px` : `${p.sizePx}px`,
                  borderRadius: p.kind === 'petal' ? '80% 10% 80% 10%' : '9999px',
                  background:
                    p.kind === 'petal'
                      ? 'linear-gradient(135deg, #E8B89A 0%, #B83B48 100%)'
                      : p.kind === 'spark'
                      ? 'radial-gradient(circle, #FFF9DE 0%, #E8C784 65%, transparent 100%)'
                      : 'radial-gradient(circle, #FFE8A3 0%, #C29A54 70%, transparent 100%)',
                  boxShadow:
                    p.kind !== 'petal' ? '0 0 10px rgba(232, 199, 132, 0.7)' : 'none',
                  ['--p-opacity' as string]: p.opacity,
                  ['--p-drift' as string]: `${p.driftX}px`,
                  ['--p-rot' as string]: `${p.rotationDeg}deg`,
                  animation: `sacredEmberFloat ${p.durationSec}s linear ${p.delaySec}s infinite`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* =====================================================================
          LAYER 4: SCULPTED UPPER SANDSTONE TORANA BEAM & HANGING BRASS BELLS
         ===================================================================== */}
      {/* Upper carved sandstone lintel beam anchoring every hanging bell chain */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#5D381B] via-[#C29A54] to-[#5D381B] border-b border-[#741C24]/50 shadow-md z-20"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="absolute top-2.5 inset-x-0 w-full h-12 sm:h-16 pointer-events-none z-10 opacity-45"
      >
        <path
          d="M0,0 Q180,68 360,12 Q540,56 720,10 Q900,56 1080,12 Q1260,68 1440,0"
          fill="none"
          stroke="#C29A54"
          strokeWidth="2.2"
          strokeDasharray="6 4"
        />
        <path
          d="M0,4 Q180,52 360,4 Q540,42 720,4 Q900,42 1080,4 Q1260,52 1440,4"
          fill="none"
          stroke="#741C24"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
      </svg>

      {/* Hanging Multi-Layer Brass Temple Bells Flanking the Centered Portal */}
      {DONATION_BELL_LAYOUT.map((bell, idx) => {
        const responsiveClasses = [
          bell.hideOnMobile ? 'hidden md:block' : '',
          bell.hideOnTablet ? 'hidden xl:block' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const isRinging = Boolean(ringingBells[bell.id]);
        const chainLinks = Math.max(4, Math.floor(bell.chainLengthPx / 13));

        return (
          <div
            key={bell.id}
            ref={(el) => {
              bellRefs.current[idx] = el;
            }}
            data-bell-id={bell.id}
            data-layer={bell.layer}
            data-ringing={isRinging ? 'true' : 'false'}
            className={`absolute ${responsiveClasses} ${
              bell.layer === 'fg' ? 'z-20' : bell.layer === 'mid' ? 'z-10' : 'z-0'
            }`}
            style={{
              left: `${bell.anchorPercent}%`,
              top: `${bell.topPx}px`,
              width: `${bell.widthPx}px`,
              transformOrigin: '50% 0%',
              transform: 'translate3d(-50%, 0, 0)',
              opacity: bell.baseOpacity,
              willChange: reducedMotion ? 'auto' : 'transform',
            }}
          >
            {/* Hanging Brass Anchor Hook & Chain Links */}
            <div
              className="w-full flex flex-col items-center pointer-events-none"
              style={{ height: `${bell.chainLengthPx}px` }}
            >
              <svg
                width="16"
                height={bell.chainLengthPx}
                viewBox={`0 0 16 ${bell.chainLengthPx}`}
                fill="none"
                preserveAspectRatio="none"
                className="w-4 h-full drop-shadow-xs"
              >
                <defs>
                  <linearGradient id={`donationChain-${bell.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5A3A1E" />
                    <stop offset="35%" stopColor="#D4AF37" />
                    <stop offset="65%" stopColor="#FFF0B8" />
                    <stop offset="100%" stopColor="#6D4825" />
                  </linearGradient>
                </defs>
                {Array.from({ length: chainLinks }).map((_, linkIdx) => (
                  <ellipse
                    key={linkIdx}
                    cx="8"
                    cy={7 + linkIdx * 12}
                    rx="4.2"
                    ry="6.6"
                    fill="none"
                    stroke={`url(#donationChain-${bell.id})`}
                    strokeWidth="1.8"
                  />
                ))}
              </svg>
            </div>

            {/* Temple Bell Body: Interactive Click-to-Ring Button for Foreground Bells */}
            <div className="relative w-full -mt-3.5 flex justify-center">
              {isRinging && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-24 h-24 rounded-full border-2 border-[#C29A54] animate-ping" />
                  <span className="w-36 h-36 rounded-full border border-[#741C24]/50 animate-ping [animation-delay:160ms]" />
                </div>
              )}

              {bell.layer === 'fg' && bell.interactive ? (
                <button
                  type="button"
                  onClick={() => handleRingBell(bell.id, idx, bell.side)}
                  className="pointer-events-auto relative group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#741C24] rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
                  aria-label={`Ring temple bell ${bell.id}`}
                  title="Tap to ring sacred temple bell"
                >
                  <picture className="w-full block">
                    <source type="image/webp" srcSet={TEMPLE_BELL_WEBP} />
                    <img
                      src={TEMPLE_BELL_SRC}
                      alt="Hanging brass temple bell"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain block drop-shadow-[0_14px_24px_rgba(63,41,29,0.42)]"
                    />
                  </picture>
                </button>
              ) : bell.layer === 'mid' ? (
                <picture className="w-full block">
                  <source type="image/webp" srcSet={TEMPLE_BELL_WEBP} />
                  <img
                    src={TEMPLE_BELL_SRC}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain block drop-shadow-[0_8px_14px_rgba(63,41,29,0.28)] opacity-85"
                  />
                </picture>
              ) : (
                <svg
                  width={bell.widthPx}
                  height={bell.widthPx * 1.25}
                  viewBox="0 0 60 75"
                  fill="none"
                  aria-hidden="true"
                  className="w-full h-auto opacity-80"
                >
                  <defs>
                    <linearGradient id={`donationBgBell-${bell.id}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6D4825" />
                      <stop offset="45%" stopColor="#C29A54" />
                      <stop offset="100%" stopColor="#5A3A1E" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="30" cy="12" rx="10" ry="5" fill={`url(#donationBgBell-${bell.id})`} />
                  <path
                    d="M 22 12 C 20 25, 14 45, 6 56 C 5 58, 7 60, 10 60 L 50 60 C 53 60, 55 58, 54 56 C 46 45, 40 25, 38 12 Z"
                    fill={`url(#donationBgBell-${bell.id})`}
                  />
                  <ellipse cx="30" cy="60" rx="22" ry="4.5" fill="#FFF0B8" opacity="0.55" />
                  <circle cx="30" cy="67" r="3.5" fill="#C29A54" />
                </svg>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default DonationSacredAtmosphere;
