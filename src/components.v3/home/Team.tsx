import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import React, { useState } from "react";
import TeamCard from "./TeamCard";
import Autoplay from "embla-carousel-autoplay";
import { usePrevNextButtons } from "@/components.v2/carousel";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import WeEatDrink from "./icons/WeEatDrink";
import { useMediaQuery } from "@mui/material";

const desktopTeams = [
  {
    img: "/landing/dhiren_shah.png",
    social1: "https://x.com/dhirenshah64",
    social2: "https://www.linkedin.com/in/dhiren-shah-2b34771/",
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
    social2: "https://www.linkedin.com/in/nitya-shah-25ba53187/",
    social1: "https://x.com/NityaShah2000",
    name: "Nitya Shah",
    designation: "Director & Co-Founder",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Qualified Analyst:</strong> Graduated with merit in Msc Investment Management from Bayes Business
            School, London (Cass), CFA Level 1 cleared, M.Com from Pune University and cleared NISM RA and PMS exams.
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
  // {
  //   img: "/landing/aniket_kulkarni.png",
  //   social1: "https://x.com/smallcaphunter9",
  //   social2: "https://www.linkedin.com/in/aniket-kulkarni-equity-research/",
  //   name: "Aniket Kulkarni",
  //   designation: "Director & Co-Founder",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Entrepreneurial Leader:</strong> 13+ years building businesses across sports, e-commerce, and
  //           internet sectors.
  //         </li>
  //         <li>
  //           <strong>Investment Experience:</strong> 9+ years of investing experience, including 5 years in deep-dive
  //           fundamental equity research with a focus on small-cap stocks.
  //         </li>
  //         <li>
  //           <strong>Product-Led Thinking:</strong> GrowthX alumnus, bringing a strong product mindset to investment
  //           research and digital innovation.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   img: "/landing/prasad_heda.png",
  //   social1: "",
  //   social2: "https://www.linkedin.com/in/prasad-heda-4196a8b0/",
  //   name: "Prasad Heda",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Investment Experience:</strong> Seven years of portfolio management and research experience across
  //           Portfolio Management Companies and Family Offices and over the years has developed acumen in deep research
  //           combined with on ground insights.
  //         </li>
  //         <li>
  //           <strong>Overall Experience:</strong> Has also worked in domains like Statutory Audits, IT systems Audits
  //           with reputed Indian companies.
  //         </li>
  //         <li>
  //           <strong>Academic Background:</strong> Chartered Accountant, B.Com graduate and cleared CFA L-II.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   img: "/landing/yash_naik.png",
  //   social1: "",
  //   social2: "https://www.linkedin.com/in/yash-naik-cfal2/",
  //   name: "Yash Naik",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Public Markets Investor:</strong> Over three years of experience in small and micro-cap equities,
  //           driven by a rigorous bottom-up investment approach.
  //         </li>
  //         <li>
  //           <strong>Qualified Analyst:</strong> CFA Level III cleared, B.Tech in Information Technology, and NISM
  //           Research Analyst certified.
  //         </li>
  //         <li>
  //           <strong>Investment Research Expertise:</strong> More than a year of experience in equity research and
  //           analysis, backed by a strong analytical and technical foundation from prior IT experience.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  {
    img: "/landing/raghav_maheshwari.png",
    social1: "",
    social2: "https://www.linkedin.com/in/raghav-maheswari-583391187/",
    name: "Raghav Maheswari",
    designation: "Equity Research Analyst",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Public Markets Investor:</strong> Two years of experience in equity investing, driven by a
            specialization in Economics, Research, and Statistics.
          </li>
          <li>
            <strong>Academic Background:</strong> BSc in Economics (Hons.) and currently pursuing the CFA program.
          </li>
          <li>
            <strong>Strategic Experience:</strong> A year of experience in Mergers & Acquisitions at Franchise India,
            backed by a strong foundation in economic analysis.
          </li>
        </ul>
      </>
    ),
  },

  // {
  //   img: "/landing/manan_madlani.png",
  //   social1: "https://x.com/MadlaniManan",
  //   social2: "https://www.linkedin.com/in/mananmadlani1999/",
  //   name: "Manan Madlani",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       {" "}
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Strong Academic Foundation:</strong> B.Com in Advanced Accounting & Auditing, CFA Level 2 candidate.
  //         </li>
  //         <li>
  //           <strong>Certified Analyst:</strong> Holds the NISM Research Analyst Certification.
  //         </li>
  //         <li>
  //           <strong>Sector Specialist:</strong> 5+ years of equity research experience across Building Materials, BFSI,
  //           Textile, Consumer Staples, and Discretionary.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   img: "/landing/pratik_kulkarni.png",
  //   social1: "",
  //   social2: "https://www.linkedin.com/in/pratik-kulkarni-9ba636148/",
  //   name: "Pratik Kulkarni",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       {" "}
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Equity Research Experience:</strong> 4+ years of fundamental research across Automobiles, Capital
  //           Goods, Chemicals, FMCG, and Engineering.
  //         </li>
  //         <li>
  //           <strong>Educational Background:</strong> B.Tech in Engineering and MBA, combining technical understanding
  //           with business fundamentals.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
];

const mobileTeams = [
  {
    img: "/landing/dhiren_shah.png",
    social1: "https://x.com/dhirenshah64",
    social2: "https://www.linkedin.com/in/dhiren-shah-2b34771/",
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
    social2: "https://www.linkedin.com/in/nitya-shah-25ba53187/",
    social1: "https://x.com/NityaShah2000",
    name: "Nitya Shah",
    designation: "Director & Co-Founder",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Qualified Analyst:</strong> Graduated with merit in Msc Investment Management from Bayes Business
            School, London (Cass), CFA Level 1 cleared, M.Com from Pune University and cleared NISM RA and PMS exams.
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
  // {
  //   img: "/landing/aniket_kulkarni.png",
  //   social1: "https://x.com/smallcaphunter9",
  //   social2: "https://www.linkedin.com/in/aniket-kulkarni-equity-research/",
  //   name: "Aniket Kulkarni",
  //   designation: "Director & Co-Founder",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Entrepreneurial Leader:</strong> 13+ years building businesses across sports, e-commerce, and
  //           internet sectors.
  //         </li>
  //         <li>
  //           <strong>Investment Experience:</strong> 9+ years of investing experience, including 5 years in deep-dive
  //           fundamental equity research with a focus on small-cap stocks.
  //         </li>
  //         <li>
  //           <strong>Product-Led Thinking:</strong> GrowthX alumnus, bringing a strong product mindset to investment
  //           research and digital innovation.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   img: "/landing/prasad_heda.png",
  //   social1: "",
  //   social2: "https://www.linkedin.com/in/prasad-heda-4196a8b0/",
  //   name: "Prasad Heda",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Investment Experience:</strong> Seven years of portfolio management and research experience across
  //           Portfolio Management Companies and Family Offices and over the years has developed acumen in deep research
  //           combined with on ground insights.
  //         </li>
  //         <li>
  //           <strong>Overall Experience:</strong> Has also worked in domains like Statutory Audits, IT systems Audits
  //           with reputed Indian companies.
  //         </li>
  //         <li>
  //           <strong>Academic Background:</strong> Chartered Accountant, B.Com graduate and cleared CFA L-II.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   img: "/landing/yash_naik.png",
  //   social1: "",
  //   social2: "https://www.linkedin.com/in/yash-naik-cfal2/",
  //   name: "Yash Naik",
  //   designation: "Equity Research Analyst",
  //   description: (
  //     <>
  //       <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
  //         <li>
  //           <strong>Public Markets Investor:</strong> Over three years of experience in small and micro-cap equities,
  //           driven by a rigorous bottom-up investment approach.
  //         </li>
  //         <li>
  //           <strong>Qualified Analyst:</strong> CFA Level III cleared, B.Tech in Information Technology, and NISM
  //           Research Analyst certified.
  //         </li>
  //         <li>
  //           <strong>Investment Research Expertise:</strong> More than a year of experience in equity research and
  //           analysis, backed by a strong analytical and technical foundation from prior IT experience.
  //         </li>
  //       </ul>
  //     </>
  //   ),
  // },
  {
    img: "/landing/raghav_maheshwari.png",
    social1: "",
    social2: "https://www.linkedin.com/in/raghav-maheswari-583391187/",
    name: "Raghav Maheswari",
    designation: "Equity Research Analyst",
    description: (
      <>
        <ul className="list-disc space-y-2 [&_*]:text-[14px] [&_strong]:font-bold [&_*]:leading-[150%]">
          <li>
            <strong>Public Markets Investor:</strong> Two years of experience in equity investing, driven by a
            specialization in Economics, Research, and Statistics.
          </li>
          <li>
            <strong>Academic Background:</strong> BSc in Economics (Hons.) and currently pursuing the CFA program.
          </li>
          <li>
            <strong>Strategic Experience:</strong> A year of experience in Mergers & Acquisitions at Franchise India,
            backed by a strong foundation in economic analysis.
          </li>
        </ul>
      </>
    ),
  },
];

export default function Team() {
  const [api, setApi] = useState<CarouselApi>();
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(api);
  const isMobile = useMediaQuery("(max-width: 1078px)");
  const teams = isMobile ? mobileTeams : desktopTeams;
  const handlePrevNext = (cb: () => void) => {
    cb();
  };

  return (
    <div className=" md:main-container max-md:bg-[rgba(13,65,57,1)] pt-[50px] sm:pt-[100px]">
      <div className=" pb-[38px] pt-[50px] md:py-[50px] bg-[rgba(13,65,57,1)] open_sans px-5 md:px-[60px] md:rounded-t-[28px]">
        <p className=" text-[#FF9E29] font-bold text-center">LEADERSHIP TEAM</p>
        <h3 className=" text-display-md font-bold mt-[6px] mb-0 text-center text-white">
          Meet the <span className=" open_sans_italic">team</span>!
        </h3>
        <p className=" text-lg text-gray-150 mt-3 text-center">
          Meet our team, trusted by clients worldwide for delivering value through a powerful blend of decades of
          experience and deep expertise.
        </p>
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]}
          className=" mt-[38px] md:max-w-[100%]  xl:max-w-[85%] lg:mx-auto "
        >
          {/* desktop */}
          <CarouselContent className={`${!isMobile ? "" : ""}`}>
            {teams.map((team, index) => (
              <CarouselItem key={team.img + index} className={"  basis-1/3 max-md:basis-auto "}>
                <TeamCard {...team} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div
            className={`${isMobile ? "flex" : "flex"
              }  h-full -left-6 max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center pl-4 md:px-0 `}
          >
            <div>
              <ButtonnArrow
                onClick={() => handlePrevNext(onPrevButtonClick)}
                variant={ButtonVariant.custom}
                strokeStyle=" stroke-gray-950"
                className=" bg-white rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 "
              ></ButtonnArrow>
            </div>
          </div>
          <div
            className={`${isMobile ? "flex" : "flex"
              }  -right-6 lg:-right-[12px]  h-full max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center pr-4 md:px-0`}
          >
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
      <div className=" max-md:pb-[50px] flex px-5 md:p-[60px] pt-0 md:pt-0 bg-[rgba(13,65,57,1)] md:rounded-b-[28px] justify-center">
        <WeEatDrink />
      </div>
    </div>
  );
}
