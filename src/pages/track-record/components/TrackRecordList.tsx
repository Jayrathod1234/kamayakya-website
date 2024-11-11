import { useTrackRecord } from "@/contexts/TrackRecordContext";
import TrackRecordCardSkeleton from "./skeleton/TrackRecordCardSkeleton";
import TrackRecordStockCard from "./TrackRecordStockCard";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { useEffect } from "react";

const TrackRecordList = () => {
  const { response, isLoading, fetchNextPage, isFetchingNextPage } = useTrackRecord();
  const items = response?.pages?.flatMap((page) => page.data) ?? [];
  const currentPage = Array.isArray(response?.pages) ? response?.pages?.length : 0;
  const totalPages = Array.isArray(response?.pages) ? response?.pages[0]?.total_pages : 0;
  
  if (isLoading) {
    return (
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
        {new Array(8).fill("_").map((item, index) => (
          <TrackRecordCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (items?.length === 0) {
    return (
      <div className=" flex items-center justify-center">
        <p>No Stocks Found</p>{" "}
      </div>
    );
  }



  return (
    <div id="trackRecordList" className=" grid grid-cols-1 lg:grid-cols-2  gap-5 ">
      {items.map((item) => (
        <TrackRecordStockCard key={item.id} {...item} />
      ))}
      <div className=" col-span-full justify-center items-center">
        {currentPage < totalPages ? (
          <Button
            loading={isFetchingNextPage}
            onClick={fetchNextPage}
            className=" mx-auto hover:bg-white w-fit bg-white border border-gray-300"
            variant={ButtonVariant.custom}
          >
            Load More
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default TrackRecordList;
