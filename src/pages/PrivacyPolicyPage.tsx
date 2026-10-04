import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 md:px-8 space-y-8 text-[#141210] dark:text-[#F4EFE6]">
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          LEGAL & PRIVACY
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">Last updated: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-6 text-sm text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">1. Data We Collect</h2>
          <p>
            CHANNI TRANSPORT respects your privacy. When you request a goods transport quote or book a vehicle via phone, WhatsApp, or our website wizard, we collect only the necessary trip information: your Name, Phone Number, Pickup Address, Drop Address, and Goods Description.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to coordinate driver pickup, calculate accurate route fares, and deliver your goods safely. We never sell, lease, or share your personal contact details with third-party marketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">3. WhatsApp & Phone Direct Dispatch</h2>
          <p>
            Our booking system forwards your submitted request directly to our official family dispatch line on WhatsApp (+91 75082 60068 / +91 78371 46640) to provide fast, direct communication.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#141210] dark:text-[#F4EFE6]">4. Contact Us</h2>
          <p>
            For any questions regarding your data privacy, contact Channi Transport directly at +91 75082 60068 or visit our office on GT Road, Ludhiana, Punjab.
          </p>
        </section>
      </div>
    </div>
  );
};
