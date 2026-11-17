import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clearMicroThumbnailCacheForTests,
  encodeColorGridToBlurDataUri,
  normalizePosterLookupKey,
  POSTER_COLOR_GRIDS,
  resolvePosterBlurThumbnail,
} from './posterThumbnailUtils.ts';

test('normalizePosterLookupKey: strips query params, hashes, and origins cleanly', () => {
  assert.equal(normalizePosterLookupKey('/hls/dwarika-1/poster.webp'), '/hls/dwarika-1/poster.webp');
  assert.equal(
    normalizePosterLookupKey('/hls/dwarika-2/poster.webp?v=42#preview'),
    '/hls/dwarika-2/poster.webp'
  );
  assert.equal(
    normalizePosterLookupKey('https://example.com/assets/story/part_07.webp?token=1'),
    '/assets/story/part_07.webp'
  );
});

test('encodeColorGridToBlurDataUri: generates compact base64 blurred SVG data URI under 1.5KB', () => {
  const uri = encodeColorGridToBlurDataUri(POSTER_COLOR_GRIDS['/hls/dwarika-1/poster.webp']);
  assert.ok(uri.startsWith('data:image/svg+xml;base64,'));
  assert.ok(uri.length < 1500, `Expected compact micro data URI, got ${uri.length} bytes`);

  const decodedSvg = Buffer.from(uri.slice('data:image/svg+xml;base64,'.length), 'base64').toString(
    'utf8'
  );
  assert.ok(decodedSvg.includes('feGaussianBlur'));
  assert.ok(decodedSvg.includes('#9ba4a3'));
  assert.ok(decodedSvg.includes('#742e3f'));
});

test('resolvePosterBlurThumbnail: provides distinct scene-matched base64 placeholders for gallery & story posters', () => {
  clearMicroThumbnailCacheForTests();
  assert.equal(resolvePosterBlurThumbnail(undefined), undefined);

  const diwali = resolvePosterBlurThumbnail('/hls/dwarika-1/poster.webp');
  const devi = resolvePosterBlurThumbnail('/hls/dwarika-2/poster.webp?cache=1');
  const part1 = resolvePosterBlurThumbnail('/assets/story/part_01.webp');
  const fallback = resolvePosterBlurThumbnail('/assets/unknown-frame.webp');

  assert.ok(diwali?.startsWith('data:image/svg+xml;base64,'));
  assert.ok(devi?.startsWith('data:image/svg+xml;base64,'));
  assert.ok(part1?.startsWith('data:image/svg+xml;base64,'));
  assert.ok(fallback?.startsWith('data:image/svg+xml;base64,'));
  assert.notEqual(diwali, devi);
  assert.notEqual(diwali, part1);
  assert.equal(Object.keys(POSTER_COLOR_GRIDS).length, 18);
});
