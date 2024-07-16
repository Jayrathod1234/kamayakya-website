import React from "react";
import { Button } from "./button";

export function ButtonnArrow({
  children,
  variant,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  size,
  customStyle,
  arrowStyle=" stroke-white",
  strokeStyle = "stroke-white",
  ...rest
}: Button) {
  return (
    <Button variant={variant} {...rest} customStyle={`group flex items-center justify-center gap-x-2 ${customStyle}`}>
      {children}
      <div className={arrowStyle}>
        <svg
          className=  {`group-hover:hidden fill stroke-inherit hover:stroke-inherit ${strokeStyle}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 8 16"
          fill="none"
        >
          <path
          className={`  ${strokeStyle}`}
            d="M2.22266 3.33325L6.6671 7.99992L2.22266 12.6666"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          className={` hidden group-hover:block group-hover:animate-move stroke-inherit hover:stroke-inherit ${strokeStyle}`}
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
        >
          <path
            className={` stroke-inherit hover:stroke-inherit ${strokeStyle}`}
            d="M8.30078 3.80029L12.3008 8.00029L8.30078 12.2003"
            stroke="white"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path className={` stroke-inherit hover:stroke-inherit ${strokeStyle}`} d="M12.3002 8L2.7002 8" stroke="white" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </div>
    </Button>
  );
}
