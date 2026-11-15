import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, Volume2, VolumeX, ChevronRight, X, Film } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import {
  STORY_EPISODES,
  StoryEpisode,
  formatEpisodeDuration,
  getNextEpisodeId,
  getPreviousEpisodeId,
  getStoryEpisodeById,
} from '../data/storyEpisodes';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { useViewportVideo } from '../hooks/useViewportVideo';
import { attemptSafeVideoPlay } from '../utils/videoAutoplayUtils';
import { StoryEpisodeCard } from './story/StoryEpisodeCard';
import { StoryInlinePlayer } from './story/StoryInlinePlayer';

export interface KnowTheStorySectionProps {
  reducedMotion?: boolean;
}

export const KnowTheStorySection: React.FC<KnowTheStorySectionProps> = React.memo(
  ({ reducedMotion = false }) => {
    const { language, tDict } = useI18n();
    const s = tDict.story;

    const [collectionOpen, setCollectionOpen] = useState(false);
    const [activeEpisodeId, setActiveEpisodeId] = useState<number | null>(null);
    const [leadMuted, setLeadMuted] = useState(true);
    const [unmutedCardId, setUnmutedCardId] = useState<number | null>(null);
    const [playerMuted, setPlayerMuted] = useState(true);

    const leadCardRef = useRef<HTMLDivElement | null>(null);
    const leadVideoRef = useRef<HTMLVideoElement | null>(null);
    const collectionScrollRef = useRef<HTMLDivElement | null>(null);
    const expandedPanelRef = useRef<HTMLDivElement | null>(null);

    const activeEpisode: StoryEpisode | undefined =
      activeEpisodeId !== null ? getStoryEpisodeById(activeEpisodeId) : undefined;

    const isAnyPanelOpen = collectionOpen || activeEpisodeId !== null;
    const leadEffectiveMuted = leadMuted || isAnyPanelOpen;

    // Viewport-gated mobile + desktop autoplay for featured lead vertical video
    const isLeadInView = useViewportVideo({
      videoRef: leadVideoRef,
      containerRef: leadCardRef,
      muted: leadEffectiveMuted,
      enabled: !isAnyPanelOpen,
      rootMargin: '150px 0px',
      initialInView: false,
    });

    // Bring newly opened inline panel cleanly below the sticky navbar without locking page scroll
    const scrollPanelIntoView = useCallback(() => {
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          const el = expandedPanelRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const stickyNavClearance = 88;
          if (rect.top < stickyNavClearance || rect.top > window.innerHeight * 0.72) {
            const targetTop = rect.top + window.scrollY - stickyNavClearance;
            window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
          }
        }, 90);
      });
    }, []);

    const handleOpenCollection = useCallback(() => {
      setActiveEpisodeId(null);
      setCollectionOpen(true);
      scrollPanelIntoView();
    }, [scrollPanelIntoView]);

    const handleSelectEpisode = useCallback(
      (id: number) => {
        setUnmutedCardId(null);
        setActiveEpisodeId(id);
        setCollectionOpen(true);
        scrollPanelIntoView();
      },
      [scrollPanelIntoView]
    );

    const handleBackToCollection = useCallback(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setActiveEpisodeId(null);
      setCollectionOpen(true);
    }, []);

    const handleCloseAll = useCallback(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setUnmutedCardId(null);
      setActiveEpisodeId(null);
      setCollectionOpen(false);
    }, []);

    const handleToggleCardMute = useCallback((id: number) => {
      setUnmutedCardId((prev) => (prev === id ? null : id));
    }, []);

    const handleToggleLeadMute = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const nextMuted = !leadMuted;
        if (leadVideoRef.current) {
          attemptSafeVideoPlay(leadVideoRef.current, { muted: nextMuted, loop: true });
        }
        setLeadMuted(nextMuted);
      },
      [leadMuted]
    );

    const handlePrevEpisode = useCallback(() => {
      setActiveEpisodeId((prev) => (prev === null ? null : getPreviousEpisodeId(prev)));
    }, []);

    const handleNextEpisode = useCallback(() => {
      setActiveEpisodeId((prev) => (prev === null ? null : getNextEpisodeId(prev)));
    }, []);

    const handleTogglePlayerMute = useCallback(() => {
      setPlayerMuted((prev) => !prev);
    }, []);

    const handleFallbackMuted = useCallback(() => {
      setPlayerMuted(true);
    }, []);

    // Escape key cleanly dismisses expanded panel/player
    useEffect(() => {
      if (!isAnyPanelOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCloseAll();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [isAnyPanelOpen, handleCloseAll]);

    const featuredLead = STORY_EPISODES[0];
    const secondaryLeft = STORY_EPISODES[11]; // Part 12 architectural tour
    const secondaryRight = STORY_EPISODES[13]; // Part 14 Pran Pratishtha

    const partNumberLabel = useCallback(
      (id: number) => `${s.partPrefix} ${String(id).padStart(2, '0')} / 14`,
      [s.partPrefix]
    );

    return (
      <section
        id="know-the-story"
        aria-labelledby="know-the-story-heading"
        className="relative w-full overflow-x-clip py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF4E8] via-[#F3E7D6] to-[#FAF4E8] text-[#3C2A20] border-b border-[#E5D1B6] scroll-mt-20"
      >
        {/* Centered Rotating Sacred Background Chakra matching other sections */}
        <SectionBackgroundChakra reducedMotion={reducedMotion} />

        {/* Top and Bottom Antique-Gold Hairline Accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C29A54]/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C29A54]/55 to-transparent"
        />

        <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* LEFT EDITORIAL COLUMN: Heading, Subtitle & Documentary CTA */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-2.5 sm:mb-3">
                <PeacockFeather size={22} />
                <span className="font-cinzel text-[11px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#A67C57] font-bold">
                  {s.kicker}
                </span>
                <PeacockFeather size={22} className="transform scale-x-[-1]" />
              </div>

              <h2
                id="know-the-story-heading"
                className="font-serif-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-[#741C24] tracking-tight mb-3 sm:mb-4 drop-shadow-[0_2px_12px_rgba(116,28,36,0.08)] text-balance"
              >
                {s.title}
              </h2>

              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-5">
                <div className="h-[1px] bg-gradient-to-r from-[#C29A54] to-transparent w-16 sm:w-28" />
                <LotusOrnament size={22} className="text-[#C29A54] shrink-0" />
                <div className="h-[1px] bg-gradient-to-l from-[#C29A54] to-transparent w-16 sm:w-28 lg:hidden" />
              </div>

              <p className="font-serif text-sm sm:text-lg lg:text-xl text-[#3F291D]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-5 sm:mb-7">
                “{s.subtitle}”
              </p>

              {/* Primary Documentary Action Area */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-5">
                <button
                  type="button"
                  data-testid="explore-all-episodes-btn"
                  onClick={handleOpenCollection}
                  className="group relative overflow-hidden min-h-[48px] sm:min-h-[50px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.13em] sm:tracking-[0.14em] bg-gradient-to-r from-[#741C24] via-[#8B2430] to-[#741C24] text-[#FFFDF8] border border-[#C29A54] shadow-[0_12px_28px_rgba(116,28,36,0.22)] hover:shadow-[0_14px_32px_rgba(116,28,36,0.3)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer whitespace-nowrap"
                >
                  <Film className="w-4 h-4 text-[#E8C784] shrink-0" />
                  <span>{s.ctaExplore}</span>
                  <ChevronRight className="w-4 h-4 text-[#E8C784] group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>

                <span className="font-cinzel text-xs sm:text-sm tracking-[0.16em] uppercase text-[#6B4832] font-bold">
                  {s.supportingCount}
                </span>
              </div>
            </motion.div>

            {/* RIGHT VISUAL SHOWCASE CLUSTER: Responsive 3-Card Showcase (Center Lead Video + 2 Staggered Poster Cards on both Mobile & Desktop) */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative flex items-center justify-center py-1 sm:py-2"
            >
              <div className="relative w-full max-w-[350px] sm:max-w-[460px] lg:max-w-[480px] flex items-center justify-center px-3 sm:px-0">
                {/* Left Staggered Secondary Video Card (Responsive on mobile & desktop) */}
                <button
                  type="button"
                  data-testid="know-the-story-side-left"
                  onClick={() => handleSelectEpisode(secondaryLeft.id)}
                  aria-label={`${partNumberLabel(secondaryLeft.id)} — ${secondaryLeft.title[language]}`}
                  className="absolute left-0 sm:left-2 top-6 sm:top-8 w-[34%] sm:w-[38%] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FFFDF8] p-1 sm:p-1.5 border-2 border-[#C29A54]/70 shadow-[0_14px_34px_rgba(63,41,29,0.16)] opacity-90 hover:opacity-100 hover:border-[#741C24] sm:-translate-x-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-10"
                >
                  <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]">
                    <img
                      src={secondaryLeft.poster}
                      alt={secondaryLeft.title[language]}
                      className="w-full h-full object-contain object-center"
                      loading="eager"
                      decoding="async"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 p-1 sm:p-1.5 rounded-full bg-black/65 border border-[#E8C784]/60 text-[#E8C784]"
                    >
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-left">
                      <span className="block font-cinzel text-[8px] sm:text-[9px] tracking-wider sm:tracking-widest uppercase text-[#E8C784] font-bold truncate">
                        {partNumberLabel(secondaryLeft.id)}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Right Staggered Secondary Video Card (Responsive on mobile & desktop) */}
                <button
                  type="button"
                  data-testid="know-the-story-side-right"
                  onClick={() => handleSelectEpisode(secondaryRight.id)}
                  aria-label={`${partNumberLabel(secondaryRight.id)} — ${secondaryRight.title[language]}`}
                  className="absolute right-0 sm:right-2 bottom-4 sm:bottom-6 w-[34%] sm:w-[38%] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FFFDF8] p-1 sm:p-1.5 border-2 border-[#C29A54]/70 shadow-[0_14px_34px_rgba(63,41,29,0.16)] opacity-90 hover:opacity-100 hover:border-[#741C24] sm:translate-x-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-10"
                >
                  <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]">
                    <img
                      src={secondaryRight.poster}
                      alt={secondaryRight.title[language]}
                      className="w-full h-full object-contain object-center"
                      loading="eager"
                      decoding="async"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-black/65 border border-[#E8C784]/60 text-[#E8C784]"
                    >
                      <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-left">
                      <span className="block font-cinzel text-[8px] sm:text-[9px] tracking-wider sm:tracking-widest uppercase text-[#E8C784] font-bold truncate">
                        {partNumberLabel(secondaryRight.id)}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Center Primary Autoplaying Vertical Video Card */}
                <div
                  ref={leadCardRef}
                  role="button"
                  tabIndex={0}
                  data-testid="know-the-story-lead-poster"
                  onClick={() => handleSelectEpisode(featuredLead.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectEpisode(featuredLead.id);
                    }
                  }}
                  aria-label={`${s.watchEpisode}: ${featuredLead.title[language]}`}
                  className="group relative z-20 w-[62%] sm:w-[56%] rounded-2xl p-1.5 sm:p-2 bg-[#FFFDF8] border-2 border-[#C29A54] shadow-[0_22px_50px_rgba(63,41,29,0.22)] hover:border-[#741C24] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1D120C]">
                    <video
                      ref={leadVideoRef}
                      src={featuredLead.src}
                      poster={featuredLead.poster}
                      autoPlay
                      loop
                      muted={leadEffectiveMuted}
                      playsInline
                      preload={isLeadInView ? 'auto' : 'metadata'}
                      aria-label={featuredLead.title[language]}
                      className="w-full h-full object-contain object-center block"
                    />

                    {/* Top Part & Duration Header */}
                    <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1.5 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-md bg-[#2B1218]/90 border border-[#C59B56]/65 font-cinzel text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-[#E1BD80] font-bold">
                        {partNumberLabel(featuredLead.id)}
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-black/75 font-mono text-[10px] sm:text-[11px] text-[#FFF5E8] tabular-nums">
                        {formatEpisodeDuration(featuredLead.durationSeconds)}
                      </span>
                    </div>

                    {/* Bottom Caption Overlay + Non-Overlapping Mute/Unmute Button */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-[#1D0D11] via-[#1D0D11]/90 to-transparent flex items-end justify-between gap-2 text-left">
                      <div className="min-w-0 flex-1 pointer-events-none">
                        <h3 className="font-serif-royal text-xs sm:text-base font-bold text-[#FFF5E8] leading-snug line-clamp-2">
                          {featuredLead.title[language]}
                        </h3>
                        <span className="mt-0.5 inline-flex items-center gap-1 font-cinzel text-[9px] sm:text-[10px] tracking-widest uppercase text-[#E1BD80]">
                          {s.watchEpisode}
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>

                      <button
                        type="button"
                        data-testid="story-lead-mute-btn"
                        onClick={handleToggleLeadMute}
                        aria-pressed={!leadMuted}
                        aria-label={!leadMuted ? s.muteAudio : s.unmuteAudio}
                        className={`relative z-20 shrink-0 min-h-[34px] px-2.5 py-1 rounded-full border text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                          !leadMuted
                            ? 'bg-[#741C24]/95 text-[#FFF8E8] border-[#E8C784]'
                            : 'bg-black/80 hover:bg-[#741C24]/90 text-white border-white/30'
                        }`}
                      >
                        {!leadMuted ? (
                          <>
                            <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5D77F]" />
                            <span>{s.muteAudio}</span>
                          </>
                        ) : (
                          <>
                            <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C784]" />
                            <span>{s.unmuteAudio}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================
            INLINE EXPANDABLE DOCUMENTARY STAGE (NON-BLOCKING SCROLL + VIEWPORT-GATED STREAMING)
           ======================================================================== */}
        <AnimatePresence initial={false}>
          {isAnyPanelOpen && (
            <motion.div
              ref={expandedPanelRef}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              role="region"
              aria-label={
                activeEpisode
                  ? `${partNumberLabel(activeEpisode.id)} — ${activeEpisode.title[language]}`
                  : s.collectionTitle
              }
              data-testid={
                activeEpisode ? 'story-video-player-dialog' : 'story-collection-dialog'
              }
              className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 mt-8 sm:mt-12 scroll-mt-24"
            >
              {!activeEpisode ? (
                /* ---------------- INLINE SCROLLABLE 14-EPISODE AUTOPLAY GRID ---------------- */
                <div className="relative w-full rounded-2xl bg-[#FAF4E8] border-2 border-[#C29A54] shadow-[0_20px_50px_rgba(63,41,29,0.16)] overflow-hidden flex flex-col">
                  {/* Drawer Header in Warm Parchment Beige */}
                  <div className="px-4 sm:px-7 py-3.5 sm:py-5 border-b border-[#E5D1B6] bg-[#F3E7D6] flex items-center justify-between gap-3 shrink-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[#A67C57] font-cinzel text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-bold mb-0.5 sm:mb-1">
                        <Film className="w-3.5 h-3.5 text-[#741C24] shrink-0" />
                        <span className="truncate">{s.collectionKicker}</span>
                      </div>
                      <h3 className="font-serif-royal text-xl sm:text-3xl font-bold text-[#741C24] leading-tight">
                        {s.collectionTitle}
                      </h3>
                    </div>

                    <button
                      type="button"
                      data-testid="story-collection-close-btn"
                      onClick={handleCloseAll}
                      aria-label={s.closeModal}
                      className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-xs"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Independently Scrollable 14-Card Panel (Responsive 2-column mobile grid + viewport-gated video streaming) */}
                  <div
                    ref={collectionScrollRef}
                    data-testid="story-collection-scroll-area"
                    className="max-h-[80vh] overflow-y-auto overscroll-auto p-3 sm:p-6 lg:p-7"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
                      {STORY_EPISODES.map((ep, idx) => (
                        <StoryEpisodeCard
                          key={ep.id}
                          episode={ep}
                          index={idx}
                          language={language}
                          isUnmuted={unmutedCardId === ep.id}
                          isPlayerOpen={Boolean(activeEpisodeId)}
                          partLabel={partNumberLabel(ep.id)}
                          muteLabel={s.muteAudio}
                          unmuteLabel={s.unmuteAudio}
                          scrollRootRef={collectionScrollRef}
                          onSelect={handleSelectEpisode}
                          onToggleMute={handleToggleCardMute}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* ---------------- INLINE CINEMATIC 9:16 DOCUMENTARY VIDEO PLAYER ---------------- */
                <StoryInlinePlayer
                  episode={activeEpisode}
                  language={language}
                  partLabel={partNumberLabel(activeEpisode.id)}
                  isMuted={playerMuted}
                  labels={{
                    backToEpisodes: s.backToEpisodes,
                    closeModal: s.closeModal,
                    unmuteAudio: s.unmuteAudio,
                    muteAudio: s.muteAudio,
                    seekTimeline: s.seekTimeline,
                    play: s.play,
                    pause: s.pause,
                    toggleFullscreen: s.toggleFullscreen,
                    prevEpisode: s.prevEpisode,
                    nextEpisode: s.nextEpisode,
                  }}
                  onToggleMute={handleTogglePlayerMute}
                  onFallbackMuted={handleFallbackMuted}
                  onBackToCollection={handleBackToCollection}
                  onClose={handleCloseAll}
                  onPrev={handlePrevEpisode}
                  onNext={handleNextEpisode}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }
);

export default KnowTheStorySection;
