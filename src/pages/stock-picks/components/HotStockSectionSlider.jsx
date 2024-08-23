import React from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { useMediaQuery } from "@mui/material";

const HotStockSectionSlider = ({ items, stockSector }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div>
      <div className="relative z-[2] sm:pb-[110px] pb-[60px] mt-[20px]">
        <div className="sm:container sm:mx-auto mx-0">
          <div className="sm:bg-gray-150 bg-transparent sm:p-2.5 p-0 sm:rounded-[20px] rounded-t-[20px] overflow-hidden">
            <div className="">
              <div className="bg-white bg-[url('/assets/grid.png')] bg-cover pt-5  text-center rounded-[20px]">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                  Hot Stocks ({items?.length})
                </h2>
                <p className="pt-3 font-normal text-sm text-gray-500 pb-6">
                  Top stocks to invest in right NOW!
                </p>
                {items.length > 0 && (
                  <div className=" mb-0 w-full">
                    <HotSlider>
                      {/* <HotSliderN> */}
                      {items.map((value) => (
                        <StockCard
                          key={value.id} // Ensure each item has a unique key
                          {...value}
                          stockSector={stockSector}
                        />
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
