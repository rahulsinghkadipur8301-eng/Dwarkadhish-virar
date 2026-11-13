export interface DonationBellSpec {
  id: number;
  side: 'left' | 'right';
  layer: 'fg' | 'mid' | 'bg';
  /** Percentage from left edge (used with -translate-x-1/2 so bells anchor symmetrically around center portal) */
  anchorPercent: number;
  topPx: number;
  chainLengthPx: number;
  widthPx: number;
  baseOpacity: number;
  stiffness: number;
  damping: number;
  maxAngleDeg: number;
  breezeAmplitudeDeg: number;
  breezeFrequencyHz: number;
  phaseOffsetRad: number;
  impulseSensitivity: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  interactive?: boolean;
}

export interface BellPendulumState {
  thetaRad: number;
  omegaRadPerSec: number;
}

export interface SacredParticle {
  id: number;
  kind: 'ember' | 'petal' | 'spark';
  xPercent: number;
  yStartPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  driftX: number;
  rotationDeg: number;
  opacity: number;
}

export const DONATION_BELL_LAYOUT: DonationBellSpec[] = [
  // --- FOREGROUND INTERACTIVE BRASS TEMPLE BELLS (Framing left & right sanctuary wings) ---
  {
    id: 1,
    side: 'left',
    layer: 'fg',
    anchorPercent: 6,
    topPx: -6,
    chainLengthPx: 145,
    widthPx: 88,
    baseOpacity: 0.94,
    stiffness: 21.5,
    damping: 4.8,
    maxAngleDeg: 14,
    breezeAmplitudeDeg: 2.2,
    breezeFrequencyHz: 0.24,
    phaseOffsetRad: 0.2,
    impulseSensitivity: 0.015,
    interactive: true,
  },
  {
    id: 2,
    side: 'left',
    layer: 'fg',
    anchorPercent: 14.5,
    topPx: -10,
    chainLengthPx: 84,
    widthPx: 66,
    baseOpacity: 0.88,
    stiffness: 24.0,
    damping: 5.2,
    maxAngleDeg: 13,
    breezeAmplitudeDeg: 2.6,
    breezeFrequencyHz: 0.28,
    phaseOffsetRad: 1.4,
    impulseSensitivity: 0.013,
    interactive: true,
    hideOnMobile: true,
  },
  {
    id: 3,
    side: 'right',
    layer: 'fg',
    anchorPercent: 85.5,
    topPx: -10,
    chainLengthPx: 84,
    widthPx: 66,
    baseOpacity: 0.88,
    stiffness: 23.5,
    damping: 5.1,
    maxAngleDeg: 13,
    breezeAmplitudeDeg: 2.5,
    breezeFrequencyHz: 0.27,
    phaseOffsetRad: 2.1,
    impulseSensitivity: 0.013,
    interactive: true,
    hideOnMobile: true,
  },
  {
    id: 4,
    side: 'right',
    layer: 'fg',
    anchorPercent: 94.5,
    topPx: -6,
    chainLengthPx: 145,
    widthPx: 88,
    baseOpacity: 0.94,
    stiffness: 21.0,
    damping: 4.7,
    maxAngleDeg: 14,
    breezeAmplitudeDeg: 2.2,
    breezeFrequencyHz: 0.23,
    phaseOffsetRad: 0.9,
    impulseSensitivity: 0.015,
    interactive: true,
  },

  // --- MIDGROUND CHORUS BELLS ---
  {
    id: 5,
    side: 'left',
    layer: 'mid',
    anchorPercent: 24.5,
    topPx: -14,
    chainLengthPx: 64,
    widthPx: 50,
    baseOpacity: 0.65,
    stiffness: 25.5,
    damping: 5.6,
    maxAngleDeg: 10,
    breezeAmplitudeDeg: 1.8,
    breezeFrequencyHz: 0.31,
    phaseOffsetRad: 2.8,
    impulseSensitivity: 0.010,
    hideOnTablet: true,
  },
  {
    id: 6,
    side: 'right',
    layer: 'mid',
    anchorPercent: 75.5,
    topPx: -14,
    chainLengthPx: 64,
    widthPx: 50,
    baseOpacity: 0.65,
    stiffness: 25.0,
    damping: 5.5,
    maxAngleDeg: 10,
    breezeAmplitudeDeg: 1.9,
    breezeFrequencyHz: 0.30,
    phaseOffsetRad: 3.6,
    impulseSensitivity: 0.010,
    hideOnTablet: true,
  },
  {
    id: 7,
    side: 'left',
    layer: 'mid',
    anchorPercent: 10.0,
    topPx: -18,
    chainLengthPx: 335,
    widthPx: 60,
    baseOpacity: 0.62,
    stiffness: 18.5,
    damping: 4.8,
    maxAngleDeg: 10.0,
    breezeAmplitudeDeg: 2.1,
    breezeFrequencyHz: 0.19,
    phaseOffsetRad: 4.2,
    impulseSensitivity: 0.010,
    hideOnMobile: true,
  },
  {
    id: 8,
    side: 'right',
    layer: 'mid',
    anchorPercent: 90.0,
    topPx: -18,
    chainLengthPx: 335,
    widthPx: 60,
    baseOpacity: 0.62,
    stiffness: 18.0,
    damping: 4.7,
    maxAngleDeg: 10.0,
    breezeAmplitudeDeg: 2.1,
    breezeFrequencyHz: 0.20,
    phaseOffsetRad: 5.0,
    impulseSensitivity: 0.010,
    hideOnMobile: true,
  },

  // --- BACKGROUND ARCHITECTURAL SILHOUETTE BELLS ---
  {
    id: 9,
    side: 'left',
    layer: 'bg',
    anchorPercent: 3.5,
    topPx: -8,
    chainLengthPx: 460,
    widthPx: 44,
    baseOpacity: 0.34,
    stiffness: 17.5,
    damping: 5.6,
    maxAngleDeg: 6.5,
    breezeAmplitudeDeg: 1.5,
    breezeFrequencyHz: 0.17,
    phaseOffsetRad: 1.1,
    impulseSensitivity: 0.006,
    hideOnMobile: true,
  },
  {
    id: 10,
    side: 'left',
    layer: 'bg',
    anchorPercent: 19.5,
    topPx: -10,
    chainLengthPx: 132,
    widthPx: 38,
    baseOpacity: 0.30,
    stiffness: 24.5,
    damping: 6.0,
    maxAngleDeg: 6.0,
    breezeAmplitudeDeg: 1.4,
    breezeFrequencyHz: 0.22,
    phaseOffsetRad: 3.3,
    impulseSensitivity: 0.005,
    hideOnTablet: true,
  },
  {
    id: 11,
    side: 'right',
    layer: 'bg',
    anchorPercent: 80.5,
    topPx: -10,
    chainLengthPx: 132,
    widthPx: 38,
    baseOpacity: 0.30,
    stiffness: 24.0,
    damping: 6.0,
    maxAngleDeg: 6.0,
    breezeAmplitudeDeg: 1.4,
    breezeFrequencyHz: 0.22,
    phaseOffsetRad: 4.7,
    impulseSensitivity: 0.005,
    hideOnTablet: true,
  },
  {
    id: 12,
    side: 'right',
    layer: 'bg',
    anchorPercent: 96.5,
    topPx: -8,
    chainLengthPx: 520,
    widthPx: 44,
    baseOpacity: 0.34,
    stiffness: 17.5,
    damping: 5.6,
    maxAngleDeg: 6.5,
    breezeAmplitudeDeg: 1.5,
    breezeFrequencyHz: 0.17,
    phaseOffsetRad: 2.5,
    impulseSensitivity: 0.006,
    hideOnMobile: true,
  },
];

export function clampValue(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Steps a damped spring pendulum toward an oscillating subtle ceremonial breeze target.
 * Produces deterministic, bounded angles in radians (clamped to ±maxAngleDeg).
 */
export function stepPendulumBell(
  state: BellPendulumState,
  spec: DonationBellSpec,
  timeSec: number,
  dtSec: number
): BellPendulumState {
  const safeDt = clampValue(dtSec, 0, 0.05);
  const breezeRad =
    ((spec.breezeAmplitudeDeg * Math.PI) / 180) *
    Math.sin(2 * Math.PI * spec.breezeFrequencyHz * timeSec + spec.phaseOffsetRad);

  const displacement = state.thetaRad - breezeRad;
  const accel = -spec.stiffness * displacement - spec.damping * state.omegaRadPerSec;

  const nextOmega = clampValue(state.omegaRadPerSec + accel * safeDt, -12, 12);
  const maxRad = (spec.maxAngleDeg * Math.PI) / 180;
  const nextTheta = clampValue(state.thetaRad + nextOmega * safeDt, -maxRad, maxRad);

  return {
    thetaRad: nextTheta,
    omegaRadPerSec: nextOmega,
  };
}

/**
 * Generates deterministic rising golden deepam embers, lotus petals, and shimmer sparks
 * for the Official Contribution Portal motion-graphics canvas.
 */
export function createSacredParticles(count: number = 28): SacredParticle[] {
  const safeCount = clampValue(Math.floor(count), 0, 64);
  const particles: SacredParticle[] = [];

  for (let i = 0; i < safeCount; i++) {
    // Deterministic Halton/modular hash ratios in [0, 1)
    const h1 = ((i * 37 + 13) % 97) / 97;
    const h2 = ((i * 53 + 29) % 89) / 89;
    const h3 = ((i * 71 + 7) % 83) / 83;

    const kind: SacredParticle['kind'] =
      i % 5 === 0 ? 'petal' : i % 3 === 0 ? 'spark' : 'ember';

    particles.push({
      id: i + 1,
      kind,
      xPercent: 4 + h1 * 92,
      yStartPercent: 72 + h2 * 26,
      sizePx: kind === 'petal' ? 10 + Math.round(h3 * 6) : kind === 'spark' ? 4 + Math.round(h3 * 4) : 5 + Math.round(h2 * 5),
      durationSec: 7 + h2 * 7,
      delaySec: -(h3 * 12),
      driftX: (h1 - 0.5) * 48,
      rotationDeg: Math.round(h3 * 220 - 110),
      opacity: kind === 'petal' ? 0.42 + h3 * 0.25 : 0.48 + h2 * 0.35,
    });
  }

  return particles;
}
