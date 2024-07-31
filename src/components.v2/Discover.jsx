import React from "react";

function Discover() {
  return (
    <>
      <div className="w-[min(1280px,calc(100%-32px))] min-w-[328px] mx-auto">
        <p className=" text-display-xs text-[#0C111D] font-bold font-open_sans text-center">
          Discover by Strategy
        </p>
        <p className=" text-sm font-normal text-[#475467]  mx-auto pt-3 font-open_sans text-center">
          Screen stocks with KamayaKya's strategy tags to{" "}
          <span className="text-[#F79009] font-semibold">
            understand why each stock was chosen
          </span>
          and to find your perfect investment match!
        </p>

        <div className="pt-10 pb-8">
          <div className="card education">
            <div className="overlay"></div>
            <div className="circle">
              <img
                src="/assets/ëÎÓÈ_1.svg"
                alt=""
                srcset=""
                className="z-[1] w-12"
              />
            </div>
            <p className="text-sm font-bold text-[#1D2939]">Value Pick</p>
            <p className="text-white hidden">
              Discover undervalued gems with strong fundamentals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;
