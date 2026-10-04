import React from 'react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const MarqueeBanner: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full bg-[#141210] dark:bg-[#1B1915] text-[#C9A96E] py-4 overflow-hidden border-y border-[#C9A96E]/30 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {(t.marquee as string[]).concat(t.marquee as string[]).map((item: string, idx: number) => (
          <div key={idx} className="flex items-center gap-8 px-6 font-serif text-lg md:text-2xl font-semibold tracking-wider">
            <span>{item}</span>
            <span className="text-[#FAF7F2]/40 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};
