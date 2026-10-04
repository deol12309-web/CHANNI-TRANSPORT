import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TruckCanvas3D } from './TruckCanvas3D';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const ExplodedPartsSection: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS[language];
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [exploded, setExploded] = useState(true);

  const parts = [
    { id: 1, name: t.exploded.p1Name, desc: t.exploded.p1Desc },
    { id: 2, name: t.exploded.p2Name, desc: t.exploded.p2Desc },
    { id: 3, name: t.exploded.p3Name, desc: t.exploded.p3Desc },
    { id: 4, name: t.exploded.p4Name, desc: t.exploded.p4Desc },
  ];

  return (
    <section
      id="truck"
      className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            {t.exploded.badge}
          </span>

          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
            {t.exploded.title}
          </h2>

          <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B]">
            {t.exploded.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive 3D Canvas */}
          <div className="lg:col-span-8">
            <TruckCanvas3D exploded={exploded} onExplodeToggle={() => setExploded(!exploded)} />
          </div>

          {/* Interactive Parts Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#1B1915]/60 border border-[#E6DFD2] dark:border-[#2D2921]">
              <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider block mb-3">
                SELECT VEHICLE PART TO INSPECT:
              </span>

              <div className="grid grid-cols-1 gap-3">
                {parts.map((part, idx) => (
                  <button
                    key={part.id}
                    onClick={() => {
                      setExploded(true);
                      setSelectedPart(selectedPart === idx ? null : idx);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      selectedPart === idx
                        ? 'border-[#C9A96E] bg-[#141210] text-[#FAF7F2] dark:bg-[#F4EFE6] dark:text-[#100F0D] shadow-md'
                        : 'border-[#E6DFD2] dark:border-[#2D2921] bg-white dark:bg-[#100F0D] hover:border-[#C9A96E]'
                    }`}
                    data-testid={`inspect-part-${part.id}`}
                  >
                    <div className="flex items-center justify-between font-serif font-bold text-lg">
                      <span>{part.name}</span>
                      <span className="text-xs text-[#C9A96E] font-mono">0{part.id}</span>
                    </div>

                    <AnimatePresence>
                      {selectedPart === idx && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs mt-2 text-[#FAF7F2]/80 dark:text-[#100F0D]/80 font-sans leading-relaxed"
                        >
                          {part.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
