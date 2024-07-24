"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/libs/supabase/browser";
import { stripe } from "@/libs/stripe";

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

      const { data: member } = await supabase
        .from("Members")
        .select("*")
        .eq("id", user.id)
        .single()
        .throwOnError();

      const invoices = await stripe.invoices.list({
        customer: member.customerId,
      });
      const openInvoice = invoices.data.find(
        (invoice) => invoice.status === "open",
      );

      if (!openInvoice) {
        throw new Error("No open invoice found");
      }
      router.push(openInvoice.hosted_invoice_url);
    };

    initiatePayment();
  }, [router, supabase]);

  return <div>Loading...</div>;
}
