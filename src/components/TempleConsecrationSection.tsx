import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, Sparkles, Crown, Users, ZoomIn, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../data/templeData';
import { DiyaAccent, PeacockFeather, LotusOrnament } from './KrishnaMotifs';
import { LightboxPhotoData } from './vision/PravinaVisionHero';

export interface TempleConsecrationSectionProps {
  language: Language;
  reducedMotion?: boolean;
  onOpenLightbox?: (photo: LightboxPhotoData) => void;
}

export const TempleConsecrationSection: React.FC<TempleConsecrationSectionProps> = ({
  language,
  reducedMotion,
  onOpenLightbox,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModalPhoto, setActiveModalPhoto] = useState<LightboxPhotoData | null>(null);

  const handlePhotoClick = (photo: LightboxPhotoData) => {
    if (onOpenLightbox) {
      onOpenLightbox(photo);
    } else {
      setActiveModalPhoto(photo);
    }
  };

  const contentRecord = {
    en: {
      chapterKicker: 'HISTORIC CONSECRATION CHAPTER',
      heading: "The Temple's Consecration",
      subtitle: 'Pran Pratishtha • Sacred Dedication • Historic Opening',
      dateLabel: 'CONSECRATION DATE',
      mainDate: '26 November 2025',
      location: 'Shri Dwarkadhish Mandir — Shirgaon, Virar East, Palghar, Maharashtra',
      summary:
        'In November 2025, Shri Dwarkadhish Temple in Shirgaon, Virar East, was consecrated in a momentous spiritual ceremony, marking the culmination of a sacred devotional vision. The opening ceremonies and Pran Pratishtha were celebrated in strict adherence to Vedic traditions, welcoming thousands of devotees from across Maharashtra and blessed by revered spiritual leaders including Jagadguru Shankaracharya Swami Avimukteshwaranand Saraswati.',
      verifiedNote: 'Historically verified through reports in Loksatta, The Free Press Journal, and Hindusthan Samachar.',
      bannerTag: 'Temple Architecture',
      bannerTitle: 'Shri Dwarkadhish Mandir at Golden Hour',
      bannerCaption: 'The majestic pink sandstone shikhara in Shirgaon, consecrated on 26 November 2025.',
      eventPhotoTag: 'Inauguration Assembly',
      eventPhotoTitle: 'Pran Pratishtha Mahotsav Gathering',
      eventPhotoCaption: 'Spiritual assembly during the historic consecration celebrations at Shri Dwarkadhish Mandir.',
      tag1: 'Vedic Pran Pratishtha Began 26 Nov 2025',
      tag2: 'Sanctum Doors Opened to Thousands of Devotees',
      tag3: 'Revered Saints’ & Shankaracharya Blessings',
      tag4: '26–30 Nov 2025 Multi-Day Celebrations',
      btnExpand: 'Explore Inauguration Archive',
      btnCollapse: 'Hide Inauguration Archive',
      // Milestone details
      m1Period: '26–30 November 2025',
      m1Title: 'Pran Pratishtha Mahotsav',
      m1Desc: 'Multi-day celebration of Vedic yajnas, sacred stutis, and consecration rites in Shirgaon.',
      m2Period: '26 November 2025',
      m2Title: 'Consecration Began',
      m2Desc: 'Ceremonial commencement establishing the eternal swaroop of Lord Dwarkadhish.',
      m3Period: 'Community Celebrations',
      m3Title: 'Temple Opened to Devotees',
      m3Desc: 'Thousands arrived from Virar, Mumbai, and Thane to receive initial sanctum darshan.',
      m4Period: 'Spiritual Blessings',
      m4Title: 'Jagadguru Shankaracharya Presence',
      m4Desc: 'Swami Avimukteshwaranand Saraswati was associated with the consecration ceremonies.',
      archiveHeading: 'Documented Consecration Archive & Sources',
      archiveText:
        'The Pran Pratishtha ceremony of Shri Dwarkadhish Temple in Shirgaon was widely covered by leading regional and national publications. Smt. Pravina H. Thakur, former Mayor of Vasai–Virar, was recognized for the vision and devoted effort that brought this grand temple to reality.',
      sourceLabel: 'Verified Media Records:',
    },
    hi: {
      chapterKicker: 'ऐतिहासिक प्राण प्रतिष्ठा अध्याय',
      heading: 'मंदिर का पावन लोकार्पण',
      subtitle: 'प्राण प्रतिष्ठा • पावन समर्पण • ऐतिहासिक द्वारोद्घाटन',
      dateLabel: 'प्राण प्रतिष्ठा तिथि',
      mainDate: '26 नवंबर 2025',
      location: 'श्री द्वारकाधीश मंदिर — शिरगांव, विरार पूर्व, पालघर, महाराष्ट्र',
      summary:
        'नवंबर 2025 में शिरगांव (विरार पूर्व) में श्री द्वारकाधीश मंदिर की पावन प्राण प्रतिष्ठा संपन्न हुई। वैदिक विधि-विधान से मंदिर के कपाट श्रद्धालुओं के लिए खोले गए, जिसमें जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी सहित पूज्य संतों का पावन सानिध्य प्राप्त हुआ।',
      verifiedNote: 'लोकसत्ता, द फ्री प्रेस जर्नल एवं हिन्दुस्थान समाचार की प्रकाशित रिपोर्टों पर आधारित।',
      bannerTag: 'मंदिर स्थापत्य',
      bannerTitle: 'स्वर्णिम वेला में श्री द्वारकाधीश मंदिर',
      bannerCaption: 'शिरगांव स्थित नागर शैली का गुलाबी बलुआ पत्थर शिखर, 26 नवंबर 2025 को प्राण प्रतिष्ठित।',
      eventPhotoTag: 'लोकार्पण सभा',
      eventPhotoTitle: 'प्राण प्रतिष्ठा महोत्सव सभा',
      eventPhotoCaption: 'श्री द्वारकाधीश मंदिर के ऐतिहासिक लोकार्पण समारोह में उपस्थित साधु-संत एवं श्रद्धालु।',
      tag1: '26 नवंबर 2025 को प्रतिष्ठा प्रारंभ',
      tag2: 'भक्तों हेतु गर्भगृह कपाट खुले',
      tag3: 'पूज्य संतों व शंकराचार्य जी के आशीर्वाद',
      tag4: '26–30 नवंबर 2025 पंच-दिवसीय पावन महोत्सव',
      btnExpand: 'लोकार्पण अभिलेखागार देखें',
      btnCollapse: 'विवरण संक्षेप करें',
      m1Period: '26–30 नवंबर 2025',
      m1Title: 'प्राण प्रतिष्ठा महोत्सव',
      m1Desc: 'शिरगांव में वैदिक यज्ञों, पवित्र स्तुतियों एवं प्रतिष्ठा अनुष्ठानों का पावन उत्सव।',
      m2Period: '26 नवंबर 2025',
      m2Title: 'प्रतिष्ठा अनुष्ठान आरंभ',
      m2Desc: 'श्री द्वारकाधीश भगवान के नूतन स्वरूप की विधिवत प्रतिष्ठा अनुष्ठान का शुभारंभ।',
      m3Period: 'सामुदायिक उत्सव',
      m3Title: 'श्रद्धालुओं हेतु कपाट खुले',
      m3Desc: 'विरार, मुंबई और ठाणे से हजारों श्रद्धालु प्रथम दर्शन हेतु पधारे।',
      m4Period: 'आध्यात्मिक सानिध्य',
      m4Title: 'शंकराचार्य जी की उपस्थिति',
      m4Desc: 'जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी ने पावन वैदिक आशीर्वाद प्रदान किए।',
      archiveHeading: 'प्रलेखित लोकार्पण अभिलेख एवं संदर्भ',
      archiveText:
        'शिरगांव स्थित श्री द्वारकाधीश मंदिर के प्राण प्रतिष्ठा महोत्सव को प्रमुख समाचार पत्रों ने व्यापक रूप से प्रकाशित किया। वसई-विरार की पूर्व महापौर श्रीमती प्रवीणा एच. ठाकुर के संकल्प और योगदान को इस मंदिर के निर्माण का मुख्य प्रेरक बताया गया।',
      sourceLabel: 'सत्यापित समाचार स्रोत:',
    },
    mr: {
      chapterKicker: 'ऐतिहासिक प्राणप्रतिष्ठा अध्याय',
      heading: 'मंदिराचा पावन लोकार्पण सोहळा',
      subtitle: 'प्राणप्रतिष्ठा • पवित्र समर्पण • ऐतिहासिक लोकार्पण',
      dateLabel: 'प्राणप्रतिष्ठा दिनांक',
      mainDate: '२६ नोव्हेंबर २०२५',
      location: 'श्री द्वारकाधीश मंदिर — शिरगाव, विरार पूर्व, पालघर, महाराष्ट्र',
      summary:
        'नोव्हेंबर २०२५ मध्ये शिरगाव (विरार पूर्व) येथे श्री द्वारकाधीश मंदिराचा प्राणप्रतिष्ठा सोहळा मंगलमय वातावरणात संपन्न झाला. वैदिक विधींसह मंदिराचे दरवाजे भाविकांसाठी खुले करण्यात आले आणि जगद्गुरू शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती यांच्यासह पूज्य संतांचे आशीर्वाद लाभले.',
      verifiedNote: 'लोकसत्ता, द फ्री प्रेस जर्नल आणि हिंदुस्थान समाचारच्या वृत्तांवर आधारित.',
      bannerTag: 'मंदिर स्थापत्य',
      bannerTitle: 'सुवर्णप्रकाशात श्री द्वारकाधीश मंदिर',
      bannerCaption: 'शिरगाव येथील गुलाबी वालुकाश्म नागर शिखर, २६ नोव्हेंबर २०२५ रोजी प्राणप्रतिष्ठित.',
      eventPhotoTag: 'लोकार्पण सोहळा',
      eventPhotoTitle: 'प्राणप्रतिष्ठा महोत्सव सोहळा',
      eventPhotoCaption: 'शिरगाव येथील मंदिराच्या ऐतिहासिक लोकार्पण सोहळ्यात उपस्थित संत व भाविक समुदाय.',
      tag1: '२६ नोव्हेंबर २०२५ रोजी प्रतिष्ठा प्रारंभ',
      tag2: 'भाविकांसाठी गर्भगृह खुले',
      tag3: 'पूज्य संतांचे व शंकराचार्यांचे आशीर्वाद',
      tag4: '२६–३० नोव्हेंबर २०२५ पाच दिवसीय महोत्सव',
      btnExpand: 'लोकार्पण इतिहास पहा',
      btnCollapse: 'माहिती संक्षिप्त करा',
      m1Period: '२६–३० नोव्हेंबर २०२५',
      m1Title: 'प्राणप्रतिष्ठा महोत्सव',
      m1Desc: 'शिरगावात वैदिक यज्ञ आणि मंगलमय धार्मिक विधींचा सोहळा.',
      m2Period: '२६ नोव्हेंबर २०२५',
      m2Title: 'विधींचा प्रारंभ',
      m2Desc: 'श्री द्वारकाधीशांच्या विधीवत प्राणप्रतिष्ठा अनुष्ठानाला आरंभ.',
      m3Period: 'लोकार्पण सोहळा',
      m3Title: 'भाविकांसाठी कवाडे खुली',
      m3Desc: 'विरार-मुंबई परिसरातून हजारो भाविक दर्शनासाठी उपस्थित झाले.',
      m4Period: 'आध्यात्मिक सानिध्य',
      m4Title: 'शंकराचार्य महाराजांचे सानिध्य',
      m4Desc: 'जगद्गुरू शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती महाराजांचे पावन आशीर्वाद.',
      archiveHeading: 'ऐतिहासिक दस्तऐवज व संदर्भ',
      archiveText:
        'शिरगाव येथील श्री द्वारकाधीश मंदिराच्या प्राणप्रतिष्ठा महोत्सवाची दखल राज्यस्तरीय प्रसारमाध्यमांनी घेतली. वसई-विरारच्या माजी महापौर श्रीमती प्रवीणा एच. ठाकूर यांच्या संकल्पातून हे मंदिर साकारले.',
      sourceLabel: 'सत्यापित वृत्त संदर्भ:',
    },
    gu: {
      chapterKicker: 'ઐતિહાસિક પ્રાણપ્રતિષ્ઠા અધ્યાય',
      heading: 'મંદિરનો પાવન લોકાર્પણ મહોત્સવ',
      subtitle: 'પ્રાણપ્રતિષ્ઠા • પવિત્ર સમર્પણ • ઐતિહાસિક ઉદ્ઘાટન',
      dateLabel: 'પ્રાણપ્રતિષ્ઠા તારીખ',
      mainDate: '૨૬ નવેમ્બર ૨૦૨૫',
      location: 'શ્રી દ્વારકાધીશ મંદિર — શિરગાવ, વિરાર પૂર્વ, પાલઘર, મહારાષ્ટ્ર',
      summary:
        'નવેમ્બર ૨૦૨૫માં શિરગાવ (વિરાર પૂર્વ) ખાતે શ્રી દ્વારકાધીશ મંદિરની મંગલ પ્રાણપ્રતિષ્ઠા સંપન્ન થઈ. વૈદિક યજ્ઞો સાથે મંદિર તમામ ભક્તો માટે ખુલ્લું મુકાયું અને જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજી સહિત સંતોના આશીર્વાદ પ્રાપ્ત થયા.',
      verifiedNote: 'લોકસત્તા, ધ ફ્રી પ્રેસ જર્નલ અને હિન્દુસ્થાન સમાચારના અહેવાલો પર આધારિત.',
      bannerTag: 'મંદિર સ્થાપત્ય',
      bannerTitle: 'સુવર્ણ સંધ્યામાં શ્રી દ્વારકાધીશ મંદિર',
      bannerCaption: 'શિરગાવ સ્થિત ગુલાબી પથ્થરનું નાગર શિખર, ૨૬ નવેમ્બર ૨૦૨૫ના રોજ પ્રાણપ્રતિષ્ઠિત.',
      eventPhotoTag: 'ઉદ્ઘાટન સભા',
      eventPhotoTitle: 'પ્રાણપ્રતિષ્ઠા મહોત્સવ સભા',
      eventPhotoCaption: 'શ્રી દ્વારકાધીશ મંદિર ઉદ્ઘાટન પ્રસંગે ઉપસ્થિત સંતો અને વિશાળ ભક્તસમુદાય.',
      tag1: '૨૬ નવેમ્બર ૨૦૨૫ પ્રતિષ્ઠા પ્રારંભ',
      tag2: 'ભક્તો માટે ગર્ભગૃહ દ્વાર ખુલ્યા',
      tag3: 'પૂજ્ય સંતો અને શંકરાચાર્યજીના આશીર્વાદ',
      tag4: '૨૬–૩૦ નવેમ્બર ૨૦૨૫ પાંચ દિવસીય મહોત્સવ',
      btnExpand: 'લોકાર્પણ ઇતિહાસ જુઓ',
      btnCollapse: 'માહિતી સંક્ષિપ્ત કરો',
      m1Period: '૨૬–૩૦ નવેમ્બર ૨૦૨૫',
      m1Title: 'પ્રાણપ્રતિષ્ઠા મહોત્સવ',
      m1Desc: 'શિરગાવમાં પાંચ દિવસીય વૈદિક મંત્રોચ્ચાર અને પૂજાવિધિ સંપન્ન થયા.',
      m2Period: '૨૬ નવેમ્બર ૨૦૨૫',
      m2Title: 'વિધિનો મંગળારંભ',
      m2Desc: 'શ્રી દ્વારકાધીશ ભગવાનની મંગલ પ્રાણપ્રતિષ્ઠા વિધિઓનો પ્રારંભ.',
      m3Period: 'લોકાર્પણ મહોત્સવ',
      m3Title: 'ભક્તો માટે દ્વાર ખુલ્યા',
      m3Desc: 'વિરાર-મુંબઈથી હજારો દર્શનાર્થીઓ પધાર્યા.',
      m4Period: 'આધ્યાત્મિક સાન્નિધ્ય',
      m4Title: 'શંકરાચાર્યજીના આશીર્વાદ',
      m4Desc: 'જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજીએ આશીર્વાદ આપ્યા.',
      archiveHeading: 'ઐતિહાસિક દસ્તાવેજ અને સંદર્ભ',
      archiveText:
        'શિરગાવ ખાતે શ્રી દ્વારકાધીશ મંદિરના પ્રાણપ્રતિષ્ઠા મહોત્સવની નોંધ અગ્રણી અખબારોએ લીધી હતી. વસઈ-વિરારના પૂર્વ મેયર શ્રીમતી પ્રવીણા એચ. ઠાકુરની પ્રેરણા અને ભક્તિથી આ ભવ્ય ધામ સાકાર થયું.',
      sourceLabel: 'સત્યાપિત સમાચાર સંદર્ભ:',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  const bannerPhoto: LightboxPhotoData = {
    src: '/dwarkadhish_temple_widescreen_4k.webp',
    fallbackSrc: '/dwarkadhish_temple_widescreen_4k.webp',
    title: c.bannerTitle,
    caption: c.bannerCaption,
    tag: c.bannerTag,
  };

  const eventPhoto: LightboxPhotoData = {
    src: '/assets/praveena_thakur/vibrant_ceremony.webp',
    fallbackSrc: '/assets/praveena_thakur/vibrant_ceremony.webp',
    title: c.eventPhotoTitle,
    caption: c.eventPhotoCaption,
    tag: c.eventPhotoTag,
  };

  const expandedMilestones = [
    { period: c.m1Period, title: c.m1Title, desc: c.m1Desc, icon: Calendar },
    { period: c.m2Period, title: c.m2Title, desc: c.m2Desc, icon: Sparkles },
    { period: c.m3Period, title: c.m3Title, desc: c.m3Desc, icon: Users },
    { period: c.m4Period, title: c.m4Title, desc: c.m4Desc, icon: Crown },
  ];

  return (
    <section
      id="consecration"
      aria-label="The Temple's Consecration Historical Chapter"
      className="relative w-full bg-[#FAF4E8] text-[#3F291D] py-16 sm:py-20 lg:py-24 border-b-2 border-[#C29A54]/60 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 flex flex-col gap-10 sm:gap-14">
        
        {/* ===================================================================
            OPENING VISUAL A — GRAND GOLDEN-HOUR TEMPLE BANNER
            The first visual MUST be the existing golden-hour temple photograph.
           =================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handlePhotoClick(bannerPhoto)}
          className="relative w-full rounded-3xl overflow-hidden aspect-[21/9] min-h-[300px] sm:min-h-[400px] lg:min-h-[460px] bg-[#2B1317] border-2 border-[#C29A54] shadow-[0_20px_50px_rgba(63,41,29,0.15)] group cursor-pointer"
        >
          <img
            src={bannerPhoto.src}
            onError={(e) => {
              if (bannerPhoto.fallbackSrc) {
                (e.target as HTMLImageElement).src = bannerPhoto.fallbackSrc;
              }
            }}
            alt="Shri Dwarkadhish Mandir pink sandstone temple at golden hour in Shirgaon, Virar East"
            className="w-full h-full object-cover object-center filter brightness-[1.02] transition-transform duration-1000 ease-out group-hover:scale-103"
            loading="eager"
          />

          {/* Carefully tuned sacred gradient overlay for high text contrast without obscuring temple carvings */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#240D12]/92 via-[#240D12]/40 to-transparent pointer-events-none" />

          {/* Banner Badges & Monumental Chapter Header */}
          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-cinzel font-bold tracking-widest uppercase bg-[#C29A54] text-[#3F291D] shadow-xs">
                  {c.chapterKicker}
                </span>
                <span className="text-xs text-[#E8C784] font-cinzel tracking-wider hidden sm:inline">
                  • 26 NOV 2025
                </span>
              </div>
              <h2 className="font-serif-royal text-2xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDF8] tracking-tight mb-2 drop-shadow-md">
                {c.heading}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#F4E9D8]/95 font-serif font-medium tracking-wide">
                {c.subtitle}
              </p>
            </div>

            {/* Featured Date Badge on Banner */}
            <div className="px-5 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-[#C29A54] flex items-center gap-3 shrink-0 shadow-lg">
              <DiyaAccent animated={!reducedMotion} />
              <div>
                <span className="block text-[10px] font-cinzel tracking-widest uppercase text-[#C29A54] font-bold">
                  {c.dateLabel}
                </span>
                <span className="font-serif-royal text-lg sm:text-xl font-bold text-[#FFFDF8] leading-tight">
                  {c.mainDate}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePhotoClick(bannerPhoto);
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
            aria-label="View golden hour temple photo in high resolution"
          >
            <ZoomIn className="w-4 h-4 text-[#E8C784]" />
          </button>
        </motion.div>

        {/* ===================================================================
            SECTION B & C — CEREMONY STORY & AUTHENTIC EVENT PHOTOGRAPHY
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (5/12): Authentic Event Assembly Photo */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onClick={() => handlePhotoClick(eventPhoto)}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-[#FFFDF8] border-2 border-[#C29A54] p-3 group cursor-pointer shadow-md flex flex-col justify-between"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#2B1317]">
              <img
                src={eventPhoto.src}
                onError={(e) => {
                  if (eventPhoto.fallbackSrc) {
                    (e.target as HTMLImageElement).src = eventPhoto.fallbackSrc;
                  }
                }}
                alt="Shri Dwarkadhish Mandir historic consecration assembly in Shirgaon"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#C29A54] text-[#3F291D]">
                {c.eventPhotoTag}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePhotoClick(eventPhoto);
                }}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-[#741C24] text-white border border-white/20 transition-colors shadow-md"
                aria-label="View assembly photo"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
              </button>
            </div>

            <div className="p-3 text-center">
              <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#741C24] leading-snug mb-1">
                {c.eventPhotoTitle}
              </h4>
              <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed">
                {c.eventPhotoCaption}
              </p>
            </div>
          </motion.div>

          {/* Right Column (7/12): Historical Narrative & Sourced Facts */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-between bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-[#C29A54]/80 shadow-[0_12px_36px_rgba(194,154,84,0.1)]"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DiyaAccent animated={!reducedMotion} />
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#741C24] font-bold">
                  VEDIC CONSECRATION · पावन प्राण प्रतिष्ठा
                </span>
              </div>

              <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#3F291D] leading-tight mb-4">
                {c.heading}
              </h3>

              <p className="text-sm sm:text-base text-[#3F291D]/90 font-serif leading-relaxed mb-4">
                {c.summary}
              </p>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F4E9D8]/60 border border-[#C29A54]/40 text-xs text-[#741C24] font-serif mb-5">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#C29A54]" />
                <span>{c.verifiedNote}</span>
              </div>

              {/* Four Concise Historical Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {[c.tag1, c.tag2, c.tag3, c.tag4].map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF4E8] border border-[#C29A54]/50 text-xs font-serif text-[#3F291D]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#C29A54] shrink-0" />
                    <span className="leading-snug">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Location & Expandable Archive Button */}
            <div className="pt-4 border-t border-[#C29A54]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[#741C24] font-cinzel font-semibold tracking-wide">
                {c.location}
              </span>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider bg-[#741C24] hover:bg-[#5A141B] text-[#FFFDF8] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{isExpanded ? c.btnCollapse : c.btnExpand}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#E8C784] transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </motion.div>

        </div>

        {/* ===================================================================
            SECTION E & F — EXPANDABLE ARCHIVE DRAWER
            Contains full documented chronicle, milestones, and media sources
           =================================================================== */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF8] border-2 border-[#C29A54] shadow-md space-y-6">
                <div className="max-w-3xl">
                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#741C24] mb-2">
                    {c.archiveHeading}
                  </h4>
                  <p className="text-sm text-[#3F291D]/85 font-serif leading-relaxed">
                    {c.archiveText}
                  </p>
                </div>

                {/* 4 Milestones Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {expandedMilestones.map((m, idx) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#FAF4E8] border border-[#C29A54]/60 flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-cinzel font-bold text-[#741C24] tracking-wider uppercase">
                              {m.period}
                            </span>
                            <Icon className="w-4 h-4 text-[#C29A54]" />
                          </div>
                          <h5 className="font-serif-royal text-sm font-bold text-[#3F291D] mb-1">
                            {m.title}
                          </h5>
                          <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Source Documentation Strip */}
                <div className="pt-4 border-t border-[#C29A54]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#3F291D]/70 font-serif">
                  <div>
                    <strong className="text-[#741C24] font-semibold">{c.sourceLabel}</strong>{' '}
                    <span>Loksatta (Nov 2025) · The Free Press Journal (Nov 2025) · Hindusthan Samachar (Nov 2025)</span>
                  </div>
                  <span className="font-cinzel text-[11px] text-[#C29A54] font-bold uppercase tracking-widest">
                    Archival Record · Shirgaon, Virar East
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
