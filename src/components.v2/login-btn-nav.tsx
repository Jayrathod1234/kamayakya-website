import React from "react";
import { Avatar, AvatarVariant } from "./avatar";
import {  Button, ButtonnArrow } from "./button";
import { ButtonVariant } from "./button/button";

type TLoginBtnNav = {
  handleLogin: () => void;
  arrow?: boolean;
};

export function LoginBtnNav({ handleLogin, arrow }: TLoginBtnNav) {
  // const handleContactButton = () => {
  //   const mp = getMixPanelClient();
  //   mp.track("contactus_clicked", {
  //     page: "Pricing_Page",
  //     pagegroup: "enterprise_solution",
  //   });
  //   mp.track("asktheteam_loaded", {
  //     page: "Pricing_Page",
  //     pagegroup: "enterprise_solution",
  //   });
  //   handleLogin()
  // };
  return (
    <ButtonnArrow
      variant={ButtonVariant.custom}
      onClick={handleLogin}
      className={` border border-brand-500 pricing bg-brand-500  hover:bg-brand-600 text-white  px-4 py-[10px] rounded-[6px] flex items-center justify-center`}
    >
      <Avatar variant={AvatarVariant.xs} />
      <p className=" text-sm m-0 font-semibold">Login</p>
    </ButtonnArrow>
  );
}
