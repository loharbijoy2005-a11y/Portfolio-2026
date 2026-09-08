import { createClient } from '@supabase/supabase-js';

// Default Supabase project configuration (can be overridden via .env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWRvd2Fycm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.placeholder-key-for-shadow-arrow';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface InquiryRecord {
  id: string;
  type: string;
  client_name: string;
  client_email: string;
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
