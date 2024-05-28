import React from "react";
import { Tabs as ShadCnTab, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";

export enum TabsVariant {
  md,
  lg,
}

type TTabs = {
  variant: TabsVariant;
  options?: string[];
  selectedOption?: string;
};

export function Tabs({ variant }: TTabs) {
  const parentPadding = variant === TabsVariant.md ? "p-1 " : variant === TabsVariant.lg ? "p-[12px]" : "";
  const childrenSize =
    variant === TabsVariant.md ? "px-3 py-2 text-sm " : variant === TabsVariant.lg ? " px-5 py-3 text-md" : "";
  return (
    // <div className={` bg-gray-150 w-fit flex rounded-full ${parentPadding}`}>
    //   <ul className=" flex">
    //     <li className={` ${childrenSize} text-gray-500 rounded-full hover:bg-gray-100`}>3 months</li>
    //     <li className={` ${childrenSize} bg-white active:text-gray-950  active:font-medium rounded-full`}>1 years</li>
    //     <li className={` ${childrenSize} text-gray-500 rounded-full hover:bg-gray-100`}>3 years</li>
    //   </ul>
    <ShadCnTab defaultValue="1years" className={` bg-gray-150 w-fit flex rounded-full ${parentPadding}`}>
      <TabsList className=" bg-transparent">
        {[
          { label: "3 months", value: "3months" },
          { label: "1 years", value: "1years" },
          { label: "3 years", value: "3years" },
        ].map((tabs) => (
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
