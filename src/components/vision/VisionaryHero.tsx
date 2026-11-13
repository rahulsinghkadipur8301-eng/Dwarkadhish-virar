import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ZoomIn, Heart, Quote } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, DiyaAccent } from '../KrishnaMotifs';

export interface VisionaryHeroProps {
  language: Language;
  reducedMotion?: boolean;
  onOpenLightbox: (photo: { src: string; title: string; caption: string; tag: string }) => void;
}

export const VisionaryHero: React.FC<VisionaryHeroProps> = ({
  language,
  reducedMotion,
  onOpenLightbox,
}) => {
  // Multilingual content preserving exact approved English text and authentic translations
  const contentRecord = {
    en: {
      kicker: 'THE VISION BEHIND SHREE DWARKADHISH DHAM',
      title: 'Pravina H. Thakur',
      subtitle: 'Former Mayor of Vasai–Virar • Trustee • Devotee of Bhagwan Dwarkadhish',
      quote: 'A sacred vision, shaped by devotion, brought Dwarkadhish Dham to Virar.',
      p1: 'Pravina H. Thakur is publicly recognized in Virar for both civic leadership and spiritual dedication. Publicly reported accounts connect the creation of Shri Dwarkadhish Temple in Shirgaon, Virar East, to her initiative, devotion, and long-held wish to establish a grand abode of Bhagwan Dwarkadhish for devotees in the region.',
      p2: 'A former Mayor of Vasai–Virar and a trustee associated with the Vishnu Waman Thakur charitable trust network, she is portrayed as a key force behind the temple’s spiritual journey. Her role is linked not only to the temple’s vision, but also to the nurturing of a living devotional space centered on darshan, seva, festivals, and community faith.',
      p3: 'Public reports also describe her as a devotee whose aspiration was to bring the spirit of Dwarkadhish devotion to Virar. The temple’s inauguration in November 2025 marked the culmination of that vision in the form of a major new spiritual landmark for the area.',
      badgeA: 'Sanctum Prayer',
      captionA: 'Offering devout prayers before the sanctum idol of Lord Dwarkadhish.',
      badgeB: 'Ritual Worship',
      captionB: 'Sacred Pran Pratishtha rituals and Vedic consecration ceremonies.',
      heroTag: 'Sandhya Namaste · Temple Shikhara',
      heroCaption: 'Golden-hour prayer before the grand sandstone shikhara at Shirgaon, Virar East.',
    },
    hi: {
      kicker: 'श्री द्वारकाधीश धाम के पीछे का पावन संकल्प',
      title: 'प्रवीणा एच. ठाकुर',
      subtitle: 'वसई-विरार की पूर्व महापौर • न्यासी • भगवान द्वारकाधीश की अनन्य भक्त',
      quote: 'भक्ति और श्रद्धा से संजोए एक पावन संकल्प ने विरार में द्वारकाधीश धाम को साकार किया।',
      p1: 'प्रवीणा एच. ठाकुर को विरार में जनसेवा और आध्यात्मिक समर्पण दोनों के लिए विशेष सम्मान प्राप्त है। सार्वजनिक विवरणों के अनुसार, शिरगांव (विरार पूर्व) में श्री द्वारकाधीश मंदिर की स्थापना उनके संकल्प, भक्ति और क्षेत्र के श्रद्धालुओं के लिए भगवान द्वारकाधीश का एक भव्य धाम स्थापित करने की दीर्घकालिक अभिलाषा से जुड़ी है।',
      p2: 'वसई-विरार की पूर्व महापौर और विष्णु वामन ठाकुर चैरिटेबल ट्रस्ट से जुड़ी न्यासी के रूप में, वे मंदिर की आध्यात्मिक यात्रा की एक मुख्य प्रेरक शक्ति रही हैं। उनकी भूमिका मंदिर की परिकल्पना के साथ-साथ दर्शन, सेवा, उत्सव और सामुदायिक आस्था से परिपूर्ण एक सजीव भक्ति स्थल के निर्माण से भी जुड़ी है।',
      p3: 'वे एक ऐसी समर्पित भक्त के रूप में पहचानी जाती हैं जिनकी आकांक्षा द्वारकाधीश की पावन भक्ति को विरार तक लाने की थी। नवंबर 2025 में मंदिर का भव्य उद्घाटन इस संकल्प की पूर्णता का प्रतीक बना, जिसने क्षेत्र को एक नया आध्यात्मिक तीर्थ प्रदान किया।',
      badgeA: 'गर्भगृह पूजन',
      captionA: 'श्री द्वारकाधीश भगवान के गर्भगृह में पूर्ण श्रद्धा के साथ वंदना।',
      badgeB: 'अनुष्ठान पूजा',
      captionB: 'वैदिक प्राण प्रतिष्ठा अनुष्ठान एवं पवित्र पूर्णाहुति उत्सव।',
      heroTag: 'संध्या नमस्ते · मंदिर शिखर',
      heroCaption: 'शिरगांव, विरार पूर्व में भव्य नक्काशीदार बलुआ पत्थर शिखर के समक्ष संध्या वंदन।',
    },
    mr: {
      kicker: 'श्री द्वारकाधीश धामामागील पवित्र संकल्प',
      title: 'प्रवीणा एच. ठाकूर',
      subtitle: 'वसई-विरारच्या माजी महापौर • विश्वस्त • भगवान द्वारकाधीशांच्या अनन्य भक्त',
      quote: 'भक्ती आणि श्रद्धेतून साकार झालेल्या एका पवित्र संकल्पाने विरारमध्ये द्वारकाधीश धाम उभे केले.',
      p1: 'प्रवीणा एच. ठाकूर यांना विरारमध्ये नागरी नेतृत्व आणि आध्यात्मिक निष्ठा या दोन्हींसाठी आदराचे स्थान आहे. सार्वजनिक नोंदीनुसार, शिरगाव (विरार पूर्व) येथील श्री द्वारकाधीश मंदिराची निर्मिती त्यांच्या पुढाकार, भक्ती आणि या परिसरातील भाविकांसाठी द्वारकाधीशांचे भव्य मंदिर उभारण्याच्या ध्यासाशी जोडलेली आहे.',
      p2: 'वसई-विरारच्या माजी महापौर आणि विष्णू वामन ठाकूर चॅरिटेबल ट्रस्टशी संबंधित विश्वस्त म्हणून त्या मंदिराच्या आध्यात्मिक प्रवासातील मुख्य शक्ती मानल्या जातात. त्यांची भूमिका मंदिराच्या संकल्पनेपुरती मर्यादित नसून दर्शन, सेवा, उत्सव आणि समाजभक्तीचे केंद्र उभारण्याशी निगडित आहे.',
      p3: 'द्वारकाधीशांची भक्ती विरारच्या भूमीत आणणे हा त्यांचा मनोदय होता. नोव्हेंबर २०२५ मधील मंदिराचा भव्य प्राणप्रतिष्ठा सोहळा म्हणजे या पवित्र संकल्पाची पूर्तता ठरली, ज्याने परिसराला एक पावन आध्यात्मिक केंद्र दिले.',
      badgeA: 'गर्भगृह प्रार्थना',
      captionA: 'श्री द्वारकाधीशांच्या विलोभनीय मूर्तीसमोर केलेली भावपूर्ण प्रार्थना.',
      badgeB: 'विधीवत पूजा',
      captionB: 'वैदिक प्राणप्रतिष्ठा विधी आणि मंगलमय धार्मिक अनुष्ठान.',
      heroTag: 'संध्या नमस्ते · मंदिर शिखर',
      heroCaption: 'शिरगाव, विरार पूर्व येथे कोरीव वालुकाश्म शिखरासमोर केलेला संध्या नमस्कार.',
    },
    gu: {
      kicker: 'શ્રી દ્વારકાધીશ ધામ પાછળનો પવિત્ર સંકલ્પ',
      title: 'પ્રવીણા એચ. ઠાકુર',
      subtitle: 'વસઈ-વિરારના પૂર્વ મેયર • ટ્રસ્ટી • ભગવાન દ્વારકાધીશના અનન્ય ભક્ત',
      quote: 'ભક્તિ અને શ્રદ્ધાથી ઘડાયેલા પવિત્ર સંકલ્પે વિરારમાં દ્વારકાધીશ ધામને સાકાર કર્યું.',
      p1: 'પ્રવીણા એચ. ઠાકુર વિરારમાં લોકસેવા અને આધ્યાત્મિક સમર્પણ બંને માટે સુવિખ્યાત છે. શિરગાવ (વિરાર પૂર્વ) ખાતે શ્રી દ્વારકાધીશ મંદિરનું નિર્માણ તેમની પહેલ, અનન્ય ભક્તિ અને પ્રદેશના ભક્તો માટે ભગવાન દ્વારકાધીશનું ભવ્ય ધામ સ્થાપવાની મનોકામના સાથે જોડાયેલું છે.',
      p2: 'વસઈ-વિરારના પૂર્વ મેયર અને વિષ્ણુ વામન ઠાકુર ચેરીટેબલ ટ્રસ્ટ નેટવર્કના ટ્રસ્ટી તરીકે, તેઓ મંદિરની આધ્યાત્મિક યાત્રાના પ્રમુખ પ્રેરકબળ રહ્યા છે. તેમની ભૂમિકા માત્ર પરિકલ્પના પૂરતી સીમિત નથી, પરંતુ દર્શન, સેવા, ઉત્સવો અને સામુદાયિક આસ્થાના જીવંત કેન્દ્રના નિર્માણ સાથે સંકળાયેલી છે.',
      p3: 'ભગવાન દ્વારકાધીશની ભક્તિ વિરાર સુધી લાવવાનો તેમનો ભાવ હતો. નવેમ્બર ૨૦૨૫માં મંદિરનો ભવ્ય પ્રાણપ્રતિષ્ઠા મહોત્સવ એ સંકલ્પની પૂર્ણાહુતિ સમાન બની રહ્યો, જેણે સમગ્ર પ્રદેશને નવું પવિત્ર ધાર્મિક સીમાચિહ્ન પ્રદાન કર્યું.',
      badgeA: 'ગર્ભગૃહ વંદન',
      captionA: 'શ્રી દ્વારકાધીશ ભગવાનની મંગલમૂર્તિ સમક્ષ ભક્તિભાવપૂર્વક પ્રાર્થના.',
      badgeB: 'પૂજન વિધિ',
      captionB: 'વૈદિક પ્રાણપ્રતિષ્ઠા વિધિ અને મંગળ પૂજન સમારોહ.',
      heroTag: 'સંધ્યા નમસ્તે · મંદિર શિખર',
      heroCaption: 'શિરગાવ, વિરાર પૂર્વ ખાતે નકશીકામવાળા શિખર સમક્ષ સંધ્યા પ્રણામ.',
    },
  };

  const content = contentRecord[language] || contentRecord.en;

  const heroPhoto = {
    src: '/assets/praveena_thakur/golden_hour_namaste.webp',
    fallbackSrc: '/assets/praveena_thakur/golden_hour_namaste.webp',
    title: content.title,
    caption: content.heroCaption,
    tag: content.heroTag,
  };

  const cardAPhoto = {
    src: '/assets/praveena_thakur/before_idol.webp',
    fallbackSrc: '/assets/praveena_thakur/before_idol.webp',
    title: content.badgeA,
    caption: content.captionA,
    tag: 'Sanctum Darshan',
  };

  const cardBPhoto = {
    src: '/assets/praveena_thakur/devotional_ceremony.webp',
    fallbackSrc: '/assets/praveena_thakur/devotional_ceremony.webp',
    title: content.badgeB,
    caption: content.captionB,
    tag: 'Pran Pratishtha Ritual',
  };

  return (
    <div className="relative w-full mb-20 lg:mb-28">
      {/* Centered Ornamental Golden Top Rule that expands outward */}
      <motion.div
        initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-48 sm:w-72 h-[2px] bg-gradient-to-r from-transparent via-[#C29A54] to-transparent mx-auto mb-10"
      />

      {/* 45% / 55% Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        
        {/* ===================================================================
            LEFT COLUMN (45% Desktop): Visual Storytelling Portrait & Overlapping Cards
           =================================================================== */}
        <div className="lg:col-span-5 relative">
          {/* Main Hero Photograph with Carved Sandstone & Golden Arch Frame */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 1.05, y: 30 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-[#FFFDF7] via-[#F1E3CC]/60 to-[#FFFDF7] border-2 border-[#C29A54]/80 shadow-[0_24px_60px_rgba(63,41,29,0.14)]"
          >
            {/* Traditional Carved Sandstone Corner Brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C29A54] pointer-events-none rounded-tl-sm" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C29A54] pointer-events-none rounded-tr-sm" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C29A54] pointer-events-none rounded-bl-sm" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C29A54] pointer-events-none rounded-br-sm" />

            {/* Inner Temple Arch Framing */}
            <div className="relative rounded-2xl overflow-hidden bg-[#3F291D] aspect-[4/5] group cursor-pointer shadow-inner">
              <img
                src={heroPhoto.src}
                onError={(e) => {
                  // Fallback to root alias if asset path fails
                  (e.target as HTMLImageElement).src = heroPhoto.fallbackSrc;
                }}
                alt="Smt. Pravina H. Thakur offering namaste with Shri Dwarkadhish Mandir shikhara in golden hour"
                className="w-full h-full object-cover object-center filter brightness-[1.01] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-103"
                loading="eager"
              />

              {/* Gentle Warm Inner Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F291D]/85 via-transparent to-black/10 pointer-events-none" />

              {/* Dignified Caption Overhang */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-[#FFFDF7] bg-gradient-to-t from-[#3F291D] via-[#3F291D]/90 to-transparent">
                <div className="flex items-center gap-2 mb-1.5">
                  <DiyaAccent animated={false} />
                  <span className="font-cinzel text-xs uppercase tracking-widest text-[#E8C784] font-bold">
                    {heroPhoto.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#FAF4E8]/90 font-serif leading-snug">
                  {heroPhoto.caption}
                </p>
              </div>

              {/* Click to Expand Lightbox Trigger */}
              <button
                type="button"
                onClick={() => onOpenLightbox(heroPhoto)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#3F291D]/80 hover:bg-[#741C24] text-[#FFFDF7] backdrop-blur-md border border-[#C29A54]/50 transition-all cursor-pointer shadow-md active:scale-95 group-hover:border-[#E8C784]"
                aria-label="Expand portrait in full-screen lightbox"
                title="View full-screen photograph"
              >
                <ZoomIn className="w-4 h-4 text-[#E8C784]" />
              </button>
            </div>
          </motion.div>

          {/* Two Overlapping Devotional Cards at Bottom */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:-mt-12 lg:relative lg:z-20 lg:px-2">
            {/* Card A: Before Dwarkadhish Idol */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              onClick={() => onOpenLightbox(cardAPhoto)}
              className="group relative rounded-2xl p-2 bg-[#FFFDF7] border-2 border-[#C29A54]/70 shadow-[0_12px_32px_rgba(63,41,29,0.16)] cursor-pointer hover:border-[#741C24] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#3F291D]">
                <img
                  src={cardAPhoto.src}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = cardAPhoto.fallbackSrc;
                  }}
                  alt="Smt. Pravina Thakur praying before the sacred Dwarkadhish idol"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="block text-[11px] font-cinzel font-bold text-[#E8C784] truncate">
                    {content.badgeA}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card B: Ritual Ceremony */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              onClick={() => onOpenLightbox(cardBPhoto)}
              className="group relative rounded-2xl p-2 bg-[#FFFDF7] border-2 border-[#C29A54]/70 shadow-[0_12px_32px_rgba(63,41,29,0.16)] cursor-pointer hover:border-[#741C24] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#3F291D]">
                <img
                  src={cardBPhoto.src}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = cardBPhoto.fallbackSrc;
                  }}
                  alt="Smt. Pravina Thakur in ceremonial worship and Pran Pratishtha rituals"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <span className="block text-[11px] font-cinzel font-bold text-[#E8C784] truncate">
                    {content.badgeB}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT COLUMN (55% Desktop): Editorial Biography & Highlighted Quote
           =================================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center pt-2 sm:pt-4">
          
          {/* Upper Label */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-3"
          >
            <PeacockFeather size={24} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#C29A54] font-bold">
              {content.kicker}
            </span>
          </motion.div>

          {/* Main Dignified Title with Text-Mask Reveal */}
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-serif-royal text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-[#3F291D] tracking-tight mb-3"
          >
            {content.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="text-sm sm:text-base md:text-lg text-[#741C24] font-serif font-semibold italic tracking-wide mb-6"
          >
            {content.subtitle}
          </motion.p>

          {/* Highlighted Quote in Gold-Bordered Ornamental Panel */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
            className="relative bg-[#FFFDF7] rounded-2xl p-6 sm:p-7 border-2 border-[#C29A54] shadow-[0_10px_30px_rgba(194,154,84,0.12)] mb-8 overflow-hidden"
          >
            {/* Background Sandstone Floral Watermark */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none transform translate-x-6 -translate-y-6">
              <Sparkles className="w-full h-full text-[#C29A54]" />
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F1E3CC] border border-[#C29A54] flex items-center justify-center text-[#741C24] shrink-0 shadow-xs">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              <div>
                <blockquote className="font-serif-royal text-lg sm:text-xl lg:text-2xl font-bold text-[#3F291D] leading-snug italic">
                  “{content.quote}”
                </blockquote>
                <span className="block mt-2 font-cinzel text-xs text-[#C29A54] tracking-widest uppercase font-semibold">
                  ॥ श्री द्वारकाधीश संकल्प ॥
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Biographical Content (Paragraphs 1, 2, 3) */}
          <div className="space-y-4 text-base sm:text-lg text-[#3F291D] leading-relaxed">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
              className="bg-[#FFFDF7]/70 p-4 sm:p-5 rounded-xl border border-[#F1E3CC] shadow-xs"
            >
              {content.p1}
            </motion.p>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
              className="bg-[#FFFDF7]/70 p-4 sm:p-5 rounded-xl border border-[#F1E3CC] shadow-xs"
            >
              {content.p2}
            </motion.p>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
              className="bg-[#FFFDF7]/70 p-4 sm:p-5 rounded-xl border border-[#F1E3CC] shadow-xs"
            >
              {content.p3}
            </motion.p>
          </div>

        </div>

      </div>
    </div>
  );
};
