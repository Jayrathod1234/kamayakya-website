"use client";
import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { HightlightText } from "./highlight-text";
import { useRouter } from "next/router";
import { Progress } from "@/components.v2/ui/progress";
import { getMixPanelClient } from "@/externals/mixpanel";
import { UserTypeTabDesktop } from "./user-type-tab-desktop";
import { UserTypeFeaturesDesktop } from "./user-type-features-desktop";

export const DEEP_RESEARCH_INVESTOR = "Deep Research Investor";
export const EFFORTLESS_INVESTOR = "Effortless Investor";
export type TUserType = typeof DEEP_RESEARCH_INVESTOR | typeof EFFORTLESS_INVESTOR;

export function UserTypeDesktopCard() {
  const [userTypeSelected, setUserTypeSelected] = useState<TUserType>(DEEP_RESEARCH_INVESTOR);
  const router = useRouter();
 
  const handleUserTabClick = (userType: TUserType) => {
    setUserTypeSelected(userType);
    const eventName = userType === DEEP_RESEARCH_INVESTOR ? "driinvestor_clicked" : "effortlessinvestor_clicked";
    const mp = getMixPanelClient();
    mp.track(eventName, {});
  };

  const handleSwitchUser = (user:TUserType)=>{
    setUserTypeSelected(user)
  }



  return (
    <div className="hidden md:block ">
      <div className=" grid grid-cols-2 grid-rows-[auto_1fr] gap-x-3 gap-y-3 ">
        <div className=" col-start-1">
          <UserTypeTabDesktop
            handleClick={() => handleUserTabClick(DEEP_RESEARCH_INVESTOR)}
            active={userTypeSelected === DEEP_RESEARCH_INVESTOR}
            usertype={DEEP_RESEARCH_INVESTOR}
            icon={
              userTypeSelected === DEEP_RESEARCH_INVESTOR
                ? "/icons/deep-research-active-icon.svg"
                : "/icons/deep-research-icon.svg"
            }
          />
        </div>
        <div className=" col-start-2 overflow-visible">
          <UserTypeTabDesktop
            // clipStyle={userTypeSelected === EFFORTLESS_INVESTOR ? rightTabStyles : ""}
            handleClick={() => handleUserTabClick(EFFORTLESS_INVESTOR)}
            active={userTypeSelected === EFFORTLESS_INVESTOR}
            usertype={EFFORTLESS_INVESTOR}
            icon={
              userTypeSelected === EFFORTLESS_INVESTOR
                ? "/icons/effortless-active-icon.svg"
                : "/icons/effortless-inactive-icon.svg"
            }
          />
        </div>
        <UserTypeFeaturesDesktop userTypeSelected={userTypeSelected} handleSwitchUser={handleSwitchUser} />
      </div>
      
    </div>
  );
}
