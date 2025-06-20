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
import { Dialog, DialogTrigger, DialogContent } from "@/components.v2/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components.v2/ui/accordion";
import TestimonialSection from "./components/TestimonialSection";
import { getTrackRecordStats } from "@/api/payment";
import KycPrivacyNotice, { PopupNotice } from "./components/KycPrivacyNotice";
import axios from "axios";
// import { DialogContent } from "@radix-ui/react-dialog";

export default function Index() {
  const ref = useRef<HTMLDivElement[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState("review");
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [stockStats, setStockStats] = useState({
    average_exit_returns: 0,
    average_live_returns: 0,
    exit_stock_count: 0,
    exited_in_loss: 0,
    exited_in_profit: 0,
    live_stock_count: 0,
    stock_images: [],
  });
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

  useEffect(() => {
    (async () => {
      try {
        const res = await getTrackRecordStats();
        setStockStats(res);
      } catch (e) {}
    })();
  }, []);
  const callIncompletePayment = () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
      axios.put(process.env.NEXT_PUBLIC_BASEPATH + "/user/userActionNotifications?type=incomplete_payment", null, {
        headers: { Authorization: "token " + refreshToken },
      });
      // You can trigger any logic here, like showing a modal or redirecting
    } catch (e) {}
  };
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      callIncompletePayment();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handle page unload (refresh, close tab, navigate away)
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");

    const handleBeforeUnload = (event) => {
      // Use sendBeacon for reliable API calls during page unload
      const headers = {
        "Authorization":"token " + refreshToken
      }
      const blob = new Blob( headers);

      navigator.sendBeacon(`${process.env.NEXT_PUBLIC_BASEPATH}/user/userActionNotifications?type=incomplete_payment`,blob);
    };

    const handleUnload = () => {
      // Fallback for browsers that don't support sendBeacon
      callIncompletePayment();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  const headerBg = !pathname.includes("successful") ? "  max-md:bg-[linear-gradient(to_bottom,#F1FBFB,#F1FBFB)]" : "";

  return (
    <PaymentContextProvider>
      <div className=" bg-white open_sans pb-6">
        <PaymentIssue />
        <Header className={headerBg} callIncompletePayment = {callIncompletePayment} />
        <div className=" -mt-[13rem] sm:-mt-[13.5rem]">
          <PopupNotice />
          <div className=" flex flex-col gap-y-4 md:flex-row main-container relative z-20 ">
            <div className=" p-4 py-8 pb-4 md:p-10 bg-white max-md:rounded-3xl md:rounded-tl-3xl md:rounded-bl-3xl border border-[#E3F1F1] border-r-[#D1F9EF99] flex flex-col  w-full">
              {/* stepper component */}
              <Tabs
                onValueChange={(value) => setActiveTab(value)}
                defaultValue={activeTab}
                value={activeTab}
                className=" relative w-full"
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
                    className=" !px-0 bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                          activeTab === "review" ? "border-brand-300 bg-white" : "border-transparent"
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
                    className="!px-0  data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                          activeTab === "details" ? "border-brand-300 bg-white" : "border-transparent"
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
                    disabled
                    value="payment"
                    className=" !px-0 disabled:opacity-100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                  <DetailSection activeTab={activeTab} setActiveTab={setActiveTab} />
                </TabsContent>
                <TabsContent value="payment">Change your payments here.</TabsContent>
              </Tabs>
              <div className=" flex justify-between relative">
                {/* <div className=" absolute h-[1px] top-[18px]  w-full bg-[linear-gradient(to_right,#447070_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x"></div> */}
              </div>
              {/* stepper component end */}

              <div className=" flex flex-col sm:flex-row justify-center items-center sm:items-start mt-3">
                <img height={24} width={24} src="/assets/help.svg" alt="help" />
                <p className=" ml-1 pt-2 text-2xs text-gray-500 text-center">
                  {/* Check <FaqModal /> */}
                  Got any doubts? Call us at +91 9175939641 or send a WhatsApp message on +91 9175939641
                </p>
              </div>
            </div>
            <div className="  p-4 md:py-10 md:px-11 min-w-0 bg-[#D1F9EF99] w-full max-md:rounded-3xl rounded-tr-3xl rounded-br-3xl border border-[#E3F1F1] border-l-0">
              <div className="relative p-10 md:p-20 rounded-tr-[100px] rounded-bl-[100px] bg-[#1D4040]">
                <div className=" p-5 pt-0 flex flex-col items-center justify-center w-full ">
                  <div className="flex items-center  ">
                    {stockStats?.stock_images?.map((item) => (
                      <div className=" h-9 w-9 rounded-full overflow-hidden -ml-2 ">
                        <img
                          className=" h-full w-full object-cover"
                          height={36}
                          width={36}
                          src={item}
                          alt="stock-image"
                        />
                      </div>
                    ))}
                  </div>
                  <p className=" text-sm mt-4 text-white text-center">
                    {stockStats.exited_in_profit} Stocks Exited 🎉 🎉
                  </p>
                </div>
                <div className=" mt-4 flex justify-center ">
                  <div className="flex flex-col items-center p-3 text-white">
                    <p className=" text-xl font-semibold">{stockStats.average_exit_returns}%</p>
                    <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Average Exit Returns</p>
                  </div>
                  <div className="flex flex-col items-center p-3 text-white">
                    <p className=" text-xl font-semibold">{stockStats.exited_in_profit}</p>
                    <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Exited in Profit</p>
                  </div>
                  <div className="flex flex-col items-center p-3 text-white">
                    <p className=" text-xl font-semibold">{stockStats?.exited_in_loss}</p>
                    <p className=" text-2xs text-center mt-1 text-[#FFFFFF87]">Exited in Loss</p>
                  </div>
                </div>
                <div className=" h-[1px] w-full my-5 bg-[linear-gradient(to_right,#447070_33%,rgba(255,255,255,0)_0%)] bg-[length:10px_1px] bg-repeat-x "></div>
                <div className="flex flex-wrap flex-col md:flex-row content-center items-center gap-4 ">
                  <Button
                    className=" flex-1 w-full max-w-[246px] hover:scale-100 hover:bg-brand-400 border-none cursor-default flex items-center justify-between !p-3"
                    variant={ButtonVariant.primary}
                  >
                    <p className=" text-2xs">Stocks Live</p>
                    <p className=" text-2xs font-bold mr-[10px]">{stockStats.live_stock_count}</p>
                  </Button>
                  <Button
                    className=" flex-1 w-full max-w-[246px] hover:scale-100 hover:bg-brand-400 border-none cursor-default flex items-center justify-between !p-3 "
                    variant={ButtonVariant.primary}
                  >
                    <p className=" text-2xs">Average Live Returns</p>
                    <p className=" text-2xs font-bold mr-[10px]">{stockStats.average_live_returns}%</p>
                  </Button>
                </div>
                <img
                  className=" hidden md:block absolute -right-4"
                  width={100}
                  height={80}
                  src="/assets/mascott-payment.png"
                  alt=""
                />
              </div>
              {/* Testimonial Section */}
              <TestimonialSection />
              {/* Testimonial Section End */}
            </div>
          </div>
        </div>
      </div>
    </PaymentContextProvider>
  );
}

function PaymentIssue() {
  return (
    <Dialog open={false}>
      <DialogContent
        closeClassName=" -right-2 -top-[12px] opacity-100 hidden"
        className=" !p-6 !rounded-[20px] w-[calc(100%-32px)]  md:min-w-[400px] max-w-[400px] open_sans"
      >
        <div>
          <img src="/assets/failed_aadhar_fetch.svg" alt="error-image" />
          <h2 className=" font-bold text-xl mt-6">🚧 Temporary Payment Issue</h2>
          <p className=" text-sm text-[#737373] mt-3">
            We’re fixing a small hiccup in our payment flow - expect it back in 2-3 days. Need help?
            <br />
            <br /> 📞 Call us : <a href="tel:+919175939641">+91 9175939641</a>
            <br /> ✉️ Email : <a href="mailto:contact@kamayakya.com">contact@kamayakya.com</a>
          </p>
          {/* <div className=" flex  items-center gap-x-[10px] mt-6 ml-auto w-fit">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setDisplayFailedAddharModal(false);
                    }}
                    variant={ButtonVariant.tertiary}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  loading={aadharOtpLoading}
                  onClick={async () => {
                    if (isAadharAlreadyVerified || aadharVerified) {
                      handleVerifyAadharOtp();
                    } else {
                      await handleAadharOtp({ aadhar });
                    }
                    // setDisplayFailedAddharModal(false);
                    // handleAadharOtp({ aadhar });
                  }}
                  variant={ButtonVariant.primary}
                >
                  Try again
                </Button>
              </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const FaqModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className=" text-brand-500">FAQ</span>
      </DialogTrigger>
      <DialogContent>
        <p>Everything you need to know about the product and billing!</p>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Section 1</TabsTrigger>
            <TabsTrigger value="password">Section 2</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Accordion type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
