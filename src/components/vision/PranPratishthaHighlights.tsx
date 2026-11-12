import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, CheckCircle, Crown, Users } from 'lucide-react';
import { Language } from '../../data/templeData';
import { DiyaAccent } from '../KrishnaMotifs';

export interface PranPratishthaHighlightsProps {
  language: Language;
  reducedMotion?: boolean;
}

export const PranPratishthaHighlights: React.FC<PranPratishthaHighlightsProps> = ({
  language,
  reducedMotion,
}) => {
  const content = {
    en: {
      chapterKicker: 'CHAPTER 03 · SACRED CONSECRATION',
      heading: 'Opening & Pran Pratishtha Highlights',
      subheading: 'A historic spiritual awakening for Shirgaon and the greater North Konkan pilgrim corridor.',
      mainDate: '26 November 2025',
      mainDateLocation: 'Shri Dwarkadhish Temple — Shirgaon, Virar East',
      milestone1Period: '26–29 November 2025',
      milestone1Title: 'Four-day Pran Pratishtha Mahotsav',
      milestone1Desc: 'Grand multi-day festival of Vedic yajnas, sacred stutis, and consecration rites inaugurating the temple.',
      milestone2Period: '26 November 2025',
      milestone2Title: 'Consecration Ceremonies Began',
      milestone2Desc: 'Consecration ceremonies began at Shri Dwarkadhish Temple, Shirgaon, Virar East, establishing the eternal swaroop of Lord Dwarkadhish.',
      milestone3Period: 'Opening Celebrations',
      milestone3Title: 'Temple Opened to Devotees',
      milestone3Desc: 'The temple opened to devotees during the inauguration celebrations, with thousands arriving from Virar, Mumbai, and Thane.',
      milestone4Period: 'Spiritual Presence',
      milestone4Title: 'Revered Spiritual Dignitaries',
      milestone4Desc: 'Jagadguru Shankaracharya Swami Avimukteshwaranand Saraswati was associated with the inauguration ceremonies, bestowing supreme Vedic blessings.',
    },
    hi: {
      chapterKicker: 'अध्याय 03 · पावन प्राण प्रतिष्ठा',
      heading: 'उद्घाटन एवं प्राण प्रतिष्ठा की प्रमुख झलकियां',
      subheading: 'शिरगांव और समग्र उत्तर कोंकण तीर्थ क्षेत्र के लिए एक ऐतिहासिक आध्यात्मिक प्रभात।',
      mainDate: '26 नवंबर 2025',
      mainDateLocation: 'श्री द्वारकाधीश मंदिर — शिरगांव, विरार पूर्व',
      milestone1Period: '26–29 नवंबर 2025',
      milestone1Title: 'चार दिवसीय प्राण प्रतिष्ठा महोत्सव',
      milestone1Desc: 'मंदिर के लोकार्पण का भव्य चार दिवसीय आध्यात्मिक उत्सव, जिसमें वैदिक यज्ञ, पवित्र स्तुतियां और अनुष्ठान संपन्न हुए।',
      milestone2Period: '26 नवंबर 2025',
      milestone2Title: 'पावन प्रतिष्ठा अनुष्ठान का शुभारंभ',
      milestone2Desc: 'श्री द्वारकाधीश मंदिर (शिरगांव, विरार पूर्व) में प्राण प्रतिष्ठा अनुष्ठानों का शुभारंभ हुआ, जिससे गर्भगृह में भगवान का दिव्य स्वरूप प्रतिष्ठित हुआ।',
      milestone3Period: 'लोकार्पण उत्सव',
      milestone3Title: 'श्रद्धालुओं के लिए मंदिर के द्वार खुले',
      milestone3Desc: 'उद्घाटन समारोह के पावन अवसर पर मंदिर के कपाट सभी दर्शनार्थियों के लिए खोले गए, जहां हजारों भक्त दर्शन हेतु पधारे।',
      milestone4Period: 'आध्यात्मिक सानिध्य',
      milestone4Title: 'परम पूज्य संतों की उपस्थिति',
      milestone4Desc: 'जगद्गुरु शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती जी उद्घाटन समारोहों से जुड़े रहे और उन्होंने पावन वैदिक आशीर्वाद प्रदान किया।',
    },
    mr: {
      chapterKicker: 'अध्याय 03 · पावन प्राणप्रतिष्ठा',
      heading: 'उद्घाटन आणि प्राणप्रतिष्ठा सोहळ्याची वैशिष्ट्ये',
      subheading: 'शिरगाव आणि संपूर्ण उत्तर कोकण परिसरासाठी एक ऐतिहासिक आध्यात्मिक पहाट.',
      mainDate: '२६ नोव्हेंबर २०२५',
      mainDateLocation: 'श्री द्वारकाधीश मंदिर — शिरगाव, विरार पूर्व',
      milestone1Period: '२६–२९ नोव्हेंबर २०२५',
      milestone1Title: 'चार दिवसीय प्राणप्रतिष्ठा महोत्सव',
      milestone1Desc: 'मंदिराच्या उद्घाटनाचा भव्य चार दिवसांचा सोहळा, ज्यामध्ये वैदिक यज्ञ, पवित्र स्तुती आणि विधी पार पडले.',
      milestone2Period: '२६ नोव्हेंबर २०२५',
      milestone2Title: 'प्राणप्रतिष्ठा विधींचा प्रारंभ',
      milestone2Desc: 'श्री द्वारकाधीश मंदिर, शिरगाव (विरार पूर्व) येथे विधीवत प्राणप्रतिष्ठा अनुष्ठानाला आरंभ झाला.',
      milestone3Period: 'लोकार्पण सोहळा',
      milestone3Title: 'भाविकांसाठी मंदिराचे द्वार खुले',
      milestone3Desc: 'उद्घाटन सोहळ्यादरम्यान मंदिराची कवाडे सर्व भाविकांसाठी खुली झाली आणि विरार-मुंबईतून हजारो भाविक दर्शनासाठी आले.',
      milestone4Period: 'आध्यात्मिक सानिध्य',
      milestone4Title: 'परमपूज्य संतांचे आशीर्वाद',
      milestone4Desc: 'जगद्गुरू शंकराचार्य स्वामी अविमुक्तेश्वरानंद सरस्वती महाराज या उद्घाटन सोहळ्याशी जोडलेले होते आणि त्यांनी मंगलमय आशीर्वाद दिले.',
    },
    gu: {
      chapterKicker: 'અધ્યાય 03 · પવિત્ર પ્રાણપ્રતિષ્ઠા',
      heading: 'ઉદ્ઘાટન અને પ્રાણપ્રતિષ્ઠાના મુખ્ય અંશો',
      subheading: 'શિરગાવ અને ઉત્તર કોંકણ ક્ષેત્ર માટે એક ઐતિહાસિક આધ્યાત્મિક પ્રભાત.',
      mainDate: '૨૬ નવેમ્બર ૨૦૨૫',
      mainDateLocation: 'શ્રી દ્વારકાધીશ મંદિર — શિરગાવ, વિરાર પૂર્વ',
      milestone1Period: '૨૬–૨૯ નવેમ્બર ૨૦૨૫',
      milestone1Title: 'ચાર દિવસીય પ્રાણપ્રતિષ્ઠા મહોત્સવ',
      milestone1Desc: 'મંદિરના લોકાર્પણનો ચાર દિવસનો ભવ્ય મહોત્સવ, જેમાં વૈદિક યજ્ઞ, પવિત્ર મંત્રોચ્ચાર અને પૂજાવિધિ સંપન્ન થયા.',
      milestone2Period: '૨૬ નવેમ્બર ૨૦૨૫',
      milestone2Title: 'પ્રાણપ્રતિષ્ઠા વિધિનો મંગળારંભ',
      milestone2Desc: 'શ્રી દ્વારકાધીશ મંદિર, શિરગાવ (વિરાર પૂર્વ) ખાતે પ્રાણપ્રતિષ્ઠા વિધિઓનો પ્રારંભ થયો.',
      milestone3Period: 'લોકાર્પણ મહોત્સવ',
      milestone3Title: 'ભક્તો માટે મંદિરના દ્વાર ખુલ્યા',
      milestone3Desc: 'ઉદ્ઘાટન ઉત્સવ દરમિયાન મંદિર તમામ દર્શનાર્થીઓ માટે ખુલ્લું મુકાયું અને હજારો ભક્તો દર્શને આવ્યા.',
      milestone4Period: 'આધ્યાત્મિક સાન્નિધ્ય',
      milestone4Title: 'પૂજ્ય સંતોના આશીર્વાદ',
      milestone4Desc: 'જગદ્ગુરુ શંકરાચાર્ય સ્વામી અવિમુક્તેશ્વરાનંદ સરસ્વતીજી આ ઉદ્ઘાટન સમારોહ સાથે જોડાયેલા રહ્યા અને આશીર્વાદ આપ્યા.',
    },
  }[language];

  const timelineItems = [
    {
      period: content.milestone1Period,
      title: content.milestone1Title,
      desc: content.milestone1Desc,
      icon: Calendar,
    },
    {
      period: content.milestone2Period,
      title: content.milestone2Title,
      desc: content.milestone2Desc,
      icon: Sparkles,
    },
    {
      period: content.milestone3Period,
      title: content.milestone3Title,
      desc: content.milestone3Desc,
      icon: Users,
    },
    {
      period: content.milestone4Period,
      title: content.milestone4Title,
      desc: content.milestone4Desc,
      icon: Crown,
    },
  ];

  return (
    <div className="relative w-full mb-20 lg:mb-28">
      {/* Chapter 03 Monumental Maroon and Gold Container */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-gradient-to-b from-[#741C24] via-[#5C141C] to-[#3F291D] text-[#FFFDF7] p-8 sm:p-12 lg:p-16 border-2 border-[#C29A54] shadow-[0_24px_60px_rgba(116,28,36,0.25)] overflow-hidden"
      >
        {/* Subtle Decorative Golden Particle Background Motifs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-[#C29A54]" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-[#C29A54]" />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-[#E8C784] blur-[1px]" />
          <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#E8C784] blur-[2px]" />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-[#E8C784] blur-[1px]" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase bg-[#C29A54]/25 text-[#E8C784] border border-[#C29A54]/50 mb-3">
            {content.chapterKicker}
          </span>

          <h3 className="font-serif-royal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFDF7] tracking-tight mb-3">
            {content.heading}
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-[#F1E3CC]/90 font-serif leading-relaxed font-normal max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        {/* ===================================================================
            HERO DATE CALLOUT: 26 NOVEMBER 2025
           =================================================================== */}
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <motion.div
            initial={reducedMotion ? false : { scale: 0.94, opacity: 0 }}
            whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative px-8 sm:px-14 py-8 rounded-3xl bg-[#3F291D]/80 border-2 border-[#C29A54] shadow-2xl backdrop-blur-md"
          >
            {/* Corner Temple Ornamental Accents */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#E8C784]" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#E8C784]" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#E8C784]" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#E8C784]" />

            <div className="flex items-center justify-center gap-2 mb-2">
              <DiyaAccent animated={!reducedMotion} />
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#E8C784] font-bold">
                SACRED PRAN PRATISHTHA CONSECRATION
              </span>
              <DiyaAccent animated={!reducedMotion} />
            </div>

            {/* Monumental Typography for the Consecration Date */}
            <h4 className="font-serif-royal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FFFDF7] tracking-tight my-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              {content.mainDate}
            </h4>

            <p className="font-cinzel text-sm sm:text-base md:text-lg text-[#E8C784] tracking-wider uppercase font-semibold mt-2">
              {content.mainDateLocation}
            </p>
          </motion.div>
        </div>

        {/* ===================================================================
            SECONDARY CEREMONIAL TIMELINE (4 MILESTONES)
           =================================================================== */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {timelineItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: 'easeOut' }}
                className="bg-[#3F291D]/70 rounded-2xl p-6 sm:p-7 border border-[#C29A54]/60 hover:border-[#E8C784] shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-cinzel text-xs font-bold tracking-wider text-[#E8C784] px-3 py-1 rounded-full bg-[#741C24] border border-[#C29A54]/50">
                    {item.period}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#C29A54]/20 border border-[#C29A54]/60 flex items-center justify-center text-[#E8C784]">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                </div>

                <h5 className="font-serif-royal text-xl font-bold text-[#FFFDF7] mb-2">
                  {item.title}
                </h5>

                <p className="text-sm sm:text-base text-[#F1E3CC]/85 leading-relaxed font-serif">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </div>
  );
};
