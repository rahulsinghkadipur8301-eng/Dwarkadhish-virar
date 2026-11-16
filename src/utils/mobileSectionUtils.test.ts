import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  isSectionInitiallyExpandedOnMobile,
  toggleMobileSectionExpanded,
  getMobileSectionStats,
  MobileMinimizableSectionId,
} from './mobileSectionUtils';

test('mobileSectionUtils: all target sections start collapsed on mobile', () => {
  const sections: MobileMinimizableSectionId[] = ['darshan', 'location', 'festivals', 'seva'];
  for (const id of sections) {
    assert.equal(isSectionInitiallyExpandedOnMobile(id), false, `${id} should start collapsed on mobile`);
  }
});

test('mobileSectionUtils: toggleMobileSectionExpanded flips boolean state', () => {
  assert.equal(toggleMobileSectionExpanded(false), true);
  assert.equal(toggleMobileSectionExpanded(true), false);
});

test('mobileSectionUtils: returns accurate domain counts for compact mobile previews', () => {
  const stats = getMobileSectionStats();
  assert.equal(stats.dailyAartiCount, 5);
  assert.equal(stats.festivalCount, 9);
  assert.equal(stats.ekadashiCount, 23);
  assert.equal(stats.sevaCount, 5);
  assert.equal(stats.lowestSevaAmount, 501);
});

test('mobile click-to-explore preservation: desktop visibility classes and Location map buttons remain intact', () => {
  const darshanCode = fs.readFileSync('src/components/DarshanSection.tsx', 'utf-8');
  assert.ok(darshanCode.includes('hidden md:block'), 'DarshanSection desktop table must remain visible on md+');
  assert.ok(darshanCode.includes('darshan-mobile-toggle'), 'DarshanSection must provide mobile explore toggle');

  const locationCode = fs.readFileSync('src/components/TempleLocationSection.tsx', 'utf-8');
  assert.ok(locationCode.includes('getDirections'), 'TempleLocationSection must always display Get Directions button');
  assert.ok(locationCode.includes('openInMaps'), 'TempleLocationSection must always display Open in Google Maps button');
  assert.ok(locationCode.includes('<iframe'), 'TempleLocationSection must always display Google Maps iframe');
  assert.ok(locationCode.includes('location-mobile-toggle'), 'TempleLocationSection must provide mobile details toggle');
  assert.ok(locationCode.includes('hidden md:flex'), 'TempleLocationSection secondary details must show unconditionally on md+');

  const festivalsCode = fs.readFileSync('src/components/FestivalsSection.tsx', 'utf-8');
  assert.ok(festivalsCode.includes('hidden md:block'), 'FestivalsSection grid must remain visible on md+');
  assert.ok(festivalsCode.includes('festivals-mobile-toggle'), 'FestivalsSection must provide mobile explore toggle');

  const sevaCode = fs.readFileSync('src/components/SevaSection.tsx', 'utf-8');
  assert.ok(sevaCode.includes('hidden md:grid'), 'SevaSection grid must remain visible on md+');
  assert.ok(sevaCode.includes('seva-mobile-toggle'), 'SevaSection must provide mobile explore toggle');
});
