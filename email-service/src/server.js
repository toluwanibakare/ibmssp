import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { sendEmail } from './mailer.js';
import {
  registrationTemplate,
  otpTemplate,
  paymentConfirmationTemplate,
  newsletterTemplate,
  announcementTemplate,
} from './templates.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_SECRET = process.env.EMAIL_API_SECRET || 'ibmssp_mail_secret_2026';

// Supabase Service Client for storing/verifying OTPs
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rihltpxgyocqqjbspmrw.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabaseAdmin = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

// ─── Middleware ─────────────────────────────────────────────────────────────

app.use(cors({ origin: '*' }));
app.use(express.json());

// API Key authentication middleware (optional, skips for /health)
function authenticateApiKey(req, res, next) {
  if (req.path === '/health') return next();

  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  // If API_SECRET is set and passed, allow. Otherwise permit for dev.
  if (process.env.REQUIRE_API_KEY === 'true' && apiKey !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid x-api-key' });
  }
  next();
}

app.use(authenticateApiKey);

// ─── Health Check ───────────────────────────────────────────────────────────

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'IBMSSP Dedicated Email Microservice',
    timestamp: new Date().toISOString(),
  });
});

// ─── 1. Send OTP Endpoint ────────────────────────────────────────────────────

app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // Store OTP in Supabase if service role key available
    if (supabaseAdmin) {
      await supabaseAdmin.from('password_reset_otps').delete().eq('email', email);
      const { error: insertErr } = await supabaseAdmin
        .from('password_reset_otps')
        .insert([{ email, otp, expires_at: expiresAt }]);
      if (insertErr) console.warn('[OTP DB Warning]:', insertErr.message);
    }

    // Render HTML and send email
    const template = otpTemplate({ otp });
    await sendEmail({ to: email, subject: template.subject, html: template.html });

    res.json({ success: true, message: 'OTP sent successfully to ' + email });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP email' });
  }
});

// ─── 2. Verify OTP Endpoint ─────────────────────────────────────────────────

app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin client not initialized' });
    }

    const { data: records, error } = await supabaseAdmin
      .from('password_reset_otps')
      .select('otp, expires_at')
      .eq('email', email);

    if (error || !records || records.length === 0) {
      return res.status(400).json({ error: 'No active OTP found. Please request a new code.' });
    }

    const record = records[0];
    if (new Date(record.expires_at) < new Date()) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new code.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Incorrect OTP. Please check and try again.' });
    }

    // Delete verified OTP
    await supabaseAdmin.from('password_reset_otps').delete().eq('email', email);

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: error.message || 'OTP verification error' });
  }
});

// ─── 3. Send Registration Welcome Email ─────────────────────────────────────

app.post('/api/send-welcome', async (req, res) => {
  try {
    const { email, name, memberId } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const template = registrationTemplate({
      name: name || 'Member',
      memberId: memberId || 'N/A',
    });

    await sendEmail({ to: email, subject: template.subject, html: template.html });

    res.json({ success: true, message: 'Welcome email sent to ' + email });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({ error: error.message || 'Failed to send welcome email' });
  }
});

// ─── 4. Send Payment Confirmation Email ─────────────────────────────────────

app.post('/api/send-payment', async (req, res) => {
  try {
    const { email, name, memberId, amount } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const template = paymentConfirmationTemplate({
      name: name || 'Member',
      memberId: memberId || 'N/A',
      amount: amount || '',
    });

    await sendEmail({ to: email, subject: template.subject, html: template.html });

    res.json({ success: true, message: 'Payment receipt email sent to ' + email });
  } catch (error) {
    console.error('Error sending payment email:', error);
    res.status(500).json({ error: error.message || 'Failed to send payment email' });
  }
});

// ─── 5. Universal Router Endpoint (Handles any email type) ─────────────────

app.post('/api/send-email', async (req, res) => {
  try {
    const payload = req.body.body || req.body;
    const { type, to, name, memberId, otp, amount, subject, headline, content, ctaText, ctaUrl, htmlBody } = payload;

    if (!type || !to) {
      return res.status(400).json({ error: '"type" and "to" parameters are required' });
    }

    let template = { subject: subject || 'IBMSSP Notification', html: htmlBody || '' };

    if (type === 'registration') {
      template = registrationTemplate({ name: name || 'Member', memberId: memberId || 'N/A' });
    } else if (type === 'otp') {
      const generatedOtp = otp || Math.floor(100000 + Math.random() * 900000).toString();
      template = otpTemplate({ otp: generatedOtp });
    } else if (type === 'payment_confirmation') {
      template = paymentConfirmationTemplate({ name: name || 'Member', memberId: memberId || 'N/A', amount: amount || '' });
    } else if (type === 'newsletter') {
      template = newsletterTemplate({ subject, headline, content, ctaText, ctaUrl });
    } else if (type === 'announcement') {
      template = announcementTemplate({ subject, headline, content, ctaText, ctaUrl });
    }

    await sendEmail({ to, subject: template.subject, html: template.html });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Universal send-email error:', error);
    res.status(500).json({ error: error.message || 'Failed to process send-email request' });
  }
});

// ─── Start Server ───────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`
🚀 ===================================================
   IBMSSP Dedicated Email Microservice
   Port: ${PORT}
   Env:  ${process.env.NODE_ENV || 'development'}
   URL:  http://localhost:${PORT}/health
===================================================
  `);
});
