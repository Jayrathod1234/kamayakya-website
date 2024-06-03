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
import { cn } from "@/lib/utils";

const open_sans = Open_Sans({ subsets: ["latin"] });

export default function Page() {
  const pathname = usePathname();
  const { toast } = useToast();
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
          description: "Friday, February 10, 2023 at 5:57 PM",
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
      id: "",
      Session_id: "",
      time: new Date().toUTCString(),
      source_page: "",
      current_url: pathname,
      account_created_at: "",
      Curr_Subscription_Tyoe: "",
      Curr_Plan_Duration: "",
      Curr_Subscription_Start_date: "",
      Curr_Subscription_End_date: "",
      usertype: "",
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
      <div className=" absolute mix-blend-color-burn -rotate-180 h-screen w-full">
        <video className=" h-full w-full object-cover" src="/pricing/pricing-hero-bg.mp4" autoPlay loop></video>
      </div>
      {/* <div className=" hidden  absolute top-0 left-0 w-full h-[15%] md:h-[22%] bg-black  backdrop-blur-lg bg-gradient-to-t from-white to-[rgba(255,255,255,0.01)] "></div> */}
      {/* bg-radial-gradient-xl */}
      {/* HERO */}
      {/* bg-[url("/pricing/hero_gradient_svg.svg")] bg-no-repeat bg-cover */}
      <div className="relative ">
        <div className="  w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto max-h-fit  md:min-h-screen z-0 ">
          <Navbar />
          <div className=" mt-[1.875rem] md:mt-[84px] text-center">
            <h1 className=" text-display-md md:text-display-lg font-bold cursor-pointer">
              What type of <span className=" text-brand-500">investor</span> are you?
            </h1>
            <p className=" text-md md:text-lg mt-3 text-gray-600">
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
          <div className=" py-[100px]">
            <EnterpriseCard />
          </div>
        </div>
        <div className=" py-[60px]">
          <Testimonials />
        </div>
      </div>

      <div className=" ">
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
                  if(emailError) setEmailError(false)
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
            <p className=" text-sm text-gray-200 mt-4">We’ll never share your details with third parties.</p>
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
          {/* <svg className=" h-full w-screen" viewBox="0 0 1440 491" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_4646_230291)">
              <path
                d="M2057.5 410C2057.5 410 1350 384.5 871 417C392 449.5 -225.5 451 -148.5 486.5C272.21 437.8 1707 567 2057.5 410Z"
                fill="#F4F7FA"
              />
              <path
                d="M1449.44 278V423.13H1247.84L1246.78 422.7C1238.88 419.05 1233.65 412.09 1237.06 406.11C1243.56 394.76 1257.7 401.11 1268.26 397.98C1290.87 391.16 1295.36 366.34 1305.99 352.38C1326.32 325.64 1365.51 301.76 1402.61 288.82C1417.87 283.819 1433.54 280.198 1449.44 278Z"
                fill="#FAFFFE"
              />
              <g opacity="0.6">
                <path
                  d="M966.22 167.72C965.007 165.727 963.239 164.131 961.132 163.127C959.026 162.124 956.672 161.756 954.36 162.07C945.86 162.88 946.87 169.36 942.82 168.75C938.77 168.14 933.1 168.75 931.89 172.8C930.68 176.85 925.21 174.62 925.01 178.06C924.81 181.5 931.28 183.93 938.77 180.9C946.26 177.87 949.9 183.25 960.43 182.28C970.96 181.31 972.26 180.09 978.49 180.69C984.72 181.29 984.57 177.03 981.74 174.2C978.91 171.37 967.43 171.64 966.22 167.72Z"
                  fill="#E7EDF1"
                />
              </g>
              <g opacity="0.6">
                <path
                  d="M1229.48 101.45C1229.48 101.45 1225.02 92.8799 1213.75 93.9499C1202.48 95.0199 1203.82 103.61 1198.46 102.81C1193.1 102.01 1185.58 102.81 1183.97 108.18C1182.36 113.55 1175.11 110.59 1174.85 115.18C1174.59 119.77 1183.16 122.96 1193.09 118.94C1203.02 114.92 1207.85 122.07 1221.8 120.77C1235.75 119.47 1237.48 117.87 1245.74 118.67C1254 119.47 1253.8 113.82 1250.05 110.06C1246.3 106.3 1231.08 106.64 1229.48 101.45Z"
                  fill="#E7EDF1"
                />
              </g>
              <path
                d="M900.5 361C1043 352 553 349.21 553 328.5C553 307.79 353.38 355 135.5 355C-82.3802 355 4.99986 351.79 4.99986 372.5C4.99986 393.21 682.63 361 900.5 361Z"
                fill="#F0F3F6"
              />
              <path
                d="M723 373.5C430.559 423.778 145.834 387.934 -151 435V312.94C-131.48 306.94 -110.2 304 -89.08 301.35C-70.08 298.98 -50.67 296.78 -31.62 298.78C5.53999 302.67 34.94 321.55 69.38 331.78C89.4599 337.627 110.276 340.557 131.19 340.48C169.3 340.48 207.99 330.8 244.78 337.69C269.58 342.37 290.1 354.05 313.86 360.69C333.741 366.107 354.416 367.998 374.95 366.28C389.9 365.06 404.88 361.93 419.76 363.5C437.95 365.41 696 365 723 373.5Z"
                fill="#F4F7FA"
              />
              <path
                d="M2236 414C2236 442.17 1955.24 433.5 1583 433.5C1213 475 751.5 443.5 737 425.5C1187 398.5 1189.76 363 1562 363C1934.24 363 2236 385.83 2236 414Z"
                fill="#F0F3F6"
              />
              <g opacity="0.4">
                <path
                  d="M523.69 195.87C523.69 195.87 518.37 186.65 508.63 188.17C498.89 189.69 508.41 193.84 495.63 195.87C482.85 197.9 480.05 202.23 485.89 205.69C491.73 209.15 501.25 199.42 511.64 204.18C522.03 208.94 535.95 204.87 523.69 195.87Z"
                  fill="#E7EDF1"
                />
              </g>
              <g opacity="0.6">
                <path
                  d="M376.639 101.45C376.639 101.45 372.189 92.8804 360.949 94.0004C349.709 95.1204 351.019 103.66 345.649 102.86C340.279 102.06 332.769 102.86 331.159 108.23C329.549 113.6 322.309 110.64 322.039 115.23C321.769 119.82 330.359 123.01 340.279 118.99C350.199 114.97 355.009 122 368.949 120.74C382.889 119.48 384.629 117.84 392.889 118.64C401.149 119.44 400.949 113.79 397.189 110.03C393.429 106.27 378.249 106.64 376.639 101.45Z"
                  fill="#E7EDF1"
                />
              </g>
              <g opacity="0.6">
                <path
                  d="M774.64 251.59C774.64 251.59 770.19 243.02 758.92 244.09C747.65 245.16 748.99 253.75 743.62 252.95C738.25 252.15 730.74 252.95 729.13 258.31C727.52 263.67 720.28 260.73 720.01 265.31C719.74 269.89 728.33 273.09 738.25 269.07C748.17 265.05 753.01 272.19 766.97 270.9C780.93 269.61 782.65 268 790.95 268.78C799.25 269.56 799.01 263.93 795.25 260.17C791.49 256.41 776.25 256.77 774.64 251.59Z"
                  fill="#E7EDF1"
                />
              </g>
              <g opacity="0.4">
                <path
                  d="M663.69 151.87C663.69 151.87 658.37 142.65 648.63 144.17C638.89 145.69 648.41 149.84 635.63 151.87C622.85 153.9 620.05 158.23 625.89 161.69C631.73 165.15 641.25 155.42 651.64 160.18C662.03 164.94 675.95 160.87 663.69 151.87Z"
                  fill="#E7EDF1"
                />
              </g>
              <path d="M850.76 150.67H841.57V191.15H850.76V150.67Z" fill="#F1F2F6" />
              <path d="M846.16 131.21L852.16 141.66L858.16 152.11H834.1L840.1 141.66L846.16 131.21Z" fill="#F1F2F6" />
              <path d="M64 166H57V197H64V166Z" fill="#E9F1EE" />
              <path d="M60.0262 151L64.5131 159L69 167H51L55.4869 159L60.0262 151Z" fill="#E9F1EE" />
              <path d="M158.8 22.8096H148.04V70.2496H158.8V22.8096Z" fill="#F1F2F6" />
              <path d="M153.42 0L160.49 12.24L167.56 24.49H139.28L146.35 12.24L153.42 0Z" fill="#F1F2F6" />
              <path d="M1130.66 180.46H1121.47V221H1130.66V180.46Z" fill="#F1F2F6" />
              <path d="M1126.07 161L1132.07 171.45L1138.07 181.9H1113.94L1119.94 171.45L1126.07 161Z" fill="#F1F2F6" />
              <path d="M650.66 277.46H641.48V318H650.66V277.46Z" fill="#F1F2F6" />
              <path d="M646.07 258L652.07 268.45L658.07 278.9H634L640 268.45L646.07 258Z" fill="#F1F2F6" />
            </g>
            <defs>
              <clipPath id="clip0_4646_230291">
                <rect width="1440" height="491" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
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
