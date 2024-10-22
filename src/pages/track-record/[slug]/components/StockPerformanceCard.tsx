import React, { useState } from "react";
import { cn } from "../../../../lib/utils";
import {  TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../components.v2/ui/tooltip";
import Tooltip from "@/components.v3/common/Tooltip";

type TStockPerformanceCard = {
  className?:string;
  cagr_of_stock?:string;
  label:string;
  tooltip?:boolean;
  tooltipTrigger?:React.ReactNode;
  tooltipContent?:React.ReactNode;
  value:number;
  time:string;
  icon:React.ReactNode;
  valueClassname?:string;
  timeClassname?:string;
  labelClassname?:string;
  iconContainerClassName?:string;
}

export default function StockPerformanceCard({
  className,
  cagr_of_stock,
  label,
  tooltip,
  tooltipTrigger,
  tooltipContent,
  value,
  time,
  icon,
  valueClassname,
  timeClassname,
  labelClassname,
  iconContainerClassName,
}:TStockPerformanceCard) {
  return (
    <div
      className={cn(
        `w-full min-w-[150px]  ${
          cagr_of_stock ? "md:col-span-full lg:col-span-1" : ""
        }  p-4 pt-2 pr-2 pb-4  rounded-lg bg-white flex flex-col max-h-[100px]`,
        className
      )}
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className=" flex justify-between w-full">
          <div className="flex gap-1 items-center">
            <p className={cn("font-open_sans text-sm font-semibold text-[#FCFCFD]",labelClassname)}>{label}</p>
            <div className="relative">
              {tooltip ? (
                <Tooltip tooltipContent={tooltipContent} tooltipTrigger={tooltipTrigger} />
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <div className={cn(`p-2`,iconContainerClassName)}>{icon}</div>
          </div>
        </div>
      </div>
      <div className={cn("flex mt-auto flex-row items-center gap-1 text-[24px]  text-[#344054] font-bold",valueClassname)}>
        {label === "Upside Left" ? null : value >= 0 ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path
                d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                fill="#00FF02"
              />
            </svg>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              style={{ transform: "rotate(180deg)" }} // Rotate the SVG 180 degrees
            >
              <path
                d="M7.03446 0.649754C7.43652 0.0861183 8.27587 0.091733 8.67036 0.660698L14.4116 8.94137C14.8714 9.60454 14.3968 10.5111 13.5898 10.5111H1.94168C1.1286 10.5111 0.655406 9.59235 1.12758 8.93042L7.03446 0.649754Z"
                fill="#FF0000" // Change color to red
              />
            </svg>
          </>
        )}
        <div className=" flex items-baseline gap-x-1">
          {Math.abs(value)}% {""}
          <span className={cn("text-[12px]  text-[#667085] sm:font-medium line-clamp-1",timeClassname)}>in {time}</span>
        </div>
      </div>
    </div>
  );
}
