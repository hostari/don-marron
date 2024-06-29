import { getSupabaseCredentials } from "./credentials";
import { cookies as nextCookies } from "next/dist/client/components/headers";
import { SupabaseClient } from "@supabase/supabase-js";
import { CookieOptions, createServerClient as serverFn } from "@supabase/ssr";
import { Database } from "@/lib/types/database";

export const createServerClient = <T = Database>({
  cookies,
}: {
  cookies: typeof nextCookies;
}): SupabaseClient<T> => {
  const cookieStore = cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials();

  return serverFn<T>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
    },
  });
};
