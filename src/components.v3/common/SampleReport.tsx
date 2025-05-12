import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import React from "react";

const targets = [
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
  {
    id: 1,
    date: " 12 Jun 23",
    title: "New Target",
    report: "1 Page Report",
  },
];

function CompanyPill() {
  return (
    <div className=" border border-brand-700 bg-brand-700 flex  items-center gap-x-[6px] rounded-xl w-fit">
      <div>
        <img src="/ion_logo.png" alt="" />
      </div>
      <p className=" max-sm:font-semibold max-sm:text-sm pr-4 py-[6px] text-white ">ION exchange</p>
    </div>
  );
}

function Timeline() {
  return (
    <Carousel className=" z-20 w-full" opts={{ slidesToScroll: 1, align: "center", startIndex: 0 }}>
      <CarouselContent className="  justify-between">
        {targets.map((target, index: number) => (
          //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
          <CarouselItem key={index} className={` ${index === targets.length - 1 ? " " : " "} -pl-0  basis-auto`}>
            <div className=" text-center flex flex-col items-center justify-center min-w-[252px]">
              <p className=" pb-3 text-2xs text-gray-600">{target.date}</p>
              <div className=" flex w-full justify-center items-center">
                {index !== 0 ? (
                  <div className={` h-[2px] flex-1 w-full bg-[#32D583] origin-left  transition-all`}></div>
                ) : null}
                <div className={`${index === 0 ? " flex-1 flex justify-end" : index === targets.length -1  ? " flex-1 " : null}`}>
                  <div className=" border-[2px] border-brand-400 h-[10px] w-[10px] rounded-full"></div>
                </div>
                {index !== targets.length-1 ? <div className={` h-[2px] flex-1 w-full bg-[#32D583] origin-left  transition-all`}></div>
                :null }
              </div>
              <div className=" p-2 pt-[11px] mt-3 w-full rounded-lg bg-white max-w-[224px]">
                <p className=" text-xs font-medium">{target.title}</p>
                <div className=" mt-5  w-full py-[7px] pl-3 pr-[14px] border border-gray-200 rounded-[4px]">
                  
                  <p className=" text-2xs text-gray-950 font-medium">
                    {target.report}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" h-6 w-6 p-1 left-0 top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <CarouselNext className=" h-6 w-6 p-1 right-[16px] top-[40%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
    </Carousel>
  );
}

export default function SampleReport() {
  return (
    <div className=" main-container ">
      <div className=" py-[50px] sm:py-[100px] open_sans rounded-[28px]">
        <p className=" font-bold text-[#FF9E29] text-center max-sm:text-sm">KamayaKya’s Philosophy</p>
        <h2 className=" text-display-xs sm:text-2xl font-bold mb-2 text-center text-gray-950">Sample Reports - It’s FREE!</h2>
        <p className=" text-sm sm:text-lg text-gray-600 sm:mb-10 text-center">
          Knowledge is power - Discover the reports that empower your investment decisions
        </p>
        <div className=" pt-[46px] sm:pt-10">
          <div className=" flex items-center justify-center">
            <CompanyPill />
          </div>
          <div className=" flex flex-col items-center mt-5 border border-gray-100 bg-gray-50 rounded-xl p-9 pt-4">
            <h2 className=" text-[17px] font-bold sm:text-lg text-gray-950">ION exchange</h2>
            <div className=" max-w-[1168px]">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
