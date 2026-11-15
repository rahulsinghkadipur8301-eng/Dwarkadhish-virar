export const ASHIRWAD_CEREMONY_DURATION_MS = 3600;

export interface NormalizedPoint {
  xPercent: number;
  yPercent: number;
}

/**
 * Calibrated landmarks inside the 3:4 portrait box of Shri Dwarkadhish Bhagwan
 * (/assets/aistudio/dwarkadhish_hero_enhanced_800.webp — 800x1067).
 * Anchored in the exact 3:4 image aspect frame so mobile & desktop stay sub-pixel locked.
 */
export const ASHIRWAD_HAND_POS: NormalizedPoint = {
  xPercent: 35.8,
  yPercent: 38.8,
};

export const LOTUS_FEET_POS: NormalizedPoint = {
  xPercent: 49.5,
  yPercent: 86.5,
};

export interface AshirwadBeamVector {
  angleDeg: number; // Angle in degrees clockwise from straight downward (0deg = straight down)
  distancePercent: number; // Relative travel distance in 3:4 aspect units
}

/**
 * Computes the physical directional vector from Lord Dwarkadhish's blessing hand
 * down toward his Lotus Feet (accounting for the 3:4 width-to-height aspect ratio).
 */
export function calculateAshirwadBeamVector(
  origin: NormalizedPoint = ASHIRWAD_HAND_POS,
  target: NormalizedPoint = LOTUS_FEET_POS,
  aspectRatio: number = 0.75
): AshirwadBeamVector {
  const dx = (target.xPercent - origin.xPercent) * aspectRatio;
  const dy = target.yPercent - origin.yPercent;
  const distancePercent = Math.hypot(dx, dy);
  // Clockwise from downward vector (0, 1): negative CSS rotation aims right-downward
  const angleRad = Math.atan2(dx, Math.max(0.001, dy));
  const angleDeg = -((angleRad * 180) / Math.PI);
  return {
    angleDeg,
    distancePercent,
  };
}

export interface AshirwadEnvelope {
  active: boolean;
  progress: number; // 0.0 -> 1.0
  charanSparshIntensity: number; // 0..1 (hands touching feet + ripples)
  ashirwadLightIntensity: number; // 0..1 (warm beam & palm aura)
  flowerShowerIntensity: number; // 0..1 (3.6s full-sanctum flower shower)
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(0.0001, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Deterministic 3.6-second (3600ms) timeline envelope for the Charan Sparsh,
 * Left-Hand Ashirwad Light, and Pushpa Varsha ceremony.
 */
export function calculateAshirwadEnvelope(
  elapsedMs: number,
  durationMs: number = ASHIRWAD_CEREMONY_DURATION_MS
): AshirwadEnvelope {
  if (elapsedMs <= 0 || elapsedMs >= durationMs || durationMs <= 0) {
    return {
      active: false,
      progress: elapsedMs >= durationMs ? 1 : 0,
      charanSparshIntensity: 0,
      ashirwadLightIntensity: 0,
      flowerShowerIntensity: 0,
    };
  }

  const p = clamp01(elapsedMs / durationMs);

  // 1. Charan Sparsh (Touching Feet): rapid reverent approach (0..0.12), holds (0.12..0.78), gentle lift (0.78..1.0)
  const sparshIn = smoothstep(0.0, 0.12, p);
  const sparshOut = 1 - smoothstep(0.78, 0.98, p);
  const charanSparshIntensity = clamp01(sparshIn * sparshOut);

  // 2. Warm Ashirwad Light from Hand: blooms right after touch (0.06..0.22), radiates strongly (0.22..0.76), dissolves softly
  const lightIn = smoothstep(0.06, 0.22, p);
  const lightOut = 1 - smoothstep(0.74, 0.98, p);
  const ashirwadLightIntensity = clamp01(lightIn * lightOut);

  // 3. Flower Shower from Everywhere: pours richly across full 3.5s duration
  const flowerIn = smoothstep(0.01, 0.10, p);
  const flowerOut = 1 - smoothstep(0.76, 1.0, p);
  const flowerShowerIntensity = clamp01(flowerIn * flowerOut);

  return {
    active: true,
    progress: p,
    charanSparshIntensity,
    ashirwadLightIntensity,
    flowerShowerIntensity,
  };
}

export type FlowerOrigin = 'top' | 'left' | 'right' | 'handAura';
export type BlossomKind = 'marigold' | 'rosePetal' | 'mogra' | 'goldenSparkle';

export interface EverywherePetal {
  id: number;
  origin: FlowerOrigin;
  kind: BlossomKind;
  x0: number; // normalized 0..1 across alcove width
  y0: number; // normalized 0..1 across alcove height
  vx: number; // horizontal velocity per second (fraction of width/s)
  vy: number; // initial vertical velocity per second (fraction of height/s)
  gravity: number; // downward acceleration per second^2
  swayAmp: number;
  swayFreq: number;
  phase: number;
  delayFrac: number; // 0..0.38 stagger within ceremony
  sizePx: number;
  rotation0: number;
  rotSpeedDeg: number;
  colorPrimary: string;
  colorSecondary: string;
}

const FLOWER_PALETTES: Record<BlossomKind, Array<[string, string]>> = {
  marigold: [
    ['#FF7A00', '#D84315'],
    ['#FFA000', '#EF6C00'],
    ['#FFD54F', '#F9A825'],
  ],
  rosePetal: [
    ['#EC407A', '#AD1457'],
    ['#E53935', '#B71C1C'],
    ['#FF6F91', '#C2185B'],
  ],
  mogra: [
    ['#FFFDF7', '#F5E6C4'],
    ['#FFF6DC', '#E8CE8E'],
  ],
  goldenSparkle: [
    ['#FFF9D6', '#F6C453'],
  ],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Generates deterministic multi-origin petals coming from everywhere
 * (overhead Torana, left column, right column, and blessing palm halo)
 * optimized for both mobile (lighter particle count) and desktop.
 */
export function generateEverywherePetals(isMobile: boolean): EverywherePetal[] {
  const count = isMobile ? 48 : 72;
  const petals: EverywherePetal[] = [];

  for (let i = 0; i < count; i++) {
    const r1 = seededRandom(i * 5 + 1);
    const r2 = seededRandom(i * 5 + 2);
    const r3 = seededRandom(i * 5 + 3);
    const r4 = seededRandom(i * 5 + 4);
    const r5 = seededRandom(i * 5 + 5);

    let origin: FlowerOrigin = 'top';
    if (r1 < 0.44) origin = 'top';
    else if (r1 < 0.66) origin = 'left';
    else if (r1 < 0.88) origin = 'right';
    else origin = 'handAura';

    let kind: BlossomKind = 'marigold';
    if (origin === 'handAura' && r2 > 0.45) {
      kind = 'goldenSparkle';
    } else if (r2 < 0.56) {
      kind = 'marigold';
    } else if (r2 < 0.86) {
      kind = 'rosePetal';
    } else {
      kind = 'mogra';
    }

    const paletteList = FLOWER_PALETTES[kind];
    const palette = paletteList[Math.floor(r3 * paletteList.length) % paletteList.length];

    let x0 = 0.5;
    let y0 = 0.0;
    let vx = 0;
    let vy = 0.18;
    let gravity = 0.14;

    if (origin === 'top') {
      x0 = 0.04 + r2 * 0.92;
      y0 = -0.06 - r3 * 0.10;
      vx = (r4 - 0.5) * 0.12;
      vy = 0.24 + r5 * 0.22;
      gravity = 0.12 + r3 * 0.08;
    } else if (origin === 'left') {
      x0 = -0.03 + r2 * 0.08;
      y0 = 0.08 + r3 * 0.52;
      vx = 0.24 + r4 * 0.28;
      vy = -0.08 + r5 * 0.22;
      gravity = 0.16;
    } else if (origin === 'right') {
      x0 = 0.95 + r2 * 0.08;
      y0 = 0.08 + r3 * 0.52;
      vx = -(0.24 + r4 * 0.28);
      vy = -0.08 + r5 * 0.22;
      gravity = 0.16;
    } else {
      // handAura — radiates downward and outward from Lord Dwarkadhish's blessing hand zone
      x0 = ASHIRWAD_HAND_POS.xPercent / 100 + (r2 - 0.5) * 0.14;
      y0 = ASHIRWAD_HAND_POS.yPercent / 100 + r3 * 0.08;
      vx = (r4 - 0.42) * 0.24;
      vy = 0.08 + r5 * 0.22;
      gravity = 0.13;
    }

    const sizeBase = kind === 'goldenSparkle' ? 5.5 : isMobile ? 9.5 : 11.5;

    petals.push({
      id: i + 1,
      origin,
      kind,
      x0,
      y0,
      vx,
      vy,
      gravity,
      swayAmp: 0.018 + r4 * 0.032,
      swayFreq: 2.2 + r5 * 2.4,
      phase: r3 * Math.PI * 2,
      delayFrac: r1 * 0.32,
      sizePx: sizeBase + r4 * 5.5,
      rotation0: r2 * 360,
      rotSpeedDeg: (r3 > 0.5 ? 1 : -1) * (140 + r5 * 210),
      colorPrimary: palette[0],
      colorSecondary: palette[1],
    });
  }

  return petals;
}

export interface AshishMote {
  id: number;
  laneOffset: number; // -1..1 spread inside beam cone
  speed: number;
  phase: number;
  radiusPx: number;
}

/**
 * Generates golden light motes traveling from Dwarkadhish's blessing palm
 * toward the devotee touching his Lotus Feet.
 */
export function generateAshishMotes(isMobile: boolean): AshishMote[] {
  const count = isMobile ? 22 : 34;
  const motes: AshishMote[] = [];
  for (let i = 0; i < count; i++) {
    const r1 = seededRandom(i * 7 + 11);
    const r2 = seededRandom(i * 7 + 13);
    const r3 = seededRandom(i * 7 + 17);
    motes.push({
      id: i + 1,
      laneOffset: (r1 - 0.5) * 2,
      speed: 0.55 + r2 * 0.65,
      phase: r3,
      radiusPx: isMobile ? 1.8 + r1 * 2.2 : 2.2 + r1 * 2.6,
    });
  }
  return motes;
}
