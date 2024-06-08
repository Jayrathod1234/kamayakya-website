import React from "react";
import { TUserType } from "./user-type-desktop-card";
import Image from "next/image";

type TUserTypeTabDesktop = {
  usertype: TUserType;
  icon: string;
  active: boolean;
  handleClick: () => void;
};

const commonStyle =
  "before:bg-[rgba(255,255,255,0.33)] before:z-20 before:backdrop-blur-xl after:absolute after:bottom-[-12px] after:w-5 after:h-5 after:bg-transparent after:rounded-full";

const leftTabStyles =
  commonStyle +
  " after:z-0 after:absolute after:bottom-[-12px] after:right-[-20px]  after:shadow-[-10px_10px_0px_rgba(255,255,255,0.33)] ";
const rightTabStyles =
  commonStyle +
  " after:z-10 after:absolute after:bottom-[-12px] after:left-[-20px] after:shadow-[10px_10px_0px_rgba(255,255,255,0.33)]";

export function UserTypeTabDesktop({ usertype, icon, active, handleClick }: TUserTypeTabDesktop) {
  const tabActiveHoverStyle = active ? "" : "hover:bg-[rgba(255,255,255,0.72)] hover:shadow-md ";
  const tabRadiusStyle = usertype === "Deep Research Investor" ? " rounded-br-none" : " rounded-bl-none";
  const tabActiveStyle = active && "rounded-b-none shadow-none pb-3";
  const clipStyle =
    usertype === "Deep Research Investor" ? leftTabStyles : usertype === "Effortless Investor" ? rightTabStyles : "";
  const iconDimension = active ? 32 : 20;
  const iconbg = active ? " h-12 w-12 bg-brand-300 p-3" : "h-9 w-9 bg-white p-2";
  const tabFontStyle = active ? " text-xl font-medium text-brand-400" : " text-gray-600";

  return (
    <div onClick={handleClick} className={`relative cursor-pointer `}>
      <div
        className={` z-10 p-[18px] h-[72px] flex items-center gap-4 bg-[rgba(255,255,255,0.33)] rounded-xl ${tabActiveHoverStyle} ${tabRadiusStyle} ${tabActiveStyle} backdrop-blur-[2px] sm:w-[1000px] md:w-[350px] lg:w-[492px] stroke-white stroke-1`}
      >
        <div className={` ${iconbg}  rounded-lg flex items-center justify-center `}>
          <Image height={iconDimension} width={iconDimension} alt="effortless-icon" src={icon} />
        </div>
        <p className={`${tabFontStyle}`}>{usertype}</p>
      </div>

      <div className={` bg-red before:absolute before:h-3 before:w-full   ${active && clipStyle}`}></div>
    </div>
  );
}
