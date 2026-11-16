/**
 * Pure utilities & layout descriptors for content-aware video grid skeleton states.
 * Guarantees deterministic loading -> ready / error transitions and matching 9:16
 * geometry so video initialization produces zero Cumulative Layout Shift (CLS).
 */

export type MediaLoadState = 'loading' | 'ready' | 'error';

export const DEVOTIONAL_VIDEO_GRID_LAYOUT = {
  mobileColumns: 2,
  desktopColumns: 4,
  cardCount: 4,
  aspectClass: 'aspect-[9/16]',
  gridClass: 'grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6',
  cardShellClass:
    'rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/75 shadow-[0_8px_22px_rgba(63,41,29,0.08)] flex flex-col',
} as const;

/**
 * Resolves HTMLMediaElement readiness from `readyState` and error state.
 * `readyState >= 2` (HAVE_CURRENT_DATA) ensures at least one video frame is decoded.
 */
export function resolveVideoMediaLoadState(
  readyState: number,
  hasError = false
): MediaLoadState {
  if (hasError) return 'error';
  if (Number.isFinite(readyState) && readyState >= 2) {
    return 'ready';
  }
  return 'loading';
}

/**
 * Returns whether the skeleton shimmer overlay should remain visible over the 9:16 video stage.
 */
export function shouldShowVideoSkeleton(
  state: MediaLoadState,
  hasSource = true
): boolean {
  if (state === 'ready' || state === 'error') {
    return false;
  }
  return !hasSource || state === 'loading';
}

/**
 * Computes bounded staggered shimmer delay (ms) across video grid tiles.
 */
export function getSkeletonStaggerDelayMs(index: number): number {
  if (!Number.isFinite(index) || index <= 0) return 0;
  return Math.min(Math.floor(index), 7) * 90;
}
