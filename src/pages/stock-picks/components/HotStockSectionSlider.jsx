import React from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
// import { HotSliderN } from "../../../components.v3/common/HotSliderN";

const HotStockSectionSlider = ({ items }) => {
  return (
    <div>
      <div className="relative z-[2] pb-[110px] mt-[20px]">
        <div className="sm:container sm:mx-auto mx-0">
          <div className="bg-gray-150 py-[10px] sm:rounded-[20px] rounded-t-[20px] overflow-hidden">
            <div className="">
              <div className=" pt-5  text-center rounded-[10px]">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                  Hot Stocks ({items?.length})
                </h2>
                <p className="pt-3 font-normal text-sm text-gray-500 pb-6">
                  Top stocks to invest in right NOW!
                </p>
                {items.length > 0 && (
                  <div className=" mb-6 w-full">
                    <HotSlider>
                    {/* <HotSliderN> */}
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
