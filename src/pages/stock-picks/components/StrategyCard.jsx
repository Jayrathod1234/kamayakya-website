import React from "react";
import { getStrategyTagListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import StrategySlider from "@/components.v3/common/StrategySlider.jsx";
import Discovercard from "@/components.v3/common/Discovercard";
import DiscoverCardSkeleton from "./skeletons/DiscoverCardSkeleton";
function StrategyCard({ setStrategyTag, setIsChangeStrategyTag }) {
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

  // Use react-query to fetch
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["strategyTags"],
    queryFn: getStrategyTagListApi,
  });

  return (
    <>
      <div className="w-[min(1280px] mx-auto overflow-hidden">
        <p className="text-display-xs text-gray-950 font-bold font-open_sans text-center ">
          Discover by Strategy
        </p>
        <p className="text-sm md:text-base font-normal text-[#475467] mx-auto pt-3 mb-2 font-open_sans text-center">
          Screen stocks with KamayaKya's strategy tags to{" "}
          <span className="text-[#F79009] font-semibold">
            understand why each stock was chosen
          </span>{" "}
          and to find your perfect investment match!
        </p>
      </div>
      <div className="sm:pb-[110px] pb-[63px] sm:pl-32 sm:pr-32 pl-[26px] overflow-hidden">
        <div className="sm:pt-10 pt-9 pb-8">
          <div className="flex justify-between gap-4">
            {isLoading || error ? (
              <DiscoverCardSkeleton length={7} />
            ) : (
              <StrategySlider>
                {items.map((value, index) => (
                  <Discovercard
                    setStrategyTag={setStrategyTag}
                    setIsChangeStrategyTag={setIsChangeStrategyTag}
                    key={index} // Use the index or a unique identifier if available
                    {...value}
                    color={colors[value.slug]}
                  />
                ))}
              </StrategySlider>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StrategyCard;
