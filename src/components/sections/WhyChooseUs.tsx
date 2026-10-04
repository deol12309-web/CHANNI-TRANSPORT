import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, DollarSign, PhoneCall, Award, Users, Truck, ThumbsUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CONFIG, TRANSLATIONS } from '../../config';

export const WhyChooseUs: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const stats = [
    {
      icon: <Award className="w-6 h-6 text-[#C9A96E]" />,
      val: `${CONFIG.stats[0].value}${CONFIG.stats[0].suffix}`,
      label: t.stat_years || 'Years of Experience',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#C9A96E]" />,
      val: `${CONFIG.stats[1].value.toLocaleString()}${CONFIG.stats[1].suffix}`,
      label: t.stat_trips || 'Trips Completed',
    },
    {
      icon: <Users className="w-6 h-6 text-[#C9A96E]" />,
      val: `${CONFIG.stats[2].value.toLocaleString()}${CONFIG.stats[2].suffix}`,
      label: t.stat_customers || 'Happy Customers',
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-[#C9A96E]" />,
      val: `${CONFIG.stats[3].value}${CONFIG.stats[3].suffix}`,
      label: t.stat_satisfaction || 'Satisfaction Rate',
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-[#C9A96E]" />,
      title: language === 'en' ? 'Safe & Secured Load' : language === 'hi' ? 'सुरक्षित लोडिंग' : 'ਸੁਰੱਖਿਅਤ ਲੋਡਿੰਗ',
      desc:
        language === 'en'
          ? 'Clean open cargo bed with strong rope anchor hooks and tarpaulin cover.'
          : language === 'hi'
          ? 'मजबूत रस्सियों और तिरपाल सुरक्षा के साथ सुरक्षित माल ढुलाई।'
          : 'ਮਾਲ ਦੀ ਪੂਰੀ ਦੇਖਭਾਲ, ਰੱਸੇ ਅਤੇ ਤਰਪਾਲ ਨਾਲ ਸੁਰੱਖਿਆ।',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C9A96E]" />,
      title: language === 'en' ? 'Guaranteed Punctuality' : language === 'hi' ? 'समय पर डिलीवरी' : 'ਸਮੇਂ ਸਿਰ ਡਿਲੀਵਰੀ',
      desc:
        language === 'en'
          ? 'Direct point-to-point transit without unnecessary detours or middleman delays.'
          : language === 'hi'
          ? 'बिना रुकावट सीधी डिलीवरी। हम आपके समय की कीमत समझते हैं।'
          : 'ਬਿਨਾਂ ਕਿਸੇ ਦੇਰੀ ਦੇ ਸਿੱਧੀ ਡਿਲੀਵਰੀ।',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#C9A96E]" />,
      title: language === 'en' ? 'Honest & Transparent Pricing' : language === 'hi' ? 'पारदर्शी रेट' : 'ਵਾਜਬ ਰੇਟ',
      desc:
        language === 'en'
          ? 'Clear upfront rates calculated by load size and distance. Zero hidden fees.'
          : language === 'hi'
          ? 'कोई छुपा हुआ खर्च नहीं। सही और वाजिब भाड़ा।'
          : 'ਕੋਈ ਲੁਕਵਾਂ ਖਰਚ ਨਹੀਂ, ਸਾਫ-ਸੁਥਰਾ ਰੇਟ।',
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-[#C9A96E]" />,
      title: language === 'en' ? '24/7 Direct Call Dispatch' : language === 'hi' ? '24 घंटे सीधा संपर्क' : '24 ਘੰਟੇ ਸਿੱਧਾ ਸੰਪਰਕ',
      desc:
        language === 'en'
          ? 'Speak directly with Channi (+91 7837146640) or Dispatch (+91 7508260068) anytime.'
          : language === 'hi'
          ? 'दोनों फोन नंबरों पर 24 घंटे कॉल या व्हाट्सएप सहायता उपलब्ध है।'
          : '24 ਘੰਟੇ ਕਾਲ ਜਾਂ WhatsApp ਦੀ ਸੁਵਿਧਾ ਉਪਲਬਧ।',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0B] text-[#FAF7F2] border-t border-[#C9A96E]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            WHY CHANNI TRANSPORT
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#FAF7F2]">
            The Gold Standard in Tempo Freight
          </h2>
          <p className="text-sm md:text-base text-[#FAF7F2]/70 font-light">
            Family legacy built on honesty, speed, and careful handling across Punjab.
          </p>
        </div>

        {/* Counter Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-3xl glass-card border border-[#C9A96E]/30 bg-[#121212]/80 text-center space-y-2 hover:border-[#C9A96E] transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center mx-auto mb-3">
                {s.icon}
              </div>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-[#C9A96E]">
                {s.val}
              </h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF7F2]/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-card border border-[#C9A96E]/20 bg-[#121212]/70 shadow-xl hover:border-[#C9A96E]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-3.5 rounded-2xl bg-[#C9A96E]/10 border border-[#C9A96E]/30 w-fit">
                  {f.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-[#FAF7F2]">{f.title}</h3>
                <p className="text-sm text-[#FAF7F2]/70 leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C9A96E]/20 text-[11px] font-mono text-[#C9A96E]">
                PILLAR 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
