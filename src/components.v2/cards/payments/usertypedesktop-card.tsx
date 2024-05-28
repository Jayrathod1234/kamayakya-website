"use client";
import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import Image from "next/image";
import React, { useState } from "react";
import { HightlightText } from "./highlight-text";
import { useRouter } from "next/router";

export type TUserType = "Deep Research Investor" | "Effortless Investor"


type TUserSelectTab = {
  usertype: TUserType;
  icon: string;
  active: boolean;
  handleClick: () => void;
};

const UserSelectTab = ({ usertype, icon, active, handleClick }:TUserSelectTab) => {
  const leftTabStyles =
    "before:bg-[rgba(255,255,255,0.33)] before:z-20 before:backdrop-blur-xl after:z-0 after:absolute after:bottom-[-12px] after:right-[-20px] after:w-5 after:h-5 after:bg-transparent after:shadow-[-10px_10px_0px_rgba(255,255,255,0.33)] after:rounded-full";
  const rightTabStyles =
    "before:bg-[rgba(255,255,255,0.33)] before:z-20 before:backdrop-blur-xl after:z-10 after:absolute after:bottom-[-12px] after:left-[-20px] after:w-5 after:h-5 after:bg-transparent after:shadow-[10px_10px_0px_rgba(255,255,255,0.33)] after:rounded-full";
  let clipStyle =
    usertype === "Deep Research Investor" ? leftTabStyles : usertype === "Effortless Investor" ? rightTabStyles : "";
  return (
    <div onClick={handleClick} className={`relative cursor-pointer`}>
      <div
        className={` z-10 p-[18px] h-[72px] flex items-center gap-4 bg-[rgba(255,255,255,0.33)] shadow-md rounded-xl ${
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
  const router = useRouter();
  const handleClick = (userType: string) => {
    setUserTypeSelected(userType);
  };

  return (
    <div className="hidden md:block ">
      <div className=" grid grid-cols-2 grid-rows-[auto_1fr] gap-x-3 gap-y-3 ">
        <div className=" col-start-1">
          <UserSelectTab
            handleClick={() => handleClick("Deep Research Investor")}
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
            handleClick={() => handleClick("Effortless Investor")}
            active={userTypeSelected === "Effortless Investor"}
            usertype={"Effortless Investor"}
            icon={
              userTypeSelected === "Effortless Investor"
                ? "/icons/effortless-active-icon.svg"
                : "/icons/effortless-inactive-icon.svg"
            }
          />
        </div>
        <div className={` z-10 h-full row-start-2 col-span-2 backdrop-blur-[20px] min-h-[448px] `}>
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
              <Button onClick={()=>router.push( userTypeSelected === "Effortless Investor" ?"#effortless-section" : "#deepresearch-section")} variant={ButtonVariant.primary} size={ButtonSize.lg} customStyle=" !py-2 gap-[6px] mt-auto w-fit mb-10">
                <span className=" whitespace-nowrap truncate text-md font-medium">Check Effortless Baskets</span>
                <Image alt="arrow-icon" height={18} width={18} src={"/icons/arrow-down.svg"} />
              </Button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className=" h-[23px] w-full bg-red-300"></div>
    </div>
  );
}
