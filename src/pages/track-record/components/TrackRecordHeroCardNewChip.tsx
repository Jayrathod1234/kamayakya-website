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
import React, { useState } from "react";

const ChipItem = ({ label }: { label: string }) => {
  return (
    <div className="!p-0 rounded-[4px]  hover:!bg-[rgba(244,255,255,1)] flex items-center">
      {/* image container */}
      <div className=" p-2 w-fit">
        <div className=" h-6 w-6 bg-red-400"></div>
      </div>
      {/* image container end */}
      <ButtonnArrow
        arrowStyle=" !scale-[.8]" //svg container element,not the svg itself.
        strokeStyle=" stroke-gray-400 group-hover/chip:stroke-brand-400" //affects the svg stroke itself
        variant={ButtonVariant.custom}
        className=" group/chip  min-w-0 w-full justify-between !items-center hover:scale-100 bg-transparent hover:bg-transparent !p-0 !py-0 !pr-3"
      >
        <p className="!text-2xs  text-gray-700 font-normal group-hover/chip:text-brand-400 group-hover/chip:font-semibold truncate">
          {label}
        </p>
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

export function TrackRecordHeroCardNewChip() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const isMobile = useMediaQuery("(max-width:640px)");
  const onTriggerEleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpenDropDown(true);
  };
  console.log(",mobiole", isMobile);
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
            <div className=" mt-2">
              <ul>
                <li className=" px-4 py-[10px]"></li>
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
        <ChipItem label={"Ion Exchange (India) Ltd."} />
        <ChipItem label={"Tata Motors Ltd."} />
        <ChipItem label={"Shree Pushkar Chemicals & Fertilisers ltd"} />
      </HoverCardContent>
    </HoverCard>
  );
}
