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
import { useTouchTap } from '../../hooks/useTouchTap';
import { useVideoMediaReady } from '../../hooks/useVideoMediaReady';
import { formatEpisodeDuration } from '../../data/storyEpisodesMeta';
import {
  attemptSafeVideoPlay,
  quantizeVideoTime,
  syncVideoAutoplayAttributes,
} from '../../utils/videoAutoplayUtils';
import { shouldShowVideoSkeleton } from '../../utils/videoSkeletonUtils';
import { VideoCardSkeletonOverlay } from '../VideoGridSkeleton';

export interface GalleryLightboxItem {
  id: string;
  src: string;
  tag: string;
  title: string;
  caption: string;
}

export interface GalleryLightboxPlayerProps {
  item: GalleryLightboxItem;
  index: number;
  total: number;
  isUnmuted: boolean;
  muteLabel: string;
  unmuteLabel: string;
  onToggleMute: (id: string, e: React.SyntheticEvent) => void;
  onFallbackMuted: () => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export const GalleryLightboxPlayer: React.FC<GalleryLightboxPlayerProps> = React.memo(
  ({
    item,
    index,
    total,
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);

    // Reset timeline when switching gallery video
    useEffect(() => {
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(true);
      setUserPaused(false);
    }, [item.id]);

    useViewportVideo({
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

    const { loadState, onLoadedData, onCanPlay, onPlaying, onError } = useVideoMediaReady({
      videoRef,
      watchKey: item.id,
    });
    const showSkeleton = shouldShowVideoSkeleton(loadState, Boolean(item.src));

    useEffect(() => {
      const onFsChange = () => {
        setIsFullscreen(Boolean(document.fullscreenElement));
      };
      document.addEventListener('fullscreenchange', onFsChange);
      return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const handleTogglePlay = useCallback(() => {
      const vid = videoRef.current;
      if (!vid) return;
      if (vid.paused) {
        setUserPaused(false);
        attemptSafeVideoPlay(vid, { muted: !isUnmuted, loop: true }).then((res) => {
          if (res.started) setIsPlaying(true);
        });
      } else {
        setUserPaused(true);
        vid.pause();
        setIsPlaying(false);
      }
    }, [isUnmuted]);

    const handleMuteClick = useCallback(
      (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const vid = videoRef.current;
        if (vid) {
          const nextMuted = isUnmuted;
          syncVideoAutoplayAttributes(vid, { muted: nextMuted, loop: true });
          if (!nextMuted && vid.paused) {
            attemptSafeVideoPlay(vid, { muted: false, loop: true });
          }
        }
        onToggleMute(item.id, e);
      },
      [isUnmuted, item.id, onToggleMute]
    );

    const muteTouchHandlers = useTouchTap<HTMLButtonElement>(
      (e) => handleMuteClick(e),
      { stopPropagation: true }
    );

    const handleToggleFullscreen = useCallback(() => {
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

    // Keyboard controls inside active viewer
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
    const effectiveDuration = duration > 0 ? duration : 30;

    return (
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        className="pointer-events-auto relative max-w-4xl w-full max-h-[80vh] overflow-y-auto overscroll-auto bg-[#FAF4E8] rounded-2xl border-2 border-[#C29A54] shadow-[0_24px_60px_rgba(0,0,0,0.45)] flex flex-col md:flex-row"
      >
        {/* Top Sticky Header Bar on Mobile */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-[#E5D1B6] bg-[#F3E7D6]/98 md:hidden shrink-0">
          <span className="px-2.5 py-1 rounded bg-[#FFFDF8] border border-[#C29A54]/80 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
            {indexLabel}
          </span>
          <span className="font-serif-royal text-sm font-bold text-[#741C24] truncate px-2">
            {item.title}
          </span>
          <button
            type="button"
            data-testid="gallery-popup-close-mobile-btn"
            onClick={onClose}
            aria-label="Close Video Player"
            className="min-w-[40px] min-h-[40px] p-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Exact 9:16 Uncropped Portrait Stage (Minimizes letterbox space on mobile & desktop) */}
        <div className="relative shrink-0 md:flex-1 bg-[#1D120C] flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
          <div
            data-media-state={loadState}
            className="relative h-[320px] sm:h-[390px] md:h-[480px] md:max-h-[74vh] w-auto max-w-full aspect-[9/16] rounded-xl overflow-hidden border border-[#C29A54]/60 bg-black shadow-2xl flex items-center justify-center"
          >
            <VideoCardSkeletonOverlay visible={showSkeleton} index={index} variant="gallery" />
            <video
              ref={videoRef}
              key={item.id}
              src={item.src}
              autoPlay
              loop
              muted={!isUnmuted}
              playsInline
              preload="auto"
              data-testid="gallery-popup-video"
              aria-label={item.title}
              onClick={handleTogglePlay}
              onLoadedData={onLoadedData}
              onCanPlay={onCanPlay}
              onPlaying={() => {
                onPlaying();
                setIsPlaying(true);
              }}
              onError={onError}
              onPause={() => setIsPlaying(false)}
              onLoadedMetadata={(e) => {
                const d = e.currentTarget.duration;
                if (Number.isFinite(d) && d > 0) setDuration(d);
              }}
              onTimeUpdate={(e) => {
                const q = quantizeVideoTime(e.currentTarget.currentTime);
                setCurrentTime((prev) => (prev === q ? prev : q));
              }}
              className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${
                showSkeleton ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Quick Mute / Unmute Button */}
            <button
              type="button"
              data-testid="gallery-popup-mute-btn"
              onTouchStart={muteTouchHandlers.onTouchStart}
              onTouchEnd={muteTouchHandlers.onTouchEnd}
              onClick={muteTouchHandlers.onClick}
              aria-pressed={isUnmuted}
              aria-label={isUnmuted ? muteLabel : unmuteLabel}
              className={`absolute bottom-3 right-3 z-20 min-h-[36px] px-3 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                isUnmuted
                  ? 'bg-[#741C24]/92 text-[#FFF8E8] border-[#E8C784]'
                  : 'bg-black/75 hover:bg-[#741C24]/90 text-white border-white/25'
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
        <div className="w-full md:w-[340px] lg:w-[360px] shrink-0 bg-[#FAF4E8] border-t md:border-t-0 md:border-l border-[#E5D1B6] p-4 sm:p-5 flex flex-col justify-between gap-4 text-[#3C2A20]">
          <div>
            <div className="hidden md:flex items-center justify-between gap-2 mb-4">
              <span className="px-2.5 py-1 rounded bg-[#F3E7D6] border border-[#C29A54]/70 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
                {indexLabel}
              </span>
              <button
                type="button"
                data-testid="gallery-popup-close-btn"
                onClick={onClose}
                aria-label="Close Video Player"
                className="min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <span className="inline-block font-cinzel text-[11px] uppercase tracking-[0.18em] text-[#A67C57] font-bold mb-1">
              {item.tag}
            </span>
            <h4 className="font-serif-royal text-lg sm:text-2xl font-bold text-[#741C24] leading-snug mb-1.5 sm:mb-2">
              {item.title}
            </h4>
            <p className="font-serif text-xs sm:text-sm text-[#3F291D]/90 leading-relaxed">
              {item.caption}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#E5D1B6]">
            <div>
              <input
                type="range"
                min={0}
                max={effectiveDuration}
                step={0.25}
                value={Math.min(currentTime, effectiveDuration)}
                aria-label="Seek video timeline"
                onChange={(e) => {
                  const nextVal = Number(e.target.value);
                  setCurrentTime(nextVal);
                  if (videoRef.current) {
                    videoRef.current.currentTime = nextVal;
                  }
                }}
                className="w-full accent-[#741C24] cursor-pointer h-2 bg-[#E5D1B6] rounded-lg"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B4832] mt-1 tabular-nums">
                <span>{formatEpisodeDuration(currentTime)}</span>
                <span>{formatEpisodeDuration(effectiveDuration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                data-testid="gallery-popup-play-btn"
                onClick={handleTogglePlay}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#741C24] to-[#8B2430] text-[#FFFDF8] border border-[#C29A54] font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:brightness-110 transition"
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
                className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors"
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
                onClick={onPrev}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#741C24]" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                data-testid="gallery-popup-next-btn"
                onClick={onNext}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 text-[#741C24]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
