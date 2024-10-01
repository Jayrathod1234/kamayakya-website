import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import EastIcon from "@mui/icons-material/East";
import { Check, X } from "lucide-react";
import Circle from "@mui/icons-material/Circle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import { Arrow } from "@radix-ui/react-tooltip";
type TStockCardTargetsProps = {
  index: number;
  label: string;
  price: number;
  date?: string;
  status: string | null; // adjust based on your actual status values
  className?: string;
  isBlur?: boolean;
  showToolTip?: boolean;
  tooltipContent?: React.ReactNode;
};

const getIcons = (label: string, status: string) => {
  if (label.includes("Target") && status === "Completed")
    return (
      <AdjustIcon
        fontSize={"small"}
        className=" text-[#1ACE1B] QontoStepIcon-completedIcon !h-3 !w-3 border border-white"
      />
    );
  if (label === "CMP")
    return <Circle className=" text-[#1D9387] !h-3 !w-3 border border-white rounded-full relative" fontSize="small" />;
  if (status === "Active" || status==="Inactive")
    return (
      <GpsFixedIcon
        fontSize={"small"}
        className={`QontoStepIcon-lastStepIcon ${status==="Active" ? "text-[#FF7F09]":" text-gray-300"}  !h-3 !w-3 border border-white`}
      />
    );
  if (label.includes("Entry"))
    return (
      // <span className=" bg-[#04B9F9] rounded-full h-3 w-3 flex items-center justify-center border border-white">
      <img height={30} width={30} src="/assets/entry point.svg" className=" h-full w-full" />
      // </span>
    );
};

const StockCardTargets = forwardRef<HTMLDivElement[], TStockCardTargetsProps>(function StockCardTargets(props, ref) {
  let { index, label, price, date, status, className, isBlur, showToolTip, tooltipContent } = props;
  const refs = ref as React.MutableRefObject<HTMLDivElement[]>;
  const [open, setOpen] = useState(false);
  // console.log(label,index)
  return (
    <div className={cn(` relative flex flex-col items-center w-[90px]`, className)}>
      <h4 className=" font-medium text-3xs text-[#667085] flex items-center whitespace-nowrap gap-x-[2px]">
        <span>{label}</span>
        {label.includes("Target") ? (
          status === "Completed" ? (
            <span>
              <Check className=" text-[#12B76A]" size={12} />
            </span>
          ) : status === "Inactive" ? (
            <span>
              <X className=" text-[#D92D20]" size={12} />
            </span>
          ) : null
        ) : null}
        {showToolTip && (
          <TooltipProvider delayDuration={0}>
            <Tooltip open={open} onOpenChange={setOpen}>
              <TooltipTrigger
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
                className="  h-4 w-4"
              >
                <img className="" height={16} width={16} src="/assets/blackinfo.svg" />
              </TooltipTrigger>
              <TooltipContent className=" rounded-lg shadow-lg px-0 py-0" side="bottom">
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
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </h4>
      <div
        ref={(el) => (refs ? (refs.current[index] = el as HTMLDivElement) : null)}
        className={` z-20 ${label === "CMP" ? "cmp-pulse" : ""} ${
          label === "CMP" && isBlur ? "top-for-blur" : ""
        }    bg-white rounded-full flex items-center justify-center h-3 w-3`}
      >
        {getIcons(label, status as string)}
      </div>
      {isBlur ? (
        <>
          <div className=" h-[16px] w-1/2 bg-[#eef0f6] mt-[6px] rounded-full"></div>
          {/* <div className=" h-[11px] w-3/4 bg-slate-300 mt-1 rounded-full"></div> */}
          {status === "Active" ? <p className=" text-[#FF7F09] text-3xs status">{status}</p> : null}
        </>
      ) : (
        <>
          <h4 className=" text-[#344054] font-semibold text-sm mt-[6px] mb-0">₹{price}</h4>
          {status === "Active" || status === "Inactive" ? <p className={` ${status === "Active" ?"text-[#FF7F09]" :"text-[#858D9B]"} text-3xs status`}>{status}</p> : null}
          {date ? <p className=" text-[#98A2B3] text-3xs whitespace-nowrap">{date}</p> : null}
        </>
      )}
    </div>
  );
});

export default StockCardTargets;
