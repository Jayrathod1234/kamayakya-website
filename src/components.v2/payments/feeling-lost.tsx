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

import { ArrowRight, MoveRight } from "lucide-react";
import { ContactModal } from "./contact-modal";

export function FeelingLost() {
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
    <div  className=" bg-[url(/feeling_lost_bg.webp)] text-white bg-no-repeat bg-cover md:pt-[60px]">
      <div className=" py-[60px] md:pt-[120px] md:pb-[333px]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 place-content-center place-items-center w-[min(1200px,calc(100%-32px))] min-w-[328px] mx-auto">
          <div className=" md:col-start-2 md:row-start-1 pt-[71px] md:pt-0">
            <Image className="block md:hidden" height={85} width={131} src={"/ship.svg"} alt="ship" />
            <Image className="hidden md:inline-block" height={115} width={177} src={"/ship.svg"} alt="ship" />
          </div>
          <div className="md:col-start-1 md:row-start-1  text-center md:text-left py-[60px]">
            <div className="">
              <h2 className=" text-display-sm md:text-display-xl font-bold">Feeling Lost?</h2>
              <p className=" mt-4 mb-9 md:text-xl md:mt-6 md:mb-14">Let Us help you out!</p>
            </div>

            <div className=" flex flex-col items-center justify-center gap-4 md:items-start">
              {/* <p className=" font-medium">Or ask them directly,</p> */}

              <ContactModal
                trigger={
                  <Button
                    endIcon={
                      <div>
                        <MoveRight className="hidden md:block text-inherit" />
                        <ArrowRight height={18} width={18} className="block md:hidden text-inherit" />
                      </div>
                    }
                    onClick={handleContactUsModal}
                    customStyle="!py-[14px] md:py-[auto] bg-brand-100 text-brand-500 hover:border hover:border-brand-300 hover:bg-transparent hover:text-brand-100"
                    variant={ButtonVariant.secondary}
                    size={ButtonSize.lg}
                  >
                    Contact Us
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
