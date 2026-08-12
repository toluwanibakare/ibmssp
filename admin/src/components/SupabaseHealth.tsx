import React from 'react';

export default function SupabaseHealth() {
  const url = import.meta.env.VITE_SUPABASE_URL || (typeof window !== 'undefined' && (window as any).__IBMSSP_SUPABASE_URL__);
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' && (window as any).__IBMSSP_SUPABASE_ANON_KEY__);

  if (url && key) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-800">
      <strong>Supabase not configured:</strong> Admin features are disabled until environment variables are set.
      <div className="mt-1">
        Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to the shared deployment environment and redeploy.
      </div>
    </div>
  );
}
