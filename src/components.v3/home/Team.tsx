import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import React, { useState } from "react";
import TeamCard from "./TeamCard";
import Autoplay from "embla-carousel-autoplay";
import { usePrevNextButtons } from "@/components.v2/carousel";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import WeEatDrink from "./icons/WeEatDrink";

const teams = [
  {
    img: "/landing/dhiren_shah.png",
    social1: "",
    social2: "",
    name: "Dhiren Shah",
    designation: "Director & Co-Founder",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Experienced Investor:</strong> Over 30 years of active equity investing, successfully navigating
            multiple market cycles.
          </li>
          <li>
            <strong>Small-cap Specialist:</strong> Deep expertise in identifying and investing in promising small-cap
            stocks.
          </li>
          <li>
            <strong>Proven Business Acumen:</strong> Successfully manages established businesses in: E-Commerce,
            Distribution of technology products, and media & entertainment software.
          </li>
        </ul>
      </>
    ),
  },
  {
    img: "/landing/nitya_shah.png",
    social1: "",
    social2: "",
    name: "Nitya Shah",
    designation: "Director & Co-Founder",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Qualified Analyst:</strong> CFA Level 1 cleared, M.Com from Pune University, NISM RA certified.
            Currently pursuing MS Investment Management at Bayes Business School, London.
          </li>
          <li>
            <strong>Investment Experience:</strong> 5+ years in equity investing with a focus on fundamentals.
          </li>
          <li>
            <strong>Product & Research Expertise:</strong> 2 years in product development and research at a SEBI RIA
            firm.
          </li>
        </ul>
      </>
    ),
  },
  {
    img: "/landing/aniket_kulkarni.png",
    social1: "",
    social2: "",
    name: "Aniket Kulkarni",
    designation: "Director & Co-Founder",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Entrepreneurial Leader:</strong> 13+ years building businesses across sports, e-commerce, and
            internet sectors.
          </li>
          <li>
            <strong>Investment Experience:</strong> 9+ years of investing experience, including 5 years in deep-dive
            fundamental equity research with a focus on small-cap stocks.
          </li>
          <li>
            <strong>Product-Led Thinking:</strong> GrowthX alumnus, bringing a strong product mindset to investment
            research and digital innovation.
          </li>
        </ul>
      </>
    ),
  },
  {
    img: "/landing/manan_madlani.png",
    social1: "",
    social2: "",
    name: "Manan Madlani",
    designation: "Equity Research Analyst",
    description: (
      <>
        {" "}
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Strong Academic Foundation:</strong> B.Com in Advanced Accounting & Auditing, CFA Level 2 candidate.
          </li>
          <li>
            <strong>Certified Analyst:</strong> Holds the NISM Research Analyst Certification.
          </li>
          <li>
            <strong>Sector Specialist:</strong> 5+ years of equity research experience across Building Materials, BFSI,
            Textile, Consumer Staples, and Discretionary.
          </li>
        </ul>
      </>
    ),
  },
  {
    img: "/landing/pratik_kulkarni.png",
    social1: "",
    social2: "",
    name: "Pratik Kulkarni",
    designation: "Equity Research Analyst",
    description: (
      <>
        {" "}
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Equity Research Experience:</strong> 4+ years of fundamental research across Automobiles, Capital
            Goods, Chemicals, FMCG, and Engineering.
          </li>
          <li>
            <strong>Educational Background:</strong> B.Tech in Engineering and MBA, combining technical understanding
            with business fundamentals.
          </li>
        </ul>
      </>
    ),
  },
];

export default function Team() {
  const [api, setApi] = useState<CarouselApi>();
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(api);

  const handlePrevNext = (cb: () => void) => {
    cb();
  };

  return (
    <div className=" md:main-container">
      <div className=" pb-[38px] md:py-[50px] bg-[rgba(13,65,57,1)] open_sans px-5 md:px-[60px] md:rounded-t-xl">
        <p className=" text-[#FF9E29] font-bold text-center">TEAM</p>
        <h3 className=" text-display-md font-bold mt-[6px] mb-0 text-center text-white">Meet the team!</h3>
        <p className=" text-lg text-gray-150 mt-3 text-center">
          Meet our team of seasoned equity research analysts, trusted by clients worldwide for delivering value through
          a powerful blend of decades of experience and deep expertise.
        </p>
        <Carousel setApi={setApi} plugins={[Autoplay({ delay: 2000 })]} className=" mt-[38px] w-full">
          <CarouselContent className="">
            {teams.map((team) => (
              <CarouselItem key={team.name} className=" basis-auto">
                <TeamCard {...team} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="h-full -left-6 max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center ">
            <div>
              <ButtonnArrow
                onClick={() => handlePrevNext(onPrevButtonClick)}
                variant={ButtonVariant.custom}
                strokeStyle=" stroke-gray-950"
                className=" bg-white rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 "
              ></ButtonnArrow>
            </div>
          </div>
          <div className=" -right-6  h-full max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center">
            <div>
              <ButtonnArrow
                onClick={() => handlePrevNext(onNextButtonClick)}
                variant={ButtonVariant.custom}
                strokeStyle=" stroke-gray-950"
                className=" bg-white rounded-full h-6 w-6 md:h-[52px] md:w-[52px] min-w-0 md:!p-2 !px-4 !py-4 "
              ></ButtonnArrow>
            </div>
          </div>
        </Carousel>
      </div>
      <div className=" max-md:pb-[50px] flex px-5 md:p-[60px] pt-0 bg-[rgba(13,65,57,1)] md:rounded-b-xl justify-center">
        <WeEatDrink/>
      </div>
    </div>
  );
}
