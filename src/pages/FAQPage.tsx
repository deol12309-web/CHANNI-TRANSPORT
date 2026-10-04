import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { SAMPLE_FAQS } from '../data/config';
import { useStore } from '../store/useStore';

export const FAQPage: React.FC = () => {
  const { language } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = SAMPLE_FAQS.filter((faq) => {
    const q = (language === 'en' ? faq.qEn : language === 'hi' ? faq.qHi : faq.qPa).toLowerCase();
    const a = (language === 'en' ? faq.aEn : language === 'hi' ? faq.aHi : faq.aPa).toLowerCase();
    return q.includes(searchTerm.toLowerCase()) || a.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 md:px-8 space-y-12 text-[#141210] dark:text-[#F4EFE6]">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
          Help & FAQs
        </h1>
        <p className="text-base text-[#6B6458] dark:text-[#A39B8B]">
          Find quick answers about mini-truck loading, intercity rates, and booking procedure.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A96E]" />
        <input
          type="text"
          placeholder="Search questions (e.g. rate, booking, Ludhiana, nighttime)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-full bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] focus:border-[#C9A96E] focus:outline-none text-sm shadow-md"
          data-testid="input-faq-search"
        />
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {filtered.map((faq, idx) => {
          const question = language === 'en' ? faq.qEn : language === 'hi' ? faq.qHi : faq.qPa;
          const answer = language === 'en' ? faq.aEn : language === 'hi' ? faq.aHi : faq.aPa;
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-xl gap-4 hover:text-[#C9A96E] transition-colors"
              >
                <span>{question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A96E] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm text-[#6B6458] dark:text-[#A39B8B] leading-relaxed border-t border-[#E6DFD2]/40 dark:border-[#2D2921]/40">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
