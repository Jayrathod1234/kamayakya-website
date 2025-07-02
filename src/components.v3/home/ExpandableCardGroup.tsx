"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
// import { div, div } from "@/components/ui/card"

interface SubCard {
  id: string;
  title: string;
  content: string;
  img: string;
}

interface ExpandableCard {
  id: string;
  title: string;
  color: string;
  subcards: SubCard[];
}

interface IDesktopExpandedCards {
  expandedCardId: string;
  toggleCard: (cardId: string) => void;
}

const cards: ExpandableCard[] = [
  {
    id: "card1",
    title: "Factors",
    color: "bg-blue-500",
    subcards: [
      { id: "sub1", title: "Frontend", img: "/factor/cash-flow--.png", content: "Cash flow" },
      { id: "sub2", title: "Backend", img: "/factor/top-line-growth-.png", content: "Top-line growth" },
      { id: "sub3", title: "Mobile", img: "/factor/bottom-line-growth-.png", content: "Bottom-line growth" },
      { id: "sub4", title: "UI", img: "/factor/promoter-holding-.png", content: "Promoter holding" },
      { id: "sub5", title: "UX", img: "/factor/management-quality-.png", content: "Management quality" },
      { id: "sub6", title: "Graphics", img: "/factor/valuations.png", content: "Valuations" },
    ],
  },
  {
    id: "card2",
    title: "Trigger",
    color: "bg-purple-500",
    subcards: [
      { id: "sub1", title: "Frontend", img: "/trigger/capacity-expansion-.png", content: "Capacity expansion" },
      { id: "sub2", title: "Backend", img: "/trigger/debt-reduction-.png", content: "Debt reduction" },
      { id: "sub3", title: "Mobile", img: "/trigger/change-in-management-.png", content: "Change in management" },
      { id: "sub4", title: "UI", img: "/trigger/industry-tailwinds-.png", content: "Industry tailwinds" },
      {
        id: "sub5",
        title: "UX",
        img: "/trigger/favorable-government-policies-.png",
        content: "Favorable government policies",
      },
      { id: "sub6", title: "Graphics", img: "/trigger/structural-stories--.png", content: "Structural stories" },
      { id: "sub7", title: "Graphic", img: "/trigger/turnaround- (2).png", content: "Turnaround plays" },
    ],
  },
  {
    id: "card3",
    title: "Method",
    color: "bg-green-500",
    subcards: [
      { id: "sub1", title: "Frontend", img: "/methods/data-and-research-.png", content: "Solid data and research" },
      { id: "sub2", title: "Backend", img: "/methods/management-interactions-.png", content: "Management interactions" },
      { id: "sub3", title: "Mobile", img: "/methods/channel-check.png", content: "Channel checks" },
    ],
  },
];

const DesktopExpandedCards = ({ expandedCardId, toggleCard }: IDesktopExpandedCards) => {
  return (
    <div className="flex justify-center items-center  max-xl:hidden">
      {cards.map((card, idx) => (
        <div
          key={card.id}
          className={cn(
            "transition-all duration-300 overflow-hidden h-[179px]  open_sans flex items-center justify-center ",
            expandedCardId === card.id ? " border  border-l-0 rounded-xl h-[200px]" : ""
            // ? "w-full md:w-[calc(100%-2rem)]"
            // : "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]",
          )}
        >
          <div className="flex h-full">
            <div
              className={cn(
                "cursor-pointer flex-shrink-0 w-fit transition-all duration-500 overflow-hidden",
                expandedCardId === card.id ? "rounded-r-none" : "",
                " "
              )}
              onClick={() => toggleCard(card.id)}
            >
              <div
                className={cn(
                  " h-full flex flex-col justify-between max-w-[74px] overflow-hidden bg-white   text-white",
                  expandedCardId === card.id ? "bg-brand-400 rounded-xl" : " border border-[#00000017]",
                  idx === 0 ? " rounded-l-xl" : idx === cards.length - 1 ? "rounded-r-xl" : ""
                )}
              >
                <div className="flex justify-center gap-x-4 items-center h-full -rotate-90">
                  <div className=" bg-[#EFF6F5] flex  items-center justify-center !h-9 !w-9 p-3 rounded-xl">
                    <p
                      className={cn(
                        " text-black font-bold text-xl",
                        expandedCardId === card.id ? " text-brand-600" : ""
                      )}
                    >
                      {idx + 1}
                    </p>
                  </div>
                  <h3
                    className={cn("text-xl font-semibold text-black", expandedCardId === card.id ? " text-white" : "")}
                  >
                    {card.title}
                  </h3>
                  {/* <ChevronRight
                className={cn("transition-transform duration-300", expandedCardId === card.id ? "rotate-90" : "")}
              /> */}
                </div>
              </div>
            </div>

            {/* Subcards container */}
            <div className={cn("flex", expandedCardId === card.id ? "opacity-100 max-w-full" : "opacity-0 max-w-0")}>
              {card.subcards.map((subcard) => (
                <div
                  key={subcard.id}
                  className="border-0 shadow-md rounded-l-none m-0 flex items-center justify-center flex-1 min-w-[150px] max-w-[200px]"
                >
                  <div className="p-6 h-full flex justify-center items-center">
                    <div className=" flex flex-col items-center justify-center">
                      <img className=" h-14 w-14" src={subcard.img} alt="" />
                      <p className="text-sm text-gray-700 text-center">{subcard.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MobileExpandedCards = () => {
  return (
    <Tabs
      defaultValue="Factors"
      className=" xl:hidden mx-auto max-w-[358px] flex flex-col items-center border border-[#00000017] rounded-[20px] overflow-hidden"
    >
      <TabsList className="w-full p-0 !h-auto border-b border-b-[#00000017]">
        {cards.map((card) => (
          <TabsTrigger
            className=" relative overflow-hidden w-full h-auto p-4 bg-gray-50 text-black data-[state=active]:bg-[#053530] data-[state=active]:text-white text-3xs font-bold"
            key={card.id}
            value={card.title}
          >
            {card.title}
            <div className=" h-[6px] bg-brand-300 w-full absolute bottom-0"></div>
          </TabsTrigger>
        ))}
      </TabsList>
      {cards.map((card) => (
        <TabsContent value={card.title}>
          <div className="flex flex-wrap w-full">
            {card.subcards.map((subcard, idx) => (
              <div
                key={subcard.id}
                className={` p-2 border border-dotted border-[#00000017] rounded-l-none m-0 flex items-center justify-center h-[120px] ${
                  [0, 1, 2].includes(idx) ? "border-t-0" : ""
                }`}
              >
                <div className=" h-full w-full flex justify-center items-center">
                  <div className=" flex flex-col items-center justify-center">
                    <img className=" h-14 w-14" src={subcard.img} alt="" />
                    <p className="text-xs text-gray-700 text-center">{subcard.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default function ExpandableCardGroup() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>("card1");

  const toggleCard = (cardId: string) => {
    if (expandedCardId === cardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(cardId);
    }
  };

  return (
    <div className=" mx-auto  py-[50px] sm:py-[110px] open_sans">
      <p className=" font-semibold sm:font-bold text-[#FF9E29] text-center max-sm:text-sm">PHILOSOPHY</p>
      <h2 className="  text-display-xs sm:text-2xl font-bold mb-2 text-center">Our Investing Philosophy</h2>
      <p className="max-sm:mt-3 text-sm sm:text-lg text-gray-500 mb-7 sm:mb-10 text-center">
        Behind every stock is a company. We find out what it’s doing and why.
      </p>
      <DesktopExpandedCards toggleCard={toggleCard} expandedCardId={expandedCardId as string} />
      <MobileExpandedCards toggleCard={toggleCard} expandedCardId={expandedCardId as string} />
    </div>
  );
}
