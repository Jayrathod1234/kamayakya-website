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
  className,
  arrowStyle=" stroke-white",
  strokeStyle = "stroke-white",
  ...rest
}: Button) {
  return (
    <Button disabled={disabled} loading={loading} variant={variant} {...rest} className={`group/btn-arrow flex items-center justify-center font-semibold px-3  ${className}`}>
      {children}
      <div className={`${arrowStyle}`}>
        {/* <svg
          className=  {`group-hover/btn-arrow:hidden fill stroke-inherit hover:stroke-inherit ${strokeStyle}`}
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
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          className=" relative box-content"
        >
          <path
            className={`translate-x-[-2px] group-hover/btn-arrow:translate-x-[2.5px] transition-transform  ease-[cubic-bezier(0.215,0.61,0.355,1)]  ${strokeStyle}`}
            d="M8.30078 3.80029L12.3008 8.00029L8.30078 12.2003"
            stroke="white"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path className={`opacity-0 group-hover/btn-arrow:opacity-100 transition-opacity  ease-[cubic-bezier(0.215,0.61,0.355,1)]  ${strokeStyle}`} d="M12.3002 8L2.7002 8" stroke="white" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </div>
    </Button>
  );
}
