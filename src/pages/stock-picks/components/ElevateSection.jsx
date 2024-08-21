import React, { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import Link from "next/link";
function ElevateSection() {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Determine if the user is a VIP user
  const isVipUser = user?.subscription?.some((sub) => sub.plan === "vip");

  if (isVipUser) {
    // If VIP user, hide the section
    return null;
  }

  // Default content and button text
  let content = (
    <>
      <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
        Elevate Your Investments with KamayaKya!
      </p>
      <p className="text-base sm:text-lg font-normal text-white opacity-35 font-open_sans">
        Access exclusive insights with{" "}
        <span className="text-white">
          30+ Main Board and 10+ SME Premium stock{" "}
        </span>
        picks every year
      </p>
    </>
  );
  let buttonText = "Become a Member";

  // Update content based on subscription plan if logged in
  if (isLoggedIn) {
    const plan = user?.subscription?.[0]?.plan;
    if (plan === "core") {
      content = (
        <>
          <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
            Elevate Your Investments with KamayaKya!
          </p>
          <p className="text-base sm:text-lg font-normal text-white opacity-35 font-open_sans">
            Access exclusive insights to{" "}
            <span className="text-white">10+ Premium SME </span>stock picks
            every year
          </p>
        </>
      );
      buttonText = "Upgrade Now";
    } else if (plan === "advance") {
      content = (
        <>
          <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
            Elevate Your Investments with KamayaKya!
          </p>
          <p className="text-base sm:text-lg font-normal text-white opacity-35 font-open_sans">
            Access exclusive Insights to{" "}
            <span className="text-white">30+ Main Board </span>stock picks every
            year
          </p>
        </>
      );
      buttonText = "Upgrade Now";
    }
  }

  return (
    <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto mt-8 sm:mt-16">
      <div className="p-[24px] sm:p-[56px] rounded-[20px] bg-custom-gradient-3 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden z-[555] top-[102px]">
        <div className="absolute bottom-[2px] left-[20%] sm:left-[41%]">
          <img
            src="/assets/Group.png"
            alt="Decoration"
            className="w-[200px] sm:w-[376px] rotate-[-9.288deg]"
          />
        </div>
        <div>{content}</div>
        <div className="relative group mt-4 sm:mt-0 sm:ms-auto">
          <div className="relative w-44 sm:w-48 h-12 opacity-90 border-[1px] border-transparent duration-300 overflow-hidden rounded-xl bg-black z-10 group-hover:bg-transparent group-hover:border-[#03D6DA] group-hover:border-[1px] group-hover:px-4 group-hover:w-52 group-hover:-me-5 group-hover:h-10 group-hover:ms-5 group-hover:shadow-6xs">
            <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 group-hover:hidden"></div>
            <div className="absolute flex items-center text-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-black group-hover:bg-transparent">
              <Link href={`/pricing`}>
                <button
                  name="text"
                  className="input font-medium text-sm h-full opacity-90 w-full rounded-xl bg-black group-hover:bg-transparent !text-white"
                >
                  {buttonText}
                </button>
              </Link>
            </div>
            <div className="absolute transition-all duration-2000 animate-spin w-full h-[100px] bg-gradient-to-r from-white to-black blur-[30px] group-hover:hidden"></div>
          </div>
        </div>
        <div className="absolute right-[-10px] sm:right-[-31px] bottom-[-95px] z-0">
          <img
            src="/assets/Group 1.png"
            alt="Decoration"
            className="w-[400px] sm:w-[620px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ElevateSection;
