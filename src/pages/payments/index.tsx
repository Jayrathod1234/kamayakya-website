import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/header";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { CarouselContent, CarouselItem, Carousel, CarouselApi } from "@/components.v2/ui/carousel";
import CarouselIndicator from "@/components.v3/common/CarouselIndicator";
import Autoplay from "embla-carousel-autoplay";

const Quotes = ()=>{
  return <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32.2148 0.179688L32.8594 1.125C32.3438 3.21615 31.6706 5.45052 30.8398 7.82812C30.0378 10.2057 29.1641 12.5833 28.2188 14.9609C27.2734 17.3385 26.3138 19.5872 25.3398 21.707H17.9492C18.5221 19.444 19.0951 17.0378 19.668 14.4883C20.2409 11.9388 20.7708 9.41797 21.2578 6.92578C21.7448 4.43359 22.1315 2.1849 22.418 0.179688H32.2148ZM14.2969 0.179688L14.8984 1.125C14.3828 3.21615 13.7096 5.45052 12.8789 7.82812C12.0768 10.2057 11.2031 12.5833 10.2578 14.9609C9.3125 17.3385 8.35286 19.5872 7.37891 21.707H0.117188C0.518229 20.0169 0.933594 18.2409 1.36328 16.3789C1.79297 14.4883 2.19401 12.5977 2.56641 10.707C2.96745 8.78776 3.32552 6.9401 3.64062 5.16406C3.98438 3.35938 4.25651 1.69792 4.45703 0.179688H14.2969Z" fill="white"/>
  </svg>
  
}

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

export const useDotButton = (emblaApi) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;
      const reset = autoplay.reset;
      reset();
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
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
  const ref = useRef([]);
  const [api, setApi] = React.useState<CarouselApi>();

  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const { selectedIndex, scrollSnaps, onDotButtonClick, isSmallScreen } = useDotButton(api);
  useEffect(() => {
    // setMargins({
    //   marginLeft:ref.current?.length ? ref.current[0]
    // })
  }, []);
  return (
    <div className=" bg-white open_sans">
      <Header />
      <div className=" flex main-container ">
        <div className=" p-10 bg-white rounded-tl-3xl rounded-bl-3xl border border-[#E3F1F1] border-r-[#D1F9EF99] flex flex-col  w-full">
          {/* stepper component */}
          <div className=" flex justify-between relative">
            <div
              ref={(el) => {
                ref.current[0] = el;
              }}
              className="flex flex-col items-center "
            >
              <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              <p className=" text-2xs mt-[10px]">Review</p>
            </div>
            <div
              ref={(el) => {
                ref.current[1] = el;
              }}
              className="flex flex-col items-center "
            >
              <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              <p className=" text-2xs mt-[10px]">Review</p>
            </div>
            <div
              ref={(el) => {
                ref.current[2] = el;
              }}
              className="flex flex-col items-center "
            >
              <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              <p className=" text-2xs mt-[10px]">Review</p>
            </div>
            <div className=" absolute h-[1px] top-[18px]  w-full bg-[linear-gradient(to_right,#447070_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x"></div>
          </div>
          {/* stepper component end */}
          {/* plan and summary */}
          <div className="  mt-9 border border-[#E4E7EC] rounded-lg bg-gray-50">
            <div className=" p-4 border-b border-b-[#E4E7EC]">
              <div className=" flex justify-between items-center open_sans">
                <p className=" text-xs text-gray-500">Plan</p>
                <button className=" text-xs text-primary-500 font-bold border-b border-b-brand-500 border-dashed">
                  Edit Plan
                </button>
              </div>
              <p className=" text-gray-950 mt-[6px] text-sm font-semibold">VIP - Main Board & SME Board (3 yrs)</p>
            </div>
            <div className=" flex">
              <div className=" p-4 flex-1 border-r border-r-gray-200">
                <p className=" text-gray-500 text-xs">Start Date</p>
                <p className=" mt-[6px] text-sm font-semibold text-gray-950">25 Feb 2023</p>
              </div>
              <div className=" p-4 flex-1">
                <p className=" text-gray-500 text-xs">Start Date</p>
                <p className=" mt-[6px] text-sm font-semibold text-gray-950">25 Feb 2026</p>
              </div>
            </div>
            <div>
              <div className="bg-[url(/assets/zigzag.svg)] flex justify-center bg-cover bg-no-repeat gap-x-1 py-[8.5px] ">
                <img src="/assets/offer.svg" height={20} width={20} alt="offer" />
                <p className=" text-2xs font-medium ">
                  You are saving <span className=" font-bold">₹20,012</span> on this plan{" "}
                </p>
              </div>
            </div>
          </div>

          {/* plan and summary end */}
          {/* Apply coupon section */}
          <div className=" mt-6">
            <p className=" text-2xs text-gray-600 font-semibold">Save Even More! Add a Coupon</p>
            <div className=" flex items-center rounded-lg mt-2 py-3 px-[11px] border border-[#0000000F]">
              <img src="/assets/badge-percent.svg" alt="badge" height={22} width={22} />
              <p className=" ml-[10px] text-gray-950 text-sm font-medium">Apply Coupon</p>
            </div>
          </div>
          <div className=" h-[1px] bg-[linear-gradient(to_right,#EDF0F5_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x my-5"></div>
          <div className="flex flex-col gap-y-4">
            <div className=" flex justify-between items-baseline">
              <p className=" text-sm text-gray-950">Base Price</p>
              <p className=" text-sm text-gray-500 font-medium">₹12,711.86</p>
            </div>
            <div className=" flex justify-between items-baseline">
              <p className=" text-sm text-gray-950">Discount on base price</p>
              <p className=" text-sm text-[#1BB991] font-medium">-₹20,012.00</p>
            </div>
            <div className=" flex justify-between items-baseline">
              <p className=" text-sm text-gray-950">Taxable Amount</p>
              <p className=" text-sm text-gray-500 font-medium">₹12,711.86</p>
            </div>
            <div className=" flex justify-between items-baseline">
              <div>
                <p className=" text-sm text-gray-950">Tax (18%)</p>
                <p className=" text-2xs text-gray-400">You don’t pay extra for taxes. We got you!</p>
              </div>
              <p className=" text-sm text-gray-500 font-medium">₹12,711.86</p>
            </div>
            <div className=" h-[1px] bg-[#E0E0E0]"></div>
          </div>
          <div className=" flex justify-between items-baseline py-[10px]">
            <p className=" text-sm text-gray-950">Total</p>

            <p className=" text-sm text-gray-500 font-bold">₹15,000 </p>
          </div>
          {/* Next button  */}
          <Button className=" mt-9" variant={ButtonVariant.primary}>
            Next
          </Button>
          {/* Next button end */}
          <div className=" flex justify-center items-center mt-3">
            <img height={24} width={24} src="/assets/help.svg" alt="help" />
            <p className=" ml-1 pt-2 text-2xs text-gray-500">
              Got any doubts? Contact us on WhatsApp number XXXX or call us at XXXX
            </p>
          </div>
        </div>
        <div className=" py-10 px-11 bg-[#D1F9EF99] w-full rounded-tr-3xl rounded-br-3xl border border-[#E3F1F1] border-l-0">
          <div className=" p-20 rounded-tr-[100px] rounded-bl-[100px] bg-[#1D4040]">
            <div className=" p-5 pt-0 flex flex-col items-center justify-center w-full ">
              <div className="flex items-center ">
                <div className=" h-9 w-9 rounded-full bg-red-500"></div>
                <div className=" h-9 w-9 rounded-full bg-red-500"></div>
                <div className=" h-9 w-9 rounded-full bg-red-500"></div>
              </div>
              <p className=" text-sm mt-4 text-white">25 Stocks Exited</p>
            </div>
            <div className=" mt-4 flex ">
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
            <div className="flex items-center gap-x-4 ">
              <Button className=" p-3" variant={ButtonVariant.primary}>
                <p className=" text-2xs">Stocks Live</p>
                <p className=" text-2xs font-bold mr-[10px]">30</p>
              </Button>
              <Button className=" p-3 w-full" variant={ButtonVariant.primary}>
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
  );
}
