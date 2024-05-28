import React from "react";

export enum AvatarVariant {
  sm,
  md,
  lg,
}

type TAvatar = {
  variant?: AvatarVariant;
};

export function Avatar({ variant = AvatarVariant.sm }: TAvatar) {
  const size =
    variant == AvatarVariant.sm
      ? " h-9 w-9"
      : variant === AvatarVariant.md
      ? "h-10 w-10"
      : variant === AvatarVariant.lg
      ? "h-16 w-16"
      : "";
  return <div className={`${size} bg-brand-300 rounded-full`}></div>;
}
