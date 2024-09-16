import { AverageReturnCard } from "./AverageReturnCards";
import { LiveStockPerformanceCard } from "./LiveStockPerformanceCard";
import { TopGainerLoserCard } from "./TopGainerLoserCard";
import { TrackRecordHeroCardNewChip } from "./TrackRecordHeroCardNewChip";

export const TrackRecordHeroCard = () => {
  return (
    <div className=" p-4 bg-gray-50 rounded-[10px] w-full  z-10">
      {/* top section */}
      <div className=" flex justify-between">
        <div className=" flex items-center">
          <div className=" p-1 ml-1">
            <img height={16} width={16} src="/assets/entry_marker.svg" alt="" />
          </div>
          <p className=" text-md font-bold mr-2 whitespace-nowrap truncate">56 Live Recommendations </p>
          <img height={20} width={20} src="/assets/pulse.gif" alt="" />
        </div>
        <TrackRecordHeroCardNewChip />
      </div>
      {/* top section end */}
      {/* Middle Section */}
      <div className=" flex flex-col md:flex-row mt-4 gap-3">
        <AverageReturnCard />
        <LiveStockPerformanceCard />
      </div>
      {/* Middle Section end */}
      {/* Lower Section */}
      <div className=" flex mt-4 gap-3 basis-1/2">
        <TopGainerLoserCard />
        <TopGainerLoserCard />
      </div>
      {/* Lower Section end */}
    </div>
  );
};