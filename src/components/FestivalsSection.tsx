import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, Clock, Bell, Check, ArrowRight, X, Sparkles, ScrollText } from 'lucide-react';
import { Language, FESTIVALS_DATA, FestivalEvent } from '../data/templeData';
import {
  EKADASHI_SCHEDULE,
  EkadashiEntry,
  getLocalizedEkadashiView,
} from '../data/ekadashiData';
import { useI18n } from '../i18n/I18nContext';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';
import { getFestivalArtwork } from './festivalArt';
import { FestivalMotionEmblem } from './FestivalMotionEmblem';
import { EkadashiScrollModal } from './EkadashiScrollModal';
import {
  getCardStaggerDelay,
  getLocalizedFestivalView,
} from '../utils/festivalHelpers';
import {
  calculateCardTiltAndLight,
  getCardTransformString,
} from '../utils/motionUtils';

type FestivalTabMode = 'all' | 'ekadashi';

interface FestivalsSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

interface FestivalCardProps {
  festival: FestivalEvent;
  index: number;
  language: Language;
  isSubscribed: boolean;
  reducedMotion: boolean;
  viewProgrammeLabel: string;
  remindMeLabel: string;
  reminderSetLabel: string;
  onSelect: (festival: FestivalEvent) => void;
  onToggleRemind: (id: string, e: React.MouseEvent) => void;
}

const FestivalCard: React.FC<FestivalCardProps> = React.memo(({
  festival,
  index,
  language,
  isSubscribed,
  reducedMotion,
  viewProgrammeLabel,
  remindMeLabel,
  reminderSetLabel,
  onSelect,
  onToggleRemind,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tiltState, setTiltState] = useState({
    xPercent: 50,
    yPercent: 50,
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
  });

  const view = useMemo(
    () => getLocalizedFestivalView(festival, language),
    [festival, language]
  );
  const artworkSrc = getFestivalArtwork(festival.id);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTiltState(calculateCardTiltAndLight(rect, e.clientX, e.clientY, 2.2));
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTiltState({
      xPercent: 50,
      yPercent: 50,
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
    });
  };

  return (
    <motion.article
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
      viewport={{ once: true, amount: 0.02, margin: '260px 0px' }}
      transition={{
        duration: 0.45,
        delay: getCardStaggerDelay(index, reducedMotion),
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={
        reducedMotion
          ? undefined
          : {
              transform: getCardTransformString(tiltState, isHovered),
              transition: isHovered ? 'transform 120ms ease-out' : 'transform 340ms ease-out',
            }
      }
      data-testid={`festival-card-${festival.id}`}
      className="group relative min-h-[215px] sm:min-h-[230px] rounded-xl overflow-hidden border border-[#C8AB88]/75 hover:border-[#E8C784] shadow-[0_10px_26px_rgba(32,18,10,0.16)] hover:shadow-[0_18px_38px_rgba(32,18,10,0.28)] bg-[#1A0F0A] flex flex-col justify-between isolate"
    >
      {/* Full-Bleed Festival Artwork Background */}
      <img
        src={artworkSrc}
        alt={view.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 will-change-transform"
      />

      {/* Compact Multi-Stop High-Contrast Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#120905]/96 via-[#160C07]/74 via-58% to-[#160C07]/28"
      />

      {/* Pointer-Tracking Golden Light Sheen */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.32 : 0,
            background: `radial-gradient(circle 220px at ${tiltState.xPercent}% ${tiltState.yPercent}%, rgba(245,222,174,0.42), transparent 72%)`,
          }}
        />
      )}

      {/* Subtle Diagonal Shimmer Glint on Hover */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#F5DEAE]/15 to-transparent animate-cta-shimmer" />
        </div>
      )}

      {/* Top Strip: Exact Upcoming Date & Weekday + Compact SVG Motion Emblem */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-4 pt-3.5">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel font-semibold tracking-wider text-[#F5DEAE] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          <Calendar className="w-3.5 h-3.5 text-[#E8C784] shrink-0" aria-hidden="true" />
          <span>{view.dateStr}</span>
        </div>

        <div className="rounded-full bg-[#160C07]/55 border border-[#E8C784]/35 p-0.5 shadow-md shrink-0">
          <FestivalMotionEmblem
            motif={view.motif}
            reducedMotion={reducedMotion}
            isHovered={isHovered}
            size={36}
          />
        </div>
      </div>

      {/* Bottom Compact Editorial Block */}
      <div className="relative z-10 px-4 pb-3.5 pt-7 flex flex-col justify-end">
        <h3 className="font-serif-royal text-xl sm:text-[1.35rem] font-bold text-[#FFFDF8] leading-snug mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          <button
            type="button"
            onClick={() => onSelect(festival)}
            className="text-left hover:text-[#F5DEAE] transition-colors cursor-pointer focus:outline-none focus-visible:underline"
          >
            {view.title}
          </button>
        </h3>

        {/* Animated Gold Accent Hairline */}
        <div
          aria-hidden="true"
          className="h-[1.5px] w-full origin-left bg-gradient-to-r from-[#E8C784] via-[#C29A54]/70 to-transparent mb-2 transition-transform duration-500 ease-out scale-x-40 group-hover:scale-x-100"
        />

        {/* Concise Krishna Significance */}
        <p className="text-xs text-[#EDE0CE]/95 line-clamp-2 leading-snug mb-3">
          {view.description}
        </p>

        {/* Compact Action Row */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#E8C784]/25">
          <button
            type="button"
            onClick={() => onSelect(festival)}
            className="min-h-[34px] inline-flex items-center gap-1 text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#F5DEAE] hover:text-white transition-colors cursor-pointer"
          >
            <span>{viewProgrammeLabel}</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            aria-pressed={isSubscribed}
            onClick={(e) => onToggleRemind(festival.id, e)}
            className={`min-h-[34px] px-2.5 py-1 rounded-md text-[11px] font-semibold border inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-97 ${
              isSubscribed
                ? 'bg-[#376C68] text-white border-[#5EA39D] shadow-sm'
                : 'bg-[#1A0E08]/70 border-[#E8C784]/45 text-[#FFFDF8] hover:bg-[#3C2A20] hover:border-[#E8C784]'
            }`}
          >
            {isSubscribed ? (
              <Check className="w-3 h-3 text-[#D8F3EE]" aria-hidden="true" />
            ) : (
              <Bell className="w-3 h-3 text-[#E8C784]" aria-hidden="true" />
            )}
            <span>{isSubscribed ? reminderSetLabel : remindMeLabel}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export const FestivalsSection: React.FC<FestivalsSectionProps> = ({
  language,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const [selectedFestival, setSelectedFestival] = useState<FestivalEvent | null>(null);
  const [selectedEkadashi, setSelectedEkadashi] = useState<EkadashiEntry | null>(null);
  const [activeFilter, setActiveFilter] = useState<FestivalTabMode>('all');
  const [remindState, setRemindState] = useState<Record<string, boolean>>({});
  const [reminderEmail, setReminderEmail] = useState('');
  const [emailConfirmMsg, setEmailConfirmMsg] = useState<string | null>(null);

  const filterTabs: { id: FestivalTabMode; label: string }[] = [
    { id: 'all', label: tDict.festivals.filterAll },
    { id: 'ekadashi', label: tDict.festivals.filterEkadashi },
  ];

  const handleCloseModal = useCallback(() => {
    setSelectedFestival(null);
    setEmailConfirmMsg(null);
  }, []);

  const handleCloseEkadashiScroll = useCallback(() => {
    setSelectedEkadashi(null);
  }, []);

  useEffect(() => {
    if (!selectedFestival && !selectedEkadashi) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    if (!selectedFestival) {
      return () => {
        document.body.style.overflow = '';
      };
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedFestival, selectedEkadashi, handleCloseModal]);

  const handleRemindMe = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemindState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleModalReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFestival) return;
    setRemindState((prev) => ({ ...prev, [selectedFestival.id]: true }));
    setEmailConfirmMsg(tDict.festivals.modalConfirmationSuccess);
    setReminderEmail('');
  };

  const selectedView = selectedFestival
    ? getLocalizedFestivalView(selectedFestival, language)
    : null;

  return (
    <section
      id="festivals"
      aria-labelledby="festivals-section-heading"
      className="relative overflow-hidden py-12 sm:py-14 lg:py-16 bg-[#FBF6ED] border-b border-[#E5D1B6] scroll-mt-20"
    >
      {/* Centered Rotating Sacred Background Chakra */}
      <SectionBackgroundChakra reducedMotion={reducedMotion} />

      <div className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Compact Centered Editorial Header matching all other Temple Sections */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-6 sm:mb-7"
        >
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <PeacockFeather size={22} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-bold">
              {tDict.festivals.kicker}
            </span>
            <PeacockFeather size={22} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="festivals-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-2.5"
          >
            {tDict.festivals.title}
          </h2>

          <p className="text-sm sm:text-base text-[#715847] leading-relaxed max-w-3xl mx-auto mb-4">
            {tDict.festivals.description}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
            <LotusOrnament size={22} className="text-[#C29A54]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          </div>
        </motion.div>

        {/* Compact Switcher: All Krishna Utsavs vs Ekadashi */}
        <div
          role="group"
          aria-label={tDict.festivals.kicker}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-7"
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={`min-h-[38px] px-4 sm:px-5 py-1.5 rounded-lg text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer border inline-flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#3C2A20] text-[#FFFDF8] border-[#C29A54] shadow-sm'
                    : 'bg-[#FFFDF8] text-[#6B4832] border-[#E5D1B6] hover:border-[#A67C57] hover:bg-[#F3E7D6]'
                }`}
              >
                {tab.id === 'ekadashi' && (
                  <ScrollText className="w-3.5 h-3.5 text-[#C29A54]" aria-hidden="true" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* All Krishna Utsavs (Compact 3x3 Grid) vs Ekadashi Tithis (Compact 23 Parchment Cards) */}
        {activeFilter === 'all' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {FESTIVALS_DATA.map((fest, idx) => (
                <FestivalCard
                  key={fest.id}
                  festival={fest}
                  index={idx}
                  language={language}
                  isSubscribed={Boolean(remindState[fest.id])}
                  reducedMotion={reducedMotion}
                  viewProgrammeLabel={tDict.festivals.viewProgramme}
                  remindMeLabel={tDict.festivals.remindMe}
                  reminderSetLabel={tDict.festivals.reminderRecorded}
                  onSelect={(f) => {
                    setSelectedFestival(f);
                    setEmailConfirmMsg(null);
                  }}
                  onToggleRemind={handleRemindMe}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            key="ekadashi-grid"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            data-testid="ekadashi-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5"
          >
            {EKADASHI_SCHEDULE.map((item) => {
              const ekView = getLocalizedEkadashiView(item, language);
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`ekadashi-card-${item.id}`}
                  onClick={() => setSelectedEkadashi(item)}
                  className="group text-left bg-gradient-to-br from-[#FFFDF8] via-[#FAF1DF] to-[#F3E3C4] border border-[#C8AB88] hover:border-[#9A7132] rounded-xl p-3.5 shadow-[0_6px_18px_rgba(60,42,32,0.08)] hover:shadow-[0_12px_26px_rgba(60,42,32,0.16)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29A54]"
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#3C2A20] text-[#F5DEAE] font-cinzel text-[11px] font-bold tracking-wider border border-[#C29A54]/60 shrink-0">
                      {String(ekView.number).padStart(2, '0')}
                    </span>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel font-semibold text-[#741C24]">
                      <Calendar className="w-3 h-3 text-[#A67C57] shrink-0" aria-hidden="true" />
                      <span>{ekView.date}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-royal text-lg sm:text-[1.15rem] font-bold text-[#3C2A20] group-hover:text-[#741C24] transition-colors leading-snug">
                      {ekView.title}
                    </h3>
                    <div
                      aria-hidden="true"
                      className="h-[1px] w-full origin-left bg-gradient-to-r from-[#C29A54]/80 to-transparent mt-1.5 scale-x-50 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#D8C2A4]/60 text-[11px]">
                    <span className="font-cinzel font-semibold uppercase tracking-wider text-[#6B4832]">
                      {ekView.weekday}
                    </span>
                    <span className="inline-flex items-center gap-1 font-cinzel font-semibold text-[#8C6D28] group-hover:text-[#741C24] transition-colors">
                      <span>{tDict.festivals.ekadashiOpenScroll}</span>
                      <ArrowRight
                        className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Interactive Animated Festival Programme & Reminder Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedFestival && selectedView && (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, transition: { duration: 0.18 } }}
                transition={{ duration: 0.2 }}
                onClick={handleCloseModal}
                className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75"
              >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="festival-modal-heading"
              initial={reducedMotion ? false : { scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { scale: 0.95, opacity: 0, y: 12, transition: { duration: 0.16 } }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFDF8] max-w-2xl w-full rounded-2xl border-2 border-[#C29A54] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Artwork Header Banner */}
              <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden bg-[#1A0F0A]">
                <img
                  src={getFestivalArtwork(selectedFestival.id)}
                  alt={selectedView.title}
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#160C07] via-[#160C07]/55 to-transparent"
                />

                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={tDict.common.close}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/65 hover:bg-[#741C24] text-[#FFFDF8] border border-white/25 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute top-4 left-4 z-10 rounded-full bg-[#160C07]/60 border border-[#E8C784]/40 p-0.5">
                  <FestivalMotionEmblem
                    motif={selectedView.motif}
                    reducedMotion={reducedMotion}
                    isHovered
                    size={42}
                  />
                </div>

                <div className="absolute bottom-4 left-5 right-5 sm:left-7 sm:right-7 z-10">
                  <div className="text-[11px] sm:text-xs font-cinzel uppercase tracking-widest text-[#E8C784] font-semibold mb-1">
                    {selectedView.category} · {selectedView.dateStr}
                  </div>
                  <h3
                    id="festival-modal-heading"
                    className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#FFFDF8] leading-tight"
                  >
                    {selectedView.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Programme Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3.5 border-b border-[#E5D1B6]">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[#A67C57] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-[11px] font-cinzel uppercase tracking-wider text-[#A67C57] font-semibold">
                        {tDict.festivals.modalDate}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-[#3C2A20]">
                        {selectedView.dateStr}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#A67C57] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-[11px] font-cinzel uppercase tracking-wider text-[#A67C57] font-semibold">
                        {tDict.festivals.modalTime}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-[#3C2A20]">
                        {selectedView.timeStr}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#3C2A20] leading-relaxed">
                  {selectedView.description}
                </p>

                <div className="bg-[#F3E7D6]/65 p-4 rounded-xl border border-[#E5D1B6]">
                  <h4 className="font-cinzel text-xs font-bold text-[#3C2A20] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B18A4C]" aria-hidden="true" />
                    <span>{tDict.festivals.scheduleHeading}</span>
                  </h4>
                  <ol className="space-y-2">
                    {selectedView.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-[#5B4434] leading-relaxed"
                      >
                        <span className="font-cinzel text-xs font-bold text-[#921B2C] shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <form
                  onSubmit={handleModalReminderSubmit}
                  className="bg-[#FFF9EE] p-4 rounded-xl border border-[#C59B56]/45 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                    <div className="flex-1">
                      <label
                        htmlFor="festival-reminder-email"
                        className="block text-xs font-cinzel font-semibold text-[#6B4832] uppercase tracking-wider mb-1"
                      >
                        {tDict.festivals.modalEmailLabel}
                      </label>
                      <input
                        id="festival-reminder-email"
                        type="email"
                        value={reminderEmail}
                        onChange={(e) => setReminderEmail(e.target.value)}
                        placeholder={tDict.festivals.modalEmailPlaceholder}
                        className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-white border border-[#D8C2A4] rounded-lg text-[#3C2A20] focus:outline-none focus:border-[#741C24]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="min-h-[40px] px-4 py-2 rounded-lg text-xs font-cinzel font-bold uppercase tracking-wider bg-[#376C68] hover:bg-[#2A5451] text-white transition-colors cursor-pointer inline-flex items-center justify-center gap-2 shrink-0"
                    >
                      <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{tDict.festivals.modalBtnConfirm}</span>
                    </button>
                  </div>

                  {emailConfirmMsg && (
                    <p
                      role="status"
                      className="text-xs font-medium text-[#2A5451] flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{emailConfirmMsg}</span>
                    </p>
                  )}
                </form>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs text-[#715847]">
                  <span>*{tDict.festivals.proposedNote}</span>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="min-h-[38px] px-5 py-2 rounded-lg text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                  >
                    {tDict.common.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}

      {/* Sacred Parchment Scroll Modal when clicking any Ekadashi Card */}
      <EkadashiScrollModal
        selectedEkadashi={selectedEkadashi}
        language={language}
        reducedMotion={reducedMotion}
        isReminded={Boolean(selectedEkadashi && remindState[selectedEkadashi.id])}
        labels={{
          scrollSeal: tDict.festivals.ekadashiScrollSeal,
          tithiLabel: tDict.festivals.ekadashiTithiLabel,
          dateLabel: tDict.festivals.ekadashiDateLabel,
          dayLabel: tDict.festivals.ekadashiDayLabel,
          lunarMonth: tDict.festivals.ekadashiLunarMonth,
          deityLabel: tDict.festivals.ekadashiDeity,
          significanceHeading: tDict.festivals.ekadashiSignificanceHeading,
          benefitHeading: tDict.festivals.ekadashiBenefitHeading,
          observanceHeading: tDict.festivals.ekadashiObservanceHeading,
          prevLabel: tDict.festivals.ekadashiPrev,
          nextLabel: tDict.festivals.ekadashiNext,
          remindMe: tDict.festivals.remindMe,
          reminderSet: tDict.festivals.reminderRecorded,
          closeLabel: tDict.common.close,
        }}
        onClose={handleCloseEkadashiScroll}
        onSelectEntry={setSelectedEkadashi}
        onToggleRemind={handleRemindMe}
      />
    </section>
  );
};

export default FestivalsSection;
