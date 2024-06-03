import React, { useRef } from "react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button as ShadBtn } from "../ui/button";
import { Input } from "../ui/input";
import { Button } from "../button";
import { ButtonSize, ButtonVariant } from "../button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components.v2/ui/dialog";
import { getMixPanelClient } from "@/externals/mixpanel";

import { MoveRight } from "lucide-react";
import { ContactModal } from "./contact-modal";


export function ContactUs() {
  const handlePhoneNoSubmit = () => {
    const mp = getMixPanelClient();
    mp.track("mobileno_submitted", {
      page: "Pricing_Page",
      mobilenumber: "value",
    });
  };

  const handleContactUsModal = () => {
    const mp = getMixPanelClient();
    mp.track("asktheteam_loaded", {
      page: "Pricing_Page",
      pagegroup: "feeling_lost",
    });
  };

  return (
    // bg-blend-color-burn bg-cover
    <div className=" bg-[url(/feeling_lost_bg.webp)] text-white bg-no-repeat bg-cover md:mt-[60px]">
      {/* <div className=" overflow-hidden relative w-[calc(100vw+24rem)] ml-[-10%] h-[500px] flex items-center justify-center max-lg:h-[400px] max-md:h-[200px]">
        <svg
          className=" absolute left-0 top-1 w-[95%] h-[100%] mt-[-8%]"
          viewBox="0 0 1730 331"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M408.604 272.328C262.849 226.673 196.644 195.068 143.782 254.306L107.726 297.796C102.68 303.882 92.8995 301.982 90.4993 294.449L1.15351 14.0358C-0.901677 7.58562 3.91181 1 10.6815 1H368.573H1701.54C1705.77 1 1709.55 3.62405 1710.88 7.63918C1725.95 53.2116 1743.75 141.901 1708.6 254.306C1662.41 401.985 1148.95 302.45 1033.71 254.306C758.109 139.167 590.798 329.397 408.604 272.328Z"
            fill="#F9F9FB"
            stroke="#F9FAFB"
          />
        </svg> 
      </div> */}
      <div className=" py-[60px] md:pt-[470px] md:pb-[415px]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 place-content-center place-items-center w-[min(1200px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className=" md:col-start-2 md:row-start-1 pt-[71px] md:pt-0">
            <Image className=" md:hidden" height={85} width={131} src={"/ship.svg"} alt="ship" />
            <Image className="hidden md:inline-block" height={115} width={177} src={"/ship.svg"} alt="ship" />
          </div>
          <div className="md:col-start-1 md:row-start-1  text-center md:text-left ">
            <div className=" pt-[60px]">
              <h2 className=" text-display-sm md:text-display-xl font-bold">Feeling Lost at Sea?</h2>
              <p className=" md:text-xl mt-6 mb-14">Let Us Be Your Onboarding Lighthouse!</p>
            </div>
            {/* <div className=" mt-[60px] md:mt-14 mb-10">
              <p className=" font-semibold">{"Share your number, we'll reach out!"}</p> */}
            {/* CONTACT INPUT */}
            {/* <div className=" flex items-center md:items-start bg-white p-[6px] rounded-[6px] gap-[10px] mt-3 w-full">
                <Select>
                  <SelectTrigger className="w-fit text-gray-900 outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className=" w-4 overflow-hidden">
                    <SelectItem value="light">KR</SelectItem>
                    <SelectItem value="dark">LA</SelectItem>
                    <SelectItem value="system">IN</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter your mobile number"
                  className=" text-md outline-none border-0 focus:outline-none focus:border-0 focus:ring-0 bg-transparent ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                />
                <ShadBtn
                  onClick={handlePhoneNoSubmit}
                  variant={"default"}
                  size={"icon"}
                  className=" bg-brand-400 p-[12px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8.88897 3.33301L13.3334 7.99967M13.3334 7.99967L8.88897 12.6663M13.3334 7.99967L2.66675 7.99967"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </ShadBtn>
              </div> */}
            {/* </div> */}
            <div className=" flex flex-col items-center justify-center gap-4 md:items-start">
              {/* <p className=" font-medium">Or ask them directly,</p> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    endIcon={
                      <MoveRight className=" text-inherit" />
                    }
                    onClick={handleContactUsModal}
                    customStyle=" bg-brand-100 text-brand-500 hover:border hover:border-brand-300 hover:bg-transparent hover:text-brand-100"
                    variant={ButtonVariant.secondary}
                    size={ButtonSize.lg}
                  >
                    Contact Us
                  </Button>
                </DialogTrigger>
               <ContactModal/>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
