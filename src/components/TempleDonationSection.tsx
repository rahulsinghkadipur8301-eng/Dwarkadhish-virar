import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Language } from '../data/templeData';
import { LotusOrnament, PeacockFeather, FluteDivider } from './KrishnaMotifs';
import { calculateCardTiltAndLight } from '../utils/motionUtils';
import { DonationSacredAtmosphere } from './DonationSacredAtmosphere';

export interface TempleDonationSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

const DONATION_BANNER_SRC = '/dwarkadhish_poster_clean_qr_blended.webp';

export const TempleDonationSection: React.FC<TempleDonationSectionProps> = React.memo(({
  language,
  reducedMotion = false,
}) => {
  const portalCardRef = useRef<HTMLDivElement>(null);
  const [portalHovered, setPortalHovered] = useState(false);

  const handlePortalPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !portalCardRef.current || e.pointerType === 'touch') return;
      const rect = portalCardRef.current.getBoundingClientRect();
      const tilt = calculateCardTiltAndLight(rect, e.clientX, e.clientY, 1.8);
      portalCardRef.current.style.setProperty('--mouse-x', `${tilt.xPercent}%`);
      portalCardRef.current.style.setProperty('--mouse-y', `${tilt.yPercent}%`);
      portalCardRef.current.style.setProperty('--rot-x', `${tilt.rotateX}deg`);
      portalCardRef.current.style.setProperty('--rot-y', `${tilt.rotateY}deg`);
      portalCardRef.current.style.setProperty('--tz', `${tilt.translateZ}px`);
    },
    [reducedMotion]
  );

  const handlePortalPointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    setPortalHovered(true);
  }, []);

  const handlePortalPointerLeave = useCallback(() => {
    setPortalHovered(false);
    if (!portalCardRef.current) return;
    portalCardRef.current.style.setProperty('--rot-x', '0deg');
    portalCardRef.current.style.setProperty('--rot-y', '0deg');
    portalCardRef.current.style.setProperty('--tz', '0px');
  }, []);

  const headingByLanguage: Record<
    Language,
    { mantra: string; kicker: string; title: string }
  > = {
    en: {
      mantra: '॥ श्री द्वारकाधीशाय नमः ॥',
      kicker: 'Sacred Seva & Temple Offering',
      title: 'Official Contribution Portal',
    },
    hi: {
      mantra: '॥ श्री द्वारकाधीशाय नमः ॥',
      kicker: 'पावन सेवा एवं मंदिर समर्पण',
      title: 'आधिकारिक सेवा समर्पण पोर्टल',
    },
    mr: {
      mantra: '॥ श्री द्वारकाधीशाय नमः ॥',
      kicker: 'पावन सेवा व मंदिर समर्पण',
      title: 'अधिकृत सेवा समर्पण पोर्टल',
    },
    gu: {
      mantra: '॥ શ્રી દ્વારકાધીશાય નમઃ ॥',
      kicker: 'પાવન સેવા અને મંદિર સમર્પણ',
      title: 'સત્તાવાર સેવા સમર્પણ પોર્ટલ',
    },
  };

  const heading = headingByLanguage[language] || headingByLanguage.en;

  return (
    <section
      id="donation"
      aria-label="Official Contribution Portal — Shri Dwarkadhish Mandir"
      className="relative w-full bg-[#F5E9D3] text-[#3F291D] py-20 sm:py-24 lg:py-28 border-b-2 border-[#C29A54]/70 scroll-mt-20 overflow-hidden"
    >
      {/* Full-Section Animated Motion-Graphics & Hanging Temple Bells Backdrop */}
      <DonationSacredAtmosphere reducedMotion={reducedMotion} />

      {/* Centered Foreground Layer (pointer-events-none on outer wings so hanging bells stay clickable) */}
      <div className="relative z-30 w-full max-w-[min(96vw,1320px)] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-7 sm:gap-9 pointer-events-none">
        {/* Sacred, Aesthetic & Spiritual Temple Crest Heading */}
        <div className="relative text-center max-w-3xl mx-auto px-4 pt-3 sm:pt-5 pointer-events-auto">
          {/* Soft Radiant Gold Aura Behind Title Crest */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 -top-2 -bottom-2 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,250,235,0.85)_0%,rgba(232,199,132,0.28)_52%,transparent_75%)] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Sacred Devanagari Invocation & Lotus Flourish */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 sm:gap-3 mb-2"
            >
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C29A54] to-[#741C24]/70" />
              <LotusOrnament size={18} className="text-[#8B5E1A]" />
              <span className="font-devanagari text-xs sm:text-sm tracking-[0.14em] text-[#741C24] font-semibold">
                {heading.mantra}
              </span>
              <LotusOrnament size={18} className="text-[#8B5E1A]" />
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#C29A54] to-[#741C24]/70" />
            </motion.div>

            {/* Ornamental Kicker */}
            <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#8B5E1A] font-bold mb-1.5">
              {heading.kicker}
            </span>

            {/* Regal Royal Title Flanked by Peacock Feathers */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="flex items-center justify-center gap-3 sm:gap-4"
            >
              <PeacockFeather size={26} className="shrink-0 hidden sm:block drop-shadow-xs" />
              <h2 className="font-serif-royal text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-balance bg-gradient-to-b from-[#64131B] via-[#84212B] to-[#9E6B24] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,253,248,0.9)]">
                {heading.title}
              </h2>
              <PeacockFeather
                size={26}
                className="shrink-0 transform scale-x-[-1] hidden sm:block drop-shadow-xs"
              />
            </motion.div>

            <FluteDivider className="w-full max-w-md mx-auto mt-3.5" />
          </div>
        </div>

        {/* Centered Blended QR Contribution Poster with Fine Aesthetic Temple Border */}
        <div className="w-full max-w-[min(94vw,920px)] mx-auto pointer-events-auto relative">
          {/* Soft radiant halo blending framed artwork cleanly into the rotating mandala */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 sm:-inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,199,132,0.48)_0%,rgba(255,253,248,0.36)_46%,transparent_74%)] pointer-events-none"
          />

          <motion.div
            ref={portalCardRef}
            onPointerMove={handlePortalPointerMove}
            onPointerEnter={handlePortalPointerEnter}
            onPointerLeave={handlePortalPointerLeave}
            initial={reducedMotion ? false : { opacity: 0.94, y: 14, scale: 0.99 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform:
                !reducedMotion && portalHovered
                  ? 'perspective(1400px) rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) translateZ(var(--tz, 0px))'
                  : 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
              transition: portalHovered
                ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1)'
                : 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative rounded-2xl sm:rounded-[1.6rem] p-[3px] sm:p-1 bg-gradient-to-br from-[#E7CA88] via-[#B8893D] to-[#E7CA88] shadow-[0_28px_75px_-16px_rgba(63,41,29,0.34),0_0_42px_rgba(194,154,84,0.32)]"
          >
            {/* Subtle Engraved Antique-Ivory & Kumkum Inner Mat */}
            <div className="relative rounded-[13px] sm:rounded-[21px] p-1.5 sm:p-2.5 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E8] to-[#F4E8D2] ring-1 ring-[#741C24]/25 overflow-hidden">
              {/* Fine Carved Corner Brackets */}
              <div
                aria-hidden="true"
                className="absolute top-1.5 left-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-[1.5px] border-l-[1.5px] border-[#741C24]/55 rounded-tl-[4px] pointer-events-none z-20"
              />
              <div
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-[1.5px] border-r-[1.5px] border-[#741C24]/55 rounded-tr-[4px] pointer-events-none z-20"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-[1.5px] border-l-[1.5px] border-[#741C24]/55 rounded-bl-[4px] pointer-events-none z-20"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-[1.5px] border-r-[1.5px] border-[#741C24]/55 rounded-br-[4px] pointer-events-none z-20"
              />

              {/* Subtle Interactive Golden Sheen */}
              {!reducedMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
                  style={{
                    opacity: portalHovered ? 0.35 : 0,
                    background:
                      'radial-gradient(560px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(232, 199, 132, 0.42), transparent 68%)',
                  }}
                />
              )}

              {/* Uncropped Crisp Donation Poster with Clean Integrated QR */}
              <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-[#C29A54]/75 shadow-[inset_0_0_0_1px_rgba(255,253,248,0.65)] bg-[#FFFDF8]">
                <img
                  src={DONATION_BANNER_SRC}
                  alt="Shri Dwarkadhish Mandir Virar East Official Scan and Pay UPI Donation Poster"
                  width={1672}
                  height={941}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[1672/941] object-contain block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
