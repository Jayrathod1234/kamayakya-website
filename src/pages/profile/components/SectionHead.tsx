import React from "react";
import { getMixPanelClient } from "@/externals/mixpanel";

interface ISectionHead {
  sectionHead: string;
  onClick?: () => void;
}

export default function SectionHead({ sectionHead, onClick }: ISectionHead) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const mp = getMixPanelClient();
      if (sectionHead === "Personal Info") {
        mp.track("personalinfo_clicked", {
          page: "profile_page",
        });
      } else if (sectionHead === "Your Plan") {
        mp.track("yourplan_clicked", {
          page: "profile_page",
        });
      } else if (sectionHead === "Billing History") {
        mp.track("billinghistory_clicked", {
          page: "profile_page",
        });
      }
    }
  };

  return (
    <p className=" text-lg font-semibold cursor-pointer" onClick={handleClick}>
      {sectionHead}
    </p>
  );
}
