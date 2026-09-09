import { supabase, type InquiryRecord } from './supabase';

export interface InquiryInput {
  id?: string;
  type?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  company?: string;
  businessType?: string;
  serviceName?: string;
  techStack?: string[];
  estimatedBudget?: number | string;
  timeline?: string;
  details?: string;
  // Payload aliases for partial forms or legacy key names:
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  budget?: number | string;
  modules?: string[];
}

export interface UnifiedLead {
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

const STORAGE_KEY = 'shadow_client_inquiries';

/**
 * Safely parse numeric budget from any input (number, formatted string like "₹50,000", or null)
 */
function parseNumericBudget(val: any): number {
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Safely parse tech stack array from string array or comma-separated string
 */
function parseTechStack(val: any): string[] {
  if (Array.isArray(val)) return val.map(s => String(s).trim()).filter(Boolean);
  if (typeof val === 'string' && val.trim()) {
    return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Save an inquiry to Supabase database, Backend API, and localStorage fallback.
 * Supports partial form submissions (e.g. Call Request with only name/phone) without DB constraint crashes.
 */
export async function saveInquiryToDatabase(input: InquiryInput): Promise<{
  success: boolean;
  leadId: string;
  lead: UnifiedLead;
  sourcesSaved: string[];
  error?: string;
}> {
  const type = input.type || 'Cost Estimate';
  const leadId = input.id || `${type === 'Discovery Call' ? 'CON' : 'EST'}-${Math.floor(100000 + Math.random() * 900000)}`;
  const createdAt = new Date().toISOString();

  // Safely map keys with fallbacks for partial form submissions
  const clientName = (input.clientName || input.name || 'Anonymous Client').trim();
  const clientEmail = (input.clientEmail || input.email || 'no-email@provided.local').trim();
  const clientPhone = (input.clientPhone || input.phone || '').trim();
  const company = (input.company || '').trim();
  const businessType = (input.businessType || '').trim();
  const serviceName = (input.serviceName || input.service || type).trim();
  const techStack = parseTechStack(input.techStack || input.modules);
  const estimatedBudget = parseNumericBudget(input.estimatedBudget ?? input.budget);
  const timeline = input.timeline || 'Flexible';
  const details = (input.details || input.message || (type === 'Call Request' ? 'Quick Call Request' : '')).trim();

  const leadObj: UnifiedLead = {
    id: leadId,
    type,
    clientName,
    clientEmail,
    clientPhone,
    company,
    businessType,
    serviceName,
    techStack,
    estimatedBudget,
    timeline,
    details,
    status: 'pending',
    createdAt
  };

  const sourcesSaved: string[] = [];

  // 1. LocalStorage Persistence (Instant Offline Cache)
  try {
    const existing: UnifiedLead[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = existing.filter(item => item.id !== leadId);
    filtered.unshift(leadObj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    sourcesSaved.push('local_storage');
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

  // 2. Direct Supabase Database Insertion
  let supabaseErrorMsg: string | undefined = undefined;
  try {
    // Generate valid v4 UUID so database receives valid primary key even if DEFAULT gen_random_uuid() is missing
    const dbRecord: InquiryRecord = {
      id: generateUUID(),
      type: leadObj.type,
      client_name: leadObj.clientName,
      client_email: leadObj.clientEmail,
      client_phone: leadObj.clientPhone,
      company: leadObj.company,
      business_type: leadObj.businessType,
      service_name: leadObj.serviceName,
      tech_stack: leadObj.techStack,
      estimated_budget: leadObj.estimatedBudget,
      timeline: leadObj.timeline,
      details: leadObj.details,
      status: leadObj.status,
      created_at: leadObj.createdAt
    };

    const { data, error } = await supabase.from('inquiries').insert([dbRecord]).select();

    if (!error && data && data.length > 0) {
      sourcesSaved.push('supabase');
      console.log('Successfully inserted lead into Supabase table "inquiries" with UUID:', data[0].id);
    } else if (error) {
      supabaseErrorMsg = `${error.message} (Code: ${error.code})`;
      console.error('❌ Supabase Insertion Failed:', error.message, '| Code:', error.code, '| Details:', error.details);
    }
  } catch (dbErr: any) {
    supabaseErrorMsg = dbErr?.message || 'Connection Exception';
    console.error('❌ Supabase Connection Exception:', dbErr);
  }

  // 3. Backend API Sync (/api/estimates or /api/contact)
  try {
    const endpoint = type === 'Discovery Call' || type === 'Call Request' ? '/api/contact' : '/api/estimates';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: leadObj.type,
        clientName: leadObj.clientName,
        clientEmail: leadObj.clientEmail,
        clientPhone: leadObj.clientPhone,
        company: leadObj.company,
        businessType: leadObj.businessType,
        serviceName: leadObj.serviceName,
        techStack: leadObj.techStack,
        estimatedBudget: leadObj.estimatedBudget,
        timeline: leadObj.timeline,
        details: leadObj.details
      })
    });

    if (res.ok) {
      sourcesSaved.push('backend_api');
    }
  } catch (apiErr) {
    console.warn('Backend API submission skipped/unavailable:', apiErr);
  }

  return {
    success: sourcesSaved.includes('supabase') || sourcesSaved.includes('backend_api'),
    leadId,
    lead: leadObj,
    sourcesSaved,
    error: supabaseErrorMsg
  };
}

/**
 * Fetch inquiries from Supabase database, Backend API, and localStorage.
 */
export async function getInquiriesFromDatabase(authToken?: string): Promise<UnifiedLead[]> {
  const allLeadsMap = new Map<string, UnifiedLead>();

  // 1. Read from LocalStorage first
  try {
    const localData: UnifiedLead[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    localData.forEach(item => {
      if (item.id) allLeadsMap.set(item.id, item);
    });
  } catch (e) {
    // ignore
  }

  // 2. Fetch from Supabase
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      data.forEach((item: InquiryRecord) => {
        const lead: UnifiedLead = {
          id: item.id || '',
          type: item.type,
          clientName: item.client_name,
          clientEmail: item.client_email,
          clientPhone: item.client_phone || '',
          company: item.company || '',
          businessType: item.business_type || '',
          serviceName: item.service_name,
          techStack: item.tech_stack || [],
          estimatedBudget: item.estimated_budget || 0,
          timeline: item.timeline,
          details: item.details,
          status: item.status || 'pending',
          createdAt: item.created_at
        };
        allLeadsMap.set(lead.id, lead);
      });
    }
  } catch (sbErr) {
    console.warn('Supabase fetch error:', sbErr);
  }

  // 3. Fetch from Admin Backend API if token is provided
  if (authToken) {
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          json.data.forEach((item: any) => {
            const lead: UnifiedLead = {
              id: item.id,
              type: item.type || 'Cost Estimate',
              clientName: item.clientName || item.client_name,
              clientEmail: item.clientEmail || item.client_email,
              clientPhone: item.clientPhone || item.client_phone || '',
              company: item.company || '',
              businessType: item.businessType || item.business_type || '',
              serviceName: item.serviceName || item.service_name,
              techStack: item.techStack || item.tech_stack || [],
              estimatedBudget: item.estimatedBudget || item.estimated_budget || 0,
              timeline: item.timeline,
              details: item.details,
              status: item.status || 'pending',
              createdAt: item.createdAt || item.created_at
            };
            allLeadsMap.set(lead.id, lead);
          });
        }
      }
    } catch (apiErr) {
      console.warn('Backend API admin inquiries fetch warning:', apiErr);
    }
  }

  const result = Array.from(allLeadsMap.values());
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return result;
}
