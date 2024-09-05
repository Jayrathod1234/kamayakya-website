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
      <p className="text-display-xs font-bold text-[#F8F8F8] font-open_sans pb-3 tracking-normal">
        Elevate Your Investments with KamayaKya!
      </p>
      {/* <p className="text-display-xs font-semibold text-[#F8F8F8] font-open_sans">
        Access exclusive insights with
      </p> */}
      <p className="text-base sm:text-md font-normal text-white/[0.64] font-open_sans leading-7 tracking-normal">
        Access exclusive insights with
        <span className="text-white/[0.80] font-semibold leading-7">
          30+ Main Board and 10+ SME Premium stock
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
          <p className="text-display-xs font-bold text-[#F8F8F8] font-open_sans">
            Elevate Your Investments with KamayaKya!
          </p>
          <p className="text-base sm:text-md font-normal text-white opacity-35 font-open_sans">
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
          <p className="text-display-xs font-bold text-[#F8F8F8] font-open_sans">
            Elevate Your Investments with KamayaKya!
          </p>
          <p className="text-base sm:text-md font-normal text-white opacity-35 font-open_sans">
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
    <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto -mt-16  m-0 ">
      <div className="p-[24px] sm:p-[56px] rounded-[20px] bg-custom-gradient-3 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden z-[55] top-[38px] sm:top-[102px]">
        <div className="absolute bottom-[2px] left-[20%] sm:left-[53%] -z-10 opacity-40">
          <img
            src="/assets/Group.png"
            alt="Decoration"
            className="w-[200px] sm:w-[376px] rotate-[-9.288deg]"
          />
        </div>
        <div>{content}</div>
        <div className="relative group mt-4 sm:mt-0 sm:ms-auto">
          <div className="relative w-[12.5rem] sm:w-48 h-12 opacity-90 border-[1px] border-transparent duration-300 overflow-hidden rounded-xl bg-black z-10 group-hover:bg-transparent group-hover:border-[#03D6DA] group-hover:scale-[000.9] group-hover:duration-500  group-hover:shadow-become-member  group-hover:border-[1px]  ">
            <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transition-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 group-hover:hidden"></div>
            <div className="absolute flex items-center text-center justify-center text-white z-[1] opacity-90 rounded-[0.6rem] inset-0.5 bg-black group-hover:bg-transparent">
              <Link href={`/pricing`}>
                <button
                  name="text"
                  className="input items-center flex gap-[6px] font-medium text-md h-full opacity-90 w-full rounded-xl bg-black group-hover:bg-transparent !text-white font-open_sans"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.2993 1.5H2.72505C2.00838 1.5 1.42505 2.08333 1.42505 2.8V6C1.42505 6.71667 2.00838 7.3 2.72505 7.3H7.43267V11.3333L6.86601 10.7667C6.44934 10.35 5.79934 10.2833 5.29934 10.6167C5.01601 10.8167 4.81601 11.1167 4.76601 11.4667C4.71601 11.8167 4.81601 12.1667 5.03267 12.4333L7.29934 15.1667C8.01601 16.0167 9.04934 16.5 10.1493 16.5H11.566C12.4493 16.5 13.266 16.1667 13.8827 15.5333C14.516 14.9167 14.8493 14.1 14.8493 13.2167V10.4167C14.8493 9.75 14.2993 9.2 13.6327 9.2C13.4327 9.2 13.2327 9.25 13.0493 9.35C12.8327 8.95 12.4327 8.7 11.966 8.7C11.766 8.7 11.566 8.75 11.3827 8.85C11.166 8.45 10.766 8.2 10.2993 8.2C10.1493 8.2 9.99934 8.23333 9.866 8.28333V7.31667H15.2827C15.9993 7.31667 16.5827 6.73333 16.5827 6.01667V2.8C16.5993 2.08333 16.016 1.5 15.2993 1.5ZM15.766 6C15.766 6.26667 15.5493 6.48333 15.2993 6.48333H9.88267V5.93333C9.88267 5.6 9.74934 5.3 9.51601 5.06667C9.28267 4.83333 8.98267 4.71667 8.64934 4.71667C7.98267 4.71667 7.43267 5.26667 7.43267 5.93333V6.48333H2.72505C2.45838 6.48333 2.25838 6.26667 2.25838 6V2.8C2.25838 2.53333 2.47505 2.31667 2.72505 2.31667H15.2993C15.566 2.31667 15.766 2.53333 15.766 2.8V6Z"
                      fill="white"
                    />
                  </svg>
                  {buttonText}
                </button>
              </Link>
            </div>
            <div className="absolute transition-all duration-2500 animate-spin w-full h-[47px] bg-gradient-to-r from-white to-black blur-[30px] group-hover:hidden "></div>
          </div>
        </div>
        <div className="absolute right-[-10px] sm:right-[-178px] bottom-[-69px] z-0">
          <img
            src="/assets/Group 1.png"
            alt="Decoration"
            className="w-[400px] sm:w-[570px]"
          />
        </div>
      </div>
    </div>
  );
}

export default ElevateSection;
