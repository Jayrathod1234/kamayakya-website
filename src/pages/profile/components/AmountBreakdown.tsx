import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components.v2/ui/tooltip";
import { Breakdown } from "@/pages/payments/components/ToPayTooltip";
import { TChildren } from "@/types";
import { TPlantooltip } from "@/types/components/payments";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Landmark, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface IAmountBreakdown {
  basePrice: string;
  gst: string;
  grandTotal: string;
  totalAmountBeforeDiscount?: string;
  discountAmount?: string;
  discountLabel?: string | null;
}

export default function AmoountBreakdown({
  children,
  basePrice,
  gst,
  grandTotal,
  totalAmountBeforeDiscount,
  discountLabel,
  discountAmount,
}: TChildren & IAmountBreakdown) {
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
              label={"Base Price"}
              price={basePrice}
              icon={<ShoppingBag size={16} className=" text-gray-700" />}
            />
            <Breakdown label={"Tax (18%)"} price={gst} icon={<Landmark size={16} className=" text-gray-700" />} />
            <div className=" h-[1px] bg-gray-200 w-full"></div>
            {discountLabel && <div className=" flex flex-col gap-y-3">
              <div className=" flex items-center justify-between">
                <p className=" text-xs font-semibold">Total Amount</p>
                <p className=" text-xs font-semibold">₹{totalAmountBeforeDiscount}</p>
              </div>
              <div className=" flex items-center justify-between">
                <p className=" text-xs text-[#1BB991]">Discount {` (${discountLabel})`}</p>
                <p className=" whitespace-nowrap text-xs font-medium text-[#1BB991]">-₹{discountAmount}</p>
              </div>
            </div>}
            
            <div className=" flex justify-between items-center font-semibold text-xs">
              <p className=" font-semibold text-xs text-gray-950">Grand Total</p>
              <p className=" font-semibold text-xs text-gray-950">₹{grandTotal}</p>
            </div>
          </div>
          <TooltipArrow className=" fill-white" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
