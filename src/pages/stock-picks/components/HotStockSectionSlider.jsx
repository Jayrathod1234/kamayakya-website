import React from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { useMediaQuery } from "@mui/material";

const HotStockSectionSlider = ({ items, stockSector }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div className="relative z-[2] pb-[60px] sm:pb-[110px] mt-[20px]">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="bg-transparent sm:bg-gray-150 p-0 sm:p-2.5 rounded-t-[20px] sm:rounded-[20px] overflow-hidden">
          <div className="bg-white bg-[url('/assets/grid.png')] bg-cover pt-5 text-center rounded-t-[20px] sm:rounded-[20px] pb-5">
            <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
              Hot Stocks ({items?.length})
            </h2>
            <p className="pt-3 font-normal text-sm text-gray-500 pb-6">
              Top stocks to invest in right NOW!
            </p>
            {(isMobile && items.length <= 1) || (!isMobile && items.length <= 3) ? (
              <div className="flex justify-center gap-5">
              {items.map((value) => (
                <StockCard
                  key={value.id}
                  {...value}
                  stockSector={stockSector}
                />
              ))}
            </div>
            ) : (
              <div className="w-full">
              <HotSlider>
                {items.map((value) => (
                  <StockCard
                    key={value.id}
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
  );
};

export default HotStockSectionSlider;
