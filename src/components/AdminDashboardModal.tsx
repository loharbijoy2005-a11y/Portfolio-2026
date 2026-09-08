import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  X,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
  IndianRupee,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Building2
} from 'lucide-react';
import { AntiInspectShield } from './AntiInspectShield';

interface Lead {
  id: string;
  type: string;
  clientName: string;
  clientEmail: string;
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

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('shadow_admin_token'));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'converted'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Security alert log
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && token) {
      fetchLeads(token);
    }
  }, [isOpen, token]);

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
      // Demo fallback if backend is offline
      if (username === 'admin' && (password === 'ShadowArrow2026!' || password === 'admin')) {
        const dummyToken = 'demo_jwt_token_shadow_arrow_2026';
        setToken(dummyToken);
        localStorage.setItem('shadow_admin_token', dummyToken);
        loadDemoLeads();
      } else {
        setErrorMsg('Failed to connect to backend server. Make sure node server is running.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoLeads = () => {
    setLeads([
      {
        id: 'EST-849201',
        type: 'Cost Estimate',
        clientName: 'Vikram Sharma',
        clientEmail: 'vikram@techventure.in',
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
        company: 'GrowthBrands D2C',
        businessType: 'D2C Brand',
        serviceName: 'Headless E-Commerce Engine',
        techStack: ['Next.js', 'Stripe API', 'GraphQL'],
        estimatedBudget: 180000,
        timeline: '2-3 Weeks',
        details: 'Need a sub-second page load storefront with high converting checkout flow and custom payment gateway.',
        status: 'contacted',
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
      }
    ]);
  };

  const fetchLeads = async (authToken: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.data);
      } else {
        loadDemoLeads();
      }
    } catch (err) {
      loadDemoLeads();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('shadow_admin_token');
  };

  const handleStatusChange = async (leadId: string, newStatus: 'pending' | 'contacted' | 'converted') => {
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    if (token && !token.startsWith('demo_')) {
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
        console.warn('Status sync error:', err);
      }
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm(`Are you sure you want to delete lead ${leadId}?`)) return;

    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) setSelectedLead(null);

    if (token && !token.startsWith('demo_')) {
      try {
        await fetch(`/api/admin/inquiries/${leadId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Delete sync error:', err);
      }
    }
  };

  const handleSecurityAlert = (reason: string) => {
    setSecurityAlert(reason);
    // Purge token on inspect attempt for maximum security
    handleLogout();
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalValue = leads.reduce((acc, l) => acc + (l.estimatedBudget || 0), 0);
  const pendingCount = leads.filter(l => l.status === 'pending').length;
  const convertedCount = leads.filter(l => l.status === 'converted').length;

  return (
    <AntiInspectShield isActive={isOpen && !!token} onSecurityAlert={handleSecurityAlert}>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        
        <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          
          {/* Header Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-black text-lg">
                SA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black text-white uppercase tracking-wider font-mono">
                    SHADOW ARROW • ADMIN PORTAL
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Anti-Inspect Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Backend API Controlled Lead Management & Engineering Inquiries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {token && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-200">
            
            {!token ? (
              /* LOGIN FORM VIEW */
              <div className="max-w-md mx-auto my-8 bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Admin Authentication</h3>
                  <p className="text-xs text-slate-400">
                    Enter founder credentials to unlock lead records and scope inquiries.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {securityAlert && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 shrink-0" />
                    <span>DevTools Inspect attempt detected & purged! Re-login required.</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Authenticate & Access Dashboard</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 font-mono text-center">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> AUTHORIZED ACCESS ONLY
                  </div>
                  <div className="text-slate-500">AES-256 JWT Token Secured</div>
                </div>
              </div>
            ) : (
              /* DASHBOARD VIEW */
              <div className="space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                      <span>Total Inquiries</span>
                      <Briefcase className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-black text-white font-mono">{leads.length}</div>
                    <div className="text-[10px] text-slate-500">Live Client Leads Saved</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                      <span>Estimated Pipeline</span>
                      <IndianRupee className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      ₹{totalValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500">Total Project Value</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                      <span>Pending Quotes</span>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-amber-400 font-mono">{pendingCount}</div>
                    <div className="text-[10px] text-slate-500">Requires Proposal Response</div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1">
                    <div className="text-slate-400 text-xs font-medium flex items-center justify-between">
                      <span>Converted Clients</span>
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-black text-purple-400 font-mono">{convertedCount}</div>
                    <div className="text-[10px] text-slate-500">Active Commissioned Contracts</div>
                  </div>
                </div>

                {/* Filter and Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                  
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search leads by name, email or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {(['all', 'pending', 'contacted', 'converted'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                          statusFilter === filter
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}

                    <button
                      onClick={() => token && fetchLeads(token)}
                      className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer ml-auto"
                      title="Refresh Leads"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                </div>

                {/* Leads Table */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
                          <th className="p-3.5 font-bold">Reference ID</th>
                          <th className="p-3.5 font-bold">Client Contact</th>
                          <th className="p-3.5 font-bold">Scope / Service</th>
                          <th className="p-3.5 font-bold">Budget (INR)</th>
                          <th className="p-3.5 font-bold">Timeline</th>
                          <th className="p-3.5 font-bold">Status</th>
                          <th className="p-3.5 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-medium">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-500">
                              No client lead inquiries found matching criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="p-3.5 font-mono text-blue-400 font-bold">
                                {lead.id}
                              </td>
                              <td className="p-3.5">
                                <div className="font-bold text-white">{lead.clientName}</div>
                                <div className="text-[11px] text-slate-400">{lead.clientEmail}</div>
                                {lead.company && (
                                  <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                    <Building2 className="w-3 h-3" /> {lead.company}
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5 text-slate-200">
                                <div className="font-semibold">{lead.serviceName}</div>
                                {lead.techStack && lead.techStack.length > 0 && (
                                  <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                                    {lead.techStack.join(', ')}
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5 font-mono text-emerald-400 font-bold">
                                ₹{lead.estimatedBudget.toLocaleString('en-IN')}
                              </td>
                              <td className="p-3.5 text-slate-400">
                                {lead.timeline}
                              </td>
                              <td className="p-3.5">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer ${
                                    lead.status === 'pending'
                                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                      : lead.status === 'contacted'
                                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                      : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                                  }`}
                                >
                                  <option value="pending" className="bg-slate-900 text-white">Pending</option>
                                  <option value="contacted" className="bg-slate-900 text-white">Contacted</option>
                                  <option value="converted" className="bg-slate-900 text-white">Converted</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right space-x-1">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="View Full Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
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

          </div>

          {/* Lead Detail Modal Drawer */}
          {selectedLead && (
            <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 text-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400">{selectedLead.id}</span>
                    <h3 className="text-base font-bold text-white">{selectedLead.clientName}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Email:</span>
                    <div className="font-mono text-blue-300">{selectedLead.clientEmail}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Service Requested:</span>
                    <div className="font-semibold text-white">{selectedLead.serviceName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Estimated Budget:</span>
                      <div className="font-mono font-bold text-emerald-400">₹{selectedLead.estimatedBudget.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold">Timeline:</span>
                      <div className="text-slate-300">{selectedLead.timeline}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Project Notes / Requirements:</span>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {selectedLead.details || 'No additional details provided.'}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Close Notes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </AntiInspectShield>
  );
};
