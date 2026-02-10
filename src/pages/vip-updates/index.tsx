import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "@/components.v2/navbar";
import { getQuarterlyUpdates } from "../../api/vip-updates/index";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "@/components.v2/footer";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, useMediaQuery } from "@mui/material";
import AuthContext from "@/components/AuthContext";
import { Button, ButtonVariant } from "@/components.v2/button/button";
import { Button as SButton } from "@/components.v2/ui/button";
import { useActivePlanContext } from "@/components/PlanContext";
import ElevateSection from "../stock-picks/components/ElevateSection";
import Head from "next/head";
const QUARTERS = ["Q4", "Q3", "Q2", "Q1"];

export default function Page() {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 3 });
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const { activePlan } = useActivePlanContext();
  const {
    data: quarterlyUpdates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quarterlyUpdates", pagination, isLoggedIn, activePlan.plan],
    queryFn: () => getQuarterlyUpdates(pagination, isLoggedIn, activePlan.plan),
    select: (responseData) => {
      const data = responseData?.data || {};
      const pagination = responseData?.pagination || {};
      setHasNext(pagination.has_next);
      setHasPrevious(pagination.has_previous);
      const yearsArray = Object.keys(data);
      setYears(yearsArray.reverse());

      const formattedData = QUARTERS.flatMap((quarter) =>
        yearsArray.map((year) => ({
          [`${quarter}_${year}`]: Object.values(data[year] || []).filter((item) => item?.quarter === quarter),
        }))
      );
      return formattedData;
    },
  });
  const isMobile = useMediaQuery("(max-width:640px)");
  const isTab = useMediaQuery("(max-width:1024px)");
  const [years, setYears] = useState<Array<null | string>>([]);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const nextPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };

  const previousPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }));
  };

  useEffect(() => {
    if (isMobile) {
      setPagination({ pageIndex: 1, pageSize: 1 });
    } else if (isTab) {
      setPagination({ pageIndex: 1, pageSize: 2 });
    } else {
      setPagination({ pageIndex: 1, pageSize: 3 });
    }
  }, [isMobile, isTab]);

  return (
    <main className="open_sans bg-gray-50 bg-[length:100vw] bg-no-repeat bg-[top_center]">
      <Head>
        <title>Kamayakya VIP Updates - Today's Small Cap Stock Insights</title>
        <meta
          name="description"
          content="Access exclusive VIP updates with small cap stocks to buy today. Get timely research, alerts, and actionable insights to stay ahead of market opportunities."
        />
        <meta
          property="og:title"
          content="Kamayakya VIP Updates - Today's Small Cap Stock Insights"
        />
        <meta
          property="og:description"
          content="Access exclusive VIP updates with small cap stocks to buy today. Get timely research, alerts, and actionable insights to stay ahead of market opportunities."
        />
        <link rel="canonical" href="https://www.kamayakya.com/vip-updates" />
      </Head>
      <div className=" absolute ">
        <img className=" h-[60vh] w-screen object-cover" src="/assets/vip-update-bg.png" alt="vip_bg" />
        <div className=" w-full bg-[linear-gradient(272deg,_#125B54_18.54%,_#092E2B_107.09%) h-[120px] -mt-[9rem] relative"></div>
      </div>
      <Navbar />
      <section className="mt-8 sm:mt-[55px] main-container relative z-10">
        <h2 className="text-display-xs sm:text-display-md font-bold text-center">Quarterly Updates</h2>
        {isLoading ? (
          <div>
            <div className=" flex items-center justify-center flex-wrap gap-y-1 max-sm:py-3 max-sm:pb-7 sm:gap-6">
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
              <Skeleton variant="rounded" width={"25%"} height={45} />
            </div>
          </div>
        ) : (
          <div
            className={`mt-12 grid grid-cols-[.3fr_1fr_.4fr]  ${years.length === 1
              ? "lg:grid-cols-[.099fr_1fr_.135fr] sm:grid-cols-[.3fr_1fr_.4fr]"
              : years.length === 2
                ? "lg:grid-cols-[.3fr_1fr_1fr_.4fr] sm:grid-cols-[.3fr_1fr_1fr_.4fr] "
                : " sm:grid-cols-[.3fr_1fr_1fr_.4fr] lg:grid-cols-[.3fr_1fr_1fr_1fr_.4fr]"
              } items-center place-content-center bg-white rounded-[20px] border border-gray-200 relative`}
          >
            {isLoggedIn ? null : (
              <div className="absolute h-full w-full backdrop-blur-sm flex items-center justify-center">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" p-[10px] h-fit w-fit  bg-[rgba(255,255,255,1)] rounded-[10px] border border-brand-300 flex items-center justify-center shadow-[0px_0px_40px_-9px_rgba(19,135,137,0.46),0px_4px_40px_12px_rgba(118,237,223,0.05)]">
                    <img
                      height={36}
                      width={36}
                      className=" object-contain h-9 w-9"
                      src="/assets/noto_locked.png"
                      alt="lock"
                    />
                  </div>
                  <p className=" font-medium mt-[10px] mb-[18px]">Login to Unlock</p>
                  <Button onClick={handleLogin} variant={ButtonVariant.primary}>
                    Login
                  </Button>
                </div>
              </div>
            )}
            {activePlan.plan !== "vip" && isLoggedIn ? (
              <div className="absolute h-full w-full backdrop-blur-sm flex items-center justify-center">
                <div className=" flex flex-col justify-center items-center">
                  <div className=" p-[4px] h-fit w-fit  bg-[rgba(255,255,255,1)] rounded-[10px] border border-brand-300 flex items-center justify-center shadow-[0px_0px_40px_-9px_rgba(19,135,137,0.46),0px_4px_40px_12px_rgba(118,237,223,0.05)]">
                    <div className="bg-[#EBFBF0] p-[7px] rounded-md">
                      <img
                        height={33}
                        width={33}
                        className=" object-contain h-[33px] w-[33px]"
                        src="/assets/vip_icon.svg"
                        alt="lock"
                      />
                    </div>
                  </div>
                  <p className=" font-medium mt-[10px] mb-[18px] text-center">
                    Text to nudge the user to upgrade to VIP or highlight the benefits of quarterly updates
                  </p>
                  <Button variant={ButtonVariant.primary}>Upgrade to VIP</Button>
                </div>
              </div>
            ) : null}
            {/* Empty cell for alignment */}
            <div className="py-3 border-b border-b-gray-200 w-full text-md">&nbsp;</div>

            {/* Year headers */}
            {years.map((year) => (
              <div key={year} className="text-center font-bold text-md py-3  border-b border-b-gray-200 w-full">
                FY{year}
              </div>
            ))}

            {/* Navigation buttons */}
            <div className="flex items-center justify-center space-x-5 h-full border-b border-b-gray-200 w-full">
              <SButton
                disabled={!hasPrevious}
                onClick={previousPage}
                className=" h-7 w-7 bg-[#0C111D] rounded-full"
                size="icon"
              >
                <ChevronLeft size={18} />
              </SButton>

              <SButton
                disabled={!hasNext}
                onClick={nextPage}
                className=" h-7 w-7 bg-[#0C111D] rounded-full"
                size="icon"
              >
                <ChevronRight size={18} />
              </SButton>
            </div>

            {/* Quarterly Data */}
            {QUARTERS.map((quarter) => (
              <React.Fragment key={quarter}>
                <div
                  className={`font-semibold py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 " : " "
                    } w-full h-full text-center flex items-center justify-center`}
                >
                  {quarter}
                </div>

                {years.map((year) => {
                  const quarterYearData = quarterlyUpdates.find((item) => item[`${quarter}_${year}`])?.[
                    `${quarter}_${year}`
                  ] as { pdf: string; video_link: string }[];

                  return (
                    <div
                      className={` py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 " : " "
                        } w-full h-full flex items-center justify-center flex-wrap gap-4`}
                      key={year}
                    >
                      {quarterYearData && quarterYearData.length > 0 ? (
                        quarterYearData.map((entry, index) => (
                          <>
                            <Button
                              variant={ButtonVariant.custom}
                              className=" hover:bg-transparent h-auto !py-[10px] !pl-[10px] !pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 "
                            >
                              <a
                                key={index}
                                href={entry.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-x-2 text-inherit text-md text-gray-950"
                              >
                                <img height={20} width={20} src={"/assets/pdf.svg"} className=" object-cover" />
                                <p className="text-inherit text-md !text-gray-950">Presentation</p>
                                <ChevronRight color="#D0D5DD" size={16} />
                              </a>
                            </Button>
                            <Button
                              variant={ButtonVariant.custom}
                              className=" hover:bg-transparent h-auto !py-[10px] !pl-[10px] !pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 "
                            >
                              <a
                                key={index}
                                href={entry.video_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-x-2 text-inherit text-md text-gray-950"
                              >
                                <img height={20} width={20} src={"/assets/play.svg"} className=" object-cover" />
                                <p className="text-inherit text-md !text-gray-950">Video</p>
                                <ChevronRight color="#D0D5DD" size={16} />
                              </a>
                            </Button>
                          </>
                        ))
                      ) : (
                        <div className="text-gray-500">NA</div>
                      )}
                    </div>
                  );
                })}
                <div className={`py-9 ${quarter !== "Q1" ? " border-b border-b-gray-200 " : " "} w-full  h-full`}>
                  &nbsp;
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
      <div className=" mt-4">
        <ElevateSection />
      </div>
      <Footer />
    </main>
  );
}

//CAROUSEL BASED IMPLEMENTATION

// <Carousel className="mt-12 grid grid-cols-5 w-full  bg-white rounded-[20px] border border-gray-200">

// <Carousel className="  col-start-2 col-span-3">
//   <CarouselContent carouselContentParent="w-full  border-b border-b-gray-200" className=" justify-between">
//     {years.map((year) => (
//       <CarouselItem className=" sm:basis-1/3">
//         <div key={year} className="text-center font-bold text-md py-3  w-full">
//           FY{year}
//         </div>
//       </CarouselItem>
//     ))}
//     <CarouselItem className=" sm:basis-1/3"></CarouselItem>
//   </CarouselContent>
//   <div className=" absolute">sdfsf</div>
// </Carousel>
// <div className=" col-start-1 w-full">
//   {QUARTERS.map((quarter, index) => (
//     <div
//       key={quarter}
//       className={`font-semibold py-9 ${
//         quarter !== "Q1" ? " border-b border-b-gray-200 " : " "
//       } text-center flex items-center justify-center`}
//     >
//       {quarter}
//     </div>
//   ))}
// </div>
// <CarouselContent carouselContentParent="col-start-2 col-span-full" className="w-full   justify-between">
//   {years.map((year) => (
//     <CarouselItem className="h-full  basis-auto" key={year}>
//       {QUARTERS.map((quarter) => {
//         const quarterYearData = quarterlyUpdates.find((item) => item[`${quarter}_${year}`])?.[
//           `${quarter}_${year}`
//         ];

//         return (
//           <React.Fragment key={`${quarter}_${year}`}>
//             <div
//               className={`py-9 ${
//                 quarter !== "Q1" ? "border-b border-b-gray-200" : ""
//               } w-full h-full flex items-center justify-center flex-wrap gap-4 basis-1 sm:basis-auto`}
//             >
//               {quarterYearData && quarterYearData.length > 0 ? (
//                 quarterYearData.map((entry, index) => (
//                   <React.Fragment key={`${index}-entry`}>
//                     <a
//                       href={entry.pdf}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
//                     >
//                       <img height={20} width={20} src="/assets/pdf.svg" className="object-cover" />
//                       <span>Presentation {entry.quarter}</span>
//                       <ChevronRight color="#D0D5DD" size={16} />
//                     </a>
//                     <a
//                       href={entry.video_link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
//                     >
//                       <img height={20} width={20} src="/assets/play.svg" className="object-cover" />
//                       <span>Video</span>
//                       <ChevronRight color="#D0D5DD" size={16} />
//                     </a>
//                   </React.Fragment>
//                 ))
//               ) : (
//                 <div className="text-gray-500">NA</div>
//               )}
//             </div>
//           </React.Fragment>
//         );
//       })}
//     </CarouselItem>
//   ))}
// </CarouselContent>
// </Carousel>
