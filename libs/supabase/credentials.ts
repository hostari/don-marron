export const getSupabaseCredentials = (): {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseAdminKey: string;
} => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseAdminKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !supabaseAdminKey) {
    throw new Error(
      "Supabase URL and Anon Key must be set in environment variables.",
    );
  }

  return { supabaseUrl, supabaseAnonKey, supabaseAdminKey };
};
