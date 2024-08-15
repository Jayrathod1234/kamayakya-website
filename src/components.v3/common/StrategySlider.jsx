import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Discovercard from "./Discovercard";
import ChevronRightIcon   from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Button } from "../../components.v2/ui/button";


const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    // if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    // if (onButtonClick) onButtonClick(emblaApi)
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

const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className="right-4  md:right-0  max-w-[225px] h-[240px] justify-center  md:w-1/3  absolute md:bg-gradient-to-l from-[#FCFCFD] to-transparent z-20 flex flex-row items-center">
      <div>
        <Button
          {...restProps}
          variant={"default"}
          className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2 "
        >
          <ChevronRightIcon
            className="inline-block md:hidden text-white"
            fontSize="small"
            
          />
        </Button>
      </div>
    </div>
  );
};
const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <div className="left-4  md:right-0  max-w-[225px] h-[240px] justify-center  md:w-1/3  absolute md:bg-gradient-to-l  z-20 flex flex-row items-center">
      <div>
        <Button
          {...restProps}
          variant={"default"}
          className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2 "
        >
         <ChevronLeftIcon 
          className="inline-block md:hidden text-white"
          fontSize="small"
          
         />
        </Button>
      </div>
    </div>
  );
};
const StrategySlider = ({ strategyTagList, colors }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);  
  const { prevBtnDisabled, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  const carouselItemComponents = strategyTagList.map((item, index) => (
    <Discovercard
      key={index} // Use the index or a unique identifier if available
      name={item.name}
      color={colors[item.slug]}
      image={item.image}
      description={item.description}
      id={item.id}
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
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </>
  );
};

export default StrategySlider;
