import { useCallback, useEffect, useState, RefObject } from 'react';
import {
  MediaLoadState,
  resolveVideoMediaLoadState,
} from '../utils/videoSkeletonUtils';

export interface UseVideoMediaReadyOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  watchKey?: string | number;
}

export interface UseVideoMediaReadyResult {
  loadState: MediaLoadState;
  isReady: boolean;
  onLoadedData: () => void;
  onCanPlay: () => void;
  onPlaying: () => void;
  onError: () => void;
}

/**
 * Tracks video frame readiness (`loading` -> `ready` | `error`) for an HTMLVideoElement
 * so content-aware skeletons match exact 9:16 card bounds until first frame paints.
 */
export function useVideoMediaReady({
  videoRef,
  watchKey,
}: UseVideoMediaReadyOptions): UseVideoMediaReadyResult {
  const [loadState, setLoadState] = useState<MediaLoadState>(() =>
    resolveVideoMediaLoadState(videoRef.current?.readyState ?? 0, false)
  );

  const syncFromElement = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) {
      setLoadState('loading');
      return;
    }
    const hasError = Boolean(vid.error);
    const next = resolveVideoMediaLoadState(vid.readyState, hasError);
    setLoadState((prev) => (prev === next ? prev : next));
  }, [videoRef]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) {
      setLoadState('loading');
      return;
    }

    syncFromElement();

    const handleReady = () => {
      setLoadState('ready');
    };
    const handleError = () => {
      setLoadState('error');
    };
    const handleEmptied = () => {
      syncFromElement();
    };

    vid.addEventListener('loadeddata', handleReady);
    vid.addEventListener('canplay', handleReady);
    vid.addEventListener('playing', handleReady);
    vid.addEventListener('error', handleError);
    vid.addEventListener('emptied', handleEmptied);

    return () => {
      vid.removeEventListener('loadeddata', handleReady);
      vid.removeEventListener('canplay', handleReady);
      vid.removeEventListener('playing', handleReady);
      vid.removeEventListener('error', handleError);
      vid.removeEventListener('emptied', handleEmptied);
    };
  }, [videoRef, watchKey, syncFromElement]);

  const onLoadedData = useCallback(() => setLoadState('ready'), []);
  const onCanPlay = useCallback(() => setLoadState('ready'), []);
  const onPlaying = useCallback(() => setLoadState('ready'), []);
  const onError = useCallback(() => setLoadState('error'), []);

  return {
    loadState,
    isReady: loadState === 'ready',
    onLoadedData,
    onCanPlay,
    onPlaying,
    onError,
  };
}
