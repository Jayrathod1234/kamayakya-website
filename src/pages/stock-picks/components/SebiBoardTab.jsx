import React from "react";
import { ButtonnArrow } from "@/components.v2/button/btn-arrow-icon.tsx";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button.tsx";
import StocksTab from "@/components.v3/common/StocksTab.jsx";

function SebiBoardTab() {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("sebi_registered_clicked", {
      page: "StockPicks_Page",
    });
    window.open(
      "Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
      "_blank",
      "fullscreen=yes"
    );
  };

  return (
    <>
      <div className="absolute top-[-57px] left-0 w-full sm:h-[300px] h-[335px] md:h-full">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="hidden sm:block h-full w-full object-cover"
        >
          <source
            src="/assets/-7d58-4850-b149-dc7147331e8d.mp4"
            type="video/mp4"
          />
        </video>
        <video
          autoPlay
          muted
          playsInline
          loop
          className="block sm:hidden h-full w-full object-cover"
        >
          <source
            src="/assets/mobile_hero_bg.webm"
            type="video/webm"
          />
        </video>
        <div className="absolute top-0 left-0 h-full w-full opacity-40">
          <img
            src="/assets/bg-vector.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative w-full max-w-[1280px] min-w-[328px] mx-auto px-4 max-h-[700px] md:max-h-[950px]">
        <div className="min-w-[280px] md:min-w-[470px] z-5 text-center relative">
          <div className="pt-5 pb-3 md:pt-9 md:pb-[16px] flex justify-center">
            <ButtonnArrow
              onClick={handleContactButton}
              variant={ButtonVariant.sebi}
              size={ButtonSize.lg}
            >
              SEBI Registered: INH000009843
            </ButtonnArrow>
          </div>
          <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[30px] font-bold leading-[32px] md:leading-[38px] text-white mb-9 md:mb-9  flex justify-center">
            Discover hidden gems! 💎
          </h1>
          <div className="flex justify-center">
            <StocksTab />
          </div>
        </div>
      </div>
    </>
  );
}

export default SebiBoardTab;
