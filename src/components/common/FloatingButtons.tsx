import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../data/config';

export const FloatingButtons: React.FC = () => {
  const { openPhoneModal, openWhatsAppModal, language } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Desktop Floating Action Buttons (Bottom-Right) */}
      <div className="hidden md:flex fixed right-6 bottom-8 z-[90] flex-col gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={() => openWhatsAppModal()}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="WhatsApp Dispatch Chat"
          data-testid="desktop-floating-wa"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#1B1915] text-[#F4EFE6] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[#C9A96E]/30">
            {t.whatsappUs}
          </span>
        </button>

        {/* Call Button */}
        <button
          onClick={() => openPhoneModal()}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#C9A96E] text-[#141210] shadow-xl hover:bg-[#B8923F] transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Call Dispatch"
          data-testid="desktop-floating-call"
        >
          <Phone className="w-6 h-6 fill-current" />
          <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#1B1915] text-[#F4EFE6] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg border border-[#C9A96E]/30">
            {t.callUsNow} (+91 7837146640)
          </span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-[#FAF7F2]/95 dark:bg-[#100F0D]/95 backdrop-blur-lg border-t border-[#E6DFD2] dark:border-[#2D2921] px-4 py-2.5 flex items-center gap-3">
        {/* Direct Call Choice */}
        <button
          onClick={() => openPhoneModal()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#141210] dark:bg-[#F4EFE6] text-[#FAF7F2] dark:text-[#100F0D] font-bold text-sm shadow-md active:scale-95 transition-transform"
          data-testid="mobile-bottom-call"
        >
          <Phone className="w-4 h-4 fill-current text-[#C9A96E]" />
          <span>{t.callUsNow}</span>
        </button>

        {/* Direct WhatsApp Choice */}
        <button
          onClick={() => openWhatsAppModal()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
          data-testid="mobile-bottom-wa"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </button>
      </div>
    </>
  );
};
