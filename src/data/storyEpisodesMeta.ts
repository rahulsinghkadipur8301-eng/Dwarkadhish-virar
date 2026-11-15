import { Language } from './templeData';

export interface StoryEpisodeMeta {
  id: number;
  poster: string;
  durationSeconds: number;
  contentVerified: boolean;
  title: Record<Language, string>;
  summary: Record<Language, string>;
}

export const STORY_EPISODES_META: StoryEpisodeMeta[] = [
  {
    id: 1,
    poster: '/assets/story/part_01.webp',
    durationSeconds: 91,
    contentVerified: true,
    title: {
      en: 'The Longing for Dwarka',
      hi: 'द्वारका के दर्शन की अभिलाषा',
      mr: 'द्वारकेच्या दर्शनाची ओढ',
      gu: 'દ્વારકાના દર્શનની ઝંખના',
    },
    summary: {
      en: 'Standing in Dwarka by the sea, Pravina H. Thakur shares her prayer to bring Dwarkadhish closer to devotees in Virar.',
      hi: 'समुद्र तट पर स्थित द्वारका में खड़े होकर प्रवीणा एच. ठाकुर विरार में प्रतिदिन द्वारकाधीश दर्शन की प्रार्थना साझा करती हैं।',
      mr: 'द्वारकेच्या सागरकिनारी उभे राहून प्रवीणा एच. ठाकूर विरारमध्ये द्वारकाधीशांचे सान्निध्य लाभण्याची प्रार्थना मांडतात.',
      gu: 'દ્વારકાના સમુદ્રતટે ઊભા રહીને પ્રવીણા એચ. ઠાકુર વિરારમાં દ્વારકાધીશના નિત્ય દર્શનની પ્રાર્થના વ્યક્ત કરે છે.',
    },
  },
  {
    id: 2,
    poster: '/assets/story/part_02.webp',
    durationSeconds: 83,
    contentVerified: true,
    title: {
      en: '25 Years of Devotion & Resolve',
      hi: '२५ वर्षों की भक्ति और संकल्प',
      mr: '२५ वर्षांची भक्ती आणि संकल्प',
      gu: '૨૫ વર્ષની ભક્તિ અને સંકલ્પ',
    },
    summary: {
      en: 'After 25 years of annual pilgrimages to Dwarka since 2000, the sankalp to build a mandir in Virar receives Hitendra Thakur’s immediate blessing.',
      hi: 'सन् २००० से निरंतर २५ वर्षों की द्वारका यात्रा के पश्चात विरार में मंदिर निर्माण के संकल्प को हितेंद्र ठाकुर जी का तुरंत समर्थन मिलता है।',
      mr: '२००० सालापासून सलग २५ वर्षांच्या द्वारका यात्रेनंतर विरारमध्ये मंदिर उभारण्याच्या संकल्पाला हितेंद्र ठाकूर यांची तात्काळ संमती मिळते.',
      gu: 'ઈ.સ. ૨૦૦૦થી સતત ૨૫ વર્ષની દ્વારકા યાત્રા બાદ વિરારમાં મંદિર નિર્માણના સંકલ્પને હિતેન્દ્ર ઠાકુરની સહજ સંમતિ મળે છે.',
    },
  },
  {
    id: 3,
    poster: '/assets/story/part_03.webp',
    durationSeconds: 74,
    contentVerified: true,
    title: {
      en: 'Dharma With Karma',
      hi: 'कर्म के साथ धर्म का संगम',
      mr: 'कर्मासोबत धर्माचा संगम',
      gu: 'કર્મ સાથે ધર્મનો સંગમ',
    },
    summary: {
      en: 'Sri Hitendra Thakur recounts uniting the grand temple vision with community seva—pairing devotion with elder care and shelter.',
      hi: 'श्री हितेंद्र ठाकुर बताते हैं कि कैसे मंदिर निर्माण को वृद्धाश्रम व अनाथ आश्रम जैसी समाजसेवा से जोड़कर धर्म और कर्म को एक सूत्र में पिरोया गया।',
      mr: 'श्री हितेंद्र ठाकूर मंदिराच्या भव्य स्वप्नाला वृद्धाश्रम आणि अनाथालयासारख्या सेवाकार्याशी जोडून धर्म व कर्म एकत्र आणण्याची भूमिका मांडतात.',
      gu: 'શ્રી હિતેન્દ્ર ઠાકુર મંદિર નિર્માણને વૃદ્ધાશ્રમ અને અનાથાશ્રમ જેવી સેવા પ્રવૃત્તિઓ સાથે જોડી ધર્મ અને કર્મના સમન્વયની વાત કરે છે.',
    },
  },
  {
    id: 4,
    poster: '/assets/story/part_04.webp',
    durationSeconds: 47,
    contentVerified: true,
    title: {
      en: 'Searching for a Quiet Sanctuary',
      hi: 'शांत एवं हरित भूमि की खोज',
      mr: 'शांत व निसर्गरम्य भूमीचा शोध',
      gu: 'શાંત અને હરિયાળી ભૂમિની શોધ',
    },
    summary: {
      en: 'Seeking greenery, flowing water, and stillness away from city traffic so the temple would feel like peaceful Gokul.',
      hi: 'शहर के कोलाहल से दूर हरियाली, जल और शांतिपूर्ण वातावरण की तलाश, ताकि मंदिर परिसर गोकुल जैसी पावन अनुभूति दे सके।',
      mr: 'शहराच्या गोंगाटापासून दूर हिरवळ, जलाशय आणि शांत परिसराचा शोध, जेणेकरून मंदिर गोकुळसारखे शांत वाटेल.',
      gu: 'શહેરના ઘોંઘાટથી દૂર હરિયાળી, જળાશય અને શાંત વાતાવરણની શોધ, જેથી મંદિર ગોકુળ જેવી શાંતિ આપે.',
    },
  },
  {
    id: 5,
    poster: '/assets/story/part_05.webp',
    durationSeconds: 70,
    contentVerified: true,
    title: {
      en: 'Govardhan Hill & Yamuna in Shirgaon',
      hi: 'शिरगाव में गोवर्धन और यमुना का संगम',
      mr: 'शिरगावमध्ये गोवर्धन आणि यमुनेचा संगम',
      gu: 'શિરગાવમાં ગોવર્ધન અને યમુનાનો સંગમ',
    },
    summary: {
      en: 'In Shirgaon, a serene green site framed by a front hill like Govardhan and a tranquil lake like Yamuna becomes the chosen ground.',
      hi: 'शिरगाव में सामने पहाड़ी (गोवर्धन पर्वत सम) और पीछे शांत झील (यमुना सम) से सुसज्जित भूमि को मंदिर हेतु चुना जाता है।',
      mr: 'शिरगावात समोर टेकडी (गोवर्धन पर्वतासमान) आणि मागे शांत तलाव (यमुनेप्रमाणे) असलेल्या पवित्र भूमीची निवड होते.',
      gu: 'શિરગાવમાં સામે પર્વત (ગોવર્ધન સમાન) અને પાછળ શાંત તળાવ (યમુનાજી સમાન) ધરાવતી પવિત્ર ભૂમિની પસંદગી થાય છે.',
    },
  },
  {
    id: 6,
    poster: '/assets/story/part_06.webp',
    durationSeconds: 75,
    contentVerified: true,
    title: {
      en: 'Pure Stone Craft & Bansi Paharpur',
      hi: 'प्राचीन पाषाण शिल्प एवं बंसी पहाड़पुर',
      mr: 'पारंपरिक पाषाण शिल्प आणि बन्सी पहाडपूर',
      gu: 'પ્રાચીન પાષાણ શિલ્પ અને બંસી પહાડપુર',
    },
    summary: {
      en: 'Determined to build solely in stone without cement or iron, brother Kiran connects with architect Raju Bhai Mistry to source sandstone from Rajasthan.',
      hi: 'बिना सीमेंट व लोहे के शुद्ध पाषाण मंदिर निर्माण हेतु भाई किरण सोमपुरा शिल्पकार राजू भाई मिस्त्री से जुड़कर राजस्थान से बलुआ पत्थर लाते हैं।',
      mr: 'सिमेंट व लोखंडाविना शुद्ध दगडी मंदिरासाठी बंधू किरण सोमपुरा शिल्पकार राजू भाई मिस्त्री यांच्या मदतीने राजस्थानमधून वालुकाश्म निवडतात.',
      gu: 'સિમેન્ટ કે લોખંડ વિના શુદ્ધ પથ્થરનું મંદિર રચવા ભાઈ કિરણ સોમપુરા સ્થપતિ રાજુભાઈ મિસ્ત્રી સાથે રાજસ્થાનથી પથ્થર પસંદ કરે છે.',
    },
  },
  {
    id: 7,
    poster: '/assets/story/part_07.webp',
    durationSeconds: 96,
    contentVerified: true,
    title: {
      en: 'The Passing of Brother Kiran',
      hi: 'भाई किरण के वियोग की कठिन घड़ी',
      mr: 'बंधू किरण यांच्या निधनाचा कठीण काळ',
      gu: 'ભાઈ કિરણના અવસાનની કઠિન ઘડી',
    },
    summary: {
      en: 'Even as construction rises with Kiran’s wholehearted dedication, his sudden passing leaves the family and temple journey deeply bereaved.',
      hi: 'किरण जी के समर्पण से जब मंदिर निर्माण गति पकड़ रहा था, तभी उनके आकस्मिक निधन से परिवार गहरे शोक में डूब जाता है।',
      mr: 'किरण यांच्या समर्पणाने मंदिर बांधकाम वेग घेत असतानाच त्यांच्या आकस्मिक निधनाने कुटुंबावर दुःखाचा डोंगर कोसळतो.',
      gu: 'ભાઈ કિરણના સમર્પણથી મંદિર નિર્માણ આગળ વધી રહ્યું હતું ત્યારે તેમના અચાનક અવસાનથી પરિવાર ઊંડા શોકમાં ડૂબી જાય છે.',
    },
  },
  {
    id: 8,
    poster: '/assets/story/part_08.webp',
    durationSeconds: 92,
    contentVerified: true,
    title: {
      en: 'A Dream That Restored the Resolve',
      hi: 'एक स्वप्न जिसने संकल्प को पुनर्जीवित किया',
      mr: 'संकल्प पुन्हा जागवणारे एक दिव्य स्वप्न',
      gu: 'સંકલ્પને પુનર્જીવિત કરનારું દિવ્ય સ્વપ્ન',
    },
    summary: {
      en: 'Through grief and encouragement from Hitendra Thakur and her three sons, a peaceful dream of Kiran on the temple steps renews Pravina’s determination.',
      hi: 'गहन शोक के बीच हितेंद्र ठाकुर व पुत्रों के संबल तथा मंदिर की सीढ़ियों पर किरण जी के शांत स्वप्न से निर्माण कार्य पुनः आरंभ होता है।',
      mr: 'शोककाळात हितेंद्र ठाकूर व मुलांच्या आधारासोबत मंदिराच्या पायऱ्यांवरील किरण यांच्या स्वप्नामुळे काम पुन्हा सुरू करण्याचे बळ मिळते.',
      gu: 'શોકની વચ્ચે હિતેન્દ્ર ઠાકુર અને પુત્રોના સહારા તથા મંદિરના પગથિયે કિરણના શાંત સ્વપ્નથી નિર્માણ ફરી શરૂ કરવાની શક્તિ મળે છે.',
    },
  },
  {
    id: 9,
    poster: '/assets/story/part_09.webp',
    durationSeconds: 75,
    contentVerified: true,
    title: {
      en: 'Lockdown Pause & Patient Perseverance',
      hi: 'लॉकडाउन का विराम और धैर्यपूर्ण प्रतीक्षा',
      mr: 'लॉकडाऊनचा विराम आणि अढळ संयम',
      gu: 'લોકડાઉનનો વિરામ અને અડગ ધીરજ',
    },
    summary: {
      en: 'Soon after work resumes, the pandemic lockdown halts movement as stone artisans return home during Holi, testing faith and patience.',
      hi: 'निर्माण कार्य फिर आरंभ होते ही कोविड लॉकडाउन के कारण होली पर घर गए शिल्पकार लौट नहीं पाते और कार्य कुछ समय रुक जाता है।',
      mr: 'काम पुन्हा सुरू होताच कोविड लॉकडाऊनमुळे होळीसाठी गावी गेलेले कारागीर परतू शकत नाहीत आणि बांधकाम काही काळ थांबते.',
      gu: 'કામ ફરી શરૂ થતાં જ કોવિડ લોકડાઉનને કારણે હોળીમાં વતન ગયેલા કારીગરો પરત આવી ન શકતા કાર્ય અટકે છે.',
    },
  },
  {
    id: 10,
    poster: '/assets/story/part_10.webp',
    durationSeconds: 55,
    contentVerified: true,
    title: {
      en: 'Steadfast Artisans & A Promise Honored',
      hi: 'शिल्पकारों की निष्ठा और वचन का निर्वाह',
      mr: 'कारागिरांची निष्ठा आणि वचनाची पूर्तता',
      gu: 'શિલ્પકારોની નિષ્ઠા અને વચનનું પાલન',
    },
    summary: {
      en: 'Honoring his promise to Kiran even as carvers are called nationwide, Raju Bhai brings master craftsman Latif Bhai to see the shrine through.',
      hi: 'शिल्पकारों की कमी के बीच भी किरण जी को दिए वचन का मान रखते हुए राजू भाई कुशल कारीगर लतीफ भाई के साथ मंदिर को पूर्ण करते हैं।',
      mr: 'कारागिरांच्या टंचाईतही किरण यांना दिलेले वचन पाळत राजू भाई यांनी कुशल शिल्पकार लतीफ भाईंच्या साथीने कार्य अखंड पुढे नेले.',
      gu: 'કારીગરોની અછત વચ્ચે પણ ભાઈ કિરણને આપેલા વચનને નિભાવતા રાજુભાઈએ શિલ્પકાર લતીફભાઈના સંગાથે મંદિર પૂર્ણ કર્યું.',
    },
  },
  {
    id: 11,
    poster: '/assets/story/part_11.webp',
    durationSeconds: 74,
    contentVerified: true,
    title: {
      en: 'Conceiving Rajadhiraj: King of Dwarka',
      hi: 'द्वारका के राजाधिराज स्वरूप की परिकल्पना',
      mr: 'द्वारकेच्या राजाधिराज स्वरूपाची परिकल्पना',
      gu: 'દ્વારકાના રાજાધિરાજ સ્વરૂપની પરિકલ્પના',
    },
    summary: {
      en: 'Envisioning Lord Krishna with royal sovereign grace, Padma Shri Vasudeo Kamath studies scripture and draws three sketches for the vigraha.',
      hi: 'श्रीकृष्ण के राजसी राजाधिराज स्वरूप की कल्पना को साकार करने हेतु पद्मश्री वासुदेव कामत शास्त्रों का अध्ययन कर तीन प्रारंभिक चित्र बनाते हैं।',
      mr: 'श्रीकृष्णांच्या राजेशाही राजाधिराज रूपाची कल्पना साकारण्यासाठी पद्मश्री वासुदेव कामत शास्त्राभ्यास करून तीन रेखाचित्रे तयार करतात.',
      gu: 'શ્રીકૃષ્ણના રાજવી રાજાધિરાજ સ્વરૂપને સાકાર કરવા પદ્મશ્રી વાસુદેવ કામત શાસ્ત્રોનો અભ્યાસ કરી ત્રણ રેખાચિત્રો તૈયાર કરે છે.',
    },
  },
  {
    id: 12,
    poster: '/assets/story/part_12.webp',
    durationSeconds: 115,
    contentVerified: true,
    title: {
      en: '56 Steps, 24 Avatars & 108 Names',
      hi: '५६ सीढ़ियाँ, २४ अवतार और १०८ नाम',
      mr: '५६ पायऱ्या, २४ अवतार आणि १०८ नावे',
      gu: '૫૬ પગથિયાં, ૨૪ અવતાર અને ૧૦૮ નામો',
    },
    summary: {
      en: 'An intimate architectural tour of the 56 steps, pillars carved with 24 Bhagavata avatars, Navagraha ceiling, Raas Leela dome, and pradakshina path.',
      hi: 'मूल द्वारका सम ५६ सीढ़ियों, २४ अवतारों वाले स्तंभों, नवग्रह छत, रासलीला गुंबद और प्रदक्षिणा पथ पर १०८ नाम व १८ लीलाओं का दर्शन।',
      mr: 'द्वारकेप्रमाणे ५६ पायऱ्या, २४ अवतारांचे कोरीव स्तंभ, नवग्रह छत, रासलीला घुमट आणि प्रदक्षिणा मार्गावरील १०८ नावे व १८ लीला.',
      gu: 'દ્વારકા સમ ૫૬ પગથિયાં, ૨૪ અવતારોના કોતરણીયુક્ત સ્તંભ, નવગ્રહ છત, રાસલીલા ઘુમ્મટ અને પ્રદક્ષિણા પથ પર ૧૦૮ નામો.',
    },
  },
  {
    id: 13,
    poster: '/assets/story/part_13.webp',
    durationSeconds: 93,
    contentVerified: true,
    title: {
      en: 'Sacred Rituals & Temple of Faith',
      hi: 'पावन अनुष्ठान और अटूट आस्था का मंदिर',
      mr: 'पवित्र विधी आणि अढळ श्रद्धेचे मंदिर',
      gu: 'પવિત્ર અનુષ્ઠાન અને અતૂટ શ્રદ્ધાનું મંદિર',
    },
    summary: {
      en: 'Through Kalash Yatra, Vedic havan, and years of devotion, hand-carved sandstone rises into a living shrine built on unshakeable faith.',
      hi: 'कलश यात्रा, वैदिक हवन व वर्षों के समर्पण से तराशा गया गुलाबी बलुआ पत्थर अटूट श्रद्धा से निर्मित जीवंत पावन धाम में परिवर्तित होता है।',
      mr: 'कलश यात्रा, वैदिक हवन आणि अनेक वर्षांच्या समर्पणातून कोरीव पाषाण हे केवळ दगडाचे नव्हे, तर अढळ श्रद्धेचे मंदिर बनते.',
      gu: 'કળશ યાત્રા, વૈદિક હવન અને વર્ષોના સમર્પણથી કોતરાયેલો પથ્થર માત્ર શિલા નહીં પરંતુ અતૂટ શ્રદ્ધાનું મંદિર બની રહે છે.',
    },
  },
  {
    id: 14,
    poster: '/assets/story/part_14.webp',
    durationSeconds: 99,
    contentVerified: true,
    title: {
      en: 'Pran Pratishtha: Dwarkadhish Arrives',
      hi: 'प्राण प्रतिष्ठा: विरार में पधारे द्वारकाधीश',
      mr: 'प्राणप्रतिष्ठा: विरारमध्ये द्वारकाधीशांचे आगमन',
      gu: 'પ્રાણપ્રતિષ્ઠા: વિરારમાં પધાર્યા દ્વારકાધીશ',
    },
    summary: {
      en: 'Saints, chants, and joyous devotees gather for the November 2025 Pran Pratishtha as Lord Dwarkadhish graces Shirgaon with his eternal presence.',
      hi: 'नवंबर २०२५ की भव्य प्राण प्रतिष्ठा में संतों व हजारों श्रद्धालुओं के जयघोष के मध्य भगवान द्वारकाधीश शिरगाव में विराजमान होते हैं।',
      mr: 'नोव्हेंबर २०२५ च्या मंगल प्राणप्रतिष्ठेत संत-महंत आणि भाविकांच्या जयघोषात भगवान द्वारकाधीश शिरगावमध्ये विराजमान होतात.',
      gu: 'નવેમ્બર ૨૦૨૫ના મંગળ પ્રાણપ્રતિષ્ઠા મહોત્સવમાં સંતો અને ભક્તોના જયઘોષ વચ્ચે ભગવાન દ્વારકાધીશ શિરગાવમાં બિરાજમાન થાય છે.',
    },
  },
];

export function formatEpisodeDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const whole = Math.round(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getNextEpisodeId(currentId: number, total = STORY_EPISODES_META.length): number {
  const index = STORY_EPISODES_META.findIndex((ep) => ep.id === currentId);
  if (index === -1 || total <= 0) return STORY_EPISODES_META[0]?.id ?? 1;
  return STORY_EPISODES_META[(index + 1) % STORY_EPISODES_META.length].id;
}

export function getPreviousEpisodeId(currentId: number, total = STORY_EPISODES_META.length): number {
  const index = STORY_EPISODES_META.findIndex((ep) => ep.id === currentId);
  if (index === -1 || total <= 0) return STORY_EPISODES_META[0]?.id ?? 1;
  return STORY_EPISODES_META[(index - 1 + STORY_EPISODES_META.length) % STORY_EPISODES_META.length].id;
}
