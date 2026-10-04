import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS } from '../../data/config';

export const AboutSection: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
              {t.about.badge}
            </span>

            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {t.about.heading}
            </h2>

            <p className="text-lg md:text-xl font-medium text-[#C9A96E] leading-relaxed">
              {t.about.sub}
            </p>

            <div className="space-y-4 text-sm md:text-base text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            {/* Direct Contact Commitment */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold">Direct Dispatch Contact</h4>
                <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">
                  No middleman delays. Speak directly with driver / dispatchers at {PHONE_NUMBERS[0].display} or {PHONE_NUMBERS[1].display}.
                </p>
              </div>
            </div>
          </div>

          {/* Right Statistics & Counter Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg relative overflow-hidden group"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-4xl font-bold text-[#141210] dark:text-[#F4EFE6] mb-1">
                {t.about.stat1Val}
              </h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6458] dark:text-[#A39B8B]">
                {t.about.stat1Label}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-3xl font-bold text-[#141210] dark:text-[#F4EFE6] mb-1">
                  {t.about.stat2Val}
                </h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6458] dark:text-[#A39B8B]">
                  {t.about.stat2Label}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#141210] dark:text-[#F4EFE6] mb-1">
                  {t.about.stat3Val}
                </h4>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6458] dark:text-[#A39B8B]">
                  {t.about.stat3Label}
                </p>
              </motion.div>
            </div>

            <p className="text-[11px] text-[#6B6458] dark:text-[#A39B8B] italic text-center">
              {t.about.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
