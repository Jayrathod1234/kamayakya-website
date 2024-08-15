import React, { useContext } from "react";
import { Slider } from "@/components.v3/common/Slider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getLatestReleasesStockListApi } from "@/api/stock-picks";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
function LatestReleases({ sebiBoardType }) {
  const { isLoggedIn } = useContext(AuthContext);
  // Use react-query to fetch the strategy tag list
  const { data: items = [] } = useQuery({
    queryKey: ["latestReleasesStock", sebiBoardType, isLoggedIn],
    queryFn: () =>
      getLatestReleasesStockListApi({ isLoggedIn, type: sebiBoardType }),
  });
  return (
    <>
      <div className=" pt-[339px] pb-[100px] ">
        <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
          <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans">
            Latest Releases ({items.length})
          </p>
          <p className=" text-sm font-normal text-[#475467] w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto pt-3 font-open_sans">
            New Stocks released in the last 60 days
          </p>
          {items.length > 0 && (
            <div className=" mb-6 w-full">
              <Slider>
                {items.map((value) => (
                  <StockCard
                    key={value.id} // Ensure each item has a unique key
                    {...value}
                  />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LatestReleases;
