import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import StockProgressBarDotted from "./StockProgressBarDotted";
import StockProgressBarSolid from "./StockProgressBarSolid";
import { format } from "date-fns";
import StockCardTargets from "./StockCardTargets";
import { useStockProgressBar } from "@/utils/useStockProgressBar";
import { EmblaCarouselType } from "embla-carousel";
import { useFormattedTargets } from "@/utils/useFormattedTargets";
import { TTarget } from "@/types/shared";

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  entry_date: string;
  stock_targets: any;
};

const stock_targets = [{ target_met: "", target_price: 600, created: "28 May 2024" }];
const live_price = 500;
const entry_price = 250;
const entry_date = new Date().toISOString();

export default function StockCardProgressBarBlurSection({ emblaApi }: { emblaApi: EmblaCarouselType }) {
  // const ref = useRef<Array<HTMLDivElement>>([]);
  const { targetIndex, targets, cmpIndex } = useFormattedTargets({
    stock_targets,
    entry_date,
    entry_price,
    live_price,
  });
  const { ref, margins, dottedLineWidth, currentProgress, cmpMarginRight } = useStockProgressBar({
    emblaApi,
    targets,
    targetIndex,
    cmpIndex,
  });

  console.log("MARGIN LEFT",margins)
  return (
    //
    <div className=" relative pl-4 ">
      <Carousel className=" z-10 " opts={{ slidesToScroll: 3 }}>
        <CarouselContent className=" justify-between">
          {targets.map((target: TTarget, index: number) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            <CarouselItem key={index} className={` basis-1/3 `}>
              <StockCardTargets
                index={index}
                label={target.label}
                price={target.price}
                date={index !== targetIndex ? target.date : ""}
                status={target.status}
                ref={ref}
                isBlur
              />
              {index === 0 && (
                <>
                  {/* SOLID PROGRESS */}
                  <StockProgressBarSolid
                    width={`calc(100% - ${margins.marginLeft + cmpMarginRight}px)`}
                    marginLeft={margins.marginLeft}
                    marginRight={cmpMarginRight}
                    currentProgress={currentProgress}
                    className=" top-[41%]"
                  />
                  {/*DOTTED PROGRESS  */}
                  <StockProgressBarDotted
                    // `calc(100% - ${margins.marginLeft + margins.marginRight}px)`
                    width={dottedLineWidth}
                    marginLeft={margins.marginLeft}
                    marginRight={margins.marginRight}
                    className="top-[41%]"
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
