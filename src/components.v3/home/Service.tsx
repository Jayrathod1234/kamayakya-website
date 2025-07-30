import React, { useRef, useEffect, useState } from "react";
import { AnimatedList } from "@/components.v2/magicui/animated-list";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@mui/material";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import WhatsApp from "./icons/whatsapp";
import Gmail from "./icons/gmail";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import FUNNEL from "../../../public/landing/kmkfunnel.json";
import { Marquee } from "@/components.v2/magicui/marquee";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
interface INotification {
  name: string;
  description: string;
  icon: React.ReactNode;
  time: string;
}

interface IServiceCard {
  hero: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

let notifications = [
  {
    name: "New Stock  Alert!",
    description: "Buy xyz at ₹234",
    time: "5 min ago",
    icon: <Gmail />,
  },
  {
    name: "Target Met!",
    description: " Stock XYZ hit Target 1 (₹260) - up 30% 🚀",
    time: "5 min ago",
    icon: <WhatsApp />,
  },
  {
    name: "🔥 Hot Stock Update!",
    description: "2 new stocks added to the HOT list - explore now",
    time: "40 min ago",
    icon: <WhatsApp />,
  },
  {
    name: "Action Update: SELL Triggered",
    description: " Exited stock XYZ at ₹280 with 40% returns 🏁",
    time: "25 min ago",
    icon: <Gmail />,
  },
  {
    name: "New Report Released",
    description: " Deep-dive report on stock XYZ is live - check it out",
    time: "30 min ago",
    icon: <WhatsApp />,
  },
  {
    name: "🎥 New Video Insight",
    description: " Watch fresh insights on stock XYZ now",
    time: "35 min ago",
    icon: <Gmail />,
  },
  {
    name: "Target Price Revised",
    description: " Stock XYZ target raised to ₹300 - track the upside",
    time: "15 min ago",
    icon: <Gmail />,
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, time }: INotification) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] border border-[#07D575]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden open-sans">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm font-semibold">{name}</span>
            <span className="mx-[9px]  text-gray-500">·</span>
            <span className="text-2xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-2xs font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  );
};

const ServiceCard = ({ hero, title, description, className }: IServiceCard) => {
  return (
    <div
      className={cn(
        ` rounded-[20px] bg-[#083838] border border-[rgba(9,110,87,0.3)] p-2 pb-5 h-full flex flex-col overflow-hidden min-h-0`,
        className
      )}
    >
      {hero}
      <div className="  flex flex-col justify-center items-center">
        <div className=" p-4 xl:p-8">
          <p className=" text-white m-0 font-bold xl:text-lg text-md">{title}</p>
          <p className=" text-gray-300 mt-4 max-lg:text-md">{description}</p>
        </div>
      </div>
    </div>
  );
};

const companyLogos = [
  "acrysil-ltd--big 1.png",
  "amber-enterprises-india--big 1.png",
  "ccl-products-ind--big.png",
  "cl-educate-ltd--big.png",
  "dhanuka-agritech--big.png",
  "fidel-softech-ltd--big.png",
  "gravita-india--big 1.png",
  "gufic-biosciences--big.png",
  "gujarat-fluorochem-ltd--big.png",
  "h-g-infra-engineering--big.png",
  "ion-exchange-india-ltd--big 1.png",
  "jupiter-wagons-ltd--big 1.png",
  "mps-ltd--big.png",
  "praj-industries--big.png",
  "Privi Speciality.png",
  "srf--big.png",
  "tata--big.png",
  "va-tech-wabag--big 1.png",
  "vinati-organics--big.png",
  "virtuoso-optoelectronics-limit--big.png"
];

let SERVICE_DATA = [
  {
    title: "📈 Smart Stock Recommendations",
    description: "From Main Board to SMEs-curated stock picks with clear Buy/Hold/Sell alerts.",
    hero: (
      <div className="relative flex flex-row items-center justify-center gap-x-[65px] h-full max-h-[220px] overflow-hidden">
        <div className=" p-2 flex items-center border border-white/50 bg-white/25 rounded-full absolute backdrop-blur-md z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#75CDC5" />
            <circle cx="12.0002" cy="11.9997" r="7.8" fill="white" />
            <path
              d="M11.998 4.00037C7.59005 4.00037 3.99805 7.59237 3.99805 12.0004C3.99805 16.4084 7.59005 20.0004 11.998 20.0004C16.4061 20.0004 19.9981 16.4084 19.9981 12.0004C19.9981 7.59237 16.4061 4.00037 11.998 4.00037ZM15.8221 10.1604L11.286 14.6964C11.174 14.8084 11.022 14.8724 10.862 14.8724C10.702 14.8724 10.55 14.8084 10.438 14.6964L8.17405 12.4324C7.94205 12.2004 7.94205 11.8164 8.17405 11.5844C8.40605 11.3524 8.79005 11.3524 9.02205 11.5844L10.862 13.4244L14.9741 9.31237C15.2061 9.08037 15.5901 9.08037 15.8221 9.31237C16.0541 9.54437 16.0541 9.92037 15.8221 10.1604Z"
              fill="#108973"
            />
          </svg>
          <p className=" text-xs text-white font-medium ml-2">More than 5000 listed companies</p>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full place-items-center">
      {[false, true, false, true].map((reverse, colIndex) => {
        // Divide companyLogos into 4 equal parts
        const logosPerColumn = Math.ceil(companyLogos.length / 4);
        const startIndex = colIndex * logosPerColumn;
        const endIndex = Math.min(startIndex + logosPerColumn, companyLogos.length);
        const columnLogos = companyLogos.slice(startIndex, endIndex);
        
        return (
          <Marquee
            key={colIndex}
            className="flex-shrink-0 [--duration:12s]"
            vertical
            {...(reverse ? { reverse: true } : {})}
          >
            {columnLogos.map((filename, index) => (
              <img
                key={index}
                className="rounded-full"
                height={44}
                width={44}
                src={`/landing/SmartStock/${filename}`}
                alt={filename.replace(/[-_]/g, ' ').replace(/\..+$/, '')}
              />
            ))}
          </Marquee>
        );
      })}
    </div>
      </div>

      // <img
      //   height={228}
      //   width={374}
      //   className="  h-[220px] xl:max-h-[228px] xl:h-full w-full object-cover"
      //   src="/smartstockrecommendation.png"
      //   alt="smartstockrecommendation"
      // />
    ),
    className: " sm:row-span-2 ",
    serviceClassName: "py-0 p-0 overflow-hidden ",
  },
  {
    title: "🧺 Model Portfolios (Stock Baskets)",
    description:
      "Diversify effortlessly with pre-built model portfolios on smallcase and Starfolio by Trendlyne-invest smart, stay relaxed.",
    hero: (
      <video
        // height={233}
        // width={294.6371765136719}
        autoPlay
        loop
        muted
        className="max-w-[294.6371765136719px] h-[200px] lg:h-[120px] xl:max-h-[220px]  xl:h-full w-full object-contain"
        // src="/modalportfolio.png"
        // alt="model_portfolio"
      >
        <source src="/landing/kmkbasket.webm" type="video/webm" />{" "}
      </video>
    ),
    className: "sm:row-start-3 sm:col-span-2 ",
    serviceClassName: "flex flex-row items-center justify-center",
  },
  {
    title: "📋 Fundamental Research Reports & Videos",
    description: "Short + detailed analysis + video breakdowns - so you invest with confidence.",
    hero: (
      <div className="flex items-center justify-center">
        <Lottie
          className="  h-[220px] block object-contain"
          autoPlay
          loop={true}
          animationData={FUNNEL}
        />
      </div>
    ),
    className: " sm:row-span-2 sm:col-start-2",
    serviceClassName: "py-0 p-0",
  },
  {
    title: "🔔 Real-Time Notifications",
    description: "Get instant alerts (Email/WhatsApp) when it’s time to act-no second-guessing.",
    hero: (
      <div className="relative flex w-full flex-col overflow-hidden p-6 px-4 lg:p-8 pb-0 h-[80%]">
        <div className=" absolute z-20 -bottom-1 lg:bottom-0 left-0 w-full h-[150px] bg-[linear-gradient(0deg,#083838_10.37%,rgba(5,59,58,0.00)_100%)]"></div>
        <AnimatedList className="max-h-[220px]">
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
    ),
    className: "sm:row-span-full sm:col-start-3",
    serviceClassName: " xl:min-h-0",
  },
 
];

const DesktopServiceCardList = () => {
  return (
    <div className="hidden mt-10 lg:grid sm:grid-cols-3 sm:grid-rows-3 gap-[10px] min-h-0 max-h-[649px] ">
      {SERVICE_DATA.map((service) => (
        <div key={service.title} className={service.className}>
          <ServiceCard
            className={service.serviceClassName}
            title={service.title}
            description={service.description}
            hero={service.hero}
          />
        </div>
      ))}
    </div>
  );
};

interface MobileServiceCardListParams {
  scrollYProgress: MotionValue<number>;
  targetRef: React.MutableRefObject<null>;
}

const MobileServiceCardList = ({ scrollYProgress, targetRef }: MobileServiceCardListParams) => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(375);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate the total width of all cards plus gaps
  const cardWidth = 317;
  const gap = 16;
  const totalCards = SERVICE_DATA.length;
  const totalWidth = (cardWidth * totalCards) + (gap * (totalCards - 1));
  
  // Calculate scroll distance based on actual container width
  const scrollDistance = -(totalWidth - containerWidth + 32);
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `${scrollDistance}px`]
  );
  
  return (
    <div ref={containerRef} className="lg:hidden overflow-hidden px-4">
      <motion.div 
        style={{ x }} 
        className="flex gap-4 mt-10"
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        {SERVICE_DATA.map((data, index) => (
          <ServiceCard
            key={`${data.title}-${index}`}
            className="min-w-[317px] w-[317px] max-md:max-w-[317px] max-lg:h-[418px] flex-shrink-0"
            title={data.title}
            description={data.description}
            hero={data.hero}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default function Service() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-[#01272E]">
      {/* Mobile scroll container */}
      <div ref={targetRef} className="lg:hidden h-[300vh] relative" style={{ scrollBehavior: 'smooth' }}>
        {/* Sticky content container */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden sticky_container">
          <div className="w-full">
            {/* SERVICES START */}
            <div className="py-[50px] bg-[#01272E] open_sans">
              <div className="main-container">
                <p className="text-[#FF9E29] font-semibold sm:font-bold text-center max-sm:text-sm">SERVICES</p>
                <p className="text-display-xs sm:text-display-md font-bold text-center mt-3 text-white">
                  Smart <span className="open_sans_italic">Investment</span> Solutions
                </p>
                <MobileServiceCardList targetRef={targetRef} scrollYProgress={scrollYProgress} />
              </div>
            </div>
            {/* SERVICES END */}
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block">
        <div className="py-[50px] lg:p-20 bg-[#01272E] open_sans relative">
          <div className="main-container max-h-[800px]">
            <p className="text-[#FF9E29] font-semibold sm:font-bold text-center max-sm:text-sm">SERVICES</p>
            <p className="text-display-xs sm:text-display-md font-bold text-center mt-3 text-white">
              Smart <span className="open_sans_italic">Investment</span> Solutions
            </p>
            <DesktopServiceCardList />
          </div>
          <p className="open_sans open_sans_italic text-center text-white text-sm pt-10 text-[#BBD4D7CC]">
          <span className="font-bold">Note :</span> The stocks shown are for representation only. These are past recommendations and may no longer be part of our active investments. They are not current buy recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
