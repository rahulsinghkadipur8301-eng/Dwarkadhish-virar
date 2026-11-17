import { useEffect, useLayoutEffect, useRef, useState, RefObject } from 'react';
import {
  attemptSafeVideoPlay,
  releaseVideoDecoderMemory,
  resolveViewportPlaybackAction,
  shouldReleaseVideoOnViewportExit,
  subscribeAutoplayUnlock,
  syncVideoAutoplayAttributes,
} from '../utils/videoAutoplayUtils';

export interface UseViewportVideoOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef?: RefObject<HTMLElement | null>;
  rootRef?: RefObject<HTMLElement | null>;
  muted: boolean;
  enabled?: boolean;
  userPaused?: boolean;
  releaseSrcOnOutOfView?: boolean;
  rootMargin?: string;
  threshold?: number;
  initialInView?: boolean;
  watchKey?: string | number;
  onFallbackMuted?: () => void;
  onOutOfView?: () => void;
}

/**
 * Manages mobile & desktop inline looping autoplay for any `<video>` element:
 * - Mirrors `muted`, `defaultMuted`, `autoplay`, `loop`, `playsinline`, and `webkit-playsinline`
 *   synchronously to DOM attributes via `useLayoutEffect`
 * - Uses `IntersectionObserver` to play when inside viewport and pause when scrolled off-screen
 * - Optionally force-resets `src` and invokes `load()` (`releaseSrcOnOutOfView`) on viewport exit
 *   and unmount so mobile browsers reclaim hardware video decoders immediately
 * - Invokes `onOutOfView` when scrolled out of view so callers can silence unmuted background audio
 */
export function useViewportVideo({
  videoRef,
  containerRef,
  rootRef,
  muted,
  enabled = true,
  userPaused = false,
  releaseSrcOnOutOfView = false,
  rootMargin = '120px 0px',
  threshold = 0.02,
  initialInView = false,
  watchKey,
  onFallbackMuted,
  onOutOfView,
}: UseViewportVideoOptions): boolean {
  const [isInView, setIsInView] = useState(initialInView);
  const onOutOfViewRef = useRef(onOutOfView);
  const prevInViewRef = useRef(initialInView);
  const mutedRef = useRef(muted);
  const releaseRef = useRef(releaseSrcOnOutOfView);

  onOutOfViewRef.current = onOutOfView;
  mutedRef.current = muted;
  releaseRef.current = releaseSrcOnOutOfView;

  // Apply autoplay DOM attributes synchronously before paint whenever mounted/updated
  useLayoutEffect(() => {
    syncVideoAutoplayAttributes(videoRef.current, { muted, loop: true });
  }, [videoRef, muted, watchKey]);

  // Observe container (or video element itself) against scroll container or viewport
  useEffect(() => {
    if (!enabled) {
      setIsInView(false);
      prevInViewRef.current = false;
      if (releaseRef.current) {
        releaseVideoDecoderMemory(videoRef.current);
      } else {
        videoRef.current?.pause();
      }
      return;
    }

    const target = containerRef?.current ?? videoRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      prevInViewRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const nextInView = entry.isIntersecting;
          if (!nextInView) {
            if (prevInViewRef.current || !mutedRef.current) {
              onOutOfViewRef.current?.();
            }
            if (shouldReleaseVideoOnViewportExit(nextInView, releaseRef.current)) {
              releaseVideoDecoderMemory(videoRef.current);
            } else {
              videoRef.current?.pause();
            }
          }
          prevInViewRef.current = nextInView;
          setIsInView(nextInView);
        }
      },
      {
        root: rootRef?.current ?? null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [containerRef, videoRef, rootRef, enabled, rootMargin, threshold, watchKey]);

  // Ensure unmount releases decoder memory when memory management is enabled
  useEffect(() => {
    return () => {
      if (releaseRef.current) {
        releaseVideoDecoderMemory(videoRef.current);
      } else {
        videoRef.current?.pause();
      }
    };
  }, [videoRef]);

  // Play or pause strictly based on IntersectionObserver visibility, user pause state, and tab state
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    syncVideoAutoplayAttributes(vid, { muted, loop: true });

    const action = resolveViewportPlaybackAction({
      isInView,
      enabled,
      userPaused,
      documentHidden: typeof document !== 'undefined' && document.hidden,
    });

    if (action === 'pause') {
      if (releaseSrcOnOutOfView && (!isInView || !enabled)) {
        releaseVideoDecoderMemory(vid);
      } else {
        vid.pause();
      }
      const preventResumeWhileOffscreen = () => {
        vid.pause();
      };
      vid.addEventListener('play', preventResumeWhileOffscreen);
      return () => {
        vid.removeEventListener('play', preventResumeWhileOffscreen);
      };
    }

    let cancelled = false;
    const tryPlay = async () => {
      if (cancelled || (typeof document !== 'undefined' && document.hidden)) return;
      if (!vid.paused && vid.muted === muted) {
        syncVideoAutoplayAttributes(vid, { muted, loop: true });
        return;
      }
      const result = await attemptSafeVideoPlay(vid, { muted, loop: true });
      if (!cancelled && result.fellBackToMuted && !muted) {
        onFallbackMuted?.();
      }
    };

    tryPlay();

    const onVisibilityChange = () => {
      if (document.hidden) {
        vid.pause();
        if (!mutedRef.current) {
          onOutOfViewRef.current?.();
        }
      } else {
        tryPlay();
      }
    };

    vid.addEventListener('loadedmetadata', tryPlay);
    vid.addEventListener('loadeddata', tryPlay);
    vid.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const unsubscribeUnlock = subscribeAutoplayUnlock(tryPlay);

    return () => {
      cancelled = true;
      vid.removeEventListener('loadedmetadata', tryPlay);
      vid.removeEventListener('loadeddata', tryPlay);
      vid.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      unsubscribeUnlock();
    };
  }, [videoRef, muted, enabled, userPaused, releaseSrcOnOutOfView, isInView, watchKey, onFallbackMuted]);

  return isInView;
}
