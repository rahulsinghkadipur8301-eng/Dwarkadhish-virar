import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ZoomIn, Award, Building, Calendar, Heart, Shield } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, FluteDivider, LotusOrnament, DiyaAccent } from '../KrishnaMotifs';

export interface LightboxPhotoData {
  src: string;
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

export const PravinaVisionHero: React.FC<PravinaVisionHeroProps> = ({
  language,
  reducedMotion,
  onOpenLightbox,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      // Three Historical Highlights
      highlight1Title: 'Public Service',
      highlight1Subtitle: 'Former Mayor of Vasai–Virar',
      highlight1Desc: 'Distinguished civic stewardship and dedicated leadership in the Vasai–Virar municipal region.',
      highlight2Title: 'Temple Vision',
      highlight2Subtitle: 'Sanctuary in Shirgaon',
      highlight2Desc: 'Publicly reported association with conceiving and inspiring the creation of Shri Dwarkadhish Mandir.',
      highlight3Title: 'Documented Milestone',
      highlight3Subtitle: 'November 2025 Milestone',
      highlight3Desc: 'Culmination of devotion in a landmark consecration that opened the temple gates to thousands of devotees.',
      // Photo labels
      portraitTag: 'Primary Portrait',
      portraitTitle: 'Smt. Pravina H. Thakur',
      portraitCaption: 'Devout prayer in red sari with folded hands (Namaste), inspiring the sacred temple sanctuary.',
      templeTag: 'Shri Dwarkadhish Mandir',
      templeTitle: 'Sandstone Shikhara & Sanctum',
      templeCaption: 'Nagara-style pink sandstone temple rising gracefully in Shirgaon, Virar East.',
      photo1Tag: 'Sanctum Darshan',
      photo1Title: 'Prayer Before Deity',
      photo1Caption: 'Offering devout prayers before the sacred sanctum idol of Lord Dwarkadhish.',
      photo2Tag: 'Ritual Worship',
      photo2Title: 'Vedic Consecration',
      photo2Caption: 'Participating in sacred Pran Pratishtha ceremonies and Vedic yajnas.',
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
      portraitTag: 'प्रमुख छायाचित्र',
      portraitTitle: 'श्रीमती प्रवीणा एच. ठाकुर',
      portraitCaption: 'लाल साड़ी में हाथ जोड़कर प्रभु वंदन करती हुईं, मंदिर निर्माण की प्रेरक।',
      templeTag: 'श्री द्वारकाधीश मंदिर',
      templeTitle: 'बलुआ पत्थर शिखर एवं गर्भगृह',
      templeCaption: 'शिरगांव (विरार पूर्व) में नागर शैली में निर्मित भव्य गुलाबी बलुआ पत्थर मंदिर।',
      photo1Tag: 'गर्भगृह वंदना',
      photo1Title: 'प्रभु विग्रह के समक्ष प्रार्थना',
      photo1Caption: 'श्री द्वारकाधीश भगवान के गर्भगृह में पूर्ण श्रद्धा के साथ वंदना।',
      photo2Tag: 'अनुष्ठान पूजा',
      photo2Title: 'वैदिक प्राण प्रतिष्ठा',
      photo2Caption: 'वैदिक प्राण प्रतिष्ठा अनुष्ठान एवं पवित्र पूर्णाहुति उत्सव में सहभागिता।',
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
      portraitTag: 'प्रमुख छायाचित्र',
      portraitTitle: 'श्रीमती प्रवीणा एच. ठाकूर',
      portraitCaption: 'लाल साडीमध्ये हात जोडून केलेली भावपूर्ण प्रार्थना, मंदिराच्या निर्मितीची प्रेरणा.',
      templeTag: 'श्री द्वारकाधीश मंदिर',
      templeTitle: 'दगडी शिखर व गर्भगृह',
      templeCaption: 'शिरगाव (विरार पूर्व) येथे नागर शैलीत साकारलेले भव्य गुलाबी वालुकाश्म मंदिर.',
      photo1Tag: 'गर्भगृह प्रार्थना',
      photo1Title: 'मूर्तीसमोर प्रार्थना',
      photo1Caption: 'श्री द्वारकाधीशांच्या विलोभनीय मूर्तीसमोर केलेली भावपूर्ण प्रार्थना.',
      photo2Tag: 'विधीवत पूजा',
      photo2Title: 'वैदिक प्राणप्रतिष्ठा',
      photo2Caption: 'वैदिक प्राणप्रतिष्ठा विधी आणि मंगलमय धार्मिक अनुष्ठानात सहभाग.',
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
      portraitTag: 'પ્રમુખ તસવીર',
      portraitTitle: 'શ્રીમતી પ્રવીણા એચ. ઠાકુર',
      portraitCaption: 'લાલ સાડીમાં હાથ જોડીને પ્રણામ કરતા, મંદિર નિર્માણના પ્રેરક.',
      templeTag: 'શ્રી દ્વારકાધીશ મંદિર',
      templeTitle: 'પથ્થરનું શિખર અને ગર્ભગૃહ',
      templeCaption: 'શિરગાવ (વિરાર પૂર્વ) ખાતે નાગર શૈલીમાં નિર્મિત ભવ્ય ગુલાબી પથ્થરનું મંદિર.',
      photo1Tag: 'ગર્ભગૃહ વંદન',
      photo1Title: 'મૂર્તિ સમક્ષ પ્રાર્થના',
      photo1Caption: 'શ્રી દ્વારકાધીશ ભગવાનની મંગલમૂર્તિ સમક્ષ ભક્તિભાવપૂર્વક પ્રાર્થના.',
      photo2Tag: 'પૂજન વિધિ',
      photo2Title: 'વૈદિક પ્રાણપ્રતિષ્ઠા',
      photo2Caption: 'વૈદિક પ્રાણપ્રતિષ્ઠા વિધિ અને મંગળ પૂજન સમારોહમાં સહભાગીતા.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  // Authentic image paths using the verified transparent cutout and uncropped assets
  const portraitPhoto: LightboxPhotoData = {
    src: '/pravina_thakur_cutout.png',
    fallbackSrc: '/assets/praveena_thakur/pravina_thakur_cutout.png',
    title: c.portraitTitle,
    caption: c.portraitCaption,
    tag: c.portraitTag,
  };

  const templePhoto: LightboxPhotoData = {
    src: '/dwarkadhish_temple_widescreen_4k.webp',
    fallbackSrc: '/assets/aistudio/dwarkadhish_temple_widescreen_4k.webp',
    title: c.templeTitle,
    caption: c.templeCaption,
    tag: c.templeTag,
  };

  const supportingPhotoA: LightboxPhotoData = {
    src: '/assets/praveena_thakur/Praveena Thakur Before the Dwarkadhish Idol(1).png',
    fallbackSrc: '/Praveena Thakur Before the Dwarkadhish Idol(1).png',
    title: c.photo1Title,
    caption: c.photo1Caption,
    tag: c.photo1Tag,
  };

  const supportingPhotoB: LightboxPhotoData = {
    src: '/assets/praveena_thakur/Praveena_Thakur_Devotional_Ceremony_4K_Restored(2).png',
    fallbackSrc: '/Praveena_Thakur_Devotional_Ceremony_4K_Restored(2).png',
    title: c.photo2Title,
    caption: c.photo2Caption,
    tag: c.photo2Tag,
  };

  return (
    <div className="relative w-full">
      {/* ===================================================================
          PART 3 — CENTERED ROYAL HEADING (Full-Width Balance)
         =================================================================== */}
      <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
        {/* Subtle Decorative Golden Expandable Rule */}
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#C29A54] to-transparent mx-auto mb-5"
        />

        {/* Section Eyebrow */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2.5 mb-3"
        >
          <PeacockFeather size={22} />
          <span className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#C29A54] font-bold">
            {c.eyebrow}
          </span>
          <PeacockFeather size={22} className="transform scale-x-[-1]" />
        </motion.div>

        {/* Main Title: Pravina H. Thakur */}
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-serif-royal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#741C24] tracking-tight mb-3.5 drop-shadow-[0_2px_12px_rgba(116,28,36,0.08)]"
        >
          {c.name}
        </motion.h2>

        {/* Subtitle / Trustee Descriptor */}
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="text-sm sm:text-base md:text-lg text-[#3F291D]/90 font-serif font-medium tracking-wide mb-5 max-w-3xl mx-auto leading-relaxed"
        >
          {c.subtitle}
        </motion.p>

        {/* Lotus Flourish & Flute Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          <LotusOrnament size={26} className="text-[#C29A54]" />
          <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
        </div>
      </div>

      {/* ===================================================================
          PART 4 — PREMIUM MAIN EDITORIAL COMPOSITION (56% Left / 44% Right)
         =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start mb-16 lg:mb-20">
        
        {/* =================================================================
            LEFT VISUAL AREA (56% Desktop — lg:col-span-7)
           ================================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Visual Showcase: Temple Architecture + Smt. Pravina H. Thakur */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#FFFDF8] via-[#F4E9D8]/50 to-[#FFFDF8] border-2 border-[#C29A54] shadow-[0_20px_50px_rgba(63,41,29,0.12)] overflow-hidden"
          >
            {/* Elegant Carved-Gold Decorative Corner Brackets */}
            <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-[#C29A54] pointer-events-none rounded-tl-sm z-20" />
            <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-[#C29A54] pointer-events-none rounded-tr-sm z-20" />
            <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-[#C29A54] pointer-events-none rounded-bl-sm z-20" />
            <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-[#C29A54] pointer-events-none rounded-br-sm z-20" />

            {/* Split Composition: Temple Architecture + Smt. Pravina H. Thakur Transparent Portrait */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              
              {/* Left Column (6/12): Authentic Temple Shikhara */}
              <div
                onClick={() => onOpenLightbox(templePhoto)}
                className="sm:col-span-6 relative rounded-2xl overflow-hidden bg-[#3F291D] aspect-[4/5] min-h-[360px] sm:min-h-[440px] group cursor-pointer border border-[#C29A54]/60 shadow-md flex flex-col justify-end"
              >
                <img
                  src={templePhoto.src}
                  onError={(e) => {
                    if (templePhoto.fallbackSrc) {
                      (e.target as HTMLImageElement).src = templePhoto.fallbackSrc;
                    }
                  }}
                  alt="Shri Dwarkadhish Mandir pink sandstone shikhara at Shirgaon, Virar East"
                  className="w-full h-full object-cover object-center filter brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-104 absolute inset-0"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1317]/90 via-[#2B1317]/30 to-black/10 pointer-events-none" />
                
                {/* Badge & Caption */}
                <div className="relative z-10 p-4 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#741C24] text-[#E8C784] border border-[#C29A54]/60 mb-1.5">
                    {c.templeTag}
                  </span>
                  <p className="text-xs text-[#FAF4E8] font-serif leading-snug line-clamp-2">
                    {c.templeCaption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLightbox(templePhoto);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
                  aria-label="View temple photo in full screen"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                </button>
              </div>

              {/* Right Column (6/12): Primary Portrait — Smt. Pravina H. Thakur (Strictly Uncropped Transparent Cutout) */}
              <div
                onClick={() => onOpenLightbox(portraitPhoto)}
                className="sm:col-span-6 relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E8] to-[#F1E3CC] p-3 aspect-[4/5] min-h-[360px] sm:min-h-[440px] group cursor-pointer border-2 border-[#C29A54] shadow-md flex flex-col justify-between"
              >
                {/* Soft sacred halo glow behind the transparent cutout */}
                <div className="absolute inset-x-8 top-12 bottom-20 bg-radial from-[#C29A54]/20 via-[#C29A54]/5 to-transparent rounded-full filter blur-xl pointer-events-none" />

                {/* Inner Image Stage (Strict uncropped object-contain to preserve forehead, hair, bindi, folded hands, sari drape) */}
                <div className="relative w-full flex-1 flex items-end justify-center overflow-hidden pt-2">
                  <img
                    src={portraitPhoto.src}
                    onError={(e) => {
                      if (portraitPhoto.fallbackSrc) {
                        (e.target as HTMLImageElement).src = portraitPhoto.fallbackSrc;
                      }
                    }}
                    alt="Smt. Pravina H. Thakur in Namaste pose wearing red sari"
                    className="max-h-full max-w-full object-contain object-bottom filter contrast-[1.02] drop-shadow-[0_12px_24px_rgba(63,41,29,0.18)] transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="eager"
                  />

                  {/* Corner Accent */}
                  <span className="absolute top-1 left-1 px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#C29A54] text-[#3F291D] shadow-xs">
                    {c.portraitTag}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(portraitPhoto);
                    }}
                    className="absolute top-1 right-1 p-1.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
                    aria-label="View portrait in full screen"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
                  </button>
                </div>

                {/* Portrait Caption & Identity */}
                <div className="pt-2 text-center relative z-10 border-t border-[#C29A54]/40 mt-1">
                  <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#741C24] leading-tight mb-0.5">
                    {c.portraitTitle}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#3F291D]/80 font-serif leading-snug line-clamp-2">
                    {c.portraitCaption}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ===============================================================
              PART 5 — TWO SUPPORTING DEVOTIONAL PHOTOGRAPHS (Dedicated Row)
              No negative margins; dedicated CSS Grid row beneath the hero
             =============================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Supporting Photo A: Prayer Before Deity */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              onClick={() => onOpenLightbox(supportingPhotoA)}
              className="group relative rounded-2xl p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/70 hover:border-[#741C24] shadow-[0_8px_24px_rgba(63,41,29,0.08)] cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#3F291D]">
                <img
                  src={supportingPhotoA.src}
                  onError={(e) => {
                    if (supportingPhotoA.fallbackSrc) {
                      (e.target as HTMLImageElement).src = supportingPhotoA.fallbackSrc;
                    }
                  }}
                  alt="Smt. Pravina Thakur praying before Lord Dwarkadhish idol"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#3F291D]/80 text-[#E8C784] border border-[#C29A54]/50">
                  {c.photo1Tag}
                </span>

                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h5 className="font-serif-royal text-sm font-bold text-[#FFFDF8] leading-tight">
                    {c.photo1Title}
                  </h5>
                  <p className="text-[11px] text-[#FAF4E8]/90 font-serif leading-snug truncate">
                    {c.photo1Caption}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Supporting Photo B: Vedic Consecration Rites */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
              onClick={() => onOpenLightbox(supportingPhotoB)}
              className="group relative rounded-2xl p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/70 hover:border-[#741C24] shadow-[0_8px_24px_rgba(63,41,29,0.08)] cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#3F291D]">
                <img
                  src={supportingPhotoB.src}
                  onError={(e) => {
                    if (supportingPhotoB.fallbackSrc) {
                      (e.target as HTMLImageElement).src = supportingPhotoB.fallbackSrc;
                    }
                  }}
                  alt="Smt. Pravina Thakur participating in Vedic Pran Pratishtha ceremonies"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#3F291D]/80 text-[#E8C784] border border-[#C29A54]/50">
                  {c.photo2Tag}
                </span>

                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h5 className="font-serif-royal text-sm font-bold text-[#FFFDF8] leading-tight">
                    {c.photo2Title}
                  </h5>
                  <p className="text-[11px] text-[#FAF4E8]/90 font-serif leading-snug truncate">
                    {c.photo2Caption}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* =================================================================
            RIGHT CONTENT AREA (44% Desktop — lg:col-span-5)
           ================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-6">
          
          {/* Section A — Main Biography */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 border-2 border-[#C29A54]/80 shadow-[0_12px_36px_rgba(194,154,84,0.1)] relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-3.5">
              <DiyaAccent animated={!reducedMotion} />
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#741C24] font-bold">
                HISTORICAL NARRATIVE · पावन गाथा
              </span>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base text-[#3F291D]/90 leading-relaxed font-serif">
              <p className="first-letter:text-3xl first-letter:font-serif-royal first-letter:font-bold first-letter:text-[#741C24] first-letter:mr-1">
                {c.bioP1}
              </p>
              <p>{c.bioP2}</p>
              <p className="text-xs sm:text-sm text-[#741C24] font-semibold italic">
                {c.bioP3}
              </p>
            </div>
          </motion.div>

          {/* Section B — Three Historical Highlights (Compact Cards) */}
          <div className="grid grid-cols-1 gap-3.5">
            
            {/* Card 1: Public Service */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl p-4 sm:p-4.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight1Subtitle}
                </span>
                <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight1Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed mt-1">
                  {c.highlight1Desc}
                </p>
              </div>
            </motion.div>

            {/* Card 2: Temple Vision */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl p-4 sm:p-4.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight2Subtitle}
                </span>
                <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight2Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed mt-1">
                  {c.highlight2Desc}
                </p>
              </div>
            </motion.div>

            {/* Card 3: Temple Consecration */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.26, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl p-4 sm:p-4.5 bg-[#FFFDF8] border border-[#C29A54]/60 hover:border-[#741C24] shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#741C24] group-hover:text-white transition-colors shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-cinzel font-bold text-[#C29A54] uppercase tracking-wider">
                  {c.highlight3Subtitle}
                </span>
                <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#3F291D] group-hover:text-[#741C24] transition-colors leading-snug">
                  {c.highlight3Title}
                </h4>
                <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed mt-1">
                  {c.highlight3Desc}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Section C — Ceremonial Statement */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            className="relative bg-gradient-to-r from-[#FAF4E8] via-[#FFFDF8] to-[#FAF4E8] rounded-2xl p-5 border-2 border-[#C29A54] text-center shadow-xs"
          >
            <p className="font-serif-royal text-base sm:text-lg font-bold text-[#741C24] italic leading-snug mb-1.5">
              {c.statement}
            </p>
            <span className="font-cinzel text-[11px] text-[#C29A54] tracking-widest uppercase font-semibold">
              {c.statementTag}
            </span>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
