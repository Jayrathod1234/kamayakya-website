import { NumberTicker } from '@/components.v2/magicui/number-ticker';
import { useScroll, useTransform, motion } from 'motion/react'
import React, { useRef } from 'react'


interface StatItem {
  value: number;
  label: string;
}

const stats: StatItem[] = [
  { value: 50, label: "Years of team experience" },
  { value: 3000, label: "Delighted Investors" },
  { value: 70, label: "Stocks Released" },
];

export function  StatsCard() {
  return (
    <div className="mx-auto max-w-[90%] md:max-w-[600px] open_sans rounded-2xl bg-white shadow-md flex  justify-between items-center px-2 py-3 xl:px-6 xl:py-[25px] space-y-0 md:space-y-0 md:space-x-6 -mt-8 md:-mt-16 z-20 relative">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-1 w-full flex-col items-center text-center border-gray-200 md:border-r md:border-l first:md:border-none  last:md:border-none px-2 md:px-4 first:md:px-0 last:md:px-0"
        >
          <span className=' text-[18px] md:text-[24px] lg:text-[46px] text-[#062D24E5] font-bold whitespace-nowrap'><span className=" text-[18px] md:text-[24px] lg:text-[46px] text-[#062D24E5] font-bold">{stat.value}</span>+</span>
          <span className=" text-[10px]  md:text-[13px] lg:text-[16px] xl:text-[18px] text-gray-950 font-semibold">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stat() {
 
  return (
    <motion.div 
    //  initial={{ opacity: 0, y: 100 }}
    // whileInView={{ opacity: 1, y: 0 }}
    // viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.7, ease: 'easeOut' }} 
    // max-lg:hidden py-[71px]
     className='  relative overflow-hidden bg-[url("/landing/stat_grid.png")] bg-cover'>
      <div className=' h-full '>
        <div className=''>
          <div >
            <video poster="/landing/stat_poster.png" autoPlay loop muted playsInline preload='auto' controls={false} className=' pointer-events-none user-select-none h-full w-full max-h-[665px] max-w-[975px] mx-auto shadow-md rounded-[20px] lg:rounded-[70px] ' height={665} width={975} src="/hero_company/KMK-V1 (1).mp4"></video>
          </div>
          <div className=''>
            <StatsCard/>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
