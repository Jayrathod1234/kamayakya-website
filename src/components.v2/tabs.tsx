import React from "react";
import { Tabs as ShadCnTab, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
import { getMixPanelClient } from "@/externals/mixpanel";

export enum TabsVariant {
  md,
  lg,
}

type TTabOption = {
  value:string;
  label:string;
}

type TTabs = {
  variant: TabsVariant;
  options?: Array<TTabOption>;
  defaultOption?: string;
  setSelectedOption?:React.Dispatch<React.SetStateAction<string>>;
};

export function Tabs({ variant,options,defaultOption,setSelectedOption }: TTabs) {
  const parentPadding = variant === TabsVariant.md ? "p-1 " : variant === TabsVariant.lg ? "p-[12px]" : "";
  const childrenSize =
    variant === TabsVariant.md ? "px-4 py-2 text-sm " : variant === TabsVariant.lg ? " px-5 py-3 text-md" : "";

    const onValueChange = (value:string)=>{
      if(setSelectedOption) setSelectedOption(value)
      const mp = getMixPanelClient();
      mp.track("planduration_clicked",{
        duration:value
      })
    }

  return (
    // <div className={` bg-gray-150 w-fit flex rounded-full ${parentPadding}`}>
    //   <ul className=" flex">
    //     <li className={` ${childrenSize} text-gray-500 rounded-full hover:bg-gray-100`}>3 months</li>
    //     <li className={` ${childrenSize} bg-white active:text-gray-950  active:font-medium rounded-full`}>1 years</li>
    //     <li className={` ${childrenSize} text-gray-500 rounded-full hover:bg-gray-100`}>3 years</li>
    //   </ul>
    <ShadCnTab onValueChange={onValueChange} defaultValue={defaultOption} className={` bg-gray-150 w-fit flex rounded-full ${parentPadding}`}>
      <TabsList className=" bg-transparent">
        {options && options.map((tabs) => (
          <TabsTrigger
            className={` ${childrenSize} text-gray-500 rounded-full hover:bg-gray-100 data-[state=active]:text-gray-950 data-[state=active]:font-medium`}
            value={tabs.value}
          >
            {tabs.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
    </ShadCnTab>
    // </div>
  );
}
