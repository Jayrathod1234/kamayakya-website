import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components.v2/ui/dialog";
import { TooltipContent, TooltipTrigger, Tooltip as STooltip } from "@/components.v2/ui/tooltip";
import { useMediaQuery } from "@mui/material";
import { Arrow } from "@radix-ui/react-tooltip";
import React, { useState } from "react";

export default function Tooltip({
  tooltipContent,
  tooltipTrigger,
  dialogHeader,
  dialogClassname,
  tooltipClassname,
  enableModal=true,
  disableTooltip =false,
}: {
  dialogHeader?:string;
  tooltipContent: React.ReactNode;
  tooltipTrigger: React.ReactNode;
  dialogClassname?: string;
  tooltipClassname?: string;
  enableModal?:boolean;
  disableTooltip?:boolean;
}) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:640px)");
  if (isMobile && enableModal && !disableTooltip) {
    return (
      <Dialog>
        <DialogTrigger asChild>{tooltipTrigger}</DialogTrigger>
        <DialogContent closeClassName={' right-[14px] top-[14px]'} className=" w-[min(425px,calc(100%-32px))] !rounded-xl !shadow-xl">
          {dialogHeader && <DialogHeader className="!open_sans"><h3 className="  !text-xl !font-bold !text-left !text-[#101828] m-0">{dialogHeader}</h3></DialogHeader>}
          {tooltipContent}
          </DialogContent>
      </Dialog>
    );
  }

  return (
    <STooltip disableHoverableContent={disableTooltip} open={open} onOpenChange={setOpen} delayDuration={0}>
      <TooltipTrigger
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        {tooltipTrigger}
      </TooltipTrigger>
      {!disableTooltip &&   <TooltipContent className=" z-[100001] !rounded-lg !px-0 !py-0 !p-4 !border !border-gray-150 max-w-[300px]">
        <Arrow asChild color="white" stroke="1" strokeWidth={1}>
          <svg
            className=" rotate-180 -my-[9.5px]  pt-[10px]"
            width="17"
            height="26"
            viewBox="0 0 17 17"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 8L16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8Z"
              fill="white"
            />
            <path
              d="M16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8"
              stroke="#EDF0F5"
            />
          </svg>
        </Arrow>
        {tooltipContent}
      </TooltipContent>}
    
    </STooltip>
  );
}
