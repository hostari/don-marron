"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserClient } from "@/libs/supabase/browser";
import rusticLogo from "@/public/logo/primary/rustic.svg";
import whiteLogo from "@/public/logo/primary/white.svg";

interface HeaderProps {
  isAuthenticated?: boolean;
  noLinks?: boolean;
  useWhiteLogo?: boolean;
  className?: string;
}

const Header = ({
  isAuthenticated = false,
  noLinks = true,
  useWhiteLogo,
  className = "",
}: HeaderProps) => {
  const supabase = createBrowserClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div
      className={`w-full flex justify-center items-center py-5 px-10 ${className}`}
    >
      <div className="flex items-center">
        <Image
          alt="logo"
          src={useWhiteLogo ? whiteLogo : rusticLogo}
          className="w-[45px] text-[#212427]"
        />
      </div>

      {isAuthenticated && (
        <Link href="#" onClick={signOut} className="absolute right-10">
          SIGN OUT
        </Link>
      )}

      {!isAuthenticated && !noLinks && (
        <div className={`absolute right-10 flex gap-4 ${useWhiteLogo ? "text-white" : "text-[#212427]"}`}>
          <Link href="/sign-in">SIGN IN</Link>
          <Link href="/sign-up">MEMBERSHIP</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
