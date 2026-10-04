import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, SAMPLE_TESTIMONIALS } from '../../data/config';

export const TestimonialsSection: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            {t.testimonials.badge}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-sm md:text-base text-[#6B6458] dark:text-[#A39B8B]">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_TESTIMONIALS.map((item, idx) => {
            const comment =
              language === 'en'
                ? item.commentEn
                : language === 'hi'
                ? item.commentHi
                : item.commentPa;

            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C9A96E]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-base font-serif italic text-[#141210] dark:text-[#F4EFE6] leading-relaxed">
                    "{comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6DFD2]/60 dark:border-[#2D2921]/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">{item.role} • {item.location}</p>
                  </div>
                  <Quote className="w-6 h-6 text-[#C9A96E]/30" />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-[#6B6458] dark:text-[#A39B8B] mt-12 italic">
          {t.testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
};
