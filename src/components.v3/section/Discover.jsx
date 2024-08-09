import React from "react";
import DiscoverCarousel from "../common/DiscoverCarousel.jsx";
import { getStrategyTagListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
function Discover() {
  /* ----------------------------- Static Strategy Tag Colors List---------------------------- */
  const colors = {
    "value-pick": "#EEF7F6",
    "turnaround-story": "#FFF1DE",
    "special-situation": "#FAF8D7",
    "management-change": "#F8ECFA",
    "market-leadership": "#FFF7CF",
    "industry-tailwind": "#E7F4FF",
    cyclicals: "#F2F7FB",
    moated: "#F8ECFA",
    "thematic-stories": "#FFF9D6",
    "future-focused": "#FFE7E9",
    esg: "#E9F8D2",
    "high-dividends": "#FFF3E1",
  };

  /* ----------------------------- Static Strategy Tags List ---------------------------- */
  const strategyTagList = [
    {
      name: "Value Pick",
      slug: "value-pick",
      image: "/assets/discover-by-strategy/value-pick.svg",
      description: "Discover undervalued gems with strong fundamentals.",
    },
    {
      name: "Turnaround Story",
      slug: "turnaround-story",
      image: "/assets/discover-by-strategy/turnaround-story.svg",
      description: "Invest in companies poised for a comeback.",
    },
    {
      name: "Special Situation",
      slug: "special-situation",
      image: "/assets/discover-by-strategy/special-situation.svg",
      description:
        "Unique opportunities arising from corporate events or restructuring.",
    },
    {
      name: "Management Change",
      slug: "management-change",
      image: "/assets/discover-by-strategy/management-change.svg",
      description: "Benefit from new leadership and strategic direction.",
    },
    {
      name: "Market Leadership",
      slug: "market-leadership",
      image: "/assets/discover-by-strategy/market-leadership.svg",
      description: "Invest in industry leaders with a strong market position.",
    },
    {
      name: "Industry Tailwind",
      slug: "industry-tailwind",
      image: "/assets/discover-by-strategy/industry-tailwind.svg",
      description: "Sectors with favorable economic conditions driving growth.",
    },
    {
      name: "Cyclicals",
      slug: "moated",
      image: "/assets/discover-by-strategy/cyclicals.svg",
      description: "Invest in industries that benefit from economic cycles.",
    },
    {
      name: "Moated",
      slug: "cyclicals",
      image: "/assets/discover-by-strategy/moated.svg",
      description:
        "Firms with strong competitive advantages that protect their market position.",
    },

    {
      name: "Thematic Stories",
      slug: "thematic-stories",
      image: "/assets/discover-by-strategy/thematic-stories.svg",
      description: "Align investments with emerging trends and themes.",
    },
    {
      name: "Future Focused",
      slug: "future-focused",
      image: "/assets/discover-by-strategy/future-focused.svg",
      description: "Companies with a strong vision for long-term growth.",
    },
    {
      name: "ESG",
      slug: "esg",
      image: "/assets/discover-by-strategy/esg.svg",
      description:
        "Invest in companies with strong Environmental, Social, and Governance practices.",
    },
    {
      name: "High Dividends",
      slug: "high-dividends",
      image: "/assets/discover-by-strategy/high-dividends.svg",
      description:
        "Companies offering attractive and consistent dividend yields.",
    },
  ];

  // Use react-query to fetch the strategy tag list
  // const {
  //   data: strategyTagList = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["strategyTags"],
  //   queryFn: getStrategyTagListApi,
  // });

  // // if (isLoading) {
  // //   return <p>Loading...</p>;
  // // }

  // // if (error) {
  // //   return <p>Error fetching strategy tags</p>;
  // // }
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto ">
        <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans text-center">
          Discover by Strategy
        </p>
        <p className=" text-sm font-normal text-[#475467]  mx-auto pt-3 font-open_sans text-center">
          Screen stocks with KamayaKya's strategy tags to{" "}
          <span className="text-[#F79009] font-semibold">
            understand why each stock was chosen
          </span>
          and to find your perfect investment match!
        </p>
      </div>
      <div className="pb-[110px] ml-32">
        <div className="pt-10 pb-8">
          <div className="flex justify-between gap-4">
            <DiscoverCarousel
              strategyTagList={strategyTagList}
              colors={colors}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;
