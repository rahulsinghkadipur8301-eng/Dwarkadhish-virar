/**
 * Pure adaptive HLS streaming configuration, network-tier bandwidth estimation,
 * and IntersectionObserver-gated video source loading utilities.
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
}

export interface AdaptiveHlsConfig {
  enableWorker: boolean;
  lowLatencyMode: boolean;
  startLevel: number;
  abrEwmaDefaultEstimate: number;
  abrBandWidthFactor: number;
  abrBandWidthUpFactor: number;
  capLevelToPlayerSize: boolean;
  startFragPrefetch: boolean;
  maxBufferLength: number;
  maxMaxBufferLength: number;
  backBufferLength: number;
}

/**
 * Computes conservative initial ABR bandwidth estimate (bps) from browser
 * Network Information hints and viewport form factor so mobile connections start
 * swiftly on a light variant and scale up seamlessly without initial stalls.
 */
export function resolveHlsInitialBandwidthEstimate(
  input: NetworkBandwidthInput = {}
): number {
  const { effectiveType, downlinkMbps, saveData = false, isMobileViewport = false } = input;

  if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 350_000;
  }
  if (effectiveType === '3g') {
    return 650_000;
  }
  if (typeof downlinkMbps === 'number' && Number.isFinite(downlinkMbps) && downlinkMbps > 0) {
    const measuredBps = Math.round(downlinkMbps * 1_000_000 * 0.75);
    return Math.max(350_000, Math.min(measuredBps, isMobileViewport ? 1_600_000 : 2_500_000));
  }
  return isMobileViewport ? 850_000 : 1_450_000;
}

/**
 * Generates an adaptive hls.js configuration tailored for mobile cellular stability
 * and smooth desktop HD upgrades.
 */
export function resolveHlsPlayerConfig(
  input: NetworkBandwidthInput = {}
): AdaptiveHlsConfig {
  const isMobile = Boolean(input.isMobileViewport);
  const saveData = Boolean(input.saveData);

  return {
    enableWorker: true,
    lowLatencyMode: false,
    startLevel: -1, // Automatic ABR level selection
    abrEwmaDefaultEstimate: resolveHlsInitialBandwidthEstimate(input),
    abrBandWidthFactor: 0.85, // Switch down rapidly when throughput dips
    abrBandWidthUpFactor: 0.65, // Require steady headroom before stepping up bitrate
    capLevelToPlayerSize: true,
    startFragPrefetch: !saveData,
    maxBufferLength: saveData ? 6 : isMobile ? 10 : 18,
    maxMaxBufferLength: saveData ? 12 : isMobile ? 20 : 30,
    backBufferLength: 4,
  };
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
 * 1. MSE-based hls.js when supported (enables full ABR switching + size capping on Chrome/Edge/Firefox/Android)
 * 2. Native Apple HLS when hls.js MSE is unavailable (iOS Safari)
 * 3. MP4 fallback if no HLS source or HLS support exists
 */
export function selectStreamingPlaybackMode(
  capabilities: HlsCapabilityInput
): StreamingPlaybackMode {
  if (!capabilities.hasHlsSource) {
    return 'mp4-fallback';
  }
  if (capabilities.hlsJsSupported) {
    return 'hls-js';
  }
  if (capabilities.nativeHlsSupported) {
    return 'hls-native';
  }
  return 'mp4-fallback';
}
