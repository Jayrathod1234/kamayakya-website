import { ButtonnArrow } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { useDotButton, usePrevNextButtons } from "@/components.v2/carousel";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import { useMediaQuery } from "@mui/material";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CarouselIndicator from "../common/CarouselIndicator";

const NEWS_CHANNELS = [
  {
    id: "news-1",
    img: "/money_control.png",
    review: "Budget 2025: Infrastructure focus may propel cement stocks like UltraTech, Ambuja, ACC",
    channelName: "Moneycontrol",
    link:'https://www.moneycontrol.com/budget/budget-2025-infrastructure-focus-may-propel-cement-stocks-like-ultratech-ambuja-acc-article-12914586.html'
  },
  {
    id: "news-2",
    img: "/economic_times.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Economic Times",
    link:'https://economictimes.indiatimes.com/markets/expert-view/ipl-portfolio-smallcase-manager-nitya-shah-expects-2-themes-to-perform-like-mayank-yadav/articleshow/109997836.cms?from=mdr'
  },
  {
    id: "news-3",
    img: "/money_control.png",
    review: "Budget 2025: Allocation for railways expected to touch a whopping Rs 3 lakh crore",
    channelName: "Moneycontrol",
    link:"https://www.moneycontrol.com/news/business/markets/budget-2025-allocation-for-railways-expected-to-touch-a-whopping-rs-3-lakh-crore-12912792.html"
  },
  {
    id: "news-4",
    img: "/et_now.png",
    review: "Most Promising Leaders of 2025: The Brains Behind the Next Gen Brands",
    channelName: "ET NOW",
    link:"https://www.etnownews.com/brand-stories/most-promising-leaders-of-2025-the-brains-behind-the-next-gen-brands-article-151566050"
  },
  {
    id: "news-5",
    img: "/sme_futures.png",
    review: "2024 industry trends: MSME sector to remain crucial growth catalyst",
    channelName: "SME Futures",
    link:"https://smefutures.com/2024-industry-trends-msme-sector-to-remain-crucial-growth-catalyst-3/"
  },
];

const NEWS_CHANNELS_MOBILE = [
  {
    id: "news-1",
    img: "/money_control.png",
    review: "Budget 2025: Infrastructure focus may propel cement stocks like UltraTech, Ambuja, ACC",
    channelName: "Moneycontrol",
    link:"https://www.moneycontrol.com/budget/budget-2025-infrastructure-focus-may-propel-cement-stocks-like-ultratech-ambuja-acc-article-12914586.html"
  },
  {
    id: "news-2",
    img: "/economic_times.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Economic Times",
    link:"https://economictimes.indiatimes.com/markets/expert-view/ipl-portfolio-smallcase-manager-nitya-shah-expects-2-themes-to-perform-like-mayank-yadav/articleshow/109997836.cms?from=mdr"
  },
  {
    id: "news-3",
    img: "/money_control.png",
    review: "Budget 2025: Allocation for railways expected to touch a whopping Rs 3 lakh crore",
    channelName: "Moneycontrol",
    link:"https://www.moneycontrol.com/news/business/markets/budget-2025-allocation-for-railways-expected-to-touch-a-whopping-rs-3-lakh-crore-12912792.html"
  },
  {
    id: "news-4",
    img: "/et_now.png",
    review: "Most Promising Leaders of 2025: The Brains Behind the Next Gen Brands",
    channelName: "ET NOW",
    link:"https://www.etnownews.com/brand-stories/most-promising-leaders-of-2025-the-brains-behind-the-next-gen-brands-article-151566050"
  },
  {
    id: "news-5",
    img: "/business_today.png",
    review: "2024 industry trends: MSME sector to remain crucial growth catalyst",
    channelName: "SME Futures",
    link:"https://smefutures.com/2024-industry-trends-msme-sector-to-remain-crucial-growth-catalyst-3/"
  },
  {
    id: "news-6",
    img: "/money_control.png",
    review: "Budget 2025: Infrastructure focus may propel cement stocks like UltraTech, Ambuja, ACC",
    channelName: "Moneycontrol",
    link:"https://www.moneycontrol.com/budget/budget-2025-infrastructure-focus-may-propel-cement-stocks-like-ultratech-ambuja-acc-article-12914586.html"
  },
  {
    id: "news-7",
    img: "/economic_times.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Economic Times",
    link:"https://economictimes.indiatimes.com/markets/expert-view/ipl-portfolio-smallcase-manager-nitya-shah-expects-2-themes-to-perform-like-mayank-yadav/articleshow/109997836.cms?from=mdr"
  },
  {
    id: "news-8",
    img: "/money_control.png",
    review: "Budget 2025: Allocation for railways expected to touch a whopping Rs 3 lakh crore",
    channelName: "Moneycontrol",
    link:"https://www.moneycontrol.com/news/business/markets/budget-2025-allocation-for-railways-expected-to-touch-a-whopping-rs-3-lakh-crore-12912792.html"
  },
  {
    id: "news-9",
    img: "/et_now.png",
    review: "Most Promising Leaders of 2025: The Brains Behind the Next Gen Brands",
    channelName: "ET NOW",
    link:"https://www.etnownews.com/brand-stories/most-promising-leaders-of-2025-the-brains-behind-the-next-gen-brands-article-151566050"
  },
  {
    id: "news-10",
    img: "/sme_futures.png",
    review: "2024 industry trends: MSME sector to remain crucial growth catalyst",
    channelName: "SME Futures",
    link:"https://smefutures.com/2024-industry-trends-msme-sector-to-remain-crucial-growth-catalyst-3/"
  },
];

interface INewsReview {
  link: string;
  channelName: string;
  review: string;
}

function NewsReview({ link, channelName, review }: INewsReview) {
  return (
    <>
      <p className=" text-[#FFFFFFE0] md:text-display-xs font-medium open_sans_italic text-center px-4">{review}</p>
      <p className=" max-md:text-xs text-[#FFFFFFAD] text-center mt-5">- {channelName}</p>
    </>
  );
}
const TWEEN_FACTOR_BASE = 0.4;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

const DesktopCarousel = ({
  setMainApi,
}: {
  setMainApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | null | undefined>>;
}) => {
  return (
    <Carousel
      setApi={setMainApi}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      className="my-7 md:my-12 max-lg:hidden"
    >
      <CarouselContent>
        {NEWS_CHANNELS.map((news) => (
          <CarouselItem onClick={()=>{window.open(news.link,'_blank')}} key={news.id} className="flex flex-col items-center justify-center cursor-pointer">
            <NewsReview link={news.link} channelName={news.channelName} review={news.review} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

interface MobileCarouselProps {
  setMainApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | null | undefined>>;
  setThumbApi: React.Dispatch<React.SetStateAction<EmblaCarouselType | null | undefined>>;
  thumbApi: EmblaCarouselType | null | undefined;
  current: number;
  setCurrent:React.Dispatch<React.SetStateAction<number>>;
  mainApi: EmblaCarouselType | null | undefined;
}

const MobileCarousel = ({ setMainApi, setThumbApi, thumbApi, current,setCurrent, mainApi }: MobileCarouselProps) => {
  const [isPlaying,setIsPlaying] = useState(false);
  const isMobile = useMediaQuery("(max-width:1024px)");
  const { scrollSnaps, onDotButtonClick } = useDotButton(thumbApi as EmblaCarouselType);
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(thumbApi as EmblaCarouselType);
  if (!isMobile) return;
  const handlePrevNext = (cb: () => void) => {
    cb();
    if (mainApi?.plugins()?.autoplay?.reset) {
      mainApi.plugins().autoplay.reset();
    }
  };
  return (
    <div className=" lg:hidden w-full flex flex-col justify-center items-center">
      {" "}
      {/* Main Carousel */}
      <Carousel
        setApi={setMainApi}
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        className="my-7 md:my-12 w-full"
      >
        <CarouselContent className=" px-4">
          {NEWS_CHANNELS_MOBILE.map((news) => (
            <CarouselItem onClick={()=>{window.open(news.link,'_blank')}} key={news.id} className="flex flex-col items-center justify-center w-full cursor-pointer">
              <NewsReview link={news.link} channelName={news.channelName} review={news.review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Thumbnail Carousel */}
      <Carousel
        plugins={[ClassNames()]}
        setApi={setThumbApi}
        opts={{ loop: true }}
        className="my-7 md:my-12 relative w-full"
      >
        <CarouselContent className="w-[30%] mx-auto">
          {NEWS_CHANNELS_MOBILE.map((news) => (
            <CarouselItem onClick={()=>{window.open(news.link,'_blank')}} key={news.id} className="flex flex-col items-center justify-center news__carousel">
              <div className=" rounded-[18.4px] overflow-hidden block lg:hidden embla__slide__number">
                <img
                  height={107}
                  width={107}
                  src={news.img}
                  alt="channel-image"
                  className="object-cover rounded-[18.4px]"
                />
              </div>
              <p className="font-bold text-white text-sm text-center block lg:hidden channel_name mt-[10px]">
                {news.channelName}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="h-full left-4 md:left-0  md:w-1/3 max-w-[261px] absolute  z-20 flex flex-col justify-center items-center top-0">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onPrevButtonClick)}
              variant={ButtonVariant.custom}
              className=" rounded-full md:h-[52px] md:w-[52px] h-6 w-6 min-w-0 md:!p-2 !px-4 !py-4 rotate-180 hover:bg-[#0b3a36]"
            ></ButtonnArrow>
          </div>
        </div>
        <div className="top-0 right-4 md:right-0 h-full max-w-[261px] md:w-1/3  absolute  z-20 flex flex-col justify-center items-center">
          <div>
            <ButtonnArrow
              onClick={() => handlePrevNext(onNextButtonClick)}
              variant={ButtonVariant.custom}
              className=" rounded-full h-6 w-6 md:h-[52px] md:w-[52px] min-w-0 md:!p-2 !px-4 !py-4 hover:bg-[#0b3a36]"
            ></ButtonnArrow>
          </div>
        </div>
      </Carousel>
      {/* <div className=" flex gap-4 mt-[10px] justify-center items-center">
        {scrollSnaps.map((_: unknown, index: number) => (
          <CarouselIndicator
            emblaApi={thumbApi as EmblaCarouselType}
            isPlaying={isPlaying}
            onClick={() => {
              setCurrent(index);
              onDotButtonClick(index);
            }}
            index={index}
            selectedIndex={current}
          />
        ))}
      </div> */}
    </div>
  );
};

export default function FeaturedNews() {
  const [mainApi, setMainApi] = useState<CarouselApi | null>(null);
  const [thumbApi, setThumbApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((api: any): void => {
    tweenNodes.current = api.slideNodes().map((slideNode: any) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((api: any) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback((api: CarouselApi, eventName?: any) => {
    if (!api) return;
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesInView = api.slidesInView();
    const isScrollEvent = eventName === "scroll";

    api.scrollSnapList().forEach((scrollSnap, snapIndex: number) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex: number) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, 0, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];
        if (!tweenNode) return;

        tweenNode.style.transform = `scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!mainApi || !thumbApi) return;

    const syncThumbToMain = () => {
      const selectedIndex = mainApi.selectedScrollSnap();
      thumbApi.scrollTo(selectedIndex);
    };

    const syncMainToThumb = () => {
      const selectedIndex = thumbApi.selectedScrollSnap();
      mainApi.scrollTo(selectedIndex);
    };

    mainApi.on("select", syncThumbToMain);
    thumbApi.on("select", syncMainToThumb);

    return () => {
      mainApi?.off("select", syncThumbToMain);
      thumbApi?.off("select", syncMainToThumb);
    };
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!thumbApi) return;

    setTweenNodes(thumbApi);
    setTweenFactor(thumbApi);
    tweenScale(thumbApi);

    thumbApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [thumbApi, tweenScale]);

  useEffect(() => {
    if (!mainApi) return;

    setCurrent(mainApi.selectedScrollSnap() + 1);

    mainApi.on("select", () => {
      setCurrent(mainApi.selectedScrollSnap() + 1);
    });
    //  return () => {
    //   mainApi?.off("select");

    // };
  }, [mainApi]);
  console.log("INDEX", current);
  return (
    <div className="bg-gray-100 ">
      <div className="main-container md:py-[50px] ">
        <div className=" max-md:px-3 py-7 md:py-[100px] flex flex-col items-center justify-center bg-[#01272E] lg:bg-[url('/landing/featured_news_grid.png')] bg-cover rounded-[28px] open_sans">
          <p className=" max-md:text-sm text-[#F98800] font-bold">FEATURED</p>
          <h2 className=" max-md:text-display-xs text-display-md font-bold text-gray-25">Featured in the <span className=" open_sans_italic">News</span></h2>
          <DesktopCarousel setMainApi={setMainApi} />
          <MobileCarousel setMainApi={setMainApi} setThumbApi={setThumbApi} thumbApi={thumbApi} current={current} setCurrent={setCurrent} mainApi={mainApi} />
          <div className="hidden lg:flex items-center justify-center bg-brand-700 p-3 pb-4 md:p-[26.37px] md:pb-[27.78px] rounded-[28px]">
            {NEWS_CHANNELS.map((news, idx) => (
              <div
                onClick={() => {
                  window.open(news.link,'_blank')
                  mainApi?.scrollTo(idx);
                  const autoplay = mainApi?.plugins()?.autoplay;
                  if (!autoplay) return;
                  const reset = autoplay.reset;
                  reset();
                }}
                className=" relative flex flex-col items-center cursor-pointer"
                key={news.id}
              >
                <div
                  className={` p-3 ${
                    idx + 1 === current ? "border border-brand-300 bg-[#FFFFFF1A]" : ""
                  }  rounded-[30px] overflow-hidden `}
                >
                  <img
                    height={107}
                    width={107}
                    src={news.img}
                    alt="channel-image"
                    className=" object-cover rounded-[30px]"
                  />
                </div>
                <p className={`${idx + 1 === current ? "font-bold text-white" : "text-[#FFFFFFB2]"}  text-sm `}>
                  {news.channelName}
                </p>
                {idx + 1 === current ? (
                  <div className=" h-2 w-2 bg-white rounded-full absolute -bottom-3 md:-bottom-4 "></div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
