import React from 'react';
import { motion } from 'motion/react';
import { ZoomIn, Building, Calendar, Heart } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, LotusOrnament, DiyaAccent } from '../KrishnaMotifs';

export interface LightboxPhotoData {
  src: string;
  webpSrc?: string;
  fallbackSrc?: string;
  title: string;
  caption: string;
  tag: string;
}

export interface PravinaVisionHeroProps {
  language: Language;
  reducedMotion?: boolean;
  onOpenLightbox: (photo: LightboxPhotoData) => void;
}

export const PravinaVisionHero: React.FC<PravinaVisionHeroProps> = React.memo(({
  language,
  reducedMotion,
  onOpenLightbox,
}) => {
  // Four-language verified editorial content matching the exact specification
  const contentRecord = {
    en: {
      eyebrow: 'THE VISION BEHIND SHREE DWARKADHISH DHAM',
      name: 'Pravina H. Thakur',
      subtitle: 'Former Mayor of Vasai–Virar',
      statement: 'A sacred vision, shaped by devotion, brought Dwarkadhish Dham to Virar.',
      statementTag: '॥ SHRI DWARKADHISH SANKALP ॥',
      bioP1:
        'Pravina H. Thakur is publicly recognized in Virar for dedicated civic leadership and spiritual devotion. As former Mayor of Vasai–Virar and Trustee of Late Shri Vishnu Waman Thakur Charitable Trust, publicly reported accounts connect the creation of Shri Dwarkadhish Temple in Shirgaon, Virar East, to her initiative, devotion, and long-held aspiration to establish a magnificent abode of Bhagwan Dwarkadhish for pilgrims across the region.',
      bioP2:
        'She has been described as a guiding inspiration behind the temple’s spiritual journey. Her role is linked to nurturing a living sanctuary centered on divine darshan, selfless seva, traditional festivals, and community faith.',
      bioP3:
        'The consecration in November 2025 marked the realization of that sacred vision, creating an enduring spiritual landmark of peace and devotion in Shirgaon.',
      highlight1Title: 'Public Service',
      highlight1Subtitle: 'Former Mayor of Vasai–Virar',
      highlight1Desc: 'Distinguished civic stewardship and dedicated leadership in the Vasai–Virar municipal region.',
      highlight2Title: 'Temple Vision',
      highlight2Subtitle: 'Sanctuary in Shirgaon',
      highlight2Desc: 'Publicly reported association with conceiving and inspiring the creation of Shri Dwarkadhish Mandir.',
      highlight3Title: 'Documented Milestone',
      highlight3Subtitle: 'November 2025 Milestone',
      highlight3Desc: 'Culmination of devotion in a landmark consecration that opened the temple gates to thousands of devotees.',
      // Featured First Image: At Dwarkadhish Shikhara
      goldenTag: 'Golden Hour',
      goldenTitle: 'At Dwarkadhish Shikhara',
      goldenCaption: 'Warm evening darshan standing before the hand-carved pink sandstone spire.',
      // Featured Second Image: Vibrant Temple Ceremony Portrait
      ceremonyTag: 'Pratishtha Utsav',
      ceremonyTitle: 'Vibrant Temple Ceremony Portrait',
      ceremonyCaption: 'Standing before the Shirgaon Dwarkadhish sandstone shrine during ceremonial celebrations.',
    },
    hi: {
      eyebrow: 'श्री द्वारकाधीश धाम के पीछे का पावन संकल्प',
      name: 'प्रवीणा एच. ठाकुर',
      subtitle: 'वसई-विरार की पूर्व महापौर',
      statement: 'भक्ति और श्रद्धा से संजोए एक पावन संकल्प ने विरार में द्वारकाधीश धाम को साकार किया।',
      statementTag: '॥ श्री द्वारकाधीश संकल्प ॥',
      bioP1:
        'प्रवीणा एच. ठाकुर को विरार में समर्पित जनसेवा और आध्यात्मिक निष्ठा के लिए विशेष सम्मान प्राप्त है। वसई-विरार की पूर्व महापौर एवं स्वर्गीय श्री विष्णु वामन ठाकुर चैरिटेबल ट्रस्ट की ट्रस्टी के रूप में, सार्वजनिक विवरण शिरगांव (विरार पूर्व) में श्री द्वारकाधीश मंदिर की स्थापना को उनके संकल्प, भक्ति और श्रद्धालुओं के लिए एक पावन धाम स्थापित करने की दीर्घकालिक अभिलाषा से जोड़ते हैं।',
      bioP2:
        'वे मंदिर की आध्यात्मिक यात्रा की एक मुख्य प्रेरक शक्ति रही हैं। उनकी भूमिका मंदिर की परिकल्पना के साथ-साथ दर्शन, सेवा, उत्सव और सामुदायिक आस्था से परिपूर्ण एक सजीव भक्ति स्थल के निर्माण से जुड़ी है।',
      bioP3:
        'नवंबर 2025 में मंदिर का पावन लोकार्पण इस संकल्प की पूर्णता का प्रतीक बना, जिसने शिरगांव को एक नया आध्यात्मिक तीर्थ प्रदान किया।',
      highlight1Title: 'जनसेवा',
      highlight1Subtitle: 'वसई-विरार की पूर्व महापौर',
      highlight1Desc: 'वसई-विरार महानगर क्षेत्र में समर्पित नागरिक नेतृत्व एवं जनकल्याणकारी सेवा।',
      highlight2Title: 'मंदिर संकल्प',
      highlight2Subtitle: 'शिरगांव में पावन धाम',
      highlight2Desc: 'श्री द्वारकाधीश मंदिर के पावन निर्माण की परिकल्पना एवं जनप्रेरणा से गहरा जुड़ाव।',
      highlight3Title: 'प्रलेखित ऐतिहासिक क्षण',
      highlight3Subtitle: 'नवंबर 2025 का ऐतिहासिक क्षण',
      highlight3Desc: 'भव्य प्राण प्रतिष्ठा के साथ मंदिर के कपाट हजारों श्रद्धालुओं के लिए खोले गए।',
      goldenTag: 'संध्या दर्शन',
      goldenTitle: 'श्री द्वारकाधीश शिखर के समक्ष',
      goldenCaption: 'शिरगांव के नक्काशीदार गुलाबी बलुआ पत्थर शिखर के सामने सायंकालीन पावन दर्शन।',
      ceremonyTag: 'प्रतिष्ठा उत्सव',
      ceremonyTitle: 'पावन मंदिर समारोह दर्शन',
      ceremonyCaption: 'शिरगांव श्री द्वारकाधीश मंदिर के उत्सव समारोह में पावन उपस्थिति।',
    },
    mr: {
      eyebrow: 'श्री द्वारकाधीश धामामागील पवित्र संकल्प',
      name: 'प्रवीणा एच. ठाकूर',
      subtitle: 'वसई-विरारच्या माजी महापौर',
      statement: 'भक्ती आणि श्रद्धेतून साकार झालेल्या एका पवित्र संकल्पाने विरारमध्ये द्वारकाधीश धाम उभे केले.',
      statementTag: '॥ श्री द्वारकाधीश संकल्प ॥',
      bioP1:
        'प्रवीणा एच. ठाकूर यांना विरारमध्ये समर्पित नागरी नेतृत्व आणि आध्यात्मिक निष्ठा या दोन्हींसाठी आदराचे स्थान आहे. वसई-विरारच्या माजी महापौर आणि कै. श्री विष्णू वामन ठाकूर चॅरिटेबल ट्रस्टच्या विश्वस्त म्हणून, सार्वजनिक नोंदीनुसार शिरगाव (विरार पूर्व) येथील श्री द्वारकाधीश मंदिराची निर्मिती त्यांच्या पुढाकार, भक्ती आणि द्वारकाधीशांचे भव्य मंदिर उभारण्याच्या ध्यासाशी जोडलेली आहे.',
      bioP2:
        'त्या मंदिराच्या आध्यात्मिक प्रवासातील मुख्य शक्ती मानल्या जातात. त्यांची भूमिका मंदिराच्या संकल्पनेपुरती मर्यादित नसून दर्शन, सेवा, उत्सव आणि समाजभक्तीचे केंद्र उभारण्याशी निगडित आहे.',
      bioP3:
        'नोव्हेंबर २०२५ मधील मंदिराचा भव्य प्राणप्रतिष्ठा सोहळा म्हणजे या पवित्र संकल्पाची पूर्तता ठरली, ज्याने परिसराला एक पावन आध्यात्मिक केंद्र दिले.',
      highlight1Title: 'लोकसेवा',
      highlight1Subtitle: 'वसई-विरारच्या माजी महापौर',
      highlight1Desc: 'वसई-विरार महानगर क्षेत्रात समर्पित नागरी नेतृत्व आणि समाजसेवा.',
      highlight2Title: 'मंदिर संकल्प',
      highlight2Subtitle: 'शिरगावात पावन धाम',
      highlight2Desc: 'श्री द्वारकाधीश मंदिराच्या निर्मितीमागील प्रेरणा आणि भक्तीभावाची जोड.',
      highlight3Title: 'नोंदवलेला ऐतिहासिक टप्पा',
      highlight3Subtitle: 'नोव्हेंबर २०२५ चा ऐतिहासिक टप्पा',
      highlight3Desc: 'भव्य प्राणप्रतिष्ठेसह मंदिराची कवाडे हजारो भाविकांसाठी खुली झाली.',
      goldenTag: 'सायंकाळ दर्शन',
      goldenTitle: 'श्री द्वारकाधीश शिखरासमोर',
      goldenCaption: 'शिरगावच्या कोरीव गुलाबी वालुकाश्म शिखरासमोर संध्याकाळच्या मंगल क्षणाचे दर्शन.',
      ceremonyTag: 'प्रतिष्ठा उत्सव',
      ceremonyTitle: 'मंगल मंदिर सोहळा दर्शन',
      ceremonyCaption: 'शिरगाव श्री द्वारकाधीश मंदिराच्या पवित्र समारंभातील भक्तीमय उपस्थिती.',
    },
    gu: {
      eyebrow: 'શ્રી દ્વારકાધીશ ધામ પાછળનો પવિત્ર સંકલ્પ',
      name: 'પ્રવીણા એચ. ઠાકુર',
      subtitle: 'વસઈ-વિરારના પૂર્વ મેયર',
      statement: 'ભક્તિ અને શ્રદ્ધાથી ઘડાયેલા પવિત્ર સંકલ્પે વિરારમાં દ્વારકાધીશ ધામને સાકાર કર્યું.',
      statementTag: '॥ શ્રી દ્વારકાધીશ સંકલ્પ ॥',
      bioP1:
        'પ્રવીણા એચ. ઠાકુર વિરારમાં સમર્પિત લોકસેવા અને આધ્યાત્મિક આસ્થા માટે સુવિખ્યાત છે. વસઈ-વિરારના પૂર્વ મેયર અને સ્વ. શ્રી વિષ્ણુ વામન ઠાકુર ચેરિટેબલ ટ્રસ્ટના ટ્રસ્ટી તરીકે, સાર્વજનિક અહેવાલો મુજબ શિરગાવ (વિરાર પૂર્વ) ખાતે શ્રી દ્વારકાધીશ મંદિરનું નિર્માણ તેમની પહેલ, અનન્ય ભક્તિ અને ભવ્ય ધામ સ્થાપવાની મનોકામના સાથે સંકળાયેલું છે.',
      bioP2:
        'તેઓ મંદિરની આધ્યાત્મિક યાત્રાના પ્રમુખ પ્રેરકબળ રહ્યા છે. તેમની ભૂમિકા દર્શન, સેવા, ઉત્સવો અને સામુદાયિક આસ્થાના જીવંત કેન્દ્રના નિર્માણ સાથે સંકળાયેલી છે.',
      bioP3:
        'નવેમ્બર ૨૦૨૫માં મંદિરનો ભવ્ય પ્રાણપ્રતિષ્ઠા મહોત્સવ એ સંકલ્પની પૂર્ણાહુતિ સમાન બની રહ્યો, જેણે સમગ્ર પ્રદેશને નવું પવિત્ર ધાર્મિક સીમાચિહ્ન પ્રદાન કર્યું.',
      highlight1Title: 'લોકસેવા',
      highlight1Subtitle: 'વસઈ-વિરારના પૂર્વ મેયર',
      highlight1Desc: 'વસઈ-વિરાર મહાનગરમાં સમર્પિત નાગરિક નેતૃત્વ અને લોકસેવા.',
      highlight2Title: 'મંદિર સંકલ્પ',
      highlight2Subtitle: 'શિરગાવમાં પવિત્ર ધામ',
      highlight2Desc: 'શ્રી દ્વારકાધીશ મંદિરના નિર્માણની પવિત્ર પરિકલ્પના અને પ્રેરણા.',
      highlight3Title: 'નોંધાયેલ ઐતિહાસિક પળ',
      highlight3Subtitle: 'નવેમ્બર ૨૦૨૫ ઐતિહાસિક પળ',
      highlight3Desc: 'મંગલ પ્રાણપ્રતિષ્ઠા સાથે મંદિરના દ્વાર હજારો ભક્તો માટે ખુલ્યા.',
      goldenTag: 'સંધ્યા દર્શન',
      goldenTitle: 'શ્રી દ્વારકાધીશ શિખર સમક્ષ',
      goldenCaption: 'શિરગાવના ગુલાબી પથ્થરના કોતરણીયુક્ત શિખર સમક્ષ સંધ્યા સમયે ભક્તિમય દર્શન.',
      ceremonyTag: 'પ્રતિષ્ઠા ઉત્સવ',
      ceremonyTitle: 'મંગલ મંદિર સમારોહ દર્શન',
      ceremonyCaption: 'શિરગાવ શ્રી દ્વારકાધીશ મંદિરના પાવન સમારોહમાં ભક્તિમય ઉપસ્થિતિ.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  // FIRST FEATURED IMAGE: At Dwarkadhish Shikhara (Golden Hour)
  const goldenHourFirstPhoto: LightboxPhotoData = {
    src: '/assets/praveena_thakur/golden_hour_namaste.webp',
    fallbackSrc: '/dwarkadhish_temple_widescreen_4k.webp',
    title: c.goldenTitle,
    caption: c.goldenCaption,
    tag: c.goldenTag,
  };

  // SECOND FEATURED BLOCK (EXACT PLACE BELOW GOLDEN HOUR): Three Uploaded Ceremony Photos
  const ceremonyTriptychPhotos: (LightboxPhotoData & { layoutClass: string })[] = [
    {
      webpSrc: '/assets/aistudio/Vibrant_Temple_Ceremony_Portrait_8e2d2892.webp',
      src: '/assets/aistudio/Vibrant_Temple_Ceremony_Portrait_8e2d2892.png',
      fallbackSrc: '/assets/praveena_thakur/vibrant_ceremony.webp',
      title: c.ceremonyTitle,
      caption: c.ceremonyCaption,
      tag: c.ceremonyTag,
      layoutClass: 'col-span-2 aspect-[1672/941] sm:flex-[1.7768_1_0%]',
    },
    {
      webpSrc: '/assets/aistudio/Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.webp',
      src: '/assets/aistudio/Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.png',
      fallbackSrc: '/assets/praveena_thakur/devotional_ceremony.webp',
      title: 'Ornate Umbrella Ceremony in the Courtyard',
      caption: 'Courtyard ceremony at Shri Dwarkadhish Mandir, Shirgaon.',
      tag: c.ceremonyTag,
      layoutClass: 'col-span-1 aspect-[953/1651] sm:flex-[0.5772_1_0%]',
    },
    {
      webpSrc: '/assets/aistudio/Ornate_Temple_Procession_with_Red_Parasol_6d479e42.webp',
      src: '/assets/aistudio/Ornate_Temple_Procession_with_Red_Parasol_6d479e42.png',
      fallbackSrc: '/assets/praveena_thakur/charan_seva.webp',
      title: 'Ornate Temple Procession with Red Parasol',
      caption: 'Mandap ceremonial procession at Shri Dwarkadhish Mandir, Shirgaon.',
      tag: c.ceremonyTag,
      layoutClass: 'col-span-1 aspect-[933/1685] sm:flex-[0.5537_1_0%]',
    },
  ];

  return (
    <div className="relative w-full">
      {/* ===================================================================
          CENTERED ROYAL HEADING
         =================================================================== */}
      <div className="text-center max-w-5xl mx-auto mb-8 sm:mb-10 px-4">
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C29A54] to-transparent mx-auto mb-4"
        />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2.5 mb-2.5"
        >
          <PeacockFeather size={22} />
          <span className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#C29A54] font-bold">
            {c.eyebrow}
          </span>
          <PeacockFeather size={22} className="transform scale-x-[-1]" />
        </motion.div>

        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-serif-royal text-3xl sm:text-5xl md:text-6xl font-bold text-[#741C24] tracking-tight mb-2.5 drop-shadow-[0_2px_12px_rgba(116,28,36,0.08)]"
        >
          {c.name}
        </motion.h2>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-[#3F291D]/90 font-serif font-medium tracking-wide mb-4 max-w-3xl mx-auto leading-relaxed"
        >
          {c.subtitle}
        </motion.p>

        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          <LotusOrnament size={24} className="text-[#C29A54]" />
          <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
        </div>
      </div>

      {/* ===================================================================
          TOP EDITORIAL COMPOSITION
          First Image: At Dwarkadhish Shikhara (16:9 Uncropped Lead)
          Below It: 3 Uploaded Ceremony Photos (Uncropped Native Aspect Ratio)
         =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start mb-10">
        {/* LEFT VISUAL COLUMN (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col gap-3.5 rounded-2xl p-3.5 sm:p-4 bg-gradient-to-b from-[#FFFDF8] via-[#F4E9D8]/50 to-[#FFFDF8] border-2 border-[#C29A54] shadow-[0_16px_40px_rgba(63,41,29,0.1)]"
          >
            {/* FIRST FEATURED IMAGE: At Dwarkadhish Shikhara (Golden Hour, Pure Uncropped Image) */}
            <div
              onClick={() => onOpenLightbox(goldenHourFirstPhoto)}
              className="group cursor-pointer rounded-xl bg-[#FAF4E8] border border-[#C29A54] shadow-sm overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-[#1A100A] overflow-hidden">
                <img
                  src={goldenHourFirstPhoto.src}
                  onError={(e) => {
                    if (goldenHourFirstPhoto.fallbackSrc) {
                      (e.target as HTMLImageElement).src = goldenHourFirstPhoto.fallbackSrc;
                    }
                  }}
                  alt="At Dwarkadhish Shikhara — warm evening darshan standing before the hand-carved pink sandstone spire"
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox(goldenHourFirstPhoto);
                  }}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
                  aria-label="Inspect At Dwarkadhish Shikhara photograph"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                </button>
              </div>
            </div>

            {/* THREE UPLOADED CEREMONY IMAGES (Proportional equal-height row on sm+, zero cropping, zero subtitles) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-stretch gap-3">
              {ceremonyTriptychPhotos.map((photo) => (
                <div
                  key={photo.src}
                  onClick={() => onOpenLightbox(photo)}
                  className={`group relative cursor-pointer rounded-xl bg-[#1A100A] border border-[#C29A54] shadow-sm overflow-hidden ${photo.layoutClass}`}
                >
                  <picture className="w-full h-full block">
                    {photo.webpSrc && <source type="image/webp" srcSet={photo.webpSrc} />}
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
                      decoding="async"
                    />
                  </picture>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(photo);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
                    aria-label={`Inspect ${photo.title}`}
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ceremonial Statement placed cleanly below the Left Showcase Images */}
          <div className="bg-gradient-to-r from-[#FAF4E8] via-[#FFFDF8] to-[#FAF4E8] rounded-xl p-4 border-2 border-[#C29A54] text-center shadow-xs">
            <p className="font-serif-royal text-sm sm:text-base font-bold text-[#741C24] italic leading-snug mb-1">
              {c.statement}
            </p>
            <span className="font-cinzel text-[10px] text-[#C29A54] tracking-widest uppercase font-semibold">
              {c.statementTag}
            </span>
          </div>
        </div>

        {/* RIGHT BIOGRAPHY & HIGHLIGHTS COLUMN (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-[#FFFDF8] rounded-2xl p-4 sm:p-5 border-2 border-[#C29A54]/80 shadow-[0_12px_32px_rgba(194,154,84,0.1)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <DiyaAccent animated={!reducedMotion} />
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#741C24] font-bold">
                HISTORICAL NARRATIVE · पावन गाथा
              </span>
            </div>

            <div className="space-y-2.5 text-sm sm:text-[14.5px] text-[#3F291D]/90 leading-relaxed font-serif">
              <p className="first-letter:text-3xl first-letter:font-serif-royal first-letter:font-bold first-letter:text-[#741C24] first-letter:mr-1">
                {c.bioP1}
              </p>
              <p>{c.bioP2}</p>
              <p className="text-xs sm:text-sm text-[#741C24] font-semibold italic">
                {c.bioP3}
              </p>
            </div>
          </motion.div>

          {/* Three Historical Highlights */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="group rounded-xl p-3 sm:p-3.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10.5px] font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight1Subtitle}
                </span>
                <h4 className="font-serif-royal text-[15px] font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight1Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-snug mt-0.5">
                  {c.highlight1Desc}
                </p>
              </div>
            </div>

            <div className="group rounded-xl p-3 sm:p-3.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10.5px] font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight2Subtitle}
                </span>
                <h4 className="font-serif-royal text-[15px] font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight2Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-snug mt-0.5">
                  {c.highlight2Desc}
                </p>
              </div>
            </div>

            <div className="group rounded-xl p-3 sm:p-3.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10.5px] font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight3Subtitle}
                </span>
                <h4 className="font-serif-royal text-[15px] font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight3Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-snug mt-0.5">
                  {c.highlight3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
