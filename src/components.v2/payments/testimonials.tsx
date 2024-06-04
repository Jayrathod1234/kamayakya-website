import React from "react";
import { TestimonialsCard } from "../cards";
import { Carousel, CarouselItem } from "../carousel";

export function Testimonials() {
  return (
    <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
     
      <p className=" text-sm text-[#F98800]">TESTIMONIALS</p>
      <h1 className=" text-display-xs font-bold">Hear from our intelligent investors</h1>
      <div className=" mb-6 w-full">
        <Carousel>
        </Carousel>
      </div>
      
    </div>
  );
}
