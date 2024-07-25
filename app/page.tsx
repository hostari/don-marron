// @ts-ignore
import Header from "./_components/header";
import Image from "next/image";
import logo from "@/public/logo.png";
import "./landing-page.css";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        id="myVideo"
        className="w-full md:w-auto"
      >
        <source
          src="https://ficgpnsnuqnrabnvfqcv.supabase.co/storage/v1/object/public/videos/lp-video.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero">
        <div className="top-0 z-50 w-full fixed">
          <Header
            useWhiteLogo={true}
            isAuthenticated={false}
            noLinks={false}
            className="pb-[5rem]"
          />
        </div>
        <div className="w-full h-[100px] bg-[#3f2212] opacity-0 animate-fade-in transition-opacity duration-300 ease-in-out" />
        <div className="text-3xl md:text-4xl text-[#BDBDBD80] font-serif uppercase absolute z-50 top-[280px] flex w-[55%] justify-center items-center">
          <span>Exclusive</span>
          <span>&</span>
          <span>Craftsmanship</span>
        </div>
        <Image src={logo} alt="logo" className="w-full" />
        <div className="w-full h-[500px] bg-[#3f2212] opacity-0 animate-fade-in transition-opacity duration-300 ease-in-out relative bottom-[6px]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#BDBDBD80] text-3xl md:text-4xl font-serif uppercase pt-[11rem] px-2">
              Welcome to the world <br /> of don marrón
            </h1>
            <Divider className="bg-[#BDBDBD80] w-[170px]" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center pt-[11rem] h-screen animate-fade-in">
          <h1 className="text-white text-2xl font-serif">
            We connect you to a community <br /> that serves your ambition and
            style
          </h1>

          <Button className="mt-8">
            <Link href="/sign-up" className="uppercase w-[300px]">
              Apply for Membership
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-[60px] md:bottom-[40px] left-[15px] md:left-[50px] p-4">
          <Link
            href="/learn-more"
            className="text-white uppercase text-base md:text-xl"
          >
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
}
