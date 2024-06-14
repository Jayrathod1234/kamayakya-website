import { getMixPanelClient } from "@/externals/mixpanel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function LinkedinBtn() {
  const handleNewsLetterLinkedin = () => {
    const mp = getMixPanelClient();
    mp.track("Linkedinbutton_clicked", {
      page: "Pricing_Page",
      pagegroup: "newsletter",
    });
  };

  return (
    <button onClick={handleNewsLetterLinkedin} className=" ">
      <Link
        className=" whitespace-nowrap text-inherit px-4 py-2 flex gap-2 items-center bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-[6px]"
        href={"https://www.linkedin.com/company/kamayakya/"}
        target="_blank"
      >
        <Image height={32} width={32} src={"/icons/linkedin.svg"} alt="linkedin-icon" />
        <p className=" font-medium">KamayaKya’s Linkedin</p>
        <Image height={18} width={18} src={"/icons/open-link.svg"} alt="open-link-icon" />
      </Link>
    </button>
  );
}
