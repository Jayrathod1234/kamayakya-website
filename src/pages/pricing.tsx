import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";
import { Input } from "@/components.v2/ui/input";
import { Button as ShadBtn } from "@/components.v2/ui/button";

import {
  Button,
  EnterpriseCard,
  FeelingLost,
  Navbar,
  Newsletter,
  Plans,
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
              <Plans />
            </section>
          </div>

          <div id="effortless-section" className=" py-[60px]">
            <SmallCaseCard />
          </div>
          <div className="py-[60px] md:py-[100px]">
            <EnterpriseCard />
          </div>
        </div>
        <div className=" py-[60px] bg-gray-100 relative ">
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

      <div className=" bg-gray-100">
        <FeelingLost />
      </div>

      <Newsletter />
      <div className="bg-gradient-to-b from-[#244D4E] to-[#182E35]">
        <div className="h-[calc(286px+10%)] overflow-hidden w-full z-10 -mt-[10%] ">
          <Image
            alt="footer-bg"
            src={"/footer-top-illustration.png"}
            width={1440}
            height={491}
            className=" w-full h-full"
          />
        </div>

        <div className=" text-white  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto flex flex-col gap-y-16 max-md:gap-y-[21px] pb-5 mt-[58px]">
          <div className=" flex justify-between max-md:flex-col max-md:gap-y-7">
            <div className=" flex items-center gap-x-[14.77px]">
              <Image
                className=" block "
                src="/KKLogo_footer.png"
                alt="KamayaKya-logo"
                width={209}
                height={40}
                priority
              />
              <p className="hidden md:block text-sm mt-2">Made in Bharat with ❤️</p>
            </div>
            <div className=" flex gap-x-[10px]">
              <Image
                className="h-8 aspect-square md:h-9 inline-block"
                src="icons/Facebook.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className="h-8 aspect-square md:h-9 inline-block"
                src="/icons/Instagram.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className="h-8 aspect-square md:h-9 inline-block"
                src="/icons/Twitter.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className="h-8 aspect-square md:h-9 inline-block"
                src="/icons/Linkedin.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className="h-8 aspect-square md:h-9 inline-block"
                src="/icons/Telegram.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
            </div>
          </div>
          <div className=" flex justify-between flex-wrap max-md:flex-col max-md:gap-y-[21px]">
            <div className=" flex items-start gap-x-[10px]">
              <svg
                className=" mt-[5px] aspect-square flex-shrink-0"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00001 1C6.54184 1.00172 5.1439 1.58174 4.11282 2.61281C3.08174 3.64389 2.50173 5.04184 2.50001 6.5C2.49826 7.69161 2.8875 8.85089 3.60801 9.8C3.60801 9.8 3.75801 9.9975 3.78251 10.026L8.00001 15L12.2195 10.0235C12.2415 9.997 12.392 9.8 12.392 9.8L12.3925 9.7985C13.1127 8.84981 13.5017 7.69107 13.5 6.5C13.4983 5.04184 12.9183 3.64389 11.8872 2.61281C10.8561 1.58174 9.45817 1.00172 8.00001 1ZM8.00001 8.5C7.60444 8.5 7.21776 8.3827 6.88887 8.16294C6.55997 7.94318 6.30362 7.63082 6.15225 7.26537C6.00087 6.89991 5.96126 6.49778 6.03844 6.10982C6.11561 5.72186 6.30609 5.36549 6.58579 5.08579C6.8655 4.80608 7.22186 4.6156 7.60983 4.53843C7.99779 4.46126 8.39992 4.50087 8.76537 4.65224C9.13082 4.80362 9.44318 5.05996 9.66294 5.38886C9.88271 5.71776 10 6.10444 10 6.5C9.99934 7.03023 9.78842 7.53855 9.41349 7.91348C9.03856 8.28841 8.53024 8.49934 8.00001 8.5Z"
                  fill="white"
                />
              </svg>

              <p className="text-sm md:text-md  max-w-[392px]">
                Flat No 6, New Nirmal Apartments, Balkrishna Sakharam Dhole Patil Rd, near Akshay Complex Road, Pune,
                Maharashtra 411001
              </p>
            </div>
            <div className=" flex gap-x-10 gap-y-[7px] md:gap-y-0 flex-col items-start md:items-end ">
              <div className=" flex items-center gap-x-[10px] md:gap-x-1 py-[7px]">
                <Phone fill="white" size={20} stroke="1" />

                <p className=" text-sm md:text-md md:font-semibold">+91 9175939641</p>
              </div>
              <div className=" flex items-center  gap-x-[10px] md:gap-x-1 py-[7px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.668 3.33398H3.33464C2.41797 3.33398 1.6763 4.08398 1.6763 5.00065L1.66797 15.0007C1.66797 15.9173 2.41797 16.6673 3.33464 16.6673H16.668C17.5846 16.6673 18.3346 15.9173 18.3346 15.0007V5.00065C18.3346 4.08398 17.5846 3.33398 16.668 3.33398ZM16.3346 6.87565L10.443 10.559C10.1763 10.7257 9.8263 10.7257 9.55964 10.559L3.66797 6.87565C3.58441 6.82874 3.51123 6.76537 3.45288 6.68936C3.39452 6.61336 3.35219 6.5263 3.32845 6.43346C3.30471 6.34062 3.30005 6.24393 3.31477 6.14924C3.32948 6.05455 3.36325 5.96383 3.41404 5.88257C3.46482 5.80131 3.53157 5.7312 3.61024 5.67648C3.68891 5.62176 3.77786 5.58358 3.87172 5.56423C3.96557 5.54489 4.06237 5.54479 4.15626 5.56394C4.25016 5.58309 4.33919 5.6211 4.41797 5.67565L10.0013 9.16732L15.5846 5.67565C15.6634 5.6211 15.7524 5.58309 15.8463 5.56394C15.9402 5.54479 16.037 5.54489 16.1309 5.56423C16.2247 5.58358 16.3137 5.62176 16.3924 5.67648C16.471 5.7312 16.5378 5.80131 16.5886 5.88257C16.6394 5.96383 16.6731 6.05455 16.6878 6.14924C16.7026 6.24393 16.6979 6.34062 16.6742 6.43346C16.6504 6.5263 16.6081 6.61336 16.5497 6.68936C16.4914 6.76537 16.4182 6.82874 16.3346 6.87565Z"
                    fill="white"
                  />
                </svg>

                <p className="text-sm md:text-md md:font-semibold">contact@kamayakya.com</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col pt-10 md:pt-12 gap-y-10  md:gap-y-[60px] border-t border-t-[rgba(228,231,236,0.4)]">
            {/* <div className=" flex gap-[10px] flex-wrap content-center items-center justify-between max-md:justify-center"> */}
            <div className=" grid grid-cols-[repeat(auto-fit,_minmax(149px,0.5fr))] gap-[10px] justify-between place-content-center max-phone:place-content-center">
              <div className=" max-phone:place-self-center place-self-start">
                <Image
                  className=" inline-block max-md:hidden h-full w-full max-w-[252px] "
                  width={252}
                  height={50}
                  alt="sebi"
                  src={"/sebi.png"}
                />
                <Image className=" hidden max-md:inline-block" width={132} height={26} alt="sebi" src={"/sebi.png"} />
              </div>
              <div className=" max-phone:place-self-center place-self-center">
                <Image
                  className=" inline-block max-md:hidden h-full w-full max-w-[252px] "
                  width={280.29}
                  height={55}
                  alt="udyam"
                  src="/udyam.png"
                />
                <Image className=" hidden max-md:inline-block" width={149} height={29} alt="udyam" src="/udyam.png" />
              </div>
              <div className=" max-phone:place-self-center place-self-end max-phone:col-span-full">
                <Image
                  className=" inline-flex max-md:hidden h-full w-full max-w-[252px]"
                  width={265.48}
                  height={55}
                  alt="startupindia"
                  src={"/startupindia.png"}
                />

                <Image
                  className=" hidden max-md:inline-block"
                  width={131}
                  height={27}
                  alt="startupindia"
                  src={"/startupindia.png"}
                />
              </div>
            </div>
            <p className=" text-sm text-center">
              Investment in securities market are subject to market risks. Read all the related documents carefully
              before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance
              of the intermediary or provide any assurance of returns to investors.
            </p>
            <div className=" flex flex-col gap-y-5 md:gap-y-12">
              <div className=" text-white flex flex-wrap gap-x-5 items-center justify-center flex-shrink-0 content-center whitespace-nowrap max-md:text-2xs ">
                <p className=" m-0 font-medium text-2xs md:text-md">Terms & conditions</p>
                <p className=" m-0 font-medium text-2xs md:text-md">Disclousers</p>
                <p className=" m-0 font-medium text-2xs md:text-md">Investor Charter</p>
                <p className=" m-0 font-medium text-2xs md:text-md">Complaints</p>
                <p className=" m-0 font-medium text-2xs md:text-md">Privacy Policy</p>
              </div>
              <p className=" text-sm  max-md:text-4xs opacity-[62%] text-center">
                © 2023 KamayaKya Wealth Management Pvt. Ltd., all rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
