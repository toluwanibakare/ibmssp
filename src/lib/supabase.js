import { createClient } from '@supabase/supabase-js';

// Prefer build-time env, fall back to a runtime window injection if available.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || (typeof window !== 'undefined' && window.__IBMSSP_SUPABASE_URL__) || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' && window.__IBMSSP_SUPABASE_ANON_KEY__) || '';

let client;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} else {
  // Prevent the runtime crash when envs are missing; provide a minimal stub.
  console.warn('Supabase configuration missing: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY not set. Supabase client disabled.');
  client = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
    },
  };
}

export const supabase = client;

/**
 * Dispatches email requests to the dedicated Node/Express email microservice if configured,
 * or falls back to the Supabase Edge Function.
 */
export async function callEdgeFunction(functionName, body) {
  const EMAIL_SERVICE_URL = import.meta.env.VITE_EMAIL_SERVICE_URL;

  // 1. If dedicated Express Node email service is configured, try it first
  if (EMAIL_SERVICE_URL && functionName === 'send-email') {
    try {
      const res = await fetch(`${EMAIL_SERVICE_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) return data;
    } catch (err) {
      console.warn('[Email Microservice Fallback]: Primary email service unreachable, falling back to Supabase Edge Function...', err);
    }
  }

  // 2. Supabase Edge Function fallback
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase configuration missing.');
  }

  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || SUPABASE_ANON_KEY;

  const res = await fetch(`${SUPABASE_URL}/functions/v1/${functionName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `Edge function error: ${res.status}`);
  return data;
}

export default supabase;
