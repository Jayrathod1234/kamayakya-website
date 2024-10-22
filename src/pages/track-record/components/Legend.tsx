// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import Tooltip from "@/components.v3/common/Tooltip";
import { Arrow } from "@radix-ui/react-tooltip";
import { useState } from "react";

export default function Legend({
  label,
  icon,
  tooltipContent,
  dialogHeader,
  iconSize=10,
}: {
  label: string;
  icon: string | React.ReactNode;
  tooltipContent?: React.ReactNode;
  dialogHeader?:string;
  iconSize?:number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className=" flex items-center gap-x-1">
      {typeof icon === "string" ? (
        <span className="inline-block bg-white rounded-full border border-white">
          <img
            className=" object-cover"
            height={iconSize}
            width={iconSize}
            src={icon}
            alt="marker-icons"
          />
        </span>
      ) : (
        icon
      )}
      <p className=" text-2xs text-[rgba(102,112,133,1)] whitespace-nowrap">{label}</p>
      {tooltipContent && (
        <Tooltip dialogHeader={dialogHeader} tooltipTrigger={<img height={16} width={16} src="/assets/ph_info-duotone-white.svg" />} tooltipContent={tooltipContent}/>
        // <TooltipProvider delayDuration={0}>
        //   <Tooltip open={open} onOpenChange={setOpen}>
        //     <TooltipTrigger
        //       onClick={(e) => {
        //         e.preventDefault();
        //         setOpen(true);
        //       }}
        //     >
        //       <img height={16} width={16} src="/assets/ph_info-duotone-white.svg" />
        //     </TooltipTrigger>
        //     <TooltipContent className=" rounded-lg shadow-lg px-0 py-0" side="bottom">
        //       <Arrow asChild color="white" stroke="1" strokeWidth={1}>
        //         <svg
        //           className=" rotate-180 -my-[9.5px]  pt-[10px]"
        //           width="17"
        //           height="26"
        //           viewBox="0 0 17 17"
        //           fill="white"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M0.5 8L16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8Z"
        //             fill="white"
        //           />
        //           <path
        //             d="M16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8"
        //             stroke="#EDF0F5"
        //           />
        //         </svg>
        //       </Arrow>
        //       {tooltipContent}
        //     </TooltipContent>
        //   </Tooltip>
        // </TooltipProvider>
      )}
    </div>
  );
};