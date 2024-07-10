import { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient as browserFn } from "@supabase/ssr";
import { getSupabaseCredentials } from "./credentials";
import { Database } from "@/lib/types/database";

export const createBrowserClient = (): SupabaseClient<Database> => {
  const { supabaseUrl, supabaseAnonKey, supabaseAdminKey } =
    getSupabaseCredentials();

  return browserFn(supabaseUrl, supabaseAdminKey);
};
