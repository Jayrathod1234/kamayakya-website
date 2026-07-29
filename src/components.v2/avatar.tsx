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
  imgSrc?: string;
  className?: string;
  imgClassName?: string;
  customImgSize?:number;
  alt?: string;
};

export function Avatar({ variant = AvatarVariant.sm, imgSrc="/avatar-card.webp", className, imgClassName,customImgSize, alt = "User avatar" }: TAvatar) {
  const size =
    variant == AvatarVariant.sm
      ? " h-9 w-9"
      : variant === AvatarVariant.md
      ? "h-10 w-10"
      : variant === AvatarVariant.lg
      ? "h-12 w-12"
      : variant == AvatarVariant.xs
      ? " h-5 w-5"
      : variant;

  const imgSize =
    variant == AvatarVariant.sm
      ? 36
      : variant === AvatarVariant.md
      ? 40
      : variant === AvatarVariant.lg
      ? 48
      : variant == AvatarVariant.xs
      ? 20
      : customImgSize;
  return (
    <div className={`${size} bg-brand-300 rounded-full overflow-hidden ${className}`}>
      {imgSrc && (
        <img
          className={` h-full aspect-square object-cover ${imgClassName}`}
          height={imgSize}
          width={imgSize}
          src={imgSrc}
          alt={alt}
        />
      )}
    </div>
  );
}
