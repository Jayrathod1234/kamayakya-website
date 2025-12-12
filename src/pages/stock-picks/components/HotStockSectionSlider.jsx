import React, { useEffect, useState } from "react";
import { HotSlider } from "@/components.v3/common/HotSlider.jsx";
import StockCard from "@/components.v3/common/StockCard.jsx";
import { useMediaQuery } from "@mui/material";
import { useStockPicks } from "../../../contexts/StockPicksContext";
const HotStockSectionSlider = ({ items }) => {
  const [carouselItem, setCarouselItems] = useState(items);
  const { sebiBoardType } = useStockPicks();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (items.length <= 3) {
      setCarouselItems([...items, ...items]);
    } else {
      setCarouselItems(items);
    }
  }, [items, sebiBoardType]);

  return (
    <div className="relative z-[2] sm:pb-[0px]  sm:mt-5  mt-6">
      <div className="sm:container sm:mx-auto mx-0">
        <div className="sm:bg-white bg-transparent sm:p-2.5 p-0 sm:rounded-[20px] rounded-t-[20px] overflow-hidden max-w-[1280px] mx-auto">
          <div className="">
            <div className="bg-white bg-[url('/assets/grid.webp')] bg-cover pt-5  text-center rounded-[20px] pb-5">
              <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 text-gray-950">
                Hot Stocks ({items?.length})
              </h2>
              <p className="pt-3 font-medium text-md text-gray-600 pb-6 text-[18px] font-open_sans">
                Top stock recommendations that you may buy at today’s price.
              </p>
              {(isMobile && items.length <= 1) || (!isMobile && items.length <= 2) ? (
                <div className="flex justify-center gap-5">
                  {items && items.map((value) => <StockCard key={value.id} {...value} isCarousal={true} />)}
                </div>
              ) : (
                <div className="w-full max-w-[1280px] mx-auto">
                  {carouselItem && carouselItem.length > 0 && (
                    <HotSlider>
                      {carouselItem &&
                        carouselItem.map((value, index) => (
                          <StockCard key={value.id + index} {...value} isCarousal={true} />
                        ))}
                    </HotSlider>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HotStockSectionSliderVertical = ({ items }) => {
  const [carouselItem, setCarouselItems] = useState(items);
  const { sebiBoardType } = useStockPicks();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (items.length <= 3) {
      setCarouselItems([...items, ...items]);
    } else {
      setCarouselItems(items);
    }
  }, [items, sebiBoardType]);

  return (
    <div className="relative z-[2] sm:pb-[0px]  sm:mt-5  mt-6">
      <div className="sm:container sm:mx-auto mx-0">
        <div className="sm:bg-white bg-transparent sm:p-2.5 p-0 sm:rounded-[20px] rounded-t-[20px] overflow-hidden max-w-[1280px] mx-auto">
          <div className="">
            <div className="bg-white bg-[url('/assets/grid.webp')] bg-cover py-[50px] sm:pt-5  text-center max-md:rounded-b-none max-md:rounded-bl-none rounded-[20px] sm:pb-5">
              <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0 text-gray-950">
                Hot Stocks ({items?.length})
              </h2>
              <p className="pt-3 font-medium text-md text-gray-600 pb-6 text-[18px] font-open_sans">
                Top stock recommendations that you may buy at today’s price.
              </p>
              {(isMobile && items.length <= 1) || (!isMobile && items.length <= 2) ? (
                <div className="flex justify-center gap-5">
                  {items && items.map((value) => <StockCard key={value.id} {...value} isCarousal={true} />)}
                </div>
              ) : (
                <div className="w-full max-w-[1280px] mx-auto">
                  {carouselItem && carouselItem.length > 0 && (
                    <HotSlider>
                      {carouselItem &&
                        carouselItem.map((value, index) => (
                          <StockCard key={value.id + index} {...value} isCarousal={true} />
                        ))}
                    </HotSlider>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotStockSectionSlider;
