import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language, AARTI_SCHEDULE } from '../data/templeData';
import { Info, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';
import {
  isSectionInitiallyExpandedOnMobile,
  toggleMobileSectionExpanded,
} from '../utils/mobileSectionUtils';

interface DarshanSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

export const DarshanSection: React.FC<DarshanSectionProps> = ({
  language,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const [mobileExpanded, setMobileExpanded] = useState(() =>
    isSectionInitiallyExpandedOnMobile('darshan')
  );

  const getAartiName = (item: typeof AARTI_SCHEDULE[0]) => {
    if (language === 'hi') return item.nameHi;
    if (language === 'mr') return item.nameMr;
    if (language === 'gu') return (item as any).nameGu || item.nameHi;
    return item.nameEn;
  };

  const getAartiSignificance = (item: typeof AARTI_SCHEDULE[0]) => {
    if (language === 'hi') return item.significanceHi;
    if (language === 'mr') return item.significanceMr;
    if (language === 'gu') return (item as any).significanceGu || item.significanceHi;
    return item.significanceEn;
  };

  return (
    <section id="darshan" className="relative overflow-hidden py-8 sm:py-16 lg:py-20 bg-[#FBF6ED] border-b border-[#E5D1B6] scroll-mt-20">
      <SectionBackgroundChakra reducedMotion={reducedMotion} />
      <div className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Centered Section Header matching other Temple Sections */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-5 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <PeacockFeather size={24} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-bold">
              {tDict.schedule.kicker}
            </span>
            <PeacockFeather size={24} className="transform scale-x-[-1]" />
          </div>

          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-3.5">
            {tDict.schedule.title}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#715847] leading-relaxed max-w-3xl mx-auto mb-5">
            {tDict.schedule.description}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
            <LotusOrnament size={24} className="text-[#C29A54]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          </div>
        </motion.div>

        {/* Desktop Mandatory Verification & Notice Box (>= md) */}
        <div className="hidden md:flex mb-8 p-5 sm:p-6 bg-[#FFFDF8] border border-[#C8AB88] items-start gap-4 rounded-xs shadow-xs">
          <Info className="w-5 h-5 text-[#A67C57] shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-[#3C2A20] leading-relaxed">
            <span className="font-bold text-[#6B4832] block sm:inline mr-2">
              {tDict.schedule.noticeHeader}
            </span>
            {tDict.schedule.noticeBody}
          </div>
        </div>

        {/* Mobile Compact Click-to-Explore Bar (< md) */}
        <div className="md:hidden mb-4">
          <div className="bg-[#FFFDF8] border border-[#C8AB88] rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 text-xs font-cinzel font-semibold text-[#6B4832] text-center">
              <Clock className="w-4 h-4 text-[#A67C57] shrink-0" aria-hidden="true" />
              <span>{tDict.schedule.mobileSummaryHighlight}</span>
            </div>
            <button
              type="button"
              data-testid="darshan-mobile-toggle"
              aria-expanded={mobileExpanded}
              aria-controls="darshan-mobile-content"
              onClick={() => setMobileExpanded(toggleMobileSectionExpanded)}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#6B4832] hover:bg-[#523725] text-[#FFFDF8] font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>
                {mobileExpanded
                  ? tDict.schedule.mobileCollapseBtn
                  : tDict.schedule.mobileExploreBtn}
              </span>
              {mobileExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#E8C784] shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#E8C784] shrink-0" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            1. MOBILE RESPONSIVE CARDS VIEW (< md):
            Expanded only on explicit user click so mobile scroll stays minimal
           ========================================================================= */}
        <div
          id="darshan-mobile-content"
          className={mobileExpanded ? 'grid grid-cols-1 gap-4 md:hidden mb-4' : 'hidden'}
        >
          {/* Mobile Notice Box shown upon exploration */}
          <div className="p-4 bg-[#FFFDF8] border border-[#C8AB88] flex items-start gap-3 rounded-xl shadow-xs">
            <Info className="w-4 h-4 text-[#A67C57] shrink-0 mt-0.5" />
            <div className="text-xs text-[#3C2A20] leading-relaxed">
              <span className="font-bold text-[#6B4832] block mb-0.5">
                {tDict.schedule.noticeHeader}
              </span>
              {tDict.schedule.noticeBody}
            </div>
          </div>

          {AARTI_SCHEDULE.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-[#FFFDF8] border border-[#E5D1B6] rounded-xl shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-serif-royal font-bold text-xl text-[#3C2A20]">
                    {getAartiName(item)}
                  </div>
                  <span className="text-[11px] text-[#A67C57] uppercase tracking-wider font-semibold font-cinzel">
                    {item.category}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3E7D6] rounded-full font-cinzel font-bold text-sm text-[#B18A4C] shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#B18A4C]" />
                  <span>{item.time}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#715847] leading-relaxed">
                {getAartiSignificance(item)}
              </p>

              <div className="pt-2 border-t border-[#E5D1B6]/60 flex items-center justify-between text-xs">
                <span className="text-[#8C6D28] font-cinzel font-medium">Daily Devotional Aarti</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#376C68]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {tDict.schedule.statusOpen}
                </span>
              </div>
            </div>
          ))}

          {/* Mobile Footer note */}
          <div className="p-4 bg-[#F3E7D6] rounded-lg border border-[#E5D1B6] text-xs text-[#715847] space-y-1">
            <p className="font-semibold text-[#6B4832]">{tDict.schedule.generalDarshanHours}</p>
            <p>{tDict.schedule.vishramNotice}</p>
          </div>
        </div>

        {/* =========================================================================
            2. DESKTOP TABULAR VIEW (>= md):
            High-contrast, generous row padding, comfortable font sizes
           ========================================================================= */}
        <div className="hidden md:block bg-[#FFFDF8] border border-[#C8AB88] shadow-xs overflow-hidden rounded-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B4832] text-[#FBF6ED] text-xs uppercase tracking-wider font-cinzel">
                  <th className="py-4.5 px-6 lg:px-8 font-semibold">{tDict.schedule.colName}</th>
                  <th className="py-4.5 px-6 font-semibold">{tDict.schedule.colTime}</th>
                  <th className="py-4.5 px-6 font-semibold">{tDict.schedule.colSignificance}</th>
                  <th className="py-4.5 px-6 font-semibold text-right pr-8">{tDict.schedule.colStatus}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D1B6]">
                {AARTI_SCHEDULE.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#F3E7D6]/50 ${
                      idx % 2 === 0 ? 'bg-[#FFFDF8]' : 'bg-[#FBF6ED]'
                    }`}
                  >
                    <td className="py-5 px-6 lg:px-8">
                      <div className="font-serif-royal font-bold text-xl text-[#3C2A20]">
                        {getAartiName(item)}
                      </div>
                      <div className="text-xs text-[#A67C57] uppercase tracking-wider mt-0.5 font-medium font-cinzel">
                        {item.category}
                      </div>
                    </td>
                    <td className="py-5 px-6 font-cinzel font-bold text-[#B18A4C] whitespace-nowrap tabular-nums text-lg">
                      {item.time}
                    </td>
                    <td className="py-5 px-6 text-[#715847] text-sm lg:text-base leading-relaxed max-w-md">
                      {getAartiSignificance(item)}
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap text-right pr-8">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#376C68] bg-[#E8F3EE] px-3 py-1 rounded-full border border-[#376C68]/25">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {tDict.schedule.statusOpen}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer info strip */}
          <div className="py-4 px-6 lg:px-8 bg-[#F3E7D6] border-t border-[#E5D1B6] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#715847]">
            <span>{tDict.schedule.vishramNotice}</span>
            <span className="font-cinzel text-[#6B4832] font-semibold text-sm">{tDict.schedule.generalDarshanHours}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
