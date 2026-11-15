export interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  ageMs: number;
  maxLifeMs: number;
  kind: 'speck' | 'sparkle';
  color: string;
  alphaScale: number;
  rotation: number;
}

export const CHAMPAGNE_GOLD_PALETTE = [
  '#F5DEAE',
  '#E8C784',
  '#C59B56',
  '#FFF2CE',
] as const;

export const MAX_CURSOR_PARTICLES = 42;
export const MIN_POINTER_DELTA_PX = 1.5;

export function shouldEnableCursorTrail(opts: {
  reducedMotion: boolean;
  hasFinePointer: boolean;
  hasHover: boolean;
}): boolean {
  return !opts.reducedMotion && opts.hasFinePointer && opts.hasHover;
}

export function spawnTrailParticles(
  existing: TrailParticle[],
  prevX: number | null,
  prevY: number | null,
  nextX: number,
  nextY: number,
  rng: () => number = Math.random
): TrailParticle[] {
  if (prevX === null || prevY === null) {
    return existing;
  }

  const dx = nextX - prevX;
  const dy = nextY - prevY;
  const dist = Math.hypot(dx, dy);

  // Strict zero-particle emission when pointer is stationary
  if (dist < MIN_POINTER_DELTA_PX) {
    return existing;
  }

  const spawnCount = dist > 22 ? 3 : dist > 9 ? 2 : 1;
  const additions: TrailParticle[] = [];

  for (let i = 0; i < spawnCount; i++) {
    const t = spawnCount === 1 ? 0.5 : i / (spawnCount - 1);
    const isSparkle = rng() < 0.24;
    const colorIdx = Math.floor(rng() * CHAMPAGNE_GOLD_PALETTE.length);
    additions.push({
      x: prevX + dx * t + (rng() - 0.5) * 7,
      y: prevY + dy * t + (rng() - 0.5) * 7,
      vx: dx * 0.015 + (rng() - 0.5) * 0.28,
      vy: dy * 0.015 - (0.08 + rng() * 0.22),
      size: isSparkle ? 3.2 + rng() * 1.8 : 1.1 + rng() * 1.3,
      ageMs: 0,
      maxLifeMs: isSparkle ? 540 + rng() * 140 : 420 + rng() * 200,
      kind: isSparkle ? 'sparkle' : 'speck',
      color: CHAMPAGNE_GOLD_PALETTE[colorIdx],
      alphaScale: isSparkle ? 0.72 : 0.62,
      rotation: rng() * Math.PI,
    });
  }

  const combined = existing.concat(additions);
  if (combined.length <= MAX_CURSOR_PARTICLES) {
    return combined;
  }
  return combined.slice(combined.length - MAX_CURSOR_PARTICLES);
}

export function stepTrailParticles(
  particles: TrailParticle[],
  dtMs: number
): TrailParticle[] {
  if (particles.length === 0 || dtMs <= 0) {
    return particles;
  }

  const dtScale = dtMs / 16.67;
  const next: TrailParticle[] = [];

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const nextAge = p.ageMs + dtMs;
    if (nextAge >= p.maxLifeMs) continue;

    next.push({
      ...p,
      x: p.x + p.vx * dtScale,
      y: p.y + p.vy * dtScale,
      vx: p.vx * 0.96,
      vy: p.vy * 0.97 + 0.004 * dtScale,
      ageMs: nextAge,
    });
  }

  return next;
}

export function computeParticleOpacity(particle: TrailParticle): number {
  const progress = Math.min(1, Math.max(0, particle.ageMs / particle.maxLifeMs));
  // Smooth ease-in-out fade: quick soft reveal then clean tail dissipation
  const curve = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
  return Math.max(0, Math.min(1, curve * particle.alphaScale));
}
