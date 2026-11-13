import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DONATION_BELL_LAYOUT,
  stepPendulumBell,
  createSacredParticles,
} from './donationAtmosphereUtils.js';

test('DONATION_BELL_LAYOUT frames left and right sides around center portal cleanly', () => {
  const leftBells = DONATION_BELL_LAYOUT.filter((b) => b.side === 'left');
  const rightBells = DONATION_BELL_LAYOUT.filter((b) => b.side === 'right');

  assert.equal(leftBells.length, rightBells.length);
  assert.ok(leftBells.length >= 4);

  // None of the hanging bells intrude into the central 28%..72% portal zone
  for (const bell of DONATION_BELL_LAYOUT) {
    assert.ok(
      bell.anchorPercent <= 26 || bell.anchorPercent >= 74,
      `Bell ${bell.id} at ${bell.anchorPercent}% must flank center portal cleanly`
    );
  }
});

test('stepPendulumBell clamps angular deflection and decays sharp strike impulses smoothly', () => {
  const spec = DONATION_BELL_LAYOUT[0];
  const struck = stepPendulumBell({ thetaRad: 0, omegaRadPerSec: 8.5 }, spec, 0.5, 0.016);
  const maxRad = (spec.maxAngleDeg * Math.PI) / 180;

  assert.ok(Math.abs(struck.thetaRad) <= maxRad + 1e-9);
  assert.ok(struck.thetaRad > 0, 'Positive impulse rotates clockwise');

  // Repeated damping steps bring sharp velocity down reliably
  let curr = { thetaRad: 0.22, omegaRadPerSec: 5.0 };
  for (let i = 0; i < 60; i++) {
    curr = stepPendulumBell(curr, spec, i * 0.016, 0.016);
  }
  assert.ok(Math.abs(curr.omegaRadPerSec) < 2.0, 'Velocity damps over time');
});

test('createSacredParticles produces deterministic ember, spark, and petal motion particles', () => {
  const particles = createSacredParticles(24);
  assert.equal(particles.length, 24);
  assert.ok(particles.some((p) => p.kind === 'ember'));
  assert.ok(particles.some((p) => p.kind === 'petal'));
  assert.ok(particles.some((p) => p.kind === 'spark'));

  for (const p of particles) {
    assert.ok(p.xPercent >= 4 && p.xPercent <= 96);
    assert.ok(p.durationSec >= 7 && p.durationSec <= 14);
  }
});
