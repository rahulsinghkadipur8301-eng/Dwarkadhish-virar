/**
 * Pure adaptive HLS streaming configuration, network-tier bandwidth estimation,
 * poster/frame visibility helpers, and IntersectionObserver-gated video source loading utilities.
 */

export type StreamingPlaybackMode = 'hls-js' | 'hls-native' | 'mp4-fallback';

export interface NetworkBandwidthInput {
  effectiveType?: string;
  downlinkMbps?: number;
  saveData?: boolean;
  isMobileViewport?: boolean;
}

export interface HlsCapabilityInput {
  hasHlsSource: boolean;
  hlsJsSupported: boolean;
  nativeHlsSupported: boolean;
  preferNativeHls?: boolean;
}

export interface AdaptiveHlsConfig {
  enableWorker: boolean;
  lowLatencyMode: boolean;
  startLevel: number;
  startPosition?: number;
  abrEwmaDefaultEstimate: number;
  abrBandWidthFactor: number;
  abrBandWidthUpFactor: number;
  capLevelToPlayerSize: boolean;
  startFragPrefetch: boolean;
  maxBufferLength: number;
  maxMaxBufferLength: number;
  backBufferLength: number;
}

export const HLS_STALL_FALLBACK_TIMEOUT_MS = 4500;

/**
 * Computes conservative initial ABR bandwidth estimate (bps) from browser
 * Network Information hints and viewport form factor so mobile connections start
 * swiftly on the light startup variant (~260kbps) and step up smoothly without stalls.
 */
export function resolveHlsInitialBandwidthEstimate(
  input: NetworkBandwidthInput = {}
): number {
  const { effectiveType, downlinkMbps, saveData = false, isMobileViewport = false } = input;

  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 240_000;
  }
  if (effectiveType === '3g') {
    return 420_000;
  }
  if (typeof downlinkMbps === 'number' && Number.isFinite(downlinkMbps) && downlinkMbps > 0) {
    const measuredBps = Math.round(downlinkMbps * 1_000_000 * 0.7);
    return Math.max(240_000, Math.min(measuredBps, isMobileViewport ? 1_200_000 : 2_200_000));
  }
  return isMobileViewport ? 520_000 : 1_250_000;
}

/**
 * Generates an adaptive hls.js configuration tailored for fast mobile first-frame
 * render (main-thread demux avoiding 4x Web Worker startup overhead, zero upfront
 * multi-frag prefetch contention, compact 4s buffer cap) and HD desktop upgrades.
 */
export function resolveHlsPlayerConfig(
  input: NetworkBandwidthInput & { startPosition?: number } = {}
): AdaptiveHlsConfig {
  const isMobile = Boolean(input.isMobileViewport);
  const saveData = Boolean(input.saveData);
  const hasStartPos =
    typeof input.startPosition === 'number' &&
    Number.isFinite(input.startPosition) &&
    input.startPosition > 0.5;

  return {
    enableWorker: !isMobile, // Avoid spawning 4+ Web Worker threads on mobile devices
    lowLatencyMode: false,
    startLevel: isMobile ? 0 : -1, // Start mobile immediately on fast 280p tier, then ABR steps up
    ...(hasStartPos ? { startPosition: input.startPosition } : {}),
    abrEwmaDefaultEstimate: resolveHlsInitialBandwidthEstimate(input),
    abrBandWidthFactor: 0.85, // Step down swiftly when mobile throughput dips
    abrBandWidthUpFactor: 0.65, // Require steady headroom before upgrading tier
    capLevelToPlayerSize: true,
    startFragPrefetch: !saveData && !isMobile,
    maxBufferLength: saveData ? 3 : isMobile ? 4 : 16,
    maxMaxBufferLength: saveData ? 6 : isMobile ? 8 : 26,
    backBufferLength: isMobile ? 2 : 4,
  };
}

/**
 * Determines staggered stream initialization delay (ms) across visible cards on
 * mobile viewports so parallel pipelines never saturate the main thread in one burst.
 */
export function getMobileStreamStaggerMs(
  cardIndex: number,
  isMobileViewport: boolean
): number {
  if (!isMobileViewport || !Number.isFinite(cardIndex) || cardIndex <= 0) {
    return 0;
  }
  return Math.min(Math.floor(cardIndex), 3) * 110;
}

/**
 * Determines whether a gallery card should pause & stop background segment loading
 * while the lightbox player is open. On mobile, ALL background cards yield to give
 * 100% of hardware video decoders and CPU to the opened player; on desktop, only the
 * inspected card yields so adjacent grid tiles keep playing cleanly.
 */
export function shouldPauseGalleryCardOnPopup(
  cardIndex: number,
  activePopupIndex: number | null,
  isMobileViewport: boolean
): boolean {
  if (activePopupIndex === null) return false;
  if (isMobileViewport) return true;
  return cardIndex === activePopupIndex;
}

/**
 * Determines whether `<video>` source loading should begin.
 * Actual stream/source loading remains dormant until the frame enters the viewport.
 */
export function shouldLoadVideoSource(hasEnteredViewport: boolean): boolean {
  return Boolean(hasEnteredViewport);
}

/**
 * Chooses the optimal playback engine:
 * 1. Native Apple HLS FIRST when supported (iOS/macOS Safari/WebKit hardware AVFoundation),
 *    preventing iOS 17+ `ManagedMediaSource` from stalling 4 concurrent JS hls.js pipelines.
 * 2. MSE-based `hls.js` when native HLS is unavailable (Chrome, Android, Edge, Firefox).
 * 3. MP4 progressive fallback if no HLS source or HLS support exists.
 */
export function selectStreamingPlaybackMode(
  capabilities: HlsCapabilityInput
): StreamingPlaybackMode {
  if (!capabilities.hasHlsSource) {
    return 'mp4-fallback';
  }
  const preferNative = capabilities.preferNativeHls ?? true;
  if (preferNative && capabilities.nativeHlsSupported) {
    return 'hls-native';
  }
  if (capabilities.hlsJsSupported) {
    return 'hls-js';
  }
  if (capabilities.nativeHlsSupported) {
    return 'hls-native';
  }
  return 'mp4-fallback';
}

/**
 * Determines whether the browser needs `hls.js` preloaded asynchronously.
 * Browsers with native Apple HLS support should never download `hls.js`.
 */
export function shouldPreloadHlsModule(nativeHlsSupported: boolean): boolean {
  return !nativeHlsSupported;
}

/**
 * Determines whether the persistent `<img>` poster underlay should remain visible
 * and hide the `<video>` surface until at least one real frame is decoded (`readyState >= 2`),
 * eliminating solid black boxes when `blob:` MediaSource attaches or streams initialize.
 */
export function isDecodedVideoFrameVisible(
  readyState: number,
  hasError: boolean
): boolean {
  return !hasError && Number.isFinite(readyState) && readyState >= 2;
}

/**
 * Resolves metadata duration safely so the scrubber displays known clip duration
 * instead of showing misleading stale values before `loadedmetadata` resolves.
 */
export function resolveLightboxMediaDuration(rawDuration: number): {
  duration: number;
  isKnown: boolean;
} {
  if (Number.isFinite(rawDuration) && rawDuration > 0) {
    return { duration: rawDuration, isKnown: true };
  }
  return { duration: 0, isKnown: false };
}

export type HlsLoadPhase =
  | 'idle'
  | 'manifest'
  | 'segments'
  | 'buffering'
  | 'fallback'
  | 'ready';

export interface HlsLoadProgress {
  phase: HlsLoadPhase;
  progressPct: number;
  isFetching: boolean;
}

export const IDLE_HLS_PROGRESS: HlsLoadProgress = {
  phase: 'idle',
  progressPct: 0,
  isFetching: false,
};

/**
 * Resolves bounded 0..100 progress state for subtle top loading bar & spinner feedback
 * while HLS manifests and initial TS fragments fetch on mobile or throttled links.
 */
export function resolveHlsLoadProgress(
  phase: HlsLoadPhase,
  loadedSegments = 0,
  totalSegments = 3
): HlsLoadProgress {
  switch (phase) {
    case 'idle':
      return IDLE_HLS_PROGRESS;
    case 'manifest':
      return { phase: 'manifest', progressPct: 24, isFetching: true };
    case 'segments': {
      const safeLoaded = Math.max(0, Number.isFinite(loadedSegments) ? loadedSegments : 0);
      const safeTotal = Math.max(1, Number.isFinite(totalSegments) ? totalSegments : 3);
      const ratio = Math.min(1, safeLoaded / safeTotal);
      const pct = Math.min(90, Math.round(38 + ratio * 48));
      return { phase: 'segments', progressPct: pct, isFetching: true };
    }
    case 'buffering':
      return { phase: 'buffering', progressPct: 62, isFetching: true };
    case 'fallback':
      return { phase: 'fallback', progressPct: 48, isFetching: true };
    case 'ready':
      return { phase: 'ready', progressPct: 100, isFetching: false };
  }
}

/**
 * Determines whether the video container should show a subtle loading indicator
 * (initial manifest/segment fetch, pre-frame load, or mid-stream mobile buffering stall).
 */
export function shouldShowVideoLoaderOverlay(input: {
  shouldLoad: boolean;
  hasDecodedFrame: boolean;
  hasError: boolean;
  isFetching?: boolean;
  isBuffering?: boolean;
}): boolean {
  if (input.hasError) return false;
  if (input.isBuffering) return true;
  if (!input.hasDecodedFrame && (input.shouldLoad || input.isFetching)) return true;
  return false;
}

