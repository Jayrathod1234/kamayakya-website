import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import React, { useState } from "react";
import TeamCard from "./TeamCard";
import Autoplay from "embla-carousel-autoplay";
import { usePrevNextButtons } from "@/components.v2/carousel";
import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";

export default function Team() {

  const [api, setApi] = useState<CarouselApi>()
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(api);

  const handlePrevNext = (cb: () => void) => {
    cb();
  };

  return (
    <div className=" md:main-container">
      <div className=" py-[50px] bg-[rgba(13,65,57,1)] open_sans px-[60px] rounded-t-xl">
        <p className=" text-[#FF9E29] font-bold text-center">TEAM</p>
        <h3 className=" text-display-md font-bold mt-[6px] mb-0 text-center text-white">Meet the team!</h3>
        <p className=" text-lg text-gray-150 mt-3 text-center">
          Meet our team of seasoned equity research analysts, trusted by clients worldwide for delivering value through
          a powerful blend of decades of experience and deep expertise.
        </p>
        <Carousel setApi={setApi}  plugins={[Autoplay({delay:2000 })]} className=" mt-[38px] w-full">
          <CarouselContent className="">
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
            <CarouselItem className=" basis-auto"><TeamCard/></CarouselItem>
          </CarouselContent>
          <div className="h-full -left-6 max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center ">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onPrevButtonClick)}
              variant={ButtonVariant.custom}
              strokeStyle=" stroke-gray-950"
              className=" bg-white rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 "
            ></ButtonnArrow>
          </div>
        </div>
        <div className=" -right-6  h-full max-w-[261px] top-0 absolute z-20 flex flex-col justify-center items-center">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onNextButtonClick)}
              variant={ButtonVariant.custom}
              strokeStyle=" stroke-gray-950"
              className=" bg-white rounded-full h-6 w-6 md:h-[52px] md:w-[52px] min-w-0 md:!p-2 !px-4 !py-4 "
            ></ButtonnArrow>
          </div>
        </div>
        </Carousel>
      </div>
    </div>
  );
}
