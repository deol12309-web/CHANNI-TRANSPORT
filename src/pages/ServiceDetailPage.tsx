import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { SERVICES_LIST, PHONE_NUMBERS } from '../data/config';
import { QuoteBookingWizard } from '../components/booking/QuoteBookingWizard';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES_LIST.find((s) => s.id === id) || SERVICES_LIST[0];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-12 text-[#141210] dark:text-[#F4EFE6]">
      {/* Breadcrumb */}
      <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A96E] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Services</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
              SERVICE SPECIFICATIONS
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mt-2">
              {service.titleKey}
            </h1>
            <p className="text-base text-[#6B6458] dark:text-[#A39B8B] mt-4">
              Heavy-duty open cargo bed tempo transport across Ludhiana, Jalandhar, Mohali & Punjab routes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-4">
            <h3 className="font-serif text-xl font-bold">What is Included</h3>
            <ul className="space-y-2 text-xs text-[#6B6458] dark:text-[#A39B8B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                <span>Dedicated mini-truck with experienced Punjabi driver</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                <span>Heavy-duty load tie straps and protective tarpaulins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                <span>Direct point-to-point transit with zero intermediate stops</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A96E]" />
                <span>Base fare starting from ₹{service.basePrice} (plus ₹{service.perKmRate}/km)</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE_NUMBERS[0].raw}`}
              className="px-6 py-3.5 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call Dispatch ({PHONE_NUMBERS[0].display})</span>
            </a>
          </div>
        </div>

        {/* Right Embedded Instant Quote Form */}
        <div className="lg:col-span-6">
          <QuoteBookingWizard initialServiceId={service.id} />
        </div>
      </div>
    </div>
  );
};
