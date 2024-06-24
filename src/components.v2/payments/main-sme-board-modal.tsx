import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ChevronDown, ChevronsDown, ChevronsUp, FileBadge, Icon, Layers2, UnfoldHorizontal, icons } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MAIN_BOARD, SME_BOARD } from "@/constants/index.constants";

const BoardHead = ({ head }: { head: string }) => {
  return <h2 className="hidden md:block text-xl font-bold text-gray-950 m-0 sticky top-[0px] pt-[16px] bg-inherit ">{head}</h2>;
};

const Tag = ({ tag }: { tag: string }) => {
  return (
    <span className="uppercase px-3 py-[6px] pl-[10px] border border-[#E4E7EC80] rounded-[20px] text-2xs text-[#344054]">
      {tag}
    </span>
  );
};

const Line = () => {
  return <div className=" h-[1px] bg-gray-200 w-full"></div>;
};

const Feature = ({
  icon,
  feature,
  description,
}: {
  icon: keyof typeof icons;
  feature: string;
  description: string;
}) => {
  const LucideIcon = icons[icon];
  return (
    <div>
      <div className=" flex items-center">
        <span className=" h-5 aspect-square flex items-center justify-center">
          {<LucideIcon name={icon} color="#108973" size={12} strokeWidth={1.5} />}
        </span>
        <h3 className=" m-0 text-xs font-bold text-brand-400">{feature}</h3>
      </div>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
};

const Content = ({
  className,
  content,
}: {
  className?: string;
  content: {
    title: string;
    description: string;
    tags: string[];
    features: { icon: string; feature: string; description: string }[];
  };
}) => {
  return (
    
    <div className={`relative pt-0 flex flex-col gap-y-[14px] pb-4 px-5 md:min-h-full md:h-fit ${className}`}>
      <BoardHead head={content.title} />
      <div className="h-fit grid grid-cols-1 gap-y-[14px] rounded-lg">
        <p className=" text-sm text-gray-500 flex items-center gap-x-2 m-0 rounded-lg">
          <span>Included in :</span>
          {content.tags.map((tag: string) => (
            <Tag key={tag} tag={tag} />
          ))}
        </p>
        <p className=" text-sm text-gray-950">{content.description}</p>
        <Line />
        <div className=" flex flex-col gap-y-4 pb-16 md:pb-0 ">
          {content.features.map((feature) => (
            <Feature
              key={feature.feature}
              icon={feature.icon as keyof typeof icons}
              feature={feature.feature}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export function MainSmeBoardModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        asChild
      >
        {trigger}
      </DialogTrigger>
      <DialogContent className=" contact__modal !rounded-[20px] p-4 md:max-w-[680px] lg:max-w-[1000px] h-[100dvh] max-h-[477px] md:max-h-[858px] lg:max-h-[718px] overflow-hidden md:overflow-y-scroll pricing">
        <div className="flex h-full overflow-hidden md:overflow-y-scroll rounded-lg">
          <Tabs defaultValue="mainboard" className=" md:hidden">
            <TabsList className=" md:hidden bg-transparent p-0">
              <TabsTrigger
                className="data-[state=active]:font-bold text-sm font-medium data-[state=active]:text-brand-500  px-[10px] py-1 border-b-[2px] border-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-brand-500"
                value="mainboard"
              >
                <span className=" ">Main Board</span>
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:font-bold text-sm font-medium data-[state=active]:text-brand-500 px-[10px] py-1 border-b-[2px] border-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-brand-500"
                value="smeboard"
              >
                <span className="">SME Board </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent className=" md:hidden overflow-y-scroll md:overflow-hidden h-full" value="mainboard">
              <Content content={MAIN_BOARD} className={"!p-0"} />
            </TabsContent>
            <TabsContent className=" md:hidden overflow-y-scroll md:overflow-hidden h-full" value="smeboard">
              <Content content={SME_BOARD} className={"!p-0"} />
            </TabsContent>
          </Tabs>
          <Content content={MAIN_BOARD} className={"hidden md:flex bg-gray-50 rounded-lg"} />
          <Content content={SME_BOARD} className={"hidden md:flex bg-white rounded-lg"} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
