import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";
import { Input } from "@/components.v2/ui/input";
import { Button as ShadBtn } from "@/components.v2/ui/button";

import {
  Button,
  EnterpriseCard,
  FeelingLost,
  Footer,
  Navbar,
  Newsletter,
  PlansSection,
  Semibold,
  SmallCaseCard,
  Tabs,
  Testimonials,
  UserTypeCard,
  UserTypeDesktopCard,
} from "@/components.v2/index.components";
import Image from "next/image";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { getMixPanelClient } from "@/externals/mixpanel";
import { usePathname } from "next/navigation";
import axios from "axios";
import { NEWSLETTER_SUBSCRIBE_URL } from "./api/URLs";
import Link from "next/link";
import { useToast } from "@/components.v2/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { useActivePlanContext } from "@/components/PlanContext";
import { Mail, Phone } from "lucide-react";

const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Page() {
  const pathname = usePathname();
  const { activePlan } = useActivePlanContext();
 

  useEffect(() => {
    const mp = getMixPanelClient();
    mp.track("Pricing_page_loaded", {
      id: uuidv4(),
      Session_id: "",
      time: new Date().toUTCString(),
      source_page: "",
      current_url: pathname,
      account_created_at: "",
      Curr_Subscription_Type: activePlan.plan,
      Curr_Plan_Duration: "",
      Curr_Subscription_Start_date: activePlan.start_date,
      Curr_Subscription_End_date: activePlan.end_date,
      usertype: activePlan.plan ? (activePlan.plan.toLowerCase() === "free" ? "Free" : "Paid") : null,
      browser_version: "",
      browser_name: "",
      device_type: "",
      device_name: "",
      utm_campaign: "",
      utm_content: "",
      utm_source: "",
      utm_medium: "",
      utm_terms: "",
    });
  }, [activePlan?.plan,activePlan?.start_date,activePlan?.end_date]);

  return (
    <div
      className={` relative pricing pricing-body tracking-wide overflow-hidden bg-white bg-[linear-gradient(to_top,rgba(255,255,255,0.4),rgba(255,255,255,0)),radial-gradient(126.67%_325.03%_at_-1.18%_22.73%,rgba(241,252,255,0.4)_0%,rgba(202,242,255,0.4)_19%,rgba(193,240,255,0.4)_39%,rgba(193,255,236,0.4)_57.07%,rgba(203,255,224,0.4)_69.37%,rgba(229,255,223,0.4)_79.3%,rgba(246,255,244,0.4)_100%)] bg-[length:auto_1200px] bg-no-repeat`}
    >
      {/* gradeint bg */}
      {/* <div className=" absolute top-0 left-0 h-[817px] md:h-[1200px] w-full object-cover opacity-40  ">
        <div className=" h-full w-full  "></div>
      </div> */}

      {/* <div className=" absolute h-[1200px] mix-blend-color-burn  w-full pointer-events-none">
        <video className=" h-full w-full object-cover z-40 pointer-events-none" src="/pricing/hero_bg.webm" autoPlay muted loop></video>
      </div> */}
      <div className="relative ">
        <div className="relative  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-[700px]  md:max-h-[950px]">
          <div className="hidden lg:block  absolute lg:right-[60px] top-52">
            <Image alt="rupee_icon" width={81} height={93} src={"/pricing/rupee_hero_icon.svg"} />
          </div>
          <div className=" absolute lg:left-12 md:bottom-16 -left-1 bottom-20">
            <Image alt="rupee_icon" width={85} height={85} src={"/pricing/rupee_hero_icon_left.svg"} />
          </div>
          <div className=" lg:hidden absolute right-0 top-48 -rotate-[75deg]">
            <Image alt="rupee_icon" width={85} height={85} src={"/pricing/rupee_hero_icon_left.svg"} />
          </div>
          <Navbar />
          <div className=" mt-[1.875rem] md:mt-9 text-center">
            <h1 className=" text-display-xs md:text-display-lg font-bold mt-20">
              What type of <span className=" text-brand-400">investor</span> are you?
            </h1>
            <p className=" text-md md:text-lg mt-3 text-gray-600 mb-9">
              Get the Right Fit : Because a good plan is like a good pair of shoes
            </p>
          </div>
          <div className=" md:mt-14 grid grid-cols-2 grid-rows-6 md:grid-rows-[auto] mt-[30px] gap-4 md:grid-cols-1 place-items-center max-h-full">
            <UserTypeDesktopCard />
            <div className=" justify-self-end col-start-1 row-span-4 md:hidden">
              <UserTypeCard
                icon="/icons/deep-research-active-icon.svg"
                imgSrc="/pricing/deep_investor_mob.webp"
                title="Deep Research Investor"
                attributes={[
                  <span>
                    <Semibold>Time</Semibold> & <Semibold>knowledge</Semibold> for own investment decisions
                  </span>,
                  <span>
                    {" "}
                    Enjoys <Semibold>research</Semibold>
                  </span>,
                  <span>
                    
                    <Semibold>Thrill</Semibold> & <Semibold>learning</Semibold> by taking control of your wealth
                  </span>,
                ]}
                btnText="Membership"
              />
            </div>
            <div className=" justify-self-start col-start-2 row-start-1 row-span-5 md:hidden mt-[-3.8rem]">
              <UserTypeCard
                icon="/icons/effortless-active-icon.svg"
                imgSrc="/pricing/effortless_investor_mob.webp"
                title="Effortless Investor"
                attributes={[
                  <span>
                    <Semibold>Less time</Semibold> / <Semibold>knowledge</Semibold> for investment decisions
                  </span>,
                  <span>
                    Prefers <Semibold>readymade</Semibold> solutions
                  </span>,
                ]}
                btnText="Basket"
              />
            </div>
          </div>
        </div>
        {/* <div className=" h-[100px] md:h-[200px] w-full bg-gradient-to-t from-white to-transparent"></div> */}
      </div>
      <div className="bg-[linear-gradient(0deg,white_97.6%,transparent)] md:bg-[linear-gradient(0deg,white_95%,transparent)]">
        <div className=" w-[min(1280px,calc(100%-32px))] min-w-[328px] min-h-screen mx-auto ">
          {/* WEBSITE PLAN */}
          <div  className="py-[60px] lg:mt-[60px]">
            <div  className=" flex flex-col items-center text-center gap-3 md:gap-0">
              <p id="deepresearch-section" className=" text-sm md:text-md text-[#F98800] font-semibold uppercase relative z-20">
                KamayaKya Membership Plans
              </p>
              <p  className=" text-display-xs md:text-display-md text-gray-900 font-bold relative z-20">
                For Deep Research Investors
              </p>
              <p className=" text-sm md:text-md text-gray-700 md:mt-3  z-20">Find a plan that works for YOU.</p>
            </div>
            {/* PLAN SECTION */}
            <section  className="">
              <PlansSection />
            </section>
          </div>

          <div  className=" pt-10 pb-[60px]">
            <SmallCaseCard />
          </div>
          <div className="py-[60px] md:py-[100px]">
            <EnterpriseCard />
          </div>
        </div>
        <div id="testimonials" className=" py-[60px] bg-gray-100 relative ">
          <div className=" absolute top-[-5%] md:top-[-10%] w-screen">
            <svg className=" w-full h-full" viewBox="0 0 1440 236" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_5060_262281)">
                <path
                  d="M-72.6057 7.86867C708.139 106.745 1675.87 7.86867 1675.87 7.86867C1675.87 7.86867 2312.13 952.554 1675.87 814.365C1039.62 676.177 410.655 854.869 -72.6057 814.365C-555.866 773.862 -853.35 -91.0076 -72.6057 7.86867Z"
                  fill="#F2F4F7"
                />
              </g>
              <defs>
                <clipPath id="clip0_5060_262281">
                  <rect width="1440" height="236" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Testimonials />
        </div>
      </div>

      <div id="feeling-lost" className=" bg-gray-100">
        <FeelingLost />
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
