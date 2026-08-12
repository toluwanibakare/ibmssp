import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587'); // Default 587 for cloud compatibility
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

function createTransporter(port) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: port === 465, // SSL for 465, STARTTLS for 587/2525
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

async function sendViaResend({ to, subject, html }) {
  const recipients = Array.isArray(to) ? to : [to];
  const fromEmail = process.env.EMAIL_FROM || 'IBMSSP <onboarding@resend.dev>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      subject: subject,
      html: html,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Resend API Error');
  return data;
}

export async function sendEmail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email "to" is required');

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  // 1. Try cPanel SMTP via configured port (Default 587 or 465)
  if (SMTP_PASS) {
    const portsToTry = [SMTP_PORT, SMTP_PORT === 465 ? 587 : 465, 2525];
    for (const port of portsToTry) {
      try {
        console.log(`✉️ Attempting cPanel SMTP (${SMTP_USER}) via Port ${port}...`);
        const tempTransporter = createTransporter(port);
        const mailOptions = { from: `"IBMSSP" <${SMTP_USER}>`, to: recipients, subject, html };
        const info = await tempTransporter.sendMail(mailOptions);
        console.log(`✅ [cPanel SMTP Sent Successfully on Port ${port}]: MessageId=${info.messageId}`);
        return info;
      } catch (err) {
        console.warn(`⚠️ cPanel SMTP Port ${port} failed: ${err.message}. Trying next port...`);
      }
    }
  }

  // 2. Fallback to Resend API if API Key is configured
  if (RESEND_API_KEY) {
    console.log('🌐 Sending via Resend API...');
    return await sendViaResend({ to, subject, html });
  }

  throw new Error('Could not connect to cPanel SMTP on ports 587, 465, or 2525. Please verify SMTP_PASS or webmail firewall settings.');
}
