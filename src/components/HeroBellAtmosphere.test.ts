import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateHeroBellOpacity } from './HeroBellAtmosphere';

test('HeroBellAtmosphere Opacity: Subtle baseline presence when hero is at top (progress <= 0)', () => {
  const atZero = calculateHeroBellOpacity(0);
  assert.equal(atZero, 0.12, 'Baseline subtle presence should be exactly 0.12 at progress = 0');

  const negativeProgress = calculateHeroBellOpacity(-0.2);
  assert.equal(negativeProgress, 0.12, 'Negative scroll progress should clamp to baseline 0.12');
});

test('HeroBellAtmosphere Opacity: Smooth emergence between 0% and 10% progress', () => {
  const atFivePercent = calculateHeroBellOpacity(0.05);
  assert(atFivePercent > 0.12, 'Opacity should increase above baseline at 5%');
  assert(atFivePercent < 0.30, 'Opacity should be below 0.30 at 5%');
  // At progress = 0.05: 0.12 + (0.05 / 0.10) * 0.18 = 0.12 + 0.09 = 0.21
  assert.equal(Math.round(atFivePercent * 100) / 100, 0.21);
});

test('HeroBellAtmosphere Opacity: Emerges from 0.30 to 1.00 between 10% and 30% progress', () => {
  const atTenPercent = calculateHeroBellOpacity(0.10);
  assert.equal(Math.round(atTenPercent * 100) / 100, 0.30, 'At 10% progress opacity reaches 0.30');

  const atTwentyPercent = calculateHeroBellOpacity(0.20);
  // At 20%: 0.30 + ((0.20 - 0.10) / 0.20) * 0.70 = 0.30 + 0.35 = 0.65
  assert.equal(Math.round(atTwentyPercent * 100) / 100, 0.65, 'At 20% progress opacity reaches 0.65');
});

test('HeroBellAtmosphere Opacity: Peak atmosphere presence (1.00) between 30% and 65% progress', () => {
  assert.equal(calculateHeroBellOpacity(0.30), 1.0, 'At 30% progress opacity should be full 1.0');
  assert.equal(calculateHeroBellOpacity(0.45), 1.0, 'At 45% progress opacity should be full 1.0');
  assert.equal(calculateHeroBellOpacity(0.65), 1.0, 'At 65% progress opacity should be full 1.0');
});

test('HeroBellAtmosphere Opacity: Graceful fading between 65% and 85% progress', () => {
  const at75Percent = calculateHeroBellOpacity(0.75);
  assert(Math.abs(at75Percent - 0.625) < 1e-6, 'At 75% progress opacity smoothly fades to ~0.625');

  const at85Percent = calculateHeroBellOpacity(0.85);
  assert(Math.abs(at85Percent - 0.25) < 1e-6, 'At 85% progress opacity reaches ~0.25');
});

test('HeroBellAtmosphere Opacity: Fades completely to 0 between 85% and 100%', () => {
  const at92Percent = calculateHeroBellOpacity(0.925);
  assert(at92Percent > 0.0 && at92Percent < 0.25, 'At 92.5% opacity is between 0 and 0.25');

  const at100Percent = calculateHeroBellOpacity(1.0);
  assert.equal(at100Percent, 0.0, 'At 100% progress opacity is strictly 0.0');
});

test('HeroBellAtmosphere Opacity: Strictly 0.0 when progress >= 1.0 (zero bells leak into Divine Presence)', () => {
  assert.equal(calculateHeroBellOpacity(1.0), 0.0);
  assert.equal(calculateHeroBellOpacity(1.2), 0.0);
  assert.equal(calculateHeroBellOpacity(2.5), 0.0);
});

test('HeroBellAtmosphere Opacity: Deterministic and fully reversible across upward and downward scroll', () => {
  const samplePoints = [0.0, 0.08, 0.15, 0.35, 0.50, 0.70, 0.88, 1.0, 1.5];
  for (const p of samplePoints) {
    const down = calculateHeroBellOpacity(p);
    const up = calculateHeroBellOpacity(p);
    assert.equal(down, up, `Opacity must be identical regardless of scroll direction at progress ${p}`);
  }
});
