import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useViewportVideo } from '../../hooks/useViewportVideo';
import { useVideoMediaReady } from '../../hooks/useVideoMediaReady';
import { useHlsVideoStream } from '../../hooks/useHlsVideoStream';
import { formatEpisodeDuration } from '../../data/storyEpisodesMeta';
import {
  attemptSafeVideoPlay,
  quantizeVideoTime,
  syncVideoAutoplayAttributes,
} from '../../utils/videoAutoplayUtils';
import {
  isDecodedVideoFrameVisible,
  resolveLightboxMediaDuration,
} from '../../utils/hlsStreamingUtils';
import { shouldShowVideoSkeleton } from '../../utils/videoSkeletonUtils';
import { VideoCardSkeletonOverlay } from '../VideoGridSkeleton';

export interface GalleryLightboxItem {
  id: string;
  src: string;
  hlsSrc?: string;
  posterSrc?: string;
  tag: string;
  title: string;
  caption: string;
}

export interface GalleryLightboxPlayerProps {
  item: GalleryLightboxItem;
  index: number;
  total: number;
  initialTime?: number;
  isUnmuted: boolean;
  muteLabel: string;
  unmuteLabel: string;
  onToggleMute: (id: string, e: React.SyntheticEvent) => void;
  onFallbackMuted: () => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

interface GallerySeekControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  itemId: string;
}

/**
 * Isolated memoized timeline scrubber so 4Hz `timeupdate` events only update
 * the seek slider instead of re-rendering the entire lightbox video tree on mobile.
 */
const GallerySeekControls: React.FC<GallerySeekControlsProps> = React.memo(
  ({ videoRef, itemId }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      setCurrentTime(0);
      setDuration(0);

      const vid = videoRef.current;
      if (!vid) return;

      const syncDuration = () => {
        const { duration: nextDur, isKnown } = resolveLightboxMediaDuration(vid.duration);
        if (isKnown) {
          setDuration(nextDur);
        }
      };

      const syncTime = () => {
        const q = quantizeVideoTime(vid.currentTime);
        setCurrentTime((prev) => (prev === q ? prev : q));
      };

      syncDuration();
      syncTime();

      vid.addEventListener('loadedmetadata', syncDuration);
      vid.addEventListener('durationchange', syncDuration);
      vid.addEventListener('timeupdate', syncTime);

      return () => {
        vid.removeEventListener('loadedmetadata', syncDuration);
        vid.removeEventListener('durationchange', syncDuration);
        vid.removeEventListener('timeupdate', syncTime);
      };
    }, [videoRef, itemId]);

    const { duration: safeDuration, isKnown } = resolveLightboxMediaDuration(duration);
    const sliderMax = isKnown ? safeDuration : 1;

    return (
      <div>
        <input
          type="range"
          min={0}
          max={sliderMax}
          step={0.25}
          disabled={!isKnown}
          value={isKnown ? Math.min(currentTime, safeDuration) : 0}
          aria-label="Seek video timeline"
          onChange={(e) => {
            if (!isKnown) return;
            const nextVal = Number(e.target.value);
            setCurrentTime(nextVal);
            if (videoRef.current) {
              videoRef.current.currentTime = nextVal;
            }
          }}
          className="w-full accent-[#741C24] cursor-pointer disabled:opacity-50 h-2 bg-[#E5D1B6] rounded-lg touch-manipulation"
        />
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6B4832] mt-1 tabular-nums">
          <span>{formatEpisodeDuration(currentTime)}</span>
          <span>{isKnown ? formatEpisodeDuration(safeDuration) : '--:--'}</span>
        </div>
      </div>
    );
  }
);

export const GalleryLightboxPlayer: React.FC<GalleryLightboxPlayerProps> = React.memo(
  ({
    item,
    index,
    total,
    initialTime = 0,
    isUnmuted,
    muteLabel,
    unmuteLabel,
    onToggleMute,
    onFallbackMuted,
    onPrev,
    onNext,
    onClose,
  }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [userPaused, setUserPaused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);
    const appliedInitialTimeForRef = useRef<string | null>(null);

    // Reset play state cleanly when switching videos
    useEffect(() => {
      setIsPlaying(true);
      setUserPaused(false);
      appliedInitialTimeForRef.current = null;
    }, [item.id]);

    const isLightboxInView = useViewportVideo({
      videoRef,
      containerRef: stageRef,
      muted: !isUnmuted,
      enabled: true,
      userPaused,
      rootMargin: '80px 0px',
      initialInView: true,
      watchKey: item.id,
      onFallbackMuted,
    });

    const handleStreamReady = useCallback(() => {
      const vid = videoRef.current;
      if (vid && !userPaused) {
        attemptSafeVideoPlay(vid, { muted: !isUnmuted, loop: true }).then((res) => {
          if (res.fellBackToMuted && isUnmuted) {
            onFallbackMuted();
          }
        });
      }
    }, [isUnmuted, userPaused, onFallbackMuted]);

    const streamStatus = useHlsVideoStream({
      videoRef,
      hlsSrc: item.hlsSrc,
      fallbackSrc: item.src,
      shouldLoad: true,
      isInView: isLightboxInView,
      enabled: !userPaused,
      startPosition: initialTime > 0.5 ? initialTime : -1,
      streamKey: item.id,
      onStreamReady: handleStreamReady,
    });

    const { loadState, onLoadedData, onCanPlay, onPlaying, onError } = useVideoMediaReady({
      videoRef,
      watchKey: item.id,
    });
    const showSkeleton = shouldShowVideoSkeleton(loadState, Boolean(item.hlsSrc || item.src));
    const hasDecodedFrame =
      loadState === 'ready' ||
      isDecodedVideoFrameVisible(videoRef.current?.readyState ?? 0, loadState === 'error');

    useEffect(() => {
      const onFsChange = () => {
        setIsFullscreen(Boolean(document.fullscreenElement));
      };
      document.addEventListener('fullscreenchange', onFsChange);
      return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const handleInstantClose = useCallback(
      (e?: React.SyntheticEvent) => {
        e?.stopPropagation();
        const vid = videoRef.current;
        if (vid && !vid.paused) {
          vid.pause();
        }
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        onClose();
      },
      [onClose]
    );

    const handleTogglePlay = useCallback(
      (e?: React.SyntheticEvent) => {
        e?.stopPropagation();
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) {
          setUserPaused(false);
          attemptSafeVideoPlay(vid, { muted: !isUnmuted, loop: true }).then((res) => {
            if (res.started) {
              setIsPlaying(true);
              if (res.fellBackToMuted && isUnmuted) {
                onFallbackMuted();
              }
            }
          });
        } else {
          setUserPaused(true);
          vid.pause();
          setIsPlaying(false);
        }
      },
      [isUnmuted, onFallbackMuted]
    );

    const handleMuteClick = useCallback(
      (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const vid = videoRef.current;
        if (vid) {
          const nextMuted = isUnmuted;
          syncVideoAutoplayAttributes(vid, { muted: nextMuted, loop: true });
          if (vid.paused && !userPaused) {
            attemptSafeVideoPlay(vid, { muted: nextMuted, loop: true });
          }
        }
        onToggleMute(item.id, e);
      },
      [isUnmuted, item.id, onToggleMute, userPaused]
    );

    const handleToggleFullscreen = useCallback((e: React.SyntheticEvent) => {
      e.stopPropagation();
      const stage = stageRef.current;
      if (!stage) return;
      if (!document.fullscreenElement) {
        if (typeof stage.requestFullscreen === 'function') {
          stage.requestFullscreen().catch(() => {});
        }
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }, []);

    // Keyboard space toggle inside active viewer
    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' && (e.target as HTMLElement)?.tagName !== 'BUTTON') {
          e.preventDefault();
          handleTogglePlay();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [handleTogglePlay]);

    const indexLabel = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

    return (
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        className="pointer-events-auto relative max-w-4xl w-full max-h-[calc(100dvh-1.25rem)] bg-[#FAF4E8] rounded-2xl border-2 border-[#C29A54] shadow-[0_24px_60px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden"
      >
        {/* Fixed Non-Scrolling Mobile Top Header Bar — never trapped inside overflow-y-auto */}
        <div className="shrink-0 z-30 flex items-center justify-between gap-2 px-3.5 py-2 border-b border-[#E5D1B6] bg-[#F3E7D6] md:hidden">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF8] border border-[#C29A54]/80 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
            {indexLabel}
          </span>
          <span className="font-serif-royal text-sm font-bold text-[#741C24] truncate px-2">
            {item.title}
          </span>
          <button
            type="button"
            data-testid="gallery-popup-close-mobile-btn"
            onClick={handleInstantClose}
            aria-label="Close Video Player"
            className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] active:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] active:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer shrink-0 transition-colors touch-manipulation active:scale-95 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll-safe Interior Container (keeps mobile X button fixed above fold at all times) */}
        <div className="flex-1 min-h-0 overflow-y-auto md:overflow-visible flex flex-col md:flex-row">
          {/* Exact 9:16 Uncropped Portrait Stage */}
          <div className="relative shrink-0 md:flex-1 bg-[#1D120C] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
            <div
              data-media-state={loadState}
              data-stream-mode={streamStatus}
              className="relative h-[min(44dvh,350px)] sm:h-[390px] md:h-[min(70dvh,500px)] w-auto max-w-full aspect-[9/16] rounded-xl overflow-hidden border border-[#C29A54]/60 bg-[#1D120C] shadow-2xl flex items-center justify-center"
            >
              {/* Persistent Crisp Poster Underlay — eliminates black frames before video decodes */}
              {item.posterSrc && (
                <img
                  src={item.posterSrc}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none"
                />
              )}

              <VideoCardSkeletonOverlay
                visible={showSkeleton}
                index={index}
                variant="gallery"
                hasPoster={Boolean(item.posterSrc)}
              />

              <video
                ref={videoRef}
                key={item.id}
                poster={item.posterSrc}
                autoPlay
                loop
                muted={!isUnmuted}
                playsInline
                preload="metadata"
                data-testid="gallery-popup-video"
                aria-label={item.title}
                onClick={handleTogglePlay}
                onLoadedMetadata={(e) => {
                  const vid = e.currentTarget;
                  if (
                    initialTime > 0.5 &&
                    appliedInitialTimeForRef.current !== item.id &&
                    Number.isFinite(vid.duration) &&
                    vid.duration > initialTime + 0.5 &&
                    Math.abs(vid.currentTime - initialTime) > 1.2
                  ) {
                    appliedInitialTimeForRef.current = item.id;
                    vid.currentTime = initialTime;
                  }
                  if (!userPaused && vid.paused) {
                    attemptSafeVideoPlay(vid, { muted: !isUnmuted, loop: true }).then((res) => {
                      if (res.fellBackToMuted && isUnmuted) onFallbackMuted();
                    });
                  }
                }}
                onLoadedData={onLoadedData}
                onCanPlay={onCanPlay}
                onPlaying={() => {
                  onPlaying();
                  setIsPlaying(true);
                }}
                onError={onError}
                onPause={() => setIsPlaying(false)}
                className={`relative z-[1] w-full h-full object-contain cursor-pointer block touch-manipulation transition-opacity duration-200 ${
                  hasDecodedFrame ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Tactile Centered Play Badge when Paused */}
              {!isPlaying && !showSkeleton && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label="Resume Playback"
                  className="z-10 absolute inset-0 flex items-center justify-center bg-black/25 cursor-pointer touch-manipulation"
                >
                  <span className="w-13 h-13 rounded-full bg-[#741C24]/92 border-2 border-[#E8C784] text-[#FFFDF8] flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </span>
                </button>
              )}

              {/* Quick Mute / Unmute Button */}
              <button
                type="button"
                data-testid="gallery-popup-mute-btn"
                onClick={handleMuteClick}
                aria-pressed={isUnmuted}
                aria-label={isUnmuted ? muteLabel : unmuteLabel}
                className={`absolute bottom-2.5 right-2.5 z-20 min-h-[36px] px-3 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-colors cursor-pointer touch-manipulation active:scale-95 ${
                  isUnmuted
                    ? 'bg-[#741C24] text-[#FFF8E8] border-[#E8C784]'
                    : 'bg-black/80 hover:bg-[#741C24] text-white border-white/25'
                }`}
              >
                {isUnmuted ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                    <span>{muteLabel}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#E8C784]" />
                    <span>{unmuteLabel}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Metadata & Playback Controls Panel */}
          <div className="w-full md:w-[340px] lg:w-[360px] shrink-0 bg-[#FAF4E8] border-t md:border-t-0 md:border-l border-[#E5D1B6] p-3.5 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4 text-[#3C2A20]">
            <div>
              <div className="hidden md:flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-1 rounded bg-[#F3E7D6] border border-[#C29A54]/70 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
                  {indexLabel}
                </span>
                <button
                  type="button"
                  data-testid="gallery-popup-close-btn"
                  onClick={handleInstantClose}
                  aria-label="Close Video Player"
                  className="min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors touch-manipulation"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <span className="inline-block font-cinzel text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#A67C57] font-bold mb-0.5 sm:mb-1">
                {item.tag}
              </span>
              <h4 className="font-serif-royal text-base sm:text-2xl font-bold text-[#741C24] leading-snug mb-1 sm:mb-2">
                {item.title}
              </h4>
              <p className="font-serif text-xs sm:text-sm text-[#3F291D]/90 leading-relaxed line-clamp-2 md:line-clamp-none">
                {item.caption}
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-[#E5D1B6]">
              <GallerySeekControls videoRef={videoRef} itemId={item.id} />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  data-testid="gallery-popup-play-btn"
                  onClick={handleTogglePlay}
                  className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#741C24] to-[#8B2430] text-[#FFFDF8] border border-[#C29A54] font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:brightness-110 transition-colors touch-manipulation active:scale-[0.98]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors touch-manipulation"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  data-testid="gallery-popup-prev-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                  }}
                  className="min-h-[42px] sm:min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors touch-manipulation active:scale-[0.98]"
                >
                  <ChevronLeft className="w-4 h-4 text-[#741C24]" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  data-testid="gallery-popup-next-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                  className="min-h-[42px] sm:min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors touch-manipulation active:scale-[0.98]"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4 text-[#741C24]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
