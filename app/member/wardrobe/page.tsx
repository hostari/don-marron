import { redirect } from "next/navigation";
import { createServerClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function WardrobePage() {
  const supabase = createServerClient({ cookies });
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    redirect("/login");
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("files")
    .createSignedUrl(`${userData.user.id}/wardrobe.pdf`, 86_400);

  if (signedUrlError || !signedUrlData) {
    return (
      <div className="text-center">
        No wardrobe found. Please contact support if you believe this is an
        error. Go back to the <Link href="/member">member page</Link>.
      </div>
    );
  }

  redirect(signedUrlData.signedUrl);
}
