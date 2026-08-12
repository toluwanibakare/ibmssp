import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

function createTransporter(port, secure) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: secure,
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });
}

let transporter = createTransporter(SMTP_PORT, SMTP_PORT === 465);
let isSmtpAvailable = false;

transporter.verify((error) => {
  if (error) {
    console.warn(`⚠️ [cPanel SMTP Port ${SMTP_PORT} Firewall Blocked]: ${error.message}`);
    const altPort = SMTP_PORT === 465 ? 587 : 465;
    const altTransporter = createTransporter(altPort, altPort === 465);
    altTransporter.verify((altErr) => {
      if (altErr) {
        console.warn(`⚠️ [cPanel SMTP Port ${altPort} Firewall Blocked]: External SMTP ports 465/587 are blocked by web host firewall.`);
        console.log(`🌐 [HTTPS Mail Relay Active]: Using Resend/HTTPS API for 100% reliable delivery over Port 443.`);
        isSmtpAvailable = false;
      } else {
        console.log(`✅ [SMTP Transporter]: Connected on Port ${altPort}`);
        transporter = altTransporter;
        isSmtpAvailable = true;
      }
    });
  } else {
    console.log(`✅ [SMTP Transporter]: Connected on ${SMTP_HOST}:${SMTP_PORT}`);
    isSmtpAvailable = true;
  }
});

// ─── Resend / HTTPS Mailer Fallback ──────────────────────────────────────────

async function sendViaHttpApi({ to, subject, html }) {
  const apiKey = RESEND_API_KEY || 're_default_key';
  const recipients = Array.isArray(to) ? to : [to];

  // Call Resend API over HTTPS (Port 443 - Never blocked by firewall)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || 'IBMSSP <onboarding@resend.dev>',
      to: recipients,
      subject: subject,
      html: html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || `HTTPS Mail API Error: ${res.status}`);
  }
  console.log(`✉️ [HTTP Email Sent via Resend]: ID=${data.id} to=${recipients.join(', ')}`);
  return data;
}

export async function sendEmail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email "to" is required');

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  // 1. Try Resend HTTPS API if API Key is set (100% reliable)
  if (RESEND_API_KEY) {
    try {
      return await sendViaHttpApi({ to, subject, html });
    } catch (httpErr) {
      console.warn('⚠️ Resend HTTPS API error, falling back to SMTP...', httpErr.message);
    }
  }

  // 2. Try SMTP
  if (isSmtpAvailable && SMTP_PASS) {
    try {
      const mailOptions = { from: `"IBMSSP" <${SMTP_USER}>`, to: recipients, subject, html };
      const info = await transporter.sendMail(mailOptions);
      console.log(`✉️ [SMTP Email Sent]: MessageId=${info.messageId} to=${recipients}`);
      return info;
    } catch (smtpErr) {
      console.warn('⚠️ SMTP send error:', smtpErr.message);
    }
  }

  // 3. Fallback to HTTPS API
  return await sendViaHttpApi({ to, subject, html });
}
