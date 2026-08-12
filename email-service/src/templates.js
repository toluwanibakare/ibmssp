// ─── IBMSSP HTML Email Templates ──────────────────────────────────────────────────

function emailWrapper(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 20px 0; background-color: #f4f6f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #305858 0%, #1e3a3a 100%); padding: 32px 40px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px;">IBMSSP</h1>
          <p style="color: #a8c5c5; font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
            Institute of Business Management Standards & Safety Professionals
          </p>
        </div>
        <!-- Body Content -->
        <div style="padding: 40px 36px;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; font-weight: 500;">
            © ${new Date().getFullYear()} IBMSSP. All rights reserved.
          </p>
          <p style="color: #94a3b8; font-size: 11px; margin: 0;">
            <a href="https://ibmssp.org.ng" style="color: #305858; text-decoration: none; font-weight: 600;">ibmssp.org.ng</a> &nbsp;•&nbsp;
            <a href="mailto:info@ibmssp.org.ng" style="color: #305858; text-decoration: none; font-weight: 600;">info@ibmssp.org.ng</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function ctaButton(text, url) {
  return `
    <div style="text-align: center; margin: 32px 0 24px;">
      <a href="${url}" style="background: #305858; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(48, 88, 88, 0.25);">
        ${text}
      </a>
    </div>
  `;
}

export function registrationTemplate({ name, memberId }) {
  return {
    subject: 'Welcome to IBMSSP – Registration Received',
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0; font-size: 22px;">Welcome, ${name}!</h2>
      <p style="color: #475569; line-height: 1.8; font-size: 15px;">
        Your membership application to the Institute of Business Management Standards & Safety Professionals has been successfully received.
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #305858; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
        <p style="margin: 0; color: #1e293b; font-size: 14px; font-weight: 600;">
          Member ID: <span style="color: #305858;">${memberId}</span>
        </p>
        <p style="margin: 6px 0 0; color: #64748b; font-size: 13px;">
          Status: Pending Review
        </p>
      </div>
      <p style="color: #475569; line-height: 1.8; font-size: 15px;">Next steps for your membership:</p>
      <ol style="color: #475569; line-height: 2; padding-left: 20px; font-size: 14px;">
        <li>Our Governing Board will review your submitted credentials.</li>
        <li>Upon approval, you will receive instructions to complete your registration fee.</li>
        <li>After confirmation, you can instantly download your official <strong>Registration Certificate</strong>.</li>
      </ol>
      ${ctaButton('Access Your Member Portal', 'https://ibmssp.org.ng/account')}
    `),
  };
}

export function otpTemplate({ otp }) {
  return {
    subject: 'IBMSSP – Your Password Reset OTP Code',
    html: emailWrapper(`
      <div style="text-align: center;">
        <h2 style="color: #305858; margin-top: 0; font-size: 22px;">Password Reset Request</h2>
        <p style="color: #475569; line-height: 1.8; font-size: 15px;">
          Use the one-time verification code below to reset your IBMSSP account password.
        </p>
        <div style="background: #305858; display: inline-block; padding: 20px 48px; border-radius: 10px; margin: 24px 0; box-shadow: 0 4px 16px rgba(48,88,88,0.2);">
          <span style="color: #ffffff; font-size: 40px; font-weight: 800; letter-spacing: 14px; display: block; font-family: monospace;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 13px; margin-top: 8px;">
          This code expires in <strong>15 minutes</strong>.
        </p>
        <p style="color: #ef4444; font-size: 13px; margin-top: 16px;">
          If you did not request a password reset, please ignore this email or contact support.
        </p>
      </div>
    `),
  };
}

export function paymentConfirmationTemplate({ name, memberId, amount }) {
  return {
    subject: 'IBMSSP – Payment Confirmed! Your Membership is Active',
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0; font-size: 22px;">Payment Confirmed 🎉</h2>
      <p style="color: #475569; line-height: 1.8; font-size: 15px;">
        Dear <strong>${name}</strong>, your payment of <strong>${amount}</strong> has been successfully verified. Your IBMSSP membership is now <strong>fully active</strong>.
      </p>
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
        <p style="margin: 0; color: #1e293b; font-size: 14px; font-weight: 600;">
          Member ID: <span style="color: #305858;">${memberId}</span>
        </p>
        <p style="margin: 6px 0 0; color: #16a34a; font-size: 13px; font-weight: 700;">
          ✅ Status: Active Member
        </p>
      </div>
      <p style="color: #475569; line-height: 1.8; font-size: 15px;">You now have full access to:</p>
      <ul style="color: #475569; line-height: 2; padding-left: 20px; font-size: 14px;">
        <li>Your Member Portal & Dashboard</li>
        <li><strong>Download your official Compliance & Registration Certificate</strong></li>
        <li>All standard guides, ISO audit worksheets, and professional resources</li>
      </ul>
      ${ctaButton('Download Your Certificate', 'https://ibmssp.org.ng/account')}
    `),
  };
}

export function newsletterTemplate({ subject, headline, content, ctaText, ctaUrl }) {
  return {
    subject,
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0; font-size: 22px;">${headline}</h2>
      <div style="color: #475569; line-height: 1.9; font-size: 15px;">
        ${content.replace(/\n/g, '<br/>')}
      </div>
      ${ctaText && ctaUrl ? ctaButton(ctaText, ctaUrl) : ''}
    `),
  };
}

export function announcementTemplate({ subject, headline, content, ctaText, ctaUrl }) {
  return {
    subject,
    html: emailWrapper(`
      <div style="background: #305858; color: #ffffff; padding: 8px 16px; border-radius: 6px; display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px;">
        Official Announcement
      </div>
      <h2 style="color: #0f172a; margin-top: 4px; font-size: 22px;">${headline}</h2>
      <div style="color: #475569; line-height: 1.9; font-size: 15px;">
        ${content.replace(/\n/g, '<br/>')}
      </div>
      ${ctaText && ctaUrl ? ctaButton(ctaText, ctaUrl) : ''}
    `),
  };
}
