import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import React from "react";

type TPlanBadge = {
  plan: string;
  icon?: React.ReactNode;
  className?:string;
  labelClassName?:string;
  iconSize?:number;
  iconClassName?:string;
};

export function PlanBadge({ plan, icon,className, labelClassName ,iconSize, iconClassName  }: TPlanBadge) {
  icon = icon ? icon : plan.toLowerCase() !== "free" ? <Crown size={iconSize ?? 10} className={cn(" text-[#b35300]",iconClassName)} /> : null;
  return (
    <div className={cn(" max-w-fit px-2 py-[2px] bg-[#FEF0DF] flex items-center justify-center gap-x-[3px] rounded-[4px]",className)}>
      <div>
        {icon}

      </div>
      <p className={cn(" uppercase m-0 text-[#b35300] text-4xs font-semibold ",labelClassName)}>{plan}</p>
    </div>
  );
}
