import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { CarouselContent, CarouselItem, Carousel, CarouselApi } from "@/components.v2/ui/carousel";
import CarouselIndicator from "@/components.v3/common/CarouselIndicator";
import Autoplay from "embla-carousel-autoplay";
import CouponModal from "./components/CouponModal";
import ReviewSection from "./components/ReviewSection";

import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components.v2/ui/tabs";
import DetailSection from "./components/DetailSection";
import { PaymentContextProvider } from "@/contexts/PaymentContext";
import { usePathname } from "next/navigation";

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

const TestimonialCard = () => {
  return (
    <div className=" relative py-5 px-7 flex flex-col justify-center">
      <div className=" z-10 absolute top-[0%] right-[0] ">
        <Quotes />
      </div>
      <p className=" text-sm text-[#475467] text-center">
        My experience with Kamayakya in both their smallcase and VIP+ website subscription has been great so far. Their
        in depth analysis of stocks, understanding the market scenario and balancing the risk reward ratio are unmatched
        in the industry. Some of their small cap picks are truly gems that have created huge wealth for their investors.
        I would highly recommend investors to take their services to achieve their long term financial goals.
      </p>
      <div className=" mt-8 flex flex-col items-center">
        <div className=" h-[80px] w-[80px] rounded-full bg-[#E6E4FF] overflow-hidden">
          <img className=" object-contain" height={80} width={80} src="/assets/avatar.png" alt="avatar" />
        </div>
        <div>
          <p className=" text-center text-[#170F49] font-semibold">Kiran Sanghvi</p>
          <p className=" text-center text-[#667085]">Indus Properties</p>
        </div>
      </div>
    </div>
  );
};

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

export default function Index() {
  const ref = useRef<HTMLDivElement[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState("review");
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const { selectedIndex, scrollSnaps, onDotButtonClick, isSmallScreen } = useDotButton(api);
  const pathname = usePathname();

  useEffect(() => {
    const firstdiv = ref.current[0];
    const lastdiv = ref.current[ref.current.length - 1];
    if (!firstdiv && !lastdiv) return;
    setMargins({
      marginLeft: firstdiv.offsetWidth,
      marginRight: lastdiv.offsetWidth,
    });
  }, [ref.current?.length]);

  const headerBg = !pathname.includes("successful") ? "  max-md:bg-[linear-gradient(to_bottom,#F1FBFB,#F1FBFB)]" : "";

  return (
    <PaymentContextProvider>
      <div className=" bg-white open_sans">
        <Header className={headerBg} />
        <div className=" -mt-[13.5rem] flex flex-col gap-y-4 md:flex-row main-container relative z-20 ">
          <div className=" px-4 py-10 md:p-10 bg-white max-md:rounded-3xl md:rounded-tl-3xl md:rounded-bl-3xl border border-[#E3F1F1] border-r-[#D1F9EF99] flex flex-col  w-full">
            {/* stepper component */}
            <Tabs
              onValueChange={(value) => setActiveTab(value)}
              defaultValue={activeTab}
              value={activeTab}
              className=" relative"
            >
              <div
                style={{
                  width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                  marginLeft: margins.marginLeft,
                  marginRight: margins.marginRight,
                }}
                className=" h-[2px] bg-[linear-gradient(to_right,#D0D5DD_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x absolute top-[6px]"
              >
                <div
                  style={{
                    width: `calc(100%*(1/${activeTab === "details" ? 2 : activeTab === "payment" ? 1 : 100}))`,
                  }}
                  className=" h-[2px] bg-brand-500 bg-[length:10px_1px]"
                ></div>
              </div>

              <TabsList className=" flex justify-between bg-transparent relative z-10">
                <TabsTrigger
                  className=" bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  value="review"
                >
                  <div
                    ref={(el) => {
                      ref.current[0] = el as HTMLDivElement;
                    }}
                    className="flex flex-col items-center "
                  >
                    <div
                      className={` flex items-center justify-center border p-1 rounded-full ${
                        activeTab === "review" ? "border-brand-300" : "border-transparent"
                      }`}
                    >
                      <div
                        className={`${
                          activeTab === "review" ? "bg-[#108973]" : "bg-[#108973]"
                        } h-8 w-8 rounded-full  flex items-center justify-center border border-gray-200`}
                      >
                        <img src="/assets/Review.svg" alt="" />
                      </div>
                    </div>
                    <p className=" text-2xs mt-[10px]">Review</p>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  value="details"
                >
                  <div
                    ref={(el) => {
                      ref.current[1] = el as HTMLDivElement;
                    }}
                    className="flex flex-col items-center "
                  >
                    <div
                      className={` flex items-center justify-center border p-1 rounded-full ${
                        activeTab === "details" ? "border-brand-300" : "border-transparent"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 ${
                          activeTab === "details" || activeTab === "payment" ? "bg-[#108973]" : "bg-white"
                        }`}
                      >
                        {activeTab === "details" || activeTab === "payment" ? (
                          <img src="/assets/detail-white.svg" alt="" />
                        ) : (
                          <img src="/assets/detail.svg" alt="" />
                        )}
                      </div>
                    </div>
                    <p className=" text-2xs mt-[10px]">Details</p>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <div
                    ref={(el) => {
                      ref.current[2] = el as HTMLDivElement;
                    }}
                    className="flex flex-col items-center "
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center border border-gray-200  ${
                        activeTab === "payment" ? "bg-[#108973]" : "bg-white"
                      }`}
                    >
                      <img src="/assets/payment.svg" alt="" />
                    </div>
                    <p className=" text-2xs mt-[10px]">Payment</p>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="review">
                <ReviewSection setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent className=" w-full" value="details">
                <DetailSection setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="payment">Change your payments here.</TabsContent>
            </Tabs>
            <div className=" flex justify-between relative">
              {/* <div className=" absolute h-[1px] top-[18px]  w-full bg-[linear-gradient(to_right,#447070_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x"></div> */}
            </div>
            {/* stepper component end */}

            <div className=" flex justify-center items-center mt-3">
              <img height={24} width={24} src="/assets/help.svg" alt="help" />
              <p className=" ml-1 pt-2 text-2xs text-gray-500">
                Got any doubts? Contact us on WhatsApp number XXXX or call us at XXXX
              </p>
            </div>
          </div>
          <div className=" py-10 px-11 min-w-0 bg-[#D1F9EF99] w-full max-md:rounded-3xl rounded-tr-3xl rounded-br-3xl border border-[#E3F1F1] border-l-0">
            <div className=" p-20 rounded-tr-[100px] rounded-bl-[100px] bg-[#1D4040]">
              <div className=" p-5 pt-0 flex flex-col items-center justify-center w-full ">
                <div className="flex items-center  ">
                  <div className=" h-9 w-9 rounded-full ">
                    <img height={36} width={36} src="/stock_img1.svg" alt="" />
                  </div>
                  <div className=" h-9 w-9 rounded-full -ml-2 ">
                    <img height={36} width={36} src="/stock_img2.svg" alt="" />
                  </div>
                  <div className=" h-9 w-9 rounded-full  -ml-2">
                    <img height={36} width={36} src="/stock_img3.svg" alt="" />
                  </div>
                  <div className=" h-9 w-9 rounded-full  -ml-2">
                    <img height={36} width={36} src="/stock_img4.svg" alt="" />
                  </div>
                </div>
                <p className=" text-sm mt-4 text-white">25 Stocks Exited</p>
              </div>
              <div className=" mt-4 flex justify-center ">
                <div className="flex flex-col items-center p-3 text-white">
                  <p className=" text-xl font-semibold">118%</p>
                  <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Average Exit Returns</p>
                </div>
                <div className="flex flex-col items-center p-3 text-white">
                  <p className=" text-xl font-semibold">22</p>
                  <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Exited in profile</p>
                </div>
                <div className="flex flex-col items-center p-3 text-white">
                  <p className=" text-xl font-semibold">3</p>
                  <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Exited in Loss</p>
                </div>
              </div>
              <div className=" h-[1px] w-full my-5 bg-[linear-gradient(to_right,#447070_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x "></div>
              <div className="flex flex-wrap items-center gap-4 ">
                <Button className=" flex-1 p-3" variant={ButtonVariant.primary}>
                  <p className=" text-2xs">Stocks Live</p>
                  <p className=" text-2xs font-bold mr-[10px]">30</p>
                </Button>
                <Button className=" flex-1 p-3 " variant={ButtonVariant.primary}>
                  <p className=" text-2xs">Average Live Returns</p>
                  <p className=" text-2xs font-bold mr-[10px]">118%</p>
                </Button>
              </div>
            </div>
            {/* Review Section */}
            <div className=" mt-11">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 6000,
                  }),
                ]}
                setApi={setApi}
              >
                <CarouselContent>
                  <CarouselItem>
                    <TestimonialCard />
                  </CarouselItem>
                  <CarouselItem>
                    <TestimonialCard />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <div className=" flex justify-center items-center gap-x-4 p-[6px] bg-white rounded-full w-fit mx-auto">
                {[1, 2].map((_, index) => (
                  <CarouselIndicator
                    onClick={() => onDotButtonClick(index)}
                    index={index}
                    selectedIndex={selectedIndex}
                  />
                ))}
              </div>
            </div>
            {/* Review Section End */}
          </div>
        </div>
      </div>
    </PaymentContextProvider>
  );
}
