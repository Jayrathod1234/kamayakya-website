import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import React from "react";

type TPlanBadge = {
  plan: string;
  icon?: React.ReactNode;
  className?:string;
  labelClassName?:string;
  iconSize?:number
};

export function PlanBadge({ plan, icon,className, labelClassName ,iconSize  }: TPlanBadge) {
  icon = icon ? icon : plan.toLowerCase() !== "free" ? <Crown size={iconSize ?? 10} className=" text-orange-600" /> : null;
  return (
    <div className={cn(" max-w-fit px-2 py-[2px] bg-orange-200 flex items-center justify-center gap-x-[3px] rounded-[4px]",className)}>
      <div>
        {icon}

      </div>
      <p className={cn(" uppercase m-0 text-orange-600 text-4xs font-semibold ",labelClassName)}>{plan}</p>
    </div>
  );
}
