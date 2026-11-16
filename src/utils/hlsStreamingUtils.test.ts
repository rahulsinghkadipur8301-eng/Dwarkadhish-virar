import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveHlsInitialBandwidthEstimate,
  resolveHlsPlayerConfig,
  selectStreamingPlaybackMode,
  shouldLoadVideoSource,
} from './hlsStreamingUtils.ts';

test('resolveHlsInitialBandwidthEstimate: scales initial bitrate target based on network speed and Save-Data', () => {
  assert.equal(resolveHlsInitialBandwidthEstimate({ saveData: true, isMobileViewport: false }), 350_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '2g' }), 350_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '3g' }), 650_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '4g', isMobileViewport: true }), 850_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ effectiveType: '4g', isMobileViewport: false }), 1_450_000);
  assert.equal(resolveHlsInitialBandwidthEstimate({ downlinkMbps: 1.2, isMobileViewport: true }), 900_000);
});

test('resolveHlsPlayerConfig: enables ABR auto-level, capLevelToPlayerSize, and tighter mobile buffers', () => {
  const mobileCfg = resolveHlsPlayerConfig({ effectiveType: '3g', isMobileViewport: true });
  assert.equal(mobileCfg.startLevel, -1);
  assert.equal(mobileCfg.capLevelToPlayerSize, true);
  assert.equal(mobileCfg.abrEwmaDefaultEstimate, 650_000);
  assert.equal(mobileCfg.maxBufferLength, 10);

  const desktopCfg = resolveHlsPlayerConfig({ effectiveType: '4g', isMobileViewport: false });
  assert.equal(desktopCfg.maxBufferLength, 18);
  assert.equal(desktopCfg.startFragPrefetch, true);
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
