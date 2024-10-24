"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/libs/supabase/browser";
import { Divider } from "@/components/ui/divider";
import Header from "../_components/header";
import "../sign-in/sign-in.css";

export default function ResetPasswordRequestPage() {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: any) => {
    e?.preventDefault();

    setIsLoading(true);

    try {
      const { data: user } = await supabase
        .from("Members")
        .select("email")
        .eq("email", email)
        .single();

      if (!user) {
        return toast.error("There's no associated member with this email");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/register`,
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent!");

      router.push("/sign-in");
    } catch (error) {
      toast.error("Error sending password reset email");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-image h-screen mx-0 flex flex-col md:flex-row">
        <div className="absolute w-full">
          <Header
            noLinks={true}
            useWhiteLogo={true}
            className="bg-transparent"
          />
        </div>
        <div className="text-white w-full md:w-6/12 my-auto ml-auto p-4 md:p-0">
          <h2 className="text-[30px] md:text-[40px] font-serif">
            Reset Password
          </h2>
          <Divider className="bg-white w-[100px]" />

          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleResetPassword}
          >
            <p>
              <input
                placeholder=""
                className="border-b border-white w-[300px]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label className="text-white">EMAIL ADDRESS</Label>
            </p>

            <Button
              className="w-full md:w-[145px]"
              type="submit"
              disabled={isLoading}
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
