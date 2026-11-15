import React, { useRef, useCallback } from 'react';
import { ZoomIn, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../../data/templeData';
import { StoryEpisode, formatEpisodeDuration } from '../../data/storyEpisodes';
import { useViewportVideo } from '../../hooks/useViewportVideo';
import {
  attemptSafeVideoPlay,
  shouldActivateEpisodeStream,
} from '../../utils/videoAutoplayUtils';

export interface StoryEpisodeCardProps {
  episode: StoryEpisode;
  index: number;
  language: Language;
  isUnmuted: boolean;
  isPlayerOpen: boolean;
  partLabel: string;
  muteLabel: string;
  unmuteLabel: string;
  scrollRootRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (id: number) => void;
  onToggleMute: (id: number) => void;
}

export const StoryEpisodeCard: React.FC<StoryEpisodeCardProps> = React.memo(
  ({
    episode,
    index,
    language,
    isUnmuted,
    isPlayerOpen,
    partLabel,
    muteLabel,
    unmuteLabel,
    scrollRootRef,
    onSelect,
    onToggleMute,
  }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const effectiveMuted = !isUnmuted || isPlayerOpen;

    const [hasActivated, setHasActivated] = React.useState(index < 4);

    const isInView = useViewportVideo({
      videoRef,
      containerRef: cardRef,
      rootRef: scrollRootRef,
      muted: effectiveMuted,
      enabled: !isPlayerOpen,
      rootMargin: '100px 0px',
      initialInView: index < 4,
      watchKey: hasActivated ? `active-${episode.id}` : `idle-${episode.id}`,
    });

    React.useEffect(() => {
      if (isInView && !hasActivated) {
        setHasActivated(true);
      }
    }, [isInView, hasActivated]);

    const streamActive = shouldActivateEpisodeStream(index, hasActivated || isInView, 4);

    const handleCardKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(episode.id);
        }
      },
      [episode.id, onSelect]
    );

    const handleMuteClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const vid = videoRef.current;
        const willBeMuted = isUnmuted;
        if (vid) {
          attemptSafeVideoPlay(vid, { muted: willBeMuted, loop: true });
        }
        onToggleMute(episode.id);
      },
      [episode.id, isUnmuted, onToggleMute]
    );

    const title = episode.title[language];
    const summary = episode.summary[language];

    return (
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        data-testid={`story-episode-card-${episode.id}`}
        onClick={() => onSelect(episode.id)}
        onKeyDown={handleCardKeyDown}
        className="group text-left rounded-xl sm:rounded-2xl p-1.5 sm:p-2 bg-[#FFFDF8] border-2 border-[#C29A54]/75 hover:border-[#741C24] shadow-[0_8px_22px_rgba(63,41,29,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#741C24]"
      >
        {/* Exact 9:16 Uncropped Autoplaying Looping Video Frame */}
        <div className="relative w-full aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]">
          <video
            ref={videoRef}
            src={streamActive ? episode.src : undefined}
            poster={episode.poster}
            autoPlay
            loop
            muted={effectiveMuted}
            playsInline
            preload={isInView ? 'auto' : streamActive ? 'metadata' : 'none'}
            aria-label={title}
            className="w-full h-full object-contain object-center block"
          />

          {/* Top Part Number & Inspect Trigger */}
          <div className="absolute top-1.5 sm:top-2 inset-x-1.5 sm:inset-x-2 flex items-center justify-between gap-1.5">
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#2B1218]/90 border border-[#C59B56]/60 font-cinzel text-[9px] sm:text-[10px] tracking-wider uppercase text-[#E1BD80] font-bold pointer-events-none truncate">
              {partLabel}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(episode.id);
              }}
              aria-label={`Inspect ${title}`}
              className="p-1 sm:p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md cursor-pointer shrink-0"
            >
              <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C784]" />
            </button>
          </div>

          {/* Bottom-Left Duration & Bottom-Right Mute/Unmute Toggle */}
          <span className="absolute bottom-2 left-1.5 sm:left-2.5 px-1.5 sm:px-2 py-0.5 rounded bg-black/75 font-mono text-[10px] sm:text-[11px] text-[#FFF5E8] pointer-events-none tabular-nums">
            {formatEpisodeDuration(episode.durationSeconds)}
          </span>

          <button
            type="button"
            data-testid={`story-card-mute-btn-${episode.id}`}
            onClick={handleMuteClick}
            aria-pressed={isUnmuted}
            aria-label={isUnmuted ? `${muteLabel} ${title}` : `${unmuteLabel} ${title}`}
            className={`absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 z-20 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1 sm:gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
              isUnmuted
                ? 'bg-[#741C24]/92 text-[#FFF8E8] border-[#E8C784]'
                : 'bg-black/75 hover:bg-[#741C24]/90 text-white border-white/25'
            }`}
          >
            {isUnmuted ? (
              <>
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5D77F]" />
                <span>{muteLabel}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C784]" />
                <span>{unmuteLabel}</span>
              </>
            )}
          </button>
        </div>

        {/* Clean Warm Beige-Complementary Card Footer */}
        <div className="pt-2 px-1 sm:px-1.5 pb-0.5 flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-serif-royal text-xs sm:text-base font-bold text-[#741C24] group-hover:text-[#3C2A20] transition-colors leading-snug mb-0.5 sm:mb-1 line-clamp-2">
              {title}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#715847] font-serif leading-relaxed line-clamp-2">
              {summary}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
