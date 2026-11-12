import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCardTiltAndLight, getCardTransformString } from './motionUtils';

test('calculateCardTiltAndLight handles center coordinates correctly', () => {
  const rect = { left: 100, top: 100, width: 400, height: 600 };
  const result = calculateCardTiltAndLight(rect, 300, 400, 2.5);

  assert.equal(result.xPercent, 50);
  assert.equal(result.yPercent, 50);
  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
  assert.equal(result.translateZ, 4);
});

test('calculateCardTiltAndLight clamps out-of-bounds pointer correctly', () => {
  const rect = { left: 50, top: 50, width: 200, height: 200 };
  // Mouse way off to the top-left
  const topLeft = calculateCardTiltAndLight(rect, 0, 0, 3.0);
  assert.equal(topLeft.xPercent, 0);
  assert.equal(topLeft.yPercent, 0);
  assert.equal(topLeft.rotateX, 3.0);
  assert.equal(topLeft.rotateY, -3.0);

  // Mouse way off to the bottom-right
  const bottomRight = calculateCardTiltAndLight(rect, 500, 500, 3.0);
  assert.equal(bottomRight.xPercent, 100);
  assert.equal(bottomRight.yPercent, 100);
  assert.equal(bottomRight.rotateX, -3.0);
  assert.equal(bottomRight.rotateY, 3.0);
});

test('calculateCardTiltAndLight handles zero or negative dimensions safely', () => {
  const rect = { left: 0, top: 0, width: 0, height: 0 };
  const result = calculateCardTiltAndLight(rect, 100, 100);
  assert.equal(result.xPercent, 50);
  assert.equal(result.yPercent, 50);
  assert.equal(result.rotateX, 0);
  assert.equal(result.rotateY, 0);
});

test('getCardTransformString returns neutral when inactive', () => {
  const str = getCardTransformString({ rotateX: 2, rotateY: -1.5, translateZ: 4 }, false);
  assert.equal(str, 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
});

test('getCardTransformString returns calculated 3D transform when active', () => {
  const str = getCardTransformString({ rotateX: 2.1, rotateY: -1.4, translateZ: 4 }, true);
  assert.equal(str, 'perspective(1000px) rotateX(2.1deg) rotateY(-1.4deg) translateZ(4px)');
});
