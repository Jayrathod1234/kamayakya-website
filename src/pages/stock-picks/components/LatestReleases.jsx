import React, { useContext } from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getLatestReleasesStockListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
function LatestReleases({ sebiBoardType, stockSector }) {
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
  return (
    <>
      <div className=" sm:pt-[339px] pt-[244px] sm:pb-[100px] pb-[58px] ">
        <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
          <p className=" text-display-xs text-gray-950 font-bold">
            Latest Releases ({items.length})
          </p>
          <p className=" text-md font-normal text-gray-600 text-center pt-3 font-open_sans">
            New Stocks released in the last 60 days
          </p>

          {isLoading || error ? (
            <div className="flex pb-12 pt-[60px] carousel__container gap-5">
              <StockCardSkeleton length={5} />
            </div>
          ) : (
            items.length > 0 && (
              <div className=" mb-6 sm:-mt-0  -mt-6  w-full">
                <Slider>
                  {items.map((value, index) => (
                    <StockCard
                      key={index} // Ensure each item has a unique key
                      {...value}
                      stockSector={stockSector}
                    />
                  ))}
                </Slider>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default LatestReleases;
