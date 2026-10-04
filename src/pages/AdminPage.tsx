import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Search,
  Download,
  Phone,
  MessageSquare,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Settings,
  Users,
  FileText,
  Save,
  Plus
} from 'lucide-react';
import {
  LeadItem,
  SAMPLE_INITIAL_LEADS,
  CONFIG,
  PHONE_NUMBERS,
  SERVICES_LIST
} from '../data/config';
import { useStore } from '../store/useStore';

export const AdminPage: React.FC = () => {
  const { showToast } = useStore();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'analytics' | 'broadcast' | 'settings'>('leads');

  // Leads Data State
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Business Settings State
  const [phone1, setPhone1] = useState(PHONE_NUMBERS[0].display);
  const [phone2, setPhone2] = useState(PHONE_NUMBERS[1].display);
  const [tagline, setTagline] = useState(CONFIG.taglineEn);

  useEffect(() => {
    // Check saved session
    const session = localStorage.getItem('channi_admin_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    // Load Leads from LocalStorage or seed defaults
    try {
      const storedStr = localStorage.getItem('channi_leads');
      if (storedStr) {
        setLeads(JSON.parse(storedStr));
      } else {
        localStorage.setItem('channi_leads', JSON.stringify(SAMPLE_INITIAL_LEADS));
        setLeads(SAMPLE_INITIAL_LEADS);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      emailInput.trim().toLowerCase() === CONFIG.adminEmail &&
      passwordInput === CONFIG.adminPasswordHash
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('channi_admin_session', 'true');
      showToast('Admin session authenticated successfully!', 'success');
    } else {
      showToast('Invalid email or password. Use: admin@channitransport.com / channitransport', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('channi_admin_session');
    showToast('Logged out of admin panel.', 'info');
  };

  const updateLeadStatus = (id: string, newStatus: LeadItem['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem('channi_leads', JSON.stringify(updated));
    showToast(`Lead ${id} status updated to ${newStatus}`, 'success');
  };

  const saveLeadNote = (id: string) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, notes: noteInput } : l));
    setLeads(updated);
    localStorage.setItem('channi_leads', JSON.stringify(updated));
    setEditingNoteId(null);
    showToast('Note saved successfully!', 'success');
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      showToast('No leads to export.', 'error');
      return;
    }

    const headers = [
      'Reference No',
      'Name',
      'Phone',
      'Pickup',
      'Drop',
      'Goods',
      'Weight/Size',
      'Est Price Range',
      'Status',
      'Notes',
      'Created At',
      'Source Page'
    ];

    const rows = leads.map((l) => [
      l.referenceNo,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.pickup}"`,
      `"${l.drop}"`,
      `"${l.goods}"`,
      `"${l.weightSize}"`,
      `"${l.estimatedPriceRange || ''}"`,
      l.status,
      `"${l.notes || ''}"`,
      l.createdAt,
      l.sourcePage
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Channi_Transport_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV export downloaded!', 'success');
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesQuery =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.drop.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const unreadCount = leads.filter((l) => l.status === 'New').length;
  const todayCount = leads.filter((l) => l.createdAt.startsWith(new Date().toISOString().split('T')[0])).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center p-4 text-[#141210] dark:text-[#F4EFE6]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#C9A96E]/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl font-bold">Admin Dispatch Login</h1>
            <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">
              Enter owner email and password to access dispatch portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label className="text-xs font-semibold uppercase text-[#C9A96E] block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@channitransport.com"
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm"
                data-testid="input-admin-email"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase text-[#C9A96E] block mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] border border-[#E6DFD2] dark:border-[#2D2921] text-sm font-mono"
                data-testid="input-admin-password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider hover:bg-[#B8923F] transition-colors shadow-lg"
              data-testid="submit-admin-login"
            >
              Sign In to Dispatch Dashboard
            </button>
          </form>

          <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#100F0D] text-[11px] text-[#6B6458] dark:text-[#A39B8B] border border-[#E6DFD2] dark:border-[#2D2921]">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@channitransport.com</p>
            <p>Password: channitransport</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-[#141210] dark:text-[#F4EFE6]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E6DFD2] dark:border-[#2D2921]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C9A96E]">
            DISPATCH CONTROL & LEADS MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mt-1">Owner Admin Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-full border border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          data-testid="admin-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B6458] dark:text-[#A39B8B] uppercase">Today's Enquiries</span>
            <h3 className="font-serif text-4xl font-bold mt-1">{todayCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B6458] dark:text-[#A39B8B] uppercase">Unread / New Leads</span>
            <h3 className="font-serif text-4xl font-bold text-[#C9A96E] mt-1">{unreadCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#C9A96E]/20 text-[#C9A96E] flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] shadow-md flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#6B6458] dark:text-[#A39B8B] uppercase">Total Bookings Recorded</span>
            <h3 className="font-serif text-4xl font-bold mt-1">{leads.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E6DFD2] dark:border-[#2D2921] gap-6 text-sm font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 transition-colors ${
            activeTab === 'leads' ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]' : 'text-[#6B6458] dark:text-[#A39B8B]'
          }`}
        >
          Leads Table ({leads.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 transition-colors ${
            activeTab === 'analytics' ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]' : 'text-[#6B6458] dark:text-[#A39B8B]'
          }`}
        >
          Enquiry Analytics Chart
        </button>

        <button
          onClick={() => setActiveTab('broadcast')}
          className={`pb-3 transition-colors ${
            activeTab === 'broadcast' ? 'border-b-2 border-[#C9A96E] text-[#C9A96E]' : 'text-[#6B6458] dark:text-[#A39B8B]'
          }`}
        >
          WhatsApp Broadcast List
        </button>
      </div>

      {/* TAB 1: LEADS TABLE */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E]" />
              <input
                type="text"
                placeholder="Search leads, phone, or route..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] text-xs"
                data-testid="input-admin-search"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] text-xs font-bold"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Called">Called</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={exportToCSV}
                className="px-5 py-2.5 rounded-2xl bg-[#C9A96E] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#B8923F] shadow-sm"
                data-testid="export-csv-btn"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-3xl border border-[#E6DFD2] dark:border-[#2D2921] bg-white dark:bg-[#1B1915] shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#FAF7F2] dark:bg-[#100F0D] uppercase font-bold text-[#6B6458] dark:text-[#A39B8B] border-b border-[#E6DFD2] dark:border-[#2D2921]">
                <tr>
                  <th className="p-4">Ref Code</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Route (Pickup ➔ Drop)</th>
                  <th className="p-4">Goods & Fare</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E6DFD2]/60 dark:divide-[#2D2921]/60">
                {filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-[#FAF7F2]/50 dark:hover:bg-[#100F0D]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#C9A96E]">{l.referenceNo}</td>
                    <td className="p-4">
                      <span className="font-bold block">{l.name}</span>
                      <span className="font-mono text-[#6B6458] dark:text-[#A39B8B]">{l.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="block font-semibold">{l.pickup}</span>
                      <span className="text-[#C9A96E] font-bold">➔ {l.drop}</span>
                    </td>
                    <td className="p-4">
                      <span className="block font-semibold">{l.goods}</span>
                      <span className="text-[#6B6458] dark:text-[#A39B8B]">{l.estimatedPriceRange || l.weightSize}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={l.status}
                        onChange={(e) => updateLeadStatus(l.id, e.target.value as any)}
                        className={`p-1.5 rounded-xl font-bold text-[11px] ${
                          l.status === 'New'
                            ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                            : l.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                            : l.status === 'Completed'
                            ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Called">Called</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 max-w-xs">
                      {editingNoteId === l.id ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            className="p-1 rounded border text-xs w-full bg-[#FAF7F2] dark:bg-[#100F0D]"
                          />
                          <button onClick={() => saveLeadNote(l.id)} className="p-1 text-emerald-500">
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => {
                            setEditingNoteId(l.id);
                            setNoteInput(l.notes || '');
                          }}
                          className="cursor-pointer hover:underline text-[#6B6458] dark:text-[#A39B8B] block"
                        >
                          {l.notes || '+ Add note'}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <a
                        href={`tel:${l.phone}`}
                        className="p-2 rounded-full bg-[#C9A96E]/20 text-[#C9A96E] inline-flex items-center justify-center"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                      </a>
                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(l.name)},%20regarding%20your%20Channi%20Transport%20booking%20${l.referenceNo}...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-emerald-500/20 text-emerald-500 inline-flex items-center justify-center"
                        title="WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ANALYTICS CHART */}
      {activeTab === 'analytics' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-6">
          <h2 className="font-serif text-2xl font-bold">Enquiries Received per Day</h2>
          <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-[#E6DFD2] dark:border-[#2D2921] px-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const height = [40, 65, 30, 85, 95, 60, 100][idx];
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-[#C9A96E]">{Math.round(height / 10)}</span>
                  <div
                    className="w-full bg-[#C9A96E] rounded-t-xl transition-all"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs font-semibold text-[#6B6458] dark:text-[#A39B8B]">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: WHATSAPP BROADCAST LIST */}
      {activeTab === 'broadcast' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1B1915] border border-[#E6DFD2] dark:border-[#2D2921] space-y-6">
          <h2 className="font-serif text-2xl font-bold">WhatsApp Opt-in Customer Broadcast List</h2>
          <p className="text-xs text-[#6B6458] dark:text-[#A39B8B]">
            Opted-in client contact numbers captured from bookings:
          </p>

          <div className="space-y-2">
            {leads.map((l) => (
              <div key={l.id} className="p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#100F0D] flex items-center justify-between text-xs font-mono">
                <span>{l.name} • {l.phone}</span>
                <span className="text-[#C9A96E] font-sans font-bold">Opted-in</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
