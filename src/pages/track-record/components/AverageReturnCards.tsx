// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";
import Tooltip from "@/components.v3/common/Tooltip";
import AuthContext from "@/components/AuthContext";
import { Arrow } from "@radix-ui/react-tooltip";
import { useContext, useState } from "react";

export const AverageReturnCard = ({ type, averageReturns, tooltipContent }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const isBlur = !isLoggedIn;
  const label = type === "LIVE" ? `Average Live Returns` : `Average Exit Returns`;

  return (
    //using shadcn toottip
    // <TooltipProvider>
      <div className=" md:min-w-[200px] bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)] p-4 rounded-xl max-h-[176px] flex flex-row md:flex-col justify-between">
        <div className=" self-center md:self-start order-2 md:order-1 p-3 md:p-2 rounded-[6px] border border-[rgba(203,243,240,0.13)] bg-[rgba(134,207,198,0.27)] w-fit h-fit">
          <img src="/assets/Layer_1 _light.svg" className=" hidden md:block" width="25" height="24" />
          <img className="block md:hidden " width="36" height="36" src="/assets/Layer_1_light_mobile.svg" />
        </div>
        <div className=" order-1 md:order-2 flex flex-col h-full">
          <div className="mt-[10px] flex items-center justify-center md:justify-start gap-x-[5px]">
            <p className="  text-sm font-semibold text-brand-200 whitespace-nowrap truncate">{label} </p>
            <Tooltip tooltipContent={tooltipContent} tooltipTrigger={ <img className="!h-4 !w-4 object-contain" height={16} width={16} src="/assets/ph_info-duotone.svg" />
                }/>
            {/* <Tooltip  open={open} onOpenChange={setOpen} delayDuration={0}>
              <TooltipTrigger  onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }} className=" h-4 cursor-pointer">
                
                 
              </TooltipTrigger>
              <TooltipContent className=" !rounded-lg !px-0 !py-0">
              <Arrow asChild color="white" stroke="1" strokeWidth={1}>
                  <svg
                    className=" rotate-180 -my-[9.5px]  pt-[10px]"
                    width="17"
                    height="26"
                    viewBox="0 0 17 17"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 8L16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8Z"
                      fill="white"
                    />
                    <path
                      d="M16.5 8L9.91421 1.41421C9.13317 0.633164 7.86684 0.633164 7.08579 1.41421L0.5 8"
                      stroke="#EDF0F5"
                    />
                  </svg>
                </Arrow>
                {tooltipContent}
              </TooltipContent>
            </Tooltip> */}
          </div>
          <div className=" mt-4 md:mt-auto flex gap-x-[10px]">
            <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
            {isBlur ? (
              <span className=" inline-block h-8 w-[103px] bg-[rgba(255,255,255,0.26)] rounded-full"></span>
            ) : (
              <p className=" text-display-xs font-bold text-white">{averageReturns}%</p>
            )}
          </div>
        </div>
      </div>
    // </TooltipProvider>
  );
};

export default AverageReturnCard