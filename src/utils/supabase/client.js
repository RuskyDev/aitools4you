import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isServer = typeof window === "undefined";

export const supabase = createClient(
  supabaseUrl,
  isServer ? serviceRoleKey : anonKey
);
