import { Skeleton } from '@mui/material'
import React from 'react'
import TrackRecordHeroCardNewChipSkeleton from './TrackRecordHeroCardNewChipSkeleton'
import AverageReturnCardSkeleton from './AverageReturnCardSkeleton'
import LiveStockPerformanceCardSkeleton from './LiveStockPerformanceCardSkeleton'
import TopGainerLoserCardSkeleton from './TopGainerLoserCardSkeleton'
export default function TrackRecordHeroCardSkeleton() {
  return (
    <div className=" p-4 bg-gray-50 rounded-[10px] w-full  z-10 relative ">
    {/* top section */}
    <div className=" flex justify-between">
      <div className=" flex items-center">
        <div className=" p-1 ml-1">
          <Skeleton animation="wave" variant="circular" height={16} width={16}/>
         
        </div>
        <div className=" text-md font-bold mr-2 whitespace-nowrap truncate"><Skeleton animation="wave" variant='rectangular' className=' w-24 sm:w-40 rounded-full'  height={16}/> </div>
        <img height={20} width={20} src="/assets/pulse.gif" alt="" />
      </div>
      <TrackRecordHeroCardNewChipSkeleton/>
    </div>
    {/* top section end */}
    {/* Middle Section */}
    <div className=" flex flex-col md:flex-row mt-4 gap-3">
       <AverageReturnCardSkeleton />
     <LiveStockPerformanceCardSkeleton />
    </div>
    {/* Middle Section end */}
    {/* Lower Section */}
    <div className=" flex mt-4 gap-3 basis-1/2">
      <TopGainerLoserCardSkeleton/>
      <TopGainerLoserCardSkeleton />
    </div>
    {/* Lower Section end */}
  </div>
  )
}
