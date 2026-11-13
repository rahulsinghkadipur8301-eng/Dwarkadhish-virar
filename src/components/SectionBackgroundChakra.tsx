import React, { useEffect, useRef, useState } from 'react';

export interface SectionBackgroundChakraProps {
  reducedMotion?: boolean;
}

const OUTER_PETAL_ANGLES = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
const INNER_PETAL_ANGLES = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

/**
 * SectionBackgroundChakra
 *
 * Subtle concentric Sacred Lotus Yantra & Ashtadal Chakra rotating backdrop
 * shared across temple content sections (excluded from main homepage #overview).
 * Uses IntersectionObserver so only sections currently in/near the viewport
 * actively composite rotation animations, saving GPU memory and battery on mobile.
 */
export const SectionBackgroundChakra: React.FC<SectionBackgroundChakraProps> = React.memo(({
  reducedMotion = false,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return;
    const el = hostRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { rootMargin: '240px 0px', threshold: 0 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const shouldAnimate = isVisible && !reducedMotion;
  const cwClass = shouldAnimate ? 'animate-chakra-cw' : 'chakra-static-center';
  const ccwClass = shouldAnimate ? 'animate-chakra-ccw' : 'chakra-static-center';

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-testid="section-background-chakra"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* Subtle warm radial glow anchoring the center chakra */}
      <div className="absolute left-1/2 top-1/2 chakra-static-center w-[min(92vw,760px)] h-[min(92vw,760px)] rounded-full bg-[radial-gradient(circle,rgba(232,199,132,0.18)_0%,rgba(194,154,84,0.08)_46%,transparent_72%)]" />

      {/* Outer 24-Petal Sacred Lotus Yantra Ring */}
      <div
        className={`absolute left-1/2 top-1/2 w-[min(96vw,880px)] h-[min(96vw,880px)] opacity-[0.14] ${cwClass}`}
      >
        <svg viewBox="0 0 800 800" fill="none" className="w-full h-full">
          <circle
            cx="400"
            cy="400"
            r="386"
            stroke="#C29A54"
            strokeWidth="1.5"
            strokeDasharray="10 8"
          />
          <circle
            cx="400"
            cy="400"
            r="360"
            stroke="#741C24"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
          <circle
            cx="400"
            cy="400"
            r="315"
            stroke="#C29A54"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {OUTER_PETAL_ANGLES.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 400 400)`}>
              <path
                d="M400 18 C412 44, 412 68, 400 86 C388 68, 388 44, 400 18 Z"
                fill="rgba(194,154,84,0.18)"
                stroke="#C29A54"
                strokeWidth="1.1"
              />
              <circle cx="400" cy="102" r="3" fill="#741C24" fillOpacity="0.45" />
            </g>
          ))}
        </svg>
      </div>

      {/* Counter-Rotating Inner 16-Petal Ashtadal Geometric Wheel */}
      <div
        className={`absolute left-1/2 top-1/2 w-[min(80vw,660px)] h-[min(80vw,660px)] opacity-[0.16] ${ccwClass}`}
      >
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
          <circle cx="300" cy="300" r="286" stroke="#C29A54" strokeWidth="1.5" />
          <circle
            cx="300"
            cy="300"
            r="245"
            stroke="#741C24"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
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
          {INNER_PETAL_ANGLES.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 300 300)`}>
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
    </div>
  );
});

export default SectionBackgroundChakra;
