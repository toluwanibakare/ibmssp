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
 * Calls a Supabase Edge Function with the anon key always present in headers.
 * Throws a clear error if Supabase is not configured.
 */
export async function callEdgeFunction(functionName, body) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment.');
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
