import { TChildren } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components.v2/ui/button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { EmblaCarouselType } from "embla-carousel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getMixPanelClient } from "@/externals/mixpanel";
import ClassNames from "embla-carousel-class-names";
import CarouselIndicator from "@/components.v3/common/CarouselIndicator";
export const usePrevNextButtons = (emblaApi, onButtonClick) => {
  // ... existing code
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    const reset = autoplay.reset
    reset()
    // if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    const reset = autoplay.reset
    reset()
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return
      const reset = autoplay.reset
      reset()
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 768); // Adjust based on your breakpoint
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi, onInit, onSelect, handleResize]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
    isSmallScreen,
  };
};

export const CarouselItem = React.forwardRef(({ children, className }, ref) => {
  return (
    <div ref={ref} className={`carousel__item stock__card-slider  ${className}`}>
      {children}
    </div>
  );
});

// ... other parts of the code ...
const TWEEN_FACTOR_BASE = 0.1;

export function Slider({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({ playOnInit: true, delay: 6000, stopOnInteraction: false, stopOnMouseEnter:true }),
      ClassNames(),
    ]
  );

  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick, isSmallScreen } =
    useDotButton(emblaApi);
    let [isPlaying, setIsPlaying] = useState(true);
  const handlePrevNext = (cb) => {
    cb();
    const mp = getMixPanelClient();
    mp.track("latest_releases_clicked", {
      page: "StockPicks_Page",
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

  // const tweenScale = useCallback((emblaApi, eventName) => {
  //   const engine = emblaApi.internalEngine();
  //   const scrollProgress = emblaApi.scrollProgress();
  //   const slidesInView = emblaApi.slidesInView();
  //   const isScrollEvent = eventName === "scroll";

  //   emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
  //     let diffToTarget = scrollSnap - scrollProgress;
  //     const slidesInSnap = engine.slideRegistry[snapIndex];

  //     slidesInSnap.forEach((slideIndex) => {
  //       if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

  //       if (engine.options.loop) {
  //         engine.slideLooper.loopPoints.forEach((loopItem) => {
  //           const target = loopItem.target();

  //           if (slideIndex === loopItem.index && target !== 0) {
  //             const sign = Math.sign(target);

  //             if (sign === -1) {
  //               diffToTarget = scrollSnap - (1 + scrollProgress);
  //             }
  //             if (sign === 1) {
  //               diffToTarget = scrollSnap + (1 - scrollProgress);
  //             }
  //           }
  //         });
  //       }

  //       const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
  //       const scale = numberWithinRange(tweenValue, 0, 1).toString();
  //       const tweenNode = tweenNodes.current[slideIndex];
  //       console.log({ scale });
  //       tweenNode.style.transform = `scale(${scale})`;
  //     });
  //   });
  // }, []);

  function togglePlayingState(emblaApi, eventName) {
    // if (eventName === "autoplay:play") {
    //   const autoplay = emblaApi?.plugins()?.autoplay;
    //   if (!autoplay) return;
    //   autoplay.play(false);
    //   // playAnimation(10);
    // }
    setIsPlaying(eventName === "autoplay:play" ? true : false)
  }

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

        // Stronger scaling effect for center/side differentiation
        const tweenValue = 1 - Math.abs(diffToTarget * 1.5);

        // Set scale range for Y-axis (height) and X-axis (width) independently
        const scaleY = numberWithinRange(tweenValue, 0.86, 1.5); // Smaller side cards height, larger center card
        const scaleX = numberWithinRange(tweenValue, 0.86, 1.5); // Decrease side card width to 0.6, center card remains large

        const tweenNode = tweenNodes.current[slideIndex];
        // Apply scaling to both X and Y axes
        tweenNode.style.transform = `scale(${scaleX}, ${scaleY})`;

        // Keep consistent margin adjustments
        // tweenNode.style.marginLeft = "14px";
        // tweenNode.style.marginRight = "14px";
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
      .on("slideFocus", tweenScale)
      .on("autoplay:play", togglePlayingState)
      .on("autoplay:stop", togglePlayingState);
  }, [emblaApi, tweenScale]);

  return (
    <div className={`relative w-full m-auto`}>
      {/* gradient */}
      {/* <div className="h-full left-4 md:left-0  md:w-1/3 max-w-[261px] absolute md:bg-gradient-to-r from-gray-100 to-transparent z-20 flex flex-col justify-center ">
        <div>
          <Button
            onClick={() => handlePrevNext(onPrevButtonClick)}
            variant={"default"}
            className="rounded-full md:h-[52px] md:w-[52px] h-6 w-6 p-2 group hover:scale-[0.90] hover:bg-[#0B3A36] transition-all duration-500 ease-in-out"
          >
            <div className="w-5 flex items-center justify-center relative">
              <ChevronLeftIcon
                fontSize="small"
                style={{ color: "white" }}
                className="absolute !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-0"
              />
              <KeyboardBackspaceIcon
                fontSize="small"
                style={{ color: "white" }}
                className="absolute !opacity-0 !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-100"
              />
            </div>
          </Button>
        </div>
      </div>
      <div className="right-4  md:right-0 h-full max-w-[261px] md:w-1/3  absolute md:bg-gradient-to-l from-gray-100 to-transparent z-20 flex flex-col justify-center items-center">
        <div>
          <Button
            onClick={() => handlePrevNext(onNextButtonClick)}
            variant={"default"}
            className="rounded-full md:h-[52px] md:w-[52px] hover:scale-[0.90] h-6 w-6 p-2 group hover:bg-[#0B3A36]  transition-all duration-500 ease-in-out"
          >
            <div className="w-5 flex items-center justify-center relative">
              <ChevronRightIcon
                fontSize="small"
                style={{ color: "white" }}
                className="absolute !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-0"
              />
              <EastIcon
                fontSize="small"
                style={{ color: "white" }}
                className="absolute !opacity-0 !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-100"
              />
            </div>
          </Button>
        </div>
      </div> */}

      <Button
        onClick={() => handlePrevNext(onPrevButtonClick)}
        variant={"default"}
        className="rounded-full md:h-[52px] md:w-[52px] h-6 w-6 p-2 group hover:scale-[0.90] hover:bg-[#0B3A36] transition-all duration-500 ease-in-out absolute left-[16px]  top-1/2 -translate-y-1/2 z-20"
      >
        <div className="w-5 flex items-center justify-center relative">
          <ChevronLeftIcon
            fontSize="small"
            style={{ color: "white" }}
            className="absolute !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-0"
          />
          <KeyboardBackspaceIcon
            fontSize="small"
            style={{ color: "white" }}
            className="absolute !opacity-0 !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-100"
          />
        </div>
      </Button>
      <Button
        onClick={() => handlePrevNext(onNextButtonClick)}
        variant={"default"}
        className="rounded-full md:h-[52px] md:w-[52px] hover:scale-[0.90] h-6 w-6 p-2 group hover:bg-[#0B3A36]  transition-all duration-500 ease-in-out absolute right-[16px] top-1/2 -translate-y-1/2 z-20"
      >
        <div className="w-5 flex items-center justify-center relative">
          <ChevronRightIcon
            fontSize="small"
            style={{ color: "white" }}
            className="absolute !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-0"
          />
          <EastIcon
            fontSize="small"
            style={{ color: "white" }}
            className="absolute !opacity-0 !transition-opacity !duration-300 !ease-in-out group-hover:!opacity-100"
          />
        </div>
      </Button>

      <div ref={emblaRef} className={`max-w-[1200px] mx-auto overflow-hidden cursor-[url(/assets/Button-Pause-Circle-3.svg),auto]`}>
        <div
          className="flex pb-12 pt-[40px] carousel__container"
          style={{ backfaceVisibility: "hidden" }}
        >
          {children.map((carousel, index) => (
            <CarouselItem
              key={carousel.key}
              className={`carousel embla__class-names`}
            >
              {/* {carousel(emblaApi)} */}
              {React.cloneElement(carousel, {
                emblaApi: emblaApi, // Add any prop you want to pass
              })}
            </CarouselItem>
          ))}
        </div>
      </div>

      {/* indicator */}
      <div className="flex gap-2 justify-center items-center">
        {scrollSnaps
          .slice(0, scrollSnaps.length) // Show 5 on small screens, all on larger screens
          .map((_, index) => (
            <CarouselIndicator
            emblaApi={emblaApi}
              isPlaying={isPlaying}
              onClick={() => onDotButtonClick(index)}
              index={index}
              selectedIndex={selectedIndex}
            />
          ))}
      </div>
    </div>
  );
}

function numberWithinRange(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

export default Slider;
