import React from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { useMediaQuery } from "@mui/material";

const HotStockSectionSlider = ({ items }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <div className="relative z-[2] sm:pb-[100px] pb-[60px] sm:mt-5  mt-6">
        <div className="sm:container sm:mx-auto mx-0">
          <div className="sm:bg-white bg-transparent sm:p-2.5 p-0 sm:rounded-[20px] rounded-t-[20px] overflow-hidden max-w-[1280px] mx-auto">
            <div className="">
              <div className="bg-white bg-[url('/assets/grid.png')] bg-cover pt-5  text-center rounded-[20px] pb-3">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 text-gray-950">
                  Hot Stocks ({items?.length})
                </h2>
                <p className="pt-3 font-normal text-md text-gray-600 pb-6">
                  Top stocks to invest in right NOW!
                </p>
                {(isMobile && items.length <= 1) ||
                (!isMobile && items.length <= 3) ? (
                  <div className="flex justify-center gap-5">
                    {items.map((value) => (
                      <StockCard key={value.id} {...value} />
                    ))}
                  </div>
                ) : (
                  <div className="w-full">
                    <HotSlider>
                      {items.map((value) => (
                        <StockCard key={value.id} {...value} />
                      ))}
                    </HotSlider>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotStockSectionSlider;
