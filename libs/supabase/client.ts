import { Database } from "@/lib/types/database";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseCredentials } from "./credentials";

const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
