import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEVOTIONAL_VIDEO_GRID_LAYOUT,
  getSkeletonStaggerDelayMs,
  resolveVideoMediaLoadState,
  shouldShowVideoSkeleton,
} from './videoSkeletonUtils.ts';

test('resolveVideoMediaLoadState: maps readyState and error flags deterministically', () => {
  assert.equal(resolveVideoMediaLoadState(0, false), 'loading');
  assert.equal(resolveVideoMediaLoadState(1, false), 'loading');
  assert.equal(resolveVideoMediaLoadState(2, false), 'ready');
  assert.equal(resolveVideoMediaLoadState(4, false), 'ready');
  assert.equal(resolveVideoMediaLoadState(4, true), 'error');
  assert.equal(resolveVideoMediaLoadState(0, true), 'error');
});

test('shouldShowVideoSkeleton: remains visible while loading or waiting for stream, hides once ready or errored', () => {
  assert.equal(shouldShowVideoSkeleton('loading', false), true);
  assert.equal(shouldShowVideoSkeleton('loading', true), true);
  assert.equal(shouldShowVideoSkeleton('ready', true), false);
  assert.equal(shouldShowVideoSkeleton('ready', false), false);
  assert.equal(shouldShowVideoSkeleton('error', true), false);
});

test('getSkeletonStaggerDelayMs: clamps negative indices and caps stagger for responsive grids', () => {
  assert.equal(getSkeletonStaggerDelayMs(-3), 0);
  assert.equal(getSkeletonStaggerDelayMs(0), 0);
  assert.equal(getSkeletonStaggerDelayMs(2), 180);
  assert.equal(getSkeletonStaggerDelayMs(15), 630);
});

test('DEVOTIONAL_VIDEO_GRID_LAYOUT: locks 9:16 portrait aspect and 2->4 responsive grid columns', () => {
  assert.equal(DEVOTIONAL_VIDEO_GRID_LAYOUT.mobileColumns, 2);
  assert.equal(DEVOTIONAL_VIDEO_GRID_LAYOUT.desktopColumns, 4);
  assert.equal(DEVOTIONAL_VIDEO_GRID_LAYOUT.aspectClass, 'aspect-[9/16]');
  assert.ok(DEVOTIONAL_VIDEO_GRID_LAYOUT.gridClass.includes('grid-cols-2'));
  assert.ok(DEVOTIONAL_VIDEO_GRID_LAYOUT.gridClass.includes('lg:grid-cols-4'));
});
