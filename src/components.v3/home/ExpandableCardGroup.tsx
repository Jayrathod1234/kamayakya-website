"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components.v2/ui/tabs";
// import { div, div } from "@/components/ui/card"
import { motion, useSpring } from "framer-motion";
import CarouselIndicator from "@/components.v3/common/CarouselIndicator";

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
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface IMobileExpandedCards {
  expandedCardId: string;
  toggleCard: (cardId: string) => void;
  currentIndex: number;
  autoPlayInterval: number;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
      {
        id: "sub2",
        title: "Backend",
        img: "/methods/management-interactions-.png",
        content: "Management interactions",
      },
      { id: "sub3", title: "Mobile", img: "/methods/channel-check.png", content: "Channel checks" },
    ],
  },
];

const DesktopExpandedCards = ({ expandedCardId, toggleCard, onMouseEnter, onMouseLeave }: IDesktopExpandedCards) => {
  return (
    <div onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave} className="flex justify-center items-center max-xl:hidden h-[200px] cursor-[url(/carousel-pause-icon.svg),auto]">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          className={cn(
            "transition-all duration-500 ease-out overflow-hidden h-[179px] open_sans flex items-center justify-center",
            expandedCardId === card.id ? "border border-l-0 rounded-xl h-[200px]" : ""
          )}
          layout
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div className="flex h-full">
            <motion.div
              className={cn(
                "cursor-pointer flex-shrink-0 w-fit transition-all duration-500 overflow-hidden",
                expandedCardId === card.id ? "rounded-r-none" : "",
                " "
              )}
              onClick={() => toggleCard(card.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "h-full flex flex-col justify-between max-w-[74px] overflow-hidden bg-white text-white",
                  expandedCardId === card.id ? "bg-brand-400 rounded-xl" : "border border-[#00000017]",
                  idx === 0 ? "rounded-l-xl" : idx === cards.length - 1 ? "rounded-r-xl" : ""
                )}
              >
                <div className="flex justify-center gap-x-4 items-center h-full -rotate-90">
                  <div className="bg-[#EFF6F5] flex items-center justify-center !h-9 !w-9 p-3 rounded-xl">
                    <p
                      className={cn("text-black font-bold text-xl", expandedCardId === card.id ? "text-brand-600" : "")}
                    >
                      {idx + 1}
                    </p>
                  </div>
                  <h3
                    className={cn("text-xl font-semibold text-black", expandedCardId === card.id ? "text-white" : "")}
                  >
                    {card.title}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Subcards container */}
            <motion.div
              className="flex"
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: expandedCardId === card.id ? 1 : 0,
                width: expandedCardId === card.id ? "auto" : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {card.subcards.map((subcard, subIdx) => (
                <motion.div
                  key={subcard.id}
                  className="border border-dotted border-[#00000017] shadow-md rounded-l-none m-0 flex items-center justify-center flex-1 min-w-[150px] max-w-[156px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: expandedCardId === card.id ? 1 : 0,
                    x: expandedCardId === card.id ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: subIdx * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="p-6 h-full flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center">
                      <img className="h-14 w-14" src={subcard.img} alt={subcard.content} />
                      <p className="text-sm text-gray-700 text-center">{subcard.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const MobileExpandedCards = ({
  expandedCardId,
  toggleCard,
  currentIndex,
  autoPlayInterval,
  isPaused,
  onMouseEnter,
  onMouseLeave,
}: IMobileExpandedCards) => {
  const activeCard = cards.find(card => card.id === expandedCardId) || cards[0];

  return (
    <Tabs
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      value={activeCard.title}
      defaultValue="Factors"
      className="xl:hidden mx-auto max-w-[358px] flex flex-col items-center border border-[#00000017] rounded-[20px] overflow-hidden"
    >
      <TabsList className="w-full p-0 !h-auto border-b border-b-[#00000017] relative">
        {cards.map((card, index) => (
          <TabsTrigger
            onClick={() => toggleCard(card.id)}
            className="relative overflow-hidden w-full h-auto p-4 bg-gray-50 text-black data-[state=active]:bg-[#053530] data-[state=active]:text-white text-3xs font-bold"
            key={card.id}
            value={card.title}
          >
            {card.title}
            {expandedCardId === card.id && (
              <div className="absolute bottom-0 left-0 w-full h-[6px] overflow-hidden">
                <CarouselIndicator
                  key={card.id + "-progress"}
                  isPlaying={!isPaused}
                  onClick={() => {}} // No action needed for progress bar
                  index={index}
                  selectedIndex={currentIndex}
                  animationDuration={`${autoPlayInterval}ms`}
                  className="!w-full bg-transparent rounded-none"
                />
              </div>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {cards.map((card) => (
        <TabsContent key={card.id} value={card.title}>
          <motion.div
            key={`content-${card.id}`}
            className="grid grid-cols-3 w-full max-w-sm mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {card.subcards.map((subcard, idx) => (
              <motion.div
                key={`${card.id}-${subcard.id}`}
                className={`flex flex-col items-center justify-center p-3 border border-dotted border-[#00000017]
                  ${idx < 3 ? "border-t-0" : ""}
                  ${idx % 3 === 0 ? "border-l-0" : ""}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.05,
                  ease: "easeOut",
                }}
              >
                <img 
                  className="h-14 w-14 mb-2" 
                  src={subcard.img} 
                  alt={subcard.content}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <p className="text-xs text-gray-700 text-center">{subcard.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default function ExpandableCardGroup() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>("card1");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseStartTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(0);
  const AUTO_PLAY_INTERVAL = 6000; // 6 seconds

  const toggleCard = (cardId: string) => {
    // Stop auto-play when user interacts
    setIsAutoPlaying(false);

    if (expandedCardId === cardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(cardId);
      // Update current index to match the selected card
      const newIndex = cards.findIndex((card) => card.id === cardId);
      setCurrentIndex(newIndex);
    }
  };

  const startAutoPlay = (useRemainingTime = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const interval = useRemainingTime ? remainingTimeRef.current : AUTO_PLAY_INTERVAL;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % cards.length;
        setExpandedCardId(cards[nextIndex].id);
        return nextIndex;
      });
    }, interval);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const pauseAutoPlay = () => {
    if (intervalRef.current && !isPaused) {
      // Calculate how much time has passed since the last interval start
      const now = Date.now();
      const lastIntervalStart = now - (now % AUTO_PLAY_INTERVAL);
      const elapsedInCurrentInterval = now - lastIntervalStart;
      remainingTimeRef.current = Math.max(0, AUTO_PLAY_INTERVAL - elapsedInCurrentInterval);

      stopAutoPlay();
      setIsPaused(true);
      pauseStartTimeRef.current = now;
    }
  };

  const resumeAutoPlay = () => {
    if (isPaused) {
      setIsPaused(false);
      pauseStartTimeRef.current = null;
      startAutoPlay(true); // Use remaining time
    } else {
      setIsAutoPlaying(true);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, isPaused]);

  // Resume auto-play after user interaction pause
  useEffect(() => {
    if (!isAutoPlaying) {
      const resumeTimeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 8000); // Resume after 8 seconds of no interaction

      return () => clearTimeout(resumeTimeout);
    }
  }, [isAutoPlaying, expandedCardId]);

  // Pause auto-play on hover (for desktop)
  const handleMouseEnter = () => {
    if (isAutoPlaying && !isPaused) {
      pauseAutoPlay();
    }
  };

  const handleMouseLeave = () => {
    if (isPaused) {
      resumeAutoPlay();
    }
  };

  return (
    <div id="philosophy" className="mx-auto py-[50px] sm:py-[110px] open_sans">
      <p className="font-semibold sm:font-bold text-[#FF9E29] text-center max-sm:text-sm">PHILOSOPHY</p>
      <h2 className="text-display-xs sm:text-display-md font-bold mb-2 text-center">Our Investing <span className=" open_sans_italic">Philosophy</span></h2>
      <p className="max-sm:mt-3 text-sm sm:text-lg text-gray-500 mb-7 sm:mb-10 text-center">
        Behind every stock is a company. We find out what it's doing and why.
      </p>
      <div
        className="w-fit mx-auto "
        
      >
        <div>
          <DesktopExpandedCards onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} toggleCard={toggleCard} expandedCardId={expandedCardId as string} />
          {/* Carousel Indicators */}
          <div className="flex gap-4 justify-center items-center mt-10 max-xl:hidden">
            {cards.map((_, index) => (
              <CarouselIndicator
                key={index}
                isPlaying={isAutoPlaying && !isPaused}
                onClick={() => toggleCard(cards[index].id)}
                index={index}
                selectedIndex={currentIndex}
                animationDuration={`${AUTO_PLAY_INTERVAL}ms`}
              />
            ))}
          </div>
        </div>

        <MobileExpandedCards
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          autoPlayInterval={AUTO_PLAY_INTERVAL}
          currentIndex={currentIndex}
          toggleCard={toggleCard}
          expandedCardId={expandedCardId as string}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
}
