import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Home, Store, HardHat, ArrowRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/config';
import { useStore } from '../store/useStore';

export const ServicesOverviewPage: React.FC = () => {
  const { language } = useStore();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'local-loading': return <Truck className="w-6 h-6 text-[#C9A96E]" />;
      case 'intercity-transport': return <MapPin className="w-6 h-6 text-[#C9A96E]" />;
      case 'shifting-services': return <Home className="w-6 h-6 text-[#C9A96E]" />;
      case 'market-delivery': return <Store className="w-6 h-6 text-[#C9A96E]" />;
      case 'construction-material': return <HardHat className="w-6 h-6 text-[#C9A96E]" />;
      default: return <Truck className="w-6 h-6 text-[#C9A96E]" />;
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-16 text-[#141210] dark:text-[#F4EFE6]">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
          OUR TRANSPORTATION SERVICES
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
          Comprehensive Goods Transport
        </h1>
        <p className="text-base text-[#6B6458] dark:text-[#A39B8B]">
          From quick market deliveries to heavy intercity loads, explore our tailored tempo services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_LIST.map((srv) => (
          <div
            key={srv.id}
            className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-lg flex flex-col justify-between space-y-6 hover:border-[#C9A96E] transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/20 flex items-center justify-center">
                {getServiceIcon(srv.id)}
              </div>
              <h3 className="font-serif text-2xl font-bold">{srv.titleKey}</h3>
              <p className="text-xs text-[#6B6458] dark:text-[#A39B8B] leading-relaxed">
                Reliable open cargo bed tempo service starting at base fare ₹{srv.basePrice}.
              </p>
            </div>

            <Link
              to={`/services/${srv.id}`}
              className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#C9A96E] hover:underline"
            >
              <span>View Service Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
