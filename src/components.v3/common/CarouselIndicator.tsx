import React from "react";

type TCarouselIndicator = {
  onClick:()=>void;
  index:number;
  selectedIndex:number;
  animationDuration?:string;
}

export default function CarouselIndicator({ onClick, index, selectedIndex, animationDuration }:TCarouselIndicator) {
  return (
    <div
      onClick={onClick}
      key={index}
      className={` ${
        index === selectedIndex ? " !w-6 " : " w-[10px] "
      } h-[10px]  bg-gray-200 rounded-full transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      <div
        style={{ animationDuration: "6000ms" }}
        className={`bg-brand-300 w-full h-full ${index === selectedIndex ? "carousel-dot-animate" : " hidden"}`}
      ></div>
    </div>
  );
}
