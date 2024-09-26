import AuthContext from "@/components/AuthContext";
import { cn } from "@/lib/utils";
import { TChildren } from "@/types";
import { useContext } from "react";

const ChipContainer = ({ children, className, active }: TChildren & { className?: string; active: boolean }) => {
  return (
    <div
      className={cn(
        `${active ? "px-2.5 bg-[#FFF6EE]" : "px-2 bg-[#F2F4F7]"} py-[2px]  rounded-full  w-fit flex`,
        className
      )}
    >
      {children}
    </div>
  );
};

const Active = ({ className }: { className?: string }) => {
  return <span className={cn("text-[#F79009] font-bold", className)}>Active</span>;
};

export function TargetChip({
  target_number,
  active,
  activeIcon,
  containerClass,
  textCommonClass,
  activeTextClass,
  inactiveTextClass,
  targetTextClass,
  activeIconClass,
}: {
  activeIcon?: boolean;
  target_number?: string;
  active: boolean;
  containerClass?: string;
  textCommonClass?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;
  targetTextClass?: string;
  activeIconClass?: string;
}) {
  const {isLoggedIn} = useContext(AuthContext);
  const isBlur = !isLoggedIn

  return (
    <ChipContainer active={active} className={containerClass}>
      {activeIcon && <img className={cn("mr-1", activeIconClass)} height={14} width={14} src="/assets/target.svg" />}
      <div className={cn("text-[#667085] font-semibold whitespace-nowrap flex", textCommonClass)}>
        {active ? (
          <span className={cn(` text-4xs ${isBlur ? "flex items-center": ""}`, targetTextClass)}>
            {target_number} {isBlur && activeIcon && <span className=" h-[12px] w-[29px] mx-1 bg-[#FFE8D4] inline-block rounded-full"></span>} | <Active className={` ml-1 ${activeTextClass}`} />
          </span>
        ) : (
          <span className={cn(" text-3xs", inactiveTextClass)}>{target_number ? target_number : ""} | <span className=" font-medium">Inactive</span></span>
        )}
      </div>
    </ChipContainer>
  );
}
