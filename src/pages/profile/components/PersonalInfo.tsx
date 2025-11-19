import { Avatar } from "@/components.v2/avatar";
import { PlanBadge } from "@/components.v2/badge";
import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import React, { useContext, useState } from "react";
import SectionHead from "./SectionHead";
import AuthContext from "@/components/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import { useForm } from "react-hook-form";
import { getUserProfileOtp } from "@/api/profile";
import { EmailChangeDialog } from "./EmailChangDialog";
import { PhoneChangeDialog } from "./PhoneChangeDialog";
import { useActivePlanContext } from "@/components/PlanContext";
import { useMediaQuery } from "@mui/material";
import { getMixPanelClient } from "@/externals/mixpanel";

enum EDialogContent {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  VERIFY_OTP = "VERIFY_OTP",
}

interface IContactInfo {
  contactField: string;
  contactValue: string;
  handleEdit?: () => void;
  dialogContent: EDialogContent;
}

const ContactInfo = ({ contactField, contactValue, dialogContent }: IContactInfo) => {
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  const handleEditClick = () => {
    const mp = getMixPanelClient();
    if (dialogContent === EDialogContent.EMAIL) {
      mp.track("emailedit_clicked", {
        page: "profile_page",
      });
    } else if (dialogContent === EDialogContent.PHONE) {
      mp.track("mobileedit_clicked", {
        page: "profile_page",
      });
    }
    setOpen(true);
  };

  function getDialog(content: EDialogContent) {
    switch (content) {
      case EDialogContent.EMAIL:
        return <EmailChangeDialog dialogStatus={open} closeDialog={closeDialog} />;
      case EDialogContent.PHONE:
        return <PhoneChangeDialog dialogStatus={open} closeDialog={closeDialog} />;
      case EDialogContent.VERIFY_OTP:
        return null;
      default:
        return null;
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div>
          <p className=" text-2xs sm:text-sm font-medium text-gray-500">{contactField}</p>
          <p className=" mt-2 text-sm sm:text-md text-gray-900">{contactValue}</p>
        </div>
        <DialogTrigger>
          <Button onClick={handleEditClick} className=" !px-[18px] !py-2" variant={ButtonVariant.tertiary}>
            <p className=" text-sm font-medium">Edit</p>
          </Button>
        </DialogTrigger>
        {getDialog(dialogContent)}
      </Dialog>
    </>
  );
};

export default function PersonalInfo() {
  const { user } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width:640px)");
  const activePlan = useActivePlanContext();

  return (
    <div id="personal-info">
      <SectionHead sectionHead="Personal Info" />
      <div className="bg-white pt-3 sm:pt-6 mt-3 rounded-xl">
        <div className=" px-3 sm:px-6 ">
          <div className=" bg-gray-50 rounded-2xl">
            <div className=" p-3 sm:p-6 ">
              <div className=" flex items-center gap-x-3 ">
                <Avatar imgClassName=" max-sm:h-12 max-sm:w-14" variant={"custom"} customImgSize={80} />
                <div className=" flex max-sm:flex-col sm:items-center sm:justify-between w-full">
                  <h3 className="sm:p-[10px] font-semibold sm:font-medium text-md sm:text-display-xs text-[#020816] mb-0">
                    {user?.username}
                  </h3>
                  <PlanBadge
                    iconSize={isMobile ? 10 : 16}
                    labelClassName="  text-4xs font-semibold sm:text-xs sm:font-bold"
                    className=" h-fit max-sm:mt-1"
                    plan={activePlan.activePlan.plan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 sm:p-6 flex items-center justify-between">
          <ContactInfo dialogContent={EDialogContent.EMAIL} contactField={"Email ID"} contactValue={user?.email} />
        </div>
        <div className=" p-4 sm:px-6 py-4 flex items-center justify-between border-t border-t-[#F0F1F2]">
          <ContactInfo
            dialogContent={EDialogContent.PHONE}
            contactField={"Mobile Number"}
            contactValue={user?.mobile}
          />
        </div>
      </div>
    </div>
  );
}
