import { sanitizeInput } from './utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycXZ5aXpha2ZmanVhc2t6b29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MDYyMTEsImV4cCI6MjEwNDM4MjIxMX0.ydlKWOBNIyJXLjTUu7t4TH1YDWOAfd6mMtM8yTP2pyM';

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
    const {
      clientName, clientEmail, clientPhone, company, businessType, serviceName,
      techStack, estimatedBudget, timeline, details, type,
      name, email, phone, service, message, budget, modules
    } = req.body || {};

    const cleanName = sanitizeInput(clientName || name || 'Anonymous Client');
    const cleanEmail = sanitizeInput(clientEmail || email || 'no-email@provided.local');
    const cleanPhone = sanitizeInput(clientPhone || phone || '');
    const cleanCompany = sanitizeInput(company || '');
    const cleanDetails = sanitizeInput(details || message || '');

    // Parse numeric budget safely
    const rawBudget = estimatedBudget ?? budget ?? 0;
    const parsedBudget = typeof rawBudget === 'number'
      ? (isNaN(rawBudget) ? 0 : rawBudget)
      : (parseFloat(String(rawBudget).replace(/[^0-9.]/g, '')) || 0);

    // Parse tech stack array safely
    const rawStack = techStack || modules || [];
    const parsedStack = Array.isArray(rawStack)
      ? rawStack.map(s => sanitizeInput(String(s)))
      : (typeof rawStack === 'string' && rawStack.trim()
        ? rawStack.split(',').map(s => sanitizeInput(s.trim())).filter(Boolean)
        : []);

    const leadId = `EST-${Math.floor(100000 + Math.random() * 900000)}`;

    const uuid = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

    const newLead = {
      id: uuid,
      type: sanitizeInput(type || 'Cost Estimate'),
      client_name: cleanName,
      client_email: cleanEmail,
      client_phone: cleanPhone,
      company: cleanCompany,
      business_type: sanitizeInput(businessType || ''),
      service_name: sanitizeInput(serviceName || service || 'Cost Estimate'),
      tech_stack: parsedStack,
      estimated_budget: parsedBudget,
      timeline: sanitizeInput(timeline || 'Flexible'),
      details: cleanDetails,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Store in Supabase
    try {
      const { data, error } = await supabase.from('inquiries').insert([newLead]).select();
      if (error) {
        console.error('❌ Supabase insertion error in /api/estimates:', error.message, error.details);
      } else {
        console.log('✅ Estimate saved to Supabase via /api/estimates:', data?.[0]?.id);
      }
    } catch (sErr) {
      console.error('❌ Supabase insertion exception in /api/estimates:', sErr);
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
