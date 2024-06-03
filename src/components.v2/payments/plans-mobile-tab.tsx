import Image from "next/image";
import React from "react";

type TPlansMobileTab = {
  plan: string;
  features?: Array<string>;
  popular?: boolean;
  selected?: boolean;
  onClick:()=>void
};

export function PlansMobileTab({ plan, features, popular = false, selected=false,onClick }: TPlansMobileTab) {
  return (
    <div
      onClick ={onClick}
      className={` p-[10px] pb-5 border border-gray-150  w-full relative ${
        popular && selected && "shadow-[0px_-3px_0px_3px_#75CDC5]"
      } ${selected && "bg-[linear-gradient(272deg,_#125B54_18.54%,_#092E2B_107.09%)] text-white"}`}
    >
      {popular && (
        <div className=" text-4xs text-center py-[3px] px-[6px] font-semibold bg-brand-300 text-white rounded-t-lg absolute -top-6 left-0 z-30 w-full shadow-[0px_-3px_0px_4px_#75CDC5]">
          Most Popular
        </div>
      )}
      {popular && <div className=" h-[6px] w-full bg-white absolute bottom-[-6px] left-0"></div>}
      <p className=" text-2xs font-bold">{plan}</p>
      {features &&
        features.length > 0 &&
        features.map((feature) => <p className=" text-4xs text-gray-400">SME Board</p>)}
      {selected && (
        <div className=" bg-white w-fit rounded-full p-[0.5px] flex items-center justify-center absolute right-2 bottom-2">
          <Image height={16} width={16} src={"/icons/check.svg"} alt="checked-plan" />
        </div>
      )}
    </div>
  );
}
