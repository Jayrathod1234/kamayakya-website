import React from "react";
import { getStrategyTagListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import StrategySlider from "@/components.v3/common/StrategySlider.jsx";

function StrategyCard() {
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

  // Use react-query to fetch the strategy tag list
  const {
    data: strategyTagList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["strategyTags"],
    queryFn: getStrategyTagListApi,
  });

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
            <StrategySlider strategyTagList={strategyTagList} colors={colors} />
          </div>
        </div>
      </div>
    </>
  );
}

export default StrategyCard;
