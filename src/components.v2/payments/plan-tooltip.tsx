import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TChildren } from "@/types";
import { Landmark, ShoppingBag } from "lucide-react";
import React, { useRef, useState } from "react";
import { TPlantooltip } from "@/types/components/payments";

const Breakdown = ({
  label,
  icon,
  price,
  strikePrice,
}: {
  label: string;
  icon: React.ReactNode;
  price: string;
  strikePrice?: string;
}) => {
  return (
    <div className=" flex justify-between items-center m-0">
      <div className=" flex justify-between items-center gap-x-1">
        {icon}
        <p className=" text-gray-700 text-xs">{label}</p>
      </div>
      <p className={` text-xs font-medium ${strikePrice ? " text-brand-400" : " text-gray-950"}`}>
        {strikePrice && <span className=" text-2xs text-gray-400 mr-1  line-through">{strikePrice}</span>}
        {price}
      </p>
    </div>
  );
};

export function PlanTooltip({ children, price, strikePrice, saveText, gst, total }: TChildren & TPlantooltip) {
  const [displayToast, setDisplayToast] = useState(false);
  const [allowTooltip,setAllowTooltip] = useState(false); //this is included because if tooltip is child of dialog, dialog is trigger tooltip 
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={displayToast} onOpenChange={setDisplayToast}>
        <TooltipTrigger
          onMouseEnter={()=>setAllowTooltip(true)}
          onClick={(e) => {
            e.preventDefault();
            setDisplayToast(true);
          }}
        >
          {children}
        </TooltipTrigger>
        {allowTooltip &&<TooltipContent
          side="bottom"
          className=" bg-white text-black border-0 p-0  max-w-[425px] z-[1002] rounded-[10px] shadow-3xl w-[255px]"
        >
          <div className=" flex flex-col gap-y-3 px-4 py-3 ">
            <Breakdown
              strikePrice={strikePrice}
              label={"Price"}
              price={price}
              icon={<ShoppingBag size={16} className=" text-gray-700" />}
            />
            <Breakdown label={"GST (18%)"} price={gst} icon={<Landmark size={16} className=" text-gray-700" />} />
            <div className=" h-[1px] bg-gray-200 w-full"></div>
            <div className=" flex justify-between items-center font-semibold text-xs">
              <p className=" font-semibold text-xs text-gray-950">Grand Total</p>
              <p className=" font-semibold text-xs text-gray-950">{total}</p>
            </div>
          </div>
          {saveText && (
            <div className=" bg-[url(/pricing/Union.png)] pt-[6px] pb-1">
              <p className=" text-4xs font-bold text-success-700 text-center">{saveText} </p>
            </div>
          )}

          <TooltipArrow className=" fill-white" />
        </TooltipContent> }
        
      </Tooltip>
    </TooltipProvider>
  );
}
