"use client";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
const items = [
  { img: "./onground1.png", img2: "./onground2.png" },
  { img: "./onground3.png" },
  { img: "./onground4.png", img2: "./onground5.png" },
  { img: "./onground6.png" },
  { img: "./onground1.png", img2: "./onground2.png" },
  { img: "./onground3.png" },
  { img: "./onground4.png", img2: "./onground5.png" },
  { img: "./onground6.png" },
];

export default function OnGroundVerification() {
  return (
    <div className=" sm:px-5 ">
      <div className=" py-[50px] sm:py-20 bg-[#01272E] open_sans sm:rounded-[28px]">
        <p className=" font-bold text-[#FF9E29] text-center max-sm:text-sm max-sm:px-4">ON-GROUND VERIFICATION</p>
        <h2 className=" text-display-xs sm:text-2xl font-bold mb-2 text-center text-white max-sm:px-4">
          The Power of Scuttlebutt - Where Research Meets Reality
        </h2>
        <p className=" text-sm sm:text-lg text-[#FFFFFFB2] mb-10 text-center max-sm:px-4">
          We go the extra mile to validate our research on the ground, delivering insights you can count on. Because
          real-world validation is the backbone of smart investing.{" "}
        </p>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-sm:mt-7"
        >
          <CarouselContent>
            {items.map((item, idx) => (
              <CarouselItem key={idx} className="basis-1/2 lg:basis-1/4">
                <div className="h-full">
                  {/* Odd-numbered items (0-indexed, so item % 2 === 0) get two vertical cards */}
                  {idx % 2 == 0 ? (
                    <div className="flex flex-col  h-full space-y-4">
                      <div className="">
                        {/* <div className="flex items-center justify-center"> */}
                          {/* <div className="text-center"> */}
                            <img
                            className=" min-w-full min-h-full max-h-[116px] sm:max-h-[294px] object-cover" 
                            height={294} 
                            width={350} 
                            src={item.img} alt="" />
                            {/* </div> */}
                        {/* </div> */}
                      </div>
                      <div className="">
                        {/* <div className="flex items-center justify-center"> */}
                          {/* <div className="text-center"> */}
                            <img
                            className=" min-w-full min-h-full  max-h-[116px] sm:max-h-[294px] object-cover" 
                            height={294} 
                            width={350} 
                            src={item.img2} alt="" />
                            
                          {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                  ) : (
                    /* Even-numbered items get a single card */
                    <div className="h-full">
                      {/* <div className="flex items-center justify-center h-full"> */}
                        {/* <div className="text-center"> */}
                          <img 
                          className=" min-w-full min-h-full max-h-[241px] sm:max-h-[604px] object-cover"
                          height={604} 
                          width={350} 
                          src={item.img} alt="" />
                          
                        {/* </div> */}
                      {/* </div> */}
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="left-2" /> */}
          {/* <CarouselNext className="right-2" /> */}
        </Carousel>
      </div>
    </div>
  );
}
