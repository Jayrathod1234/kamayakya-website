import React from "react";
import { Avatar, AvatarVariant } from "./avatar";
import { Button, ButtonnArrow } from "./button";
import { ButtonSize, ButtonVariant } from "./button/button";
import { getMixPanelClient } from "@/externals/mixpanel";

type TLoginBtnNav = {
  handleLogin: () => void;
  arrow?: boolean;
};

export function LoginBtnNav({ handleLogin, arrow }: TLoginBtnNav) {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("contactus_clicked", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    mp.track("asktheteam_loaded", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    handleLogin()
  };
  return (
    <>
      <ButtonnArrow
        // endIcon={<MoveRight className=" text-inherit" />}
        onClick={handleContactButton}
        variant={ButtonVariant.primary}
        size={ButtonSize.lg}
      // strokeStyle=" stroke-brand-400"
      // arrowStyle="rotate-90 stroke-white"
      >
        <Avatar variant={AvatarVariant.xs} imgSrc="/avatar-login.png" />
        Login
      </ButtonnArrow>
    </>
    // <Button
    //   variant={ButtonVariant.primary}
    //   onClick={handleLogin}
    //   customStyle={` border border-brand-500 pricing bg-brand-500  hover:bg-brand-600 text-white  px-4 py-[10px] rounded-[6px] flex items-center justify-center gap-x-2`}
    // >
    //   <Avatar variant={AvatarVariant.xs} imgSrc="/avatar-login.png" />
    //   <p className=" text-sm font-medium">Login</p>
    //   {arrow && (
    //     <div>
    //       <svg
    //         width="16"
    //         height="16"
    //         viewBox="0 0 16 16"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M12 5.33398L14.6667 8.00065L12 10.6673"
    //           stroke="white"
    //           stroke-width="1.5"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //         />
    //         <path
    //           d="M1.33325 8H14.6666"
    //           stroke="white"
    //           stroke-width="1.5"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //         />
    //       </svg>
    //     </div>
    //   )}
    // </Button>
  );
}
