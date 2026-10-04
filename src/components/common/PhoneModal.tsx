import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS } from '../../data/config';

export const PhoneModal: React.FC = () => {
  const { isPhoneModalOpen, closePhoneModal, language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <AnimatePresence>
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePhoneModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#1B1915] border border-[#C9A96E]/40 rounded-3xl p-6 md:p-8 shadow-2xl z-10 text-[#141210] dark:text-[#F4EFE6]"
          >
            {/* Close Button */}
            <button
              onClick={closePhoneModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Close modal"
              data-testid="close-phone-modal"
            >
              <X className="w-5 h-5 text-[#6B6458] dark:text-[#A39B8B]" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#FAF7F2]">{t.selectPhoneTitle || 'Call CHANNI TRANSPORT'}</h3>
                <p className="text-xs text-[#FAF7F2]/70">{t.selectPhoneSubtitle || 'Click any number below to initiate a phone call'}</p>
              </div>
            </div>

            {/* Phone Number Buttons */}
            <div className="flex flex-col gap-3 my-6">
              {PHONE_NUMBERS.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  onClick={() => closePhoneModal()}
                  className="group relative flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] hover:border-[#C9A96E] transition-all duration-300 shadow-sm hover:shadow-md"
                  data-testid={`call-btn-${phone.raw}`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E]">
                      {phone.label}
                    </span>
                    <span className="font-mono text-lg md:text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">
                      {phone.display}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-[#141210] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                </a>
              ))}
            </div>

            {/* Direct Call Notice */}
            <div className="flex items-center gap-2 text-xs text-[#6B6458] dark:text-[#A39B8B] bg-[#C9A96E]/10 p-3 rounded-xl border border-[#C9A96E]/20">
              <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
              <span>Clicking any number directly initiates your device dialer app.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
