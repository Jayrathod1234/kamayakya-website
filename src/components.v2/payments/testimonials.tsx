import React from "react";
import { TestimonialsCard } from "../cards";
import { Carousel, CarouselItem } from "../carousel";

export function Testimonials() {
  return (
    <div className=" flex flex-col items-center justify-center text-center ">
      <p className=" text-sm text-[#F98800]">TESTIMONIALS</p>
      <h1 className=" text-display-xs font-bold">Hear from our intelligent investors</h1>
      <div className=" mt-12 mb-6 w-full">
        <Carousel className=" py-5">
        </Carousel>
      </div>
      
    </div>
  );
}
