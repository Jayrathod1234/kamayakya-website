import React from "react";
import { Avatar, AvatarVariant } from "./avatar";
import { Button } from "./button";
import { ButtonVariant } from "./button/button";

type TLoginBtnNav = {
  handleLogin: () => void;
  arrow?: boolean;
};

export function LoginBtnNav({ handleLogin, arrow }: TLoginBtnNav) {
  return (
    <Button
      variant={ButtonVariant.custom}
      onClick={handleLogin}
      customStyle={` border border-brand-500 pricing bg-brand-500  hover:bg-brand-600 text-white  px-4 py-[10px] rounded-[6px] flex items-center justify-center gap-x-2`}
    >
      <Avatar variant={AvatarVariant.xs} imgSrc="/avatar-login.png" />
      <p className=" text-sm font-medium">Login</p>
      {arrow && (
        <div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5.33398L14.6667 8.00065L12 10.6673"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.33325 8H14.6666"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </Button>
  );
}
