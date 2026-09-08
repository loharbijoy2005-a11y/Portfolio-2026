import { sanitizeInput } from './utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'your_supabase_anon_key_here';

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
    const { clientName, clientEmail, clientPhone, serviceName, message } = req.body || {};

    if (!clientName || !clientEmail) {
      return res.status(400).json({ error: 'Client name and email are required' });
    }

    const cleanName = sanitizeInput(clientName);
    const cleanEmail = sanitizeInput(clientEmail);
    const cleanPhone = sanitizeInput(clientPhone || '');
    const cleanService = sanitizeInput(serviceName || 'Discovery Call');
    const cleanMessage = sanitizeInput(message || '');
    const leadId = `CON-${Math.floor(100000 + Math.random() * 900000)}`;

    const newLead = {
      id: leadId,
      type: 'Discovery Call',
      client_name: cleanName,
      client_email: cleanEmail,
      client_phone: cleanPhone,
      company: '',
      business_type: '',
      service_name: cleanService,
      tech_stack: [],
      estimated_budget: 0,
      timeline: 'Flexible',
      details: cleanMessage,
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
      message: 'Discovery call request received successfully!',
      leadId,
      lead: {
        id: leadId,
        clientName: cleanName,
        clientEmail: cleanEmail,
        clientPhone: cleanPhone,
        serviceName: cleanService,
        createdAt: newLead.created_at
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error processing contact request' });
  }
}
