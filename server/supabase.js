import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycXZ5aXpha2ZmanVhc2t6b29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MDYyMTEsImV4cCI6MjEwNDM4MjIxMX0.ydlKWOBNIyJXLjTUu7t4TH1YDWOAfd6mMtM8yTP2pyM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to insert lead into Supabase
export const insertLeadToSupabase = async (lead) => {
  try {
    const rawBudget = lead.estimatedBudget ?? lead.estimated_budget ?? lead.budget ?? 0;
    const parsedBudget = typeof rawBudget === 'number'
      ? (isNaN(rawBudget) ? 0 : rawBudget)
      : (parseFloat(String(rawBudget).replace(/[^0-9.]/g, '')) || 0);

    const rawStack = lead.techStack || lead.tech_stack || lead.modules || [];
    const parsedStack = Array.isArray(rawStack)
      ? rawStack
      : (typeof rawStack === 'string' && rawStack.trim() ? rawStack.split(',').map(s => s.trim()).filter(Boolean) : []);

    const uuid = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

    const { data, error } = await supabase.from('inquiries').insert([
      {
        id: uuid,
        type: lead.type || 'Call Request',
        client_name: (lead.clientName || lead.client_name || lead.name || 'Anonymous Client').trim(),
        client_email: (lead.clientEmail || lead.client_email || lead.email || 'no-email@provided.local').trim(),
        client_phone: (lead.clientPhone || lead.client_phone || lead.phone || '').trim(),
        company: (lead.company || '').trim(),
        business_type: (lead.businessType || lead.business_type || '').trim(),
        service_name: (lead.serviceName || lead.service_name || lead.service || lead.type || 'Call Request').trim(),
        tech_stack: parsedStack,
        estimated_budget: parsedBudget,
        timeline: lead.timeline || 'Flexible',
        details: (lead.details || lead.message || '').trim(),
        status: lead.status || 'pending',
        created_at: lead.createdAt || lead.created_at || new Date().toISOString()
      }
    ]).select();

    if (error) {
      console.error('❌ Supabase insertion error in server/supabase.js:', error.message, error.details);
      return null;
    }
    return data;
  } catch (err) {
    console.error('❌ Supabase connection exception in server/supabase.js:', err);
    return null;
  }
};

// Helper function to fetch leads from Supabase
export const fetchLeadsFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return null;
    }
    return data.map(item => ({
      id: item.id,
      type: item.type,
      clientName: item.client_name,
      clientEmail: item.client_email,
      clientPhone: item.client_phone || item.clientPhone || '',
      company: item.company,
      businessType: item.business_type,
      serviceName: item.service_name,
      techStack: item.tech_stack,
      estimatedBudget: item.estimated_budget,
      timeline: item.timeline,
      details: item.details,
      status: item.status,
      createdAt: item.created_at
    }));
  } catch (err) {
    return null;
  }
};
