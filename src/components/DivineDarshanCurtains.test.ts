import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateExactCurtainOpening } from './DevotionalPresenceSection';

test('Viewport-Based Curtain Model: P <= 0.12 is completely closed (opening = 0)', () => {
  assert.equal(calculateExactCurtainOpening(0), 0);
  assert.equal(calculateExactCurtainOpening(0.05), 0);
  assert.equal(calculateExactCurtainOpening(0.12), 0);
});

test('Viewport-Based Curtain Model: 0.12 < P < 0.42 is smoothly opening', () => {
  // P = 0.27 -> (0.27 - 0.12) / 0.30 = 0.15 / 0.30 = 0.50
  const mid = calculateExactCurtainOpening(0.27);
  assert.equal(Math.round(mid * 100) / 100, 0.5);

  const start = calculateExactCurtainOpening(0.15);
  assert(start > 0 && start < 0.3);

  const end = calculateExactCurtainOpening(0.39);
  assert(end > 0.8 && end < 1.0);
});

test('Viewport-Based Curtain Model: 0.42 <= P <= 0.65 is fully open for Darshan (opening = 1)', () => {
  assert.equal(calculateExactCurtainOpening(0.42), 1);
  assert.equal(calculateExactCurtainOpening(0.50), 1);
  assert.equal(calculateExactCurtainOpening(0.65), 1);
});

test('Viewport-Based Curtain Model: 0.65 < P < 0.95 is smoothly closing', () => {
  // P = 0.80 -> 1 - (0.80 - 0.65) / 0.30 = 1 - 0.15 / 0.30 = 0.50
  const mid = calculateExactCurtainOpening(0.80);
  assert.equal(Math.round(mid * 100) / 100, 0.5);

  const closingStart = calculateExactCurtainOpening(0.70);
  assert(closingStart > 0.7 && closingStart < 1.0);

  const closingEnd = calculateExactCurtainOpening(0.92);
  assert(closingEnd > 0 && closingEnd < 0.3);
});

test('Viewport-Based Curtain Model: P >= 0.95 is completely closed (opening = 0)', () => {
  assert.equal(calculateExactCurtainOpening(0.95), 0);
  assert.equal(calculateExactCurtainOpening(0.98), 0);
  assert.equal(calculateExactCurtainOpening(1.0), 0);
});

test('Viewport-Based Curtain Model: Left and Right panels are mathematical opposites', () => {
  const maxTravelPercent = 82; // Preserves 18% gathered velvet fabric at side pillars
  const testPoints = [0.0, 0.20, 0.27, 0.50, 0.80, 1.0];
  for (const p of testPoints) {
    const opening = calculateExactCurtainOpening(p);
    const leftX = -opening * maxTravelPercent;
    const rightX = opening * maxTravelPercent;
    assert.equal(leftX, -rightX);
  }
});

test('Viewport-Based Curtain Model: Fully reversible based on scroll position', () => {
  const points = [0.0, 0.12, 0.27, 0.42, 0.50, 0.65, 0.80, 0.95, 1.0];
  for (const p of points) {
    const forward = calculateExactCurtainOpening(p);
    const reverse = calculateExactCurtainOpening(p);
    assert.equal(forward, reverse, `Curtain opening must match identically at progress ${p}`);
  }
});

test('Viewport-Based Curtain Model: Preserves gathered drapes visible inside frame at full opening', () => {
  const maxTravelPercent = 82;
  const openingAtFullDarshan = calculateExactCurtainOpening(0.50);
  assert.equal(openingAtFullDarshan, 1);
  const remainingFabricPercent = 100 - (openingAtFullDarshan * maxTravelPercent);
  assert.equal(remainingFabricPercent, 18, '18% of gathered velvet must remain visible at outer pillars');
});
