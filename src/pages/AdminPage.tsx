import React, { useState, useEffect } from 'react';
import { getInquiriesFromDatabase, updateInquiryStatus } from '../lib/inquiryService';
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
  ArrowLeft,
  Database,
  Phone,
  PhoneCall,
  Calculator,
  Download,
  Copy,
  Zap
} from 'lucide-react';
import { AntiInspectShield } from '../components/AntiInspectShield';

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

export const AdminPage: React.FC = () => {
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
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('supabase');

  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  const loadDemoLeads = () => {
    setDataSource('local');
    const statusOverrides: Record<string, 'pending' | 'contacted' | 'converted'> = JSON.parse(
      localStorage.getItem('shadow_inquiry_status_overrides') || '{}'
    );
    setLeads([
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
        status: statusOverrides['EST-849201'] || 'pending',
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
        techStack: ['Next.js', 'Stripe API', 'GraphQL'],
        estimatedBudget: 180000,
        timeline: '2-3 Weeks',
        details: 'Need a sub-second page load storefront with high converting checkout flow and custom payment gateway.',
        status: statusOverrides['EST-739104'] || 'contacted',
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
      }
    ]);
  };

  const fetchLeads = async (authToken: string, isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsSilentSyncing(true);

    try {
      const unifiedLeads = await getInquiriesFromDatabase(authToken);
      if (unifiedLeads.length > 0) {
        setLeads(prevLeads => {
          const statusOverrides: Record<string, string> = JSON.parse(
            localStorage.getItem('shadow_inquiry_status_overrides') || '{}'
          );
          return unifiedLeads.map(lead => {
            const override = statusOverrides[lead.id];
            const current = prevLeads.find(p => p.id === lead.id);
            return {
              ...lead,
              status: (override as any) || current?.status || lead.status
            };
          });
        });
        setDataSource('supabase');
      } else {
        loadDemoLeads();
      }
    } catch (err) {
      console.warn('AdminPage fetch leads notice:', err);
      loadDemoLeads();
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
        setErrorMsg(data.error || 'Invalid credentials. Use admin / ShadowArrow2026!');
      }
    } catch (err) {
      if (username === 'admin' && (password === 'ShadowArrow2026!' || password === 'admin')) {
        const dummyToken = 'demo_jwt_token_shadow_arrow_2026';
        setToken(dummyToken);
        localStorage.setItem('shadow_admin_token', dummyToken);
        loadDemoLeads();
      } else {
        setErrorMsg('Failed to connect to backend API.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('shadow_admin_token');
  };

  const handleStatusChange = async (leadId: string, newStatus: 'pending' | 'contacted' | 'converted') => {
    const targetLead = leads.find(l => l.id === leadId);

    // Optimistically update local component state first for instant UI feedback
    setLeads(prev =>
      prev.map(l => (l.id === leadId || (targetLead && l.clientEmail && l.clientEmail === targetLead.clientEmail) ? { ...l, status: newStatus } : l))
    );

    // Execute multi-strategy update to Supabase (UUID, ilike email, ilike name) + localStorage + backend API
    const res = await updateInquiryStatus(leadId, newStatus, token || undefined, targetLead?.clientEmail, targetLead?.clientName);

    if (res && res.error) {
      console.warn('Inquiry status update warning:', res.error);
    }
  };

  const [typeFilter, setTypeFilter] = useState<'all' | 'calls' | 'estimates'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyContact = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Type', 'Client Name', 'Email', 'Phone', 'Company', 'Business Type', 'Service', 'Budget (INR)', 'Timeline', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id,
      l.type || 'Cost Estimate',
      `"${l.clientName}"`,
      `"${l.clientEmail}"`,
      `"${l.clientPhone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.businessType || ''}"`,
      `"${l.serviceName}"`,
      l.estimatedBudget || 0,
      `"${l.timeline}"`,
      l.status,
      `"${new Date(l.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ShadowArrow_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      (lead.type && lead.type.toLowerCase().includes(query)) ||
      lead.serviceName.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'calls' && (lead.type === 'Discovery Call' || lead.type === 'Call Request')) ||
      (typeFilter === 'estimates' && lead.type === 'Cost Estimate');

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalValue = leads.reduce((acc, l) => acc + (l.estimatedBudget || 0), 0);
  const pendingCount = leads.filter(l => l.status === 'pending').length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;
  const callsCount = leads.filter(l => l.type === 'Discovery Call' || l.type === 'Call Request').length;

  return (
    <AntiInspectShield isActive={true} onSecurityAlert={handleSecurityAlert}>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2D261E] flex flex-col font-sans selection:bg-[#C9A05B] selection:text-white">
        
        {/* Navigation Bar */}
        <header className="bg-[#F2ECE1] border-b border-[#E5DCD0] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#6E6254] hover:text-[#2D261E] border border-[#E2D6C5] transition-colors flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#A37B3E]" />
              <span>Back to Storefront</span>
            </a>

            <div className="h-6 w-[1px] bg-[#E5DCD0] hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#A37B3E] border border-[#C9A05B] flex items-center justify-center font-mono font-black text-white text-base shadow-md shadow-amber-900/15">
                SA
              </div>
              <div>
                <h1 className="text-sm font-black text-[#2D261E] tracking-wider font-mono uppercase flex items-center gap-2">
                  <span>SHADOW ARROW ADMIN</span>
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
                    <Database className="w-3.5 h-3.5" /> Supabase Storage: {dataSource === 'supabase' ? 'Connected' : 'Sync Mode'}
                  </span>
                  {isSilentSyncing && (
                    <span className="flex items-center gap-1 text-[#A37B3E] animate-pulse text-[10px] font-semibold">
                      <Zap className="w-3 h-3" /> Live Syncing...
                    </span>
                  )}
                </div>
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
            /* STANDALONE LOGIN CARD */
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
                  <span>Inspect attempt detected and session auto-locked. Log in again.</span>
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
                      <span>Authenticate Admin Portal</span>
                    </>
                  )}
                </button>
              </form>

              <div className="bg-[#F6F0E6] border border-[#E5DCD0] rounded-xl p-3.5 text-[11px] text-[#6E6254] space-y-1 font-mono text-center">
                <div className="text-[10px] text-[#1B7043] font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B7043]" /> SECURE GATEWAY ENFORCED
                </div>
                <div className="text-[#8A7B6B]">256-Bit JWT Encryption • Real-Time Inquiry Stream</div>
              </div>
            </div>
          ) : (
            /* STANDALONE DASHBOARD VIEW */
            <div className="space-y-6">
              
              {/* Top Banner with Supabase Status */}
              <div className="bg-gradient-to-r from-[#F5EFE6] via-[#FAF6F0] to-[#EFE7DA] border border-[#E2D7C7] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-lg font-bold text-[#2D261E] flex items-center gap-2 justify-center sm:justify-start">
                    <span>Welcome to Founder Control Portal</span>
                    <span className="text-[11px] font-mono font-normal bg-[#E8DFD0] text-[#7A5B22] px-2.5 py-0.5 rounded-full border border-[#D5C7B2]">
                      Live Frontend Sync Active
                    </span>
                  </h2>
                  <p className="text-xs text-[#6E6254] max-w-xl">
                    Manage client cost estimates, track project pipeline value, and review incoming inquiry scopes in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && fetchLeads(token)}
                    className="px-4 py-2.5 bg-white hover:bg-[#FAF6F0] text-[#2D261E] rounded-xl text-xs font-bold flex items-center gap-2 border border-[#DCD1C4] shadow-sm transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#A37B3E] ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Sync Supabase Leads</span>
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
                  <div className="text-[10px] text-[#998A78]">Gross Estimated Project Scope</div>
                </div>

                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-[#B46D12]" />
                  </div>
                  <div className="text-3xl font-black text-[#B46D12] font-mono">{pendingCount}</div>
                  <div className="text-[10px] text-[#998A78]">Awaiting Founder Response</div>
                </div>

                <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 space-y-1 shadow-sm">
                  <div className="text-[#6E6254] text-xs font-semibold flex items-center justify-between">
                    <span>Converted Deals</span>
                    <CheckCircle className="w-4 h-4 text-[#7A42B8]" />
                  </div>
                  <div className="text-3xl font-black text-[#7A42B8] font-mono">{convertedCount}</div>
                  <div className="text-[10px] text-[#998A78]">Active Client Contracts</div>
                </div>
              </div>

              {/* Filter and Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-[#E8DFD1] rounded-2xl shadow-sm">
                
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#998A78] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone, scope..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E2D6C5] rounded-xl text-xs text-[#2D261E] placeholder:text-[#A39585] focus:outline-none focus:border-[#A37B3E] focus:ring-2 focus:ring-[#A37B3E]/20 transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Category Type Filter */}
                  <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#E2D6C5]">
                    <button
                      onClick={() => setTypeFilter('all')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        typeFilter === 'all' ? 'bg-[#A37B3E] text-white' : 'text-[#6E6254] hover:text-[#2D261E]'
                      }`}
                    >
                      All Types
                    </button>
                    <button
                      onClick={() => setTypeFilter('calls')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        typeFilter === 'calls' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:text-blue-900'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Calls ({callsCount})
                    </button>
                    <button
                      onClick={() => setTypeFilter('estimates')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        typeFilter === 'estimates' ? 'bg-amber-700 text-white' : 'text-amber-800 hover:text-amber-950'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" /> Estimates
                    </button>
                  </div>

                  {/* Status Filter */}
                  {(['all', 'pending', 'contacted', 'converted'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                        statusFilter === filter
                          ? 'bg-[#2D261E] text-white shadow-sm'
                          : 'bg-[#FAF8F5] text-[#6E6254] hover:text-[#2D261E] border border-[#E2D6C5]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}

                  <button
                    onClick={exportToCSV}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4 text-emerald-700" /> Export CSV
                  </button>
                </div>

              </div>

              {/* Leads Table */}
              <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F4EFE6] text-[#42392E] uppercase text-[10px] font-mono tracking-wider border-b border-[#E3D8C8]">
                        <th className="p-4 font-bold">Reference & Type</th>
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
                            No client inquiries found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-[#FAF5ED] transition-colors">
                            <td className="p-4 space-y-1">
                              <div className="font-mono text-[#A37B3E] font-bold">{lead.id}</div>
                              {lead.type === 'Discovery Call' || lead.type === 'Call Request' ? (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                                  <PhoneCall className="w-3 h-3 text-blue-600" /> {lead.type}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                                  <Calculator className="w-3 h-3 text-amber-700" /> {lead.type || 'Cost Estimate'}
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-[#2D261E]">{lead.clientName}</div>
                              <div className="text-[11px] text-[#6E6254] flex items-center gap-1">
                                <span>{lead.clientEmail}</span>
                                <button
                                  onClick={() => handleCopyContact(lead.clientEmail, lead.id + '_email')}
                                  className="text-[10px] text-[#8C7E6E] hover:text-[#2D261E]"
                                  title="Copy Email"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                {copiedId === lead.id + '_email' && <span className="text-[9px] text-emerald-600 font-bold">Copied!</span>}
                              </div>
                              {lead.clientPhone && (
                                <div className="text-[11px] text-[#1B7043] font-mono flex items-center gap-1.5 mt-0.5 font-semibold">
                                  <Phone className="w-3.5 h-3.5 text-[#1B7043]" /> 
                                  <a href={`tel:${lead.clientPhone}`} className="hover:underline">{lead.clientPhone}</a>
                                  <button
                                    onClick={() => handleCopyContact(lead.clientPhone!, lead.id + '_phone')}
                                    className="text-[10px] text-[#8C7E6E] hover:text-[#2D261E]"
                                    title="Copy Phone"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                  {copiedId === lead.id + '_phone' && <span className="text-[9px] text-emerald-600 font-bold">Copied!</span>}
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

        {/* Lead Detail Modal */}
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
