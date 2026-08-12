// Re-export the root project's Supabase client so the admin app uses the same
// database configuration, auth session handling, and edge-function helper.
export { supabase, callEdgeFunction } from '../../../../src/lib/supabase.js';
export { supabase as default } from '../../../../src/lib/supabase.js';