import React from "react";

export function NewStockbadge({ label }: { label: string }) {
  return <div className=" px-2 bg-[#DAE7FF] text-4xs text-[#0057FF] flex items-center justify-center rounded h-5">{label}</div>;
}
