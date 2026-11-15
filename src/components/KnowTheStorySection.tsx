import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
  Film,
  Grid,
  ZoomIn,
} from 'lucide-react';
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

export interface KnowTheStorySectionProps {
  reducedMotion?: boolean;
}

export const KnowTheStorySection: React.FC<KnowTheStorySectionProps> = ({
  reducedMotion = false,
}) => {
  const { language, tDict } = useI18n();
  const s = tDict.story;

  const [collectionOpen, setCollectionOpen] = useState(false);
  const [activeEpisodeId, setActiveEpisodeId] = useState<number | null>(null);
  const [leadMuted, setLeadMuted] = useState(true);
  const [unmutedCardId, setUnmutedCardId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const leadVideoRef = useRef<HTMLVideoElement | null>(null);
  const gridVideoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const playerVideoRef = useRef<HTMLVideoElement | null>(null);
  const playerStageRef = useRef<HTMLDivElement | null>(null);
  const expandedPanelRef = useRef<HTMLDivElement | null>(null);

  const activeEpisode: StoryEpisode | undefined =
    activeEpisodeId !== null ? getStoryEpisodeById(activeEpisodeId) : undefined;

  const isAnyModalOpen = collectionOpen || activeEpisodeId !== null;

  // Gently bring newly expanded inline panel/video into comfortable view without locking page scroll
  const scrollPanelIntoView = useCallback(() => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        const el = expandedPanelRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < 72 || rect.top > window.innerHeight * 0.72) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 90);
    });
  }, []);

  // Keep featured lead showcase video synced (muted when any modal opens)
  useEffect(() => {
    const vid = leadVideoRef.current;
    if (!vid) return;
    vid.muted = leadMuted || isAnyModalOpen;
    if (vid.paused) {
      vid.play().catch(() => {});
    }
  }, [leadMuted, isAnyModalOpen]);

  // Keep all 14 listed collection videos autoplaying in loop with single-card sound focus
  useEffect(() => {
    if (!collectionOpen) return;
    for (const ep of STORY_EPISODES) {
      const vid = gridVideoRefs.current[ep.id];
      if (!vid) continue;
      vid.muted = Boolean(activeEpisodeId) || unmutedCardId !== ep.id;
      if (vid.paused) {
        vid.play().catch(() => {});
      }
    }
  }, [collectionOpen, activeEpisodeId, unmutedCardId]);

  // Sync mute state cleanly to active single-player <video> element without interrupting playback
  useEffect(() => {
    const vid = playerVideoRef.current;
    if (!vid) return;
    vid.muted = isMuted;
  }, [isMuted, activeEpisodeId]);

  // Reset timeline counters when switching episode
  useEffect(() => {
    if (!activeEpisode) return;
    setCurrentTime(0);
    setDuration(activeEpisode.durationSeconds);
    setIsPlaying(true);
  }, [activeEpisode?.id]);

  // Track browser fullscreen exit
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const pausePlayerVideo = useCallback(() => {
    const vid = playerVideoRef.current;
    if (vid && !vid.paused) {
      vid.pause();
    }
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
    pausePlayerVideo();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setActiveEpisodeId(null);
    setCollectionOpen(true);
  }, [pausePlayerVideo]);

  const handleCloseAll = useCallback(() => {
    pausePlayerVideo();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setUnmutedCardId(null);
    setActiveEpisodeId(null);
    setCollectionOpen(false);
  }, [pausePlayerVideo]);

  const handleToggleCardMute = useCallback(
    (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const nextUnmutedId = unmutedCardId === id ? null : id;
      for (const ep of STORY_EPISODES) {
        const vid = gridVideoRefs.current[ep.id];
        if (!vid) continue;
        const shouldBeMuted = nextUnmutedId !== ep.id;
        vid.muted = shouldBeMuted;
        if (!shouldBeMuted && vid.paused) {
          vid.play().catch(() => {});
        }
      }
      setUnmutedCardId(nextUnmutedId);
    },
    [unmutedCardId]
  );

  const handlePrevEpisode = useCallback(() => {
    if (activeEpisodeId === null) return;
    pausePlayerVideo();
    setActiveEpisodeId(getPreviousEpisodeId(activeEpisodeId));
  }, [activeEpisodeId, pausePlayerVideo]);

  const handleNextEpisode = useCallback(() => {
    if (activeEpisodeId === null) return;
    pausePlayerVideo();
    setActiveEpisodeId(getNextEpisodeId(activeEpisodeId));
  }, [activeEpisodeId, pausePlayerVideo]);

  const handleTogglePlay = useCallback(() => {
    const vid = playerVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    if (playerVideoRef.current) {
      playerVideoRef.current.muted = nextMuted;
    }
    setIsMuted(nextMuted);
  }, [isMuted]);

  const handleToggleFullscreen = useCallback(() => {
    const stage = playerStageRef.current;
    if (!stage) return;
    if (!document.fullscreenElement) {
      if (typeof stage.requestFullscreen === 'function') {
        stage.requestFullscreen().catch(() => {});
      }
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation inside collection & single-video player
  useEffect(() => {
    if (!isAnyModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseAll();
        return;
      }
      if (activeEpisodeId !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevEpisode();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextEpisode();
        } else if (e.key === ' ' && (e.target as HTMLElement)?.tagName !== 'BUTTON') {
          e.preventDefault();
          handleTogglePlay();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    isAnyModalOpen,
    activeEpisodeId,
    handleCloseAll,
    handlePrevEpisode,
    handleNextEpisode,
    handleTogglePlay,
  ]);

  const featuredLead = STORY_EPISODES[0];
  const secondaryLeft = STORY_EPISODES[11]; // Part 12 architectural tour
  const secondaryRight = STORY_EPISODES[13]; // Part 14 Pran Pratishtha

  const partNumberLabel = (id: number) =>
    `${s.partPrefix} ${String(id).padStart(2, '0')} / 14`;

  return (
    <section
      id="know-the-story"
      aria-labelledby="know-the-story-heading"
      className="relative w-full overflow-x-clip py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF4E8] via-[#F3E7D6] to-[#FAF4E8] text-[#3C2A20] border-b border-[#E5D1B6] scroll-mt-20"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT EDITORIAL COLUMN: Heading, Subtitle & Documentary CTA */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
              <PeacockFeather size={22} />
              <span className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] text-[#A67C57] font-bold">
                {s.kicker}
              </span>
              <PeacockFeather size={22} className="transform scale-x-[-1]" />
            </div>

            <h2
              id="know-the-story-heading"
              className="font-serif-royal text-4xl sm:text-5xl lg:text-6xl font-bold text-[#741C24] tracking-tight mb-4 drop-shadow-[0_2px_12px_rgba(116,28,36,0.08)]"
            >
              {s.title}
            </h2>

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="h-[1px] bg-gradient-to-r from-[#C29A54] to-transparent w-20 sm:w-28" />
              <LotusOrnament size={22} className="text-[#C29A54] shrink-0" />
              <div className="h-[1px] bg-gradient-to-l from-[#C29A54] to-transparent w-20 sm:w-28 lg:hidden" />
            </div>

            <p className="font-serif text-base sm:text-lg lg:text-xl text-[#3F291D]/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-7">
              “{s.subtitle}”
            </p>

            {/* Primary Documentary Action Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <button
                type="button"
                data-testid="explore-all-episodes-btn"
                onClick={handleOpenCollection}
                className="group relative overflow-hidden min-h-[50px] px-7 py-3.5 rounded-xl font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.14em] bg-gradient-to-r from-[#741C24] via-[#8B2430] to-[#741C24] text-[#FFFDF8] border border-[#C29A54] shadow-[0_12px_28px_rgba(116,28,36,0.22)] hover:shadow-[0_14px_32px_rgba(116,28,36,0.3)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
              >
                <Film className="w-4 h-4 text-[#E8C784] shrink-0" />
                <span>{s.ctaExplore}</span>
                <ChevronRight className="w-4 h-4 text-[#E8C784] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <span className="font-cinzel text-xs sm:text-sm tracking-[0.16em] uppercase text-[#6B4832] font-bold">
                {s.supportingCount}
              </span>
            </div>
          </motion.div>

          {/* RIGHT VISUAL SHOWCASE CLUSTER: 1 Lead Looping Vertical Video + 2 Staggered Poster Cards */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center py-2"
          >
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] flex items-center justify-center">
              {/* Left Staggered Secondary Video Card */}
              <button
                type="button"
                data-testid="know-the-story-side-left"
                onClick={() => handleSelectEpisode(secondaryLeft.id)}
                aria-label={`${partNumberLabel(secondaryLeft.id)} — ${secondaryLeft.title[language]}`}
                className="hidden sm:block absolute left-1 sm:left-2 top-8 w-[38%] aspect-[9/16] rounded-2xl overflow-hidden bg-[#FFFDF8] p-1.5 border-2 border-[#C29A54]/70 shadow-[0_14px_34px_rgba(63,41,29,0.16)] opacity-90 hover:opacity-100 hover:border-[#741C24] -translate-x-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-10"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1D120C]">
                  <img
                    src={secondaryLeft.poster}
                    alt={secondaryLeft.title[language]}
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-2 p-1.5 rounded-full bg-black/65 border border-[#E8C784]/60 text-[#E8C784]"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-left">
                    <span className="block font-cinzel text-[9px] tracking-widest uppercase text-[#E8C784] font-bold">
                      {partNumberLabel(secondaryLeft.id)}
                    </span>
                  </div>
                </div>
              </button>

              {/* Right Staggered Secondary Video Card */}
              <button
                type="button"
                data-testid="know-the-story-side-right"
                onClick={() => handleSelectEpisode(secondaryRight.id)}
                aria-label={`${partNumberLabel(secondaryRight.id)} — ${secondaryRight.title[language]}`}
                className="hidden sm:block absolute right-1 sm:right-2 bottom-6 w-[38%] aspect-[9/16] rounded-2xl overflow-hidden bg-[#FFFDF8] p-1.5 border-2 border-[#C29A54]/70 shadow-[0_14px_34px_rgba(63,41,29,0.16)] opacity-90 hover:opacity-100 hover:border-[#741C24] translate-x-2 hover:-translate-y-1 transition-all duration-300 cursor-pointer z-10"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1D120C]">
                  <img
                    src={secondaryRight.poster}
                    alt={secondaryRight.title[language]}
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/65 border border-[#E8C784]/60 text-[#E8C784]"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-left">
                    <span className="block font-cinzel text-[9px] tracking-widest uppercase text-[#E8C784] font-bold">
                      {partNumberLabel(secondaryRight.id)}
                    </span>
                  </div>
                </div>
              </button>

              {/* Center Primary Autoplaying Vertical Video Card */}
              <div
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
                className="group relative z-20 w-[68%] sm:w-[56%] rounded-2xl p-2 bg-[#FFFDF8] border-2 border-[#C29A54] shadow-[0_22px_50px_rgba(63,41,29,0.2)] hover:border-[#741C24] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1D120C]">
                  <video
                    ref={leadVideoRef}
                    src={featuredLead.src}
                    poster={featuredLead.poster}
                    autoPlay
                    loop
                    muted={leadMuted || isAnyModalOpen}
                    playsInline
                    preload="metadata"
                    aria-label={featuredLead.title[language]}
                    className="w-full h-full object-contain object-center block"
                  />

                  {/* Top Part & Duration Header */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#2B1218]/90 border border-[#C59B56]/65 font-cinzel text-[10px] tracking-widest uppercase text-[#E1BD80] font-bold">
                      {partNumberLabel(featuredLead.id)}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/75 font-mono text-[11px] text-[#FFF5E8]">
                      {formatEpisodeDuration(featuredLead.durationSeconds)}
                    </span>
                  </div>

                  {/* Small bottom Mute / Unmute button matching Gallery style */}
                  <button
                    type="button"
                    data-testid="story-lead-mute-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextMuted = !leadMuted;
                      if (leadVideoRef.current) {
                        leadVideoRef.current.muted = nextMuted;
                        if (!nextMuted && leadVideoRef.current.paused) {
                          leadVideoRef.current.play().catch(() => {});
                        }
                      }
                      setLeadMuted(nextMuted);
                    }}
                    aria-pressed={!leadMuted}
                    aria-label={!leadMuted ? s.muteAudio : s.unmuteAudio}
                    className={`absolute bottom-14 right-2.5 z-20 px-2.5 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                      !leadMuted
                        ? 'bg-[#741C24]/90 text-[#FFF8E8] border-[#E8C784]'
                        : 'bg-black/70 hover:bg-[#741C24]/90 text-white border-white/25'
                    }`}
                  >
                    {!leadMuted ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                        <span>{s.muteAudio}</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-[#E8C784]" />
                        <span>{s.unmuteAudio}</span>
                      </>
                    )}
                  </button>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1D0D11] via-[#1D0D11]/85 to-transparent text-left pointer-events-none">
                    <h3 className="font-serif-royal text-sm sm:text-base font-bold text-[#FFF5E8] leading-snug">
                      {featuredLead.title[language]}
                    </h3>
                    <span className="mt-0.5 inline-flex items-center gap-1 font-cinzel text-[10px] tracking-widest uppercase text-[#E1BD80]">
                      {s.watchEpisode}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================
          INLINE EXPANDABLE DOCUMENTARY STAGE (NON-BLOCKING SCROLL + 14-CARD SCROLL)
         ======================================================================== */}
      <AnimatePresence initial={false}>
        {isAnyModalOpen && (
          <motion.div
            ref={expandedPanelRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
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
            className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-10 sm:mt-12"
          >
            {!activeEpisode ? (
              /* ---------------- INLINE SCROLLABLE 14-EPISODE AUTOPLAY GRID ---------------- */
              <div className="relative w-full rounded-2xl bg-[#FAF4E8] border-2 border-[#C29A54] shadow-[0_20px_50px_rgba(63,41,29,0.16)] overflow-hidden flex flex-col">
                {/* Drawer Header in Warm Parchment Beige */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E5D1B6] bg-[#F3E7D6] flex items-start sm:items-center justify-between gap-4 shrink-0">
                  <div>
                    <div className="flex items-center gap-2 text-[#A67C57] font-cinzel text-[11px] uppercase tracking-[0.18em] font-bold mb-1">
                      <Film className="w-3.5 h-3.5 text-[#741C24]" />
                      <span>{s.collectionKicker}</span>
                    </div>
                    <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#741C24]">
                      {s.collectionTitle}
                    </h3>
                  </div>

                  <button
                    type="button"
                    data-testid="story-collection-close-btn"
                    onClick={handleCloseAll}
                    aria-label={s.closeModal}
                    className="min-w-[42px] min-h-[42px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-xs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Independently Scrollable 14-Card Panel (`max-h-[80vh] overflow-y-auto overscroll-auto`) */}
                <div
                  data-testid="story-collection-scroll-area"
                  className="max-h-[80vh] overflow-y-auto overscroll-auto p-4 sm:p-6 lg:p-7"
                >
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {STORY_EPISODES.map((ep) => {
                      const isCardUnmuted = unmutedCardId === ep.id;
                      return (
                        <div
                          key={ep.id}
                          role="button"
                          tabIndex={0}
                          data-testid={`story-episode-card-${ep.id}`}
                          onClick={() => handleSelectEpisode(ep.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectEpisode(ep.id);
                            }
                          }}
                          className="group text-left rounded-2xl p-2 bg-[#FFFDF8] border-2 border-[#C29A54]/75 hover:border-[#741C24] shadow-[0_8px_22px_rgba(63,41,29,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#741C24]"
                        >
                          {/* Exact 9:16 Uncropped Autoplaying Looping Video Frame */}
                          <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1D120C]">
                            <video
                              ref={(el) => {
                                gridVideoRefs.current[ep.id] = el;
                              }}
                              src={ep.src}
                              poster={ep.poster}
                              autoPlay
                              loop
                              muted={!isCardUnmuted || Boolean(activeEpisode)}
                              playsInline
                              preload="metadata"
                              aria-label={ep.title[language]}
                              className="w-full h-full object-contain object-center block"
                            />

                            {/* Part Number & Expand Trigger */}
                            <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#2B1218]/90 border border-[#C59B56]/60 font-cinzel text-[10px] tracking-wider uppercase text-[#E1BD80] font-bold pointer-events-none">
                                {partNumberLabel(ep.id)}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectEpisode(ep.id);
                                }}
                                aria-label={`Inspect ${ep.title[language]}`}
                                className="p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md cursor-pointer"
                              >
                                <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                              </button>
                            </div>

                            {/* Bottom-Left Duration & Bottom-Right Mute/Unmute Toggle */}
                            <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 font-mono text-[11px] text-[#FFF5E8] pointer-events-none">
                              {formatEpisodeDuration(ep.durationSeconds)}
                            </span>

                            <button
                              type="button"
                              data-testid={`story-card-mute-btn-${ep.id}`}
                              onClick={(e) => handleToggleCardMute(ep.id, e)}
                              aria-pressed={isCardUnmuted}
                              aria-label={
                                isCardUnmuted
                                  ? `${s.muteAudio} ${ep.title[language]}`
                                  : `${s.unmuteAudio} ${ep.title[language]}`
                              }
                              className={`absolute bottom-2 right-2 z-20 px-2.5 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                                isCardUnmuted
                                  ? 'bg-[#741C24]/92 text-[#FFF8E8] border-[#E8C784]'
                                  : 'bg-black/75 hover:bg-[#741C24]/90 text-white border-white/25'
                              }`}
                            >
                              {isCardUnmuted ? (
                                <>
                                  <Volume2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                                  <span>{s.muteAudio}</span>
                                </>
                              ) : (
                                <>
                                  <VolumeX className="w-3.5 h-3.5 text-[#E8C784]" />
                                  <span>{s.unmuteAudio}</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Clean Warm Beige-Complementary Card Footer */}
                          <div className="pt-2.5 px-1.5 pb-1 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif-royal text-base font-bold text-[#741C24] group-hover:text-[#3C2A20] transition-colors leading-snug mb-1">
                                {ep.title[language]}
                              </h4>
                              <p className="text-xs text-[#715847] font-serif leading-relaxed line-clamp-2">
                                {ep.summary[language]}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* ---------------- INLINE CINEMATIC 9:16 DOCUMENTARY VIDEO PLAYER ---------------- */
              <div
                ref={playerStageRef}
                className="relative w-full max-w-5xl max-h-[80vh] overflow-y-auto overscroll-auto mx-auto rounded-2xl border-2 border-[#C29A54] shadow-[0_24px_60px_rgba(63,41,29,0.2)] flex flex-col md:flex-row bg-[#FAF4E8]"
              >
                {/* Top Header Bar on Mobile */}
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#E5D1B6] bg-[#F3E7D6] md:hidden shrink-0">
                  <button
                    type="button"
                    onClick={handleBackToCollection}
                    className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] text-[11px] font-cinzel font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>{s.backToEpisodes}</span>
                  </button>

                  <span className="font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold">
                    {partNumberLabel(activeEpisode.id)}
                  </span>

                  <button
                    type="button"
                    data-testid="story-player-close-mobile-btn"
                    onClick={handleCloseAll}
                    aria-label={s.closeModal}
                    className="min-w-[38px] min-h-[38px] p-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Uncropped 9:16 Video Viewport (Mounts ONLY activeEpisode.src, loops cleanly) */}
                <div className="relative flex-1 bg-[#1D120C] flex items-center justify-center p-2 sm:p-3 min-h-0">
                  <div className="relative h-full max-h-[54vh] md:max-h-[78vh] aspect-[9/16] rounded-xl overflow-hidden border border-[#C29A54]/60 bg-black shadow-2xl flex items-center justify-center">
                    <video
                      key={activeEpisode.id}
                      ref={playerVideoRef}
                      src={activeEpisode.src}
                      poster={activeEpisode.poster}
                      autoPlay
                      loop
                      playsInline
                      muted={isMuted}
                      preload="metadata"
                      data-testid="story-active-video"
                      aria-label={activeEpisode.title[language]}
                      onClick={handleTogglePlay}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onLoadedMetadata={(e) => {
                        const d = e.currentTarget.duration;
                        if (Number.isFinite(d) && d > 0) setDuration(d);
                      }}
                      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                      className="w-full h-full object-contain cursor-pointer"
                    />

                    {/* Bottom Mute / Unmute Toggle */}
                    <button
                      type="button"
                      data-testid="story-player-mute-btn"
                      onClick={handleToggleMute}
                      aria-pressed={!isMuted}
                      aria-label={isMuted ? s.unmuteAudio : s.muteAudio}
                      className={`absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-full border text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                        !isMuted
                          ? 'bg-[#741C24]/92 text-[#FFF8E8] border-[#E8C784]'
                          : 'bg-black/75 hover:bg-[#741C24]/90 text-white border-white/25'
                      }`}
                    >
                      {!isMuted ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                          <span>{s.muteAudio}</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-[#E8C784]" />
                          <span>{s.unmuteAudio}</span>
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
                        onClick={handleBackToCollection}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] text-xs font-cinzel font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span>{s.backToEpisodes}</span>
                      </button>

                      <button
                        type="button"
                        data-testid="story-player-close-btn"
                        onClick={handleCloseAll}
                        aria-label={s.closeModal}
                        className="min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <X className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <span className="hidden md:inline-block px-2.5 py-1 rounded bg-[#F3E7D6] border border-[#C29A54]/70 font-cinzel text-[11px] uppercase tracking-widest text-[#741C24] font-bold mb-2.5">
                      {partNumberLabel(activeEpisode.id)}
                    </span>

                    <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#741C24] leading-snug mb-2">
                      {activeEpisode.title[language]}
                    </h4>

                    <p className="font-serif text-xs sm:text-sm text-[#3F291D]/90 leading-relaxed">
                      {activeEpisode.summary[language]}
                    </p>
                  </div>

                  {/* Playback Scrubber, Play/Pause, Fullscreen & Episode Prev/Next */}
                  <div className="space-y-3 pt-3 border-t border-[#E5D1B6]">
                    <div>
                      <input
                        type="range"
                        min={0}
                        max={duration || activeEpisode.durationSeconds}
                        step={0.25}
                        value={Math.min(currentTime, duration || activeEpisode.durationSeconds)}
                        aria-label={s.seekTimeline}
                        onChange={(e) => {
                          const nextVal = Number(e.target.value);
                          setCurrentTime(nextVal);
                          if (playerVideoRef.current) {
                            playerVideoRef.current.currentTime = nextVal;
                          }
                        }}
                        className="w-full accent-[#741C24] cursor-pointer h-1.5 bg-[#E5D1B6] rounded-lg"
                      />
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6B4832] mt-1">
                        <span>{formatEpisodeDuration(currentTime)}</span>
                        <span>
                          {formatEpisodeDuration(duration || activeEpisode.durationSeconds)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        data-testid="story-player-play-btn"
                        onClick={handleTogglePlay}
                        className="flex-1 min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#741C24] to-[#8B2430] text-[#FFFDF8] border border-[#C29A54] font-cinzel text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:brightness-110 transition"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>{s.pause}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>{s.play}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleToggleFullscreen}
                        aria-label={s.toggleFullscreen}
                        className="min-w-[42px] min-h-[42px] p-2.5 rounded-xl bg-[#FFFDF8] hover:bg-[#741C24] text-[#741C24] hover:text-[#FFFDF8] border border-[#C29A54] flex items-center justify-center cursor-pointer transition-colors"
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
                        onClick={handlePrevEpisode}
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#741C24]" />
                        <span>{s.prevEpisode}</span>
                      </button>
                      <button
                        type="button"
                        data-testid="story-player-next-btn"
                        onClick={handleNextEpisode}
                        className="min-h-[40px] px-3 py-2 rounded-xl bg-[#FFFDF8] hover:bg-[#F3E7D6] text-[#3C2A20] border border-[#C29A54]/70 font-cinzel text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <span>{s.nextEpisode}</span>
                        <ChevronRight className="w-4 h-4 text-[#741C24]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KnowTheStorySection;
