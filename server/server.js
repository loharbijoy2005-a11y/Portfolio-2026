import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { insertLeadToSupabase, fetchLeadsFromSupabase } from './supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'shadow_arrow_super_secret_jwt_key_2026';

// Admin Credentials
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'ShadowArrow2026!';

const DATA_FILE = path.join(__dirname, 'data', 'inquiries.json');

app.use(cors());
app.use(express.json());

// Helper function to read inquiries
const readInquiries = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading inquiries dataset:', err);
    return [];
  }
};

// Helper function to write inquiries
const writeInquiries = (inquiries) => {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing inquiries dataset:', err);
    return false;
  }
};

// JWT Middleware Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Access token missing' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Public Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Shadow Arrow Studio Backend API',
    timestamp: new Date().toISOString()
  });
});

// Submit Cost Estimate / Lead
app.post('/api/estimates', (req, res) => {
  try {
    const { clientName, clientEmail, serviceName, techStack, estimatedBudget, timeline, details } = req.body;

    if (!clientName || !clientEmail) {
      return res.status(400).json({ error: 'Client name and email are required' });
    }

    const inquiries = readInquiries();
    const leadId = `EST-${Math.floor(100000 + Math.random() * 900000)}`;

    const newLead = {
      id: leadId,
      type: 'Cost Estimate',
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      serviceName: serviceName || 'Custom Full-Stack Solution',
      techStack: Array.isArray(techStack) ? techStack : [],
      estimatedBudget: Number(estimatedBudget) || 0,
      timeline: timeline || '3-4 Weeks',
      details: details || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    inquiries.unshift(newLead);
    writeInquiries(inquiries);
    insertLeadToSupabase(newLead);

    res.status(201).json({
      success: true,
      message: 'Project estimate submitted successfully to Shadow Arrow Backend & Supabase!',
      leadId,
      lead: newLead
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error saving estimate payload' });
  }
});

// Submit Direct Contact / Discovery Request
app.post('/api/contact', (req, res) => {
  try {
    const { clientName, clientEmail, message, serviceName } = req.body;

    if (!clientName || !clientEmail) {
      return res.status(400).json({ error: 'Client name and email are required' });
    }

    const inquiries = readInquiries();
    const leadId = `CON-${Math.floor(100000 + Math.random() * 900000)}`;

    const newContact = {
      id: leadId,
      type: 'Discovery Call',
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      serviceName: serviceName || 'General Inquiry',
      techStack: [],
      estimatedBudget: 0,
      timeline: 'Flexible',
      details: message || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    inquiries.unshift(newContact);
    writeInquiries(inquiries);

    res.status(201).json({
      success: true,
      message: 'Discovery call request received!',
      leadId,
      lead: newContact
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error processing contact request' });
  }
});

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { username: ADMIN_USER, role: 'administrator' },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.json({
      success: true,
      token,
      admin: {
        username: ADMIN_USER,
        role: 'Founder & Lead Engineer',
        lastLogin: new Date().toISOString()
      }
    });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// Admin Protected Routes
app.get('/api/admin/inquiries', authenticateToken, async (req, res) => {
  try {
    const supabaseData = await fetchLeadsFromSupabase();
    if (supabaseData && supabaseData.length > 0) {
      return res.json({ success: true, count: supabaseData.length, data: supabaseData, source: 'supabase' });
    }
  } catch (e) {
    // fallback
  }

  const inquiries = readInquiries();
  res.json({ success: true, count: inquiries.length, data: inquiries, source: 'local_storage' });
});

app.patch('/api/admin/inquiries/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const inquiries = readInquiries();
  const index = inquiries.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry lead not found' });
  }

  if (status) {
    inquiries[index].status = status;
    writeInquiries(inquiries);
  }

  res.json({ success: true, message: 'Status updated', data: inquiries[index] });
});

app.delete('/api/admin/inquiries/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  let inquiries = readInquiries();
  const initialLength = inquiries.length;
  inquiries = inquiries.filter(item => item.id !== id);

  if (inquiries.length === initialLength) {
    return res.status(404).json({ error: 'Inquiry lead not found' });
  }

  writeInquiries(inquiries);
  res.json({ success: true, message: `Lead ${id} removed successfully` });
});

app.get('/api/admin/stats', authenticateToken, (req, res) => {
  const inquiries = readInquiries();
  const total = inquiries.length;
  const pending = inquiries.filter(i => i.status === 'pending').length;
  const contacted = inquiries.filter(i => i.status === 'contacted').length;
  const converted = inquiries.filter(i => i.status === 'converted').length;
  const totalEstimatedValue = inquiries.reduce((sum, item) => sum + (item.estimatedBudget || 0), 0);

  res.json({
    success: true,
    stats: {
      total,
      pending,
      contacted,
      converted,
      totalEstimatedValue
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Shadow Arrow Backend Server running at http://localhost:${PORT}`);
});
