import React from 'react';
import { motion } from 'motion/react';
import { Language, SEVA_OFFERINGS, SevaOffering } from '../data/templeData';
import { Info, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';

interface SevaSectionProps {
  language: Language;
  reducedMotion?: boolean;
  onRedirectToPortal?: () => void;
}

export const SevaSection: React.FC<SevaSectionProps> = ({
  language,
  reducedMotion = false,
  onRedirectToPortal,
}) => {
  const { tDict } = useI18n();

  const getTitle = (item: SevaOffering) => {
    if (language === 'hi') return item.titleHi;
    if (language === 'mr') return item.titleMr;
    if (language === 'gu') return (item as any).titleGu || item.titleHi;
    return item.titleEn;
  };

  const getDesc = (item: SevaOffering) => {
    if (language === 'hi') return item.descriptionHi;
    if (language === 'mr') return item.descriptionMr;
    if (language === 'gu') return (item as any).descriptionGu || item.descriptionHi;
    return item.descriptionEn;
  };

  const handlePortalRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onRedirectToPortal) {
      onRedirectToPortal();
      return;
    }
    const target = document.getElementById('donation');
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="seva"
      aria-labelledby="seva-section-heading"
      className="relative overflow-hidden py-20 sm:py-24 bg-[#FBF6ED] border-b border-[#E5D1B6] scroll-mt-20"
    >
      <SectionBackgroundChakra reducedMotion={reducedMotion} />
      <div className="relative z-10 w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Centered Animated Section Header matching all other Temple Sections */}
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
              {tDict.seva.kicker}
            </span>
            <PeacockFeather size={24} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="seva-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-3.5"
          >
            {tDict.seva.title}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#715847] leading-relaxed max-w-3xl mx-auto mb-5">
            {tDict.seva.description}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
            <LotusOrnament size={24} className="text-[#C29A54]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          </div>
        </motion.div>

        {/* Mandatory Seva Disclaimer Ribbon */}
        <div className="mb-10 p-5 bg-[#FFFDF8] border border-[#E5D1B6] flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#A67C57] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
            <span className="font-semibold text-[#6B4832] block sm:inline mr-2">
              {tDict.seva.noticeHeader}
            </span>
            {tDict.seva.noticeBody}
          </div>
        </div>

        {/* Seva Offerings Grid — Directly Redirects to Official Contribution Portal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEVA_OFFERINGS.map((seva) => (
            <div
              key={seva.id}
              className="bg-[#FFFDF8] border border-[#E5D1B6] p-6 flex flex-col justify-between hover:border-[#A67C57] transition-all hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#376C68] uppercase tracking-wider font-cinzel mb-3">
                  <span>{seva.category}</span>
                  <span className="text-[#715847] font-mono capitalize">{seva.frequency}</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-[#3C2A20] mb-2">
                  {getTitle(seva)}
                </h3>

                <p className="text-xs sm:text-sm text-[#715847] leading-relaxed mb-6">
                  {getDesc(seva)}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5D1B6]/50 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#715847]">
                    {tDict.seva.proposedOfferingLabel}
                  </span>
                  <span className="font-cinzel text-lg font-bold text-[#6B4832] tabular-nums">
                    ₹{seva.proposedAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <a
                  href="#donation"
                  onClick={handlePortalRedirect}
                  data-testid={`seva-portal-link-${seva.id}`}
                  className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0 rounded-xs"
                >
                  <span>{tDict.seva.btnContributionPortal}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8C784] shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
