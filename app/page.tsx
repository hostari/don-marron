// @ts-ignore
import BackgroundVideo from "next-video/background-video";
// @ts-ignore
import backgroundVideo from "https://ficgpnsnuqnrabnvfqcv.supabase.co/storage/v1/object/public/videos/lp-video.mp4";
import Header from "./_components/header";
import whiteLogo from "@/public/logo/primary/white.svg";
import lpClip from "@/public/logo/primary/lp-clip.svg";
import Image from "next/image";
import "./landing-page.css";

export default function LandingPage() {
  return (
    // <BackgroundVideo src={backgroundVideo} className="h-[1700px]">
    //   <div className="absolute w-full z-10">
    //     <Header useWhiteLogo={true} />
    //     <Image src={whiteLogo} alt="logo" className="w-full" />
    //   </div>
    // </BackgroundVideo>
    // <>
    //   <div className="canvas">
    //     <div className="clip">sadf</div>
    //   </div>
    //    <svg
    //      viewBox="429.84000000000003 341.28000000000003 241.92000000000002 241.92000000000002"
    //      xmlns="http://www.w3.org/2000/svg"
    //      data-name="Layer 1"
    //      id="Layer_1"
    //      width="100%"
    //      height="100%"
    //      preserveAspectRatio="xMidYMid meet"
    //    >
    //      <clipPath id="overlay" clipPathUnits="objectBoundingBox">
    //      <path
    //        d="m436.59,349.45v224.44h39.99s20.77-.02,20.77-.02c28.66,0,38.29-29.7,38.29-93.32s-9.05-90.95-37.86-90.95h-21.35v170.11s-25.66,0-25.66,0v-196.09h195.82v196.09h-25.46v-170.11s-21.34,0-21.34,0c-28.8,0-37.86,28.39-37.86,90.95s9.63,93.32,38.29,93.32l20.91.02h0s39.64,0,39.64,0v-224.44h-224.17Z"
    //        className="cls-1"
    //      />
    //      </clipPath>
    //    </svg>
    // </>

    // <div className="bg-brown h-screen">
    <div className="">
      <video
        disablePictureInPicture
        muted
        loop
        autoPlay
        className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden clipped-video"
      >
        <source src="https://ficgpnsnuqnrabnvfqcv.supabase.co/storage/v1/object/public/videos/lp-video.mp4" />
      </video>

      <svg
        viewBox="429.84000000000003 341.28000000000003 241.92000000000002 241.92000000000002"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        id="Layer_1"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* <clipPath id="overlay" clipPathUnits="objectBoundingBox" > */}
          <path
            d="m436.59,349.45v224.44h39.99s20.77-.02,20.77-.02c28.66,0,38.29-29.7,38.29-93.32s-9.05-90.95-37.86-90.95h-21.35v170.11s-25.66,0-25.66,0v-196.09h195.82v196.09h-25.46v-170.11s-21.34,0-21.34,0c-28.8,0-37.86,28.39-37.86,90.95s9.63,93.32,38.29,93.32l20.91.02h0s39.64,0,39.64,0v-224.44h-224.17Z"
            className="cls-1"
          />
        {/* </clipPath> */}
      </svg>

      {/* <svg
        viewBox="429.84000000000003 341.28000000000003 241.92000000000002 241.92000000000002"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        id="Layer_1"
        width="241.92000000000002"
        height="241.92000000000002"
      >
        <clipPath id="overlay">
          <path
            d="m436.59,349.45v224.44h39.99s20.77-.02,20.77-.02c28.66,0,38.29-29.7,38.29-93.32s-9.05-90.95-37.86-90.95h-21.35v170.11s-25.66,0-25.66,0v-196.09h195.82v196.09h-25.46v-170.11s-21.34,0-21.34,0c-28.8,0-37.86,28.39-37.86,90.95s9.63,93.32,38.29,93.32l20.91.02h0s39.64,0,39.64,0v-224.44h-224.17Z"
            className="cls-1"
          />
        </clipPath>
      </svg> */}
    </div>
  );
}
