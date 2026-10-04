// CHANNI TRANSPORT - Central Configuration File

export interface PhoneInfo {
  raw: string;
  display: string;
  label: string;
  person: string;
}

export interface StatsItem {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
}

export const CONFIG = {
  brandName: 'CHANNI TRANSPORT',
  tagline: {
    en: 'Trust On Every Journey',
    hi: 'भरोसा हर सफर का',
    pa: 'ਭਰੋਸਾ ਹਰ ਸਫ਼ਰ ਦਾ',
  },
  taglineEn: 'Trust On Every Journey',
  adminEmail: 'admin@channitransport.com',
  adminPasswordHash: 'channi2026',
  googleReviewsLink: 'https://maps.google.com/?q=Samana+Punjab+Channi+Transport',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55152.02949704253!2d76.15570889270923!3d30.15568164010373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391032df37b42aa1%3A0x6a05e2632ffecbe5!2sSamana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  phones: [
    {
      raw: '+917508260068',
      display: '+91 75082 60068',
      label: 'Primary Dispatch',
      person: 'Dispatcher',
    },
    {
      raw: '+917837146640',
      display: '+91 78371 46640',
      label: 'Owner Direct',
      person: 'Channi',
    },
  ] as PhoneInfo[],
  whatsapp: {
    link: 'https://wa.me/917508260068',
    defaultMessage: 'Hello Channi Transport, I need a tempo.',
  },
  colors: {
    black: '#0B0B0B',
    gold: '#C9A96E',
    goldLight: '#E4C88E',
    ivory: '#FAF7F2',
  },
  location: {
    city: 'Samana',
    district: 'Patiala',
    state: 'Punjab',
    country: 'India',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55152.02949704253!2d76.15570889270923!3d30.15568164010373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391032df37b42aa1%3A0x6a05e2632ffecbe5!2sSamana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  stats: [
    { id: 'years', value: 12, suffix: '+', labelKey: 'stat_years' },
    { id: 'trips', value: 15000, suffix: '+', labelKey: 'stat_trips' },
    { id: 'customers', value: 4500, suffix: '+', labelKey: 'stat_customers' },
    { id: 'rating', value: 99, suffix: '%', labelKey: 'stat_satisfaction' },
  ] as StatsItem[],
  frames: {
    totalFrames: 240,
    fps: 24,
    framePath: (index: number) =>
      `/frames/frame_${String(index).padStart(4, '0')}.webp`,
    fallbackVideo: '/video/tempo.mp4',
  },
};

export const PHONE_NUMBERS = CONFIG.phones;
export const PRIMARY_WHATSAPP_LINK = `${CONFIG.whatsapp.link}?text=${encodeURIComponent(CONFIG.whatsapp.defaultMessage)}`;

export const CHAPTERS = [
  { number: '01', titleKey: 'chapter1_title', descKey: 'chapter1_desc' },
  { number: '02', titleKey: 'chapter2_title', descKey: 'chapter2_desc' },
  { number: '03', titleKey: 'chapter3_title', descKey: 'chapter3_desc' },
  { number: '04', titleKey: 'chapter4_title', descKey: 'chapter4_desc' },
];

export const TRANSLATIONS: Record<string, any> = {
  en: {
    brand_name: 'CHANNI TRANSPORT',
    tagline: 'Trust On Every Journey',
    callUsNow: 'Call Now',
    whatsappUs: 'WhatsApp Dispatch',
    selectPhoneTitle: 'Select Direct Dispatch Line',
    selectPhoneSubtitle: 'Call us 24/7 for instant tempo booking across Punjab',

    hero_headline: 'CHANNI TRANSPORT',
    hero_subhead: 'Family-Run Tempo Goods Transport Service Across Punjab & North India',
    scroll_hint: 'Scroll to Explore',

    call_dispatch: 'Call +91 7508260068',
    call_owner: 'Call +91 7837146640',

    chapter1_title: 'Reliable Delivery',
    chapter1_desc: 'Careful loading & tied cargo handling for safe transportation of your valuable goods.',
    chapter2_title: 'On-Time Service',
    chapter2_desc: '24/7 express dispatch with zero delay for local market & intercity runs.',
    chapter3_title: 'Affordable Rates',
    chapter3_desc: 'Transparent pricing with no hidden charges. Honest rates for every trip.',
    chapter4_title: 'Trusted Drivers',
    chapter4_desc: '12+ years of honest family heritage & experienced drivers on every route.',

    hero: {
      badge: 'PROUD FAMILY HERITAGE • SINCE 2014',
      titleLine1: 'BHAROSA HAR',
      titleLine2: 'SAFAR KA',
      sub: 'Punjab’s premier mini-truck goods carrier. Local loading, intercity logistics, and market transport.',
      ctaBook: 'Instant Quote',
      scrollHint: 'Scroll to Explore',
    },

    about: {
      badge: 'FAMILY HERITAGE',
      heading: 'Over a Decade of Honest Goods Transport in Punjab',
      sub: 'Rooted in Samana, serving traders, households, and construction sites with unwavering trust.',
      p1: 'Founded by Channi and family, CHANNI TRANSPORT has been operating three-wheeler goods tempos across Samana, Patiala, Ludhiana, Jalandhar, Mohali, and all surrounding routes for more than 12 years.',
      p2: 'We pride ourselves on transparent pricing, clean cargo beds, tied tarpaulin weather protection, and prompt 24/7 dispatch.',
      stat1Val: '12+ Years',
      stat1Label: 'Family Experience',
      stat2Val: '15,000+',
      stat2Label: 'Trips Completed',
      stat3Val: '4,500+',
      stat3Label: 'Satisfied Customers',
      note: 'Ratings verified from repeat trade partners & household clients.',
    },

    contact: {
      badge: 'DIRECT DISPATCH',
      title: 'Get In Touch Immediately',
      subtitle: 'Need urgent loading or intercity transit? Speak directly with our dispatch team.',
      addressLabel: 'Headquarter Address',
      addressVal: 'Samana, District Patiala, Punjab - 147101',
      hoursLabel: 'Dispatch Hours',
      hoursVal: '24 Hours / 7 Days Open',
      serviceAreaLabel: 'Coverage Regions',
      getDirections: 'Get Directions on Google Maps',
    },

    booking: {
      badge: 'INSTANT WHATSAPP BOOKING',
      title: 'Book Your Tempo Load Now',
      subtitle: 'Fill out details below to generate a prefilled WhatsApp quotation instantly.',
      preferredPhoneLabel: 'Select Preferred Contact Line',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'Enter your name',
      phoneLabel: 'Mobile Number',
      phonePlaceholder: 'e.g. 7508260068',
      pickupLabel: 'Pickup Location',
      pickupPlaceholder: 'e.g. Samana Main Market',
      dropLabel: 'Drop Location',
      dropPlaceholder: 'e.g. Patiala Goods Yard',
      goodsLabel: 'Type of Goods',
      goodsPlaceholder: 'e.g. Plywood, Grain Bags, Furniture',
      weightLabel: 'Approx. Load Weight',
      weightPlaceholder: 'e.g. 500 kg / 1 Ton',
      dateLabel: 'Preferred Loading Date & Time',
      notesLabel: 'Additional Instructions',
      notesPlaceholder: 'Any specific loading requirements or instructions',
      submitBtn: 'Submit & Open WhatsApp Quote',
      callbackBtn: 'Request Callback',
      errorToast: 'Please fill in your Name, Phone Number, Pickup, and Drop location.',
      successToast: 'Details prefilled! Opening WhatsApp to send your request...',
    },

    exploded: {
      badge: 'EXPLODED VIEW',
      title: 'Built For Tough Indian Loads',
      subtitle: 'Engineered for heavy goods loading and efficient city maneuvering.',
      p1Name: 'Driver Cabin',
      p1Desc: 'Ergonomic seating for long intercity drives.',
      p2Name: 'Reinforced Chassis',
      p2Desc: 'Heavy-duty steel leaf spring suspension.',
      p3Name: 'Open Cargo Deck',
      p3Desc: 'Spacious load bed with rope anchor hooks.',
      p4Name: 'Heavy-Duty Tyres',
      p4Desc: 'High traction treads for rainy & rough roads.',
      reassembleBtn: 'Reassemble View',
      explodeBtn: 'Explode View',
    },

    faq: {
      badge: 'FREQUENT QUESTIONS',
      title: 'Clear Answers To Your Freight Queries',
      subtitle: 'Everything you need to know about booking, loading, and rates.',
    },

    footer: {
      tagline: 'Trust On Every Journey • Punjab Tempo Goods Transport',
      rights: 'All rights reserved.',
      disclaimer: 'CHANNI TRANSPORT - Registered Goods Transport Carrier Samana, Punjab.',
    },

    marquee: ['Fast Tempo Loading', 'Samana & Patiala Hub', 'Intercity Runs', 'Tied Cargo Protection', '24/7 Dispatch'],

    pinnedStory: {
      c1t: 'Humble Beginnings',
      c1d: 'Started in Samana with a single tempo and a pledge to serve every customer with absolute honesty.',
      c2t: 'Earning Local Trust',
      c2d: 'Local grain market vendors and plywood merchants made us their daily transport partner.',
      c3t: 'Expanding Across Punjab',
      c3d: 'Grew fleet operations to cover Patiala, Ludhiana, Jalandhar, Mohali, and interstate routes.',
      c4t: '24/7 Modern Dispatch',
      c4d: 'Integrated instant call dispatch and WhatsApp booking for transparent, real-time coordination.',
      c5t: 'The Future of Freight',
      c5d: 'Continuing our family legacy with modern vehicles, safe drivers, and unchanged commitment.',
    },

    services: {
      badge: 'OUR LOGISTICS SERVICES',
      title: 'Complete Goods Transport Solutions',
      subtitle: 'Tailored tempo solutions for shop owners, house shifting, and commercial loads.',
      bookBtn: 'Book Now',
      items: {
        local: {
          title: 'Local Shop & Market Loading',
          desc: 'Instant tempo dispatch for shop stock, appliances, electronics, and commercial inventory.',
          price: 'Affordable City Rates',
          rec: 'Shop Owners & Traders',
        },
        intercity: {
          title: 'Intercity Goods Transport',
          desc: 'Reliable point-to-point delivery across Samana, Patiala, Ludhiana, Mohali, and all Punjab towns.',
          price: 'Rate per KM basis',
          rec: 'Intercity Goods Movements',
        },
        shop: {
          title: 'Market & Wholesaler Delivery',
          desc: 'Scheduled daily or on-demand delivery for wholesalers, retailers, and mandis.',
          price: 'Daily Contract Available',
          rec: 'Mandi Traders & Suppliers',
        },
        shifting: {
          title: 'House & Office Shifting',
          desc: 'Safe furniture and household items moving with tied tarpaulin weather protection.',
          price: 'Lump Sum Fixed Shift Rate',
          rec: 'Household Movers',
        },
        material: {
          title: 'Construction & Hardware Loading',
          desc: 'Transport for pipes, timber, steel, cement bags, and building equipment.',
          price: 'Heavy Capacity Rates',
          rec: 'Building Contractors',
        },
        farm: {
          title: 'Agricultural & Produce Transport',
          desc: 'Transport for grain bags, seeds, fertilizer, and farm produce to mandi.',
          price: 'Seasonal Mandi Rates',
          rec: 'Farmers & Mandi Agents',
        },
        events: {
          title: 'Event & Exhibition Logistics',
          desc: 'Delivery for tent house material, sound equipment, catering vessels, and event setups.',
          price: 'Event Special Rate',
          rec: 'Tent & Event Managers',
        },
      },
    },

    testimonials: {
      badge: 'CLIENT TESTIMONIALS',
      title: 'Trusted By 4,500+ Traders & Families',
      subtitle: 'Read genuine reviews from local shopkeepers and house movers in Punjab.',
      disclaimer: 'Verified ratings from Google Reviews & customer feedback.',
    },
  },
  hi: {
    brand_name: 'चन्नी ट्रांसपोर्ट',
    tagline: 'भरोसा हर सफर का',
    callUsNow: 'अभी कॉल करें',
    whatsappUs: 'व्हाट्सएप पर बात करें',
    selectPhoneTitle: 'डायरेक्ट डिस्पैच नंबर चुनें',
    selectPhoneSubtitle: '24 घंटे तुरंत टेम्पो बुकिंग के लिए कॉल करें',

    hero_headline: 'चन्नी ट्रांसपोर्ट',
    hero_subhead: 'पंजाब और उत्तर भारत में भरोसेमंद टेम्पो माल ढुलाई सेवा',
    scroll_hint: 'एक्सप्लोर करने के लिए स्क्रॉल करें',

    call_dispatch: 'कॉल करें +91 7508260068',
    call_owner: 'कॉल करें +91 7837146640',

    chapter1_title: 'सुरक्षित माल ढुलाई',
    chapter1_desc: 'आपके कीमती सामान की सुरक्षित और सावधानीपूर्वक लोडिंग व डिलीवरी।',
    chapter2_title: 'समय पर डिलीवरी',
    chapter2_desc: 'बिना किसी देरी के 24 घंटे त्वरित टेम्पो सेवा उपलब्ध।',
    chapter3_title: 'किफायती और सही रेट',
    chapter3_desc: 'बिना किसी छिपे शुल्क के पारदर्शी और उचित भाड़ा।',
    chapter4_title: 'अनुभवी और भरोसेमंद ड्राइवर',
    chapter4_desc: '12+ वर्षों का पारिवारिक अनुभव और सुरक्षित ड्राइविंग।',

    hero: {
      badge: 'भरोसेमंद पारिवारिक विरासत • 2014 से',
      titleLine1: 'भरोसा हर',
      titleLine2: 'सफर का',
      sub: 'पंजाब की प्रमुख टेम्पो माल ढुलाई सेवा। लोकल लोडिंग और इंटरसिटी डिलीवरी।',
      ctaBook: 'भाड़ा जानें',
      scrollHint: 'नीचे स्क्रॉल करें',
    },

    about: {
      badge: 'पारिवारिक विरासत',
      heading: 'पंजाब में एक दशक से भी अधिक का भरोसेमंद ट्रांसपोर्ट',
      sub: 'समाणा से संचालित, व्यापारियों और परिवारों की निष्ठापूर्वक सेवा।',
      p1: 'चन्नी और परिवार द्वारा स्थापित, चन्नी ट्रांसपोर्ट समाणा, पटियाला, लुधियाना, जालंधर, मोहाली और आसपास के सभी रूटों पर 12 वर्षों से 3-व्हीलर टेम्पो सेवाएं प्रदान कर रहा है।',
      p2: 'हम साफ-सुथरी गाड़ियों, रस्सी व तिरपाल सुरक्षा और 24 घंटे त्वरित सेवा पर गर्व करते हैं।',
      stat1Val: '12+ वर्ष',
      stat1Label: 'पारिवारिक अनुभव',
      stat2Val: '15,000+',
      stat2Label: 'सफल ट्रिप्स',
      stat3Val: '4,500+',
      stat3Label: 'संतुष्ट ग्राहक',
      note: 'स्थानीय व्यापारियों और ग्राहकों द्वारा सत्यापित रेटिंग।',
    },

    contact: {
      badge: 'डायरेक्ट डिस्पैच',
      title: 'तुरंत संपर्क करें',
      subtitle: 'सामान भिजवाने के लिए हमारे डिस्पैच नंबरों पर सीधे बात करें।',
      addressLabel: 'मुख्य पता',
      addressVal: 'समाणा, जिला पटियाला, पंजाब - 147101',
      hoursLabel: 'सेवा का समय',
      hoursVal: '24 घंटे / 7 दिन उपलब्ध',
      serviceAreaLabel: 'सेवा क्षेत्र',
      getDirections: 'गूगल मैप्स पर रास्ता देखें',
    },

    booking: {
      badge: 'व्हाट्सएप बुकिंग',
      title: 'अभी टेम्पो बुक करें',
      subtitle: 'नीचे दिए गए फॉर्म को भरकर व्हाट्सएप पर तुरंत भाड़े का कोट पाएं।',
      preferredPhoneLabel: 'कॉल नंबर चुनें',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अपना नाम लिखें',
      phoneLabel: 'मोबाइल नंबर',
      phonePlaceholder: 'जैसे 7508260068',
      pickupLabel: 'पिकअप लोकेशन',
      pickupPlaceholder: 'जैसे समाणा मंडी',
      dropLabel: 'ड्रॉप लोकेशन',
      dropPlaceholder: 'जैसे पटियाला गुड्स यार्ड',
      goodsLabel: 'सामान का प्रकार',
      goodsPlaceholder: 'जैसे प्लाईवुड, अनाज, फर्नीचर',
      weightLabel: 'सामान का वजन',
      weightPlaceholder: 'जैसे 500 किलो / 1 टन',
      dateLabel: 'पिकअप का समय व तारीख',
      notesLabel: 'अन्य जानकारी',
      notesPlaceholder: 'सामान से जुड़ी कोई खास बात',
      submitBtn: 'व्हाट्सएप पर कोट भेजें',
      callbackBtn: 'कॉल बैक का अनुरोध करें',
      errorToast: 'कृपया अपना नाम, फोन नंबर, पिकअप और ड्रॉप लोकेशन भरें।',
      successToast: 'विवरण तैयार है! व्हाट्सएप खुल रहा है...',
    },

    exploded: {
      badge: 'एक्सप्लोडेड व्यू',
      title: 'मजबूत टेम्पो बनावट',
      subtitle: 'भारी सामान लोडिंग और भारतीय सड़कों के लिए उपयुक्त।',
      p1Name: 'ड्राइवर केबिन',
      p1Desc: 'लंबी यात्राओं के लिए आरामदायक केबिन।',
      p2Name: 'मजबूत चेसिस',
      p2Desc: 'हेवी ड्यूटी लीफ स्प्रिंग सस्पेंशन।',
      p3Name: 'खुला कार्गो बेड',
      p3Desc: 'रस्सी बांधने के हुक के साथ बड़ा लोड स्पेस।',
      p4Name: 'मजबूत टायर्स',
      p4Desc: 'गीली और कच्ची सड़कों पर बेहतरीन ग्रिप।',
      reassembleBtn: 'जोड़कर देखें',
      explodeBtn: 'खोलकर देखें',
    },

    faq: {
      badge: 'अक्सर पूछे जाने वाले सवाल',
      title: 'आपकी बुकिंग से जुड़े सवाल',
      subtitle: 'रेट, समय और लोडिंग से जुड़ी पूरी जानकारी।',
    },

    footer: {
      tagline: 'भरोसा हर सफर का • चन्नी ट्रांसपोर्ट',
      rights: 'सर्वाधिकार सुरक्षित।',
      disclaimer: 'चन्नी ट्रांसपोर्ट समाणा, पटियाला, पंजाब।',
    },

    marquee: ['तेज़ टेम्पो लोडिंग', 'समाणा व पटियाला हब', 'इंटरसिटी ट्रिप्स', 'सुरक्षित सामान', '24 घंटे सेवा'],

    pinnedStory: {
      c1t: 'शुरुआती सफर',
      c1d: 'समाणा में एक टेम्पो और ईमानदारी के वादे के साथ शुरुआत।',
      c2t: 'स्थानीय भरोसा',
      c2d: 'मंडी के व्यापारियों और दुकानदारों ने हमें अपना स्थायी पार्टनर बनाया।',
      c3t: 'पंजाब भर में विस्तार',
      c3d: 'पटियाला, लुधियाना, जालंधर, मोहाली और चंडीगढ़ तक सेवाएं बढ़ाईं।',
      c4t: 'आधुनिक डिस्पैच',
      c4d: 'व्हाट्सएप और डायरेक्ट कॉल द्वारा तुरंत बुकिंग सुविधा।',
      c5t: 'उज्ज्वल भविष्य',
      c5d: 'उसी पुरानी ईमानदारी और नए वाहनों के साथ आपकी सेवा।',
    },

    services: {
      badge: 'हमारी सेवाएं',
      title: 'संपूर्ण ट्रांसपोर्ट और माल ढुलाई समाधान',
      subtitle: 'दुकानदार, व्यापारी और घर शिफ्टिंग के लिए सबसे बेहतरीन विकल्प।',
      bookBtn: 'बुक करें',
      items: {
        local: {
          title: 'लोकल दुकान व मार्केट लोडिंग',
          desc: 'दुकान के माल, इलेक्ट्रॉनिक्स और कमर्शियल सप्लाई की तुरंत लोडिंग व डिलीवरी।',
          price: 'किफायती लोकल रेट',
          rec: 'दुकानदार व व्यापारी',
        },
        intercity: {
          title: 'इंटर-सिटी ट्रांसपोर्ट',
          desc: 'पंजाब और पड़ोसी राज्यों के सभी प्रमुख शहरों तक सुरक्षित माल परिवहन।',
          price: 'दूरी अनुसार रेट',
          rec: 'शहरों के बीच माल सप्लाई',
        },
        shop: {
          title: 'मार्केट व मंडी सप्लाई',
          desc: 'थोक व खुदरा व्यापारियों के लिए दैनिक माल सप्लाई।',
          price: 'दैनिक कॉन्ट्रैक्ट',
          rec: 'मंडी व्यापारी',
        },
        shifting: {
          title: 'घर व ऑफिस शिफ्टिंग',
          desc: 'फर्नीचर और घरेलू सामान की तिरपाल व रस्सी से सुरक्षित शिफ्टिंग।',
          price: 'फिक्स्ड शिफ्टिंग रेट',
          rec: 'घरेलू सामान शिफ्टिंग',
        },
        material: {
          title: 'निर्माण सामग्री परिवहन',
          desc: 'पाइप, लकड़ी, लोहे की छड़ें, सीमेंट और हार्डवेयर का सुरक्षित परिवहन।',
          price: 'हेवी लोड रेट',
          rec: 'ठेकेदार व हार्डवेयर व्यापारी',
        },
        farm: {
          title: 'कृषि माल व अनाज परिवहन',
          desc: 'अनाज के बोरे, बीज, खाद और मंडी के सामान की लोडिंग।',
          price: 'मंडी सीजनल रेट',
          rec: 'किसान व आढ़ती',
        },
        events: {
          title: 'इवेंट व टेंट सामान लोडिंग',
          desc: 'टेंट हाउस, साउंड सिस्टम, कैटरिंग बर्तन और सामान की लोडिंग।',
          price: 'इवेंट स्पेशल रेट',
          rec: 'टेंट व कैटरिंग ठेकेदार',
        },
      },
    },

    testimonials: {
      badge: 'ग्राहकों के अनुभव',
      title: '4,500+ संतुष्ट ग्राहक',
      subtitle: 'पंजाब के दुकानदारों और ग्राहकों की सच्ची राय पढ़ें।',
      disclaimer: 'गूगल रिव्यू और ग्राहकों के फीडबैक पर आधारित।',
    },
  },
  pa: {
    brand_name: 'ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ',
    tagline: 'ਭਰੋਸਾ ਹਰ ਸਫ਼ਰ ਦਾ',
    callUsNow: 'ਹੁਣੇ ਕਾਲ ਕਰੋ',
    whatsappUs: 'ਵ੍ਹਾਟਸਐਪ ਤੇ ਗੱਲ ਕਰੋ',
    selectPhoneTitle: 'ਫੋਨ ਨੰਬਰ ਚੁਣੋ',
    selectPhoneSubtitle: '24 ਘੰਟੇ ਤੁਰੰਤ ਟੈਂਪੂ ਬੁਕਿੰਗ ਲਈ ਫੋਨ ਕਰੋ',

    hero_headline: 'ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ',
    hero_subhead: 'ਪੰਜਾਬ ਅਤੇ ਉੱਤਰ ਭਾਰਤ ਵਿੱਚ ਭਰੋਸੇਮੰਦ ਟੈਂਪੂ ਮਾਲ ਢੋਆ-ਢੁਆਈ ਸੇਵਾ',
    scroll_hint: 'ਹੋਰ ਜਾਣਨ ਲਈ ਸਕ੍ਰੋਲ ਕਰੋ',

    call_dispatch: 'ਕਾਲ ਕਰੋ +91 7508260068',
    call_owner: 'ਕਾਲ ਕਰੋ +91 7837146640',

    chapter1_title: 'ਸੁਰੱਖਿਅਤ ਡਿਲੀਵਰੀ',
    chapter1_desc: 'ਤੁਹਾਡੇ ਕੀਮਤੀ ਮਾਲ ਦੀ ਸੁਰੱਖਿਅਤ ਅਤੇ ਧਿਆਨਪੂਰਵਕ ਲੋਡਿੰਗ ਤੇ ਡਿਲੀਵਰੀ।',
    chapter2_title: 'ਸਮੇਂ ਸਿਰ ਸੇਵਾ',
    chapter2_desc: 'ਬਿਨਾਂ ਕਿਸੇ ਦੇਰੀ ਦੇ 24 ਘੰਟੇ ਤੁਰੰਤ ਟੈਂਪੂ ਸੇਵਾ ਉਪਲਬਧ।',
    chapter3_title: 'ਸਹੀ ਅਤੇ ਜਾਇਜ਼ ਰੇਟ',
    chapter3_desc: 'ਬਿਨਾਂ ਕਿਸੇ ਵਾਧੂ ਖਰਚੇ ਦੇ ਸਾਫ-ਸੁਥਰਾ ਅਤੇ ਸਹੀ ਭਾੜਾ।',
    chapter4_title: 'ਤਜਰਬੇਕਾਰ ਡਰਾਈਵਰ',
    chapter4_desc: '12+ ਸਾਲਾਂ ਦਾ ਖਾਨਦਾਨੀ ਤਜਰਬਾ ਅਤੇ ਇਮਾਨਦਾਰ ਡਰਾਈਵਰ।',

    hero: {
      badge: 'ਪਰਿਵਾਰਕ ਵਿਰਾਸਤ • 2014 ਤੋਂ',
      titleLine1: 'ਭਰੋਸਾ ਹਰ',
      titleLine2: 'ਸਫ਼ਰ ਦਾ',
      sub: 'ਪੰਜਾਬ ਦੀ ਪ੍ਰਮੁੱਖ ਟੈਂਪੂ ਮਾਲ ਢੋਆ-ਢੁਆਈ ਸੇਵਾ। ਲੋਕਲ ਅਤੇ ਇੰਟਰ-ਸਿਟੀ ਮਾਲ।',
      ctaBook: 'ਰੇਟ ਪਤਾ ਕਰੋ',
      scrollHint: 'ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ',
    },

    about: {
      badge: 'ਪਰਿਵਾਰਕ ਵਿਰਾਸਤ',
      heading: 'ਪੰਜਾਬ ਵਿੱਚ 12 ਸਾਲਾਂ ਤੋਂ ਵੀ ਵੱਧ ਸਮੇਂ ਦਾ ਇਮਾਨਦਾਰ ਟ੍ਰਾਂਸਪੋਰਟ',
      sub: 'ਸਮਾਣਾ ਤੋਂ ਚੱਲ ਕੇ ਵਪਾਰੀਆਂ ਅਤੇ ਪਰਿਵਾਰਾਂ ਦੀ ਪੂਰੇ ਭਰੋਸੇ ਨਾਲ ਸੇਵਾ।',
      p1: 'ਚੰਨੀ ਅਤੇ ਪਰਿਵਾਰ ਵੱਲੋਂ ਸ਼ੁਰੂ ਕੀਤੀ ਗਈ ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ ਪਿਛਲੇ 12 ਸਾਲਾਂ ਤੋਂ ਸਮਾਣਾ, ਪਟਿਆਲਾ, ਲੁਧਿਆਣਾ, ਜਲੰਧਰ, ਮੋਹਾਲੀ ਅਤੇ ਲਗਦੇ ਸਾਰੇ ਰਸਤਿਆਂ ਤੇ 3-ਵੀਲ੍ਹਰ ਗੁੱਡਜ਼ ਟੈਂਪੂ ਸੇਵਾਵਾਂ ਦੇ ਰਹੀ ਹੈ।',
      p2: 'ਸਾਡਾ ਮਕਸਦ ਸਾਫ-ਸੁਥਰੀਆਂ ਗੱਡੀਆਂ, ਤਰਪਾਲ ਨਾਲ ਸੁਰੱਖਿਅਤ ਮਾਲ ਅਤੇ 24 ਘੰਟੇ ਤੁਰੰਤ ਸੇਵਾ ਦੇਣਾ ਹੈ।',
      stat1Val: '12+ ਸਾਲ',
      stat1Label: 'ਪਰਿਵਾਰਕ ਤਜਰਬਾ',
      stat2Val: '15,000+',
      stat2Label: 'ਕੁਲ ਸਫ਼ਰ',
      stat3Val: '4,500+',
      stat3Label: 'ਖੁਸ਼ ਗਾਹਕ',
      note: 'ਲੋਕਲ ਦੁਕਾਨਦਾਰਾਂ ਅਤੇ ਗਾਹਕਾਂ ਵੱਲੋਂ ਪ੍ਰਮਾਣਿਤ ਰੇਟਿੰਗ।',
    },

    contact: {
      badge: 'ਤੁਰੰਤ ਡਿਸਪੈਚ',
      title: 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      subtitle: 'ਮਾਲ ਭੇਜਣ ਲਈ ਸਾਡੇ ਫੋਨ ਨੰਬਰਾਂ ਤੇ ਸਿੱਧੀ ਗੱਲ ਕਰੋ।',
      addressLabel: 'ਮੁੱਖ ਪਤਾ',
      addressVal: 'ਸਮਾਣਾ, ਜ਼ਿਲ੍ਹਾ ਪਟਿਆਲਾ, ਪੰਜਾਬ - 147101',
      hoursLabel: 'ਸੇਵਾ ਦਾ ਸਮਾਂ',
      hoursVal: '24 ਘੰਟੇ / 7 ਦਿਨ ਉਪਲਬਧ',
      serviceAreaLabel: 'ਸੇਵਾ ਖੇਤਰ',
      getDirections: 'ਗੂਗਲ ਮੈਪਸ ਤੇ ਰਸਤਾ ਦੇਖੋ',
    },

    booking: {
      badge: 'ਵ੍ਹਾਟਸਐਪ ਬੁਕਿੰਗ',
      title: 'ਹੁਣੇ ਟੈਂਪੂ ਬੁੱਕ ਕਰੋ',
      subtitle: 'ਹੇਠਾਂ ਫਾਰਮ ਭਰ ਕੇ ਵ੍ਹਾਟਸਐਪ ਤੇ ਤੁਰੰਤ ਭਾੜੇ ਦਾ ਰੇਟ ਜਾਣੋ।',
      preferredPhoneLabel: 'ਫੋਨ ਨੰਬਰ ਚੁਣੋ',
      nameLabel: 'ਤੁਹਾਡਾ ਨਾਮ',
      namePlaceholder: 'ਆਪਣਾ ਨਾਮ ਲਿਖੋ',
      phoneLabel: 'ਫੋਨ ਨੰਬਰ',
      phonePlaceholder: 'ਜਿਵੇਂ 7508260068',
      pickupLabel: 'ਕਿੱਥੋਂ ਚੁੱਕਣਾ (ਪਿਕਅੱਪ)',
      pickupPlaceholder: 'ਜਿਵੇਂ ਸਮਾਣਾ ਮੰਡੀ',
      dropLabel: 'ਕਿੱਥੇ ਉਤਾਰਨਾ (ਡ੍ਰੋਪ)',
      dropPlaceholder: 'ਜਿਵੇਂ ਪਟਿਆਲਾ ਗੁੱਡਜ਼ ਯਾਰਡ',
      goodsLabel: 'ਮਾਲ ਦਾ ਵੇਰਵਾ',
      goodsPlaceholder: 'ਜਿਵੇਂ ਪਲਾਈਵੁੱਡ, ਕਣਕ ਦੀਆਂ ਬੋਰੀਆਂ, ਫਰਨੀਚਰ',
      weightLabel: 'ਮਾਲ ਦਾ ਵਜ਼ਨ',
      weightPlaceholder: 'ਜਿਵੇਂ 500 ਕਿੱਲੋ / 1 ਟਨ',
      dateLabel: 'ਸਮਾਂ ਅਤੇ ਤਾਰੀਖ',
      notesLabel: 'ਹੋਰ ਜਾਣਕਾਰੀ',
      notesPlaceholder: 'ਮਾਲ ਬਾਰੇ ਕੋਈ ਹੋਰ ਜ਼ਰੂਰੀ ਗੱਲ',
      submitBtn: 'ਵ੍ਹਾਟਸਐਪ ਤੇ ਰੇਟ ਪਤਾ ਕਰੋ',
      callbackBtn: 'ਕਾਲ ਬੈਕ ਦਾ ਮੈਸੇਜ ਭੇਜੋ',
      errorToast: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ, ਫੋਨ ਨੰਬਰ, ਪਿਕਅੱਪ ਅਤੇ ਡ੍ਰੋਪ ਭਰੋ।',
      successToast: 'ਵੇਰਵੇ ਤਿਆਰ ਹਨ! ਵ੍ਹਾਟਸਐਪ ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ...',
    },

    exploded: {
      badge: 'ਟੈਂਪੂ ਦੀ ਬਣਾਵਟ',
      title: 'ਮਜ਼ਬੂਤ ਭਾਰਤੀ ਟੈਂਪੂ',
      subtitle: 'ਭਾਰੀ ਮਾਲ ਲੋਡਿੰਗ ਲਈ ਉਚੇਚੇ ਤੌਰ ਤੇ ਤਿਆਰ।',
      p1Name: 'ਡਰਾਈਵਰ ਕੇਬਿਨ',
      p1Desc: 'ਲੰਬੇ ਸਫ਼ਰ ਲਈ ਆਰਾਮਦਾਇਕ ਕੇਬਿਨ।',
      p2Name: 'ਮਜ਼ਬੂਤ ਚੈਸੀ',
      p2Desc: 'ਹੈਵੀ ਡਿਊਟੀ ਕਮਾਨੀਆਂ ਅਤੇ ਸਸਪੈਂਸ਼ਨ।',
      p3Name: 'ਖੁੱਲਾ ਕਾਰਗੋ ਬੈੱਡ',
      p3Desc: 'ਰੱਸੇ ਨਾਲ ਮਾਲ ਬੰਨ੍ਹਣ ਲਈ ਮਜ਼ਬੂਤ ਹੁੱਕਾਂ।',
      p4Name: 'ਮਜ਼ਬੂਤ ਟਾਇਰ',
      p4Desc: 'ਹਰ ਤਰ੍ਹਾਂ ਦੇ ਰਸਤਿਆਂ ਲਈ ਵਧੀਆ ਟਾਇਰ।',
      reassembleBtn: 'ਜੋੜ ਕੇ ਦੇਖੋ',
      explodeBtn: 'ਖੋਲ੍ਹ ਕੇ ਦੇਖੋ',
    },

    faq: {
      badge: 'ਆਮ ਸਵਾਲ',
      title: 'ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ',
      subtitle: 'ਬੁਕਿੰਗ, ਰੇਟ ਅਤੇ ਲੋਡਿੰਗ ਦੀ ਪੂਰੀ ਜਾਣਕਾਰੀ।',
    },

    footer: {
      tagline: 'ਭਰੋਸਾ ਹਰ ਸਫ਼ਰ ਦਾ • ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ',
      rights: 'ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।',
      disclaimer: 'ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ ਸਮਾਣਾ, ਪਟਿਆਲਾ, ਪੰਜਾਬ।',
    },

    marquee: ['ਤੇਜ਼ ਟੈਂਪੂ ਲੋਡਿੰਗ', 'ਸਮਾਣਾ ਤੇ ਪਟਿਆਲਾ ਹਬ', 'ਇੰਟਰ-ਸਿਟੀ ਟ੍ਰਿਪਸ', 'ਸੁਰੱਖਿਅਤ ਮਾਲ', '24 ਘੰਟੇ ਸੇਵਾ'],

    pinnedStory: {
      c1t: 'ਸ਼ੁਰੂਆਤੀ ਸਫ਼ਰ',
      c1d: 'ਸਮਾਣਾ ਤੋਂ ਇੱਕ ਟੈਂਪੂ ਨਾਲ ਇਮਾਨਦਾਰੀ ਦੇ ਵਾਅਦੇ ਨਾਲ ਸ਼ੁਰੂਆਤ।',
      c2t: 'ਲੋਕਾਂ ਦਾ ਭਰੋਸਾ',
      c2d: 'ਮੰਡੀ ਦੇ ਵਪਾਰੀਆਂ ਨੇ ਸਾਨੂੰ ਆਪਣਾ ਪੱਕਾ ਸਾਥੀ ਬਣਾਇਆ।',
      c3t: 'ਪੂਰੇ ਪੰਜਾਬ ਵਿੱਚ ਸੇਵਾ',
      c3d: 'ਪਟਿਆਲਾ, ਲੁਧਿਆਣਾ, ਜਲੰਧਰ, ਮੋਹਾਲੀ ਅਤੇ ਚੰਡੀਗੜ੍ਹ ਤੱਕ ਸੇਵਾਵਾਂ ਵਧਾਈਆਂ।',
      c4t: 'ਤੁਰੰਤ ਡਿਸਪੈਚ',
      c4d: 'ਫੋਨ ਅਤੇ ਵ੍ਹਾਟਸਐਪ ਤੇ ਤੁਰੰਤ ਬੁਕਿੰਗ ਦੀ ਸੁਵਿਧਾ।',
      c5t: 'ਉਜਲਾ ਭਵਿੱਖ',
      c5d: 'ਉਸੇ ਇਮਾਨਦਾਰੀ ਅਤੇ ਨਵੇਂ ਟੈਂਪੂਆਂ ਨਾਲ ਤੁਹਾਡੀ ਸੇਵਾ।',
    },

    services: {
      badge: 'ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ',
      title: 'ਸੰਪੂਰਨ ਮਾਲ ਢੋਆ-ਢੁਆਈ',
      subtitle: 'ਦੁਕਾਨਦਾਰਾਂ, ਵਪਾਰੀਆਂ ਅਤੇ ਘਰ ਦੀ ਸ਼ਿਫਟਿੰਗ ਲਈ ਵਧੀਆ ਸੇਵਾ।',
      bookBtn: 'ਬੁੱਕ ਕਰੋ',
      items: {
        local: {
          title: 'ਲੋਕਲ ਦੁਕਾਨ ਤੇ ਮਾਰਕੀਟ ਲੋਡਿੰਗ',
          desc: 'ਦੁਕਾਨਾਂ ਦਾ ਮਾਲ, ਇਲੈਕਟ੍ਰੋਨਿਕਸ ਅਤੇ ਸਮਾਨ ਦੀ ਤੁਰੰਤ ਡਿਲੀਵਰੀ।',
          price: 'ਜਾਇਜ਼ ਲੋਕਲ ਰੇਟ',
          rec: 'ਦੁਕਾਨਦਾਰ ਅਤੇ ਵਪਾਰੀ',
        },
        intercity: {
          title: 'ਇੰਟਰ-ਸਿਟੀ ਟ੍ਰਾਂਸਪੋਰਟ',
          desc: 'ਪੰਜਾਬ ਦੇ ਸਾਰੇ ਸ਼ਹਿਰਾਂ ਤੱਕ ਸੁਰੱਖਿਅਤ ਮਾਲ।',
          price: 'ਕਿਲੋਮੀਟਰ ਅਨੁਸਾਰ ਰੇਟ',
          rec: 'ਸ਼ਹਿਰਾਂ ਵਿਚਾਲੇ ਮਾਲ ਸਪਲਾਈ',
        },
        shop: {
          title: 'ਮਾਰਕੀਟ ਤੇ ਮੰਡੀ ਸਪਲਾਈ',
          desc: 'ਦੁਕਾਨਦਾਰਾਂ ਲਈ ਰੋਜ਼ਾਨਾ ਮਾਲ ਦੀ ਡਿਲੀਵਰੀ।',
          price: 'ਰੋਜ਼ਾਨਾ ਇਕਰਾਰਨਾਮਾ',
          rec: 'ਮੰਡੀ ਦੇ ਵਪਾਰੀ',
        },
        shifting: {
          title: 'ਘਰ ਤੇ ਆਫਿਸ ਸ਼ਿਫਟਿੰਗ',
          desc: 'ਫਰਨੀਚਰ ਅਤੇ ਘਰ ਦੇ ਸਮਾਨ ਦੀ ਤਰਪਾਲ ਨਾਲ ਸੁਰੱਖਿਅਤ ਸ਼ਿਫਟਿੰਗ।',
          price: 'ਪੱਕਾ ਸ਼ਿਫਟਿੰਗ ਰੇਟ',
          rec: 'ਘਰ ਦਾ ਸਮਾਨ ਸ਼ਿਫਟ ਕਰਨਾ',
        },
        material: {
          title: 'ਇਮਾਰਤੀ ਸਮਾਨ ਟ੍ਰਾਂਸਪੋਰਟ',
          desc: 'ਪਾਈਪਾਂ, ਲੱਕੜ, ਲੋਹਾ, ਸੀਮੈਂਟ ਅਤੇ ਹਾਰਡਵੇਅਰ ਦਾ ਸੁਰੱਖਿਅਤ ਟ੍ਰਾਂਸਪੋਰਟ।',
          price: 'ਹੈਵੀ ਲੋਡ ਰੇਟ',
          rec: 'ਠੇਕੇਦਾਰ ਤੇ ਹਾਰਡਵੇਅਰ ਦੁਕਾਨਦਾਰ',
        },
        farm: {
          title: 'ਖੇਤੀਬਾੜੀ ਮਾਲ ਤੇ ਫਸਲ',
          desc: 'ਕਣਕ ਦੀਆਂ ਬੋਰੀਆਂ, ਬੀਜ, ਖਾਦ ਅਤੇ ਮੰਡੀ ਦਾ ਸਮਾਨ।',
          price: 'ਮੰਡੀ ਸੀਜ਼ਨ ਰੇਟ',
          rec: 'ਕਿਸਾਨ ਤੇ ਆੜ੍ਹਤੀ',
        },
        events: {
          title: 'ਟੈਂਟ ਤੇ ਪ੍ਰੋਗਰਾਮਾਂ ਦਾ ਸਮਾਨ',
          desc: 'ਟੈਂਟ ਹਾਊਸ, ਸਾਊਂਡ ਸਿਸਟਮ, ਕੇਟਰਿੰਗ ਦੇ ਭਾਂਡੇ ਅਤੇ ਸਮਾਨ ਦੀ ਲੋਡਿੰਗ।',
          price: 'ਪ੍ਰੋਗਰਾਮ ਸਪੈਸ਼ਲ ਰੇਟ',
          rec: 'ਟੈਂਟ ਤੇ ਕੇਟਰਿੰਗ ਠੇਕੇਦਾਰ',
        },
      },
    },

    testimonials: {
      badge: 'ਗਾਹਕਾਂ ਦੇ ਰਿਵਿਊ',
      title: '4,500+ ਖੁਸ਼ ਗਾਹਕ',
      subtitle: 'ਪੰਜਾਬ ਦੇ ਦੁਕਾਨਦਾਰਾਂ ਅਤੇ ਗਾਹਕਾਂ ਦੇ ਰਿਵਿਊ ਪੜ੍ਹੋ।',
      disclaimer: 'ਗੂਗਲ ਰਿਵਿਊ ਅਤੇ ਗਾਹਕਾਂ ਦੀ ਰਾਏ ਤੇ ਅਧਾਰਿਤ।',
    },
  },
};
