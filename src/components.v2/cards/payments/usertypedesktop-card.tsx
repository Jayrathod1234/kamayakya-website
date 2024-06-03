"use client";
import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HightlightText } from "./highlight-text";
import { useRouter } from "next/router";
import { Progress } from "@/components.v2/ui/progress";
import { getMixPanelClient } from "@/externals/mixpanel";

export type TUserType = "Deep Research Investor" | "Effortless Investor";

type TUserSelectTab = {
  usertype: TUserType;
  icon: string;
  active: boolean;
  handleClick: () => void;
};

const UserSelectTab = ({ usertype, icon, active, handleClick }: TUserSelectTab) => {
  const leftTabStyles =
    "before:bg-[rgba(255,255,255,0.33)] before:z-20 before:backdrop-blur-xl after:z-0 after:absolute after:bottom-[-12px] after:right-[-20px] after:w-5 after:h-5 after:bg-transparent after:shadow-[-10px_10px_0px_rgba(255,255,255,0.33)] after:rounded-full";
  const rightTabStyles =
    "before:bg-[rgba(255,255,255,0.33)] before:z-20 before:backdrop-blur-xl after:z-10 after:absolute after:bottom-[-12px] after:left-[-20px] after:w-5 after:h-5 after:bg-transparent after:shadow-[10px_10px_0px_rgba(255,255,255,0.33)] after:rounded-full";
  let clipStyle =
    usertype === "Deep Research Investor" ? leftTabStyles : usertype === "Effortless Investor" ? rightTabStyles : "";
  return (
    <div onClick={handleClick} className={`relative cursor-pointer `}>
      <div
        className={` z-10 p-[18px] h-[72px] flex items-center gap-4 bg-[rgba(255,255,255,0.33)] ${
          active ? "" : "hover:bg-[rgba(255,255,255,0.72)] hover:shadow-md "
        } rounded-xl ${
          active && "rounded-b-none shadow-none pb-3"
        } backdrop-blur-[2px] sm:w-[1000px] md:w-[350px] lg:w-[492px] stroke-white stroke-1`}
      >
        <div
          className={` ${
            active ? " h-12 w-12 bg-brand-300 p-3" : "h-9 w-9 bg-white p-2"
          }  rounded-lg flex items-center justify-center`}
        >
          <Image height={active ? 32 : 18} width={active ? 32 : 18} alt="effortless-icon" src={icon} />
        </div>

        <p className={` ${active ? " text-xl font-bold text-brand-400" : "font-medium text-gray-600"} `}>{usertype}</p>
      </div>

      <div className={` bg-red before:absolute before:h-3 before:w-full  ${active && clipStyle}`}></div>
    </div>
  );
};
// relative before:z-20 before:absolute before:bottom-[-12px] before:left-0 before:w-full before:h-[24px] before:bg-white
export function UserTypeDesktopCard() {
  const [userTypeSelected, setUserTypeSelected] = useState("Deep Research Investor");
  const [progress, setProgress] = useState(0);
  const [displayPauseIcon, setDisplayPauseIcon] = useState(false);
  const router = useRouter();
  let intervalRef = useRef< NodeJS.Timer>();
  const handleUserTabClick = (userType: string) => {
    setUserTypeSelected(userType);
    const eventName = userType === "Deep Research Investor" ? "driinvestor_clicked" : "effortlessinvestor_clicked";
    const mp = getMixPanelClient();
    mp.track(eventName, {});
  };

  const handleCheckPlan = () => {
    const element =
      userTypeSelected === "Effortless Investor"
        ? document.querySelector("#effortless-section")
        : document.querySelector("#deepresearch-section");
    element?.scrollIntoView({ behavior: "smooth" });
    const eventName =
      userTypeSelected === "Deep Research Investor" ? "checkmembershipplan_clicked" : "checkeffortlessbaskets_clicked";
    const mp = getMixPanelClient();
    mp.track(eventName, {});
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the previous interval
      setProgress(0);
    }
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev + 0.5 >= 101 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, [userTypeSelected]);

  useEffect(() => {
    if (progress >= 100) {
      userTypeSelected === "Deep Research Investor"
        ? setUserTypeSelected("Effortless Investor")
        : setUserTypeSelected("Deep Research Investor");
    }
  }, [progress]);

  return (
    <div className="hidden md:block ">
      <div className=" grid grid-cols-2 grid-rows-[auto_1fr] gap-x-3 gap-y-3 ">
        <div className=" col-start-1">
          <UserSelectTab
            handleClick={() => handleUserTabClick("Deep Research Investor")}
            active={userTypeSelected === "Deep Research Investor"}
            usertype={"Deep Research Investor"}
            icon={
              userTypeSelected === "Deep Research Investor"
                ? "/icons/deep-research-active-icon.svg"
                : "/icons/deep-research-icon.svg"
            }
          />
        </div>
        <div className=" col-start-2 overflow-visible">
          <UserSelectTab
            // clipStyle={userTypeSelected === "Effortless Investor" ? rightTabStyles : ""}
            handleClick={() => handleUserTabClick("Effortless Investor")}
            active={userTypeSelected === "Effortless Investor"}
            usertype={"Effortless Investor"}
            icon={
              userTypeSelected === "Effortless Investor"
                ? "/icons/effortless-active-icon.svg"
                : "/icons/effortless-inactive-icon.svg"
            }
          />
        </div>
        <div
          onMouseLeave={() => {
            setDisplayPauseIcon(false);
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              setProgress((prev) => (prev + 0.5 >= 101 ? 0 : prev + 0.5));
            }, 100);
          }}
          onMouseEnter={() => {
            clearInterval(intervalRef.current);
            setDisplayPauseIcon(true);
            setProgress((prev) => prev);
          }}
          className={` z-10 h-full row-start-2 col-span-2 backdrop-blur-[20px] min-h-[448px] shadow-[4px_32px_50px_0px_rgba(1,24,33,0.08)]`}
        >
          <div
            className={`flex bg-[rgba(255,255,255,0.33)] rounded-xl h-full ${
              userTypeSelected === "Deep Research Investor" ? "rounded-tl-none" : " rounded-tr-none"
            }`}
          >
            <div className=" flex flex-col pl-10 pt-12 pb-[17px] w-[360px] h-full ">
              <ul className=" flex flex-col gap-y-6">
                <li className=" flex gap-3 items-start">
                  <Image height={18} width={18} alt="list-icon" src={"/icons/effortless-inactive-icon.svg"} />
                  <p className=" text-gray-700">
                    I do not have <HightlightText>time</HightlightText> or <HightlightText>knowledge</HightlightText> to
                    take my own investment decision.
                  </p>
                </li>
                <li className=" flex gap-3 items-start">
                  <Image height={18} width={18} alt="list-icon" src={"/icons/effortless-inactive-icon.svg"} />
                  <p className=" text-gray-700">
                    I do not have <span className=" underline">time</span> or <span>knowledge</span> to take my own
                    investment decision.
                  </p>
                </li>
              </ul>
              <Button
                onClick={handleCheckPlan}
                variant={ButtonVariant.primary}
                size={ButtonSize.lg}
                customStyle=" !py-2 gap-[6px] mt-auto w-fit mb-10"
              >
                <span className=" whitespace-nowrap truncate text-md font-medium">
                  {userTypeSelected === "Deep Research Investor"
                    ? "Check Membership Plans"
                    : "Check Effortless Baskets"}
                </span>
                <Image alt="arrow-icon" height={18} width={18} src={"/icons/arrow-down.svg"} />
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className=" w-full flex relative overflow-visible">
        <div className="  bg-white mt-auto w-full">
          <Progress className=" h-[6px] bg-white" value={progress} />
        </div>
        {displayPauseIcon && (
          <div
            style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
            className=" flex justify-end absolute w-full -top-[16px] -right-[16px] z-40"
          >
            <svg
              height={42}
              width={42}
              className=" inline-block"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="icon-park:pause-one" filter="url(#filter0_d_4501_136384)">
                <g id="Group">
                  <g id="Vector" filter="url(#filter1_d_4501_136384)">
                    <path
                      d="M20.9998 26.3337C25.6022 26.3337 29.3332 22.6027 29.3332 18.0003C29.3332 13.398 25.6022 9.66699 20.9998 9.66699C16.3975 9.66699 12.6665 13.398 12.6665 18.0003C12.6665 22.6027 16.3975 26.3337 20.9998 26.3337Z"
                      fill="#F8FFFE"
                    />
                  </g>
                  <path
                    id="Vector_2"
                    d="M18.9165 15.5V20.5"
                    stroke="#17756C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M23.083 15.5V20.5"
                    stroke="#17756C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_4501_136384"
                  x="5"
                  y="4"
                  width="32"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="3" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4501_136384" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4501_136384" result="shape" />
                </filter>
                <filter
                  id="filter1_d_4501_136384"
                  x="0.666504"
                  y="0.666992"
                  width="40.6667"
                  height="40.667"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4501_136384" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4501_136384" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
