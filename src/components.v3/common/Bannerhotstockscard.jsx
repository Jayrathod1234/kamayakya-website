import React from "react";
import { Button } from "../../components.v2/button/button";
import {
  ButtonSize,
  ButtonVariant,
} from "../../components.v2/button/button.tsx";
import ProgressBar2 from "./ProgressBar2.jsx";
import { ButtonnArrow } from "../../components.v2/button/btn-arrow-icon.tsx";
import DeepValue from "./DeepValue.jsx";

const Bannerhotstockscard = () => {
  const handleContactButton = () => {
    const mp = getMixPanelClient();
    mp.track("contactus_clicked", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
    mp.track("asktheteam_loaded", {
      page: "Pricing_Page",
      pagegroup: "enterprise_solution",
    });
  };

  // const handleSelect = (value) => {
  //   console.log("Selected:", value);
  // };
  return (
    <div>
      <div className="relative z-[2] pb-[110px] mt-[20px]">
        <div className="container mx-auto">
          <div className="bg-gray-150 p-[10px] rounded-[20px]">
            <div className="bg-[#fff] rounded-[20px] px-10 py-8 gap-10 text-center">
              <h2 className="text-display-xs font-bold leading-8 font-open_sans m-0">
                Hot Stocks (3)
              </h2>
              <p className="pt-3 font-normal text-sm text-gray-500 pb-10">
                Top stocks to invest in right NOW!
              </p>
              <div className="bg-white bg-[url('/assets/grid.png')] bg-cover py-[74px] px-[80px] flex items-center  rounded-[10px]">
                <div className="sm:w-1/3 w-1/2">
                  <img
                    src="/assets/noto_locked.png"
                    alt=""
                    className="w-[46px]"
                  />
                  <p className="text-display-sm font-bold leading-[38px] text-left font-open_sans pt-4 max-w-[324px] tracking-normal">
                    Gain exclusive access to
                    <span className="text-[#108973]">
                      30+ potential multibagger picks
                    </span>
                    <br></br>with KamayaKya membership.
                  </p>
                  <div className=" !mt-6">
                    <ButtonnArrow
                      onClick={handleContactButton}
                      variant={ButtonVariant.primary}
                      size={ButtonSize.lg}
                    >
                      Explore Plans
                    </ButtonnArrow>
                  </div>
                </div>

                <div className="sm:w-7/12 w-1/2">
                  <div className="flex">
                    {/* 1 */}
                    <div className="flex relative scale-75 left-[-10%]">
                      <div className="absolute z-10 left-[7.5rem] -top-1">
                        <img
                          src="/assets/hottab.png"
                          alt=""
                          srcset=""
                          className="w-[160px]"
                        />
                      </div>
                      <div className="relative rounded-lg bg-white shadow-6xs min-w-[408px] border border-[#FEC84B]">
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
                        <div className="pt-[12px] px-[20px] pb-[20px]">
                          <div className=" flex items-center gap-[8px] ">
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/Component 8.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            <div className="px-[6px] py-[2px] rounded-2xl border border-[#EDF0F5]  flex gap-[4px] items-center">
                              <img
                                src="/assets/ic_round-diamond.svg"
                                alt=""
                                className="w-3.5"
                              />
                              <p className="text-[10px] font-semibold text-[#344054] flex gap-[3px]">
                                Deep Value
                                <span className="text-[#108973] font-bold">
                                  +3
                                </span>
                              </p>
                              <img
                                src="/assets/chevron-down.svg"
                                alt=""
                                className="w-4"
                              />
                            </div>
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
                                  <div className="tooltip">
                                    <img
                                      src="/assets/ph_info-duotone.svg"
                                      alt=""
                                    />
                                    <span class="tooltiptext tooltiptext2 relative ">
                                      <img
                                        src="/assets/div.png"
                                        alt=""
                                        className="absolute -top-2 left-[52px] w-4"
                                      />
                                      <div className="text-gray-800 text-2xs font-normal">
                                        Upside Left means how much the stock
                                        price could rise from its current
                                        level.
                                      </div>
                                      <div className="mt-2 p-2">
                                        <span className="text-[#108973] text-2xs font-bold">
                                          Example :
                                        </span>
                                        <p className="text-2xs text-gray-600 font-normal">
                                          If a stock's price is ₹100 and the
                                          Upside Left is 20%, it might go up to
                                          ₹120.
                                        </p>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                                  12.24%
                                </h3>
                                <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[8px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img
                                  src="/assets/Layer_1.svg"
                                  alt=""
                                  className="w-3.5"
                                />
                                <p className="text-[11px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img
                                  src="/assets/Polygon 2.svg"
                                  alt=""
                                  className="w-2"
                                />
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
                          <ProgressBar2 />
                        </div>
                        <div className="p-5">
                          {/* btn  */}
                          <button className="button-82-pushable group " role="button">
                            <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front button-82-front2 text flex items-center">
                              <img src="/assets/noto_locked.png" alt="" className="w-4" />
                              <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                                Become a Member
                              </p>
                              <div className="relative flex">
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                  src="assets/pajamas_long-arrow.svg"
                                  alt=""
                                  className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0"
                                />
                              </div>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* 2 with deep value drop down */}
                    <div className="flex relative scale-x-90 left-[-38%] z-10">
                      <div className="absolute z-20 left-[7.5rem] -top-1">
                        <img
                          src="/assets/hottab.png"
                          alt=""
                          srcset=""
                          className="w-[160px]"
                        />
                      </div>
                      <div className="relative rounded-lg bg-white shadow-6xs min-w-[408px] border border-[#FEC84B]">
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
                        <div className="pt-[12px] px-[20px] pb-[20px]">
                          <div className=" flex items-center gap-[8px] ">
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/Component 8.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            <DeepValue />
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
                                  <div className="tooltip">
                                    <img
                                      src="/assets/ph_info-duotone.svg"
                                      alt=""
                                    />
                                    <span class="tooltiptext tooltiptext2 relative ">
                                      <img
                                        src="/assets/div.png"
                                        alt=""
                                        className="absolute -top-2 left-[52px] w-4"
                                      />
                                      <div className="text-gray-800 text-2xs font-normal">
                                        Upside Left means how much the stock
                                        price could rise from its current
                                        level.
                                      </div>
                                      <div className="mt-2 p-2">
                                        <span className="text-[#108973] text-2xs font-bold">
                                          Example :
                                        </span>
                                        <p className="text-2xs text-gray-600 font-normal">
                                          If a stock's price is ₹100 and the
                                          Upside Left is 20%, it might go up to
                                          ₹120.
                                        </p>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                                  12.24%
                                </h3>
                                <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[8px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img
                                  src="/assets/Layer_1.svg"
                                  alt=""
                                  className="w-3.5"
                                />
                                <p className="text-[11px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img
                                  src="/assets/Polygon 2.svg"
                                  alt=""
                                  className="w-2"
                                />
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
                          <ProgressBar2 />
                        </div>
                        <div className="p-5">
                          {/* btn  */}
                          <button className="button-82-pushable group " role="button">
                            <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front button-82-front2 text flex items-center">
                              <img src="/assets/noto_locked.png" alt="" className="w-4" />
                              <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                                Become a Member
                              </p>
                              <div className="relative flex">
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                  src="assets/pajamas_long-arrow.svg"
                                  alt=""
                                  className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0"
                                />
                              </div>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="flex relative scale-75 left-[-70%]">
                      <div className="absolute z-10 left-[7.5rem] -top-1">
                        <img
                          src="/assets/hottab.png"
                          alt=""
                          srcset=""
                          className="w-[160px]"
                        />
                      </div>
                      <div className="relative rounded-lg bg-white shadow-6xs min-w-[408px] border border-[#FEC84B]">
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
                        <div className="pt-[12px] px-[20px] pb-[20px]">
                          <div className=" flex items-center gap-[8px] ">
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/streamline_hotel-air-conditioner-solid.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#A3651A]">
                                Air Conditioners
                              </p>
                            </div>
                            <div className="py-[2px] pr-[8px] pl-[6px] rounded-2xl border border-[#FEF0C7] bg-orange-100 flex gap-[4px]">
                              <img
                                src="/assets/Component 8.svg"
                                alt=""
                                className="w-3"
                              />
                              <p className="text-[10px] font-semibold text-[#667085]">
                                MCap:
                                <span className="blur-sm">₹2843 Cr</span>
                              </p>
                            </div>
                            {/* <div className="px-[6px] py-[2px] rounded-2xl border border-[#EDF0F5]  flex gap-[4px] items-center">
                              <img
                                src="/assets/ic_round-diamond.svg"
                                alt=""
                                className="w-3.5"
                              />
                              <p className="text-[10px] font-semibold text-[#344054] flex gap-[3px]">
                                Deep Value
                                <span className="text-[#108973] font-bold">
                                  +3
                                </span>
                              </p>
                              <img
                                src="/assets/chevron-down.svg"
                                alt=""
                                className="w-4"
                              />
                            </div> */}
                            <DeepValue />
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
                                  <div className="tooltip">
                                    <img
                                      src="/assets/ph_info-duotone.svg"
                                      alt=""
                                    />
                                    <span class="tooltiptext tooltiptext2 relative ">
                                      <img
                                        src="/assets/div.png"
                                        alt=""
                                        className="absolute -top-2 left-[52px] w-4"
                                      />
                                      <div className="text-gray-800 text-2xs font-normal">
                                        Upside Left means how much the stock
                                        price could rise from its current
                                        level.
                                      </div>
                                      <div className="mt-2 p-2">
                                        <span className="text-[#108973] text-2xs font-bold">
                                          Example :
                                        </span>
                                        <p className="text-2xs text-gray-600 font-normal">
                                          If a stock's price is ₹100 and the
                                          Upside Left is 20%, it might go up to
                                          ₹120.
                                        </p>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <h3 className="text-[36px] font-bold leading-[33px] m-0 font-open_sans">
                                  12.24%
                                </h3>
                                <p className="text-2xs font-normal text-[#E4E7EC] font-open_sans">
                                  likely within a year
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between pt-[8px] px-[9px] ">
                              <div className="flex gap-[3px] items-center">
                                <img
                                  src="/assets/Layer_1.svg"
                                  alt=""
                                  className="w-3.5"
                                />
                                <p className="text-[11px] font-semibold text-[#344054] font-open_sans">
                                  Total Returns
                                </p>
                              </div>
                              <div className="flex gap-[2px] items-center font-open_sans">
                                <img
                                  src="/assets/Polygon 2.svg"
                                  alt=""
                                  className="w-2"
                                />
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
                          <ProgressBar2 />
                        </div>
                        <div className="p-5">
                          {/* btn  */}
                          <button className="button-82-pushable group " role="button">
                            <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front button-82-front2 text flex items-center">
                              <img src="/assets/noto_locked.png" alt="" className="w-4" />
                              <p className="text-[13px] font-bold text-[#125B54] font-open_sans">
                                Become a Member
                              </p>
                              <div className="relative flex">
                                <img
                                  src="assets/chevron-right.png"
                                  alt=""
                                  className="w-4 img-1 transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                  src="assets/pajamas_long-arrow.svg"
                                  alt=""
                                  className="w-5 img-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute right-0"
                                />
                              </div>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannerhotstockscard;
