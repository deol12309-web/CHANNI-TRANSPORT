import React, { useState } from 'react';
import { Search, CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';
import { LeadItem } from '../../data/config';
import { useStore } from '../../store/useStore';

export const TrackBooking: React.FC = () => {
  const [refInput, setRefInput] = useState('');
  const [foundLead, setFoundLead] = useState<LeadItem | null>(null);
  const [searched, setSearched] = useState(false);
  const { showToast } = useStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) {
      showToast('Please enter a booking reference number (e.g. CT-2026-0012)', 'error');
      return;
    }

    try {
      const storedStr = localStorage.getItem('channi_leads');
      const leads: LeadItem[] = storedStr ? JSON.parse(storedStr) : [];
      const match = leads.find(
        (l) => l.referenceNo.toLowerCase() === refInput.trim().toLowerCase()
      );

      if (match) {
        setFoundLead(match);
      } else {
        setFoundLead(null);
      }
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold">Received (Pending Review)</span>;
      case 'Confirmed':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-bold">Confirmed (Driver Assigned)</span>;
      case 'Completed':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs font-bold">Completed (Delivered)</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-xl space-y-6 text-[#141210] dark:text-[#F4EFE6]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold">Track Your Transport Enquiry</h3>
          <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">
            Enter your booking reference code (e.g. CT-2026-0012)
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. CT-2026-0012"
          value={refInput}
          onChange={(e) => setRefInput(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] font-mono text-sm uppercase focus:border-[#C9A96E] focus:outline-none"
          data-testid="track-ref-input"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#B8923F] transition-colors"
          data-testid="track-search-btn"
        >
          <Search className="w-4 h-4" />
          <span>Track</span>
        </button>
      </form>

      {searched && foundLead && (
        <div className="p-5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#C9A96E]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-base">{foundLead.referenceNo}</span>
            {getStatusBadge(foundLead.status)}
          </div>

          <div className="text-xs space-y-1 text-[#6B6458] dark:text-[#A39B8B]">
            <p><strong>Customer:</strong> {foundLead.name} ({foundLead.phone})</p>
            <p><strong>Route:</strong> {foundLead.pickup} ➔ {foundLead.drop}</p>
            <p><strong>Estimated Fare:</strong> {foundLead.estimatedPriceRange || 'Quote on Call'}</p>
            {foundLead.notes && <p><strong>Notes:</strong> {foundLead.notes}</p>}
          </div>
        </div>
      )}

      {searched && !foundLead && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>No booking found with reference code "{refInput}". Please verify the reference number or call dispatch.</span>
        </div>
      )}
    </div>
  );
};
