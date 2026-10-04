import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Phone } from 'lucide-react';
import { PHONE_NUMBERS } from '../data/config';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-center px-4 text-[#141210] dark:text-[#F4EFE6] space-y-6">
      <span className="font-serif text-8xl md:text-9xl font-bold text-[#C9A96E]">404</span>
      <h1 className="font-serif text-3xl md:text-5xl font-bold">Page Not Found</h1>
      <p className="max-w-md text-sm text-[#6B6458] dark:text-[#A39B8B]">
        The transport page or route you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-8 py-4 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>

        <a
          href={`tel:${PHONE_NUMBERS[0].raw}`}
          className="px-8 py-4 rounded-full border border-[#141210] dark:border-[#F4EFE6] hover:border-[#C9A96E] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Call Dispatch ({PHONE_NUMBERS[0].display})</span>
        </a>
      </div>
    </div>
  );
};
