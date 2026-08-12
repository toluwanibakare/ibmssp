import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';

// ─── Pure cPanel SMTP Transport ─────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // SSL for port 465
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Prevents SSL cert errors on cPanel
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('❌ [cPanel SMTP Verification Error]:', error.message);
  } else {
    console.log(`✅ [cPanel SMTP Transporter]: Connected & Ready on ${SMTP_HOST}:${SMTP_PORT}`);
  }
});

export async function sendEmail({ to, subject, html }) {
  if (!to) throw new Error('Recipient email "to" is required');

  const recipients = Array.isArray(to) ? to.join(', ') : to;

  const mailOptions = {
    from: `"IBMSSP" <${SMTP_USER}>`,
    to: recipients,
    subject: subject,
    html: html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✉️ [cPanel Email Sent]: MessageId=${info.messageId} to=${recipients}`);
  return info;
}
