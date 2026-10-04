import React from 'react';
import { ContactSection } from '../components/sections/ContactSection';
import { TrackBooking } from '../components/booking/TrackBooking';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 space-y-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <TrackBooking />
      </div>

      <ContactSection />
    </div>
  );
};
