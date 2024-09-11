import { cn } from "@/lib/utils";
import { TStockCardProgressBar, TStockCardProgressBarSolid } from "@/types/shared";
import React from "react";

export default function StockProgressBarSolid({
  width,
  marginLeft,
  marginRight,
  currentProgress,
  className,
  scaleVariant,
}: TStockCardProgressBarSolid) {
  // console.log("CURRENT PROGRESS",currentProgress)
  const style = scaleVariant ? {transform:`scaleX(${currentProgress}%)`}:{width:`${currentProgress}px`}
  return (
    <div
      style={{
        width,
        marginLeft,
        marginRight,
      }}
      className={cn("  h-[0px] w-full absolute  top-[40%] z-10", className)}
    >
      {/* `${currentProgress}${scaleVariant ? "%":"px"}` */}
      {/* transform:`scaleX(${currentProgress}%)` */}
      <div style={style} className={` h-[2px] bg-[#32D583] origin-left  transition-all`}></div>
    </div>
  );
}
