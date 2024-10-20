import { ButtonnArrow } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import React from "react";
import HeroCardSection from "./HeroCardSection";
import { getMixPanelClient } from "@/externals/mixpanel";

export default function TrackRecordHero() {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("sebi_registered_clicked", {
      page: "TrackRecord_Page",
    });
    window.open("Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1", "_blank", "fullscreen=yes");
  };
  
  return (
    <div className=" relative h-full bg-[length:100vw_616px]">
      <div className=" w-full h-full  absolute overflow-hidden z-10 -top-[20%]">
        <div className=" h-[900px] w-[800px] bg-[#139499] absolute z-20 blur-3xl rounded-full opacity-[.15] -left-[10%] -top-10"></div>
        <div className=" h-[900px] w-[800px] bg-[#12B76A] absolute z-20 blur-3xl rounded-full opacity-[.15] -right-[20%] -top-[60%]"></div>
      </div>
      <div className=" bg-[url(/assets/track-record-hero.png)] bg-black absolute w-screen h-[650px] z-[1] mt-[-4rem]"></div>
      {/* hero text section */}
      <div className=" py-9 flex flex-col items-center justify-center relative z-10">
        {/* Sebi chip */}

        <div className="pt-5 pb-3 md:pt-9 md:pb-[16px] flex justify-center">
          <ButtonnArrow onClick={handleContactButton} variant={ButtonVariant.sebi} size={ButtonSize.lg}>
            SEBI Registered: INH000009843
          </ButtonnArrow>
        </div>
        {/* Sebi chip end */}
        {/* heading and subtext */}
        <h1 className=" text-display-lg font-bold text-white mt-4 mb-3 z-10 text-center">Unveiling Our Track Record</h1>
        <p className=" text-md text-[rgba(208,213,221,1)] z-10 text-center min-w-[328px] mx-auto">
          Our victories, our misses - all in the open. Your trust is earned, not assumed
        </p>
        {/* heading and subtext end  */}
      </div>
      {/* hero text section end */}
      {/* hero chart section */}
      <HeroCardSection />
      {/* hero chart section end  */}
    </div>
  );
}
