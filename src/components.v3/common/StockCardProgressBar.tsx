import React, { forwardRef, useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components.v2/ui/carousel";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import EastIcon from "@mui/icons-material/East";
import { Check } from "lucide-react";
import Circle from "@mui/icons-material/Circle";
import StockProgressBarDotted from "./StockProgressBarDotted";
import StockProgressBarSolid from "./StockProgressBarSolid";
import { cn } from "@/lib/utils";
const targets = [
  { price: 3725, label: "Target-2", date: "Jan 2024", status: "Completed" },
  // { price: 3740, label: "Target-3", date: "Feb 2024", status: "Completed" },
  // { price: 3725, label: "Target-4", date: "Jan 2024", status: "Completed" },
  // { price: 3740, label: "Target-5", date: "Feb 2024", status: "Completed" },
  // { price: 3725, label: "Target-6", date: "Jan 2024", status: "Completed" },
  // { price: 3740, label: "Target-7", date: "Feb 2024", status: "Completed" },
  // { price: 4470, label: "CMP", date: "Mar 2024", status: "Completed" },
  // { price: 5364, label: "Target-8", status: "Active" },
];
const prices = [3725, 3740, 4470, 5364];
const labels = ["Target-2", "Target-3", "CMP", "Target-4"];
const dates = ["Jan 2024", "Feb 2024", "Mar 2024"];

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  stock_targets: any;
};
type TStockCardTargetsProps = {
  index: number;
  label: string;
  price: number;
  date: string;
  status: string; // adjust based on your actual status values
  className?: string;
  // ref: React.MutableRefObject<HTMLDivElement[]>;
};
const StockCardTargets = forwardRef<HTMLDivElement[], TStockCardTargetsProps>(function StockCardTargets(props, ref) {
  let { index, label, price, date, status, className } = props;
  const refs = ref as React.MutableRefObject<HTMLDivElement[]>;
  return (
    <div
      ref={(el) => (refs ? (refs.current[index] = el as HTMLDivElement) : null)}
      className={cn(
        ` relative flex flex-col  z-10 ${index === targets.length - 1 ? "items-center" : "items-center"}`,
        className
      )}
    >
      <h4 className=" font-medium text-3xs text-[#667085] flex items-center">
        {/* {index == 0 ? (
          "Entry Point"
        ) : ( */}
        <>
          {label}
          {label.includes("Target") && status === "Completed" ? (
            <span>
              <Check className=" text-[#12B76A]" size={12} />
            </span>
          ) : null}
        </>
        {/* )} */}
      </h4>
      <div className="   bg-white rounded-full flex items-center justify-center">
        {index === 0 ? (
          <span className=" bg-[#04B9F9] rounded-full h-3 w-3 flex items-center justify-center">
            <EastIcon className="!h-3 !w-3 text-white" fontSize="small" />
          </span>
        ) : (
          <>
            {status === "Active" && (
              <GpsFixedIcon fontSize={"small"} className="QontoStepIcon-lastStepIcon text-[#FF7F09] !h-3 !w-3" />
            )}
            {label === "CMP" && <Circle className=" text-[#1D9387] !h-3 !w-3" fontSize="small" />}
            {label.includes("Target") && status === "Completed" ? (
              <AdjustIcon fontSize={"small"} className=" text-[#1ACE1B] QontoStepIcon-completedIcon !h-3 !w-3" />
            ) : null}
          </>
        )}
      </div>
      <h4 className=" text-[#344054] font-semibold text-sm mt-[6px] mb-0">₹{index === 0 ? price : price}</h4>
      {status === "Active" ? <p className=" text-[#FF7F09] text-3xs status">{status}</p> : null}
      {date ? <p className=" text-[#98A2B3] text-3xs whitespace-nowrap">{date}</p> : null}
    </div>
  );
});

export default function StockCardProgressBarSection({
  live_price,
  entry_price,
  stock_targets,
}: TStockCardProgressBarSection) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [currentSlidesInView, setCurrentSlidesInView] = useState<Array<number | null>>([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("scroll", () => {
      let currentSlideInView = api.slidesInView();
      setCurrentSlidesInView(
        currentSlideInView.length > 3 ? [...currentSlideInView.slice(0, 3)] : [...currentSlideInView]
      );
      console.log("SLIDES IN VIEW", api.slidesInView());
      const progress = Math.max(0, Math.min(1, api.scrollProgress()));
      setScrollProgress(progress * 100);
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    // api.on("scroll", () => {
    let currentSlideInView = api.slidesInView();
    setCurrentSlidesInView(
      currentSlideInView.length > 3 ? [...currentSlideInView.slice(0, 3)] : [...currentSlideInView]
    );
    console.log("SLIDES IN VIEW", api.slidesInView());
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * 100);
    // });
  }, [api]);
  //  console.log(scrollProgress)

  useEffect(() => {
    console.log(currentSlidesInView, "INVOKED");
    if (currentSlidesInView.length == 0) return;
    // let currentPointsProgress = currentSlidesInView.reduce(
    //   (acc: number, current) => (targets[current as number]?.status === "Completed" ? acc + 1 : acc),
    //   0
    // );
    let currentPointsProgress = currentSlidesInView.reduce((acc: number, current) => {
      console.log(current);
      let ele = ref.current[current as number];
      let statusEle = ele ? ele.querySelector(".status") : "Active";
      console.log("STATUS", statusEle);
      return !statusEle ? acc + 1 : acc;
    }, 0);
    console.log(currentPointsProgress, ref.current[1]);
    setCurrentProgress(((currentPointsProgress - 1) / (currentSlidesInView.length - 1)) * 100);
  }, [currentSlidesInView]);

  useEffect(() => {
    if (!ref.current) return;
    setMargins(() => ({
      marginLeft: ref.current[0].offsetWidth / 2,
      marginRight: ref.current[targets.length + 2 - 1].offsetWidth / 2,
    }));
  }, [ref.current]);
  console.log(margins.marginRight);
  return (
    // <div className=" pt-5 pb-4">
    <div className=" relative">
      <Carousel className=" z-20 " setApi={setApi} opts={{ slidesToScroll: 3 }}>
        <CarouselContent>
          <CarouselItem className={` basis-1/3 `}>
            <StockCardTargets
              index={0}
              label={"Entry Price"}
              price={entry_price}
              date={new Date().toString()}
              status={"Completed"}
              className=" !items-start ml-5 pl-2"
              ref={ref}
            />
          </CarouselItem>
          {targets.map((target, index) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            // ${
            //   targets.length >= 4 ? (currentSlidesInView.length >= 4 ? " basis-1/3" : "basis-1/2") : "basis-1/2"
            // }
            <CarouselItem key={index + 1} className={` basis-1/3 justify-between`}>
              <StockCardTargets
                index={index + 1}
                label={target.label}
                price={target.price}
                date={target.date}
                status={target.status}
                ref={ref}
              />
            </CarouselItem>
          ))}
          <CarouselItem className={` basis-1/3 `}>
            <StockCardTargets
              index={targets.length + 1}
              label={"CMP"}
              price={live_price}
              className=""
              date={new Date().getMonth().toString() as string}
              status={"Completed"}
              ref={ref}
            />
          </CarouselItem>
          <CarouselItem className={` basis-1/3`}>
            <StockCardTargets
              index={targets.length + 2}
              label={"Target"}
              price={stock_targets[0].target_price}
              // date={stock_targets[0].target_date}
              status={stock_targets[0].met ? "Completed" : "Active"}
              className=" !items-end mr-5 pr-1"
              // ref={ref}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className=" left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
        <CarouselNext className=" right-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
      </Carousel>
      {/*DOTTED PROGRESS  */}
      <StockProgressBarDotted
        width={`calc(100% - ${margins.marginLeft + margins.marginRight}px)`}
        marginLeft={margins.marginLeft}
        marginRight={margins.marginRight}
      />
      {/* SOLID PROGRESS */}
      <StockProgressBarSolid
        width={`calc(100% - ${margins.marginLeft + margins.marginRight}px)`}
        marginLeft={margins.marginLeft}
        marginRight={margins.marginRight}
        currentProgress={currentProgress}
      />
    </div>
  );
}
