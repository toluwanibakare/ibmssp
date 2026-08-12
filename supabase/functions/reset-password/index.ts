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
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return new Response(JSON.stringify({ error: 'email, otp and newPassword are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // 1) Verify OTP from password_reset_otps table
    const lookupRes = await fetch(
      `${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(email)}&select=otp,expires_at`,
      { headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey } }
    );

    const records = await lookupRes.json();
    if (!records || records.length === 0) {
      return new Response(JSON.stringify({ error: 'No OTP found. Please request a new one.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const record = records[0];
    if (new Date(record.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'OTP has expired. Please request a new one.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (record.otp !== otp.trim()) {
      return new Response(JSON.stringify({ error: 'Incorrect OTP. Please check and try again.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 2) Find user by email using the Admin API (service role key)
    // We'll use Supabase Admin endpoint to list users and match by email
    const usersRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey },
    });

    if (!usersRes.ok) {
      const txt = await usersRes.text();
      throw new Error(`Failed to query admin users: ${usersRes.status} ${txt}`);
    }

    const users = await usersRes.json();
    const user = users.find((u: any) => u.email === email);
    if (!user) {
      return new Response(JSON.stringify({ error: 'No user found with that email' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 3) Update user's password via Admin endpoint
    const updateRes = await fetch(`${supabaseUrl}/auth/v1/admin/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!updateRes.ok) {
      const txt = await updateRes.text();
      throw new Error(`Failed to update user password: ${updateRes.status} ${txt}`);
    }

    // 4) Delete used OTP so it cannot be reused
    await fetch(`${supabaseUrl}/rest/v1/password_reset_otps?email=eq.${encodeURIComponent(email)}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${supabaseServiceKey}`, 'apikey': supabaseServiceKey },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('[reset-password] error:', error);
    return new Response(JSON.stringify({ error: error.message || String(error) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
