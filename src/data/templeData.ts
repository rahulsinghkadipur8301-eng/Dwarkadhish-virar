export type Language = 'en' | 'hi' | 'mr' | 'gu';

export interface TempleLocation {
  templeName: string;
  localityFromBrief: string;
  fullAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  googlePlaceId: string | null;
  approvedEmbedUrl: string | null;
  entranceNotes: string | null;
  verificationStatus: 'unverified' | 'verified';
  sourceReferences: string[];
  lastVerifiedAt: string | null;
}

export const TEMPLE_LOCATION_RECORD: TempleLocation = {
  templeName: 'Shri Dwarkadhish Mandir',
  localityFromBrief: 'Shirgaon, Virar East, Palghar, Maharashtra, India',
  fullAddress: 'Shirgaon, Virar East, Taluka Vasai, Palghar District, Maharashtra 401305, India',
  latitude: 19.4674,
  longitude: 72.8295,
  googlePlaceId: null,
  approvedEmbedUrl: null,
  entranceNotes: 'Accessible via Virar East railway approach road towards Shirgaon rural belt. Exact main archway entrance to be confirmed with temple management before journey.',
  verificationStatus: 'unverified',
  sourceReferences: [
    'User Master Brief 2026',
    'Shirgaon Locality Municipal Survey Records',
    'RM Studio Architectural Chronicle Note'
  ],
  lastVerifiedAt: '2026-11-07'
};

export const getGoogleMapsSearchUrl = (loc: TempleLocation): string => {
  const query = encodeURIComponent(`${loc.templeName}, Shirgaon, Virar East, Maharashtra 401305`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const getGoogleMapsDirectionsUrl = (loc: TempleLocation): string => {
  const dest = encodeURIComponent(`${loc.templeName}, Shirgaon, Virar East, Maharashtra 401305`);
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
};

export interface AartiItem {
  id: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  nameGu: string;
  time: string;
  significanceEn: string;
  significanceHi: string;
  significanceMr: string;
  significanceGu: string;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
}

export type FestivalFilterGroup = 'appearance' | 'leela' | 'wisdom';

export interface FestivalEvent {
  id: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  titleGu: string;
  month: string;
  monthHi: string;
  monthMr: string;
  monthGu: string;
  dateStr: string;
  dateHi: string;
  dateMr: string;
  dateGu: string;
  timeStr: string;
  timeHi: string;
  timeMr: string;
  timeGu: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionMr: string;
  descriptionGu: string;
  status: 'upcoming' | 'ongoing' | 'archived';
  category: string;
  categoryHi: string;
  categoryMr: string;
  categoryGu: string;
  filterGroup: FestivalFilterGroup;
  highlightsEn: string[];
  highlightsHi: string[];
  highlightsMr: string[];
  highlightsGu: string[];
}

export interface SevaOffering {
  id: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  titleGu: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionMr: string;
  descriptionGu: string;
  proposedAmount: number;
  category: 'birthday' | 'anniversary' | 'annadan' | 'flowers' | 'general';
  frequency: 'one-time' | 'monthly' | 'annual';
}

export interface LearningItem {
  id: string;
  category: 'gita' | 'krishna_teachings' | 'bhajans' | 'discourse' | 'history';
  titleEn: string;
  titleHi: string;
  titleMr: string;
  titleGu: string;
  summaryEn: string;
  summaryHi: string;
  summaryMr: string;
  summaryGu: string;
  verseOrAuthor?: string;
  contentEn: string;
  contentHi: string;
  contentMr: string;
  contentGu: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  titleGu: string;
  category: 'architecture' | 'interior' | 'rituals' | 'festivals';
  imageSrc: string;
  captionEn: string;
  captionHi: string;
  captionMr: string;
  captionGu: string;
  isAuthenticShirgaon: boolean;
}

export const AARTI_SCHEDULE: AartiItem[] = [
  {
    id: 'mangala',
    nameEn: 'Mangala Aarti',
    nameHi: 'मंगला आरती',
    nameMr: 'मंगला आरती',
    nameGu: 'મંગળા આરતી',
    time: '06:00 AM',
    significanceEn: 'First dawn awakening offering of deepams and auspicious stutis.',
    significanceHi: 'सूर्योदय से पूर्व प्रभु का प्रथम जागरण दर्शन एवं दीप आराधना।',
    significanceMr: 'सूर्योदयापूर्वी प्रभूचे पहिले जागरण दर्शन आणि दीप आराधना.',
    significanceGu: 'સૂર્યોદય પૂર્વે પ્રભુનું પ્રથમ જાગરણ દર્શન અને મંગળ દીપ આરાધના.',
    category: 'morning'
  },
  {
    id: 'shringaar',
    nameEn: 'Shringaar Darshan & Aarti',
    nameHi: 'शृंगार दर्शन एवं आरती',
    nameMr: 'शृंगार दर्शन आणि आरती',
    nameGu: 'શૃંગાર દર્શન અને આરતી',
    time: '07:30 AM',
    significanceEn: 'Divine adorning of Shri Dwarkadhish in regal garments and flowers.',
    significanceHi: 'श्री द्वारकाधीश प्रभु का दिव्य राजसी शृंगार एवं पुष्प अर्पण।',
    significanceMr: 'श्री द्वारकाधीश प्रभूंचा दिव्य राजेशाही शृंगार आणि पुष्प अर्पण.',
    significanceGu: 'શ્રી દ્વારકાધીશ પ્રભુનો દિવ્ય રાજવી શૃંગાર અને તાજા પુષ્પોનું અર્પણ.',
    category: 'morning'
  },
  {
    id: 'rajbhog',
    nameEn: 'Rajbhog Aarti',
    nameHi: 'राजभोग आरती',
    nameMr: 'राजभोग आरती',
    nameGu: 'રાજભોગ આરતી',
    time: '12:00 PM',
    significanceEn: 'Midday consecrated offering followed by afternoon sanctum rest.',
    significanceHi: 'मध्याह्न दिव्य नैवेद्य अर्पण एवं विश्राम हेतु कपाट संवरण।',
    significanceMr: 'दुपारचा दिव्य नैवेद्य अर्पण आणि दुपारच्या विश्रांतीसाठी कपाट बंद.',
    significanceGu: 'મધ્યાહ્ન દિવ્ય નૈવેદ્ય અર્પણ અને પ્રભુના વિશ્રામ માટે કપાટ સંવરણ.',
    category: 'afternoon'
  },
  {
    id: 'sandhya',
    nameEn: 'Sandhya Aarti',
    nameHi: 'संध्या आरती',
    nameMr: 'संध्या आरती',
    nameGu: 'સંધ્યા આરતી',
    time: '07:00 PM',
    significanceEn: 'Sacred dusk brass lamp offering with conch resonance and mridanga.',
    significanceHi: 'गोधूलि वेला में शंखनाद, मृदंग एवं भव्य आरती दीप आराधना।',
    significanceMr: 'संध्यासमयी शंखनाद, मृदंग आणि भव्य दीप आराधना.',
    significanceGu: 'સંધ્યા સમયે શંખનાદ, મૃદંગ અને સોનેરી પિત્તળ દીપોની મહાઆરતી.',
    category: 'evening'
  },
  {
    id: 'shayan',
    nameEn: 'Shayan Aarti',
    nameHi: 'शयन आरती',
    nameMr: 'शयन आरती',
    nameGu: 'શયન આરતી',
    time: '08:30 PM',
    significanceEn: 'Gentle night lullaby and final quiet darshan before sanctum closes.',
    significanceHi: 'रात्रि शांति शयन दर्शन एवं दिन का अंतिम मंगल दर्शन।',
    significanceMr: 'रात्री शांत शयन दर्शन आणि दिवसाचे अंतिम मंगल दर्शन.',
    significanceGu: 'રાત્રિ શાંત શયન દર્શન અને દિવસનું અંતિમ મંગલ દર્શન.',
    category: 'night'
  }
];

export const FESTIVALS_DATA: FestivalEvent[] = [
  {
    id: 'gita_jayanti',
    titleEn: 'Gita Jayanti',
    titleHi: 'गीता जयंती',
    titleMr: 'गीता जयंती',
    titleGu: 'ગીતા જયંતી',
    month: 'Dec 2026',
    monthHi: 'दिसम्बर २०२६',
    monthMr: 'डिसेंबर २०२६',
    monthGu: 'ડિસેમ્બર ૨૦૨૬',
    dateStr: '20 Dec 2026 · Sunday',
    dateHi: '२० दिसम्बर २०२६ · रविवार',
    dateMr: '२० डिसेंबर २०२६ · रविवार',
    dateGu: '૨૦ ડિસેમ્બર ૨૦૨૬ · રવિવાર',
    timeStr: '08:00 AM – 12:00 PM',
    timeHi: 'प्रातः ०८:०० – दोपहर १२:००',
    timeMr: 'सकाळी ०८:०० – दुपारी १२:००',
    timeGu: 'સવારે ૦૮:૦૦ – બપોરે ૧૨:૦૦',
    descriptionEn: 'Krishna delivered Bhagavad Gita to Arjuna.',
    descriptionHi: 'भगवान श्री कृष्ण ने कुरुक्षेत्र में अर्जुन को श्रीमद्भगवद्गीता का दिव्य उपदेश दिया।',
    descriptionMr: 'भगवान श्रीकृष्णांनी अर्जुनाला श्रीमद्भगवद्गीतेचा शाश्वत उपदेश दिला.',
    descriptionGu: 'ભગવાન શ્રીકૃષ્ણે અર્જુનને શ્રીમદ્ ભગવદ્ ગીતાનો દિવ્ય ઉપદેશ આપ્યો.',
    status: 'upcoming',
    category: 'Scriptural Wisdom',
    categoryHi: 'गीता ज्ञान पर्व',
    categoryMr: 'गीता ज्ञान सोहळा',
    categoryGu: 'ગીતા જ્ઞાન પર્વ',
    filterGroup: 'wisdom',
    highlightsEn: [
      'Consecrated Bhagavad Gita scripture Pujan on carved sandalwood Vyasapitha',
      'Complete 18-chapter rhythmic Sanskrit Parayan led by temple Acharyas and devotees',
      'Discourse on Nishkama Karma Yoga & Sharanagati for modern household harmony',
      'Afternoon Ekadashi Phalahar Prasad distribution to all visiting devotees'
    ],
    highlightsHi: [
      'चंदन व्यासपीठ पर श्रीमद्भगवद्गीता ग्रंथ का वैदिक षोडशोपचार पूजन',
      'आचार्यों एवं श्रद्धालुओं द्वारा संपूर्ण १८ अध्यायों का सामूहिक संस्कृत पारायण',
      'दैनिक जीवन में निष्काम कर्मयोग एवं शरणागति पर सारगर्भित प्रवचन',
      'एकादशी सात्त्विक फलाहार महाप्रसाद वितरण'
    ],
    highlightsMr: [
      'चंदन व्यासपीठावर श्रीमद्भगवद्गीता ग्रंथाचे विधिवत पूजन',
      'आचार्य व भाविकांसोबत संपूर्ण १८ अध्यायांचे लयबद्ध संस्कृत पारायण',
      'दैनंदिन जीवनासाठी निष्काम कर्मयोग व शरणागती यावर मार्गदर्शनपर प्रवचन',
      'दुपारी एकादशी सात्त्विक फराळ महाप्रसाद वाटप'
    ],
    highlightsGu: [
      'ચંદન વ્યાસપીઠ પર શ્રીમદ્ ભગવદ્ ગીતા ગ્રંથનું વૈદિક પૂજન',
      'આચાર્યો અને ભક્તો દ્વારા સંપૂર્ણ ૧૮ અધ્યાયોનું સામૂહિક સંસ્કૃત પારાયણ',
      'આધુનિક જીવનમાં નિષ્કામ કર્મયોગ અને શરણાગતિ વિષયક પ્રવચન',
      'મધ્યાહ્ને એકાદશી સાત્ત્વિક ફળાહાર પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'holika_dahan',
    titleEn: 'Holika Dahan',
    titleHi: 'होलिका दहन',
    titleMr: 'होलिका दहन',
    titleGu: 'હોલિકા દહન',
    month: 'Mar 2027',
    monthHi: 'मार्च २०२७',
    monthMr: 'मार्च २०२७',
    monthGu: 'માર્ચ ૨૦૨७',
    dateStr: '21 Mar 2027 · Sunday',
    dateHi: '२१ मार्च २०२७ · रविवार',
    dateMr: '२१ मार्च २०२७ · रविवार',
    dateGu: '૨૧ માર્ચ ૨૦૨૭ · રવિવાર',
    timeStr: '07:15 PM – 09:00 PM',
    timeHi: 'सायं ०७:१५ – रात्रि ०९:००',
    timeMr: 'सायंकाळी ०७:१५ – रात्री ०९:००',
    timeGu: 'સાંજે ૦૭:૧૫ – રાત્રે ૦૯:૦૦',
    descriptionEn: 'Celebration of devotion and victory over evil.',
    descriptionHi: 'प्रह्लाद की अटूट भक्ति और अधर्म पर धर्म की पावन विजय का उत्सव।',
    descriptionMr: 'भक्त प्रल्हादाच्या अढळ भक्तीचा आणि असत्यावर सत्याच्या विजयाचा उत्सव.',
    descriptionGu: 'ભક્ત પ્રહ્લાદની અતૂટ ભક્તિ અને અધર્મ પર ધર્મના વિજયનો પાવન ઉત્સવ.',
    status: 'upcoming',
    category: 'Sacred Triumph',
    categoryHi: 'भक्ति विजय पर्व',
    categoryMr: 'भक्ती विजय सोहळा',
    categoryGu: 'ભક્તિ વિજય પર્વ',
    filterGroup: 'wisdom',
    highlightsEn: [
      'Evening Sandhya Aarti & Vedic Sankalpa honoring Bhakta Prahlad’s unwavering faith',
      'Eco-friendly cow-dung & camphor sacred Holika Pujan in the outer courtyard',
      'Collective Narasimha Stuti & Shri Krishna kirtan around the sacred fire',
      'Roasted grains, coconut & kesar sweet prasad offering to visiting families'
    ],
    highlightsHi: [
      'संध्या आरती एवं भक्त प्रह्लाद की अटल श्रद्धा के स्मरण में वैदिक संकल्प',
      'बाह्य प्रांगण में गोकाष्ठ व कपूर से पर्यावरण-अनुकूल होलिका पूजन',
      'पावन अग्नि के समक्ष सामूहिक श्री नृसिंह स्तुति एवं हरे कृष्ण संकीर्तन',
      'सभी परिवारों में भुने धान्य, नारियल एवं केसर मिष्ठान प्रसाद वितरण'
    ],
    highlightsMr: [
      'संध्या आरती आणि भक्त प्रल्हादाच्या अढळ निष्ठेच्या स्मरणार्थ वैदिक संकल्प',
      'मंदिर प्रांगणात गोकाष्ठ आणि कापुराने पर्यावरणपूरक होलिका पूजन',
      'पवित्र अग्नीसमोर सामूहिक नृसिंह स्तुती आणि हरीनाम संकीर्तन',
      'भाविकांना नारळ, भाजलेले धान्य आणि पुरणपोळी-मिठाई प्रसाद वाटप'
    ],
    highlightsGu: [
      'સંધ્યા આરતી અને ભક્ત પ્રહ્લાદની અડગ શ્રદ્ધાના સ્મરણમાં વૈદિક સંકલ્પ',
      'પ્રાંગણમાં ગાયના છાણા અને કપૂરથી પર્યાવરણ-અનુકૂળ હોલિકા પૂજન',
      'પવિત્ર અગ્નિ સમક્ષ સામૂહિક નૃસિંહ સ્તુતિ અને હરિનામ સંકીર્તન',
      'દર્શનાર્થીઓને ધાણી, ખજૂર, નાળિયેર અને કેસર પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'holi',
    titleEn: 'Holi (Braj Holi)',
    titleHi: 'होली (ब्रज होली)',
    titleMr: 'होळी (ब्रज होळी)',
    titleGu: 'હોળી (વ્રજ હોળી)',
    month: 'Mar 2027',
    monthHi: 'मार्च २०२७',
    monthMr: 'मार्च २०२७',
    monthGu: 'માર્ચ ૨૦૨૭',
    dateStr: '22 Mar 2027 · Monday',
    dateHi: '२२ मार्च २०२७ · सोमवार',
    dateMr: '२२ मार्च २०२७ · सोमवार',
    dateGu: '૨૨ માર્ચ ૨૦૨૭ · સોમવાર',
    timeStr: '04:00 PM – 07:00 PM',
    timeHi: 'सायं ०४:०० – ०७:००',
    timeMr: 'सायंकाळी ०४:०० – ०७:००',
    timeGu: 'સાંજે ૦૪:૦૦ – ૦૭:૦૦',
    descriptionEn: 'Divine love of Radha and Krishna.',
    descriptionHi: 'श्री राधा एवं श्री कृष्ण के अलौकिक दिव्य प्रेम, पुष्प वर्षा और ब्रज रसिया का रंगोत्सव।',
    descriptionMr: 'श्री राधा आणि श्रीकृष्णांच्या अलौकिक दिव्य प्रेमाचा पुष्प व रंगोत्सव.',
    descriptionGu: 'શ્રી રાધા અને શ્રીકૃષ્ણના અલૌકિક દિવ્ય પ્રેમ, પુષ્પવર્ષા અને વ્રજ રસિયાનો રંગોત્સવ.',
    status: 'upcoming',
    category: 'Braj Heritage Utsav',
    categoryHi: 'ब्रज रंगोत्सव',
    categoryMr: 'ब्रज रंगोत्सव',
    categoryGu: 'વ્રજ રંગોત્સવ',
    filterGroup: 'wisdom',
    highlightsEn: [
      'Traditional Dolotsav Shringaar of Lord Dwarkadhish in radiant spring saffron attire',
      'Pure Pushpa-Holi showering marigold, rose & jasmine petals across the Sabha Mandapa',
      'Live Braj Dhamar, Hori & Haveli Sangeet kirtan with pakhawaj and harmonium',
      'Kesudo herbal gulal tilak blessings and cooling Thandai prasad'
    ],
    highlightsHi: [
      'वासंती केसरिया परिधान में श्री द्वारकाधीश का भव्य डोलोत्सव शृंगार',
      'सभामंडप में गुलाब, गेंदा एवं चमेली की पंखुड़ियों की दिव्य पुष्प वर्षा',
      'पखावज एवं हारमोनियम संग पारंपरिक ब्रज होरी, धमार व हवेली संगीत',
      'प्रभु का प्रसादी केसूड़ा-चंदन तिलक एवं शीतल ठंडाई प्रसाद वितरण'
    ],
    highlightsMr: [
      'वसंत ऋतूतील केशरी वस्त्रांत श्री द्वारकाधीशांचा सुंदर डोलोत्सव शृंगार',
      'सभामंडपात गुलाब, झेंडू व मोगऱ्याच्या पाकळ्यांची मंगल पुष्प होळी',
      'पखवाज व संवादिनीच्या साथीने पारंपरिक ब्रज होरी व हवेली संगीत',
      'नैसर्गिक केशर-गुलाल टिळा आणि थंडाई महाप्रसाद वाटप'
    ],
    highlightsGu: [
      'વસંત ઋતુના કેસરિયા વસ્ત્રોમાં શ્રી દ્વારકાધીશનો દિવ્ય ડોલોત્સવ શૃંગાર',
      'સભામંડપમાં ગુલાબ, ગલગોટા અને મોગરાની પાંખડીઓની પાવન પુષ્પ હોળી',
      'પખવાજ અને હાર્મોનિયમના તાલે પરંપરાગત વ્રજ હોરી અને હવેલી સંગીત',
      'પ્રાકૃતિક કેસૂડા-ગુલાલ તિલક અને શીતળ ઠંડાઈ પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'jagannath_rath_yatra',
    titleEn: 'Jagannath Rath Yatra',
    titleHi: 'जगन्नाथ रथ यात्रा',
    titleMr: 'जगन्नाथ रथयात्रा',
    titleGu: 'જગન્નાથ રથયાત્રા',
    month: 'Jul 2027',
    monthHi: 'जुलाई २०२७',
    monthMr: 'जुलै २०२७',
    monthGu: 'જુલાઈ ૨૦૨૭',
    dateStr: '5 Jul 2027 · Monday',
    dateHi: '५ जुलाई २०२७ · सोमवार',
    dateMr: '५ जुलै २०२७ · सोमवार',
    dateGu: '૫ જુલાઈ ૨૦૨૭ · સોમવાર',
    timeStr: '03:30 PM – 07:30 PM',
    timeHi: 'अपराह्न ०३:३० – सायं ०७:३०',
    timeMr: 'दुपारी ०३:३० – सायं ०७:३०',
    timeGu: 'બપોરે ૦૩:૩૦ – સાંજે ૦૭:૩૦',
    descriptionEn: 'Lord Jagannath, a form of Krishna, travels in a chariot.',
    descriptionHi: 'श्री कृष्ण स्वरूप भगवान जगन्नाथ जी का सुसज्जित भव्य रथ में नगर दर्शन उत्सव।',
    descriptionMr: 'श्रीकृष्ण स्वरूप भगवान जगन्नाथ सुसज्ज रथातून भक्तांना दर्शन देण्यासाठी निघतात.',
    descriptionGu: 'શ્રીકૃષ્ણ સ્વરૂપ ભગવાન જગન્નાથજી શણગારેલા ભવ્ય રથમાં ભક્તોને દર્શન આપવા પધારે છે.',
    status: 'upcoming',
    category: 'Chariot Procession',
    categoryHi: 'पावन रथयात्रा',
    categoryMr: 'पावन रथयात्रा',
    categoryGu: 'પાવન રથયાત્રા',
    filterGroup: 'appearance',
    highlightsEn: [
      'Morning Pahandi ceremonial procession & garland offering to the decorated temple Rath',
      'Sacred Chhera Pahara sweeping ritual before the chariot ropes are pulled',
      'Devotional mridanga & kartal sankirtan accompanying the Rath Yatra around Shirgaon',
      'Evening Sandhya Aarti followed by Khichdi & sweet Boondi Mahaprasad'
    ],
    highlightsHi: [
      'प्रातः पुष्प सुसज्जित मंदिर रथ का पूजन एवं दिव्य पाहंडी उत्सव',
      'रथयात्रा शुभारंभ से पूर्व पारंपरिक छेरा पहरा एवं स्वर्ण झाड़ू सेवा',
      'शिरगाव परिक्रमा में मृदंग-करताल संग भावपूर्ण हरे कृष्ण नगर संकीर्तन',
      'संध्या महाआरती उपरांत पावन खिचड़ी एवं बूंदी महाप्रसाद वितरण'
    ],
    highlightsMr: [
      'सकाळी फुलांनी सजवलेल्या मंदिर रथाचे पूजन व पाहंडी मिरवणूक',
      'रथ ओढण्यापूर्वी पारंपरिक छेरा पहरा व सुवर्ण केरसुणी सेवा विधी',
      'शिरगाव परिसरात मृदुंग-टाळांच्या गजरात भव्य रथयात्रा व नामसंकीर्तन',
      'संध्या आरतीनंतर पवित्र खिचडी आणि गोड बुंदी महाप्रसाद वाटप'
    ],
    highlightsGu: [
      'સવારે પુષ્પોથી શણગારેલા મંદિર રથનું પૂજન અને દિવ્ય પહંડી વિધિ',
      'રથયાત્રા પ્રસ્થાન પૂર્વે પરંપરાગત પહિંદ (છેરા પહરા) સેવા વિધિ',
      'શિરગાવ પરિસરમાં મૃદંગ-કરતાલ સાથે ભવ્ય નગર સંકીર્તન રથયાત્રા',
      'સંધ્યા આરતી બાદ પાવન ખીચડી અને બુંદી મહાપ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'janmashtami',
    titleEn: 'Krishna Janmashtami',
    titleHi: 'कृष्ण जन्माष्टमी',
    titleMr: 'कृष्ण जन्माष्टमी',
    titleGu: 'કૃષ્ણ જન્માષ્ટમી',
    month: 'Aug 2027',
    monthHi: 'अगस्त २०२७',
    monthMr: 'ऑगस्ट २०२७',
    monthGu: 'ઓગસ્ટ ૨૦૨૭',
    dateStr: '25 Aug 2027 · Wednesday',
    dateHi: '२५ अगस्त २०२७ · बुधवार',
    dateMr: '२५ ऑगस्ट २०२७ · बुधवार',
    dateGu: '૨૫ ઓગસ્ટ ૨૦૨૭ · બુધવાર',
    timeStr: 'Midnight 12:00 AM Maha Abhishekam',
    timeHi: 'मध्यरात्रि १२:०० बजे महाभिषेक',
    timeMr: 'मध्यरात्री १२:०० वाजता महाअभिषेक',
    timeGu: 'મધ્યરાત્રિ ૧૨:૦૦ વાગ્યે મહાઅભિષેક',
    descriptionEn: 'Appearance of Lord Krishna.',
    descriptionHi: 'भगवान श्री कृष्ण का पावन मध्यरात्रि अवतरण, पंचामृत महाभिषेक एवं पालकी उत्सव।',
    descriptionMr: 'भगवान श्रीकृष्णांचा पावन मध्यरात्रीचा अवतरण सोहळा आणि महाअभिषेक.',
    descriptionGu: 'ભગવાન શ્રીકૃષ્ણનો પાવન મધ્યરાત્રિ પ્રાગટ્ય મહોત્સવ અને પંચામૃત મહાઅભિષેક.',
    status: 'upcoming',
    category: 'Supreme Appearance',
    categoryHi: 'परम अवतरण पर्व',
    categoryMr: 'परम अवतरण सोहळा',
    categoryGu: 'પરમ પ્રાગટ્ય ઉત્સવ',
    filterGroup: 'appearance',
    highlightsEn: [
      'Dawn Mangala Aarti & 24-hour Akhanda Hare Krishna Sankirtan in the Mandapa',
      'Evening Nandagopal Jhulan (Silver Cradle) Shringaar with fresh jasmine garlands',
      '12:00 AM Midnight Shankha & Panchamrit Maha Abhishekam of Lord Dwarkadhish',
      'Panjiri, Makhan-Mishri & Panchamrit Mahaprasad distribution after Janmotsav Aarti'
    ],
    highlightsHi: [
      'प्रातः मंगला आरती एवं मंडप में २४ घंटे अखंड हरे कृष्ण संकीर्तन',
      'सांयकालीन नंदगोपाल रजत हिंडोला एवं सुगंधित मोगरा-पुष्प शृंगार',
      'मध्यरात्रि १२:०० बजे शंखनाद व वैदिक मंत्रोच्चार संग पंचामृत महाभिषेक',
      'जन्मोत्सव महाआरती के पश्चात पंजीरी, माखन-मिश्री एवं चरणामृत वितरण'
    ],
    highlightsMr: [
      'पहाटे मंगला आरती व सभामंडपात २४ तास अखंड नामसंकीर्तन',
      'सायंकाळी बालगोपाळ चांदीचा पाळणा आणि सुगंधी मोगरा-फुलांची सजावट',
      'मध्यरात्री १२:०० वाजता शंखनाद व वेदमंत्रांच्या घोषात पंचामृत महाअभिषेक',
      'जन्मोत्सव आरतीनंतर पंजिरी, लोणी-खडीसाखर व महाप्रसाद वाटप'
    ],
    highlightsGu: [
      'પ્રાતઃ મંગળા આરતી અને સભામંડપમાં ૨૪ કલાક અખંડ હરિનામ સંકીર્તન',
      'સાંજે નંદગોપાળ રજત પારણા અને તાજા મોગરા-પુષ્પોનો દિવ્ય શૃંગાર',
      'મધ્યરાત્રિ ૧૨:૦૦ વાગ્યે શંખનાદ અને વૈદિક મંત્રોચ્ચાર સાથે પંચામૃત મહાઅભિષેક',
      'જન્મોત્સવ મહાઆરતી બાદ પંજરી, માખણ-મિશ્રી અને પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'radhashtami',
    titleEn: 'Radha Ashtami',
    titleHi: 'राधा अष्टमी',
    titleMr: 'राधा अष्टमी',
    titleGu: 'રાધા અષ્ટમી',
    month: 'Sep 2027',
    monthHi: 'सितम्बर २०२७',
    monthMr: 'सप्टेंबर २०२७',
    monthGu: 'સપ્ટેમ્બર ૨૦૨૭',
    dateStr: '8 Sep 2027 · Wednesday',
    dateHi: '८ सितम्बर २०२७ · बुधवार',
    dateMr: '८ सप्टेंबर २०२७ · बुधवार',
    dateGu: '૮ સપ્ટેમ્બર ૨૦૨૭ · બુધવાર',
    timeStr: '10:00 AM – 01:00 PM',
    timeHi: 'प्रातः १०:०० – दोपहर ०१:००',
    timeMr: 'सकाळी १०:०० – दुपारी ०१:००',
    timeGu: 'સવારે ૧૦:૦૦ – બપોરે ૦૧:૦૦',
    descriptionEn: 'Appearance of Radha Rani.',
    descriptionHi: 'करुणामयी श्री राधा रानी का पावन प्राकट्य दिवस, सहस्रनाम अर्चना एवं पुष्प शृंगार।',
    descriptionMr: 'करुणामयी श्री राधा राणींचा पावन अवतरण दिवस आणि सहस्रनाम अर्चना.',
    descriptionGu: 'કરુણામયી શ્રી રાધારાણીનો પાવન પ્રાગટ્ય દિવસ, સહસ્રનામ અર્ચના અને પુષ્પ શૃંગાર.',
    status: 'upcoming',
    category: 'Devotional Grace',
    categoryHi: 'भक्ति एवं कृपा पर्व',
    categoryMr: 'भक्ती व कृपा सोहळा',
    categoryGu: 'ભક્તિ અને કૃપા પર્વ',
    filterGroup: 'appearance',
    highlightsEn: [
      'Morning Shringaar adorned with pink lotus petals and fragrant sandalwood chandan',
      'Collective chanting of Shri Radha Sahasranama and Ashtottara archana',
      'Afternoon Radhakripa Haveli Sangeet & Braj Padavali bhajan recital',
      'Special Arbi & Kesari Laddoo Rajbhog offering and devotee prasad'
    ],
    highlightsHi: [
      'प्रातः गुलाबी कमल पुष्पों एवं सुगंधित चंदन से दिव्य शृंगार',
      'सामूहिक श्री राधा सहस्रनाम पाठ एवं वैदिक पुष्पार्चना',
      'मध्याह्न ब्रज पदावली एवं भक्तिमय हवेली संगीत प्रस्तुति',
      'विशेष राजभोग अर्पण एवं श्रद्धालुओं हेतु प्रसाद वितरण'
    ],
    highlightsMr: [
      'सकाळी ताज्या गुलाबी कमळांच्या पाकळ्या आणि चंदनाचा दिव्य शृंगार',
      'सामूहिक श्री राधा सहस्रनाम पठण आणि पुष्पार्चना',
      'दुपारी ब्रज पदावली व भक्तिसंगीत हवेली गायन',
      'विशेष राजभोग नैवेद्य अर्पण आणि भाविकांना महाप्रसाद वितरण'
    ],
    highlightsGu: [
      'સવારે તાજા ગુલાબી કમળ અને સુગંધિત ચંદનનો દિવ્ય શૃંગાર',
      'સામૂહિક શ્રી રાધા સહસ્રનામ પાઠ અને વૈદિક પુષ્પાર્ચના',
      'મધ્યાહ્ને વ્રજ પદાવલી અને ભક્તિ હવેલી સંગીત ગાન',
      'વિશેષ રાજભોગ નૈવેદ્ય અર્પણ અને ભક્તોમાં પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'sharad_purnima',
    titleEn: 'Sharad Purnima',
    titleHi: 'शरद पूर्णिमा',
    titleMr: 'शरद पौर्णिमा',
    titleGu: 'શરદ પૂર્ણિમા',
    month: 'Oct 2027',
    monthHi: 'अक्टूबर २०२७',
    monthMr: 'ऑक्टोबर २०२७',
    monthGu: 'ઓક્ટોબર ૨૦૨૭',
    dateStr: '14 Oct 2027 · Thursday',
    dateHi: '१४ अक्टूबर २०२७ · गुरुवार',
    dateMr: '१४ ऑक्टोबर २०२७ · गुरुवार',
    dateGu: '૧૪ ઓક્ટોબર ૨૦૨૭ · ગુરુવાર',
    timeStr: '07:00 PM – 11:00 PM',
    timeHi: 'सायं ०७:०० – रात्रि ११:००',
    timeMr: 'सायंकाळी ०७:०० – रात्री ११:००',
    timeGu: 'સાંજે ૦૭:૦૦ – રાત્રે ૧૧:૦૦',
    descriptionEn: "Krishna's Maha Raas Leela.",
    descriptionHi: 'शरद ऋतु की धवल चांदनी में श्री कृष्ण की दिव्य महारास लीला एवं अमृत खीर भोग।',
    descriptionMr: 'शरद ऋतूच्या शुभ्र चांदण्यात श्रीकृष्णांची दिव्य महारास लीला व केशर दूध-खीर नैवेद्य.',
    descriptionGu: 'શરદ પૂનમની શીતળ ચાંદનીમાં શ્રીકૃષ્ણની દિવ્ય મહારાસ લીલા અને અમૃત ખીરનો ભોગ.',
    status: 'upcoming',
    category: 'Moonlit Raas Leela',
    categoryHi: 'शरद रास लीला',
    categoryMr: 'शरद रास लीला',
    categoryGu: 'શરદ રાસ લીલા',
    filterGroup: 'leela',
    highlightsEn: [
      'Dhaval (all-white) silver-threaded silk vastras and fragrant mogra blossom garlands',
      'Courtyard classical Bansuri flute and Raas-Panchadhyayi devotional recital',
      'Moonlit evening Sandhya Aarti beneath open coastal skies at Shirgaon',
      'Distribution of saffron-cardamom Doodh-Kheer sanctified under the full moon'
    ],
    highlightsHi: [
      'श्वेत रेशमी धवल वस्त्र एवं मोगरा-चमेली की दिव्य पुष्पमाला शृंगार',
      'मंदिर प्रांगण में शास्त्रीय बांसुरी वादन एवं रास पंचाध्यायी गायन',
      'शरद पूर्णिमा की शीतल चांदनी में विशेष संध्या महाआरती',
      'चंद्रमा की किरणों में रखी केसरिया दूध-खीर महाप्रसाद का वितरण'
    ],
    highlightsMr: [
      'शुभ्र धवल रेशमी वस्त्रे व सुगंधी मोगऱ्याच्या गजऱ्यांचा शृंगार',
      'मंदिर प्रांगणात शास्त्रीय बासरी वादन आणि रासपंचाध्यायी पठण',
      'शिरगावच्या मोकळ्या आकाशाखाली शीतल चांदण्यात विशेष संध्या आरती',
      'चंद्रकिरणांत ठेवलेल्या केशर-वेलदोडा दूध-खीर प्रसादाचे वाटप'
    ],
    highlightsGu: [
      'ધવલ શ્વેત રેશમી વસ્ત્રો અને મોગરા-ચમેલીના પુષ્પોનો અલૌકિક શૃંગાર',
      'મંદિર પ્રાંગણમાં શાસ્ત્રીય બાંસુરી વાદન અને રાસપંચાધ્યાયી ગાન',
      'પૂર્ણિમાની શીતળ ચાંદનીમાં ખુલ્લા પ્રાંગણમાં વિશેષ સંધ્યા મહાઆરતી',
      'ચંદ્રપ્રકાશમાં સિદ્ધ કરાયેલ કેસર-એલચી દૂધ-પૌંઆ ખીરનો પ્રસાદ'
    ]
  },
  {
    id: 'narak_chaturdashi',
    titleEn: 'Narak Chaturdashi',
    titleHi: 'नरक चतुर्दशी',
    titleMr: 'नरक चतुर्दशी',
    titleGu: 'નરક ચતુર્દશી',
    month: 'Oct 2027',
    monthHi: 'अक्टूबर २०२७',
    monthMr: 'ऑक्टोबर २०२७',
    monthGu: 'ઓક્ટોબર ૨૦૨૭',
    dateStr: '28 Oct 2027 · Thursday',
    dateHi: '२८ अक्टूबर २०२७ · गुरुवार',
    dateMr: '२८ ऑक्टोबर २०२७ · गुरुवार',
    dateGu: '૨૮ ઓક્ટોબર ૨૦૨૭ · ગુરુવાર',
    timeStr: '05:30 AM – 09:00 AM',
    timeHi: 'प्रातः ०५:३० – ०९:००',
    timeMr: 'पहाटे ०५:३० – सकाळी ०९:००',
    timeGu: 'પ્રાતઃ ૦૫:૩૦ – સવારે ૦૯:૦૦',
    descriptionEn: 'Krishna defeated Narakasura.',
    descriptionHi: 'भगवान श्री कृष्ण द्वारा नरकासुर वध की स्मृति में मंगल दीपमालिका एवं प्रभात आराधना।',
    descriptionMr: 'भगवान श्रीकृष्णांनी नरकासुराचा वध केल्याच्या स्मृतीप्रित्यर्थ मंगल दीपोत्सव.',
    descriptionGu: 'ભગવાન શ્રીકૃષ્ણે નરકાસુરનો વધ કર્યો તે પાવન સ્મૃતિમાં મંગલ દીપોત્સવ.',
    status: 'upcoming',
    category: 'Dawn Deepotsav',
    categoryHi: 'प्रभात दीपोत्सव',
    categoryMr: 'मंगल दीपोत्सव',
    categoryGu: 'મંગલ દીપોત્સવ',
    filterGroup: 'leela',
    highlightsEn: [
      'Brahma Muhurta Mangala Darshan & sacred Abhyanga Snan ritual hymns',
      'Lighting of hundreds of earthen oil diyas across the sandstone steps and mandapa',
      'Special Tulsi Archana & conch resonance honoring Krishna’s victory over darkness',
      'Morning festive sweets, poha-chiwda & warm kesar milk prasad'
    ],
    highlightsHi: [
      'ब्रह्म मुहूर्त मंगल दर्शन एवं पावन वैदिक स्तोत्र पाठ',
      'मंदिर के पाषाण सोपानों व प्रांगण में सैकड़ों मंगल मिट्टी के दीपों का प्रज्वलन',
      'अंधकार पर प्रकाश की विजय हेतु विशेष तुलसी अर्चना एवं शंखनाद',
      'प्रातःकालीन दीपोत्सव मिष्ठान एवं केसर दूध महाप्रसाद वितरण'
    ],
    highlightsMr: [
      'ब्राह्म मुहूर्तावर मंगल दर्शन आणि पावन वेदमंत्र पठण',
      'मंदिराच्या दगडी पायऱ्या व प्रांगणात शेकडो पणत्यांचा मंगल दीपोत्सव',
      'अज्ञानाच्या अंधकारावर ज्ञानाच्या विजयासाठी विशेष तुळशी अर्चना',
      'सकाळी दिवाळी फराळ आणि केशर दुधाचा महाप्रसाद वाटप'
    ],
    highlightsGu: [
      'બ્રહ્મ મુહૂર્તમાં મંગળા દર્શન અને પાવન વૈદિક સ્તોત્ર પઠન',
      'મંદિરના પથ્થરના પગથિયાં અને પ્રાંગણમાં સેંકડો દીવડાઓની મંગલ દીપમાળા',
      'અંધકાર પર પ્રકાશના વિજય માટે વિશેષ તુલસી અર્ચના અને શંખનાદ',
      'પ્રાતઃકાળે દિવાળી મિષ્ટાન્ન અને કેસર દૂધનો પ્રસાદ વિતરણ'
    ]
  },
  {
    id: 'govardhan',
    titleEn: 'Govardhan Puja',
    titleHi: 'गोवर्धन पूजा',
    titleMr: 'गोवर्धन पूजा',
    titleGu: 'ગોવર્ધન પૂજા',
    month: 'Oct 2027',
    monthHi: 'अक्टूबर २०२७',
    monthMr: 'ऑक्टोबर २०२७',
    monthGu: 'ઓક્ટોબર ૨૦૨૭',
    dateStr: '30 Oct 2027 · Saturday',
    dateHi: '३० अक्टूबर २०२७ · शनिवार',
    dateMr: '३० ऑक्टोबर २०२७ · शनिवार',
    dateGu: '૩૦ ઓક્ટોબર ૨૦૨૭ · શનિવાર',
    timeStr: '11:00 AM – 03:00 PM',
    timeHi: 'प्रातः ११:०० – अपराह्न ०३:००',
    timeMr: 'सकाळी ११:०० – दुपारी ०३:००',
    timeGu: 'સવારે ૧૧:૦૦ – બપોરે ૦૩:૦૦',
    descriptionEn: 'Krishna lifted Govardhan Hill.',
    descriptionHi: 'भगवान श्री कृष्ण द्वारा गिरिराज गोवर्धन पर्वत धारण एवं भव्य १०८ व्यंजन अन्नकूट भोग।',
    descriptionMr: 'भगवान श्रीकृष्णांनी गोवर्धन पर्वत उचलल्याचा सोहळा आणि भव्य अन्नकूट महाभोग.',
    descriptionGu: 'ભગવાન શ્રીકૃષ્ણે ગિરિરાજ ગોવર્ધન પર્વત ધારણ કર્યો તે પ્રસંગે ભવ્ય અન્નકૂટ મહાભોગ.',
    status: 'upcoming',
    category: 'Sacred Annakut Bhog',
    categoryHi: 'अन्नकूट महाभोग',
    categoryMr: 'अन्नकूट महाभोग',
    categoryGu: 'અન્નકૂટ મહાભોગ',
    filterGroup: 'leela',
    highlightsEn: [
      'Traditional Giriraj Govardhan & Gau-mata Pujan in the morning courtyard',
      'Artistic multi-tiered Annakut display of 108 pure sattvik sweets, farsan & grains',
      'Noon Maha Rajbhog Aarti illuminated by brass Deepa-stambha lamps',
      'Sanctified Annakut Mahaprasad served to all visiting devotees and pilgrims'
    ],
    highlightsHi: [
      'प्रातः प्रांगण में पारंपरिक गिरिराज गोवर्धन एवं गौ-माता पूजन',
      '१०८ प्रकार के सात्त्विक पकवान, मिष्ठान एवं व्यंजनों की भव्य अन्नकूट झांकी',
      'मध्याह्न दीप-स्तंभ के प्रकाश में भव्य राजभोग महाआरती',
      'सभी दर्शनार्थियों एवं श्रद्धालुओं को पवित्र अन्नकूट महाप्रसाद वितरण'
    ],
    highlightsMr: [
      'सकाळी प्रांगणात पारंपरिक गिरिराज गोवर्धन व गोमाता पूजन',
      '१०८ प्रकारच्या सात्त्विक मिठाई, फळे व पक्वान्नांची भव्य अन्नकूट मांडणी',
      'दुपारी दीपमाळेच्या प्रकाशात भव्य राजभोग महाआरती',
      'सर्व भाविकांना पवित्र अन्नकूट महाप्रसादाचे वितरण'
    ],
    highlightsGu: [
      'સવારે પ્રાંગણમાં પરંપરાગત ગિરિરાજ ગોવર્ધન અને ગૌમાતા પૂજન',
      '૧૦૮ પ્રકારના સાત્ત્વિક મિષ્ટાન્ન, ફરસાણ અને અન્નરાશિની ભવ્ય અન્નકૂટ ઝાંખી',
      'મધ્યાહ્ને દીપસ્તંભના પ્રકાશમાં ભવ્ય રાજભોગ મહાઆરતી',
      'સર્વ ભક્તો અને યાત્રાળુઓને પવિત્ર અન્નકૂટ મહાપ્રસાદ વિતરણ'
    ]
  }
];

export const SEVA_OFFERINGS: SevaOffering[] = [
  {
    id: 'birthday_seva',
    titleEn: 'Birthday Devotional Seva',
    titleHi: 'जन्मदिन संकल्प सेवा',
    titleMr: 'वाढदिवस संकल्प सेवा',
    titleGu: 'જન્મદિવસ સંકલ્પ સેવા',
    descriptionEn: 'Offer special prayers, shankha abhishekam, and prasad distribution on the auspicious birthday of your loved ones.',
    descriptionHi: 'अपने स्वजनों के पावन जन्मदिन पर विशेष अर्चना, शंख अभिषेक एवं तीर्थयात्रियों में प्रसाद वितरण।',
    descriptionMr: 'आपल्या आप्तेष्टांच्या वाढदिवशी विशेष पूजा, शंख अभिषेक आणि भाविकांमध्ये महाप्रसाद वाटप.',
    descriptionGu: 'આપના સ્વજનોના જન્મદિવસ નિમિત્તે વિશેષ પૂજન, શંખ અભિષેક અને ભક્તોમાં પ્રસાદ વિતરણ.',
    proposedAmount: 1100,
    category: 'birthday',
    frequency: 'one-time'
  },
  {
    id: 'anniversary_seva',
    titleEn: 'Anniversary Kalyan Seva',
    titleHi: 'विवाह वर्षगांठ कल्याण सेवा',
    titleMr: 'लग्नाचा वाढदिवस कल्याण सेवा',
    titleGu: 'લગ્ન વર્ષગાંઠ કલ્યાણ સેવા',
    descriptionEn: 'Seek the blessings of Dwarkadhish for enduring harmony, prosperity, and spiritual companionship.',
    descriptionHi: 'दांपत्य जीवन में सुख, शांति, समृद्धि एवं आध्यात्मिक एकता हेतु प्रभु का पावन आशीर्वाद।',
    descriptionMr: 'वैवाहिक जीवनात अखंड सुख, समृद्धी आणि आध्यात्मिक एकात्मतेसाठी प्रभूंचा पावन आशीर्वाद.',
    descriptionGu: 'દાંપત્ય જીવનમાં સુખ, શાંતિ, સમૃદ્ધિ અને આધ્યાત્મિક સંવાદિતા માટે પ્રભુના આશીર્વાદ.',
    proposedAmount: 2100,
    category: 'anniversary',
    frequency: 'one-time'
  },
  {
    id: 'annadan_seva',
    titleEn: 'Mahaprasad & Anna Daan Seva',
    titleHi: 'महाप्रसाद एवं अन्नदान सेवा',
    titleMr: 'महाप्रसाद आणि अन्नदान सेवा',
    titleGu: 'મહાપ્રસાદ અને અન્નદાન સેવા',
    descriptionEn: 'Contribute to daily sanctified food distribution for visiting pilgrims and community devotees in Shirgaon.',
    descriptionHi: 'शिरगाव में दर्शन हेतु आने वाले तीर्थयात्रियों एवं संतों हेतु नित्य सात्त्विक महाप्रसाद वितरण में सहयोग।',
    descriptionMr: 'शिरगाव येथे दर्शनासाठी येणाऱ्या भाविक व साधुसंतांसाठी नित्य सात्त्विक महाप्रसाद वितरणात सहकार्य.',
    descriptionGu: 'શિરગાવ ખાતે દર્શનાર્થે આવતા યાત્રીઓ અને સંતો માટે નિત્ય સાત્ત્વિક મહાપ્રસાદ વિતરણમાં સહયોગ.',
    proposedAmount: 5100,
    category: 'annadan',
    frequency: 'one-time'
  },
  {
    id: 'pushpa_seva',
    titleEn: 'Daily Pushpa & Garland Seva',
    titleHi: 'नित्य पुष्प एवं दिव्य माला सेवा',
    titleMr: 'नित्य पुष्प आणि हार सेवा',
    titleGu: 'નિત્ય પુષ્પ અને દિવ્ય માળા સેવા',
    descriptionEn: 'Fresh fragrant lotus, tulsi manjaris, and marigold garlands for morning Shringaar and evening Sandhya Aarti.',
    descriptionHi: 'प्रातः शृंगार एवं सांध्य आरती हेतु सुगंधित ताजे कमल, तुलसी दल एवं गेंदे की भव्य मालाएं।',
    descriptionMr: 'सकाळच्या शृंगार व संध्या आरतीसाठी ताजी कमळे, तुळशी मंजिरी आणि झेंडूच्या सुंदर माळा.',
    descriptionGu: 'પ્રાતઃ શૃંગાર અને સંધ્યા આરતી માટે તાજા કમળ, તુલસી દલ અને ગલગોટાના પુષ્પહારો.',
    proposedAmount: 501,
    category: 'flowers',
    frequency: 'one-time'
  },
  {
    id: 'monthly_patron',
    titleEn: 'Monthly Nitya Seva Patron',
    titleHi: 'मासिक नित्य सेवा संरक्षक',
    titleMr: 'मासिक नित्य सेवा संरक्षक',
    titleGu: 'માસિક નિત્ય સેવા સંરક્ષક',
    descriptionEn: 'Sustained monthly support for sanctum lamps, camphor, daily incense, and temple cleanliness.',
    descriptionHi: 'गर्भगृह के नित्य अखंड दीप, कपूर, सुगंधित धूप एवं प्रांगण शुचिता हेतु निरंतर मासिक सहयोग।',
    descriptionMr: 'गर्भगृहातील नंदादीप, कापूर, सुगंधी अगरबत्ती आणि प्रांगण स्वच्छतेसाठी निरंतर मासिक सहकार्य.',
    descriptionGu: 'ગર્ભગૃહના નિત્ય અખંડ દીપ, કપૂર, સુગંધિત ધૂપ અને પરિસરની સ્વચ્છતા માટે માસિક સહયોગ.',
    proposedAmount: 1000,
    category: 'general',
    frequency: 'monthly'
  }
];

export const LEARNING_ITEMS: LearningItem[] = [
  {
    id: 'learn-gita-247',
    category: 'gita',
    titleEn: 'Karmanye Vadhikaraste (Chapter 2, Verse 47)',
    titleHi: 'कर्मण्येवाधिकारस्ते — निष्काम कर्म योग',
    titleMr: 'कर्मण्येवाधिकारस्ते — निष्काम कर्मयोग',
    titleGu: 'કર્મણ્યેવાધિકારસ્તે — નિષ્કામ કર્મ યોગ',
    summaryEn: 'The eternal principle of selfless duty performed without attachment to the fruit.',
    summaryHi: 'कर्म करने में ही तुम्हारा अधिकार है, फल में कभी नहीं — निष्काम कर्म का शाश्वत संदेश।',
    summaryMr: 'कर्म करण्यावरच तुझा अधिकार आहे, फळावर कधीही नाही — निष्काम कर्मयोगाचा शाश्वत संदेश.',
    summaryGu: 'કર્મ કરવામાં જ તારો અધિકાર છે, ફળ પર કદાપિ નહીં — નિષ્કામ કર્મનો શાશ્વત સંદેશ.',
    verseOrAuthor: 'Shrimad Bhagavad Gita 2.47',
    contentEn: 'Lord Krishna instructs Arjuna that duty must be anchored in righteous action rather than anxiety over results. At Shri Dwarkadhish Mandir in Shirgaon, devotees contemplate this timeless wisdom to dissolve everyday stress and approach work as a sacred offering to the Divine.',
    contentHi: 'भगवान श्री कृष्ण अर्जुन को उपदेश देते हैं कि मनुष्य का अधिकार केवल कर्म पर है, उसके परिणामों पर नहीं। शिरगाव के श्री द्वारकाधीश मंदिर में श्रद्धालु इस अमर ज्ञान का चिंतन करते हुए सांसारिक चिंताओं से मुक्त होकर अपने कर्मों को प्रभु चरणों में समर्पित करते हैं।',
    contentMr: 'भगवान श्रीकृष्ण अर्जुनाला मार्गदर्शन करतात की मनुष्याचा अधिकार केवळ कर्मावर आहे, त्याच्या फळावर नाही. शिरगावच्या श्री द्वारकाधीश मंदिरात भाविक या अमूल्य शिकवणीचे मनन करतात आणि रोजच्या जीवनातील तणाव दूर करून कर्म हीच ईश्वराची सेवा मानतात.',
    contentGu: 'ભગવાન શ્રીકૃષ્ણ અર્જુનને ઉપદેશ આપે છે કે મનુષ્યનો અધિકાર માત્ર કર્મ પર છે, તેના ફળ પર ક્યારેય નહીં. શિરગાવના શ્રી દ્વારકાધીશ મંદિરમાં ભક્તો આ અમર જ્ઞાનનું ચિંતન કરીને દૈનિક ચિંતાઓથી મુક્ત થઈ પોતાનું કર્મ પ્રભુચરણોમાં સમર્પિત કરે છે.',
    readTime: '3 min read'
  },
  {
    id: 'learn-dwarkadhish-swaroop',
    category: 'krishna_teachings',
    titleEn: 'The Divinity of Dwarkadhish: King, Protector & Refuge',
    titleHi: 'द्वारकाधीश स्वरूप रहस्य: राजा, रक्षक एवं शरणागत वत्सल',
    titleMr: 'द्वारकाधीश स्वरूप रहस्य: राजा, रक्षक आणि शरणागत वत्सल',
    titleGu: 'દ્વારકાધીશ સ્વરૂપ રહસ્ય: રાજા, રક્ષક અને શરણાગત વત્સલ',
    summaryEn: 'Understanding the shift from playful Braj Gopala to righteous sovereign Dwarkadhish.',
    summaryHi: 'वृंदावन के नटखट कन्हैया से द्वारका के धर्मराज द्वारकाधीश बनने का आध्यात्मिक मर्म।',
    summaryMr: 'वृंदावनातील लाडक्या कृष्णापासून ते द्वारकेचे धर्मराज द्वारकाधीश होण्याचा आध्यात्मिक प्रवास.',
    summaryGu: 'વૃંદાવનના નટખટ કન્હૈયાથી દ્વારકાના ધર્મરાજા દ્વારકાધીશ બનવાનું આધ્યાત્મિક રહસ્ય.',
    verseOrAuthor: 'Spiritual Discourse',
    contentEn: 'While Braj Leela highlights sweet intimacy (Madhurya Bhava), Dwaraka Leela exemplifies majesty, governance, and cosmic protection (Aishwarya Bhava). He is both the affectionate friend and the sovereign Lord who shields his devotees from all perils.',
    contentHi: 'ब्रज लीला जहाँ माधुर्य और प्रेम की पराकाष्ठा है, वहीं द्वारका लीला ऐश्वर्य, धर्म स्थापना और वैश्विक संरक्षण का प्रतीक है। प्रभु द्वारकाधीश अपने शरणागत भक्तों के समस्त संकटों को हरने वाले परम दयालु राजाधिराज हैं।',
    contentMr: 'ब्रज लीला ही प्रेमाची आणि भक्तीची परिसीमा आहे, तर द्वारका लीला ही ऐश्वर्य, धर्मरक्षण आणि सार्वभौम न्यायाचे प्रतीक आहे. प्रभु द्वारकाधीश हे शरणागत भक्तांचे सर्व संकटांतून रक्षण करणारे दयाळू राजे आहेत.',
    contentGu: 'વ્રજ લીલા જ્યાં માધુર્ય અને અગાધ પ્રેમની પરાકાષ્ઠા છે, ત્યાં દ્વારકા લીલા ઐશ્વર્ય, ધર્મ સ્થાપના અને વૈશ્વિક સંરક્ષણનું પ્રતીક છે. પ્રભુ દ્વારકાધીશ પોતાના શરણાગત ભક્તોના સર્વ સંકટો હરનારા પરમ દયાળુ રાજાધિરાજ છે.',
    readTime: '4 min read'
  },
  {
    id: 'learn-temple-inspiration',
    category: 'history',
    titleEn: 'The Inspiration Behind Dwarkadhish Mandir in Shirgaon',
    titleHi: 'शिरगाव में द्वारकाधीश मंदिर स्थापना की पावन प्रेरणा',
    titleMr: 'शिरगाव येथे द्वारकाधीश मंदिर स्थापनेची पावन प्रेरणा',
    titleGu: 'શિરગાવ ખાતે દ્વારકાધીશ મંદિર સ્થાપનાની પાવન પ્રેરણા',
    summaryEn: 'Bringing the timeless sanctuary of Lord Dwarkadhish closer to devotees across the North Konkan region.',
    summaryHi: 'उत्तर कोंकण व मुंबई-ठाणे क्षेत्र के श्रद्धालुओं हेतु भगवान द्वारकाधीश का पावन सान्निध्य।',
    summaryMr: 'उत्तर कोकण आणि मुंबई-ठाणे परिसरातील भाविकांसाठी भगवान द्वारकाधीशांचे पावन सान्निध्य.',
    summaryGu: 'ઉત્તર કોંકણ અને મુંબઈ-થાણે વિસ્તારના ભક્તો માટે ભગવાન દ્વારકાધીશનું પાવન સાંનિધ્ય.',
    verseOrAuthor: 'Temple Chronicle Note',
    contentEn: 'Consecrated to provide a sanctuary of peace away from urban cacophony, the temple at Shirgaon, Virar East reflects timeless Indian stone craft. Pink sandstone carvings evoke the solemn sanctity of traditional Vaishnav shrines.',
    contentHi: 'विरार पूर्व के शांत ग्राम्य वातावरण शिरगाव में निर्मित यह मंदिर केवल एक पाषाण संरचना नहीं, अपितु मुंबई व ठाणे-पालघर क्षेत्र के श्रद्धालुओं के लिए शांति व आत्मिक संबल का अनुपम तीर्थ है। पारंपरिक नक्काशीदार बलुआ पत्थर से निर्मित यह धाम दिव्य शांति का संचार करता है।',
    contentMr: 'विरार पूर्वेकडील शांत आणि निसर्गरम्य शिरगावमध्ये साकारलेले हे मंदिर भाविकांसाठी एक पवित्र आश्रयस्थान आहे. पारंपरिक दगडी कोरीव कामात बांधलेले हे मंदिर मुंबई आणि पालघर परिसरातील भाविकांसाठी मनःशांतीचे केंद्र बनले आहे.',
    contentGu: 'વિરાર પૂર્વના શાંત અને હરિયાળા શિરગાવમાં સ્થિત આ મંદિર માત્ર પાષાણ રચના નથી, પરંતુ મુંબઈ અને પાલઘર વિસ્તારના ભક્તો માટે શાંતિ અને આત્મિક બળનું પાવન તીર્થ છે.',
    readTime: '5 min read'
  }
];

export const SPIRITUAL_LEARNING_DATA = LEARNING_ITEMS;

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-hero',
    titleEn: 'Shri Dwarkadhish Mandir Sanctum & Shikhara',
    titleHi: 'श्री द्वारकाधीश मंदिर शिखर एवं प्रांगण',
    titleMr: 'श्री द्वारकाधीश मंदिर शिखर आणि प्रांगण',
    titleGu: 'શ્રી દ્વારકાધીશ મંદિર શિખર અને પરિસર',
    category: 'architecture',
    imageSrc: '/src/assets/images/temple_hero_dawn_1794088944176.jpg',
    captionEn: 'Nagara-style intricately carved pink sandstone shikhara rising gracefully against the morning horizon at Shirgaon, Virar.',
    captionHi: 'शिरगाव, विरार स्थित गुलाबी बलुआ पत्थर से निर्मित नागर शैली का भव्य शिखर दर्शन।',
    captionMr: 'शिरगाव, विरार येथील गुलाबी वाळूच्या दगडात साकारलेले नागर शैलीतील भव्य मंदिर शिखर.',
    captionGu: 'શિરગાવ, વિરાર સ્થિત ગુલાબી પથ્થરમાંથી કંડારાયેલું નાગર શૈલીનું ભવ્ય શિખર દર્શન.',
    isAuthenticShirgaon: true
  },
  {
    id: 'gal-mandap',
    titleEn: 'Intricately Carved Sabha Mandapa',
    titleHi: 'सभागृह एवं स्तंभों का सूक्ष्म शिल्प',
    titleMr: 'सभागृह आणि खांबांवरील अप्रतिम कोरीवकाम',
    titleGu: 'સભામંડપ અને સ્તંભોની સૂક્ષ્મ કોતરણી',
    category: 'interior',
    imageSrc: '/src/assets/images/temple_carving_mandap_1794088946438.jpg',
    captionEn: 'Hand-chiseled stone pillars with sacred floral and celestial motifs supporting the central sanctum dome.',
    captionHi: 'सभागृह के अलंकृत पाषाण स्तंभ जिन पर प्राचीन भारतीय मूर्तिकला एवं ज्यामितीय आकृतियाँ उकेरी गई हैं।',
    captionMr: 'मंदिराच्या सभामंडपातील नक्षीदार दगडी खांब आणि घुमटावरील प्राचीन भारतीय कलाकुसर.',
    captionGu: 'સભામંડપના અલંકૃત પાષાણ સ્તંભો જેના પર પવિત્ર પુષ્પો અને ભારતીય કલાની ભાત ઉપસેલી છે.',
    isAuthenticShirgaon: true
  },
  {
    id: 'gal-aarti',
    titleEn: 'Sandhya Aarti Twilight Gathering',
    titleHi: 'संध्या आरती दीप आराधना',
    titleMr: 'संध्या आरती दीप आराधना',
    titleGu: 'સંધ્યા આરતી દીપ આરાધના',
    category: 'rituals',
    imageSrc: '/src/assets/images/temple_evening_aarti_1794088947995.jpg',
    captionEn: 'Devotees singing devotional hymns as golden brass lamps illuminate the courtyard during sunset.',
    captionHi: 'सूर्यास्त के समय दीपों की स्वर्णिम आभा एवं शंख ध्वनि के मध्य भावविभोर श्रद्धालुगण।',
    captionMr: 'सूर्यास्ताच्या वेळी दिव्यांच्या सोनेरी प्रकाशात आणि शंखध्वनीत तल्लीन झालेले भाविक.',
    captionGu: 'સૂર્યાસ્ત સમયે દીવાઓના સુવર્ણ પ્રકાશ અને શંખનાદ વચ્ચે ભક્તિમાં લીન ભાવિકો.',
    isAuthenticShirgaon: true
  },
  {
    id: 'gal-swaroop',
    titleEn: 'Shri Dwarkadhish Bhagwan Sacred Idol Darshan',
    titleHi: 'श्री द्वारकाधीश भगवान दिव्य विग्रह दर्शन',
    titleMr: 'श्री द्वारकाधीश भगवान दिव्य मूर्ती दर्शन',
    titleGu: 'શ્રી દ્વારકાધીશ ભગવાન દિવ્ય મૂર્તિ દર્શન',
    category: 'interior',
    imageSrc: '/assets/aistudio/dwarkadhish_hero_enhanced_1600.webp',
    captionEn: 'Authentic high-resolution darshan of Lord Dwarkadhish in regal golden crown, vibrant pitambar, and floral garlands seated on the sacred black simhasana at Shirgaon, Virar East.',
    captionHi: 'शिरगाव, विरार स्थित भगवान श्री द्वारकाधीश का स्वर्ण मुकुट, भव्य पीताम्बर एवं पुष्प मालाओं से सुशोभित दिव्य विग्रह दर्शन।',
    captionMr: 'शिरगाव, विरार येथील भगवान श्री द्वारकाधीशांचे सुवर्ण मुकुट, दिव्य पितांबर आणि पुष्पहार परिधान केलेले अलौકિક मूर्ती दर्शन.',
    captionGu: 'શિરગાવ, વિરાર સ્થિત ભગવાન શ્રી દ્વારકાધીશનું સુવર્ણ મુકુટ, ભવ્ય પીતાંબર અને પુષ્પમાળાઓથી સુશોભિત દિવ્ય મૂર્તિ દર્શન.',
    isAuthenticShirgaon: true
  }
];

export interface VolunteerRole {
  id: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  titleGu: string;
  department: string;
  commitment: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionMr: string;
  descriptionGu: string;
  guidelinesEn: string;
  guidelinesHi: string;
  guidelinesMr: string;
  guidelinesGu: string;
}

export interface PatronSupportTier {
  id: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  nameGu: string;
  frequency: string;
  proposedAmount: number;
  purposeEn: string;
  purposeHi: string;
  purposeMr: string;
  purposeGu: string;
  termsEn: string;
  termsHi: string;
  termsMr: string;
  termsGu: string;
}

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'utsav_care',
    titleEn: 'Festival Crowd Assistance & Pilgrim Care',
    titleHi: 'उत्सव दर्शन एवं तीर्थयात्री सेवा',
    titleMr: 'उत्सव दर्शन आणि भाविक सेवा',
    titleGu: 'ઉત્સવ દર્શન અને યાત્રી સહાય સેવા',
    department: 'Pilgrim Hospitality',
    commitment: '3–4 hours on festival days',
    descriptionEn: 'Assist elderly pilgrims, families with small children, and direct orderly queues during high-attendance utsavs like Janmashtami and Annakut.',
    descriptionHi: 'जन्माष्टमी एवं अन्नकूट जैसे प्रमुख पर्वों पर वृद्ध श्रद्धालुओं, माताओं व बच्चों की सहायता एवं सुव्यवस्थित पंक्ति संचालन।',
    descriptionMr: 'जन्माष्टमी व अन्नकूट अशा मोठ्या उत्सवांमध्ये ज्येष्ठ नागरिक व लहान मुलांच्या कुटुंबांना मार्गदर्शन व दर्शन रांग व्यवस्थापन.',
    descriptionGu: 'જન્માષ્ટમી અને અન્નકૂટ જેવા મોટા મહોત્સવોમાં વરિષ્ઠ નાગરિકો, માતાઓ અને બાળકોની સહાયતા તેમજ સુવ્યવસ્થિત લાઇન સંચાલન.',
    guidelinesEn: 'Strict adherence to humility, polite speech, and calm demeanor at all times.',
    guidelinesHi: 'सर्वदा विनम्रता, मृदुभाषिता एवं शांत चित्त से श्रद्धालुओं की सेवा।',
    guidelinesMr: 'नेहमी नम्रता, गोड संवाद आणि शांततेने भाविकांची सेवा.',
    guidelinesGu: 'હંમેશાં નમ્રતા, મીઠો વ્યવહાર અને શાંત ચિત્તથી ભક્તોની સેવા કરવી.'
  },
  {
    id: 'annadan_service',
    titleEn: 'Anna Daan & Mahaprasad Seva',
    titleHi: 'अन्नदान एवं महाप्रसाद वितरण सेवा',
    titleMr: 'अन्नदान आणि महाप्रसाद वाटप सेवा',
    titleGu: 'અન્નદાન અને મહાપ્રસાદ વિતરણ સેવા',
    department: 'Sanctum Kitchen & Dining',
    commitment: '2 hours during afternoon/evening',
    descriptionEn: 'Support the orderly, hygienic serving of hot sanctified satvik meals to visiting pilgrims in the community dining hall.',
    descriptionHi: 'महाप्रसाद भवन में श्रद्धालुओं को अत्यंत शुचिता एवं आदरपूर्वक सात्त्विक भोजन परोसने में सहयोग।',
    descriptionMr: 'महाप्रसाद दालनात भाविकांना अत्यंत शुचिर्भूतपणे व आदराने सात्त्विक भोजन वाढण्यात सहकार्य.',
    descriptionGu: 'મહાપ્રસાદ ભવનમાં ભક્તોને અત્યંત પવિત્રતા અને આદરપૂર્વક સાત્ત્વિક ભોજન પીરસવામાં સહયોગ.',
    guidelinesEn: 'Clean attire, hand hygiene protocols, and respectful attitude towards food sanctification.',
    guidelinesHi: 'स्वच्छ वस्त्र, शुचिता एवं अन्न-प्रसाद के प्रति परम आदर का भाव।',
    guidelinesMr: 'स्वच्छ कपडे, स्वच्छता नियमांचे पालन आणि अन्नाप्रती आदरभाव.',
    guidelinesGu: 'સ્વચ્છ વસ્ત્રો, હાથની સ્વચ્છતા અને અન્ન-પ્રસાદ પ્રત્યે પરમ આદરભાવ રાખવો.'
  },
  {
    id: 'pushpa_rangoli',
    titleEn: 'Flower Seva & Floral Sanctum Decoration',
    titleHi: 'पुष्प संचयन एवं गर्भगृह शृंगार सेवा',
    titleMr: 'पुष्प सजावट आणि गर्भगृह शृंगार सेवा',
    titleGu: 'પુષ્પ સંચય અને ગર્ભગૃહ શૃંગાર સેવા',
    department: 'Sanctum Adornment',
    commitment: '1.5 hours in early morning',
    descriptionEn: 'Help string fresh lotus and marigold garlands, prepare fragrant tulsi manjaris, and craft auspicious courtyard rangolis at dawn.',
    descriptionHi: 'प्रातः वेला में ताजे कमल, गेंदा एवं तुलसी दलों की सुंदर मालाएं गूंथना एवं मंदिर प्रांगण में रंगोली रचना।',
    descriptionMr: 'सकाळच्या प्रहरी ताजी कमळे, झेंडू आणि तुळशीच्या सुंदर माळा गुंफणे व प्रांगणात रांगोळी काढणे.',
    descriptionGu: 'પ્રાતઃકાળે તાજા કમળ, ગલગોટા અને તુલસી દલના સુંદર હાર ગૂંથવા તેમજ મંદિર પ્રાંગણમાં રંગોળી સજાવવી.',
    guidelinesEn: 'Silent contemplative devotion while handling offerings for Lord Dwarkadhish.',
    guidelinesHi: 'प्रभु सेवा हेतु सामग्री तैयार करते समय मौन एवं प्रभु नाम स्मरण।',
    guidelinesMr: 'प्रभू सेवेसाठी साहित्य तयार करताना शांत व नामस्मरणयुक्त वृत्ती.',
    guidelinesGu: 'પ્રભુ સેવા માટે સામગ્રી તૈયાર કરતી વખતે મૌન અને ઈશ્વર સ્મરણ રાખવું.'
  }
];

export const PATRON_SUPPORT_TIERS: PatronSupportTier[] = [
  {
    id: 'deepam_patron',
    nameEn: 'Nitya Deepam & Fragrance Patron',
    nameHi: 'नित्य दीप एवं सुगंधी सेवा संरक्षक',
    nameMr: 'नित्य दीप आणि सुगंधी सेवा संरक्षक',
    nameGu: 'નિત્ય દીપ અને સુગંધી સેવા સંરક્ષક',
    frequency: 'Monthly Recurring (Proposed)',
    proposedAmount: 501,
    purposeEn: 'Sponsors pure cow ghee for the sanctum Akhanda deepams, organic dhoop, and raw camphor for daily aartis.',
    purposeHi: 'गर्भगृह के नंदादीप हेतु शुद्ध गोघृत, प्राकृतिक धूप एवं दैनिक आरती हेतु कपूर की व्यवस्था।',
    purposeMr: 'गर्भगृहातील नंदादीपासाठी शुद्ध गायीचे तूप, नैसर्गिक धूप आणि दैनिक आरतीसाठी कापूर.',
    purposeGu: 'ગર્ભગૃહના નંદાદીપ માટે શુદ્ધ ગાયનું ઘી, પ્રાકૃતિક ધૂપ અને દૈનિક આરતી માટે કપૂરની વ્યવસ્થા.',
    termsEn: 'No spiritual outcomes guaranteed; no priority darshan selling. Cancel anytime with 7 days notice in production.',
    termsHi: 'कोई चमत्कारी दावा या वीआईपी दर्शन विक्रय नहीं। कभी भी सहयोग समाप्त करने की पूर्ण स्वतंत्रता।',
    termsMr: 'कोणतीही हमी किंवा व्हीआयपी दर्शन विक्री नाही. सहकार्य थांबवण्याचे पूर्ण स्वातंत्र्य.',
    termsGu: 'કોઈ ચમત્કારિક દાવો કે વીઆઈપી દર્શન વેચાણ નથી. સહયોગ સમાપ્ત કરવાની પૂર્ણ સ્વતંત્રતા.'
  },
  {
    id: 'cleanliness_patron',
    nameEn: 'Mandir Shuchita (Cleanliness) Support',
    nameHi: 'मंदिर शुचिता एवं पवित्रता संरक्षक',
    nameMr: 'मंदिर स्वच्छता आणि पावित्र्य संरक्षक',
    nameGu: 'મંદિર સ્વચ્છતા અને પવિત્રતા સંરક્ષક',
    frequency: 'Monthly Recurring (Proposed)',
    proposedAmount: 1100,
    purposeEn: 'Underwrites continuous washing of sandstone courtyards, marble garbhagriha sanitation, and eco-friendly waste management.',
    purposeHi: 'नक्काशीदार बलुआ पत्थर प्रांगण की धुलाई, संगमरमर फर्श की नित्य शुचिता एवं पर्यावरण अनुकूल व्यवस्था।',
    purposeMr: 'दगडी प्रांगणाची स्वच्छता, संगमरवरी फरशीची नियमित स्वच्छता आणि पर्यावरणपूरक व्यवस्थापन.',
    purposeGu: 'કોતરણીવાળા પથ્થરના પ્રાંગણની ધોલાઈ, આરસપહાણ ગર્ભગૃહની સ્વચ્છતા અને પર્યાવરણને અનુકૂળ વ્યવસ્થા.',
    termsEn: 'Demonstration concept: Funds will settle exclusively into authorized temple account upon official registration.',
    termsHi: 'प्रदर्शन अवधारणा: आधिकारिक पंजीकरण के उपरांत ही राशि अधिकृत खाते में जमा होगी।',
    termsMr: 'संकल्पना प्रात्यक्षिक: अधिकृत नोंदणीनंतरच निधी अधिकृत बँक खात्यात जमा केला जाईल.',
    termsGu: 'પ્રદર્શન સંકલ્પના: સત્તાવાર નોંધણી પછી જ રકમ અધિકૃત બેંક ખાતામાં જમા થશે.'
  }
];

export const UI_TRANSLATIONS = {
  en: {
    templeName: 'Shri Dwarkadhish Mandir',
    locationSubtitle: 'Shirgaon, Virar East, Palghar, Maharashtra',
    heroTagline: 'A Spiritual Landmark in Virar',
    devotionalStatement: 'Where devotion meets divine grace.',
    discoverTemple: 'Discover the Temple',
    planVisit: 'Plan Your Visit',
    exploreSeva: 'Explore Seva Offerings',
    conceptDisclaimer: 'Independent Concept Demonstration — Not Official',
    disclaimerBanner: 'Independent Concept Demonstration — Not the official platform. Timings and offerings are proposed for review.',
    notGujaratWarning: 'Important: This temple is Shri Dwarkadhish Mandir in Shirgaon, Virar (Maharashtra), NOT the historical temple in Dwarka, Gujarat.',
    darshanSchedule: 'Darshan & Aarti Timings',
    confirmTimingsNotice: "Please confirm today's darshan timings with temple management before travelling.",
    festivalsHeading: 'Upcoming Festivals & Sacred Celebrations',
    sevaHeading: 'Devotional Seva & Offerings',
    learningHeading: 'Spiritual Learning & Discourses',
    galleryHeading: 'Temple Visual Journey',
    plannerHeading: 'Pilgrimage & Travel Guide',
    adminDashboard: 'Management Console',
    submitRequest: 'Submit Demonstration Request',
    bookingNote: 'Demonstration Mode: No payment is collected and no personal data is stored.',
    openTime: '06:00 AM – 09:00 PM',
    railwayStation: 'Virar Railway Station (Western Line, ~4.5 km)',
    parkingAvailable: 'Designated Visitor Parking Available',
    accessibility: 'Wheelchair Friendly Ramps at Main Courtyard',
    communityHeading: 'Community & Voluntary Participation',
    volunteerHeading: 'Seva Volunteer Opportunities',
    supportHeading: 'Patron Support & Mandir Upkeep'
  },
  hi: {
    templeName: 'श्री द्वारकाधीश मंदिर',
    locationSubtitle: 'शिरगाव, विरार पूर्व, पालघर, महाराष्ट्र',
    heroTagline: 'विरार का एक दिव्य आध्यात्मिक केंद्र',
    devotionalStatement: 'जहाँ श्रद्धा और ईश्वर की असीम कृपा का संगम होता है।',
    discoverTemple: 'मंदिर के दर्शन करें',
    planVisit: 'अपनी यात्रा की योजना बनाएं',
    exploreSeva: 'सेवा और संकल्प देखें',
    conceptDisclaimer: 'स्वतंत्र अवधारणा प्रदर्शन — अनौपचारिक',
    disclaimerBanner: 'स्वतंत्र अवधारणा प्रदर्शन — यह आधिकारिक मंच नहीं है। समय और सेवाएँ समीक्षा हेतु प्रस्तावित हैं।',
    notGujaratWarning: 'महत्वपूर्ण सूचना: यह मंदिर शिरगाव, विरार (महाराष्ट्र) में स्थित श्री द्वारकाधीश मंदिर है, द्वारका (गुजरात) का नहीं।',
    darshanSchedule: 'दर्शन एवं आरती समय सारणी',
    confirmTimingsNotice: 'कृपया यात्रा से पूर्व मंदिर प्रबंधन से आज के दर्शन समय की पुष्टि कर लें।',
    festivalsHeading: 'आगामी पावन पर्व एवं महोत्सव',
    sevaHeading: 'भक्ति सेवा एवं समर्पण',
    learningHeading: 'अध्यात्म ज्ञान एवं प्रवचन',
    galleryHeading: 'मंदिर छायाचित्र यात्रा',
    plannerHeading: 'तीर्थ यात्रा एवं मार्गदर्शिका',
    adminDashboard: 'मंदिर प्रबंधन कंसोल',
    submitRequest: 'प्रदर्शन अनुरोध सबमिट करें',
    bookingNote: 'प्रदर्शन मोड: कोई वास्तविक भुगतान अथवा व्यक्तिगत जानकारी एकत्र नहीं की जाती है।',
    openTime: 'प्रातः ०६:०० – रात्रि ०९:००',
    railwayStation: 'विरार रेलवे स्टेशन (पश्चिम रेलवे, लगभग ४.५ किमी)',
    parkingAvailable: 'श्रद्धालुओं हेतु निःशुल्क वाहन पार्किंग उपलब्ध',
    accessibility: 'मुख्य प्रांगण में दिव्यांग एवं वृद्धजनों हेतु व्हीलचेयर रैंप',
    communityHeading: 'सामुदायिक सत्संग एवं स्वैच्छिक सहभागिता',
    volunteerHeading: 'स्वैच्छिक सेवा अवसर',
    supportHeading: 'संरक्षक सहयोग एवं मंदिर शुचिता'
  },
  mr: {
    templeName: 'श्री द्वारकाधीश मंदिर',
    locationSubtitle: 'शिरगाव, विरार पूर्व, पालघर, महाराष्ट्र',
    heroTagline: 'विरारमधील एक भव्य आध्यात्मिक केंद्र',
    devotionalStatement: 'जिथे भक्ती आणि ईश्वराची कृपा एकत्र येतात.',
    discoverTemple: 'मंदिराचे दर्शन घ्या',
    planVisit: 'दर्शनाचे नियोजन करा',
    exploreSeva: 'सेवा आणि संकल्प पहा',
    conceptDisclaimer: 'स्वतंत्र संकल्पना सादरीकरण — अनधिकृत',
    disclaimerBanner: 'स्वतंत्र संकल्पना सादरीकरण — हे अधिकृत संकेतस्थळ नाही. वेळा आणि सेवा प्रस्तावित स्वरूपातील आहेत.',
    notGujaratWarning: 'महत्त्वाची नोंद: हे मंदिर शिरगाव, विरार (महाराष्ट्र) येथील श्री द्वारकाधीश मंदिर आहे; गुजरातमधील द्वारका मंदिर नाही.',
    darshanSchedule: 'दर्शन आणि आरतीची वेळ',
    confirmTimingsNotice: 'प्रवासाला निघण्यापूर्वी कृपया मंदिर प्रशासनाकडून आजच्या दर्शन वेळेची खात्री करून घ्या.',
    festivalsHeading: 'आगामी सण आणि उत्सव',
    sevaHeading: 'भक्ती सेवा आणि संकल्प',
    learningHeading: 'अध्यात्म ज्ञान आणि प्रवचन',
    galleryHeading: 'मंदिर छायाचित्र दर्शन',
    plannerHeading: 'तीर्थयात्रा आणि मार्गदर्शिका',
    adminDashboard: 'मंदिर प्रशासन डॅशबोर्ड',
    submitRequest: 'प्रात्यक्षिक विनंती सादर करा',
    bookingNote: 'प्रात्यक्षिक मोड: कोणतेही शुल्क आकारले जात नाही आणि वैयक्तिक माहिती साठवली जात नाही.',
    openTime: 'सकाळी ०६:०० – रात्री ०९:००',
    railwayStation: 'विरार रेल्वे स्थानक (पश्चिम रेल्वे, साधारण ४.५ किमी)',
    parkingAvailable: 'भाविकांसाठी स्वतंत्र वाहन पार्किंग उपलब्ध',
    accessibility: 'मुख्य प्रांगणात दिव्यांग व ज्येष्ठांसाठी व्हीलचेअर रॅम्प',
    communityHeading: 'सामुदायिक सहभाग आणि ऐच्छिक सेवा',
    volunteerHeading: 'ऐच्छिक सेवा संधी',
    supportHeading: 'संरक्षक सहकार्य आणि मंदिर स्वच्छता'
  },
  gu: {
    templeName: 'શ્રી દ્વારકાધીશ મંદિર',
    locationSubtitle: 'શિરગાવ, વિરાર પૂર્વ, પાલઘર, મહારાષ્ટ્ર',
    heroTagline: 'વિરારનું એક દિવ્ય આધ્યાત્મિક ધામ',
    devotionalStatement: 'જ્યાં શ્રદ્ધા અને ઈશ્વરની અસીમ કૃપાનો સંગમ થાય છે.',
    discoverTemple: 'મંદિરના દર્શન કરો',
    planVisit: 'યાત્રાનું આયોજન કરો',
    exploreSeva: 'સેવા અને સંકલ્પ જુઓ',
    conceptDisclaimer: 'સ્વતંત્ર સંકલ્પના પ્રસ્તુતિ — અનૌપચારિક',
    disclaimerBanner: 'સ્વતંત્ર સંકલ્પના પ્રસ્તુતિ — આ સત્તાવાર પ્લેટફોર્મ નથી. સમય અને સેવાઓ સમીક્ષા માટે પ્રસ્તાવિત છે.',
    notGujaratWarning: 'મહત્વપૂર્ણ સૂચના: આ મંદિર શિરગાવ, વિરાર (મહારાષ્ટ્ર) ખાતે સ્થિત શ્રી દ્વારકાધીશ મંદિર છે, ગુજરાતના દ્વારકાનું નહીં.',
    darshanSchedule: 'દર્શન અને આરતી સમયપત્રક',
    confirmTimingsNotice: 'યાત્રા પૂર્વે કૃપા કરીને મંદિર વ્યવસ્થાપન પાસેથી આજના દર્શન સમયની ખાતરી કરશો.',
    festivalsHeading: 'આગામી પાવન પર્વ અને મહોત્સવ',
    sevaHeading: 'ભક્તિ સેવા અને સંકલ્પ',
    learningHeading: 'અધ્યાત્મ જ્ઞાન અને પ્રવચન',
    galleryHeading: 'મંદિર ચિત્ર દર્શન',
    plannerHeading: 'તીર્થયાત્રા અને માર્ગદર્શિકા',
    adminDashboard: 'મંદિર વ્યવસ્થાપન કન્સોલ',
    submitRequest: 'પ્રદર્શન વિનંતી સબમિટ કરો',
    bookingNote: 'પ્રદર્શન મોડ: કોઈ વાસ્તવિક ચૂકવણી લેવાતી નથી કે વ્યક્તિગત માહિતી સંગ્રહિત થતી નથી.',
    openTime: 'સવારે ૦૬:૦૦ – રાત્રે ૦૯:૦૦',
    railwayStation: 'વિરાર રેલવે સ્ટેશન (પશ્ચિમ રેલવે, આશરે ૪.૫ કિમી)',
    parkingAvailable: 'ભક્તો માટે નિઃશુલ્ક વાહન પાર્કિંગ સુવિધા',
    accessibility: 'મુખ્ય પ્રાંગણમાં દિવ્યાંગ અને વરિષ્ઠ નાગરિકો માટે વ્હીલચેયર રેમ્પ',
    communityHeading: 'સામુદયિક સત્સંગ અને સ્વૈચ્છિક સહભાગિતા',
    volunteerHeading: 'સ્વૈચ્છિક સેવાના અવસર',
    supportHeading: 'સંરક્ષક સહયોગ અને મંદિર સ્વચ્છતા'
  }
};
