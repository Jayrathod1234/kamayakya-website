import Image from "next/image";
import React from "react";
import { Button } from "../button/index";
import { ButtonSize, ButtonVariant } from "../button/button";
import { getMixPanelClient } from "@/externals/mixpanel";
import { MoveRight } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ContactModal } from "./contact-modal";

export function EnterpriseCard() {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("contactus_clicked", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-6 md:gap-x-11 items-center justify-center">
      <Image className="md:hidden rounded-xl" src={"/contact_us.jpeg"} alt="contact_us_img" height={223} width={358} />
      <Image
        className="hidden md:inline-block rounded-xl"
        src={"/pricing/contact_us_desktop.jpeg"}
        alt="contact_us_img"
        height={460}
        width={648.59}
      />
      <div className=" flex flex-col items-center md:items-start text-center  md:text-start">
        <p className=" text-2xs md:text-sm text-[#F98800] font-medium uppercase">KamayaKya Enterprise Plan</p>
        <h3 className=" text-display-xs md:text-display-md font-bold m-0">Looking for enterprise solutions?</h3>
        <p className=" text-md mt-3 md:mt-4 text-gray-600">
          For wealth management businesses like Family Office, PMS, AIF, MF and other wealth creators in the ecosystem.{" "}
        </p>
        <div className=" !mt-6 md:!mt-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                endIcon={<MoveRight className=" text-inherit" />}
                onClick={handleContactButton}
                variant={ButtonVariant.primary}
                size={ButtonSize.lg}
              >
                Contact Us
              </Button>
            </DialogTrigger>
            <ContactModal />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
