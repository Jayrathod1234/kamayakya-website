import { Button } from "@/components.v2/button";
import { ButtonSize, ButtonVariant } from "@/components.v2/button/button";
import Image from "next/image";
import React from "react";

export function SmallCaseCard() {
  return (
    <div className="overflow-hidden relative px-5 py-7 bg-[#1E7AE0] rounded-xl flex flex-col md:flex-row justify-center items-center gap-6 text-center md:h-[26.14769rem]">
      <div className="">
      <img className=" absolute inline-block object-cover right-0 top-0" src="/pricing/confetti-right.png" alt="" 
        width="50%" 
        height="413px" 
        />
        <img className=" absolute inline-block object-cover left-0 top-0" src="/pricing/confetti-left.png" alt="" 
        width="50%" 
        height="413px" 
        />
      </div>
      <div className=" text-white flex flex-col items-center justify-center md:items-start md:max-w-[484px] md:text-start">
        <p className=" text-2xs md:text-sm font-medium mb-1 uppercase">KamayaKya Smallcase Basket</p>
        <h3 className=" font-bold text-display-xs md:text-display-md mb-3">For Effortless Investors</h3>
        <p className=" text-md text-gray-200">
          Get access to professionally created basket of stocks. Invest in multiple stocks in 1 click{" "}
        </p>
        <div className=" md:mt-[41px]">
          <Button variant={ButtonVariant.primary} size={ButtonSize.lg} customStyle=" bg-white !border-white ">
            <p className=" text-brand-500">Go to Smallcase</p>
          </Button>
        </div>
      </div>

      <div className="">
        <Image className="md:hidden" height={192} width={318} src="/smallcase_ss.png" alt="smallcase-screenshot" />
        <Image
          className=" hidden md:inline-block"
          height={254}
          width={424}
          src="/smallcase_ss_desktop.png"
          alt="smallcase-screenshot"
        />
        <div className="w-full md:w-[30rem] h-[9.5625rem] bg-[rgba(255,_255,_255,_0.20)] rounded-b-2xl absolute bottom-0 left-0 md:relative md:mt-[-28%]"></div>
      </div>
    </div>
  );
}
