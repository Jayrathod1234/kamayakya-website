import Image from "next/image";
import React from "react";

export enum AvatarVariant {
  xs,
  sm,
  md,
  lg,
}

type TAvatar = {
  variant?: AvatarVariant | string;
  imgSrc?:string;
  className?:string;
  imgClassName?:string;
};

export function Avatar({ variant = AvatarVariant.sm,imgSrc, className,imgClassName }: TAvatar) {
  const size =
    variant == AvatarVariant.sm
      ? " h-9 w-9"
      : variant === AvatarVariant.md
      ? "h-10 w-10"
      : variant === AvatarVariant.lg
      ? "h-12 w-12"
      :variant == AvatarVariant.xs ? " h-5 w-5": variant;
  return <div className={`${size} bg-brand-300 rounded-full overflow-hidden ${className}`}><img className={` h-full aspect-square object-cover ${imgClassName}`} src={imgSrc}/></div>;
}
