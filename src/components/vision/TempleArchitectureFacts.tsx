import React from 'react';
import { motion } from 'motion/react';
import { Landmark, ArrowUpRight, Layers, Hammer, Compass, Flag, Award } from 'lucide-react';
import { Language } from '../../data/templeData';
import { PeacockFeather, FluteDivider } from '../KrishnaMotifs';

export interface TempleArchitectureFactsProps {
  language: Language;
  reducedMotion?: boolean;
}

export const TempleArchitectureFacts: React.FC<TempleArchitectureFactsProps> = ({
  language,
  reducedMotion,
}) => {
  const content = {
    en: {
      chapterKicker: 'CHAPTER 04 · SACRED CRAFTSMANSHIP',
      heading: 'Temple Architecture & Key Facts',
      subheading: 'Masterful sandstone engineering following timeless Shilpa Shastra traditions in Shirgaon, Virar East.',
      fact1Feature: 'Architectural Style',
      fact1Value: 'Nagara Style',
      fact1Desc: 'Traditional curvilinear shikhara geometry characteristic of revered North and Western Indian sanctuaries.',
      fact2Feature: 'Shrine Height',
      fact2Value: 'Approximately 90 Feet',
      fact2Desc: 'Majestic vertical presence rising above the coastal greens of Shirgaon, visible across the landscape.',
      fact3Feature: 'Stone Material',
      fact3Value: 'Bansi Paharpur Stone',
      fact3Desc: 'Celebrated pink-hued durable sandstone renowned for royal temple carvings across centuries.',
      fact4Feature: 'Construction Technique',
      fact4Value: 'Interlocking Construction',
      fact4Desc: 'Mortar-free interlocking stone joinery engineered for enduring centuries of coastal weather.',
      fact5Feature: 'Grand Entrance',
      fact5Value: '56 Sacred Steps',
      fact5Desc: 'Ceremonial ascending staircase evoking Chhappan Bhog devotion before the sanctum portal.',
      fact6Feature: 'Sacred Temple Flag',
      fact6Value: '52-Gaj Dhwaja',
      fact6Desc: 'Auspicious consecrated yellow flag unfurling gracefully atop the shikhara spire.',
      fact7Feature: 'Artisan Tradition',
      fact7Value: 'Sompura Tradition',
      fact7Desc: 'Sculpted by master stone carvers linked to the legendary Sompura lineage of temple builders.',
    },
    hi: {
      chapterKicker: 'अध्याय 04 · पावन वास्तुशिल्प',
      heading: 'मंदिर वास्तुकला एवं मुख्य तथ्य',
      subheading: 'शिरगांव (विरार पूर्व) में शिल्प शास्त्र की पावन परंपराओं पर आधारित भव्य बलुआ पत्थर निर्माण।',
      fact1Feature: 'स्थापत्य शैली',
      fact1Value: 'नागर शैली',
      fact1Desc: 'उत्तर एवं पश्चिम भारतीय ऐतिहासिक मंदिरों की पहचान: वक्ररेखीय शिखर और भव्य सभा मंडप।',
      fact2Feature: 'शिखर की ऊंचाई',
      fact2Value: 'लगभग 90 फीट',
      fact2Desc: 'शिरगांव के शांत वातावरण में आकाश की ओर अग्रसर भव्य और गरिमामय शिखरा।',
      fact3Feature: 'पाषाण सामग्री',
      fact3Value: 'बंसी पहाड़पुर गुलाबी पत्थर',
      fact3Desc: 'शताब्दियों से भव्य मंदिरों के निर्माण में प्रयुक्त विख्यात टिकाऊ बलुआ पत्थर।',
      fact4Feature: 'निर्माण विधि',
      fact4Value: 'इंटर लॉकिंग प्रस्तर निर्माण',
      fact4Desc: 'पारंपरिक इंटरलॉकिंग तकनीक, जो सदियों तक स्थायित्व सुनिश्चित करती है।',
      fact5Feature: 'प्रवेश सोपान',
      fact5Value: '56 पावन सीढ़ियां',
      fact5Desc: 'गर्भगृह के प्रवेश तक 56 भोग की भक्ति परंपरा का स्मरण कराती भव्य सीढ़ियां।',
      fact6Feature: 'पवित्र ध्वजा',
      fact6Value: '52-गज ध्वजा',
      fact6Desc: 'शिखर पर फहराती पावन पीत ध्वजा, जो सुदूर से भक्तों को प्रभु का संबल देती है।',
      fact7Feature: 'शिल्पकार परंपरा',
      fact7Value: 'सोमपुरा शिल्प परंपरा',
      fact7Desc: 'पारंपरिक सोमपुरा मंदिर निर्माण परंपरा से जुड़े सिद्धहस्त शिल्पकारों द्वारा हस्तनिर्मित नक्काशी।',
    },
    mr: {
      chapterKicker: 'अध्याय 04 · पावन वास्तुकला',
      heading: 'मंदिर वास्तुकला आणि प्रमुख वैशिष्ट्ये',
      subheading: 'शिल्पशास्त्राच्या प्राचीन नियमांनुसार शिरगाव (विरार पूर्व) येथे साकारलेले भव्य वालुकाश्म मंदिर.',
      fact1Feature: 'स्थापत्य शैली',
      fact1Value: 'नागर शैली',
      fact1Desc: 'पारंपरिक उत्तर भारतीय नागर पद्धतीचे वक्ररेखीय नक्षीदार शिखर आणि मंडप.',
      fact2Feature: 'शिखराची उंची',
      fact2Value: 'सुमारे ९० फूट',
      fact2Desc: 'शिरगावच्या विस्तीर्ण निसर्गरम्य पार्श्वभूमीवर उठून दिसणारे भव्य मंदिर शिखर.',
      fact3Feature: 'दगडाचा प्रकार',
      fact3Value: 'बन्सी पहाडपूर गुलाबी दगड',
      fact3Desc: 'राजेशाही मंदिरांसाठी वापरला जाणारा अत्यंत टिकाऊ व सुबक गुलाबी वालुकाश्म.',
      fact4Feature: 'बांधकाम तंत्र',
      fact4Value: 'इंटरलॉकिंग दगडी बांधकाम',
      fact4Desc: 'सिमेंट-विरहित खाचांच्या इंटरलॉकिंग पद्धतीने शतकानुशतके टिकणारे मजबुत बांधकाम.',
      fact5Feature: 'प्रवेश पायऱ्या',
      fact5Value: '५६ पावन पायऱ्या',
      fact5Desc: 'गर्भगृहाकडे जाणाऱ्या ५६ पायऱ्या ५६ भोगांच्या भक्तिभावाची अनुभूती देतात.',
      fact6Feature: 'पवित्र ध्वज',
      fact6Value: '५२-गज ध्वजा',
      fact6Desc: 'शिखराच्या शेंड्यावर वाऱ्यावर डोलणारा भव्य आणि पवित्र ५२-गज पिवळा ध्वज.',
      fact7Feature: 'शिल्प परंपरा',
      fact7Value: 'सोमपुरा परंपरा',
      fact7Desc: 'पिढ्यानपिढ्या मंदिर उभारणीत पारंगत असलेल्या सोमपुरा शिल्पकारांचे हस्तकौशल्य.',
    },
    gu: {
      chapterKicker: 'અધ્યાય 04 · પવિત્ર સ્થાપત્યકળા',
      heading: 'મંદિર સ્થાપત્ય અને મુખ્ય વિશિષ્ટતાઓ',
      subheading: 'શિરગાવ (વિરાર પૂર્વ) ખાતે પ્રાચીન શિલ્પશાસ્ત્ર પરંપરા અનુસાર કંડારાયેલું પવિત્ર સ્થાપત્ય.',
      fact1Feature: 'સ્થાપત્ય શૈલી',
      fact1Value: 'નાગર શૈલી',
      fact1Desc: 'પરંપરાગત નાગર પદ્ધતિ અનુસાર વળાંકવાળું ભવ્ય શિખર અને સભામંડપ.',
      fact2Feature: 'શિખરની ઊંચાઈ',
      fact2Value: 'આશરે ૯૦ ફૂટ',
      fact2Desc: 'વિરાર પૂર્વના પ્રાકૃતિક વાતાવરણમાં આકાશે વિરાજમાન ગૌરવપૂર્ણ શિખર.',
      fact3Feature: 'પથ્થર સામગ્રી',
      fact3Value: 'બંસી પહાડપુર ગુલાબી પથ્થર',
      fact3Desc: 'સદીઓથી ઐતિહાસિક મંદિરોના નિર્માણમાં વપરાતો સુવિખ્યાત ગુલાબી પથ્થર.',
      fact4Feature: 'બાંધકામ પદ્ધતિ',
      fact4Value: 'ઇન્ટરલોકિંગ પથ્થર બાંધકામ',
      fact4Desc: 'ચૂના-સિમેન્ટ વગરના પરંપરાગત ઇન્ટરલોકિંગ સાંધાથી થયેલું ચિરંતન નિર્માણ.',
      fact5Feature: 'પ્રવેશ પગથિયાં',
      fact5Value: '૫૬ પવિત્ર પગથિયાં',
      fact5Desc: '૫૬ ભોગની ભક્તિ સ્મૃતિ કરાવતી ભવ્ય સોપાન પરંપરા.',
      fact6Feature: 'પવિત્ર ધ્વજ',
      fact6Value: '૫૨-ગજ ધ્વજા',
      fact6Desc: 'શિખર પર ફરકતી પાવન ૫૨-ગજ પીળી ધ્વજા.',
      fact7Feature: 'શિલ્પ પરંપરા',
      fact7Value: 'સોમપુરા શિલ્પ પરંપરા',
      fact7Desc: 'સુપ્રસિદ્ધ સોમપુરા સ્થાપત્ય પરંપરાના પારંગત કારીગરો દ્વારા થયેલું નકશીકામ.',
    },
  }[language];

  const facts = [
    {
      feature: content.fact1Feature,
      value: content.fact1Value,
      desc: content.fact1Desc,
      icon: Landmark,
    },
    {
      feature: content.fact2Feature,
      value: content.fact2Value,
      desc: content.fact2Desc,
      icon: ArrowUpRight,
    },
    {
      feature: content.fact3Feature,
      value: content.fact3Value,
      desc: content.fact3Desc,
      icon: Layers,
    },
    {
      feature: content.fact4Feature,
      value: content.fact4Value,
      desc: content.fact4Desc,
      icon: Hammer,
    },
    {
      feature: content.fact5Feature,
      value: content.fact5Value,
      desc: content.fact5Desc,
      icon: Compass,
    },
    {
      feature: content.fact6Feature,
      value: content.fact6Value,
      desc: content.fact6Desc,
      icon: Flag,
    },
    {
      feature: content.fact7Feature,
      value: content.fact7Value,
      desc: content.fact7Desc,
      icon: Award,
    },
  ];

  return (
    <div className="relative w-full mb-20 lg:mb-28">
      {/* Chapter 04 Section Header */}
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

      {/* Museum-Grade Architectural Facts Exhibition Panel */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 25 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="relative bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-[#C29A54] shadow-[0_18px_50px_rgba(194,154,84,0.12)] overflow-hidden"
      >
        {/* Top Decorative Border Flute */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#741C24] via-[#C29A54] to-[#741C24]" />

        {/* 7 Facts Grid: Balanced responsive layout (desktop horizontal panel / mobile grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.slice(0, 4).map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-5 sm:p-6 bg-[#FAF4E8]/60 hover:bg-[#FAF4E8] border border-[#F1E3CC] hover:border-[#C29A54] transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#741C24]">
                    {f.feature}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#C29A54] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-serif-royal text-xl font-bold text-[#3F291D] mb-2 group-hover:text-[#741C24] transition-colors">
                  {f.value}
                </h4>

                <p className="text-xs sm:text-sm text-[#3F291D]/80 leading-relaxed font-serif">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Row 2: 3 Facts with wider horizontal presence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {facts.slice(4).map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-5 sm:p-6 bg-[#FAF4E8]/60 hover:bg-[#FAF4E8] border border-[#F1E3CC] hover:border-[#C29A54] transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#741C24]">
                    {f.feature}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F1E3CC] border border-[#C29A54]/50 flex items-center justify-center text-[#741C24] group-hover:bg-[#C29A54] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h4 className="font-serif-royal text-xl font-bold text-[#3F291D] mb-2 group-hover:text-[#741C24] transition-colors">
                  {f.value}
                </h4>

                <p className="text-xs sm:text-sm text-[#3F291D]/80 leading-relaxed font-serif">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
