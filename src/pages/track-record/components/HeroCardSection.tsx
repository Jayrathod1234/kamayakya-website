import React from "react";
import { TrackRecordHeroCard } from "./TrackRecordHeroCard";
import { useQuery } from "@tanstack/react-query";
import { getTrackRecordDashboard } from "@/api/track-record";
import TrackRecordHeroCardSkeleton from "./skeleton/TrackRecordHeroCardSkeleton";
export function HeroCardSection() {
  const {
    data: trackRecordDashboardStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  if (isLoading) return null;
  console.log("TRACK RECORED", trackRecordDashboardStats);
  return (
    <div className=" sm:p-[10px] bg-gray-150 rounded-[20px] flex flex-col gap-y-[10px] lg:flex-row gap-[10px] sm:main-container relative z-20">
      {true ? (
        <>
          <TrackRecordHeroCardSkeleton />
          <TrackRecordHeroCardSkeleton />{" "}
        </>
      ) : (
        <>
          {" "}
          <TrackRecordHeroCard
            type={"LIVE"}
            recommendation={trackRecordDashboardStats?.live_recommendations?.live_stock_count}
            averageReturns={trackRecordDashboardStats?.live_recommendations?.average_live_returns}
            stockPerformance={trackRecordDashboardStats?.live_recommendations?.stock_performance}
            bestStocks={trackRecordDashboardStats?.live_recommendations?.top_gainer}
            worstStocks={trackRecordDashboardStats?.live_recommendations?.top_loser}
            newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_new_recommendations}
          />
          <TrackRecordHeroCard
            type={"EXIT"}
            recommendation={trackRecordDashboardStats?.exits_stock?.exit_stock_count}
            averageReturns={trackRecordDashboardStats?.exits_stock?.average_exit_returns}
            stockPerformance={trackRecordDashboardStats?.exits_stock?.stock_performance}
            bestStocks={trackRecordDashboardStats?.exits_stock?.best_exit}
            worstStocks={trackRecordDashboardStats?.exits_stock?.worst_exit}
            newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_exits_stocks}
          />
        </>
      )}
    </div>
  );
}

export default HeroCardSection;
