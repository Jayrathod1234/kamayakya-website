import React from "react";
import Legend from "./Legend";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import Circle from "@mui/icons-material/Circle";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";

export default function LegendSection({
  className,
  iconSize = 10,
  labelClassName,
  imgClassName,
}: {
  className?: string;
  iconSize?: number;
  labelClassName?: string;
  imgClassName?: string;
}) {
  return (
    <Carousel>
      <CarouselContent className={cn(" items-center gap-x-3 sm:gap-x-10 py-5", className)}>
        <CarouselItem className=" basis-auto">
          <Legend
            dialogHeader="Entry Price"
            imgClassName={imgClassName}
            labelClassName={labelClassName}
            label="Entry Point"
            icon="/assets/entry_marker.svg"
            iconSize={iconSize}
            tooltipContent={
              <p className=" text-2xs whitespace-normal">
                The price at which the stock recommendation was given by KamayaKya. You can buy the stock as long as the
                action is 'Buy'.
              </p>
            }
          />
        </CarouselItem>
        <CarouselItem className=" basis-auto">
          <Legend
            imgClassName={imgClassName}
            labelClassName={labelClassName}
            label="Past Targets"
            icon={
              <AdjustIcon
                fontSize={"small"}
                className={cn(
                  ` text-[#1ACE1B] QontoStepIcon-completedIcon !h-[${iconSize}px] !w-[${iconSize}px] border border-white bg-white max-w-fit !rounded-full `,
                  imgClassName
                )}
              />
            }
          />
        </CarouselItem>
        <CarouselItem className=" basis-auto">
          <Legend
            imgClassName={imgClassName}
            labelClassName={labelClassName}
            label="Active Targets"
            icon={
              <GpsFixedIcon
                fontSize={"small"}
                className={cn(
                  `QontoStepIcon-lastStepIcon text-[#FF7F09] !h-[${iconSize}px] !w-[${iconSize}px] border border-white rounded-full max-w-fit bg-white`,
                  imgClassName
                )}
              />
            }
          />
        </CarouselItem>
        <CarouselItem className=" basis-auto">
          <Legend
            imgClassName={imgClassName}
            labelClassName={labelClassName}
            iconSize={iconSize}
            label="Exit Point"
            icon={"/assets/exit_icon.svg"}
          />
        </CarouselItem>
        <CarouselItem className=" basis-auto">
          <Legend
            imgClassName={imgClassName}
            labelClassName={labelClassName}
            dialogHeader="CMP"
            label="CMP"
            icon={
              <Circle
                className={cn(
                  ` text-[#1D9387] !h-[${iconSize}px] !w-[${iconSize}px] max-w-fit  border border-white rounded-full relative`,
                  imgClassName
                )}
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
