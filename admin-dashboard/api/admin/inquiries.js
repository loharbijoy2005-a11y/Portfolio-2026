import { verifyAdminToken, sanitizeInput } from '../utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://shadowarrow-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWRvd2Fycm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.placeholder-key-for-shadow-arrow';

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
          count: 0,
          source: 'supabase',
          data: []
        });
      }

      const formatted = data.map(item => ({
        id: item.id,
        type: item.type,
        clientName: item.client_name,
        clientEmail: item.client_email,
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

      return res.status(200).json({ success: true, count: formatted.length, data: formatted, source: 'supabase' });
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
