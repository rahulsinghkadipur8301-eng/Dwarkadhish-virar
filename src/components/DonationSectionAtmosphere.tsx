import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const TEMPLE_BELL_SRC = '/assets/temple_bell.png';

export interface DonationSectionAtmosphereProps {
  reducedMotion?: boolean;
}

interface CanopyBellSpec {
  id: string;
  side: 'left' | 'right';
  offsetPercent: number;
  topPx: number;
  chainLengthPx: number;
  widthPx: number;
  opacity: number;
  stiffness: number;
  damping: number;
  maxDeg: number;
  phaseOffset: number;
  breezeAmplitudeDeg: number;
  hideOnMobile?: boolean;
}

const CANOPY_BELLS: CanopyBellSpec[] = [
  // Left upper canopy bells
  {
    id: 'bell-left-outer',
    side: 'left',
    offsetPercent: 1.4,
    topPx: -6,
    chainLengthPx: 92,
    widthPx: 66,
    opacity: 0.72,
    stiffness: 20.5,
    damping: 5.4,
    maxDeg: 11,
    phaseOffset: 0.2,
    breezeAmplitudeDeg: 2.8,
  },
  {
    id: 'bell-left-mid',
    side: 'left',
    offsetPercent: 7.2,
    topPx: -12,
    chainLengthPx: 64,
    widthPx: 50,
    opacity: 0.56,
    stiffness: 24.0,
    damping: 6.0,
    maxDeg: 9.5,
    phaseOffset: 1.5,
    breezeAmplitudeDeg: 2.3,
    hideOnMobile: true,
  },
  {
    id: 'bell-left-inner',
    side: 'left',
    offsetPercent: 13.5,
    topPx: -16,
    chainLengthPx: 44,
    widthPx: 38,
    opacity: 0.36,
    stiffness: 26.5,
    damping: 6.4,
    maxDeg: 8.0,
    phaseOffset: 2.7,
    breezeAmplitudeDeg: 1.9,
    hideOnMobile: true,
  },
  // Right upper canopy bells
  {
    id: 'bell-right-outer',
    side: 'right',
    offsetPercent: 1.4,
    topPx: -6,
    chainLengthPx: 96,
    widthPx: 68,
    opacity: 0.72,
    stiffness: 19.8,
    damping: 5.3,
    maxDeg: 11,
    phaseOffset: 0.9,
    breezeAmplitudeDeg: 2.9,
  },
  {
    id: 'bell-right-mid',
    side: 'right',
    offsetPercent: 7.2,
    topPx: -10,
    chainLengthPx: 62,
    widthPx: 50,
    opacity: 0.56,
    stiffness: 23.5,
    damping: 5.9,
    maxDeg: 9.5,
    phaseOffset: 2.1,
    breezeAmplitudeDeg: 2.4,
    hideOnMobile: true,
  },
  {
    id: 'bell-right-inner',
    side: 'right',
    offsetPercent: 13.5,
    topPx: -16,
    chainLengthPx: 44,
    widthPx: 38,
    opacity: 0.36,
    stiffness: 26.0,
    damping: 6.5,
    maxDeg: 8.0,
    phaseOffset: 3.4,
    breezeAmplitudeDeg: 2.0,
    hideOnMobile: true,
  },
];

interface SparkParticle {
  id: number;
  left: string;
  bottom: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  riseY: number;
}

const DIYA_SPARKS: SparkParticle[] = [
  { id: 1, left: '6%', bottom: '12%', size: 6, duration: 8.5, delay: 0, driftX: 18, riseY: -150 },
  { id: 2, left: '14%', bottom: '28%', size: 5, duration: 10.0, delay: 1.4, driftX: -14, riseY: -180 },
  { id: 3, left: '24%', bottom: '8%', size: 7, duration: 9.2, delay: 2.8, driftX: 22, riseY: -165 },
  { id: 4, left: '36%', bottom: '18%', size: 4, duration: 11.0, delay: 0.6, driftX: -16, riseY: -140 },
  { id: 5, left: '47%', bottom: '10%', size: 6, duration: 9.8, delay: 3.5, driftX: 15, riseY: -175 },
  { id: 6, left: '54%', bottom: '22%', size: 5, duration: 10.6, delay: 1.8, driftX: -20, riseY: -160 },
  { id: 7, left: '66%', bottom: '14%', size: 7, duration: 8.8, delay: 0.9, driftX: 16, riseY: -190 },
  { id: 8, left: '78%', bottom: '26%', size: 5, duration: 11.4, delay: 2.2, driftX: -18, riseY: -155 },
  { id: 9, left: '88%', bottom: '11%', size: 6, duration: 9.4, delay: 3.1, driftX: 12, riseY: -170 },
  { id: 10, left: '94%', bottom: '32%', size: 5, duration: 10.2, delay: 1.1, driftX: -15, riseY: -145 },
  { id: 11, left: '19%', bottom: '62%', size: 4, duration: 9.6, delay: 2.0, driftX: 14, riseY: -135 },
  { id: 12, left: '83%', bottom: '58%', size: 5, duration: 10.8, delay: 0.4, driftX: -16, riseY: -145 },
];

interface PetalSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  rotateEnd: number;
  tint: string;
}

const SACRED_PETALS: PetalSpec[] = [
  { id: 1, left: '8%', top: '16%', size: 16, duration: 14, delay: 0, driftX: 48, driftY: 160, rotateEnd: 140, tint: '#E8A87C' },
  { id: 2, left: '22%', top: '8%', size: 14, duration: 16, delay: 2.5, driftX: -36, driftY: 185, rotateEnd: -120, tint: '#D97B74' },
  { id: 3, left: '42%', top: '12%', size: 15, duration: 15, delay: 4.2, driftX: 38, driftY: 150, rotateEnd: 110, tint: '#E8C784' },
  { id: 4, left: '61%', top: '6%', size: 13, duration: 17, delay: 1.3, driftX: -42, driftY: 175, rotateEnd: -150, tint: '#D97B74' },
  { id: 5, left: '79%', top: '14%', size: 16, duration: 14.5, delay: 3.4, driftX: -46, driftY: 165, rotateEnd: 135, tint: '#E8A87C' },
  { id: 6, left: '92%', top: '20%', size: 14, duration: 15.5, delay: 0.8, driftX: -32, driftY: 155, rotateEnd: -95, tint: '#E8C784' },
  { id: 7, left: '49%', top: '70%', size: 15, duration: 13.5, delay: 2.1, driftX: 34, driftY: -120, rotateEnd: 125, tint: '#D97B74' },
];

/**
 * DonationSectionAtmosphere
 *
 * Architectural animated sanctuary atmosphere dedicated to the Official Contribution Portal section:
 * 1. Six hanging brass temple bells with damped physical pendulum + serene ambient courtyard breeze.
 * 2. Rotating dual-ring sacred sandstone lotus mandala backdrop.
 * 3. Breathing warm amber-gold sanctum diya light halos.
 * 4. Drifting golden diya sparks and flower petals.
 */
export const DonationSectionAtmosphere: React.FC<DonationSectionAtmosphereProps> = React.memo(({
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      bellRefs.current.forEach((el) => {
        if (el) el.style.transform = 'rotate(0deg)';
      });
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const states = CANOPY_BELLS.map((b) => ({
      theta: ((b.breezeAmplitudeDeg * 0.5) * Math.PI) / 180,
      omega: 0,
    }));

    let lastMouseX: number | null = null;
    let lastScrollY = window.scrollY;
    let lastTime = 0;
    let startTime = 0;
    let rafId: number | null = null;
    let isInView = false;

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (lastMouseX === null) {
        lastMouseX = e.clientX;
        return;
      }
      const dx = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      if (Math.abs(dx) < 1 || Math.abs(dx) > 160) return;
      CANOPY_BELLS.forEach((_, idx) => {
        const factor = 0.0085 + (idx % 3) * 0.0014;
        states[idx].omega = clamp(states[idx].omega + dx * factor, -2.6, 2.6);
      });
    };

    const onScroll = () => {
      const nextY = window.scrollY;
      const dy = nextY - lastScrollY;
      lastScrollY = nextY;
      if (Math.abs(dy) > 320) return;
      CANOPY_BELLS.forEach((_, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        states[idx].omega = clamp(states[idx].omega + dir * clamp(dy * 0.0014, -0.18, 0.18), -2.6, 2.6);
      });
    };

    const tick = (now: number) => {
      if (!isInView || document.hidden) {
        rafId = null;
        return;
      }

      if (!startTime) startTime = now;
      if (!lastTime) lastTime = now;
      const dt = clamp((now - lastTime) / 1000, 0, 0.032);
      const elapsedSec = (now - startTime) / 1000;
      lastTime = now;

      CANOPY_BELLS.forEach((bell, idx) => {
        const st = states[idx];
        const maxRad = (bell.maxDeg * Math.PI) / 180;
        // Gentle harmonic temple breeze driving target equilibrium angle
        const breezeAngleDeg =
          bell.breezeAmplitudeDeg * Math.sin(elapsedSec * 1.15 + bell.phaseOffset) +
          bell.breezeAmplitudeDeg * 0.35 * Math.cos(elapsedSec * 0.62 + bell.phaseOffset * 1.7);
        const breezeRad = (breezeAngleDeg * Math.PI) / 180;

        const accel = -bell.stiffness * (st.theta - breezeRad) - bell.damping * st.omega;
        st.omega += accel * dt;
        st.theta = clamp(st.theta + st.omega * dt, -maxRad, maxRad);

        const el = bellRefs.current[idx];
        if (el) {
          el.style.transform = `rotate(${(st.theta * 180) / Math.PI}deg)`;
        }
      });

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null && isInView && !document.hidden) {
        lastTime = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isInView = entry.isIntersecting;
          if (isInView && !document.hidden) {
            startLoop();
          } else if (!isInView && rafId !== null) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden && rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && isInView) {
        startLoop();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-testid="donation-section-atmosphere"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-[1]"
    >
      {/* 1. Soft Breathing Sanctum Amber-Gold Diya Halos */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.09, 1],
                opacity: [0.38, 0.58, 0.38],
              }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 left-[14%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(232, 199, 132, 0.42) 0%, rgba(194, 154, 84, 0.14) 52%, transparent 72%)',
        }}
      />
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1.06, 0.96, 1.06],
                opacity: [0.3, 0.5, 0.3],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[-80px] right-[12%] w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201, 137, 69, 0.32) 0%, rgba(116, 28, 36, 0.08) 55%, transparent 74%)',
        }}
      />

      {/* 2. Dual Counter-Rotating Sacred Sandstone Lotus Mandala Watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[920px] sm:w-[1160px] sm:h-[1160px] opacity-[0.065]">
        <motion.svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 96, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <circle cx="200" cy="200" r="192" stroke="#C29A54" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="200" cy="200" r="172" stroke="#741C24" strokeWidth="0.9" />
          <circle cx="200" cy="200" r="144" stroke="#C29A54" strokeWidth="1.2" strokeDasharray="4 6" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <path
                key={i}
                d="M200 28 C212 68 214 96 200 132 C186 96 188 68 200 28 Z"
                stroke="#C29A54"
                strokeWidth="1"
                fill="rgba(194,154,84,0.08)"
                transform={`rotate(${angle} 200 200)`}
              />
            );
          })}
        </motion.svg>

        <motion.svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={reducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 68, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 w-full h-full"
        >
          <circle cx="200" cy="200" r="110" stroke="#741C24" strokeWidth="1" strokeDasharray="3 5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <path
                key={i}
                d="M200 94 C208 120 210 140 200 164 C190 140 192 120 200 94 Z"
                stroke="#741C24"
                strokeWidth="0.9"
                transform={`rotate(${angle} 200 200)`}
              />
            );
          })}
        </motion.svg>
      </div>

      {/* 3. Subtle Corner Sandstone Arch Filigree */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.06]">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 H180 C120 20 80 60 60 120 C40 160 20 180 0 200 Z" stroke="#741C24" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="38" stroke="#C29A54" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.06] rotate-180">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 H180 C120 20 80 60 60 120 C40 160 20 180 0 200 Z" stroke="#741C24" strokeWidth="1.5" />
          <circle cx="48" cy="48" r="38" stroke="#C29A54" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* 4. Hanging Brass Temple Bells along Left & Right Top Sanctuary Canopy */}
      {CANOPY_BELLS.map((bell, idx) => (
        <div
          key={bell.id}
          className={`${bell.hideOnMobile ? 'hidden md:block' : 'block'} absolute top-0`}
          style={{
            [bell.side]: `${bell.offsetPercent}%`,
            top: `${bell.topPx}px`,
            width: `${bell.widthPx}px`,
            opacity: bell.opacity,
          }}
        >
          <div
            ref={(el) => {
              bellRefs.current[idx] = el;
            }}
            style={{
              transformOrigin: '50% 0%',
              willChange: reducedMotion ? 'auto' : 'transform',
            }}
            className="flex flex-col items-center"
          >
            {/* Ornamental Beaded Golden Brass Chain */}
            <svg
              width="12"
              height={bell.chainLengthPx}
              viewBox={`0 0 12 ${bell.chainLengthPx}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <line
                x1="6"
                y1="0"
                x2="6"
                y2={bell.chainLengthPx}
                stroke="#B18A4C"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx="6" cy={Math.max(8, bell.chainLengthPx * 0.35)} r="2.4" fill="#C29A54" />
              <circle cx="6" cy={Math.max(14, bell.chainLengthPx * 0.7)} r="2.4" fill="#C29A54" />
              <circle cx="6" cy={bell.chainLengthPx - 2} r="3" fill="#8C6232" />
            </svg>

            {/* Authentic Brass Temple Bell */}
            <img
              src={TEMPLE_BELL_SRC}
              alt=""
              draggable={false}
              className="w-full h-auto -mt-1 drop-shadow-[0_10px_18px_rgba(107,72,50,0.28)]"
            />
          </div>
        </div>
      ))}

      {/* 5. Rising Sacred Diya Sparks */}
      {!reducedMotion &&
        DIYA_SPARKS.map((spark) => (
          <motion.span
            key={spark.id}
            style={{
              left: spark.left,
              bottom: spark.bottom,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              background:
                'radial-gradient(circle, rgba(255,244,200,0.95) 0%, rgba(218,165,64,0.65) 55%, transparent 100%)',
            }}
            className="absolute rounded-full blur-[0.5px]"
            animate={{
              y: [0, spark.riseY],
              x: [0, spark.driftX, spark.driftX * 0.4],
              opacity: [0, 0.72, 0.45, 0],
              scale: [0.6, 1.15, 0.85],
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* 6. Drifting Sacred Lotus & Marigold Petals */}
      {!reducedMotion &&
        SACRED_PETALS.map((petal) => (
          <motion.div
            key={petal.id}
            style={{ left: petal.left, top: petal.top }}
            className="absolute"
            animate={{
              y: [0, petal.driftY],
              x: [0, petal.driftX, -petal.driftX * 0.3],
              rotate: [0, petal.rotateEnd],
              opacity: [0, 0.34, 0.28, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C16.5 6.5 19 12 12 22C5 12 7.5 6.5 12 2Z"
                fill={petal.tint}
                fillOpacity="0.55"
                stroke="#C29A54"
                strokeWidth="0.7"
              />
            </svg>
          </motion.div>
        ))}
    </div>
  );
});

export default DonationSectionAtmosphere;
