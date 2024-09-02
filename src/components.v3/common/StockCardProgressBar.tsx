import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components.v2/ui/carousel";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
const targets = [
  { price: 3725, label: "Target-2", date: "Jan 2024", status: "Completed" },
  { price: 3740, label: "Target-3", date: "Feb 2024", status: "Completed" },
  { price: 3725, label: "Target-4", date: "Jan 2024", status: "Completed" },
  { price: 3740, label: "Target-5", date: "Feb 2024", status: "Completed" },
  { price: 3725, label: "Target-6", date: "Jan 2024", status: "Completed" },
  { price: 3740, label: "Target-7", date: "Feb 2024", status: "Completed" },
  { price: 4470, label: "CMP", date: "Mar 2024", status: "Completed" },
  // { price: 5364, label: "Target-8", status: "Active" },
];
const prices = [3725, 3740, 4470, 5364];
const labels = ["Target-2", "Target-3", "CMP", "Target-4"];
const dates = ["Jan 2024", "Feb 2024", "Mar 2024"];

export const StockCardProgressBar = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  // const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<Array<HTMLDivElement>>([]);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const [currentSlidesInView, setCurrentSlidesInView] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("scroll", () => {
      // let currentSlideInView = 
      setCurrentSlidesInView(api.slidesInView());
      // const progress = Math.max(0, Math.min(1, api.scrollProgress()));
      // setScrollProgress(progress * 100);
    });
  }, [api]);
  //  console.log(scrollProgress)

  useEffect(() => {
    let currentPointsProgress = currentSlidesInView.reduce(
      (acc, current, index) => (targets[current]?.status === "Completed" ? acc + 1 : acc),
      0
    );
    console.log(currentPointsProgress)
    setCurrentProgress(((currentPointsProgress-1) / (currentSlidesInView.length - 1)) * 100);
  }, [currentSlidesInView]);

  useEffect(() => {
    if (!ref.current) return;
    setMargins(() => ({
      marginLeft: ref.current[0].offsetWidth / 2,
      marginRight: ref.current[targets.length - 1].offsetWidth / 2,
    }));
  }, [ref.current]);
  console.log(targets.length)
 
  return (
    // <div className=" pt-5 pb-4">
    <div className=" relative">
      <Carousel setApi={setApi} opts={{slidesToScroll:2}}>
        <CarouselContent>
          {targets.map((target, index) => (
            //adjusting the basis class will determine the no. of items visible eg:basis-1/2 will show 2 items at a time
            <CarouselItem className=" basis-1/3 z-20">  
              <div
                ref={(el) => (ref.current[index] = el as HTMLDivElement)}
                className=" relative flex flex-col items-center z-10"
              >
                <h4 className=" font-medium text-3xs text-[#667085]">{target.label}</h4>
                <div className=" bg-white p-[2px] rounded-full h-4 w-4 flex items-center justify-center ">
                  <div className=" my-[6px] h-3 w-3 rounded-full border-2 border-[#12B76A] flex items-center justify-center">
                    <div className=" h-[4px] w-[4px] bg-[#12B76A] rounded-full"></div>
                  </div>
                </div>
                <h4 className=" text-[#344054] font-semibold text-sm">₹{target.price}</h4>
                <p className=" text-[#98A2B3] text-3xs">{target?.date}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" left-0 top-[38%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
        <CarouselNext className=" right-0 top-[38%] disabled:hidden border border-[#F9FAFB] shadow-[0px_1px_2px_0px_#1018280F]" />
      </Carousel>
      {/*DOTTED PROGRESS  */}
      <div
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
        className=" border-[1.5px] border-[#D0D5DD] h-[0px] w-full absolute border-dashed border-separate top-[38%] z-10"
      >
        {/* <div
                style={{ width: `${(currentProgress)}%` }}
                className=" h-[2px] bg-[#32D583]"
              ></div> */}
      </div>
      {/* SOLID PROGRESS */}
      <div
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
        className="  h-[0px] w-full absolute  top-[38%] z-10"
      >
        <div
          style={{ width: `${currentProgress}%` }}
          className=" h-[2px] bg-[#32D583]"
        ></div>
      </div>
    </div>
  );
};

