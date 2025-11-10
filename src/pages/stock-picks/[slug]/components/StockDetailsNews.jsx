import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStockUpdates } from "@/api/shared";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Avatar } from "@/components.v2/avatar";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";

import { useEffect, useRef } from "react";
import style from "./GaugeComponent.module.css";
import { ChevronDown, ChevronsDown } from "lucide-react";

const GaugeComponent = ({ value = 180, size = "medium" }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Start from 0 and animate to the target value
    setCurrentValue(0);
    const timeout = setTimeout(() => {
      setCurrentValue(value);
    }, 50); // Small delay to ensure the initial 0 is set

    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    // Set custom scale based on size prop
    const scales = {
      small: 0.5,
      medium: 1,
      large: 1.5,
    };

    document.documentElement.style.setProperty("--gauge-scale", scales[size]);
  }, [size]);

  // Convert value (0-1000) to degrees (0-180)
  const valueToDegrees = (val) => {
    // Map 0-1000 to 0-180
    return (val / 1000) * 180;
  };

  // Convert value (0-1000) to needle rotation (-90 to 90 degrees)
  const valueToNeedleRotation = (val) => {
    // Map 0-1000 to -90-90
    return (val / 1000) * 180 - 90;
  };

  return (
    <div className={style.gaugeContainer}>
      <div className={style.gaugeContent}>
        <div className={style.gaugeMask}>
          <div className={style.gaugeSemiCircle}>
            {Array.from({ length: 2 }, (_, i) => (
              <span key={i} className={style.gaugeStep} style={{ transform: `rotate(${i == 0 ? 130 : 230}deg)` }} />
            ))}
            {/* Add needle */}
            <div className={style.needle} style={{ transform: `rotate(${valueToNeedleRotation(currentValue)}deg)` }} />
            <div className={style.needleCenter} />
          </div>
          <div className={style.gaugeSemiCircleMask} style={{ transform: `rotate(${180}deg)` }} />
        </div>
      </div>
    </div>
  );
};
export { GaugeComponent };

const StockDetailsNews = ({ stock_id, type }) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:640px)");
  const {
    data: response,
    isLoading,
    error,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["newsList"],
    queryFn: ({ pageParam = 1 }) =>
      getStockUpdates({
        page: pageParam,
        limit: 3,
        stock_id,
        type: pathname?.includes("track-record") ? "track" : "pick",
      }),
    getNextPageParam: (data) => {
      // console.log("===getNextPageParam====", data);
      // return data;
      const { current_page, limit, total_count } = data;
      // // Function to determine the parameter for fetching the next page
      if (Number(total_count) / Number(limit) > Number(current_page)) return Number(current_page) + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
  });
  // const [news,setNews] = useState()
  // const items = response?.pages?.flatMap((page) => page) ?? [];
  const items = response?.pages?.flatMap((page) => page.data);
  const total_pages = response?.pages[0]?.total_count;

  // const items = response?.data;
  // console.log("items", items, "response", response);

  if (!items || items?.length === 0) {
    return (
      <div className=" pt-3 ">
        <div className=" py-[2.5rem] sm:py-[72px] flex flex-col items-center justify-center bg-[#F9FAFB] sm:bg-white sm:rounded-[10px]">
          <img
            width={102}
            height={90}
            className=" w-full h-full max-w-[102px] max-h-[90px]"
            src="/assets/no_news.svg"
          />
          <p className=" text-2xs text-gray-600 text-center max-w-[188px]">
            Recent news are not available for this stock.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-0 open_sans">
      <div className="sm:pt-[12px] pt-[0px]   ">
        {items?.map((item, index) => (
          <div
            className=" p-4 grid grid-cols-[.35fr_1fr] sm:grid-cols-[.25fr_1fr] sm:gap-x-4 bg-white mb-5 shadow-md rounded-[20px] "
            key={item.id}
          >
            <div className=" sm:col-start-1 row-start-1 sm:row-end-3 h-full  pt-2 flex flex-col items-center  bg-[#F9FAFB] rounded-l-xl sm:rounded-xl">
              <div
                //  style={{width: isMobile? "80px":"150px", height:isMobile?'80px':'82px'}}
                className=" my-auto"
              >
                <GaugeComponent
                  size={isMobile ? "small" : "medium"}
                  value={(() => {
                    const sentimentValues = {
                      neutral: { low: 320, medium: 500, high: 690 },
                      bearish: { low: 245, medium: 150, high: 0 },
                      bullish: { low: 755, medium: 800, high: 1000 },
                    };

                    return sentimentValues[item.sentiment]?.[item.impact] ?? 1000;
                  })()}
                />
                <p
                  className={`capitalize font-semibold text-3xs sm:text-2xs text-center ${
                    item.sentiment === "bullish"
                      ? "text-[#12B76A]"
                      : item.sentiment === "bearish"
                      ? "text-[#F04438]"
                      : "text-[#dc9600]"
                  } max-sm:pb-2 mt-[4px] sm:mt-[4px]`}
                >
                  {item.sentiment}
                </p>
              </div>
              <p
                className={` w-full max-sm:hidden capitalize rounded-b-xl mt-auto flex items-center justify-center gap-x-1 text-[#475467] ${
                  item.sentiment === "bullish"
                    ? "bg-[#DDF9E7] "
                    : item.sentiment === "bearish"
                    ? "bg-[#FFE8E4] "
                    : "bg-[#FCF4DD] "
                } text-center text-4xs font-semibold py-[2px]`}
              >
                <span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_17102_208756)">
                      <path
                        d="M5.50004 7.16667V9.25M7.16671 6.33333V9.25M8.83338 4.66667V9.25M9.66671 1.75L6.06421 5.3525C6.04486 5.3719 6.02187 5.38729 5.99656 5.3978C5.97124 5.4083 5.94411 5.41371 5.91671 5.41371C5.88931 5.41371 5.86217 5.4083 5.83686 5.3978C5.81155 5.38729 5.78856 5.3719 5.76921 5.3525L4.39754 3.98083C4.35847 3.94178 4.30549 3.91984 4.25025 3.91984C4.19501 3.91984 4.14203 3.94178 4.10296 3.98083L1.33337 6.75M2.16671 8V9.25M3.83337 6.33333V9.25"
                        stroke="#475467"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_17102_208756">
                        <rect width="10" height="10" fill="white" transform="translate(0.5 0.5)" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span>{item.impact} Impact</span>
              </p>
            </div>
            <div className=" max-sm:py-3 max-sm:rounded-r-xl max-sm:bg-[#F9FAFB]  sm:col-start-2 flex flex-col ">
              <h4 className=" max-sm:order-2 text-xs sm:text-md font-bold sm:font-semibold text-gray-950 m-0">
                {item?.title}
              </h4>
              <p className=" max-sm:order-1 text-3xs text-[#667085] mt-0">
                {formatDistanceToNow(new Date(item.publish_date), { addSuffix: true })}
              </p>
            </div>
            <div className=" col-start-1 col-span-full sm:col-start-2 sm:row-start-2 w-full flex flex-col">
              <div className="  p-2 sm:pt-3 bg-[#FFFBF6] border border-[#FEF0DF] rounded-lg max-sm:rounded-tl-none mt-7 relative">
                <div className=" gap-x-1 bg-[#FEDF89] flex items-center rounded-[30px] w-fit pr-2 pl-1 py-[2px] absolute max-sm:rounded-t-[8px] max-sm:rounded-b-none -top-5 sm:-top-3 left-[-1px] sm:left-0">
                  <img
                    src="/assets/avatar_lion.webp"
                    alt="avatar"
                    className=" max-sm:h-[14px] max-sm:w-[14px] h-4 w-4 object-cover bg-white rounded-full"
                  />

                  <p className=" text-4xs sm:text-3xs font-semibold text-[#93370D]">Analyst View</p>
                </div>
                <p className=" text-xs text-[#4E1D09] ">{item?.analysis_content}</p>
              </div>
              <Accordion className=" mt-3" collapsible>
                <AccordionItem value="item-1" className=" border-b-0">
                  <AccordionContent className="pt-[17px]">
                    <div className="p-2 sm:pt-3 bg-[#FCFDFF] border border-[#E3F2FF] rounded-lg max-sm:rounded-tl-none relative">
                      <div className=" gap-x-1 bg-[#E5F2FD] flex items-center rounded-[30px] w-fit pr-2 pl-1 py-[2px] absolute max-sm:rounded-t-[8px] max-sm:rounded-b-none -top-5 sm:-top-3 left-[-1px] sm:left-0">
                        <div className="bg-white max-sm:h-[14px] max-sm:w-[14px] h-4 w-4 object-cover rounded-full flex items-center justify-center">
                          <img
                            src="/assets/news_icon.png"
                            alt="news"
                            className=" max-sm:h-[10px] max-sm:w-[10px] h-3 w-3 object-cover"
                          />
                        </div>
                        <p className=" text-4xs sm:text-3xs font-semibold text-[#0079EF]">News</p>
                      </div>
                      <p className=" text-xs text-gray-600">{item.updates_content}</p>
                    </div>
                  </AccordionContent>
                  <AccordionTrigger
                    className=" hover:no-underline py-0 [&[data-state=open]_svg]:rotate-180 [&[data-state=open]_.more]:hidden [&[data-state=closed]_.more]:inline-block [&[data-state=open]_.less]:inline-block [&[data-state=closed]_.less]:hidden"
                    chevron={false}
                  >
                    <Button className=" !py-[5px] !px-3" variant={ButtonVariant.primary}>
                      <p className=" text-2xs font-medium">
                        Read <span className="more">more</span>
                        <span className="less">less</span>
                      </p>{" "}
                      <ChevronsDown size={14} />
                    </Button>
                  </AccordionTrigger>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      {items.length === total_pages ? null : (
        <div
          onClick={fetchNextPage}
          className=" rounded-[4px] flex text-lg flex-row md:flex-row items-start md:items-center justify-center gap-4 px-4 py-3 border  bg-white  cursor-pointer hover:bg-gray-50 transition text-[#125B54] "
        >
          {isLoading ? (
            <p className="font-open_sans text-sm font-semibold">Loading...</p>
          ) : (
            <p className="font-open_sans text-sm font-semibold">Load more</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StockDetailsNews;
