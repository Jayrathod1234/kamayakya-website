import { getStockReports } from "@/api/shared";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components.v2/ui/carousel";
import { axiosApi } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FileText, Video } from "lucide-react";
import React, { useEffect, useState } from "react";


interface CompanyPillParams{
  logo:string;
  companyName:string;
  onClick:()=>void;
  isSelected:boolean;
}

function CompanyPill({logo,companyName,onClick,isSelected}:CompanyPillParams) {
  return (
    <Button variant={ButtonVariant.custom} onClick={onClick} className={` border ${isSelected ? " border-brand-400 bg-brand-400 hover:bg-brand-400 ":" border-gray-300 bg-transparent hover:bg-transparent"} flex  items-center gap-x-[6px] !pl-[6px] py-[6px] sm:!pl-2 rounded-full !w-fit !max-w-[242px] !min-w-0`}>
      <div className=" flex-shrink-0">
        <img className="rounded-full object-cover max-h-7 max-w-7 w-full h-fullz" height={28} width={28} src={logo} alt="company-logo" />
      </div>
      <p className={` truncate  max-sm:font-semibold max-sm:text-sm pr-4 ${isSelected ? "text-white font-bold":" text-gray-800"} `}>{companyName}</p>
    </Button>
  );
}

function Timeline({targets}) {
  if(!Array.isArray(targets) || ( Array.isArray(targets) && targets.length == 0) ) return
  return (
    <Carousel className="w-full  flex justify-center" >
      <CarouselContent className=" px-4">
        {targets.map((target, index: number) => (
          //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
          <CarouselItem key={index} className={`-pl-0 basis-auto`}>
            <div className="w-[240px]">
            <div className=" text-center flex flex-col items-center justify-center">
              <p className=" pb-3 text-2xs text-gray-600">{ format( new Date(target.report_date ?? target.youtube_date),"dd MMM yy") }</p>
              <div className=" flex w-full justify-center items-center">
                {index !== 0 ? (
                  <div className={` h-[2px] flex-1 w-full bg-[#32D583] origin-left  transition-all`}></div>
                ) : null}
                <div
                  className={`${
                    index === 0 && targets.length > 1 ? " flex-1 flex justify-end" : index === targets.length - 1 && targets.length > 1 ? " flex-1 " : targets.length === 1 ? " flex-1 flex justify-center" : null 
                  }`}
                >
                  <div className=" border-[2px] border-brand-400 h-[10px] w-[10px] rounded-full"></div>
                </div>
                {index !== targets.length - 1 ? (
                  <div className={` h-[2px] flex-1 w-full bg-[#32D583] origin-left  transition-all`}></div>
                ) : null}
              </div>
              <div className=" px-3 py-5 mt-3 w-full bg-white max-w-[224px] rounded-2xl border">
                <p className=" text-2xs font-semibold truncate max-w-full">{target.report_action_text ?? 'Video Released'}</p>
                <p className=" text-sm font-bold truncate max-w-full">{target.report_name ?? target.youtube_title}</p>
                <button onClick={()=>window.open(target.document ?? target.youtube_link,"_")} className=" mt-3  w-full py-[7px] pl-3 pr-[14px] border border-gray-200 rounded-[4px] flex items-center justify-center gap-x-1">
                  {target.type==="report" ? <FileText size={16}/>:  <Video size={16}/>}
                  <p className=" text-2xs text-gray-950 font-medium max-w-[88px] truncate">{ target.report_name ? "Page Report" : "Show Video"}</p>
                </button>
              </div>
            </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" h-6 w-6 p-1 left-[-16px] top-[64%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <CarouselNext className=" h-6 w-6 p-1 right-[-16px] top-[64%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
    </Carousel>
  );
}


const logoMap = {
  "ION exchange":"/ion_logo.png",
  "Ion Exchange (India) Ltd.":"/ion_logo.png",
  "Vimta Labs Ltd.":"/vimta.png",
  "Gravita India Ltd.":"/gravita_logo.png",
  "Gufic Biosciences Ltd.":"/gufic_logo.png",
  "Virtuoso Optoelectronics Ltd.":"/virtuoso_logo.png",
}

export default function SampleReport() {
  const [companySelected, setCompanySelected] = useState({});
  const { data, isLoading } = useQuery({
    queryKey: ["landingReports"],
    queryFn: () => getStockReports({stock_names:["Ion Exchange (India) Ltd.","Vimta Labs Ltd.","Gravita India Ltd.","Gufic Biosciences Ltd.","Virtuoso Optoelectronics Ltd."]}),
  });

  function selectCompany(companyData){
    setCompanySelected(companyData)
  }

  useEffect(()=>{
    if(Array.isArray(data?.data) && data?.data.length  > 0){
      setCompanySelected(data?.data[0])
    }
  },[data])

  return (
    <div className=" main-container ">
      <div className=" py-[50px] sm:py-[100px] open_sans rounded-[28px]">
        <p className=" font-bold text-[#FF9E29] text-center max-sm:text-sm">Reports</p>
        <h2 className=" text-display-xs sm:text-display-md font-bold mb-2 text-center text-gray-950">
          Sample Reports - It’s <span className=" open_sans_italic">FREE</span>!
        </h2>
        <p className=" text-sm sm:text-lg text-gray-600 sm:mb-10 text-center">
          Knowledge is power - Discover the reports that empower your investment decisions
        </p>
        <div className=" pt-[46px] sm:pt-0">
         {/* <div className=" flex items-center justify-center gap-x-3"> */}
          <Carousel className=" flex justify-center">
            <CarouselContent className="">
            {
            Array.isArray(data?.data) && data?.data.length  > 0 ? data?.data.map(item=> <CarouselItem key={item.stock} className=" basis-auto"> <CompanyPill isSelected={item.stock === companySelected.stock} onClick={()=>selectCompany(item)} logo={logoMap[item.stock]} companyName={item.stock} /></CarouselItem>):null
          }
          </CarouselContent>
          </Carousel>
          {/* </div> */}
          <div className="  mt-5 border border-gray-100 bg-gray-50 rounded-xl p-9">
            {/* <h2 className=" text-[17px] font-bold sm:text-lg text-gray-950 text-c">{companySelected.stock}</h2> */}
            <div className="">
              <Timeline targets={companySelected.timeline} />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
