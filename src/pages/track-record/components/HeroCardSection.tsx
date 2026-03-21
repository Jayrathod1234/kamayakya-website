import React from "react";
import TrackRecordHeroCard from "./TrackRecordHeroCard";
import { useQuery } from "@tanstack/react-query";
import { getTrackRecordDashboard } from "@/api/track-record";
import TrackRecordHeroCardSkeleton from "./skeleton/TrackRecordHeroCardSkeleton";
import IndexedPerformanceChart from "./IndexedPerformanceChart";
import { TrackRecordHeroCardLanding } from "./TrackRecordHeroCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HeroCardSection() {
  const {
    data: trackRecordDashboardStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  return (
    <div className=" flex flex-col md:gap-y-[10px] sm:p-[10px] bg-gray-150 rounded-[20px] sm:main-container relative z-20">
      <div>
        <IndexedPerformanceChart />
      </div>
      <div className="  flex flex-col gap-y-[10px] lg:flex-row gap-[10px] ">
        {isLoading ? (
          <>
            <TrackRecordHeroCardSkeleton />
            <TrackRecordHeroCardSkeleton />{" "}
          </>
        ) : (
          <>
            {" "}
            <TrackRecordHeroCard
              {...trackRecordDashboardStats}
              type={"LIVE"}
              recommendation={trackRecordDashboardStats?.live_recommendations?.live_stock_count}
              averageReturns={trackRecordDashboardStats?.live_recommendations?.average_live_returns}
              stockPerformance={trackRecordDashboardStats?.live_recommendations?.stock_performance}
              bestStocks={trackRecordDashboardStats?.live_recommendations?.top_gainer}
              worstStocks={trackRecordDashboardStats?.live_recommendations?.top_loser}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_new_recommendations}
              stock_live_prices={trackRecordDashboardStats?.live_recommendations}
              entry_price_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.start_date}
              entry_price_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.entry_price}
              start_date_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.start_date}
            />
            <TrackRecordHeroCard
              {...trackRecordDashboardStats}
              type={"EXIT"}
              recommendation={trackRecordDashboardStats?.exits_stock?.exit_stock_count}
              averageReturns={trackRecordDashboardStats?.exits_stock?.average_exit_returns}
              stockPerformance={trackRecordDashboardStats?.exits_stock?.stock_performance}
              bestStocks={trackRecordDashboardStats?.exits_stock?.best_exit}
              worstStocks={trackRecordDashboardStats?.exits_stock?.worst_exit}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_exits_stocks}
              stock_live_prices={trackRecordDashboardStats?.exits_stock}
              // stock_live_prices = {trackRecordDashboardStats?.exits_stock?.worst_exit?.stock_live_prices}
              entry_price_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.start_date}
              entry_price_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.entry_price}
              start_date_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.start_date}
            />
          </>
        )}
      </div>
    </div>
  );
}


export function HeroLandingCardSection() {
  const {
    data: trackRecordDashboardStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  return (
    <div className=" flex flex-col md:gap-y-[10px] sm:p-[10px] rounded-[20px] sm:main-container relative z-20">
      <div>
        <IndexedPerformanceChart renderOnlyMobile={true}/>
      </div>
      <div className="  xl:flex hidden gap-y-[10px] xl:flex-row gap-[10px] ">
        {isLoading ? (
          <>
            <TrackRecordHeroCardSkeleton />
            <TrackRecordHeroCardSkeleton />{" "}
          </>
        ) : (
          <>
            {" "}
            <TrackRecordHeroCardLanding
              {...trackRecordDashboardStats}
              type={"LIVE"}
              recommendation={trackRecordDashboardStats?.live_recommendations?.live_stock_count}
              averageReturns={trackRecordDashboardStats?.live_recommendations?.average_live_returns}
              stockPerformance={trackRecordDashboardStats?.live_recommendations?.stock_performance}
              bestStocks={trackRecordDashboardStats?.live_recommendations?.top_gainer}
              worstStocks={trackRecordDashboardStats?.live_recommendations?.top_loser}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_new_recommendations}
              stock_live_prices={trackRecordDashboardStats?.live_recommendations}
              entry_price_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.start_date}
              entry_price_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.entry_price}
              start_date_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.start_date}
            />
            <TrackRecordHeroCardLanding
              {...trackRecordDashboardStats}
              type={"EXIT"}
              recommendation={trackRecordDashboardStats?.exits_stock?.exit_stock_count}
              averageReturns={trackRecordDashboardStats?.exits_stock?.average_exit_returns}
              stockPerformance={trackRecordDashboardStats?.exits_stock?.stock_performance}
              bestStocks={trackRecordDashboardStats?.exits_stock?.best_exit}
              worstStocks={trackRecordDashboardStats?.exits_stock?.worst_exit}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_exits_stocks}
              stock_live_prices={trackRecordDashboardStats?.exits_stock}
              // stock_live_prices = {trackRecordDashboardStats?.exits_stock?.worst_exit?.stock_live_prices}
              entry_price_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.start_date}
              entry_price_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.entry_price}
              start_date_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.start_date}
              className="h-full"
            />
          </>
        )}
      </div>
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className=" xl:hidden w-full mt-6 px-2">
        <CarouselContent>
          <CarouselItem className=" basis-11/12">
            {" "}
            <TrackRecordHeroCardLanding
              disableExternalLabel={true}
              {...trackRecordDashboardStats}
              type={"LIVE"}
              recommendation={trackRecordDashboardStats?.live_recommendations?.live_stock_count}
              averageReturns={trackRecordDashboardStats?.live_recommendations?.average_live_returns}
              stockPerformance={trackRecordDashboardStats?.live_recommendations?.stock_performance}
              bestStocks={trackRecordDashboardStats?.live_recommendations?.top_gainer}
              worstStocks={trackRecordDashboardStats?.live_recommendations?.top_loser}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_new_recommendations}
              stock_live_prices={trackRecordDashboardStats?.live_recommendations}
              entry_price_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.live_recommendations?.top_gainer?.start_date}
              entry_price_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.entry_price}
              start_date_loser={trackRecordDashboardStats?.live_recommendations?.top_loser?.start_date}
            />
          </CarouselItem>
          <CarouselItem className=" basis-11/12">
            <TrackRecordHeroCardLanding
              disableExternalLabel={true}
              {...trackRecordDashboardStats}
              type={"EXIT"}
              recommendation={trackRecordDashboardStats?.exits_stock?.exit_stock_count}
              averageReturns={trackRecordDashboardStats?.exits_stock?.average_exit_returns}
              stockPerformance={trackRecordDashboardStats?.exits_stock?.stock_performance}
              bestStocks={trackRecordDashboardStats?.exits_stock?.best_exit}
              worstStocks={trackRecordDashboardStats?.exits_stock?.worst_exit}
              newRecommendation={trackRecordDashboardStats?.live_recommendations?.three_exits_stocks}
              stock_live_prices={trackRecordDashboardStats?.exits_stock}
              entry_price_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.entry_price}
              start_date_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.start_date}
              entry_price_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.entry_price}
              start_date_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.start_date}
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}



export default HeroCardSection;
