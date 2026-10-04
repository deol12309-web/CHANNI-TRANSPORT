import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../../config';

interface PreloaderProps {
  onLoadingComplete?: () => void;
  externalProgress?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete, externalProgress }) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const displayProgress = externalProgress !== undefined ? externalProgress : internalProgress;

  useEffect(() => {
    if (externalProgress !== undefined) {
      if (externalProgress >= 100) {
        setTimeout(() => {
          setIsComplete(true);
          if (onLoadingComplete) onLoadingComplete();
        }, 500);
      }
      return;
    }

    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [externalProgress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#0B0B0B] text-[#FAF7F2] px-6 py-12 select-none"
        >
          {/* Top Brand Header */}
          <div className="w-full max-w-7xl flex justify-between items-center text-xs tracking-[0.25em] font-semibold text-[#C9A96E] uppercase">
            <span>CHANNI TRANSPORT</span>
            <span>BHAROSA HAR SAFAR KA</span>
          </div>

          {/* Center Brand Title */}
          <div className="text-center my-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold text-[#FAF7F2]">
                CHANNI <span className="text-[#C9A96E] italic font-normal">TRANSPORT</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs md:text-sm text-[#FAF7F2]/70 tracking-[0.2em] mt-4 uppercase font-sans font-light"
            >
              {CONFIG.tagline.en} • {CONFIG.tagline.pa}
            </motion.p>
          </div>

          {/* Bottom Loading Bar */}
          <div className="w-full max-w-md flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs tracking-widest font-mono text-[#C9A96E]">
              <span>LOADING SCROLLEABLE EXPERIENCE</span>
              <span>{Math.min(Math.round(displayProgress), 100)}%</span>
            </div>
            <div className="w-full h-[2px] bg-[#FAF7F2]/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#C9A96E]"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(Math.round(displayProgress), 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
