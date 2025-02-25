import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getStockUpdates } from "@/api/shared";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Avatar } from "@/components.v2/avatar";
import ReactSpeedometer from "react-d3-speedometer";

const StockDetailsNews = ({ stock_id, type }) => {
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
        limit: 10,
        stock_id,
        type,
      }),
    getNextPageParam: (data) => {
      // console.log("===getNextPageParam====", data);
      return data;
      // const { meta } = data;
      // // Function to determine the parameter for fetching the next page
      // if (meta.found / meta.limit > meta.page) return meta.page + 1 ?? false; // Return the nextPage parameter if available, otherwise false
    },
  });
  // const [news,setNews] = useState()
  // const items = response?.pages?.flatMap((page) => page) ?? [];
  const items = response?.pages?.flatMap((page) => page.data);
  // const items = response?.data;
  // console.log(items,response)
  const newsItems = [
    {
      id: 1,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 2,
      image: "/assets/image1.png",
      title: "Another News Item Title",
      source: "The Times of India",
      time: "2 hours ago",
      link: "/news/another-news-item",
    },
    {
      id: 3,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 4,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 5,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
    {
      id: 6,
      image: "/assets/image1.png",
      title: "Vidhi Specialty Food Ingredients Ltd receives approval from GIDC for discharge of industrial effluent",
      source: "The Hindu Businessline",
      time: "4 hours ago",
      link: "/news/vidhi-specialty-food-approval",
    },
  ];
  console.log(items, response);

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
    <div className="px-4 sm:px-0">
      <div className="sm:pt-[12px] pt-[0px]   ">
        {items?.map((item, index) => (
          <div className=" p-4 flex gap-x-4 bg-white mb-5 " key={item.id}>
            <div className="  py-2 min-h-full flex flex-col">
              <ReactSpeedometer
                currentValueText=""
                width={150}
                height={82}
                ringWidth={20}
                needleHeightRatio={0.85}
                value={
                  item.impact === "medium" && item.sentiment === "neutral"
                    ? 500
                    : item.impact === "low" && item.sentiment === "neutral"
                    ? 250
                    : item.impact === "high" && item.sentiment === "neutral"
                    ? 750
                    : item.impact === "low" && item.sentiment === "bearish"
                    ? 245
                    : item.impact === "medium" && item.sentiment === "bearish"
                    ? 150
                    : item.impact === "high" && item.sentiment === "bearish"
                    ? 0
                    : item.impact === "low" && item.sentiment === "bullish"
                    ? 755
                    : item.impact === "medium" && item.sentiment === "bullish"
                    ? 800
                    : 1000
                }
                maxSegmentLabels={0}
                segments={5555}
              />
              <p className=" text-2xs text-center text-[#12B76A] mt-3">{item.sentiment}</p>
              <p className=" mt-auto flex items-center justify-center gap-x-1 normal-case bg-[#DDF9E7] text-[#475467] text-center rounded-b-2xl text-4xs font-semibold py-[2px]">
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
            <div className=" w-full">
              <h4 className=" text-md font-semibold text-gray-950 m-0">{item?.title}</h4>
              <p className=" text-3xs text-[#667085] mt-0">{formatDistanceToNow(new Date(item.created))}</p>
              <div className="  p-2 pt-3 bg-[#FFFBF6] border border-[#FEF0DF] rounded-lg mt-7 relative">
                <div className=" gap-x-1 bg-[#FEDF89] flex items-center rounded-r-[30px] w-fit pr-2 pl-1 py-[2px] absolute -top-3 left-0">
                  <img src="/avatar-card.png" className=" h-4 w-4 object-cover" />
                  <p className=" text-3xs font-semibold text-[#93370D]">Analyst View</p>
                </div>
                <p className=" text-xs text-[#4E1D09] ">{item?.analysis_content}</p>
              </div>
              <Accordion className=" mt-3" collapsible>
                <AccordionItem value="item-1" className=" border-b-0">
                  <AccordionContent>
                    <div className=" flex items-center gap-x-3">
                      <p className=" text-3xs font-semibold text-brand-300">News</p>
                      <div className=" w-full h-[1px] bg-brand-200"></div>
                    </div>
                    <p className=" text-xs text-gray-600">{item.updates_content}</p>
                  </AccordionContent>
                  <AccordionTrigger className=" hover:no-underline" chevron={false}>
                    <Button className=" !py-[5px] !px-3" variant={ButtonVariant.primary}>
                      <p className=" text-2xs">Read more</p>
                    </Button>
                  </AccordionTrigger>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={fetchNextPage}
        className=" rounded-[4px] flex text-lg flex-row md:flex-row items-start md:items-center justify-center gap-4 px-4 py-3 border  bg-white  cursor-pointer hover:bg-gray-50 transition text-[#125B54] "
      >
        <p className="font-open_sans text-sm font-semibold">Load more</p>
      </div>
    </div>
  );
};

export default StockDetailsNews;
