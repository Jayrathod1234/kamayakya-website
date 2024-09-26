import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components.v2/ui/drawer";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components.v2/ui/hover-card";
import { useMediaQuery } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ChipItem = ({ label, img, id }: { label: string; img: string | null; id: string }) => {
  const router = useRouter();

  const handleRouting = () => id ? router.push(`/track-record/${id}`):null;

  return (
    <div onClick={handleRouting} className="!p-0 rounded-[4px]  hover:!bg-[rgba(244,255,255,1)] flex items-center">
      {/* image container */}
      <div className=" p-2 w-fit">
        {img ? (
          <img className=" object-contain" src={img} height={30} width={30} alt="stock-image" />
        ) : (
          <div className=" h-6 w-6 bg-[#FFF1CE] rounded-full flex items-center justify-center">
            <img height={15} width={15} src="/assets/noto_locked.png" alt="" />
          </div>
        )}
      </div>
      {/* image container end */}
      <ButtonnArrow
        arrowStyle=" !scale-[.8]" //svg container element,not the svg itself.
        strokeStyle=" stroke-gray-400 group-hover/chip:stroke-brand-400" //affects the svg stroke itself
        variant={ButtonVariant.custom}
        className=" group/chip  min-w-0 w-full justify-between !items-center hover:scale-100 bg-transparent hover:bg-transparent !p-0 !py-0 !pr-3"
      >
        {label ?  <p className="!text-2xs  text-gray-700 font-normal group-hover/chip:text-brand-400 group-hover/chip:font-semibold truncate">
          {label}
        </p>:<span className=" bg-[#EDF0F5] rounded-full h-[15px] w-1/2"></span>}
       
      </ButtonnArrow>
    </div>
  );
};

const Chip = () => {
  return (
    <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
      3 New <span className="hidden sm:inline-block">Recommendations</span>
    </button>
  );
};

export function TrackRecordHeroCardNewChip({ newRecommendation }) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const isMobile = useMediaQuery("(max-width:640px)");
  const onTriggerEleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpenDropDown(true);
  };
  const router = useRouter();

  
  if (isMobile) {
    console.log("ISMONILE");
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
            3 New <span className="hidden sm:inline-block">Recommendations</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className=" rounded-t-[20px] ">
          <div className="mx-auto w-full px-4 py-2">
            <DrawerHeader className=" px-0 gap-3">
              <div className=" h-[160px] w-full bg-[linear-gradient(180deg,#FDC451_0%,#F8AB2B_100%)] rounded-[6px] flex justify-center items-end">
                <img src="/assets/buyActionCall.png" height={151} width={151} alt="buy-action-call" />
              </div>
              <p className=" text-left font-bold px-4  text-lg text-[rgba(12,17,29,1)]">New Stock Picks</p>
            </DrawerHeader>
            <div className=" ">
              <ul className=" !m-0">
                {
                  newRecommendation.map(recommendation=> <li onClick={()=>router.push(`/track-record/${recommendation.id}`)} className=" px-4 py-[10px] flex gap-x-2 items-center">
                    {recommendation.stock_name ? <><img height={28} width={28} src={recommendation.stock_image} alt="stock-image" />
                    <p className=" text-sm text-gray-700">{recommendation.stock_name}</p></>:<>
                    <span className=" flex items-center justify-center bg-[#FFF1CE] rounded-full"><img height={15} width={15} src="/assets/noto_locked.png" alt="" /></span>
                    </>}
                    <ArrowRight color="#475467" className=" ml-auto" height={16} width={16}/>
                  </li>)
                }
               
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  console.log("NOT MOBILE");

  return (
    <HoverCard open={openDropDown} openDelay={0} onOpenChange={setOpenDropDown}>
      <HoverCardTrigger onClick={onTriggerEleClick} asChild>
        <button className=" whitespace-nowrap text-[rgba(0,87,255,1)] px-2 py-[2px] rounded-full bg-[rgba(235,242,255,1)] hover:bg-[rgba(206,223,255,1)] text-3xs inline-block mb-0">
          3 New <span className="hidden sm:inline-block">Recommendations</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-56 rounded-lg py-[6px] px-1">
        {newRecommendation?.map((recommendation) => (
          <ChipItem id={recommendation.id} label={recommendation.stock_name} img={recommendation.stock_image} />
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
