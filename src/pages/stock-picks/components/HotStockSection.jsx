import React, { useContext } from "react";
import HotStockSectionBlur from "./HotStockSectionBlur";
import HotStockSectionSlider from "./HotStockSectionSlider";
import StockCardSkeleton from "./skeletons/StockCardSkeleton";
import { Skeleton, useMediaQuery } from "@mui/material";

const HotStockSection = ({ items, isLimitedView, isLoading, error }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isLoading || error ? (
        <div className="relative z-[2]  mt-[20px]">
          <div className="container mx-auto">
            <div className="bg-gray-150 p-[10px] rounded-[20px] max-w-[1280px] mx-auto">
              <div className="bg-[#fff] bg-[url('/assets/grid.png')] bg-cover rounded-[20px] px-2 py-3 gap-10 text-center">
                <div className=" pt-5   rounded-[10px]">
                  <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 text-center text-gray-950">
                    <Skeleton
                      animation="wave"
                      sx={{ borderRadius: "6px" }}
                      variant="text"
                    />
                  </h2>
                  <p className="pt-3 font-normal text-md text-gray-600 pb-6 text-center">
                    <Skeleton
                      animation="wave"
                      sx={{ borderRadius: "6px" }}
                      variant="text"
                    />
                  </p>
                  <div className=" gap-4  flex ">
                    <StockCardSkeleton
                      length={isMobile ? 1 : 3}
                      className={` ${isMobile ? "w-[320px] mx-auto" :"w-[calc(100%/3)]" }`}
                    />
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
