import { Skeleton } from "@mui/material";
import React from "react";

export default function TrackRecordCardSkeleton() {
  return (
    <div className={`p-[1px] bg-white rounded-lg relative flex justify-center lg:max-w-[630px]`}>
      <div className=" p-5 bg-white max-h-[451px] w-full lg:max-w-[630px] rounded-lg overflow-hidden">
        {/* TOP SECTION */}
        <div className=" flex gap-x-2 items-center justify-between">
          <div className="flex items-center w-full">
            <Skeleton height={32} className=" w-1/2 !rounded-full" />
          </div>
          <Skeleton height={34} width={38} variant="circular" />
        </div>

        
          <div className=" flex items-center gap-[8px] ">
            <Skeleton height={26} width={120} className=" !rounded-full" />
            <Skeleton height={26} width={120} className=" !rounded-full" />
            <Skeleton height={26} width={120} className=" !rounded-full" />
          </div>
        
        <Skeleton height={200} className=" !h-[180px] w-full !rounded-lg" />
        <div className="p-1 pr-4 rounded-[4px] flex gap-x-4 bg-[rgba(249,250,251,1)]">
          {/* Total Returns */}
          <div
            className={`  rounded-lg 
                 bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)]
              px-3 py-2 !h-[78px] min-w-[140px]`}
          >
            <Skeleton className=" !h-[13px]"/>
            <div className={` flex gap-x-[2px] `}>
              <img width={15} height={11} src={"/assets/Polygon2.svg"} alt="" />
              <Skeleton className=" !h-8 !w-[93px] !rounded-full"/>
              
            </div>
            <Skeleton className=" !h-[10px] !w-1/2 !rounded-full"/>
          </div>
          {/* Total Returns End*/}
          {/* Upside Left */}
          <div className=" flex flex-col justify-center">
            <div className=" flex items-center gap-x-1">
              <Skeleton className="!h-4 !w-3/4 !rounded-full"/>
            </div>
            <Skeleton className=" !h-8 !w-32 !rounded-md"/>
            <Skeleton className="!h-4 !w-3/4 !rounded-full"/>
          </div>
          <div className=" ml-auto mt-auto">
            {/* <img height={72} width={72} src={getMascotImg(action)} alt="action-mascot" /> */}
          </div>
          {/* Upside Left End  */}
        </div>
        <div className=" !h-20 pt-5">
          <Skeleton className=" !h-full w-full !rounded-md"/>
        </div>
        {/* BOTTOM SECTION END */}
      </div>
    </div>
  );
}
