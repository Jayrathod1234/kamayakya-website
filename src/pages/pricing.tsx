import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components.v2/ui/select";
import { Input } from "@/components.v2/ui/input";
import { Button as ShadBtn } from "@/components.v2/ui/button";

import {
  Button,
  ContactUs,
  EnterpriseCard,
  Navbar,
  Plans,
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
import { v4 as uuidv4 } from 'uuid';
import { cn } from "@/lib/utils";
import { useActivePlanContext } from "@/components/PlanContext";

const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Page() {
  const pathname = usePathname();
  const { toast } = useToast();
  const {activePlan} = useActivePlanContext()
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewsLetterLinkedin = () => {
    const mp = getMixPanelClient();
    mp.track("Linkedinbutton_clicked", {
      page: "Pricing_Page",
      pagegroup: "newsletter",
    });
  };

  const handleNewsLetterEmailSubmit = async () => {
    try {
      setLoading(true);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmail) {
        setEmailError(true);
        return;
      }
      const response = await axios.post(
        NEWSLETTER_SUBSCRIBE_URL,
        { email },
        {
          headers: {
            Authorization: "token " + localStorage.getItem("refresh"),
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        toast({
          description: "Subscribed to newsletter successfully",
        });

        const mp = getMixPanelClient();
        mp.track("Linkedinbutton_clicked", {
          page: "Pricing_Page",
          pagegroup: "newsletter_subscribed",
          email: email,
        });
      }
    } catch (e: any) {
      console.log(e);
      toast({
        startIcon: (
          <div className=" h-full w-full">
            <Image src={"/warn_icon.svg"} alt="warn" height={16} width={16} />
          </div>
        ),
        description: e.response.data?.email[0] || e.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

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
      usertype: activePlan.plan ? activePlan.plan.toLowerCase()=== "free" ? "Free":"Paid" : null,
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
    <div className={` relative pricing tracking-wide bg-white overflow-hidden`}>
      <div className=" absolute top-0 left-0 h-screen w-full object-contain ">
        <svg
          className="hidden md:block min-w-full min-h-[1140px]"
          viewBox="0 0 1440 1150"
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
        </svg>
        <svg
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
        </svg>
      </div>
      <div className=" absolute mix-blend-color-burn -rotate-180 h-screen w-full pointer-events-none">
        <video className=" h-full w-full object-cover" src="/pricing/pricing-hero-bg.mp4" autoPlay loop></video>
      </div>
      {/* <div className=" hidden  absolute top-0 left-0 w-full h-[15%] md:h-[22%] bg-black  backdrop-blur-lg bg-gradient-to-t from-white to-[rgba(255,255,255,0.01)] "></div> */}
      {/* bg-radial-gradient-xl */}
      {/* HERO */}
      {/* bg-[url("/pricing/hero_gradient_svg.svg")] bg-no-repeat bg-cover */}
      <div className="relative ">
        <div className="  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-fit  md:min-h-screen z-0 ">
          <Navbar />
          <div className=" mt-[1.875rem] md:mt-9 text-center">
            <h1 className=" text-display-xs md:text-display-lg font-bold cursor-pointer">
              What type of <span className=" text-brand-400">investor</span> are you?
            </h1>
            <p className=" text-md md:text-lg mt-3 text-gray-600 mb-9">
              Deciphering the Market: Unlock the Plan That Speaks Your Language
            </p>
          </div>
          <div className=" md:mt-20 grid grid-cols-2 grid-rows-8 md:grid-rows-[auto] mt-[42px] gap-4 md:grid-cols-1 place-content-center place-items-center">
            <UserTypeDesktopCard />
            <div className=" justify-self-end col-start-1 row-span-6 md:hidden">
              <UserTypeCard
                imgSrc="/user.png"
                title="Deep Research Investor"
                attributes={["Have some time & knowledge", "Likes doing research", "Likes the thrill & learning"]}
                btnText="Membership"
              />
            </div>
            <div className=" justify-self-start col-start-2 row-start-1 row-span-7 md:hidden">
              <UserTypeCard
                imgSrc="/user2.png"
                title="Effortless Investor"
                attributes={["Do not have time & knowledge", "Need a ready-made solution"]}
                btnText="Effortless Baskets"
              />
            </div>
          </div>
        </div>
        <div className=" h-[100px] md:h-[200px] w-full bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className=" backdrop-blur-3xl bg-white bg-[linear-gradient(to_bottom,transparent,white)] bg-[length:25%]">
        <div className=" w-[min(1280px,calc(100%-32px))] min-w-[328px] min-h-screen mx-auto ">
          {/* WEBSITE PLAN */}
          <div className="py-[60px]">
            <div className=" flex flex-col items-center text-center gap-3 md:gap-0">
              <p className=" text-2xs md:text-md text-[#F98800] font-medium uppercase">KamayaKya Membership</p>
              <p className=" text-display-xs md:text-display-md text-gray-900 font-bold">For Do it Yourself Investor</p>
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
        <ContactUs />
      </div>

      <div className=" py-[60px] text-white bg-[url('/news_letter_bg.png')] bg-gray-950 text-center  md:w-[min(1280px,calc(100%-32px))] md:min-w-[328px] md:max-h-[639px] md:mx-auto md:mt-[-10%] md:rounded-xl relative z-40 ">
        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto md:w-[566px] md:mt-[109px] md:mb-[126px]">
          <h3 className=" text-xl font-bold md:text-display-md">
            Guess who doesn’t like to “Spam” ? <span className=" text-[#32D583]">Us.</span>
          </h3>
          <div className=" mt-10 md:mt-[75px] flex flex-col items-center gap-3 md:flex-row md:gap-x-3 md:justify-center">
            <p mb-3>Get monthly dose of market gyaan on :</p>
            <button onClick={handleNewsLetterLinkedin} className=" ">
              <Link
                className=" text-inherit px-4 py-2 flex gap-2 items-center bg-gray-900 border border-gray-800 rounded-[6px]"
                href={"https://www.linkedin.com/company/kamayakya/"}
                target="_blank"
              >
                <Image height={32} width={32} src={"/icons/linkedin.svg"} alt="linkedin-icon" />
                <p className=" font-medium">KamayaKya’s Linkedin</p>
                <Image height={18} width={18} src={"/icons/open-link.svg"} alt="open-link-icon" />
              </Link>
            </button>
          </div>
          <p className=" p-2 my-3 md:my-8 text-gray-600">OR</p>
          <div>
            {/* EMAIL INPUT */}
            <div
              className={` flex items-center bg-white p-2 pl-3 rounded-[6px] gap-[8px] mt-3 w-full max-w-[350px] md:max-w-[566px] mx-auto ${
                emailError ? " border  border-[rgba(253,162,155,1)] shadow-xs shadow-[rgba(253,162,155,1)] " : ""
              }`}
            >
              {/* <div className=" ml-[6px]"> */}
              <Image src={"/icons/mail.svg"} alt="mail" height={20} width={20} />
              {/* </div> */}
              <Input
                onChange={(e) => {
                  if (emailError) setEmailError(false);
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className="  px-0 text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
              />
              <Button
                loading={loading}
                customStyle=" gap-[6px]"
                onClick={handleNewsLetterEmailSubmit}
                variant={ButtonVariant.primary}
                size={ButtonSize.lg}
              >
                <p className=" text-sm font-medium">Subscribe</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8.88897 3.33301L13.3334 7.99967M13.3334 7.99967L8.88897 12.6663M13.3334 7.99967L2.66675 7.99967"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
            {emailError ? (
              <p className=" text-sm text-[rgba(240,68,56,1)] mt-[6px] text-left">Enter valid email</p>
            ) : null}
            <p className=" text-sm text-gray-200 mt-4">We do not share your details with third parties.</p>
          </div>
        </div>
      </div>
      <div>
        <div className="h-[calc(286px+10%)] w-full z-10 -mt-[10%]">
          <Image
            alt="footer-bg"
            src={"/footer-illustration-bg.svg"}
            width={1440}
            height={491}
            className=" w-full h-full"
          />
        </div>

        <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto flex flex-col gap-y-16 max-md:gap-y-[21px] pb-5 mt-[58px]">
          <div className=" flex justify-between max-md:flex-col">
            <Image className=" inline-block" src="/KKLogo.png" alt="KamayaKya-logo" width={170} height={56} priority />
            <div className=" flex gap-x-[10px]">
              <Image
                className=" inline-block"
                src="icons/Facebook.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className=" inline-block"
                src="/icons/Instagram.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className=" inline-block"
                src="/icons/Twitter.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className=" inline-block"
                src="/icons/Linkedin.svg"
                alt="KamayaKya-logo"
                width={40}
                height={40}
                priority
              />
              <Image
                className=" inline-block"
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
                className=" mt-[6px]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00001 1C6.54184 1.00172 5.1439 1.58174 4.11282 2.61281C3.08174 3.64389 2.50173 5.04184 2.50001 6.5C2.49826 7.69161 2.8875 8.85089 3.60801 9.8C3.60801 9.8 3.75801 9.9975 3.78251 10.026L8.00001 15L12.2195 10.0235C12.2415 9.997 12.392 9.8 12.392 9.8L12.3925 9.7985C13.1127 8.84981 13.5017 7.69107 13.5 6.5C13.4983 5.04184 12.9183 3.64389 11.8872 2.61281C10.8561 1.58174 9.45817 1.00172 8.00001 1ZM8.00001 8.5C7.60444 8.5 7.21776 8.3827 6.88887 8.16294C6.55997 7.94318 6.30362 7.63082 6.15225 7.26537C6.00087 6.89991 5.96126 6.49778 6.03844 6.10982C6.11561 5.72186 6.30609 5.36549 6.58579 5.08579C6.8655 4.80608 7.22186 4.6156 7.60983 4.53843C7.99779 4.46126 8.39992 4.50087 8.76537 4.65224C9.13082 4.80362 9.44318 5.05996 9.66294 5.38886C9.88271 5.71776 10 6.10444 10 6.5C9.99934 7.03023 9.78842 7.53855 9.41349 7.91348C9.03856 8.28841 8.53024 8.49934 8.00001 8.5Z"
                  fill="#667085"
                />
              </svg>
              <p className=" max-w-[392px]">
                Flat No 6, New Nirmal Apartments, Balkrishna Sakharam Dhole Patil Rd, near Akshay Complex Road, Pune,
                Maharashtra 411001
              </p>
            </div>
            <div className=" flex gap-x-10 max-md:flex-col max-md:gap-y-[21px]">
              <div className=" flex items-center gap-x-[10px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 10.9467V13.304C14.0001 13.4728 13.9361 13.6353 13.8211 13.7588C13.706 13.8823 13.5484 13.9575 13.38 13.9693C13.0887 13.9893 12.8507 14 12.6667 14C6.77533 14 2 9.22467 2 3.33333C2 3.14933 2.01 2.91133 2.03067 2.62C2.04248 2.45163 2.11772 2.29401 2.2412 2.17894C2.36468 2.06387 2.52722 1.99992 2.696 2H5.05333C5.13603 1.99992 5.2158 2.03057 5.27715 2.08601C5.33851 2.14145 5.37706 2.21772 5.38533 2.3C5.40067 2.45333 5.41467 2.57533 5.428 2.668C5.56049 3.59262 5.832 4.49189 6.23333 5.33533C6.29667 5.46867 6.25533 5.628 6.13533 5.71333L4.69667 6.74133C5.5763 8.79097 7.2097 10.4244 9.25933 11.304L10.286 9.868C10.328 9.80933 10.3892 9.76725 10.459 9.7491C10.5288 9.73095 10.6028 9.73787 10.668 9.76867C11.5113 10.1693 12.4104 10.4401 13.3347 10.572C13.4273 10.5853 13.5493 10.5993 13.7013 10.6147C13.7835 10.6231 13.8596 10.6617 13.9149 10.7231C13.9702 10.7844 14.0001 10.8641 14 10.9467Z"
                    fill="#667085"
                  />
                </svg>

                <p>+91 9175939641</p>
              </div>
              <div className=" flex items-center gap-x-[10px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.334 2.66699H2.66732C1.93398 2.66699 1.34065 3.26699 1.34065 4.00033L1.33398 12.0003C1.33398 12.7337 1.93398 13.3337 2.66732 13.3337H13.334C14.0673 13.3337 14.6673 12.7337 14.6673 12.0003V4.00033C14.6673 3.26699 14.0673 2.66699 13.334 2.66699ZM13.0673 5.50033L8.35398 8.44699C8.14065 8.58033 7.86065 8.58033 7.64732 8.44699L2.93398 5.50033C2.86714 5.4628 2.8086 5.4121 2.76191 5.35129C2.71522 5.29049 2.68136 5.22084 2.66237 5.14657C2.64338 5.0723 2.63965 4.99495 2.65142 4.9192C2.66319 4.84344 2.69021 4.77087 2.73084 4.70586C2.77147 4.64085 2.82487 4.58476 2.8878 4.54099C2.95074 4.49722 3.0219 4.46667 3.09698 4.45119C3.17206 4.43572 3.24951 4.43564 3.32462 4.45096C3.39974 4.46628 3.47096 4.49668 3.53398 4.54033L8.00065 7.33366L12.4673 4.54033C12.5303 4.49668 12.6016 4.46628 12.6767 4.45096C12.7518 4.43564 12.8292 4.43572 12.9043 4.45119C12.9794 4.46667 13.0506 4.49722 13.1135 4.54099C13.1764 4.58476 13.2298 4.64085 13.2705 4.70586C13.3111 4.77087 13.3381 4.84344 13.3499 4.9192C13.3616 4.99495 13.3579 5.0723 13.3389 5.14657C13.3199 5.22084 13.2861 5.29049 13.2394 5.35129C13.1927 5.4121 13.1342 5.4628 13.0673 5.50033Z"
                    fill="#667085"
                  />
                </svg>
                <p>contact@kamayakya.com</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col pt-12 pb-[72px] max-md:py-10 gap-y-16 max-md:gap-y-10 border-t border-t-[#E4E7EC]">
            <div className=" flex max-md:flex-wrap content-center max-md:justify-center justify-between items-center">
              <Image className=" inline-block max-md:hidden" width={252} height={50} alt="sebi" src={"/sebi.png"} />
              <Image className=" inline-block max-md:hidden" width={280.29} height={55} alt="udyam" src="/udyam.png" />
              <Image
                className=" inline-block max-md:hidden"
                width={265.48}
                height={55}
                alt="startupindia"
                src={"/startupindia.png"}
              />
              <Image className=" hidden max-md:inline-block" width={132} height={26} alt="sebi" src={"/sebi.png"} />
              <Image className=" hidden max-md:inline-block" width={149} height={29} alt="udyam" src="/udyam.png" />
              <Image
                className=" hidden max-md:inline-block"
                width={131}
                height={27}
                alt="startupindia"
                src={"/startupindia.png"}
              />
            </div>
            <p className=" text-sm text-gray-500 max-md:text-center">
              Investment in securities market are subject to market risks. Read all the related documents carefully
              before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance
              of the intermediary or provide any assurance of returns to investors.
            </p>
          </div>
          <div className=" flex justify-between items-center max-md:flex-col-reverse flex-wrap-reverse">
            <p className=" text-sm text-[#52525B] max-md:text-4xs">
              © 2023 KamayaKya Wealth Management Pvt. Ltd., all rights reserved.
            </p>
            <div className=" flex flex-wrap gap-x-5 items-center max-md:justify-center flex-shrink-0 content-center whitespace-nowrap max-md:text-2xs ">
              <p className=" text-gray-800">Terms & conditions</p>
              <p className=" text-gray-800">Disclousers</p>
              <p className=" text-gray-800">Investor Charter</p>
              <p className=" text-gray-800">Complaints</p>
              <p className=" text-gray-800">Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
