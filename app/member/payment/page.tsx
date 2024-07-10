"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api";
import config from "@/config";
import { createBrowserClient } from "@/libs/supabase/browser";

export default function PaymentsPage() {
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    const initiatePayment = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        await supabase.auth.signOut();
        router.push(process.env.NEXT_PUBLIC_APP_URL);
        return;
      }

      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-checkout",
        {
          priceId: config.stripe.plans[0].priceId,
          successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/member`,
          cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/member`,
          mode: "payment",
        },
      );

      router.push(url);
    };

    initiatePayment();
  }, [router, supabase]);

  return <div>Loading...</div>;
}
