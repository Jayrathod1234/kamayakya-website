import { Crown } from "lucide-react";
import React from "react";

type TPlanBadge = {
  plan: string;
  icon?: React.ReactNode;
};

export function PlanBadge({ plan, icon }: TPlanBadge) {
  icon = icon ? icon : plan.toLowerCase() !== "free" ? <Crown size={10} className=" text-orange-600" /> : null;
  return (
    <div className=" max-w-fit px-2 py-[2px] bg-orange-200 flex items-center justify-center gap-x-[3px] rounded-[4px]">
      <div>
        {icon}

      </div>
      <p className=" uppercase m-0 text-orange-600 text-4xs font-semibold ">{plan}</p>
    </div>
  );
}
