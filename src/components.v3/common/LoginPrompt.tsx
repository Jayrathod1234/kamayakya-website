import { Dialog, DialogContent, DialogTrigger } from "@/components.v2/ui/dialog";
import React from "react";

interface ILoginPrompt {
  triggerEle: React.ReactNode;
}

const NewUserList = ({ label }: { label: string }) => {
  return (
    <div className="flex items-start gap-x-[10px]">
      <img src="/assets/onboarding_tick.svg" alt="tick" />
      <p className=" text-[#00000085] text-sm">{label}</p>
    </div>
  );
};

export default function LoginPrompt({ triggerEle }: ILoginPrompt) {
  return (
    <Dialog>
      <DialogTrigger>{triggerEle}</DialogTrigger>
      <DialogContent closeClassName=" hidden" className=" flex !p-0 overflow-hidden open_sans  min-w-fit max-w-fit">
        <div className=" py-10 pb-4 bg-[#FFECDB] ">
          <div className=" flex flex-col items-center">
            <img width={26} height={32} src="/KKLogoK.svg" alt="kklogo" />
            <div className=" p-4  rounded-lg border border-[#FFFFFF] bg-[#FFFFFF66] mt-[14px] flex flex-col gap-y-3">
              <p className=" text-gray-700 font-bold text-md">New User?</p>
              <NewUserList label="Get 3 Hot Stocks for Free" />
              <NewUserList label="See Track Record" />
              <NewUserList label="Get WhatsApp & Email Notifications" />
            </div>
          </div>

          <img src="/assets/onboarding_login.gif" alt="onboarding" />
        </div>
        <div className=" p-[60px]">
          <h2 className=" text-gray-900 text-display-xs font-bold">Sign in to KamayaKya</h2>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
