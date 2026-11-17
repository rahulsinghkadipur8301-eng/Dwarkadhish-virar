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
  isBuffering: boolean;
  onLoadedData: () => void;
  onCanPlay: () => void;
  onPlaying: () => void;
  onWaiting: () => void;
  onError: () => void;
}

/**
 * Tracks video frame readiness (`loading` -> `ready` | `error`) and mid-playback `waiting`
 * buffering transitions for an HTMLVideoElement so content-aware overlays match exact 9:16 bounds.
 */
export function useVideoMediaReady({
  videoRef,
  watchKey,
}: UseVideoMediaReadyOptions): UseVideoMediaReadyResult {
  const [loadState, setLoadState] = useState<MediaLoadState>(() =>
    resolveVideoMediaLoadState(videoRef.current?.readyState ?? 0, false)
  );
  const [isBuffering, setIsBuffering] = useState(false);

  const syncFromElement = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) {
      setLoadState('loading');
      setIsBuffering(false);
      return;
    }
    const hasError = Boolean(vid.error);
    const next = resolveVideoMediaLoadState(vid.readyState, hasError);
    setLoadState((prev) => (prev === next ? prev : next));
    if (next === 'ready' || next === 'error') {
      setIsBuffering(false);
    }
  }, [videoRef]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) {
      setLoadState('loading');
      setIsBuffering(false);
      return;
    }

    syncFromElement();

    const handleReady = () => {
      setLoadState('ready');
      setIsBuffering(false);
    };
    const handleWaiting = () => {
      setIsBuffering(true);
    };
    const handleError = () => {
      setLoadState('error');
      setIsBuffering(false);
    };
    const handleEmptied = () => {
      setIsBuffering(false);
      syncFromElement();
    };

    vid.addEventListener('loadeddata', handleReady);
    vid.addEventListener('canplay', handleReady);
    vid.addEventListener('playing', handleReady);
    vid.addEventListener('waiting', handleWaiting);
    vid.addEventListener('error', handleError);
    vid.addEventListener('emptied', handleEmptied);

    return () => {
      vid.removeEventListener('loadeddata', handleReady);
      vid.removeEventListener('canplay', handleReady);
      vid.removeEventListener('playing', handleReady);
      vid.removeEventListener('waiting', handleWaiting);
      vid.removeEventListener('error', handleError);
      vid.removeEventListener('emptied', handleEmptied);
    };
  }, [videoRef, watchKey, syncFromElement]);

  const onLoadedData = useCallback(() => {
    setLoadState('ready');
    setIsBuffering(false);
  }, []);
  const onCanPlay = useCallback(() => {
    setLoadState('ready');
    setIsBuffering(false);
  }, []);
  const onPlaying = useCallback(() => {
    setLoadState('ready');
    setIsBuffering(false);
  }, []);
  const onWaiting = useCallback(() => {
    setIsBuffering(true);
  }, []);
  const onError = useCallback(() => {
    setLoadState('error');
    setIsBuffering(false);
  }, []);

  return {
    loadState,
    isReady: loadState === 'ready',
    isBuffering,
    onLoadedData,
    onCanPlay,
    onPlaying,
    onWaiting,
    onError,
  };
}

