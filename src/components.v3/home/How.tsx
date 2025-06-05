import { useDotButton } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LucideMessageCircleMore } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import CarouselIndicator from "../common/CarouselIndicator";

function Steps({
  video,
  text,
  className,
  api,
  // onClick,
  index,
  selectedIndex,
  animationDuration,
  isPlaying,
}) {
  const [currentAnimationTime, setCurrentAnimationTime] = useState(0);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Helper function to get animation progress based on transform scale
  const calculateAnimationProgress = () => {
    if (progressRef.current) {
      const computedStyle = getComputedStyle(progressRef.current);
      const transformMatrix = computedStyle.transform;
      if (transformMatrix !== "none") {
        // Extract the scaleX value from matrix
        const scaleX = parseFloat(transformMatrix.split(", ")[0].replace("matrix(", ""));
        const progress = scaleX * parseFloat("6000ms");
        setCurrentAnimationTime(progress);
      }
    }
  };

  const onClick = () => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(calculateAnimationProgress, 100);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, animationDuration]);
  return (
    <div
      className={` py-6 px-4 relative overflow-hidden  ${
        index + 1 === selectedIndex
          ? "border border-brand-300 rounded-xl"
          : " border-b border-b-gray-200 max-md:border max-md:border-brand-300 max-md:rounded-xl"
      }`}
    >
      <video
        width={342}
        height={235}
        autoPlay
        muted
        className=" h-full w-full max-w-[342px] max-h-[235px] mx-auto object-cover mb-[10px] rounded-xl md:hidden"
        src={video}
      />
      <div className={` relative flex items-start gap-x-[10px]    `}>
        <div className=" pt-[4px]">
          <LucideMessageCircleMore />
        </div>
        <div>
          <div className=" flex flex-col sm:flex-row  flex-wrap sm:items-center gap-x-[6px]">
            <p className=" sm:text-lg font-semibold text-gray-950">Subscribe to our best picks</p>
            <p className=" sm:mt-[4.5px] text-3xs font-bold text-gray-500 p-[6px] bg-gray-50 rounded-[4px]">
              KamayaKya recommendations
            </p>
          </div>
          {index + 1 == selectedIndex ? (
            <p className=" text-sm text-gray-600">
              We only recommend stocks that we personally are willing to invest in. We research rigorously, so you don't
              have to.
            </p>
          ) : (
            <p className=" md:hidden text-sm text-gray-600">
              We only recommend stocks that we personally are willing to invest in. We research rigorously, so you don't
              have to.
            </p>
          )}
        </div>
      </div>
      {index + 1 === selectedIndex ? (
        <div
          // onClick={onClick}
          key={index}
          className={` ${
            index + 1 === selectedIndex ? " !w-full " : index + 1 <= selectedIndex ? "w-full" : " w-[10px] "
          } h-[4px] absolute left-0 bottom-0  bg-transparent transition-all duration-300 overflow-hidden cursor-pointer max-md:hidden `}
        >
          <div
            ref={progressRef}
            style={{ animationDuration: "6000ms", animationPlayState: isPlaying ? "running" : "paused" }}
            className={`bg-brand-300 w-full h-full relative ${
              index + 1 === selectedIndex
                ? "carousel-dot-animate"
                : index + 1 <= selectedIndex
                ? "block scale-x-100 "
                : " hidden"
            }`}
          ></div>
        </div>
      ) : null}
    </div>
  );
}

export default function How() {
  const [api, setApi] = useState<CarouselApi>();
  const [api2, setApi2] = useState<CarouselApi>();
  const [isPlaying, setIsPlaying] = useState(true);
  const { selectedIndex, onDotButtonClick } = useDotButton(api);
  const { selectedIndex2, scrollSnaps, onDotButtonClick: onDotButtonClick2 } = useDotButton(api2);

  const [current, setCurrent] = React.useState(0);
  const [current2, setCurrent2] = useState(0);
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    if (!api2) {
      return;
    }

    setCurrent2(api2.selectedScrollSnap());

    api2.on("select", () => {
      setCurrent2(api2.selectedScrollSnap());
    });
  }, [api2]);

  return (
    <div className=" main-container open_sans py-[50px] sm:py-[100px] ">
      <div className="sm:flex sm:space-x-10 sm:w-full">
        <div className=" flex-1">
          <p className=" font-semibold text-[#F98800] max-md:text-center max-sm:text-sm">HOW?</p>
          <h2 className=" text-gray-950 text-display-xs sm:text-display-md font-bold max-md:text-center">
            Welcome to the future of value investing?
          </h2>
          <p className=" text-gray-600 text-sm sm:text-lg max-md:text-center">
            Picking a stock to invest can be a very overwhelming process. KamayaKya aims to make the process easier,
            more transparent and rewarding. So how do we do it?
          </p>
          <div className=" hidden md:mt-14 md:flex flex-col">
            <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={0} />
            <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={1} />
            <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={2} />
          </div>
          <Carousel
            setApi={setApi2}
            className=" mt-6 md:hidden w-full"
            plugins={[
              Autoplay({
                delay: 6000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={0} />
              </CarouselItem>
              <CarouselItem>
                <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={1} />
              </CarouselItem>
              <CarouselItem>
                <Steps video="/how_vid1.mp4" api={api} selectedIndex={current} isPlaying={isPlaying} index={2} />
              </CarouselItem>
            </CarouselContent>
            <div className=" flex gap-4 mt-[10px] justify-center items-center">
              {scrollSnaps.map((_: unknown, index: number) => (
                <CarouselIndicator
                  emblaApi={api2}
                  isPlaying={isPlaying}
                  onClick={() => {
                    setCurrent2(index);
                    onDotButtonClick2(index);
                  }}
                  index={index}
                  selectedIndex={current2}
                />
                // <div
                //   onClick={() => onDotButtonClick(index)}
                //   key={index}
                //   className={` ${
                //     index === selectedIndex ? " !w-6 " : " w-[10px] "
                //   } h-[10px]  bg-gray-200 rounded-full transition-all duration-300 overflow-hidden`}
                // ><div style={{animationDuration:"6000ms"}} className={`bg-brand-300 w-full h-full ${index === selectedIndex ? "carousel-dot-animate":" hidden"}`}></div></div>
              ))}
            </div>
          </Carousel>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
          setApi={setApi}
          className=" flex-1 w-full max-md:hidden"
        >
          <CarouselContent carouselContentParent="h-full" className="h-full">
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] h-full overflow-hidden max-w-[620px] ">
                <video className=" w-full h-full object-cover" width={620} src="/how_vid1.mp4" muted autoPlay />
              </div>
            </CarouselItem>
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] overflow-hidden max-w-[620px] h-full ">
                <video className=" w-full h-full object-cover" width={620} src="/how_vid1.mp4" muted autoPlay />
              </div>
            </CarouselItem>
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] overflow-hidden max-w-[620px] h-full">
                <video className=" w-full h-full object-cover" width={620} src="/how_vid1.mp4" muted autoPlay />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
