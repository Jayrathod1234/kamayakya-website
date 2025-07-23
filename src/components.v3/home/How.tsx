import { useDotButton } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BarChart3, Earth, LucideMessageCircleMore, MessageCircleMore } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import CarouselIndicator from "../common/CarouselIndicator";

interface StepsProps {
  video?: string;
  text?: string;
  className?: string;
  api?: any;
  index: number;
  selectedIndex: number;
  animationDuration?: string;
  isPlaying?: boolean;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}

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
}: StepsProps) {
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
    // Reset timer on manual navigation like main carousel
    const autoplay = api?.plugins()?.autoplay;
    if (!autoplay) return;
    const reset = autoplay.reset;
    reset();
  };

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(calculateAnimationProgress, 100);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, animationDuration]);

  useEffect(() => {
    if (currentAnimationTime > 5890 && api) {
      api.scrollNext();
      const autoplay = api?.plugins()?.autoplay;
      if (!autoplay) return;
      const reset = autoplay.reset;
      reset();
    }
  }, [currentAnimationTime, api]);

  return (
    <div
      className={` pt-2 pb-3 px-2 md:py-6 md:px-4 relative overflow-hidden  ${
        index + 1 === selectedIndex
          ? "border border-brand-300 rounded-xl"
          : " border-b border-b-gray-200 max-lg:border max-lg:border-brand-300 max-lg:rounded-xl"
      }`}
    >
      <video
        width={342}
        height={235}
        autoPlay
        muted
        className=" h-full w-full max-w-[342px] max-lg:max-w-full max-h-[300px] md:max-h-[400px] mx-auto object-cover mb-[10px] rounded-xl lg:hidden"
        src={video}
      />
      <div onClick={onClick} className={` relative flex items-start gap-x-[10px]    `}>
        <div className=" pt-[4px] flex-shrink-0">
          {icon}
          {/* <LucideMessageCircleMore /> */}
        </div>
        <div>
          <div className=" flex flex-col lg:flex-row  flex-wrap lg:items-center gap-x-[6px]">
            <p className=" sm:text-lg font-semibold text-gray-950">{title}</p>
            <p className=" sm:mt-[4.5px] text-3xs font-bold text-gray-500 p-[6px] bg-gray-50 rounded-[4px] max-lg:w-fit">
              {label}
            </p>
          </div>
          {index + 1 == selectedIndex ? (
            <p className=" text-sm text-gray-600">{description}</p>
          ) : (
            <p className=" lg:hidden text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
      {index + 1 === selectedIndex ? (
        <div
          // onClick={onClick}
          key={index}
          className={` ${
            index + 1 === selectedIndex ? " !w-full " : index + 1 <= selectedIndex ? "w-full" : " w-[10px] "
          } h-[4px] absolute left-0 bottom-0  bg-transparent transition-all duration-300 overflow-hidden cursor-pointer max-lg:hidden `}
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
  const [isPaused, setIsPaused] = useState(false);
  const { selectedIndex2, scrollSnaps, onDotButtonClick: onDotButtonClick2 } = useDotButton(api2);

  const [current, setCurrent] = React.useState(0);
  const [current2, setCurrent2] = useState(0);

  // Pause/Resume functionality for Steps hover
  const handleMouseEnter = () => {
    if (isPlaying && !isPaused) {
      setIsPaused(true);
      // if(api?.plugins()?.autoplay?.isPlaying()){
      // Pause autoplay on both carousels
      try {
        const autoplay1 = api?.plugins()?.autoplay;
        if (autoplay1 && typeof autoplay1.stop === "function") autoplay1.stop();
      } catch (error) {
        console.warn("Error pausing autoplay:", error);
      }
    }
  };

  const handleMouseLeave = () => {
    if (isPaused) {
      setIsPaused(false);
      // Resume autoplay on both carousels
      // if(!api?.plugins()?.autoplay?.isPlaying()){
      try {
        const autoplay1 = api?.plugins()?.autoplay;
        if (autoplay1 && typeof autoplay1.play === "function") autoplay1.play();
        // if (autoplay2 && typeof autoplay2.play === "function") autoplay2.play();
      } catch (error) {
        console.warn("Error resuming autoplay:", error);
      }
    }
  };
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("scroll", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Track autoplay state like main carousel
    api.on("autoplay:play", () => setIsPlaying(true));
    api.on("autoplay:stop", () => setIsPlaying(false));
  }, [api]);

  React.useEffect(() => {
    if (!api2) {
      return;
    }

    setCurrent2(api2.selectedScrollSnap());

    api2.on("select", () => {
      setCurrent2(api2.selectedScrollSnap());
    });

    // Track autoplay state like main carousel
    api2.on("autoplay:play", () => setIsPlaying(true));
    api2.on("autoplay:stop", () => setIsPlaying(false));
  }, [api2]);

  return (
    <div className=" main-container open_sans py-[50px] sm:py-[100px]">
      <div className="sm:flex sm:space-x-10 sm:w-full sm:min-h-[600px] lg:h-[600px]">
        <div className=" flex-1">
          <p className=" font-semibold text-[#F98800] max-md:text-center max-sm:text-sm">HOW?</p>
          <h2 className=" text-gray-950 text-display-xs sm:text-display-md font-bold max-md:text-center">
            Welcome to the <span className=" open_sans_italic">future</span> of value investing?
          </h2>
          <p className=" text-gray-600 text-sm sm:text-lg max-md:text-center">
            Picking a stock to invest can be a very overwhelming process. KamayaKya aims to make the process easier,
            more transparent and rewarding. So how do we do it?
          </p>
          <div
            className=" hidden md:mt-14 lg:flex flex-col cursor-[url(/carousel-pause-icon.svg),auto]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Steps
              text=""
              className=""
              animationDuration="6000ms"
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
              isPlaying={isPlaying && !isPaused}
              index={0}
            />
            <Steps
              text=""
              className=""
              animationDuration="6000ms"
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
              description={
                "Our entire philosophy is based on celebrating wins and learning from losses. We want you to have access to our entire track record."
              }
              video="/how_vid1.mp4"
              api={api}
              selectedIndex={current}
              isPlaying={isPlaying && !isPaused}
              index={1}
            />
            <Steps
              text=""
              className=""
              animationDuration="6000ms"
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
              description={
                "Investing without understanding? That’s like driving without GPS in a new city. With KamayaKya, you’ll have all the information you need - market trends, company performance, and key details, to navigate your investment journey confidently."
              }
              video="/how_vid1.mp4"
              api={api}
              selectedIndex={current}
              isPlaying={isPlaying && !isPaused}
              index={2}
            />
          </div>
          {/* MOBILE VIEW */}
          <Carousel
            setApi={setApi2}
            className=" mt-6 lg:hidden w-full cursor-[url(/carousel-pause-icon.svg),auto]"
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnMouseEnter: true,
                stopOnInteraction:false,
                playOnInit:true
              }),
            ]}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            <CarouselContent>
              <CarouselItem className="">
                <Steps
                  text=""
                  className=""
                  animationDuration="6000ms"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path
                        d="M6.66602 10.2609H6.67435M9.99935 10.2609H10.0077M13.3327 10.2609H13.341M6.58268 16.9276C8.17316 17.7435 10.0028 17.9645 11.7418 17.5508C13.4808 17.137 15.0148 16.1158 16.0675 14.6711C17.1201 13.2264 17.6222 11.4532 17.4832 9.67108C17.3441 7.88895 16.5732 6.21509 15.3092 4.9511C14.0452 3.68712 12.3713 2.91615 10.5892 2.77712C8.80709 2.63809 7.03391 3.14015 5.5892 4.19282C4.14449 5.24548 3.12326 6.77954 2.70953 8.51854C2.29581 10.2575 2.5168 12.0871 3.33268 13.6776L1.66602 18.5943L6.58268 16.9276Z"
                        stroke="url(#paint0_linear_16075_24171)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_16075_24171"
                          x1="17.1327"
                          y1="16.9042"
                          x2="-0.0194646"
                          y2="0.192999"
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
                  isPlaying={isPlaying && !isPaused}
                  index={0}
                />
              </CarouselItem>
              <CarouselItem>
                <Steps
                  text=""
                  className=""
                  animationDuration="6000ms"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 2.5V17.5H17.5M15 14.1667V7.5M10.8333 14.1667V4.16667M6.66667 14.1667V11.6667"
                        stroke="url(#paint0_linear_18257_93015)"
                        stroke-width="1.42857"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_18257_93015"
                          x1="17.1466"
                          y1="15.8995"
                          x2="0.903889"
                          y2="0.074418"
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
                  description={
                    "Our entire philosophy is based on celebrating wins and learning from losses. We want you to have access to our entire track record."
                  }
                  video="/how_vid1.mp4"
                  api={api}
                  selectedIndex={current}
                  isPlaying={isPlaying && !isPaused}
                  index={1}
                />
              </CarouselItem>
              <CarouselItem>
                <Steps
                  text=""
                  className=""
                  animationDuration="6000ms"
                  icon={
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.9494 13.0721H14.166C13.724 13.0721 13.3001 13.2477 12.9875 13.5603C12.6749 13.8728 12.4993 14.2967 12.4993 14.7388V18.5221M5.83268 3.35544V4.73877C5.83268 5.40181 6.09607 6.0377 6.56492 6.50654C7.03376 6.97538 7.66964 7.23877 8.33268 7.23877C8.77471 7.23877 9.19863 7.41436 9.51119 7.72693C9.82375 8.03949 9.99935 8.46341 9.99935 8.90544C9.99935 9.8221 10.7493 10.5721 11.666 10.5721C12.108 10.5721 12.532 10.3965 12.8445 10.0839C13.1571 9.77139 13.3327 9.34746 13.3327 8.90544C13.3327 7.98877 14.0827 7.23877 14.9993 7.23877H17.641M9.16602 18.8638V15.5721C9.16602 15.1301 8.99042 14.7062 8.67786 14.3936C8.3653 14.081 7.94138 13.9054 7.49935 13.9054C7.05732 13.9054 6.6334 13.7298 6.32084 13.4173C6.00828 13.1047 5.83268 12.6808 5.83268 12.2388V11.4054C5.83268 10.9634 5.65709 10.5395 5.34453 10.2269C5.03197 9.91436 4.60804 9.73877 4.16602 9.73877H1.70768M18.3327 10.5721C18.3327 15.1745 14.6017 18.9054 9.99935 18.9054C5.39698 18.9054 1.66602 15.1745 1.66602 10.5721C1.66602 5.96973 5.39698 2.23877 9.99935 2.23877C14.6017 2.23877 18.3327 5.96973 18.3327 10.5721Z"
                        stroke="url(#paint0_linear_18257_93017)"
                        stroke-width="1.42857"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_18257_93017"
                          x1="17.94"
                          y1="17.1271"
                          x2="-0.107441"
                          y2="-0.456322"
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
                  description={
                    "Investing without understanding? That’s like driving without GPS in a new city. With KamayaKya, you’ll have all the information you need - market trends, company performance, and key details, to navigate your investment journey confidently."
                  }
                  video="/how_vid1.mp4"
                  api={api}
                  selectedIndex={current}
                  isPlaying={isPlaying && !isPaused}
                  index={2}
                />
              </CarouselItem>
            </CarouselContent>
            <div className=" flex gap-4 mt-[10px] justify-center items-center">
              {scrollSnaps.map((_: unknown, index: number) => (
                <CarouselIndicator
                  emblaApi={api2}
                  isPlaying={isPlaying && !isPaused}
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
        {/* DESKTOP VIEW RIGHT VIDEO CAROUSEL */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 6000,
              loop:true,
            }),
          ]}
          setApi={setApi}
          className=" flex-1 w-full h-full max-lg:hidden flex flex-col"
        >
          <CarouselContent className="h-[600px] flex-1">
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] h-full overflow-hidden max-w-[620px] w-full flex items-center justify-center">
                <video
                  className=" w-full h-full object-cover min-h-full"
                  width={620}
                  height="100%"
                  src="/how_vid1.mp4"
                  muted
                  autoPlay
                />
              </div>
            </CarouselItem>
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] overflow-hidden max-w-[620px] h-full w-full flex items-center justify-center">
                <video
                  className=" w-full h-full object-cover min-h-full"
                  width={620}
                  height="100%"
                  src="/how_vid1.mp4"
                  muted
                  autoPlay
                />
              </div>
            </CarouselItem>
            <CarouselItem className=" h-full">
              <div className=" rounded-[28px] overflow-hidden max-w-[620px] h-full w-full flex items-center justify-center">
                <video
                  className=" w-full h-full object-cover min-h-full"
                  width={620}
                  height="100%"
                  src="/how_vid1.mp4"
                  muted
                  autoPlay
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
