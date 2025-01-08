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

  function getDialog(content: EDialogContent) {
    switch (content) {
      case EDialogContent.EMAIL:
        return <EmailChangeDialog closeDialog={closeDialog} />;
      case EDialogContent.PHONE:
        return <PhoneChangeDialog closeDialog={closeDialog} />;
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
          <p className=" text-sm font-medium text-gray-500">{contactField}</p>
          <p className=" text-md text-gray-900">{contactValue}</p>
        </div>
        <DialogTrigger>
          <Button className=" !px-[18px] !py-2" variant={ButtonVariant.tertiary}>
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
  const activePlan  = useActivePlanContext();

  return (
    <div id="personal-info">
      <SectionHead sectionHead="Personal Info" />
      <div className="bg-white pt-6 mt-3 rounded-xl">
        <div className=" px-6 ">
          <div className=" bg-gray-50 rounded-2xl">
            <div className=" flex items-center justify-between p-6 ">
              <div className=" flex items-center gap-x-3 ">
                <Avatar variant={"custom"} customImgSize={80} />
                <h3 className="p-[10px] font-bold text-display-xs">{user?.fullname}</h3>
              </div>
              <PlanBadge iconSize={16} labelClassName=" text-xs font-bold" className=" h-fit" plan={activePlan.activePlan.plan} />
            </div>
          </div>
        </div>
        <div className=" p-6 flex items-center justify-between">
          <ContactInfo dialogContent={EDialogContent.EMAIL} contactField={"Email ID"} contactValue={user?.email} />
        </div>
        <div className=" px-6 py-4 flex items-center justify-between border-t border-t-[#F0F1F2]">
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
