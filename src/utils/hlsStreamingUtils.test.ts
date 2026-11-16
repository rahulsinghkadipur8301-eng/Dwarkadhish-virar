import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMobileStreamStaggerMs,
  resolveHlsInitialBandwidthEstimate,
  resolveHlsPlayerConfig,
  selectStreamingPlaybackMode,
  shouldLoadVideoSource,
  shouldPauseGalleryCardOnPopup,
} from './hlsStreamingUtils.ts';

test('resolveHlsInitialBandwidthEstimate: scales initial bitrate target based on network speed and Save-Data', () => {
  assert.equal(resolveHlsInitialBandwidthEstimate({ saveData: true, isMobileViewport: false }), 240_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '2g' }), 240_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '3g' }), 420_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '4g', isMobileViewport: true }), 520_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '4g', isMobileViewport: false }), 1_250_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ downlinkMbps: 1.2, isMobileViewport: true }), 840_000);
});

test('resolveHlsPlayerConfig: eliminates mobile worker/prefetch saturation and sets tight mobile buffers', () => {
  const mobileCfg = resolveHlsPlayerConfig({ effectiveType: '3g', isMobileViewport: true, startPosition: 4.5 });
  assert.equal(mobileCfg.enableWorker, false);
  assert.equal(mobileCfg.startLevel, 0);
  assert.equal(mobileCfg.startFragPrefetch, false);
  assert.equal(mobileCfg.startPosition, 4.5);
  assert.equal(mobileCfg.capLevelToPlayerSize, true);
  assert.equal(mobileCfg.abrEwmaDefaultEstimate, 420_000);
  assert.equal(mobileCfg.maxBufferLength, 4);

  const desktopCfg = resolveHlsPlayerConfig({ effectiveType: '4g', isMobileViewport: false });
  assert.equal(desktopCfg.enableWorker, true);
  assert.equal(desktopCfg.startLevel, -1);
  assert.equal(desktopCfg.maxBufferLength, 16);
  assert.equal(desktopCfg.startFragPrefetch, true);
});

test('getMobileStreamStaggerMs & shouldPauseGalleryCardOnPopup: protect mobile decoders cleanly', () => {
  assert.equal(getMobileStreamStaggerMs(0, true), 0);
  assert.equal(getMobileStreamStaggerMs(2, true), 220);
  assert.equal(getMobileStreamStaggerMs(2, false), 0);

  assert.equal(shouldPauseGalleryCardOnPopup(0, null, true), false);
  assert.equal(shouldPauseGalleryCardOnPopup(2, 0, true), true);
  assert.equal(shouldPauseGalleryCardOnPopup(2, 0, false), false);
  assert.equal(shouldPauseGalleryCardOnPopup(0, 0, false), true);
});

test('shouldLoadVideoSource: blocks video source attachment until frame enters viewport', () => {
  assert.equal(shouldLoadVideoSource(false), false);
  assert.equal(shouldLoadVideoSource(true), true);
});

test('selectStreamingPlaybackMode: prioritizes hls.js ABR, then native Safari HLS, then MP4 fallback', () => {
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: true, hlsJsSupported: true, nativeHlsSupported: true }),
    'hls-js'
  );
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: true, hlsJsSupported: false, nativeHlsSupported: true }),
    'hls-native'
  );
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: true, hlsJsSupported: false, nativeHlsSupported: false }),
    'mp4-fallback'
  );
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: false, hlsJsSupported: true, nativeHlsSupported: true }),
    'mp4-fallback'
  );
});
