import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import AdjustIcon from "@mui/icons-material/Adjust";
import EastIcon from "@mui/icons-material/East";
import { Check } from "lucide-react";
import Circle from "@mui/icons-material/Circle";

type TStockCardTargetsProps = {
  index: number;
  label: string;
  price: number;
  date?: string;
  status: string | null; // adjust based on your actual status values
  className?: string;
  isBlur?:boolean;
};

const getIcons = (label:string, status:string) => {
  if (label.includes("Target") && status === "Completed")
    return <AdjustIcon fontSize={"small"} className=" text-[#1ACE1B] QontoStepIcon-completedIcon !h-3 !w-3" />;
  if (label === "CMP") return <Circle className=" text-[#1D9387] !h-3 !w-3" fontSize="small" />;
  if (status === "Active")
    return <GpsFixedIcon fontSize={"small"} className="QontoStepIcon-lastStepIcon text-[#FF7F09] !h-3 !w-3" />;
  if (label.includes("Entry"))
    return (
      <span className=" bg-[#04B9F9] rounded-full h-3 w-3 flex items-center justify-center">
        <EastIcon className="!h-3 !w-3 text-white" fontSize="small" />
      </span>
    );
};

const StockCardTargets = forwardRef<HTMLDivElement[], TStockCardTargetsProps>(function StockCardTargets(props, ref) {
  let { index, label, price, date, status, className, isBlur } = props;
  const refs = ref as React.MutableRefObject<HTMLDivElement[]>;
  return (
    <div
      ref={(el) => (refs ? (refs.current[index] = el as HTMLDivElement) : null)}
      className={cn(` relative flex flex-col   items-center`, className)}
    >
      <h4 className=" font-medium text-3xs text-[#667085] flex items-center">
        {label}
        {label.includes("Target") && status === "Completed" ? (
          <span>
            <Check className=" text-[#12B76A]" size={12} />
          </span>
        ) : null}
      </h4>
      <div className=" z-20   bg-white rounded-full flex items-center justify-center">
        {getIcons(label, status as string)}
      </div>
      {isBlur ? <>
        <div className=" h-[16px] w-1/2 bg-slate-300 mt-[6px] rounded-full"></div>
        {/* <div className=" h-[11px] w-3/4 bg-slate-300 mt-1 rounded-full"></div> */}
        {status === "Active" ? <p className=" text-[#FF7F09] text-3xs status">{status}</p> : null}
      </>:<>
      <h4 className=" text-[#344054] font-semibold text-sm mt-[6px] mb-0">₹{ price}</h4>
     
      {date ? <p className=" text-[#98A2B3] text-3xs whitespace-nowrap">{date}</p> : null}</>}
      
    </div>
  );
});

export default StockCardTargets;
