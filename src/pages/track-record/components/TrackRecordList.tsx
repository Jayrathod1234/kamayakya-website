import { useTrackRecord } from "@/contexts/TrackRecordContext";
import TrackRecordCardSkeleton from "./skeleton/TrackRecordCardSkeleton";
import TrackRecordStockCard from "./TrackRecordStockCard";

const TrackRecordList = () => {
  const { response, isLoading } = useTrackRecord();
  const items = response?.pages?.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
        {new Array(8).fill("_").map((item) => (
          <TrackRecordCardSkeleton />
        ))}
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2  gap-5">
      {items.map((item) => (
        <TrackRecordStockCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TrackRecordList;
