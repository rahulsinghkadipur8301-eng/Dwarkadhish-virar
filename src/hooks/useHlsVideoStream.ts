import { useEffect, useRef, useState, RefObject } from 'react';
import type HlsType from 'hls.js';
import {
  HLS_STALL_FALLBACK_TIMEOUT_MS,
  resolveHlsInitialBandwidthEstimate,
  resolveHlsPlayerConfig,
  selectStreamingPlaybackMode,
  shouldPreloadHlsModule,
  StreamingPlaybackMode,
} from '../utils/hlsStreamingUtils';

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
}

let cachedHlsPromise: Promise<typeof HlsType> | null = null;
let cachedHlsCtor: typeof HlsType | null = null;

/**
 * Detects whether the current browser natively supports Apple HLS playback
 * (all iOS browsers via WebKit + macOS Safari).
 */
export function supportsNativeAppleHls(videoEl?: HTMLVideoElement | null): boolean {
  if (typeof document === 'undefined') return false;
  const probe = videoEl ?? document.createElement('video');
  if (typeof probe.canPlayType !== 'function') return false;
  return Boolean(
    probe.canPlayType('application/vnd.apple.mpegurl') ||
      probe.canPlayType('application/x-mpegURL')
  );
}

/**
 * Lazy-loads the `hls.js` runtime once off the initial section render critical path,
 * skipping completely on browsers with native Apple HLS support.
 */
export function preloadHlsModule(): Promise<typeof HlsType | null> {
  if (!shouldPreloadHlsModule(supportsNativeAppleHls())) {
    return Promise.resolve(null);
  }
  if (!cachedHlsPromise) {
    cachedHlsPromise = import('hls.js').then((mod) => {
      cachedHlsCtor = mod.default;
      return mod.default;
    });
  }
  return cachedHlsPromise;
}

function readNetworkHints(): {
  effectiveType?: string;
  downlinkMbps?: number;
  saveData: boolean;
  isMobileViewport: boolean;
} {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { saveData: false, isMobileViewport: false };
  }
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  return {
    effectiveType: conn?.effectiveType,
    downlinkMbps: conn?.downlink,
    saveData: Boolean(conn?.saveData),
    isMobileViewport: window.innerWidth < 768,
  };
}

export interface UseHlsVideoStreamOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  hlsSrc?: string;
  fallbackSrc: string;
  shouldLoad: boolean;
  isInView: boolean;
  enabled?: boolean;
  startPosition?: number;
  streamKey?: string | number;
  onStreamReady?: () => void;
}

export type StreamAttachStatus = 'idle' | StreamingPlaybackMode;

/**
 * Attaches adaptive bitrate HLS streaming:
 * - iOS/Safari/WebKit: native hardware Apple HLS directly (no JS transmuxing or ManagedMediaSource stalls)
 * - Chromium/Firefox/Android: adaptive `hls.js` with network-tier bitrate & buffer limits
 * - Automatic MP4 fallback on fatal errors OR if no frame decodes within `HLS_STALL_FALLBACK_TIMEOUT_MS`
 * - Zero pipeline rebuilds when `startPosition` props fluctuate across renders
 */
export function useHlsVideoStream({
  videoRef,
  hlsSrc,
  fallbackSrc,
  shouldLoad,
  isInView,
  enabled = true,
  startPosition,
  streamKey,
  onStreamReady,
}: UseHlsVideoStreamOptions): StreamAttachStatus {
  const [streamStatus, setStreamStatus] = useState<StreamAttachStatus>('idle');
  const hlsRef = useRef<HlsType | null>(null);
  const onStreamReadyRef = useRef(onStreamReady);
  const isInViewRef = useRef(isInView);
  const enabledRef = useRef(enabled);
  const startPositionRef = useRef(startPosition);

  onStreamReadyRef.current = onStreamReady;
  isInViewRef.current = isInView;
  enabledRef.current = enabled;
  startPositionRef.current = startPosition;

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (!shouldLoad) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (vid.getAttribute('src')) {
        vid.removeAttribute('src');
        vid.load();
      }
      setStreamStatus('idle');
      return;
    }

    let cancelled = false;
    let cleanupConnectionListener: (() => void) | null = null;
    let cleanupNativeErrorListener: (() => void) | null = null;
    let stallTimer: number | null = null;
    let localHls: HlsType | null = null;
    let fellBackToMp4 = false;

    const clearStallTimer = () => {
      if (stallTimer !== null) {
        window.clearTimeout(stallTimer);
        stallTimer = null;
      }
    };

    const activateMp4Fallback = () => {
      if (cancelled || fellBackToMp4) return;
      fellBackToMp4 = true;
      clearStallTimer();
      cleanupNativeErrorListener?.();
      cleanupNativeErrorListener = null;

      if (localHls) {
        if (hlsRef.current === localHls) {
          hlsRef.current = null;
        }
        localHls.destroy();
        localHls = null;
      }

      const target = videoRef.current;
      if (target && target.getAttribute('src') !== fallbackSrc) {
        target.src = fallbackSrc;
        target.load();
      }
      setStreamStatus('mp4-fallback');
      onStreamReadyRef.current?.();
    };

    const armStallWatchdog = () => {
      clearStallTimer();
      if (!isInViewRef.current || !enabledRef.current) return;
      stallTimer = window.setTimeout(() => {
        stallTimer = null;
        const target = videoRef.current;
        if (
          !cancelled &&
          !fellBackToMp4 &&
          target &&
          target.readyState < 2 &&
          isInViewRef.current &&
          enabledRef.current
        ) {
          activateMp4Fallback();
        }
      }, HLS_STALL_FALLBACK_TIMEOUT_MS);
    };

    const attachNativeHls = (targetVideo: HTMLVideoElement) => {
      if (cancelled) return;
      if (targetVideo.getAttribute('src') !== hlsSrc && hlsSrc) {
        targetVideo.src = hlsSrc;
      }
      const onNativeLoaded = () => clearStallTimer();
      const onNativeError = () => activateMp4Fallback();
      targetVideo.addEventListener('loadeddata', onNativeLoaded, { once: true });
      targetVideo.addEventListener('canplay', onNativeLoaded, { once: true });
      targetVideo.addEventListener('error', onNativeError, { once: true });
      cleanupNativeErrorListener = () => {
        targetVideo.removeEventListener('loadeddata', onNativeLoaded);
        targetVideo.removeEventListener('canplay', onNativeLoaded);
        targetVideo.removeEventListener('error', onNativeError);
      };
      armStallWatchdog();
      setStreamStatus('hls-native');
      onStreamReadyRef.current?.();
    };

    if (!hlsSrc) {
      activateMp4Fallback();
      return () => {
        cancelled = true;
        clearStallTimer();
      };
    }

    const nativeHlsSupported = supportsNativeAppleHls(vid);
    const fastMode = selectStreamingPlaybackMode({
      hasHlsSource: true,
      hlsJsSupported: true,
      nativeHlsSupported,
    });

    // Fast hardware path for iOS/macOS Safari: bypass hls.js and ManagedMediaSource completely
    if (fastMode === 'hls-native') {
      attachNativeHls(vid);
      return () => {
        cancelled = true;
        clearStallTimer();
        cleanupNativeErrorListener?.();
      };
    }

    const attachWithHls = (Hls: typeof HlsType | null) => {
      if (cancelled || !videoRef.current) return;
      const targetVideo = videoRef.current;

      if (!Hls) {
        if (nativeHlsSupported) {
          attachNativeHls(targetVideo);
        } else {
          activateMp4Fallback();
        }
        return;
      }

      const hints = readNetworkHints();
      const initialStartPos = startPositionRef.current;
      const mode = selectStreamingPlaybackMode({
        hasHlsSource: Boolean(hlsSrc),
        hlsJsSupported: Hls.isSupported(),
        nativeHlsSupported,
      });

      if (mode === 'hls-js') {
        const config = resolveHlsPlayerConfig({ ...hints, startPosition: initialStartPos });
        const initialLoadPos =
          typeof initialStartPos === 'number' && initialStartPos > 0.5 ? initialStartPos : -1;
        const hls = new Hls({
          ...config,
          autoStartLoad: isInViewRef.current && enabledRef.current,
        });
        localHls = hls;
        hlsRef.current = hls;

        const onDecodedFrame = () => clearStallTimer();
        targetVideo.addEventListener('loadeddata', onDecodedFrame, { once: true });
        targetVideo.addEventListener('canplay', onDecodedFrame, { once: true });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (cancelled || fellBackToMp4) return;
          if (isInViewRef.current && enabledRef.current) {
            hls.startLoad(initialLoadPos);
            armStallWatchdog();
          } else {
            hls.stopLoad();
          }
          if (hints.isMobileViewport && !hints.saveData) {
            hls.nextLevel = -1;
          }
          setStreamStatus('hls-js');
          onStreamReadyRef.current?.();
        });

        let recoveredMediaError = false;
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (cancelled || !data.fatal || fellBackToMp4) return;
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !recoveredMediaError) {
            recoveredMediaError = true;
            hls.recoverMediaError();
            return;
          }
          activateMp4Fallback();
        });

        armStallWatchdog();
        hls.loadSource(hlsSrc);
        hls.attachMedia(targetVideo);
        setStreamStatus('hls-js');

        const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
        const handleConnectionChange = () => {
          const latestHints = readNetworkHints();
          hls.bandwidthEstimate = resolveHlsInitialBandwidthEstimate(latestHints);
          if (
            latestHints.saveData ||
            latestHints.effectiveType === '2g' ||
            latestHints.effectiveType === 'slow-2g'
          ) {
            hls.nextLevel = 0;
          } else {
            hls.nextLevel = -1;
          }
        };
        conn?.addEventListener('change', handleConnectionChange);
        cleanupConnectionListener = () => {
          conn?.removeEventListener('change', handleConnectionChange);
          targetVideo.removeEventListener('loadeddata', onDecodedFrame);
          targetVideo.removeEventListener('canplay', onDecodedFrame);
        };
        return;
      }

      if (mode === 'hls-native') {
        attachNativeHls(targetVideo);
        return;
      }

      activateMp4Fallback();
    };

    if (cachedHlsCtor) {
      attachWithHls(cachedHlsCtor);
    } else {
      preloadHlsModule()
        .then(attachWithHls)
        .catch(() => {
          if (!cancelled) activateMp4Fallback();
        });
    }

    return () => {
      cancelled = true;
      clearStallTimer();
      cleanupConnectionListener?.();
      cleanupNativeErrorListener?.();
      if (localHls) {
        if (hlsRef.current === localHls) {
          hlsRef.current = null;
        }
        localHls.destroy();
      }
    };
  }, [videoRef, hlsSrc, fallbackSrc, shouldLoad, streamKey]);

  // Pause background HLS segment downloads immediately when off-screen or yielded to lightbox
  useEffect(() => {
    const hls = hlsRef.current;
    if (!hls || !shouldLoad) return;

    if (isInView && enabled) {
      hls.startLoad(-1);
    } else {
      hls.stopLoad();
    }
  }, [shouldLoad, isInView, enabled]);

  return streamStatus;
}
