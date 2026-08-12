import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST || 'mail.ibmssp.org.ng';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || 'info@ibmssp.org.ng';
const SMTP_PASS = process.env.SMTP_PASS || '';

function createTransporter(port, secure) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: secure,
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 15000,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// Primary transporter (Port 587 by default for cloud compatibility)
let transporter = createTransporter(SMTP_PORT, SMTP_PORT === 465);

transporter.verify((error) => {
  if (error) {
    console.warn(`⚠️ [Primary SMTP Port ${SMTP_PORT} Error]: ${error.message}. Testing fallback port...`);
    // Try fallback port (if 465 failed, try 587; if 587 failed, try 465)
    const fallbackPort = SMTP_PORT === 465 ? 587 : 465;
    const fallbackTransporter = createTransporter(fallbackPort, fallbackPort === 465);
    fallbackTransporter.verify((fallbackErr) => {
      if (fallbackErr) {
        console.error(`❌ [Fallback SMTP Port ${fallbackPort} Error]: ${fallbackErr.message}`);
      } else {
        console.log(`✅ [Fallback SMTP Transporter]: Connected on Port ${fallbackPort}`);
        transporter = fallbackTransporter;
      }
    });
  } else {
    console.log(`✅ [SMTP Transporter]: Connected & Ready on ${SMTP_HOST}:${SMTP_PORT}`);
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ [Email Sent]: MessageId=${info.messageId} to=${recipients}`);
    return info;
  } catch (err) {
    console.warn(`⚠️ Primary send error: ${err.message}. Retrying with alternate port...`);
    const altPort = SMTP_PORT === 465 ? 587 : 465;
    const altTransporter = createTransporter(altPort, altPort === 465);
    const info = await altTransporter.sendMail(mailOptions);
    console.log(`✉️ [Email Sent via Alt Port ${altPort}]: MessageId=${info.messageId} to=${recipients}`);
    return info;
  }
}
