-- =========================================================================
-- SHADOW ARROW STUDIO - SUPABASE DATABASE SCHEMA
-- Execute this SQL in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================================

-- 1. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'Cost Estimate',
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT DEFAULT '',
    company TEXT DEFAULT '',
    business_type TEXT DEFAULT '',
    service_name TEXT NOT NULL,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    estimated_budget NUMERIC DEFAULT 0,
    timeline TEXT DEFAULT 'Flexible',
    details TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Index for Faster Querying
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Policies
-- Allow anyone (anonymous website visitors) to submit inquiries / cost estimates
CREATE POLICY "Allow public inserts to inquiries" 
ON public.inquiries 
FOR INSERT 
WITH CHECK (true);

-- Allow anonymous or authenticated users to view inquiries
CREATE POLICY "Allow read access to inquiries" 
ON public.inquiries 
FOR SELECT 
USING (true);

-- Allow updates (e.g., status change from pending to contacted/converted)
CREATE POLICY "Allow update access to inquiries" 
ON public.inquiries 
FOR UPDATE 
USING (true);

-- Allow deletes
CREATE POLICY "Allow delete access to inquiries" 
ON public.inquiries 
FOR DELETE 
USING (true);
