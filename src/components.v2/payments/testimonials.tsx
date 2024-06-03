import React from "react";
import { TestimonialsCard } from "../cards";
import { Carousel, CarouselItem } from "../carousel";

export function Testimonials() {
  return (
    <div className=" flex flex-col items-center justify-center text-center bg-[url('/feedback-bg.png')] bg-cover">
      <p className=" text-sm text-[#F98800]">TESTIMONIALS</p>
      <h1 className=" text-display-xs font-bold">Hear from our intelligent investors</h1>
      <div className=" mb-6 w-full">
        <Carousel>
        </Carousel>
      </div>
      
    </div>
  );
}
