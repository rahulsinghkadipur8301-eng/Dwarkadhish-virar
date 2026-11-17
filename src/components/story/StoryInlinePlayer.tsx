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
  Grid,
} from 'lucide-react';
import { Language } from '../../data/templeData';
import { StoryEpisode, formatEpisodeDuration } from '../../data/storyEpisodes';
import { useViewportVideo } from '../../hooks/useViewportVideo';
import { useVideoMediaReady } from '../../hooks/useVideoMediaReady';
import { usePosterBlurThumbnail } from '../../hooks/usePosterBlurThumbnail';
import {
  quantizeVideoTime,
  syncVideoAutoplayAttributes,
} from '../../utils/videoAutoplayUtils';
import {
  isDecodedVideoFrameVisible,
  shouldShowVideoLoaderOverlay,
} from '../../utils/hlsStreamingUtils';
import { VideoCardSkeletonOverlay } from '../VideoGridSkeleton';

export interface StoryInlinePlayerLabels {
  backToEpisodes: string;
  closeModal: string;
  unmuteAudio: string;
  muteAudio: string;
  seekTimeline: string;
  play: string;
  pause: string;
  toggleFullscreen: string;
  prevEpisode: string;
  nextEpisode: string;
}

export interface StoryInlinePlayerProps {
  episode: StoryEpisode;
  language: Language;
  partLabel: string;
  isMuted: boolean;
  labels: StoryInlinePlayerLabels;
  onToggleMute: () => void;
  onFallbackMuted: () => void;
  onBackToCollection: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const StoryInlinePlayer: React.FC<StoryInlinePlayerProps> = React.memo(
  ({
    episode,
    language,
    partLabel,
    isMuted,
    labels,
    onToggleMute,
    onFallbackMuted,
    onBackToCollection,
    onClose,
    onPrev,
    onNext,
  }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [userPaused, setUserPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(episode.durationSeconds);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const stageRef = useRef<HTMLDivElement | null>(null);

    // Reset timeline and manual pause state when switching episode
    useEffect(() => {
      setCurrentTime(0);
      setDuration(episode.durationSeconds);
      setIsPlaying(true);
      setUserPaused(false);
    }, [episode.id, episode.durationSeconds]);

    // Sync mobile/desktop attributes, pause automatically when scrolled off-screen, and resume on return
    useViewportVideo({
      videoRef,
      containerRef: stageRef,
      muted: isMuted,
      enabled: true,
      userPaused,
      releaseSrcOnOutOfView: true,
      rootMargin: '80px 0px',
      initialInView: true,
      watchKey: episode.id,
      onFallbackMuted,
    });

    const { loadState, isBuffering, onLoadedData, onCanPlay, onPlaying, onWaiting, onError } =
      useVideoMediaReady({
        videoRef,
        watchKey: episode.id,
      });

    const { blurDataUri, isPosterLoaded, posterImgRef, onPosterLoad } = usePosterBlurThumbnail(
      episode.poster
    );

    const hasDecodedFrame =
      loadState === 'ready' ||
      isDecodedVideoFrameVisible(videoRef.current?.readyState ?? 0, loadState === 'error');
    const showLoaderOverlay = shouldShowVideoLoaderOverlay({
      shouldLoad: true,
      hasDecodedFrame,
      hasError: loadState === 'error',
      isBuffering,
    });

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
        syncVideoAutoplayAttributes(vid, { muted: isMuted, loop: true });
        vid.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        setUserPaused(true);
        vid.pause();
        setIsPlaying(false);
      }
    }, [isMuted]);

    const handleMuteButtonClick = useCallback(() => {
      const nextMuted = !isMuted;
      const vid = videoRef.current;
      if (vid) {
        syncVideoAutoplayAttributes(vid, { muted: nextMuted, loop: true });
        if (!nextMuted && vid.paused) {
          vid.play().catch(() => {});
        }
      }
      onToggleMute();
    }, [isMuted, onToggleMute]);

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

    // Keyboard space/arrow controls for the single video player
    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          onNext();
        } else if (e.key === ' ' && (e.target as HTMLElement)?.tagName !== 'BUTTON') {
          e.preventDefault();
          handleTogglePlay();
        }
      };

      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [onPrev, onNext, handleTogglePlay]);

    const effectiveDuration = duration || episode.durationSeconds;

    return (
      <div
        ref={stageRef}
        className="relative w-full max-w-5xl max-h-[80vh] overflow-y-auto overscroll-auto mx-auto rounded-2xl border-2 border-[#C29A54] shadow-[0_24px_60px_rgba(63,41,29,0.2)] flex flex-col md:flex-row bg-[#FAF4E8]"
      >
        {/* Top Header Bar on Mobile */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-[#E5D1B6] bg-[#F3E7D6]/98 md:hidden shrink-0">
          <button
            type="button"
            onClick={onBackToCollection}
            className="min-h-[40px] px-3 py-1.5 rounded-lg bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] text-[11px] font-cinzel font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{labels.backToEpisodes}</span>
          </button>

          <span className="font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
            {partLabel}
          </span>

          <button
            type="button"
            data-testid="story-player-close-mobile-btn"
            onClick={onClose}
            aria-label={labels.closeModal}
            className="min-w-[40px] min-h-[40px] p-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Uncropped 9:16 Video Viewport (Mounts ONLY episode.src, loops cleanly) */}
        <div className="relative shrink-0 md:flex-1 bg-[#1D120C] flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
          <div className="relative h-[330px] sm:h-[400px] md:h-full md:max-h-[76vh] w-auto max-w-full aspect-[9/16] rounded-xl overflow-hidden border border-[#C29A54]/60 bg-[#1D120C] shadow-2xl flex items-center justify-center">
            {blurDataUri && (
              <img
                src={blurDataUri}
                alt=""
                aria-hidden="true"
                decoding="sync"
                className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none scale-[1.03]"
              />
            )}
            {episode.poster && (
              <img
                ref={posterImgRef}
                src={episode.poster}
                alt=""
                aria-hidden="true"
                decoding="async"
                onLoad={onPosterLoad}
                className={`absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none transition-opacity duration-200 ${
                  blurDataUri && !isPosterLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            <VideoCardSkeletonOverlay
              visible={showLoaderOverlay}
              index={episode.id}
              variant="episode"
              hasPoster={Boolean(episode.poster || blurDataUri)}
              progressPct={hasDecodedFrame ? 100 : isBuffering ? 62 : 45}
              loadPhase={isBuffering ? 'buffering' : hasDecodedFrame ? 'ready' : 'segments'}
              isBuffering={isBuffering}
            />
            <video
              key={episode.id}
              ref={videoRef}
              src={episode.src}
              poster={episode.poster ?? blurDataUri}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              preload="metadata"
              data-testid="story-active-video"
              aria-label={episode.title[language]}
              onClick={handleTogglePlay}
              onLoadedData={onLoadedData}
              onCanPlay={onCanPlay}
              onPlay={() => {
                onPlaying();
                setIsPlaying(true);
              }}
              onWaiting={onWaiting}
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
              className={`relative z-[1] w-full h-full object-contain cursor-pointer transition-opacity duration-200 ${
                hasDecodedFrame ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Bottom Mute / Unmute Toggle */}
            <button
              type="button"
              data-testid="story-player-mute-btn"
              onClick={handleMuteButtonClick}
              aria-pressed={!isMuted}
              aria-label={isMuted ? labels.unmuteAudio : labels.muteAudio}
              className={`absolute bottom-3 right-3 z-20 min-h-[36px] px-3 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                !isMuted
                  ? 'bg-[#741C24]/92 text-[#FFF8E8] border-[#E8C784]'
                  : 'bg-black/75 hover:bg-[#741C24]/90 text-white border-white/25'
              }`}
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                  <span>{labels.muteAudio}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#E8C784]" />
                  <span>{labels.unmuteAudio}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right / Bottom Metadata & Playback Control Sidebar in Warm Parchment Beige */}
        <div className="w-full md:w-[340px] lg:w-[370px] shrink-0 bg-[#FAF4E8] border-t md:border-t-0 md:border-l border-[#E5D1B6] p-4 sm:p-5 flex flex-col justify-between gap-4 text-[#3C2A20]">
          <div>
            <div className="hidden md:flex items-center justify-between gap-2 mb-4">
              <button
                type="button"
                onClick={onBackToCollection}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] text-xs font-cinzel font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{labels.backToEpisodes}</span>
              </button>

              <button
                type="button"
                data-testid="story-player-close-btn"
                onClick={onClose}
                aria-label={labels.closeModal}
                className="min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <span className="hidden md:inline-block px-2.5 py-1 rounded bg-[#F3E7D6] border border-[#C29A54]/70 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold mb-2.5">
              {partLabel}
            </span>

            <h4 className="font-serif-royal text-lg sm:text-2xl font-bold text-[#741C24] leading-snug mb-1.5 sm:mb-2">
              {episode.title[language]}
            </h4>

            <p className="font-serif text-xs sm:text-sm text-[#3F291D]/90 leading-relaxed">
              {episode.summary[language]}
            </p>
          </div>

          {/* Playback Scrubber, Play/Pause, Fullscreen & Episode Prev/Next */}
          <div className="space-y-3 pt-3 border-t border-[#E5D1B6]">
            <div>
              <input
                type="range"
                min={0}
                max={effectiveDuration}
                step={0.25}
                value={Math.min(currentTime, effectiveDuration)}
                aria-label={labels.seekTimeline}
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
                data-testid="story-player-play-btn"
                onClick={handleTogglePlay}
                className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#741C24] to-[#8B2430] text-[#FFFDF8] border border-[#C29A54] font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:brightness-110 transition"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{labels.pause}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{labels.play}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleToggleFullscreen}
                aria-label={labels.toggleFullscreen}
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
                data-testid="story-player-prev-btn"
                onClick={onPrev}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#741C24]" />
                <span>{labels.prevEpisode}</span>
              </button>
              <button
                type="button"
                data-testid="story-player-next-btn"
                onClick={onNext}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>{labels.nextEpisode}</span>
                <ChevronRight className="w-4 h-4 text-[#741C24]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
