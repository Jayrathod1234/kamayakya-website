import { cn } from "@/lib/utils";
import { TStockCardProgressBar, TStockCardProgressBarSolid } from "@/types/shared";
import React from "react";

export default function StockProgressBarSolid({
  width,
  marginLeft,
  marginRight,
  currentProgress,
  className,
}: TStockCardProgressBarSolid) {
  return (
    <div
      style={{
        width,
        marginLeft,
        marginRight,
      }}
      className={cn("  h-[0px] w-full absolute  top-[40%] z-10", className)}
    >
      <div style={{ width: `${currentProgress}%` }} className=" h-[2px] bg-[#32D583]"></div>
    </div>
  );
}
