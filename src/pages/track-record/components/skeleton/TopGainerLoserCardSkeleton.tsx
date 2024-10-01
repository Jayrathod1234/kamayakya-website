import { Skeleton } from '@mui/material'
import React from 'react'

export default function TopGainerLoserCardSkeleton() {
  return (
    <div
      className=" transition-[shadow] duration-150 hover:shadow-[0px_8.2px_8.2px_-4.1px_rgba(16,24,40,0.04),0px_20.49px_24.59px_-4.1px_rgba(16,24,40,0.1)]
 flex flex-col bg-white rounded-[9px] p-4 h-fit sm:h-[176px] flex-1 relative cursor-pointer min-w-0 "
    >
      

      <div className=" flex flex-col justify-center sm:flex-row sm:justify-between items-center gap-x-[3.81px]">
        <div className=" flex items-center">
          <Skeleton height={24} className=' w-16 !rounded-full'/>
          
        </div>
        <div className=" my-5 sm:my-0  h-10 w-[98px] max-w-full !rounded-full">
          <Skeleton height={40} className=' w-full ml-auto'/>
        </div>
      </div>
      <div className=" mt-auto">
        <div className=" flex items-center gap-x-[2px] max-sm:justify-center ">
          {/* <Skeleton height={11} width={15} className=' rounded'/> */}
          <img
            width={15}
            height={11}
            className=" !w-[15px] !h-[11px]"
            src={"/assets/Polygon2.svg"}
            alt=""
          />
          
            <Skeleton height={24} className="w-[103px]  !rounded-full"/>
         
        </div>
        <div
          className={`flex items-center gap-y-[10px] flex-wrap sm:flex-nowrap flex-col sm:flex-row `}
        >
          
            <div className=" min-w-0 w-full max-w-[120px] h-[18px] flex items-center justify-center sm:m-0">
              <img
                className=" object-contain inline-block h-[18px] w-[18px]"
                height={18}
                width={18}
                src="/assets/noto_locked.png"
                alt="lock"
              />
              <Skeleton height={14} className=" w-full h-[14px] rounded-full mt-[6px]"/>
            </div>
            
            <Skeleton height={14} className=' w-12 sm:ml-auto'/>
        </div>
      </div>
    </div>
  )
}
