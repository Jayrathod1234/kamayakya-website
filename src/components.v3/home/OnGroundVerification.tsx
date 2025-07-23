"use client";
import { Marquee } from "@/components.v2/magicui/marquee";
import { Carousel, CarouselContent, CarouselItem } from "@/components.v2/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const items = [
  "Defense Expo - Missile",

  ["Menon Bearings - Steel roller", "Engineering Expo - Ratnadeep castings stall"],

  "Defense Expo - Borosil Stall",

  ["Defense Expo - Missile product", "Menon Bearings - Alkop business"],

  "VOEPL - Copper Pipe Division",

  ["Menon Bearings - Product portfolio", "MMP Industries - Aluminium Powder cans"],

  "Carysil Showroom",

  ["Defense Expo - Product display", "Defense Expo - Product portfolio"],

  "Krishca Strapping - Plant Visit",

  ["Defense Expo - Missile Prototype", "Confidence Petroleum - CNG cylinders"],

  "Krishca Strapping - Plant Visit 2",

  ["Defense Expo - Drone Prototype", "Dhabriya - Studio Arezzo"],

  "VOEPL and KamayaKya team",

  ["Defense Expo - Drone Prototype 2", "Energy Mission Machinery - Mother Machine"],

  "Dhabriya - uPVC Window line",

  ["Ion Exchange - Exhibition visit", "Energy Mission Machinery - In House Molds"],

  "Dhabriya - Fluted Panel Line",

  ["Aarti Industries - Exhibition", "Energy Mission Machinery - Final Product"],

  "VOEPL - Manufacturing unit",

  ["Carysil - Kitchen Sinks", "Carysil - SS Sinks"],

  "Dhabriya - PVC Pulverize Machine",

  ["VOEPL - Product ready to dispatch", "Dhabriya CFO and KamayaKya Team"],

  "Energy Mission (SME) - Main Raw Material",

  ["Carysil - Premium Taps", "Dhabriya - Storage unit"],
];

// Optional: Helper to generate safe filenames (convert spaces, special chars)
function getImageName(text: string) {
  return "./landing/" + text.replace(/ - /g, "_") + ".jpg";
}

export default function OnGroundVerification() {
  return (
    <div className="md:px-5">
      <div className="relative py-[50px] md:py-20 bg-[#01272E] open_sans md:rounded-[28px] overflow-hidden">
        {/* Background image using <img> */}
        <img
          src="/landing/visit-bg.png"
          alt="On-ground verification background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 top-[-60px]"
          style={{ zIndex: 0 }}
        />

        {/* Content */}
        <div className="relative z-10">
          <p className="font-bold text-[#FF9E29] text-center max-md:text-sm max-lg:px-4">ON-GROUND VERIFICATION</p>
          <h2 className="text-display-xs sm:text-display-md font-bold mb-2 text-center text-white max-lg:px-4">
            The Power of <span className=" open_sans_italic">Scuttlebutt</span>
          </h2>
          <p className="text-sm sm:text-xl text-[#FFFFFFB2] mb-10 text-center max-lg:px-4">
            Where Research Meets Reality
          </p>

          {/* <Carousel
            opts={{
              loop:true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-sm:mt-7"
          >
            <CarouselContent> */}
          <Marquee pauseOnHover className="[--duration:80s] cursor-[url(/carousel-pause-icon.svg),auto]">
            {items.map((item, idx) => {
              if (Array.isArray(item)) {
                const [img1, img2] = item;
                const img1Path = getImageName(img1);
                const img2Path = getImageName(img2);

                return (
                  <div key={idx} className="flex flex-col space-y-4 h-full max-h-[480px] w-[300px]">
                    <div className="rounded-xl flex-1 overflow-hidden flex flex-col min-h-0">
                      <img className="w-full flex-1 object-cover min-h-[200px]" src={img1Path} alt={img1} />
                      <p className="bg-[#003336] py-[5.5px] font-semibold text-center text-xs text-gray-25 flex-shrink-0">
                        {img1}
                      </p>
                    </div>
                    <div className="rounded-xl flex-1 overflow-hidden flex flex-col min-h-0">
                      <img className="w-full flex-1 object-cover min-h-[200px]" src={img2Path} alt={img2} />
                      <p className="bg-[#003336] py-[5.5px] font-semibold text-center text-xs text-gray-25 flex-shrink-0">
                        {img2}
                      </p>
                    </div>
                  </div>
                );
              } else {
                const imgPath = getImageName(item);
                return (
                  <div key={idx} className="h-full max-h-[480px] w-[300px] rounded-xl flex flex-col overflow-hidden">
                    <img className="w-full flex-1 object-cover min-h-[400px]" src={imgPath} alt={item} />
                    <p className="bg-[#003336] py-[5.5px] font-semibold text-center text-xs text-gray-25 flex-shrink-0">
                      {item}
                    </p>
                  </div>
                );
              }
            })}
          </Marquee>
          <p className="text-sm sm:text-md text-[#FFFFFFB2] mb-10 text-center max-lg:px-4 pt-[60px]">
            We go the extra mile to <span className=" font-bold text-[#E5F4F6]">validate our research on the ground</span>,
            delivering insights you can count on. Because real-world validation is the backbone of{" "}
            <span className=" font-bold text-[#E5F4F6]">smart investing</span>.{" "}
          </p>
          {/* </CarouselContent>
          </Carousel> */}
        </div>
      </div>
    </div>
  );
}
