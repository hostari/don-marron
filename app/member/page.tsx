import { Button } from "@/components/ui/button";
import Image from "next/image";
import { features } from "./features";
import { Divider } from "@/components/ui/divider";
import arrowLeft from "@/public/arrow-left.svg";
import arrowRight from "@/public/arrow-right.svg";
import desk from "@/public/desk.png";

export default async function Dashboard() {
  return (
    <main className="">
      <div className="pb-30 text-center">
        <p className="text-2xl tracking-[0.15em] py-10 uppercase">
          Members Lounge
        </p>
        <h1 className="text-6xl">Welcome John!</h1>
        <Divider className="w-[120px] mx-auto" />
      </div>
      <div className="max-w-[1240px] mx-auto flex gap-3 pb-30">
        {features.map((feat) => {
          return (
            <div
              key={feat.description}
              className="flex flex-col items-center justify-center"
            >
              <Image src={feat.image} alt={feat.description} />
              <p>{feat.description}</p>
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
