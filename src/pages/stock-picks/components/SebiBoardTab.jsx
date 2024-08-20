import React from "react";
import { ButtonnArrow } from "@/components.v2/button/btn-arrow-icon.tsx";
import { getMixPanelClient } from "@/externals/mixpanel";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button.tsx";
import StocksTab from "@/components.v3/common/StocksTab.jsx";

function SebiBoardTab({ setSebiBoardType }) {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("contactus_clicked", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    mp.track("asktheteam_loaded", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    window.open(
      "Kamayakya-SEBI-License.pdf#toolbar=0&fitH=1",
      "_blank",
      "fullscreen=yes"
    );
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-full">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover"
        >
          <source
            src="/assets/-7d58-4850-b149-dc7147331e8d.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 left-0 h-full w-full">
          <img
            src="/assets/bg-vector.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative w-full max-w-[1280px] min-w-[328px] mx-auto px-4 max-h-[700px] md:max-h-[950px]">
        <div className="min-w-[280px] md:min-w-[470px] z-5 text-center relative">
          <div className="pt-6 pb-5 md:pt-9 md:pb-[22px] flex justify-center">
            <ButtonnArrow
              onClick={handleContactButton}
              variant={ButtonVariant.sebi}
              size={ButtonSize.lg}
            >
              SEBI Registered: INH000009843
            </ButtonnArrow>
          </div>
          <h1 className="text-[28px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-[32px] md:leading-[40px] text-white mb-6 md:mb-8 flex justify-center">
            Discover hidden gems! 💎
          </h1>
          <div className="flex justify-center">
            <StocksTab setSebiBoardType={setSebiBoardType} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SebiBoardTab;
