import React, { useContext } from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getLatestReleasesStockListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { useMediaQuery } from "@mui/material";
import { useStockPicks } from "@/contexts/StockPicksContext";
import { HotSlider } from "../../../components.v3/common/HotSlider";

function LatestReleases({ isLimitedView }) {
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
  const islaptop = useMediaQuery("(max-width:1440px)");
  const isminlaptop = useMediaQuery("(max-width:1024px)");
  const istablet = useMediaQuery("(max-width:768px)");

  // Determine the number of cards to show based on screen size
  let cardsToShow = 5; // Default for larger screens
  if (isMobile) {
    cardsToShow = 1;
  } else if (istablet) {
    cardsToShow = 3;
  } else if (isminlaptop) {
    cardsToShow = 3;
  } else if (islaptop) {
    cardsToShow = 4;
  }

  return (
    <>
      <div
        className={`sm:pb-[100px] pb-[58px] ${
          isLimitedView ? "sm:pt-[200px] pt-[0px]" : ""
        }`}
      >
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
          <div className="relative flex flex-col items-center justify-center text-center bg-cover before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25">
            <p className="text-display-xs text-gray-950 font-bold">
              Latest Releases ({items.length})
            </p>
            <p
              className={`text-md font-normal text-gray-600 text-center pt-3 font-open_sans ${
                (isMobile && items.length <= 1) ||
                (!isMobile && items.length <= 5)
                  ? "mb-6"
                  : ""
              }`}
            >
              New Stocks released in the last 60 days
            </p>

            {items.length <= cardsToShow ? (
              <div className="flex justify-center gap-5">
                {isLoading || error ? (
                  <StockCardSkeleton
                    className="sm:w-[404px] w-[358px]"
                    length={cardsToShow}
                  />
                ) : (
                  items.map((value) => <StockCard key={value.id} {...value} />)
                )}
              </div>
            ) : (
              <div className="w-full">
                {isLoading || error ? (
                  <div className="flex pb-12 !pt-[40px] carousel__container justify-center gap-5">
                    <StockCardSkeleton
                      className="sm:w-[404px] w-[358px]"
                      length={cardsToShow}
                    />
                  </div>
                ) : (
                  items.length > 0 && (
                    <div className=" w-full max-w-[1260px]  mx-auto mt-10">
                    <Slider>
                      {items.map((value) => (
                        <StockCard
                          // className="w-[330px]"
                          key={value.id}
                          {...value}
                          isCarousal={true}
                        />
                      ))}
                    </Slider>
                    </div>
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
