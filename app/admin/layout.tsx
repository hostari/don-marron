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
  const { data: memberData } = await supabase
    .from("Members")
    .select("role")
    .eq("email", user.email)
    .single();

  if (memberData?.role !== "admin") {
    redirect("/member");
  }

  return (
    <div className="">
      <Header isAuthenticated={true} />
      {children}
    </div>
  );
}
