import React, { ButtonHTMLAttributes } from "react";
import { ButtonProps, Button as SButton } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export enum ButtonVariant {
  primary,
  secondary,
  tertiary,
  // iconOnly,
  accent,
  custom,
  sebi,
}

export enum ButtonSize {
  xs,
  sm,
  md,
  lg,
  xl,
}

export type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  arrowStyle?: string;
  strokeStyle?: string;
  arrowPosition?: string;
  customStyle?: string;
  sebi?: string;
};

export function Button({
  children,
  variant,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  size,
  className,
  sebi,
  customStyle,
  ...rest
}: Button) {
  const style =
    variant === ButtonVariant.primary
      ? `bg-brand-400 border border-brand-400 text-white hover:bg-brand-600 hover:border-brand-600 disabled:border-gray-300 disabled:bg-gray-300 ${loading ? " !bg-brand-300" : ""
      }`
      : variant === ButtonVariant.secondary
        ? ` bg-white border border-brand-400 text-brand-400 hover:bg-brand-100 disabled:hover:bg-transparent disabled:border-gray-300 disabled:text-gray-300 ${loading ? " text-brand-300" : ""
        }`
        : variant === ButtonVariant.tertiary
          ? ` bg-white border border-gray-300 text-gray-950 hover:bg-gray-150 disabled:text-gray-300 ${loading ? " text-gray-800" : ""
          }`
          : variant === ButtonVariant.accent
            ? `bg-red text-brand-400 hover:bg-brand-100 disabled:border-gray-300 disabled:text-gray-300 ${loading ? " text-brand-300" : ""
            }`
            : variant === ButtonVariant.custom
              ? ` text-brand-400 hover:bg-red-100 disabled:border-gray-300 disabled:text-gray-300 ${loading ? " text-brand-300" : ""
              }`
              : variant === ButtonVariant.sebi
                ? ` py-[6px] pr-[10px] pl-[14px] text-white text-sm border border-[#75cdc5] rounded-3xl bg-[#108973]/[0.20] hover:bg-[108973] ${loading ? " text-brand-300" : ""
                }`
                : customStyle;

  const btnSize =
    size === ButtonSize.xs
      ? " px-4 py-2 text-sm gap-[4px]"
      : size === ButtonSize.sm
        ? " px-4 py-[10px] text-sm gap-[4px]"
        : size === ButtonSize.md
          ? " px-4 py-3 text-sm"
          : size === ButtonSize.lg
            ? " px-5 py-[10px] text-md"
            : " px-4 py-[10px] text-sm gap-[4px] md:py-3 lg:px-5 lg:py-[10px] lg:text-md ";

  return (
    <SButton
      {...rest}
      disabled={disabled || loading}
      className={cn(
        ` hover:scale-90 transition-transform duration-200 eas-in-out text-center font-semibold flex items-center gap-[6px] justify-center min-w-fit  rounded-md  ${btnSize} ${style}`,
        className
      )}
    >
      {loading ? (
        <>
          <LoaderCircle size={16} className=" text-inherit" />
          <span>Loading</span>
        </>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </SButton>
  );
}
