import React, { useContext } from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "@/components/AuthContext";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { getHotStockListApi } from "@/api/stock-picks";
import HotStockSectionBlur from "./HotStockSectionBlur";
import HotStockSectionSlider from "./HotStockSectionSlider";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { Skeleton } from "@mui/material";
const HotStockSection = ({ sebiBoardType }) => {
  const { isLoggedIn } = useContext(AuthContext);
  // Use react-query to fetch
  const {
    data: { data: items = [], is_limited_view: isLimitedView = false } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotStock", sebiBoardType, isLoggedIn],
    queryFn: () => getHotStockListApi({ isLoggedIn, type: sebiBoardType }),
  });

  return (
    <>
      {isLoading || error ? (
        <div className="relative z-[2] pb-[110px] mt-[20px]">
          <div className="container mx-auto">
            <div className="bg-gray-150 p-[10px] rounded-[20px]">
              <div className="bg-[#fff] bg-[url('/assets/grid.png')] bg-cover rounded-[20px] px-10 py-8 gap-10 text-center">
                <div className=" pt-5   rounded-[10px]">
                  <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 text-center">
                    <Skeleton
                      animation="wave"
                      sx={{ borderRadius: "6px" }}
                      variant="text"
                    />
                  </h2>
                  <p className="pt-3 font-normal text-sm text-gray-500 pb-6 text-center">
                    <Skeleton
                      animation="wave"
                      sx={{ borderRadius: "6px" }}
                      variant="text"
                    />
                  </p>
                  <div className="flex gap-4">
                    <StockCardSkeleton length={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isLimitedView ? (
        <>
          <HotStockSectionBlur items={items} />
        </>
      ) : (
        <>
        
          <HotStockSectionSlider items={items} />
        </>
      )}
    </>
  );
};

export default HotStockSection;
