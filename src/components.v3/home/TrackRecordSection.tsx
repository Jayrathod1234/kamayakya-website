import { getTrackRecordDashboard } from "@/api/track-record";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import AuthProvider from "@/components/AuthContext";
import { TrackRecordCommonProvider } from "@/contexts/TrackRecordCommonContext";
import { TrackRecordProvider } from "@/contexts/TrackRecordContext";
import HeroCardSection from "@/pages/track-record/components/HeroCardSection";
import TrackRecordHeroCard from "@/pages/track-record/components/TrackRecordHeroCard";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import router from "next/router";
import { useContext } from "react";

export const TrackRecordSection = () => {
  const { isLoggedIn, setShowLoginModal } = useContext(AuthProvider);

  //track record api
  const { data: trackRecordDashboardStats = [] } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  return (
    <div className=" sm:main-container sm:py-[50px]">
      <div
        className={` bg-[rgb(1,39,46)] py-[50px] sm:py-[60px] sm:rounded-[28px] flex flex-col   gap-x-[46px] ${
          isLoggedIn ? "sm:flex-col text-center" : " lg:flex-row"
        }`}
      >
        <div className="lg:flex-[0.6] max-lg:text-center open_sans lg:px-12 xl:px-20 ">
          <p className=" text-[#F98800] text-sm lg:text-md font-semibold ">OUR TRACK RECORD</p>
          <h2 className=" max-lg:px-4 mb-0 font-bold text-display-xs lg:text-display-md text-[#FFFFFF]">
            But first, why don’t you check out <span className=" text-brand-300 open_sans_italic">our performance</span> so far?
          </h2>
          <p className={` text-[rgba(255,255,255,0.8)] max-lg:text-sm max-lg:px-5 ${isLoggedIn ? "mt-3" : " mt-7"}`}>
            See our hits, our misses - all in the open. Your trust is earned by delivering results, because what we do
            counts more than what we say.
          </p>
          {isLoggedIn ? null : (
            <ButtonnArrow
              strokeStyle=" stroke-gray-950"
              className=" max-lg:hidden mt-10"
              variant={ButtonVariant.secondary}
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              <p className=" text-gray-950 font-medium"> Unlock Now for Free</p>
            </ButtonnArrow>
          )}
        </div>
        <TrackRecordCommonProvider>
          <TrackRecordProvider>
            {isLoggedIn ? (
              <>
                <div className=" hidden lg:block  mt-[46px] lg:px-20 ">
                  <HeroCardSection />

                  <div className=" flex justify-center">
                    <ButtonnArrow
                      strokeStyle=" mt-[46px] stroke-gray-950"
                      className=" mt-10"
                      variant={ButtonVariant.secondary}
                      onClick={() => {
                        router.push("/track-record");
                      }}
                    >
                      <p className=" text-gray-950 font-medium">Go to Track Record</p>
                    </ButtonnArrow>
                  </div>
                </div>
                <Carousel plugins={[Autoplay({ delay: 2000 })]} className=" lg:hidden w-full mt-6 px-2">
                  <CarouselContent>
                    <CarouselItem className=" basis-11/12">
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
                    </CarouselItem>
                    <CarouselItem className=" basis-11/12">
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
                        entry_price_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.entry_price}
                        start_date_gainer={trackRecordDashboardStats?.exits_stock?.best_exit?.start_date}
                        entry_price_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.entry_price}
                        start_date_loser={trackRecordDashboardStats?.exits_stock?.worst_exit?.start_date}
                      />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </>
            ) : (
              <>
                <div className=" relative flex-1 max-lg:hidden  ">
                  <div className=" relative z-10 h-[70%] w-[90%] lg:right-20 xl:right-0">
                    <TrackRecordHeroCard
                      className=' border'
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
                  </div>
                  <div className=" absolute -top-9 right-28 xl:right-12 z-[2] h-[80%]  w-[85%]">
                    <TrackRecordHeroCard
                      className=' border'
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
                  </div>
                </div>
                <Carousel plugins={[Autoplay({ delay: 2000 })]} className=" lg:hidden w-full mt-6 px-2">
                  <CarouselContent>
                    <CarouselItem className=" basis-11/12">
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
                    </CarouselItem>
                    <CarouselItem className=" basis-11/12">
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
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </>
            )}
          </TrackRecordProvider>
        </TrackRecordCommonProvider>
      </div>
    </div>
  );
};
