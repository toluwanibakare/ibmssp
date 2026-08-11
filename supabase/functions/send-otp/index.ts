import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min expiry

    // Store OTP in Supabase database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Delete any existing OTP for this email
    await fetch(`${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
      },
    });

    // Insert new OTP
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/password_reset_otps`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email, otp, expires_at: expiresAt }),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      throw new Error(`Failed to store OTP: ${err}`);
    }

    // Send email via SMTP using Deno's fetch to a mail relay OR use the env-configured SMTP
    const smtpHost = Deno.env.get('SMTP_HOST') || 'mail.ibmssp.org.ng';
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '465');
    const smtpUser = Deno.env.get('SMTP_USER') || 'info@ibmssp.org.ng';
    const smtpPass = Deno.env.get('SMTP_PASS') || '';

    // Use the Resend or SMTP2Go fallback via fetch-based API
    // We'll use a raw SMTP approach via Deno's net
    const { SMTPClient } = await import('https://deno.land/x/denomailer@1.6.0/mod.ts');

    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: smtpPort === 465,
        auth: {
          username: smtpUser,
          password: smtpPass,
        },
      },
    });

    await client.send({
      from: `IBMSSP <${smtpUser}>`,
      to: email,
      subject: 'Your IBMSSP Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #305858; margin: 0;">IBMSSP</h2>
            <p style="color: #798382; font-size: 12px; margin: 5px 0;">Institute of Business Management Standards & Safety Professionals</p>
          </div>
          <div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center;">
            <h3 style="color: #1E1F1E; margin-top: 0;">Password Reset OTP</h3>
            <p style="color: #525656; margin-bottom: 20px;">Use the code below to reset your IBMSSP account password. This code expires in <strong>15 minutes</strong>.</p>
            <div style="background: #305858; color: white; font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 20px 30px; border-radius: 6px; display: inline-block;">
              ${otp}
            </div>
            <p style="color: #798382; font-size: 13px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #798382; font-size: 12px;">© ${new Date().getFullYear()} IBMSSP. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true, message: 'OTP sent successfully' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
