import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent,  } from "@/components.v2/ui/tooltip";
import { TChildren } from "@/types";
import { TPlantooltip } from "@/types/components/payments";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Landmark, ShoppingBag } from "lucide-react";
import { useState } from "react";


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

export default function ToPayTooltip({ children, price, strikePrice, saveText, gst, total }: TChildren
   & TPlantooltip) {
  const [displayToast, setDisplayToast] = useState(false);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={displayToast} onOpenChange={setDisplayToast}>
        <TooltipTrigger
          onClick={(e) => {
            e.preventDefault();
            setDisplayToast(true);
          }}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className=" bg-white text-black border-0 p-0  max-w-[425px] z-[100] rounded-[10px] shadow-3xl w-[255px]"
        >
          <div className=" flex flex-col gap-y-3 px-4 py-3 ">
            <Breakdown
              strikePrice={strikePrice}
              label={"Taxable Amount"}
              price={price}
              icon={<ShoppingBag size={16} className=" text-gray-700" />}
            />
            <Breakdown label={"Tax"} price={gst} icon={<Landmark size={16} className=" text-gray-700" />} />
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
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
