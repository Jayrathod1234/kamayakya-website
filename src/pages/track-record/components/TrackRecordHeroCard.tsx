import { useContext } from "react";
import { AverageReturnCard } from "./AverageReturnCards";
import { LiveStockPerformanceCard } from "./LiveStockPerformanceCard";
import { TopGainerLoserCard } from "./TopGainerLoserCard";
import { TrackRecordHeroCardNewChip } from "./TrackRecordHeroCardNewChip";
import AuthContext from "@/components/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getTrackRecordDashboard } from "../../../api/track-record";

interface IStockPerformace {
  high: number;
  medium: number;
  low: number;
}

interface IBestWorstStocks {
  [k: string]: string | number;
}

type TTrackRecordHeroCard = {
  type: string;
  recommendation: number;
  averageReturns: number;
  stockPerformance: IStockPerformace;
  bestStocks: IBestWorstStocks;
  worstStocks: IBestWorstStocks;
};

export const TrackRecordHeroCard = ({
  type,
  recommendation,
  averageReturns,
  stockPerformance,
  bestStocks,
  worstStocks,
}: TTrackRecordHeroCard) => {
  const recommendationLabel =
    type === "LIVE" ? `${recommendation} Live Recommendations` : `${recommendation} Exits (past)`;
  return (
    <div className=" p-4 bg-gray-50 rounded-[10px] w-full  z-10">
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
          <img height={20} width={20} src="/assets/pulse.gif" alt="" />
        </div>
        <TrackRecordHeroCardNewChip />
      </div>
      {/* top section end */}
      {/* Middle Section */}
      <div className=" flex flex-col md:flex-row mt-4 gap-3">
        <AverageReturnCard type={type} averageReturns={averageReturns} />
        <LiveStockPerformanceCard type={type} performance={stockPerformance} />
      </div>
      {/* Middle Section end */}
      {/* Lower Section */}
      <div className=" flex mt-4 gap-3 basis-1/2">
        <TopGainerLoserCard type={type} isBest={true} stockStat={bestStocks} />
        <TopGainerLoserCard type={type} isBest={false} stockStat={worstStocks} />
      </div>
      {/* Lower Section end */}
    </div>
  );
};
