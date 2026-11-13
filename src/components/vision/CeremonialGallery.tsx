import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, Eye, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, FluteDivider, DiyaAccent } from '../KrishnaMotifs';

export interface GalleryPhoto {
  id: string;
  src: string;
  fallbackSrc: string;
  title: string;
  category: string;
  description: string;
  aspect: string;
}

export interface CeremonialGalleryProps {
  language: Language;
  reducedMotion?: boolean;
}

export const CeremonialGallery: React.FC<CeremonialGalleryProps> = ({
  language,
  reducedMotion,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const content = {
    en: {
      chapterKicker: 'CHAPTER 05 · A LEGACY OF DEVOTION',
      heading: 'Moments of Faith, Devotion & Celebration',
      subheading: 'Glimpses from the sacred journey of Shri Dwarkadhish Dham.',
      photo1Title: 'Ceremonial Gathering',
      photo1Category: 'Consecration Assembly',
      photo1Desc: 'Revered spiritual leaders, temple trustees, and community devotees gathered for the inauguration of Shri Dwarkadhish Mandir in Shirgaon.',
      photo2Title: 'Umbrella Ceremony',
      photo2Category: 'Courtyard Rites',
      photo2Desc: 'Sacred ceremonial umbrellas carried during the auspicious consecration procession through the temple courtyard.',
      photo3Title: 'Temple Procession',
      photo3Category: 'Procession with Red Parasol',
      photo3Desc: 'Devotional procession bearing consecrated kalashas and royal parasols honoring the divine entrance of Lord Dwarkadhish.',
      photo4Title: 'Procession and Dignitaries',
      photo4Category: 'Devotional Assembly',
      photo4Desc: 'Community leaders, religious elders, and devotees participating in the historic Pran Pratishtha procession at Shirgaon, Virar East.',
      handsOfSevaTitle: 'Hands of Seva',
      handsOfSevaSubtitle: 'The Sacred Essence of Selfless Devotional Dedication',
      handsOfSevaDesc: 'From offering fresh fragrant garlands to coordinating pilgrim care and temple cleanliness, selfless devotional seva remains the foundational heartbeat of Shri Dwarkadhish Mandir. Smt. Pravina H. Thakur’s enduring dedication reflects this timeless ideal: that worship finds its highest expression in loving, humble service to Bhagwan and His devotees.',
      handsOfSevaBadge: 'Dedicated Service',
      btnViewLightbox: 'View High-Resolution Image',
      closeLightbox: 'Close Full-Screen View',
    },
    hi: {
      chapterKicker: 'अध्याय 05 · पावन भक्ति की धरोहर',
      heading: 'आस्था, भक्ति एवं उत्सव के पावन क्षण',
      subheading: 'श्री द्वारकाधीश धाम की पावन आध्यात्मिक यात्रा की अविस्मरणीय झलकियां।',
      photo1Title: 'पावन लोकार्पण सभा',
      photo1Category: 'प्रतिष्ठा समारोह',
      photo1Desc: 'शिरगांव में श्री द्वारकाधीश मंदिर के उद्घाटन पर पूज्य संत, न्यासी और हजारों श्रद्धालु पावन उत्सव में सम्मिलित हुए।',
      photo2Title: 'छत्र उत्सव अनुष्ठान',
      photo2Category: 'प्रांगण परिक्रमा',
      photo2Desc: 'मंदिर प्रांगण में मंगलमय प्राण प्रतिष्ठा शोभायात्रा के दौरान धारण किए गए पवित्र छत्र और ध्वज।',
      photo3Title: 'भव्य मंदिर शोभायात्रा',
      photo3Category: 'लाल छत्र परिक्रमा',
      photo3Desc: 'भगवान द्वारकाधीश के पावन आगमन के उपलक्ष्य में मंगल कलश और राजकीय छत्र के साथ निकली भव्य शोभायात्रा।',
      photo4Title: 'शोभायात्रा एवं गणमान्य अतिथि',
      photo4Category: 'भक्तिमय समागम',
      photo4Desc: 'शिरगांव (विरार पूर्व) में ऐतिहासिक प्राण प्रतिष्ठा शोभायात्रा में सम्मिलित सामाजिक अगुआ, संतजन और भाविक।',
      handsOfSevaTitle: 'सेवा के पावन हाथ',
      handsOfSevaSubtitle: 'निःस्वार्थ भक्ति और समर्पण का पावन मर्म',
      handsOfSevaDesc: 'ताजे पुष्पों की मालाओं के अर्पण से लेकर दर्शनार्थियों की देखरेख और मंदिर की स्वच्छता तक, निःस्वार्थ सेवा ही श्री द्वारकाधीश मंदिर की आत्मा है। प्रवीणा एच. ठाकुर का समर्पण इसी शाश्वत आदर्श को दर्शाता है कि प्रभु की सच्ची आराधना उनकी और उनके भक्तों की विनम्र सेवा में है।',
      handsOfSevaBadge: 'समर्पित सेवा',
      btnViewLightbox: 'पूर्ण छायाचित्र देखें',
      closeLightbox: 'बंद करें',
    },
    mr: {
      chapterKicker: 'अध्याय 05 · भक्तीचा अनमोल वारसा',
      heading: 'श्रद्धा, भक्ती आणि उत्सवाचे मंगलमय क्षण',
      subheading: 'श्री द्वारकाधीश धामाच्या पावन प्रवासाची अविस्मरणीय छायाचित्रे.',
      photo1Title: 'मंगल लोकार्पण सोहळा',
      photo1Category: 'प्रतिष्ठा सोहळा',
      photo1Desc: 'शिरगाव येथील श्री द्वारकाधीश मंदिराच्या उद्घाटनाप्रसंगी एकत्र आलेले पूज्य संत, विश्वस्त आणि भाविक.',
      photo2Title: 'छत्र विधी अनुष्ठान',
      photo2Category: 'प्रांगण परिक्रमा',
      photo2Desc: 'मंदिर प्रांगणात मंगलमय प्राणप्रतिष्ठा मिरवणुकीदरम्यान मिरवलेली पवित्र सुवर्ण छत्रे.',
      photo3Title: 'भव्य मंदिर मिरवणूक',
      photo3Category: 'लाल छत्र शोभायात्रा',
      photo3Desc: 'श्री द्वारकाधीशांच्या स्वागतासाठी मंगल कलश आणि छत्र घेऊन निघालेली मंगल शोभायात्रा.',
      photo4Title: 'शोभायात्रा व मान्यवर उपस्थिती',
      photo4Category: 'भक्ती समागम',
      photo4Desc: 'शिरगाव (विरार पूर्व) येथे ऐतिहासिक प्राणप्रतिष्ठा सोहळ्यात सहभागी झालेले सामाजिक नेते, संत आणि भाविक.',
      handsOfSevaTitle: 'सेवेचे पावन हात',
      handsOfSevaSubtitle: 'निःस्वार्थ भक्ती आणि समर्पणाचा मूळ गाभा',
      handsOfSevaDesc: 'ताजी पुष्पहार सेवा ते भाविकांची सोय आणि मंदिर परिसराची स्वच्छता—निःस्वार्थ सेवा हीच श्री द्वारकाधीश मंदिराची ओळख आहे. प्रवीणा एच. ठाकूर यांचे समर्पण हाच विचार अधोरेखित करते की, खरी पूजा ही प्रभुच्या आणि भाविकांच्या सेवेत वसलेली आहे.',
      handsOfSevaBadge: 'समर्पित सेवा',
      btnViewLightbox: 'मोठे छायाचित्र पहा',
      closeLightbox: 'बंद करा',
    },
    gu: {
      chapterKicker: 'અધ્યાય 05 · ભક્તિનો અમૂલ્ય વારસો',
      heading: 'શ્રદ્ધા, ભક્તિ અને ઉત્સવની મંગલ પળો',
      subheading: 'શ્રી દ્વારકાધીશ ધામની આધ્યાત્મિક યાત્રાની સ્મૃતિઓ.',
      photo1Title: 'મંગલ લોકાર્પણ સભા',
      photo1Category: 'પ્રતિષ્ઠા ઉત્સવ',
      photo1Desc: 'શિરગાવ ખાતે શ્રી દ્વારકાધીશ મંદિરના ઉદ્ઘાટન પ્રસંગે ઉપસ્થિત પૂજ્ય સંતો, ટ્રસ્ટીઓ અને ભક્તસમુદાય.',
      photo2Title: 'છત્ર પૂજન વિધિ',
      photo2Category: 'પ્રાંગણ પરિક્રમા',
      photo2Desc: 'મંદિર પ્રાંગણમાં પવિત્ર પ્રાણપ્રતિષ્ઠા શોભાયાત્રા દરમિયાન મંગલ છત્ર વિધિ.',
      photo3Title: 'ભવ્ય મંદિર શોભાયાત્રા',
      photo3Category: 'લાલ છત્ર શોભાયાત્રા',
      photo3Desc: 'ભગવાન દ્વારકાધીશના મંગલ આગમન નિમિત્તે નીકળેલી પવિત્ર કળશ અને છત્ર શોભાયાત્રા.',
      photo4Title: 'શોભાયાત્રા અને અગ્રણી મહાનુભાવો',
      photo4Category: 'ભક્તિ સમાગમ',
      photo4Desc: 'શિરગાવ (વિરાર પૂર્વ) ખાતે ઐતિહાસિક પ્રાણપ્રતિષ્ઠા શોભાયાત્રામાં ઉપસ્થિત ધાર્મિક સંતો અને ભક્તો.',
      handsOfSevaTitle: 'સેવાના પાવન હસ્ત',
      handsOfSevaSubtitle: 'નિઃસ્વાર્થ ભક્તિ અને સમર્પણનો પવિત્ર સાર',
      handsOfSevaDesc: 'તાજાં પુષ્પોના હારના અર્પણથી લઈને ભક્તોની સુવિધા સુધી, નિઃસ્વાર્થ સેવા એ જ શ્રી દ્વારકાધીશ મંદિરની ચેતના છે. પ્રવીણા એચ. ઠાકુરનું સમર્પણ એ વિચાર પ્રગટ કરે છે કે પ્રભુની સાચી આરાધના સેવામાં છે.',
      handsOfSevaBadge: 'સમર્પિત સેવા',
      btnViewLightbox: 'મોટો ફોટો જુઓ',
      closeLightbox: 'બંધ કરો',
    },
  }[language];

  // Mandatory 4 Gallery Photographs in exact order
  const galleryPhotos: GalleryPhoto[] = [
    {
      id: 'photo-1',
      src: '/assets/praveena_thakur/vibrant_ceremony.webp',
      fallbackSrc: '/assets/praveena_thakur/vibrant_ceremony.webp',
      title: content.photo1Title,
      category: content.photo1Category,
      description: content.photo1Desc,
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'photo-2',
      src: '/assets/praveena_thakur/devotional_ceremony.webp',
      fallbackSrc: '/assets/praveena_thakur/devotional_ceremony.webp',
      title: content.photo2Title,
      category: content.photo2Category,
      description: content.photo2Desc,
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'photo-3',
      src: '/assets/praveena_thakur/pink_sari_shrine.webp',
      fallbackSrc: '/assets/praveena_thakur/pink_sari_shrine.webp',
      title: content.photo3Title,
      category: content.photo3Category,
      description: content.photo3Desc,
      aspect: 'aspect-[4/5]',
    },
    {
      id: 'photo-4',
      src: '/assets/praveena_thakur/charan_seva.webp',
      fallbackSrc: '/assets/praveena_thakur/charan_seva.webp',
      title: content.photo4Title,
      category: content.photo4Category,
      description: content.photo4Desc,
      aspect: 'aspect-[4/5]',
    },
  ];

  const handsOfSevaPhoto = {
    src: '/assets/praveena_thakur/charan_seva.webp',
    fallbackSrc: '/assets/praveena_thakur/charan_seva.webp',
    title: content.handsOfSevaTitle,
    category: content.handsOfSevaBadge,
    description: content.handsOfSevaDesc,
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
        );
      }
    };

    if (selectedPhotoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, galleryPhotos.length]);

  return (
    <div className="relative w-full">
      {/* Chapter 05 Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <PeacockFeather size={22} />
          <span className="font-cinzel text-xs uppercase tracking-widest text-[#C29A54] font-bold">
            {content.chapterKicker}
          </span>
          <PeacockFeather size={22} className="transform scale-x-[-1]" />
        </motion.div>

        <motion.h3
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          className="font-serif-royal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3F291D] mb-3"
        >
          {content.heading}
        </motion.h3>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="text-base sm:text-lg text-[#741C24] font-serif font-medium italic mb-4"
        >
          {content.subheading}
        </motion.p>

        <FluteDivider />
      </div>

      {/* ===================================================================
          MANDATORY FOUR GALLERY PHOTOGRAPHS (EXACT ORDER)
         =================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {galleryPhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: 'easeOut' }}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="group relative rounded-3xl p-3 bg-[#FFFDF7] border-2 border-[#C29A54]/70 hover:border-[#741C24] shadow-[0_12px_36px_rgba(63,41,29,0.1)] hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Top Image Window */}
            <div className={`relative rounded-2xl overflow-hidden bg-[#3F291D] ${photo.aspect} shadow-inner`}>
              <img
                src={photo.src}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = photo.fallbackSrc;
                }}
                alt={photo.title}
                className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-104 pointer-events-none"
                loading="lazy"
              />

              {/* Inner Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-wider uppercase bg-[#3F291D]/80 text-[#E8C784] border border-[#C29A54]/60 backdrop-blur-xs">
                  {photo.category}
                </span>
              </div>

              {/* Expand Icon Hover Indicator */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Eye className="w-4 h-4 text-[#E8C784]" />
              </div>
            </div>

            {/* Bottom Details Card */}
            <div className="p-4 pt-4">
              <h4 className="font-serif-royal text-lg sm:text-xl font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors mb-1.5 leading-snug">
                {photo.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#3F291D]/80 leading-relaxed font-serif line-clamp-3">
                {photo.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===================================================================
          HANDS OF SEVA — SEPARATE DEVOTIONAL MOMENT
         =================================================================== */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="relative bg-gradient-to-br from-[#FFFDF7] via-[#F1E3CC]/50 to-[#FFFDF7] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#C29A54] shadow-[0_16px_45px_rgba(194,154,84,0.15)] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5/12): Hands of Seva Devotional Photograph */}
          <div className="lg:col-span-5 relative">
            <div
              onClick={() => {
                // Open lightbox with Hands of Seva photo
                setSelectedPhotoIndex(4);
              }}
              className="relative rounded-2xl overflow-hidden bg-[#3F291D] aspect-[4/3] sm:aspect-[16/11] border-2 border-[#C29A54] shadow-lg group cursor-pointer"
            >
              <img
                src={handsOfSevaPhoto.src}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = handsOfSevaPhoto.fallbackSrc;
                }}
                alt="Hands of Seva — Devotional dedication at Shri Dwarkadhish Mandir"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase tracking-wider bg-[#C29A54] text-[#3F291D] font-bold mb-1">
                  {content.handsOfSevaBadge}
                </span>
                <p className="text-xs text-[#FAF4E8]/95 font-serif">
                  {content.handsOfSevaTitle}
                </p>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#E8C784]" />
              </div>
            </div>
          </div>

          {/* Right Column (7/12): Hands of Seva Devotional Story */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-[#741C24] fill-current" />
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#741C24] font-bold">
                DEVOTIONAL ESSENCE · निःस्वार्थ सेवा
              </span>
            </div>

            <h4 className="font-serif-royal text-2xl sm:text-3xl md:text-4xl font-bold text-[#3F291D] mb-2">
              {content.handsOfSevaTitle}
            </h4>

            <p className="font-serif text-sm sm:text-base text-[#741C24] font-medium italic mb-4">
              {content.handsOfSevaSubtitle}
            </p>

            <p className="text-sm sm:text-base text-[#3F291D]/85 leading-relaxed font-serif bg-[#FFFDF7] p-5 rounded-xl border border-[#F1E3CC] shadow-xs">
              {content.handsOfSevaDesc}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <DiyaAccent animated={false} />
              <span className="font-cinzel text-xs text-[#C29A54] tracking-widest uppercase font-semibold">
                ॥ सेवा परमो धर्मः · श्री द्वारकाधीशाय नमः ॥
              </span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ===================================================================
          FULL-SCREEN LIGHTBOX MODAL WITH FULL PHOTOGRAPHS (NO CROPPED FACES)
         =================================================================== */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full bg-[#241711] rounded-3xl overflow-hidden border-2 border-[#C29A54]/60 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#741C24] text-white border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label={content.closeLightbox}
                title={content.closeLightbox}
              >
                <X className="w-5 h-5 text-[#E8C784]" />
              </button>

              {/* Main Image Display (object-contain ensures NO facial cropping) */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black max-h-[72vh] flex items-center justify-center p-2">
                <img
                  src={
                    selectedPhotoIndex === 4
                      ? handsOfSevaPhoto.src
                      : galleryPhotos[selectedPhotoIndex].src
                  }
                  onError={(e) => {
                    const fallback =
                      selectedPhotoIndex === 4
                        ? handsOfSevaPhoto.fallbackSrc
                        : galleryPhotos[selectedPhotoIndex].fallbackSrc;
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                  alt={
                    selectedPhotoIndex === 4
                      ? handsOfSevaPhoto.title
                      : galleryPhotos[selectedPhotoIndex].title
                  }
                  className="max-h-full max-w-full object-contain"
                />

                {/* Left/Right Navigation Arrows for Gallery Photos */}
                {selectedPhotoIndex < 4 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex((prev) =>
                          prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
                        );
                      }}
                      className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-[#C29A54] text-white transition-colors cursor-pointer border border-white/20"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex((prev) =>
                          prev !== null ? (prev + 1) % galleryPhotos.length : 0
                        );
                      }}
                      className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-[#C29A54] text-white transition-colors cursor-pointer border border-white/20"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Caption Footer */}
              <div className="p-6 bg-[#2B1B13] border-t border-[#C29A54]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-cinzel font-bold bg-[#C29A54] text-[#3F291D]">
                      {selectedPhotoIndex === 4
                        ? handsOfSevaPhoto.category
                        : galleryPhotos[selectedPhotoIndex].category}
                    </span>
                    <span className="text-xs text-[#E8C784] font-cinzel">
                      {selectedPhotoIndex < 4
                        ? `Photo ${selectedPhotoIndex + 1} of ${galleryPhotos.length}`
                        : 'Devotional Feature'}
                    </span>
                  </div>

                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#FFFDF7] mb-1">
                    {selectedPhotoIndex === 4
                      ? handsOfSevaPhoto.title
                      : galleryPhotos[selectedPhotoIndex].title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#F1E3CC]/90 font-serif max-w-3xl leading-relaxed">
                    {selectedPhotoIndex === 4
                      ? handsOfSevaPhoto.description
                      : galleryPhotos[selectedPhotoIndex].description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase bg-[#C29A54] hover:bg-[#A88242] text-[#3F291D] transition-colors cursor-pointer shrink-0"
                >
                  {content.closeLightbox}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
