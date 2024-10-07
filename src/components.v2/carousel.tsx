import { TChildren } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./carousel.module.css";
import { Button } from "./ui/button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TestimonialsCard } from "./payments/testimonials-card";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getMixPanelClient } from "@/externals/mixpanel";
import ClassNames from "embla-carousel-class-names";
import { ButtonnArrow } from "./button";
import { ButtonVariant } from "./button/button";

const carouselItem = [
  <TestimonialsCard
    testimony={
      "I have been investing with KamayaKya since over a year now and I only have good things to say. Very good returns, transparency and a team of market experts with amazing investment strategies. I plan to invest with the firm for a long time and I would highly recommend it too."
    }
    author={"Tanish Mittal"}
    company="Hindustan Pressings Pvt. Ltd."
    imgSrc="/tanish_mittal.png"
    key={1}
  />,
  <TestimonialsCard
    imgSrc="/kiran_sanghvi.png"
    company="Indus Properties"
    author="Kiran Sanghvi"
    testimony="My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched in the industry. Some of their small cap picks are truly gems that have created  huge wealth for their investors. I would highly recommend investors to take their services to achieve their long term financial goals."
    key={2}
  />,
  <TestimonialsCard
    testimony={
"I have been thoroughly impressed with Kamayakya's stock recommendations. Their picks have been spot on, and the inclusion of a specified time period for each recommendation provides a clear understanding of when to exit. This level of detail is invaluable for any investor! Additionally, I apply my own technical analysis to their selected stocks, which adds an extra layer of confidence to my investments. I highly recommend Kamayakya's subscription to any medium to long-term investor."    }
    author={"Atharva Agashe"}
    company="Associated Director - Product Development, FIS."
    imgSrc="/atharva-agashe.jpeg"
    key={13}
  />,
  <TestimonialsCard
    imgSrc="/kiran_sanghvi.png"
    company="Indus Properties"
    author="Kiran Sanghvi"
    testimony="My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched in the industry. Some of their small cap picks are truly gems that have created  huge wealth for their investors. I would highly recommend investors to take their services to achieve their long term financial goals."
    key={23}
  />,
  <TestimonialsCard
    testimony={
      "I have been investing with KamayaKya since over a year now and I only have good things to say. Very good returns, transparency and a team of market experts with amazing investment strategies. I plan to invest with the firm for a long time and I would highly recommend it too."
    }
    author={"Tanish Mittal"}
    company="Hindustan Pressings Pvt. Ltd."
    imgSrc="/tanish_mittal.png"
    key={12}
  />,
  <TestimonialsCard
    testimony={
"I have been thoroughly impressed with Kamayakya's stock recommendations. Their picks have been spot on, and the inclusion of a specified time period for each recommendation provides a clear understanding of when to exit. This level of detail is invaluable for any investor! Additionally, I apply my own technical analysis to their selected stocks, which adds an extra layer of confidence to my investments. I highly recommend Kamayakya's subscription to any medium to long-term investor."    }
    author={"Atharva Agashe"}
    company="Associated Director - Product Development, FIS."
    imgSrc="/atharva-agashe.jpeg"
    key={21}
  />,
];

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: UseEmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    // if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    // if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi as EmblaCarouselType);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): any => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
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

export const CarouselItem = React.forwardRef< HTMLDivElement,TChildren & { className?: string; }>(
  ({ children, className, },ref ) => {
    return (
      <div ref={ref} className={`carousel__item h-full ${className}`}>
        {children}
      </div>
    );
  }
);

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

export function Carousel({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      // startIndex: 1,
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 6000,stopOnInteraction:false }), ClassNames()] //change carousel timer here.
  );
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const handlePrevNext = (cb: () => void) => {
    cb();
    const mp = getMixPanelClient();
    mp.track("testimonialsnav_clicked", {
      page: "Pricing_Page",
    });
  };

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".testimony") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: any) => {
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

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        // console.log("🚀 ~ slidesInSnap.forEach ~ tweenNode:", tweenNode);
        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className={`relative w-screen m-auto`}>
      {/* gradient */}
      <div className="h-full left-4 md:left-0  md:w-1/3 max-w-[261px] absolute md:bg-gradient-to-r from-gray-100 to-transparent z-20 flex flex-col justify-center items-center ">
        <div>
          <ButtonnArrow
            onClick={() => handlePrevNext(onPrevButtonClick)}
            variant={ButtonVariant.custom}
            className=" rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 hover:bg-[#0b3a36]"
          ></ButtonnArrow>
        </div>
      </div>
      <div className=" right-4 md:right-0 h-full max-w-[261px] md:w-1/3  absolute md:bg-gradient-to-l from-gray-100 to-transparent z-20 flex flex-col justify-center items-center">
        <div>
          <ButtonnArrow
            onClick={() => handlePrevNext(onNextButtonClick)}
            variant={ButtonVariant.custom}
            className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] min-w-0 md:!p-2 !px-4 !py-4 hover:bg-[#0b3a36]"
          ></ButtonnArrow>
        </div>
      </div>

      <div ref={emblaRef} className={`  max-w-[100vw] overflow-hidden`}>
        {/* <div className=" overflow-hidden max-w-full"> */}
        <div
          className=" flex pb-12 pt-[40px] carousel__container"
          style={{ backfaceVisibility: "hidden" }}
        >
          {carouselItem.map((carousel, index) => (
            <CarouselItem
              key={carousel.key}
              className={` carousel embla__class-names  
              ${""
                // index === selectedIndex ? "" : index > selectedIndex
                //  ? " !scale-75 md:ml-[-2rem] lg:ml-[-4rem]"
                //  : " !scale-75 md:mr-[-2rem] lg:mr-[-4rem]"
                }
              `}
            >
              {carousel}
            </CarouselItem>
          ))}
        </div>
        {/* </div> */}
      </div>
      {/* indicator */}
      <div className=" flex gap-4 justify-center items-center">
        {scrollSnaps.map((_: unknown, index: number) => (
          <div
            onClick={() => onDotButtonClick(index)}
            key={index}
            className={` ${
              index === selectedIndex ? " !w-6 " : " w-[10px] "
            } h-[10px]  bg-gray-200 rounded-full transition-all duration-300 overflow-hidden`}
          ><div style={{animationDuration:"6000ms"}} className={`bg-brand-300 w-full h-full ${index === selectedIndex ? "carousel-dot-animate":" hidden"}`}></div></div>
        ))}
      </div>
    </div>
  );
}
