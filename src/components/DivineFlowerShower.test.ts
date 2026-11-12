import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCeremonyTimeline,
  SEEDED_PETALS,
  getResponsivePetals,
  calculatePetalRecedeState,
} from './DivineFlowerShower';

test('DivineFlowerShower: 0% to 15% is quiet reverent darshan (no flowers, subtle initial warmth)', () => {
  const atZero = calculateCeremonyTimeline(0);
  assert.equal(atZero.flowerShowerActive, false);
  assert.equal(atZero.globalPetalOpacity, 0);
  assert.equal(atZero.statusKey, 'divineRevealed');

  const atTen = calculateCeremonyTimeline(0.10);
  assert.equal(atTen.flowerShowerActive, false);
  assert.equal(atTen.globalPetalOpacity, 0);
  assert(atTen.goldenWarmthOpacity <= 0.04);
});

test('DivineFlowerShower: 15% to 40% starts flower shower and ramps up', () => {
  const atTwenty = calculateCeremonyTimeline(0.20);
  assert.equal(atTwenty.flowerShowerActive, true);
  assert.equal(atTwenty.statusKey, 'flowerShower');
  assert(atTwenty.globalPetalOpacity > 0.2);
  assert(atTwenty.globalPetalOpacity < 1.0);

  const atForty = calculateCeremonyTimeline(0.40);
  assert.equal(atForty.flowerShowerActive, true);
  assert(Math.abs(atForty.globalPetalOpacity - 1.0) < 1e-4);
});

test('DivineFlowerShower: 40% to 65% is peak flower shower with golden illumination (0.10 - 0.16)', () => {
  const atFifty = calculateCeremonyTimeline(0.50);
  assert.equal(atFifty.flowerShowerActive, true);
  assert.equal(atFifty.globalPetalOpacity, 1.0);
  assert.equal(atFifty.recedingFactor, 0);
  assert(atFifty.goldenWarmthOpacity >= 0.10 && atFifty.goldenWarmthOpacity <= 0.16);
  assert.equal(atFifty.statusKey, 'flowerShower');
});

test('DivineFlowerShower: 65% to 85% petals drift into background, desaturating and shrinking', () => {
  const atSeventyFive = calculateCeremonyTimeline(0.75);
  assert.equal(atSeventyFive.flowerShowerActive, true);
  assert(atSeventyFive.recedingFactor > 0 && atSeventyFive.recedingFactor < 1);
  assert(atSeventyFive.globalPetalOpacity < 1.0 && atSeventyFive.globalPetalOpacity > 0.3);
});

test('DivineFlowerShower: 85% to 100% petals dissolve completely and golden glow disappears', () => {
  const atNinety = calculateCeremonyTimeline(0.90);
  assert(atNinety.globalPetalOpacity < 0.2);

  const atHundred = calculateCeremonyTimeline(1.0);
  assert.equal(atHundred.flowerShowerActive, false);
  assert.equal(atHundred.globalPetalOpacity, 0);
  assert.equal(atHundred.goldenWarmthOpacity, 0);
});

test('DivineFlowerShower: Fully deterministic and reversible on upward scroll', () => {
  const testPoints = [0.0, 0.08, 0.18, 0.35, 0.50, 0.65, 0.78, 0.92, 1.0];
  for (const p of testPoints) {
    const down = calculateCeremonyTimeline(p);
    const up = calculateCeremonyTimeline(p);
    assert.deepEqual(down, up, `Timeline output must be identical in reverse at progress ${p}`);
  }
});

test('DivineFlowerShower: Seeded petals composition conforms to required flower distribution', () => {
  assert.equal(SEEDED_PETALS.length, 48, 'Should have 48 seeded petals');

  const saffronAndOrange = SEEDED_PETALS.filter((p) => p.type === 'saffron' || p.type === 'orange').length;
  const yellow = SEEDED_PETALS.filter((p) => p.type === 'yellow').length;
  const rose = SEEDED_PETALS.filter((p) => p.type === 'rose').length;

  const saffronPercent = (saffronAndOrange / SEEDED_PETALS.length) * 100;
  const yellowPercent = (yellow / SEEDED_PETALS.length) * 100;
  const rosePercent = (rose / SEEDED_PETALS.length) * 100;

  // Expected: ~55% saffron/orange, ~30% yellow, ~15% rose
  assert(saffronPercent >= 50 && saffronPercent <= 60, `Saffron/orange is ${saffronPercent}% (expected ~55%)`);
  assert(yellowPercent >= 28 && yellowPercent <= 35, `Yellow is ${yellowPercent}% (expected ~30%)`);
  assert(rosePercent >= 12 && rosePercent <= 18, `Rose is ${rosePercent}% (expected ~15%)`);

  // Protect Mukharvind: Check that central 42%–58% column is kept clear
  const petalsInCenterFace = SEEDED_PETALS.filter((p) => p.xBasePercent > 40 && p.xBasePercent < 60);
  assert.equal(petalsInCenterFace.length, 0, 'No petal initial centers should block the sacred Mukharvind');
});

test('DivineFlowerShower: Responsive device tiers conform to performance budgets and composition', () => {
  const desktopPetals = getResponsivePetals('all', 'desktop');
  const tabletPetals = getResponsivePetals('all', 'tablet');
  const mobilePetals = getResponsivePetals('all', 'mobile');

  // Performance budget assertions
  assert.equal(desktopPetals.length, 48, 'Desktop tier should have 48 petals');
  assert(tabletPetals.length >= 18 && tabletPetals.length <= 25, `Tablet tier should have 18-25 petals (actual: ${tabletPetals.length})`);
  assert(mobilePetals.length >= 10 && mobilePetals.length <= 16, `Mobile tier should have 10-16 petals (actual: ${mobilePetals.length})`);

  // Test layer filtering across all tiers
  for (const tier of ['desktop', 'tablet', 'mobile'] as const) {
    const bg = getResponsivePetals('bg', tier);
    const mid = getResponsivePetals('mid', tier);
    const fg = getResponsivePetals('fg', tier);

    assert(bg.length > 0, `${tier} must have background petals`);
    assert(mid.length > 0, `${tier} must have midground petals`);
    assert(fg.length > 0, `${tier} must have foreground petals`);
    assert.equal(bg.length + mid.length + fg.length, getResponsivePetals('all', tier).length);

    // Verify sacred Mukharvind protection in all tiers
    const centerBlocked = getResponsivePetals('all', tier).filter(
      (p) => p.xBasePercent > 40 && p.xBasePercent < 60
    );
    assert.equal(centerBlocked.length, 0, `No petals in center column for ${tier}`);
  }
});

test('DivineFlowerShower: Staggered individual petal receding is deterministic, smooth, and distinct', () => {
  // Before 0.65, all petals have recedingFactor = 0 and individualOpacity = 1
  for (let id = 1; id <= 48; id++) {
    const s = calculatePetalRecedeState(id, 0.55);
    assert.equal(s.recedingFactor, 0);
    assert.equal(s.individualOpacity, 1);
  }

  // At progress = 0.72, some petals have started receding while others haven't yet
  const statesAt72 = Array.from({ length: 48 }, (_, i) => calculatePetalRecedeState(i + 1, 0.72));
  const stillActive = statesAt72.filter((s) => s.individualOpacity === 1).length;
  const partiallyDissolved = statesAt72.filter((s) => s.individualOpacity < 1 && s.individualOpacity > 0).length;

  assert(stillActive > 0, 'Some petals should still be at full opacity at 72%');
  assert(partiallyDissolved > 0, 'Some petals should be partially dissolved at 72%');

  // At progress = 1.0, all petals have completely dissolved
  for (let id = 1; id <= 48; id++) {
    const s = calculatePetalRecedeState(id, 1.0);
    assert.equal(s.individualOpacity, 0, `Petal ${id} should be fully dissolved at 100%`);
  }

  // Reversibility check
  for (let id = 1; id <= 48; id++) {
    const forward = calculatePetalRecedeState(id, 0.72);
    const backward = calculatePetalRecedeState(id, 0.72);
    assert.deepEqual(forward, backward, `Petal ${id} recede state must be exactly reversible`);
  }
});
