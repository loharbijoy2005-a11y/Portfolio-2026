import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycXZ5aXpha2ZmanVhc2t6b29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MDYyMTEsImV4cCI6MjEwNDM4MjIxMX0.ydlKWOBNIyJXLjTUu7t4TH1YDWOAfd6mMtM8yTP2pyM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
