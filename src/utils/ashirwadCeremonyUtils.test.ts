import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ASHIRWAD_CEREMONY_DURATION_MS,
  ASHIRWAD_HAND_POS,
  LOTUS_FEET_POS,
  calculateAshirwadBeamVector,
  calculateAshirwadEnvelope,
  generateEverywherePetals,
  generateAshishMotes,
} from './ashirwadCeremonyUtils';

test('ashirwadCeremonyUtils: Duration stays within requested 3 to 4 seconds', () => {
  assert(
    ASHIRWAD_CEREMONY_DURATION_MS >= 3000 && ASHIRWAD_CEREMONY_DURATION_MS <= 4000,
    `Duration ${ASHIRWAD_CEREMONY_DURATION_MS}ms should be between 3000ms and 4000ms`
  );
});

test('ashirwadCeremonyUtils: Landmarks stay inside valid sanctum portrait frame', () => {
  assert(ASHIRWAD_HAND_POS.xPercent > 25 && ASHIRWAD_HAND_POS.xPercent < 45);
  assert(ASHIRWAD_HAND_POS.yPercent > 30 && ASHIRWAD_HAND_POS.yPercent < 48);
  assert(LOTUS_FEET_POS.xPercent > 40 && LOTUS_FEET_POS.xPercent < 60);
  assert(LOTUS_FEET_POS.yPercent > 80 && LOTUS_FEET_POS.yPercent < 92);
});

test('ashirwadCeremonyUtils: Beam vector aims downward from blessing hand toward Lotus Feet', () => {
  const vec = calculateAshirwadBeamVector(ASHIRWAD_HAND_POS, LOTUS_FEET_POS, 0.75);
  assert(vec.distancePercent > 40, 'Distance should span from palm to feet');
  assert(vec.angleDeg < 0 && vec.angleDeg > -25, `Angle ${vec.angleDeg}deg should aim softly from left palm toward centered feet`);
});

test('ashirwadCeremonyUtils: Ceremony envelope phases activate and conclude cleanly', () => {
  const before = calculateAshirwadEnvelope(0);
  assert.equal(before.active, false);
  assert.equal(before.ashirwadLightIntensity, 0);

  const touchStart = calculateAshirwadEnvelope(250);
  assert.equal(touchStart.active, true);
  assert(touchStart.charanSparshIntensity > 0.2, 'Charan sparsh must engage rapidly');
  assert(touchStart.flowerShowerIntensity > 0.2, 'Flower shower must begin quickly');

  const peak = calculateAshirwadEnvelope(1600);
  assert.equal(peak.active, true);
  assert(peak.charanSparshIntensity > 0.9, 'Charan sparsh at full grace mid-ceremony');
  assert(peak.ashirwadLightIntensity > 0.9, 'Ashirwad beam at full radiance mid-ceremony');
  assert(peak.flowerShowerIntensity > 0.9, 'Flower shower at full richness mid-ceremony');

  const fading = calculateAshirwadEnvelope(3400);
  assert.equal(fading.active, true);
  assert(fading.ashirwadLightIntensity < 0.25, 'Ashirwad beam fades softly near completion');

  const done = calculateAshirwadEnvelope(ASHIRWAD_CEREMONY_DURATION_MS);
  assert.equal(done.active, false);
  assert.equal(done.progress, 1);
  assert.equal(done.ashirwadLightIntensity, 0);
  assert.equal(done.flowerShowerIntensity, 0);
});

test('ashirwadCeremonyUtils: Multi-origin flower shower spawns petals from top, left, right, and palm aura', () => {
  const mobilePetals = generateEverywherePetals(true);
  const desktopPetals = generateEverywherePetals(false);

  assert(mobilePetals.length >= 40 && mobilePetals.length <= 56, 'Mobile budget keeps smooth 60fps');
  assert(desktopPetals.length > mobilePetals.length, 'Desktop gets richer particle count');

  for (const list of [mobilePetals, desktopPetals]) {
    const origins = new Set(list.map((p) => p.origin));
    assert(origins.has('top'), 'Includes overhead Torana rain');
    assert(origins.has('left'), 'Includes left sanctuary sweep');
    assert(origins.has('right'), 'Includes right sanctuary sweep');
    assert(origins.has('handAura'), 'Includes radiant palm burst');
  }

  const motes = generateAshishMotes(true);
  assert(motes.length >= 16, 'Golden ashish motes travel along light cone');
});
