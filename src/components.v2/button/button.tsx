import React, { ButtonHTMLAttributes } from "react";
import {ButtonProps, Button as SButton} from '../ui/button'

export enum ButtonVariant {
  primary,
  secondary,
  tertiary,
  // iconOnly,
  accent,
}

export enum ButtonSize {
  xs,
  sm,
  md,
  lg,
  xl,
}

type Button = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: ButtonVariant;
  size: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  customStyle?: string;
};

export function Button({ children, variant,startIcon,endIcon, loading = false, disabled = false, size, customStyle, ...rest }: Button ) {
  const style =
    variant === ButtonVariant.primary
      ? `bg-brand-400 border border-brand-400 text-white hover:bg-brand-600 hover:border-brand-600 disabled:border-gray-300 disabled:bg-gray-300 ${
          loading ? " bg-brand-300" : ""
        }`
      : variant === ButtonVariant.secondary
      ? ` bg-white border border-brand-400 text-brand-400 hover:bg-brand-100 disabled:hover:bg-transparent disabled:border-gray-300 disabled:text-gray-300 ${
          loading ? " text-brand-300" : ""
        }`
      : variant === ButtonVariant.tertiary
      ? ` bg-white border border-gray-300 text-gray-950 hover:bg-gray-150 disabled:text-gray-300 ${
          loading ? " text-gray-800" : ""
        }`
      : variant === ButtonVariant.accent
      ? `bg-red text-brand-400 hover:bg-brand-100 disabled:border-gray-300 disabled:text-gray-300 ${
          loading ? " text-brand-300" : ""
        }`
      : "";

  const btnSize =
    size === ButtonSize.xs
      ? " px-4 py-2 text-sm gap-[4px]"
      : size === ButtonSize.sm
      ? " px-4 py-[10px] text-sm gap-[4px]"
      : size === ButtonSize.md
      ? " px-4 py-3 text-sm"
      : size === ButtonSize.lg
      ? " px-5 py-[10px] text-md"
      : "";

  return (
    <SButton
      {...rest}
      disabled={disabled}
      className={`  text-center font-medium flex items-center gap-[6px] justify-center  rounded-md ${btnSize} ${style} ${customStyle} `}
    >
      {startIcon}
      {children}
      {endIcon}
    </SButton>
  );
}
