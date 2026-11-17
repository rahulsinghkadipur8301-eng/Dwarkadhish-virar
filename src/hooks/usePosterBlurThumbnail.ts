import { useEffect, useState, useCallback, useRef } from 'react';
import {
  generateDynamicMicroThumbnail,
  resolvePosterBlurThumbnail,
} from '../utils/posterThumbnailUtils';

export interface UsePosterBlurThumbnailResult {
  blurDataUri: string | undefined;
  isPosterLoaded: boolean;
  posterImgRef: React.RefObject<HTMLImageElement | null>;
  onPosterLoad: () => void;
}

/**
 * Provides an instant 0ms base64 blur-grid preview derived from the poster's real color palette,
 * dynamically upgrades it via offscreen 18x32 canvas downsampling once cached, and tracks
 * high-resolution WebP poster paint readiness without flickering on cached images.
 */
export function usePosterBlurThumbnail(posterSrc?: string): UsePosterBlurThumbnailResult {
  const posterImgRef = useRef<HTMLImageElement | null>(null);
  const [blurDataUri, setBlurDataUri] = useState<string | undefined>(() =>
    resolvePosterBlurThumbnail(posterSrc)
  );
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  useEffect(() => {
    setBlurDataUri(resolvePosterBlurThumbnail(posterSrc));

    const imgEl = posterImgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      setIsPosterLoaded(true);
    } else {
      setIsPosterLoaded(false);
    }

    if (!posterSrc) return;
    let active = true;

    generateDynamicMicroThumbnail(posterSrc).then((dynamicUri) => {
      if (active && dynamicUri) {
        setBlurDataUri(dynamicUri);
      }
    });

    return () => {
      active = false;
    };
  }, [posterSrc]);

  const onPosterLoad = useCallback(() => {
    setIsPosterLoaded(true);
  }, []);

  return {
    blurDataUri,
    isPosterLoaded,
    posterImgRef,
    onPosterLoad,
  };
}
