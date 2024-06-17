import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import { getMixPanelClient } from "@/externals/mixpanel";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SmallcaseEmbed from "./smallcase-embed";

export function SmallCaseCard() {
  const handleSmallCaseClick = () => {
    const mp = getMixPanelClient();
    mp.track("GoToSmallcase_clicked", {
      page: "Pricing_Page",
    });
  };

  return (
    // lg:px-[136px]
    <div id="effortless-section" className=" pt-5">
    <div  className="lg:gap-x-11 lg:flex-nowrap  overflow-hidden relative p-7 px-[1.25rem] md:px-[1.95rem]  bg-[#1E7AE0] rounded-xl flex flex-col md:flex-row justify-center items-center gap-6 text-center md:h-[27.125rem] lg:bg-[url(/effortless_investors_bg.svg)] bg-cover bg-no-repeat">
      <div className=" text-white flex flex-col items-center justify-center md:items-start md:max-w-[484px] md:text-start">
        <p className=" text-2xs md:text-sm font-medium mb-1 uppercase">KamayaKya Smallcase Basket</p>
        <h3 className=" font-bold text-display-xs md:text-display-md mb-3">For Effortless Investors</h3>
        <p className=" text-md text-gray-200">
          Get access to professionally created basket of NSE stocks. Invest in multiple stocks in 1 click{" "}
        </p>
        <div className=" mt-6 md:mt-[41px]">
          <Button
            endIcon={<MoveRight className=" text-inherit" />}
            onClick={handleSmallCaseClick}
            variant={ButtonVariant.primary}
            size={ButtonSize.lg}
            customStyle=" bg-white hover:bg-brand-300 !border-white hover:!border-brand-300 text-brand-500 "
          >
            <Link className=" text-inherit" target="_blank" href={"https://kamayakya.smallcase.com/#portfolios"}>
              <p className=" ">Go to smallcase</p>
            </Link>
          </Button>
          <p className=" text-2xs text-[rgba(255,255,255,0.64)] mt-[6px]">*No BSE and SME Stocks</p>
        </div>
      </div>

      <div  className="max-w-[480px] w-full flex flex-col justify-center items-center  h-[378px] rounded-lg overflow-hidden ">
        <SmallcaseEmbed />
        {/* <Image className="" height={192} width={318} src="/smallcase_ss.png" alt="smallcase-screenshot" /> */}
       
        {/* <div className=" z-0 w-full max-w-full lg:w-[36rem] h-[9.5625rem] bg-[rgba(255,_255,_255,_0.20)] rounded-b-2xl relative mt-[-20%]"></div>  */}
      </div>
    </div>
    </div>
  );
}
