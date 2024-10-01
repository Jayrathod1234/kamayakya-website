import React, { forwardRef, useCallback, useMemo } from "react";
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
import { format } from "date-fns";
import { debounce } from "@/lib/debounce";
import StockCardTargets from "./StockCardTargets";

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

type TTarget = {
  target_met: string;
  created: string;
  target_price: number;
};

type TStockCardProgressBarSection = {
  live_price: number;
  entry_price: number;
  entry_date: string;
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


export default function StockCardProgressBarSection2({
  live_price,
  entry_price,
  entry_date,
  stock_targets,
}: TStockCardProgressBarSection) {
  const [api, setApi] = React.useState<CarouselApi>();
  const ref = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [currentSlidesInView, setCurrentSlidesInView] = useState<Array<number | null>>([]);
  const [currentProgress, setCurrentProgress] = useState(1);
  const targets = useMemo(() => stock_targets.reverse(), []);

  useEffect(() => {
    if (!api) return;
    api.on("scroll", () => {
      let currentSlideInView = api.slidesInView();

      setCurrentSlidesInView(
        currentSlideInView.length > 3 ? [...currentSlideInView.slice(0, 3)] : [...currentSlideInView]
      );
    });
  }, [api]);

  useEffect(() => {
    console.log(currentSlidesInView, "INVOKED");
    if (!currentSlidesInView || currentSlidesInView?.length == 0) return;
    // let currentPointsProgress = currentSlidesInView.reduce(
    //   (acc: number, current) => (targets[current as number]?.status === "Completed" ? acc + 1 : acc),
    //   0
    // );
    let currentPointsProgress = currentSlidesInView.reduce((acc: number, current) => {
      let ele = ref.current[current as number];
      let statusEle = ele ? ele.querySelector(".status") : "Active";
      return !statusEle ? acc + 1 : acc;
    }, 0);
    setCurrentProgress(((currentPointsProgress - 1) / (currentSlidesInView.length - 1)) * 100);
  }, [currentSlidesInView]);

  useEffect(() => {
    if (!ref.current) return;
    setMargins(() => ({
      marginLeft: ref.current[0].offsetWidth / 2,
      marginRight: ref.current[targets.length - 2].offsetWidth / 2,
    }));
  }, [ref.current]);

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
              date={format(new Date(entry_date), "dd MMM yyyy")}
              status={"Completed"}
              className=" !items-start ml-5 pl-2"
              ref={ref}
            />
          </CarouselItem>
          {targets
            .filter((_:unknown, index:number) => index < targets.length - 1)
            .map((target:TTarget, index:number) => (
              //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
              // ${
              //   targets.length >= 4 ? (currentSlidesInView.length >= 4 ? " basis-1/3" : "basis-1/2") : "basis-1/2"
              // }
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
          <CarouselItem className={` basis-1/4 `}>
            <StockCardTargets
              index={targets.length}
              label={"CMP"}
              price={live_price}
              className=""
              date={format(new Date(), "dd MMM yyyy")}
              status={"Completed"}
              ref={ref}
            />
          </CarouselItem>
          <CarouselItem className={` basis-1/3`}>
            <StockCardTargets
              index={targets.length}
              label={"Target"}
              price={targets[targets.length - 1].target_price}
              // date={stock_targets[0].target_date}
              status={targets[targets.length - 1].met ? "Completed" : "Active"}
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
        scaleVariant={true}
      />
    </div>
  );
}
