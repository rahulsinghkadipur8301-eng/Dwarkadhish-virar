import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bell,
  Check,
  Sparkles,
  BookOpen,
  Compass,
  X,
} from 'lucide-react';
import { Language } from '../data/templeData';
import {
  EKADASHI_SCHEDULE,
  EkadashiEntry,
  getLocalizedEkadashiView,
} from '../data/ekadashiData';
import { LotusOrnament } from './KrishnaMotifs';

export interface EkadashiScrollLabels {
  scrollSeal: string;
  tithiLabel: string;
  dateLabel: string;
  dayLabel: string;
  lunarMonth: string;
  deityLabel: string;
  significanceHeading: string;
  benefitHeading: string;
  observanceHeading: string;
  prevLabel: string;
  nextLabel: string;
  remindMe: string;
  reminderSet: string;
  closeLabel: string;
}

interface EkadashiScrollModalProps {
  selectedEkadashi: EkadashiEntry | null;
  language: Language;
  reducedMotion: boolean;
  isReminded: boolean;
  labels: EkadashiScrollLabels;
  onClose: () => void;
  onSelectEntry: (entry: EkadashiEntry) => void;
  onToggleRemind: (id: string, e: React.MouseEvent) => void;
}

const ScrollRollerBar: React.FC<{ position: 'top' | 'bottom' }> = ({ position }) => (
  <div
    aria-hidden="true"
    className={`relative flex items-center justify-between h-6 px-1 select-none shrink-0 ${
      position === 'top' ? '-mb-1 z-20' : '-mt-1 z-20'
    }`}
  >
    {/* Left Turned Brass Finial */}
    <div className="flex items-center shrink-0">
      <div className="w-2.5 h-3.5 rounded-l-full bg-gradient-to-b from-[#F5DEAE] via-[#C29A54] to-[#7B5924] border border-[#5B3D12]/60 shadow-sm" />
      <div className="w-3.5 h-6 rounded-sm bg-gradient-to-b from-[#FFF2CC] via-[#C29A54] to-[#7B5924] border border-[#5B3D12]/60 shadow-md" />
    </div>

    {/* Carved Rosewood Scroll Shaft */}
    <div className="flex-1 h-4.5 mx-0.5 rounded-xs bg-gradient-to-b from-[#7B5439] via-[#3C2416] to-[#1E110A] border-y border-[#C29A54]/60 shadow-[0_4px_12px_rgba(20,10,5,0.45)] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0.5 h-[2px] bg-gradient-to-r from-transparent via-[#F5DEAE]/45 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 bg-gradient-to-r from-transparent via-[#E8C784]/25 to-transparent" />
    </div>

    {/* Right Turned Brass Finial */}
    <div className="flex items-center shrink-0">
      <div className="w-3.5 h-6 rounded-sm bg-gradient-to-b from-[#FFF2CC] via-[#C29A54] to-[#7B5924] border border-[#5B3D12]/60 shadow-md" />
      <div className="w-2.5 h-3.5 rounded-r-full bg-gradient-to-b from-[#F5DEAE] via-[#C29A54] to-[#7B5924] border border-[#5B3D12]/60 shadow-sm" />
    </div>
  </div>
);

export const EkadashiScrollModal: React.FC<EkadashiScrollModalProps> = ({
  selectedEkadashi,
  language,
  reducedMotion,
  isReminded,
  labels,
  onClose,
  onSelectEntry,
  onToggleRemind,
}) => {
  useEffect(() => {
    if (!selectedEkadashi) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      const currentIdx = EKADASHI_SCHEDULE.findIndex((item) => item.id === selectedEkadashi.id);
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        onSelectEntry(EKADASHI_SCHEDULE[currentIdx - 1]);
      } else if (e.key === 'ArrowRight' && currentIdx >= 0 && currentIdx < EKADASHI_SCHEDULE.length - 1) {
        onSelectEntry(EKADASHI_SCHEDULE[currentIdx + 1]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedEkadashi, onClose, onSelectEntry]);

  if (typeof document === 'undefined') return null;

  const currentIdx = selectedEkadashi
    ? EKADASHI_SCHEDULE.findIndex((item) => item.id === selectedEkadashi.id)
    : -1;
  const prevEntry = currentIdx > 0 ? EKADASHI_SCHEDULE[currentIdx - 1] : null;
  const nextEntry =
    currentIdx >= 0 && currentIdx < EKADASHI_SCHEDULE.length - 1
      ? EKADASHI_SCHEDULE[currentIdx + 1]
      : null;

  const view = selectedEkadashi
    ? getLocalizedEkadashiView(selectedEkadashi, language)
    : null;

  return createPortal(
    <AnimatePresence>
      {selectedEkadashi && view && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/75"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ekadashi-scroll-title"
            initial={reducedMotion ? false : { scaleY: 0.16, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={
              reducedMotion
                ? undefined
                : { scaleY: 0.16, opacity: 0, transition: { duration: 0.18 } }
            }
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl flex flex-col max-h-[88vh] relative"
          >
            {/* Top Carved Wooden & Brass Scroll Roller */}
            <ScrollRollerBar position="top" />

            {/* Unrolled Sacred Parchment Sheet */}
            <div className="mx-3 sm:mx-5 bg-gradient-to-b from-[#F9ECD2] via-[#FFF9EA] to-[#F3E1BE] border-x-2 border-[#C29A54] shadow-[0_24px_60px_rgba(12,6,3,0.65)] overflow-y-auto relative min-h-0 flex-1">
              {/* Subtle Parchment Side Shadow Vignette */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_14px_0_24px_-16px_rgba(107,72,50,0.35),inset_-14px_0_24px_-16px_rgba(107,72,50,0.35)]"
              />

              {/* Close Button on Parchment Corner */}
              <button
                type="button"
                onClick={onClose}
                aria-label={labels.closeLabel}
                className="sticky top-2.5 float-right mr-2.5 mt-2.5 z-20 p-1.5 sm:p-2 rounded-full bg-[#3C2A20]/90 hover:bg-[#741C24] text-[#FFFDF8] border border-[#E8C784]/50 shadow-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Double Ornamental Sacred Manuscript Border Inside Parchment */}
              <div className="m-2.5 sm:m-3.5 border border-[#C29A54]/70 p-3.5 sm:p-5 relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1 border border-[#C29A54]/30"
                />

                {/* Top Sacred Seal & Tithi Header */}
                <div className="text-center mb-3 relative z-10">
                  <div className="inline-flex items-center gap-2 text-[11px] font-cinzel font-bold uppercase tracking-[0.18em] text-[#8C6D28] mb-1">
                    <LotusOrnament size={16} className="text-[#C29A54]" />
                    <span>
                      {labels.scrollSeal} · {String(view.number).padStart(2, '0')} /{' '}
                      {EKADASHI_SCHEDULE.length}
                    </span>
                    <LotusOrnament size={16} className="text-[#C29A54]" />
                  </div>

                  <h3
                    id="ekadashi-scroll-title"
                    className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#3C2A20] leading-tight mb-2.5"
                  >
                    {view.title}
                  </h3>

                  {/* Structured 3-Column Tithi · Date · Day Card Strip */}
                  <div
                    data-testid="ekadashi-tithi-date-day"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left mb-2"
                  >
                    <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#C29A54]/65 shadow-xs">
                      <div className="text-[10px] font-cinzel uppercase tracking-wider text-[#8C6D28] font-bold">
                        {labels.tithiLabel}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#741C24] mt-0.5 leading-snug">
                        {view.title}
                      </div>
                      <div className="text-[11px] text-[#5C3A23] mt-0.5">{view.paksha}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#C29A54]/65 shadow-xs">
                      <div className="text-[10px] font-cinzel uppercase tracking-wider text-[#8C6D28] font-bold">
                        {labels.dateLabel}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-[#3C2A20] mt-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#921B2C] shrink-0" aria-hidden="true" />
                        <span>{view.date}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#FFFDF8] border border-[#C29A54]/65 shadow-xs">
                      <div className="text-[10px] font-cinzel uppercase tracking-wider text-[#8C6D28] font-bold">
                        {labels.dayLabel}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-[#3C2A20] font-cinzel mt-0.5">
                        {view.weekday}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lunar Paksha & Presiding Swaroop Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 p-2.5 bg-[#FFFDF8]/75 border border-[#D8C2A4] relative z-10">
                  <div>
                    <div className="text-[10px] font-cinzel uppercase tracking-wider text-[#9A7132] font-bold">
                      {labels.lunarMonth}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#3C2A20]">
                      {view.paksha}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-cinzel uppercase tracking-wider text-[#9A7132] font-bold">
                      {labels.deityLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#3C2A20]">
                      {view.deity}
                    </div>
                  </div>
                </div>

                {/* 1. Vrat Katha & Sacred Significance */}
                <div className="space-y-2.5 relative z-10">
                  <div className="p-3 bg-[#FFFDF8]/85 border-l-4 border-[#921B2C] border-y border-r border-y-[#E5D1B6] border-r-[#E5D1B6]">
                    <h4 className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-[#741C24] mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{labels.significanceHeading}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
                      {view.significance}
                    </p>
                  </div>

                  {/* 2. Spiritual Grace / Vrat Phala */}
                  <div className="p-3 bg-[#FFFDF8]/85 border-l-4 border-[#C29A54] border-y border-r border-y-[#E5D1B6] border-r-[#E5D1B6]">
                    <h4 className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-[#8C6D28] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{labels.benefitHeading}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
                      {view.benefit}
                    </p>
                  </div>

                  {/* 3. Temple Observance & Vrat Guidance */}
                  <div className="p-3 bg-[#FFFDF8]/85 border-l-4 border-[#376C68] border-y border-r border-y-[#E5D1B6] border-r-[#E5D1B6]">
                    <h4 className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-[#2A5451] mb-1 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{labels.observanceHeading}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
                      {view.observance}
                    </p>
                  </div>
                </div>

                {/* Scroll Footer: Stepper & Reminder Action */}
                <div className="mt-3.5 pt-3 border-t border-[#C29A54]/50 flex flex-wrap items-center justify-between gap-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!prevEntry}
                      onClick={() => prevEntry && onSelectEntry(prevEntry)}
                      className="min-h-[34px] px-2.5 py-1 rounded-md border border-[#C8AB88] bg-[#FFFDF8] hover:bg-[#F3E7D6] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-cinzel font-semibold text-[#3C2A20] inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{labels.prevLabel}</span>
                    </button>
                    <button
                      type="button"
                      disabled={!nextEntry}
                      onClick={() => nextEntry && onSelectEntry(nextEntry)}
                      className="min-h-[34px] px-2.5 py-1 rounded-md border border-[#C8AB88] bg-[#FFFDF8] hover:bg-[#F3E7D6] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-cinzel font-semibold text-[#3C2A20] inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{labels.nextLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-pressed={isReminded}
                      onClick={(e) => onToggleRemind(selectedEkadashi.id, e)}
                      className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-semibold border inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isReminded
                          ? 'bg-[#376C68] text-white border-[#2A5451]'
                          : 'bg-[#FFFDF8] text-[#6B4832] border-[#C29A54] hover:bg-[#F3E7D6]'
                      }`}
                    >
                      {isReminded ? (
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Bell className="w-3.5 h-3.5 text-[#9A7132]" aria-hidden="true" />
                      )}
                      <span>{isReminded ? labels.reminderSet : labels.remindMe}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="min-h-[34px] px-3.5 py-1 rounded-md text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] transition-colors cursor-pointer"
                    >
                      {labels.closeLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Carved Wooden & Brass Scroll Roller */}
            <ScrollRollerBar position="bottom" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default EkadashiScrollModal;
