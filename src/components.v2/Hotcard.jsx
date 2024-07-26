import React from "react";
import ProgressBar from "./ProgressBar.jsx";

function Hotcard() {
  return (
    <>
      <div className="flex relative">
        <div className="absolute top-[17px] z-[11] left-[126px] ">
          <img src="/assets/hottab.png" alt="" className="w-[159px]" />
        </div>
        <div className="relative rounded-lg bg-white border border-[#FEC84B] p-[15px] max-w-[308px] z-[5] scale-y-90 left-[65px]">
          <div className="gap-2 flex">
            <div className="flex gap-[6px]">
              <img src="/assets/noto_locked.png" alt="" className="w-[16px] " />
              <div className="min-w-[215px] flex justify-center rounded-2xl bg-[#EDF0F5] gap-1 h-full w-full mr-4"></div>
              <div class="relative flex  items-center group">
                <img src="/assets/play.gif" alt="" className="" />
                <div class="absolute bottom-0 flex flex-col items-center hidden mb-4 group-hover:flex gap-[6px]">
                  <span class="relative z-10 p-2 text-xs leading-none text-black whitespace-no-wrap bg-white shadow-lg">
                    Watch Video
                    <img src="/assets/image/Icon.svg" alt="" />
                  </span>
                  <div class="w-3 h-3 -mt-2 rotate-45 bg-white"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-[9px] flex items-center gap-[6px] pb-[15px]">
            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
              <img
                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                alt=""
              />
              <p className="text-[7px] font-semibold text-[#A3651A]">
                Air Conditioners
              </p>
            </div>
            <div className="py-[3px] pr-[6px] pl-1 rounded-2xl border border-[#FEF0C7] bg-white flex gap-[3px]">
              <img src="/assets/Component 8.svg" alt="" />
              <p className="text-[7px] font-semibold text-[#667085]">
                MCap:
                <span className="blur-sm">₹2843 Cr</span>
              </p>
            </div>
            <div className="px-1 py-[1px] rounded-2xl border border-[#EDF0F5] bg-white flex gap-[3px] items-center">
              <img src="/assets/ic_round-diamond.svg" alt="" />
              <p className="text-[7px] font-semibold text-[#344054] flex gap-[3px]">
                Deep Value
                <span className="text-[#108973] font-bold">+3</span>
              </p>
              <img src="/assets/chevron-down.svg" alt="" />
            </div>
          </div>

          <div className="p-[6px] rounded-xl bg-[#f7f8fa]">
            <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
              <div className="flex justify-end p-2">
                <img src="/assets/streamline_target-solid.svg" alt="" />
              </div>

              <div className="px-[21px] pb-[18px]">
                <div className="gap-[7px] items-center flex justify-center ">
                  <p className="text-2xs font-semibold leading-[18px] text-white font-open_sans  ">
                    Upside left
                  </p>
                  <img src="/assets/ph_info-duotone.svg" alt="" />
                </div>
                <h3 className="text-[27px] font-bold leading-[33px] m-0">
                  12.24%
                </h3>
                <p className="text-[9px] font-normal text-[#E4E7EC]">
                  likely within a year
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-[6px] px-[9px] ">
              <div className="flex gap-[3px] items-center">
                <img src="/assets/Layer_1.svg" alt="" />
                <p className="text-[8px] font-semibold text-[#344054] font-open_sans">
                  Total Returns
                </p>
              </div>
              <div className="flex gap-[2px] items-center font-open_sans">
                <img src="/assets/Polygon 2.svg" alt="" />
                <p className="text-[9px] font-bold text-[#1D2939]">64.08%</p>
                <span className="text-[7px] font-semibold text-[#6E6E6E]">
                  in less than a month
                </span>
              </div>
            </div>
          </div>

          <div className="pt-[15px] pb-[7px]">
            <ProgressBar />
          </div>

          {/* btn  */}
          <div className="py-[15px]">
            <button className="button-82-pushable" role="button">
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>

              <span className="button-82-front text flex items-center">
                <img
                  src="/assets/noto_locked.png"
                  alt=""
                  srcSet=""
                  className="w-4"
                />
                <p className="text-[9px] font-bold text-[#125B54]">
                  Become a Member
                </p>
                <img src="assets/chevron-right.png" alt="" className="w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotcard;
