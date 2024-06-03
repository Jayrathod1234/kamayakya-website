import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { getMixPanelClient } from "@/externals/mixpanel";
import Image from "next/image";
import React from "react";

type TUserTypeCard = {
  imgSrc: string;
  title: string;
  attributes: string[];
  btnText: string;
};

export function UserTypeCard({ imgSrc, title, attributes, btnText }: TUserTypeCard) {
  
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
    <div className=" flex flex-col items-center min-h-[402px] min-w-[173px] gap-4 px-2 py-[10px] text-center border border-white rounded-lg backdrop-blur-[20px] bg-[linear-gradient(0deg,_#FFFFFF66_0%,_#FFFFFF66_100%)]">
      <div>
        <Image src={imgSrc} alt="user-persona" height={125} width={122} />
      </div>
      <h2 className=" text-sm font-bold text-center">{title}</h2>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="2" viewBox="0 0 45 2" fill="none">
          <path d="M0.75 1H44.25" stroke="url(#paint0_linear_3636_102082)" />
          <defs>
            <linearGradient
              id="paint0_linear_3636_102082"
              x1="48.1255"
              y1="2.25"
              x2="48.0832"
              y2="-0.0241529"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="1" stop-color="#75CDC5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className=" flex flex-col gap-3 text-sm text-gray-700">
        {attributes &&
          attributes.map((attribute, index) => (
            <p className=" text-2xs" key={index}>
              {attribute}
            </p>
          ))}
      </div>
      <div className=" mt-auto">
        <Button
          onClick={handleCheckPlan}
          size={ButtonSize.md}
          variant={ButtonVariant.primary}
          customStyle=" !px-5 !py-2 gap-[6px] min-w-[141px]"
        >
          <p className="truncate text-sm">{btnText}</p>
          <Image alt="arrow-icon" height={18} width={18} src={"/icons/arrow-down.svg"} />
        </Button>
      </div>
    </div>
  );
}
