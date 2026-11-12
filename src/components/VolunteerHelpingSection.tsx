import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Heart,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  X,
  Send,
  Calendar,
} from 'lucide-react';
import {
  Language,
  VOLUNTEER_ROLES,
  PATRON_SUPPORT_TIERS,
  VolunteerRole,
  PatronSupportTier,
} from '../data/templeData';
import { DiyaAccent, LotusOrnament, PeacockFeather } from './KrishnaMotifs';

export interface VolunteerHelpingSectionProps {
  language: Language;
  reducedMotion?: boolean;
}

export const VolunteerHelpingSection: React.FC<VolunteerHelpingSectionProps> = ({
  language,
  reducedMotion,
}) => {
  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    phone: '',
    email: '',
    availability: 'weekends',
    note: '',
  });

  const contentRecord = {
    en: {
      eyebrow: 'COMMUNITY & VOLUNTARY PARTICIPATION',
      title: 'Seva Volunteer Opportunities & Patron Stewardship',
      subtitle:
        'Devotees are cordially invited to participate in the sacred upkeep, pilgrim care, and daily devotional activities of Shri Dwarkadhish Mandir in Shirgaon.',
      volunteerHeading: 'Seva Volunteer Roles',
      volunteerSub: 'Give your time and devotion in service to pilgrims and the sanctum.',
      patronHeading: 'Patron Upkeep & Sanctuary Stewardship',
      patronSub: 'Support essential daily requirements: sanctum lamps, cleanliness, and fragrances.',
      btnVolunteer: 'Express Volunteer Interest',
      commitmentLabel: 'Commitment',
      departmentLabel: 'Area of Seva',
      guidelinesLabel: 'Devotional Guideline',
      monthlyLabel: 'Monthly Support (Proposed)',
      modalTitle: 'Volunteer Seva Expression of Interest',
      modalDesc: 'Please provide your details to join the Shri Dwarkadhish Sevak Pariwar.',
      nameLabel: 'Full Name',
      phoneLabel: 'Phone / WhatsApp Number',
      emailLabel: 'Email Address (Optional)',
      availLabel: 'Availability',
      availWeekend: 'Weekends & Festival Days',
      availWeekday: 'Weekday Mornings / Evenings',
      availFestivalsOnly: 'Major Festivals Only (Janmashtami, Annakut)',
      noteLabel: 'Previous Experience / Devotional Note',
      btnSubmit: 'Submit Volunteer Application',
      btnCancel: 'Cancel',
      successTitle: 'Seva Expression Received',
      successMsg:
        'Thank you for your noble desire to serve Lord Dwarkadhish and the pilgrim community. The temple administration will review your details and connect with you before upcoming festivals.',
      btnClose: 'Close',
    },
    hi: {
      eyebrow: 'सामुदायिक सत्संग एवं स्वैच्छिक सहभागिता',
      title: 'स्वैच्छिक सेवा अवसर एवं मंदिर शुचिता संरक्षक',
      subtitle:
        'शिरगांव स्थित श्री द्वारकाधीश मंदिर के पावन कार्यों, तीर्थयात्री सेवा एवं मंदिर व्यवस्था में सम्मिलित होने हेतु श्रद्धालुओं का आदरपूर्वक स्वागत है।',
      volunteerHeading: 'स्वैच्छिक सेवा भूमिकाएं',
      volunteerSub: 'तीर्थयात्रियों एवं गर्भगृह की सेवा में अपना समय व भक्तिभाव समर्पित करें।',
      patronHeading: 'संरक्षक सहयोग एवं मंदिर शुचिता',
      patronSub: 'गर्भगृह के नंदादीप, सुगंधित पुष्प एवं प्रांगण की नित्य शुचिता में सहयोग।',
      btnVolunteer: 'सेवा हेतु रुचि व्यक्त करें',
      commitmentLabel: 'समय प्रतिबद्धता',
      departmentLabel: 'सेवा प्रभाग',
      guidelinesLabel: 'भक्ति आचार संहिता',
      monthlyLabel: 'प्रस्तावित मासिक सहयोग',
      modalTitle: 'स्वैच्छिक सेवा सहभागिता आवेदन',
      modalDesc: 'श्री द्वारकाधीश सेवक परिवार से जुड़ने हेतु कृपया अपना विवरण प्रदान करें।',
      nameLabel: 'पूरा नाम',
      phoneLabel: 'फोन / व्हाट्सएप नंबर',
      emailLabel: 'ईमेल पता (वैकल्पिक)',
      availLabel: 'उपलब्धता',
      availWeekend: 'सप्ताहांत एवं पर्व दिवस',
      availWeekday: 'सप्ताह के कार्यदिवस (प्रातः / सांध्य)',
      availFestivalsOnly: 'केवल प्रमुख उत्सव (जन्माष्टमी, अन्नकूट)',
      noteLabel: 'पूर्व अनुभव / पावन संकल्प संदेश',
      btnSubmit: 'आवेदन सबमिट करें',
      btnCancel: 'रद्द करें',
      successTitle: 'सेवा भाव सादर स्वीकार',
      successMsg:
        'भगवान द्वारकाधीश एवं तीर्थयात्रियों की सेवा हेतु आपकी पावन भावना का हम सादर अभिनंदन करते हैं। मंदिर प्रबंधन आगामी उत्सवों के पूर्व आपसे संपर्क करेगा।',
      btnClose: 'बंद करें',
    },
    mr: {
      eyebrow: 'सामुदायिक सहभाग आणि ऐच्छिक सेवा',
      title: 'ऐच्छिक सेवा संधी आणि मंदिर संरक्षक सहकार्य',
      subtitle:
        'शिरगाव येथील श्री द्वारकाधीश मंदिराच्या नित्य सेवा, भाविक सहाय्य व प्रांगण व्यवस्थापनात सहभागी होण्यासाठी भाविकांचे सहर्ष स्वागत आहे.',
      volunteerHeading: 'ऐच्छिक सेवा संधी',
      volunteerSub: 'भाविक व गर्भगृहाच्या सेवेसाठी आपला वेळ व भक्ती समर्पित करा.',
      patronHeading: 'मंदिर संरक्षक सहकार्य व शुचिता',
      patronSub: 'गाभाऱ्यातील नंदादीप, सुगंधित फुले आणि प्रांगण स्वच्छतेसाठी निरंतर सहकार्य.',
      btnVolunteer: 'सेवेसाठी सहभाग नोंदवा',
      commitmentLabel: 'वेळ',
      departmentLabel: 'सेवा विभाग',
      guidelinesLabel: 'भक्ती नियमावली',
      monthlyLabel: 'प्रस्तावित मासिक सहकार्य',
      modalTitle: 'ऐच्छिक सेवा सहभाग अर्ज',
      modalDesc: 'श्री द्वारकाधीश सेवक परिवारात सामील होण्यासाठी आपली माहिती नोंदवा.',
      nameLabel: 'संपूर्ण नाव',
      phoneLabel: 'फोन / व्हॉट्सअॅप नंबर',
      emailLabel: 'ईमेल (पर्यायी)',
      availLabel: 'उपलब्धता',
      availWeekend: 'शनिवार-रविवार व सणांचे दिवस',
      availWeekday: 'आठवड्याचे दिवस (सकाळ / संध्याकाळ)',
      availFestivalsOnly: 'फक्त मोठे उत्सव (जन्माष्टमी, अन्नकूट)',
      noteLabel: 'काही विशेष अनुभव / संदेश',
      btnSubmit: 'अर्ज सादर करा',
      btnCancel: 'रद्द करा',
      successTitle: 'सेवाभाव सादर स्वीकारला',
      successMsg:
        'भगवान द्वारकाधीशांच्या सेवेसाठी आपल्या पवित्र इच्छेबद्दल मनःपूर्वक आभार. मंदिर प्रशासनाकडून लवकरच आपल्याशी संपर्क साधला जाईल.',
      btnClose: 'बंद करा',
    },
    gu: {
      eyebrow: 'સામુદાયિક સહભાગ અને ઐચ્છિક સેવા',
      title: 'સ્વૈચ્છિક સેવા તકો અને મંદિર સંરક્ષક સહયોગ',
      subtitle:
        'શિરગાવ ખાતે શ્રી દ્વારકાધીશ મંદિરની નિત્ય સેવાઓ, યાત્રી સહાય અને પરિસર વ્યવસ્થાપનમાં સહભાગી થવા ભક્તોનું હાર્દિક સ્વાગત છે.',
      volunteerHeading: 'સ્વૈચ્છિક સેવા તકો',
      volunteerSub: 'યાત્રીઓ અને ગર્ભગૃહની સેવામાં આપનો સમય અને શ્રદ્ધા સમર્પિત કરો.',
      patronHeading: 'મંદિર સંરક્ષક સહયોગ અને સ્વચ્છતા',
      patronSub: 'ગર્ભગૃહના નંદાદીપ, સુગંધિત પુષ્પો અને પરિસર સ્વચ્છતા માટે નિરંતર સહયોગ.',
      btnVolunteer: 'સેવા માટે રસ દાખવો',
      commitmentLabel: 'સમય પ્રતિબદ્ધતા',
      departmentLabel: 'સેવા વિભાગ',
      guidelinesLabel: 'ભક્તિ આચારસંહિતા',
      monthlyLabel: 'પ્રસ્તાવિત માસિક સહયોગ',
      modalTitle: 'સ્વૈચ્છિક સેવા સહભાગિતા અરજી',
      modalDesc: 'શ્રી દ્વારકાધીશ સેવક પરિવાર સાથે જોડાવા માટે વિગતો આપશો.',
      nameLabel: 'પૂરું નામ',
      phoneLabel: 'ફોન / વોટ્સએપ નંબર',
      emailLabel: 'ઈમેલ (વૈકલ્પિક)',
      availLabel: 'ઉપલબ્ધતા',
      availWeekend: 'શનિ-રવિ અને ઉત્સવના દિવસો',
      availWeekday: 'સામાન્ય દિવસો (સવાર / સાંજ)',
      availFestivalsOnly: 'માત્ર મોટા ઉત્સવો (જન્માષ્ટમી, અન્નકૂટ)',
      noteLabel: 'પૂર્વ અનુભવ / ભક્તિ સંદેશ',
      btnSubmit: 'અરજી સબમિટ કરો',
      btnCancel: 'રદ કરો',
      successTitle: 'સેવાભાવ સ્વીકૃત',
      successMsg:
        'પ્રભુ દ્વારકાધીશ અને યાત્રીઓની સેવા માટેના આપના પવિત્ર સંકલ્પ બદલ આભાર. મંદિર વ્યવસ્થાપન ટૂંક સમયમાં આપનો સંપર્ક કરશે.',
      btnClose: 'બંધ કરો',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  const getRoleTitle = (r: VolunteerRole) => {
    if (language === 'hi') return r.titleHi;
    if (language === 'mr') return r.titleMr;
    if (language === 'gu') return r.titleGu;
    return r.titleEn;
  };

  const getRoleDesc = (r: VolunteerRole) => {
    if (language === 'hi') return r.descriptionHi;
    if (language === 'mr') return r.descriptionMr;
    if (language === 'gu') return r.descriptionGu;
    return r.descriptionEn;
  };

  const getRoleGuidelines = (r: VolunteerRole) => {
    if (language === 'hi') return r.guidelinesHi;
    if (language === 'mr') return r.guidelinesMr;
    if (language === 'gu') return r.guidelinesGu;
    return r.guidelinesEn;
  };

  const getPatronName = (p: PatronSupportTier) => {
    if (language === 'hi') return p.nameHi;
    if (language === 'mr') return p.nameMr;
    if (language === 'gu') return p.nameGu;
    return p.nameEn;
  };

  const getPatronPurpose = (p: PatronSupportTier) => {
    if (language === 'hi') return p.purposeHi;
    if (language === 'mr') return p.purposeMr;
    if (language === 'gu') return p.purposeGu;
    return p.purposeEn;
  };

  const getPatronTerms = (p: PatronSupportTier) => {
    if (language === 'hi') return p.termsHi;
    if (language === 'mr') return p.termsMr;
    if (language === 'gu') return p.termsGu;
    return p.termsEn;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetModal = () => {
    setSelectedRole(null);
    setFormSubmitted(false);
    setVolunteerForm({
      name: '',
      phone: '',
      email: '',
      availability: 'weekends',
      note: '',
    });
  };

  return (
    <section
      id="community"
      aria-label="Community & Voluntary Participation — Seva Volunteer Opportunities"
      className="relative w-full bg-[#FAF4E8] text-[#3F291D] py-16 sm:py-20 lg:py-24 border-b-2 border-[#C29A54]/60 scroll-mt-20 overflow-hidden"
    >
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 flex flex-col gap-12 sm:gap-16">
        
        {/* ===================================================================
            SECTION HEADER
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
            className="text-sm sm:text-base md:text-lg text-[#3F291D]/85 font-serif max-w-3xl mx-auto leading-relaxed"
          >
            {c.subtitle}
          </motion.p>
        </div>

        {/* ===================================================================
            PART A: VOLUNTEER ROLES (3 Main Roles)
           =================================================================== */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-[#C29A54]/30 pb-3">
            <div>
              <h3 className="font-serif-royal text-2xl font-bold text-[#3F291D]">
                {c.volunteerHeading}
              </h3>
              <p className="text-xs sm:text-sm text-[#3F291D]/75 font-serif">
                {c.volunteerSub}
              </p>
            </div>
            <Users className="w-6 h-6 text-[#C29A54] hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOLUNTEER_ROLES.map((role) => (
              <motion.div
                key={role.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-[#FFFDF8] rounded-3xl p-6 border-2 border-[#C29A54]/70 hover:border-[#741C24] shadow-[0_10px_30px_rgba(194,154,84,0.08)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-bold uppercase tracking-wider bg-[#F4E9D8] text-[#741C24] border border-[#C29A54]/40">
                      {role.department}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-serif text-[#C29A54]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{role.commitment}</span>
                    </div>
                  </div>

                  <h4 className="font-serif-royal text-xl font-bold text-[#3F291D] leading-snug mb-2">
                    {getRoleTitle(role)}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#3F291D]/80 font-serif leading-relaxed mb-4">
                    {getRoleDesc(role)}
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#C29A54]/40 text-[11px] font-serif text-[#741C24] leading-relaxed mb-4">
                    <strong>{c.guidelinesLabel}:</strong> {getRoleGuidelines(role)}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#C29A54]/30">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider bg-[#741C24] hover:bg-[#5A141B] text-[#FFFDF8] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>{c.btnVolunteer}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E8C784]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            PART B: PATRON SUPPORT & MANDIR UPKEEP (2 Tiers)
           =================================================================== */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-[#C29A54]/30 pb-3">
            <div>
              <h3 className="font-serif-royal text-2xl font-bold text-[#3F291D]">
                {c.patronHeading}
              </h3>
              <p className="text-xs sm:text-sm text-[#3F291D]/75 font-serif">
                {c.patronSub}
              </p>
            </div>
            <Heart className="w-6 h-6 text-[#C29A54] hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATRON_SUPPORT_TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 border-2 border-[#C29A54]/80 shadow-[0_10px_30px_rgba(194,154,84,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-xs uppercase tracking-wider text-[#C29A54] font-semibold">
                      {tier.frequency}
                    </span>
                    <span className="font-serif-royal text-lg font-bold text-[#741C24]">
                      ₹{tier.proposedAmount.toLocaleString('en-IN')} / mo
                    </span>
                  </div>

                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#3F291D] mb-2">
                    {getPatronName(tier)}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#3F291D]/80 font-serif leading-relaxed mb-4">
                    {getPatronPurpose(tier)}
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF4E8] border border-[#C29A54]/40 text-xs text-[#3F291D]/75 font-serif leading-relaxed">
                    <strong className="text-[#741C24]">Note:</strong> {getPatronTerms(tier)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ===================================================================
          INTERACTIVE VOLUNTEER REGISTRATION MODAL
         =================================================================== */}
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#FFFDF8] max-w-lg w-full rounded-3xl border-2 border-[#C29A54] shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={resetModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#3F291D] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!formSubmitted ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <DiyaAccent animated={!reducedMotion} />
                    <span className="text-xs font-cinzel text-[#C29A54] uppercase tracking-wider font-bold">
                      {selectedRole.department}
                    </span>
                  </div>

                  <h3 className="font-serif-royal text-2xl font-bold text-[#741C24] mb-1">
                    {getRoleTitle(selectedRole)}
                  </h3>

                  <p className="text-xs text-[#3F291D]/80 font-serif mb-5">
                    {c.modalDesc}
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#3F291D] mb-1">
                        {c.nameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full bg-[#FAF4E8] border border-[#C29A54]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#3F291D] focus:outline-none focus:border-[#741C24]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#3F291D] mb-1">
                          {c.phoneLabel} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={volunteerForm.phone}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#FAF4E8] border border-[#C29A54]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#3F291D] focus:outline-none focus:border-[#741C24]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#3F291D] mb-1">
                          {c.emailLabel}
                        </label>
                        <input
                          type="email"
                          value={volunteerForm.email}
                          onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                          placeholder="devotee@example.com"
                          className="w-full bg-[#FAF4E8] border border-[#C29A54]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#3F291D] focus:outline-none focus:border-[#741C24]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#3F291D] mb-1">
                        {c.availLabel}
                      </label>
                      <select
                        value={volunteerForm.availability}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                        className="w-full bg-[#FAF4E8] border border-[#C29A54]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#3F291D] focus:outline-none focus:border-[#741C24]"
                      >
                        <option value="weekends">{c.availWeekend}</option>
                        <option value="weekdays">{c.availWeekday}</option>
                        <option value="festivals">{c.availFestivalsOnly}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel font-semibold uppercase tracking-wider text-[#3F291D] mb-1">
                        {c.noteLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={volunteerForm.note}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, note: e.target.value })}
                        placeholder="Any prior seva or specific devotion..."
                        className="w-full bg-[#FAF4E8] border border-[#C29A54]/60 rounded-xl px-3.5 py-2 text-sm text-[#3F291D] focus:outline-none focus:border-[#741C24]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={resetModal}
                        className="px-4 py-2 text-xs font-cinzel font-semibold rounded-xl border border-[#C29A54] text-[#3F291D] hover:bg-[#FAF4E8] cursor-pointer"
                      >
                        {c.btnCancel}
                      </button>

                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#741C24] hover:bg-[#5A141B] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <span>{c.btnSubmit}</span>
                        <Send className="w-3.5 h-3.5 text-[#E8C784]" />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#376C68]/15 border-2 border-[#376C68] flex items-center justify-center text-[#376C68] mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h4 className="font-serif-royal text-2xl font-bold text-[#741C24] mb-2">
                    {c.successTitle}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#3F291D]/85 font-serif max-w-md mx-auto leading-relaxed mb-6">
                    {c.successMsg}
                  </p>

                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-6 py-2.5 rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#741C24] hover:bg-[#5A141B] cursor-pointer shadow-xs"
                  >
                    {c.btnClose}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
