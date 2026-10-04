import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS, PHONE_NUMBERS, CONFIG, SERVICE_AREAS } from '../../data/config';

export const ContactSection: React.FC = () => {
  const { language, openPhoneModal } = useStore();
  const t = TRANSLATIONS[language];

  return (
    <section
      id="contact"
      className="py-24 bg-[#FAF7F2] dark:bg-[#100F0D] text-[#141210] dark:text-[#F4EFE6] border-t border-[#E6DFD2] dark:border-[#2D2921]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
                {t.contact.badge}
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
                {t.contact.title}
              </h2>
              <p className="text-base text-[#6B6458] dark:text-[#A39B8B]">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Direct Phone Numbers Cards */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-wider block">
                DIRECT DISPATCH LINES (TAP TO CALL):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PHONE_NUMBERS.map((p) => (
                  <a
                    key={p.raw}
                    href={`tel:${p.raw}`}
                    className="p-5 rounded-2xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] hover:border-[#C9A96E] transition-all flex items-center justify-between shadow-sm group"
                    data-testid={`contact-phone-${p.raw}`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C9A96E]">{p.label}</span>
                      <span className="font-mono text-lg font-bold block">{p.display}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-[#141210] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 fill-current" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Address & Hours */}
            <div className="space-y-4 pt-4 border-t border-[#E6DFD2] dark:border-[#2D2921]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t.contact.addressLabel}</h4>
                  <p className="text-xs text-[#6B6458] dark:text-[#A39B8B] mt-0.5">{t.contact.addressVal}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{t.contact.hoursLabel}</h4>
                  <p className="text-xs text-[#6B6458] dark:text-[#A39B8B] mt-0.5">{t.contact.hoursVal}</p>
                </div>
              </div>
            </div>

            {/* Service Area Tags */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm">{t.contact.serviceAreaLabel}</h4>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] text-xs text-[#6B6458] dark:text-[#A39B8B]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Google Maps Embed */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#E6DFD2] dark:border-[#2D2921] shadow-2xl relative bg-[#1B1915]">
              <iframe
                title="CHANNI TRANSPORT Location Map"
                src={CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <a
              href="https://maps.google.com/?q=Ludhiana+Punjab"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-[#141210] dark:bg-[#F4EFE6] text-[#FAF7F2] dark:text-[#100F0D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C9A96E] dark:hover:bg-[#C9A96E] dark:hover:text-[#100F0D] transition-all shadow-md"
              data-testid="get-directions-btn"
            >
              <Navigation className="w-4 h-4" />
              <span>{t.contact.getDirections}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
