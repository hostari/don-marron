import { Button } from "@/components/ui/button";
import Image from "next/image";
import { features } from "./features";
import { Divider } from "@/components/ui/divider";
import arrowLeft from "@/public/arrow-left.svg";
import arrowRight from "@/public/arrow-right.svg";
import desk from "@/public/desk.png";
import { createServerClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import config from "@/config";

export default async function Dashboard() {
  const supabase = createServerClient({ cookies });
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    redirect(config.auth.loginUrl);
  }

  const { data: memberData } = await supabase.from("Members").select("*").eq("email", userData.user.email).single();

  return (
    <main className="">
      <div className="pb-30 text-center">
        <p className="text-2xl tracking-[0.15em] py-10 uppercase">
          Members Lounge
        </p>
        <h1 className="text-6xl">Welcome{memberData?.firstName ? `, ${memberData.firstName}!` : null}</h1>
        <Divider className="w-[120px] mx-auto" />
      </div>
      <div className="max-w-[1240px] mx-auto flex gap-3 pb-30">
        {features.map((feat) => {
          return (
            <div
              key={feat.description}
              className="relative flex flex-col items-center justify-center w-full flex-1 hover:bg-blend-color-dodge transition-all duration-300 cursor-pointer"
              style={{ 
                background: `linear-gradient(180deg, #000000 49.38%, rgba(102, 102, 102, 0) 124.3%), url(${feat.image.src})`,
                height: 'calc(100vw / 3)',
                maxHeight: '500px', 
                minHeight: '200px',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between flex-col py-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="w-[40px] h-[40px]">
                  <Image src={feat.icon} alt={`${feat.description} icon`} />
                </div>
                <p className="text-white text-2xl uppercase tracking-widest ">{feat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-brown py-20 text-white flex justify-between">
        <Image src={arrowLeft} alt="arrow left" className="mx-10" />
        <div className="flex flex-col items-center justify-center w-1/2 pr-6">
          <div className="flex flex-col justify-between h-full">
            <p className="uppercase tracking-[0.15em]">Latest Update</p>
            <div className="flex flex-col gap-[45px]">
              <span className="text-5xl">First Members Meet Up</span>
              <p className="text-xl leading-9">
                Join your fellow Don Marrón members for dinner, drinks and a
                distinguished evening at _____ on ______. The only thing you
                must worry about is looking good and showing up, and we already
                took care of the first part.
              </p>
              <Button className="uppercase text-white border border-white w-[225px]">
                Find Out More
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Image src={desk} alt="desk" />
        </div>
        <Image src={arrowRight} alt="arrow right" className="mx-10" />
      </div>
    </main>
  );
}
