import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../data/templeData';
import { PeacockFeather, LotusOrnament, DiyaAccent } from './KrishnaMotifs';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { useViewportVideo } from '../hooks/useViewportVideo';
import {
  attemptSafeVideoPlay,
  syncVideoAutoplayAttributes,
} from '../utils/videoAutoplayUtils';
import dwarikaVideo1 from '../dwarika 1.mp4';
import dwarikaVideo2 from '../dwarika 2.mp4';
import dwarikaVideo3 from '../dwarika 3.mp4';
import dwarikaVideo4 from '../dwarika 4.mp4';

export interface TempleGallerySectionProps {
  language: Language;
  reducedMotion?: boolean;
}

interface GalleryVideoItem {
  id: string;
  src: string;
  tag: string;
  title: string;
  caption: string;
}

interface GalleryVideoCardProps {
  item: GalleryVideoItem;
  index: number;
  isUnmuted: boolean;
  isPopupOpen: boolean;
  muteLabel: string;
  unmuteLabel: string;
  reducedMotion: boolean;
  onInspect: (index: number) => void;
  onToggleMute: (id: string, e: React.MouseEvent) => void;
  registerVideoRef: (id: string, el: HTMLVideoElement | null) => void;
}

const GalleryVideoCard: React.FC<GalleryVideoCardProps> = React.memo(
  ({
    item,
    index,
    isUnmuted,
    isPopupOpen,
    muteLabel,
    unmuteLabel,
    reducedMotion,
    onInspect,
    onToggleMute,
    registerVideoRef,
  }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const effectiveMuted = !isUnmuted || isPopupOpen;

    const isInView = useViewportVideo({
      videoRef,
      containerRef: cardRef,
      muted: effectiveMuted,
      enabled: !isPopupOpen,
      rootMargin: '120px 0px',
      initialInView: false,
    });

    const handleSetRef = useCallback(
      (el: HTMLVideoElement | null) => {
        videoRef.current = el;
        registerVideoRef(item.id, el);
      },
      [item.id, registerVideoRef]
    );

    return (
      <motion.div
        ref={cardRef}
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
        onClick={() => onInspect(index)}
        data-testid={`gallery-video-card-${item.id}`}
        className="group cursor-pointer rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/75 hover:border-[#741C24] shadow-[0_8px_22px_rgba(63,41,29,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
      >
        {/* Exact 9:16 portrait stage + object-contain guarantees zero video cropping */}
        <div className="relative w-full aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]">
          <video
            ref={handleSetRef}
            src={item.src}
            autoPlay
            loop
            muted={effectiveMuted}
            playsInline
            preload={isInView ? 'auto' : 'metadata'}
            aria-label={item.title}
            className="w-full h-full object-contain object-center block"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect(index);
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md cursor-pointer"
            aria-label={`Inspect ${item.title}`}
          >
            <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C784]" />
          </button>

          {/* Bottom Mute / Unmute button */}
          <button
            type="button"
            onClick={(e) => onToggleMute(item.id, e)}
            data-testid={`gallery-mute-btn-${item.id}`}
            aria-pressed={isUnmuted}
            aria-label={isUnmuted ? `${muteLabel} ${item.title}` : `${unmuteLabel} ${item.title}`}
            className={`absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-20 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full border text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1 sm:gap-1.5 shadow-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
              isUnmuted
                ? 'bg-[#741C24]/90 text-[#FFF8E8] border-[#E8C784]'
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

        {/* Heritage Deep-Maroon Caption Footer with Thin Gold Separator & Warm Cream Typography */}
        <div className="mt-1.5 sm:mt-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#4B141D] via-[#611D2B] to-[#4B141D] border-t border-[#C59B56] px-2 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 shadow-inner">
          <div className="min-w-0">
            <span className="block text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-[0.06em] sm:tracking-[0.16em] text-[#E1BD80] truncate">
              {item.tag}
            </span>
            <h3 className="font-serif-royal text-xs sm:text-base font-bold text-[#FFF5E8] leading-snug mt-0.5 truncate">
              {item.title}
            </h3>
          </div>
          <DiyaAccent
            animated={!reducedMotion}
            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-90"
          />
        </div>
      </motion.div>
    );
  }
);

export const TempleGallerySection: React.FC<TempleGallerySectionProps> = ({
  language,
  reducedMotion = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);
  const popupStageRef = useRef<HTMLDivElement | null>(null);

  const contentRecord = {
    en: {
      kicker: 'SHRINE PHOTOGRAPH ARCHIVE',
      heading: 'Sacred Moments & Consecration Seva',
      subheading: 'Continuous uncropped devotional darshan videos — tap sound on any frame to listen',
      muteLabel: 'Mute',
      unmuteLabel: 'Unmute',
      photo1Tag: 'Festival Seva',
      photo1Title: 'Diwali Puja',
      photo1Caption: 'Deepotsav prayers and sacred offerings before Lord Dwarkadhish on Diwali.',
      photo2Tag: 'Devi Aradhana',
      photo2Title: 'Devi Puja',
      photo2Caption: 'Sacred Devi worship and Vedic offerings at Shri Dwarkadhish Mandir, Shirgaon.',
      photo3Tag: 'Vedic Abhishekam',
      photo3Title: 'Rudrabhishek',
      photo3Caption: 'Solemn Vedic Rudrabhishek prayers and sacred panchamrit offerings at the shrine.',
      photo4Tag: 'Bhakti Utsav',
      photo4Title: 'Vitthal Puja',
      photo4Caption: 'Devotional Vitthal puja and serene evening worship at Shri Dwarkadhish Mandir.',
    },
    hi: {
      kicker: 'पावन मंदिर दर्शन दीर्घा',
      heading: 'पावन भक्ति एवं प्राण प्रतिष्ठा चलचित्र',
      subheading: 'बिना किसी क्रॉप के निरंतर दिव्य दर्शन वीडियो — ध्वनि सुनने के लिए नीचे म्यूट/अनम्यूट बटन दबाएं',
      muteLabel: 'म्यूट',
      unmuteLabel: 'ध्वनि',
      photo1Tag: 'पावन पर्व पूजा',
      photo1Title: 'दीवाली पूजा',
      photo1Caption: 'श्री द्वारकाधीश मंदिर में दीपोत्सव एवं पावन दीवाली पूजन।',
      photo2Tag: 'देवी आराधना',
      photo2Title: 'देवी पूजा',
      photo2Caption: 'शिरगांव मंदिर परिसर में श्रद्धापूर्वक संपन्न पावन देवी पूजन।',
      photo3Tag: 'वैदिक अभिषेक',
      photo3Title: 'रुद्राभिषेक',
      photo3Caption: 'वैदिक मंत्रोच्चार के साथ संपन्न पावन रुद्राभिषेक अनुष्ठान।',
      photo4Tag: 'भक्ति उपासना',
      photo4Title: 'विठ्ठल पूजा',
      photo4Caption: 'श्री द्वारकाधीश मंदिर में भक्तिभाव से संपन्न पावन विठ्ठल पूजन।',
    },
    mr: {
      kicker: 'पावन मंदिर दर्शन दालन',
      heading: 'पावन दर्शन आणि प्राणप्रतिष्ठा चलचित्रे',
      subheading: 'कोणत्याही क्रॉपिंगशिवाय अखंड दिव्य दर्शन व्हिडिओ — ध्वनीसाठी खालील बटणावर क्लिक करा',
      muteLabel: 'म्यूट',
      unmuteLabel: 'ध्वनी',
      photo1Tag: 'सण उत्सव सेवा',
      photo1Title: 'दिवाळी पूजा',
      photo1Caption: 'श्री द्वारकाधीश मंदिरात मंगल दीपोत्सव आणि दिवाळी पूजन.',
      photo2Tag: 'देवी आराधना',
      photo2Title: 'देवी पूजा',
      photo2Caption: 'शिरगाव मंदिरात भक्तिभावाने पार पडलेली पवित्र देवी पूजा.',
      photo3Tag: 'वैदिक अभिषेक',
      photo3Title: 'रुद्राभिषेक',
      photo3Caption: 'वैदिक मंत्रघोषात संपन्न झालेला पावन रुद्राभिषेक सोहळा.',
      photo4Tag: 'भक्ती उपासना',
      photo4Title: 'विठ्ठल पूजा',
      photo4Caption: 'श्री द्वारकाधीश मंदिरात श्रद्धापूर्वक केलेली विठ्ठल पूजा.',
    },
    gu: {
      kicker: 'પવિત્ર મંદિર દર્શન ઝલક',
      heading: 'પવિત્ર દર્શન અને પ્રાણપ્રતિષ્ઠા સેવા ચલચિત્રો',
      subheading: 'સંપૂર્ણ અનક્રોપ્ડ નિરંતર દર્શન વિડિયો — અવાજ સાંભળવા નીચેનું બટન દબાવો',
      muteLabel: 'મ્યૂટ',
      unmuteLabel: 'અવાજ',
      photo1Tag: 'ઉત્સવ પૂજા',
      photo1Title: 'દિવાળી પૂજા',
      photo1Caption: 'શ્રી દ્વારકાધીશ મંદિરમાં દીપોત્સવ અને પાવન દિવાળી પૂજન.',
      photo2Tag: 'દેવી આરાધના',
      photo2Title: 'દેવી પૂજા',
      photo2Caption: 'શિરગાવ મંદિરમાં ભક્તિભાવપૂર્વક સંપન્ન પવિત્ર દેવી પૂજા.',
      photo3Tag: 'વૈદિક અભિષેક',
      photo3Title: 'રુદ્રાભિષેક',
      photo3Caption: 'વૈદિક મંત્રોચ્ચાર સાથે સંપન્ન પવિત્ર રુદ્રાભિષેક વિધિ.',
      photo4Tag: 'ભક્તિ ઉપાસના',
      photo4Title: 'વિઠ્ઠલ પૂજા',
      photo4Caption: 'શ્રી દ્વારકાધીશ મંદિરમાં શ્રદ્ધાપૂર્વક થયેલી પવિત્ર વિઠ્ઠલ પૂજા.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  const galleryVideos: GalleryVideoItem[] = useMemo(
    () => [
      {
        id: 'dwarika-1',
        src: dwarikaVideo1,
        tag: c.photo1Tag,
        title: c.photo1Title,
        caption: c.photo1Caption,
      },
      {
        id: 'dwarika-2',
        src: dwarikaVideo2,
        tag: c.photo2Tag,
        title: c.photo2Title,
        caption: c.photo2Caption,
      },
      {
        id: 'dwarika-3',
        src: dwarikaVideo3,
        tag: c.photo3Tag,
        title: c.photo3Title,
        caption: c.photo3Caption,
      },
      {
        id: 'dwarika-4',
        src: dwarikaVideo4,
        tag: c.photo4Tag,
        title: c.photo4Title,
        caption: c.photo4Caption,
      },
    ],
    [
      c.photo1Tag,
      c.photo1Title,
      c.photo1Caption,
      c.photo2Tag,
      c.photo2Title,
      c.photo2Caption,
      c.photo3Tag,
      c.photo3Title,
      c.photo3Caption,
      c.photo4Tag,
      c.photo4Title,
      c.photo4Caption,
    ]
  );

  const registerVideoRef = useCallback((id: string, el: HTMLVideoElement | null) => {
    videoRefs.current[id] = el;
  }, []);

  const handleToggleMute = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const nextId = unmutedId === id ? null : id;
      for (const item of galleryVideos) {
        const vid = videoRefs.current[item.id];
        if (!vid) continue;
        const shouldMute = activeIndex !== null || nextId !== item.id;
        syncVideoAutoplayAttributes(vid, { muted: shouldMute, loop: true });
        if (!shouldMute) {
          attemptSafeVideoPlay(vid, { muted: false, loop: true });
        }
      }
      if (popupVideoRef.current && galleryVideos[activeIndex ?? -1]?.id === id) {
        const shouldMutePopup = nextId !== id;
        attemptSafeVideoPlay(popupVideoRef.current, { muted: shouldMutePopup, loop: true });
      }
      setUnmutedId(nextId);
    },
    [unmutedId, activeIndex, galleryVideos]
  );

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryVideos.length) % galleryVideos.length
    );
  }, [galleryVideos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % galleryVideos.length));
  }, [galleryVideos.length]);

  // Ensure popup video plays reliably on mobile & desktop via IntersectionObserver + unified autoplay sync
  const activeVideo = activeIndex !== null ? galleryVideos[activeIndex] : null;
  const activeVideoId = activeVideo?.id ?? null;

  useViewportVideo({
    videoRef: popupVideoRef,
    containerRef: popupStageRef,
    muted: unmutedId !== activeVideoId,
    enabled: Boolean(activeVideoId),
    watchKey: activeVideoId ?? 'none',
    initialInView: true,
    onFallbackMuted: () => setUnmutedId(null),
  });

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-heading"
      className="relative w-full bg-[#F3E7D6] text-[#3F291D] py-12 sm:py-16 lg:py-20 border-b border-[#E5D1B6] overflow-hidden scroll-mt-20"
    >
      {/* Rotating Sacred Background Chakra */}
      <SectionBackgroundChakra reducedMotion={reducedMotion} />

      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-7 sm:mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <PeacockFeather size={22} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-bold">
              {c.kicker}
            </span>
            <PeacockFeather size={22} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="gallery-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#741C24] tracking-tight mb-2"
          >
            {c.heading}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#3F291D]/80 font-serif max-w-2xl mx-auto mb-4">
            {c.subheading}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
            <LotusOrnament size={22} className="text-[#C29A54]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          </div>
        </div>

        {/* Uncropped 9:16 4-Card Portrait Video Row (Exact match for 720x1280 source videos) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {galleryVideos.map((item, idx) => (
            <GalleryVideoCard
              key={item.id}
              item={item}
              index={idx}
              isUnmuted={unmutedId === item.id}
              isPopupOpen={activeIndex !== null}
              muteLabel={c.muteLabel}
              unmuteLabel={c.unmuteLabel}
              reducedMotion={reducedMotion}
              onInspect={setActiveIndex}
              onToggleMute={handleToggleMute}
              registerVideoRef={registerVideoRef}
            />
          ))}
        </div>
      </div>

      {/* Interactive High-Resolution Video Popup (Non-blocking website scroll, max-h-[80vh] overflow-y-auto) */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            data-testid="gallery-video-popup"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-auto relative max-w-5xl w-full max-h-[80vh] overflow-y-auto overscroll-auto bg-[#241711] rounded-2xl sm:rounded-3xl border-2 border-[#C29A54]/70 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 min-w-[40px] min-h-[40px] p-2 rounded-full bg-black/75 hover:bg-[#741C24] text-white border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 text-[#E8C784]" />
              </button>

              {/* Video Stage with Prev / Next Controls & Mute Toggle */}
              <div
                ref={popupStageRef}
                className="relative aspect-[9/12] sm:aspect-[16/9] bg-black max-h-[54vh] sm:max-h-[66vh] flex items-center justify-center p-2"
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous video"
                  className="absolute left-2.5 sm:left-4 z-20 min-w-[40px] min-h-[40px] p-2 rounded-full bg-black/70 hover:bg-[#741C24] text-[#E8C784] border border-white/20 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <video
                  ref={popupVideoRef}
                  key={activeVideo.id}
                  src={activeVideo.src}
                  autoPlay
                  loop
                  muted={unmutedId !== activeVideo.id}
                  playsInline
                  preload="auto"
                  aria-label={activeVideo.title}
                  className="max-h-full max-w-full object-contain"
                />

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next video"
                  className="absolute right-2.5 sm:right-4 z-20 min-w-[40px] min-h-[40px] p-2 rounded-full bg-black/70 hover:bg-[#741C24] text-[#E8C784] border border-white/20 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => handleToggleMute(activeVideo.id, e)}
                  className="absolute bottom-3 right-3 z-20 min-h-[36px] px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#741C24] text-white border border-[#E8C784]/60 text-xs font-cinzel font-semibold tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  {unmutedId === activeVideo.id ? (
                    <>
                      <Volume2 className="w-4 h-4 text-[#F5D77F]" />
                      <span>{c.muteLabel}</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-[#E8C784]" />
                      <span>{c.unmuteLabel}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Lightbox Caption Bar */}
              <div className="p-4 sm:p-6 bg-[#2B1B13] border-t border-[#C29A54]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <span className="inline-block font-cinzel text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#E1BD80] mb-1">
                    {activeVideo.tag}
                  </span>
                  <h4 className="font-serif-royal text-lg sm:text-2xl font-bold text-[#FFFDF7] mb-1">
                    {activeVideo.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F1E3CC]/90 font-serif max-w-3xl leading-relaxed">
                    {activeVideo.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="min-h-[42px] px-5 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase bg-[#C29A54] hover:bg-[#A88242] text-[#3F291D] transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TempleGallerySection;
