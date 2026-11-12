import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  Copy,
  Check,
  ZoomIn,
  Download,
  Image as ImageIcon,
  X,
  ShieldAlert,
  Building2,
  Info,
} from 'lucide-react';
import { Language } from '../data/templeData';
import { DiyaAccent, LotusOrnament, PeacockFeather } from './KrishnaMotifs';

export interface TempleDonationSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

export const TempleDonationSection: React.FC<TempleDonationSectionProps> = ({
  language,
  reducedMotion,
}) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'qr'>('poster');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard shortcut: close lightbox with Escape key
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const officialUpiId = 'dwarkadhish.shirgaon@upi';
  const posterSrc = '/temple_donation_poster.png';
  const qrSrc = '/temple_donation_qr.png';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleDownloadPoster = () => {
    const link = document.createElement('a');
    link.href = posterSrc;
    link.download = 'Shri_Dwarkadhish_Mandir_Online_Donation_Poster.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contentRecord = {
    en: {
      eyebrow: 'SUPPORT THE TEMPLE',
      title: 'Devotional Contributions',
      subtitle:
        'A simple and respectful way for devotees to support temple activities, when approved by temple management.',
      explanationHeading: 'Devotional Seva & Temple Upkeep',
      explanationBody:
        'Devotees wishing to offer seva or contributions are invited to support the temple’s daily aartis, satvik mahaprasad, sanctum flower offerings, and courtyard upkeep.',
      entityLabel: 'Receiving Entity',
      entityName: 'Shri Dwarkadhish Mandir Trust',
      entityAddress: 'Shirgaon, Virar East, Taluka Vasai, Palghar District, Maharashtra 401305',
      demoNotice:
        'Presentation Preview: Online contribution gateways will be enabled upon formal institutional bank authorization and trust receipt protocols.',
      qrHeading: 'Official Contribution Portal',
      qrScanInstruction: 'Scan with Google Pay, PhonePe, BHIM, or Paytm',
      posterTab: 'Ornate Seva Poster',
      qrTab: 'Monochrome QR Code',
      zoomPoster: 'Click to enlarge full poster',
      btnDownload: 'Download Official Poster',
      btnFullView: 'Full View',
      upiIdLabel: 'Official UPI VPA',
      btnCopyUpi: 'Copy UPI ID',
      btnCopied: 'Copied to Clipboard!',
      securityNotice:
        'Security Notice: The temple administration will never ask for your UPI PIN, ATM PIN, bank password, or OTP. Never share confidential credentials.',
      posterCaption: 'Official Shri Dwarkadhish Mandir Virar (East) Online Donation Artwork',
    },
    hi: {
      eyebrow: 'मंदिर सेवा सहयोग',
      title: 'पावन समर्पण',
      subtitle:
        'मंदिर प्रबंधन द्वारा अनुमोदित पावन कार्यों में सहयोग हेतु श्रद्धालुओं के लिए एक आदरपूर्ण एवं सरल माध्यम।',
      explanationHeading: 'भक्ति सेवा एवं मंदिर शुचिता',
      explanationBody:
        'श्रद्धालु नित्य आरती, सात्त्विक महाप्रसाद, नंदादीप गोघृत, प्रभु शृंगार पुष्प एवं मंदिर प्रांगण की शुचिता में अपना पावन सहयोग अर्पित कर सकते हैं।',
      entityLabel: 'अधिकृत प्राप्ति संस्था',
      entityName: 'श्री द्वारकाधीश मंदिर ट्रस्ट',
      entityAddress: 'शिरगांव, विरार पूर्व, तालुका वसई, पालघर जिला, महाराष्ट्र 401305',
      demoNotice:
        'प्रस्तुति प्रारूप: मंदिर ट्रस्ट की औपचारिक बैंक अनुमति एवं रसीद व्यवस्था पूर्ण होने पर ऑनलाइन भुगतान सुविधा सक्रिय होगी।',
      qrHeading: 'पावन सेवा समर्पण पोर्टल',
      qrScanInstruction: 'गूगल पे, फोनपे, भीम या पेटीएम से स्कैन करें',
      posterTab: 'पावन सेवा पोस्टर',
      qrTab: 'क्यूआर कोड',
      zoomPoster: 'बड़ा पोस्टर देखने हेतु क्लिक करें',
      btnDownload: 'आधिकारिक पोस्टर डाउनलोड करें',
      btnFullView: 'विस्तृत दृश्य',
      upiIdLabel: 'आधिकारिक यूपीआई पता',
      btnCopyUpi: 'यूपीआई आईडी कॉपी करें',
      btnCopied: 'कॉपी हो गई!',
      securityNotice:
        'सुरक्षा चेतावनी: मंदिर प्रशासन कभी भी आपका यूपीआई पिन, बैंक पासवर्ड अथवा ओटीपी नहीं मांगता। अपनी गोपनीय जानकारी कभी साझा न करें।',
      posterCaption: 'श्री द्वारिकाधीश मंदिर विरार (पूर्व) आधिकारिक सेवा समर्पण पोस्टर',
    },
    mr: {
      eyebrow: 'मंदिरासाठी सहकार्य',
      title: 'भक्ती समर्पण',
      subtitle:
        'मंदिर व्यवस्थापनाने अधिकृत केलेल्या उपक्रमांमध्ये भक्तीभावाने सहकार्य करण्याचा एक आदरपूर्वक व सुलभ मार्ग.',
      explanationHeading: 'पवित्र सेवा आणि मंदिर व्यवस्थापन',
      explanationBody:
        'भाविक नित्य आरती, सात्त्विक महाप्रसाद, नंदादीप, प्रभु शृंगार व मंदिर प्रांगण स्वच्छतेसाठी आपले पावन सहकार्य अर्पण करू शकतात.',
      entityLabel: 'अधिकृत संस्था',
      entityName: 'श्री द्वारकाधीश मंदिर ट्रस्ट',
      entityAddress: 'शिरगाव, विरार पूर्व, तालुका वसई, पालघर जिल्हा, महाराष्ट्र ४०१३०५',
      demoNotice:
        'सादरीकरण प्रारूप: मंदिर ट्रस्टची औपचारिक बँक मंजुरी व पावती प्रक्रिया पूर्ण झाल्यावर ऑनलाइन प्रणाली सुरू होईल.',
      qrHeading: 'अधिकृत सेवा समर्पण पोर्टल',
      qrScanInstruction: 'Google Pay, PhonePe, BHIM किंवा Paytm द्वारे स्कॅन करा',
      posterTab: 'अधिकृत सेवा पोस्टर',
      qrTab: 'क्यूआर कोड',
      zoomPoster: 'मोठा पोस्टर पाहण्यासाठी क्लिक करा',
      btnDownload: 'अधिकृत पोस्टर डाउनलोड करा',
      btnFullView: 'विस्तृत दृश्य',
      upiIdLabel: 'अधिकृत यूपीआई पत्ता',
      btnCopyUpi: 'यूपीआई आयडी कॉपी करा',
      btnCopied: 'कॉपी झाले!',
      securityNotice:
        'सुरक्षा सूचना: मंदिर प्रशासन कधीही आपला यूपीआई पिन, बँक पासवर्ड किंवा ओटीपी मागत नाही. गुप्त माहिती कोणाशीही शेअर करू नका.',
      posterCaption: 'श्री द्वारकाधीश मंदिर विरार (पूर्व) अधिकृत देणगी पोस्टर',
    },
    gu: {
      eyebrow: 'મંદિર સેવા સહયોગ',
      title: 'ભક્તિ સમર્પણ',
      subtitle:
        'મંદિર પ્રશાસન દ્વારા સ્વીકૃત સેવાકીય કાર્યોમાં સહયોગ આપવા માટે ભક્તો માટે એક આદરપૂર્ણ અને સરળ માધ્યમ.',
      explanationHeading: 'ભક્તિ સેવા અને મંદિર સંરક્ષણ',
      explanationBody:
        'ભક્તો નિત્ય આરતી, સાત્ત્વિક મહાપ્રસાદ, નંદાદીપ, પ્રભુ શૃંગાર અને પરિસર સ્વચ્છતા માટે પોતાનો પાવન સહયોગ અર્પી શકે છે.',
      entityLabel: 'સત્તાવાર સંસ્થા',
      entityName: 'શ્રી દ્વારકાધીશ મંદિર ટ્રસ્ટ',
      entityAddress: 'શિરગાવ, વિરાર પૂર્વ, તાલુકો વસઈ, પાલઘર જિલ્લો, મહારાષ્ટ્ર ૪૦૧૩૦૫',
      demoNotice:
        'પ્રસ્તુતિ પ્રારૂપ: મંદિર ટ્રસ્ટની સત્તાવાર બેંક મંજૂરી અને પહોંચ પ્રક્રિયા પૂર્ણ થયા પછી ઓનલાઇન સેવા સક્રિય થશે.',
      qrHeading: 'સત્તાવાર સેવા સમર્પણ પોર્ટલ',
      qrScanInstruction: 'Google Pay, PhonePe, BHIM અથવા Paytm દ્વારા સ્કેન કરો',
      posterTab: 'સત્તાવાર સેવા પોસ્ટર',
      qrTab: 'ક્યૂઆર કોડ',
      zoomPoster: 'મોટું પોસ્ટર જોવા માટે ક્લિક કરો',
      btnDownload: 'સત્તાવાર પોસ્ટર ડાઉનલોડ કરો',
      btnFullView: 'વિસ્તૃત દ્રશ્ય',
      upiIdLabel: 'સત્તાવાર યુપીઆઈ આઈડી',
      btnCopyUpi: 'યુપીઆઈ આઈડી કોપી કરો',
      btnCopied: 'કોપી થઈ ગયું!',
      securityNotice:
        'સુરક્ષા ચેતવણી: મંદિર વહીવટીતંત્ર ક્યારેય તમારો યુપીઆઈ પિન, પાસવર્ડ કે ઓટીપી પૂછતું નથી. ગુપ્ત માહિતી ક્યારેય જાહેર ન કરવી.',
      posterCaption: 'શ્રી દ્વારકાધીશ મંદિર વિરાર (પૂર્વ) સત્તાવાર સેવા સમર્પણ પોસ્ટર',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  return (
    <section
      id="donation"
      aria-label="Devotional Contributions — Support Shri Dwarkadhish Mandir"
      className="relative w-full bg-[#FFFDF8] text-[#3F291D] py-16 sm:py-20 lg:py-24 border-b-2 border-[#C29A54]/60 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 flex flex-col gap-10 sm:gap-14">
        
        {/* ===================================================================
            HEADER: SUPPORT THE TEMPLE · Devotional Contributions
           =================================================================== */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center gap-2.5 mb-2.5"
          >
            <PeacockFeather size={20} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#C29A54] font-bold">
              {c.eyebrow}
            </span>
            <PeacockFeather size={20} className="transform scale-x-[-1]" />
          </motion.div>

          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#741C24] tracking-tight mb-3"
          >
            {c.title}
          </motion.h2>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14, ease: 'easeOut' }}
            className="text-sm sm:text-base md:text-lg text-[#3F291D]/85 font-serif max-w-2xl mx-auto leading-relaxed"
          >
            {c.subtitle}
          </motion.p>
        </div>

        {/* ===================================================================
            REFINED TWO-COLUMN LAYOUT (52% Left / 48% Right Desktop)
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* =================================================================
              LEFT COLUMN (52% Desktop — lg:col-span-6 xl:col-span-6)
             ================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
            
            {/* Devotional Explanation Box */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="rounded-3xl p-6 sm:p-7 bg-[#FFFDF8] border-2 border-[#C29A54]/70 shadow-[0_8px_30px_rgba(194,154,84,0.08)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <DiyaAccent animated={!reducedMotion} />
                <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#741C24]">
                  {c.explanationHeading}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#3F291D]/90 font-serif leading-relaxed mb-6">
                {c.explanationBody}
              </p>

              {/* Receiving Entity Details */}
              <div className="p-4 rounded-2xl bg-[#FAF4E8] border border-[#C29A54]/50 flex items-start gap-3.5">
                <Building2 className="w-5 h-5 text-[#C29A54] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#C29A54] mb-0.5">
                    {c.entityLabel}
                  </span>
                  <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#3F291D]">
                    {c.entityName}
                  </h4>
                  <p className="text-xs text-[#3F291D]/80 font-serif leading-relaxed mt-0.5">
                    {c.entityAddress}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Subtle Institutional Preview Note */}
            <div className="rounded-2xl p-4 sm:p-5 bg-[#FAF4E8]/80 border border-[#C29A54]/40 flex items-start gap-3 text-xs sm:text-sm text-[#741C24] font-serif leading-relaxed">
              <Info className="w-4.5 h-4.5 text-[#C29A54] shrink-0 mt-0.5" />
              <p>{c.demoNotice}</p>
            </div>

          </div>

          {/* =================================================================
              RIGHT COLUMN: PREMIUM QR PRESENTATION CARD (48% Desktop)
             ================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center">
            
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E8] to-[#F1E3CC] border-2 border-[#C29A54] shadow-[0_16px_45px_rgba(63,41,29,0.12)] text-center flex flex-col items-center w-full max-w-[440px]"
            >
              {/* Header with Motifs */}
              <div className="flex items-center gap-2 mb-1.5">
                <LotusOrnament size={20} className="text-[#C29A54]" />
                <span className="font-cinzel text-xs uppercase tracking-widest text-[#741C24] font-bold">
                  {c.qrHeading}
                </span>
                <LotusOrnament size={20} className="text-[#C29A54]" />
              </div>

              <p className="text-xs text-[#3F291D]/80 font-serif mb-4">
                {c.qrScanInstruction}
              </p>

              {/* View Switcher: Ornate Poster vs Monochrome QR */}
              <div className="flex items-center bg-[#FAF4E8] p-1 rounded-xl border border-[#C29A54]/60 mb-5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('poster')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                    activeTab === 'poster'
                      ? 'bg-[#741C24] text-white shadow-xs'
                      : 'text-[#3F291D] hover:bg-black/5'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{c.posterTab}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('qr')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                    activeTab === 'qr'
                      ? 'bg-[#741C24] text-white shadow-xs'
                      : 'text-[#3F291D] hover:bg-black/5'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{c.qrTab}</span>
                </button>
              </div>

              {/* The Display Showcase Container */}
              <div className="relative rounded-2xl bg-white border-2 border-[#C29A54] shadow-md mb-4 w-full overflow-hidden p-2 group">
                {activeTab === 'poster' ? (
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative cursor-pointer aspect-[1199/1312] w-full rounded-xl overflow-hidden bg-[#FAF4E8] flex items-center justify-center"
                    title={c.zoomPoster}
                  >
                    <img
                      src={posterSrc}
                      alt="Shri Dwarkadhish Mandir Virar (East) Official Ornate Online Donation Poster"
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-102"
                      loading="lazy"
                    />
                    
                    {/* Zoom Icon Button Overlay */}
                    <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-[#741C24] text-white transition-colors shadow-md z-10">
                      <ZoomIn className="w-4 h-4 text-[#E8C784]" />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative cursor-pointer aspect-square w-full rounded-xl overflow-hidden bg-white p-4 flex items-center justify-center"
                    title={c.zoomPoster}
                  >
                    <img
                      src={qrSrc}
                      alt="Official Shri Dwarkadhish Mandir UPI Donation QR Code"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />

                    <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-[#741C24] text-white transition-colors shadow-md z-10">
                      <ZoomIn className="w-4 h-4 text-[#E8C784]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Download Poster & Full View */}
              <div className="w-full flex flex-col sm:flex-row items-center gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={handleDownloadPoster}
                  className="w-full sm:flex-1 py-2 px-3 rounded-xl text-xs font-cinzel font-bold text-[#741C24] bg-white hover:bg-[#FAF4E8] border border-[#C29A54] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                >
                  <Download className="w-3.5 h-3.5 text-[#C29A54]" />
                  <span>{c.btnDownload}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full sm:w-auto py-2 px-3 rounded-xl text-xs font-cinzel font-bold text-[#3F291D] bg-white hover:bg-[#FAF4E8] border border-[#C29A54] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#C29A54]" />
                  <span>{c.btnFullView}</span>
                </button>
              </div>

              {/* UPI ID Copy Section */}
              <div className="w-full p-3.5 rounded-xl bg-white border border-[#C29A54]/60 flex items-center justify-between gap-2 mb-4">
                <div className="text-left overflow-hidden">
                  <span className="block text-[10px] uppercase font-cinzel tracking-wider text-[#C29A54] font-semibold">
                    {c.upiIdLabel}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#3F291D] truncate block">
                    {officialUpiId}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#741C24] hover:bg-[#5A141B] text-white flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-xs active:scale-95"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#E8C784]" />
                      <span>{c.btnCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{c.btnCopyUpi}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Security Notice */}
              <div className="w-full text-left p-3 rounded-xl bg-[#FAF4E8] border border-[#C29A54]/40 flex items-start gap-2 text-[11px] text-[#3F291D]/80 font-serif leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-[#921B2C] shrink-0 mt-0.5" />
                <span>{c.securityNotice}</span>
              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* ===================================================================
          HIGH-RESOLUTION POSTER LIGHTBOX MODAL
         =================================================================== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-4xl w-full bg-[#241711] rounded-3xl overflow-hidden border-2 border-[#C29A54] shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 bg-[#2B1B13] border-b border-[#C29A54]/40 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-[#E8C784] block mb-0.5">
                    {c.eyebrow}
                  </span>
                  <h4 className="font-serif-royal text-base sm:text-lg font-bold text-[#FFFDF8]">
                    {c.posterCaption}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPoster}
                    className="p-2 rounded-full bg-[#741C24] hover:bg-[#5A141B] text-white transition-colors cursor-pointer"
                    title={c.btnDownload}
                  >
                    <Download className="w-4 h-4 text-[#E8C784]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(false)}
                    className="p-2 rounded-full bg-black/70 hover:bg-[#741C24] text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-[#E8C784]" />
                  </button>
                </div>
              </div>

              {/* Full Image Stage: Strictly object-contain so zero pixels are cropped */}
              <div className="relative flex-1 p-3 bg-black flex items-center justify-center overflow-auto max-h-[72vh]">
                <img
                  src={activeTab === 'poster' ? posterSrc : qrSrc}
                  alt="Full resolution Shri Dwarkadhish Mandir donation visual"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Bottom Instructions Footer */}
              <div className="p-3 sm:p-4 bg-[#2B1B13] border-t border-[#C29A54]/40 text-center text-xs text-[#FAF4E8]/90 font-serif flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[#E8C784]">{officialUpiId}</span>
                <span className="text-[#FAF4E8]/70">Shri Dwarkadhish Mandir · Shirgaon, Virar East</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#741C24] text-white hover:bg-[#5A141B]"
                >
                  {copiedUpi ? c.btnCopied : c.btnCopyUpi}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
