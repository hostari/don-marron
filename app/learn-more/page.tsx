import React from "react";
import Link from "next/link";
import Image from "next/image";
import { createServerClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/lp-text";
import { Divider } from "@/components/ui/divider";
import Header from "../_components/header";

import shelf from "@/public/shelf.png";
import podium from "@/public/podium.png";
import hero from "@/public/hero.png";
import sofa from "@/public/sofa.png";
import portrait from "@/public/portrait.png";
import books from "@/public/books.png";
import { benefits } from "./icons";
import { FAQ } from "./faq";

const LearnMorePage = async () => {
  const supabase = createServerClient({ cookies });
  const { data: content, error } = await supabase
    .from("LearnMoreContent")
    .select("*");
  const { data: faqData } = await supabase
    .from("FrequentlyAskedQuestions")
    .select("*");

  if (error) {
    console.error("Error fetching content:", error);
    return <div>Error loading content</div>;
  }

  return (
    <>
      <Header
        className="bg-[#ececeb]"
        noLinks={false}
        isAuthenticated={false}
      />
      <main className="text-black bg-[#ececeb]">
        <section className="h-auto md:h-screen">
          <Image
            src={
              content.find((item) => item.section === "hero")?.imageUrl || hero
            }
            alt="hero image"
            className="h-[200px] md:h-[60vh] w-full"
          />
          <p className="w-full text-gray uppercase text-xl md:text-2xl tracking-widest py-10 text-center">
            Find Out More About
          </p>
          <div className="flex flex-col md:flex-row w-full justify-center gap-y-4 md:gap-x-8 px-4 md:px-0">
            <Link href="#brand">
              <Button
                className="uppercase tracking-widest text-xl md:text-2xl w-full md:w-[360px]"
                size="xl"
                variant="outline"
              >
                Our Brand
              </Button>
            </Link>
            <Link href="#membership">
              <Button
                className="uppercase tracking-widest text-xl md:text-2xl w-full md:w-[360px]"
                size="xl"
                variant="outline"
              >
                Our Membership
              </Button>
            </Link>
          </div>
        </section>

        <div className="max-w-[1240px] mx-auto pt-[100px] md:pt-[180px]">
          <section id="brand" className="text-center pb-[200px] px-4 md:px-0">
            <h2 className="text-5xl md:text-6xl text-black font-serif">
              {content.find((item) => item.section === "brand")?.title ||
                "Our Brand"}
            </h2>
            <Divider className="w-[120px] mx-auto" />
            <Text>
              {content.find((item) => item.section === "brand")?.content || ""}
            </Text>
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <Image src={podium} alt="podium" />
              </div>
              <div>
                <Image src={shelf} alt="shelf" />
              </div>
            </div>
            <Text className="py-20">
              From exclusive events to services tailored for your needs, we
              promise the most unique membership and community.
            </Text>
            <Link href="/sign-up">
              <Button className="uppercase w-[300px]">
                Apply for Membership
              </Button>
            </Link>
          </section>

          <section
            id="membership"
            className="text-center pb-[200px] px-4 md:px-0"
          >
            <h2 className="text-5xl md:text-6xl text-black font-serif">
              {content.find((item) => item.section === "membership")?.title ||
                "Our Membership"}
            </h2>
            <Divider className="w-[120px] mx-auto" />
            <Text className="py-20">
              {content.find((item) => item.section === "membership")?.content ||
                ""}
            </Text>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <Image src={books} alt="books" className="w-full" />
              </div>
              <div className="w-full md:w-1/3">
                <Image src={sofa} alt="sofa" className="w-full" />
              </div>
              <div className="w-full md:w-1/3">
                <Image src={portrait} alt="portrait" className="w-full" />
              </div>
            </div>
            <Text className="py-20">
              We also offer several payment plan options, customization of our
              collection of Italian fabrics and leathers, exclusive member
              events, personalized travel experiences and an extra one-year
              guarantee on all our products.
            </Text>
          </section>
        </div>

        <section className="bg-[#212427] py-20 text-center">
          <h3 className="text-4xl text-white uppercase font-serif">
            {content.find((item) => item.section === "benefits")?.title ||
              "Member Benefits"}
          </h3>
          <Divider className="w-[120px] mx-auto bg-white" />
          <div className="max-w-[1240px] mx-auto flex flex-wrap gap-y-20 py-20">
            {benefits.map(({ icon, desc }, index) => {
              return (
                <div
                  key={index}
                  className={`w-1/2 md:w-1/4 flex flex-col justify-between items-center`}
                >
                  <Image
                    src={icon}
                    alt={desc}
                    width={100}
                    className="h-[100px]"
                  />
                  <p className="text-white text-lg w-[80%]">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="max-w-[1240px] mx-auto py-20 text-center px-4 md:px-0">
          <h3 className="text-4xl text-black uppercase font-bold tracking-widest">
            Ready to Apply?
          </h3>
          <Text className="py-20">
            At Don Marrón, we want our members to look and feel their absolute
            best while living life to the fullest. Let us fuss over you and
            perfect your look. It’s the crafted luxury you deserve.
          </Text>
          <Link href="/sign-up">
            <Button className="uppercase w-[300px]">
              Apply for Membership
            </Button>
          </Link>
        </section>

        <FAQ faqData={faqData} />
      </main>
    </>
  );
};

export default LearnMorePage;
