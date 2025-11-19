import React from "react";
import { Carousel } from "../carousel";

export function Testimonials() {
  return (
    <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
      <p className=" text-sm md:text-md text-[#F98800] font-semibold">TESTIMONIALS</p>
      <h1 className=" text-display-xs md:text-display-md font-bold w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        Hear from our <span className=" open_sans_italic">satisfied investors</span>
      </h1>
      <div className=" mb-6 w-full">
        <Carousel />
      </div>
    </div>
  );
}
