import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'shadow_arrow_super_secret_jwt_key_2026';
export const ADMIN_USER = process.env.ADMIN_USER || 'admin';
export const ADMIN_PASS = process.env.ADMIN_PASS || 'ShadowArrow2026!';

// In-Memory Rate Limiting Tracker
const loginAttempts = new Map();

export const checkRateLimit = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const record = loginAttempts.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  if (record.count >= maxAttempts) {
    return false; // Rate limited
  }

  return true;
};

export const recordFailedAttempt = (ip) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const record = loginAttempts.get(ip) || { count: 0, resetTime: now + windowMs };
  record.count += 1;
  loginAttempts.set(ip, record);
};

export const resetRateLimit = (ip) => {
  loginAttempts.delete(ip);
};

// XSS Sanitizer Function
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
};

// Verify Admin Token
export const verifyAdminToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
