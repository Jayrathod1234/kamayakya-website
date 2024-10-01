import { Skeleton } from "@mui/material";
import React from "react";

export default function AverageReturnCardSkeleton() {
  return (
    <div className=" bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)] p-4 rounded-xl max-h-[176px] w-full md:w-[40%] flex flex-row md:flex-col justify-between">
      <div className=" self-center md:self-start order-2 md:order-1  ">
        <Skeleton height={36} className=" w-[44px] rounded-[6px]  md:p-2" variant="rectangular" />
        {/* <img className="block md:hidden " width="36" height="36" src="/assets/Layer_1_light_mobile.svg" /> */}
      </div>
      <div className=" order-1 md:order-2 flex flex-col h-full">
        <div className="mt-[10px] flex items-center justify-center md:justify-start gap-x-[5px]">
          <div className="  text-sm font-semibold text-brand-200 whitespace-nowrap truncate">
            <Skeleton variant="rectangular" className=" h-[14px] w-24 rounded-full" />{" "}
          </div>
        </div>
        <div className=" mt-4 md:mt-[42px] flex gap-x-[10px]">
          <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
          <Skeleton height={32} className=" inline-block h-8 w-[103px] rounded-full"/>
    
        </div>
      </div>
    </div>
  );
}
