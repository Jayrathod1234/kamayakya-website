import { TChildren } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components.v2/ui/button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import LatestReleasesCard from "./LatestReleasesCard";
import { getMixPanelClient } from "@/externals/mixpanel";

const carouselItems = [
  <LatestReleasesCard key="1" percentage="12.24" />,
  <LatestReleasesCard key="2" percentage="20.24" />,
  <LatestReleasesCard key="3" percentage="20.24" />,
  <LatestReleasesCard key="4" percentage="20.24" />,
  <LatestReleasesCard key="5" percentage="20.24" />,
  <LatestReleasesCard key="6" percentage="20.24" />,
  <LatestReleasesCard key="7" percentage="20.24" />,
  <LatestReleasesCard key="8" percentage="20.24" />,
];

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    emblaApi?.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    emblaApi?.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const CarouselItem = React.memo(
  React.forwardRef<HTMLDivElement, TChildren & { className?: string }>(({ children, className }, ref) => (
    <div ref={ref} className={`carousel__item h-full ${className}`}>
      {children}
    </div>
  ))
);

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export function LatestReleasesCarousel({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 6000 }), ClassNames()]
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const handlePrevNext = (cb: () => void) => {
    cb();
    const mp = getMixPanelClient();
    mp.track("testimonialsnav_clicked", { page: "Pricing_Page" });
  };

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) =>
      slideNode.querySelector(".main_card_carousel") as HTMLElement
    );
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: any) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                diffToTarget = sign === -1
                  ? scrollSnap - (1 + scrollProgress)
                  : scrollSnap + (1 - scrollProgress);
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          console.log("🚀 ~ slidesInSnap.forEach ~ ̥:")

          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    const handleEvent = (eventName: string) => {
      if (emblaApi) {
        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi, eventName);
      }
    };

    emblaApi.on("reInit", () => handleEvent("reInit"));
    emblaApi.on("scroll", () => handleEvent("scroll"));
    emblaApi.on("slideFocus", () => handleEvent("slideFocus"));
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  return (
    <div className={`relative w-screen m-auto ${className}`}>
      <div className="h-full left-4 md:left-0 md:w-1/3 max-w-[261px] absolute md:bg-gradient-to-r from-gray-100 to-transparent z-20 flex flex-col justify-center">
        <Button
          onClick={() => handlePrevNext(onPrevButtonClick)}
          variant={"default"}
          className="rounded-full md:h-[52px] md:w-[52px] h-6 w-6 p-2"
        >
          <ChevronLeftIcon fontSize="small" style={{ color: "white" }} />
        </Button>
      </div>
      <div className="right-4 md:right-0 h-full max-w-[261px] md:w-1/3 absolute md:bg-gradient-to-l from-gray-100 to-transparent z-20 flex flex-col justify-center items-center">
        <Button
          onClick={() => handlePrevNext(onNextButtonClick)}
          variant={"default"}
          className="rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2"
        >
          <ChevronRightIcon fontSize="small" style={{ color: "white" }} />
        </Button>
      </div>

      <div ref={emblaRef} className="max-w-[100vw] overflow-hidden">
        <div className="flex pb-12 pt-[60px] carousel__container" style={{ backfaceVisibility: "hidden" }}>
          {carouselItems.map((item, index) => (
            <CarouselItem
              key={index}
              className={`
              ${index === selectedIndex ? "" : "!scale-[0.85]"}
              ${index > selectedIndex ? (selectedIndex + 2 === index ? "md:ml-[-2rem] lg:ml-[-3rem]" : "") : ""}
              ${index < selectedIndex ? (selectedIndex - 2 === index ? "md:mr-[-2rem] lg:mr-[-3rem]" : "") : ""}
            `}
            >
              {item}
            </CarouselItem>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center items-center">
        {scrollSnaps.map((_, index) => (
          <div
            onClick={() => onDotButtonClick(index)}
            key={index}
            className={`h-[10px] w-6 bg-gray-200 rounded-full transition-all ${index === selectedIndex ? "!bg-brand-300" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
