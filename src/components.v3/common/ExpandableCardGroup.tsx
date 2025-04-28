"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
// import { div, div } from "@/components/ui/card"

interface SubCard {
  id: string;
  title: string;
  content: string;
}

interface ExpandableCard {
  id: string;
  title: string;
  color: string;
  subcards: SubCard[];
}

export default function ExpandableCardGroup() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const cards: ExpandableCard[] = [
    {
      id: "card1",
      title: "Factors",
      color: "bg-blue-500",
      subcards: [
        { id: "sub1", title: "Frontend", content: "React, Vue, Angular" },
        { id: "sub2", title: "Backend", content: "Node.js, Python, Java" },
        { id: "sub3", title: "Mobile", content: "React Native, Flutter" },
      ],
    },
    {
      id: "card2",
      title: "Trigger",
      color: "bg-purple-500",
      subcards: [
        { id: "sub4", title: "UI", content: "Figma, Sketch" },
        { id: "sub5", title: "UX", content: "User Research, Wireframing" },
        { id: "sub6", title: "Graphics", content: "Photoshop, Illustrator" },
      ],
    },
    {
      id: "card3",
      title: "Method",
      color: "bg-green-500",
      subcards: [
        { id: "sub7", title: "SEO", content: "Search Engine Optimization" },
        { id: "sub8", title: "Social", content: "Social Media Marketing" },
        { id: "sub9", title: "Content", content: "Content Creation" },
      ],
    },
  ];

  const toggleCard = (cardId: string) => {
    if (expandedCardId === cardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(cardId);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Expandable div Group</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden rounded-lg "
              // expandedCardId === card.id
              //   ? "w-full md:w-[calc(100%-2rem)]"
              //   : "w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]",
            )}
          >
            <div className="flex h-full">
              <div
                className={cn(
                  "cursor-pointer flex-shrink-0 w-fit transition-all duration-500",
                  expandedCardId === card.id ? "rounded-r-none" : "",
                  "border-0 shadow-md"
                )}
                onClick={() => toggleCard(card.id)}
              >
                <div className={cn(" h-full flex flex-col justify-between bg-red-400  text-white")}>
                  <div className="flex justify-center gap-x-4 items-center h-full -rotate-90">
                    <div className=" bg-[#FEF0DF] p-3 rounded-xl">
                      <p className=" text-black font-bold text-xl">{idx + 1}</p>
                    </div>
                    <h3 className="text-xl font-semibold text-black">{card.title}</h3>
                    {/* <ChevronRight
                      className={cn("transition-transform duration-300", expandedCardId === card.id ? "rotate-90" : "")}
                    /> */}
                  </div>
                </div>
              </div>

              {/* Subcards container */}
              <div
                className={cn(
                  "flex transition-all duration-500 ease-in-out",
                  expandedCardId === card.id ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                )}
              >
                {card.subcards.map((subcard) => (
                  <div
                    key={subcard.id}
                    className="border-0 shadow-md rounded-l-none m-0 flex-1 min-w-[150px] max-w-[200px]"
                  >
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold mb-2">{subcard.title}</h4>
                        <p className="text-sm text-gray-600">{subcard.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
