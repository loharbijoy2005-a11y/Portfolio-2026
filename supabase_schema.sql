-- =========================================================================
-- SHADOW ARROW STUDIO - SUPABASE DATABASE SCHEMA & MIGRATION
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/srqvyizakffjuaskzooq/sql/new
-- =========================================================================

-- 1. Create Inquiries Table if it does not exist
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL DEFAULT 'Cost Estimate',
    client_name TEXT NOT NULL DEFAULT 'Anonymous',
    client_email TEXT NOT NULL DEFAULT 'no-email@provided.local',
    client_phone TEXT DEFAULT '',
    company TEXT DEFAULT '',
    business_type TEXT DEFAULT '',
    service_name TEXT DEFAULT '',
    tech_stack TEXT[] DEFAULT '{}',
    estimated_budget NUMERIC DEFAULT 0,
    timeline TEXT DEFAULT 'Flexible',
    details TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add missing columns to existing inquiries table (Fixes PGRST204)
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Cost Estimate';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS client_name TEXT DEFAULT 'Anonymous';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS client_email TEXT DEFAULT 'no-email@provided.local';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS client_phone TEXT DEFAULT '';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS company TEXT DEFAULT '';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS business_type TEXT DEFAULT '';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS service_name TEXT DEFAULT '';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS estimated_budget NUMERIC DEFAULT 0;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS timeline TEXT DEFAULT 'Flexible';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS details TEXT DEFAULT '';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Create Security Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public inserts to inquiries') THEN
        CREATE POLICY "Allow public inserts to inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow read access to inquiries') THEN
        CREATE POLICY "Allow read access to inquiries" ON public.inquiries FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow update access to inquiries') THEN
        CREATE POLICY "Allow update access to inquiries" ON public.inquiries FOR UPDATE USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow delete access to inquiries') THEN
        CREATE POLICY "Allow delete access to inquiries" ON public.inquiries FOR DELETE USING (true);
    END IF;
END $$;

-- 6. Reload Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
