// Thin wrapper to re-export the main project's Supabase helpers for the admin app.
// This allows admin code to import `@/lib/supabase` while keeping a single client implementation.
import { supabase, callEdgeFunction } from '../../../src/lib/supabase.js';

export { supabase, callEdgeFunction };

export default supabase;
