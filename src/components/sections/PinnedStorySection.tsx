import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TruckCanvas3D } from './TruckCanvas3D';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const PinnedStorySection: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { num: '01', title: t.chapters.c1t, desc: t.chapters.c1d },
    { num: '02', title: t.chapters.c2t, desc: t.chapters.c2d },
    { num: '03', title: t.chapters.c3t, desc: t.chapters.c3d },
    { num: '04', title: t.chapters.c4t, desc: t.chapters.c4d },
    { num: '05', title: t.chapters.c5t, desc: t.chapters.c5d },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('story');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));
      const chapterIdx = Math.min(
        chapters.length - 1,
        Math.floor(progress * chapters.length)
      );

      setActiveChapter(chapterIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters.length]);

  return (
    <section
      id="story"
      className="relative h-[300vh] bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-16 overflow-hidden">
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            PINNED CHAPTERS • STORYTELLING
          </span>
          <span className="font-mono text-sm font-bold text-[#C9A96E]">
            CHAPTER {chapters[activeChapter].num} / 05
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Card linked to scroll chapter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="font-serif text-5xl md:text-6xl font-bold text-[#C9A96E] block">
                    {chapters[activeChapter].num}
                  </span>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
                    {chapters[activeChapter].title}
                  </h3>

                  <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
                    {chapters[activeChapter].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Chapter Stepper Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-[#E6DFD2] dark:border-[#2D2921]">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.num}
                  onClick={() => setActiveChapter(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeChapter === idx
                      ? 'w-10 bg-[#C9A96E]'
                      : 'w-3 bg-[#E6DFD2] dark:bg-[#2D2921] hover:bg-[#C9A96E]/50'
                  }`}
                  aria-label={`Go to chapter ${ch.num}`}
                  data-testid={`chapter-dot-${ch.num}`}
                />
              ))}
            </div>
          </div>

          {/* Right Interactive 3D Vehicle Angle linked to Chapter */}
          <div className="lg:col-span-7">
            <TruckCanvas3D exploded={activeChapter === 1 || activeChapter === 4} />
          </div>
        </div>
      </div>
    </section>
  );
};
