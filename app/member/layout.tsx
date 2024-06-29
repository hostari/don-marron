import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import config from "@/config";
import Header from "../_components/header";
import { createServerClient } from "@/libs/supabase/server";

export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }

  return (
    <div className="">
      <Header isAuthenticated={true} />
      {children}
    </div>
  );
}
