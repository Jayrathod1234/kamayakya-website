import type { NextPage } from "next";
import React, { useContext } from "react";
import { Navbar, Footer, Button, ButtonnArrow } from "@/components.v2/index.components";
import FaqsNew from "@/pages/screens/FaqsNew";
import Testimonials from "@/pages/screens/Testimonials";
import AuthProvider from "@/components/AuthContext";
import HomePage from "@/pages/screens/HomePage";
import Section1 from "@/pages/AboutPages/Section1";
import Section3 from "@/pages/AboutPages/Section3";
import Section2 from "@/pages/AboutPages/Section2";
import HeaderCards from "@/pages/AboutPages/HeaderCards";
import Section4 from "@/pages/AboutPages/Section4";
import HeaderFuture from "@/pages/AboutPages/HeaderFuture";
import Section5 from "@/pages/AboutPages/Section5";
import Section6 from "@/pages/AboutPages/Section6";
import Section7 from "@/pages/AboutPages/Section7";
import HotStocks from "@/pages/screens/HotStocks";
import { ButtonVariant } from "@/components.v2/button/button";
import { useQuery } from "@tanstack/react-query";
import { getTrackRecordDashboard } from "@/api/track-record";
import TrackRecordHeroCard from "./track-record/components/TrackRecordHeroCard";
import { TrackRecordCommonProvider } from "@/contexts/TrackRecordCommonContext";
import { TrackRecordProvider } from "@/contexts/TrackRecordContext";
import "chartjs-adapter-date-fns";
import HeroCardSection from "./track-record/components/HeroCardSection";
import { getHotStockListApi } from "@/api/stock-picks";
import { StockPicksProvider, useStockPicks } from "@/contexts/StockPicksContext";
import HotStockSection from "@/pages/stock-picks/components/HotStockSection";

const StockPickSection = () => {
  const { isLoggedIn, isSubscribed } = useContext(AuthProvider);

  // Stock picks api
  const { sebiBoardType, searchPageOpen } = useStockPicks();
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });
  0;
  return <HotStockSection items={items} isLimitedView={isLimitedView} isLoading={isLoading2} error={error2} />;
};

const Home: NextPage = () => {
  const { isLoggedIn, isSubscribed } = useContext(AuthProvider);

  //track record api
  const {
    data: trackRecordDashboardStats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  return (
    <>
      <Navbar className=" bg-white open_sans" />
      <div className=" main-container">
        {/* TRACK RECORD START */}
        <div
          className={` bg-[#01272E] sm:py-[60px]   sm:px-20 rounded-[28px] flex gap-x-[46px] ${
            isLoggedIn ? "flex-col text-center" : ""
          }`}
        >
          <div className="flex-[0.6] ">
            <p className=" text-[#F98800] text-md font-semibold">OUR TRACK RECORD</p>
            <h2 className=" font-bold text-display-md text-[#FFFFFF]">
              But first, why don’t you check out <span className=" text-brand-300">our performance</span> so far?
            </h2>
            <p className={` text-[rgba(255,255,255,0.8)] ${isLoggedIn ? "mt-3" : " mt-7"}`}>
              See our hits, our misses - all in the open. Your trust is earned by delivering results, because what we do
              counts more than what we say.
            </p>
            {isLoggedIn ? null : (
              <ButtonnArrow strokeStyle=" stroke-gray-950" className=" mt-10" variant={ButtonVariant.secondary}>
                <p className=" text-gray-950 font-medium"> Unlock Now for Free</p>
              </ButtonnArrow>
            )}
          </div>
          <TrackRecordCommonProvider>
            <TrackRecordProvider>
              {isLoggedIn ? (
                <div className="  mt-[46px] ">
                  <HeroCardSection />
                  <div className=" flex justify-center">
                    <ButtonnArrow
                      strokeStyle=" mt-[46px] stroke-gray-950"
                      className=" mt-10"
                      variant={ButtonVariant.secondary}
                    >
                      <p className=" text-gray-950 font-medium">Go to Track Record</p>
                    </ButtonnArrow>
                  </div>
                </div>
              ) : (
                <div className=" relative flex-1 ">
                  <div className=" relative z-10 h-[70%] w-[95%]">
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
                  </div>
                  <div className=" absolute -top-9 -right-8 z-[2] h-[80%]  w-[95%]">
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
                  </div>
                </div>
              )}
            </TrackRecordProvider>
          </TrackRecordCommonProvider>
        </div>
        {/* TRACK RECORD END */}
        {/* HOT STOCK START */}
        <div className=" p-20 rounded-[28px] bg-[#01272E]">
          <StockPicksProvider>
            <StockPickSection />
          </StockPicksProvider>
        </div>
        {/* HOT STOCK END */}
      </div>
    </>
  );
};

export default Home;
