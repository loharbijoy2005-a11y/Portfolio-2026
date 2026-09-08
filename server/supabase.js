import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWRvd2Fycm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.placeholder-key-for-shadow-arrow';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to insert lead into Supabase
export const insertLeadToSupabase = async (lead) => {
  try {
    const { data, error } = await supabase.from('inquiries').insert([
      {
        id: lead.id,
        type: lead.type,
        client_name: lead.clientName,
        client_email: lead.clientEmail,
        client_phone: lead.clientPhone || lead.client_phone || '',
        company: lead.company || '',
        business_type: lead.businessType || '',
        service_name: lead.serviceName,
        tech_stack: lead.techStack || [],
        estimated_budget: lead.estimatedBudget || 0,
        timeline: lead.timeline,
        details: lead.details,
        status: lead.status || 'pending',
        created_at: lead.createdAt || new Date().toISOString()
      }
    ]).select();

    if (error) {
      console.warn('Supabase insertion notice (using local JSON sync fallback):', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase connection warning:', err.message);
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
