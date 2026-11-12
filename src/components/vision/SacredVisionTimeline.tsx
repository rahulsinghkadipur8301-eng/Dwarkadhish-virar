import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, FluteDivider } from '../KrishnaMotifs';

export interface SacredVisionTimelineProps {
  language: Language;
  reducedMotion?: boolean;
}

export const SacredVisionTimeline: React.FC<SacredVisionTimelineProps> = ({
  language,
  reducedMotion,
}) => {
  const [activeCard, setActiveCard] = useState<number>(1);

  const content = {
    en: {
      heading: 'From a Sacred Wish to a Living Temple',
      subheading: 'The devotion that inspired a spiritual landmark in Virar.',
      card1Category: 'PUBLIC LIFE',
      card1Title: 'Former Mayor of Vasai–Virar',
      card1Desc: 'Recognized for public civic leadership, guiding municipal growth and community welfare across the Vasai–Virar region.',
      card1Highlight: 'Civic Leadership & Public Service',
      card2Category: 'TEMPLE VISION',
      card2Title: 'Initiative linked to Shri Dwarkadhish Temple',
      card2Desc: 'Devotional aspiration to establish a grand sanctuary in Shirgaon, Virar East, bringing the blessings of Bhagwan Dwarkadhish to regional devotees.',
      card2Highlight: 'Shirgaon, Virar East Sanctuary',
      card3Category: 'INAUGURATION',
      card3Title: 'Pran Pratishtha Mahotsav — 26–29 November 2025',
      card3Desc: 'The culmination of a long-held devotional wish: four days of Vedic consecration ceremonies opening the mandir to all pilgrims.',
      card3Highlight: 'Four-Day Consecration Mahotsav',
    },
    hi: {
      heading: 'एक पावन संकल्प से सजीव मंदिर तक',
      subheading: 'वह अनन्य भक्ति जिसने विरार में एक दिव्य तीर्थ को प्रेरित किया।',
      card1Category: 'जनसेवा व नेतृत्व',
      card1Title: 'वसई-विरार की पूर्व महापौर',
      card1Desc: 'सार्वजनिक नागरिक नेतृत्व, जनकल्याण और वसई-विरार क्षेत्र के समग्र विकास में अग्रणी भूमिका के लिए सम्मानित।',
      card1Highlight: 'नागरिक नेतृत्व एवं समर्पण',
      card2Category: 'मंदिर का पावन संकल्प',
      card2Title: 'श्री द्वारकाधीश मंदिर की स्थापना से जुड़ा संकल्प',
      card2Desc: 'शिरगांव (विरार पूर्व) में एक भव्य धाम की स्थापना का आध्यात्मिक भाव, जिससे क्षेत्र के श्रद्धालुओं को द्वारकाधीश के दर्शन सुलभ हो सकें।',
      card2Highlight: 'शिरगांव, विरार पूर्व तीर्थ',
      card3Category: 'भव्य उद्घाटन',
      card3Title: 'प्राण प्रतिष्ठा महोत्सवा — 26–29 नवंबर 2025',
      card3Desc: 'दीर्घकालिक भक्ति संकल्प की पावन पूर्णता: चार दिवसीय वैदिक प्राण प्रतिष्ठा अनुष्ठान, जिसके साथ मंदिर श्रद्धालुओं के लिए खुला।',
      card3Highlight: 'चार दिवसीय प्राण प्रतिष्ठा महोत्सव',
    },
    mr: {
      heading: 'एका पवित्र संकल्पातून सजीव मंदिराची निर्मिती',
      subheading: 'ज्या भक्तीने विरारमध्ये एका पावन आध्यात्मिक केंद्राला जन्म दिला.',
      card1Category: 'नागरी नेतृत्व',
      card1Title: 'वसई-विरारच्या माजी महापौर',
      card1Desc: 'सार्वजनिक नागरी नेतृत्व, लोककल्याण आणि वसई-विरार परिसराच्या विकासातील अग्रगण्य योगदानाबद्दल आदराचे स्थान.',
      card1Highlight: 'लोककल्याण व नागरी सेवा',
      card2Category: 'मंदिराचा संकल्प',
      card2Title: 'श्री द्वारकाधीश मंदिराच्या उभारणीशी जोडलेला पुढाकार',
      card2Desc: 'शिरगाव (विरार पूर्व) येथे एका भव्य मंदिराची स्थापना करण्याचा भाव, ज्यामुळे स्थानिक भाविकांना द्वारकाधीशांचे दर्शन लाभले.',
      card2Highlight: 'शिरगाव, विरार पूर्व पावन भूमी',
      card3Category: 'भव्य उद्घाटन',
      card3Title: 'प्राणप्रतिष्ठा महोत्सव — २६–२९ नोव्हेंबर २०२५',
      card3Desc: 'दीर्घकालीन भक्ती संकल्पाची पूर्तता: चार दिवसांचा वैदिक प्राणप्रतिष्ठा सोहळा, ज्याने मंदिराची कवाडे भाविकांसाठी खुली केली.',
      card3Highlight: 'चार दिवसीय प्राणप्रतिष्ठा महोत्सव',
    },
    gu: {
      heading: 'એક પવિત્ર સંકલ્પથી જીવંત મંદિર સુધી',
      subheading: 'એ ભક્તિ જેણે વિરારમાં એક દિવ્ય તીર્થને પ્રેરિત કર્યું.',
      card1Category: 'લોકસેવા અને નેતૃત્વ',
      card1Title: 'વસઈ-વિરારના પૂર્વ મેયર',
      card1Desc: 'જાહેર નાગરિક નેતૃત્વ, પ્રજાકલ્યાણ અને વસઈ-વિરાર ક્ષેત્રના સર્વાંગી વિકાસમાં અગ્રેસર ભૂમિકા માટે સન્માનિત.',
      card1Highlight: 'નાગરિક સેવા અને નેતૃત્વ',
      card2Category: 'મંદિરનો સંકલ્પ',
      card2Title: 'શ્રી દ્વારકાધીશ મંદિરના નિર્માણ સાથે જોડાયેલી પહેલ',
      card2Desc: 'શિરગાવ (વિરાર પૂર્વ) ખાતે ભવ્ય મંદિર સ્થાપવાનો આધ્યાત્મિક ભાવ, જેથી ક્ષેત્રના ભક્તોને દ્વારકાધીશના દર્શન સુલભ થાય.',
      card2Highlight: 'શિરગાવ, વિરાર પૂર્વ ધામ',
      card3Category: 'ભવ્ય પ્રાણપ્રતિષ્ઠા',
      card3Title: 'પ્રાણપ્રતિષ્ઠા મહોત્સવ — ૨૬–૨૯ નવેમ્બર ૨૦૨૫',
      card3Desc: 'દીર્ઘકાલીન ભક્તિ સંકલ્પની મંગલ પૂર્ણાહુતિ: ચાર દિવસીય વૈદિક પ્રાણપ્રતિષ્ઠા વિધિ, જેની સાથે મંદિર ભક્તો માટે ખુલ્લું મુકાયું.',
      card3Highlight: 'ચાર દિવસીય પ્રાણપ્રતિષ્ઠા ઉત્સવ',
    },
  }[language];

  const milestones = [
    {
      id: 0,
      category: content.card1Category,
      title: content.card1Title,
      desc: content.card1Desc,
      highlight: content.card1Highlight,
      icon: Landmark,
      roman: 'I',
    },
    {
      id: 1,
      category: content.card2Category,
      title: content.card2Title,
      desc: content.card2Desc,
      highlight: content.card2Highlight,
      icon: Heart,
      roman: 'II',
    },
    {
      id: 2,
      category: content.card3Category,
      title: content.card3Title,
      desc: content.card3Desc,
      highlight: content.card3Highlight,
      icon: Calendar,
      roman: 'III',
    },
  ];

  return (
    <div className="relative w-full mb-20 lg:mb-28">
      {/* Chapter 02 Section Heading */}
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
            CHAPTER 02 · SACRED MILESTONES
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

      {/* Connected Milestone Journey Line (Desktop) */}
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] bg-gradient-to-r from-[#C29A54]/20 via-[#C29A54] to-[#C29A54]/20 -translate-y-8 pointer-events-none" />

        {/* Three Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            const isActive = activeCard === idx;

            return (
              <motion.div
                key={m.id}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeOut' }}
                onClick={() => setActiveCard(idx)}
                className={`group relative rounded-2xl p-7 sm:p-8 cursor-pointer transition-all duration-300 border-2 flex flex-col justify-between text-left ${
                  isActive
                    ? 'bg-[#FFFDF7] border-[#C29A54] shadow-[0_16px_40px_rgba(194,154,84,0.18)] scale-[1.02]'
                    : 'bg-[#FFFDF7]/75 hover:bg-[#FFFDF7] border-[#F1E3CC] hover:border-[#C29A54]/60 shadow-xs'
                }`}
              >
                {/* Top Badge & Roman Numeral */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-cinzel text-xs font-bold tracking-widest text-[#741C24] px-3 py-1 rounded-full bg-[#F1E3CC]/70 border border-[#C29A54]/40">
                      {m.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#FAF4E8] border border-[#C29A54]/50 flex items-center justify-center font-cinzel font-bold text-xs text-[#C29A54]">
                      {m.roman}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                      isActive
                        ? 'bg-[#741C24] text-white shadow-md'
                        : 'bg-[#F1E3CC] text-[#3F291D] group-hover:bg-[#C29A54] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#3F291D] mb-3 group-hover:text-[#741C24] transition-colors leading-snug">
                    {m.title}
                  </h4>

                  <p className="text-sm sm:text-base text-[#3F291D]/80 leading-relaxed mb-6 font-medium">
                    {m.desc}
                  </p>
                </div>

                {/* Footer Highlight Pill */}
                <div className="pt-4 border-t border-[#F1E3CC] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C29A54]" />
                  <span className="text-xs font-cinzel text-[#741C24] tracking-wider uppercase font-semibold">
                    {m.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
