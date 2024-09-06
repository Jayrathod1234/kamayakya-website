import React, { useLayoutEffect, useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import StockProgressBarDotted from "./StockProgressBarDotted";
import StockProgressBarSolid from "./StockProgressBarSolid";
import { format } from "date-fns";
import StockCardTargets from "./StockCardTargets";
import { useStockProgressBar } from "@/utils/useStockProgressBar";

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  entry_date: string;
  stock_targets: any;
};

type TTarget = {
  target_met: string;
  created: string;
  target_price: number;
};

export default function StockCardProgressBarSection({
  live_price,
  entry_price,
  entry_date,
  stock_targets,
}: TStockCardProgressBarSection) {
  // const live_price=2500
  const { ref, targetRef, margins, dottedLineWidth, currentProgress } = useStockProgressBar();
  const targets = useMemo(() => stock_targets.slice(1, stock_targets.length).reverse(), [stock_targets]);
  const [position,setPosition] = useState(0)
  const calculateLivePricePosition = ()=>{
    const position = (live_price - entry_price) / (stock_targets[0].target_price - entry_price) * 100;
    setPosition(-position-200)
  }

  useLayoutEffect(()=>{
    calculateLivePricePosition()
  },[live_price])
  console.log("POSITION",position)
  return (
    <div className=" relative px-4 ">
      <Carousel className=" z-20 " opts={{ slidesToScroll: 3 }}>
        <CarouselContent>
          <CarouselItem className={` basis-1/3 `}>
            <StockCardTargets
              index={0}
              label={"Entry Price"}
              price={entry_price}
              date={format(new Date(entry_date), "dd MMM yyyy")}
              status={"Completed"}
              className=" !items-start "
              ref={ref}
              showToolTip
              tooltipContent={
                <p className=" p-4 text-2xs max-w-[300px] whitespace-normal">
                  The price at which the stock recommendation was given by KamayaKya. You can buy the stock as long as
                  the action is 'Buy'.
                </p>
              }
            />
            {/* SOLID PROGRESS */}
            <StockProgressBarSolid
              width={`calc(100% - ${margins.marginLeft + margins.marginRight}px)`}
              marginLeft={margins.marginLeft}
              marginRight={margins.marginRight}
              currentProgress={currentProgress}
            />
            {/*DOTTED PROGRESS  */}
            <StockProgressBarDotted
              // `calc(100% - ${margins.marginLeft + margins.marginRight}px)`
              width={dottedLineWidth}
              marginLeft={margins.marginLeft}
              marginRight={margins.marginRight}
            />
          </CarouselItem>
          {targets.map((target: TTarget, index: number) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            <CarouselItem key={index + 1} className={` basis-1/3`}>
              <StockCardTargets
                index={index + 1}
                label={"Target " + (index + 1)}
                price={target.target_price}
                date={format(new Date(target.created), "dd MMM yyyy")}
                status={target.target_met ? "Completed" : null}
                ref={ref}
              />
            </CarouselItem>
          ))}
          <CarouselItem className={` basis-1/3 `}>
            <StockCardTargets
              index={stock_targets.length}
              label={"CMP"}
              price={live_price}
              className={`relative translate-x-[${position}%]`}
              date={format(new Date(), "dd MMM yyyy")}
              status={"Completed"}
              
              ref={ref}
            />
          </CarouselItem>
          <CarouselItem className={` basis-1/3`}>
            <StockCardTargets
              ref={targetRef}
              index={0}
              label={"Target"}
              price={stock_targets[0].target_price}
              status={stock_targets[0].target_met ? "Completed" : "Active"}
              className=" !items-end "
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className=" h-6 w-6 p-1 left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
        <CarouselNext className=" h-6 w-6 p-1 right-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      </Carousel>
    </div>
  );
}
