import React from 'react';
import { motion } from 'motion/react';
import { ZoomIn, Building, Calendar } from 'lucide-react';
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
        'Pravina H. Thakur is publicly recognized in Virar for civic leadership and enduring Krishna devotion. As former Mayor of Vasai–Virar and Trustee of Late Shri Vishnu Waman Thakur Charitable Trust, her over 25 years of annual pilgrimages to Dwarka since 2000 inspired the resolve—supported immediately by Sri Hitendra Thakur—to establish Shri Dwarkadhish Dham in Virar.',
      bioP2:
        'Choosing the serene lake-and-hill setting of Shirgaon and committing to traditional stone architecture built without cement or iron alongside Sompura architect Raju Bhai Mistry, her brother Kiran, Padma Shri Vasudeo Kamath, and dedicated artisans, the mandir unites devotion with community seva—including elder care and shelter.',
      bioP3:
        'Crafted over 7–8 years with interlocking Bansi Paharpur sandstone without iron or concrete, 56 steps, 24 avatar pillars, and 108 names of Krishna, its four-day Vedic Pran Pratishtha began on Wednesday, 26 November 2025 (26–29 Nov) led by Jagadguru Shankaracharya Swami Avimukteshwaranand Saraswati, consecrating the 90-ft shrine and Krishnashila Rajadhiraj murti to open the sanctum doors to thousands.',
      highlight1Title: 'Public Service',
      highlight1Subtitle: 'Former Mayor of Vasai–Virar',
      highlight1Desc: 'Rooted in Vasai–Virar civic stewardship, uniting spiritual devotion with compassionate Dharma and Karma seva.',
      highlight3Title: 'Pran Pratishtha Mahotsav',
      highlight3Subtitle: 'Sacred Consecration · Shirgaon',
      highlight3Before: 'On ',
      highlight3BoldDate: 'Wednesday, 26 November 2025',
      highlight3Mid: ', ',
      highlight3BoldOpening:
        'after 7–8 years of pure sandstone craft honoring brother Kiran’s memory, Shankaracharya Avimukteshwaranand consecrated the 90-ft shrine to open its doors',
      highlight3After: ' to thousands.',
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
        'प्रवीणा एच. ठाकुर को विरार में समर्पित जनसेवा और अनन्य कृष्ण भक्ति के लिए सम्मान प्राप्त है। वसई-विरार की पूर्व महापौर एवं स्वर्गीय श्री विष्णु वामन ठाकुर चैरिटेबल ट्रस्ट की ट्रस्टी के रूप में, सन् २००० से २५ वर्षों से अधिक की द्वारका यात्रा ने उन्हें विरार में श्री द्वारकाधीश धाम स्थापित करने की प्रेरणा दी, जिसे श्री हितेंद्र ठाकुर जी का तुरंत समर्थन मिला।',
      bioP2:
        'शिरगाव में पहाड़ी और झील से घिरी शांत भूमि चुनकर, भाई किरण, सोमपुरा शिल्पकार राजू भाई मिस्त्री, पद्मश्री वासुदेव कामत और निष्ठावान कारीगरों के सहयोग से बिना सीमेंट व लोहे के शुद्ध पाषाण मंदिर की रचना हुई—जो धर्म और सेवा (वृद्धाश्रम व अनाथ आश्रम) का संगम है।',
      bioP3:
        'बिना लोहे व कंक्रीट के बंसी पहाड़पुर पत्थर, ५६ सीढ़ियों, २४ अवतार स्तंभों व १०८ नामों से ७–८ वर्षों में निर्मित इस ९० फुट ऊँचे मंदिर के कपाट बुधवार, २६ नवंबर २०२५ (२६–२९ नवंबर) को जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी के पावन सान्निध्य में वैदिक प्राण प्रतिष्ठा व कृष्णशिला राजाधिराज विग्रह स्थापना के साथ हजारों श्रद्धालुओं हेतु खोले गए।',
      highlight1Title: 'जनसेवा',
      highlight1Subtitle: 'वसई-विरार की पूर्व महापौर',
      highlight1Desc: 'वसई-विरार में समर्पित नागरिक नेतृत्व, जहाँ धर्म व भक्ति को वृद्धाश्रम एवं अनाथ आश्रम जैसी समाजसेवा से जोड़ा गया।',
      highlight3Title: 'प्राण प्रतिष्ठा महोत्सव',
      highlight3Subtitle: 'पावन प्रतिष्ठा · शिरगांव',
      highlight3Before: '',
      highlight3BoldDate: 'बुधवार, २६ नवंबर २०२५',
      highlight3Mid: ' को ',
      highlight3BoldOpening:
        'भाई किरण की स्मृति में ७–८ वर्षों के शुद्ध पाषाण निर्माण के बाद शंकराचार्य अविमुक्तेश्वरानंद जी के वैदिक अनुष्ठान से ९० फुट मंदिर के द्वार खुले',
      highlight3After: ' और हजारों भक्तों ने दर्शन पाए।',
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
        'प्रवीणा एच. ठाकूर यांना विरारमध्ये नागरी नेतृत्व आणि निस्सीम कृष्णभक्तीसाठी विशेष आदर लाभला आहे. वसई-विरारच्या माजी महापौर आणि कै. श्री विष्णू वामन ठाकूर चॅरिटेबल ट्रस्टच्या विश्वस्त म्हणून, २००० सालापासून २५ वर्षांहून अधिक काळ केलेल्या द्वारका यात्रेतून विरारमध्ये श्री द्वारकाधीश धाम साकारण्याचा संकल्प आकाराला आला—ज्याला श्री हितेंद्र ठाकूर यांनी त्वरित पाठिंबा दिला.',
      bioP2:
        'शिरगावातील टेकडी व शांत तलावाजवळील निसर्गरम्य जागा निवडून, बंधू किरण, सोमपुरा शिल्पकार राजू भाई मिस्त्री, पद्मश्री वासुदेव कामत आणि निपुण कारागिरांच्या साथीने सिमेंट व लोखंडाविना शुद्ध दगडी मंदिर उभारले—जे धर्म आणि वृद्धाश्रम-अनाथालयासारख्या कर्मसेवेचा संगम आहे.',
      bioP3:
        'लोखंड व सिमेंटविना बन्सी पहाडपूरचा वालुकाश्म, ५६ पायऱ्या, २४ अवतार स्तंभ व १०८ नावांनी ७–८ वर्षांत उभारलेल्या या ९० फूट भव्य मंदिराची चार दिवसीय वैदिक प्राणप्रतिष्ठा बुधवार, २६ नोव्हेंबर २०२५ (२६–२९ नोव्हेंबर) रोजी जगद्गुरू शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती यांच्या हस्ते होऊन कृष्णशिला राजाधिराज मूर्ती स्थापनेनंतर मंदिराचे दरवाजे हजारो भाविकांसाठी खुले झाले.',
      highlight1Title: 'लोकसेवा',
      highlight1Subtitle: 'वसई-विरारच्या माजी महापौर',
      highlight1Desc: 'वसई-विरारमध्ये समर्पित नागरी सेवा आणि धर्म-कर्म एकत्र आणणारे वृद्धाश्रम व समाजसेवेचे कार्य.',
      highlight3Title: 'प्राणप्रतिष्ठा महोत्सव',
      highlight3Subtitle: 'पावन प्रतिष्ठा · शिरगाव',
      highlight3Before: '',
      highlight3BoldDate: 'बुधवार, २६ नोव्हेंबर २०२५',
      highlight3Mid: ' रोजी ',
      highlight3BoldOpening:
        'बंधू किरण यांच्या स्मृतीप्रीत्यर्थ ७–८ वर्षांच्या शुद्ध पाषाण बांधकामानंतर शंकराचार्य अविमुक्तेश्वरानंद यांच्या हस्ते ९० फूट मंदिराचे दरवाजे खुले झाले',
      highlight3After: ' व हजारो भाविकांनी दर्शन घेतले.',
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
        'પ્રવીણા એચ. ઠાકુર વિરારમાં સમર્પિત લોકસેવા અને અનન્ય કૃષ્ણભક્તિ માટે સુવિખ્યાત છે. વસઈ-વિરારના પૂર્વ મેયર અને સ્વ. શ્રી વિષ્ણુ વામન ઠાકુર ચેરિટેબલ ટ્રસ્ટના ટ્રસ્ટી તરીકે, ઈ.સ. ૨૦૦૦થી ૨૫થી વધુ વર્ષની દ્વારકા યાત્રાએ તેમને વિરારમાં શ્રી દ્વારકાધીશ ધામ સ્થાપવાની પ્રેરણા આપી, જેને શ્રી હિતેન્દ્ર ઠાકુરનો સહજ ટેકો મળ્યો.',
      bioP2:
        'શિરગાવમાં પર્વત અને તળાવથી ઘેરાયેલી શાંત ભૂમિ પસંદ કરી, ભાઈ કિરણ, સોમપુરા સ્થપતિ રાજુભાઈ મિસ્ત્રી, પદ્મશ્રી વાસુદેવ કામત અને સમર્પિત શિલ્પકારોના સંગાથે સિમેન્ટ કે લોખંડ વિના શુદ્ધ પથ્થરનું મંદિર નિર્માણ પામ્યું—જે ધર્મ સાથે વૃદ્ધાશ્રમ અને અનાથાશ્રમ જેવી કર્મસેવાનો સંગમ છે.',
      bioP3:
        'લોખંડ કે સિમેન્ટ વિના બંસી પહાડપુરના ગુલાબી પથ્થર, ૫૬ પગથિયાં, ૨૪ અવતાર સ્તંભો અને ૧૦૮ નામોથી ૭–૮ વર્ષમાં નિર્મિત આ ૯૦ ફૂટ ઊંચા મંદિરની વૈદિક પ્રાણપ્રતિષ્ઠા બુધવાર, ૨૬ નવેમ્બર ૨૦૨૫ (૨૬–૨૯ નવેમ્બર)ના રોજ જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજીના હસ્તે થતાં કૃષ્ણશિલા રાજાધિરાજ મૂર્તિની સ્થાપના સાથે હજારો ભક્તો માટે દ્વાર ખુલ્લા મુકાયા.',
      highlight1Title: 'લોકસેવા',
      highlight1Subtitle: 'વસઈ-વિરારના પૂર્વ મેયર',
      highlight1Desc: 'વસઈ-વિરારમાં સમર્પિત નાગરિક નેતૃત્વ અને ધર્મ સાથે વૃદ્ધાશ્રમ-અનાથાશ્રમ જેવી કર્મસેવાનો સમન્વય.',
      highlight3Title: 'પ્રાણ પ્રતિષ્ઠા મહોત્સવ',
      highlight3Subtitle: 'પાવન પ્રતિષ્ઠા · શિરગાવ',
      highlight3Before: '',
      highlight3BoldDate: 'બુધવાર, ૨૬ નવેમ્બર ૨૦૨૫',
      highlight3Mid: 'ના રોજ ',
      highlight3BoldOpening:
        'ભાઈ કિરણની સ્મૃતિમાં ૭–૮ વર્ષના શુદ્ધ પાષાણ નિર્માણ બાદ શંકરાચાર્ય અવિમુક્તેશ્વરાનંદજીના હસ્તે ૯૦ ફૂટ મંદિરના દ્વાર ખૂલ્યા',
      highlight3After: ' અને હજારો ભક્તો ઉમટ્યા.',
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 lg:items-stretch mb-10">
        {/* LEFT VISUAL COLUMN (lg:col-span-7) */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between gap-3.5">
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
                      loading="eager"
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
        <div className="lg:col-span-5 h-full flex flex-col justify-between gap-3.5">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-1 bg-[#FFFDF8] rounded-2xl p-4 sm:p-5 border-2 border-[#C29A54]/80 shadow-[0_12px_32px_rgba(194,154,84,0.1)] flex flex-col justify-center"
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
                  {c.highlight3Before}
                  {c.highlight3BoldDate}
                  {c.highlight3Mid}
                  {c.highlight3BoldOpening}
                  {c.highlight3After}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
