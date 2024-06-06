import { TChildren } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./carousel.module.css";
import { Button } from "./ui/button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TestimonialsCard } from "./cards";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getMixPanelClient } from "@/externals/mixpanel";
import ClassNames from 'embla-carousel-class-names'

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
      "I have been investing with KamayaKya since over a year now and I only have good things to say. Very good returns, transparency and a team of market experts with amazing investment strategies. I plan to invest with the firm for a long time and I would highly recommend it too."
    }
    author={"Tanish Mittal"}
    company="Hindustan Pressings Pvt. Ltd."
    imgSrc="/tanish_mittal.png"
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
    imgSrc="/kiran_sanghvi.png"
    company="Indus Properties"
    author="Kiran Sanghvi"
    testimony="My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched in the industry. Some of their small cap picks are truly gems that have created  huge wealth for their investors. I would highly recommend investors to take their services to achieve their long term financial goals."
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

export const CarouselItem = React.forwardRef(
  ({ children, className, ref }: TChildren & { className?: string; ref: any }) => {
    return (
      <div ref={ref} className={`carousel__item h-full ${className}`}>
        {children}
      </div>
    );
  }
);

export function Carousel({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      // startIndex: 1,
      loop: true,
    },
    [Autoplay({ playOnInit: true, delay: 3000 }),ClassNames()]
  );
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const handlePrevNext = (cb: () => void) => {
    cb();
    const mp = getMixPanelClient();
    mp.track("testimonialsnav_clicked", {
      page: "Pricing_Page",
    });
  };

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
            <ChevronRightIcon className="inline-block md:hidden" fontSize="small" style={{ color: "white" }} />
          </Button>
        </div>
      </div>

      <div ref={emblaRef} className={`  max-w-[100vw] overflow-hidden`}>
        {/* <div className=" overflow-hidden max-w-full"> */}
        <div className=" flex pb-12 pt-[60px] carousel__container" style={{ backfaceVisibility: "hidden" }}>
          {carouselItem.map((carousel, index) => (
            <CarouselItem
            key={carousel.key}
              className={` carousel embla__class-names  flex-[0_0_25%]
              ${""
                // index === selectedIndex ? "" : index > selectedIndex
                //  ? " !scale-75 md:ml-[-2rem] lg:ml-[-4rem]"
                //  : " !scale-75 md:mr-[-2rem] lg:mr-[-4rem]"
              }
              `
            }
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
              index === selectedIndex ? "w-6 !bg-brand-300" : "aspect-square"
            } h-[10px]  bg-gray-200 rounded-full transition-all`}
          ></div>
        ))}
      </div>
    </div>
  );
}
