import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect } from "react";

const NEWS_CHANNELS = [
  {
    img: "/economic_times.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Economic Times",
  },
  {
    img: "/business_today.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Business Today",
  },
  {
    img: "/deal_street_asia.png",
    review: "IPL Portfolio: Smallcase manager Nitya Shah expects 2 themes to perform like Mayank Yadav",
    channelName: "Deal Street Asia",
  },
];

interface INewsReview {
  channelName: string;
  review: string;
}

function NewsReview({ channelName, review }: INewsReview) {
  return (
    <>
      <p className=" text-[#FFFFFFE0] md:text-display-xs font-medium italic text-center px-4">{review}</p>
      <p className=" max-md:text-xs text-[#FFFFFFAD] text-center">- {channelName}</p>
    </>
  );
}

export default function FeaturedNews() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-gray-100 ">
      <div className="main-container md:py-[50px] ">
      <div className=" max-md:px-3 py-7 md:py-[100px] flex flex-col items-center justify-center bg-[#01272E] rounded-[28px] open_sans">
        <p className=" max-md:text-sm text-[#F98800] font-bold">FEATURED</p>
        <h2 className=" max-md:text-display-xs text-display-md font-bold text-gray-25">Featured in the News</h2>
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className=" my-7 md:my-12"
        >
          <CarouselContent>
            {NEWS_CHANNELS.map((news) => (
              <CarouselItem key={news.channelName}>
                <NewsReview channelName={news.channelName} review={news.review} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center bg-brand-700 p-3 pb-4 md:p-[26.37px] md:pb-[27.78px] rounded-[28px]">
          {NEWS_CHANNELS.map((news,idx)=><div className=" relative flex flex-col items-center" key={news.channelName}>
            <div className={` p-3 ${idx+1 === current ?"border border-brand-300 bg-[#FFFFFF1A]":"" }  rounded-[30px] `}>
            <img height={107} width={107} src={news.img} alt="channel-image" />
            </div>
            <p className={`${idx+1 === current ? "font-bold text-white" : "text-[#FFFFFFB2]"}  text-sm `}>{news.channelName}</p>
            {idx+1 === current ?  <div className=" h-2 w-2 bg-white rounded-full absolute -bottom-3 md:-bottom-4 "></div>:null}
           
          </div>)}
        </div>
      </div>
    </div>
    </div>
    
  );
}
