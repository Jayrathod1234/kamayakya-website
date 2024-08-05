import React from "react";
import ProgressBar from "../common/ProgressBar";

function LatestReleasesCard({ percentage }) {
  return (
    <>
      <div className="main_card_carousel">
        <div className="flex relative">
          <div className="absolute top-[-7px] right-[97px] z-[1]">
            <img src="/assets/newtab.png" alt="" className="w-[210px]" />
          </div>
          <div className="relative rounded-lg bg-white border border-brand-300 min-w-[408px]">
            <div className="pt-[20px] px-[20px] flex gap-[36px] items-center">
              <div className="p-1 gap-2 flex items-center">
                <img
                  src="/assets/noto_locked.png"
                  alt=""
                  className="w-[19px]"
                />

                <div className="h-5 bg-[#EDF0F5] items-end rounded-[20px] min-w-[281px]"></div>
              </div>

              <img
                src="/assets/play.gif"
                alt=""
                className="w-[24px] play blur-[1px]"
              />
              {/* <img
              src="/assets/Property 1=Default.png"
              alt=""
              className="w-[121px]  wat ch-video "
            /> */}
              <div className=""></div>
            </div>
            <div className="pt-[12px] px-[20px] pb-[20px]">
              <div className=" flex items-center gap-[8px] ">
                <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-white flex gap-[4px]">
                  <img
                    src="/assets/streamline_hotel-air-conditioner-solid.svg"
                    alt=""
                  />
                  <p className="text-[10px] font-semibold text-[#A3651A]">
                    Air Conditioners
                  </p>
                </div>
                <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-white flex gap-[4px]">
                  <img src="/assets/Component 8.svg" alt="" />
                  <p className="text-[10px] font-semibold text-[#667085]">
                    MCap:
                    <span className="blur-sm">₹2843 Cr</span>
                  </p>
                </div>
                <div className="px-[6px] py-[2px] rounded-2xl border border-[#EDF0F5] bg-white flex gap-[4px] items-center">
                  <img src="/assets/ic_round-diamond.svg" alt="" />
                  <p className="text-[10px] font-semibold text-[#344054] flex gap-[3px]">
                    Deep Value
                    <span className="text-[#108973] font-bold">+3</span>
                  </p>
                  <img src="/assets/chevron-down.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="px-5 pb-3">
              <div className="p-[8px] rounded-xl bg-[#f7f8fa]">
                <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                  <div className="flex justify-end px-[11px] pt-[11px]">
                    <img src="/assets/streamline_target-solid.svg" alt="" />
                  </div>

                  <div className="px-[16px] pb-[24px]">
                    <div className="gap-[7px] items-center flex justify-center ">
                      <p className="text-md font-semibold leading-[18px] text-white font-open_sans  ">
                        Upside left
                      </p>
                      <img src="/assets/ph_info-duotone.svg" alt="" />
                    </div>
                    <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                      {percentage}%
                    </h3>
                    <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                      likely within a year
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-[8px] px-[9px] ">
                  <div className="flex gap-[3px] items-center">
                    <img src="/assets/Layer_1.svg" alt="" />
                    <p className="text-[11px] font-semibold text-[#344054] font-open_sans">
                      Total Returns
                    </p>
                  </div>
                  <div className="flex gap-[2px] items-center font-open_sans">
                    <img src="/assets/Polygon 2.svg" alt="" />
                    <p className="text-2xs font-bold text-[#1D2939] font-open_sans">
                      64.08%
                    </p>
                    <span className="text-[10px] font-semibold text-[#6E6E6E]">
                      in less than a month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 pb-[10px] pr-5">
              <ProgressBar />
            </div>
            <div className="p-5">
              {/* btn  */}
              <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>

                <span className="button-82-front  button-82-front2 text flex items-center">
                  <img
                    src="/assets/noto_locked.png"
                    alt=""
                    srcSet=""
                    className="w-4"
                  />
                  <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                    Become a Member
                  </p>
                  <img src="assets/chevron-right.png" alt="" className="w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LatestReleasesCard;
