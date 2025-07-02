import { useDotButton } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BarChart3, Earth, LucideMessageCircleMore, MessageCircleMore } from "lucide-react";
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
  icon,
  label,
  title,
  description,
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
          {icon}
          {/* <LucideMessageCircleMore /> */}
        </div>
        <div>
          <div className=" flex flex-col sm:flex-row  flex-wrap sm:items-center gap-x-[6px]">
            <p className=" sm:text-lg font-semibold text-gray-950">{title}</p>
            <p className=" sm:mt-[4.5px] text-3xs font-bold text-gray-500 p-[6px] bg-gray-50 rounded-[4px]">{label}</p>
          </div>
          {index + 1 == selectedIndex ? (
            <p className=" text-sm text-gray-600">{description}</p>
          ) : (
            <p className=" md:hidden text-sm text-gray-600">{description}</p>
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
            <Steps
              icon={
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33301 14.726H9.34467M13.9997 14.726H14.0113M18.6663 14.726H18.678M9.21634 24.0593C11.443 25.2015 14.0044 25.5109 16.439 24.9317C18.8736 24.3525 21.0213 22.9228 22.4951 20.9002C23.9688 18.8776 24.6717 16.3951 24.477 13.9002C24.2824 11.4052 23.203 9.06176 21.4334 7.29219C19.6639 5.52262 17.3205 4.44326 14.8255 4.24862C12.3305 4.05398 9.84806 4.75685 7.82546 6.23059C5.80287 7.70432 4.37315 9.85199 3.79393 12.2866C3.21472 14.7212 3.52411 17.2826 4.66634 19.5093L2.33301 26.3926L9.21634 24.0593Z"
                    stroke="url(#paint0_linear_17339_91422)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_17339_91422"
                      x1="23.9864"
                      y1="24.0265"
                      x2="-0.0266645"
                      y2="0.630843"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#12ADB7" />
                      <stop offset="1" stop-color="#125B54" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              label={"KamayaKya recommendations"}
              title={"Subscribe to our best picks"}
              description={
                "We only recommend stocks that we personally are willing to invest in. We research rigorously, so you don't have to."
              }
              video="/how_vid1.mp4"
              api={api}
              selectedIndex={current}
              isPlaying={isPlaying}
              index={0}
            />
            <Steps
              icon={
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.5 3.72656V24.7266H24.5M21 20.0599V10.7266M15.1667 20.0599V6.0599M9.33333 20.0599V16.5599"
                    stroke="url(#paint0_linear_17339_91434)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_17339_91434"
                      x1="24.0052"
                      y1="22.4859"
                      x2="1.26545"
                      y2="0.330748"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#12ADB7" />
                      <stop offset="1" stop-color="#125B54" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              label={"Performance Track Record"}
              title={"We promise 100% transparency"}
              description={""}
              video="/how_vid1.mp4"
              api={api}
              selectedIndex={current}
              isPlaying={isPlaying}
              index={1}
            />
            <Steps
              icon={
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M25.1297 17.7272H19.833C19.2142 17.7272 18.6207 17.973 18.1831 18.4106C17.7455 18.8482 17.4997 19.4417 17.4997 20.0605V25.3572M8.16634 4.12388V6.06055C8.16634 6.9888 8.53509 7.87904 9.19147 8.53542C9.84785 9.1918 10.7381 9.56055 11.6663 9.56055C12.2852 9.56055 12.8787 9.80638 13.3163 10.244C13.7538 10.6816 13.9997 11.275 13.9997 11.8939C13.9997 13.1772 15.0497 14.2272 16.333 14.2272C16.9518 14.2272 17.5453 13.9814 17.9829 13.5438C18.4205 13.1062 18.6663 12.5127 18.6663 11.8939C18.6663 10.6105 19.7163 9.56055 20.9997 9.56055H24.698M12.833 25.8355V21.2272C12.833 20.6084 12.5872 20.0149 12.1496 19.5773C11.712 19.1397 11.1185 18.8939 10.4997 18.8939C9.88084 18.8939 9.28734 18.648 8.84976 18.2105C8.41217 17.7729 8.16634 17.1794 8.16634 16.5605V15.3939C8.16634 14.775 7.92051 14.1816 7.48292 13.744C7.04534 13.3064 6.45185 13.0605 5.83301 13.0605H2.39134M25.6663 14.2272C25.6663 20.6705 20.443 25.8939 13.9997 25.8939C7.55635 25.8939 2.33301 20.6705 2.33301 14.2272C2.33301 7.78389 7.55635 2.56055 13.9997 2.56055C20.443 2.56055 25.6663 7.78389 25.6663 14.2272Z"
                    stroke="url(#paint0_linear_17339_91445)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_17339_91445"
                      x1="25.1166"
                      y1="23.4043"
                      x2="-0.149831"
                      y2="-1.21258"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#12ADB7" />
                      <stop offset="1" stop-color="#125B54" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              label={"360° View"}
              title={"Understand your investments"}
              description={""}
              video="/how_vid1.mp4"
              api={api}
              selectedIndex={current}
              isPlaying={isPlaying}
              index={2}
            />
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
