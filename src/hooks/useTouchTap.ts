import React, { useRef, useCallback } from 'react';
import { isTouchTapGesture } from '../utils/videoAutoplayUtils';

export interface TouchTapHandlers<T extends HTMLElement> {
  onTouchStart: (e: React.TouchEvent<T>) => void;
  onTouchEnd: (e: React.TouchEvent<T>) => void;
  onClick: (e: React.MouseEvent<T>) => void;
}

/**
 * Provides paired `onTouchStart`, `onTouchEnd`, and deduplicated `onClick` handlers
 * so mobile taps on video containers or mute controls toggle state immediately without
 * triggering accidental browser navigation, scroll hijacking, or ghost synthetic clicks.
 */
export function useTouchTap<T extends HTMLElement>(
  onActivate: (e: React.TouchEvent<T> | React.MouseEvent<T>) => void,
  options?: { stopPropagation?: boolean; preventDefaultOnTap?: boolean }
): TouchTapHandlers<T> {
  const stopPropagation = options?.stopPropagation ?? false;
  const preventDefaultOnTap = options?.preventDefaultOnTap ?? true;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTouchHandledAtRef = useRef<number>(0);

  const onTouchStart = useCallback(
    (e: React.TouchEvent<T>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      const touch = e.changedTouches?.[0] ?? e.touches?.[0];
      if (!touch) {
        touchStartRef.current = null;
        return;
      }
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    },
    [stopPropagation]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent<T>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;

      const touch = e.changedTouches?.[0];
      if (!touch) return;

      const elapsed = Date.now() - start.time;
      if (isTouchTapGesture(start.x, start.y, touch.clientX, touch.clientY, elapsed)) {
        if (preventDefaultOnTap && e.cancelable) {
          e.preventDefault();
        }
        lastTouchHandledAtRef.current = Date.now();
        onActivate(e);
      }
    },
    [onActivate, preventDefaultOnTap, stopPropagation]
  );

  const onClick = useCallback(
    (e: React.MouseEvent<T>) => {
      if (stopPropagation) {
        e.stopPropagation();
      }
      // Suppress trailing synthetic click emitted by mobile browsers right after touchend
      if (Date.now() - lastTouchHandledAtRef.current < 450) {
        return;
      }
      onActivate(e);
    },
    [onActivate, stopPropagation]
  );

  return { onTouchStart, onTouchEnd, onClick };
}
