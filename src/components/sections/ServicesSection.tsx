import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Store, Home, HardHat, Sprout, PartyPopper, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const ServicesSection: React.FC = () => {
  const { language, setBookingPreFillGoods } = useStore();
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<string>('local');

  const serviceKeys = ['local', 'intercity', 'shop', 'shifting', 'material', 'farm', 'events'];

  const getServiceIcon = (key: string) => {
    switch (key) {
      case 'local': return <Truck className="w-5 h-5" />;
      case 'intercity': return <MapPin className="w-5 h-5" />;
      case 'shop': return <Store className="w-5 h-5" />;
      case 'shifting': return <Home className="w-5 h-5" />;
      case 'material': return <HardHat className="w-5 h-5" />;
      case 'farm': return <Sprout className="w-5 h-5" />;
      case 'events': return <PartyPopper className="w-5 h-5" />;
      default: return <Truck className="w-5 h-5" />;
    }
  };

  const handleBookService = (serviceTitle: string) => {
    setBookingPreFillGoods(serviceTitle);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            {t.services.badge}
          </span>

          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            {t.services.title}
          </h2>

          <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B]">
            {t.services.subtitle}
          </p>
        </div>

        {/* Service Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {serviceKeys.map((key) => {
            const item = t.services.items[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#141210] text-[#FAF7F2] dark:bg-[#F4EFE6] dark:text-[#100F0D] shadow-lg scale-105'
                    : 'bg-white dark:bg-[#1B1915] text-[#6B6458] dark:text-[#A39B8B] border border-[#E6DFD2] dark:border-[#2D2921] hover:border-[#C9A96E]'
                }`}
                data-testid={`service-tab-${key}`}
              >
                <span className={isActive ? 'text-[#C9A96E]' : ''}>{getServiceIcon(key)}</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Card Highlight */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center">
                  {getServiceIcon(activeTab)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-4xl font-bold">
                    {t.services.items[activeTab].title}
                  </h3>
                  <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider">
                    {t.services.items[activeTab].price}
                  </span>
                </div>
              </div>

              <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
                {t.services.items[activeTab].desc}
              </p>

              <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-xs font-semibold text-[#141210] dark:text-[#F4EFE6] flex items-center justify-between">
                <span>Recommendation: {t.services.items[activeTab].rec}</span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleBookService(t.services.items[activeTab].title)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C9A96E] hover:bg-[#B8923F] text-[#141210] font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md"
                  data-testid="book-selected-service-btn"
                >
                  <span>{t.services.bookBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
