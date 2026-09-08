import { sanitizeInput } from './utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://shadowarrow-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWRvd2Fycm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.placeholder-key-for-shadow-arrow';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { clientName, clientEmail, company, businessType, serviceName, techStack, estimatedBudget, timeline, details } = req.body || {};

    if (!clientName || !clientEmail) {
      return res.status(400).json({ error: 'Client name and email are required' });
    }

    const cleanName = sanitizeInput(clientName);
    const cleanEmail = sanitizeInput(clientEmail);
    const cleanCompany = sanitizeInput(company || '');
    const cleanDetails = sanitizeInput(details || '');
    const leadId = `EST-${Math.floor(100000 + Math.random() * 900000)}`;

    const newLead = {
      id: leadId,
      type: 'Cost Estimate',
      client_name: cleanName,
      client_email: cleanEmail,
      company: cleanCompany,
      business_type: sanitizeInput(businessType || ''),
      service_name: sanitizeInput(serviceName || 'Custom Scope'),
      tech_stack: Array.isArray(techStack) ? techStack.map(sanitizeInput) : [],
      estimated_budget: Number(estimatedBudget) || 0,
      timeline: sanitizeInput(timeline || '3-4 Weeks'),
      details: cleanDetails,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Store in Supabase
    try {
      await supabase.from('inquiries').insert([newLead]);
    } catch (sErr) {
      console.warn('Supabase insertion notice:', sErr);
    }

    return res.status(201).json({
      success: true,
      message: 'Project estimate submitted successfully to Shadow Arrow Vercel Serverless Backend!',
      leadId,
      lead: {
        id: leadId,
        clientName: cleanName,
        clientEmail: cleanEmail,
        company: cleanCompany,
        estimatedBudget: Number(estimatedBudget) || 0,
        createdAt: newLead.created_at
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error processing estimate payload' });
  }
}
