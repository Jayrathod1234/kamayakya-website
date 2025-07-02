import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useRef } from 'react'


interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "50+", label: "Years of team experience" },
  { value: "3000+", label: "Delighted Investors" },
  { value: "70+", label: "Stocks Released" },
];

export function StatsCard() {
  return (
    <div className="mx-auto max-w-[600px] open_sans rounded-2xl bg-white shadow-md flex flex-col md:flex-row justify-between items-center px-6 py-[25px] space-y-6 md:space-y-0 md:space-x-6 -mt-16 z-20 relative">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-1 w-full flex-col items-center text-center border-gray-200 md:border-r md:border-l first:md:border-none  last:md:border-none px-4 first:md:px-0 last:md:px-0"
        >
          <span className="text-[46px] text-[#062D24E5] font-bold">{stat.value}</span>
          <span className="text-[13px] text-gray-950 font-semibold">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Stat() {
  const container = useRef(null)
  const {scrollYProgress} = useScroll({
    target:container,
    offset:['start start', 'end end']
  })
  const scale = useTransform(scrollYProgress, [0,1],[1,2])
  return (
    <div ref={container} className=' max-lg:hidden py-[71px] relative overflow-hidden'>
      <div className=' h-full '>
        <div className=''>
          <div >
            <video autoPlay loop muted className='h-full w-full max-h-[665px] max-w-[975px] mx-auto shadow-md rounded-[70px] ' height={665} width={975} src="/hero_company/KMK-V1 (1).mp4"></video>
          </div>
          <div className=''>
            <StatsCard/>
          </div>
        </div>
      </div>
    </div>
  )
}
