import { useEffect, useRef, useState, RefObject } from 'react';
import type HlsType from 'hls.js';
import {
  resolveHlsInitialBandwidthEstimate,
  resolveHlsPlayerConfig,
  selectStreamingPlaybackMode,
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
 * Lazy-loads the `hls.js` runtime once off the initial section render critical path
 * so Shrine Archive UI cards and posters paint immediately on mobile devices.
 */
export function preloadHlsModule(): Promise<typeof HlsType> {
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
 * Attaches adaptive bitrate HLS streaming (`hls.js` ABR or native Apple HLS,
 * with clean MP4 fallback) only when `shouldLoad` becomes true (viewport entry).
 * Dynamically imports `hls.js` so section UI rendering is never blocked on mobile,
 * disables expensive Web Worker spawning on mobile viewports, and automatically
 * stops segment downloads when off-screen or yielded to the lightbox.
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
  onStreamReadyRef.current = onStreamReady;
  isInViewRef.current = isInView;
  enabledRef.current = enabled;

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
    let localHls: HlsType | null = null;

    const nativeHlsSupported = Boolean(
      typeof vid.canPlayType === 'function' &&
        (vid.canPlayType('application/vnd.apple.mpegurl') ||
          vid.canPlayType('application/x-mpegURL'))
    );

    // Fast path for native Apple HLS (iOS Safari) without downloading hls.js
    if (!hlsSrc) {
      if (vid.getAttribute('src') !== fallbackSrc) {
        vid.src = fallbackSrc;
      }
      setStreamStatus('mp4-fallback');
      onStreamReadyRef.current?.();
      return;
    }

    const mseSupported =
      typeof window !== 'undefined' &&
      ('MediaSource' in window || 'ManagedMediaSource' in window);

    if (!mseSupported && nativeHlsSupported) {
      if (vid.getAttribute('src') !== hlsSrc) {
        vid.src = hlsSrc;
      }
      setStreamStatus('hls-native');
      onStreamReadyRef.current?.();
      return;
    }

    const attachWithHls = (Hls: typeof HlsType) => {
      if (cancelled || !videoRef.current) return;
      const targetVideo = videoRef.current;
      const hints = readNetworkHints();
      const mode = selectStreamingPlaybackMode({
        hasHlsSource: Boolean(hlsSrc),
        hlsJsSupported: Hls.isSupported(),
        nativeHlsSupported,
      });

      if (mode === 'hls-js') {
        const config = resolveHlsPlayerConfig({ ...hints, startPosition });
        const initialLoadPos =
          typeof startPosition === 'number' && startPosition > 0.5 ? startPosition : -1;
        const hls = new Hls({
          ...config,
          autoStartLoad: isInViewRef.current && enabledRef.current,
        });
        localHls = hls;
        hlsRef.current = hls;

        const activateMp4Fallback = () => {
          if (cancelled) return;
          if (hlsRef.current === hls) {
            hls.destroy();
            hlsRef.current = null;
          }
          if (videoRef.current && videoRef.current.getAttribute('src') !== fallbackSrc) {
            videoRef.current.src = fallbackSrc;
          }
          setStreamStatus('mp4-fallback');
          onStreamReadyRef.current?.();
        };

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (cancelled) return;
          if (isInViewRef.current && enabledRef.current) {
            hls.startLoad(initialLoadPos);
          } else {
            hls.stopLoad();
          }
          // Once startup tier begins playing on mobile, enable automatic ABR upgrades
          if (hints.isMobileViewport && !hints.saveData) {
            hls.nextLevel = -1;
          }
          setStreamStatus('hls-js');
          onStreamReadyRef.current?.();
        });

        let recoveredMediaError = false;
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (cancelled || !data.fatal) return;
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !recoveredMediaError) {
            recoveredMediaError = true;
            hls.recoverMediaError();
            return;
          }
          activateMp4Fallback();
        });

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
        cleanupConnectionListener = () => conn?.removeEventListener('change', handleConnectionChange);
        return;
      }

      if (mode === 'hls-native') {
        if (targetVideo.getAttribute('src') !== hlsSrc) {
          targetVideo.src = hlsSrc;
        }
        setStreamStatus('hls-native');
        onStreamReadyRef.current?.();
        return;
      }

      if (targetVideo.getAttribute('src') !== fallbackSrc) {
        targetVideo.src = fallbackSrc;
      }
      setStreamStatus('mp4-fallback');
      onStreamReadyRef.current?.();
    };

    if (cachedHlsCtor) {
      attachWithHls(cachedHlsCtor);
    } else {
      preloadHlsModule()
        .then(attachWithHls)
        .catch(() => {
          if (cancelled || !videoRef.current) return;
          if (videoRef.current.getAttribute('src') !== fallbackSrc) {
            videoRef.current.src = fallbackSrc;
          }
          setStreamStatus('mp4-fallback');
          onStreamReadyRef.current?.();
        });
    }

    return () => {
      cancelled = true;
      cleanupConnectionListener?.();
      if (localHls) {
        if (hlsRef.current === localHls) {
          hlsRef.current = null;
        }
        localHls.destroy();
      }
    };
  }, [videoRef, hlsSrc, fallbackSrc, shouldLoad, startPosition, streamKey]);

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
