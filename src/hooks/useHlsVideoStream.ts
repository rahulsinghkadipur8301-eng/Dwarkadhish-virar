import { useEffect, useRef, useState, RefObject } from 'react';
import Hls from 'hls.js';
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
  streamKey?: string | number;
  onStreamReady?: () => void;
}

export type StreamAttachStatus = 'idle' | StreamingPlaybackMode;

/**
 * Attaches adaptive bitrate HLS streaming (`hls.js` ABR or native Apple HLS,
 * with clean MP4 fallback) only when `shouldLoad` becomes true (viewport entry).
 * Automatically adapts to mobile network speed changes and stops fragment
 * loading whenever a frame leaves the viewport or is yielded to the lightbox.
 */
export function useHlsVideoStream({
  videoRef,
  hlsSrc,
  fallbackSrc,
  shouldLoad,
  isInView,
  enabled = true,
  streamKey,
  onStreamReady,
}: UseHlsVideoStreamOptions): StreamAttachStatus {
  const [streamStatus, setStreamStatus] = useState<StreamAttachStatus>('idle');
  const hlsRef = useRef<Hls | null>(null);
  const onStreamReadyRef = useRef(onStreamReady);
  const isInViewRef = useRef(isInView);
  const enabledRef = useRef(enabled);
  onStreamReadyRef.current = onStreamReady;
  isInViewRef.current = isInView;
  enabledRef.current = enabled;

  // Attach source or HLS pipeline strictly when shouldLoad transitions true
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

    const hints = readNetworkHints();
    const nativeHlsSupported = Boolean(
      typeof vid.canPlayType === 'function' &&
        (vid.canPlayType('application/vnd.apple.mpegurl') ||
          vid.canPlayType('application/x-mpegURL'))
    );

    const mode = selectStreamingPlaybackMode({
      hasHlsSource: Boolean(hlsSrc),
      hlsJsSupported: Hls.isSupported(),
      nativeHlsSupported,
    });

    if (mode === 'hls-js' && hlsSrc) {
      const config = resolveHlsPlayerConfig(hints);
      const hls = new Hls({
        ...config,
        autoStartLoad: isInViewRef.current && enabledRef.current,
      });
      hlsRef.current = hls;

      const activateMp4Fallback = () => {
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
        if (isInViewRef.current && enabledRef.current) {
          hls.startLoad(-1);
        } else {
          hls.stopLoad();
        }
        setStreamStatus('hls-js');
        onStreamReadyRef.current?.();
      });

      let recoveredMediaError = false;
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        if (data.type === Hls.ErrorTypes.MEDIA_ERROR && !recoveredMediaError) {
          recoveredMediaError = true;
          hls.recoverMediaError();
          return;
        }
        // Gracefully switch to direct MP4 stream if HLS manifest/segments fail
        activateMp4Fallback();
      });

      hls.loadSource(hlsSrc);
      hls.attachMedia(vid);
      setStreamStatus('hls-js');

      // Re-tune ABR estimate live if mobile user switches between 3G / 4G / WiFi
      const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
      const handleConnectionChange = () => {
        const latestHints = readNetworkHints();
        hls.bandwidthEstimate = resolveHlsInitialBandwidthEstimate(latestHints);
        if (latestHints.saveData || latestHints.effectiveType === '2g' || latestHints.effectiveType === 'slow-2g') {
          hls.nextLevel = 0; // Drop cleanly to lightest tier on congested cellular
        } else {
          hls.nextLevel = -1; // Restore full adaptive auto-selection
        }
      };
      conn?.addEventListener('change', handleConnectionChange);

      return () => {
        conn?.removeEventListener('change', handleConnectionChange);
        if (hlsRef.current === hls) {
          hlsRef.current = null;
        }
        hls.destroy();
      };
    }

    if (mode === 'hls-native' && hlsSrc) {
      if (vid.getAttribute('src') !== hlsSrc) {
        vid.src = hlsSrc;
      }
      setStreamStatus('hls-native');
      onStreamReadyRef.current?.();
      return;
    }

    if (vid.getAttribute('src') !== fallbackSrc) {
      vid.src = fallbackSrc;
    }
    setStreamStatus('mp4-fallback');
    onStreamReadyRef.current?.();
  }, [videoRef, hlsSrc, fallbackSrc, shouldLoad, streamKey]);

  // Pause background HLS segment downloads when off-screen or yielded to popup
  useEffect(() => {
    const hls = hlsRef.current;
    if (!hls || !shouldLoad) return;

    if (isInView && enabled) {
      hls.startLoad(-1);
    } else {
      hls.stopLoad();
    }
  }, [shouldLoad, isInView, enabled, streamStatus]);

  return streamStatus;
}
