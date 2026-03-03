import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a Supabase client if the required env vars are set,
 * or null otherwise — allowing the app to fall back to MDX-only data.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

/**
 * Server-side Supabase client (same as above for now; can be
 * extended with service-role key for admin operations later).
 */
export function getServerSupabaseClient(): SupabaseClient | null {
  return getSupabaseClient();
}
