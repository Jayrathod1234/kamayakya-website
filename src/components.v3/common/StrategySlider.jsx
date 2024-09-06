import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Discovercard from "./Discovercard";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
          className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2 group hover:scale-[0.90] hover:bg-[#0B3A36] transition-all duration-500 ease-in-out "
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
          className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] p-2  group hover:scale-[0.90] hover:bg-[#0B3A36] transition-all duration-500 ease-in-out"
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
  );
};
const StrategySlider = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const { nextBtnDisabled, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const { prevBtnDisabled, onPrevButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div
          className={`embla__container flex ${React.Children.count(children) < 7 ? 'gap-[100px]' : 'gap-[32px]'
            } `}
        >
          {children}
        </div>
      </div>
      <div className="">
        <div className="embla__buttons ">
          {!prevBtnDisabled && (
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          )}
          {!nextBtnDisabled && (
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StrategySlider;
