import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import StockProgressBarDotted from "@/components.v3/common/StockProgressBarDotted";
import StockProgressBarSolid from "@/components.v3/common/StockProgressBarSolid";
import { format } from "date-fns";
import StockCardTargets from "@/components.v3/common/StockCardTargets";
import { debounce } from "@/lib/debounce";
import { useStockProgressBar } from "@/utils/useStockProgressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TTarget } from "@/types/shared";

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  entry_date: string;
  stock_targets: any;
};

export default function StockDetailProgressBar({
  live_price,
  entry_price,
  entry_date,
  stock_targets,
}: TStockCardProgressBarSection) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targets,setTargets] = useState<TTarget[]>([])
  const { margins, currentProgress, dottedLineWidth, ref, targetRef,cmpRef } = useStockProgressBar(null,targets);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (direction: number) => {
    const container = containerRef.current;
    const scrollAmount = 150; // Width of one item
    if (!container) return;
    container.scrollBy({
      left: scrollAmount * direction,
      behavior: "smooth",
    });
  };

  const checkScrollability = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
    };
  }, []);


  useEffect(()=>{
    let targets = [...stock_targets].sort((a,b)=>a.target_price-b.target_price) ;
    targets = targets.map((item:any,index:any)=>({label:`Target ${index+1}`,date:format(new Date(item.created), "dd MMM yyyy"), price:item.target_price, status:item.target_met ? "Completed":"Active"}))
    targets = targets.slice(0, stock_targets.length-1)
    targets.push({label:'CMP',price:live_price, date:format(new Date(), "dd MMM yyyy"),status:'Completed'})
    setTargets(targets.sort((a,b)=>a.price-b.price))
  },[])

  return (
    <div className=" relative w-full">
      <button
        style={{ display: canScrollLeft ? "flex" : "none" }}
        onClick={() => handleScroll(-1)}
        className="absolute -left-5 top-[40%] transform -translate-y-1/2 z-30 h-6 w-6 bg-white rounded-full flex items-center justify-center  disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]"
        disabled={!canScrollLeft}
      >
        <ChevronLeft className=" h-4 w-4" />
      </button>
      <button
        style={{ display: canScrollRight ? "flex" : "none" }}
        onClick={() => handleScroll(1)}
        className="absolute right-0 top-[40%] transform -translate-y-1/2 z-30 bg-white rounded-full  h-6 w-6 flex items-center justify-center  disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]"
        disabled={!canScrollRight}
      >
        <ChevronRight className=" h-4 w-4" />
      </button>
      <div
        ref={containerRef}
        className={`flex ${targets.length <= 4 ? "justify-between" : ""} relative overflow-x-auto scroll-smooth`}
        style={{
          scrollSnapType: "x mandatory",
          scrollPadding: "0 24px",
        }}
      >
        <div style={{ flex: "0 0 150px", scrollSnapAlign: "start" }}>
          <StockCardTargets
            index={0}
            label={"Entry Price"}
            price={entry_price}
            date={format(new Date(entry_date), "dd MMM yyyy")}
            status={"Completed"}
            className=" !items-start w-[90px]"
            ref={ref}
            showToolTip
            tooltipContent={
              <p className=" p-4 text-2xs max-w-[300px] whitespace-normal">
                The price at which the stock recommendation was given by KamayaKya. You can buy the stock as long as the
                action is 'Buy'.
              </p>
            }
          />
        </div>
        {targets.map((target: TTarget, index: number) => (
          //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
          // <CarouselItem key={index + 1} className={` basis-1/3`}>
          <div style={{ flex: "0 0 150px", scrollSnapAlign: "start" }}>
            <StockCardTargets
              index={target.label.includes("CMP") ? 0:index + 1}
              label={target.label}
              price={target.price}
              date={target.date}
              status={target.status}
              ref={target.label.includes("CMP")?cmpRef:ref}
              className=" w-[90px]"
            />
          </div>
          // </CarouselItem>
        ))}

        {/* <div style={{ flex: "0 0 150px", scrollSnapAlign: "start" }}>
          <StockCardTargets
            index={stock_targets.length}
            label={"CMP"}
            price={live_price}
            className=" w-[90px]"
            date={format(new Date(), "dd MMM yyyy")}
            status={"Completed"}
            ref={ref}
            showToolTip
            tooltipContent={
              <div className=" p-4 max-w-[300px]">
                <h3 className=" text-2xs font-bold">Current Market Price</h3>
                <p className=" text-2xs">
                  The current or live price at which the stock is trading on the NSE or BSE exchange.
                </p>
              </div>
            }
          />
        </div> */}
        <div style={{ flex: "0 0 90px", scrollSnapAlign: "start" }}>
          <StockCardTargets
            index={0}
            label={"Target"}
            price={stock_targets[0].target_price}
            status={stock_targets[0].target_met ? "Completed" : "Active"}
            className=" !items-end  w-[90px]"
            ref={targetRef}
          />
        </div>
        {/* SOLID PROGRESS */}
        <StockProgressBarSolid
          width={`calc(100% - ${margins.marginLeft + margins.marginRight}px)`}
          marginLeft={margins.marginLeft}
          marginRight={margins.marginRight}
          currentProgress={currentProgress}
        />

        {/*DOTTED PROGRESS  */}
        <StockProgressBarDotted
          className=" "
          width={dottedLineWidth}
          marginLeft={margins.marginLeft}
          marginRight={margins.marginRight}
        />
      </div>
    </div>
  );
}
