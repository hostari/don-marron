import { getSupabaseCredentials } from "./credentials";
import { cookies as nextCookies } from "next/dist/client/components/headers";
import { SupabaseClient } from "@supabase/supabase-js";
import { CookieOptions, createServerClient as serverFn } from "@supabase/ssr";

export const createServerClient = <T = any>({
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

export const createRouteHandlerClient = <T = any>({
  cookies,
}: {
  cookies: typeof nextCookies;
}): SupabaseClient<T> => {
  const cookieStore = cookies();
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials();

  return serverFn<T>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set({ name, value: "", ...options });
      },
    },
  });
};
