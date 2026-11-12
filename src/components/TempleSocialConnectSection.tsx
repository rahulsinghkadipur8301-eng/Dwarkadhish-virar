import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, QrCode, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { PeacockFeather, FluteDivider, DiyaAccent } from './KrishnaMotifs';
import { useI18n } from '../i18n/I18nContext';
import { calculateCardTiltAndLight } from '../utils/motionUtils';

export interface TempleSocialConnectSectionProps {
  reducedMotion?: boolean;
}

export const OFFICIAL_SOCIAL_LINKS = {
  whatsappChannel: {
    url: 'https://whatsapp.com/channel/0029Vb7mlVF30LKNt0hhbL33',
    qrPath: '/assets/whatsapp_channel_qr.png',
    channelType: 'channel' as const,
  },
  instagram: {
    handle: '@haripriyadwarka',
    url: 'https://www.instagram.com/haripriyadwarka/',
    qrPath: '/assets/instagram_dwarkadhish_qr.jpeg',
    channelType: 'profile' as const,
  },
};

/**
 * Custom WhatsApp Brand Icon (authentic chat/channel bubble with phone silhouette)
 */
export const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-6 h-6',
  size,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.96 13.67 14.52 13.52 14.69C13.38 14.86 13.23 14.88 12.98 14.76C12.73 14.63 11.93 14.37 10.98 13.52C10.24 12.86 9.74 12.05 9.6 11.8C9.45 11.55 9.58 11.42 9.71 11.29C9.82 11.18 9.96 11 10.08 10.86C10.21 10.72 10.25 10.62 10.33 10.45C10.41 10.29 10.37 10.14 10.31 10.02C10.25 9.9 9.76 8.7 9.56 8.2C9.36 7.72 9.16 7.78 9.01 7.77H8.54C8.37 7.77 8.1 7.84 7.87 8.08C7.65 8.33 7.02 8.92 7.02 10.13C7.02 11.34 7.9 12.51 8.02 12.67C8.15 12.84 9.75 15.3 12.2 16.36C12.78 16.61 13.24 16.76 13.59 16.87C14.18 17.06 14.71 17.03 15.14 16.97C15.61 16.9 16.59 16.38 16.79 15.8C17 15.22 17 14.72 16.94 14.62C16.88 14.52 16.82 14.51 16.57 14.39Z" />
  </svg>
);

/**
 * Custom Instagram Brand Icon (authentic camera glyph)
 */
export const InstagramIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-6 h-6',
  size,
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0ZM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM18.406 4.406a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);

/**
 * TempleSocialConnectSection
 *
 * Dedicated, premium social media section integrating the official WhatsApp Channel
 * and Instagram accounts of Shri Dwarkadhish Mandir (Shirgaon, Virar East) with their
 * verified QR codes, four-language localization, high-contrast accessible touch targets,
 * cursor-responsive background illumination, 3D card tilt, and authentic Vaishnav temple architectural aesthetics.
 */
export const TempleSocialConnectSection: React.FC<TempleSocialConnectSectionProps> = ({
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();

  // Card element references for direct CSS property updates (zero React re-render overhead)
  const whatsappCardRef = useRef<HTMLDivElement>(null);
  const instagramCardRef = useRef<HTMLDivElement>(null);

  const [whatsappHovered, setWhatsappHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);

  // Mouse move handler for WhatsApp card
  const handleWhatsappPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !whatsappCardRef.current || e.pointerType === 'touch') return;
      const rect = whatsappCardRef.current.getBoundingClientRect();
      const tilt = calculateCardTiltAndLight(rect, e.clientX, e.clientY, 2.5);

      whatsappCardRef.current.style.setProperty('--mouse-x', `${tilt.xPercent}%`);
      whatsappCardRef.current.style.setProperty('--mouse-y', `${tilt.yPercent}%`);
      whatsappCardRef.current.style.setProperty('--rot-x', `${tilt.rotateX}deg`);
      whatsappCardRef.current.style.setProperty('--rot-y', `${tilt.rotateY}deg`);
      whatsappCardRef.current.style.setProperty('--tz', `${tilt.translateZ}px`);
    },
    [reducedMotion]
  );

  const handleWhatsappPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch') return;
      setWhatsappHovered(true);
    },
    []
  );

  const handleWhatsappPointerLeave = useCallback(() => {
    setWhatsappHovered(false);
    if (!whatsappCardRef.current) return;
    whatsappCardRef.current.style.setProperty('--rot-x', '0deg');
    whatsappCardRef.current.style.setProperty('--rot-y', '0deg');
    whatsappCardRef.current.style.setProperty('--tz', '0px');
  }, []);

  // Mouse move handler for Instagram card
  const handleInstagramPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !instagramCardRef.current || e.pointerType === 'touch') return;
      const rect = instagramCardRef.current.getBoundingClientRect();
      const tilt = calculateCardTiltAndLight(rect, e.clientX, e.clientY, 2.5);

      instagramCardRef.current.style.setProperty('--mouse-x', `${tilt.xPercent}%`);
      instagramCardRef.current.style.setProperty('--mouse-y', `${tilt.yPercent}%`);
      instagramCardRef.current.style.setProperty('--rot-x', `${tilt.rotateX}deg`);
      instagramCardRef.current.style.setProperty('--rot-y', `${tilt.rotateY}deg`);
      instagramCardRef.current.style.setProperty('--tz', `${tilt.translateZ}px`);
    },
    [reducedMotion]
  );

  const handleInstagramPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch') return;
      setInstagramHovered(true);
    },
    []
  );

  const handleInstagramPointerLeave = useCallback(() => {
    setInstagramHovered(false);
    if (!instagramCardRef.current) return;
    instagramCardRef.current.style.setProperty('--rot-x', '0deg');
    instagramCardRef.current.style.setProperty('--rot-y', '0deg');
    instagramCardRef.current.style.setProperty('--tz', '0px');
  }, []);

  return (
    <section
      id="social"
      aria-labelledby="social-section-heading"
      className="relative w-full bg-[#FAF5EC] border-b border-[#E5D1B6] py-20 sm:py-24 lg:py-28 select-none overflow-hidden scroll-mt-20"
    >
      {/* Background Indian Sacred Geometry Motifs */}
      <div className="absolute top-10 left-6 w-80 h-80 opacity-[0.035] pointer-events-none transform -rotate-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#B68A45" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="70" stroke="#6B4832" strokeWidth="1.5" />
          <polygon points="100,20 180,140 20,140" stroke="#B68A45" strokeWidth="1.2" />
          <polygon points="100,180 180,60 20,60" stroke="#921B2C" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 w-72 h-72 opacity-[0.035] pointer-events-none transform rotate-45">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="85" stroke="#C59B56" strokeWidth="2" />
          <circle cx="100" cy="100" r="55" stroke="#B68A45" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M100 10V190M10 100H190" stroke="#3C2A20" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        
        {/* =====================================================================
            1. SECTION EDITORIAL HEADER
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <PeacockFeather size={28} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#B68A45] font-bold">
              {tDict.social.kicker}
            </span>
            <PeacockFeather size={28} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="social-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-3"
          >
            {tDict.social.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#715847] leading-relaxed max-w-2xl mx-auto mb-4">
            {tDict.social.subtitle}
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-wider bg-[#FFFDF8] border border-[#B68A45]/60 text-[#6B4832] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B68A45]" />
              <span>॥ श्री द्वारकाधीशाय नमः ॥</span>
              <Sparkles className="w-3.5 h-3.5 text-[#B68A45]" />
            </span>
          </div>

          <div className="mt-5">
            <FluteDivider />
          </div>
        </motion.div>

        {/* =====================================================================
            2. TWO BALANCED CARDS: WHATSAPP CHANNEL & INSTAGRAM
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-stretch max-w-7xl 2xl:max-w-[1500px] mx-auto w-full">
          
          {/* -----------------------------------------------------------------
              CARD ONE: WHATSAPP CHANNEL
             ----------------------------------------------------------------- */}
          <div className="relative [perspective:1000px] flex">
            {/* Subtle exterior aura bloom */}
            <div
              className={`absolute -inset-1.5 rounded-3xl bg-[#075E43]/15 blur-xl transition-opacity duration-500 pointer-events-none ${
                whatsappHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <motion.div
              ref={whatsappCardRef}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
              onPointerMove={handleWhatsappPointerMove}
              onPointerEnter={handleWhatsappPointerEnter}
              onPointerLeave={handleWhatsappPointerLeave}
              style={{
                transform: reducedMotion
                  ? 'none'
                  : 'rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) translateZ(var(--tz, 0px))',
                transition: 'transform 0.22s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.35s ease, border-color 0.35s ease',
              }}
              className="group relative w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#D8C2A4] hover:border-[#25D366]/70 shadow-[0_10px_30px_rgba(60,42,32,0.06)] hover:shadow-[0_20px_45px_rgba(7,94,67,0.18)] flex flex-col justify-between overflow-hidden p-7 sm:p-9 xl:p-10"
            >
              {/* Soft Localized Radial Light Bloom Following Cursor */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
                style={{
                  opacity: whatsappHovered ? 1 : 0,
                  background:
                    'radial-gradient(circle 380px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 211, 102, 0.16) 0%, rgba(7, 94, 67, 0.08) 40%, rgba(223, 244, 230, 0.04) 60%, transparent 80%)',
                }}
              />

              {/* Top Ornate Filigree Corner Accents */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#25D366]/12 to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
                <DiyaAccent animated={false} />
              </div>

              {/* Card Content Top */}
              <div className="relative z-10">
                {/* Header: Brand Icon & Titles */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md ring-4 ring-[#25D366]/20 transition-all duration-300 ${
                      whatsappHovered ? 'scale-105 shadow-[0_0_24px_rgba(37,211,102,0.5)]' : ''
                    }`}
                  >
                    <WhatsAppIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#3C2A20]">
                      {tDict.social.whatsapp.title}
                    </h3>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[11px] font-cinzel font-bold tracking-wider uppercase bg-[#E8F8EE] text-[#075E43] border border-[#25D366]/40">
                      {tDict.social.whatsapp.channelBadge}
                    </span>
                  </div>
                </div>

                {/* Localized Description */}
                <p className="text-sm sm:text-base text-[#715847] leading-relaxed mb-6">
                  {tDict.social.whatsapp.description}
                </p>

                {/* High-Quality QR Code Presentation Frame with Clean Quiet Zone (Stable layer) */}
                <div className="relative my-4 flex flex-col items-center [transform:translateZ(0)]">
                  <div className="relative p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#E5D1B6] shadow-[0_6px_20px_rgba(60,42,32,0.06)] transition-all group-hover:border-[#25D366]/60">
                    {/* Outer Gold Ornamental Corner Marks */}
                    <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B68A45] rounded-tl-xs pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B68A45] rounded-tr-xs pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B68A45] rounded-bl-xs pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B68A45] rounded-br-xs pointer-events-none" />

                    {/* Clean un-stretched, un-blurred QR Code */}
                    <img
                      src={OFFICIAL_SOCIAL_LINKS.whatsappChannel.qrPath}
                      alt={tDict.social.whatsapp.qrAlt}
                      width={220}
                      height={220}
                      loading="lazy"
                      decoding="async"
                      className="w-48 sm:w-56 h-48 sm:h-56 aspect-square object-contain block mx-auto rounded-md select-all"
                    />
                  </div>

                  {/* Scan Guidance Caption */}
                  <div className="mt-3.5 flex items-center gap-1.5 text-xs text-[#8C6D28] font-cinzel font-semibold tracking-wider">
                    <QrCode className="w-4 h-4 text-[#B68A45]" />
                    <span>{tDict.social.whatsapp.scanNotice}</span>
                  </div>

                  {/* Follower Benefit Bullet */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-[#523725]">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="font-devanagari font-medium">{tDict.social.whatsapp.followersBenefit}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Button */}
              <div className="pt-6 border-t border-[#EFE2CF] mt-6 relative z-10">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.whatsappChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden w-full min-h-[48px] py-3.5 px-6 rounded-xl font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 group/btn cursor-pointer active:scale-98"
                  aria-label={`${tDict.social.whatsapp.btnAction} — ${tDict.social.whatsapp.title}`}
                >
                  {/* Subtle Polished Diagonal Light Shimmer on Hover */}
                  <span className="absolute inset-0 w-1/3 bg-white/20 skew-x-[-20deg] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-cta-shimmer pointer-events-none" />
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span className="relative z-10">{tDict.social.whatsapp.btnAction}</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* -----------------------------------------------------------------
              CARD TWO: INSTAGRAM PROFILE
             ----------------------------------------------------------------- */}
          <div className="relative [perspective:1000px] flex">
            {/* Subtle exterior aura bloom */}
            <div
              className={`absolute -inset-1.5 rounded-3xl bg-[#E65B87]/15 blur-xl transition-opacity duration-500 pointer-events-none ${
                instagramHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <motion.div
              ref={instagramCardRef}
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.16 }}
              onPointerMove={handleInstagramPointerMove}
              onPointerEnter={handleInstagramPointerEnter}
              onPointerLeave={handleInstagramPointerLeave}
              style={{
                transform: reducedMotion
                  ? 'none'
                  : 'rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg)) translateZ(var(--tz, 0px))',
                transition: 'transform 0.22s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.35s ease, border-color 0.35s ease',
              }}
              className="group relative w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#D8C2A4] hover:border-[#E65B87]/70 shadow-[0_10px_30px_rgba(60,42,32,0.06)] hover:shadow-[0_20px_45px_rgba(141,102,199,0.18)] flex flex-col justify-between overflow-hidden p-7 sm:p-9 xl:p-10"
            >
              {/* Soft Localized Radial Light Bloom Following Cursor */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
                style={{
                  opacity: instagramHovered ? 1 : 0,
                  background:
                    'radial-gradient(circle 380px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 91, 135, 0.16) 0%, rgba(141, 102, 199, 0.12) 35%, rgba(217, 160, 93, 0.08) 60%, transparent 80%)',
                }}
              />

              {/* Top Ornate Filigree Corner Accents */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#E65B87]/12 to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
                <DiyaAccent animated={false} />
              </div>

              {/* Card Content Top */}
              <div className="relative z-10">
                {/* Header: Brand Icon & Handle */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-md ring-4 ring-[#E65B87]/20 transition-all duration-300 ${
                      instagramHovered ? 'scale-105 shadow-[0_0_24px_rgba(230,91,135,0.5)]' : ''
                    }`}
                    style={{
                      background:
                        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                    }}
                  >
                    <InstagramIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#3C2A20]">
                      {tDict.social.instagram.handle}
                    </h3>
                    <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[11px] font-cinzel font-bold tracking-wider uppercase bg-[#FDF2F4] text-[#921B2C] border border-[#E65B87]/40">
                      {tDict.social.instagram.handleBadge}
                    </span>
                  </div>
                </div>

                {/* Localized Description */}
                <p className="text-sm sm:text-base text-[#715847] leading-relaxed mb-6">
                  {tDict.social.instagram.description}
                </p>

                {/* High-Quality QR Code Presentation Frame with Clean Quiet Zone (Stable layer) */}
                <div className="relative my-4 flex flex-col items-center [transform:translateZ(0)]">
                  <div className="relative p-4 sm:p-5 bg-white rounded-2xl border-2 border-[#E5D1B6] shadow-[0_6px_20px_rgba(60,42,32,0.06)] transition-all group-hover:border-[#E65B87]/60">
                    {/* Outer Gold Ornamental Corner Marks */}
                    <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B68A45] rounded-tl-xs pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B68A45] rounded-tr-xs pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B68A45] rounded-bl-xs pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B68A45] rounded-br-xs pointer-events-none" />

                    {/* Clean un-stretched, un-blurred QR Code */}
                    <img
                      src={OFFICIAL_SOCIAL_LINKS.instagram.qrPath}
                      alt={tDict.social.instagram.qrAlt}
                      width={220}
                      height={220}
                      loading="lazy"
                      decoding="async"
                      className="w-48 sm:w-56 h-48 sm:h-56 aspect-square object-contain block mx-auto rounded-md select-all"
                    />
                  </div>

                  {/* Scan Guidance Caption */}
                  <div className="mt-3.5 flex items-center gap-1.5 text-xs text-[#8C6D28] font-cinzel font-semibold tracking-wider">
                    <QrCode className="w-4 h-4 text-[#B68A45]" />
                    <span>{tDict.social.instagram.scanNotice}</span>
                  </div>

                  {/* Follower Benefit Bullet */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-[#523725]">
                    <CheckCircle2 className="w-4 h-4 text-[#921B2C] shrink-0" />
                    <span className="font-devanagari font-medium">{tDict.social.instagram.followersBenefit}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Button */}
              <div className="pt-6 border-t border-[#EFE2CF] mt-6 relative z-10">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden w-full min-h-[48px] py-3.5 px-6 rounded-xl font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-[#921B2C] via-[#B68A45] to-[#921B2C] hover:from-[#7B1624] hover:to-[#7B1624] text-[#FFFDF8] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 group/btn cursor-pointer active:scale-98"
                  aria-label={`${tDict.social.instagram.btnAction} — ${tDict.social.instagram.handle}`}
                >
                  {/* Subtle Polished Diagonal Light Shimmer on Hover */}
                  <span className="absolute inset-0 w-1/3 bg-white/20 skew-x-[-20deg] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-cta-shimmer pointer-events-none" />
                  <InstagramIcon className="w-5 h-5 text-white shrink-0" />
                  <span className="relative z-10">{tDict.social.instagram.btnAction}</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 shrink-0" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile-Friendly Bottom Guidance Pill */}
        <div className="mt-12 max-w-md mx-auto text-center sm:hidden">
          <p className="text-xs text-[#715847] flex items-center justify-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#B68A45]" />
            <span>{tDict.social.mobileTapNotice}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TempleSocialConnectSection;
