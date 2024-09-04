import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import StockProgressBarDotted from "@/components.v3/common/StockProgressBarDotted";
import StockProgressBarSolid from "@/components.v3/common/StockProgressBarSolid";
import { format } from "date-fns";
import StockCardTargets from "@/components.v3/common/StockCardTargets";

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

export default function StockDetailProgressBar({
  live_price,
  entry_price,
  entry_date,
  stock_targets,
}: TStockCardProgressBarSection) {
  const ref = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [currentProgress, setCurrentProgress] = useState(1);
  const targets = useMemo(() => stock_targets.slice(1, stock_targets.length).reverse(), [stock_targets]);
  // const width = 
  useEffect(() => {
    if (!ref.current || ref.current?.length <= 0) return;
    const div1 = ref.current[0];
    const div2 = ref.current[ref.current.length - 1];

    // Get the bounding rectangles of both divs
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();

    // Calculate the distance between the centers of the two divs
    const distanceX = rect2.left + rect2.width / 1.2 - (rect1.left + rect1.width / 2);
    const distanceY = rect2.top + rect2.height / 2 - (rect1.top + rect1.height / 2);

    // Calculate the Euclidean distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    // console.log("DISTANCE",distance)
    setCurrentProgress(distance);
    console.log(ref.current, targets);
    setMargins(() => ({
      marginLeft: 0,
      // marginRight: ref.current[targets.length - 2].offsetWidth / 2,

      marginRight: ref.current[ref.current.length - 2].offsetWidth / 2,
    }));
  }, [ref.current, targets]);

  return (
    <div className=" relative flex justify-between">
      <StockCardTargets
        index={0}
        label={"Entry Price"}
        price={entry_price}
        date={format(new Date(entry_date), "dd MMM yyyy")}
        status={"Completed"}
        className=" !items-start "
        ref={ref}
      />
     
      {targets.map((target: TTarget, index: number) => (
        //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
        // <CarouselItem key={index + 1} className={` basis-1/3`}>
        <StockCardTargets
          index={index + 1}
          label={"Target " + (index + 1)}
          price={target.target_price}
          date={format(new Date(target.created), "dd MMM yyyy")}
          status={target.target_met ? "Completed" : null}
          ref={ref}
        />
        // </CarouselItem>
      ))}
      <StockCardTargets
        index={stock_targets.length}
        label={"CMP"}
        price={live_price}
        className=""
        date={format(new Date(), "dd MMM yyyy")}
        status={"Completed"}
        ref={ref}
      />
      <StockCardTargets
        index={stock_targets.length + 1}
        label={"Target"}
        price={stock_targets[0].target_price}
        status={stock_targets[0].target_met ? "Completed" : "Active"}
        className=" !items-end "
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
        className=" "
        width={`calc(100% - ${margins.marginLeft + margins.marginRight}px)`}
        marginLeft={margins.marginLeft}
        marginRight={margins.marginRight}
      />
    </div>
  );
}

{
  /* <Carousel className=" z-20 " opts={{ slidesToScroll: "auto" }}>
        <CarouselContent className=" justify-between">
          <CarouselItem className={` basis-1/4 bg-purple-400`}>
           
          </CarouselItem>
          
          <CarouselItem className={` basis-1/2 bg-green-400`}>
           
          </CarouselItem>
          <CarouselItem className={`basis-1/5 `}>
            
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className=" left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
        <CarouselNext className=" right-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
      </Carousel> */
}
