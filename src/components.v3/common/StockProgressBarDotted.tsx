import { cn } from "@/lib/utils";
import { TStockCardProgressBar } from "@/types/shared";
import React from "react";

export default function StockProgressBarDotted({ width, marginLeft, marginRight, className }: TStockCardProgressBar) {
  return (
    <div
      style={{
        width,
        marginLeft,
        marginRight,
      }}
      // border-dashed border-spacing-[500px] border-[0.5px] border-[#D0D5DD] 
      className={cn(
        "dotted__line h-[1px] w-full absolute bg-[linear-gradient(to_right,#D0D5DD_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x  top-[40%] z-[5]",
        className
      )}
    ></div>
  );
}
