import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'IBMSSP <info@ibmssp.org.ng>';

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';

async function sendViaResend({ to, subject, html }) {
  const recipients = Array.isArray(to) ? to : [to];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: recipients,
      subject: subject,
      html: html,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || JSON.stringify(data));
  }
  return data;
}

function createTransporter(port) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 8000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });
}

export async function sendEmail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email "to" is required');

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  // 1. Primary: Use Resend API over HTTPS (Fast, Reliable, Port 443)
  if (RESEND_API_KEY) {
    try {
      console.log(`🌐 [Resend API]: Sending email to ${recipients}...`);
      const resendResult = await sendViaResend({ to, subject, html });
      console.log(`✅ [Resend API Success]: ID=${resendResult.id} to=${recipients}`);
      return resendResult;
    } catch (resendErr) {
      console.warn('⚠️ [Resend API Warning]:', resendErr.message);
      if (!SMTP_PASS) throw resendErr;
    }
  }

  // 2. Fallback: Try cPanel SMTP if password provided
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
        console.warn(`⚠️ cPanel SMTP Port ${port} failed: ${err.message}`);
      }
    }
  }

  throw new Error('Email delivery failed via both Resend API and cPanel SMTP.');
}
