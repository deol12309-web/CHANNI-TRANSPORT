import React from 'react';
import { Shield, Award, Clock, Heart, Users, Truck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TRANSLATIONS_GLOBAL } from '../data/config';

export const AboutPage: React.FC = () => {
  const { language } = useStore();
  const t = TRANSLATIONS_GLOBAL[language];

  const milestones = [
    { year: '2012', title: 'Humble Beginnings', desc: 'Started with a single mini tempo in Ludhiana delivering market stock for local textile merchants.' },
    { year: '2016', title: 'Fleet Expansion', desc: 'Expanded fleet to serve intercity routes across Jalandhar, Amritsar, Mohali, and Chandigarh.' },
    { year: '2020', title: '24/7 Dispatch Hub', desc: 'Established dedicated family dispatch lines for instant loading and 24-hour emergency transport.' },
    { year: '2026', title: '1,500+ Trips Delivered', desc: 'Over a decade of trusted service with 99.4% on-time delivery record.' }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-16 text-[#141210] dark:text-[#F4EFE6]">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          FAMILY-RUN TRANSPORT LEGACY
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
          About CHANNI TRANSPORT
        </h1>
        <p className="text-lg text-[#6B6458] dark:text-[#A39B8B]">
          Built on Punjabi hospitality, hard work, and unshakeable trust since 2012.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold">
            "Every Load Carries Our Family Name."
          </h2>
          <p className="text-base md:text-lg text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
            Founded by the Channi family in Ludhiana, CHANNI TRANSPORT began with one core rule: treat every client's cargo as if it were our own. Over the past 14 years, we have grown into one of the most reliable tempo goods transport services in Punjab.
          </p>
          <p className="text-base text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
            Unlike cold corporate logistics aggregators, when you call CHANNI TRANSPORT, you speak directly with our family dispatchers. No automated call centers, no hidden fees, and zero delays.
          </p>
        </div>

        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#C9A96E]">Why Customers Trust Us</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#C9A96E] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Protected Loading</h4>
                <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">Clean cargo beds with heavy-duty tie straps and padding.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#C9A96E] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Punctual Transit</h4>
                <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">Direct point-to-point routes without detours.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#C9A96E] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm">Transparent Pricing</h4>
                <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">No hidden charges. Agreed rate is the final rate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <h2 className="font-serif text-3xl font-bold text-center">Milestones of Trust</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-2 shadow-md">
              <span className="font-serif text-3xl font-bold text-[#C9A96E]">{m.year}</span>
              <h3 className="font-bold text-base">{m.title}</h3>
              <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
