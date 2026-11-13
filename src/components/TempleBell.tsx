import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TEMPLE_BELL_WEBP = '/assets/temple_bell.webp';
const TEMPLE_BELL_PNG = '/assets/temple_bell.png';

export interface TempleBellProps {
  scrollVelocity?: number;
  reducedMotion?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * TempleBell (Foreground Sanctum Bell)
 *
 * Physically anchored to a fixed gold hook at the upper central beam of the
 * temple sanctum frame. Drives rotation via direct DOM transform mutation so
 * swinging never causes 60fps React re-renders, and automatically rests RAF
 * when settled, off-screen, or when the browser tab is hidden.
 */
export const TempleBell: React.FC<TempleBellProps> = React.memo(({
  scrollVelocity = 0,
  reducedMotion = false,
  size = 'md',
  className = '',
}) => {
  const [isRinging, setIsRinging] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const targetAngleRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const kickLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    targetAngleRef.current = Math.max(-10, Math.min(10, scrollVelocity * 10));
    if (Math.abs(targetAngleRef.current) > 0.01) {
      kickLoopRef.current();
    }
  }, [scrollVelocity]);

  // Initialize Web Audio API on explicit user gesture
  const initAudio = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
  }, []);

  // Synthesize an authentic Indian temple bronze bell chime (432 Hz fundamental + overtone harmonics)
  const playSacredBellSound = useCallback(() => {
    if (!audioEnabled) return;
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;
    const harmonics = [
      { freq: 432, gain: 0.35, decay: 2.8 },
      { freq: 864, gain: 0.22, decay: 2.2 },
      { freq: 1296, gain: 0.15, decay: 1.8 },
      { freq: 1728, gain: 0.08, decay: 1.2 },
      { freq: 2160, gain: 0.05, decay: 0.9 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  }, [audioEnabled, initAudio]);

  // On-demand spring-damper physics loop: stops completely once settled or off-screen
  useEffect(() => {
    if (reducedMotion) {
      angleRef.current = 0;
      velocityRef.current = 0;
      if (bellButtonRef.current) {
        bellButtonRef.current.style.transform = 'rotate(0deg)';
      }
      return;
    }

    let isInView = true;
    let lastTime = performance.now();

    const stopLoop = () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };

    const updatePhysics = (now: number) => {
      if (!isInView || document.hidden) {
        animFrameRef.current = null;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      const targetAngle = targetAngleRef.current;
      const springK = 32.0;
      const dampingC = 4.8;
      const displacement = targetAngle - angleRef.current;
      const force = displacement * springK;

      velocityRef.current += force * dt;
      velocityRef.current -= dampingC * velocityRef.current * dt;
      angleRef.current += velocityRef.current * dt;

      const settled =
        Math.abs(targetAngle - angleRef.current) < 0.02 &&
        Math.abs(velocityRef.current) < 0.04 &&
        Math.abs(targetAngle) < 0.02;

      if (settled) {
        angleRef.current = 0;
        velocityRef.current = 0;
        if (bellButtonRef.current) {
          bellButtonRef.current.style.transform = 'rotate(0deg)';
        }
        animFrameRef.current = null;
        return;
      }

      if (bellButtonRef.current) {
        bellButtonRef.current.style.transform = `rotate(${angleRef.current.toFixed(2)}deg)`;
      }
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    const startLoop = () => {
      if (animFrameRef.current === null && isInView && !document.hidden) {
        lastTime = performance.now();
        animFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    kickLoopRef.current = startLoop;

    const observer =
      typeof IntersectionObserver !== 'undefined' && rootRef.current
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                isInView = entry.isIntersecting;
                if (isInView) {
                  if (
                    Math.abs(angleRef.current) > 0.02 ||
                    Math.abs(velocityRef.current) > 0.04 ||
                    Math.abs(targetAngleRef.current) > 0.02
                  ) {
                    startLoop();
                  }
                } else {
                  stopLoop();
                }
              }
            },
            { threshold: 0 }
          )
        : null;

    if (observer && rootRef.current) {
      observer.observe(rootRef.current);
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (Math.abs(angleRef.current) > 0.02 || Math.abs(velocityRef.current) > 0.04) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stopLoop();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      kickLoopRef.current = () => {};
    };
  }, [reducedMotion]);

  const handleRingBell = useCallback(() => {
    setIsRinging(true);
    velocityRef.current += Math.random() > 0.5 ? 24 : -24;
    kickLoopRef.current();
    playSacredBellSound();

    window.setTimeout(() => {
      setIsRinging(false);
    }, 1200);
  }, [playSacredBellSound]);

  const toggleAudio = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextState = !audioEnabled;
      setAudioEnabled(nextState);
      if (nextState) {
        initAudio();
      }
    },
    [audioEnabled, initAudio]
  );

  const dimensions = {
    sm: { width: 44, height: 64 },
    md: { width: 54, height: 78 },
    lg: { width: 68, height: 96 },
  }[size];

  return (
    <div ref={rootRef} className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 1. FIXED ARCHITECTURAL HOOK / ANCHOR BRACKET (Never moves) */}
      <div className="relative z-30 flex items-center justify-center -mb-1">
        <svg
          width="26"
          height="14"
          viewBox="0 0 26 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xs"
        >
          {/* Heavy Sandstone-Anchored Cast-Brass Ceiling Mounting Plate */}
          <rect x="3" y="1" width="20" height="4" rx="1.5" fill="#5A3F18" stroke="#D4AF37" strokeWidth="0.8" />
          {/* Cast-Brass U-Shaped Anchor Loop */}
          <path
            d="M 9 5 C 9 12, 17 12, 17 5"
            stroke="url(#hookBrassGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="hookBrassGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7A5620" />
              <stop offset="50%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#8C6228" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. HANGING CHAIN & BELL ASSEMBLY (Swings from top center pivot where chain meets the hook) */}
      <button
        ref={bellButtonRef}
        type="button"
        onClick={handleRingBell}
        className="relative flex flex-col items-center cursor-pointer focus:outline-hidden group"
        style={{
          transformOrigin: '50% 0%',
          transform: 'rotate(0deg)',
          width: dimensions.width,
        }}
        title="पवित्र मंदिर घंटा वाजवा — Tap to ring sacred temple bell"
        aria-label="पवित्र मंदिर घंटा वाजवा — Tap to ring sacred temple bell"
      >
        {/* Golden Resonance Waves on Ring */}
        {isRinging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/70 animate-ping absolute" />
            <span className="w-24 h-24 rounded-full border border-[#F5D77F]/40 animate-ping absolute [animation-delay:180ms]" />
          </div>
        )}

        {/* Optimized WebP + PNG Fallback Bell Artwork */}
        <picture className="w-full block">
          <source type="image/webp" srcSet={TEMPLE_BELL_WEBP} />
          <img
            src={TEMPLE_BELL_PNG}
            alt="Shri Dwarkadhish temple bell"
            draggable={false}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain block drop-shadow-[0_8px_16px_rgba(42,28,18,0.55)] transition-transform duration-200 group-hover:scale-103"
          />
        </picture>

        {/* Devotee Tap Hint */}
        <span className="sr-only">Ring Sacred Temple Bell</span>
      </button>

      {/* 3. OPT-IN SOUND TOGGLE PILL (Unobtrusive & accessible) */}
      <div className="mt-1 flex items-center justify-center">
        <button
          type="button"
          onClick={toggleAudio}
          className={`px-2 py-0.5 rounded-full text-[9px] font-cinzel tracking-wider flex items-center gap-1 border transition-all cursor-pointer shadow-xs ${
            audioEnabled
              ? 'bg-[#4A2F13] text-[#FFE8B3] border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
              : 'bg-[#2A1810]/85 text-[#D8C2A4] border-[#B68A45]/40 hover:text-[#FFFDF8]'
          }`}
          title={audioEnabled ? 'ध्वनी बंद करा (Mute Bell Sound)' : 'घंटा ध्वनी सुरू करा (Enable Bell Chime)'}
          aria-label={audioEnabled ? 'Mute temple bell sound' : 'Enable temple bell sound'}
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-2.5 h-2.5 text-[#F5D77F] animate-pulse" />
              <span>ध्वनी चालू</span>
            </>
          ) : (
            <>
              <VolumeX className="w-2.5 h-2.5 text-[#A67C57]" />
              <span>घंटा ध्वनी</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

export default TempleBell;

