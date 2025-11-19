import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Marquee } from "@/components.v2/magicui/marquee";
import { ArrowRight, Play } from "lucide-react";
import React, { useContext } from "react";
import LoginPrompt from "../common/LoginPrompt";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import Stat from "./Stat";
import { TypeAnimation } from "react-type-animation";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ACTIVE_PLAN_URL, GET_USER } from "@/pages/api/URLs";
import axios from "axios";

const COMPANY_LIST = [
  "/hero_company/image 201.png",
  "/hero_company/image 200.png",
  "/hero_company/image 199.png",
  "/hero_company/image 198.png",
  "/hero_company/image 47.png",
  "/hero_company/image 46.png",
  "/hero_company/image 45.png",
  "/hero_company/apollo-hospitals-seeklogo 1.png",
  "/hero_company/swan.png",
  "/hero_company/kirana.png",
];
export default function Hero() {
  const { isLoggedIn, setShowLoginModal, showLoginModal } = useContext(AuthContext);
  const router = useRouter();
  const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh") : null;

  const getUserType = async () => {
    if (!isLoggedIn || !refreshToken) return null;
    try {
      const userResponse = await fetch(GET_USER, {
        method: "GET",
        headers: {
          Authorization: `Token ${refreshToken}`,
        },
      });
      const user = await userResponse.json();
      if (user?.id) {
        const planResponse = await axios.get(ACTIVE_PLAN_URL, {
          headers: {
            Authorization: `token ${refreshToken}`,
          },
        });
        if (planResponse.data?.current_active_subscription) {
          const plan = planResponse.data.current_active_subscription.plan;
          return plan ? (plan.toLowerCase() === "free" ? "Free" : "Paid") : null;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const handleGetFreeAccessClick = async () => {
    const mp = getMixPanelClient();
    const usertype = await getUserType();
    mp.track("getfreeaccess_clicked", {
      page: "Homepage",
      usertype: usertype,
    });
    mp.track("unlockforfree_cicked", {
      page: "Homepage",
      usertype: usertype,
    });
    if (isLoggedIn) {
      router.push("/pricing");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className=" ">
      <div className=" lg:min-h-screen open_sans ">
        <div className="main-container mx-auto px-4  py-16 pt-[57.5px] lg:pt-[167px]">
          <div className="grid grid-cols-1 lg:grid-cols-[.75fr_1fr] items-center justify-center gap-12 lg:gap-16 xl:gap-20">
            {/* Left Content - Desktop First Column, Mobile Second */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
              <div className=" max-lg:flex max-lg:flex-col max-lg:items-center">
                <div className=" bg-white border border-[#75CDC566] px-[14px] py-2 rounded-full w-fit">
                  <p className=" text-sm font-semibold text-brand-500">SEBI Registered: INH000009843</p>
                </div>
                <h1 className="font-medium text-gray-950 text-display-sm lg:text-[62px] leading-[110%]  tracing-[-3%] max-lg:mt-[10px]">
                  Grow your money by investing in{" "}
                  <TypeAnimation
                    preRenderFirstString={true}
                    sequence={[
                      5000,
                      "SME, Microcap and Smallcap stocks",

                      3000,
                      "companies with big potential",
                      3000,
                      "potential Multibaggers",
                      5000,
                    ]}
                    speed={60}
                    deletionSpeed={60}
                    // style={{ fontSize: "80px" }}
                    repeat={Infinity}
                    className="text-brand-400 font-bold max-lg:text-center text-display-sm lg:text-[58px] leading-[110%]  tracing-[-3%] max-lg:mt-[10px]"
                  />
                  {/* <span className=" text-brand-400 font-bold open_sans_italic">Freedom</span> Starts Here! */}
                </h1>

                {/*<p className=" text-xs lg:text-lg text-gray-800 max-w-2xl mx-auto lg:mx-0 max-lg:mt-2 ">
                  Invest confidently in hidden opportunities within SMEs, Microcaps & Smallcaps, and build the future
                  you truly deserve.
                </p> */}
              </div>
              <div className="order-1 lg:order-2 w-full max-w-2xl mx-auto lg:mx-0">
                <div className="relative group">
                  {/* Video Container */}
                  <div className=" lg:hidden relative rounded-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                    <div className="aspect-video xl:w-[640px] xl:h-[400px] flex items-center justify-center">
                      {/* <video
                      className="w-full h-full object-cover"
                      // poster="/path-to-your-poster-image.jpg"
                      // controls
                      autoPlay
                      loop
                      muted
                      poster="/landing/KMKhero.png"
                    >
                      <source src="/landing/KMKhero.webm" type="video/webm" />
                    </video> */}
                      <Stat />
                    </div>

                    {/* Decorative Elements */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-lg:mt-6 mt-[33px]">
                <Button onClick={handleGetFreeAccessClick} variant={ButtonVariant.primary}>
                  <p className=" font-medium text-md">
                    Get Started - <span className=" font-normal">It's Free</span>
                  </p>
                </Button>
              </div>
            </div>

            {/* Right Video - Desktop Second Column, Mobile First */}
            <div className=" lg:block hidden order-1 lg:order-2 w-full max-w-2xl mx-auto lg:mx-0">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative  xl:scale-110 duration-500 flex items-center ">
                  <div className=" xl:w-[640px] flex items-center justify-center rounded-2xl overflow-hidden ">
                    {/* <video
                      className="w-full h-full object-cover"
                      // poster="/path-to-your-poster-image.jpg"
                      // controls
                      autoPlay
                      loop
                      muted
                      poster="/landing/KMKhero.png"
                    >
                      <source src="/landing/KMKhero.webm" type="video/webm" />
                    </video> */}
                    <Stat />
                  </div>

                  {/* Decorative Elements */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
      </div> */}
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden open_sans ">
        <p className=" pb-3 font-semibold text-gray-700">Our members include leaders from</p>
        <Marquee pauseOnHover className="[--duration:20s] [--gap:0rem]">
          {COMPANY_LIST.map((company) => (
            <div
              className=" h-[44px] mr-[50px] object-contain overflow-hidden flex items-center justify-center"
              key={company}
            >
              <img className=" object-contain w-full h-full" height={44} key={company} src={company} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white z-10"></div>
      </div>
    </div>
  );
}
