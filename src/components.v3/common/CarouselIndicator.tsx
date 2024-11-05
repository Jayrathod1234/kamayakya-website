import React, { useEffect, useRef, useState } from "react";

type TCarouselIndicator = {
  onClick: () => void;
  index: number;
  selectedIndex: number;
  animationDuration?: string;
  isPlaying?: boolean;
};

export default function CarouselIndicator({
  emblaApi,
  onClick,
  index,
  selectedIndex,
  animationDuration,
  isPlaying,
}: TCarouselIndicator) {
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

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(calculateAnimationProgress, 100);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, animationDuration]);

  useEffect(() => {
    if (currentAnimationTime > 5890) {
      emblaApi?.scrollNext();
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const reset = autoplay.reset;
      reset();
    }
  }, [currentAnimationTime]);
  // console.log(currentAnimationTime)

  return (
    <div
      onClick={onClick}
      key={index}
      className={` ${
        index === selectedIndex ? " !w-6 " : " w-[10px] "
      } h-[10px]  bg-gray-200 rounded-full transition-all duration-300 overflow-hidden cursor-pointer relative`}
    >
      <div
        ref={progressRef}
        style={{ animationDuration: "6000ms", animationPlayState: isPlaying ? "running" : "paused" }}
        className={`bg-brand-300 w-full h-full relative ${
          index === selectedIndex ? "carousel-dot-animate" : " hidden"
        }`}
      >
       
      </div>
      {/* <img
          className=" absolute right-0 top-0"
          height={100}
          width={100}
          src="/icons/pause-icon.svg"
          alt="pause-icon"
        /> */}
    </div>
  );
}
