import { verifyAdminToken, sanitizeInput } from '../utils/security.js';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://srqvyizakffjuaskzooq.supabase.co';
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

      const seedLeads = [
        {
          id: 'EST-849201',
          type: 'Cost Estimate',
          clientName: 'Vikram Sharma',
          clientEmail: 'vikram@techventure.in',
          company: 'TechVenture Labs',
          businessType: 'B2B Corporate',
          serviceName: 'Enterprise SaaS Platform',
          techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
          estimatedBudget: 350000,
          timeline: '4-6 Weeks',
          details: 'Looking for a high-performance multi-tenant dashboard with automated GST invoicing and analytics.',
          status: 'pending',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'EST-739104',
          type: 'Discovery Call',
          clientName: 'Ananya Patel',
          clientEmail: 'ananya@growthbrands.co',
          company: 'GrowthBrands D2C',
          businessType: 'D2C Brand',
          serviceName: 'Headless E-Commerce Engine',
          techStack: ['Next.js', 'Stripe API', 'GraphQL', 'Supabase'],
          estimatedBudget: 180000,
          timeline: '2-3 Weeks',
          details: 'Need a sub-second page load storefront with high converting checkout flow and custom payment gateway.',
          status: 'contacted',
          createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
        },
        {
          id: 'EST-992105',
          type: 'Cost Estimate',
          clientName: 'Rohan Mehta',
          clientEmail: 'rohan@apexlogistics.io',
          company: 'Apex Logistics',
          businessType: 'B2B Corporate',
          serviceName: 'Custom Full-Stack System',
          techStack: ['React', 'TypeScript', 'REST API'],
          estimatedBudget: 240000,
          timeline: '3-4 Weeks',
          details: 'Real-time fleet tracking and automated client reporting dashboard.',
          status: 'pending',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
        }
      ];

      if (error || !data || data.length === 0) {
        return res.status(200).json({
          success: true,
          count: seedLeads.length,
          source: 'seed_fallback',
          data: seedLeads
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
