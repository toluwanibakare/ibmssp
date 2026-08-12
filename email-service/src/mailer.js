import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

let transporter = null;

if (SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });

  transporter.verify((error) => {
    if (error) {
      console.error('❌ [cPanel SMTP Verification Error]:', error.message);
    } else {
      console.log(`✅ [cPanel SMTP Transporter]: Connected on ${SMTP_HOST}:${SMTP_PORT}`);
    }
  });
}

async function sendViaResend({ to, subject, html }) {
  const recipients = Array.isArray(to) ? to : [to];
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'IBMSSP <onboarding@resend.dev>',
      to: recipients,
      subject: subject,
      html: html,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Resend API Error');
  return data;
}

export async function sendEmail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email "to" is required');

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  // Option A: Send via Resend if RESEND_API_KEY is provided
  if (RESEND_API_KEY) {
    console.log('🌐 Sending via Resend API over HTTPS...');
    return await sendViaResend({ to, subject, html });
  }

  // Option B: Send via cPanel SMTP if SMTP_PASS is provided
  if (transporter && SMTP_PASS) {
    console.log('✉️ Sending via cPanel SMTP...');
    const mailOptions = { from: `"IBMSSP" <${SMTP_USER}>`, to: recipients, subject, html };
    return await transporter.sendMail(mailOptions);
  }

  throw new Error('No email credentials configured. Please set SMTP_PASS or RESEND_API_KEY in environment variables.');
}
