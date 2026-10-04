import { CONFIG, PHONE_NUMBERS, PRIMARY_WHATSAPP_LINK, TRANSLATIONS, CHAPTERS } from '../config';

export * from '../config';

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string;
  recommendedForKey: string;
  badgeKey?: string;
  samplePriceKey: string;
  basePrice?: number;
  perKmRate?: number;
}

export interface TownDistance {
  town: string;
  distFromLudhianaKm: number;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  commentEn: string;
  commentHi: string;
  commentPa: string;
  approved: boolean;
}

export interface LeadItem {
  id: string;
  referenceNo: string;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  goods: string;
  weightSize: string;
  date: string;
  estimatedPriceRange?: string;
  status: 'New' | 'Called' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  createdAt: string;
  sourcePage: string;
  language: string;
}

export const TRANSLATIONS_GLOBAL = TRANSLATIONS;

export const SERVICE_AREAS = [
  'Samana', 'Patiala', 'Ludhiana', 'Jalandhar', 'Amritsar', 'Mohali', 'Chandigarh',
  'Bathinda', 'Nabaha', 'Sangrur', 'Intercity Routes'
];

export const PUNJAB_TOWNS: TownDistance[] = [
  { town: 'Samana (Local)', distFromLudhianaKm: 5 },
  { town: 'Patiala', distFromLudhianaKm: 30 },
  { town: 'Ludhiana', distFromLudhianaKm: 90 },
  { town: 'Jalandhar', distFromLudhianaKm: 140 },
  { town: 'Mohali / Chandigarh', distFromLudhianaKm: 100 },
  { town: 'Sangrur', distFromLudhianaKm: 40 },
  { town: 'Bathinda', distFromLudhianaKm: 120 },
  { town: 'Amritsar', distFromLudhianaKm: 210 }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'local-loading',
    titleKey: 'service_local',
    descKey: 'service_local_desc',
    iconName: 'Truck',
    recommendedForKey: 'Shop Owners & Traders',
    badgeKey: 'Popular',
    samplePriceKey: 'Local City Run: Affordable Rates',
    basePrice: 400,
    perKmRate: 25
  },
  {
    id: 'intercity-transport',
    titleKey: 'service_intercity',
    descKey: 'service_intercity_desc',
    iconName: 'MapPin',
    recommendedForKey: 'Intercity Goods Movement',
    badgeKey: 'Express',
    samplePriceKey: 'Intercity Rates: Based on Distance (KM)',
    basePrice: 800,
    perKmRate: 30
  },
  {
    id: 'house-shifting',
    titleKey: 'service_shifting',
    descKey: 'service_shifting_desc',
    iconName: 'Home',
    recommendedForKey: 'House & Furniture Moving',
    badgeKey: 'Careful Handling',
    samplePriceKey: 'Full Household Tempo Shift',
    basePrice: 1200,
    perKmRate: 35
  },
  {
    id: 'market-delivery',
    titleKey: 'service_market',
    descKey: 'service_market_desc',
    iconName: 'ShoppingBag',
    recommendedForKey: 'Grain & Vegetable Markets',
    badgeKey: 'Daily Supply',
    samplePriceKey: 'Daily Wholesale Supply Runs',
    basePrice: 500,
    perKmRate: 25
  },
  {
    id: 'construction-material',
    titleKey: 'service_construction',
    descKey: 'service_construction_desc',
    iconName: 'Package',
    recommendedForKey: 'Contractors & Hardware',
    badgeKey: 'Heavy Cargo',
    samplePriceKey: 'Hardware & Pipe Loading',
    basePrice: 700,
    perKmRate: 28
  }
];

export const SAMPLE_FAQS = [
  {
    qEn: 'How do I book a tempo with CHANNI TRANSPORT?',
    qHi: 'चन्नी ट्रांसपोर्ट के साथ टेम्पो कैसे बुक करें?',
    qPa: 'ਚੰਨੀ ਟ੍ਰਾਂਸਪੋਰਟ ਨਾਲ ਟੈਂਪੂ ਕਿਵੇਂ ਬੁੱਕ ਕਰੀਏ?',
    aEn: 'Call directly on +91 7508260068 / +91 7837146640 or submit the booking form to chat on WhatsApp.',
    aHi: 'आप +91 7508260068 या +91 7837146640 पर तुरंत कॉल कर सकते हैं या बुकिंग फॉर्म भरकर व्हाट्सएप पर बात कर सकते हैं।',
    aPa: 'ਤੁਸੀਂ +91 7508260068 ਜਾਂ +91 7837146640 ਤੇ ਸਿੱਧਾ ਫੋਨ ਕਰ ਸਕਦੇ ਹੋ ਜਾਂ ਫਾਰਮ ਭਰ ਕੇ ਵ੍ਹਾਟਸਐਪ ਤੇ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ।'
  },
  {
    qEn: 'Which cities and routes do you cover?',
    qHi: 'आप कौन से शहरों और रूटों को कवर करते हैं?',
    qPa: 'ਤੁਸੀਂ ਕਿਹੜੇ ਸ਼ਹਿਰਾਂ ਵਿੱਚ ਸੇਵਾ ਦਿੰਦੇ ਹੋ?',
    aEn: 'We cover Samana, Patiala, Ludhiana, Jalandhar, Chandigarh, Mohali, Sangrur, and all intercity runs across Punjab.',
    aHi: 'हम समाणा, पटियाला, लुधियाना, जालंधर, चंडीगढ़, मोहाली, संगरूर और पूरे पंजाब में सेवाएं प्रदान करते हैं।',
    aPa: 'ਅਸੀਂ ਸਮਾਣਾ, ਪਟਿਆਲਾ, ਲੁਧਿਆਣਾ, ਜਲੰਧਰ, ਚੰਡੀਗੜ੍ਹ, ਮੋਹਾਲੀ, ਸੰਗਰੂਰ ਅਤੇ ਪੂਰੇ ਪੰਜਾਬ ਵਿੱਚ ਸੇਵਾ ਦਿੰਦੇ ਹਾਂ।'
  },
  {
    qEn: 'How are transport rates determined?',
    qHi: 'भाड़ा/रेट कैसे तय होता है?',
    qPa: 'ਰੇਟ ਕਿਵੇਂ ਤੈਅ ਹੁੰਦੇ ਹਨ?',
    aEn: 'Rates depend on distance (KM), goods type, and load weight. We offer 100% transparent and affordable rates.',
    aHi: 'रेट दूरी, सामान के वजन और प्रकार के आधार पर तय होते हैं। हमारे रेट बिल्कुल पारदर्शी और वाजिब हैं।',
    aPa: 'ਰੇਟ ਦੂਰੀ ਅਤੇ ਮਾਲ ਦੇ ਵਜ਼ਨ ਅਨੁਸਾਰ ਤੈਅ ਹੁੰਦੇ ਹਨ।'
  },
  {
    qEn: 'Is early morning or night booking available?',
    qHi: 'क्या सुबह जल्दी या देर रात बुकिंग उपलब्ध है?',
    qPa: 'ਕੀ ਸਵੇਰੇ ਜਲਦੀ ਜਾਂ ਰਾਤ ਨੂੰ ਟੈਂਪੂ ਮਿਲ ਸਕਦਾ ਹੈ?',
    aEn: 'Yes! We are available 24/7. Call our dispatch number +91 7508260068 anytime for urgent bookings.',
    aHi: 'जी हां! हमारी सेवा 24 घंटे उपलब्ध है। अर्जेंट लोडिंग के लिए हमारे नंबर +91 7508260068 पर संपर्क करें।',
    aPa: 'ਹਾਂਜੀ! ਸਾਡੀ ਸੇਵਾ 24 ਘੰਟੇ ਉਪਲਬਧ ਹੈ।'
  }
];

export const SAMPLE_TESTIMONIALS = [
  {
    name: 'Gurpreet Singh',
    role: 'Plywood & Hardware Merchant',
    location: 'Samana',
    rating: 5,
    commentEn: 'Very reliable tempo service! Loaded 80 sheets of plywood carefully. Delivered on time without single damage.',
    commentHi: 'बहुत ही भरोसेमंद टेम्पो सेवा! सामान को बहुत ध्यान से लोड किया और समय पर पहुँचाया।',
    commentPa: 'ਬਹੁਤ ਭਰੋਸੇਮੰਦ ਟੈਂਪੂ ਸੇਵਾ! ਮਾਲ ਪੂਰੇ ਧਿਆਨ ਨਾਲ ਲੋਡ ਕੀਤਾ ਅਤੇ ਸਮੇਂ ਸਿਰ ਪਹੁੰਚਾਇਆ।'
  },
  {
    name: 'Ramesh Verma',
    role: 'Grocery Wholesaler',
    location: 'Patiala',
    rating: 5,
    commentEn: 'Fair rates and honest behavior. We regularly use Channi Transport for daily store deliveries.',
    commentHi: 'वाजिब रेट और ईमानदारी से काम। हम रोज़ का सामान इन्हीं से भिजवाते हैं।',
    commentPa: 'ਸਹੀ ਰੇਟ ਅਤੇ ਇਮਾਨਦਾਰੀ ਨਾਲ ਕੰਮ। ਸਾਡਾ ਰੋਜ਼ ਦਾ ਮਾਲ ਇਨ੍ਹਾਂ ਰਾਹੀਂ ਹੀ ਜਾਂਦਾ ਹੈ।'
  },
  {
    name: 'Manjit Kaur',
    role: 'Household Shifting Client',
    location: 'Ludhiana',
    rating: 5,
    commentEn: 'Shifted our household furniture with full tarpaulin cover. Extremely polite and helpful driver.',
    commentHi: 'घर का सामान बहुत सुरक्षित शिफ्ट हुआ। ड्राइवर बहुत विनम्र और सहयोगी थे।',
    commentPa: 'ਘਰ ਦਾ ਸਾਰਾ ਸਮਾਨ ਬਿਨਾਂ ਕਿਸੇ ਨੁਕਸਾਨ ਦੇ ਸ਼ਿਫਟ ਹੋ ਗਿਆ।'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Gurpreet Singh',
    location: 'Samana',
    rating: 5,
    date: '2026-09-28',
    commentEn: 'Very reliable tempo service! Delivered on time without single damage.',
    commentHi: 'बहुत ही भरोसेमंद टेम्पो सेवा! सामान समय पर पहुँचाया।',
    commentPa: 'ਬਹੁਤ ਭਰੋਸੇਮੰਦ ਟੈਂਪੂ ਸੇਵਾ! ਸਮੇਂ ਸਿਰ ਡਿਲੀਵਰੀ।',
    approved: true
  },
  {
    id: 'rev-2',
    name: 'Ramesh Verma',
    location: 'Patiala',
    rating: 5,
    date: '2026-09-25',
    commentEn: 'Fair rates and honest behavior. Highly recommended in Punjab.',
    commentHi: 'वाजिब रेट और ईमानदारी। बेहद अनुशंसित।',
    commentPa: 'ਸਹੀ ਰੇਟ ਅਤੇ ਇਮਾਨਦਾਰ ਵਰਤੋਂ।',
    approved: true
  }
];

export const SAMPLE_INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    referenceNo: 'CT-2026-0012',
    name: 'Gurpreet Singh',
    phone: '+917508260068',
    pickup: 'Samana Market',
    drop: 'Patiala Goods Yard',
    goods: 'Hardware Supplies',
    weightSize: '600 kg',
    date: '2026-10-01',
    estimatedPriceRange: '₹1200 - ₹1500',
    status: 'Confirmed',
    createdAt: '2026-10-01T08:00:00Z',
    sourcePage: 'Home',
    language: 'en'
  }
];
