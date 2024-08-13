import React from "react";
import ProgressBarDemo from "./ProgressBarDemo";
import DeepValue from "./DeepValue";

function StockCard({
  title,
  market_cap,
  new_stock,
  recommended_stock,
  is_blur,
}) {
  let tabImage = null;
  let cardClass = "";
  let innerClass = "relative rounded-lg bg-white shadow-6xs min-w-[408px] ";

  if (new_stock & recommended_stock) {
    tabImage = "hot-newtab";
    cardClass =
      "p-[1px] rounded-lg bg-gradient-to-r from-[#FDB022] to-[#75CDC5]";
  } else if (new_stock) {
    tabImage = "newtab";
    innerClass += "border border-brand-300";
  } else if (recommended_stock) {
    tabImage = "hottab";
    innerClass += "border border-warning-300";
  }

  return (
    <div>
      {/* new stock card  */}
      <div className="flex relative main_card_carousel">
        <div className="absolute top-[-7px] right-[97px] z-[1]">
          {tabImage && (
            <img src={`/assets/${tabImage}.png`} alt="" className="w-[210px]" />
          )}
        </div>
        <div className={cardClass}>
          <div className={innerClass}>
            {is_blur ? (
              <div className="pt-[20px] px-[20px] flex gap-[36px] items-center">
                <div className="p-1 gap-2 flex items-center">
                  <img
                    src="/assets/noto_locked.png"
                    alt=""
                    className="w-[19px]"
                  />

                  <div className="h-5 bg-[#EDF0F5] rounded-[20px] min-w-[281px]"></div>
                </div>

                <div class="tooltip">
                  <img
                    src="/assets/play.gif"
                    alt=""
                    className="w-[24px] blur-[2px]"
                  />
                  <span class="tooltiptext relative">
                    <img
                      src="/assets/div.png"
                      alt=""
                      className="absolute -top-2 left-[52px] w-4"
                    />
                    Please become a member to watch this video.
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-[20px] px-[20px] flex gap-[36px] items-center justify-between">
                <p className="text-gray-950 text-lg font-bold leading-7 text-ellipsis">
                  {title}
                </p>

                <div class="tooltip">
                  <img src="/assets/play.gif" alt="" className="w-[24px]" />
                </div>
              </div>
            )}

            <div className="pt-[12px] px-[20px] pb-[20px]">
              <div className=" flex items-center gap-[8px] ">
                <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                  <img
                    src="/assets/streamline_hotel-air-conditioner-solid.svg"
                    alt=""
                    className="w-3"
                  />
                  <p className="text-[10px] font-semibold text-orange-700">
                    Air Conditioners
                  </p>
                </div>
                <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                  <img src="/assets/Component 8.svg" alt="" className="w-3" />
                  <p className="text-[10px] font-semibold text-gray-500">
                    MCap:
                    {is_blur ? (
                      <span className="blur-sm">₹ 0000</span>
                    ) : (
                      <span className="">₹ {market_cap}</span>
                    )}
                  </p>
                </div>
                <DeepValue />
                {/* <div className="px-[6px] py-[2px] rounded-2xl border border-gray-150 bg-white flex gap-[4px] items-center">
                  <img
                    src="/assets/ic_round-diamond.svg"
                    alt=""
                    className="w-3.5"
                  />
                  <p className="text-[10px] font-semibold text-gray-700 flex gap-[3px]">
                    Turnaround Story
                    <span className="text-[#108973] font-bold">+3</span>
                  </p>
                  <img src="/assets/chevron-down.svg" alt="" className="w-4" />
                </div> */}
              </div>
            </div>
            <div className="px-5 pb-3">
              <div className="p-[8px] rounded-xl bg-[#f7f8fa]">
                <div className="rounded-[7px] bg-custom-gradient text-center text-white ">
                  <div className="flex justify-end px-[11px] pt-[11px]">
                    <img
                      src="/assets/streamline_target-solid.svg"
                      alt=""
                      className="w-[18px]"
                    />
                  </div>

                  <div className="px-[16px] pb-[24px]">
                    <div className="gap-[7px] items-center flex justify-center ">
                      <p className="text-md font-semibold leading-[18px] text-white font-open_sans  ">
                        Upside left
                      </p>
                      <img src="/assets/ph_info-duotone.svg" alt="" />
                    </div>
                    <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                      12.24%
                    </h3>
                    <p className="text-2xs font-medium text-[#E4E7EC] font-open_sans">
                      likely within a year
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-[8px] px-[9px] ">
                  <div className="flex gap-[3px] items-center">
                    <img src="/assets/Layer_1.svg" alt="" className="w-3.5" />
                    <p className="text-[11px] font-semibold text-gray-700 font-open_sans">
                      Total Returns
                    </p>
                  </div>
                  <div className="flex gap-[2px] items-center font-open_sans">
                    <img src="/assets/Polygon 2.svg" alt="" className="w-2" />
                    {is_blur ? (
                      <p className="text-2xs font-bold text-gray-800 font-open_sans blur-sm">
                        0%
                      </p>
                    ) : (
                      <p className="text-2xs font-bold text-gray-800 font-open_sans">
                        64.08%
                      </p>
                    )}
                    <span className="text-[10px] font-semibold text-[#6E6E6E]">
                      in less than a month
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5 pb-[10px] pr-5">
              <ProgressBarDemo />
            </div>
            {/* {is_blur ? <></> : <></>} */}
            <div className="p-5">
            <button className="button-82-pushable group relative" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front button-82-front2 text flex items-center">
                  <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                  View Reports & Details
                  </p>
                  <img
                    src="assets/chevron-right.png"
                    alt=""
                    className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src="assets/pajamas_long-arrow.svg"
                    alt=""
                    className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-[105px]"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCard;
