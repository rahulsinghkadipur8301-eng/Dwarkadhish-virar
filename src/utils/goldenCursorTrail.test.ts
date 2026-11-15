import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHAMPAGNE_GOLD_PALETTE,
  MAX_CURSOR_PARTICLES,
  computeParticleOpacity,
  shouldEnableCursorTrail,
  spawnTrailParticles,
  stepTrailParticles,
} from './goldenCursorTrail.ts';

test('goldenCursorTrail: emits zero particles when stationary or on initial anchor', () => {
  const initial = spawnTrailParticles([], null, null, 120, 240);
  assert.equal(initial.length, 0);

  const stationary = spawnTrailParticles([], 120, 240, 120.5, 240.2);
  assert.equal(stationary.length, 0);
});

test('goldenCursorTrail: spawns bounded champagne-gold particles on movement and fades them out cleanly', () => {
  let pool = spawnTrailParticles([], 100, 100, 130, 118, () => 0.1);
  assert.ok(pool.length >= 2 && pool.length <= 3);
  assert.ok(CHAMPAGNE_GOLD_PALETTE.includes(pool[0].color as (typeof CHAMPAGNE_GOLD_PALETTE)[number]));

  // Verify cap does not overflow even under rapid movement
  for (let step = 0; step < 30; step++) {
    pool = spawnTrailParticles(pool, 100, 100, 160, 140, () => 0.25);
  }
  assert.ok(pool.length <= MAX_CURSOR_PARTICLES);

  // Advance physics past maxLifeMs and confirm full dissipation
  const faded = stepTrailParticles(pool, 1200);
  assert.equal(faded.length, 0);
});

test('goldenCursorTrail: computes smooth opacity envelope and disables on touch or reduced motion', () => {
  const sampleOpacity = computeParticleOpacity({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    size: 2,
    ageMs: 90,
    maxLifeMs: 500,
    kind: 'speck',
    color: '#E8C784',
    alphaScale: 0.7,
    rotation: 0,
  });
  assert.ok(sampleOpacity > 0 && sampleOpacity <= 0.7);

  assert.equal(
    shouldEnableCursorTrail({ reducedMotion: true, hasFinePointer: true, hasHover: true }),
    false
  );
  assert.equal(
    shouldEnableCursorTrail({ reducedMotion: false, hasFinePointer: false, hasHover: false }),
    false
  );
  assert.equal(
    shouldEnableCursorTrail({ reducedMotion: false, hasFinePointer: true, hasHover: true }),
    true
  );
});
