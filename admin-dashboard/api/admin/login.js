import jwt from 'jsonwebtoken';
import { JWT_SECRET, ADMIN_USER, ADMIN_PASS, checkRateLimit, recordFailedAttempt, resetRateLimit } from '../utils/security.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Security Alert: Too many failed login attempts. Account temporarily locked for 15 minutes.'
    });
  }

  const { username, password } = req.body || {};

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    resetRateLimit(clientIp);

    const token = jwt.sign(
      { username: ADMIN_USER, role: 'administrator', ip: clientIp },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.status(200).json({
      success: true,
      token,
      admin: {
        username: ADMIN_USER,
        role: 'Founder & Lead Engineer',
        lastLogin: new Date().toISOString()
      }
    });
  }

  recordFailedAttempt(clientIp);
  return res.status(401).json({ error: 'Invalid admin credentials. Security attempt logged.' });
}
