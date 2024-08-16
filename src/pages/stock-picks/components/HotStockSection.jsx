import React, { useState } from "react";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button.tsx";
import ProgressBar2 from "@/components.v3/common/ProgressBar2.jsx";
import { ButtonnArrow } from "@/components.v2/button/btn-arrow-icon.tsx";
import DeepValue from "@/components.v3/common/DeepValue.jsx";
import HotStockSectionSlider from "../../../components.v3/common/HotStockSectionSlider";

const HotStockSection = () => {
  const [sebiBoardType, setSebiBoardType] = useState("mainboard");
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
  };

  // const handleSelect = (value) => {
  //   console.log("Selected:", value);
  // };
  return (
    <div>
      <div className="relative z-[2] pb-[110px] mt-[20px]">
        <div className="container mx-auto">
          <div className="bg-gray-150 p-[10px] rounded-[20px]">
            <div className="bg-[#fff] bg-[url('/assets/grid.png')] bg-cover rounded-[20px] px-10 py-8 gap-10 text-center">
              <div className=" pt-5   rounded-[10px]">
                <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                  Hot Stocks (3)
                </h2>
                <p className="pt-3 font-normal text-sm text-gray-500 pb-6">
                  Top stocks to invest in right NOW!
                </p>
                <HotStockSectionSlider sebiBoardType={sebiBoardType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotStockSection;
