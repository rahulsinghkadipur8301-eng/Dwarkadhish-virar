import React from 'react';
import { motion } from 'motion/react';
import { Language, AARTI_SCHEDULE } from '../data/templeData';
import { Info, CheckCircle2, Clock } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';

interface DarshanSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

export const DarshanSection: React.FC<DarshanSectionProps> = ({
  language,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();

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
    <section id="darshan" className="relative overflow-hidden py-20 sm:py-24 bg-[#FBF6ED] border-b border-[#E5D1B6]">
      <SectionBackgroundChakra reducedMotion={reducedMotion} />
      <div className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Centered Section Header matching other Temple Sections */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12"
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

        {/* Mandatory Verification & Notice Box */}
        <div className="mb-10 p-5 sm:p-6 bg-[#FFFDF8] border border-[#C8AB88] flex items-start gap-4 rounded-xs shadow-xs">
          <Info className="w-5 h-5 text-[#A67C57] shrink-0 mt-0.5" />
          <div className="text-sm sm:text-base text-[#3C2A20] leading-relaxed">
            <span className="font-bold text-[#6B4832] block sm:inline mr-2">
              {tDict.schedule.noticeHeader}
            </span>
            {tDict.schedule.noticeBody}
          </div>
        </div>

        {/* =========================================================================
            1. MOBILE RESPONSIVE CARDS VIEW (< md):
            Converts wide table into readable cards so there is ZERO horizontal scroll
           ========================================================================= */}
        <div className="grid grid-cols-1 gap-4 md:hidden mb-8">
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
