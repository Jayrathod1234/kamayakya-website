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
      className={cn(
        " border-[1.5px] border-[#D0D5DD] h-[0px] w-full absolute border-dashed border-separate top-[40%] z-[5]",
        className
      )}
    ></div>
  );
}
