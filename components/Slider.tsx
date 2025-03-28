"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import arrowLeft from "@/public/arrow-left.svg";
import arrowRight from "@/public/arrow-right.svg";
import Link from "next/link";

interface Slide {
  title: string;
  description: string;
  backgroundColor: string;
  image: StaticImageData;
  buttonLink: string;
}

interface SliderProps {
  slides: Slide[];
}

export default function Slider({ slides }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const { title, description, backgroundColor, image, buttonLink } = slides[currentSlide];

  return (
    <div
      className={`bg-${backgroundColor} py-20 text-white flex justify-between flex-row`}
      style={{
        backgroundColor,
      }}
    >
      <Image
        src={arrowLeft}
        alt="arrow left"
        className="mx-3 md:mx-10 cursor-pointer"
        onClick={handlePrev}
      />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center w-full pr-6 md:w-1/2">
          <div className="flex flex-col justify-between h-full">
            <p className="uppercase tracking-[0.15em]">Latest Update</p>
            <div className="flex flex-col gap-[45px]">
              <span className="text-5xl">{title}</span>
              <p className="text-xl leading-9">{description}</p>
              <Link href={buttonLink}>
                <Button className="uppercase text-white border border-white w-full md:w-[225px]">
                  Find Out More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <Image src={image} alt="desk" />
        </div>
      </div>
      <Image
        src={arrowRight}
        alt="arrow right"
        className="mx-3 md:mx-10 cursor-pointer"
        onClick={handleNext}
      />
    </div>
  );
}
