import React from 'react';
import {
  DEVOTIONAL_VIDEO_GRID_LAYOUT,
  getSkeletonStaggerDelayMs,
} from '../utils/videoSkeletonUtils';
import type { HlsLoadPhase } from '../utils/hlsStreamingUtils';

export interface VideoCardSkeletonOverlayProps {
  visible: boolean;
  index?: number;
  variant?: 'gallery' | 'episode' | 'lead';
  reducedMotion?: boolean;
  showActionPill?: boolean;
  hasPoster?: boolean;
  progressPct?: number;
  loadPhase?: HlsLoadPhase;
  isBuffering?: boolean;
}

function getProgressScaleClass(progressPct: number, isBuffering: boolean): string {
  const effective = isBuffering ? Math.max(progressPct, 58) : progressPct;
  if (effective >= 95) return '[transform:scaleX(1)]';
  if (effective >= 80) return '[transform:scaleX(0.85)]';
  if (effective >= 55) return '[transform:scaleX(0.65)]';
  if (effective >= 35) return '[transform:scaleX(0.45)]';
  if (effective >= 15) return '[transform:scaleX(0.25)]';
  return '[transform:scaleX(0.18)]';
}

/**
 * Content-aware 9:16 loading & skeleton overlay aligned to the exact video card anatomy.
 * When `hasPoster` is true, keeps the blurred/WebP poster clearly visible underneath while
 * surfacing a restrained top gold progress hairline and tiny spinner during manifest/segment fetch.
 */
export const VideoCardSkeletonOverlay: React.FC<VideoCardSkeletonOverlayProps> = React.memo(
  ({
    visible,
    index = 0,
    variant = 'gallery',
    reducedMotion = false,
    showActionPill = false,
    hasPoster = false,
    progressPct = 24,
    loadPhase = 'manifest',
    isBuffering = false,
  }) => {
    if (!visible) return null;

    const scaleClass = getProgressScaleClass(progressPct, isBuffering);
    const activeSpinClass = reducedMotion ? '' : 'animate-spin';

    if (hasPoster) {
      return (
        <div
          aria-hidden="true"
          data-testid="video-card-skeleton"
          data-loading-phase={isBuffering ? 'buffering' : loadPhase}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          {/* Compositor-only top antique-gold hairline progress bar (scaleX transform) */}
          <div
            data-testid="video-loading-progress"
            className="absolute top-0 inset-x-0 h-[2.5px] bg-black/35 overflow-hidden"
          >
            <div
              className={`w-full h-full origin-left bg-gradient-to-r from-[#C29A54] via-[#F5D77F] to-[#E8C784] transition-transform duration-300 ease-out ${scaleClass}`}
            />
          </div>

          {variant === 'gallery' ? (
            <div className="p-2 sm:p-2.5 flex items-start justify-start">
              <span
                data-testid="video-loading-spinner"
                className="px-2 py-0.5 rounded-full bg-black/60 border border-[#E8C784]/50 inline-flex items-center gap-1.5 shadow-sm"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border-[1.5px] border-[#E8C784]/30 border-t-[#F5D77F] ${activeSpinClass}`}
                />
                <span className="text-[9px] font-cinzel tracking-widest uppercase text-[#F5D77F] leading-none">
                  ॐ
                </span>
              </span>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                data-testid="video-loading-spinner"
                className="relative w-9 h-9 rounded-full bg-black/55 border border-[#E8C784]/50 flex items-center justify-center shadow-md"
              >
                <span
                  className={`absolute inset-1 rounded-full border-[1.5px] border-[#E8C784]/25 border-t-[#F5D77F] ${activeSpinClass}`}
                />
                <span className="font-devanagari text-xs text-[#F5D77F] leading-none select-none">
                  ॐ
                </span>
              </span>
            </div>
          )}
        </div>
      );
    }

    const staggerMs = getSkeletonStaggerDelayMs(index);

    return (
      <div
        aria-hidden="true"
        data-testid="video-card-skeleton"
        className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-2 sm:p-2.5 bg-gradient-to-br from-[#2B1810] via-[#1D120C] to-[#2F1B12]"
      >
        {/* Warm antique-gold diagonal shimmer pass on sm+ screens while initializing */}
        {!reducedMotion && (
          <div
            className="hidden sm:block absolute inset-0 overflow-hidden"
            style={{ animationDelay: `${staggerMs}ms` }}
          >
            <div
              className="w-1/2 h-full animate-cta-shimmer bg-gradient-to-r from-transparent via-[#E8C784]/12 to-transparent"
              style={{ animationDelay: `${staggerMs}ms` }}
            />
          </div>
        )}

        {/* Top Chrome Skeleton */}
        <div className="relative flex items-center justify-between gap-2">
          {variant === 'gallery' ? (
            <span className="h-5 w-16 rounded-full bg-[#3D2418]/80 border border-[#C29A54]/20" />
          ) : (
            <span className="h-5 w-20 rounded bg-[#3D2418]/90 border border-[#C59B56]/30" />
          )}
          {showActionPill && (
            <span className="w-8 h-8 rounded-full bg-[#3D2418]/85 border border-[#C29A54]/25" />
          )}
        </div>

        {/* Center Sacred Motif Crest */}
        <div className="relative flex flex-col items-center justify-center gap-2 my-auto px-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#C29A54]/30 bg-[#351F14]/70 flex items-center justify-center sm:animate-pulse">
            <span className="font-devanagari text-base sm:text-lg text-[#E8C784]/55 select-none">
              ॐ
            </span>
          </div>
          <div className="w-24 sm:w-28 h-2 rounded-full bg-[#46291B]/75" />
        </div>

        {/* Bottom Chrome Skeleton */}
        <div className="relative flex items-end justify-between gap-2">
          {variant === 'lead' ? (
            <div className="flex-1 space-y-1.5 pr-20">
              <div className="h-3.5 w-3/4 rounded bg-[#46291B]/80" />
              <div className="h-2.5 w-1/2 rounded bg-[#3D2418]/75" />
            </div>
          ) : (
            <span className="h-5 w-12 rounded bg-[#3D2418]/85 border border-[#C29A54]/20" />
          )}
          {showActionPill && (
            <span className="h-8 w-20 rounded-full bg-[#4B141D]/70 border border-[#C29A54]/30 shrink-0" />
          )}
        </div>
      </div>
    );
  }
);

/**
 * Content-aware section Suspense fallback matching TempleGallerySection geometry:
 * prevents CLS while the lazy chunk or video streams initialize.
 */
export const GalleryVideoGridSkeleton: React.FC = React.memo(() => {
  return (
    <section
      id="gallery"
      aria-busy="true"
      aria-label="Loading devotional darshan video gallery"
      data-testid="gallery-grid-skeleton"
      className="relative w-full bg-[#F3E7D6] text-[#3F291D] py-12 sm:py-16 lg:py-20 border-b border-[#E5D1B6] overflow-hidden scroll-mt-20"
    >
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Centered Header Skeleton */}
        <div className="text-center max-w-4xl mx-auto mb-7 sm:mb-10 flex flex-col items-center">
          <div className="h-4 w-48 rounded-full bg-[#E5D1B6] sm:animate-pulse mb-3" />
          <div className="h-9 sm:h-11 w-72 sm:w-96 rounded-xl bg-[#E0C8AA] sm:animate-pulse mb-3" />
          <div className="h-4 w-64 sm:w-[440px] rounded-full bg-[#E5D1B6]/80 sm:animate-pulse mb-4" />
          <div className="h-[1px] w-44 bg-[#C29A54]/50" />
        </div>

        {/* 2 -> 4 Column 9:16 Video Grid Skeleton */}
        <div className={DEVOTIONAL_VIDEO_GRID_LAYOUT.gridClass}>
          {Array.from({ length: DEVOTIONAL_VIDEO_GRID_LAYOUT.cardCount }).map((_, idx) => (
            <div key={idx} className={DEVOTIONAL_VIDEO_GRID_LAYOUT.cardShellClass}>
              <div
                className={`relative w-full ${DEVOTIONAL_VIDEO_GRID_LAYOUT.aspectClass} rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]`}
              >
                <VideoCardSkeletonOverlay visible index={idx} variant="gallery" showActionPill />
              </div>

              {/* Heritage Maroon Footer Skeleton matching exact card footer dimensions */}
              <div className="mt-1.5 sm:mt-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#4B141D] via-[#611D2B] to-[#4B141D] border-t border-[#C59B56] px-2 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="h-2.5 w-20 rounded bg-[#E1BD80]/30 sm:animate-pulse" />
                  <div className="h-4 w-28 rounded bg-[#FFF5E8]/25 sm:animate-pulse" />
                </div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E8C784]/25 sm:animate-pulse shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/**
 * Content-aware section Suspense fallback matching DevotionalPresenceSection
 * (shrine frame arch + 2 devotional cards) to prevent layout shifts during chunk fetch.
 */
export const DevotionalPresenceSkeleton: React.FC = React.memo(() => {
  return (
    <section
      id="presence"
      aria-busy="true"
      aria-label="Loading divine presence sanctum"
      data-testid="presence-section-skeleton"
      className="relative w-full bg-[#FBF6ED] border-b border-[#E5D1B6] py-12 sm:py-16 lg:py-20 overflow-hidden scroll-mt-20"
    >
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
          <div className="h-4 w-44 rounded-full bg-[#E5D1B6] sm:animate-pulse mb-3" />
          <div className="h-9 sm:h-11 w-72 sm:w-96 rounded-xl bg-[#E0C8AA] sm:animate-pulse mb-2.5" />
          <div className="h-5 w-52 rounded-full bg-[#E5D1B6]/80 sm:animate-pulse mb-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full">
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] aspect-[3/4.2] max-h-[480px] sm:max-h-[560px] lg:max-h-[640px] rounded-2xl border-2 border-[#C29A54]/60 bg-[#1D120C] overflow-hidden relative">
              <VideoCardSkeletonOverlay visible index={0} variant="lead" />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 w-full">
            <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-xl border border-[#D8C2A4] space-y-3">
              <div className="h-7 w-56 rounded-lg bg-[#E5D1B6] sm:animate-pulse" />
              <div className="h-4 w-full rounded bg-[#F0DFC8] sm:animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-[#F0DFC8] sm:animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-[#F0DFC8] sm:animate-pulse" />
            </div>

            <div className="bg-[#FFF9EE] p-6 sm:p-8 rounded-xl border-2 border-[#C59B56]/40 space-y-3">
              <div className="h-5 w-44 rounded bg-[#E5D1B6] sm:animate-pulse" />
              <div className="h-6 w-full rounded bg-[#EAD6B9] sm:animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-[#F0DFC8] sm:animate-pulse" />
              <div className="h-9 w-40 rounded bg-[#C29A54]/30 sm:animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
