"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/libs/supabase/browser";
import "../sign-in/sign-in.css";
import { Divider } from "@/components/ui/divider";
import Header from "../_components/header";

export default function RegisterPage() {
  const router = useRouter();

  const supabase = createBrowserClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  useEffect(() => {
    setResetPassword(window.location.pathname.includes("reset-password"));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const urlParams = new URLSearchParams(window.location.hash.substring(1)); // Remove the leading #
      const accessToken = urlParams.get("access_token");
      const refreshToken = urlParams.get("refresh_token");

      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData?.user?.email);
    };

    fetchUser();
  }, []);

  const handelCreateAccount = async (e: any) => {
    e?.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setIsDisabled(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      await supabase
        .from("Members")
        .update({
          status: "active",
        })
        .eq("id", data?.user?.id)
        .throwOnError();

      console.log({ data, error });

      if (error) {
        throw error;
      }

      toast.success(`${resetPassword ? "Password reset" : "Registered!"}`);

      router.push("/member");
    } catch (error) {
      toast.error("Can't register");
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className="bg-image h-screen mx-0 flex">
        <div className="absolute w-full">
          <Header
            noLinks={true}
            useWhiteLogo={true}
            className="bg-transparent"
          />
        </div>
        <div className="text-white w-6/12 my-auto ml-auto">
          <h2 className="text-[40px]">
            {resetPassword ? "Reset Password" : "Create Account"}{" "}
            {email ? `- Set password for ${email}` : null}
          </h2>
          <Divider className="bg-white w-[100px]" />

          <form
            className="flex flex-col gap-y-4"
            onSubmit={handelCreateAccount}
          >
            <p>
              <input
                placeholder=""
                className="border-b border-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label className="text-white">Password</Label>
            </p>
            <p>
              <input
                placeholder=""
                className="border-b border-white"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Label className="text-white">Confirm Password</Label>
            </p>

            <Button className="w-[200px]" type="submit" disabled={isDisabled}>
              {resetPassword ? "Reset Password" : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
