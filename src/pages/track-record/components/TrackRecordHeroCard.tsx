import React, { useContext } from "react";
import { AverageReturnCard } from "./AverageReturnCards";
import { LiveStockPerformanceCard } from "./LiveStockPerformanceCard";
import { TopGainerLoserCard } from "./TopGainerLoserCard";
import { TrackRecordHeroCardNewChip } from "./TrackRecordHeroCardNewChip";
import AuthContext from "@/components/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTrackRecordDashboard } from "../../../api/track-record";
import LoginPrompt from "./LoginPrompt";
import AverageExitRetursTooltipContent from "./AverageExitRetursTooltipContent";
import AverageLiveReturnsTooltipContent from "./AverageLiveReturnsTooltipContent";

export interface IStockPerformace {
  high: number;
  medium: number;
  low: number;
}

interface IBestWorstStocks {
  [k: string]: string | number;
}

export interface INewRecommendation {
  id: string;
  stock_name: string;
  stock_image: string | null;
}

type TTrackRecordHeroCard = {
  type: string;
  recommendation: number;
  averageReturns: number;
  stockPerformance: IStockPerformace;
  bestStocks: IBestWorstStocks;
  worstStocks: IBestWorstStocks;
  newRecommendation: INewRecommendation[];
  entry_price_gainer: string;
  start_date_gainer: string;
  entry_price_loser: string;
  start_date_loser: string;
};

export const TrackRecordHeroCard = ({
  type,
  recommendation,
  averageReturns,
  stockPerformance,
  bestStocks,
  worstStocks,
  newRecommendation,
  stock_live_prices,
  entry_price_gainer,
  start_date_gainer,
  entry_price_loser,
  start_date_loser,
  className,
}: TTrackRecordHeroCard) => {
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const recommendationLabel =
    type === "LIVE" ? `${recommendation ?? ""} Live Recommendations` : `${recommendation ?? ""} Exits past`;


  return (
    // p-4 bg-gray-50
    <div className={"  rounded-[10px] w-full lg:min-w-[517px]  z-10 relative " + className}>
      {!isLoggedIn ? (
        <div onClick={handleLogin} className="   h-[90%] w-full absolute flex items-center justify-center bottom-0 left-0 z-40">
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
      <div className=" py-3 w-full bg-white md:hidden"></div>
      {/* top section */}
      <div className=" flex px-4 py-4 md:hidden justify-between flex-wrap">
        <div className=" flex items-center">
          <div className=" p-1 ml-1">
            {type === "LIVE" ? (
              <img height={16} width={16} src="/assets/entry point.svg" alt="entry-marker" />
            ) : (
              <img height={16} width={16} src="/assets/exit_icon.svg" alt="exit-marker" />
            )}
          </div>
          <p className=" text-md font-bold mr-2 whitespace-nowrap truncate">{recommendationLabel} </p>
          {type == "LIVE" && <img height={20} width={20} src="/assets/pulse.gif" alt="" />}
        </div>
        <TrackRecordHeroCardNewChip newRecommendation={newRecommendation} type={type} />
      </div>
      {/* top section end */}
      {/* Middle Section */}
      {/* mt-4  */}
      <div className=" flex flex-col md:flex-row gap-3 px-4 pb-4 md:px-0 md:pb-0">
        {/* <AverageReturnCard
          tooltipContent={type==="LIVE" ? <AverageLiveReturnsTooltipContent/>:<AverageExitRetursTooltipContent/>}
          type={type}
          averageReturns={averageReturns}
        /> */}

        <LiveStockPerformanceCard type={type} performance={stockPerformance} newRecommendation={newRecommendation} recommendationLabel={recommendationLabel} />
      </div>
      {/* Middle Section end */}
      {/* Lower Section */}
      {/* <div className=" flex mt-4 gap-3">
        <LoginPrompt>
          <TopGainerLoserCard entry_price={entry_price_gainer} start_date={start_date_gainer}  stock_live_prices={ type==="LIVE" ? stock_live_prices?.top_gainer?.stock_live_prices:stock_live_prices?.best_exit?.stock_live_prices} type={type} isBest={true} stockStat={bestStocks} />
        </LoginPrompt>
        <LoginPrompt>
          <TopGainerLoserCard entry_price={entry_price_loser} start_date={start_date_loser}  stock_live_prices={ type==="LIVE" ? stock_live_prices?.top_loser?.stock_live_prices:stock_live_prices?.worst_exit?.stock_live_prices} type={type} isBest={false} stockStat={worstStocks} />
        </LoginPrompt>
      </div> */}
      {/* Lower Section end */}
    </div>
  );
};

export const TrackRecordHeroCardLanding = ({
  type,
  recommendation,
  averageReturns,
  stockPerformance,
  bestStocks,
  worstStocks,
  newRecommendation,
  stock_live_prices,
  entry_price_gainer,
  start_date_gainer,
  entry_price_loser,
  start_date_loser,
  className,
}: TTrackRecordHeroCard) => {
  const { isLoggedIn, handleLogin } = useContext(AuthContext);
  const recommendationLabel =
    type === "LIVE" ? `${recommendation} Live Recommendations` : `${recommendation} Exits (past)`;
  return (
    <div className={" p-4 bg-gray-50 rounded-[10px] w-full lg:min-w-[517px]  z-10 relative " + className}>
      {!isLoggedIn ? (
        <div onClick={handleLogin} className="   h-[90%] w-full absolute flex items-center justify-center bottom-0 left-0 z-40">
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

      {/* top section */}
      <div className=" flex justify-between">
        <div className=" flex items-center">
          <div className=" p-1 ml-1">
            {type === "LIVE" ? (
              <img height={16} width={16} src="/assets/entry point.svg" alt="entry-marker" />
            ) : (
              <img height={16} width={16} src="/assets/exit_icon.svg" alt="exit-marker" />
            )}
          </div>
          <p className=" text-md font-bold mr-2 whitespace-nowrap truncate">{recommendationLabel} </p>
          {type == "LIVE" && <img height={20} width={20} src="/assets/pulse.gif" alt="" />}
        </div>
        <TrackRecordHeroCardNewChip newRecommendation={newRecommendation} type={type} />
      </div>
      {/* top section end */}
      {/* Middle Section */}
      <div className=" flex flex-col md:flex-row mt-4 gap-3">
        <AverageReturnCard
          tooltipContent={type === "LIVE" ? <AverageLiveReturnsTooltipContent /> : <AverageExitRetursTooltipContent />}
          type={type}
          averageReturns={averageReturns}
        />
        <LiveStockPerformanceCard type={type} performance={stockPerformance} />
      </div>
      {/* Middle Section end */}
      {/* Lower Section */}
      <div className=" flex mt-4 gap-3">
        <LoginPrompt>
          <TopGainerLoserCard entry_price={entry_price_gainer} start_date={start_date_gainer} stock_live_prices={type === "LIVE" ? stock_live_prices?.top_gainer?.stock_live_prices : stock_live_prices?.best_exit?.stock_live_prices} type={type} isBest={true} stockStat={bestStocks} />
        </LoginPrompt>
        <LoginPrompt>
          <TopGainerLoserCard entry_price={entry_price_loser} start_date={start_date_loser} stock_live_prices={type === "LIVE" ? stock_live_prices?.top_loser?.stock_live_prices : stock_live_prices?.worst_exit?.stock_live_prices} type={type} isBest={false} stockStat={worstStocks} />
        </LoginPrompt>
      </div>
      {/* Lower Section end */}
    </div>
  );
};

export default React.memo(TrackRecordHeroCard);
