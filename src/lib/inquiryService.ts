import { supabase, type InquiryRecord } from './supabase';

export interface InquiryInput {
  id?: string;
  type: 'Cost Estimate' | 'Discovery Call';
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  businessType?: string;
  serviceName: string;
  techStack?: string[];
  estimatedBudget?: number;
  timeline?: string;
  details?: string;
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
 * Save an inquiry to Supabase database, Backend API, and localStorage fallback.
 */
export async function saveInquiryToDatabase(input: InquiryInput): Promise<{
  success: boolean;
  leadId: string;
  lead: UnifiedLead;
  sourcesSaved: string[];
}> {
  const leadId = input.id || `${input.type === 'Discovery Call' ? 'CON' : 'EST'}-${Math.floor(100000 + Math.random() * 900000)}`;
  const createdAt = new Date().toISOString();

  const leadObj: UnifiedLead = {
    id: leadId,
    type: input.type,
    clientName: input.clientName.trim(),
    clientEmail: input.clientEmail.trim(),
    clientPhone: (input.clientPhone || '').trim(),
    company: (input.company || '').trim(),
    businessType: (input.businessType || '').trim(),
    serviceName: input.serviceName.trim(),
    techStack: Array.isArray(input.techStack) ? input.techStack : [],
    estimatedBudget: Number(input.estimatedBudget) || 0,
    timeline: input.timeline || 'Flexible',
    details: input.details || '',
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

  // 2. Direct Supabase Database Insertion
  try {
    const dbRecord: Partial<InquiryRecord> = {
      id: leadObj.id,
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

    const { error } = await supabase.from('inquiries').insert([dbRecord]);

    if (!error) {
      sourcesSaved.push('supabase');
      console.log('Successfully inserted lead into Supabase table "inquiries":', leadId);
    } else {
      console.warn('Supabase insertion notice:', error.message);
    }
  } catch (dbErr) {
    console.warn('Supabase connection error:', dbErr);
  }

  // 3. Backend API Sync (/api/estimates or /api/contact)
  try {
    const endpoint = input.type === 'Discovery Call' ? '/api/contact' : '/api/estimates';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
    success: true,
    leadId,
    lead: leadObj,
    sourcesSaved
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
          id: item.id,
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
