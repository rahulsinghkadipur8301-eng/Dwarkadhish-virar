import { useEffect, useLayoutEffect, useRef, useState, RefObject } from 'react';
import {
  attemptSafeVideoPlay,
  resolveViewportPlaybackAction,
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
 * - Invokes `onOutOfView` when scrolled out of view so callers can silence unmuted background audio
 * - Retries on `loadeddata`, `canplay`, `visibilitychange`, and first touch/pointer gesture
 */
export function useViewportVideo({
  videoRef,
  containerRef,
  rootRef,
  muted,
  enabled = true,
  userPaused = false,
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

  onOutOfViewRef.current = onOutOfView;
  mutedRef.current = muted;

  // Apply autoplay DOM attributes synchronously before paint whenever mounted/updated
  useLayoutEffect(() => {
    syncVideoAutoplayAttributes(videoRef.current, { muted, loop: true });
  }, [videoRef, muted, watchKey]);

  // Observe container (or video element itself) against scroll container or viewport
  useEffect(() => {
    if (!enabled) {
      setIsInView(false);
      prevInViewRef.current = false;
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
          if (!nextInView && (prevInViewRef.current || !mutedRef.current)) {
            videoRef.current?.pause();
            onOutOfViewRef.current?.();
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
      vid.pause();
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

    vid.addEventListener('loadeddata', tryPlay);
    vid.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const unsubscribeUnlock = subscribeAutoplayUnlock(tryPlay);

    return () => {
      cancelled = true;
      vid.removeEventListener('loadeddata', tryPlay);
      vid.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      unsubscribeUnlock();
    };
  }, [videoRef, muted, enabled, userPaused, isInView, watchKey, onFallbackMuted]);

  return isInView;
}
