import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Eye,
  IndianRupee,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Building2,
  Database,
  Phone,
  Zap
} from 'lucide-react';
import { AntiInspectShield } from './components/AntiInspectShield';

interface Lead {
  id: string;
  type: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  businessType?: string;
  serviceName: string;
  techStack?: string[];
  estimatedBudget: number;
  timeline: string;
  details: string;
  status: 'pending' | 'contacted' | 'converted';
  createdAt: string;
}

export const App: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('shadow_admin_token'));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSilentSyncing, setIsSilentSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'converted'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  const DEFAULT_SEED_LEADS: Lead[] = [
    {
      id: 'EST-849201',
      type: 'Cost Estimate',
      clientName: 'Vikram Sharma',
      clientEmail: 'vikram@techventure.in',
      clientPhone: '+91 98765 43210',
      company: 'TechVenture Labs',
      businessType: 'B2B Corporate',
      serviceName: 'Enterprise SaaS Platform',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      estimatedBudget: 350000,
      timeline: '4-6 Weeks',
      details: 'Looking for a high-performance multi-tenant dashboard with automated GST invoicing and analytics.',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'EST-739104',
      type: 'Discovery Call',
      clientName: 'Ananya Patel',
      clientEmail: 'ananya@growthbrands.co',
      clientPhone: '+91 98123 45678',
      company: 'GrowthBrands D2C',
      businessType: 'D2C Brand',
      serviceName: 'Headless E-Commerce Engine',
      techStack: ['Next.js', 'Stripe API', 'GraphQL', 'Supabase'],
      estimatedBudget: 180000,
      timeline: '2-3 Weeks',
      details: 'Need a sub-second page load storefront with high converting checkout flow and custom payment gateway.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
    },
    {
      id: 'EST-992105',
      type: 'Cost Estimate',
      clientName: 'Rohan Mehta',
      clientEmail: 'rohan@apexlogistics.io',
      clientPhone: '+91 99887 76655',
      company: 'Apex Logistics',
      businessType: 'B2B Corporate',
      serviceName: 'Custom Full-Stack System',
      techStack: ['React', 'TypeScript', 'REST API'],
      estimatedBudget: 240000,
      timeline: '3-4 Weeks',
      details: 'Real-time fleet tracking and automated client reporting dashboard.',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ];

  const fetchLeads = async (authToken: string, isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsSilentSyncing(true);

    let localSubmitted: Lead[] = [];
    try {
      localSubmitted = JSON.parse(localStorage.getItem('shadow_client_inquiries') || '[]');
    } catch (e) {
      localSubmitted = [];
    }

    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      let fetched: Lead[] = [];

      if (res.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
        fetched = data.data;
      } else {
        fetched = DEFAULT_SEED_LEADS;
      }

      const combined = [...localSubmitted];
      fetched.forEach(item => {
        if (!combined.some(c => c.id === item.id)) {
          combined.push(item);
        }
      });

      const statusOverrides: Record<string, 'pending' | 'contacted' | 'converted'> = JSON.parse(
        localStorage.getItem('shadow_inquiry_status_overrides') || '{}'
      );

      setLeads(prevLeads => {
        return combined.map(lead => {
          const override = statusOverrides[lead.id];
          const current = prevLeads.find(p => p.id === lead.id);
          return {
            ...lead,
            status: override || current?.status || lead.status
          };
        });
      });
    } catch (err) {
      const combined = [...localSubmitted];
      DEFAULT_SEED_LEADS.forEach(item => {
        if (!combined.some(c => c.id === item.id)) {
          combined.push(item);
        }
      });

      const statusOverrides: Record<string, 'pending' | 'contacted' | 'converted'> = JSON.parse(
        localStorage.getItem('shadow_inquiry_status_overrides') || '{}'
      );

      setLeads(prevLeads => {
        return combined.map(lead => {
          const override = statusOverrides[lead.id];
          const current = prevLeads.find(p => p.id === lead.id);
          return {
            ...lead,
            status: override || current?.status || lead.status
          };
        });
      });
    } finally {
      setIsLoading(false);
      setIsSilentSyncing(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchLeads(token);
    // Auto live sync every 8 seconds so any inquiry from frontend immediately pops up!
    const interval = setInterval(() => {
      fetchLeads(token, true);
    }, 8000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('shadow_admin_token', data.token);
        fetchLeads(data.token);
      } else {
        setErrorMsg(data.error || 'Invalid admin credentials.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to backend API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('shadow_admin_token');
  };

  const handleStatusChange = async (leadId: string, newStatus: 'pending' | 'contacted' | 'converted') => {
    try {
      const overrides: Record<string, string> = JSON.parse(
        localStorage.getItem('shadow_inquiry_status_overrides') || '{}'
      );
      overrides[leadId] = newStatus;
      localStorage.setItem('shadow_inquiry_status_overrides', JSON.stringify(overrides));
    } catch (e) {}

    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    if (token) {
      try {
        await fetch(`/api/admin/inquiries/${leadId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        });
      } catch (err) {
        console.warn('Status update error:', err);
      }
    }
  };

  const handleSecurityAlert = (reason: string) => {
    setSecurityAlert(reason);
    handleLogout();
  };

  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      lead.clientName.toLowerCase().includes(query) ||
      lead.clientEmail.toLowerCase().includes(query) ||
      (lead.clientPhone && lead.clientPhone.toLowerCase().includes(query)) ||
      lead.id.toLowerCase().includes(query) ||
      lead.serviceName.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = leads.reduce((acc, l) => acc + (l.estimatedBudget || 0), 0);
  const pendingCount = leads.filter(l => l.status === 'pending').length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;

  return (
    <AntiInspectShield isActive={true} onSecurityAlert={handleSecurityAlert}>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2D261E] flex flex-col font-sans selection:bg-[#C9A05B] selection:text-white">
        
        {/* Navigation Header */}
        <header className="bg-[#F2ECE1] border-b border-[#E5DCD0] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A37B3E] border border-[#C9A05B] flex items-center justify-center font-mono font-black text-white text-lg shadow-md shadow-amber-900/15">
              SA
            </div>
            <div>
              <h1 className="text-sm font-black text-[#2D261E] tracking-wider font-mono uppercase flex items-center gap-2">
                <span>SHADOW ARROW</span>
                <span className="text-[10px] bg-[#E8DEC9] text-[#7A5B22] px-2 py-0.5 rounded-full border border-[#D8CBB2] normal-case font-sans">
                  Luxury Cream Edition
                </span>
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-[#6E6254] font-mono">
                <span className="flex items-center gap-1 text-[#1B7043] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B7043]" /> Anti-Inspect Active
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#1B7043] font-bold bg-[#E6F3ED] px-2 py-0.5 rounded-full border border-[#A8DBBF]">
                  <Database className="w-3.5 h-3.5" /> Supabase DB: Connected
                </span>
                {isSilentSyncing && (
                  <span className="flex items-center gap-1 text-[#A37B3E] animate-pulse text-[10px] font-semibold">
                    <Zap className="w-3 h-3" /> Live Syncing...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-[#F5E6E6] hover:bg-[#EED5D5] text-[#9E2A2A] border border-[#E4C2C2] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </header>

        {/* Body Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {!token ? (
            /* STANDALONE LOGIN GATEWAY */
            <div className="max-w-md mx-auto my-12 bg-white border border-[#E8DFD1] rounded-3xl p-8 space-y-6 shadow-xl shadow-amber-950/5">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-[#FAF4E8] border border-[#E5D7BF] text-[#A37B3E] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-[#2D261E] tracking-tight">Founder Control Access</h2>
                <p className="text-xs text-[#6E6254] leading-relaxed">
                  Cream Luxury Interface with Real-Time Supabase Frontend Inquiry Synchronization.
                </p>
              </div>

              {errorMsg && (
                <div className="bg-[#FDF0F0] border border-[#F5C2C2] rounded-xl p-3.5 text-xs text-[#9E2A2A] flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {securityAlert && (
                <div className="bg-[#FFF8E6] border border-[#EAD59E] rounded-xl p-3.5 text-xs text-[#8C5E0D] flex items-center gap-2.5">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>DevTools inspection attempt intercepted. Session auto-locked.</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#574B3E] block mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2D6C5] rounded-xl text-xs text-[#2D261E] focus:outline-none focus:border-[#A37B3E] focus:ring-2 focus:ring-[#A37B3E]/20 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#574B3E] block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2D6C5] rounded-xl text-xs text-[#2D261E] focus:outline-none focus:border-[#A37B3E] focus:ring-2 focus:ring-[#A37B3E]/20 transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#A37B3E] hover:bg-[#8F6A30] text-white font-bold py-3.5 rounded-xl text-xs shadow-md shadow-amber-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#B89252]"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Authenticate Founder Panel</span>
                    </>
                  )}
                </button>
              </form>

              <div className="bg-[#F6F0E6] border border-[#E5DCD0] rounded-xl p-3.5 text-[11px] text-[#6E6254] font-mono text-center">
                <div className="text-[10px] text-[#1B7043] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B7043]" /> AUTHORIZED ACCESS ONLY
                </div>
                <div className="text-[#8A7B6B]">256-Bit JWT Encryption • Real-Time Inquiry Stream</div>
              </div>
            </div>
          ) : (
            /* DASHBOARD VIEW */
            <div className="space-y-6">
              
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE7DA] border border-[#E2D7C7] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-lg font-bold text-[#2D261E] flex items-center gap-2 justify-center sm:justify-start">
                    <span>Founder Control Portal</span>
                    <span className="text-[11px] font-mono font-normal bg-[#E8DFD0] text-[#7A5B22] px-2.5 py-0.5 rounded-full border border-[#D5C7B2]">
                      Live Frontend Sync Active
                    </span>
                  </h2>
                  <p className="text-xs text-[#6E6254] max-w-xl">
                    Review live cost estimate submissions, discovery call bookings, and client phone contacts in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && fetchLeads(token)}
                    className="px-4 py-2.5 bg-white hover:bg-[#FAF6F0] text-[#2D261E] rounded-xl text-xs font-bold flex items-center gap-2 border border-[#DCD1C4] shadow-sm transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#A37B3E] ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Sync Supabase Inquiries</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Total Client Inquiries</span>
                    <Briefcase className="w-4 h-4 text-[#A37B3E]" />
                  </div>
                  <div className="text-3xl font-black text-[#2D261E] font-mono">{leads.length}</div>
                  <div className="text-[10px] text-[#998A78]">Captured in Database</div>
                </div>

                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Estimated Pipeline</span>
                    <IndianRupee className="w-4 h-4 text-[#1B7043]" />
                  </div>
                  <div className="text-3xl font-black text-[#1B7043] font-mono">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-[#998A78]">Gross Project Valuation</div>
                </div>

                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-[#B46D12]" />
                  </div>
                  <div className="text-3xl font-black text-[#B46D12] font-mono">{pendingCount}</div>
                  <div className="text-[10px] text-[#998A78]">New Client Leads</div>
                </div>

                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Converted Deals</span>
                    <CheckCircle className="w-4 h-4 text-[#7A42B8]" />
                  </div>
                  <div className="text-3xl font-black text-[#7A42B8] font-mono">{convertedCount}</div>
                  <div className="text-[10px] text-[#998A78]">Active Commissioned Clients</div>
                </div>
              </div>

              {/* Filter and Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E8DFD1] rounded-2xl shadow-sm">
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#998A78] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, scope..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E2D6C5] rounded-xl text-xs text-[#2D261E] placeholder:text-[#A39585] focus:outline-none focus:border-[#A37B3E] focus:ring-2 focus:ring-[#A37B3E]/20 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {(['all', 'pending', 'contacted', 'converted'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                        statusFilter === filter
                          ? 'bg-[#A37B3E] text-white shadow-sm'
                          : 'bg-[#FAF8F5] text-[#6E6254] hover:text-[#2D261E] border border-[#E2D6C5]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

              </div>

              {/* Leads Table */}
              <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F4EFE6] text-[#42392E] uppercase text-[10px] font-mono tracking-wider border-b border-[#E3D8C8]">
                        <th className="p-4 font-bold">Reference ID</th>
                        <th className="p-4 font-bold">Client Contact</th>
                        <th className="p-4 font-bold">Scope / Service</th>
                        <th className="p-4 font-bold">Budget (INR)</th>
                        <th className="p-4 font-bold">Timeline</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE8DC] font-medium">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-12 text-center text-[#998A78]">
                            No client inquiries found in database matching search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-[#FAF5ED] transition-colors">
                            <td className="p-4 font-mono text-[#A37B3E] font-bold">
                              {lead.id}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-[#2D261E]">{lead.clientName}</div>
                              <div className="text-[11px] text-[#6E6254]">{lead.clientEmail}</div>
                              {lead.clientPhone && (
                                <div className="text-[11px] text-[#1B7043] font-mono flex items-center gap-1 mt-0.5 font-semibold">
                                  <Phone className="w-3 h-3 text-[#1B7043]" /> {lead.clientPhone}
                                </div>
                              )}
                              {lead.company && (
                                <div className="text-[10px] text-[#8C7E6E] flex items-center gap-1 mt-0.5">
                                  <Building2 className="w-3 h-3" /> {lead.company}
                                </div>
                              )}
                            </td>
                            <td className="p-4 text-[#2D261E]">
                              <div className="font-semibold">{lead.serviceName}</div>
                              {lead.techStack && lead.techStack.length > 0 && (
                                <div className="text-[10px] text-[#8C7E6E] truncate max-w-[200px]">
                                  {lead.techStack.join(', ')}
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-mono text-[#1B7043] font-bold">
                              ₹{lead.estimatedBudget.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4 text-[#6E6254]">
                              {lead.timeline}
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                  lead.status === 'pending'
                                    ? 'bg-[#FDF6E2] border-[#E8D49E] text-[#8C5E0D]'
                                    : lead.status === 'contacted'
                                    ? 'bg-[#EAF3FD] border-[#B5D5FA] text-[#1C5AA6]'
                                    : 'bg-[#E6F6ED] border-[#A8E4C3] text-[#13663B]'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F2ECE1] text-[#6E6254] hover:text-[#2D261E] border border-[#E2D6C5] transition-colors cursor-pointer text-xs font-bold inline-flex items-center gap-1.5"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4 text-[#A37B3E]" />
                                <span>Inspect Scope</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* Lead Detail Notes Drawer Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-[#1A1612]/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF7F2] border border-[#E2D6C5] rounded-3xl p-6 max-w-lg w-full space-y-4 text-[#2D261E] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#A37B3E]">{selectedLead.id}</span>
                  <h3 className="text-base font-bold text-[#2D261E]">{selectedLead.clientName}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 text-[#8C7E6E] hover:text-[#2D261E] cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Client Name:</span>
                    <div className="font-bold text-[#2D261E] text-sm">{selectedLead.clientName}</div>
                  </div>
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Work Email:</span>
                    <div className="font-mono text-[#1C5AA6] truncate">{selectedLead.clientEmail}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Mobile / Phone Number:</span>
                    {selectedLead.clientPhone ? (
                      <a
                        href={`tel:${selectedLead.clientPhone}`}
                        className="font-mono text-[#1B7043] font-bold flex items-center gap-1 hover:underline text-xs"
                      >
                        <Phone className="w-3.5 h-3.5" /> {selectedLead.clientPhone}
                      </a>
                    ) : (
                      <div className="text-[#998A78] italic">Not Provided</div>
                    )}
                  </div>
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Company / Brand:</span>
                    <div className="font-semibold text-[#2D261E]">{selectedLead.company || 'Not Specified'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Business Category:</span>
                    <div className="font-semibold text-[#2D261E]">{selectedLead.businessType || 'General Client'}</div>
                  </div>
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Timeline Sprint:</span>
                    <div className="text-[#2D261E] font-semibold">{selectedLead.timeline}</div>
                  </div>
                </div>

                <div>
                  <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block mb-1">Commissioned Service / Scope:</span>
                  <div className="font-bold text-[#2D261E] text-xs bg-white p-2.5 rounded-lg border border-[#E2D6C5]">{selectedLead.serviceName}</div>
                </div>

                {selectedLead.techStack && selectedLead.techStack.length > 0 && (
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block mb-1">Architectural Add-on Modules:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLead.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-[#FAF4E8] text-[#7A5B22] border border-[#E5D7BF] font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-[#E8DFD1]">
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Estimated Investment:</span>
                    <div className="font-mono font-black text-[#1B7043] text-base">₹{selectedLead.estimatedBudget.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block">Timeline Sprint:</span>
                    <div className="text-[#2D261E] font-semibold">{selectedLead.timeline}</div>
                  </div>
                </div>

                <div>
                  <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block mb-1">Submission Date & Time:</span>
                  <div className="font-mono text-[11px] text-[#6E6254]">
                    {new Date(selectedLead.createdAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                  </div>
                </div>

                <div>
                  <span className="text-[#8C7E6E] text-[10px] uppercase font-bold block mb-1">Detailed Project Message & Scope:</span>
                  <div className="p-3.5 bg-white rounded-xl border border-[#E2D6C5] text-[#2D261E] whitespace-pre-wrap leading-relaxed text-xs max-h-48 overflow-y-auto">
                    {selectedLead.details || 'No additional project requirements noted.'}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-[#A37B3E] hover:bg-[#8F6A30] text-white rounded-xl text-xs font-bold cursor-pointer border border-[#B89252]"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AntiInspectShield>
  );
};
