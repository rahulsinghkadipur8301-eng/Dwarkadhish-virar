import React from 'react';
import { motion } from 'motion/react';
import { FestivalMotifKind } from '../utils/festivalHelpers';

interface FestivalMotionEmblemProps {
  motif: FestivalMotifKind;
  reducedMotion?: boolean;
  isHovered?: boolean;
  size?: number;
}

/**
 * Bespoke vector motion graphic emblem tailored to each Lord Krishna Utsav.
 * Strictly animates compositor-friendly `transform` and `opacity` properties,
 * with clean static fallback when `reducedMotion` is enabled.
 */
export const FestivalMotionEmblem: React.FC<FestivalMotionEmblemProps> = React.memo(({
  motif,
  reducedMotion = false,
  isHovered = false,
  size = 40,
}) => {
  const animate = !reducedMotion;

  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: size, height: size }}
    >
      {/* Subtle rotating outer orbital ring */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className="absolute inset-0"
        animate={animate ? { rotate: 360 } : undefined}
        transition={
          animate
            ? { duration: isHovered ? 16 : 32, repeat: Infinity, ease: 'linear' }
            : undefined
        }
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#E8C784"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeDasharray="3 5"
        />
        <circle cx="32" cy="4" r="1.6" fill="#F5DEAE" fillOpacity="0.85" />
        <circle cx="32" cy="60" r="1.6" fill="#F5DEAE" fillOpacity="0.85" />
      </motion.svg>

      {motif === 'jhulan' && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          style={{ originX: '32px', originY: '12px' }}
          animate={animate ? { rotate: [-4.5, 4.5, -4.5] } : undefined}
          transition={
            animate
              ? { duration: isHovered ? 2.6 : 4.2, repeat: Infinity, ease: 'easeInOut' }
              : undefined
          }
        >
          <path d="M21 15L19 37M43 15L45 37" stroke="#E8C784" strokeWidth="1.2" strokeOpacity="0.8" />
          <path d="M18 15H46" stroke="#F5DEAE" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M17 37C21 44 43 44 47 37"
            stroke="#F5DEAE"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="rgba(232,199,132,0.14)"
          />
          <motion.circle
            cx="32"
            cy="24"
            r="2.2"
            fill="#FFFDF8"
            animate={animate ? { opacity: [0.45, 1, 0.45], scale: [0.85, 1.2, 0.85] } : undefined}
            transition={animate ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
          />
        </motion.svg>
      )}

      {motif === 'lotus' && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          animate={animate ? { scale: isHovered ? [1, 1.08, 1] : [0.97, 1.03, 0.97] } : undefined}
          transition={animate ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
        >
          <path
            d="M32 16C28.5 23 27.5 31 32 41C36.5 31 35.5 23 32 16Z"
            fill="rgba(245,222,174,0.28)"
            stroke="#F5DEAE"
            strokeWidth="1.4"
          />
          <path
            d="M32 23C23 26 20 33 24 40C27 42 30 41.5 32 40.5"
            fill="rgba(232,199,132,0.2)"
            stroke="#E8C784"
            strokeWidth="1.3"
          />
          <path
            d="M32 23C41 26 44 33 40 40C37 42 34 41.5 32 40.5"
            fill="rgba(232,199,132,0.2)"
            stroke="#E8C784"
            strokeWidth="1.3"
          />
        </motion.svg>
      )}

      {motif === 'bansuri' && (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <motion.circle
            cx="32"
            cy="32"
            r="15"
            stroke="#F5DEAE"
            strokeWidth="1.1"
            animate={animate ? { scale: [0.85, 1.35], opacity: [0.7, 0] } : undefined}
            transition={animate ? { duration: 2.8, repeat: Infinity, ease: 'easeOut' } : undefined}
          />
          <path
            d="M23 19C20 23 21 29 26 31C23 28 23 23 26 19.5C25 19 24 19 23 19Z"
            fill="#FFFDF8"
            fillOpacity="0.85"
          />
          <g transform="rotate(-24 32 34)">
            <rect x="16" y="32" width="32" height="3.6" rx="1.8" fill="#E8C784" />
            <circle cx="24" cy="33.8" r="0.9" fill="#1C1009" />
            <circle cx="29" cy="33.8" r="0.9" fill="#1C1009" />
            <circle cx="34" cy="33.8" r="0.9" fill="#1C1009" />
            <circle cx="39" cy="33.8" r="0.9" fill="#1C1009" />
          </g>
        </svg>
      )}

      {motif === 'deepa' && (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <motion.path
            d="M32 16C34.5 20.5 38 24.5 36 29C34.5 31.8 29.5 31.8 28 29C26 24.5 29.5 20.5 32 16Z"
            fill="#F5DEAE"
            style={{ originX: '32px', originY: '30px' }}
            animate={
              animate
                ? { scaleY: [0.92, 1.12, 0.96, 1.08, 0.92], opacity: [0.82, 1, 0.88, 1, 0.82] }
                : undefined
            }
            transition={animate ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
          />
          <circle cx="32" cy="26.5" r="2" fill="#FFFDF8" />
          <path
            d="M19 34H45C44 40.5 38.5 44 32 44C25.5 44 20 40.5 19 34Z"
            fill="rgba(232,199,132,0.28)"
            stroke="#F5DEAE"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {motif === 'chakra' && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          animate={animate ? { rotate: -360 } : undefined}
          transition={
            animate
              ? { duration: isHovered ? 12 : 24, repeat: Infinity, ease: 'linear' }
              : undefined
          }
        >
          <circle cx="32" cy="32" r="15" stroke="#F5DEAE" strokeWidth="1.4" />
          <circle cx="32" cy="32" r="5" fill="rgba(245,222,174,0.35)" stroke="#F5DEAE" strokeWidth="1.2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="17"
              x2="32"
              y2="25"
              stroke="#E8C784"
              strokeWidth="1.3"
              strokeLinecap="round"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
        </motion.svg>
      )}

      {motif === 'blossom' && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          animate={animate ? { rotate: 360 } : undefined}
          transition={
            animate
              ? { duration: isHovered ? 14 : 28, repeat: Infinity, ease: 'linear' }
              : undefined
          }
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="32"
              cy="20"
              rx="4.2"
              ry="7.5"
              fill="rgba(245,222,174,0.22)"
              stroke="#F5DEAE"
              strokeWidth="1.15"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="3.8" fill="#FFFDF8" fillOpacity="0.9" />
        </motion.svg>
      )}

      {motif === 'flame' && (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <motion.path
            d="M32 14C36.5 22 42 28 39.5 36.5C37.5 42 26.5 42 24.5 36.5C22 28 28 22 32 14Z"
            fill="rgba(245,222,174,0.32)"
            stroke="#F5DEAE"
            strokeWidth="1.5"
            style={{ originX: '32px', originY: '40px' }}
            animate={animate ? { scaleY: [0.94, 1.08, 0.96, 1.06, 0.94] } : undefined}
            transition={animate ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
          />
          <path d="M21 44H43" stroke="#E8C784" strokeWidth="1.6" strokeLinecap="round" />
          <motion.circle
            cx="26"
            cy="19"
            r="1.3"
            fill="#FFFDF8"
            animate={animate ? { y: [-2, -6], opacity: [0.9, 0] } : undefined}
            transition={animate ? { duration: 1.8, repeat: Infinity, ease: 'easeOut' } : undefined}
          />
        </svg>
      )}

      {motif === 'chariot' && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          animate={animate ? { rotate: 360 } : undefined}
          transition={
            animate
              ? { duration: isHovered ? 10 : 22, repeat: Infinity, ease: 'linear' }
              : undefined
          }
        >
          <circle cx="32" cy="32" r="16" stroke="#F5DEAE" strokeWidth="1.6" />
          <circle cx="32" cy="32" r="4" fill="#E8C784" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="16"
              x2="32"
              y2="28"
              stroke="#E8C784"
              strokeWidth="1.15"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
        </motion.svg>
      )}
    </div>
  );
});

export default FestivalMotionEmblem;
