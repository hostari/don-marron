// @ts-ignore
import Header from "./_components/header";
import "./landing-page.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <video
        playsInline
        autoPlay
        muted
        loop
        id="myVideo"
        className="w-full md:w-auto"
        preload="auto"
      >
        <source
          src="https://ficgpnsnuqnrabnvfqcv.supabase.co/storage/v1/object/public/videos/lp-video-20250115.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero">
        <div className="top-0 z-50 w-full fixed">
          <Header
            useWhiteLogo={true}
            isAuthenticated={false}
            noLinks={false}
            className="pb-[5rem] bg-transparent"
          />
        </div>

        <div className="flex flex-col justify-center items-center pt-[11rem] h-screen animate-fade-in">
        </div>

        <div className="absolute bottom-[60px] md:bottom-[40px] w-full px-[15px] md:px-[50px]">
          <div className="flex justify-between items-center">
            <Link
              href="/learn-more"
              className="text-white uppercase text-base md:text-xl"
            >
              Learn More
            </Link>
            <Button>
              <Link href="/sign-up" className="uppercase">
                Apply for Membership
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
