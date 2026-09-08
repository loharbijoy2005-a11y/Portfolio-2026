import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
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
  Building2,
  Database
} from 'lucide-react';
import { AntiInspectShield } from './components/AntiInspectShield';

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

export const App: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('shadow_admin_token'));
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'converted'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('supabase');

  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchLeads(token);
    }
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

  const fetchLeads = async (authToken: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.data);
        if (data.source === 'supabase') {
          setDataSource('supabase');
        } else {
          setDataSource('local');
        }
      }
    } catch (err) {
      console.warn('Fetch leads error:', err);
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

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm(`Are you sure you want to delete lead ${leadId}?`)) return;

    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) setSelectedLead(null);

    if (token) {
      try {
        await fetch(`/api/admin/inquiries/${leadId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('Delete lead error:', err);
      }
    }
  };

  const handleSecurityAlert = (reason: string) => {
    setSecurityAlert(reason);
    handleLogout();
  };

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
    <AntiInspectShield isActive={true} onSecurityAlert={handleSecurityAlert}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        
        {/* Navigation Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 border border-blue-400 flex items-center justify-center font-mono font-black text-white text-lg shadow-lg shadow-blue-600/30">
              SA
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wider font-mono uppercase">
                SHADOW ARROW • ISOLATED ADMIN DASHBOARD
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Anti-Inspect Shield Active
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-blue-400">
                  <Database className="w-3.5 h-3.5" /> Supabase Storage: {dataSource === 'supabase' ? 'Connected' : 'Sync Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            )}
          </div>
        </header>

        {/* Body Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {!token ? (
            /* STANDALONE LOGIN GATEWAY */
            <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Isolated Founder Gateway</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Independent Project Admin Access with Supabase Synchronization & Active Anti-Tamper Defense.
                </p>
              </div>

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-xs text-red-300 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {securityAlert && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-300 flex items-center gap-2.5">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>DevTools inspection attempt intercepted. Session auto-locked.</span>
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
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
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
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Authenticate Gateway</span>
                    </>
                  )}
                </button>
              </form>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-[11px] text-slate-400 font-mono text-center">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> AUTHORIZED ACCESS ONLY
                </div>
                <div className="text-slate-500">256-Bit JWT Encryption • Rate Limited</div>
              </div>
            </div>
          ) : (
            /* DASHBOARD VIEW */
            <div className="space-y-6">
              
              {/* Top Banner */}
              <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-800/40 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                    <span>Founder Control Portal</span>
                    <span className="text-[11px] font-mono font-normal bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                      Supabase Sync
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Review live cost estimate submissions, discovery calls, and project pipeline budgets.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && fetchLeads(token)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Sync Supabase Data</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                  <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                    <span>Total Client Leads</span>
                    <Briefcase className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono">{leads.length}</div>
                  <div className="text-[10px] text-slate-500">Recorded in Database</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                  <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                    <span>Estimated Pipeline</span>
                    <IndianRupee className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500">Gross Estimated Scope</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                  <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-mono">{pendingCount}</div>
                  <div className="text-[10px] text-slate-500">Awaiting Proposal Response</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
                  <div className="text-slate-400 text-xs font-semibold flex items-center justify-between">
                    <span>Commissioned Deals</span>
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-black text-purple-400 font-mono">{convertedCount}</div>
                  <div className="text-[10px] text-slate-500">Active Client Contracts</div>
                </div>
              </div>

              {/* Filter and Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name, email, scope or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {(['all', 'pending', 'contacted', 'converted'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                        statusFilter === filter
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

              </div>

              {/* Leads Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
                        <th className="p-4 font-bold">Reference ID</th>
                        <th className="p-4 font-bold">Client Contact</th>
                        <th className="p-4 font-bold">Scope / Service</th>
                        <th className="p-4 font-bold">Budget (INR)</th>
                        <th className="p-4 font-bold">Timeline</th>
                        <th className="p-4 font-bold">Status</th>
                        <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-medium">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-12 text-center text-slate-500">
                            No client leads found in database.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 font-mono text-blue-400 font-bold">
                              {lead.id}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-white">{lead.clientName}</div>
                              <div className="text-[11px] text-slate-400">{lead.clientEmail}</div>
                              {lead.company && (
                                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Building2 className="w-3 h-3" /> {lead.company}
                                </div>
                              )}
                            </td>
                            <td className="p-4 text-slate-200">
                              <div className="font-semibold">{lead.serviceName}</div>
                              {lead.techStack && lead.techStack.length > 0 && (
                                <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                                  {lead.techStack.join(', ')}
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-mono text-emerald-400 font-bold">
                              ₹{lead.estimatedBudget.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4 text-slate-400">
                              {lead.timeline}
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
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
                            <td className="p-4 text-right space-x-1.5">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
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

        {/* Lead Detail Notes Drawer */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
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
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Client Name:</span>
                    <div className="font-bold text-white text-sm">{selectedLead.clientName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Work Email:</span>
                    <div className="font-mono text-blue-300 truncate">{selectedLead.clientEmail}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Company / Brand:</span>
                    <div className="font-semibold text-slate-200">{selectedLead.company || 'Not Specified'}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Business Category:</span>
                    <div className="font-semibold text-slate-200">{selectedLead.businessType || 'General Client'}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Commissioned Service / Scope:</span>
                  <div className="font-bold text-white text-xs bg-slate-950 p-2 rounded-lg border border-slate-800">{selectedLead.serviceName}</div>
                </div>

                {selectedLead.techStack && selectedLead.techStack.length > 0 && (
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Architectural Add-on Modules:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLead.techStack.map((tech, idx) => (
                        <span key={idx} className="bg-blue-500/10 text-blue-300 border border-blue-500/30 font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Estimated Investment:</span>
                    <div className="font-mono font-black text-emerald-400 text-base">₹{selectedLead.estimatedBudget.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Timeline Sprint:</span>
                    <div className="text-slate-200 font-semibold">{selectedLead.timeline}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Submission Date & Time:</span>
                  <div className="font-mono text-[11px] text-slate-400">
                    {new Date(selectedLead.createdAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Detailed Project Message & Scope:</span>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed text-xs max-h-48 overflow-y-auto">
                    {selectedLead.details || 'No additional project requirements noted.'}
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
    </AntiInspectShield>
  );
};
