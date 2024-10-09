import React from "react";
import Legend from "./Legend";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import Circle from "@mui/icons-material/Circle";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";

export default function LegendSection({ className }: { className?: string }) {
  return (
    
      <Carousel>
        <CarouselContent className={cn(" items-center gap-x-3 sm:gap-x-10 py-5", className)}>
          <CarouselItem className=" basis-auto">
            <Legend
              label="Entry Point"
              icon="/assets/entry_marker.svg"
              tooltipContent={
                <p className=" text-2xs whitespace-normal">
                  The price at which the stock recommendation was given by KamayaKya. You can buy the stock as long as
                  the action is 'Buy'.
                </p>
              }
            />
          </CarouselItem>
          <CarouselItem className=" basis-auto">
            <Legend
              label="Past Targets"
              icon={
                <AdjustIcon
                  fontSize={"small"}
                  className=" text-[#1ACE1B] QontoStepIcon-completedIcon !h-[10px] !w-[10px] border border-white bg-white rounded-full"
                />
              }
            />
          </CarouselItem>
          <CarouselItem className=" basis-auto">
            <Legend
              label="Active Targets"
              icon={
                <GpsFixedIcon
                  fontSize={"small"}
                  className="QontoStepIcon-lastStepIcon text-[#FF7F09] !h-[10px] !w-[10px] border border-white rounded-full bg-white"
                />
              }
            />
          </CarouselItem>
          <CarouselItem className=" basis-auto">
            <Legend label="Exit Point" icon={"/assets/exit_icon.svg"} />
          </CarouselItem>
          <CarouselItem className=" basis-auto">
            <Legend
              label="CMP"
              icon={
                <Circle
                  className=" text-[#1D9387] !h-[10px] !w-[10px] border border-white rounded-full relative"
                  fontSize="small"
                />
              }
              tooltipContent={
                <div className="">
                  <h3 className=" text-2xs font-bold">Current Market Price</h3>
                  <p className=" text-2xs">
                    The current or live price at which the stock is trading on the NSE or BSE exchange.
                  </p>
                </div>
              }
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    
  );
}
