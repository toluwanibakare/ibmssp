import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Supabase REST details (uses native lightweight fetch - no heavy WebAssembly dependencies)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://rihltpxgyocqqjbspmrw.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// ─── Middleware ─────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key, apikey');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors({ origin: '*' }));
app.use(express.json());

const router = express.Router();

// API Key authentication middleware
function authenticateApiKey(req, res, next) {
  if (req.method === 'OPTIONS' || req.path === '/health' || req.path === '/') return next();

  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (process.env.REQUIRE_API_KEY === 'true' && apiKey !== API_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid x-api-key' });
  }
  next();
}

router.use(authenticateApiKey);

// ─── Health Check ───────────────────────────────────────────────────────────

const healthHandler = (req, res) => {
  res.json({
    status: 'online',
    service: 'IBMSSP Dedicated Email Microservice',
    timestamp: new Date().toISOString(),
  });
};

router.get('/health', healthHandler);
router.get('/', healthHandler);

// ─── Supabase REST Helper Functions (Zero Overhead) ───────────────────────

async function deleteOtpFromDb(email) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
      },
    });
  } catch (err) {
    console.warn('[OTP DB Delete Warning]:', err.message);
  }
}

async function insertOtpToDb(email, otp, expiresAt) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    await deleteOtpFromDb(email);
    await fetch(`${SUPABASE_URL}/rest/v1/password_reset_otps`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email, otp, expires_at: expiresAt }),
    });
  } catch (err) {
    console.warn('[OTP DB Insert Warning]:', err.message);
  }
}

async function fetchOtpFromDb(email) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(email)}&select=otp,expires_at`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
      },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn('[OTP DB Fetch Warning]:', err.message);
    return [];
  }
}

// ─── 1. Send OTP Endpoint ────────────────────────────────────────────────────

router.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await insertOtpToDb(email, otp, expiresAt);

    const template = otpTemplate({ otp });
    await sendEmail({ to: email, subject: template.subject, html: template.html });

    res.json({ success: true, message: 'OTP sent successfully to ' + email });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP email' });
  }
});

// ─── 2. Verify OTP Endpoint ─────────────────────────────────────────────────

router.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const records = await fetchOtpFromDb(email);

    if (!records || records.length === 0) {
      return res.status(400).json({ error: 'No active OTP found. Please request a new code.' });
    }

    const record = records[0];
    if (new Date(record.expires_at) < new Date()) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new code.' });
    }

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Incorrect OTP. Please check and try again.' });
    }

    await deleteOtpFromDb(email);

    res.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: error.message || 'OTP verification error' });
  }
});

// ─── 3. Send Registration Welcome Email ─────────────────────────────────────

router.post('/api/send-welcome', async (req, res) => {
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

router.post('/api/send-payment', async (req, res) => {
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

const universalHandler = async (req, res) => {
  try {
    const payload = req.body.body || req.body;
    const { type, to, name, memberId, otp, amount, subject, headline, content, ctaText, ctaUrl, htmlBody } = payload;

    if (!type || !to) {
      return res.status(400).json({ error: '"type" and "to" parameters are required' });
    }

    let template = { subject: subject || 'IBMSSP Notification', html: htmlBody || '' };

    if (type === 'verify_otp') {
      const records = await fetchOtpFromDb(to);
      if (!records || records.length === 0) {
        return res.status(400).json({ error: 'No active OTP found. Please request a new code.' });
      }
      const record = records[0];
      if (new Date(record.expires_at) < new Date()) {
        return res.status(400).json({ error: 'OTP has expired. Please request a new code.' });
      }
      if (record.otp !== (otp || '').trim()) {
        return res.status(400).json({ error: 'Incorrect OTP. Please check and try again.' });
      }
      await deleteOtpFromDb(to);
      return res.json({ success: true, message: 'OTP verified successfully' });
    } else if (type === 'registration') {
      template = registrationTemplate({ name: name || 'Member', memberId: memberId || 'N/A' });
    } else if (type === 'otp') {
      const generatedOtp = otp || Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      await insertOtpToDb(to, generatedOtp, expiresAt);
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
};

router.post('/api/send-email', universalHandler);
router.post('/send-email', universalHandler);

app.use('/', router);
app.use('/email-api', router);

// ─── 4. Periodic Check for Live Chat Inactivity & Auto-Closure (30 mins & 60 mins) ───
const checkUnrepliedChats = async () => {
  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rihltpxgyocqqjbspmrw.supabase.co';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaGx0cHhneW9jcXFqYnNwbXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2Njk4MTMsImV4cCI6MjA2MjI0NTgxM30.6iG5K3y4XgY2XQ4';
    
    // Fetch live_chats with status human_requested or human_active
    const res = await fetch(`${supabaseUrl}/rest/v1/live_chats?status=in.(human_requested,human_active)&select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!res.ok) return;
    const chats = await res.json();
    if (!Array.isArray(chats) || chats.length === 0) return;

    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    for (const chat of chats) {
      // Check last message for this chat
      const msgRes = await fetch(`${supabaseUrl}/rest/v1/chat_messages?chat_id=eq.${chat.id}&order=created_at.desc&limit=1`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      if (!msgRes.ok) continue;
      const msgs = await msgRes.json();
      if (msgs.length === 0) continue;

      const lastMsg = msgs[0];
      const lastMsgDate = new Date(lastMsg.created_at);

      // CASE 1: 1 HOUR INACTIVITY -> Send warning message & close chat session
      if (lastMsgDate < oneHourAgo) {
        // Insert auto-close warning message in chat
        await fetch(`${supabaseUrl}/rest/v1/chat_messages`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chat.id,
            role: 'bot',
            content: 'We haven\'t heard from you in over 1 hour. This support session has now been closed. If you have any further questions, feel free to open a new chat!'
          })
        });

        // Close the chat
        await fetch(`${supabaseUrl}/rest/v1/live_chats?id=eq.${chat.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: 'closed', updated_at: new Date().toISOString() })
        });

        console.log(`🔒 Closed inactive live chat session ${chat.id} after 1 hour`);
        continue;
      }

      // CASE 2: 30 MINS UNREPLIED BY ADMIN -> Send courtesy email to user
      if (chat.user_email && !chat.email_notified_at && lastMsg.role !== 'admin' && lastMsgDate < thirtyMinsAgo) {
        const template = announcementTemplate({
          subject: 'Support Request Update – IBMSSP Live Support',
          headline: `Hello ${chat.user_name || 'Valued Visitor'},`,
          content: `We received your request for live support on the IBMSSP portal.\n\nOur customer care representative is currently reviewing your inquiry and will respond as soon as possible. If you need urgent assistance, you can also reach out directly to us at info@ibmssp.org.ng or call +2348036706827.\n\nThank you for your patience!`,
          ctaText: 'Return to Chat',
          ctaUrl: 'https://ibmssp.org.ng'
        });

        await sendEmail({ to: chat.user_email, subject: template.subject, html: template.html });

        // Mark email notified
        await fetch(`${supabaseUrl}/rest/v1/live_chats?id=eq.${chat.id}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email_notified_at: new Date().toISOString() })
        });
        console.log(`✉️ Dispatched 30-min unreplied chat notification email to ${chat.user_email}`);
      }
    }
  } catch (err) {
    console.error('Error checking unreplied chats:', err);
  }
};

// Run check every 5 minutes
setInterval(checkUnrepliedChats, 5 * 60 * 1000);

const LISTEN_PORT = process.env.PORT || 5000;

const server = app.listen(LISTEN_PORT, () => {
  const addressInfo = server.address();
  const boundAddress = typeof addressInfo === 'string' ? addressInfo : addressInfo?.port;
  console.log(`
🚀 ===================================================
   IBMSSP Dedicated Email Microservice
   Listening on: ${boundAddress}
   Env:  ${process.env.NODE_ENV || 'development'}
===================================================
  `);
});
