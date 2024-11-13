import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components.v2/ui/carousel'
import CarouselIndicator from '@/components.v3/common/CarouselIndicator';
import Autoplay from 'embla-carousel-autoplay'
import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from "embla-carousel";



export const useDotButton = (emblaApi: CarouselApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<Number[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const reset = autoplay.reset;
      reset();
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 768); // Adjust based on your breakpoint
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [emblaApi, onInit, onSelect, handleResize]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
    isSmallScreen,
  };
};


const Quotes = () => {
  return (
    <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.2148 0.179688L32.8594 1.125C32.3438 3.21615 31.6706 5.45052 30.8398 7.82812C30.0378 10.2057 29.1641 12.5833 28.2188 14.9609C27.2734 17.3385 26.3138 19.5872 25.3398 21.707H17.9492C18.5221 19.444 19.0951 17.0378 19.668 14.4883C20.2409 11.9388 20.7708 9.41797 21.2578 6.92578C21.7448 4.43359 22.1315 2.1849 22.418 0.179688H32.2148ZM14.2969 0.179688L14.8984 1.125C14.3828 3.21615 13.7096 5.45052 12.8789 7.82812C12.0768 10.2057 11.2031 12.5833 10.2578 14.9609C9.3125 17.3385 8.35286 19.5872 7.37891 21.707H0.117188C0.518229 20.0169 0.933594 18.2409 1.36328 16.3789C1.79297 14.4883 2.19401 12.5977 2.56641 10.707C2.96745 8.78776 3.32552 6.9401 3.64062 5.16406C3.98438 3.35938 4.25651 1.69792 4.45703 0.179688H14.2969Z"
        fill="white"
      />
    </svg>
  );
};

const TestimonialCard = ({ testimony, author, company, imgSrc }: Record<string, string>) => {
  return (
    <div className=" relative py-5 px-7 flex flex-col justify-center">
      <div className=" z-10 absolute top-[0%] right-[0] ">
        <Quotes />
      </div>
      <p className=" text-sm text-[#475467] text-center">{testimony}</p>
      <div className=" mt-8 flex flex-col items-center">
        <div className=" h-[80px] w-[80px] rounded-full bg-[#E6E4FF] overflow-hidden">
          <img className=" object-contain" height={80} width={80} src={imgSrc} alt="avatar" />
        </div>
        <div>
          <p className=" text-center text-[#170F49] font-semibold">{author}</p>
          <p className=" text-center text-[#667085]">{company}</p>
        </div>
      </div>
    </div>
  );
};


export default function TestimonialSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const { selectedIndex, scrollSnaps, onDotButtonClick, isSmallScreen } = useDotButton(api);
  const [isPlaying, setIsPlaying] = useState(true);

  function togglePlayingState(emblaApi: EmblaCarouselType, eventName: string) {
    setIsPlaying(eventName === "autoplay:play" ? true : false);
  }

  useEffect(() => {
    if (!api) return;

    api.on("autoplay:play", togglePlayingState).on("autoplay:stop", togglePlayingState);
  }, [api]);

  return (
    <div className=" mt-11">
    <Carousel
      className=" cursor-[url(/carousel-pause-icon.svg),auto]"
      plugins={[
        Autoplay({ playOnInit: true, delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
      ]}
      setApi={setApi}
    >
      <CarouselContent>
        <CarouselItem>
          <TestimonialCard
            testimony={
              "I have been investing with KamayaKya since over a year now and I only have good things to say. Very good returns, transparency and a team of market experts with amazing investment strategies. I plan to invest with the firm for a long time and I would highly recommend it too."
            }
            author={"Tanish Mittal"}
            company="Hindustan Pressings Pvt. Ltd."
            imgSrc="/tanish_mittal.png"
          />
        </CarouselItem>
        <CarouselItem>
          <TestimonialCard
            imgSrc="/kiran_sanghvi.png"
            company="Indus Properties"
            author="Kiran Sanghvi"
            testimony="My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched in the industry. Some of their small cap picks are truly gems that have created  huge wealth for their investors. I would highly recommend investors to take their services to achieve their long term financial goals."
          />
        </CarouselItem>
        <CarouselItem>
          <TestimonialCard
            testimony={
              "I have been thoroughly impressed with Kamayakya's stock recommendations. Their picks have been spot on, and the inclusion of a specified time period for each recommendation provides a clear understanding of when to exit. This level of detail is invaluable for any investor! Additionally, I apply my own technical analysis to their selected stocks, which adds an extra layer of confidence to my investments. I highly recommend Kamayakya's subscription to any medium to long-term investor."
            }
            author={"Atharva Agashe"}
            company="Associated Director - Product Development, FIS."
            imgSrc="/atharva-agashe.jpeg"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <div className=" flex justify-center items-center gap-x-4 p-[6px] bg-white rounded-full w-fit mx-auto">
      {scrollSnaps.map((_, index) => (
        <CarouselIndicator
          emblaApi={api}
          isPlaying={isPlaying}
          onClick={() => onDotButtonClick(index)}
          index={index}
          selectedIndex={selectedIndex}
        />
      ))}
    </div>
  </div>
  )
}
