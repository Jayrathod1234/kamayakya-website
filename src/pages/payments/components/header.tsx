import React from 'react'

export default function Header() {
  return (
    <div className="bg-[#F1FBFB]">
    <div className=" flex justify-between main-container py-7">
      <img
        className=" object-contain"
        width={219.69}
        height={42}
        alt="logo"
        loading="lazy"
        src="/kmk-logo (1).png"
      />
      <div className=" flex items-center justify-between gap-x-8 px-4 py-2">
        <p className=" px-4 py-3 text-lg font-semibold text-[#1d4040]">
          50+ <span className=" text-xs text-[#1D4040AD]">Stocks Released</span>
        </p>
        <p className=" px-4 py-3 text-lg font-semibold text-[#1d4040]">
          50+ <span className=" text-xs text-[#1D4040AD]">Stocks Released</span>
        </p>
        <p className=" px-4 py-3 text-lg font-semibold text-[#1d4040]">
          50+ <span className=" text-xs text-[#1D4040AD]">Stocks Released</span>
        </p>
      </div>
    </div>
  </div>
  )
}
