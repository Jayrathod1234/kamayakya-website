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
  }, []);

  return (
    <div className={` relative pricing tracking-wide bg-white overflow-hidden `}>
      <div className=" absolute top-0 left-0 h-[817px] md:h-[1200px] w-full object-cover opacity-40 ">
        <div className=" h-full w-full bg-[radial-gradient(126.67%_325.03%_at_-1.18%_22.73%,#F1FCFF_0%,#CAF2FF_19%,#C1F0FF_39%,#C1FFEC_57.07%,#CBFFE0_69.37%,#E5FFDF_79.3%,#F6FFF4_100%)]"></div>
        {/* <svg
          className="hidden md:block h-full w-full"
          // viewBox="0 0 1440 1150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1440" height="1150" fill="url(#paint0_radial_3735_425)" fill-opacity="0.57" />
          <defs>
            <radialGradient
              id="paint0_radial_3735_425"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(-17 261.364) rotate(34.2062) scale(1786.54 4116.71)"
            >
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.19" stop-color="#A4E9FF" stop-opacity="0.71" />
              <stop offset="0.436274" stop-color="#9BE2F9" />
              <stop offset="0.570705" stop-color="#C5FFE0" />
              <stop offset="0.693668" stop-color="#CBFFE0" />
              <stop offset="0.793023" stop-color="#E5FFDF" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg> */}
        {/* <svg
          className="block md:hidden min-h-[848px] min-w-full"
          viewBox="0 0 390 840"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="-8" width="390" height="848" fill="white" />
          <rect y="-8" width="390" height="848" fill="url(#paint0_radial_3746_1276)" fill-opacity="0.57" />
          <defs>
            <radialGradient
              id="paint0_radial_3746_1276"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(-4.60416 184.727) rotate(61.6168) scale(841.785 1744.86)"
            >
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.19" stop-color="#A4E9FF" stop-opacity="0.71" />
              <stop offset="0.436274" stop-color="#9BE2F9" />
              <stop offset="0.570705" stop-color="#C5FFE0" />
              <stop offset="0.693668" stop-color="#CBFFE0" />
              <stop offset="0.793023" stop-color="#E5FFDF" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg> */}
      </div>
      <div className=" absolute h-screen mix-blend-color-burn  w-full pointer-events-none bg-gray-25">
        <video
          className=" h-full w-full object-cover z-40"
          src="/pricing/pricing-hero-bg.mp4"
          autoPlay
          muted
          loop
        ></video>
        {/* <div className=" h-16 bg-red-200 w-full -mt-16 z-50"></div> */}
      </div>
      <div className="relative ">
        <div className="  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-fit  md:min-h-screen z-0 ">
          <Navbar />
          <div className=" mt-[1.875rem] md:mt-9 text-center">
            <h1 className=" text-display-xs md:text-display-lg font-bold cursor-pointer">
              What type of <span className=" text-brand-400">investor</span> are you?
            </h1>
            <p className=" text-md md:text-lg mt-3 text-gray-600 mb-9">
              Get the Right Fit : Because a good plan is like a good pair of shoes
            </p>
          </div>
          <div className=" md:mt-20 grid grid-cols-2 grid-rows-8 md:grid-rows-[auto] mt-[42px] gap-4 md:grid-cols-1 place-content-center place-items-center">
            <UserTypeDesktopCard />
            <div className=" justify-self-end col-start-1 row-span-6 md:hidden">
              <UserTypeCard
                icon="/icons/deep-research-active-icon.svg"
                imgSrc="/user.png"
                title="Deep Research Investor"
                attributes={[
                  <span>
                    <Semibold>Time</Semibold> & <Semibold>knowledge</Semibold> for own decisions
                  </span>,
                  <span>
                    {" "}
                    Enjoys <Semibold>research</Semibold>
                  </span>,
                  <span>
                    <Semibold>Thrill</Semibold> & <Semibold>learning</Semibold> from decisions
                  </span>,
                ]}
                btnText="Membership"
              />
            </div>
            <div className=" justify-self-start col-start-2 row-start-1 row-span-7 md:hidden">
              <UserTypeCard
                icon="/icons/effortless-active-icon.svg"
                imgSrc="/user2.png"
                title="Effortless Investor"
                attributes={[
                  <span>
                    <Semibold>No time</Semibold> / <Semibold>knowledge</Semibold> for decisions
                  </span>,
                  <span>
                    Prefers <Semibold>readymade</Semibold> solutions
                  </span>,
                ]}
                btnText="Effortless Baskets"
              />
            </div>
          </div>
        </div>
        {/* <div className=" h-[100px] md:h-[200px] w-full bg-gradient-to-t from-white to-transparent"></div> */}
      </div>
      <div className=" backdrop-blur-3xl bg-opacity-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.0),white_99%)] bg-[length:30%]">
        <div className=" w-[min(1280px,calc(100%-32px))] min-w-[328px] min-h-screen mx-auto ">
          {/* WEBSITE PLAN */}
          <div className="py-[60px]">
            <div className=" flex flex-col items-center text-center gap-3 md:gap-0">
              <p className=" text-2xs md:text-md text-[#F98800] font-medium uppercase">KamayaKya Membership</p>
              <p className=" text-display-xs md:text-display-md text-gray-900 font-bold">For Deep Research Investors</p>
              <p className=" text-sm md:text-md text-gray-700 md:mt-3">Find a plan that works for YOU.</p>
            </div>
            {/* PLAN SECTION */}
            <section id="deepresearch-section" className="">
              <PlansSection />
            </section>
          </div>

          <div id="effortless-section" className=" py-[60px]">
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
