import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Discovercard from "./Discovercard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "../../components.v2/ui/button";

const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

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

const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className=" left-4  md:left-0 h-[261px] max-w-[261px] md:w-1/3  absolute md:bg-gradient-to-l from-[#FCFCFD] to-transparent z-20 flex flex-col items-center">
      <button
        className="embla__button embla__button--prev"
        type="button"
        {...restProps}
      >
        <svg className="embla__button__svg" viewBox="0 0 532 532">
          <path
            fill="currentColor"
            d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
          />
        </svg>
        {children}
      </button>
    </div>
  );
};

const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className=" right-4  md:right-0  max-w-[261px] md:w-1/3  absolute md:bg-gradient-to-l from-[#FCFCFD] to-transparent z-20 flex flex-col items-center">
      <div>
        <Button
          {...restProps}
          //   onClick={() => handlePrevNext(onNextButtonClick)}
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
  );
};
const DiscoverCarousel = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const carouselItems = [
    {
      name: "Value Pick",
      color: "#EEF7F6",
      image: "/assets/discover-by-strategy/value-pick.svg",
      description: "Discover undervalued gems with strong fundamentals.",
    },
    {
      name: "Turnaround Story",
      color: "#FFF1DE",
      image: "/assets/discover-by-strategy/turnaround-story.svg",
      description: "Invest in companies poised for a comeback.",
    },
    {
      name: "Special Situation",
      color: "#FAF8D7",
      image: "/assets/discover-by-strategy/special-situation.svg",
      description:
        "Unique opportunities arising from corporate events or restructuring.",
    },
    {
      name: "Management Change",
      color: "#F8ECFA",
      image: "/assets/discover-by-strategy/management-change.svg",
      description: "Benefit from new leadership and strategic direction.",
    },
    {
      name: "Market Leadership",
      color: "#FFF7CF",
      image: "/assets/discover-by-strategy/market-leadership.svg",
      description: "Invest in industry leaders with a strong market position.",
    },
    {
      name: "Industry Tailwind",
      color: "#E7F4FF",
      image: "/assets/discover-by-strategy/industry-tailwind.svg",
      description: "Sectors with favorable economic conditions driving growth.",
    },
    {
      name: "Moated",
      color: "#F8ECFA",
      image: "/assets/discover-by-strategy/moated.svg",
      description:
        "Firms with strong competitive advantages that protect their market position.",
    },
    {
      name: "Cyclicals",
      color: "#F2F7FB",
      image: "/assets/discover-by-strategy/cyclicals.svg",
      description: "Invest in industries that benefit from economic cycles.",
    },
    {
      name: "Thematic Stories",
      color: "#FFF9D6",
      image: "/assets/discover-by-strategy/thematic-stories.svg",
      description: "Align investments with emerging trends and themes.",
    },
    {
      name: "Future Focused",
      color: "#FFE7E9",
      image: "/assets/discover-by-strategy/future-focused.svg",
      description: "Companies with a strong vision for long-term growth.",
    },
    {
      name: "ESG",
      color: "#E9F8D2",
      image: "/assets/discover-by-strategy/esg.svg",
      description:
        "Invest in companies with strong Environmental, Social, and Governance practices.",
    },
    {
      name: "High Dividends",
      color: "#FFF3E1",
      image: "/assets/discover-by-strategy/high-dividends.svg",
      description:
        "Companies offering attractive and consistent dividend yields.",
    },
  ];

  const carouselItemComponents = carouselItems.map((item, index) => (
    <Discovercard
      key={index} // Use the index or a unique identifier if available
      name={item.name}
      color={item.color}
      image={item.image}
      description={item.description}
    />
  ));

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-[28px]">
          {carouselItemComponents}
        </div>
      </div>
      <div className="">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

export default DiscoverCarousel;
