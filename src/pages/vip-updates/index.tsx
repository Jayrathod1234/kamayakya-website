import React, { useEffect, useState } from "react";
import { Navbar } from "@/components.v2/navbar";
import { getQuarterlyUpdates } from "../../api/vip-updates/index";
import { Button } from "@/components.v2/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PDF_ICON from "../../../public/assets/pdf.svg";
import VIDEO_ICON from "../../../public/assets/play.svg";
import { Footer } from "@/components.v2/footer";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import { useMediaQuery } from "@mui/material";
const QUARTERS = ["Q4", "Q3", "Q2", "Q1"];

export default function Page() {
  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 3 });
  
  const {
    data: quarterlyUpdates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quarterlyUpdates", pagination],
    queryFn: () => getQuarterlyUpdates(pagination),
    select: (responseData) => {
      const data = responseData?.data || {};
      const pagination = responseData?.pagination || {};
      setHasNext(pagination.has_next)
      setHasPrevious(pagination.has_previous)
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
  // const [quarterlyUpdates, setQuarterlyUpdates] = useState([]);
  const isMobile = useMediaQuery("(max-width:640px)");
  const isTab = useMediaQuery("(max-width:1024px)");
  const [years, setYears] = useState([]);
  const [hasPrevious,setHasPrevious] = useState(false);
  const [hasNext,setHasNext] = useState(false);
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
  console.log(years.length)
  return (
    <main className="open_sans bg-gray-50">
      <Navbar />
      <section className="mt-8 sm:mt-[55px] main-container">
        <h2 className="text-display-xs sm:text-display-md font-bold text-center">Quarterly Updates</h2>

        <div
          className={`mt-12 grid grid-cols-3  ${
            years.length === 1 ? "lg:grid-cols-3 sm:grid-cols-3" : years.length === 2 ? "lg:grid-cols-4 sm:grid-cols-4 " : " sm:grid-cols-4 lg:grid-cols-5"
          } items-center place-content-center bg-white rounded-[20px] border border-gray-200`}
        >
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
            {hasPrevious ? <Button onClick={previousPage} className=" h-7 w-7 bg-[#0C111D] rounded-full" size="icon">
              <ChevronLeft size={18} />
            </Button> : null}
           {hasNext? <Button onClick={nextPage} className=" h-7 w-7 bg-[#0C111D] rounded-full" size="icon">
              <ChevronRight size={18} />
            </Button> : null}
            
          </div>

          {/* Quarterly Data */}
          {QUARTERS.map((quarter) => (
            <React.Fragment key={quarter}>
              <div
                className={`font-semibold py-9 ${
                  quarter !== "Q1" ? " border-b border-b-gray-200 " : " "
                } w-full h-full text-center flex items-center justify-center`}
              >
                {quarter}
              </div>

              {years.map((year) => {
                const quarterYearData = quarterlyUpdates.find((item) => item[`${quarter}_${year}`])?.[
                  `${quarter}_${year}`
                ];

                return (
                  <div
                    className={` py-9 ${
                      quarter !== "Q1" ? " border-b border-b-gray-200 " : " "
                    } w-full h-full flex items-center justify-center flex-wrap gap-4`}
                    key={year}
                  >
                    {quarterYearData && quarterYearData.length > 0 ? (
                      quarterYearData.map((entry, index) => (
                        <>
                          <a
                            key={index}
                            href={entry.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
                          >
                            <img height={20} width={20} src={"/assets/pdf.svg"} className=" object-cover" />
                            <span>Presentation</span>
                            <ChevronRight color="#D0D5DD" size={16} />
                          </a>
                          <a
                            key={index}
                            href={entry.video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-[10px] pl-[10px] pr-[6px] bg-white border border-gray-200 rounded-lg shadow-md flex items-center gap-x-2 text-inherit text-md text-gray-950"
                          >
                            <img height={20} width={20} src={"/assets/play.svg"} className=" object-cover" />
                            <span>Video</span>
                            <ChevronRight color="#D0D5DD" size={16} />
                          </a>
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
      </section>
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
