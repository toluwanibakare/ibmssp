import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const { name, email, password, role, permissions } = body;

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: '"name", "email", and "password" are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authHeaders = {
      'Authorization': `Bearer ${serviceKey}`,
      'apikey': serviceKey,
      'Content-Type': 'application/json',
    };

    // 1. Create the user WITHOUT creating a session (admin API, service role).
    const createRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { name, full_name: name },
      }),
    });

    const created = await createRes.json();
    if (!createRes.ok) {
      throw new Error(created.msg || created.message || `Create user failed: ${createRes.status}`);
    }

    const userId = created.id;

    // 2. Insert profile (service role bypasses RLS).
    await fetch(`${supabaseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: { ...authHeaders, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ id: userId, email, name }),
    });

    // 3. Insert role + permissions.
    const insertedRoles = typeof role === 'string' && role.length ? [role] : (Array.isArray(role) ? role : ['editor']);
    const permList = Array.isArray(permissions) ? permissions : [];

    for (const r of insertedRoles) {
      await fetch(`${supabaseUrl}/rest/v1/user_roles`, {
        method: 'POST',
        headers: { ...authHeaders, 'Prefer': 'return=minimal' },
        body: JSON.stringify({ user_id: userId, role: r, permissions: permList }),
      });
    }

    return new Response(JSON.stringify({ success: true, user_id: userId }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[create-admin-user] error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});