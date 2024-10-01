import { Skeleton } from '@mui/material'
import React from 'react'

export default function TrackRecordHeroCardNewChipSkeleton() {
  return (
    <div className=" whitespace-nowrap  px-2 py-[2px] rounded-full  inline-block mb-0">
    <Skeleton variant='rectangular' className=' w-16   sm:w-44 rounded-full' height={"19px"}/>
   </div>
  )
}
