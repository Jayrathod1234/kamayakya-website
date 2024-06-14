import React, { useEffect, useRef, useState } from "react";
import { DEEP_RESEARCH_INVESTOR, EFFORTLESS_INVESTOR, TUserType } from "./user-type-desktop-card";
import { getMixPanelClient } from "@/externals/mixpanel";
import Image from "next/image";
import { HightlightText } from "./highlight-text";
import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { UserTypProgress } from "./user-type-progress";
import { DEEP_RESEARCH_INVESTOR_FEATURES, EFFORTLESS_INVESTOR_FEATURES } from "@/constants/index.constants";
import { FeatureListDesktop } from "./feature-list-desktop";
import Lottie from 'react-lottie';
import * as DEEP_RESEARCH_LOTTIE from '../../../public/pricing/deep-research-investor.json'

type TUserTypeFeaturesDesktop = {
  userTypeSelected: TUserType;
  handleSwitchUser: (user: TUserType) => void;
};

export function UserTypeFeaturesDesktop({ userTypeSelected, handleSwitchUser }: TUserTypeFeaturesDesktop) {
  const [progress, setProgress] = useState(0);
  const [displayPauseIcon, setDisplayPauseIcon] = useState(false);
  const bulletIcon =
    userTypeSelected === DEEP_RESEARCH_INVESTOR
      ? "/icons/deep-research-bullet-icon.svg"
      : "/icons/effortless-bullet-icon.svg";
  const features =
    userTypeSelected === DEEP_RESEARCH_INVESTOR ? DEEP_RESEARCH_INVESTOR_FEATURES : EFFORTLESS_INVESTOR_FEATURES;
  const intervalRef = useRef<NodeJS.Timer>();
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData:DEEP_RESEARCH_LOTTIE,
    //  userTypeSelected === DEEP_RESEARCH_INVESTOR ?"/pricing/deep-research-investor.json":"/pricing/effortless-investor.json",
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const onMouseEnter = () => {
    clearInterval(intervalRef.current);
    setDisplayPauseIcon(true);
    setProgress((prev) => prev);
  };

  const onMouseLeave = () => {
    setDisplayPauseIcon(false);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev + 0.5 >= 101 ? 0 : prev + 0.5));
    }, 100);
  };

  const handleCheckPlan = () => {
    const element =
      userTypeSelected === EFFORTLESS_INVESTOR
        ? document.querySelector("#effortless-section")
        : document.querySelector("#deepresearch-section");
    element?.scrollIntoView({ behavior: "smooth" });
    const eventName =
      userTypeSelected === DEEP_RESEARCH_INVESTOR ? "checkmembershipplan_clicked" : "checkeffortlessbaskets_clicked";
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
      handleSwitchUser(userTypeSelected === DEEP_RESEARCH_INVESTOR ? EFFORTLESS_INVESTOR : DEEP_RESEARCH_INVESTOR);
    }
  }, [progress]);
  return (
    <div
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      className={` z-10 h-full row-start-2 col-span-2 backdrop-blur-[20px] min-h-[448px] shadow-[4px_32px_50px_0px_rgba(1,24,33,0.08)]`}
    >
      <div
        className={`flex justify-between items-center bg-[rgba(255,255,255,0.33)] rounded-xl h-full ${
          userTypeSelected === DEEP_RESEARCH_INVESTOR ? "rounded-tl-none" : " rounded-tr-none"
        }`}
      >
        <div className=" flex flex-col p-10  pb-[17px] w-full max-w-[360px] lg:max-w-[400px] h-full ">
          <ul className=" flex flex-col gap-y-6">
            {features.map((feature) => (
              <FeatureListDesktop feature={feature} bulletIcon={bulletIcon} />
            ))}
          </ul>
          <Button
            onClick={handleCheckPlan}
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            customStyle=" !py-2 gap-[6px] mt-auto w-fit mb-10"
          >
            <span className=" whitespace-nowrap truncate text-md font-medium">
              {userTypeSelected === DEEP_RESEARCH_INVESTOR ? "Check Membership Plans" : "Check Effortless Baskets"}
            </span>
            <Image alt="arrow-icon" height={18} width={18} src={"/icons/arrow-down.svg"} />
          </Button>
        </div>
        <div className=" md:w-[350px] lg:w-[523px] mx-auto flex justify-center items-center">
          {/* <video className=" w-[80%] aspect-square" width={523} height={343} src={userTypeSelected === DEEP_RESEARCH_INVESTOR ?"/pricing/deep_investor.webm":"/pricing/effortless_investor.webm"} muted autoPlay loop></video> */}
          <Lottie options={defaultOptions}
              height={480}
              width={480}
              // isStopped={this.state.isStopped}
              // isPaused={this.state.isPaused}
              />
        </div>
      </div>
      <UserTypProgress progress={progress} displayPauseIcon={displayPauseIcon} />
    </div>
  );
}
