/**
 * Pure utilities & DOM synchronization helpers for reliable muted autoplay
 * across mobile browsers (iOS Safari, Android Chrome, WebViews) and desktop.
 */

export interface AutoplaySyncOptions {
  muted: boolean;
  loop?: boolean;
}

/**
 * Synchronizes both DOM attributes and properties required by mobile Safari/Chrome
 * to permit inline autoplay without full-screen hijack or silent autoplay rejection.
 *
 * Background: React does not reliably write the HTML `muted` attribute when
 * `muted={true}` is passed in JSX, which causes strict mobile browsers to inspect
 * the element before property sync and block autoplay.
 */
export function syncVideoAutoplayAttributes(
  video: HTMLVideoElement | null | undefined,
  options: AutoplaySyncOptions
): void {
  if (!video) return;

  const { muted, loop = true } = options;

  video.playsInline = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.loop = loop;
  video.muted = muted;

  if (typeof video.setAttribute === 'function') {
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');
    if (loop) {
      video.setAttribute('loop', '');
    } else if (typeof video.removeAttribute === 'function') {
      video.removeAttribute('loop');
    }
    if (muted) {
      video.setAttribute('muted', '');
    } else if (typeof video.removeAttribute === 'function') {
      video.removeAttribute('muted');
    }
  }
}

export interface ViewportPlaybackState {
  isInView: boolean;
  enabled: boolean;
  userPaused?: boolean;
  documentHidden?: boolean;
}

/**
 * Pure decision helper for IntersectionObserver-driven mobile & desktop playback.
 * Pauses off-screen, disabled, backgrounded, or manually paused videos cleanly.
 */
export function resolveViewportPlaybackAction(
  state: ViewportPlaybackState
): 'play' | 'pause' {
  if (!state.enabled || !state.isInView || state.userPaused || state.documentHidden) {
    return 'pause';
  }
  return 'play';
}

export interface SafePlayResult {
  started: boolean;
  fellBackToMuted: boolean;
}

/**
 * Attempts playback safely without unhandled promise rejections.
 * If unmuted playback is blocked by browser autoplay policy, automatically
 * falls back to muted inline playback so visuals never stall on mobile.
 */
export async function attemptSafeVideoPlay(
  video: HTMLVideoElement | null | undefined,
  options: AutoplaySyncOptions
): Promise<SafePlayResult> {
  if (!video) {
    return { started: false, fellBackToMuted: false };
  }

  syncVideoAutoplayAttributes(video, options);

  // Skip calling play() if no source is attached yet (lazy viewport-gated card)
  const hasSource = Boolean(video.currentSrc || video.getAttribute?.('src') || video.src);
  if (!hasSource) {
    return { started: false, fellBackToMuted: false };
  }

  if (!video.paused) {
    return { started: true, fellBackToMuted: false };
  }

  try {
    await video.play();
    return { started: true, fellBackToMuted: false };
  } catch {
    // If unmuted autoplay was rejected (e.g. mobile browser policy), fall back to muted play
    if (!video.muted) {
      syncVideoAutoplayAttributes(video, { ...options, muted: true });
      try {
        await video.play();
        return { started: true, fellBackToMuted: true };
      } catch {
        return { started: false, fellBackToMuted: true };
      }
    }
    return { started: false, fellBackToMuted: false };
  }
}

/**
 * Determines whether a documentary grid episode card should attach its video stream
 * based on whether it has entered/neared the viewport or is within the initial preload cap.
 */
export function shouldActivateEpisodeStream(
  episodeIndex: number,
  isInViewport: boolean,
  initialConcurrentCap = 4
): boolean {
  if (isInViewport) return true;
  return episodeIndex >= 0 && episodeIndex < initialConcurrentCap;
}

/**
 * Calculates a throttled timeline update (quantized to quarter-seconds)
 * so parent/scrubber state doesn't re-render excessively during playback.
 */
export function quantizeVideoTime(seconds: number): number {
  if (!Number.isFinite(seconds) || seconds <= 0) return 0;
  return Math.round(seconds * 4) / 4;
}

/**
 * Determines whether a touch-start / touch-end pair represents a deliberate
 * stationary tap rather than a scroll or swipe gesture on mobile screens.
 */
export function isTouchTapGesture(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  durationMs: number,
  maxMovePx = 12,
  maxDurationMs = 500
): boolean {
  if (!Number.isFinite(durationMs) || durationMs < 0 || durationMs > maxDurationMs) {
    return false;
  }
  const dx = Math.abs(endX - startX);
  const dy = Math.abs(endY - startY);
  return dx <= maxMovePx && dy <= maxMovePx;
}

/**
 * Tracks a single shared mobile/desktop interaction unlock signal so any paused
 * visible autoplay video automatically starts once the user taps or touches the page.
 */
type UnlockListener = () => void;
const unlockListeners = new Set<UnlockListener>();
let hasUserInteracted = false;
let gestureHookAttached = false;

function handleFirstGesture() {
  hasUserInteracted = true;
  unlockListeners.forEach((cb) => {
    try {
      cb();
    } catch {
      // Ignore individual callback failures
    }
  });
}

export function subscribeAutoplayUnlock(cb: UnlockListener): () => void {
  unlockListeners.add(cb);

  if (typeof window !== 'undefined' && !gestureHookAttached) {
    gestureHookAttached = true;
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    window.addEventListener('touchstart', handleFirstGesture, opts);
    window.addEventListener('pointerdown', handleFirstGesture, opts);
  }

  if (hasUserInteracted) {
    // Invoke asynchronously on microtask so callers finish ref setup first
    Promise.resolve().then(cb).catch(() => {});
  }

  return () => {
    unlockListeners.delete(cb);
    if (
      unlockListeners.size === 0 &&
      gestureHookAttached &&
      typeof window !== 'undefined'
    ) {
      gestureHookAttached = false;
      window.removeEventListener('touchstart', handleFirstGesture, true);
      window.removeEventListener('pointerdown', handleFirstGesture, true);
    }
  };
}
