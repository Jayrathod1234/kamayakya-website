import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";

export default function Header({
  className,
  callIncompletePayment,
}: {
  className?: string;
  callIncompletePayment: () => void;
}) {
  // max-md:bg-[linear-gradient(to_bottom,#F1FBFB,#e4e7ec)]
  const router = useRouter();
  return (
    <div className={cn(" bg-[#F1FBFB] h-[341px] relative z-10", className)}>
      <div className=" flex flex-col md:flex-row items-center justify-between main-container py-7">
        <img
          onClick={() => {
            router.push("/");
            if (callIncompletePayment) {
              callIncompletePayment();
            }
          }}
          className=" object-contain hidden md:block cursor-pointer"
          width={219.69}
          height={42}
          alt="logo"
          loading="lazy"
          src="/kmk-logo (1).png"
        />
        <img
          onClick={() => router.push("/")}
          className=" object-contain block md:hidden mx-auto cursor-pointer"
          width={150}
          height={28}
          alt="logo"
          loading="lazy"
          src="/kmk-logo (1).png"
        />
        <div className=" flex  items-center justify-between md:gap-x-8 md:px-4 py-2">
          <p className=" px-4 py-3 text-2xs md:text-lg font-semibold text-[#1d4040] text-center  ">
            50+ <span className=" text-3xs md:text-xs text-[#1D4040AD] whitespace-nowrap">Stocks Released</span>
          </p>
          <p className=" px-4 py-3 text-2xs md:text-lg font-semibold text-[#1d4040] text-center">
            50+ <span className=" text-3xs md:text-xs text-[#1D4040AD] whitespace-nowrap">Yrs of Team Experience</span>
          </p>
          <p className=" px-4 py-3 text-2xs md:text-lg font-semibold text-[#1d4040] text-center">
            50+ <span className=" text-3xs md:text-xs text-[#1D4040AD] whitespace-nowrap">Investors</span>
          </p>
        </div>
      </div>
    </div>
  );
}
