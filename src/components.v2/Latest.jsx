import React from "react";
import { Carousel } from "../components.v2/carousel";

function Latest() {
  return (
    <>
      <div className=" pt-[339px] pb-[100px] ">
        <div className=" before:content-[''] before:bg-[url(/testimonials_texture.png)] before:absolute before:w-full before:h-full before:opacity-25 relative flex flex-col items-center justify-center text-center bg-cover">
          <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans">
            Latest Releases (10)
          </p>
          <p className=" text-sm font-normal text-[#475467] w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto pt-3 font-open_sans">
            New Stocks released in the last 60 days
          </p>
          <div className=" mb-6 w-full">
            <Carousel />
          </div>
        </div>
      </div>
    </>
  );
}
export default Latest;
