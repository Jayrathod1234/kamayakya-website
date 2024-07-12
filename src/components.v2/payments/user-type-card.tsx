import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { getMixPanelClient } from "@/externals/mixpanel";
import Image from "next/image";
import React from "react";

type TUserTypeCard = {
  imgSrc: string;
  title: string;
  attributes: React.ReactNode[];
  btnText: string;
  icon: string;
};

export function UserTypeCard({ imgSrc, title, attributes, btnText, icon }: TUserTypeCard) {
  const handleCheckPlan = () => {
    const element =
      title === "Effortless Investor"
        ? document.querySelector("#effortless-section")
        : document.querySelector("#deepresearch-section");
    element?.scrollIntoView({ behavior: "smooth" });
    const eventName =
      title === "Deep Research Investor" ? "checkmembershipplan_clicked" : "checkeffortlessbaskets_clicked";
    const mp = getMixPanelClient();
    mp.track(eventName, {});
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-[402px] max-h-[412px] w-[173px] gap-x-2 p-2 pb-[10px] text-center border border-white rounded-lg backdrop-blur-[20px] bg-[linear-gradient(0deg,_#FFFFFF66_0%,_#FFFFFF66_100%)]">
      <div>
        <Image src={imgSrc} alt="user-persona" height={125} width={122} />
      </div>
      <h2 className=" text-sm font-bold text-center">{title}</h2>
      <div className=" relative w-full flex justify-center items-center">
        <div className=" absolute h-[1px] w-1/2 z-0 opacity-50 bg-[radial-gradient(50%_50%_at_50%_50%,#75CDC5_66.5%,rgba(196,255,250,0.48)_100%)]"></div>
        <div className=" h-[18px] relative z-10 aspect-square rounded-full bg-[linear-gradient(rgba(18,91,84,1),rgba(18,173,183,1))] flex justify-center items-center">
          <Image src={icon} alt="user-type-icon" height={10} width={10} />
        </div>
        
      </div>
      <div className=" flex flex-col gap-y-3 text-sm text-gray-700 mt-[10px]">
        {attributes &&
          attributes.map((attribute, index) => (
            <p className=" text-2xs m-0" key={index}>
              {attribute}
            </p>
          ))}
      </div>
      <div className=" mt-auto">
        <Button
          onClick={handleCheckPlan}
          size={ButtonSize.md}
          variant={ButtonVariant.primary}
          customStyle=" !px-3 !py-2 gap-[6px] min-w-[141px]"
        >
          <p className="truncate text-sm">{btnText}</p>
          <Image alt="arrow-icon" height={18} width={18} src={"/icons/arrow-down.svg"} />
        </Button>
      </div>
    </div>
  );
}
