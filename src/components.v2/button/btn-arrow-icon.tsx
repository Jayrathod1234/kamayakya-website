import React from "react";
import { Button } from "./button";

const Arrow = ({ arrowStyle, strokeStyle }: { arrowStyle?: string; strokeStyle?: string }) => (
  <div className={`${arrowStyle}`}>
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
      <path
        className={`opacity-0 group-hover/btn-arrow:opacity-100 transition-opacity  ease-[cubic-bezier(0.215,0.61,0.355,1)]  ${strokeStyle}`}
        d="M12.3002 8L2.7002 8"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  </div>
);

export function ButtonnArrow({
  children,
  variant,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  size,
  className,
  arrowStyle = "stroke-white",
  strokeStyle = "stroke-white",
  arrowPosition = "end",
  ...rest
}: Button) {
  return (
    <Button
      disabled={disabled}
      loading={loading}
      variant={variant}
      {...rest}
      className={`group/btn-arrow flex items-center justify-center font-semibold px-3  ${className}`}
    >
      {arrowPosition == "start" ? (
        <Arrow arrowStyle={arrowStyle} strokeStyle={strokeStyle} />
      ) : null}
      {children}
      {arrowPosition == "end" ? (
        <Arrow arrowStyle={arrowStyle} strokeStyle={strokeStyle} />
      ) : null}
    </Button>
  );
}
