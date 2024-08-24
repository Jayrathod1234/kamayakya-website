import { TChildren } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components.v2/ui/button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getMixPanelClient } from "@/externals/mixpanel";
import ClassNames from "embla-carousel-class-names";

export const usePrevNextButtons = (emblaApi, onButtonClick) => {
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

  const onSelect = useCallback((emblaApi) => {
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

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
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

export const CarouselItem = React.forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`carousel__item h-full ${className}`}>
      {children}
    </div>
  );
});

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

export function Slider({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      // startIndex: 1,
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 6000 }), ClassNames()] //change carousel timer here.
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const handlePrevNext = (cb) => {
    cb();
    const mp = getMixPanelClient();
    mp.track("testimonialsnav_clicked", {
      page: "Pricing_Page",
    });
  };

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".main_card_carousel");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((emblaApi, eventName) => {
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
        tweenNode.style.transform = `scale(${scale})`;
        // tweenNode.style.transform = `scale(${scale})`;
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
      <div className="h-full left-4 md:left-0  md:w-1/3 max-w-[261px] absolute md:bg-gradient-to-r from-gray-100 to-transparent z-20 flex flex-col justify-center ">
        <div>
          <Button
            onClick={() => handlePrevNext(onPrevButtonClick)}
            // disabled={selectedIndex == 1 ? true : prevBtnDisabled}
            variant={"default"}
            className=" rounded-full md:h-[52px] md:w-[52px] h-6 w-6 p-2"
          >
            <ChevronLeftIcon fontSize="small" style={{ color: "white" }} />
          </Button>
        </div>
      </div>
      <div className=" right-4  md:right-0 h-full max-w-[261px] md:w-1/3  absolute md:bg-gradient-to-l from-gray-100 to-transparent z-20 flex flex-col justify-center items-center">
        <div>
          <Button
            onClick={() => handlePrevNext(onNextButtonClick)}
            // disabled={selectedIndex === carouselItem.length - 2 ? true : nextBtnDisabled}
            variant={"default"}
            className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2 "
          >
            {/* <ChevronRightIcon className="hidden md:inline-block" fontSize="large" style={{ color: "white" }} /> */}
            <ChevronRightIcon
              className="inline-block md:hidden"
              fontSize="small"
              style={{ color: "white" }}
            />
          </Button>
        </div>
      </div>

      <div ref={emblaRef} className={`  max-w-[100vw] overflow-hidden`}>
        {/* <div className=" overflow-hidden max-w-full"> */}
        <div
          className=" flex pb-12 pt-[60px] carousel__container"
          style={{ backfaceVisibility: "hidden" }}
        >
          {children.map((carousel, index) => (
            <CarouselItem
              key={carousel.key}
              className={` carousel embla__class-names  
              ${index === selectedIndex
                  ? ""
                  : index > selectedIndex
                    ? `!scale-[0.85] ${selectedIndex + 2 == index
                      ? "md:ml-[-2rem] lg:ml-[-3rem]"
                      : ""
                    }`
                    : `!scale-[0.85] ${selectedIndex - 2 == index
                      ? "md:mr-[-2rem] lg:mr-[-3rem]"
                      : ""
                    }`
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
      <div className="flex gap-2 justify-center items-center ">
        {scrollSnaps.slice(0, 5).map((_, index) => (
          <div
            onClick={() => onDotButtonClick(index)}
            key={index}
            className={`${index === selectedIndex ? "w-4 !bg-brand-300" : "aspect-square"
              } h-[8px] bg-gray-200 rounded-full transition-all`}
          ></div>
        ))}
      </div>


    </div>
  );
}
