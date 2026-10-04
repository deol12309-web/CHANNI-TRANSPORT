import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, SAMPLE_FAQS } from '../../data/config';

export const FAQSection: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            {t.faq.badge}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-sm md:text-base text-[#6B6458] dark:text-[#A39B8B]">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {SAMPLE_FAQS.map((faq, idx) => {
            const question = language === 'en' ? faq.qEn : language === 'hi' ? faq.qHi : faq.qPa;
            const answer = language === 'en' ? faq.aEn : language === 'hi' ? faq.aHi : faq.aPa;
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-lg md:text-xl gap-4 hover:text-[#C9A96E] transition-colors"
                  data-testid={`faq-item-${idx}`}
                >
                  <span>{question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A96E] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm md:text-base text-[#6B6458] dark:text-[#A39B8B] leading-relaxed border-t border-[#E6DFD2]/40 dark:border-[#2D2921]/40">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
