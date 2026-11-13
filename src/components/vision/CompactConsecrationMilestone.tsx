import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronDown, Sparkles, Crown, Users, ZoomIn, CheckCircle } from 'lucide-react';
import { Language } from '../../data/templeData';
import { DiyaAccent, PeacockFeather } from '../KrishnaMotifs';
import { LightboxPhotoData } from './PravinaVisionHero';

export interface CompactConsecrationMilestoneProps {
  language: Language;
  reducedMotion?: boolean;
  onOpenLightbox: (photo: LightboxPhotoData) => void;
}

export const CompactConsecrationMilestone: React.FC<CompactConsecrationMilestoneProps> = ({
  language,
  reducedMotion,
  onOpenLightbox,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contentRecord = {
    en: {
      chapterKicker: 'HISTORIC CONSECRATION MILESTONE',
      heading: "The Temple's Consecration",
      dateLabel: 'CONSECRATION DATE',
      mainDate: '26 November 2025',
      location: 'Shri Dwarkadhish Temple — Shirgaon, Virar East',
      summary:
        'In November 2025, Shri Dwarkadhish Temple was consecrated in Shirgaon, Virar East, marking the culmination of a sacred devotional vision. The opening ceremonies and Pran Pratishtha were celebrated with Vedic rituals, welcoming thousands of devotees and graced by revered spiritual leaders including Jagadguru Shankaracharya Swami Avimukteshwaranand Saraswati.',
      tag1: 'Vedic Consecration Began 26 Nov 2025',
      tag2: 'Sanctum Doors Opened to Devotees',
      tag3: 'Revered Saints’ Vedic Blessings',
      btnExpand: 'Explore Inauguration History',
      btnCollapse: 'Hide Inauguration Archive',
      eventPhotoTag: 'Historic Ceremony',
      eventPhotoTitle: 'Pran Pratishtha Mahotsav Assembly',
      eventPhotoCaption: 'Devotees and spiritual leaders gathered at Shri Dwarkadhish Mandir in Shirgaon, Virar East.',
      // Expanded details
      m1Period: '26–29 November 2025',
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
    },
    hi: {
      chapterKicker: 'ऐतिहासिक प्राण प्रतिष्ठा क्षण',
      heading: 'मंदिर का पावन लोकार्पण',
      dateLabel: 'प्राण प्रतिष्ठा तिथि',
      mainDate: '26 नवंबर 2025',
      location: 'श्री द्वारकाधीश मंदिर — शिरगांव, विरार पूर्व',
      summary:
        'नवंबर 2025 में शिरगांव (विरार पूर्व) में श्री द्वारकाधीश मंदिर की पावन प्राण प्रतिष्ठा संपन्न हुई। वैदिक अनुष्ठानों के साथ मंदिर के कपाट श्रद्धालुओं के लिए खोले गए, जिसमें जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी सहित पूज्य संतों का पावन सानिध्य प्राप्त हुआ।',
      tag1: '26 नवंबर 2025 को प्रतिष्ठा प्रारंभ',
      tag2: 'भक्तों हेतु गर्भगृह कपाट खुले',
      tag3: 'पूज्य संतों के मंगलमय आशीर्वाद',
      btnExpand: 'उद्घाटन का इतिहास देखें',
      btnCollapse: 'विवरण संक्षेप करें',
      eventPhotoTag: 'ऐतिहासिक उत्सव',
      eventPhotoTitle: 'प्राण प्रतिष्ठा महोत्सव सभा',
      eventPhotoCaption: 'शिरगांव (विरार पूर्व) में श्री द्वारकाधीश मंदिर लोकार्पण के पावन क्षण।',
      m1Period: '26–29 नवंबर 2025',
      m1Title: 'प्राण प्रतिष्ठा महोत्सव',
      m1Desc: 'शिरगांव में वैदिक यज्ञों, पवित्र स्तुतियों एवं प्रतिष्ठा अनुष्ठानों का चार दिवसीय पावन उत्सव।',
      m2Period: '26 नवंबर 2025',
      m2Title: 'प्रतिष्ठा अनुष्ठान आरंभ',
      m2Desc: 'श्री द्वारकाधीश भगवान के नूतन स्वरूप की विधिवत प्रतिष्ठा अनुष्ठान का शुभारंभ।',
      m3Period: 'सामुदायिक उत्सव',
      m3Title: 'श्रद्धालुओं हेतु कपाट खुले',
      m3Desc: 'विरार, मुंबई और ठाणे से हजारों श्रद्धालु दर्शन हेतु पधारे।',
      m4Period: 'आध्यात्मिक सानिध्य',
      m4Title: 'शंकराचार्य जी की उपस्थिति',
      m4Desc: 'जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी ने पावन वैदिक आशीर्वाद दिए।',
    },
    mr: {
      chapterKicker: 'ऐतिहासिक प्राणप्रतिष्ठा टप्पा',
      heading: 'मंदिराचा पावन लोकार्पण सोहळा',
      dateLabel: 'प्राणप्रतिष्ठा दिनांक',
      mainDate: '२६ नोव्हेंबर २०२५',
      location: 'श्री द्वारकाधीश मंदिर — शिरगाव, विरार पूर्व',
      summary:
        'नोव्हेंबर २०२५ मध्ये शिरगाव (विरार पूर्व) येथे श्री द्वारकाधीश मंदिराचा प्राणप्रतिष्ठा सोहळा मंगलमय वातावरणात संपन्न झाला. वैदिक विधींसह मंदिराचे दरवाजे भाविकांसाठी खुले करण्यात आले आणि जगद्गुरू शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती यांच्यासह पूज्य संतांचे आशीर्वाद लाभले.',
      tag1: '२६ नोव्हेंबर २०२५ रोजी प्रतिष्ठा प्रारंभ',
      tag2: 'भाविकांसाठी गर्भगृह खुले',
      tag3: 'पूज्य संतांचे मंगल आशीर्वाद',
      btnExpand: 'लोकार्पण सोहळ्याचा इतिहास पहा',
      btnCollapse: 'माहिती संक्षिप्त करा',
      eventPhotoTag: 'ऐतिहासिक क्षण',
      eventPhotoTitle: 'प्राणप्रतिष्ठा महोत्सव सोहळा',
      eventPhotoCaption: 'शिरगाव (विरार पूर्व) येथील मंदिराच्या उद्घाटनाप्रसंगी जमलेला भाविक समुदाय.',
      m1Period: '२६–२९ नोव्हेंबर २०२५',
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
    },
    gu: {
      chapterKicker: 'ઐતિહાસિક પ્રાણપ્રતિષ્ઠા પળ',
      heading: 'મંદિરનો પાવન લોકાર્પણ મહોત્સવ',
      dateLabel: 'પ્રાણપ્રતિષ્ઠા તારીખ',
      mainDate: '૨૬ નવેમ્બર ૨૦૨૫',
      location: 'શ્રી દ્વારકાધીશ મંદિર — શિરગાવ, વિરાર પૂર્વ',
      summary:
        'નવેમ્બર ૨૦૨૫માં શિરગાવ (વિરાર પૂર્વ) ખાતે શ્રી દ્વારકાધીશ મંદિરની મંગલ પ્રાણપ્રતિષ્ઠા સંપન્ન થઈ. વૈદિક યજ્ઞો સાથે મંદિર તમામ ભક્તો માટે ખુલ્લું મુકાયું અને જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજી સહિત સંતોના આશીર્વાદ પ્રાપ્ત થયા.',
      tag1: '૨૬ નવેમ્બર ૨૦૨૫ પ્રતિષ્ઠા પ્રારંભ',
      tag2: 'ભક્તો માટે ગર્ભગૃહ દ્વાર ખુલ્યા',
      tag3: 'પૂજ્ય સંતોના મંગળ આશીર્વાદ',
      btnExpand: 'લોકાર્પણ ઇતિહાસ જુઓ',
      btnCollapse: 'માહિતી સંક્ષિપ્ત કરો',
      eventPhotoTag: 'ઐતિહાસિક પળ',
      eventPhotoTitle: 'પ્રાણપ્રતિષ્ઠા મહોત્સવ સભા',
      eventPhotoCaption: 'શિરગાવ ખાતે શ્રી દ્વારકાધીશ મંદિર ઉદ્ઘાટન પ્રસંગે ઉપસ્થિત ભક્તસમુદાય.',
      m1Period: '૨૬–૨૯ નવેમ્બર ૨૦૨૫',
      m1Title: 'પ્રાણપ્રતિષ્ઠા મહોત્સવ',
      m1Desc: 'શિરગાવમાં ચાર દિવસીય વૈદિક મંત્રોચ્ચાર અને પૂજાવિધિ સંપન્ન થયા.',
      m2Period: '૨૬ નવેમ્બર ૨૦૨૫',
      m2Title: 'વિધિનો મંગળારંભ',
      m2Desc: 'શ્રી દ્વારકાધીશ ભગવાનની મંગલ પ્રાણપ્રતિષ્ઠા વિધિઓનો પ્રારંભ.',
      m3Period: 'લોકાર્પણ મહોત્સવ',
      m3Title: 'ભક્તો માટે દ્વાર ખુલ્યા',
      m3Desc: 'વિરાર-મુંબઈથી હજારો દર્શનાર્થીઓ પધાર્યા.',
      m4Period: 'આધ્યાત્મિક સાન્નિધ્ય',
      m4Title: 'શંકરાચાર્યજીના આશીર્વાદ',
      m4Desc: 'જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજીએ આશીર્વાદ આપ્યા.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

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
    <div className="relative w-full">
      {/* ===================================================================
          PART 8 — COMPACT HORIZONTAL EDITORIAL BAND (Height ~260–360px desktop)
         =================================================================== */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-gradient-to-r from-[#4A121A] via-[#360D13] to-[#2B1317] text-[#FFFDF7] border-2 border-[#C29A54] p-5 sm:p-7 lg:p-9 shadow-[0_16px_45px_rgba(74,18,26,0.22)] overflow-hidden"
      >
        {/* Subtle Decorative Golden Flutes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#C29A54]/10 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column (4/12): Authentic Event Photograph */}
          <div className="lg:col-span-4 relative">
            <div
              onClick={() => onOpenLightbox(eventPhoto)}
              className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-black/40 border border-[#C29A54]/70 group cursor-pointer shadow-md"
            >
              <img
                src={eventPhoto.src}
                onError={(e) => {
                  if (eventPhoto.fallbackSrc) {
                    (e.target as HTMLImageElement).src = eventPhoto.fallbackSrc;
                  }
                }}
                alt="Shri Dwarkadhish Mandir consecration ceremony assembly"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#C29A54] text-[#3F291D]">
                {c.eventPhotoTag}
              </span>

              <div className="absolute bottom-2.5 left-3 right-3">
                <p className="text-xs text-[#FAF4E8] font-serif leading-tight">
                  {c.eventPhotoCaption}
                </p>
              </div>

              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
              </div>
            </div>
          </div>

          {/* Right Column (8/12): Consecration Details, Featured Date, Concise Tags & Disclosure Toggle */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            
            {/* Header with Featured Date Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-cinzel font-bold tracking-widest uppercase bg-[#C29A54]/25 text-[#E8C784] border border-[#C29A54]/50 mb-1">
                  {c.chapterKicker}
                </span>
                <h3 className="font-serif-royal text-xl sm:text-2xl md:text-3xl font-bold text-[#FFFDF7] leading-tight">
                  {c.heading}
                </h3>
              </div>

              {/* Monumental Date Callout Badge */}
              <div className="px-4 py-2 rounded-xl bg-[#2B1317] border border-[#C29A54] flex items-center gap-2.5 shrink-0 shadow-xs">
                <DiyaAccent animated={!reducedMotion} />
                <div>
                  <span className="block text-[9px] font-cinzel tracking-widest uppercase text-[#C29A54] font-bold">
                    {c.dateLabel}
                  </span>
                  <span className="font-serif-royal text-base sm:text-lg font-bold text-[#FFFDF7] leading-none">
                    {c.mainDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Short Factual Paragraph */}
            <p className="text-xs sm:text-sm text-[#F1E3CC]/90 font-serif leading-relaxed mb-3">
              {c.summary}
            </p>

            {/* Three Concise Historical Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-serif bg-black/30 border border-[#C29A54]/40 text-[#FAF4E8]">
                <CheckCircle className="w-3.5 h-3.5 text-[#E8C784]" />
                {c.tag1}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-serif bg-black/30 border border-[#C29A54]/40 text-[#FAF4E8]">
                <CheckCircle className="w-3.5 h-3.5 text-[#E8C784]" />
                {c.tag2}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-serif bg-black/30 border border-[#C29A54]/40 text-[#FAF4E8]">
                <CheckCircle className="w-3.5 h-3.5 text-[#E8C784]" />
                {c.tag3}
              </span>
            </div>

            {/* Expandable Disclosure Button */}
            <div className="flex items-center justify-between pt-2 border-t border-[#C29A54]/30">
              <span className="text-[11px] text-[#E8C784] font-cinzel tracking-wider">
                {c.location}
              </span>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase tracking-wider bg-[#C29A54] hover:bg-[#A88242] text-[#3F291D] transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>{isExpanded ? c.btnCollapse : c.btnExpand}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

        {/* Expandable Inauguration History Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-6 pt-6 border-t border-[#C29A54]/40 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {expandedMilestones.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-[#C29A54]/40 backdrop-blur-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-cinzel font-bold text-[#E8C784] tracking-wider uppercase">
                            {m.period}
                          </span>
                          <Icon className="w-3.5 h-3.5 text-[#C29A54]" />
                        </div>
                        <h4 className="font-serif-royal text-sm font-bold text-[#FFFDF7] mb-1">
                          {m.title}
                        </h4>
                        <p className="text-[11px] text-[#F1E3CC]/80 font-serif leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
