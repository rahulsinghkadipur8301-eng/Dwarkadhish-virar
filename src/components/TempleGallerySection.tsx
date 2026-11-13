import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../data/templeData';
import { PeacockFeather, LotusOrnament } from './KrishnaMotifs';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';

export interface TempleGallerySectionProps {
  language: Language;
  reducedMotion?: boolean;
}

interface GalleryPortraitItem {
  id: string;
  src: string;
  fallbackSrc: string;
  tag: string;
  title: string;
  caption: string;
}

export const TempleGallerySection: React.FC<TempleGallerySectionProps> = ({
  language,
  reducedMotion = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const contentRecord = {
    en: {
      kicker: 'SHRINE PHOTOGRAPH ARCHIVE',
      heading: 'Sacred Moments & Consecration Seva',
      subheading: 'Full uncropped devotional photographs — click any portrait to inspect at full clarity',
      photo1Tag: 'Sanctum Darshan',
      photo1Title: 'Offering Before the Deity',
      photo1Caption: 'Adorning Bhagwan Dwarkadhish in the illuminated inner sanctum.',
      photo2Tag: 'Vedic Abhishekam',
      photo2Title: 'Consecration Abhishekam',
      photo2Caption: 'Pouring sacred waters during Vedic Pran Pratishtha ceremonies.',
      photo3Tag: 'Dwarkadhish Splendour',
      photo3Title: 'Dressed Dwarkadhish in Temple Splendour',
      photo3Caption: 'Offering sacred aarti thali before Lord Dwarkadhish adorned in royal silk vestments.',
      photo4Tag: 'Charan Seva',
      photo4Title: 'Humble Charan Seva',
      photo4Caption: 'Bowing in quiet reverence at the lotus feet of Lord Dwarkadhish.',
    },
    hi: {
      kicker: 'पावन चित्र दीर्घा',
      heading: 'पावन भक्ति एवं प्राण प्रतिष्ठा छायाचित्र',
      subheading: 'बिना किसी क्रॉप के पूर्ण सुरक्षित छायाचित्र — बड़े रूप में देखने हेतु क्लिक करें',
      photo1Tag: 'गर्भगृह वंदना',
      photo1Title: 'प्रभु विग्रह को अर्पण',
      photo1Caption: 'श्री द्वारकाधीश भगवान के समक्ष श्रद्धापूर्वक पुष्पहार एवं वंदन।',
      photo2Tag: 'वैदिक अभिषेक',
      photo2Title: 'पावन जलाभिषेक अनुष्ठान',
      photo2Caption: 'वैदिक प्राण प्रतिष्ठा के दौरान स्वर्ण कलश से पवित्र अभिषेक।',
      photo3Tag: 'द्वारकाधीश श्रृंगार',
      photo3Title: 'दिव्य राजसी श्रृंगार एवं आरती',
      photo3Caption: 'रेशमी पीतांबर व आभूषणों से सुसज्जित भगवान द्वारकाधीश की पावन आरती सेवा।',
      photo4Tag: 'चरण सेवा',
      photo4Title: 'विनम्र चरण वंदना',
      photo4Caption: 'श्री द्वारकाधीश भगवान के श्रीचरणों में गहन भक्ति और समर्पण।',
    },
    mr: {
      kicker: 'पावन चित्रदालन',
      heading: 'पावन दर्शन आणि प्राणप्रतिष्ठा क्षणचित्रे',
      subheading: 'कोणत्याही क्रॉपिंगशिवाय संपूर्ण सुरक्षित छायाचित्रे — पूर्ण पाहण्यासाठी क्लिक करा',
      photo1Tag: 'गर्भगृह सेवा',
      photo1Title: 'प्रभु विग्रहासमोर अर्पण',
      photo1Caption: 'श्री द्वारकाधीश भगवान यांच्या गाभाऱ्यात श्रद्धेने केलेली प्रार्थना.',
      photo2Tag: 'वैदिक अभिषेक',
      photo2Title: 'पवित्र जलाभिषेक विधी',
      photo2Caption: 'वैदिक प्राणप्रतिष्ठा प्रसंगी सुवर्ण कलशातून मंगल अभिषेक.',
      photo3Tag: 'द्वारकाधीश ऐश्वर्य',
      photo3Title: 'राजसी शृंगार व आरती सेवा',
      photo3Caption: 'रेशमी वस्त्रे व अलंकारांनी सजलेल्या श्री द्वारकाधीशांची भक्तिभावाने केलेली आरती.',
      photo4Tag: 'चरण सेवा',
      photo4Title: 'विनम्र चरण वंदना',
      photo4Caption: 'श्री द्वारकाधीशांच्या चरणकमलांशी संपूर्ण शरणागत भाव.',
    },
    gu: {
      kicker: 'પવિત્ર ચિત્ર દર્શન',
      heading: 'પવિત્ર દર્શન અને પ્રાણપ્રતિષ્ઠા સેવા ઝલક',
      subheading: 'સંપૂર્ણ અનક્રોપ્ડ તસવીરો — પૂર્ણ કદમાં જોવા માટે કોઈપણ તસવીર પર ક્લિક કરો',
      photo1Tag: 'ગર્ભગૃહ સેવા',
      photo1Title: 'પ્રભુ વિગ્રહ સમક્ષ અર્પણ',
      photo1Caption: 'શ્રી દ્વારકાધીશ ભગવાનના ગર્ભગૃહમાં ભક્તિભાવપૂર્વક વંદન.',
      photo2Tag: 'વૈદિક અભિષેક',
      photo2Title: 'પવિત્ર જળાભિષેક વિધિ',
      photo2Caption: 'વૈદિક પ્રાણપ્રતિષ્ઠા પ્રસંગે સુવર્ણ કળશ દ્વારા મંગળ અભિષેક.',
      photo3Tag: 'દ્વારકાધીશ વૈભવ',
      photo3Title: 'રાજસી શૃંગાર અને આરતી સેવા',
      photo3Caption: 'રેશમી પીતાંબર અને સુવર્ણ આભૂષણોથી સજ્જ શ્રી દ્વારકાધીશની આરતી વંદના.',
      photo4Tag: 'ચરણ સેવા',
      photo4Title: 'વિનમ્ર ચરણ વંદના',
      photo4Caption: 'શ્રી દ્વારકાધીશ પ્રભુના ચરણકમળમાં અનન્ય ભક્તિ અને શ્રદ્ધા.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  const galleryPhotos: GalleryPortraitItem[] = [
    {
      id: 'offering-before-deity',
      src: '/assets/praveena_thakur/before_idol.webp',
      fallbackSrc: '/dwarkadhish_temple_widescreen_4k.webp',
      tag: c.photo1Tag,
      title: c.photo1Title,
      caption: c.photo1Caption,
    },
    {
      id: 'consecration-abhishekam',
      src: '/assets/praveena_thakur/devotional_ceremony.webp',
      fallbackSrc: '/assets/praveena_thakur/before_idol.webp',
      tag: c.photo2Tag,
      title: c.photo2Title,
      caption: c.photo2Caption,
    },
    {
      id: 'dressed-dwarkadhish-splendour',
      src: '/assets/praveena_thakur/dressed_dwarkadhish_splendour.webp',
      fallbackSrc: '/assets/praveena_thakur/before_idol.webp',
      tag: c.photo3Tag,
      title: c.photo3Title,
      caption: c.photo3Caption,
    },
    {
      id: 'humble-charan-seva',
      src: '/assets/praveena_thakur/charan_seva.webp',
      fallbackSrc: '/assets/praveena_thakur/devotional_ceremony.webp',
      tag: c.photo4Tag,
      title: c.photo4Title,
      caption: c.photo4Caption,
    },
  ];

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryPhotos.length) % galleryPhotos.length
    );
  }, [galleryPhotos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % galleryPhotos.length));
  }, [galleryPhotos.length]);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  const activePhoto = activeIndex !== null ? galleryPhotos[activeIndex] : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-heading"
      className="relative w-full bg-[#F3E7D6] text-[#3F291D] py-14 sm:py-16 lg:py-20 border-b border-[#E5D1B6] overflow-hidden scroll-mt-20"
    >
      {/* Rotating Sacred Background Chakra */}
      <SectionBackgroundChakra reducedMotion={reducedMotion} />

      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
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

        {/* Uncropped 9:16 4-Card Portrait Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: 'easeOut' }}
              onClick={() => setActiveIndex(idx)}
              className="group cursor-pointer rounded-2xl p-2 sm:p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/75 hover:border-[#741C24] shadow-[0_8px_22px_rgba(63,41,29,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Exact 9:16 portrait stage + object-contain guarantees zero face/detail cropping */}
              <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1D120C]">
                <img
                  src={photo.src}
                  onError={(e) => {
                    if (photo.fallbackSrc) {
                      (e.target as HTMLImageElement).src = photo.fallbackSrc;
                    }
                  }}
                  alt={photo.title}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md cursor-pointer"
                  aria-label={`Inspect ${photo.title}`}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                </button>
              </div>

              {/* Clean Title Footer Without Subtitles */}
              <div className="pt-2.5 px-1">
                <span className="inline-block text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#C29A54]">
                  {photo.tag}
                </span>
                <h3 className="font-serif-royal text-sm sm:text-base font-bold text-[#741C24] leading-snug mt-0.5">
                  {photo.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive High-Resolution Lightbox Modal (Uncropped object-contain + Arrow Keys) */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full bg-[#241711] rounded-3xl overflow-hidden border-2 border-[#C29A54]/70 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#741C24] text-white border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 text-[#E8C784]" />
              </button>

              {/* Image Stage with Prev / Next Controls */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black max-h-[72vh] flex items-center justify-center p-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                  className="absolute left-3 sm:left-4 z-20 p-2.5 rounded-full bg-black/65 hover:bg-[#741C24] text-[#E8C784] border border-white/20 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <img
                  src={activePhoto.src}
                  onError={(e) => {
                    if (activePhoto.fallbackSrc) {
                      (e.target as HTMLImageElement).src = activePhoto.fallbackSrc;
                    }
                  }}
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain"
                />

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photograph"
                  className="absolute right-3 sm:right-4 z-20 p-2.5 rounded-full bg-black/65 hover:bg-[#741C24] text-[#E8C784] border border-white/20 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Caption Bar */}
              <div className="p-5 sm:p-6 bg-[#2B1B13] border-t border-[#C29A54]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-cinzel font-bold bg-[#C29A54] text-[#3F291D] mb-1.5">
                    {activePhoto.tag}
                  </span>
                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#FFFDF7] mb-1">
                    {activePhoto.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F1E3CC]/90 font-serif max-w-3xl leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase bg-[#C29A54] hover:bg-[#A88242] text-[#3F291D] transition-colors cursor-pointer shrink-0"
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
