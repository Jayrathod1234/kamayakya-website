import React, { useContext } from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getLatestReleasesStockListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { useMediaQuery } from "@mui/material";
import { useStockPicks } from "@/contexts/StockPicksContext";

function LatestReleases() {
  const { sebiBoardType } = useStockPicks();
  const { isLoggedIn } = useContext(AuthContext);
  // Use react-query to fetch
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestReleasesStock", sebiBoardType, isLoggedIn],
    queryFn: () =>
      getLatestReleasesStockListApi({ isLoggedIn, type: sebiBoardType }),
  });
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <div className="sm:pt-[385px] pt-[289px] sm:pb-[100px] pb-[58px]">
        {items.length === 0 ? (
          <div className="pt-5 w-full flex flex-col items-center justify-center text-center">
            <p className="text-display-xs text-gray-950 font-bold">
              Latest Releases ({items.length})
            </p>
            <p className="text-md font-normal text-gray-600 text-center pt-3 font-open_sans">
              New Stocks released in the last 60 days
            </p>
            <div>
              <img src="/assets/Frame 7.svg" alt="ss " className="mx-auto" />
            </div>
            <div>
              <p className="text-[#98A2B3] text-[14px] font-open_sans font-normal leading-5 text-center">
                No Latest Stock Releases!
              </p>
            </div>
          </div>
        ) : (
          <div className="before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
            <p className="text-display-xs text-gray-950 font-bold">
              Latest Releases ({items.length})
            </p>
            <p className="text-md font-normal text-gray-600 text-center pt-3 font-open_sans">
              New Stocks released in the last 60 days
            </p>

            {(isMobile && items.length <= 1) || (!isMobile && items.length <= 5) ? (
              <div className="flex justify-center gap-5">
                {isLoading || error ? (
                  <StockCardSkeleton length={1} />
                ) : (
                  items.map((value) => <StockCard key={value.id} {...value} />)
                )}
              </div>
            ) : (
              <div className="w-full">
                {isLoading || error ? (
                  <div className="flex pb-12 !pt-[28px] carousel__container gap-5">
                    <StockCardSkeleton length={5} />
                  </div>
                ) : (
                  items.length > 0 && (
                    <Slider>
                      {items.map((value) => (
                        <StockCard key={value.id} {...value} />
                      ))}
                    </Slider>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>

    </>
  );
}

export default LatestReleases;
