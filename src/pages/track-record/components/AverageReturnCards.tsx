import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components.v2/ui/tooltip";

export const AverageReturnCard = ({isBlur = true}:{isBlur:boolean}) => {
  return (
    //using shadcn toottip
    <TooltipProvider>
      <div className=" bg-[linear-gradient(314.25deg,#125B54_6.46%,#12ADB7_113.37%)] p-4 rounded-xl max-h-[176px] flex flex-row md:flex-col justify-between">
        <div className=" self-center md:self-start order-2 md:order-1 p-3 md:p-2 rounded-[6px] border border-[rgba(203,243,240,0.13)] bg-[rgba(134,207,198,0.27)] w-fit h-fit">
          <img src="/assets/Layer_1 light.svg" className=" hidden md:block" width="25" height="24" />
          <img className="block md:hidden " width="36" height="36" src="/assets/Layer_1_light_mobile.svg" />
        </div>
        <div className=" order-1 md:order-2 flex flex-col h-full">
          <div className="mt-[10px] flex items-center justify-center md:justify-start gap-x-[5px]">
            <p className="  text-sm font-semibold text-brand-200 whitespace-nowrap truncate">Average Live Returns </p>
            <Tooltip>
              <TooltipTrigger className=" h-4">
                <span className=" inline-block !h-4 !w-4">
                  <img className="!h-4 !w-4 object-contain" height={16} width={16} src="/assets/ph_info-duotone.svg" />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className=" mt-4 md:mt-auto flex gap-x-[10px]">
            <img width={15} height={11} src="/assets/Polygon2.svg" alt="" />
            {isBlur ? <span className=" inline-block h-8 w-[103px] bg-[rgba(255,255,255,0.26)] rounded-full"></span>: <p className=" text-display-xs font-bold text-white">118.34%</p>}
           
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
