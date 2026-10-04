import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 md:px-8 space-y-8 text-[#141210] dark:text-[#F4EFE6]">
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          TERMS OF SERVICE
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">Last updated: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-6 text-sm text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">1. Cargo Transport Agreement</h2>
          <p>
            By booking a mini-truck or tempo with CHANNI TRANSPORT, you agree to provide truthful information regarding cargo type, weight, and pickup/drop locations. Prohibited or illegal goods are strictly not transported.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">2. Fare Confirmation & Payment</h2>
          <p>
            Estimates provided on our website wizard are general distance-based price ranges. The final fare is locked and confirmed directly on the phone call prior to vehicle dispatch. Payment is settled with the driver upon completion of delivery unless prior monthly billing contracts exist.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">3. Loading & Safety Guidelines</h2>
          <p>
            Items must be suitable for open cargo bed transport. Fragile items should be declared in advance so appropriate protective blankets and tie ropes are utilized.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">4. Contact & Support</h2>
          <p>
            Call dispatch line +91 75082 60068 / +91 78371 46640 for immediate booking adjustments or support.
          </p>
        </section>
      </div>
    </div>
  );
};
