import React, { useLayoutEffect, useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import StockProgressBarDotted from "./StockProgressBarDotted";
import StockProgressBarSolid from "./StockProgressBarSolid";
import { format, parse } from "date-fns";
import StockCardTargets from "./StockCardTargets";
import { useStockProgressBar } from "@/utils/useStockProgressBar";
import { TTarget } from "@/types/shared";

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  entry_date: string;
  stock_targets: any;
};

export default function StockCardProgressBarSection({
  live_price,
  entry_price,
  entry_date,
  stock_targets,
}: TStockCardProgressBarSection) {
  // const live_price=2500
  
  const [targets, setTargets] = useState<TTarget[]>([]);
  const { ref, targetRef, margins, dottedLineWidth, currentProgress, cmpRef, setCmpIndex, setTargetIndex,cmpMarginRight } =
    useStockProgressBar(null,targets);
  // const [position,setPosition] = useState(0)
  // const calculateLivePricePosition = ()=>{
  //   const position = (live_price - entry_price) / (stock_targets[0].target_price - entry_price) * 100;
  //   setPosition(-position-200)
  // }

  // useLayoutEffect(()=>{
  //   calculateLivePricePosition()
  // },[live_price])
  // console.log("POSITION",position)

  useEffect(() => {
    let targets = [...stock_targets].sort((a, b) => a.target_price - b.target_price);
    targets = targets.map((item: any, index: any) => ({
      label: `Target ${index + 1}`,
      date: format(new Date(item.created), "dd MMM yyyy"),
      price: item.target_price,
      status: item.target_met ? "Completed" : "Active",
    }));
    // targets = targets.slice(0, stock_targets.length - 1);
    targets.push(
      { label: "CMP", price: live_price, date: format(new Date(), "dd MMM yyyy"), status: "Completed" },
      {
        label: "Entry Price",
        price: entry_price,
        date: format(new Date(entry_date), "dd MMM yyyy"),
        status: "Completed",
      }
    );
    setTargets(targets.sort((a, b) => a.price - b.price));
  }, []);

  useEffect(() => {
    console.log("TARGETS INITIAL RENDER", targets)
    if (targets && targets.length > 0) {
      setCmpIndex(targets.findIndex((target) => target.label === "CMP"));
      // Step 1: Filter for objects with label starting with "TARGET"
      const targetObjects = targets.filter((item) => item.label.startsWith("Target"));

      // Step 2: Sort by date to find the latest target
      const latestTarget = targetObjects.sort((a, b) => {
        const dateA = parse(a.date, 'dd MMM yyyy', new Date());
        const dateB = parse(b.date, 'dd MMM yyyy', new Date());
        return dateB.getTime() - dateA.getTime();
    })[0];

      // Step 3: Get the index of the latest target in the original array
      const latestTargetIndex = targets.findIndex((item) => item.label === latestTarget.label);
      setTargetIndex(latestTargetIndex);
      console.log("TARGE=>",targets[latestTargetIndex],targets)
    }
  }, [targets.length]);

  return (
    <div className=" relative ml-4">
      <Carousel className=" z-20 " opts={{ slidesToScroll: 3 }}>
        <CarouselContent>
          {/* <CarouselItem className={` basis-1/3 `}>
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
           
          </CarouselItem> */}
          {targets.map((target: TTarget, index: number) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            <CarouselItem key={index} className={` basis-1/3 `}>
              <StockCardTargets
                // target.label.includes("CMP") ? 0 :
                index={index}
                // className={`${label===""}`}
                label={target.label}
                price={target.price}
                date={index < targets.length - 1 ? target.date : ""}
                status={target.status}
                // target.label.includes("CMP") ? cmpRef :
                ref={ref}
              />
              {index === 0 && (
                <>
                  {/* SOLID PROGRESS */}
                  <StockProgressBarSolid
                    width={`calc(100% - ${margins.marginLeft + cmpMarginRight}px)`}
                    marginLeft={margins.marginLeft}
                    marginRight={cmpMarginRight}
                    currentProgress={currentProgress}
                  />
                  {/*DOTTED PROGRESS  */}
                  <StockProgressBarDotted
                    // `calc(100% - ${margins.marginLeft + margins.marginRight}px)`
                    width={dottedLineWidth}
                    marginLeft={margins.marginLeft}
                    marginRight={margins.marginRight}
                  />
                </>
              )}
            </CarouselItem>
          ))}
          {/* <CarouselItem className={` basis-1/3 `}>
            <StockCardTargets
              index={stock_targets.length}
              label={"CMP"}
              price={live_price}
              // className={`relative translate-x-[${position}%]`}
              date={format(new Date(), "dd MMM yyyy")}
              status={"Completed"}
              ref={ref}
            />
          </CarouselItem> */}
          {/* <CarouselItem className={` basis-1/3`}>
            <StockCardTargets
              ref={targetRef}
              index={0}
              label={"Target"}
              price={stock_targets[0].target_price}
              status={stock_targets[0].target_met ? "Completed" : "Active"}
              // className=" !items-end "
            />
          </CarouselItem>
         */}
        </CarouselContent>
        <CarouselPrevious className=" h-6 w-6 p-1 left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
        <CarouselNext className=" h-6 w-6 p-1 right-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      </Carousel>
    </div>
  );
}
