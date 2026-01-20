import React, { useContext } from "react";
import { Tabs as ShadCnTab, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { TPlanDuration } from "@/types/components/payments";
import AuthContext from "@/components/AuthContext";
import { useActivePlanContext } from "@/components/PlanContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export enum TabsVariant {
  md,
  lg,
}

type TTabOption = {
  value: string;
  label: string;
};

type TTabs = {
  variant: TabsVariant;
  options?: Array<TTabOption>;
  defaultOption?: string;
  setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  tabListClassname?: string;
  tabTriggerClassname?: string;
  activeValue?: string;
  responsive?: boolean;
  event?: (value: string) => void;
};

export function Tabs({
  responsive = false,
  variant,
  options,
  defaultOption,
  activeValue,
  setSelectedOption,
  className,
  tabListClassname,
  tabTriggerClassname,
  event,
}: TTabs) {
  const parentPadding =
    variant === TabsVariant.md
      ? "p-1 "
      : variant === TabsVariant.lg && responsive
        ? " p-1 sm:py-2 sm:px-[2px]"
        : "py-2 px-[2px]";
  const childrenSize =
    variant === TabsVariant.md
      ? "px-4 py-2 text-sm "
      : variant === TabsVariant.lg && responsive
        ? " px-4 py-2 text-sm sm:px-5 sm:py-3 sm:text-md"
        : "px-5 py-3 text-md";


  const onValueChange = (value: string) => {
    if (setSelectedOption) setSelectedOption(value as TPlanDuration);

    if (event) {
      event(value)
    }
  };


  console.log("ACTIVE VALUE", activeValue, defaultOption);

  return (
    <ShadCnTab
      onValueChange={onValueChange}
      defaultValue={defaultOption}
      className={cn(
        ` bg-gray-150 tab__container w-fit flex rounded-full h-fit overflow-hidden ${parentPadding}`,
        className
      )}
    >
      <TabsList className={cn(" bg-transparent dark:bg-white", tabListClassname)}>
        {options &&
          options.map((tabs) => (
            <TabsTrigger
              key={tabs.value}
              // style={{
              //   transformStyle: "preserve-3d",
              // }}
              className={cn(
                ` ${childrenSize} group-tab dark:data-[state=active]:bg-transparent data-[state=active]:bg-transparent ${activeValue === tabs.value
                  ? "data-[state=active]:shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.05),0px_12px_16px_-4px_rgba(16,24,40,0.1)]"
                  : ""
                }   relative text-gray-500 rounded-full hover:bg-gray-50 dark:hover:bg-[rgba(237,240,245,1)] data-[state=active]:text-gray-950 data-[state=active]:font-medium `,
                tabTriggerClassname
              )}
              value={tabs.value}
            >
              {activeValue === tabs.value && (
                <motion.div
                  // layoutId=clickedbutton
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn("absolute inset-0 bg-white dark:bg-[#0C111D] rounded-full ", tabTriggerClassname)}
                />
              )}
              <span
                className={`relative block text-black  ${activeValue === tabs.value ? "dark:text-white " : "dark:text-black "
                  }  `}
              >
                {tabs.label}
              </span>
            </TabsTrigger>
          ))}
      </TabsList>
      {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
    </ShadCnTab>
    // </div>
  );
}
