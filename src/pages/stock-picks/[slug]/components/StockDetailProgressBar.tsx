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
import { useFormattedTargets } from "@/utils/useFormattedTargets";

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
  // const [targets,setTargets] = useState<TTarget[]>([])
  const { targets, targetIndex, cmpIndex } = useFormattedTargets({
    stock_targets,
    entry_date,
    entry_price,
    live_price,
  });
  const { margins, currentProgress, dottedLineWidth, ref, targetRef, cmpRef, cmpMarginRight } = useStockProgressBar({
    targets,
    targetIndex,
    cmpIndex,
  });
 
  return (
    <div className=" relative w-full">
      <Carousel className=" z-20 w-full" opts={{ slidesToScroll: 3, align:"center",startIndex:targetIndex }}>
        <CarouselContent className="  justify-between">
          {targets.map((target: TTarget, index: number) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            <CarouselItem key={index} className={` ${index === targets.length-1 ? " -pl-4":" "}  basis-auto`}>
              <StockCardTargets
                index={index}
                label={target.label}
                price={target.price}
                date={index !== targetIndex ? target.date : ""}
                status={target.status}
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
        </CarouselContent>
        <CarouselPrevious className=" h-6 w-6 p-1 left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
        <CarouselNext className=" h-6 w-6 p-1 right-[16px] top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      </Carousel>
    </div>
  );
}
