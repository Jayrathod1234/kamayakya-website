import { useDotButton } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState, useRef } from "react";
import { EmblaCarouselType } from "embla-carousel";

interface ITrustIndicator {
  text: string;
  active?: boolean;
  className?: string;
  api?: any;
  index: number;
  selectedIndex: number;
  animationDuration?: string;
  isPlaying?: boolean;
}

function GradientLine() {
  return (
    <div className=" min-h-0 max-h-full sm:h-[58px] w-1 sm:!w-[4px] flex-shrink-0 flex-grow-0  bg-[linear-gradient(to_top,#2CF034,#38F762,#45FF9B,#4DFBE6,#B0FFDE)]"></div>
  );
}

function TrustIndicator({
  text,
  className,
  api,
  index,
  selectedIndex,
  animationDuration,
  isPlaying,
}: ITrustIndicator) {
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
  }, [api,animationDuration]);

  useEffect(() => {
    if (currentAnimationTime > 5890 && api) {
      api.scrollNext();
      const autoplay = api?.plugins()?.autoplay;
      if (!autoplay) return;
    
      const reset = autoplay.reset;
      reset();
    }
  }, [currentAnimationTime, api]);





  // useEffect(() => {
  //   if (currentAnimationTime > 5890) {
  //     api?.scrollNext();
  //     const autoplay = api?.plugins()?.autoplay;
  //     if (!autoplay) return;
  //     const reset = autoplay.reset;
  //     reset();
  //   }
  // }, [currentAnimationTime]);

  // useEffect(() => {
  //   if (currentAnimationTime > 5890 && index === selectedIndex) {
  //     api?.scrollNext();
  //     const autoplay = api?.plugins()?.autoplay;
  //     if (!autoplay) return;
  //     autoplay.reset();
  //   }
  // }, [currentAnimationTime, index, selectedIndex, api]);

  return (
    <div
      onClick={onClick}
      className={cn(
        ` px-4 h-[62px] sm:h-[78px] flex flex-col text-center items-center justify-center w-full relative overflow-hidden ${
          index+1 === 1 ? "rounded-l-[20px] " : index+1 === 3 ? "rounded-r-[20px]" : ""
        } ${index+1 === selectedIndex ? "bg-brand-400" : ""}`,
        className
      )}
    >
      <p className={`${index+1 === selectedIndex ? "text-white" : "text-gray-950"}  font-bold text-3xs sm:text-xl`}>
        {text}
      </p>
      <div
        // onClick={onClick}
        key={index}
        className={` ${
          index+1 === selectedIndex ? " !w-full " : index+1 <= selectedIndex ? "w-full" : " w-[10px] "
        } h-[4px] absolute left-0 bottom-0  bg-transparent transition-all duration-300 overflow-hidden cursor-pointer `}
      >
        <div
          ref={progressRef}
          style={{ animationDuration: "6000ms", animationPlayState: isPlaying ? "running" : "paused" }}
          className={`bg-brand-300 w-full h-full relative ${
            index+1 === selectedIndex
              ? "carousel-dot-animate"
              : index+1 <= selectedIndex
              ? "block scale-x-100 "
              : " hidden"
          }`}
        ></div>
      </div>
    </div>
  );
}

function Bullet() {
  return <img src="/trust_bullet.png" alt="" />;
}

function Ele1() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-7">
      <div className=" flex-1 max-lg:flex justify-center items-center">
        <video className=" w-[663px] h-full rounded-[28px]" muted autoPlay src="/trust_vid1.mp4"></video>
      </div>
      <div className="py-5 flex-1 flex flex-col gap-y-[10px] sm:gap-y-10">
        <div className=" flex gap-x-5">
          <div className=" min-h-0 max-h-full sm:h-[58px] w-1 sm:!w-[4px] flex-shrink-0 flex-grow-0 bg-[linear-gradient(to_top,#2CF034,#38F762,#45FF9B,#4DFBE6,#B0FFDE)]"></div>
          <p className=" max-md:text-sm text-gray-950">
            This means we're held to the highest standards of compliance and transparency, so you can rest assured your
            stock research reports are in safe hands. Unlike your well-meaning but misguided uncle with his 'hot stock
            tips', we rely on rigorous research and proven strategies to guide your financial journey.
          </p>
        </div>
        <div className=" flex gap-x-5 sm:items-center">
          <div className=" min-h-0 max-h-full sm:h-[58px] w-1 sm:!w-[4px] flex-shrink-0 flex-grow-0  bg-[linear-gradient(to_top,#2CF034,#38F762,#45FF9B,#4DFBE6,#B0FFDE)]"></div>
          <p className=" m-0 text-gray-950 sm:text-lg font-bold">SEBI Registered: INH000009843 </p>
        </div>
        <div>
          <li className=" flex gap-x-[10px] items-center">
            <Bullet />
            <p className=" max-lg:text-sm text-gray-600">We follow compliances</p>
          </li>
          <li className=" flex gap-x-[10px] items-center">
            <Bullet />
            <p className=" max-md:text-sm text-gray-600">
              We are not like your rishtedar who keeps giving random financial advice
            </p>
          </li>
        </div>
      </div>
    </div>
  );
}

function Ele2() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-7">
      <div className=" flex-1 max-lg:flex justify-center items-center">
        <video className=" w-[663px] h-full rounded-[28px]" muted autoPlay src="/trust_vid2.mp4"></video>
      </div>
      <div className="py-5 flex-1 flex flex-col gap-y-10">
        <div className=" flex gap-x-5">
          <GradientLine />
          <p className=" max-md:text-sm text-gray-950">
            Our analysts don't just crunch numbers – they analyse the company's financials, interview management, and
            even go on-site to witness operations firsthand.
          </p>
        </div>
        <div className=" flex gap-x-5 items-center">
          <GradientLine />
          <p className="max-md:text-sm text-gray-950">
            This 360-degree approach allows us to identify potential multibaggers with greater accuracy and provide you
            with insights you won't find anywhere else
          </p>
        </div>
      </div>
    </div>
  );
}

function Ele3() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-7">
      <div className=" flex-1 max-lg:flex justify-center items-center">
        <video className=" w-[663px] h-full rounded-[28px]" muted autoPlay src="/landing/kmk-starsTeam.mp4"></video>
      </div>
      <div className="py-5 flex-1 flex flex-col gap-y-10">
        <div className=" flex gap-x-5">
          <GradientLine />
          <p className="max-md:text-sm text-gray-950">
            With over 60 years of combined experience in finance, our team has seen it all. From market booms to
            economic downturns, we know how to navigate/ride the market cycles.
          </p>
        </div>
        <div className=" flex gap-x-5 items-center">
          <GradientLine />
          <p className="max-md:text-sm text-gray-950">
            We've walked the walk, building and managing businesses ourselves. This gives us a unique perspective on
            what makes a company truly investable.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TrustUs() {
  const [api, setApi] = useState<CarouselApi>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = useState(false);



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
    api.on("autoplay:play", ()=>setIsPlaying(true))
    api.on("autoplay:stop", ()=>setIsPlaying(false))
    // api.on("autoplay:play", () => setIsPlaying(true));
    // api.on("autoplay:stop", () => setIsPlaying(false));
  }, [api]);

  return (
    <div className=" main-container py-[50px] sm:pb-[100px]">
      <div className=" open_sans">
        <p className=" font-bold text-[#FF9E29] text-center max-sm:text-sm">Why trust us?</p>
        <h2 className=" text-display-xs sm:text-display-md  font-bold mb-2 text-center text-gray-950">
          Why should you <span className=" open_sans_italic">trust us</span> with your money?
        </h2>
        <p className=" text-sm sm:text-lg text-gray-600 sm:mb-10 text-center">
          Trust is an investment, earned with honesty, paid in consistency, and yielding dividends of reliability.
        </p>
        <div  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className=" mt-6 lg:mt-10 flex flex-col">
          <Carousel
            className=" order-2 lg:order-1 cursor-[url(/carousel-pause-icon.svg),auto]"
            plugins={[
              
              Autoplay({
                delay: 6000,
                // stopOnMouseEnter: true,
                // stopOnInteraction: false,
                // playOnInit:true,
                // loop:true,
              }),
              
            ]}
            setApi={setApi}
          >
            <CarouselContent>
              <CarouselItem>
                <Ele1 />
              </CarouselItem>
              <CarouselItem>
                <Ele2 />
              </CarouselItem>
              <CarouselItem>
                <Ele3 />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className=" order-1 lg:order-2 flex items-center justify-evenly max-lg:mb-5 sm:mt-4 rounded-[20px] border">
            <TrustIndicator
              isPlaying={isPlaying && !isPaused}
              
              index={0}
              selectedIndex={current}
              api={api}
              text="We are SEBI Registered ❤️"
            />
            <TrustIndicator
              isPlaying={isPlaying && !isPaused}
            
              index={1}
              selectedIndex={current}
              api={api}
              className=" border-l border-r "
              text="We Research. A Lot."
            />
            <TrustIndicator
              isPlaying={isPlaying && !isPaused}
          
              index={2}
              selectedIndex={current}
              api={api}
              text="Our team is packed with ⭐️s"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
