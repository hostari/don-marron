import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createCheckout } from "@/libs/stripe";
import { Database } from "@/lib/types/database";
import { User } from "@/lib/types/models";

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
// Users must be authenticated. It will prefill the Checkout data with their email and/or credit card (if any)
export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // User who are not logged in can't make a purchase
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase." },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { priceId, mode, successUrl, cancelUrl } = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    } else if (!successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Success and cancel URLs are required" },
        { status: 400 },
      );
    } else if (!body.mode) {
      return NextResponse.json(
        {
          error:
            "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
        },
        { status: 400 },
      );
    }
    // Search for a profile with unique ID equals to the user session ID (in table called 'profiles')
    const { data } = await supabase
      .from("Members")
      .select("*")
      .eq("id", session?.user?.id)
      .single<User>();

    console.log({ data });

    // If no profile found, create one. This is used to store the Stripe customer ID
    if (!data) {
      return NextResponse.json(
        {
          error: "No user found",
        },
        { status: 400 },
      );
    }
    await supabase
      .from("Members")
      .update({
        priceId: body.priceId,
      })
      .eq("id", session?.user?.id);

    const stripeSessionURL = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      clientReferenceId: session.user.id,
      user: {
        email: session?.user?.email,
        // If the user has already purchased, it will automatically prefill it's credit card
        customerId: data?.customerId,
      },
      // If you send coupons from the frontend, you can pass it here
      // couponId: body.couponId,
    });

    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
