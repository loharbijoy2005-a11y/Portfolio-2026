import { createClient } from '@supabase/supabase-js';

// Default Supabase project configuration (override via .env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface InquiryRecord {
  id: string;
  type: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  company?: string;
  business_type?: string;
  service_name: string;
  tech_stack?: string[];
  estimated_budget: number;
  timeline: string;
  details: string;
  status: 'pending' | 'contacted' | 'converted';
  created_at: string;
}
