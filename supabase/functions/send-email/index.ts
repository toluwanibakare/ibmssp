import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── Shared Header / Footer ───────────────────────────────────────────────────

function emailWrapper(content: string) {
  return `
    <div style="font-family: 'Arial', sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #305858; padding: 28px 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px;">IBMSSP</h1>
        <p style="color: #a8c5c5; font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">Institute of Business Management Standards & Safety Professionals</p>
      </div>
      <div style="padding: 40px;">
        ${content}
      </div>
      <div style="background: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0 0 6px;">© ${new Date().getFullYear()} IBMSSP. All rights reserved.</p>
        <p style="color: #c4c9c9; font-size: 11px; margin: 0;">
          <a href="https://ibmssp.org.ng" style="color: #305858; text-decoration: none;">ibmssp.org.ng</a> &nbsp;|&nbsp;
          <a href="mailto:info@ibmssp.org.ng" style="color: #305858; text-decoration: none;">info@ibmssp.org.ng</a>
        </p>
      </div>
    </div>
  `;
}

function ctaButton(text: string, url: string) {
  return `<div style="text-align: center; margin: 28px 0;">
    <a href="${url}" style="background: #305858; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">${text}</a>
  </div>`;
}

// ─── Email Templates ──────────────────────────────────────────────────────────

function registrationTemplate(name: string, memberId: string) {
  return {
    subject: 'Welcome to IBMSSP – Registration Received',
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0;">Welcome, ${name}!</h2>
      <p style="color: #525656; line-height: 1.8;">Your registration application has been received successfully. Below are your account details:</p>
      <div style="background: #f0f7f7; border-left: 4px solid #305858; padding: 14px 20px; border-radius: 0 6px 6px 0; margin: 20px 0;">
        <p style="margin: 0; color: #305656; font-size: 14px;"><strong>Member ID:</strong> ${memberId}</p>
      </div>
      <p style="color: #525656; line-height: 1.8;">Your application is currently <strong>pending review</strong> by our board. Here is what happens next:</p>
      <ol style="color: #525656; line-height: 2.2; padding-left: 20px;">
        <li>Our board will review your submitted documents.</li>
        <li>Once approved, you will receive notification to complete your registration payment.</li>
        <li>After payment, you can log in, download your <strong>Registration Certificate</strong>, and enjoy all member benefits.</li>
      </ol>
      ${ctaButton('Log Into Your Account', 'https://ibmssp.org.ng/account')}
      <p style="color: #798382; font-size: 13px;">Questions? Contact us at <a href="mailto:info@ibmssp.org.ng" style="color: #305858;">info@ibmssp.org.ng</a></p>
    `),
  };
}

function otpTemplate(otp: string) {
  return {
    subject: 'IBMSSP – Your Password Reset OTP',
    html: emailWrapper(`
      <div style="text-align: center;">
        <h2 style="color: #305858; margin-top: 0;">Password Reset Code</h2>
        <p style="color: #525656; line-height: 1.8;">Use the one-time code below to reset your IBMSSP account password. This code <strong>expires in 15 minutes</strong>.</p>
        <div style="background: #305858; display: inline-block; padding: 18px 44px; border-radius: 8px; margin: 20px 0;">
          <span style="color: #ffffff; font-size: 38px; font-weight: bold; letter-spacing: 12px;">${otp}</span>
        </div>
        <p style="color: #798382; font-size: 13px; margin-top: 10px;">Enter this code on the IBMSSP sign-in page to reset your password.</p>
        <p style="color: #ef4444; font-size: 13px;"><strong>Did not request this?</strong> Ignore this email — your account remains secure.</p>
      </div>
    `),
  };
}

function paymentConfirmationTemplate(name: string, memberId: string, amount: string) {
  return {
    subject: 'IBMSSP – Payment Confirmed! Your Membership is Active',
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0;">Payment Confirmed!</h2>
      <p style="color: #525656; line-height: 1.8;">Dear <strong>${name}</strong>, your payment of <strong>${amount}</strong> has been received and your IBMSSP membership is now <strong>fully active</strong>.</p>
      <div style="background: #f0f7f7; border-left: 4px solid #305858; padding: 14px 20px; border-radius: 0 6px 6px 0; margin: 20px 0;">
        <p style="margin: 0; color: #305656; font-size: 14px;"><strong>Member ID:</strong> ${memberId}</p>
        <p style="margin: 8px 0 0; color: #305656; font-size: 14px;"><strong>Status:</strong> ✅ Active Member</p>
        <p style="margin: 8px 0 0; color: #305656; font-size: 14px;"><strong>Amount Paid:</strong> ${amount}</p>
      </div>
      <p style="color: #525656; line-height: 1.8;">You can now access the following:</p>
      <ul style="color: #525656; line-height: 2.2; padding-left: 20px;">
        <li>Your personal member dashboard</li>
        <li><strong>Download your official Registration Certificate</strong></li>
        <li>Access all exclusive IBMSSP member resources, guides, and audit worksheets</li>
        <li>Participate in upcoming IBMSSP events and training</li>
      </ul>
      ${ctaButton('Access Your Dashboard', 'https://ibmssp.org.ng/account')}
      <p style="color: #798382; font-size: 13px;">Questions? Contact us at <a href="mailto:info@ibmssp.org.ng" style="color: #305858;">info@ibmssp.org.ng</a></p>
    `),
  };
}

function newsletterTemplate(subject: string, headline: string, body: string, ctaText?: string, ctaUrl?: string) {
  return {
    subject,
    html: emailWrapper(`
      <h2 style="color: #305858; margin-top: 0;">${headline}</h2>
      <div style="color: #525656; line-height: 1.9; font-size: 15px;">
        ${body.replace(/\n/g, '<br/>')}
      </div>
      ${ctaText && ctaUrl ? ctaButton(ctaText, ctaUrl) : ''}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        You are receiving this email as a registered member of IBMSSP.<br/>
        To unsubscribe, contact <a href="mailto:info@ibmssp.org.ng" style="color: #305858;">info@ibmssp.org.ng</a>
      </p>
    `),
  };
}

function announcementTemplate(subject: string, headline: string, body: string, ctaText?: string, ctaUrl?: string) {
  return {
    subject,
    html: emailWrapper(`
      <div style="background: #305858; color: white; padding: 10px 16px; border-radius: 4px; display: inline-block; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px;">
        Official Announcement
      </div>
      <h2 style="color: #1E1F1E; margin-top: 8px;">${headline}</h2>
      <div style="color: #525656; line-height: 1.9; font-size: 15px;">
        ${body.replace(/\n/g, '<br/>')}
      </div>
      ${ctaText && ctaUrl ? ctaButton(ctaText, ctaUrl) : ''}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;" />
      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        This is an official announcement from IBMSSP leadership.<br/>
        For enquiries: <a href="mailto:info@ibmssp.org.ng" style="color: #305858;">info@ibmssp.org.ng</a>
      </p>
    `),
  };
}

function customTemplate(subject: string, htmlBody: string) {
  return {
    subject,
    html: emailWrapper(htmlBody),
  };
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      type, to, name, memberId, otp,
      amount, subject, headline, content,
      ctaText, ctaUrl, htmlBody
    } = body;

    if (!type || !to) {
      return new Response(JSON.stringify({ error: '"type" and "to" are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    let template: { subject: string; html: string };

    // ── Route by type ──────────────────────────────────────────────────────
    if (type === 'registration') {
      template = registrationTemplate(name || 'Member', memberId || 'N/A');

    } else if (type === 'otp') {
      if (!otp) throw new Error('"otp" is required for type=otp');

      // Store OTP in DB with 15-minute expiry
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

      await fetch(`${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(to)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey },
      });

      await fetch(`${supabaseUrl}/rest/v1/password_reset_otps`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email: to, otp, expires_at: expiresAt }),
      });

      template = otpTemplate(otp);

    } else if (type === 'verify_otp') {
      // OTP verification (no email sent, just DB check)
      if (!otp) throw new Error('"otp" is required for type=verify_otp');

      const lookupRes = await fetch(
        `${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(to)}&select=otp,expires_at`,
        { headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey } }
      );
      const records = await lookupRes.json();

      if (!records?.length) {
        return new Response(JSON.stringify({ error: 'No OTP found. Please request a new one.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (new Date(records[0].expires_at) < new Date()) {
        return new Response(JSON.stringify({ error: 'OTP has expired. Please request a new one.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (records[0].otp !== otp.trim()) {
        return new Response(JSON.stringify({ error: 'Incorrect OTP. Please check and try again.' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Delete OTP so it cannot be reused
      await fetch(`${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(to)}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey },
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else if (type === 'payment_confirmation') {
      template = paymentConfirmationTemplate(name || 'Member', memberId || 'N/A', amount || '');

    } else if (type === 'newsletter') {
      if (!subject || !headline || !content) throw new Error('"subject", "headline", and "content" are required for type=newsletter');
      template = newsletterTemplate(subject, headline, content, ctaText, ctaUrl);

    } else if (type === 'announcement') {
      if (!subject || !headline || !content) throw new Error('"subject", "headline", and "content" are required for type=announcement');
      template = announcementTemplate(subject, headline, content, ctaText, ctaUrl);

    } else if (type === 'custom') {
      if (!subject || !htmlBody) throw new Error('"subject" and "htmlBody" are required for type=custom');
      template = customTemplate(subject, htmlBody);

    } else {
      return new Response(JSON.stringify({ error: `Unknown email type: "${type}". Supported: registration, otp, verify_otp, payment_confirmation, newsletter, announcement, custom` }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── Send via SMTP ──────────────────────────────────────────────────────
    const smtpHost = Deno.env.get('SMTP_HOST') || 'mail.ibmssp.org.ng';
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '465');
    const smtpUser = Deno.env.get('SMTP_USER') || 'info@ibmssp.org.ng';
    const smtpPass = Deno.env.get('SMTP_PASS') || '';

    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: smtpPort === 465,
        auth: { username: smtpUser, password: smtpPass },
      },
    });

    // to can be a single email or a comma-separated list for broadcasts
    const recipients = typeof to === 'string' ? to.split(',').map((e: string) => e.trim()) : to;

    await client.send({
      from: `IBMSSP <${smtpUser}>`,
      to: recipients,
      subject: template.subject,
      html: template.html,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true, sent_to: recipients.length || 1 }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[send-email] error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
