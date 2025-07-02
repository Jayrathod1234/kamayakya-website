import { Button } from "@/components.v2/button";
import { ButtonVariant } from "@/components.v2/button/button";
import { Marquee } from "@/components.v2/magicui/marquee";
import { ArrowRight, Play } from "lucide-react";
import React from "react";
const COMPANY_LIST = [
  "/hero_company/image 201.png",
  "/hero_company/image 200.png",
  "/hero_company/image 199.png",
  "/hero_company/image 198.png",
  "/hero_company/image 47.png",
  "/hero_company/image 46.png",
  "/hero_company/image 45.png",
  "/hero_company/Frame.png",
  "/hero_company/apollo-hospitals-seeklogo 1.png",
];
export default function Hero() {
  return (
    <div className=" ">
      <div className=" min-h-[80vh] open_sans">
        <div className="main-container mx-auto px-4 py-16 md:pt-[167px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-12 lg:gap-16">
            {/* Left Content - Desktop First Column, Mobile Second */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
              <div className=" max-lg:flex max-lg:flex-col max-lg:items-center">
                <div className=" bg-white border border-[#75CDC566] px-[14px] py-2 rounded-full w-fit"><p className=" text-sm font-semibold text-brand-500">SEBI Registered: INH000009843</p></div>
                <h1 className="font-medium text-gray-950 text-display-sm lg:text-[62px] leading-[110%]  tracing-[-3%]">
                  Financial <span className=" text-brand-400 font-bold">Freedom</span> Starts Here!
                </h1>

                <p className=" text-xs lg:text-lg text-gray-800 max-w-2xl mx-auto lg:mx-0 ">
                  Invest confidently in hidden opportunities within SMEs, Microcaps & Smallcaps, and build the future
                  you truly deserve.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-[33px]">
                <Button variant={ButtonVariant.primary}>
                  <p className=" font-medium text-md">
                    Get Started- <span className=" font-normal">It's Free</span>
                  </p>
                </Button>
              </div>
            </div>

            {/* Right Video - Desktop Second Column, Mobile First */}
            <div className="order-1 lg:order-2 w-full max-w-2xl mx-auto lg:mx-0">
              <div className="relative group">
                {/* Video Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <div className="aspect-video bg-gradient-to-br from-purple-800 to-pink-800 flex items-center justify-center">
                    {/* Placeholder for video - replace with actual video element */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Optional: Replace above with actual video */}
                    {/*
                  <video 
                    className="w-full h-full object-cover"
                    poster="/path-to-your-poster-image.jpg"
                    controls
                  >
                    <source src="/path-to-your-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  */}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full blur-sm opacity-70"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full blur-sm opacity-70"></div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl -z-10 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-500"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 right-8 hidden lg:block">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-16 left-8 hidden lg:block">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-600/10 to-transparent rounded-full blur-3xl"></div>
      </div> */}
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden open_sans">
        
        <p className=" pb-3 font-semibold text-gray-700">Our members include leaders from</p>
        <Marquee pauseOnHover className="[--duration:20s]">
          {COMPANY_LIST.map((company) => (
            <div className=" mr-20" key={company}>
              <img key={company} src={company} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white z-10"></div>
      </div>
    </div>
  );
}
