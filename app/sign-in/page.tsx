"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/libs/supabase/browser";
import "./sign-in.css";
import { Divider } from "@/components/ui/divider";
import Header from "../_components/header";

export default function Page() {
  const router = useRouter();

  const supabase = createBrowserClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e?.preventDefault();

    setIsLoading(true);
    setIsDisabled(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Signing in!");

      router.push("/member");
    } catch (error) {
      toast.error("Invalid email or password");
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
          <Header noLinks={true} useWhiteLogo={true} />
        </div>
        <div className="text-white w-6/12 my-auto ml-auto">
          <h2 className="text-[40px]">Members Sign In</h2>
          <Divider className="bg-white w-[100px]" />

          <form className="flex flex-col gap-y-4" onSubmit={handleLogin}>
            <p>
              <input
                placeholder=""
                className="border-b border-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label className="text-white">EMAIL ADDRESS</Label>
            </p>

            <p>
              <input
                placeholder=""
                className="border-b border-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label className="text-white">PASSWORD</Label>
            </p>

            <Button className="w-[145px]" type="submit" disabled={isDisabled}>
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
