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
import { getMixPanelClient } from "@/externals/mixpanel";
import { ACTIVE_PLAN_URL, GET_USER } from "@/pages/api/URLs";
import axios from "axios";
import { HeroLandingCardSection } from "@/pages/track-record/components/HeroCardSection";
import { TrackRecordHeroCardLanding } from "@/pages/track-record/components/TrackRecordHeroCard";
import { LiveStockPerformanceCardLanding } from "@/pages/track-record/components/LiveStockPerformanceCard";
import IndexedPerformanceChart from "@/pages/track-record/components/IndexedPerformanceChart";

export const TrackRecordSection = () => {
  const { isLoggedIn, setShowLoginModal } = useContext(AuthProvider);
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

  //track record api
  const { data: trackRecordDashboardStats = [] } = useQuery({
    queryKey: ["trackRecordDashboard"],
    queryFn: getTrackRecordDashboard,
  });

  const getUserType = async () => {
    if (!isLoggedIn || !refreshToken) return null;
    try {
      const userResponse = await fetch(GET_USER, {
        method: "GET",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      });
      const user = await userResponse.json();
      if (user?.id) {
        const planResponse = await axios.get(ACTIVE_PLAN_URL, {
          headers: {
            Authorization: `token ${refreshToken}`,
          },
        });
        if (planResponse.data?.current_active_subscription) {
          const plan = planResponse.data.current_active_subscription.plan;
          return plan ? (plan.toLowerCase() === "free" ? "Free" : "Paid") : null;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  return (
    <div className=" sm:main-container sm:py-[50px]">
      <div
        className={` bg-[rgb(1,39,46)] py-[50px] sm:py-[60px] sm:rounded-[28px] flex flex-col  ${isLoggedIn ? "sm:flex-col text-center" : " lg:flex-row"
          }`}
      >
        <div className="lg:flex-[0.6] max-lg:text-center open_sans lg:px-12 xl:px-20 ">
          <p className=" text-[#F98800] text-sm lg:text-md font-semibold ">OUR TRACK RECORD</p>
          <h2 className=" max-lg:px-4 mb-0 font-bold text-display-xs lg:text-display-md text-[#FFFFFF]">
            But first, why don’t you check out <span className=" text-brand-300 open_sans_italic">our performance</span>{" "}
            so far?
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
              onClick={async () => {
                const mp = getMixPanelClient();
                const usertype = await getUserType();
                mp.track("unlocknowforfree_clicked", {
                  page: "Homepage",
                  usertype: usertype,
                });
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
                <div className=" block  mt-[46px] lg:px-20 ">
                  <HeroLandingCardSection />

                  <div className=" flex justify-center">
                    <ButtonnArrow
                      strokeStyle=" mt-[46px] stroke-gray-950"
                      className=" mt-10"
                      variant={ButtonVariant.secondary}
                      onClick={async () => {
                        const mp = getMixPanelClient();
                        const usertype = await getUserType();
                        mp.track("goto_trackrecord_clicked", {
                          page: "Homepage",
                          usertype: usertype,
                        });
                        router.push("/track-record");
                      }}
                    >
                      <p className=" text-gray-950 font-medium">Go to Track Record</p>
                    </ButtonnArrow>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" relative flex-1 max-lg:hidden max-w-1/2 mx-auto pr-[40px]  ">
                  <div className=" relative ">
                    <TrackRecordHeroCardLanding
                      className=" border"
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
                      live_recommendations={

                        <div className=" flex flex-row gap-3 max-w-1/2 mx-auto">
                          {!isLoggedIn ? (
                            <div onClick={() => setShowLoginModal(true)} className="   h-[90%] w-full absolute flex items-center justify-center bottom-0 left-0 z-40">
                              <div className="group/lock cursor-pointer shadow-[0px_0px_40px_-9px_rgba(19,135,137,0.46),0px_4px_40px_12px_rgba(118,237,223,0.05)]  overflow-hidden  flex items-center gap-x-[10px] transition-[width] duration-300 h-[56px] w-[56px] hover:w-[234px]   bg-[rgba(255,255,255,1)] rounded-[10px] border border-brand-300">
                                <img
                                  height={36}
                                  width={36}
                                  className=" object-contain ml-[10px] h-9 w-9"
                                  src="/assets/noto_locked.png"
                                  alt="lock"
                                />
                                <p className=" text-gray-950 font-semibold whitespace-nowrap opacity-0 group-hover/lock:opacity-100 transition-all duration-300">
                                  Unlock Now for Free
                                </p>
                              </div>
                            </div>
                          ) : null}
                          <LiveStockPerformanceCardLanding hideDonut={true} className="w-1/2 [&_p]:text-[10px] [&_p]:w-full [&_p]:truncate [&_p]:whitespace-wrap" type={"LIVE"} recommendation={trackRecordDashboardStats?.live_recommendations?.live_stock_count}
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
                          <LiveStockPerformanceCardLanding hideDonut={true} className="w-1/2  [&_p]:text-[10px] [&_p]:w-full [&_p]:truncate [&_p]:whitespace-wrap" type={"EXIT"} recommendation={trackRecordDashboardStats?.exits_stock?.exit_stock_count}
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

                      }
                    />
                  </div>

                </div>
                <div className=" block lg:hidden relative overflow-hidden w-full px-4">
                <IndexedPerformanceChart backdropClassName=" h-[100%]" renderOnlyMobile={true} />
                </div>
                <Carousel plugins={[Autoplay({ delay: 2000 })]} className=" lg:hidden w-full mt-6 px-2">
                  <CarouselContent>
                    <CarouselItem className=" basis-11/12">
                      {" "}
                      <TrackRecordHeroCard
                        {...trackRecordDashboardStats}
                        disableExternalLabel={true}
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
