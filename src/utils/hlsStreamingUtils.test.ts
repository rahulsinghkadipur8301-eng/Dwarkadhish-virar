import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMobileStreamStaggerMs,
  isDecodedVideoFrameVisible,
  resolveHlsInitialBandwidthEstimate,
  resolveHlsLoadProgress,
  resolveHlsPlayerConfig,
  resolveLightboxMediaDuration,
  selectStreamingPlaybackMode,
  shouldLoadVideoSource,
  shouldPauseGalleryCardOnPopup,
  shouldPreloadHlsModule,
  shouldShowVideoLoaderOverlay,
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

test('selectStreamingPlaybackMode: prioritizes hardware native Apple HLS (avoiding iOS ManagedMediaSource stalls), then hls.js ABR, then MP4 fallback', () => {
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: true, hlsJsSupported: true, nativeHlsSupported: true }),
    'hls-native'
  );
  assert.equal(
    selectStreamingPlaybackMode({
      hasHlsSource: true,
      hlsJsSupported: true,
      nativeHlsSupported: true,
      preferNativeHls: false,
    }),
    'hls-js'
  );
  assert.equal(
    selectStreamingPlaybackMode({ hasHlsSource: true, hlsJsSupported: true, nativeHlsSupported: false }),
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
  assert.equal(shouldPreloadHlsModule(true), false);
  assert.equal(shouldPreloadHlsModule(false), true);
});

test('isDecodedVideoFrameVisible & resolveLightboxMediaDuration: prevent black boxes and stale durations', () => {
  assert.equal(isDecodedVideoFrameVisible(0, false), false);
  assert.equal(isDecodedVideoFrameVisible(1, false), false);
  assert.equal(isDecodedVideoFrameVisible(2, false), true);
  assert.equal(isDecodedVideoFrameVisible(4, false), true);
  assert.equal(isDecodedVideoFrameVisible(4, true), false);

  assert.deepEqual(resolveLightboxMediaDuration(Number.NaN), { duration: 0, isKnown: false });
  assert.deepEqual(resolveLightboxMediaDuration(0), { duration: 0, isKnown: false });
  assert.deepEqual(resolveLightboxMediaDuration(24.7), { duration: 24.7, isKnown: true });
});

test('resolveHlsLoadProgress & shouldShowVideoLoaderOverlay: surface subtle fetch feedback during manifest/segment/buffering stages', () => {
  assert.deepEqual(resolveHlsLoadProgress('idle'), {
    phase: 'idle',
    progressPct: 0,
    isFetching: false,
  });
  assert.deepEqual(resolveHlsLoadProgress('manifest'), {
    phase: 'manifest',
    progressPct: 24,
    isFetching: true,
  });
  assert.deepEqual(resolveHlsLoadProgress('segments', 1, 3), {
    phase: 'segments',
    progressPct: 54,
    isFetching: true,
  });
  assert.deepEqual(resolveHlsLoadProgress('segments', 3, 3), {
    phase: 'segments',
    progressPct: 86,
    isFetching: true,
  });
  assert.deepEqual(resolveHlsLoadProgress('ready'), {
    phase: 'ready',
    progressPct: 100,
    isFetching: false,
  });

  assert.equal(
    shouldShowVideoLoaderOverlay({ shouldLoad: false, hasDecodedFrame: false, hasError: false }),
    false
  );
  assert.equal(
    shouldShowVideoLoaderOverlay({
      shouldLoad: true,
      hasDecodedFrame: false,
      hasError: false,
      isFetching: true,
    }),
    true
  );
  assert.equal(
    shouldShowVideoLoaderOverlay({
      shouldLoad: true,
      hasDecodedFrame: true,
      hasError: false,
      isFetching: false,
    }),
    false
  );
  assert.equal(
    shouldShowVideoLoaderOverlay({
      shouldLoad: true,
      hasDecodedFrame: true,
      hasError: false,
      isBuffering: true,
    }),
    true
  );
  assert.equal(
    shouldShowVideoLoaderOverlay({
      shouldLoad: true,
      hasDecodedFrame: false,
      hasError: true,
      isFetching: true,
    }),
    false
  );
});

