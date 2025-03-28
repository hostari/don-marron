import Image from "next/image";
import { features } from "./features";
import { Divider } from "@/components/ui/divider";
import desk from "@/public/desk.png";
import livingRoom from "@/public/living-room.png";
import vase from "@/public/vase.png";
import { createServerClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import config from "@/config";
import Slider from "@/components/Slider";
import Link from "next/link";

export default async function MemberPage() {
  const supabase = createServerClient({ cookies });
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    redirect(config.auth.loginUrl);
  }

  const { data: memberData } = await supabase
    .from("Members")
    .select("*")
    .eq("email", userData.user.email)
    .single();


  const images = [desk, livingRoom, vase];

  const { data: slidesData, error: slidesError } = await supabase
    .from("MemberPageCarousel")
    .select("*");

  if (slidesError) {
    console.error("Error fetching slides:", slidesError);
  }

  console.log(slidesData);

  const slides = slidesData.map((slide, index) => ({
    title: slide.title,
    description: slide.description,
    backgroundColor: slide.backgroundColor,
    buttonLink: slide.buttonLink,
    image: images[index % images.length],
  }));

  return (
    <main className="bg-[#ececeb]">
      <div>
        <div className="pb-7 text-center">
          <p className="text-2xl tracking-[0.15em] pb-5 uppercase">
            Members Lounge
          </p>
          <h1 className="text-6xl font-serif">
            Welcome{memberData?.firstName ? `, ${memberData.firstName}!` : null}
          </h1>
          <Divider className="w-[120px] mx-auto" />
        </div>
        <div className="max-w-[1240px] mx-auto flex flex-wrap gap-3 pb-30">
          {features.map((feat) => {
            return (
              <Link
                key={feat.description}
                href={feat.href}
                className="relative flex flex-col items-center justify-center w-full md:flex-1 hover:bg-blend-color-dodge transition-all duration-300"
                style={{
                  background: `linear-gradient(180deg, #000000 49.38%, rgba(102, 102, 102, 0) 124.3%), url(${feat.image.src})`,
                  height: "calc(100vw / 3.5)",
                  maxHeight: "500px",
                  minHeight: "200px",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-between flex-col py-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-[40px] h-[40px]">
                    <Image src={feat.icon} alt={`${feat.description} icon`} />
                  </div>
                  <p className="text-white text-2xl uppercase tracking-widest ">
                    {feat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Slider slides={slides || []} />
    </main>
  );
}
