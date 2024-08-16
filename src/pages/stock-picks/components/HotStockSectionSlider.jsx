import React from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";

const HotStockSectionSlider = ({ items }) => {
  return (
    <div>
      <div className="relative z-[2] pb-[110px] mt-[20px]">
        <div className="container mx-auto">
          <div className="bg-gray-150 p-[10px] rounded-[20px]">
            <div className="bg-[#fff] bg-[url('/assets/grid.png')] bg-cover rounded-[20px] px-10 py-8 gap-10 text-center">
              <div className=" pt-5   rounded-[10px]">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                  Hot Stocks ({items?.length})
                </h2>
                <p className="pt-3 font-normal text-sm text-gray-500 pb-6">
                  Top stocks to invest in right NOW!
                </p>
                {items.length > 0 && (
                  <div className=" mb-6 w-full">
                    <HotSlider>
                      {items.map((value) => (
                        <StockCard
                          key={value.id} // Ensure each item has a unique key
                          {...value}
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
