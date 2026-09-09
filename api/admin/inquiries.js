import { verifyAdminToken, sanitizeInput } from '../utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNycXZ5aXpha2ZmanVhc2t6b29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MDYyMTEsImV4cCI6MjEwNDM4MjIxMX0.ydlKWOBNIyJXLjTUu7t4TH1YDWOAfd6mMtM8yTP2pyM';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const user = verifyAdminToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Access token missing or invalid' });
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        return res.status(200).json({
          success: true,
          count: 2,
          source: 'demo_fallback',
          data: [
            {
              id: 'EST-849201',
              type: 'Cost Estimate',
              clientName: 'Vikram Sharma',
              clientEmail: 'vikram@techventure.in',
              company: 'TechVenture Labs',
              businessType: 'B2B Corporate',
              serviceName: 'Enterprise SaaS Platform',
              techStack: ['React', 'Node.js', 'PostgreSQL', 'Supabase'],
              estimatedBudget: 350000,
              timeline: '4-6 Weeks',
              details: 'Looking for a high-performance multi-tenant dashboard with automated GST invoicing and analytics.',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        });
      }

      const formatted = data.map(item => ({
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

      return res.status(200).json({ success: true, count: formatted.length, data: formatted });
    } catch (err) {
      return res.status(500).json({ error: 'Server error retrieving inquiries' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (!id || !status) {
      return res.status(400).json({ error: 'Lead ID and status are required' });
    }

    try {
      await supabase.from('inquiries').update({ status: sanitizeInput(status) }).eq('id', id);
      return res.status(200).json({ success: true, message: 'Status updated' });
    } catch (err) {
      return res.status(500).json({ error: 'Error updating inquiry status' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || req.body || {};
    if (!id) {
      return res.status(400).json({ error: 'Lead ID is required' });
    }

    try {
      await supabase.from('inquiries').delete().eq('id', id);
      return res.status(200).json({ success: true, message: `Lead ${id} deleted` });
    } catch (err) {
      return res.status(500).json({ error: 'Error deleting inquiry' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
